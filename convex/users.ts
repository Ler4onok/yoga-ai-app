import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { FREE_TIER_LIMIT, TIER_LIMITS } from "./tiers";

export const syncUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        image: v.optional(v.string()),
        clerkId: v.string(),
    },
    handler: async (ctx, args) =>{
        const existingUser = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), args.clerkId)).first();
        if (existingUser) return;

        await ctx.db.insert("users", args);
    }

})

export const getByClerkId = internalQuery({
    args: { clerkId: v.string() },
    handler: async (ctx, { clerkId }) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
            .first();
    },
});

function isActiveSubscriber(user: { subscriptionTier?: string; subscriptionStatus?: string; currentPeriodEnd?: number }) {
    return Boolean(
        user.subscriptionTier &&
        user.subscriptionStatus === "active" &&
        user.currentPeriodEnd &&
        user.currentPeriodEnd > Date.now()
    );
}

// Checks the caller's plan limit without incrementing usage. Called before doing
// the (costly) AI generation so failed generations never count against the quota.
export const ensureGenerationAllowed = internalMutation({
    args: { clerkId: v.string(), email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        let user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (!user) {
            const id = await ctx.db.insert("users", {
                clerkId: args.clerkId,
                email: args.email,
                name: args.name,
                totalGenerations: 0,
                periodGenerations: 0,
            });
            user = await ctx.db.get(id);
        }
        if (!user) throw new Error("Failed to load user record");

        if (isActiveSubscriber(user)) {
            const limit = TIER_LIMITS[user.subscriptionTier as keyof typeof TIER_LIMITS];
            const used = user.periodGenerations ?? 0;
            if (used >= limit) {
                throw new ConvexError(
                    `You've used all ${limit} generations included in your plan this month. It renews on your next billing date, or upgrade for more.`
                );
            }
            return;
        }

        const used = user.totalGenerations ?? 0;
        if (used >= FREE_TIER_LIMIT) {
            throw new ConvexError(
                `You've used all ${FREE_TIER_LIMIT} free generations. Upgrade your plan to keep generating flows.`
            );
        }
    },
});

// Increments usage after a generation succeeds.
export const recordGeneration = internalMutation({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        if (!user) return;

        await ctx.db.patch(user._id, {
            totalGenerations: (user.totalGenerations ?? 0) + 1,
            ...(isActiveSubscriber(user)
                ? { periodGenerations: (user.periodGenerations ?? 0) + 1 }
                : {}),
        });
    },
});

export const getUsageStatus = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (user && isActiveSubscriber(user)) {
            const tier = user.subscriptionTier as keyof typeof TIER_LIMITS;
            const limit = TIER_LIMITS[tier];
            const used = user.periodGenerations ?? 0;
            return {
                tier,
                used,
                limit,
                remaining: Math.max(0, limit - used),
                periodEnd: user.currentPeriodEnd ?? null,
            };
        }

        const used = user?.totalGenerations ?? 0;
        console.log({used})
        return {
            tier: "free" as const,
            used,
            limit: FREE_TIER_LIMIT,
            remaining: Math.max(0, FREE_TIER_LIMIT - used),
            periodEnd: null,
        };
    },
});

export const applySubscriptionUpdate = internalMutation({
    args: {
        clerkId: v.string(),
        stripeCustomerId: v.string(),
        stripeSubscriptionId: v.string(),
        tier: v.union(v.literal("starter"), v.literal("growth"), v.literal("pro")),
        status: v.string(),
        currentPeriodStart: v.number(),
        currentPeriodEnd: v.number(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .first();
        if (!user) return;

        // A new billing period or a plan change grants a fresh allowance;
        // any other subscription.updated event (e.g. payment method change) must not reset usage.
        const isNewPeriodOrTier =
            user.currentPeriodStart !== args.currentPeriodStart ||
            user.subscriptionTier !== args.tier;

        await ctx.db.patch(user._id, {
            stripeCustomerId: args.stripeCustomerId,
            stripeSubscriptionId: args.stripeSubscriptionId,
            subscriptionTier: args.tier,
            subscriptionStatus: args.status,
            currentPeriodStart: args.currentPeriodStart,
            currentPeriodEnd: args.currentPeriodEnd,
            ...(isNewPeriodOrTier ? { periodGenerations: 0 } : {}),
        });
    },
});

export const cancelSubscription = internalMutation({
    args: { stripeCustomerId: v.string(), stripeSubscriptionId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_stripe_customer_id", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
            .first();
        if (!user) return;

        // Only clear the user's plan if the subscription being cancelled is the
        // one currently on record. Otherwise this is a stale/duplicate
        // subscription (e.g. the old plan being auto-cancelled after an
        // upgrade) that has already been superseded — leave the current plan alone.
        if (user.stripeSubscriptionId !== args.stripeSubscriptionId) return;

        await ctx.db.patch(user._id, {
            subscriptionTier: undefined,
            subscriptionStatus: "canceled",
        });
    },
});
