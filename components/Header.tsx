"use client";

import Link from "next/link";
import { useState } from "react";
import { school } from "@/lib/data";

const navLinks = [
  { href: "#courses", label: "コース一覧" },
  { href: "#about", label: "教室紹介" },
  { href: "#testimonials", label: "生徒の声" },
  { href: "#contact", label: "お問い合わせ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-900 shadow-sm transition hover:bg-brand-dark md:inline-block"
        >
          無料相談を予約
        </a>

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
