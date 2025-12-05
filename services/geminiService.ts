import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const DEFAULT_MODEL = 'gemini-2.5-flash';

/**
 * Generates text response from Gemini
 */
export const generateTextResponse = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  try {
    // We construct the chat manually for this simple service wrapper,
    // or we could use ai.chats.create() for stateful management.
    // For simplicity in this demo, we'll just send the prompt with the history context if needed,
    // but here we are doing a single turn for simplicity or simple chat.
    
    // Using generateContent for single turn or managed history
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    return response.text || "عذراً، لم أتمكن من إنشاء رد.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("حدث خطأ أثناء الاتصال بـ Gemini API.");
  }
};

/**
 * Generates response from image and text (Multimodal)
 */
export const generateVisionResponse = async (
  prompt: string,
  base64Image: string,
  mimeType: string
): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: DEFAULT_MODEL, // 2.5 flash handles images well
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: prompt || "صف هذه الصورة."
          }
        ]
      }
    });

    return response.text || "لم يتم استلام رد من النموذج.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw new Error("حدث خطأ أثناء تحليل الصورة.");
  }
};