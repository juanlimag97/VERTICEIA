// Conteúdo da página pública /inicio (link da bio). Textos marcados com
// [COLCHETES] são placeholder — troque antes de divulgar o link de verdade.

export type SiteProduct = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  checkoutUrl: string;
};

export const siteProducts: SiteProduct[] = [
  {
    id: "vertice-ia",
    name: "Vértice IA",
    tagline:
      "Do zero até implementar seu primeiro agente de IA vendendo no seu negócio.",
    price: "[PREÇO]",
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_VERTICE_IA || "#",
  },
  {
    id: "perfil-que-converte",
    name: "Perfil que Converte",
    tagline:
      "4 aulas curtas pra transformar seu Instagram comercial em máquina de agendar cliente.",
    price: "[PREÇO]",
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_PERFIL_CONVERTE || "#",
  },
  {
    id: "reputacao-5-estrelas",
    name: "Reputação 5 Estrelas",
    tagline:
      "Como conseguir mais avaliações 5 estrelas no Google — com bônus de automação via WhatsApp.",
    price: "R$ 97",
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_REPUTACAO || "#",
  },
  {
    id: "formatos-de-criativo",
    name: "Formatos de Criativo",
    tagline:
      "40 formatos de criativo validados, com exemplo em vídeo de cada um.",
    price: "[PREÇO]",
    checkoutUrl: process.env.NEXT_PUBLIC_CHECKOUT_FORMATOS || "#",
  },
];

export const siteStats: { value: string; label: string }[] = [
  { value: "[N]", label: "negócios já aplicaram" },
  { value: "[N]", label: "avaliações 5 estrelas geradas" },
  { value: "[N]", label: "aulas práticas" },
];
