import type { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

export async function getProductsWithAccess(supabase: SupabaseClient) {
  const [{ data: products }, { data: access }] = await Promise.all([
    supabase.from("products").select("*").order("sort_order"),
    supabase
      .from("product_access")
      .select("product_id")
      .is("revoked_at", null),
  ]);

  const unlockedIds = new Set((access ?? []).map((a) => a.product_id));

  return (products ?? []).map((product) => ({
    ...product,
    unlocked: unlockedIds.has(product.id),
  }));
}

export function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}
