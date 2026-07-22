"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("メールアドレスまたはパスワードが正しくありません。");
        return;
      }
      router.push("/library");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-5 py-20">
        <div className="w-full max-w-md rounded-2xl border border-brand-light bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-black text-foreground">ログイン</h1>
          <p className="mt-2 text-sm text-foreground/60">
            会員登録済みの方は、こちらからログインしてください。
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              パスワード
              <input
                required
                type="password"
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
              {loading ? "確認中..." : "ログイン"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/60">
            会員登録がまだの方は{" "}
            <Link href="/signup" className="font-bold text-brand hover:underline">
              会員登録
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
