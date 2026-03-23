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

        const numAsanas = Math.max(8, Math.floor(args.duration / 2.3));

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
            model: 'gemini-3-flash-preview',
            contents: `Act as an experienced yoga instructor and yoga teacher trainer.
            Generate a structured, naturally flowing yoga sequence for a ${args.duration}-minute practice.
            Intensity: ${args.intensity}
            Style: ${args.style}
            Focus: ${args.focus}
            ${areas ? `Anatomical Focus: ${areas}` : ""}
            ${limits ? `USER LIMITATIONS/INJURIES: ${limits} (CRITICAL: Adjust or exclude poses to ensure safety)` : ""}
            ${props ? `AVAILABLE PROPS: ${props} (Integrate their use in the flow)` : ""}
            Breathwork Integration: ${breath}
            Meditation Level: ${medit}
            
            BIOMECHANICAL FLOW RULES:
            - Minimize unnecessary repositioning between floor and standing (avoid flipping back and forth).
            - Group poses logically by position: 
              1. Standing/Vinyasa block
              2. Balancing block
              3. Seated/Floor block
              4. Supine/Prone/Savasana block
            - Each pose must logically follow the previous one using smooth transitions (e.g., Forward Fold → Lunge → Plank → Chaturanga).
            - Include specific transition instructions in the "transition" field for how to move from THIS pose to the NEXT one.
            - Ensure the sequence feels like a real, cohesive class, not a random list of exercises.
            - For **Vinyasa** and **Hatha** styles, it is MANDATORY to include Sun Salutations (Surya Namaskar A or B) after the initial warm-up and before the main standing sequence. This is essential for heating the body and linking breath to movement.
            - Include 1 round of Sun Salutation A or B. 
            - Mention "Sun Salutation A" or "Sun Salutation B" clearly in the asana name so the UI can detect them.
            - If the flow is short (<15 mins), include at least one round. If longer, include more.
            - Ensure they are placed logically between the Warm-up and Main Flow sections.

            ASANA DURATIONS:
            - Use realistic durations. Avoid excessive holds (e.g., Tadasana should be 1-3 breaths, not 1 min, unless for a specific meditative purpose).
            - Output durations as ranges or breaths (e.g., "5 breaths", "30-45s").
            - Strong standing: 30-60s | Balance: 15-40s | Seated: 1-3 mins | Restorative: 3-10 mins.

            The flow MUST be divided into 4 sections:
            1. Warm-up (${wP}% of time) - Centering and opening.
            2. Main Flow (${mP}% of time) - Building heat and strength.
            3. Peak Sequence (${pP}% of time) - Highest intensity/complexity.
            4. Cool-down + Relaxation (${cP}% of time) - Integration.

            Total asanas: ${numAsanas}.

            Return a JSON object:
            - "practiceOpener": string (A welcoming 2-3 sentence introduction setting the intention for this specific flow)
            - "meditationClosure": string (A grounding 2-3 sentence closing meditation to end this specific flow)
            - "summary": { "warmup": string, "mainFlow": string, "peak": string, "coolDown": string }
            - "sections": array of objects:
                - "title": string
                - "asanas": array of objects:
                    - "name": string
                    - "sanskritName": string
                    - "duration": string
                    - "clues": string (Teaching tips, max 15 words)
                    - "description": string (Visual/Alignment cues)
                    - "transition": string (How to transition to the next pose, e.g., "On your next exhale, step the right foot back...")
            Strictly return ONLY the JSON object.`,
            config: {
                responseMimeType: "application/json",
            }
        });
        console.log(textResponse.text);
        const flow = JSON.parse(textResponse.text!) as {
            practiceOpener: string;
            meditationClosure: string;
            summary: { warmup: string; mainFlow: string; peak: string; coolDown: string };
            sections: { title: string; asanas: { name: string; sanskritName: string; duration: string; clues: string; description: string; transition: string }[] }[];
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
                    transition: asana.transition,
                    image: null, // Image generation disabled
                })),
            };
        });

        return {
            practiceOpener: flow.practiceOpener,
            meditationClosure: flow.meditationClosure,
            summary: flow.summary,
            sections: structuredSections,
        };
    },
});
