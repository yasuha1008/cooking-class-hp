import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/admin";
import { createRecipe, type RecipeInput } from "@/lib/recipes-db";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeForm from "@/components/RecipeForm";

export default async function NewRecipePage() {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) redirect("/");

  async function handleSave(input: RecipeInput) {
    "use server";
    const session = await auth();
    if (!isAdmin(session?.user?.email)) redirect("/");
    await createRecipe(input);
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
            新しいレシピを追加
          </h1>
          <div className="mt-8">
            <RecipeForm onSave={handleSave} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
