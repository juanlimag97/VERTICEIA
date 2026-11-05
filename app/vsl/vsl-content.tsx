"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";

export function VslContent() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGSVGElement>(null);
  const playerHostRef = useRef<HTMLDivElement>(null);
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(
      `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
    );
  }, []);

  // Animação do mock de WhatsApp — mesma lógica da versão original, só
  // portada pra refs em vez de getElementById.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function fadeIn(el: HTMLElement | null) {
      if (!el) return;
      el.style.transition = "opacity .35s, transform .35s";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }

    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let t3: ReturnType<typeof setTimeout>;
    let t4: ReturnType<typeof setTimeout>;

    function runDemo() {
      const bubble1 = row1Ref.current?.querySelector<HTMLElement>(".wa-bubble") ?? null;
      const bubble2 = row2Ref.current?.querySelector<HTMLElement>(".wa-bubble") ?? null;
      const bubble3 = row3Ref.current?.querySelector<HTMLElement>(".wa-bubble") ?? null;

      if (bubble1) {
        bubble1.style.opacity = "0";
        bubble1.style.transform = "translateY(6px)";
      }
      if (bubble3) {
        bubble3.style.opacity = "0";
        bubble3.style.transform = "translateY(6px)";
      }
      if (typingRef.current) typingRef.current.style.display = "flex";
      if (row2Ref.current) row2Ref.current.style.display = "none";
      if (row3Ref.current) row3Ref.current.style.display = "none";
      checkRef.current?.classList.remove("show");

      if (reduceMotion) {
        fadeIn(bubble1);
        if (typingRef.current) typingRef.current.style.display = "none";
        if (row2Ref.current) row2Ref.current.style.display = "flex";
        fadeIn(bubble2);
        checkRef.current?.classList.add("show");
        if (row3Ref.current) row3Ref.current.style.display = "flex";
        fadeIn(bubble3);
        return;
      }

      t1 = setTimeout(() => fadeIn(bubble1), 300);
      t2 = setTimeout(() => {
        if (typingRef.current) typingRef.current.style.display = "none";
        if (row2Ref.current) row2Ref.current.style.display = "flex";
        fadeIn(bubble2);
        t4 = setTimeout(() => checkRef.current?.classList.add("show"), 500);
      }, 1500);
      t3 = setTimeout(() => {
        if (row3Ref.current) row3Ref.current.style.display = "flex";
        fadeIn(bubble3);
      }, 3000);
    }

    runDemo();
    const interval = setInterval(runDemo, 6800);
    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Player VTurb — injeta o elemento customizado + script deles, exatamente
  // como no embed de A/B test fornecido pela VTurb (id prefixado "ab-" e
  // script na rota /ab-test/). O placeholder interno com aspect-ratio
  // próprio não vem no embed deles, mas mantemos pra evitar o layout
  // "pular" enquanto o script carrega.
  useEffect(() => {
    const PLAYER_ID = "6aecf327f821f994a63b6e39";
    const TOKEN = "b639b32a-d7d7-4939-90a6-b87dc343b73d";

    const player = document.createElement("vturb-smartplayer");
    player.id = `ab-${PLAYER_ID}`;
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
    script.src = `https://scripts.converteai.net/${TOKEN}/ab-test/${PLAYER_ID}/player.js`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      player.remove();
      script.remove();
    };
  }, []);

  // UTMify — troque pelo Pixel ID real.
  useEffect(() => {
    (window as unknown as { pixelId?: string }).pixelId = "SEU_PIXEL_ID_AQUI";
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <div className="vsl-page">
      <style>{`
        .vsl-page {
          background: var(--tinta);
          color: var(--nevoa);
          font-family: var(--font-sans), Arial, sans-serif;
          min-height: 100vh;
        }
        .vsl-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          max-width: 520px;
          margin: 0 auto;
        }
        .vsl-urgencia {
          text-align: center;
          padding: 12px 16px 11px;
          background: rgb(200 242 60 / 12%);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .vsl-urgencia .linha1 {
          font-family: var(--font-display), var(--font-sans), sans-serif;
          font-size: clamp(13px, 4vw, 16.5px);
          font-weight: 700;
          letter-spacing: 0.2px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .vsl-urgencia .riscado { color: var(--cinza-texto); text-decoration: line-through; font-weight: 600; }
        .vsl-urgencia .gratis { color: var(--volt); font-weight: 700; text-shadow: 0 0 14px rgb(200 242 60 / 55%); }
        .vsl-urgencia .data { color: var(--volt); font-weight: 700; text-shadow: 0 0 14px rgb(200 242 60 / 45%); }
        .vsl-urgencia .sep { color: rgba(255,255,255,0.3); margin: 0 7px; }
        .vsl-urgencia .linha2 {
          font-family: var(--font-mono), monospace;
          font-size: clamp(9.5px, 2.8vw, 11px);
          font-weight: 600;
          letter-spacing: 2.2px;
          text-transform: uppercase;
          color: var(--cinza-texto);
        }
        .vsl-urgencia .dot {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: var(--volt); box-shadow: 0 0 6px var(--volt);
          animation: vsl-pulse 1.4s infinite; margin: 0 6px; vertical-align: 1px;
        }
        @keyframes vsl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }

        .vsl-main { max-width: 520px; margin: 0 auto; padding: 38px 22px 24px; }
        .vsl-main h1 {
          font-size: clamp(26px, 7vw, 34px);
          line-height: 1.22;
          margin-bottom: 14px;
        }
        .vsl-main h1 em { font-style: italic; font-weight: inherit; color: var(--volt); }
        .vsl-sub { color: var(--cinza-texto); font-size: 15px; line-height: 1.6; max-width: 400px; margin-bottom: 28px; }

        .wa-phone {
          background: #0B141A;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 26px;
        }
        .wa-header { display: flex; align-items: center; gap: 10px; background: #1F2C34; padding: 10px 14px; }
        .wa-header .back { color: #fff; opacity: .8; }
        .wa-header .avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--volt);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .wa-header .info { flex: 1; min-width: 0; }
        .wa-header .info .name { font-size: 14.5px; font-weight: 600; color: #fff; }
        .wa-header .info .status { font-size: 11.5px; color: #8FE3A0; }
        .wa-header .icons { display: flex; gap: 16px; color: #D4D8DB; opacity: .85; }

        .wa-thread {
          padding: 14px 10px 8px;
          min-height: 230px;
          background-image:
            radial-gradient(circle at 15% 20%, rgba(255,255,255,0.025) 1.5px, transparent 1.5px),
            radial-gradient(circle at 45% 60%, rgba(255,255,255,0.025) 1.5px, transparent 1.5px),
            radial-gradient(circle at 75% 30%, rgba(255,255,255,0.025) 1.5px, transparent 1.5px),
            radial-gradient(circle at 85% 75%, rgba(255,255,255,0.025) 1.5px, transparent 1.5px),
            radial-gradient(circle at 25% 85%, rgba(255,255,255,0.025) 1.5px, transparent 1.5px);
          background-size: 90px 90px;
        }
        .wa-row { display: flex; margin-bottom: 6px; }
        .wa-row.in { justify-content: flex-start; }
        .wa-row.out { justify-content: flex-end; }
        .wa-bubble {
          max-width: 78%; padding: 7px 9px 6px 10px; border-radius: 8px;
          font-size: 13.5px; line-height: 1.4; position: relative;
          opacity: 0; transform: translateY(6px);
        }
        .wa-row.in .wa-bubble { background: #1F2C34; color: #E9EDEF; border-top-left-radius: 2px; }
        .wa-row.out .wa-bubble { background: #005C4B; color: #E9EDEF; border-top-right-radius: 2px; }
        .wa-meta { display: flex; align-items: center; justify-content: flex-end; gap: 3px; margin-top: 2px; font-size: 10.5px; color: rgba(233,237,239,0.55); }
        .wa-meta .check { opacity: 0; transition: opacity .3s; }
        .wa-meta .check.show { opacity: 1; }
        .wa-typing { display: inline-flex; align-items: center; gap: 3px; background: #1F2C34; padding: 9px 12px; border-radius: 8px; border-top-left-radius: 2px; }
        .wa-typing span { width: 5px; height: 5px; border-radius: 50%; background: #8696A0; animation: vsl-bounce 1.2s infinite ease-in-out; }
        .wa-typing span:nth-child(2) { animation-delay: .15s; }
        .wa-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes vsl-bounce { 0%, 60%, 100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-3px); opacity: 1; } }

        .wa-input { display: flex; align-items: center; gap: 10px; background: #1F2C34; padding: 9px 12px; }
        .wa-input .field { flex: 1; background: #2A3942; border-radius: 20px; padding: 8px 14px; font-size: 13px; color: #8696A0; }
        .wa-input .mic { color: #D4D8DB; opacity: .85; }

        .vsl-demo-foot {
          text-align: center; padding: 9px 14px; font-size: 11.5px; color: var(--cinza-texto);
          font-family: var(--font-mono), monospace;
          background: #1F2C34; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .vsl-demo-foot b { color: var(--volt); font-weight: 600; }

        .vsl-player {
          border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);
          background: var(--grafite);
          display: flex; align-items: center; justify-content: center; padding: 6px;
        }

        .vsl-footer {
          max-width: 520px; margin: 0 auto; text-align: center; padding: 24px 20px;
          font-family: var(--font-display), var(--font-sans), sans-serif;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: var(--cinza-texto); border-top: 1px solid rgba(255,255,255,0.1);
        }
        .vsl-footer em { font-style: normal; color: var(--volt); }

        @media (prefers-reduced-motion: reduce) {
          .vsl-urgencia .dot, .wa-typing span { animation: none; }
        }
      `}</style>

      <header className="vsl-header">
        <Logo variant="dark-surface" className="text-xl" />
      </header>

      <div className="vsl-urgencia">
        <div className="linha1">
          AULA LIBERADA <span className="sep">|</span> DE <span className="riscado">R$397</span> POR{" "}
          <span className="gratis">R$0</span> <span className="sep">|</span> ACABA HOJE{" "}
          <span className="data">{today}</span>
        </div>
        <div className="linha2">
          <span className="dot" />
          ASSISTA ANTES QUE SAIA DO AR
          <span className="dot" />
        </div>
      </div>

      <main className="vsl-main">
        <h1>
          Todo lead recebe resposta.
          <br />
          <em>Nenhum cliente espera.</em>
        </h1>
        <p className="vsl-sub">
          A Attendio responde, qualifica e agenda no WhatsApp e no Instagram.
          Antes que seu cliente pense em desistir.
        </p>

        <div className="wa-phone" aria-hidden="true">
          <div className="wa-header">
            <svg className="back" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="avatar">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#0B0F14" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#0B0F14" />
              </svg>
            </div>
            <div className="info">
              <div className="name">Maria Silva</div>
              <div className="status">online</div>
            </div>
            <div className="icons">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.902.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.908.338 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="wa-thread">
            <div className="wa-row in" ref={row1Ref}>
              <div className="wa-bubble">
                Oi, vi o anúncio. Vocês atendem sábado?
                <div className="wa-meta">23:47</div>
              </div>
            </div>
            <div className="wa-row in" ref={typingRef}>
              <div className="wa-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="wa-row out" ref={row2Ref} style={{ display: "none" }}>
              <div className="wa-bubble">
                Atendemos sim! Posso te encaixar às 10h ou às 15h — qual fica melhor?
                <div className="wa-meta">
                  23:47
                  <svg ref={checkRef} className="check" width="15" height="10" viewBox="0 0 16 11" fill="none">
                    <path d="M1 5.5L4.5 9L11 1.5" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 5.5L9 9L15.5 1.5" stroke="#53BDEB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="wa-row in" ref={row3Ref} style={{ display: "none" }}>
              <div className="wa-bubble">
                Perfeito, pode ser às 15h! Confirmado então
                <div className="wa-meta">23:48</div>
              </div>
            </div>
          </div>

          <div className="wa-input">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="9" cy="9" r="1" fill="currentColor" />
              <circle cx="15" cy="9" r="1" fill="currentColor" />
            </svg>
            <div className="field">Mensagem</div>
            <svg className="mic" width="19" height="19" viewBox="0 0 24 24" fill="none">
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" />
              <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="vsl-demo-foot">
            respondido em <b>0.8 segundos</b> — 23h47, um sábado
          </p>
        </div>

        <div className="vsl-player" ref={playerHostRef} />
      </main>

      <footer className="vsl-footer">
        ATTEND<em>IO</em> © TODOS OS DIREITOS RESERVADOS
      </footer>
    </div>
  );
}
