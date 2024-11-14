import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const openai = createOpenAI({
  apiKey: "YOUR_OPENAI_API_KEY",
});

export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-2024-08-06"),
    system: "You are a helpful assistant.",
    messages,
  });

  return result.toDataStreamResponse({
    headers,
  });
}

export async function OPTIONS() {
  return NextResponse.json(null, { headers });
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/octet-stream",
};
