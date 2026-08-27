export function ImplementacaoUpsellCard() {
  const checkoutUrl = process.env.NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL;

  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-zinc-900 bg-zinc-900 p-6 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide opacity-70">
          Oferta exclusiva
        </p>
        <h3 className="mt-1 text-lg font-semibold">
          Implementação com a equipe
        </h3>
        <p className="mt-1 text-sm opacity-80">
          A gente implementa tudo pra você. R$ 1.500.
        </p>
      </div>
      <a
        href={checkoutUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-md bg-white px-5 py-2.5 text-center text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-700"
      >
        Quero a implementação
      </a>
    </div>
  );
}
