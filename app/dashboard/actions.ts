"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function toggleProductCompletion(productId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: access } = await supabase
    .from("product_access")
    .select("completed_at")
    .eq("profile_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  await supabase
    .from("product_access")
    .update({ completed_at: access?.completed_at ? null : new Date().toISOString() })
    .eq("profile_id", user.id)
    .eq("product_id", productId);

  revalidatePath(`/dashboard/${productId}`);
}
