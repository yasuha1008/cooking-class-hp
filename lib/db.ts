import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

type NeonSql = NeonQueryFunction<false, false>;

let _client: NeonSql | null = null;

function getClient(): NeonSql {
  if (!_client) {
    const connectionString =
      process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL (or POSTGRES_URL) is not set. Add a Postgres database in the Vercel dashboard, or set it in .env.local for local development."
      );
    }
    _client = neon(connectionString);
  }
  return _client;
}

// Lazily instantiates the Neon client on first query, so importing this
// module (e.g. during `next build` page-data collection) never requires
// DATABASE_URL to be set.
export const sql: NeonSql = new Proxy(function () {} as unknown as NeonSql, {
  apply(_target, _thisArg, args) {
    return (getClient() as (...a: unknown[]) => unknown)(...args);
  },
});

let migrated = false;

export async function ensureSchema() {
  if (migrated) return;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS recipe_progress (
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      recipe_slug TEXT NOT NULL,
      completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (user_id, recipe_slug)
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS recipes (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      photo_url TEXT,
      video_url TEXT,
      ingredients TEXT[] NOT NULL DEFAULT '{}',
      steps TEXT[] NOT NULL DEFAULT '{}',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  const { recipes: seedRecipes } = await import("./recipes");
  for (const r of seedRecipes) {
    await sql`
      INSERT INTO recipes (slug, category, title, summary, photo_url, video_url, ingredients, steps)
      VALUES (${r.slug}, ${r.category}, ${r.title}, ${r.summary}, ${r.photo ?? null}, ${r.videoUrl ?? null}, ${r.ingredients}, ${r.steps})
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  migrated = true;
}
