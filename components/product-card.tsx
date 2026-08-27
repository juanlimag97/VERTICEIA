import Link from "next/link";

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
      className={`flex h-full flex-col justify-between rounded-xl border p-5 transition ${
        unlocked
          ? "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
          : "border-zinc-200 bg-zinc-100 opacity-70 dark:border-zinc-800 dark:bg-zinc-900/40"
      }`}
    >
      <div>
        <h3 className="font-medium">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
      </div>
      <p className="mt-4 text-sm font-medium">
        {unlocked ? "Acessar →" : "🔒 Sem acesso"}
      </p>
    </div>
  );

  if (!unlocked) {
    return <div aria-disabled>{content}</div>;
  }

  return <Link href={`/dashboard/${id}`}>{content}</Link>;
}
