import { Logo } from "@/components/logo";
import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 bg-nevoa px-6 py-16 dark:bg-tinta">
      <div className="text-center">
        <Logo className="justify-center text-2xl" />
        <p className="mt-3 text-sm text-cinza-texto">
          Vamos te mandar um link para redefinir sua senha.
        </p>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}
