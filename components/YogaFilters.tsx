"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const yogaFormSchema = z.object({
  intensity: z.enum(["beginner", "gentle", "intermediate", "advanced", "mixed", "adaptive"]),
  style: z.enum(["hatha", "vinyasa", "ashtanga", "yin", "restorative", "power", "prenatal", "therapeutic", "mobility", "somatic"]),
  focus: z.enum(["flexibility", "strength", "mobility", "stability", "recovery", "relaxation", "mindfulness", "endurance", "posture", "balance", "energy boost"]),
  duration: z.number().min(5).max(120),
  warmupPercent: z.number(),
  mainFlowPercent: z.number(),
  peakPercent: z.number(),
  coolDownPercent: z.number(),
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
    formState: { errors },
  } = useForm<YogaFormData>({
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
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="intensity" className="font-semibold text-gray-700">Practice Intensity</label>
          <select
            id="intensity"
            {...register("intensity")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="beginner">Beginner</option>
            <option value="gentle">Gentle</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="mixed">Mixed</option>
            <option value="adaptive">Adaptive</option>
          </select>
          {errors.intensity && <span className="text-red-500 text-sm">{errors.intensity.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="style" className="font-semibold text-gray-700">Practice Style</label>
          <select
            id="style"
            {...register("style")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="hatha">Hatha</option>
            <option value="vinyasa">Vinyasa</option>
            <option value="ashtanga">Ashtanga</option>
            <option value="yin">Yin</option>
            <option value="restorative">Restorative</option>
            <option value="power">Power</option>
            <option value="prenatal">Prenatal</option>
            <option value="therapeutic">Therapeutic</option>
            <option value="mobility">Mobility</option>
            <option value="somatic">Somatic</option>
          </select>
          {errors.style && <span className="text-red-500 text-sm">{errors.style.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="focus" className="font-semibold text-gray-700">Primary Focus</label>
          <select
            id="focus"
            {...register("focus")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="flexibility">Flexibility</option>
            <option value="strength">Strength</option>
            <option value="mobility">Mobility</option>
            <option value="stability">Stability</option>
            <option value="recovery">Recovery</option>
            <option value="relaxation">Relaxation</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="endurance">Endurance</option>
            <option value="posture">Posture</option>
            <option value="balance">Balance</option>
            <option value="energy boost">Energy Boost</option>
          </select>
          {errors.focus && <span className="text-red-500 text-sm">{errors.focus.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="duration" className="font-semibold text-gray-700">Session Duration (min)</label>
          <input
            id="duration"
            type="number"
            {...register("duration", { valueAsNumber: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-6 py-4 text-white font-black uppercase tracking-widest bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-95 hover:shadow-xl"
      >
        Review Practice Plan
      </button>
    </form>
  );
};

export default YogaFilters;
