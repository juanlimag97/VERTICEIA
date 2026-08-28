import { CheckCircle2, Circle } from "lucide-react";
import { toggleProductCompletion } from "@/app/dashboard/actions";

export function CompleteToggle({
  productId,
  completed,
}: {
  productId: string;
  completed: boolean;
}) {
  const action = toggleProductCompletion.bind(null, productId);

  return (
    <form action={action}>
      <button
        type="submit"
        className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
          completed
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400"
            : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <Circle className="h-4 w-4" />
        )}
        {completed ? "Concluída" : "Marcar como concluída"}
      </button>
    </form>
  );
}
