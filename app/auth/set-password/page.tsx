import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { SetPasswordForm } from "./set-password-form";

export default async function SetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Só chega aqui vindo de um link de convite/redefinição válido — sem
  // sessão, não tem o que fazer nessa tela.
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="text-center">
        <Logo className="justify-center text-sm" />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Crie uma senha para acessar sua área de membros.
        </p>
      </div>
      <SetPasswordForm email={user.email ?? ""} />
    </main>
  );
}
