type CloneCardCopy = {
  platformTag: string;
  description: string;
  buttonLabel: string;
};

// A maioria dos produtos "clonáveis" entrega um projeto Lovable (usa o
// texto padrão do CloneCard). Produtos com outro tipo de entrega (ex:
// fluxo de automação n8n) têm a cópia customizada aqui.
const CLONE_CARD_COPY: Record<string, CloneCardCopy> = {
  "reputacao-5-estrelas": {
    platformTag: "Bônus incluído · n8n",
    description:
      "A Vértice IA montou um fluxo de automação pronto: quando o atendimento é finalizado no seu CRM, ele manda uma mensagem automática pelo WhatsApp pedindo avaliação no Google. É só importar no seu n8n e configurar — o passo a passo está no arquivo.",
    buttonLabel: "Baixar o fluxo de automação",
  },
};

export function getCloneCardCopy(productId: string): Partial<CloneCardCopy> {
  return CLONE_CARD_COPY[productId] ?? {};
}
