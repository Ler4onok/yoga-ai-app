"use client";

import Link from "next/link";
import { YogaIcon } from "@/components/YogaIcon";
// import { useConvexAuth } from "convex/react";
// import { SignInButton } from "@clerk/nextjs";

const Home = () => {
  // const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50/30 flex items-center justify-center p-6 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: "2s" }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse" style={{ animationDelay: "4s" }}></div>

      <div className="max-w-4xl w-full z-10">
        <div className="bg-white/60 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-white flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-1000">

          <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500">
            <YogaIcon className="w-12 h-12" strokeWidth={1.5} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-tight mb-6">
            Intelligent <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Yoga Sequencing
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium mb-12 max-w-2xl leading-relaxed">
            Build your perfect practice in seconds. Tell our AI your physical needs, time constraints, and goals to generate a beautifully structured flow just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href="/generate-asanas"
              className="group relative px-10 py-5 bg-blue-600 text-white rounded-3xl font-black text-sm tracking-[0.2em] shadow-xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 uppercase overflow-hidden flex items-center justify-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                START FLOW BUILDER
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            {[
              { icon: '🎯', title: 'Personalized', desc: 'Flows tailored exactly to your body and time limits.' },
              { icon: '⚡', title: 'Instant', desc: 'AI generates a structurally sound class in seconds.' },
              { icon: '🧘‍♀️', title: 'Visual', desc: 'Detailed asana cues and visual pose references.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white/50 p-6 rounded-[2rem] border border-white hover:bg-white hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
