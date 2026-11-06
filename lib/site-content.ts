// Conteúdo da página pública /inicio (link da bio), focada no produto
// principal (Attendio, SDR de IA integrado ao CRM). Textos marcados com
// [COLCHETES] são placeholder, troque antes de divulgar o link de verdade.

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
      "Quando o lead tá qualificado, marca a reunião sozinho, sem ida e volta manual.",
  },
];

export const siteStats: { value: string; label: string }[] = [
  { value: "[N]", label: "leads atendidos" },
  { value: "[N]", label: "negócios já usam" },
  { value: "24/7", label: "atendimento automático" },
];

export const painPoints = [
  "Enquanto ninguém responde, o lead já está falando com o concorrente.",
  "Resposta fora do horário comercial é venda que esfria.",
  "Cada \"depois eu respondo\" é um cliente a menos no fim do mês.",
];

export const personas = [
  {
    icon: "GraduationCap" as const,
    title: "Infoprodutores e coaches",
    description:
      "Na época de lançamento a caixa de mensagem lota rápido, e o Attendio dá conta de responder todo mundo sem deixar ninguém esperando.",
  },
  {
    icon: "Stethoscope" as const,
    title: "Clínicas e serviços",
    description:
      "Paciente que demora pra ser respondido costuma desmarcar sozinho. Com o Attendio isso não acontece.",
  },
  {
    icon: "Home" as const,
    title: "Imobiliárias",
    description:
      "Lead de imóvel esfria rápido. O Attendio já qualifica e marca a visita na hora que a conversa acontece.",
  },
  {
    icon: "Briefcase" as const,
    title: "Agências e negócios locais",
    description:
      "Toda campanha de tráfego traz gente querendo falar no WhatsApp, e o Attendio garante que ninguém fica sem resposta.",
  },
];

export const whatsIncluded = [
  "SDR de IA configurado pro seu WhatsApp",
  "Qualificação automática pelo seu perfil de cliente ideal",
  "Agendamento direto no seu CRM, sem intervenção manual",
  "Atendimento 24 horas por dia, todos os dias",
  "Acesso à área de membros com o passo a passo completo",
];

export const faqs = [
  {
    question: "O Attendio funciona no Instagram também?",
    answer:
      "Hoje o Attendio atende só pelo WhatsApp, que é o canal onde a conversa realmente fecha venda.",
  },
  {
    question: "Preciso saber programar pra configurar?",
    answer:
      "Não. A área de membros tem o passo a passo completo. E se preferir, a equipe pode configurar tudo pra você.",
  },
  {
    question: "Funciona com o meu CRM?",
    answer:
      "Sim, o Attendio agenda direto no seu CRM, sem precisar trocar de ferramenta.",
  },
  {
    question: "Serve pro meu tipo de negócio?",
    answer:
      "Se seu negócio recebe lead pelo WhatsApp e demora a responder, o Attendio resolve, não importa o nicho.",
  },
];

export const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_VERTICE_IA || "#";
