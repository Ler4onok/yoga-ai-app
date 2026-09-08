
import { httpRouter } from "convex/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { api, internal } from "./_generated/api";
import { httpAction } from "./_generated/server";
import { TIER_PRICE_ENV_VARS, TierId } from "./tiers";
import { stripeRequest } from "./stripeClient";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const http = httpRouter();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
    }

    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("No svix headers found", {
        status: 400,
      });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return new Response("Error occurred", { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
      const { id, first_name, last_name, image_url, email_addresses } = evt.data;

      const email = email_addresses[0].email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      try {
        await ctx.runMutation(api.users.syncUser, {
          email,
          name,
          image: image_url,
          clerkId: id,
        });
      } catch (error) {
        console.log("Error creating user:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }

    // if (eventType === "user.updated") {
    //   const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    //   const email = email_addresses[0].email_address;
    //   const name = `${first_name || ""} ${last_name || ""}`.trim();

    //   try {
    //     await ctx.runMutation(api.users.updateUser, {
    //       clerkId: id,
    //       email,
    //       name,
    //       image: image_url,
    //     });
    //   } catch (error) {
    //     console.log("Error updating user:", error);
    //     return new Response("Error updating user", { status: 500 });
    //   }
    // }

    return new Response("Webhooks processed successfully", { status: 200 });
  }),
});

async function verifyStripeSignature(payload: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(",").reduce<Record<string, string>>((acc, part) => {
    const [key, value] = part.split("=");
    if (key && value) acc[key] = value;
    return acc;
  }, {});

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Reject stale signatures to prevent replay attacks.
  const toleranceSeconds = 300;
  if (Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp)) > toleranceSeconds) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signedPayload = `${timestamp}.${payload}`;
  const sigBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expected = Array.from(new Uint8Array(sigBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expected === signature;
}

function resolveTierFromPrice(priceId: string | undefined): TierId | undefined {
  if (!priceId) return undefined;
  return (Object.keys(TIER_PRICE_ENV_VARS) as TierId[]).find(
    (tier) => process.env[TIER_PRICE_ENV_VARS[tier]] === priceId
  );
}

// A customer should only ever have one active subscription for this app (a plan
// change creates a new subscription via Checkout rather than editing the old
// one). Once the new subscription is confirmed active, cancel any other active
// subscriptions left over on the same customer, e.g. the old plan being upgraded from.
async function cancelOtherActiveSubscriptions(customerId: string, keepSubscriptionId: string) {
  const list = await stripeRequest(
    "/subscriptions",
    { customer: customerId, status: "active", limit: "10" },
    "GET"
  );
  for (const other of list.data ?? []) {
    if (other.id !== keepSubscriptionId) {
      await stripeRequest(`/subscriptions/${other.id}`, {}, "DELETE");
    }
  }
}

http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable");
    }

    const signatureHeader = request.headers.get("stripe-signature");
    if (!signatureHeader) {
      return new Response("No stripe-signature header", { status: 400 });
    }

    const body = await request.text();
    const isValid = await verifyStripeSignature(body, signatureHeader, webhookSecret);
    if (!isValid) {
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object;
      const clerkId: string | undefined = subscription.metadata?.clerkId;
      const item = subscription.items?.data?.[0];
      const priceId: string | undefined = item?.price?.id;
      const tier = resolveTierFromPrice(priceId);

      // API versions 2025-03-31+ moved the billing period from the subscription
      // itself onto each subscription item, so fall back to the item's value.
      const periodStart = subscription.current_period_start ?? item?.current_period_start;
      const periodEnd = subscription.current_period_end ?? item?.current_period_end;

      if (clerkId && tier && periodStart && periodEnd) {
        await ctx.runMutation(internal.users.applySubscriptionUpdate, {
          clerkId,
          stripeCustomerId: subscription.customer,
          stripeSubscriptionId: subscription.id,
          tier,
          status: subscription.status,
          currentPeriodStart: periodStart * 1000,
          currentPeriodEnd: periodEnd * 1000,
        });

        if (subscription.status === "active" || subscription.status === "trialing") {
          try {
            await cancelOtherActiveSubscriptions(subscription.customer, subscription.id);
          } catch (err) {
            console.error("stripe-webhook: failed to cancel duplicate subscriptions", err);
          }
        }
      } else {
        console.error("stripe-webhook: skipped update, missing data", {
          clerkId,
          tier,
          periodStart,
          periodEnd,
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      await ctx.runMutation(internal.users.cancelSubscription, {
        stripeCustomerId: subscription.customer,
        stripeSubscriptionId: subscription.id,
      });
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
