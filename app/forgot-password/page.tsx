import { Logo } from "@/components/logo";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="text-center">
        <Logo className="justify-center text-sm" />
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Vamos te mandar um link para redefinir sua senha.
        </p>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}
