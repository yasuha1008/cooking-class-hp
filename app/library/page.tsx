import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { sql, ensureSchema } from "@/lib/db";
import { recipes } from "@/lib/recipes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function LibraryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await ensureSchema();
  const rows = await sql`
    SELECT recipe_slug FROM recipe_progress WHERE user_id = ${session.user.id}
  `;
  const completedSlugs = new Set(rows.map((r) => r.recipe_slug as string));

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-5 py-16">
          <p className="text-xs font-bold tracking-widest text-brand">
            RECIPE LIBRARY
          </p>
          <h1 className="mt-2 text-3xl font-black text-foreground">
            レシピライブラリ
          </h1>
          <p className="mt-3 text-sm text-foreground/60">
            {session.user.name} さん、ようこそ。動画と手順を確認して、理解したレシピにチェックを付けていきましょう。
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((r) => {
              const done = completedSlugs.has(r.slug);
              return (
                <Link
                  key={r.slug}
                  href={`/library/${r.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-light bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/10"
                >
                  {done && (
                    <span className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-sm font-bold text-neutral-900">
                      ✓
                    </span>
                  )}
                  <div className="relative h-32 border-b-2 border-brand/60">
                    {r.photo && (
                      <Image
                        src={r.photo}
                        alt={r.title}
                        fill
                        className="object-cover opacity-80"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 inline-block w-fit rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">
                      {r.category}
                    </span>
                    <h3 className="font-bold text-foreground">{r.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-foreground/60">
                      {r.summary}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
