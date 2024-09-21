import { generateItemInfoByOpenAI } from "@/lib/openai";

export async function POST(req: Request) {
  const data = await req.json();
  const text = await generateItemInfoByOpenAI(data.textPrompt);
  return new Response(JSON.stringify({ text }), { status: 200 });
}
