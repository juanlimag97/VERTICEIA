"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export function FavoriteButton({ productId }: { productId: string }) {
  const [favorited, setFavorited] = useState(false);
  const key = `favorite:${productId}`;

  useEffect(() => {
    // Lido só depois de montar: no servidor não existe localStorage, e ler
    // aqui evita divergência entre o HTML renderizado no servidor e no cliente.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFavorited(localStorage.getItem(key) === "1");
    } catch {
      // localStorage indisponível (ex: modo privado) — mantém padrão false.
    }
  }, [key]);

  function toggle() {
    const next = !favorited;
    setFavorited(next);
    try {
      if (next) {
        localStorage.setItem(key, "1");
      } else {
        localStorage.removeItem(key);
      }
    } catch {
      // ignora — favorito é só uma conveniência local.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
    >
      <Heart
        className={`h-4 w-4 ${favorited ? "fill-red-500 text-red-500" : ""}`}
      />
      Favoritar
    </button>
  );
}
