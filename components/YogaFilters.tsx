"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const yogaFormSchema = z.object({
  intensity: z.enum(["beginner", "intermediate", "advanced", "mixed"]),
  style: z.enum(["hatha", "vinyasa", "ashtanga", "yin", "restorative", "power", "prenatal", "therapeutic", "mobility", "somatic"]),
  focus: z.enum(["flexibility", "strength", "mobility", "stability", "recovery", "relaxation", "mindfulness", "endurance", "posture", "balance", "energy boost", "mixed"]),
  duration: z.number().min(5).max(120),
  warmupPercent: z.number(),
  mainFlowPercent: z.number(),
  peakPercent: z.number(),
  coolDownPercent: z.number(),
  // Advanced Parameters
  showAdvanced: z.boolean().default(false),
  targetAreas: z.array(z.string()).default([]),
  targetAreasCustom: z.string().default(""),
  limitations: z.array(z.string()).default([]),
  limitationsCustom: z.string().default(""),
  breathwork: z.enum(["none", "light", "structured", "pranayama-focused"]).default("light"),
  meditation: z.enum(["none", "short closing", "full guided meditation"]).default("short closing"),
  props: z.array(z.string()).default([]),
});

export type YogaFormData = z.infer<typeof yogaFormSchema>;

interface YogaFiltersProps {
  onSubmit: (data: YogaFormData) => void;
  defaultValues?: Partial<YogaFormData>;
}

