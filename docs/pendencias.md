# Pendências — o que falta você fazer

Checklist vivo. Toda vez que aparecer algo novo que depende de você (não de
código), eu adiciono aqui. Marque `[x]` conforme for resolvendo.

## 🔴 Segurança — urgente

- [ ] **Rodar a migration `0003_fix_profile_email_hijack.sql`** no SQL
      Editor do Supabase. Corrige uma falha real: qualquer usuário logado
      conseguia trocar o próprio `profiles.email` para o e-mail de outro
      cliente. Como o webhook da Hubla decide quem recebe acesso buscando
      por esse e-mail, um usuário mal-intencionado podia "roubar" o acesso
      de uma compra futura de outra pessoa. Detalhes no comentário do
      próprio arquivo SQL.
- [ ] **Verificar se o cadastro público está desativado no Supabase.** Vá
      em Supabase → Authentication → Sign In / Providers (ou
      "Authentication → Settings", dependendo da versão do painel) e
      procure a opção **"Allow new users to sign up"** (permitir que
      qualquer um crie conta) — **desative**. Hoje nosso app não tem
      formulário de cadastro, mas a chave pública (`anon key`) do Supabase
      é visível no navegador de qualquer visitante, e se o cadastro
      público estiver ligado no projeto, alguém poderia chamar a API do
      Supabase diretamente (por fora do nosso site) e criar uma conta sem
      nunca ter comprado. Isso não dá acesso a nenhum produto (o acesso só
      vem do webhook da Hubla), mas evita contas fantasma / spam. Desativar
      não afeta o fluxo de convite (ele usa a service role, que ignora essa
      trava).
- [ ] **Rotacionar a `service_role key`** do Supabase (Project Settings →
      API → gerar nova) e atualizar na Vercel — essa chave apareceu em
      texto nesta conversa em algum momento, então tecnicamente não é mais
      100% secreta.
- [ ] **Trocar (ou desativar) a senha de teste** `Vertice2026!Temp` da sua
      conta (`juaanlimaa@gmail.com`) — também foi exposta na conversa.
- [ ] Confirmar que `SUPABASE_SERVICE_ROLE_KEY` e `HUBLA_WEBHOOK_TOKEN`
      estão marcados como **"Secret"** (não "Config") nas variáveis de
      ambiente da Vercel.

## 🟡 Configuração — sem isso, partes do site não funcionam

- [ ] Adicionar `NEXT_PUBLIC_SITE_URL` (ex: `https://verticeia.vercel.app`)
      nas variáveis de ambiente da Vercel — usado pelo link do e-mail de
      convite.
- [ ] **Panda Video**: preencher `NEXT_PUBLIC_PANDA_PLAYER_BASE_URL` e o
      `panda_video_id` de cada produto na tabela `products` do Supabase.
- [ ] **Hubla**: criar o webhook apontando pra
      `/api/webhooks/hubla`, selecionar os eventos
      `customer.member_added`/`customer.member_removed`, e preencher o
      `hubla_product_id` de cada produto na tabela `products`.
- [ ] `NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL` — link de checkout da
      Implementação (R$ 1.500).
- [ ] Colar os templates de e-mail (convite + redefinição de senha) no
      Supabase — texto pronto em
      [`docs/email-templates.md`](./email-templates.md).

## 🟢 Decisões de conteúdo

- [ ] Link de suporte (WhatsApp, e-mail, etc.) para `NEXT_PUBLIC_SUPPORT_URL`
      — hoje o botão "Precisa de ajuda?" fica escondido até isso ser
      configurado.
- [ ] Confirmar se **Vértice IA** e **Perfil que Converte** também têm
      algum projeto pra "clonar" — se não tiverem, não precisa fazer nada
      (o card já fica escondido automaticamente). **Reputação 5 Estrelas**
      já está resolvido (ver item de automação abaixo).
- [ ] Trocar o "V" genérico do logo pelos arquivos reais (ícone + wordmark)
      em `public/`.

## 🟠 Página `/inicio` (link da bio)

Página nova em `verticeia.vercel.app/inicio` (ou `/inicio` do seu domínio,
quando tiver). Montei com texto placeholder — revisa tudo antes de colocar
o link na bio de verdade:

- [ ] Trocar `[SEU POSICIONAMENTO AQUI]` (abaixo do header) por uma frase
      curta de posicionamento real.
- [ ] Preencher os 3 números da faixa cinza (`[N]`) com dados reais —
      **não deixe números inventados**, é melhor tirar a seção do que
      mostrar estatística falsa. Se não tiver números ainda, me avisa que
      eu tiro essa seção.
- [ ] Preencher `[PREÇO]` de cada produto (`lib/site-content.ts`) — hoje
      só Reputação 5 Estrelas tem preço (R$ 97).
- [ ] Configurar os links de checkout de cada produto
      (`NEXT_PUBLIC_CHECKOUT_VERTICE_IA`, `_PERFIL_CONVERTE`, `_REPUTACAO`,
      `_FORMATOS` — ver tabela de variáveis no README) — sem isso, o botão
      "Quero esse" não leva a lugar nenhum.
- [ ] Configurar `NEXT_PUBLIC_INSTAGRAM_URL` com o link do seu perfil.
- [ ] Revisar as descrições curtas de cada produto em `lib/site-content.ts`
      — escrevi um rascunho, mas ajuste pro seu tom de voz.

## 🟣 Bônus da Reputação 5 Estrelas (automação de avaliação)

- [ ] **Testar o fluxo em um n8n de verdade antes de vender** — eu montei
      o arquivo `docs/automations/pedido-avaliacao-google.json` sem poder
      importar num n8n real pra validar (não tenho acesso a uma instância
      aqui). Antes de anunciar isso como bônus, importa numa conta n8n sua
      e confirma que abre certinho — se algum bloco vier com erro, é
      rápido de ajustar manualmente seguindo o guia.
- [ ] Ajustar o preço do produto pra **R$ 97** direto no checkout da
      Hubla (isso não depende de nada aqui no código/banco).
- [ ] O card "Baixar o fluxo de automação" na página do produto já está
      configurado — só falta confirmar que o link
      (`clone_url` de `reputacao-5-estrelas`) está apontando pro lugar
      certo (eu já deixei configurado, mas vale conferir depois do
      próximo deploy).
- [ ] **Nota:** esse arquivo fica no repositório do GitHub, que é
      **público** — qualquer pessoa com o link consegue ver, não só quem
      comprou. Não tem nenhum dado sensível nele (é só o fluxo genérico),
      mas se um dia quiser deixar mais restrito, dá pra mover esse arquivo
      pra outro lugar (ex: um Google Drive privado) — me avisa se quiser
      isso.

## 🔵 Quando tiver o domínio próprio

- [ ] Apontar o domínio pra Vercel e atualizar `NEXT_PUBLIC_SITE_URL` e as
      URLs em Supabase (Site URL / Redirect URLs).
- [ ] Configurar SMTP próprio no Supabase (Resend, Postmark, SendGrid,
      SES...) pra os e-mails saírem do seu domínio, não do Supabase.

## ⚪ Opcional / não bloqueia nada

- [ ] Menu mobile (tipo "hambúrguer") pra navegar entre produtos sem
      precisar voltar pro dashboard toda vez.
- [ ] Sincronizar "Favoritar" entre dispositivos (hoje fica salvo só no
      navegador de cada aparelho).
