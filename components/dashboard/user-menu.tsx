"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { signOut } from "@/app/dashboard/actions";

function initialsFrom(label: string) {
  const parts = label.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + second).toUpperCase();
}

export function UserMenu({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 text-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
          {initialsFrom(name || email)}
        </span>
        <span className="hidden max-w-[10rem] truncate font-medium sm:inline">
          {name || email}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 px-3 py-2 dark:border-zinc-800">
            <p className="truncate text-sm font-medium">{name || "Minha conta"}</p>
            <p className="truncate text-xs text-zinc-500">{email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/40"
            >
              Sair
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
