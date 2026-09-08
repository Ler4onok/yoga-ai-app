export const FREE_TIER_LIMIT = 1;

export const TIER_LIMITS = {
  starter: 10,
  growth: 50,
  pro: 150,
} as const;

export type TierId = keyof typeof TIER_LIMITS;

export const TIER_PRICE_ENV_VARS: Record<TierId, string> = {
  starter: "STRIPE_PRICE_STARTER",
  growth: "STRIPE_PRICE_GROWTH",
  pro: "STRIPE_PRICE_PRO",
};

export const TIER_DISPLAY = {
  starter: { name: "Starter", priceEur: 2.99 },
  growth: { name: "Growth", priceEur: 4.99 },
  pro: { name: "Pro", priceEur: 9.99 },
} as const;
