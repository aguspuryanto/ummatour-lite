
import { GoogleGenAI } from "@google/genai";

// Standardizing initialization to match @google/genai guidelines by using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const chatWithAssistant = async (message: string, context?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are Chatour Assistant, an expert in Umrah pilgrimage and financial planning. 
        Chatour ID helps Indonesian Muslims save for Umrah through Virtual Accounts. 
        You should be polite, informative, and encourage users to save consistently. 
        Answer in Indonesian. Context: ${context || 'General Umrah and savings queries.'}`,
        temperature: 0.7,
      },
    });
    // Accessing the .text property directly as per @google/genai guidelines (not calling it as a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, saya sedang mengalami kendala teknis. Silakan coba lagi nanti.";
  }
};
