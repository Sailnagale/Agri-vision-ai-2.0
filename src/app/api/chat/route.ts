import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, userMessage } = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are the AgriVision 2.0 Expert Agronomist. Provide technical, clear, and structured advice for soybean and grape crops. Keep responses to 2-3 short paragraphs maximum. Use bold text for key terms and bullet points for steps.",
        },
        ...messages.map((m: any) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: userMessage },
      ],
      model: "llama-3.3-70b-versatile", // Using high-performance Llama 3.3
    });

    return NextResponse.json({
      text: chatCompletion.choices[0]?.message?.content || "",
    });
  } catch (error: any) {
    console.error("Groq Server Error:", error);
    return NextResponse.json(
      { error: "Groq Neural Link Failed" },
      { status: 500 },
    );
  }
}
