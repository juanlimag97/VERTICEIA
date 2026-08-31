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
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:shadow-none"
          >
            <div className="flex flex-1 items-center gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {String(format.number).padStart(2, "0")}
              </span>
              <span className="font-medium">{format.title}</span>
            </div>
            <span className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-500 py-2.5 text-xs font-semibold tracking-wide text-white uppercase transition group-hover:from-indigo-500 group-hover:to-indigo-400">
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
            className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {String(open.number).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-semibold">{open.title}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              {open.description}
            </p>

            <p className="mt-6 text-[11px] font-medium tracking-widest text-zinc-500 uppercase">
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
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase transition ${
                      index === activeExample
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
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
