import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";
import { getRecipeById, updateRecipe, type RecipeInput } from "@/lib/recipes-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeForm from "@/components/RecipeForm";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) redirect("/");

  const { id } = await params;
  const recipeId = Number(id);
  const recipe = await getRecipeById(recipeId);
  if (!recipe) notFound();

  async function handleSave(input: RecipeInput) {
    "use server";
    const session = await auth();
    if (!isAdmin(session?.user?.email)) redirect("/");
    await updateRecipe(recipeId, input);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-2xl px-5 py-16">
          <p className="text-xs font-bold tracking-widest text-brand">
            ADMIN
          </p>
          <h1 className="mt-2 text-3xl font-black text-foreground">
            レシピを編集
          </h1>
          <div className="mt-8">
            <RecipeForm
              initial={{
                category: recipe.category,
                title: recipe.title,
                summary: recipe.summary,
                photoUrl: recipe.photo_url,
                videoUrl: recipe.video_url,
                ingredients: recipe.ingredients,
                steps: recipe.steps,
              }}
              onSave={handleSave}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
