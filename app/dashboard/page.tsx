import { createClient } from "@/lib/supabase/server";
import { getProductsWithAccess, greeting } from "@/lib/dashboard";
import { ProductCard } from "@/components/product-card";
import { ImplementacaoUpsellCard } from "@/components/upsell-card";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getProductsWithAccess(supabase);
  const filtered = q
    ? products.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      )
    : products;

  const firstName = (user?.user_metadata?.full_name as string | undefined)
    ?.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {greeting()}
          {firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Seus produtos e módulos, todos em um só lugar.
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              unlocked={product.unlocked}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          Nenhum produto encontrado para &ldquo;{q}&rdquo;.
        </p>
      )}

      <ImplementacaoUpsellCard />
    </div>
  );
}
