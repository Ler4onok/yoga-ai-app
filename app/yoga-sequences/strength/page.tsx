import React from "react";
import type { Metadata } from "next";
import StaticSequenceViewer from "@/components/StaticSequenceViewer";
import { STATIC_FLOWS } from "@/lib/staticFlows";

export const metadata: Metadata = {
  title: "60-Minute Ashtanga Strength Flow | Yoga Sequences | YoflowAI",
  description: "Build deep core power and stability with this modified 60-minute Ashtanga primary sequence. Ideal for experienced practitioners looking for a safety-supported strength challenge.",
  alternates: {
    canonical: "https://yoflow.app/yoga-sequences/strength"
  },
  keywords: [
    "ashtanga strength flow",
    "60 minute ashtanga yoga",
    "power yoga sequence",
    "core strength yoga",
    "modified primary series",
    "arm balance practice",
    "heat building yoga"
  ],
  openGraph: {
    title: "60-Minute Ashtanga Strength Flow | Yoga Sequences | YoflowAI",
    description: "Build deep core power and stability with this modified 60-minute Ashtanga primary sequence.",
    url: "https://yoflow.app/yoga-sequences/strength",
    siteName: "YoflowAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "60-Minute Ashtanga Strength Flow | Yoga Sequences | YoflowAI",
    description: "Build deep core power and stability with this modified 60-minute Ashtanga primary sequence.",
  }
};

export default function StrengthSequencePage() {
  const flow = STATIC_FLOWS.strength;
  const otherFlows = [
    { title: "60-Min Beginner Vinyasa", slug: "beginners", style: "Vinyasa" },
    { title: "60-Min Yin Flexibility", slug: "flexibility", style: "Yin" }
  ];

  return <StaticSequenceViewer flow={flow} otherFlows={otherFlows} />;
}
