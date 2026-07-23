import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";
import { getAllRecipes, deleteRecipe } from "@/lib/recipes-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";

export default async function AdminRecipesPage() {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) redirect("/");

  const recipes = await getAllRecipes();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-5 py-16">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-widest text-brand">
                ADMIN
              </p>
              <h1 className="mt-2 text-3xl font-black text-foreground">
                レシピ管理
              </h1>
            </div>
            <Link
              href="/admin/recipes/new"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-brand-dark"
            >
              + 新しいレシピ
            </Link>
          </div>

          <div className="mt-8 divide-y divide-brand-light rounded-2xl border border-brand-light bg-card">
            {recipes.length === 0 && (
              <p className="p-6 text-sm text-foreground/60">
                まだレシピがありません。
              </p>
            )}
            {recipes.map((r) => {
              async function handleDelete() {
                "use server";
                const session = await auth();
                if (!isAdmin(session?.user?.email)) redirect("/");
                await deleteRecipe(r.id);
              }
              return (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div>
                    <span className="inline-block rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-bold text-brand-dark">
                      {r.category}
                    </span>
                    <h3 className="mt-1 font-bold text-foreground">
                      {r.title}
                    </h3>
                    <p className="text-xs text-foreground/50">{r.summary}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <Link
                      href={`/admin/recipes/${r.id}/edit`}
                      className="text-sm font-bold text-brand hover:underline"
                    >
                      編集
                    </Link>
                    <DeleteRecipeButton onDelete={handleDelete} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
