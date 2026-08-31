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
- [ ] Confirmar **quais produtos** (Vértice IA? Perfil que Converte?
      Reputação 5 Estrelas?) têm de fato um projeto pra "clonar" — só
      preencher `clone_url` nesses; os demais já ficam sem esse card
      automaticamente.
- [ ] Trocar o "V" genérico do logo pelos arquivos reais (ícone + wordmark)
      em `public/`.

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
