import type { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

// Produtos já no catálogo mas ainda não lançados pra venda — aparecem
// bloqueados com "Em breve" independente de acesso no banco.
const COMING_SOON_PRODUCT_IDS = new Set([
  "perfil-que-converte",
  "reputacao-5-estrelas",
]);

export async function getProductsWithAccess(supabase: SupabaseClient) {
  const [{ data: products }, { data: access }] = await Promise.all([
    supabase.from("products").select("*").order("sort_order"),
    supabase
      .from("product_access")
      .select("product_id")
      .is("revoked_at", null),
  ]);

  const unlockedIds = new Set((access ?? []).map((a) => a.product_id));

  return (products ?? []).map((product) => {
    const comingSoon = COMING_SOON_PRODUCT_IDS.has(product.id);
    return {
      ...product,
      comingSoon,
      unlocked: !comingSoon && unlockedIds.has(product.id),
    };
  });
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
