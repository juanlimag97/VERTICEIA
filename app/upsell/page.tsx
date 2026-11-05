import { UpsellContent } from "./upsell-content";

export const metadata = {
  title: "Acesso liberado — Attendio",
  description: "Assista até o final antes de continuar.",
  robots: { index: false, follow: false },
};

export default function UpsellPage() {
  return (
    <>
      {/* Dicas de carregamento recomendadas pela VTurb pro player dessa página */}
      <link
        rel="preload"
        href="https://scripts.converteai.net/b639b32a-d7d7-4939-90a6-b87dc343b73d/players/6aecf673341e13d80c8c0e02/v4/player.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://cdn.converteai.net/b639b32a-d7d7-4939-90a6-b87dc343b73d/6aecf63d651497435eb440d0/main.m3u8"
        as="fetch"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />
      <UpsellContent />
    </>
  );
}
