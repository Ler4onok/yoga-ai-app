import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    clerkId: v.string(),
    // Lifetime count, gates the free tier's 5-generation limit.
    totalGenerations: v.optional(v.number()),
    // Count within the current billing period, gates a subscriber's monthly limit.
    periodGenerations: v.optional(v.number()),
    stripeCustomerId: v.optional(v.string()),
    // The subscription currently backing the user's plan. Used to make sure a
    // cancellation event for an old/duplicate subscription can't wipe out a
    // newer one that has since replaced it.
    stripeSubscriptionId: v.optional(v.string()),
    subscriptionTier: v.optional(
      v.union(v.literal("starter"), v.literal("growth"), v.literal("pro"))
    ),
    subscriptionStatus: v.optional(v.string()),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"]),

  asanas: defineTable({
    name: v.string(),
    intensity: v.string(),
  }).index("by_intensity", ["intensity"]),

  plans: defineTable({
    userId: v.string(),
    name: v.string(),
    yogaFlow: v.object({
      schedule: v.array(v.string()),
      asanas: v.array(
        v.object({
          day: v.string(),
          routines: v.array(
            v.object({
              name: v.string(),
              sets: v.optional(v.number()),
              reps: v.optional(v.number()),
              duration: v.optional(v.string()),
              description: v.optional(v.string()),
              clues: v.optional(v.string()),
              sanskritName: v.optional(v.string()),
              asanas: v.optional(v.array(v.string())),
            }),
          ),
        }),
      ),
    }),
    isActive: v.boolean(),
  })
    .index("by_user_id", ["userId"])
    .index("by_active", ["isActive"]),
});
