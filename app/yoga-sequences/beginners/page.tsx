import React from "react";
import type { Metadata } from "next";
import StaticSequenceViewer from "@/components/StaticSequenceViewer";
import { STATIC_FLOWS } from "@/lib/staticFlows";

export const metadata: Metadata = {
  title: "60-Minute Beginner Vinyasa Flow | Yoga Sequences | YoflowAI",
  description: "A curated, beginner-friendly 60-minute Vinyasa yoga sequence. Connect breath with movement, open your spine, and learn foundational postures like Downward Dog and Warrior I.",
  alternates: {
    canonical: "https://yoflow.app/yoga-sequences/beginners"
  },
  keywords: [
    "beginner vinyasa flow",
    "60 minute yoga flow",
    "yoga sequence for beginners",
    "vinyasa yoga practice",
    "learn yoga sequence",
    "foundational yoga poses",
    "beginner flow guide"
  ],
  openGraph: {
    title: "60-Minute Beginner Vinyasa Flow | Yoga Sequences | YoflowAI",
    description: "A curated, beginner-friendly 60-minute Vinyasa yoga sequence. Connect breath with movement, open your spine, and learn foundational postures.",
    url: "https://yoflow.app/yoga-sequences/beginners",
    siteName: "YoflowAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "60-Minute Beginner Vinyasa Flow | Yoga Sequences | YoflowAI",
    description: "A curated, beginner-friendly 60-minute Vinyasa yoga sequence. Connect breath with movement, open your spine, and learn foundational postures.",
  }
};

export default function BeginnersSequencePage() {
  const flow = STATIC_FLOWS.beginners;
  const otherFlows = [
    { title: "60-Min Yin Flexibility", slug: "flexibility", style: "Yin" },
    { title: "60-Min Ashtanga Strength", slug: "strength", style: "Ashtanga" }
  ];

  return <StaticSequenceViewer flow={flow} otherFlows={otherFlows} />;
}
