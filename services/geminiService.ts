
import { GoogleGenAI } from "@google/genai";

export const getTravelAdvice = async (userPrompt: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an elite Saudi Arabia Travel Expert and Route Planner. 
    Your mission is to provide detailed, accurate, and inspiring travel advice in English.
    
    When asked for itineraries or planning:
    1. Use a clear Day-by-Day structure (e.g., Day 1: Arrival & Culture).
    2. Include specific morning, afternoon, and evening activities.
    3. Suggest optimal durations for each city.
    4. Mention logistics like travel time between cities (e.g., flight vs high-speed train).
    
    Always include:
    - Hidden gems and luxury recommendations.
    - Cultural etiquette (Dress code, prayer times, local customs).
    - Dining suggestions ranging from traditional Mandi to fine dining.
    - Seasonal advice based on current weather.

    Keep your tone professional, sophisticated, and welcoming.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: "Hello, please act as my expert Saudi Travel Concierge." }] },
        { role: 'model', parts: [{ text: "Of course! I am your dedicated Saudi Travel Concierge. Whether you're looking for an 10-day Grand Tour or a weekend in Riyadh, I'm here to craft your perfect journey. Where shall we begin?" }] },
        ...history.map(msg => ({
          role: msg.role,
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: userPrompt }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I'm unable to provide advice at this moment. Please try again shortly.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection failed. Please check your network and try again.";
  }
};
