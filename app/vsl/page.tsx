import { VslContent } from "./vsl-content";

export const metadata = {
  title: "Aula liberada — Attendio",
  description:
    "A Attendio responde, qualifica e agenda no WhatsApp e no Instagram. Antes que seu cliente pense em desistir.",
};

export default function VslPage() {
  return (
    <>
      {/* Dicas de carregamento recomendadas pela VTurb pro player da aula */}
      <link
        rel="preload"
        href="https://scripts.converteai.net/b639b32a-d7d7-4939-90a6-b87dc343b73d/ab-test/6aecf327f821f994a63b6e39/player.js"
        as="script"
      />
      <link
        rel="preload"
        href="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js"
        as="script"
      />
      <link rel="dns-prefetch" href="https://cdn.converteai.net" />
      <link rel="dns-prefetch" href="https://scripts.converteai.net" />
      <link rel="dns-prefetch" href="https://images.converteai.net" />
      <link rel="dns-prefetch" href="https://m3u8.vturb.net" />
      <link rel="dns-prefetch" href="https://license.vturb.com" />
      <VslContent />
    </>
  );
}
