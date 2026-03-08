"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
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
  image: string | null;
}

interface Section {
  title: string;
  asanas: Asana[];
}

interface YogaFlow {
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
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "1 breath", description: "Stand tall with feet together, arms by your sides. Ground through your feet and lengthen your spine.", clues: "Root down to rise up." },
    { name: "Upward Salute", sanskritName: "Urdhva Hastasana", duration: "Inhale", description: "Sweep your arms up overhead, bringing palms together. Look up at your thumbs.", clues: "Reach through your fingertips." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Hinge at the hips and fold forward. Let your head hang heavy and neck relax. Hands to the floor or shins.", clues: "Keep a micro-bend in the knees." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Lift your torso halfway up. Flatten your back and reach the crown of your head forward. Hands on shins or thighs.", clues: "Lengthen the spine." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Step or jump back to a high plank. Lower down halfway, keeping your elbows hugged in close to your ribs.", clues: "Keep your core engaged." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Roll over your toes, straighten your arms, and lift your chest. Keep your thighs off the floor.", clues: "Draw your shoulders back and down." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale (hold 5 breaths)", description: "Tuck your toes and lift your hips up and back. Press your hands into the mat and extend your spine.", clues: "Pedal your feet to find length." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Look forward, step or jump to the top of the mat. Lift your torso halfway up with a flat back.", clues: "Look forward to lengthen." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Fold forward again, letting your head and neck relax.", clues: "Release any tension." },
    { name: "Upward Salute", sanskritName: "Urdhva Hastasana", duration: "Inhale", description: "Rise all the way up with a straight back. Sweep your arms overhead.", clues: "Use your core to lift." },
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "Exhale", description: "Return to standing with arms by your sides.", clues: "Find your center." }
  ]
};

const SUN_SALUTATION_B = {
  title: "Sun Salutation B (Surya Namaskar B)",
  asanas: [
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "1 breath", description: "Stand tall, feet together, arms by your sides.", clues: "Find stability." },
    { name: "Chair Pose", sanskritName: "Utkatasana", duration: "Inhale", description: "Bend your knees and sink your hips back. Sweep your arms up alongside your ears.", clues: "Keep your weight in your heels." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Straighten your legs and fold forward.", clues: "Hinge from the hips." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Lift halfway up, flat back, gaze forward.", clues: "Draw collarbones forward." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Step or jump back, lower halfway down.", clues: "Keep elbows pinned to ribs." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Pull chest through arms, thighs lifted.", clues: "Shine your heart forward." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale", description: "Lift hips up and back.", clues: "Press chest towards thighs." },
    { name: "Warrior I (Right)", sanskritName: "Virabhadrasana I", duration: "Inhale", description: "Step right foot forward between hands. Spin left heel down. Reach arms up.", clues: "Square hips to the front." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Hands to mat, step right foot back, lower down.", clues: "Move with control." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Lift chest, thighs off the mat.", clues: "Press into the tops of the feet." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale", description: "Hips up and back.", clues: "Find your breath." },
    { name: "Warrior I (Left)", sanskritName: "Virabhadrasana I", duration: "Inhale", description: "Step left foot forward. Spin right heel down. Reach arms up.", clues: "Deep bend in the front knee." },
    { name: "Four-Limbed Staff Pose", sanskritName: "Chaturanga Dandasana", duration: "Exhale", description: "Hands to mat, step back, lower.", clues: "Strong core." },
    { name: "Upward-Facing Dog", sanskritName: "Urdhva Mukha Svanasana", duration: "Inhale", description: "Open the chest.", clues: "Look slightly upward." },
    { name: "Downward-Facing Dog", sanskritName: "Adho Mukha Svanasana", duration: "Exhale (hold 5 breaths)", description: "Hips high, heels descending.", clues: "Reconnect with your breath." },
    { name: "Halfway Lift", sanskritName: "Ardha Uttanasana", duration: "Inhale", description: "Step or jump forward, lift halfway.", clues: "Long spine." },
    { name: "Standing Forward Fold", sanskritName: "Uttanasana", duration: "Exhale", description: "Fold deeply.", clues: "Let it go." },
    { name: "Chair Pose", sanskritName: "Utkatasana", duration: "Inhale", description: "Bend knees, sink hips, reach arms up.", clues: "Squeeze thighs together." },
    { name: "Mountain Pose", sanskritName: "Tadasana", duration: "Exhale", description: "Straighten legs, release arms.", clues: "Return to stillness." }
  ]
};

const GenerateAsanas = () => {
  const [uiState, setUiState] = useState<UIState>("FILTERS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<YogaFormData | null>(null);
  const [flow, setFlow] = useState<YogaFlow | null>(null);
  const [visibleAsanaCount, setVisibleAsanaCount] = useState(0);
  const [activeSequence, setActiveSequence] = useState<"CUSTOM" | "SUN_A" | "SUN_B">("CUSTOM");
  const generateAsanas = useAction(api.asanas.generate);

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
                  className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 active:scale-95 uppercase tracking-widest text-[10px]"
                >
                  Start New Flow
                </button>
              </div>
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
                  className="w-full md:w-auto px-6 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm border border-gray-200 active:scale-95 uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
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
                      <p className={`text-[10px] font-black uppercase mb-3 tracking-widest ${pill.color}`}>{pill.label}</p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">{pill.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Asana List */}
            <div className="space-y-20">
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
                          <div
                            key={aIdx}
                            className={`group bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-50 p-4 md:p-6 transform transition-all duration-700 ease-out 
                              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                          >
                            <div className="flex flex-col lg:flex-row gap-8">
                              {/* Visual Area */}
                              <div className="flex flex-col gap-3">
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

                                <div className="flex justify-center">
                                  <span className="px-4 py-1.5 bg-white shadow-sm border border-gray-100/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-700 w-fit">
                                    {asana.duration}
                                  </span>
                                </div>
                              </div>

                              {/* Content Area */}
                              <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                  <div className="flex flex-wrap items-center gap-4 mb-3">
                                    <h4 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                      {asana.name}
                                    </h4>
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
                                        className="px-6 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-all shadow-sm border border-orange-200 uppercase tracking-widest text-[10px] flex items-center gap-2"
                                      >
                                        <span>☀️</span> View Sequence Details
                                      </button>
                                    </div>
                                  )}
                                  {(asana.name.toLowerCase().includes("sun salutation b") || asana.name.toLowerCase().includes("surya namaskar b")) && (
                                    <div className="mt-4">
                                      <button
                                        onClick={() => setActiveSequence("SUN_B")}
                                        className="px-6 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold hover:bg-orange-100 transition-all shadow-sm border border-orange-200 uppercase tracking-widest text-[10px] flex items-center gap-2"
                                      >
                                        <span>🌅</span> View Sequence Details
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <div className="mt-8 p-5 bg-gray-50 rounded-[1.75rem] border border-gray-100/50 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-all duration-300">
                                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
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
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAsanas;
