# Vértice IA — Área de Membros

Dashboard de membros construída com Next.js (App Router) + Supabase (auth e
banco) + Panda Video (player embedado) + webhook da Hubla (libera acesso
automaticamente quando alguém compra).

## Stack

- **Next.js + Vercel** — app e deploy
- **Supabase** — autenticação (login/senha ou magic link) e banco de dados
  (quem comprou o quê)
- **Panda Video** — hospedagem e player dos vídeos
- **Webhook da Hubla** — dispara `customer.member_added` /
  `customer.member_removed` quando alguém compra ou perde acesso, e o app
  cria/revoga o acesso no Supabase automaticamente

## O que já está pronto

- Tela de login com **link mágico** ou **e-mail e senha**
- Rotas `/dashboard/*` protegidas por middleware (`proxy.ts`)
- Tela de boas-vindas personalizada ("Fulano, bem-vindo") com cards de
  acesso por produto (bloqueados visualmente se o usuário não tem acesso)
- Página de produto com o player do Panda Video embedado
- Card de destaque para a **Implementação (R$ 1.500)** com botão de checkout
- Rota `POST /api/webhooks/hubla` que recebe os eventos da Hubla, cria o
  usuário no Supabase Auth se ainda não existir (convite por e-mail) e
  libera/revoga o acesso ao produto

## Antes de começar, você vai precisar

1. Conta no [Supabase](https://supabase.com) (plano gratuito é suficiente)
2. Conta no Panda Video com os vídeos enviados (ou pelo menos um de teste)
3. Acesso à configuração de webhook da Hubla
4. Os arquivos de logo (ícone + wordmark) — coloque em `public/`

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o projeto no Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. Em **Project Settings → API**, copie a `Project URL` e a `anon public
   key` e a `service_role key`.
3. Em **SQL Editor**, rode o conteúdo de
   [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql)
   e depois de
   [`supabase/migrations/0002_product_progress.sql`](./supabase/migrations/0002_product_progress.sql),
   nessa ordem. O primeiro cria as tabelas `profiles`, `products`,
   `product_access`, as policies de RLS e já insere o catálogo inicial
   (Vértice IA, Perfil que Converte, Reputação 5 Estrelas, Formatos de
   Criativo). O segundo adiciona o progresso ("marcar como concluída") e a
   coluna `clone_url` usada no card "Receber o projeto" da página de
   produto.
4. Em **Authentication → URL Configuration**, adicione a URL do seu domínio
   (e `http://localhost:3000` em dev) em *Site URL* e em *Redirect URLs*
   adicione `<sua-url>/auth/callback`.
5. Em **Authentication → Emails**, o template de "Magic Link" já funciona
   com o provedor de e-mail padrão do Supabase (baixo volume/testes). Para
   produção, configure um SMTP próprio em **Project Settings → Auth → SMTP
   Settings**.

### 3. Configurar o Panda Video

1. Envie os vídeos de cada produto no Panda Video.
2. Em **Configurações do player**, restrinja o embed por domínio (adicione
   o domínio do Vercel e `localhost` para testes).
3. Pegue a URL base do seu player, algo como
   `https://player-vz-XXXXXXXX-XXX.tv.pandavideo.com.br`, e coloque em
   `NEXT_PUBLIC_PANDA_PLAYER_BASE_URL`.
4. No Supabase, na tabela `products`, preencha a coluna `panda_video_id` de
   cada produto com o id do vídeo correspondente no Panda Video.

### 4. Configurar o webhook da Hubla

1. No painel da Hubla, crie um webhook apontando para
   `https://<seu-dominio>/api/webhooks/hubla`.
2. Selecione os eventos **`customer.member_added`** e
   **`customer.member_removed`** (são disparados quando um comprador ganha
   ou perde acesso a um produto — é o gatilho certo para uma área de
   membros).
3. A Hubla vai gerar um token único que ela envia no header
   `x-hubla-token` em toda chamada. Copie esse valor para
   `HUBLA_WEBHOOK_TOKEN`.
4. No Supabase, na tabela `products`, preencha a coluna `hubla_product_id`
   de cada produto com o id real do produto na Hubla (a rota do webhook usa
   essa coluna para descobrir a qual produto do seu catálogo o evento se
   refere — sem isso, o webhook responde `404 unmapped_product` e loga o id
   recebido no console, para você conseguir preencher certo).
5. Para o card de "Implementação (R$ 1.500)", pegue o link de checkout
   desse produto na Hubla e coloque em
   `NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL`.
6. Se algum produto tiver um projeto pra "clonar" (ex: um projeto Lovable
   pronto), preencha a coluna `clone_url` desse produto na tabela `products`
   com o link — ele aparece no card "Receber o projeto" da página do
   produto.

### 5. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

| Variável | Onde conseguir |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (**secreta**, só no servidor) |
| `NEXT_PUBLIC_PANDA_PLAYER_BASE_URL` | Painel do Panda Video |
| `NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL` | Link de checkout da Hubla |
| `HUBLA_WEBHOOK_TOKEN` | Gerado ao criar o webhook no painel da Hubla |
| `NEXT_PUBLIC_SUPPORT_URL` | Link de suporte (WhatsApp, e-mail, etc.) usado no "Precisa de ajuda?" |

Configure as mesmas variáveis em **Vercel → Project Settings →
Environment Variables** antes do deploy.

### 6. Rodar localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura

```
app/
  login/                    tela de login (magic link / senha)
  auth/callback/            troca o code do magic link pela sessão
  dashboard/
    layout.tsx              header + guarda de sessão
    page.tsx                boas-vindas + grid de produtos + upsell
    [product]/page.tsx       player do Panda Video, checa acesso
  api/webhooks/hubla/       recebe eventos da Hubla e libera/revoga acesso
lib/supabase/
  client.ts / server.ts     clients do Supabase (browser / server components)
  admin.ts                  client com service role (só usado no webhook)
  middleware.ts             lógica usada pelo proxy.ts para proteger rotas
  types.ts                  tipos das tabelas (Database)
components/                 ProductCard, VideoPlayer, upsell, etc.
supabase/migrations/        schema SQL
proxy.ts                    protege /dashboard/* e redireciona quem já logou
```

## Próximos passos sugeridos

- Trocar o logo padrão (`public/`) pelos arquivos reais (ícone + wordmark).
- Configurar SMTP próprio no Supabase para os e-mails de convite/magic link
  chegarem com o remetente da marca.
- Se quiser tela de "esqueci minha senha", o Supabase já suporta
  (`resetPasswordForEmail`) — não implementada ainda por não ter sido pedida.
- Hoje o mapeamento de produto (`hubla_product_id`) e vídeo
  (`panda_video_id`) é feito direto na tabela `products` pelo SQL Editor do
  Supabase; se o catálogo crescer muito, vale montar uma telinha de admin.
