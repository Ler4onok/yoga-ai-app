import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-8 uppercase">About <span className="text-blue-600">YoflowAI</span></h1>
        
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            YoflowAI was born from a simple belief: that everyone deserves a yoga practice tailored to their unique body, goals, and schedule, without the need for an expensive private instructor.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-8">
            Our mission is to democratize personalized wellness through artificial intelligence. We combine ancient yoga traditions with state-of-the-art generative models to create flows that are biomechanically sound, spiritually grounded, and perfectly adapted to you.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How It Works</h2>
          <p className="text-gray-600 mb-8">
            Behind the scenes, YoflowAI uses advanced LLMs trained on thousands of hours of yoga teacher training curriculum. When you tell us your focus, intensity, and limitations, our AI doesn&apos;t just pick a sequence—it understands the relationship between poses to ensure a safe and effective transition.
          </p>

          <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100 mt-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Mindful Technology</h3>
            <p className="text-blue-800/80">
              We believe technology should serve our physical and mental well-being, not distract from it. YoflowAI is designed to be a tool that helps you reconnect with your body and breath.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/generate-asanas" className="px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
            Start Your Flow
          </Link>
        </div>
      </div>
    </div>
  );
}
