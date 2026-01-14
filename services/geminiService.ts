
import { GoogleGenAI } from "@google/genai";

export const getTravelAdvice = async (userPrompt: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: "AIzaSyA9NNWuMgRX-NeN8ZeKzYJVlGnrZL8opUA"});//process.env.API_KEY
  
  const systemInstruction = `
    You are a world-class travel expert and itinerary planner specializing in Saudi Arabia.
    Your task is to provide detailed, accurate, and inspiring travel advice in English.
    
    When asked about itineraries or planning:
    1. Use a clear daily structure (e.g., Day 1: Arrival & Cultural Immersion).
    2. Include specific morning, afternoon, and evening activities.
    3. Suggest optimal durations for each city.
    4. Mention logistics like travel times between cities (e.g., flight vs. high-speed rail).
    
    Always include:
    - Hidden gems and luxury recommendations.
    - Cultural etiquette (dress codes, prayer times, local customs).
    - Dining suggestions ranging from traditional Mandi to fine dining.
    - Seasonal advice based on current weather.

    Maintain a professional, elegant, and welcoming tone. Always respond in English.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: "Hello, please act as my Saudi travel concierge." }] },
        { role: 'model', parts: [{ text: "Certainly! I am your dedicated Saudi travel concierge. Whether you're looking for a 10-day deep dive across the kingdom or a weekend in Riyadh, I'm here to craft the perfect journey. Where shall we begin?" }] },
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

    return response.text || "I'm sorry, I couldn't generate advice right now. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection failed. Please check your network and try again.";
  }
};
