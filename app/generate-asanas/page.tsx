"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import YogaFilters, { YogaFormData } from "@/components/YogaFilters";
import YogaFlowPreview from "@/components/YogaFlowPreview";

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

const GenerateAsanas = () => {
  const [uiState, setUiState] = useState<UIState>("FILTERS");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<YogaFormData | null>(null);
  const [flow, setFlow] = useState<YogaFlow | null>(null);
  const [visibleAsanaCount, setVisibleAsanaCount] = useState(0);
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
              <button 
                onClick={onBackToFilters}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 uppercase tracking-widest text-xs"
              >
                Start New Flow
              </button>
            </div>

            {/* Timing Overview Grid */}
            <div className="bg-white/60 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-sm border border-white">
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

            {/* Asana List */}
            <div className="space-y-20">
              {flow.sections.map((section, sIdx) => {
                return (
                  <div key={sIdx} className="relative">
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
                              <div className="w-full lg:w-72 h-56 bg-gray-50 rounded-[2rem] overflow-hidden relative flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                  <span className="text-5xl drop-shadow-sm">🧘‍♀️</span>
                                </div>
                                <div className="absolute top-4 left-4">
                                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm shadow-sm rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-700">
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
