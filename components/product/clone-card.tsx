import { ArrowUpRight } from "lucide-react";

export function CloneCard({ cloneUrl }: { cloneUrl: string | null }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[11px] font-medium tracking-widest text-zinc-500 uppercase">
        Arquivos e links
      </p>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-[11px] font-medium tracking-widest text-zinc-500 uppercase">
          Projeto incluído · Lovable
        </p>
        <h3 className="mt-2 text-lg font-semibold">
          Este projeto já é <em className="not-italic text-indigo-600 dark:text-indigo-400">seu</em>.
        </h3>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          A Vértice IA construiu e investiu neste projeto — e transfere uma
          cópia completa pra sua conta do Lovable. É isso que o remix faz: um
          clique, o Lovable duplica o projeto, e ele passa a ser 100% seu pra
          editar e publicar.
        </p>

        <p className="mt-5 text-sm font-medium">Implementar solução:</p>
        <a
          href={cloneUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Receber o projeto no Lovable
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
