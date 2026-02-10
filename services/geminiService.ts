
import { GoogleGenAI, Type } from "@google/genai";
import { ExamCategory, EducationBoard, JackAIGender, JackAIMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchEducationalContent = async (
  query: string,
  category: ExamCategory,
  board: EducationBoard
) => {
  const model = 'gemini-3-flash-preview';
  
  const systemPrompt = `You are EduQuest AI, a specialized tutor for Indian education and competitive exams. 
    User Category: ${category}
    Target Board/Context: ${board}
    Provide highly accurate, structured information. Use Google Search to get the latest syllabus, dates, or factual data if needed.
    Include step-by-step explanations or bulleted lists for clarity.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Search and explain: ${query}`,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No content generated.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Resource Link',
      uri: chunk.web?.uri || ''
    })).filter((s: any) => s.uri !== '') || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    throw error;
  }
};

export const solveDoubt = async (subject: string, question: string) => {
  const model = 'gemini-3-flash-preview';
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Subject: ${subject}\nQuestion: ${question}`,
      config: {
        systemInstruction: "You are an expert academic tutor. Solve the student's doubt with clear, logical steps. Use simple language. If relevant, explain the underlying concept.",
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Doubt solver error:", error);
    return "I couldn't process your doubt right now. Please try again.";
  }
};

export const getDailyCurrentAffairs = async () => {
  const model = 'gemini-3-flash-preview';
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Provide the top 5 most important current affairs for Indian competitive exams (UPSC/SSC/Defense) for ${today}.`,
      config: {
        systemInstruction: "You are a news editor for competitive exam aspirants. Provide highly relevant news points with brief context for each. Use Google Search for real-time accuracy.",
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Current affairs error:", error);
    return "Failed to fetch today's current affairs.";
  }
};

export const generateStudyTool = async (
  topic: string,
  toolType: 'Quiz' | 'Plan' | 'Summary',
  category: ExamCategory,
  board: EducationBoard
) => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = toolType === 'Quiz' 
    ? `Create a 5-question multiple choice quiz on the topic "${topic}" for ${category} students following ${board} level. Provide answers at the end.`
    : toolType === 'Plan'
    ? `Create a 7-day intensive study plan for "${topic}" considering it's for ${category} (${board}).`
    : `Create a comprehensive summary with key takeaways for "${topic}".`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Tool Generation Error:", error);
    throw error;
  }
};

export const chatWithJack = async (
  message: string,
  history: JackAIMessage[],
  gender: JackAIGender
) => {
  const model = 'gemini-3-flash-preview';
  
  const jackPersona = gender === 'male' 
    ? "You are Jack AI (Male), a wise, encouraging, and knowledgeable male mentor for students. Your tone is professional yet warm, like an older brother or a respected teacher."
    : "You are Jack AI (Female), a supportive, meticulous, and friendly female mentor for students. Your tone is empathetic and highly detailed, like a dedicated personal tutor or a guiding mentor.";

  const systemInstruction = `${jackPersona} You specialize in helping students with UPSC, Armed Forces, and K-12 board exams. Keep your answers helpful and concise.`;

  try {
    const chat = ai.chats.create({
      model,
      config: { systemInstruction },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm here to help you study!";
  } catch (error) {
    console.error("Jack AI Error:", error);
    return "I'm having a small technical issue. Let's try again in a moment!";
  }
};
