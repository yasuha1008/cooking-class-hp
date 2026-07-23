"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { school } from "@/lib/data";

const navLinks = [
  { href: "#courses", label: "コース一覧" },
  { href: "#about", label: "教室紹介" },
  { href: "#testimonials", label: "生徒の声" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-light bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🥢</span>
          <span className="text-lg font-bold tracking-tight text-brand-dark">
            {school.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          {session && (
            <Link
              href="/library"
              className="text-sm font-medium text-foreground/80 transition hover:text-brand"
            >
              レシピライブラリ
            </Link>
          )}
          {session?.user.isAdmin && (
            <Link
              href="/admin/recipes"
              className="text-sm font-medium text-foreground/80 transition hover:text-brand"
            >
              管理画面
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {status !== "loading" &&
            (session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-foreground/60 hover:text-brand"
              >
                ログアウト
              </button>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-brand"
              >
                ログイン
              </Link>
            ))}
          <a
            href="#contact"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-sm transition hover:bg-brand-dark"
          >
            無料相談を予約
          </a>
        </div>

        <button
          aria-label="メニューを開く"
          onClick={() => setOpen((v) => !v)}
          className="text-2xl md:hidden"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-light bg-background px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/80"
              >
                {link.label}
              </a>
            ))}
            {session ? (
              <>
                <Link
                  href="/library"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-foreground/80"
                >
                  レシピライブラリ
                </Link>
                {session.user.isAdmin && (
                  <Link
                    href="/admin/recipes"
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-foreground/80"
                  >
                    管理画面
                  </Link>
                )}
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-left text-sm font-medium text-foreground/60"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/80"
              >
                ログイン
              </Link>
            )}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand px-5 py-2.5 text-center text-sm font-bold text-neutral-900"
            >
              無料相談を予約
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
