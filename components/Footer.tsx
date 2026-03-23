"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { YogaIcon } from "./YogaIcon";


const Footer = () => {
  const [year, setYear] = useState<number | string>("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <YogaIcon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-lg font-black text-gray-900 tracking-tighter uppercase">
                Yoflow<span className="text-blue-600">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Empowering your yoga journey through artificial intelligence. Generate personalized flows that adapt to your body, your goals, and your schedule.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
              <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer">
                <span className="sr-only">Instagram</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/generate-asanas" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Flow Builder</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Asana Library</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            © {year} YoflowAI. All rights reserved.
          </p>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-medium">
            Designed for mindful movement
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
