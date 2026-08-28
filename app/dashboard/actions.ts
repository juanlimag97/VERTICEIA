"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function toggleProductCompletion(productId: string) {
  // A tabela product_access não tem policy de UPDATE para usuários comuns
  // (de propósito — só o webhook, com a service role, pode conceder/revogar
  // acesso). Por isso a leitura da sessão usa o client normal (respeitando
  // RLS), mas a escrita usa o client admin — sempre restrita ao próprio
  // `user.id` vindo da sessão verificada no servidor, nunca a um valor
  // vindo do cliente.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const admin = createAdminClient();

  const { data: access } = await admin
    .from("product_access")
    .select("completed_at")
    .eq("profile_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  await admin
    .from("product_access")
    .update({ completed_at: access?.completed_at ? null : new Date().toISOString() })
    .eq("profile_id", user.id)
    .eq("product_id", productId);

  revalidatePath(`/dashboard/${productId}`);
}
