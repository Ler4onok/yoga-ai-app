// One-time setup: creates the 3 subscription Products/Prices in Stripe and prints
// the `npx convex env set` commands needed to wire them into the app.
//
// Usage:
//   STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe.mjs

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  console.error("Set STRIPE_SECRET_KEY in your shell before running this script.");
  console.error("Example: STRIPE_SECRET_KEY=sk_test_xxx node scripts/setup-stripe.mjs");
  process.exit(1);
}

const TIERS = [
  { id: "starter", name: "GenFlowAI Starter", priceEur: 2.99, envVar: "STRIPE_PRICE_STARTER" },
  { id: "growth", name: "GenFlowAI Growth", priceEur: 4.99, envVar: "STRIPE_PRICE_GROWTH" },
  { id: "pro", name: "GenFlowAI Pro", priceEur: 9.99, envVar: "STRIPE_PRICE_PRO" },
];

async function stripeRequest(path, params) {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`Stripe API error (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

const results = [];

for (const tier of TIERS) {
  const product = await stripeRequest("/products", { name: tier.name });
  const price = await stripeRequest("/prices", {
    product: product.id,
    currency: "eur",
    unit_amount: String(Math.round(tier.priceEur * 100)),
    "recurring[interval]": "month",
  });
  results.push({ ...tier, priceId: price.id });
  console.log(`Created ${tier.name}: product=${product.id} price=${price.id}`);
}

console.log("\nNow run these to wire the prices into Convex:\n");
for (const r of results) {
  console.log(`npx convex env set ${r.envVar} ${r.priceId}`);
}
console.log(`npx convex env set STRIPE_SECRET_KEY ${apiKey}`);
console.log(
  "npx convex env set STRIPE_WEBHOOK_SECRET whsec_xxx  # from the Stripe webhook you create for /stripe-webhook"
);
