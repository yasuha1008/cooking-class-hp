import { sql, ensureSchema } from "@/lib/db";

export type DbRecipe = {
  id: number;
  slug: string;
  category: string;
  title: string;
  summary: string;
  photo_url: string | null;
  video_url: string | null;
  ingredients: string[];
  steps: string[];
  created_at: string;
};

export async function getAllRecipes(): Promise<DbRecipe[]> {
  await ensureSchema();
  const rows = await sql`SELECT * FROM recipes ORDER BY created_at ASC`;
  return rows as DbRecipe[];
}

export async function getRecipeBySlug(
  slug: string
): Promise<DbRecipe | null> {
  await ensureSchema();
  const rows = await sql`SELECT * FROM recipes WHERE slug = ${slug}`;
  return (rows[0] as DbRecipe) ?? null;
}

export async function getRecipeById(id: number): Promise<DbRecipe | null> {
  await ensureSchema();
  const rows = await sql`SELECT * FROM recipes WHERE id = ${id}`;
  return (rows[0] as DbRecipe) ?? null;
}

export type RecipeInput = {
  category: string;
  title: string;
  summary: string;
  photoUrl: string | null;
  videoUrl: string | null;
  ingredients: string[];
  steps: string[];
};

export async function createRecipe(input: RecipeInput): Promise<DbRecipe> {
  await ensureSchema();
  const slug = `recipe-${Date.now()}`;
  const rows = await sql`
    INSERT INTO recipes (slug, category, title, summary, photo_url, video_url, ingredients, steps)
    VALUES (${slug}, ${input.category}, ${input.title}, ${input.summary}, ${input.photoUrl}, ${input.videoUrl}, ${input.ingredients}, ${input.steps})
    RETURNING *
  `;
  return rows[0] as DbRecipe;
}

export async function updateRecipe(
  id: number,
  input: RecipeInput
): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE recipes
    SET category = ${input.category},
        title = ${input.title},
        summary = ${input.summary},
        photo_url = ${input.photoUrl},
        video_url = ${input.videoUrl},
        ingredients = ${input.ingredients},
        steps = ${input.steps}
    WHERE id = ${id}
  `;
}

export async function deleteRecipe(id: number): Promise<void> {
  await ensureSchema();
  await sql`DELETE FROM recipes WHERE id = ${id}`;
}
