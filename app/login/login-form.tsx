"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "magic-link" | "password";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("magic-link");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Só quem já tem conta (criada pelo webhook da Hubla) recebe o
        // link — evita que qualquer visitante crie contas vazias ou
        // consiga mandar e-mail nosso pra um endereço arbitrário.
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(
          redirectTo
        )}`,
      },
    });

    setLoading(false);
    // Se o erro for "conta não existe" (por causa do shouldCreateUser
    // acima), mostra a mesma tela de "link enviado" mesmo assim — assim
    // não dá pra descobrir por tentativa quais e-mails já são clientes.
    if (error && !/signup/i.test(error.message)) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      setError("E-mail ou senha inválidos.");
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium">Link enviado! ✅</p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Confira sua caixa de entrada em <strong>{email}</strong> e clique no
          link para entrar.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 flex rounded-lg bg-zinc-100 p-1 text-sm dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => setMode("magic-link")}
          className={`flex-1 rounded-md py-1.5 transition ${
            mode === "magic-link"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          Link mágico
        </button>
        <button
          type="button"
          onClick={() => setMode("password")}
          className={`flex-1 rounded-md py-1.5 transition ${
            mode === "password"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          E-mail e senha
        </button>
      </div>

      <form
        onSubmit={mode === "magic-link" ? handleMagicLink : handlePassword}
        className="flex flex-col gap-4"
      >
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
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        {mode === "password" && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading
            ? "Enviando..."
            : mode === "magic-link"
              ? "Enviar link de acesso"
              : "Entrar"}
        </button>
      </form>
    </div>
  );
}
