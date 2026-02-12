// src/lib/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

export const getExpertAdvice = async (disease: string, confidence: number) => {
  // Try Gemini 3 Flash first, fallback to 1.5 Flash if 503 occurs
  const models = ["gemini-3-flash-preview", "gemini-1.5-flash"];

  const prompt = `
    Context: AgriVision AI detected ${disease} with ${confidence}% confidence. 
    Task: Act as a senior Agronomist in Maharashtra. 
    Format: Use clear headings, bullet points, and DOUBLE line breaks. 
    
    Structure:
    ### 1. Disease Overview
    ### 2. Treatment Strategy
    ### 3. Local Solutions (Chemicals in Pune/Nashik)
    --- 
    ### 4. मराठी सारांश
  `;

  for (const modelId of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelId });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      // If it's a 503 (High Demand) and we have more models to try, continue the loop
      if (
        error.message?.includes("503") &&
        modelId !== models[models.length - 1]
      ) {
        console.warn(`Model ${modelId} busy, trying fallback...`);
        continue;
      }
      throw error; // If it's the last model or a different error, stop
    }
  }
  throw new Error(
    "All AI nodes are currently busy. Please try again in 10 seconds.",
  );
};
