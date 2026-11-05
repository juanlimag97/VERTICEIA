import { ArrowUpRight } from "lucide-react";

export function CloneCard({
  cloneUrl,
  platformTag = "Projeto incluído · Lovable",
  description = "A Attendio construiu e investiu neste projeto — e transfere uma cópia completa pra sua conta do Lovable. É isso que o remix faz: um clique, o Lovable duplica o projeto, e ele passa a ser 100% seu pra editar e publicar.",
  buttonLabel = "Receber o projeto no Lovable",
}: {
  cloneUrl: string | null;
  platformTag?: string;
  description?: string;
  buttonLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="label-mono text-[11px] text-cinza-texto">
        Arquivos e links
      </p>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-grafite">
        <p className="label-mono text-[11px] text-cinza-texto">
          {platformTag}
        </p>
        <h3 className="mt-2 text-lg font-semibold">
          Este projeto já é <em className="not-italic text-volt-escuro dark:text-volt">seu</em>.
        </h3>
        <p className="mt-3 text-sm text-cinza-texto">
          {description}
        </p>

        <p className="mt-5 text-sm font-medium">Implementar solução:</p>
        <a
          href={cloneUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex min-h-14 items-center justify-center gap-1.5 rounded-full bg-volt px-4 text-sm font-medium text-tinta transition hover:bg-volt-escuro"
        >
          {buttonLabel}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
