"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function DeleteRecipeButton({
  onDelete,
}: {
  onDelete: () => Promise<void>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!confirm("このレシピを削除しますか？元に戻せません。")) return;
        startTransition(async () => {
          await onDelete();
          router.refresh();
        });
      }}
      className="text-sm font-bold text-red-400 hover:underline disabled:opacity-50"
    >
      {isPending ? "削除中..." : "削除"}
    </button>
  );
}
