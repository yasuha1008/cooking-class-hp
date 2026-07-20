"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "こんにちは!ことこと料理教室のご案内AIです。コースや料金、体験レッスンについて何でも聞いてください。",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: res.ok
            ? data.reply
            : `エラー: ${data.error ?? "応答に失敗しました。"}`,
        },
      ]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "通信エラーが発生しました。もう一度お試しください。" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-2xl border border-brand-light bg-white shadow-xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-white">
            <span className="text-sm font-bold">ことこと料理教室 AI案内</span>
            <button
              aria-label="閉じる"
              onClick={() => setOpen(false)}
              className="text-lg leading-none"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-brand text-white"
                      : "bg-brand-light text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-brand-light px-3 py-2 text-sm text-foreground/50">
                  入力中...
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex gap-2 border-t border-brand-light p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="質問を入力..."
              className="input flex-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              送信
            </button>
          </form>
        </div>
      )}

      <button
        aria-label="チャットを開く"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl text-white shadow-lg transition hover:bg-brand-dark"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
