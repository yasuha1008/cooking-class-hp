"use client";

import { useState } from "react";
import { school } from "@/lib/data";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="mx-auto max-w-4xl px-5 py-20">
      <div className="text-center">
        <p className="text-xs font-bold tracking-widest text-brand">
          CONTACT
        </p>
        <h2 className="mt-2 text-3xl font-black text-foreground">
          その他のお問い合わせ
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-foreground/60">
          取材・見学・その他ご質問など、お気軽にお問い合わせください。担当者より折り返しご連絡いたします。
        </p>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-4 text-sm">
          <div>
            <dt className="font-bold text-foreground/50">所在地</dt>
            <dd className="mt-1 text-foreground/80">{school.address}</dd>
          </div>
          <div>
            <dt className="font-bold text-foreground/50">教室名</dt>
            <dd className="mt-1 text-foreground/80">{school.name}</dd>
          </div>
        </div>

        <div id="contact-form" className="rounded-2xl bg-white p-6 shadow-sm">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
              <span className="text-4xl">🍳</span>
              <p className="font-bold text-foreground">
                お問い合わせありがとうございます!
              </p>
              <p className="text-sm text-foreground/60">
                担当者より2営業日以内にご連絡いたします。
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <Field label="お名前" required>
                <input
                  required
                  type="text"
                  className="input"
                  placeholder="山田 花子"
                />
              </Field>
              <Field label="メールアドレス" required>
                <input
                  required
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="お問い合わせ種別">
                <select className="input" defaultValue="">
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option>体験レッスンについて</option>
                  <option>法人・団体レッスンについて</option>
                  <option>取材・メディア</option>
                  <option>その他</option>
                </select>
              </Field>
              <Field label="お問い合わせ内容" required>
                <textarea
                  required
                  rows={4}
                  className="input"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </Field>
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                送信する
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-bold text-foreground/60">
      {label}
      {required && <span className="text-brand-dark"> *</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}
