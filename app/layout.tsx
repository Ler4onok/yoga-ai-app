import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YoflowAI | Intelligent Yoga Flow Generator",
  description: "Build your perfect yoga practice in seconds. YoflowAI generates beautiful, personalized yoga flows tailored to your body, goals, and time constraints. Discover smart sequences, visual guidance, and expert cues.",
  keywords: ["yoga", "yoga flow", "yoga sequence", "yoga generator", "AI yoga", "vinyasa", "hatha", "custom yoga flow", "yoga planner", "yoga routines"],
  authors: [{ name: "YoflowAI Team" }],
  creator: "YoflowAI",
  publisher: "YoflowAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "YoflowAI | Intelligent Yoga Flow Generator",
    description: "Build your perfect yoga practice in seconds. AI-generated, personalized yoga flows tailored to your goals.",
    url: "https://yoflow.app",
    siteName: "YoflowAI",
    images: [
      {
        url: "https://yoflow.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YoflowAI - Intelligent Yoga Flow Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YoflowAI | Intelligent Yoga Flow Generator",
    description: "Build your perfect yoga practice in seconds. AI-generated, personalized yoga flows tailored to your goals.",
    images: ["https://yoflow.app/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div>
            <Header />
            <main >
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </ConvexClerkProvider >
  );
}

