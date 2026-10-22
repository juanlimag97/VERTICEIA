# Vértice IA — Área de Membros

Dashboard de membros construída com Next.js (App Router) + Supabase (auth e
banco) + Cloudflare R2 (vídeos, com player próprio) + webhook da Hubla
(libera acesso automaticamente quando alguém compra).

## Stack

- **Next.js + Vercel** — app e deploy
- **Supabase** — autenticação (e-mail e senha) e banco de dados (quem
  comprou o quê)
- **Cloudflare R2 + Video.js** — hospedagem gratuita dos vídeos (sem custo
  de banda de saída) com player customizado, servido via URL assinada e
  temporária (gerada em `app/api/video-url/route.ts`, só para quem tem
  acesso ao produto)
- **Webhook da Hubla** — dispara `customer.member_added` /
  `customer.member_removed` quando alguém compra ou perde acesso, e o app
  cria/revoga o acesso no Supabase automaticamente

## O que já está pronto

- Login só por **e-mail e senha** (sem link mágico) + tela de **esqueci
  minha senha**
- Fluxo de primeiro acesso: a Hubla avisa a compra → o app cria a conta →
  a pessoa recebe um e-mail de convite → clica → cai numa tela de **criar
  senha** → entra no dashboard
- Rotas `/dashboard/*` protegidas por middleware (`proxy.ts`)
- Tela de boas-vindas personalizada ("Fulano, bem-vindo") com cards de
  acesso por produto (bloqueados visualmente se o usuário não tem acesso)
- Página de produto com player de vídeo próprio (Cloudflare R2 + Video.js,
  URL assinada e temporária)
- Card de destaque para a **Implementação (R$ 1.500)** com botão de checkout
- Rota `POST /api/webhooks/hubla` que recebe os eventos da Hubla, cria o
  usuário no Supabase Auth se ainda não existir (convite por e-mail) e
  libera/revoga o acesso ao produto
- Página pública **`/inicio`** — landing page pra usar como link da bio do
  Instagram (separada da VSL), focada só no **Vértice IA (SDR de IA)**,
  com a oferta de implementação e links de contato. Os outros produtos
  (Perfil que Converte, Reputação 5 Estrelas, Formatos de Criativo) são
  order bump — só aparecem no checkout da Hubla, não nessa página.
  Conteúdo com placeholders — ver [`docs/pendencias.md`](./docs/pendencias.md).
- Página pública **`/obrigado`** — página de "compra aprovada" pra
  configurar como redirect pós-checkout na Hubla, com os próximos passos
  (acessar a conta, entrar no grupo do WhatsApp, suporte).

## Antes de começar, você vai precisar

