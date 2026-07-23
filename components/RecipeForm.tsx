"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { RecipeInput } from "@/lib/recipes-db";

export default function RecipeForm({
  initial,
  onSave,
}: {
  initial?: Partial<RecipeInput>;
  onSave: (input: RecipeInput) => Promise<void>;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(initial?.category ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [photoUrl, setPhotoUrl] = useState(initial?.photoUrl ?? "");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [ingredients, setIngredients] = useState(
    (initial?.ingredients ?? []).join("\n")
  );
  const [steps, setSteps] = useState((initial?.steps ?? []).join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await onSave({
        category,
        title,
        summary,
        photoUrl: photoUrl.trim() || null,
        videoUrl: videoUrl.trim() || null,
        ingredients: ingredients
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        steps: steps
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      router.push("/admin/recipes");
      router.refresh();
    } catch {
      setError("保存に失敗しました。もう一度お試しください。");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-xs font-bold text-foreground/60">
        カテゴリ(例: 中華 / 居酒屋)
        <input
          required
          type="text"
          className="input mt-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        タイトル
        <input
          required
          type="text"
          className="input mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        概要(一覧に表示される短い説明)
        <textarea
          required
          rows={2}
          className="input mt-1"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        写真URL(任意。例: /photos/dish-plating.jpg)
        <input
          type="text"
          className="input mt-1"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        動画URL(任意。YouTube埋め込みURLなど)
        <input
          type="text"
          className="input mt-1"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        材料(1行に1つずつ入力してください)
        <textarea
          required
          rows={5}
          className="input mt-1"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </label>

      <label className="block text-xs font-bold text-foreground/60">
        手順(1行に1つずつ入力してください)
        <textarea
          required
          rows={6}
          className="input mt-1"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-full bg-brand py-3 text-sm font-bold text-neutral-900 transition hover:bg-brand-dark disabled:opacity-50"
      >
        {saving ? "保存中..." : "保存する"}
      </button>
    </form>
  );
}
