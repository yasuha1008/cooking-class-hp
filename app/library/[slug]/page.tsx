import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { sql, ensureSchema } from "@/lib/db";
import { getRecipeBySlug } from "@/lib/recipes-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeChecklist from "@/components/RecipeChecklist";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  await ensureSchema();
  const rows = await sql`
    SELECT 1 FROM recipe_progress WHERE user_id = ${userId} AND recipe_slug = ${slug}
  `;
  const completed = rows.length > 0;

  async function markComplete() {
    "use server";
    const session = await auth();
    if (!session?.user?.id) redirect("/login");
    await ensureSchema();
    await sql`
      INSERT INTO recipe_progress (user_id, recipe_slug)
      VALUES (${session.user.id}, ${slug})
      ON CONFLICT (user_id, recipe_slug) DO NOTHING
    `;
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-5 py-16">
          <Link
            href="/library"
            className="text-xs font-bold text-foreground/60 hover:underline"
          >
            ← レシピライブラリに戻る
          </Link>

          <span className="mt-4 inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-bold text-brand-dark">
            {recipe.category}
          </span>
          <h1 className="mt-3 text-3xl font-black text-foreground">
            {recipe.title}
          </h1>
          <p className="mt-2 text-sm text-foreground/70">{recipe.summary}</p>

          <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl border border-brand-light bg-card">
            {recipe.video_url ? (
              <iframe
                src={recipe.video_url}
                className="h-full w-full rounded-2xl"
                allowFullScreen
              />
            ) : (
              <p className="text-sm text-foreground/40">動画は準備中です</p>
            )}
          </div>

          <h2 className="mt-10 text-xl font-bold text-foreground">材料</h2>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {recipe.ingredients.map((ing) => (
              <li key={ing} className="flex gap-2">
                <span className="text-brand">・</span>
                {ing}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-bold text-foreground">
            手順(理解したらチェックしてください)
          </h2>
          <RecipeChecklist
            steps={recipe.steps}
            completed={completed}
            onComplete={markComplete}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
