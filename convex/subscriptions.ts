import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { TIER_PRICE_ENV_VARS, TierId } from "./tiers";
import { stripeRequest } from "./stripeClient";

const TIER_ARG = v.union(v.literal("starter"), v.literal("growth"), v.literal("pro"));

export const createCheckoutSession = action({
    args: { tier: TIER_ARG, appUrl: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized: sign in to subscribe.");

        const tier = args.tier as TierId;
        const priceId = process.env[TIER_PRICE_ENV_VARS[tier]];
        if (!priceId) {
            throw new Error(
                `${TIER_PRICE_ENV_VARS[tier]} environment variable is not set. Create the Stripe price first.`
            );
        }

        const user = await ctx.runQuery(internal.users.getByClerkId, {
            clerkId: identity.subject,
        });

        const params: Record<string, string> = {
            mode: "subscription",
            "line_items[0][price]": priceId,
            "line_items[0][quantity]": "1",
            client_reference_id: identity.subject,
            "metadata[clerkId]": identity.subject,
            "metadata[tier]": tier,
            "subscription_data[metadata][clerkId]": identity.subject,
            "subscription_data[metadata][tier]": tier,
            success_url: `${args.appUrl}/pricing?checkout=success`,
            cancel_url: `${args.appUrl}/pricing?checkout=cancelled`,
        };

        if (user?.stripeCustomerId) {
            params["customer"] = user.stripeCustomerId;
        } else if (identity.email) {
            params["customer_email"] = identity.email;
        }

        const session = await stripeRequest("/checkout/sessions", params);
        return { url: session.url as string };
    },
});

export const createPortalSession = action({
    args: { appUrl: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized: sign in first.");

        const user = await ctx.runQuery(internal.users.getByClerkId, {
            clerkId: identity.subject,
        });
        if (!user?.stripeCustomerId) {
            throw new Error("No billing account found yet. Subscribe to a plan first.");
        }

        const session = await stripeRequest("/billing_portal/sessions", {
            customer: user.stripeCustomerId,
            return_url: `${args.appUrl}/pricing`,
        });
        return { url: session.url as string };
    },
});
