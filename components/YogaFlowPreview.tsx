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
        className="relative h-12 w-full bg-gray-100 rounded-2xl overflow-visible flex cursor-pointer select-none border-4 border-white shadow-inner"
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
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Refine Your Flow</h2>
            <p className="text-gray-500 font-medium">Customize the practice structure before generating</p>
          </div>
          <button 
            onClick={onBack}
            className="text-gray-300 hover:text-gray-600 transition-colors p-2 bg-gray-50 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
              <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Integrated Timing Model
              </h3>
              
              <IntegratedTimingSlider 
                percentages={timing}
                onChange={setTiming}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Warm-up', info: 'Joint prep & breath', color: 'bg-orange-400', count: warmupCount, min: Math.round(data.duration * (timing.warmup / 100)) },
                { label: 'Main Flow', info: 'Strength & mobility', color: 'bg-green-400', count: mainFlowCount, min: Math.round(data.duration * (timing.main / 100)) },
                { label: 'Peak', info: 'Highest intensity', color: 'bg-purple-400', count: peakCount, min: Math.round(data.duration * (timing.peak / 100)) },
                { label: 'Cool-down', info: 'Rest & transition', color: 'bg-blue-400', count: coolDownCount, min: Math.round(data.duration * (timing.cool / 100)) },
              ].map((section, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className={`w-1 h-10 rounded-full ${section.color}`}></div>
                  <div className="flex-1">
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{section.label}</div>
                    <div className="flex justify-between items-end">
                      <div className="text-sm font-bold text-gray-800">
                        <span className="text-[8px] text-gray-400 mr-1 opacity-70">APPROX.</span>
                        {section.count} <span className="text-[10px] text-gray-400">POSES</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-gray-400">{section.min}m</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 h-full">
              <h3 className="font-black text-gray-900 mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                Practice Profile
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Duration', value: `${data.duration} Minutes`, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Intensity', value: data.intensity, icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                  { label: 'Style', value: data.style, icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { label: 'Focus', value: data.focus, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M19 12a7 7 0 11-14 0 7 7 0 0114 0z' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase">{item.label}</div>
                      <div className="text-sm font-bold text-gray-900 capitalize">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
          <button
            onClick={onBack}
            className="flex-1 px-8 py-5 border-2 border-gray-200 rounded-2xl font-black text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-all text-sm uppercase tracking-widest active:scale-95"
          >
            Go Back
          </button>
          <button
            onClick={() => onConfirm({
              ...data,
              warmupPercent: timing.warmup,
              mainFlowPercent: timing.main,
              peakPercent: timing.peak,
              coolDownPercent: timing.cool
            })}
            disabled={isGenerating}
            className="flex-[2] bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200/50 disabled:opacity-50 flex items-center justify-center min-h-[72px] active:scale-95"
          >
            {isGenerating ? (
              <span className="flex items-center gap-4">
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Yoga Magic...
              </span>
            ) : (
              "Confirm & Generate Program"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default YogaFlowPreview;
