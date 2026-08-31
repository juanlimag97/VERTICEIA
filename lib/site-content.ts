// Conteúdo da página pública /inicio (link da bio), focada no produto
// principal (Vértice IA — SDR de IA integrado ao CRM). Textos marcados com
// [COLCHETES] são placeholder — troque antes de divulgar o link de verdade.

export const sdrFeatures = [
  {
    title: "Atende 24/7 no WhatsApp",
    description:
      "Responde todo lead que chega, a qualquer hora, sem depender de alguém do time estar disponível.",
  },
  {
    title: "Qualifica pelo perfil ideal",
    description:
      "Conversa com o lead pra entender se ele tem o perfil certo antes de passar pro time comercial.",
  },
  {
    title: "Agenda direto no seu CRM",
    description:
      "Quando o lead tá qualificado, marca a reunião sozinho — sem ida e volta manual.",
  },
];

export const siteStats: { value: string; label: string }[] = [
  { value: "[N]", label: "leads atendidos" },
  { value: "[N]", label: "negócios já usam" },
  { value: "24/7", label: "atendimento automático" },
];

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_VERTICE_IA || "#";
