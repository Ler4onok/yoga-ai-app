"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { STATIC_FLOWS } from "@/lib/staticFlows";

const staticFlowsList = Object.values(STATIC_FLOWS).map((flow) => ({
  title: flow.title,
  slug: flow.slug,
  style: flow.style,
  difficulty: flow.difficulty,
  focus: flow.focus,
}));

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Intermediate: "bg-amber-50 text-amber-600 border-amber-100",
  Advanced: "bg-rose-50 text-rose-600 border-rose-100",
};

export function StaticFlowsDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        id="static-flows-dropdown-btn"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest focus:outline-none"
      >
        Static Flows
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute right-0 top-full mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
          dropdownOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 pt-4 pb-2">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
            Pre-built Sequences
          </p>
        </div>

        <div className="py-2 px-2">
          {staticFlowsList.map((flow) => (
            <Link
              key={flow.slug}
              href={`/yoga-sequences/${flow.slug}`}
              onClick={() => setDropdownOpen(false)}
              className="group flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-blue-50/60 transition-all duration-150"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all">
                <span className="text-lg">🧘</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                  {flow.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{flow.style}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                  <span
                    className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${DIFFICULTY_COLORS[flow.difficulty] ?? "bg-gray-50 text-gray-500 border-gray-100"}`}
                  >
                    {flow.difficulty}
                  </span>
                </div>
              </div>
              <svg
                className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 mt-1 flex-shrink-0 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="px-4 pb-4 pt-2 border-t border-gray-50">
          <Link
            href="/generate-asanas"
            onClick={() => setDropdownOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-blue-700 hover:to-indigo-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
          >
            Build Custom Flow
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
