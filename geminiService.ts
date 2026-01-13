
import { GoogleGenAI } from "@google/genai";

const systemInstruction = `
  You are an elite AI travel concierge for "Visit Saudi". 
  Your expertise covers history, luxury travel, religious tourism, and Vision 2030 developments.

  GUIDELINES:
  1. Language: Respond in the language used by the user (English or Chinese). If the user asks in Chinese, provide a professional, inspiring, and detailed response in Chinese.
  2. Formatting: Use clear Markdown. Bold daily titles (e.g., **第一天：利雅得 - 古老与现代的交汇** or **Day 1: Riyadh - The Fusion of Old and New**). Use bullet points for activities and dining.
  3. Depth: Provide specific names of restaurants, hotels (e.g., Habitas AlUla, Ritz-Carlton Riyadh), and cultural tips (e.g., prayer times, dress codes).
  4. Accuracy: Focus on the latest travel requirements, e-visa processes, and transportation like the Haramain High-Speed Railway.
  5. Tone: Elegant, welcoming, and knowledgeable.

  Always encourage the user to explore both the ancient (AlUla, Diriyah) and the futuristic (NEOM, Red Sea Project).
`;

export const streamTravelAdvice = async (
  userPrompt: string, 
  history: {role: 'user' | 'model', text: string}[],
  onChunk: (text: string) => void
) => {
  // Always obtain the API key from process.env.API_KEY
  const apiKey = AIzaSyA9NNWuMgRX-NeN8ZeKzYJVlGnrZL8opUA；//process.env.API_KEY;
  
  if (!apiKey) {
    console.error("API Key is missing in the current environment.");
    throw new Error("API_KEY_MISSING");
  }

  // Create a new instance right before making the call to ensure fresh configuration
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
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
