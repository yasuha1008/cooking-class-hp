import Link from "next/link";
import { courses } from "@/lib/data";
import { SectionHeading } from "./Courses";

const basic = courses.find((c) => c.slug === "monthly-basic")!;
const premium = courses.find((c) => c.slug === "monthly-premium")!;

export default function MonthlyPlans() {
  return (
    <section className="border-y border-brand/20 bg-brand-light/30 py-20">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading eyebrow="MONTHLY PLAN" title="月額コースで、無理なく続ける" />
        <p className="mx-auto -mt-4 mb-12 max-w-xl text-center text-sm text-foreground/60">
          単発で終わらせず、毎月の実践で着実に腕を上げたい方へ。まずはここから始める方がほとんどです
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-brand-light bg-card p-8">
            <span className="text-2xl">{basic.emoji}</span>
            <h3 className="mt-3 text-lg font-bold text-foreground">
              ベーシック
            </h3>
            <div className="mt-2 text-3xl font-black text-brand">
              ¥3,000<span className="text-sm font-bold text-foreground/60">/月</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground/80">
              {basic.curriculum.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/courses/${basic.slug}`}
              className="mt-8 block rounded-full border-2 border-brand px-5 py-3 text-center text-sm font-bold text-brand transition hover:bg-brand-light"
            >
              詳しく見る
            </Link>
          </div>

          <div className="relative flex flex-col rounded-2xl border-2 border-brand bg-card p-8 shadow-lg shadow-brand/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold text-neutral-900">
              一番人気
            </span>
            <span className="text-2xl">{premium.emoji}</span>
            <h3 className="mt-3 text-lg font-bold text-foreground">
              プレミアム(自社調味料付き)
            </h3>
            <div className="mt-2 text-3xl font-black text-brand">
              ¥10,000<span className="text-sm font-bold text-foreground/60">/月</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-foreground/80">
              {premium.curriculum.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brand">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/courses/${premium.slug}`}
              className="mt-8 block rounded-full bg-brand px-5 py-3 text-center text-sm font-bold text-neutral-900 transition hover:bg-brand-dark"
            >
              詳しく見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
