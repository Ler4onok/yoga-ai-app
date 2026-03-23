"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import React, { useState } from "react";
import YogaFilters, { YogaFormData } from "@/components/YogaFilters";
import YogaFlowPreview from "@/components/YogaFlowPreview";
import { getAsanaImage } from "@/lib/asanaMapper";
import Image from "next/image";

interface Asana {
  name: string;
  sanskritName?: string;
  clues?: string;
  description: string;
  duration?: string;
  transition?: string;
  image: string | null;
}

interface Section {
  title: string;
  asanas: Asana[];
}

interface YogaFlow {
  practiceOpener?: string;
  meditationClosure?: string;
  summary: {
    warmup: string;
    mainFlow: string;
    peak: string;
    coolDown: string;
  };
  sections: Section[];
}

type UIState = "FILTERS" | "PREVIEW" | "RESULT";

const SUN_SALUTATION_A = {
  title: "Sun Salutation A (Surya Namaskar A)",
  asanas: [
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "1 breath", description: "Stand tall with feet together, arms by your sides. Ground through your feet and lengthen your spine.", clues: "Root down to rise up.", transition: "Inhale as you sweep your arms out and up." },
    { name: "Upward Salute", sanskritName: "Urdhva Hastasana", duration: "Inhale", description: "Sweep your arms up overhead, bringing palms together. Look up at your thumbs.", clues: "Reach through your fingertips.", transition: "Exhale, hinge at the hips, and dive forward." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Hinge at the hips and fold forward. Let your head hang heavy and neck relax. Hands to the floor or shins.", clues: "Keep a micro-bend in the knees.", transition: "Inhale, lift up halfway to a flat back." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Lift your torso halfway up. Flatten your back and reach the crown of your head forward. Hands on shins or thighs.", clues: "Lengthen the spine.", transition: "Exhale, plant your hands, step or float back, and lower down." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Step or jump back to a high plank. Lower down halfway, keeping your elbows hugged in close to your ribs.", clues: "Keep your core engaged.", transition: "Inhale, flip to the tops of your feet and lift your chest." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Roll over your toes, straighten your arms, and lift your chest. Keep your thighs off the floor.", clues: "Draw your shoulders back and down.", transition: "Exhale, roll over your toes and send your hips up and back." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale (hold 5 breaths)", description: "Tuck your toes and lift your hips up and back. Press your hands into the mat and extend your spine.", clues: "Pedal your feet to find length.", transition: "Inhale, gaze forward, step or hop to the top of your mat." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Look forward, step or jump to the top of the mat. Lift your torso halfway up with a flat back.", clues: "Look forward to lengthen.", transition: "Exhale, fold completely." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Fold forward again, letting your head and neck relax.", clues: "Release any tension.", transition: "Inhale, root through your feet and rise all the way up." },
    { name: "Upward Salute", sanskritName: "Urdhva Hastasana", duration: "Inhale", description: "Rise all the way up with a straight back. Sweep your arms overhead.", clues: "Use your core to lift.", transition: "Exhale, release your arms by your sides." },
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "Exhale", description: "Return to standing with arms by your sides.", clues: "Find your center.", transition: "" }
  ]
};

