"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/logo";

// Placeholder — troque pelo Player ID/Token reais do VTurb dessa aula
// (ver docs/pendencias.md).
const PLAYER_ID = "SEU_PLAYER_ID_AQUI";
const TOKEN = "SEU_TOKEN_AQUI";

export function UpsellContent() {
  const playerHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const player = document.createElement("vturb-smartplayer");
    player.id = `vid-${PLAYER_ID}`;
    player.style.display = "block";
    player.style.margin = "0 auto";
    player.style.width = "100%";
    player.style.maxWidth = "400px";

    const placeholder = document.createElement("div");
    placeholder.className = "vturb-player-placeholder";
    placeholder.style.position = "relative";
    placeholder.style.width = "100%";
    placeholder.style.padding = "125% 0 0";
    placeholder.style.zIndex = "0";
    placeholder.style.backgroundColor = "black";
    player.appendChild(placeholder);

    playerHostRef.current?.appendChild(player);

    const script = document.createElement("script");
    script.src = `https://scripts.converteai.net/${TOKEN}/players/${PLAYER_ID}/v4/player.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      player.remove();
      script.remove();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-tinta text-nevoa">
      <header className="flex h-16 items-center justify-center px-6">
        <Logo variant="dark-surface" className="text-xl" />
      </header>

      <div className="animate-pulse border-y-2 border-volt bg-grafite px-4 py-3.5 text-center text-[11px] font-black tracking-widest text-nevoa uppercase shadow-[0_4px_20px_rgba(200,242,60,0.15)] sm:text-base">
        ⚠&nbsp; IMPORTANTE: ESSA PÁGINA SÓ ESTÁ ONLINE AQUI &nbsp;⚠
      </div>

      <div className="flex flex-col items-center gap-3.5 border-b border-white/10 px-6 py-5 text-center">
        <p className="text-[13px] font-black tracking-wide uppercase sm:text-lg">
          Acesso liberado: assista a aula até o final 🎁
        </p>
        <div className="h-0.5 w-[50px] rounded-full bg-volt" />
        <p className="text-[13px] font-black tracking-wide uppercase sm:text-lg">
          Toque no play para assistir a{" "}
          <span className="text-volt">1ª aula!</span>
        </p>
      </div>

      <main className="flex flex-1 items-center justify-center bg-tinta px-5 py-10">
        <div
          className="w-full max-w-[400px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(200,242,60,0.25),0_4px_20px_rgba(0,0,0,0.4)]"
          ref={playerHostRef}
        />
      </main>

      <footer className="border-t border-white/10 bg-grafite px-5 py-5 text-center text-[10px] tracking-[2px] text-cinza-texto uppercase">
        ATTEND<span className="text-volt">IO</span> © TODOS OS DIREITOS
        RESERVADOS
      </footer>
    </div>
  );
}
