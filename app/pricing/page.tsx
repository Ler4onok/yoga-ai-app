import React from "react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4 uppercase">Pricing <span className="text-blue-600">Plans</span></h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            Choose the plan that fits your practice. Simple, transparent, and built for growth.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest">
              Limited Time
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase mb-2">Free Beta</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">/month</span>
              </div>
            </div>

            <ul className="space-y-6 mb-10">
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-gray-600 font-medium">3 AI Generations per day</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-gray-600 font-medium">Custom focus & style selection</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-gray-600 font-medium">PDF Export included</span>
              </li>
              <li className="flex items-center gap-4 opacity-50">
                <div className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-gray-400 font-medium line-through">Unlimited lifetime history</span>
              </li>
            </ul>

            <Link href="/generate-asanas" className="block w-full py-5 bg-gray-900 text-white rounded-[2rem] font-bold text-center uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95">
              Get Started for Free
            </Link>
          </div>
          
          <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-8">
            * Free during our early access beta phase
          </p>
        </div>
      </div>
    </div>
  );
}
