import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { ProductIcon } from "@/components/product-icon";

export function ProductCard({
  id,
  name,
  description,
  unlocked,
}: {
  id: string;
  name: string;
  description: string | null;
  unlocked: boolean;
}) {
  const content = (
    <div
      className={`group flex h-full flex-col justify-between gap-6 rounded-2xl border p-6 transition ${
        unlocked
          ? "border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-none"
          : "border-zinc-200/70 bg-zinc-100/60 dark:border-zinc-800/70 dark:bg-zinc-900/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            unlocked
              ? "bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400"
              : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600"
          }`}
        >
          <ProductIcon productId={id} className="h-5 w-5" />
        </span>
        {!unlocked && <Lock className="h-4 w-4 text-zinc-400" />}
      </div>

      <div>
        <h3 className="font-medium">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>

      <p
        className={`flex items-center gap-1 text-sm font-medium ${
          unlocked
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-zinc-400 dark:text-zinc-600"
        }`}
      >
        {unlocked ? (
          <>
            Acessar
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </>
        ) : (
          "Sem acesso"
        )}
      </p>
    </div>
  );

  if (!unlocked) {
    return <div aria-disabled>{content}</div>;
  }

  return <Link href={`/dashboard/${id}`}>{content}</Link>;
}
