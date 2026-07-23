import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { school, courses } from "@/lib/data";

const systemPrompt = `あなたは「${school.name}」の公式サイトに設置されたAIチャットボット「塾長AI」です。
以下の教室情報だけをもとに、来訪者の質問に日本語で簡潔に答えてください。情報にないことは正直に「担当者にお問い合わせください」と案内してください。

【教室情報】
教室名: ${school.name}
所在地: ${school.address}
設立: ${school.founded}
事業内容: ${school.business}
代表: ${school.representative.name}(${school.representative.role})

【コース一覧】
${courses
  .map(
    (c) =>
      `- ${c.title}(${c.category}): ${c.summary} / 期間:${c.duration} / 料金:${c.price} / 対象:${c.level}`
  )
  .join("\n")}
`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY が設定されていません。.env.local に設定してください。" },
      { status: 500 }
    );
  }

  const { messages } = (await req.json()) as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  });

  const textBlock = response.content.find((b) => b.type === "text");

  return NextResponse.json({
    reply: textBlock?.type === "text" ? textBlock.text : "",
  });
}