const YogaFilters = ({ onSubmit, defaultValues }: YogaFiltersProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(yogaFormSchema),
    defaultValues: {
      intensity: defaultValues?.intensity || "beginner",
      style: defaultValues?.style || "hatha",
      focus: defaultValues?.focus || "flexibility",
      duration: defaultValues?.duration || 15,
      warmupPercent: defaultValues?.warmupPercent || 20,
      mainFlowPercent: defaultValues?.mainFlowPercent || 40,
      peakPercent: defaultValues?.peakPercent || 15,
      coolDownPercent: defaultValues?.coolDownPercent || 25,
      showAdvanced: defaultValues?.showAdvanced || false,
      targetAreas: defaultValues?.targetAreas || [],
      targetAreasCustom: defaultValues?.targetAreasCustom || "",
      limitations: defaultValues?.limitations || [],
      limitationsCustom: defaultValues?.limitationsCustom || "",
      breathwork: defaultValues?.breathwork || "light",
      meditation: defaultValues?.meditation || "short closing",
      props: defaultValues?.props || [],
    },
  });

  const showAdvanced = watch("showAdvanced");
  const selectedTargetAreas = watch("targetAreas") || [];
  const selectedLimitations = watch("limitations") || [];
  const selectedProps = watch("props") || [];

  const toggleSelection = (fieldName: "targetAreas" | "limitations" | "props", value: string) => {
    const current = (watch(fieldName) || []) as string[];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setValue(fieldName, newValue);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-5xl mx-auto mb-16 px-4"
    >
      <div className="bg-white/80 backdrop-blur-xl p-6 md:p-10 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-white/50 space-y-10">
        {/* Intensity Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                Practice Intensity
              </h2>
              <p className="text-gray-500 font-medium text-xs">Define the energy level of your session</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
            {(["beginner", "intermediate", "advanced", "mixed"] as const).map((lvl) => (
              <label
                key={lvl}
                className={`flex items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer font-black text-[11px] uppercase tracking-widest
                  ${watch("intensity") === lvl
                    ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200 -translate-y-0.5"
                    : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
              >
                <input type="radio" value={lvl} {...register("intensity")} className="hidden" />
                {lvl}
              </label>
            ))}
          </div>
        </div>

        {/* Style & Focus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-lg font-black text-gray-900 tracking-tight">Yoga Style</label>
            <div className="relative">
              <select
                {...register("style")}
                className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-gray-700 appearance-none cursor-pointer text-sm"
              >
                {["hatha", "vinyasa", "ashtanga", "yin", "restorative", "power", "prenatal", "therapeutic", "mobility", "somatic"].map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-lg font-black text-gray-900 tracking-tight">Session Focus</label>
            <div className="relative">
              <select
                {...register("focus")}
                className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-gray-700 appearance-none cursor-pointer text-sm"
              >
                {["flexibility", "strength", "mobility", "stability", "recovery", "relaxation", "mindfulness", "endurance", "posture", "balance", "energy boost", "mixed"].map(f => (
                  <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-6 pt-4 border-t border-gray-50">
          <div className="flex justify-between items-end">
            <div>
              <label className="text-lg font-black text-gray-900 tracking-tight">Practice Duration</label>
              <p className="text-xs text-gray-500 font-medium">Fine-tune the time allocated for your session</p>
            </div>
            <span className="text-3xl font-black text-blue-600 tracking-tighter">
              {watch("duration")} <span className="text-sm uppercase tracking-widest text-gray-500 ml-1">mins</span>
            </span>
          </div>
          <div className="px-2">
            <input
              type="range"
              min="5"
              max="120"
              step="5"
              {...register("duration", { valueAsNumber: true })}
              className="w-full h-2.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600 transition-all hover:h-3.5 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
            />
            <div className="flex justify-between mt-3 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              <span>5 mins</span>
              <span>Express</span>
              <span>Standard</span>
              <span>Deep Dive</span>
              <span>120 mins</span>
            </div>
          </div>
        </div>

        {/* Advanced Toggle */}
        <div className="pt-6 border-t border-gray-50">
          <button
            type="button"
            onClick={() => setValue("showAdvanced", !showAdvanced)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] transition-all cursor-pointer
              ${showAdvanced ? "bg-blue-600 text-white shadow-xl shadow-blue-200" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            {showAdvanced ? "− Hide" : "+ Show"} Advanced Parameters
          </button>

          {showAdvanced && (
            <div className="mt-10 space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Target Areas */}
              <div className="space-y-5">
                <label className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Target Anatomical Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {["neck", "upper back", "lower back", "hips", "hamstrings", "core", "arms", "ankles"].map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleSelection("targetAreas", area)}
                      className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all border-2 cursor-pointer
                        ${selectedTargetAreas.includes(area)
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105"
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
                    >
                      {area.charAt(0).toUpperCase() + area.slice(1)}
                    </button>
                  ))}
                </div>
                <textarea
                  {...register("targetAreasCustom")}
                  placeholder="Need something specific? (e.g. psoas, rotator cuff...)"
                  className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700 placeholder:text-gray-400 resize-none h-28 text-sm"
                />
              </div>

              {/* Injury Section */}
              <div className="space-y-5">
                <label className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3 text-red-600">
                  <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                  Safety: Injuries & Limitations
                </label>
                <div className="flex flex-wrap gap-2">
                  {["knee sensitivity", "wrist pain", "lower back issues", "neck tension", "pregnancy", "high blood pressure"].map((limit) => (
                    <button
                      key={limit}
                      type="button"
                      onClick={() => toggleSelection("limitations", limit)}
                      className={`px-5 py-2.5 rounded-xl text-[12px] font-bold transition-all border-2 cursor-pointer
                        ${selectedLimitations.includes(limit)
                          ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-200 scale-105"
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200 text-red-500/60"}`}
                    >
                      {limit.charAt(0).toUpperCase() + limit.slice(1)}
                    </button>
                  ))}
                </div>
                <textarea
                  {...register("limitationsCustom")}
                  placeholder="Tell the AI about any physical restrictions for a safer flow..."
                  className="w-full p-5 bg-gray-50/50 border border-gray-100 rounded-[1.5rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all font-medium text-gray-700 placeholder:text-gray-400 resize-none h-28 text-sm"
                />
              </div>

              {/* Breathwork & Meditation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-2">
                <div>
                  <label className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                    Breathwork Focus
                  </label>
                  <p className="text-xs text-gray-500 font-medium mb-4">Refine your energy with specific pranayama patterns</p>
                  <div className="relative">
                    <select
                      {...register("breathwork")}
                      className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 font-bold text-gray-700 appearance-none cursor-pointer text-sm"
                    >
                      <option value="none">None</option>
                      <option value="light">Light Integration</option>
                      <option value="structured">Structured Session</option>
                      <option value="pranayama-focused">Pranayama Focused</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                    Meditation Integration
                  </label>
                  <p className="text-xs text-gray-500 font-medium mb-4">Seal your practice with mental clarity and stillness</p>
                  <div className="relative">
                    <select
                      {...register("meditation")}
                      className="w-full p-4 bg-gray-50/50 border border-gray-100 rounded-[1.25rem] focus:ring-4 focus:ring-blue-500/10 font-bold text-gray-700 appearance-none cursor-pointer text-sm"
                    >
                      <option value="none">None</option>
                      <option value="short closing">Short Savasana Plus</option>
                      <option value="full guided meditation">Full Guided Session</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Props Section */}
              <div className="space-y-5">
                <label className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Available Props</label>
                <div className="flex flex-wrap gap-2 text-center">
                  {["blocks", "strap", "bolster", "blanket", "chair", "wall space"].map((prop) => (
                    <button
                      key={prop}
                      type="button"
                      onClick={() => toggleSelection("props", prop)}
                      className={`px-5 py-2.5 min-w-[90px] rounded-xl text-xs font-bold transition-all border-2 cursor-pointer
                        ${selectedProps.includes(prop)
                          ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200 scale-105"
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
                    >
                      {prop.charAt(0).toUpperCase() + prop.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group cursor-pointer relative px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm tracking-[0.2em] shadow-xl shadow-blue-500/40 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase overflow-hidden flex items-center justify-center gap-3"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? "Brewing Flow..." : "Review Practice Plan"}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      </div>
    </form>
  );
};

export default YogaFilters;
