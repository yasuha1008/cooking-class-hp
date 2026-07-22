import Image from "next/image";
import Link from "next/link";
import { courses } from "@/lib/data";

export default function Courses() {
  return (
    <section id="courses" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="COURSES" title="コース一覧" />
      <p className="mx-auto -mt-4 mb-12 max-w-xl text-center text-sm text-foreground/60">
        未経験からステップアップまで、目的に合わせた多彩なコースをご用意しています
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Link
            key={c.slug}
            href={`/courses/${c.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-brand-light bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
          >
            <div
              className={`relative flex h-36 items-center justify-center border-b-2 border-brand/60 bg-gradient-to-br ${c.gradient} text-5xl`}
            >
              {c.photo ? (
                <Image
                  src={c.photo}
                  alt={c.title}
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                c.emoji
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-2 inline-block w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">
                {c.category}
              </span>
              <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/60">
                {c.summary}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-brand-dark">
                詳しく見る
                <span className="ml-1 transition group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-4 text-center">
      <p className="text-xs font-bold tracking-widest text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black text-foreground">{title}</h2>
    </div>
  );
}
