import { useState, useRef } from "react";
import { YogaFormData } from "./YogaFilters";

interface YogaFlowPreviewProps {
  data: YogaFormData;
  onConfirm: (data: YogaFormData) => void;
  onBack: () => void;
  isGenerating: boolean;
}

const IntegratedTimingSlider = ({
  percentages,
  onChange
}: {
  percentages: { warmup: number; main: number; peak: number; cool: number };
  onChange: (newP: { warmup: number; main: number; peak: number; cool: number }) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (index: number, clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = Math.round(((clientX - rect.left) / rect.width) * 100);

    const minSection = 5;
    const boundaries = [
      percentages.warmup,
      percentages.warmup + percentages.main,
      percentages.warmup + percentages.main + percentages.peak
    ];

    const newBoundaries = [...boundaries];

    if (index === 0) {
      newBoundaries[0] = Math.max(minSection, Math.min(percent, boundaries[1] - minSection));
    } else if (index === 1) {
      newBoundaries[1] = Math.max(boundaries[0] + minSection, Math.min(percent, boundaries[2] - minSection));
    } else if (index === 2) {
      newBoundaries[2] = Math.max(boundaries[1] + minSection, Math.min(percent, 100 - minSection));
    }

    onChange({
      warmup: newBoundaries[0],
      main: newBoundaries[1] - newBoundaries[0],
      peak: newBoundaries[2] - newBoundaries[1],
      cool: 100 - newBoundaries[2]
    });
  };

  const startDrag = (index: number) => {
    const onMouseMove = (e: MouseEvent) => handleDrag(index, e.clientX);
    const onTouchMove = (e: TouchEvent) => handleDrag(index, e.touches[0].clientX);
    const onEnd = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onEnd);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onEnd);
  };

  return (
    <div className="space-y-6 pt-4">
      <div
        ref={containerRef}
        className="relative h-12 w-full bg-gray-100/50 rounded-2xl overflow-visible flex cursor-pointer select-none border-4 border-white shadow-inner"
      >
        <div style={{ width: `${percentages.warmup}%` }} className="h-full bg-orange-400 transition-all duration-75 first:rounded-l-xl flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter overflow-hidden">
          {percentages.warmup}%
        </div>
        <div style={{ width: `${percentages.main}%` }} className="h-full bg-green-400 transition-all duration-75 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter overflow-hidden border-l-2 border-white/20">
          {percentages.main}%
        </div>
        <div style={{ width: `${percentages.peak}%` }} className="h-full bg-purple-400 transition-all duration-75 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter overflow-hidden border-l-2 border-white/20">
          {percentages.peak}%
        </div>
        <div style={{ width: `${percentages.cool}%` }} className="h-full bg-blue-400 transition-all duration-75 last:rounded-r-xl flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter overflow-hidden border-l-2 border-white/20">
          {percentages.cool}%
        </div>

        {/* Drag Handles */}
        {[percentages.warmup, percentages.warmup + percentages.main, percentages.warmup + percentages.main + percentages.peak].map((pos, i) => (
          <div
            key={i}
            onMouseDown={() => startDrag(i)}
            onTouchStart={() => startDrag(i)}
            style={{ left: `${pos}%` }}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-10 cursor-col-resize z-10 group flex items-center justify-center"
          >
            <div className="w-1.5 h-full bg-white rounded-full shadow-md group-hover:scale-y-110 group-hover:w-2 transition-all border border-gray-100 flex flex-col justify-center items-center gap-1">
              <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
              <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { label: 'Warm', color: 'text-orange-600', val: percentages.warmup },
          { label: 'Main', color: 'text-green-600', val: percentages.main },
          { label: 'Peak', color: 'text-purple-600', val: percentages.peak },
          { label: 'Cool', color: 'text-blue-600', val: percentages.cool },
        ].map((item, i) => (
          <div key={i}>
            <div className={`text-[10px] font-black uppercase ${item.color}`}>{item.label}</div>
            <div className="text-sm font-bold text-gray-900">{item.val}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const YogaFlowPreview = ({ data, onConfirm, onBack, isGenerating }: YogaFlowPreviewProps) => {
  const [timing, setTiming] = useState({
    warmup: data.warmupPercent,
    main: data.mainFlowPercent,
    peak: data.peakPercent,
    cool: data.coolDownPercent
  });

  const numAsanas = Math.max(4, Math.floor(data.duration / 4));

  const warmupCount = Math.max(1, Math.round(numAsanas * (timing.warmup / 100)));
  const peakCount = Math.max(1, Math.round(numAsanas * (timing.peak / 100)));
  const coolDownCount = Math.max(1, Math.round(numAsanas * (timing.cool / 100)));
  const mainFlowCount = Math.max(1, numAsanas - warmupCount - peakCount - coolDownCount);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-700">
      <div className="bg-white/80 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-white/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Refine Your Flow</h2>
            <p className="text-gray-600 font-semibold text-base mt-1 italic opacity-80">Tailor the rhythm and focus before the AI begins its craft</p>
          </div>
          <button
            onClick={onBack}
            className="group flex items-center gap-3 px-5 h-12 bg-gray-50 hover:bg-white hover:shadow-xl rounded-2xl transition-all active:scale-90 border border-gray-100"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[10px] font-black text-gray-400 group-hover:text-gray-900 tracking-[0.2em] uppercase">Adjust parameters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white/40 p-6 md:p-8 rounded-[2rem] border border-white/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-4 right-4 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-4">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                TIMING ARCHITECTURE
              </h3>

              <IntegratedTimingSlider
                percentages={timing}
                onChange={setTiming}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Warm-up', info: 'Joint prep', color: 'bg-orange-400', border: 'border-orange-100', count: warmupCount, min: Math.round(data.duration * (timing.warmup / 100)) },
                { label: 'Main Flow', info: 'Strength', color: 'bg-green-400', border: 'border-green-100', count: mainFlowCount, min: Math.round(data.duration * (timing.main / 100)) },
                { label: 'Peak Sequence', info: 'Intensity', color: 'bg-purple-400', border: 'border-purple-100', count: peakCount, min: Math.round(data.duration * (timing.peak / 100)) },
                { label: 'Integration', info: 'Recovery', color: 'bg-blue-400', border: 'border-blue-100', count: coolDownCount, min: Math.round(data.duration * (timing.cool / 100)) },
              ].map((section, i) => (
                <div key={i} className={`group p-5 bg-white/40 rounded-[1.5rem] border-2 ${section.border} hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className={`w-8 h-8 rounded-lg ${section.color} shadow-lg shadow-gray-200/50 flex items-center justify-center text-white`}>
                      <span className="text-[10px] font-black">{i + 1}</span>
                    </div>
                    <div className="text-[10px] font-black text-gray-500 tracking-widest uppercase">{section.min}m</div>
                  </div>
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-0.5">{section.label}</div>
                  <div className="text-lg font-black text-gray-900 tracking-tight">
                    {section.count} <span className="text-[10px] text-gray-500 font-bold ml-1 italic opacity-60">approx. poses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <div className="bg-white/40 p-6 md:p-8 rounded-[2rem] border border-white/80 shadow-sm min-h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-4">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  PRACTICE PROFILE
                </h3>

                <div className="space-y-3">
                  {[
                    { label: 'Duration', value: `${data.duration} Minutes`, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Intensity', value: data.intensity, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Style', value: data.style, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Focus', value: data.focus, color: 'text-purple-600', bg: 'bg-purple-50' },
                  ].map((item, i) => (
                    <div key={i} className={`group flex items-center justify-between p-4 bg-white/60 rounded-2xl shadow-sm transition-all hover:bg-white hover:shadow-md`}>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                      <span className={`text-sm font-black tracking-tight capitalize ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags Layout */}
                <div className="mt-8 space-y-6">
                  {((data.targetAreas && data.targetAreas.length > 0) || data.targetAreasCustom) && (
                    <div className="space-y-3">
                      <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Zones</div>
                      <div className="flex flex-wrap gap-2">
                        {[...(data.targetAreas || []), data.targetAreasCustom].filter(Boolean).map((area, i) => (
                          <span key={i} className="px-3 py-1.5 bg-blue-50/50 text-blue-600 border border-blue-100 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {((data.limitations && data.limitations.length > 0) || data.limitationsCustom) && (
                    <div className="space-y-3">
                      <div className="text-[9px] font-black text-red-400 uppercase tracking-[0.2em]">Safety</div>
                      <div className="flex flex-wrap gap-2">
                        {[...(data.limitations || []), data.limitationsCustom].filter(Boolean).map((limit, i) => (
                          <span key={i} className="px-3 py-1.5 bg-red-50/50 text-red-600 border border-red-100 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            {limit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 p-3 bg-gray-50/50 rounded-2xl border border-gray-100 text-center">
                <p className="text-[9px] text-gray-400 font-bold italic opacity-70">AI tailored session: {numAsanas} poses</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-center pt-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
        <button
          onClick={() => onConfirm({
            ...data,
            warmupPercent: timing.warmup,
            mainFlowPercent: timing.main,
            peakPercent: timing.peak,
            coolDownPercent: timing.cool
          })}
          disabled={isGenerating}
          className="group relative px-16 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-lg tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isGenerating ? (
              <>
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Yoga Magic...
              </>
            ) : (
              <>
                GENERATE YOGA MAGIC
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-[2rem] opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
    </div>
  );
};

export default YogaFlowPreview;
