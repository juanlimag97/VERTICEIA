import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/product-card";
import { ImplementacaoUpsellCard } from "@/components/upsell-card";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: products }, { data: access }] = await Promise.all([
    supabase.from("products").select("*").order("sort_order"),
    supabase.from("product_access").select("product_id").is("revoked_at", null),
  ]);

  const unlockedIds = new Set((access ?? []).map((a) => a.product_id));
  const firstName = (user?.user_metadata?.full_name as string | undefined)
    ?.split(" ")[0];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-semibold">
          {firstName ? `${firstName}, bem-vindo` : "Bem-vindo"} 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Aqui estão seus produtos e módulos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(products ?? []).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            unlocked={unlockedIds.has(product.id)}
          />
        ))}
      </div>

      <ImplementacaoUpsellCard />
    </div>
  );
}
