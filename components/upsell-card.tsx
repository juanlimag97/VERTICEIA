import { ArrowRight, Rocket } from "lucide-react";

export function ImplementacaoUpsellCard() {
  const checkoutUrl = process.env.NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL;

  return (
    <div className="rounded-2xl border border-white/10 bg-tinta p-8 text-nevoa">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-volt/15 text-volt">
            <Rocket className="h-5 w-5" />
          </span>
          <div>
            <p className="label-mono text-xs text-volt">
              Oferta exclusiva
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              Implementação com a equipe
            </h3>
            <p className="mt-1 max-w-md text-sm text-cinza-texto">
              A gente implementa tudo pra você, do zero. R$ 1.500.
            </p>
          </div>
        </div>
        <a
          href={checkoutUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-volt px-6 text-sm font-medium text-tinta transition hover:bg-volt-escuro"
        >
          Quero a implementação
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
