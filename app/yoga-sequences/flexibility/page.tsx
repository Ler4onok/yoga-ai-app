import React from "react";
import type { Metadata } from "next";
import StaticSequenceViewer from "@/components/StaticSequenceViewer";
import { STATIC_FLOWS } from "@/lib/staticFlows";

export const metadata: Metadata = {
  title: "60-Minute Yin Flexibility Flow | Yoga Sequences | YoflowAI",
  description: "A passive, deep 60-minute Yin yoga sequence focusing on flexibility, hips, and hamstrings. Experience long-held poses like Butterfly and Dragon for ultimate recovery.",
  alternates: {
    canonical: "https://yoflow.app/yoga-sequences/flexibility"
  },
  keywords: [
    "yin flexibility flow",
    "60 minute yin yoga",
    "hip opener yoga sequence",
    "yoga for flexibility",
    "fascia deep release",
    "yin yoga recovery",
    "connective tissue stretch"
  ],
  openGraph: {
    title: "60-Minute Yin Flexibility Flow | Yoga Sequences | YoflowAI",
    description: "A passive, deep 60-minute Yin yoga sequence focusing on flexibility, hips, and hamstrings.",
    url: "https://yoflow.app/yoga-sequences/flexibility",
    siteName: "YoflowAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "60-Minute Yin Flexibility Flow | Yoga Sequences | YoflowAI",
    description: "A passive, deep 60-minute Yin yoga sequence focusing on flexibility, hips, and hamstrings.",
  }
};

export default function FlexibilitySequencePage() {
  const flow = STATIC_FLOWS.flexibility;
  const otherFlows = [
    { title: "60-Min Beginner Vinyasa", slug: "beginners", style: "Vinyasa" },
    { title: "60-Min Ashtanga Strength", slug: "strength", style: "Ashtanga" }
  ];

  return <StaticSequenceViewer flow={flow} otherFlows={otherFlows} />;
}
