import Image from "next/image";
import { school } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-4 inline-block rounded-full border border-brand/30 bg-card px-4 py-1 text-xs font-bold tracking-wide text-brand shadow-sm">
            オンライン完結・全国対応
          </p>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl">
            {school.catchCopy}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-foreground/70 md:text-lg">
            {school.subCopy}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#courses"
              className="rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-neutral-900 shadow-md transition hover:bg-brand-dark"
            >
              コース一覧を見る
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-brand px-7 py-3.5 text-sm font-bold text-brand-dark transition hover:bg-brand-light"
            >
              無料相談を予約
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand/20 blur-2xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 h-40 overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand/30">
              <Image
                src="/photos/cooking.jpg"
                alt="彩仙龍の調理風景"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-32 overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand/30">
              <Image
                src="/photos/dish-plating.jpg"
                alt="彩仙龍の料理"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-32 overflow-hidden rounded-3xl shadow-lg ring-1 ring-brand/30">
              <Image
                src="/photos/alcohol.jpg"
                alt="こだわりのお酒"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
