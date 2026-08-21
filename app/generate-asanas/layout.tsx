import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Yoga Flow Builder | Generate Custom Yoga Flows | YoflowAI",
  description: "Design your perfect yoga practice in seconds. Try the AI-powered YoflowAI Builder to generate a flow, create a custom flow, or build a personalized yoga practice tailored to your goals.",
  keywords: [
    "yoga flow",
    "generate yoga flow",
    "create a yoga flow",
    "build a yoga flow",
    "generate asanas",
    "yoga flow builder",
    "AI yoga sequence generator",
    "custom yoga flow creator",
    "creative yoga sequencing",
    "perfect yoga practice generator"
  ],
  openGraph: {
    title: "AI Yoga Flow Builder | Generate Custom Yoga Flows | YoflowAI",
    description: "Design your perfect yoga practice in seconds. Try the AI-powered YoflowAI Builder to generate a flow, create a custom flow, or build a personalized yoga practice.",
    url: "https://yoflow.app/generate-asanas",
    siteName: "YoflowAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Yoga Flow Builder | Generate Custom Yoga Flows | YoflowAI",
    description: "Design your perfect yoga practice in seconds. Try the AI-powered YoflowAI Builder to generate a flow, create a custom flow, or build a personalized yoga practice.",
  }
};

export default function GenerateAsanasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
