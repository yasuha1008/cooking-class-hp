import Link from "next/link";
import { school } from "@/lib/data";

const legalLinks = [
  { slug: "privacy", label: "プライバシーポリシー" },
  { slug: "terms", label: "利用規約" },
  { slug: "tokushoho", label: "特定商取引法に基づく表記" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-light bg-brand-light/30 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍲</span>
          <span className="font-bold text-brand-dark">{school.name}</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-foreground/60">
          {legalLinks.map((l) => (
            <Link
              key={l.slug}
              href={`/legal/${l.slug}`}
              className="hover:text-brand-dark"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-foreground/40">
          &copy; {new Date().getFullYear()} {school.name}
        </p>
      </div>
    </footer>
  );
}
