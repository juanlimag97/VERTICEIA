"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirectTo=/auth/set-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-grafite">
        <p className="font-medium">Se esse e-mail tiver conta, o link chegou ✅</p>
        <p className="mt-2 text-sm text-cinza-texto">
          Confira sua caixa de entrada em <strong>{email}</strong> (e o spam)
          e clique no link para criar uma nova senha.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-grafite">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-volt focus:ring-1 focus:ring-volt dark:border-white/10 dark:bg-grafite"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="min-h-14 rounded-full bg-volt text-sm font-medium text-tinta transition hover:bg-volt-escuro disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar link de redefinição"}
        </button>

        <Link
          href="/login"
          className="text-center text-sm text-cinza-texto hover:text-tinta dark:hover:text-nevoa"
        >
          Voltar para o login
        </Link>
      </form>
    </div>
  );
}
