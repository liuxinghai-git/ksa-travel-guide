
import { GoogleGenAI } from "@google/genai";

const systemInstruction = `
  You are a world-class travel expert and itinerary planner specializing in Saudi Arabia.
  Your task is to provide detailed, accurate, and inspiring travel advice in English.
  
  When asked about itineraries or planning:
  1. Use a clear daily structure (e.g., **Day 1: Arrival & Cultural Immersion**).
  2. Include specific morning, afternoon, and evening activities.
  3. Suggest optimal durations for each city.
  4. Mention logistics like travel times between cities (e.g., flight vs. high-speed rail).
  
  Always include:
  - Hidden gems and luxury recommendations.
  - Cultural etiquette (dress codes, prayer times, local customs).
  - Dining suggestions ranging from traditional Mandi to fine dining.
  - Seasonal advice based on current weather.

  Maintain a professional, elegant, and welcoming tone. Always respond in English.
  Use Markdown-style formatting:
  - Use **Bold** for headings or important terms.
  - Use bullet points for lists.
  - Ensure the output is visually organized for easy reading on mobile and desktop.
`;

export const streamTravelAdvice = async (
  userPrompt: string, 
  history: {role: 'user' | 'model', text: string}[],
  onChunk: (text: string) => void
) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview', // Pro model for better reasoning
      contents: [
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

    let fullText = "";
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
