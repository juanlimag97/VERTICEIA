import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Vértice IA</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Entre para acessar sua área de membros.
        </p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
