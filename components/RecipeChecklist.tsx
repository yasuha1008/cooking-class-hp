"use client";

import { useState, useTransition } from "react";

export default function RecipeChecklist({
  steps,
  completed,
  onComplete,
}: {
  steps: string[];
  completed: boolean;
  onComplete: () => Promise<void>;
}) {
  const [checked, setChecked] = useState<boolean[]>(
    steps.map(() => completed)
  );
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(completed);

  const allChecked = checked.every(Boolean);

  return (
    <div>
      <ol className="mt-4 space-y-3">
        {steps.map((step, i) => (
          <li key={step} className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={(e) => {
                const next = [...checked];
                next[i] = e.target.checked;
                setChecked(next);
              }}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
            />
            <span className="text-foreground/80">
              <span className="mr-2 font-bold text-brand">{i + 1}.</span>
              {step}
            </span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        disabled={!allChecked || done || isPending}
        onClick={() => {
          startTransition(async () => {
            await onComplete();
            setDone(true);
          });
        }}
        className="mt-8 w-full rounded-full bg-brand py-3 text-sm font-bold text-neutral-900 transition hover:bg-brand-dark disabled:opacity-40"
      >
        {done
          ? "✓ このレシピは完了しました"
          : allChecked
            ? isPending
              ? "保存中..."
              : "このレシピを完了にする"
            : "すべての手順にチェックを付けてください"}
      </button>
    </div>
  );
}