1. Conta no [Supabase](https://supabase.com) (plano gratuito é suficiente)
2. Conta na [Cloudflare](https://dash.cloudflare.com) com um bucket R2
   criado e os vídeos enviados (ou pelo menos um de teste)
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
3. Em **SQL Editor**, rode os arquivos de `supabase/migrations/`, **nessa
   ordem**:
   [`0001_init.sql`](./supabase/migrations/0001_init.sql) →
   [`0002_product_progress.sql`](./supabase/migrations/0002_product_progress.sql) →
   [`0003_fix_profile_email_hijack.sql`](./supabase/migrations/0003_fix_profile_email_hijack.sql).
   O primeiro cria as tabelas `profiles`, `products`, `product_access`, as
   policies de RLS e já insere o catálogo inicial (Vértice IA, Perfil que
   Converte, Reputação 5 Estrelas, Formatos de Criativo). O segundo
   adiciona o progresso ("marcar como concluída") e a coluna `clone_url`
   usada no card "Receber o projeto". O terceiro fecha uma falha de
   segurança (ver `docs/pendencias.md`) — **importante rodar mesmo em
   projeto já em produção**.
4. Em **Authentication → URL Configuration**, adicione a URL do seu domínio
   (e `http://localhost:3000` em dev) em *Site URL* e em *Redirect URLs*
   adicione `<sua-url>/auth/callback`.
5. Coloque essa mesma URL de produção em `NEXT_PUBLIC_SITE_URL` (ver tabela
   de variáveis mais abaixo) — é ela que o webhook da Hubla usa pra montar
   o link do e-mail de convite.
6. **Personalizar os e-mails** (convite e redefinição de senha) — por
   padrão o Supabase manda um e-mail genérico dele mesmo. Tem duas partes
   pra deixar com a cara da Vértice IA:
   - **Conteúdo do e-mail** (dá pra fazer agora, sem precisar de domínio):
     em **Authentication → Email Templates**, edite os templates **"Invite
     user"** e **"Reset Password"**. Modelo pronto pra colar em
     [`docs/email-templates.md`](./docs/email-templates.md).
   - **Remetente com o seu domínio** (só depois que tiver o domínio): em
     **Project Settings → Auth → SMTP Settings**, configure um provedor de
     envio (Resend, Postmark, SendGrid, Amazon SES etc.) com um endereço
     tipo `contato@seudominio.com.br`. Enquanto isso não estiver
     configurado, o Supabase continua enviando pelo remetente padrão dele
     — o conteúdo do e-mail (item acima) já fica personalizado mesmo assim.

### 3. Configurar o Cloudflare R2 (vídeos)

1. Crie uma conta gratuita na [Cloudflare](https://dash.cloudflare.com) e,
   no menu **R2**, crie um bucket (ex: `verticeia-videos`).
2. Em **R2 → Manage R2 API Tokens**, crie um token com permissão de
   leitura/escrita só nesse bucket. Guarde o **Access Key ID** e a
   **Secret Access Key** gerados.
3. Preencha nas variáveis de ambiente: `R2_ACCOUNT_ID` (aparece na própria
   tela do R2), `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` e
   `R2_BUCKET_NAME`.
4. Suba os vídeos de cada produto pro bucket (pelo painel da Cloudflare ou
   por um cliente S3 qualquer).
5. No Supabase, na tabela `products`, preencha a coluna `video_key` de cada
   produto com o caminho do arquivo dentro do bucket (ex:
   `vertice-ia/aula-1.mp4`).

O player (`components/video-player.tsx`) busca uma URL assinada e
temporária (válida por 2h) na rota `app/api/video-url/route.ts` — essa
rota confere se o usuário logado realmente tem acesso ao produto antes de
liberar a URL, então o vídeo nunca fica num link público fixo.

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
| `NEXT_PUBLIC_SITE_URL` | URL de produção do site (ex: `https://verticeia.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API (**secreta**, só no servidor) |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET_NAME` | Cloudflare → R2 → Manage R2 API Tokens |
| `NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL` | Link de checkout da Hubla |
| `HUBLA_WEBHOOK_TOKEN` | Gerado ao criar o webhook no painel da Hubla |
| `NEXT_PUBLIC_SUPPORT_URL` | Link de suporte (WhatsApp, e-mail, etc.) usado no "Precisa de ajuda?" e na página `/inicio` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Link do seu Instagram, usado no rodapé de `/inicio` |
| `NEXT_PUBLIC_CHECKOUT_VERTICE_IA` | Link de checkout da Hubla do Vértice IA (SDR) |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Link do grupo de avisos no WhatsApp, usado em `/obrigado` |

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
  login/                    tela de login (e-mail e senha)
  forgot-password/          pede o e-mail e dispara o link de redefinição
  auth/callback/            troca o code (convite ou redefinição) pela sessão
  auth/set-password/        tela de criar/redefinir senha (destino do e-mail)
  dashboard/
    layout.tsx              header + guarda de sessão
    page.tsx                boas-vindas + grid de produtos + upsell
    [product]/page.tsx       player de vídeo (R2), checa acesso
  api/webhooks/hubla/       recebe eventos da Hubla e libera/revoga acesso
  api/video-url/            gera URL assinada do vídeo (R2), checando acesso
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
- Assim que tiver o domínio: configurar SMTP próprio no Supabase (ver seção
  6 do setup) pros e-mails de convite/redefinição de senha chegarem com o
  remetente da marca.
- Hoje o mapeamento de produto (`hubla_product_id`) e vídeo (`video_key`) é
  feito direto na tabela `products` pelo SQL Editor do Supabase; se o
  catálogo crescer muito, vale montar uma telinha de admin.
