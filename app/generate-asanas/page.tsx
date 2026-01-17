"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  level: z.enum(["easy", "medium", "hard"]),
});

type FormData = z.infer<typeof formSchema>;

const GenerateAsanas = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      level: "easy",
    },
  });

  const generateAsanas = useAction(api.asanas.generate);
  const [asanas, setAsanas] = useState<{ name: string; image: string | null }[] | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await generateAsanas({ level: data.level });
      setAsanas(response);
      console.log(response);
    } catch (error) {
      console.error("Error generating asanas:", error);
      alert("Failed to generate asanas. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Generate your Yoga Program</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto mb-12">
        <div className="flex flex-col gap-2">
          <label htmlFor="level" className="font-semibold text-gray-700">
            Select Difficulty Level
          </label>
          <select
            id="level"
            {...register("level")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          {errors.level && (
            <span className="text-red-500 text-sm">{errors.level.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Program...
            </span>
          ) : (
            "Generate Program"
          )}
        </button>
      </form>

      {asanas && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {asanas.map((asana, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
              <div className="aspect-square relative bg-gray-100">
                {asana.image ? (
                  <Image 
                    src={asana.image} 
                    alt={asana.name} 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-sm">No image generated</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{asana.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{index + 1}. {asana.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenerateAsanas;
