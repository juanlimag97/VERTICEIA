import { ArrowRight, Rocket } from "lucide-react";

export function ImplementacaoUpsellCard() {
  const checkoutUrl = process.env.NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-white">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-600/30 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-medium tracking-widest text-indigo-300 uppercase">
              Oferta exclusiva
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              Implementação com a equipe
            </h3>
            <p className="mt-1 max-w-md text-sm text-zinc-400">
              A gente implementa tudo pra você, do zero. R$ 1.500.
            </p>
          </div>
        </div>
        <a
          href={checkoutUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
        >
          Quero a implementação
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
