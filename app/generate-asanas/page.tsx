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
    <div className="p-8 max-w-5xl mx-auto min-h-screen bg-gray-50/50">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">
        Yoga Flow Builder
      </h1>
      
      {uiState === "FILTERS" && (
        <YogaFilters onSubmit={onFiltersSubmit} defaultValues={formData || undefined} />
      )}

      {uiState === "PREVIEW" && formData && (
        <YogaFlowPreview 
          data={formData} 
          onConfirm={(refinedData) => onConfirmGeneration(refinedData)} 
          onBack={onBackToFilters}
          isGenerating={isSubmitting}
        />
      )}

      {uiState === "RESULT" && flow && (
        <div className="space-y-12 animate-in fade-in duration-1000">
          <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
               <h2 className="text-xl font-bold text-gray-900">Your Custom Practice</h2>
               <p className="text-gray-500 text-sm">Generated for {formData?.duration} mins • {formData?.style}</p>
            </div>
            <button 
              onClick={onBackToFilters}
              className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors border border-blue-100"
            >
              Start New Flow
            </button>
          </div>

          {/* Timing Overview */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50">
            <h2 className="text-2xl font-bold mb-8 text-blue-900 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">P</span>
              Practice Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Warm-up', summary: flow.summary.warmup, color: 'orange' },
                { label: 'Main Flow', summary: flow.summary.mainFlow, color: 'green' },
                { label: 'Peak', summary: flow.summary.peak, color: 'purple' },
                { label: 'Cool-down', summary: flow.summary.coolDown, color: 'blue' }
              ].map((pill, i) => (
                <div key={i} className={`p-4 rounded-2xl border bg-${pill.color}-50/50 border-${pill.color}-100`}>
                  <p className={`text-xs font-bold text-${pill.color}-800 uppercase mb-2`}>{pill.label}</p>
                  <p className="text-sm text-gray-600 leading-snug line-clamp-3">{pill.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Asana Flow List */}
          <div className="space-y-16">
            {flow.sections.map((section, sIdx) => (
              <div key={sIdx} className="relative">
                <div className="sticky top-4 z-10 mb-8">
                  <div className="flex items-center gap-4 bg-gray-50/80 backdrop-blur-md py-2 pr-4 rounded-full w-fit">
                    <div className="w-10 h-10 bg-white shadow-sm border border-gray-200 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {sIdx + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 uppercase tracking-widest text-sm">{section.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {section.asanas.map((asana, aIdx) => {
                    const isVisible = globalAsanaIndex < visibleAsanaCount;
                    globalAsanaIndex++;
                    
                    return (
                      <div 
                        key={aIdx} 
                        className={`group bg-white rounded-3xl shadow-sm border border-gray-100 p-2 transform transition-all duration-700 ease-out 
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      >
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          {/* Image Placeholder */}
                          <div className="w-full md:w-48 h-32 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center relative flex-shrink-0">
                            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.44,2.3c-2.45,4.6-2.58,6.86-1,8.37c1.76,1.68,5,1,5.16,3.61c0.08,1.3-0.53,2.44-0.53,3.75c0,1.48,1.15,2.46,1.15,4.1  c0,1.31-0.78,1.88-0.78,3.28c0,1.48,0.78,1.8,0.78,3.28c0,1.64-0.9,2.21-0.9,4c0,1.31,0.74,1.8,0.74,3.11c0,1.48-0.74,1.64-0.74,3.11  c0,1.8,1.06,2.21,1.06,4c0,1.31-0.82,2.05-0.82,3.36c0,1.48,0.82,2.05,0.82,3.36c0,1.64-0.86,2.3-0.86,3.93c0,1.31,0.7,2.21,0.7,3.52  c0,1.48-0.7,2.21-0.7,3.52c0,1.8,1,2.05,1,3.85c0,1.31-0.66,2.54-0.66,3.85s0.66,2.54,0.66,3.85c0,1.64-0.78,2.79-0.78,4.43  c0,1.31,0.57,2.79,0.57,4.1s-0.57,2.79-0.57,4.1c0,1.8,0.82,2.71,0.82,4.51c0,1.31-0.53,3.12-0.53,4.43"/>
                              </svg>
                            </div>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest text-center px-4">Yoga Visual Placeholder</span>
                          </div>

                          {/* Content Row */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-center pr-6 py-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors uppercase leading-tight">
                                  {asana.name}
                                </h4>
                                {asana.duration && (
                                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg text-[10px] font-bold border border-gray-200 uppercase whitespace-nowrap">
                                    {asana.duration}
                                  </span>
                                )}
                              </div>
                              {asana.sanskritName && (
                                <p className="text-blue-500 font-bold italic text-sm mt-1">{asana.sanskritName}</p>
                              )}
                            </div>
                            
                            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100/50">
                              <p className="text-xs font-black text-blue-800 uppercase mb-1 tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                                Teaching Clue
                              </p>
                              <p className="text-gray-700 text-sm italic font-medium">&ldquo;{asana.clues || 'Focus on steady breath and alignment.'}&rdquo;</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateAsanas;
