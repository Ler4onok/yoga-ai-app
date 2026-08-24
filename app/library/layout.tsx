import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yoga Asana Library | YoflowAI Poses Directory",
  description: "Browse our comprehensive directory of yoga asanas and poses. Learn Sanskrit names, explore details, and find the perfect poses for your custom yoga flows.",
  keywords: [
    "asana library", "asana poses", "asanas", "yoga poses directory",
    "yoga pose guide", "sanskrit yoga names", "yoga library", "asana list", "yoga poses"
  ],
  openGraph: {
    title: "Yoga Asana Library | YoflowAI Poses Directory",
    description: "Browse our comprehensive directory of yoga asanas and poses. Learn Sanskrit names, explore details, and find the perfect poses for your custom yoga flows.",
    url: "https://yoflow.app/library",
    siteName: "YoflowAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoga Asana Library | YoflowAI Poses Directory",
    description: "Browse our comprehensive directory of yoga asanas and poses. Learn Sanskrit names, explore details, and find the perfect poses for your custom yoga flows.",
  }
};

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
