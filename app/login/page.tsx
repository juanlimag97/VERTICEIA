import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="text-center">
        <Logo className="justify-center text-sm" />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Entre para acessar sua área de membros.
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