const SUN_SALUTATION_B = {
  title: "Sun Salutation B (Surya Namaskar B)",
  asanas: [
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "1 breath", description: "Stand tall, feet together, arms by your sides.", clues: "Find stability.", transition: "Inhale, bend the knees and sweep arms up." },
    { name: "Chair Pose", sanskritName: "Utkatasana", duration: "Inhale", description: "Bend your knees and sink your hips back. Sweep your arms up alongside your ears.", clues: "Keep your weight in your heels.", transition: "Exhale, dive forward." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Straighten your legs and fold forward.", clues: "Hinge from the hips.", transition: "Inhale, lift halfway." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Lift halfway up, flat back, gaze forward.", clues: "Draw collarbones forward.", transition: "Exhale, plant hands, step/jump back and lower." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Step or jump back, lower halfway down.", clues: "Keep elbows pinned to ribs.", transition: "Inhale, pull chest through." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Pull chest through arms, thighs lifted.", clues: "Shine your heart forward.", transition: "Exhale, hips up and back." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale", description: "Lift hips up and back.", clues: "Press chest towards thighs.", transition: "Inhale, step the right foot forward, spin left heel down." },
    { name: "Warrior I (Right)", sanskritName: "Virabhadrasana I", duration: "Inhale", description: "Step right foot forward between hands. Spin left heel down. Reach arms up.", clues: "Square hips to the front.", transition: "Exhale, hands to mat, step back and lower." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Hands to mat, step right foot back, lower down.", clues: "Move with control.", transition: "Inhale, open the chest." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Lift chest, thighs off the mat.", clues: "Press into the tops of the feet.", transition: "Exhale, hips high." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale", description: "Hips up and back.", clues: "Find your breath.", transition: "Inhale, step the left foot forward, spin right heel down." },
    { name: "Warrior I (Left)", sanskritName: "Virabhadrasana I", duration: "Inhale", description: "Step left foot forward. Spin right heel down. Reach arms up.", clues: "Deep bend in the front knee.", transition: "Exhale, hands to mat, step back and lower." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Hands to mat, step back, lower.", clues: "Strong core.", transition: "Inhale, shine the heart forward." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Open the chest.", clues: "Look slightly upward.", transition: "Exhale, push hips back." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale (hold 5 breaths)", description: "Hips high, heels descending.", clues: "Reconnect with your breath.", transition: "Inhale, gaze forward, step or hop to the top." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Step or jump forward, lift halfway.", clues: "Long spine.", transition: "Exhale, fold." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Fold deeply.", clues: "Let it go.", transition: "Inhale, bend knees, sink hips, reach up." },
    { name: "Chair Pose", sanskritName: "Utkatasana", duration: "Inhale", description: "Bend knees, sink hips, reach arms up.", clues: "Squeeze thighs together.", transition: "Exhale, stand up and release arms." },
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "Exhale", description: "Straighten legs, release arms.", clues: "Return to stillness.", transition: "" }
  ]
};

const GenerateAsanas = () => {
  const [uiState, setUiState] = useState<UIState>("FILTERS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<YogaFormData | null>(null);
  const [flow, setFlow] = useState<YogaFlow | null>(null);
  const [visibleAsanaCount, setVisibleAsanaCount] = useState(0);
  const generateAsanas = useAction(api.asanas.generate);
  const [activeSequence, setActiveSequence] = useState<"CUSTOM" | "SUN_A" | "SUN_B">("CUSTOM");

  // Scroll to top when switching between Sun Salutations and Custom flow, or when UI state changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSequence, uiState]);

  const onFiltersSubmit = (data: YogaFormData) => {
    setFormData(data);
    setUiState("PREVIEW");
  };

  const onConfirmGeneration = async (refinedData: YogaFormData) => {
    setFormData(refinedData);
    setIsSubmitting(true);
    setVisibleAsanaCount(0); // Reset for animation
    try {
      const response = await generateAsanas({
        intensity: refinedData.intensity,
        style: refinedData.style,
        focus: refinedData.focus,
        duration: refinedData.duration,
        warmupPercent: refinedData.warmupPercent,
        mainFlowPercent: refinedData.mainFlowPercent,
        peakPercent: refinedData.peakPercent,
        coolDownPercent: refinedData.coolDownPercent,
        targetAreas: refinedData.targetAreas,
        targetAreasCustom: refinedData.targetAreasCustom,
        limitations: refinedData.limitations,
        limitationsCustom: refinedData.limitationsCustom,
        breathwork: refinedData.breathwork,
        meditation: refinedData.meditation,
        props: refinedData.props,
      });

      setFlow(response as unknown as YogaFlow);
      setUiState("RESULT");
      setActiveSequence("CUSTOM"); // Ensure activeSequence is CUSTOM when a new flow is generated
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Start staggering animation
      let count = 0;
      const totalAsanas = (response as unknown as YogaFlow).sections.reduce((acc, s) => acc + s.asanas.length, 0);
      const interval = setInterval(() => {
        count += 1;
        setVisibleAsanaCount(count);
        if (count >= totalAsanas) clearInterval(interval);
      }, 300); // 300ms delay between asanas
    } catch (error) {
      console.error("Error generating asanas:", error);
      alert("Failed to generate asanas. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBackToFilters = () => {
    setUiState("FILTERS");
  };

  // Helper to get global index for staggering
  let globalAsanaIndex = 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {uiState === "FILTERS" && (
          <div className="mb-12 text-center animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight mb-4 ">Flow Builder</h1>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
              Design your ideal yoga session by selecting your intensity, style, and focus area. Our AI will craft a balanced, intelligent sequence tailored just for you.
            </p>
          </div>
        )}

        {uiState === "FILTERS" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <YogaFilters onSubmit={onFiltersSubmit} defaultValues={formData || undefined} />
          </div>
        )}

        {uiState === "PREVIEW" && formData && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <YogaFlowPreview
              data={formData}
              onConfirm={(refinedData) => onConfirmGeneration(refinedData)}
              onBack={onBackToFilters}
              isGenerating={isSubmitting}
            />
          </div>
        )}

        {uiState === "RESULT" && flow && (
          <div className="space-y-12 animate-in fade-in duration-1000">
            {/* Header Card */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-white/50 gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Custom Practice</h2>
                <p className="text-gray-600 font-medium mt-2">{formData?.duration} mins • {formData?.style} • {formData?.focus}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={onBackToFilters}
                  className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-widest text-[11px] cursor-pointer"
                >
                  New Flow
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95 uppercase tracking-widest text-[11px] cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  Export PDF
                </button>
              </div>
            </div>

            {/* AI Disclaimer (Now at top) */}
            <div className="p-4 bg-gray-100/50 rounded-2xl border border-gray-200/50 text-center scale-90 md:scale-100">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                AI Content Notice: Images and sequences are AI-generated for illustrative purposes and may not be 100% anatomically precise.
              </p>
            </div>

            {/* Dynamic Sequence Header & Back Button */}
            {activeSequence !== "CUSTOM" && (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-orange-50/80 backdrop-blur-md p-6 rounded-[2rem] shadow-sm border border-orange-100 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-orange-200">
                    {activeSequence === "SUN_A" ? "☀️" : "🌅"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                      {activeSequence === "SUN_A" ? SUN_SALUTATION_A.title : SUN_SALUTATION_B.title}
                    </h2>
                    <p className="text-orange-700 font-medium text-sm mt-1">Detailed Breakdown</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSequence("CUSTOM")}
                  className="w-full md:w-auto px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm border border-gray-200 active:scale-95 uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Back to Main Flow
                </button>
              </div>
            )}

            {/* Timing Overview Grid (Only for Custom Flow) */}
            {activeSequence === "CUSTOM" && (
              <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-sm border border-white animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-xl font-black mb-8 text-gray-900 flex items-center gap-3">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                  PRACTICE STRUCTURE
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Warm-up', summary: flow.summary.warmup, color: 'text-orange-500', bg: 'bg-orange-50' },
                    { label: 'Main Flow', summary: flow.summary.mainFlow, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Peak', summary: flow.summary.peak, color: 'text-purple-500', bg: 'bg-purple-50' },
                    { label: 'Cool-down', summary: flow.summary.coolDown, color: 'text-blue-500', bg: 'bg-blue-50' }
                  ].map((pill, i) => (
                    <div key={i} className="group p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <p className={`text-[11px] font-black uppercase mb-3 tracking-widest ${pill.color}`}>{pill.label}</p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{pill.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Asana List */}
            <div className="space-y-20 print:space-y-12">
              {/* Flow Opener (Only for Custom) */}
              {activeSequence === "CUSTOM" && (
                <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-indigo-100">✨</div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Practice Opening</h3>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-indigo-900/80 font-semibold italic leading-relaxed">
                      &ldquo;{flow.practiceOpener || "Welcome to your mat. Before we begin our movement, take a moment to find a comfortable seated position. Root your sitting bones into the earth and lengthen through the crown of your head. Close your eyes and bring your awareness to your breath. Set an intention for your practice today—perhaps a word of gratitude, strength, or presence. Let this intention guide every movement and every breath as we flow through this custom sequence tailored for your body and mind."}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {(activeSequence === "CUSTOM" ? flow.sections : [{ title: activeSequence === "SUN_A" ? SUN_SALUTATION_A.title : SUN_SALUTATION_B.title, asanas: activeSequence === "SUN_A" ? SUN_SALUTATION_A.asanas : SUN_SALUTATION_B.asanas }]).map((section, sIdx) => {
                return (
                  <div key={sIdx} className="relative animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="sticky top-24 z-10 mb-10">
                      <div className="flex items-center gap-4 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl w-fit shadow-sm border border-white">
                        <div className="w-8 h-8 bg-gray-900 text-white rounded-xl flex items-center justify-center text-xs font-black">
                          {sIdx + 1}
                        </div>
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">{section.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {section.asanas.map((asana, aIdx) => {
                        const isVisible = globalAsanaIndex < visibleAsanaCount;
                        globalAsanaIndex++;

                        return (
                          <React.Fragment key={aIdx}>
                            <div
                              className={`group bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-50 p-4 md:p-6 transform transition-all duration-700 ease-out 
                                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            >
                              <div className="flex flex-col lg:flex-row gap-8">
                                {/* Visual Area (Hidden in PDF) */}
                                <div className="flex flex-col gap-3 no-print">
                                  <div className="w-full lg:w-52 h-44 bg-gray-50 rounded-[2rem] overflow-hidden relative flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
                                    {getAsanaImage(asana.name, asana.sanskritName) ? (
                                      <Image
                                        src={getAsanaImage(asana.name, asana.sanskritName)!}
                                        alt={asana.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 208px"
                                      />
                                    ) : (
                                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                        <span className="text-5xl drop-shadow-sm">🧘‍♀️</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <div className="flex justify-center">
                                      <span className="px-4 py-1.5 bg-white shadow-sm border border-gray-100/50 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-700 w-fit">
                                        {asana.duration}
                                      </span>
                                    </div>
                                    <a
                                      href={`https://www.google.com/search?q=${encodeURIComponent(asana.name)}+yoga+pose&tbm=isch`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-white text-gray-500 hover:text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-gray-100/50 hover:shadow-md no-print"
                                    >
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                      Reference Pics
                                    </a>
                                  </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 flex flex-col justify-between py-2">
                                  <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-3">
                                      <div className="flex items-center gap-2">
                                        <h4 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                          {asana.name}
                                        </h4>
                                        <button
                                          onClick={() => {
                                            navigator.clipboard.writeText(asana.name);
                                            // Simple feedback could be added here
                                          }}
                                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer no-print"
                                          title="Copy asana name"
                                        >
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                        </button>
                                      </div>
                                      {asana.sanskritName && (
                                        <p className="text-blue-600/60 font-bold italic text-sm tracking-wide bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                                          {asana.sanskritName}
                                        </p>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-base leading-relaxed font-medium mt-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                                      {asana.description}
                                    </p>

                                    {/* Inline Sequence Preview Button for Sun Salutations */}
                                    {(asana.name.toLowerCase().includes("sun salutation a") || asana.name.toLowerCase().includes("surya namaskar a")) && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => setActiveSequence("SUN_A")}
                                          className="px-6 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-all shadow-sm border border-orange-200 uppercase tracking-widest text-[11px] flex items-center gap-2 cursor-pointer"
                                        >
                                          <span>☀️</span> View Sequence Details
                                        </button>
                                      </div>
                                    )}
                                    {(asana.name.toLowerCase().includes("sun salutation b") || asana.name.toLowerCase().includes("surya namaskar b")) && (
                                      <div className="mt-4">
                                        <button
                                          onClick={() => setActiveSequence("SUN_B")}
                                          className="px-6 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-all shadow-sm border border-orange-200 uppercase tracking-widest text-[11px] flex items-center gap-2 cursor-pointer"
                                        >
                                          <span>🌅</span> View Sequence Details
                                        </button>
                                      </div>
                                    )}
                                  </div>

                                  <div className="mt-8 p-5 bg-gray-50 rounded-[1.75rem] border border-gray-100/50 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-all duration-300 no-print">
                                    <p className="text-[11px] font-black text-blue-600 uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] rounded-full animate-pulse"></span>
                                      INSTRUCTOR CLUE
                                    </p>
                                    <p className="text-gray-700 text-sm md:text-base font-semibold italic leading-relaxed">
                                      &ldquo;{asana.clues || 'Maintain continuous awareness of your breath and find stability in the posture.'}&rdquo;
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Transition bridge between asana cards */}
                            {asana.transition && aIdx < section.asanas.length - 1 && (
                              <div className="py-6 flex flex-col items-center gap-4 relative">
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-blue-200/50 no-print"></div>
                                <div className="flex items-center gap-2 text-sm text-blue-600/60 bg-white z-1">
                                  <svg className="w-4 h-4 text-blue-600/60 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                                  <span>{asana.transition}</span>
                                </div>
                                {/* Simplified print version of transition */}
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
              {/* Meditation Closure (Only for Custom) */}
              {activeSequence === "CUSTOM" && (
                <div className="bg-purple-50/50 p-8 rounded-[2.5rem] border border-purple-100/50 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-100">🕯️</div>
                    <h3 className="text-xl font-black text-gray-900 tracking-tight">Meditation Closure</h3>
                  </div>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-purple-900/80 font-semibold italic leading-relaxed">
                      &ldquo;{flow.meditationClosure || "As we conclude our physical practice, come back to a seated or reclining position. Let your body absorb the work you've done. Feel the subtle vibrations of energy moving through you. Soften your jaw, release your shoulders, and simply be. Observe the silence within. Bring back your intention from the start and hold it in your heart for a few more breaths. When you are ready, gently blink your eyes open, carrying this peace with you off the mat. Namaste."}&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAsanas;
