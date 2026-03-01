import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";


export const generate = action({
    args: {
        intensity: v.string(),
        style: v.string(),
        focus: v.string(),
        duration: v.number(),
        warmupPercent: v.optional(v.number()),
        mainFlowPercent: v.optional(v.number()),
        peakPercent: v.optional(v.number()),
        coolDownPercent: v.optional(v.number()),
        // Advanced Parameters
        targetAreas: v.optional(v.array(v.string())),
        targetAreasCustom: v.optional(v.string()),
        limitations: v.optional(v.array(v.string())),
        limitationsCustom: v.optional(v.string()),
        breathwork: v.optional(v.string()),
        meditation: v.optional(v.string()),
        props: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY environment variable is not set");
        }

        const ai = new GoogleGenAI({ apiKey });

        const numAsanas = Math.max(6, Math.floor(args.duration / 3));

        // Use custom percentages or fallback to defaults
        const wP = args.warmupPercent || 25;
        const mP = args.mainFlowPercent || 40;
        const pP = args.peakPercent || 15;
        const cP = args.coolDownPercent || 20;

        // Prepare context for AI
        const areas = [...(args.targetAreas || []), args.targetAreasCustom].filter(Boolean).join(", ");
        const limits = [...(args.limitations || []), args.limitationsCustom].filter(Boolean).join(", ");
        const props = (args.props || []).join(", ");
        const breath = args.breathwork || "light";
        const medit = args.meditation || "short closing";

        // 1. Generate Structured Flow
        const textResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are a professional yoga instructor and yoga teacher trainer.
            Generate a structured yoga flow for a ${args.duration}-minute practice.
            Intensity: ${args.intensity}
            Style: ${args.style}
            Focus: ${args.focus}
            ${areas ? `Anatomical Focus: ${areas}` : ""}
            ${limits ? `USER LIMITATIONS/INJURIES: ${limits} (CRITICAL: Adjust or exclude poses to ensure safety)` : ""}
            ${props ? `AVAILABLE PROPS: ${props} (Integrate their use in the flow)` : ""}
            Breathwork Integration: ${breath}
            Meditation Level: ${medit}

            Analyze the typical duration for holding yoga asanas in a real-life yoga class. Base your corrections on commonly accepted yoga teaching standards across Hatha, Vinyasa, and general flow classes.

            The flow MUST be divided into 4 sections according to this timing model:
            1. Warm-up (${wP}% of time) - ${breath !== "none" ? "Include breath orientation" : ""}
            2. Main Flow (${mP}% of time) - ${areas ? `Prioritize ${areas}` : ""}
            3. Peak Sequence (${pP}% of time)
            4. Cool-down + Relaxation (${cP}% of time) - ${medit !== "none" ? `Integrate ${medit}` : ""}

            Total asanas to generate: ${numAsanas}. Distribute them logically across sections based on the percentage of time allocated to each.

            SAFETY & TAILORING:
            - If limitations like "${limits}" are specified, avoid poses that aggravate these areas (e.g., if "knee sensitivity", avoid deep lunges or suggest "blocks/blanket under knees").
            - If props like "${props}" are available, suggest how to use them in the "clues" field.
            
            CRITICAL GUIDELINES FOR ASANA DURATIONS:
            - Evaluate each asana duration realistically for a safe and practical class.
            - Output durations as ranges or breaths, NOT single fixed minute numbers (e.g., "20–40 seconds", "3–6 breaths").
            - Strong standing poses: ~20–60 seconds
            - Balance poses: ~10–40 seconds
            - Seated stretches: ~30–120 seconds
            - Backbends: ~15–60 seconds
            - Restorative poses: ~2–10 minutes
            - Transitions: ~3–10 seconds
            - Ensure the total volume of asanas realistically fills the total ${args.duration} minute practice.

            Return a JSON object with:
            - "summary": { "warmup": string, "mainFlow": string, "peak": string, "coolDown": string }
            - "sections": array of objects:
                - "title": string (Section name)
                - "asanas": array of objects:
                    - "name": string (English name)
                    - "sanskritName": string (Sanskrit name)
                    - "duration": string (Realistic range/breaths, e.g. "30-60s" or "5 breaths")
                    - "clues": string (Short teaching tips/comments on how to perform the asana, max 15 words)
                    - "description": string (Detailed visual description)
            Strictly return ONLY the JSON object.`,
            config: {
                responseMimeType: "application/json",
            }
        });

        const flow = JSON.parse(textResponse.text!) as {
            summary: { warmup: string; mainFlow: string; peak: string; coolDown: string };
            sections: { title: string; asanas: { name: string; sanskritName: string; duration: string; clues: string; description: string }[] }[];
        };

        // 2. Map sections (Skipping AI Image generation for now as requested)
        const structuredSections = flow.sections.map((section) => {
            return {
                title: section.title,
                asanas: section.asanas.map(asana => ({
                    name: asana.name,
                    sanskritName: asana.sanskritName,
                    duration: asana.duration,
                    clues: asana.clues,
                    description: asana.description,
                    image: null, // Image generation disabled
                })),
            };
        });

        return {
            summary: flow.summary,
            sections: structuredSections,
        };
    },
});
