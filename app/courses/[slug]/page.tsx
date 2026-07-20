import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { courses } from "@/lib/data";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className={`bg-gradient-to-br ${course.gradient} py-16 text-center`}
        >
          <div className="mx-auto max-w-3xl px-5">
            <Link
              href="/#courses"
              className="text-xs font-bold text-foreground/60 hover:underline"
            >
              ← コース一覧に戻る
            </Link>
            <div className="mt-4 text-6xl">{course.emoji}</div>
            <span className="mt-4 inline-block rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-foreground/70">
              {course.category}
            </span>
            <h1 className="mt-3 text-3xl font-black text-foreground md:text-4xl">
              {course.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70">
              {course.summary}
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-4xl gap-10 px-5 py-16 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-foreground">コース概要</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              {course.description}
            </p>

            <h2 className="mt-10 text-xl font-bold text-foreground">
              カリキュラム
            </h2>
            <ol className="mt-4 space-y-3">
              {course.curriculum.map((item, i) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 text-xl font-bold text-foreground">FAQ</h2>
            <div className="mt-4 space-y-4">
              {course.faq.map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl border border-brand-light p-4"
                >
                  <p className="text-sm font-bold text-foreground">
                    Q. {f.q}
                  </p>
                  <p className="mt-1 text-sm text-foreground/60">
                    A. {f.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-brand-light bg-white p-6 shadow-sm">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-bold text-foreground/50">対象レベル</dt>
                <dd className="mt-1 text-foreground/80">{course.level}</dd>
              </div>
              <div>
                <dt className="font-bold text-foreground/50">受講期間</dt>
                <dd className="mt-1 text-foreground/80">{course.duration}</dd>
              </div>
              <div>
                <dt className="font-bold text-foreground/50">料金</dt>
                <dd className="mt-1 text-foreground/80">{course.price}</dd>
              </div>
            </dl>
            <Link
              href="/#contact-form"
              className="mt-6 block rounded-full bg-brand py-3 text-center text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              無料体験レッスン予約
            </Link>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
