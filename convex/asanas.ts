import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenAI } from "@google/genai";


export const generate = action({
    args: {
        level: v.string(),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY environment variable is not set");
        }

        const ai = new GoogleGenAI({ apiKey });

        // 1. Generate Asana Names and Descriptions
        const textResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Generate 3 yoga asanas for level "${args.level}". 
            Return a JSON array of objects, each having:
            - "name": string (Asana name)
            - "description": string (Visual description for image generation)
            Strictly return ONLY the JSON array.`,
            config: {
                responseMimeType: "application/json",
            }
        });

        const asanas = JSON.parse(textResponse.text!) as { name: string; description: string }[];

        // 2. Generate Images for each Asana
        const results = await Promise.all(
            asanas.map(async (asana) => {
                try {
                    const imageResponse = await ai.models.generateContent({
                        model: "gemini-2.5-flash-image",
                        contents: `Photorealistic yoga instructor performing ${asana.name}, ${asana.description}, white background, high quality`,
                    });

                    let image: string | null = null;
                    const part = imageResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData);

                    if (part?.inlineData?.data) {
                        image = part.inlineData.data;
                    }

                    return {
                        name: asana.name,
                        image: image ? `data:image/png;base64,${image}` : null,
                    };
                } catch (error) {
                    console.error(`Failed to generate image for ${asana.name}:`, error);
                    return {
                        name: asana.name,
                        image: null,
                    };
                }
            })
        );

        return results;
    },
});
