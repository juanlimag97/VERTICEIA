"use client";

import { useEffect, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { creativeFormats, type CreativeFormat } from "@/lib/creative-formats";

export function CreativeFormatsGrid() {
  const [open, setOpen] = useState<CreativeFormat | null>(null);
  const [activeExample, setActiveExample] = useState(0);

  function openFormat(format: CreativeFormat) {
    setActiveExample(0);
    setOpen(format);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {creativeFormats.map((format) => (
          <button
            key={format.number}
            type="button"
            onClick={() => openFormat(format)}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60 dark:border-white/10 dark:bg-grafite dark:hover:border-white/20 dark:hover:shadow-none"
          >
            <div className="flex flex-1 items-center gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-volt text-sm font-bold text-tinta">
                {String(format.number).padStart(2, "0")}
              </span>
              <span className="font-medium">{format.title}</span>
            </div>
            <span className="label-mono flex items-center justify-center gap-1.5 bg-volt py-2.5 text-xs font-semibold text-tinta transition group-hover:bg-volt-escuro">
              Clique para ver
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-grafite"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-volt text-sm font-bold text-tinta">
                  {String(open.number).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-semibold">{open.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full p-1.5 text-cinza-texto transition hover:bg-zinc-100 dark:hover:bg-white/5"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-cinza-texto">
              {open.description}
            </p>

            <p className="label-mono mt-6 text-[11px] text-cinza-texto">
              Exemplos
            </p>

            <div className="mx-auto mt-2 aspect-[9/16] w-full max-w-[280px] overflow-hidden rounded-xl bg-black">
              <iframe
                key={open.driveFileIds[activeExample]}
                src={`https://drive.google.com/file/d/${open.driveFileIds[activeExample]}/preview`}
                className="h-full w-full"
                allow="autoplay"
                allowFullScreen
              />
            </div>

            {open.driveFileIds.length > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {open.driveFileIds.map((fileId, index) => (
                  <button
                    key={fileId}
                    type="button"
                    onClick={() => setActiveExample(index)}
                    className={`label-mono rounded-full px-3.5 py-1.5 text-xs transition ${
                      index === activeExample
                        ? "bg-volt text-tinta"
                        : "bg-zinc-100 text-cinza-texto hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-white/10"
                    }`}
                  >
                    Exemplo {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
