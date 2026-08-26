import { action } from "./_generated/server";
import { v } from "convex/values";


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
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new Error("OPENROUTER_API_KEY environment variable is not set");
        }

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

        let breathworkInstruction = "";
        if (breath === "none") {
            breathworkInstruction = `BREATHWORK FOCUS: None requested — use natural breath cues only in the "transition" fields, no dedicated pranayama.`;
        } else if (breath === "light") {
            breathworkInstruction = `BREATHWORK FOCUS (Light Integration):
            - Add 1-2 short pranayama practices (e.g., "Deep Belly Breathing", "Ujjayi Breath") as standalone items at the very beginning of the Warm-up section, before any asanas.
            - Keep the rest of the flow's breath cues natural and light.`;
        } else if (breath === "structured") {
            breathworkInstruction = `BREATHWORK FOCUS (Structured Session):
            - Do not add standalone pranayama items.
            - Every "transition" field must explicitly start with "Inhale," or "Exhale," matching the correct breath for that movement.`;
        } else if (breath === "pranayama-focused") {
            breathworkInstruction = `BREATHWORK FOCUS (Pranayama-Focused):
            - Add 4-5 pranayama practices (e.g., "Nadi Shodhana", "Ujjayi Breath", "Kapalabhati", "Bhramari", "Sitali Breath") as standalone items distributed throughout the sections — at least one in Warm-up, one before the Peak Sequence, and one in Cool-down.
            - Give each pranayama item a realistic duration (1-3 mins) and clear breathing instructions in its "description" field.`;
        }

        // Explicit per-limitation pose guidance — a bare "be careful" instruction is too weak for
        // the model to reliably apply consistently, so name the actual poses to avoid/modify.
        const LIMITATION_SAFETY_RULES: Record<string, string> = {
            "knee sensitivity": `Knees: AVOID or heavily modify Low Lunge, High Lunge, Pigeon Pose, Camel Pose, Hero Pose, Thunderbolt Pose, Lizard Pose, and deep squats (Garland Pose). If a kneeling or lunging pose is essential, explicitly instruct in "description" to pad the knee with a folded blanket and/or keep the back knee lifted off the floor.`,
            "wrist pain": `Wrists: AVOID or modify Plank, Downward-Facing Dog, Chaturanga, Crow Pose, and Handstand. Prefer forearm variations (Dolphin Pose, Forearm Plank) or instruct making fists/using knuckles to reduce wrist extension.`,
            "lower back issues": `Lower Back: AVOID deep backbends (Wheel Pose, Camel Pose, full Bow Pose) and straight-leg forward folds. Keep knees softly bent in forward folds and prefer core-supported alternatives (Bridge instead of Wheel).`,
            "neck tension": `Neck: AVOID Shoulderstand, Plow Pose, Headstand, and deep neck rotations. Keep the gaze neutral and instruct against cranking the neck in backbends like Camel or Cobra.`,
            "pregnancy": `Pregnancy: AVOID deep abdominal twists, prone poses lying on the belly (Cobra, Locust, Bow), strong core work (Boat Pose), inversions, and lying flat on the back for extended periods. Offer wide-legged or side-lying alternatives.`,
            "high blood pressure": `Blood Pressure: AVOID inversions (Headstand, Handstand, Shoulderstand) and vigorous breathwork (Kapalabhati, Breath of Fire). Keep pacing gentle and avoid prolonged breath-holding.`,
        };
        const matchedSafetyRules = (args.limitations || [])
            .map((l) => LIMITATION_SAFETY_RULES[l.toLowerCase()])
            .filter(Boolean);

        let safetyInstruction = "";
        if (limits) {
            safetyInstruction = `SAFETY — USER LIMITATIONS/INJURIES: ${limits}
            This is the single most important constraint in this entire prompt. Cross-check EVERY asana against it before finalizing your answer.
            ${matchedSafetyRules.length > 0 ? matchedSafetyRules.join("\n            ") : ""}
            For any limitation not explicitly covered above, use your judgment to exclude or modify any pose that would strain the affected area, and note the modification directly in that asana's "description".`;
        }

        let meditationInstruction = "";
        if (medit === "none") {
            meditationInstruction = `MEDITATION INTEGRATION: Keep "meditationClosure" brief and simple — a single grounding sentence, no guided Savasana script.`;
        } else if (medit === "short closing") {
            meditationInstruction = `MEDITATION INTEGRATION (Short Savasana):
            - "meditationClosure" should read like basic Savasana guidance plus session closure words: a short instruction to lie down and release, 1-2 sentences of stillness/breath awareness, and a closing line thanking the practice and inviting the student back to sitting.
            - Keep it to 3-4 sentences total.`;
        } else if (medit === "full guided meditation") {
            meditationInstruction = `MEDITATION INTEGRATION (Guided Session):
            - "meditationClosure" should be a full guided Savasana meditation script: settle into the pose, several lines guiding progressive relaxation or a body scan and breath awareness, then a gentle guided return to sitting.
            - Write it as a longer, step-by-step guided script (8-12 sentences), in second person, paced for a slow reading aloud.`;
        }

        // 1. Generate Structured Flow
        const prompt = `Act as an experienced yoga instructor and yoga teacher trainer.
            Generate a structured, naturally flowing yoga sequence for a ${args.duration}-minute practice.
            Intensity: ${args.intensity}
            Style: ${args.style}
            Focus: ${args.focus}
            ${areas ? `Anatomical Focus: ${areas}` : ""}
            ${props ? `AVAILABLE PROPS: ${props} (Integrate their use in the flow)` : ""}

            ${safetyInstruction}
            ${breathworkInstruction}

            ${meditationInstruction}

            INSTRUCTOR'S NOTES (the "clues" field):
            - Every asana's "clues" must contain 2-3 short cues separated by ", ".
            - Each cue must follow the pattern: verb + body part + direction (e.g., "Press feet down", "Lift chest forward", "Draw shoulders back").
            - Keep cues simple and laconic — no full sentences, no filler words.

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

            ${limits ? `FINAL SAFETY CHECK: Before you output anything, re-read every asana you have chosen and verify none of them conflict with these limitations: ${limits}. Replace or modify any that do.` : ""}

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
                    - "clues": string (2-3 laconic cues, each "verb + body part + direction", separated by " | ")
                    - "description": string (Visual/Alignment cues)
                    - "transition": string (How to transition to the next pose, e.g., "On your next exhale, step the right foot back...")
            Strictly return ONLY the JSON object, with no markdown formatting or code fences.`;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "qwen/qwen3.5-122b-a10b",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenRouter request failed (${response.status}): ${errorText}`);
        }

        const completion = await response.json();
        const rawText = completion.choices?.[0]?.message?.content;
        if (!rawText) {
            throw new Error("OpenRouter response did not contain any content");
        }

        // Strip markdown code fences in case the model wraps the JSON despite instructions
        const jsonText = rawText.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

        const flow = JSON.parse(jsonText) as {
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
