"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "登録に失敗しました。");
        return;
      }
      router.push("/login?registered=1");
    } catch {
      setError("通信エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="w-full max-w-md rounded-2xl border border-brand-light bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-black text-foreground">会員登録</h1>
          <p className="mt-2 text-sm text-foreground/60">
            月額コース会員の方は、こちらから登録してレシピライブラリにアクセスできます。
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-xs font-bold text-foreground/60">
              お名前
              <input
                required
                type="text"
                className="input mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="山田 花子"
              />
            </label>
            <label className="block text-xs font-bold text-foreground/60">
              メールアドレス
              <input
                required
                type="email"
                className="input mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-xs font-bold text-foreground/60">
              パスワード(8文字以上)
              <input
                required
                type="password"
                minLength={8}
                className="input mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand py-3 text-sm font-bold text-neutral-900 transition hover:bg-brand-dark disabled:opacity-50"
            >
              {loading ? "登録中..." : "登録する"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            すでに会員の方は{" "}
            <Link href="/login" className="font-bold text-brand hover:underline">
              ログイン
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
