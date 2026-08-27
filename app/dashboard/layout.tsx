import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProductsWithAccess } from "@/lib/dashboard";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Defesa em profundidade — o middleware já redireciona não autenticados.
  if (!user) {
    redirect("/login");
  }

  const products = await getProductsWithAccess(supabase);
  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "";

  return (
    <div className="flex h-full min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        products={products.map((p) => ({
          id: p.id,
          name: p.name,
          unlocked: p.unlocked,
        }))}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar name={fullName} email={user.email ?? ""} />
        <main className="flex-1 px-4 py-8 lg:px-8">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
