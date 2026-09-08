"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAction, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

type TierId = "starter" | "growth" | "pro";

const PAID_TIERS: {
  id: TierId;
  name: string;
  priceEur: number;
  generations: number;
  highlight?: boolean;
}[] = [
  { id: "starter", name: "Starter", priceEur: 2.99, generations: 10 },
  { id: "growth", name: "Growth", priceEur: 4.99, generations: 50, highlight: true },
  { id: "pro", name: "Pro", priceEur: 9.99, generations: 150 },
];

const CheckIcon = () => (
  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
  </div>
);

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const usage = useQuery(api.users.getUsageStatus);
  const createCheckoutSession = useAction(api.subscriptions.createCheckoutSession);
  const createPortalSession = useAction(api.subscriptions.createPortalSession);
  const [loadingTier, setLoadingTier] = useState<TierId | null>(null);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentTier = usage?.tier;

  const onSubscribe = async (tier: TierId) => {
    setError(null);
    if (!isSignedIn) {
      window.location.href = "/sign-in?redirect_url=/pricing";
      return;
    }
    setLoadingTier(tier);
    try {
      const { url } = await createCheckoutSession({ tier, appUrl: window.location.origin });
      window.location.href = url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(err instanceof Error ? err.message : "Failed to start checkout. Please try again.");
    } finally {
      setLoadingTier(null);
    }
  };

  const onManageBilling = async () => {
    setError(null);
    setLoadingPortal(true);
    try {
      const { url } = await createPortalSession({ appUrl: window.location.origin });
      window.location.href = url;
    } catch (err) {
      console.error("Error creating billing portal session:", err);
      setError(err instanceof Error ? err.message : "Failed to open billing portal.");
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Pricing <span className="text-blue-600">Plans</span></h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            Choose the plan that fits your practice. Simple, transparent, and built for growth.
          </p>
          {usage && (
            <p className="mt-6 text-sm font-bold uppercase tracking-widest text-gray-500">
              {usage.tier === "free"
                ? `You've used ${usage.used}/${usage.limit} free generations`
                : `${usage.remaining}/${usage.limit} generations left this month`}
            </p>
          )}
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-10 p-4 bg-red-50 border border-red-100 rounded-2xl text-center text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {/* Free tier */}
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-10 relative overflow-hidden flex flex-col">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-2">Free Beta</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">€0</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">/month</span>
              </div>
            </div>

            <ul className="space-y-6 mb-10 flex-1">
              <li className="flex items-center gap-4">
                <CheckIcon />
                <span className="text-gray-600 font-medium">5 AI Generations total</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckIcon />
                <span className="text-gray-600 font-medium">Custom focus & style selection</span>
              </li>
              <li className="flex items-center gap-4">
                <CheckIcon />
                <span className="text-gray-600 font-medium">PDF Export included</span>
              </li>
            </ul>

            {currentTier === "free" || !currentTier ? (
              <Link href="/generate-asanas" className="block w-full py-5 bg-gray-900 text-white rounded-[2rem] font-bold text-center uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95">
                {isSignedIn ? "Current Plan" : "Get Started for Free"}
              </Link>
            ) : (
              <div className="block w-full py-5 bg-gray-100 text-gray-400 rounded-[2rem] font-bold text-center uppercase tracking-widest text-xs">
                Free Beta
              </div>
            )}
          </div>

          {/* Paid tiers */}
          {PAID_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border p-10 relative overflow-hidden flex flex-col transition-all duration-500 ${
                tier.highlight ? "border-blue-200 md:scale-[1.03]" : "border-gray-100"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-gray-900">€{tier.priceEur.toFixed(2)}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">/month</span>
                </div>
              </div>

              <ul className="space-y-6 mb-10 flex-1">
                <li className="flex items-center gap-4">
                  <CheckIcon />
                  <span className="text-gray-600 font-medium">{tier.generations} AI Generations / month</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckIcon />
                  <span className="text-gray-600 font-medium">Custom focus & style selection</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckIcon />
                  <span className="text-gray-600 font-medium">PDF Export included</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckIcon />
                  <span className="text-gray-600 font-medium">Priority support</span>
                </li>
              </ul>

              {currentTier === tier.id ? (
                <button
                  onClick={onManageBilling}
                  disabled={loadingPortal}
                  className="w-full py-5 bg-white text-gray-900 border border-gray-200 rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loadingPortal ? "Opening..." : "Manage Subscription"}
                </button>
              ) : (
                <button
                  onClick={() => onSubscribe(tier.id)}
                  disabled={loadingTier === tier.id}
                  className={`w-full py-5 rounded-[2rem] font-bold text-center uppercase tracking-widest text-xs transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50 cursor-pointer ${
                    tier.highlight ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-900 text-white hover:bg-black"
                  }`}
                >
                  {loadingTier === tier.id ? "Redirecting..." : "Subscribe"}
                </button>
              )}
            </div>
          ))}
        </div>

        {currentTier && currentTier !== "free" && (
          <p className="text-center mt-10">
            <button onClick={onManageBilling} disabled={loadingPortal} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-700 transition-colors cursor-pointer">
              Manage or cancel your subscription
            </button>
          </p>
        )}

        <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-8">
          * Prices in EUR, billed monthly. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
