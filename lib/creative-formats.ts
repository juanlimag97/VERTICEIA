export type CreativeFormat = {
  number: number;
  title: string;
  description: string;
  driveFileIds: string[];
};

export const creativeFormats: CreativeFormat[] = [
  {
    number: 1,
    title: "Caixinha de perguntas",
    description:
      "O vídeo começa com uma pergunta (o gancho) que é a dor ou a dúvida da galera. Aí você, o criador, entra com a resposta, que é o anúncio. É um formato que a gente já tá acostumado, quebra o padrão e é perfeito pra mostrar a solução de um jeito bem pessoal e direto.",
    driveFileIds: [
      "1depRw5BrLJSbBLo6i6-AKPiuRAt_hYyO",
      "1a2JaFHx0sWYP2GsHWlR-37Cy8Qh_Oh1-",
      "14n7y5j47TxsaYwVtLtWzYZWAXXW6nL0f",
    ],
  },
  {
    number: 2,
    title: "POV",
    description:
      "O POV (Point of View) representa uma cena. É um jeito muito imersivo de mostrar a dor ou o problema antes de entregar a solução. A pessoa se sente parte da história na hora!",
    driveFileIds: ["1a6mxXfXrGC1nUc7my8tTYZBgDSpr05JZ", "1R3pDJe_cDm56VGTXmVvRQxAiFDHjM1j_"],
  },
  {
    number: 3,
    title: "Diálogo",
    description:
      "Aqui a gente tem dois ou mais personagens batendo um papo. Pode ser você e um amigo, ou até você mesmo no passado e no presente. É ótimo pra levantar as dúvidas da galera e quebrar as objeções de um jeito bem natural, mostrando a transformação que o seu produto/serviço traz.",
    driveFileIds: [
      "1ZwZByFT0xICaLn_LZK0nTDRlHFzIyRsZ",
      "1SA7A6CVCekjb7YLxL_SQf3KSfbVeO5mq",
      "1p9ij8xAEehSQG2Jttjrz9t52ubhUi3rp",
      "1eixOrAxqV9KQRdrJjvxy21ej9IwiT1r1",
      "1kkAGzWTZz4uInI319w86RZh0LUg-Azn_",
    ],
  },
  {
    number: 4,
    title: "Choquei",
    description:
      "O formato usa manchetes sensacionalistas e um tom de urgência pra prender a atenção. Você apresenta o seu produto como a 'notícia bombástica' ou o 'escândalo' que, na verdade, é a grande sacada ou benefício que o público precisa saber.",
    driveFileIds: ["1u6qu7yboy5IOawHtDRHjj-VYI6ZO-Ztq", "1Tjd2_iQPRONynge2IjH7s0y_gNvaosxK"],
  },
  {
    number: 5,
    title: "Notícia",
    description:
      "O vídeo simula um boletim de notícias ou reportagem. Você apresenta o produto/serviço como a 'solução noticiável' para um problema sério do mercado. Isso passa muita autoridade e credibilidade na hora.",
    driveFileIds: ["1U99g7IJL_O-NoSA4WLhFX7c1_PswoeJ-", "1zwCkP-1rRNB2VeOxBdyX12tzZlhmN_XT"],
  },
  {
    number: 6,
    title: "Meme",
    description:
      "Use áudios ou vídeos virais (memes) para criar uma situação engraçada que se conecta com a dor do seu público. O humor é a chave: ele quebra a resistência e faz a mensagem ser mais compartilhável. O segredo é o meme fazer sentido com o que você está vendendo.",
    driveFileIds: ["1OVep5vhZtsenWdEdBa5MR3-2cJ0_h1lO", "1MmJsrVKTpHNiBkOp3ayMhzJOE-fp_fpg"],
  },
  {
    number: 7,
    title: "UGC em 1a Pessoa",
    description:
      "É o famoso 'conteúdo de usuário'. Você se filma com o celular, falando na moral, como se estivesse dando uma dica sincera para um amigo. O tom é super autêntico e informal, o que gera muita confiança, porque parece uma recomendação de quem realmente usou.",
    driveFileIds: ["1ftcOrUT37XIBpe9ir8o7ts_F-7Mc7I0e", "1OFG_d7737DOmtrKBjoSby2yJ_rGl_lwz"],
  },
  {
    number: 8,
    title: "Tela dividida",
    description:
      "O vídeo é dividido em duas partes (ou mais), lado a lado. É o formato ideal para mostrar o 'Antes' e o 'Depois', o 'Certo' e o 'Errado'. É visualmente dinâmico e mostra o valor do seu produto na lata, pela comparação.",
    driveFileIds: ["1_tGJMh1lPNGO-siYcxaV8q9HE5p8mECo", "1cG_djB9D2fclDvWV_eFG_53aVi2eciKO"],
  },
  {
    number: 9,
    title: "Fofoca",
    description:
      "Você se dirige ao público como se fosse contar um segredo bombástico ou uma fofoca exclusiva. Isso cria um senso de curiosidade e exclusividade. O 'segredo' que você revela é o seu produto ou a estratégia que você usa para ter sucesso.",
    driveFileIds: [
      "10x_TfqBiO2GWgwMgdBK-KUW4Dl7-wF2_",
      "1_fjb8R7wKP5GkViUZ0Um_ZxTMpXCUjUZ",
      "1Zf9XZGRExegLtIjMDlHSkAUo2XaT1PcX",
      "1IgWFpIpHkKAJ5cYtsyfIShaTfBqTC7qL",
    ],
  },
  {
    number: 10,
    title: "React",
    description:
      "Você reage a um conteúdo de outra pessoa (um vídeo, um tweet, uma notícia) que tem a ver com o seu nicho. Sua reação é o ponto de partida para discutir o problema e, claro, apresentar o seu produto como a solução. Pega carona em conteúdo viral para chamar a atenção.",
    driveFileIds: ["13vy8lFoPrO8j4-WfmtkbCt-Nxd9M4ktr", "1skEu613BXwF0IXgQZo2aGedJz2kE5ovy"],
  },
  {
    number: 11,
    title: "UGC em 3a Pessoa",
    description:
      "É o conteúdo de usuário, mas filmado por outra pessoa. Mostra você em ação, usando o produto ou vivendo o benefício. A visão de fora dá um ar mais 'profissional' ou de 'mini-documentário' e deixa a demonstração do produto bem clara.",
    driveFileIds: ["1QYd6rSvtlrEvMhXMapVIF9A0Yb5ovkE9", "171jcQ0_YTtUcQSUyMYAbLxuLz-KUU29i"],
  },
  {
    number: 12,
    title: "Esquete",
    description:
      "Uma cena curta e engraçada que exagera a dor ou o problema do público. O ponto alto da esquete é quando o seu produto/serviço entra em cena como o herói que salva o dia. O humor é a arma principal para prender a atenção.",
    driveFileIds: [
      "1vlqqJl2A9IAWoFohVmVIk24jbyCXhdlC",
      "1RpSg5lm6MySVZiuTqyFOp3a_8jTlvQCe",
      "1IjHzvdVkeMZ8F_Hijf8JRlCb61SeaeyY",
    ],
  },
  {
    number: 13,
    title: "Fala e Faz",
    description:
      "Você fala sobre um assunto importante (uma dica, uma estratégia) enquanto faz alguma ação visualmente interessante (tipo arrumar a casa, fazer um café chique). A ação secundária prende o olhar da galera enquanto você entrega a mensagem principal.",
    driveFileIds: [
      "1RZ48hG4MLvKtezzTo_m1Y-6AZHbiPGE4",
      "10oI_78WhSEQ2SBQyqFEnwqzc4_GzBHzh",
      "12uX8eaND8Niyx5QkReAMSx3NdqJTIziG",
      "1Y84thBvxA0PzyOyi4-SuVryP0PdcJoT5",
      "1pc4OvMIkQyZpToO2GD0-joz7PvvbD3h2",
    ],
  },
  {
    number: 14,
    title: "Depoimento",
    description:
      "Um cliente de verdade (ou alguém que parece muito) conta a experiência positiva com seu produto. O foco é na prova social e em como ele superou as objeções. A estrutura é sempre a mesma: Como era a vida antes -> O que mudou com o produto -> O resultado incrível.",
    driveFileIds: [
      "18SBND0vEIHcjfbbfHK533OWkGU5a1Y1O",
      "1NnnuPni1Fch9q7EMv-icvK8k46y3LZ9W",
      "1up6vzEbTtMQxc6eLgTQ48iIWVMqbyHfr",
    ],
  },
  {
    number: 15,
    title: "Experimento Social",
    description:
      "Você faz um teste ou experimento na rua (ou em público) para provar um ponto ou mostrar na prática como seu produto funciona. Isso gera muita curiosidade e prova o valor do produto de um jeito que ninguém pode negar.",
    driveFileIds: [
      "1Bg0XIfqnaEY_C7AvN1FDrNdBxg1Fjz8t",
      "1W1tyu3s7vFLchnkglfZY-xe3WeQ-umMh",
      "1U_AMh7EgLo3rA3XdZxPdOz62lKHReejZ",
      "11ZKQpesxHa7xczIPKC1n9RtJWaHIg0zj",
    ],
  },
  {
    number: 16,
    title: "Tela verde",
    description:
      "Use o famoso chroma key (tela verde) para aparecer em cenários diferentes ou reagir a imagens e vídeos que surgem atrás de você. É super versátil para tutoriais, apresentações dinâmicas ou para simular ambientes que seriam caríssimos de filmar de verdade.",
    driveFileIds: [
      "1IZcw-FybVJrYZ1sLMT7rm-0YbXMZ-F9y",
      "1fJbNreXt09vuCFiTAuJh7mzOlS1UOupQ",
      "11SaeTzQbVT9k6wLwCeEMzKhzsTiYEd-A",
      "1ek2tDciOsF-LKmEBZfP8CxTxbLE0BfuY",
    ],
  },
  {
    number: 17,
    title: "Palestrinha",
    description:
      "Você assume o tom de autoridade e dá uma mini-aula ou palestra sobre um tema. É o formato ideal para educar a galera sobre o problema, quebrar aquelas crenças limitantes e posicionar seu produto como a solução definitiva.",
    driveFileIds: ["1QCTnp4-lY2rR3lObbkvPKZ-r5Rc9bWvS", "1XMgvcRrsCPbgw0auhglJQ_B04QRVKIBP"],
  },
  {
    number: 18,
    title: "Telepatia",
    description:
      "Você 'adivinha' o que o público ta pensando (a dor, a objeção, o desejo). Começa com frases tipo 'Eu sei o que você ta pensando...' ou 'Cansado de...'. Cria uma conexão imediata porque mostra que você entende o que a pessoa está passando.",
    driveFileIds: ["1V7wjiE3CVfhAXoEjmZFIZElHF_ToKVNR", "1KBiZyyTTbIyc78X3SPdBZ6uGqNQFNAMP"],
  },
  {
    number: 19,
    title: "Análise",
    description:
      "Você analisa um produto, uma estratégia ou até um concorrente, e usa essa análise como gancho para apresentar o seu produto como a alternativa muito melhor ou a peça que faltava. Mostra que você manja do mercado e tem autoridade.",
    driveFileIds: ["19XX2efPPZk8k7JG2khRTcEKWlQ09F6Dx", "1eJCQtMaGTcYwdhrmeePdZdWms4YgnUDT"],
  },
  {
    number: 20,
    title: "Google Meet",
    description:
      "Simula uma reunião online (Meet, Zoom, etc.) onde você está apresentando o produto para um 'cliente' ou 'equipe'. Dá um ar profissional e de bastidores, ótimo para fazer demonstrações detalhadas ou quebrar objeções como se fosse uma conversa de negócios.",
    driveFileIds: ["1nkj_Pml9w4aRdRvqHpewcNkOJc9ix4zs", "1wi52dLg-l84nUYFnoNdndpyDN63b_hb6"],
  },
  {
    number: 21,
    title: "Telemarketing",
    description:
      "Uma paródia de ligação de telemarketing. O tom pode ser engraçado (tirando sarro da insistência) ou super direto e urgente. Usa a familiaridade da situação para prender a atenção, e o seu produto é a 'oferta irrecusável' que aparece no final.",
    driveFileIds: ["1EK56MtYOSauEv5YN1VihThwc5HQI9GLY", "1H61Gu6Eq7j0QRpZHo2HUkaG-cg56D6Qd"],
  },
  {
    number: 22,
    title: "POV + Meme",
    description:
      "É a mistura perfeita: a imersão do POV (você está na cena) com o humor e a viralidade do Meme. O espectador vive a situação e a solução (ou a reação) é dada com um áudio/visual de meme. Engajamento máximo garantido!",
    driveFileIds: ["1_Nz4VlMIHge3uUp0qii7zZgUIteKTkSI", "1BYsm4Zoktt0g2U3evvqz22OJP0sgNWR0"],
  },
  {
    number: 23,
    title: "LO-FI",
    description:
      "Vídeos com aquela estética mais relax ('low fidelity'), com filtros vintage, cores mais apagadas e uma trilha sonora calma (lo-fi hip hop). É usado para criar um clima de reflexão, mostrando o produto de um jeito mais 'artístico' e menos agressivo, quase como um momento de paz.",
    driveFileIds: ["1dt2Y4j2Qs3JlDJsJkESLLfrZUr2_GJ08", "1VtDydGzrlpfV_hAWlCvg3MVc_im6LqL-"],
  },
  {
    number: 24,
    title: "Corte de Podcast",
    description:
      "Simula um trecho de um podcast ou entrevista. Você (ou um convidado) está discutindo um tema e, de repente, o produto/serviço entra na conversa como a solução ou um exemplo prático. Transmite autoridade e profundidade, como se fosse um insight de especialista.",
    driveFileIds: [
      "11HEBmH5O9-eQ9pFrjAyqd8ZS66Bu8WwV",
      "16F62xfvtkabY2jCNyLTJnj5r5G4fLZIT",
      "1OqL0b8UaZ0606BPMoPdyWPCsB1p4N3vq",
    ],
  },
  {
    number: 25,
    title: "Top 5 (ranking)",
    description:
      "Você faz uma lista numerada (Top 3, Top 5, etc.) de dicas, erros ou ferramentas. O seu produto/serviço é sempre o item mais importante da lista, ou a lista serve para educar a galera até o Call to Action final.",
    driveFileIds: [
      "1zXmgHpsp2GrSozNX00rQxugXkEiM5x1o",
      "11k8fvWimy3xsfzgwDKIqOd7-FFbrjqEu",
      "1xU3SpW1wk06XYsbsHqnFiT_i1XkL_M9D",
    ],
  },
  {
    number: 26,
    title: "Conversa no Carro",
    description:
      "Você se filma dentro do carro, como se estivesse tendo um momento de reflexão ou desabafo. A informalidade do carro cria uma intimidade e a sensação de que você está compartilhando um pensamento sincero e espontâneo com o público.",
    driveFileIds: ["1xQ21X9U0_L_krAZH10CXsriiKDU51TvY", "113JMZvPKECL-iGn9SmPpUxvqqyMj3m-p"],
  },
  {
    number: 27,
    title: "Diálogo de Gêmeos",
    description:
      "Você interpreta dois personagens (o 'eu' que ta na pior e o 'eu' que ta na boa), usando roupas ou edições diferentes. É um jeito rápido e divertido de quebrar objeções e mostrar a transformação que o produto traz.",
    driveFileIds: ["1QiMO2_U5wSvEq_D1QjCHu7dYNO238mS8", "1w3fI9m3e4zCbRbdtqBweHCyUtr872T4z"],
  },
  {
    number: 28,
    title: "Mensagem",
    description:
      "O vídeo simula a tela de um app de mensagens (WhatsApp, DM do Insta). O anúncio é uma conversa de texto, onde o seu produto é a resposta perfeita para a dúvida ou o problema de um contato. É um formato que a gente vê todo dia, então prende a atenção.",
    driveFileIds: [
      "1pPHiRjG0Ekbz9rXrKSx7TviFhinWJxgj",
      "1IMNWCXeqFbJyQmAXWA3iedkqdqVbJ0B3",
      "19MTWTqMkBK1MHsM3Eef8VbLNM5ZqRwB5",
    ],
  },
  {
    number: 29,
    title: "Passo a passo",
    description:
      "Um tutorial rápido que ensina a galera a fazer algo. O seu produto/serviço é a ferramenta secreta ou a etapa que torna o processo muito mais fácil. É um formato que entrega valor na hora, o que é ótimo para o público.",
    driveFileIds: ["1qA_TlRdbM5RhWbeA2di0gsUlTih-pDbl", "1tLJyEqoK9rqXmIIeMfGNCfgqMRBURFq8"],
  },
  {
    number: 30,
    title: "Copy no papel",
    description:
      "Você escreve a copy (o texto de venda) do anúncio em um papel, enquanto narra o por que daquelas palavras. Atrai quem curte dicas de escrita e dá um ar de 'bastidores' e 'processo criativo' para o seu anúncio.",
    driveFileIds: ["1nK1G8TYPFpvy0w0ly_j4e5_PyFxBmh65"],
  },
  {
    number: 31,
    title: "Cinema",
    description:
      "O vídeo tem qualidade de cinema (luz top, trilha épica, ângulos dramáticos). É para criar uma experiência aspiracional e associar seu produto a um valor altíssimo, contando uma história emocionante.",
    driveFileIds: ["1SyLqXN63mEoP8XyxNJ-m60oWoYqIDyIo", "1ARafUYdPNyUy7LDzIOvFd282JO-ZGOVj"],
  },
  {
    number: 32,
    title: "ASMR",
    description:
      "Use sons suaves e relaxantes (sussurros, toques, barulhos de embalagem) para criar uma experiência sensorial. É ótimo para mostrar a textura, o som ou o processo de uso do produto de forma calma e detalhada.",
    driveFileIds: ["1UcVRuME-dpef9EuAfG671SKUewrmO2KP", "1uRkQla2foF_855je5hegUMewIvC-_aJS"],
  },
  {
    number: 33,
    title: "Live",
    description:
      "Simula um trecho de uma live (transmissão ao vivo). Você interage com comentários (fictícios), responde perguntas e, de forma orgânica, apresenta o produto. Passa autenticidade e a sensação de que o público está recebendo uma informação exclusiva.",
    driveFileIds: ["1P4M9ePJXBaJUOrIujjoWoQAlELj59ZkH", "1hSBsP52osXsJNoxkMqFPuZeRXb-wn9VN"],
  },
  {
    number: 34,
    title: "Analogia",
    description:
      "Você usa uma comparação com algo que todo mundo conhece (um objeto, uma situação) para explicar o benefício ou a funcionalidade do seu produto. Ajuda a galera a entender coisas complexas de um jeito simples e que fica na memoria.",
    driveFileIds: ["1rdTUk5c3jFeOkQ_IabBRKx4N0J2Pnv7l", "1nY51g_-6DT94QD3NFRj4hogAVY5iqNWi"],
  },
  {
    number: 35,
    title: "Receita",
    description:
      "O vídeo simula uma receita de cozinha, mas os 'ingredientes' são os passos para alcançar um resultado (Ex: 'Receita para ter sucesso em X'). O seu produto/serviço é o 'ingrediente secreto' que garante o sucesso da receita.",
    driveFileIds: ["1B4UUIPZD8NOI5DIXDmGPXn_0tCgAlB7H", "1FYuPuJO3erxTUmz6ZXZHY7410a7DXV_3"],
  },
  {
    number: 36,
    title: "Tweet",
    description:
      "O vídeo mostra um tweet que viralizou ou que fala sobre uma dor do público. Você reage a ele, usando o tweet como ponto de partida para a discussão e a apresentação do seu produto como a solução para o problema levantado no texto.",
    driveFileIds: ["156v1-O_YGJT24h02Inc8QJ2atc3A_5u9", "1M1K8bDibpbIs8JdJhqiQOhZnx2owvykv"],
  },
  {
    number: 37,
    title: "Oferta Direta",
    description:
      "Sem enrolação! O vídeo vai direto ao ponto: apresenta o produto, os benefícios e o Call to Action (CTA) para a compra, muitas vezes com um senso de urgência (tipo 'só hoje'). É o formato mais tradicional de vendas, focado em conversão.",
    driveFileIds: ["1tMEXRCklNiqberMU9ZWd6a7uj6OT7m_Y", "14vu2Xp_2hEJLaH0ev1yAcQ-QfeE1v9VB"],
  },
  {
    number: 38,
    title: "Story",
    description:
      "Simula a estética de um story do Instagram. O vídeo é curto, vertical, com legendas dinâmicas, emojis e um tom bem informal. É ideal para comunicação rápida, lembretes ou para criar aquela sensação de proximidade com o público.",
    driveFileIds: ["1x-eKLYTH9girqSl5eE-2xPLI1g4Dhxso", "165LtN3Y9tGsXQrT8L6W_IKawzpw3sMws"],
  },
  {
    number: 39,
    title: "Série (dia 1, 2...)",
    description:
      "O anúncio é apresentado como um 'episódio' de uma série ('dia 01 fazendo X'). O vídeo termina com um gancho (cliffhanger) que te obriga a clicar para ver a 'continuação' (que é a página de vendas). Cria curiosidade e um arco narrativo que prende a atenção.",
    driveFileIds: ["1jZpgUsD9oH9KbSdi9fRI48pBIQswIWir", "1fnl_k7zXOcIDWc90RkCY27UNzSvKLf2e"],
  },
  {
    number: 40,
    title: "Edit",
    description:
      "É uma montagem super rápida de cenas, com cortes secos e sincronizados com a batida da música. O foco é na estética e na energia. Use para mostrar o produto em vários contextos ou para criar um senso de movimento e modernidade.",
    driveFileIds: [
      "1McgtoZpysL9_E7sQOMDeIi1F-WUEDmwV",
      "1Mq06iGvQs_dSM7RapIRCE_Wa-owVZIZi",
      "1h75F222SNiID7eMV317sdRx1TKKswttH",
    ],
  },
];
