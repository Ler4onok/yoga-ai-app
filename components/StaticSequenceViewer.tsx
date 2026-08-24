"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAsanaImage } from "@/lib/asanaMapper";
import { YogaFlow } from "@/lib/staticFlows";

interface StaticSequenceViewerProps {
  flow: YogaFlow;
  otherFlows: { title: string; slug: string; style: string }[];
}

export default function StaticSequenceViewer({ flow, otherFlows }: StaticSequenceViewerProps) {
  const [showNotes, setShowNotes] = useState(true);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": flow.title,
    "description": flow.description,
    "totalTime": `PT${flow.duration}M`,
    "step": flow.sections.flatMap((section, sIdx) =>
      section.asanas.map((asana, aIdx) => ({
        "@type": "HowToStep",
        "name": asana.name,
        "text": `${asana.description}${asana.clues ? ` Note: ${asana.clues}` : ""}`,
        "position": sIdx * 20 + aIdx + 1
      }))
    )
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Back Link */}
        <div className="mb-8 no-print">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-12 bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-blue-105">
              Sequence Profile
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none mt-4 uppercase">
              {flow.title}
            </h1>
            <p className="text-gray-600 font-medium text-lg mt-3 max-w-2xl leading-relaxed">
              {flow.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm font-semibold text-gray-500">
              <span>{flow.duration} Mins</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span className="capitalize">{flow.style} Style</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span className="capitalize">{flow.focus} Practice</span>
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <span className="capitalize">{flow.difficulty} Level</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-3 rounded-2xl border border-gray-100 no-print shadow-sm self-start md:self-auto">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Instructor Notes</span>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`relative w-[58px] inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none ${showNotes ? "bg-blue-600 shadow-inner" : "bg-gray-200 shadow-inner"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${showNotes ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>
        </div>

        {/* AI Disclaimer (Standard banner matching flow generation style) */}
        <div className="mb-12 p-4 bg-gray-100/50 rounded-2xl border border-gray-200/50 text-center scale-90 md:scale-100">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Content Notice: Images are AI-generated for illustrative purposes and may not be 100% anatomically precise.
          </p>
        </div>

        {/* Asana List */}
        <div className="space-y-20 print:space-y-12">

          {/* Practice Opener */}
          {flow.practiceOpener && (
            <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-indigo-100">✨</div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Practice Opening</h3>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-indigo-900/80 font-semibold italic leading-relaxed">
                  &ldquo;{flow.practiceOpener}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Flow Sections */}
          {flow.sections.map((section, sIdx) => {
            return (
              <div key={sIdx} className="relative animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Section Header */}
                <div className="sticky top-24 z-10 mb-10">
                  <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl w-fit shadow-sm border border-white">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-xs font-black">
                      {sIdx + 1}
                    </div>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">{section.title}</h3>
                  </div>
                </div>

                {/* Pose cards */}
                <div className="space-y-8">
                  {section.asanas.map((asana, aIdx) => {
                    const img = getAsanaImage(asana.name, asana.sanskritName);
                    console.log({ a: asana.name, i: img, aa: getAsanaImage(asana.name, asana.sanskritName) })
                    return (
                      <React.Fragment key={aIdx}>
                        <div className="group bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8 transform transition-all duration-700 ease-out opacity-100 translate-y-0">
                          <div className="flex flex-col lg:flex-row gap-10">

                            {/* Visual Area */}
                            <div className="flex flex-col gap-4 no-print flex-shrink-0">
                              <div className="w-full lg:w-64 h-56 bg-transparent rounded-[2.5rem] overflow-hidden relative group-hover:scale-[1.03] transition-all duration-500">
                                {img ? (
                                  <Image
                                    src={img}
                                    alt={asana.name}
                                    fill
                                    className="object-contain mix-blend-multiply filter contrast-[1.1] brightness-[1.05]"
                                    sizes="(max-width: 1024px) 100vw, 256px"
                                  />
                                ) : (
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-6xl drop-shadow-sm mb-4">🧘‍♀️</span>
                                    <div className="w-full flex flex-col items-end gap-2">
                                      <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-tight">
                                        no pic generated,<br />see references below
                                      </p>
                                      <svg className="w-4 h-4 text-end text-indigo-300 mb-[-60px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center justify-between px-2">
                                <span className="px-4 py-2 bg-blue-50/50 text-blue-700 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-blue-100/50">
                                  {asana.duration}
                                </span>
                                <a
                                  href={`https://www.google.com/search?q=${encodeURIComponent(asana.name)}+yoga+pose&tbm=isch`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all no-print flex items-center gap-2 group/link"
                                  title="Reference Pics"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-[10px] font-black uppercase tracking-widest">REFS</span>
                                </a>
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="space-y-1 mb-6">
                                  <h4 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                    {asana.name}
                                  </h4>
                                  {asana.sanskritName && (
                                    <p className="text-indigo-500 font-bold italic text-lg tracking-wide">
                                      {asana.sanskritName}
                                    </p>
                                  )}
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                  {asana.description}
                                </p>
                              </div>

                              {/* Instructor Notes */}
                              {showNotes && asana.clues && (
                                <div className="mt-8 group/clue relative">
                                  <div className="absolute inset-0 bg-blue-600/5 blur-2xl rounded-[3rem] group-hover/clue:bg-blue-600/10 transition-colors duration-500 no-print" />
                                  <div className="relative p-6 md:p-8 bg-blue-50/30 backdrop-blur-sm rounded-[2.5rem] border border-blue-100/50 no-print">
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                      </div>
                                      <p className="text-[11px] font-black text-blue-800 uppercase tracking-[0.25em]">
                                        Instructor&apos;s Note
                                      </p>
                                    </div>
                                    <p className="text-gray-800 text-lg font-semibold italic leading-relaxed">
                                      &ldquo;{asana.clues}&rdquo;
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                          </div>
                        </div>

                        {/* Transition bridge */}
                        {asana.transition && aIdx < section.asanas.length - 1 && (
                          <div className="py-6 flex flex-col items-center gap-4 relative">
                            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-blue-200/50 no-print"></div>
                            <div className="flex items-center gap-2 text-sm text-blue-600/60 bg-white z-1">
                              <svg className="w-4 h-4 text-blue-600/60 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                              </svg>
                              <span>{asana.transition}</span>
                            </div>
                            <div className="hidden print:block w-full border-t border-gray-100 py-1">
                              <p className="text-[7pt] italic font-bold text-blue-600/60 leading-tight">
                                Next: {asana.transition}
                              </p>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

              </div>
            );
          })}

          {/* Meditation Closure */}
          {flow.meditationClosure && (
            <div className="bg-purple-50/50 p-8 rounded-[2.5rem] border border-purple-100/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-100">🕯️</div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Meditation Closure</h3>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg text-purple-900/80 font-semibold italic leading-relaxed">
                  &ldquo;{flow.meditationClosure}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Action Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 no-print">
            <Link
              href="/generate-asanas"
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-bold text-center transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              Create Your Custom Flow
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-12 py-5 bg-white text-gray-950 border border-gray-200 rounded-[2rem] font-bold hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-widest text-xs cursor-pointer flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Export PDF
            </button>
          </div>

          {/* Link to other flows - Excellent for internal linking SEO and bounce rate */}
          <div className="bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-blue-500/5 text-center no-print">
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase mb-2">Explore More Static Sequences</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xl mx-auto">
              Looking for a different intensity or focus? Explore our other pre-structured 60-minute practices created by certified teachers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {otherFlows.map((otherFlow, idx) => (
                <Link
                  key={idx}
                  href={`/yoga-sequences/${otherFlow.slug}`}
                  className="px-6 py-4 bg-white text-blue-600 border border-blue-100 hover:border-blue-300 hover:shadow-md rounded-2xl font-bold uppercase tracking-widest text-[11px] transition-all active:scale-95"
                >
                  {otherFlow.title} ({otherFlow.style})
                </Link>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
