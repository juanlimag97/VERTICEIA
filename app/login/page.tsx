import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-nevoa px-6 py-16 dark:bg-tinta">
      <div className="text-center">
        <Logo className="justify-center text-2xl" />
        <p className="mt-3 text-sm text-cinza-texto">
          Entre para acessar sua área de membros.
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
