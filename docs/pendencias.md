# Pendências — o que falta você fazer

Checklist vivo. Toda vez que aparecer algo novo que depende de você (não de
código), eu adiciono aqui. Marque `[x]` conforme for resolvendo.

## 🟪 Página `/vsl` (aula/VSL)

Reconstruí a VSL que estava num projeto separado (`vsl-vertice-ia.vercel.app`)
como `/vsl` dentro deste mesmo app, já com a identidade da Attendio —
mesma estrutura, copy e animação do WhatsApp de antes.

- [x] Player ID e Token da VTurb já preenchidos em
      `app/vsl/vsl-content.tsx` com o embed real.
- [ ] Preencher o **Pixel ID da UTMify** de verdade (procure por
      `SEU_PIXEL_ID_AQUI` no mesmo arquivo).
- [ ] Configurar o subdomínio `vsl.attendio.com.br` apontando pra essa
      página — você escolheu deixar a área de membros na raiz
      (`attendio.com.br`) e a VSL no subdomínio. Passos: no projeto da
      Vercel → Settings → Domains → adiciona `vsl.attendio.com.br` →
      cria o CNAME que a Vercel pedir no seu provedor de DNS. Como é o
      mesmo projeto/deploy, não precisa de nada além do DNS — a Vercel
      já serve `/vsl` nesse subdomínio automaticamente assim que o
      domínio for validado.
- [ ] O projeto antigo (`vsl-vertice-ia.vercel.app`) continua no ar e
      não depende desta mudança — você decide se quer desativá-lo depois
      que o subdomínio novo estiver validado.

## 🔴 Segurança — urgente ✅ concluído

- [x] **Rodar a migration `0003_fix_profile_email_hijack.sql`** no SQL
      Editor do Supabase. Corrige uma falha real: qualquer usuário logado
      conseguia trocar o próprio `profiles.email` para o e-mail de outro
      cliente. Como o webhook da Hubla decide quem recebe acesso buscando
      por esse e-mail, um usuário mal-intencionado podia "roubar" o acesso
      de uma compra futura de outra pessoa. Detalhes no comentário do
      próprio arquivo SQL.
- [x] **Verificar se o cadastro público está desativado no Supabase.** Vá
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
- [x] **Rotacionar a `service_role key`** do Supabase (Project Settings →
      API → gerar nova) e atualizar na Vercel — essa chave apareceu em
      texto nesta conversa em algum momento, então tecnicamente não é mais
      100% secreta.
- [x] **Trocar (ou desativar) a senha de teste** `Vertice2026!Temp` da sua
      conta (`juaanlimaa@gmail.com`) — também foi exposta na conversa.
- [x] Confirmar que `SUPABASE_SERVICE_ROLE_KEY` e `HUBLA_WEBHOOK_TOKEN`
      estão marcados como **"Secret"** (não "Config") nas variáveis de
      ambiente da Vercel.

## 🟡 Configuração — sem isso, partes do site não funcionam

- [x] `NEXT_PUBLIC_SITE_URL` configurado com `https://attendio.com.br`.
- [ ] **Cloudflare R2** (trocamos o Panda Video por isso — gratuito, sem
      custo de banda): criar bucket, gerar token de API, preencher
      `R2_ACCOUNT_ID`/`R2_ACCESS_KEY_ID`/`R2_SECRET_ACCESS_KEY`/
      `R2_BUCKET_NAME` na Vercel, subir os vídeos pro bucket e preencher
      `video_key` de cada produto na tabela `products` do Supabase. Passo a
      passo completo no README, seção "3. Configurar o Cloudflare R2".
- [x] **Hubla**: webhook criado apontando pra `/api/webhooks/hubla`,
      token configurado e testado (200 OK confirmado). O evento que
      libera acesso de verdade é `invoice.payment_succeeded` (não
      `customer.member_added` como eu tinha assumido no início — vendas
      avulsas na Hubla disparam esse), já ajustado no código.
- [ ] **Migrations `0007` e `0008`**: roda no SQL Editor do Supabase —
      mapeiam o Attendio IA e o Formatos de Criativo (order bump) pros
      ids reais confirmados nos testes. Perfil que Converte/Reputação 5
      Estrelas ("Em breve") ainda não têm `hubla_product_id` — só
      precisa quando forem lançados.
- [x] Evento de reembolso confirmado (`invoice.refunded`) e já
      tratado no código — revoga o acesso automaticamente.
- [ ] `NEXT_PUBLIC_IMPLEMENTACAO_CHECKOUT_URL` — link de checkout da
      Implementação (R$ 1.500).
- [x] Templates de e-mail (convite + redefinição de senha) colados no
      Supabase, já com a identidade da Attendio.

## 🟢 Decisões de conteúdo

- [ ] Link de suporte (WhatsApp, e-mail, etc.) para `NEXT_PUBLIC_SUPPORT_URL`
      — hoje o botão "Precisa de ajuda?" fica escondido até isso ser
      configurado.
- [ ] Confirmar se **Attendio IA** e **Perfil que Converte** também têm
      algum projeto pra "clonar" — se não tiverem, não precisa fazer nada
      (o card já fica escondido automaticamente). **Reputação 5 Estrelas**
      já está resolvido (ver item de automação abaixo).
- [ ] Trocar o "V" genérico do logo pelos arquivos reais (ícone + wordmark)
      em `public/`.

## 🟠 Página `/inicio` (link da bio)

Página nova em `verticeia.vercel.app/inicio` (ou `/inicio` do seu domínio,
quando tiver) — **focada só no Attendio (SDR)**, como você pediu. Os
outros produtos (Perfil que Converte, Reputação 5 Estrelas, Formatos de
Criativo) não aparecem aqui — ficam só como order bump no checkout da
Hubla, fora do nosso código. Montei com texto placeholder — revisa tudo
antes de colocar o link na bio de verdade:

- [ ] Revisar as 3 caixinhas de "Como o seu SDR de IA trabalha" (atende
      24/7, qualifica, agenda no CRM) em `lib/site-content.ts` — escrevi
      com base no que já discutimos sobre o produto, mas confirma se bate
      exatamente com o que o Attendio faz hoje.
- [ ] Preencher os 3 números da faixa cinza (`[N]`) com dados reais —
      **não deixe números inventados**, é melhor tirar a seção do que
      mostrar estatística falsa. Se não tiver números ainda, me avisa que
      eu tiro essa seção.
- [ ] Configurar `NEXT_PUBLIC_CHECKOUT_VERTICE_IA` com o link de checkout
      da Hubla do Attendio — sem isso, os botões "Quero meu SDR" não
      levam a lugar nenhum.
- [ ] Configurar `NEXT_PUBLIC_INSTAGRAM_URL` com o link do seu perfil.

## 🟤 Página `/obrigado` (pós-compra)

Página nova de "compra aprovada", inspirada na do ibe.IA, com a nossa
paleta. Falta:

- [ ] **Configurar na Hubla** o redirect pós-checkout do Attendio pra
      `https://verticeia.vercel.app/obrigado` (ou pro seu domínio, quando
      tiver) — isso se configura direto no produto, dentro do painel da
      Hubla.
- [ ] Configurar `NEXT_PUBLIC_WHATSAPP_GROUP_URL` com o link do grupo de
      avisos — se vocês tiverem um grupo assim. Se não tiver, não precisa
      fazer nada, esse passo já fica escondido sozinho.
- [ ] `NEXT_PUBLIC_SUPPORT_URL` e `NEXT_PUBLIC_INSTAGRAM_URL` (mesmas do
      `/inicio`) também são usados aqui — configurando uma vez, vale pras
      duas páginas.

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

## 🟩 Rebrand para Attendio

Troquei o nome, as cores, as fontes e a logo no código (de Vértice IA para
Attendio). Algumas coisas ficaram de fora de propósito — são decisões ou
ações que não dependem de código:

- [ ] **Migration `0005_rebrand_attendio.sql`**: roda no SQL Editor do
      Supabase — atualiza o nome exibido do produto de "Vértice IA" para
      "Attendio IA" na tabela `products` (o `id`/slug técnico continua
      `vertice-ia`, não mexi nisso para não quebrar os acessos já
      concedidos). **Enquanto não rodar essa migration, "Vértice IA"
      continua aparecendo no dashboard** — isso é dado do banco, não do
      código.
- [x] O **e-mail de convite/redefinição de senha** (`docs/email-templates.md`)
      já foi colado no Supabase com a identidade nova.
- [ ] **Migration `0006_dashboard_order.sql`**: roda no SQL Editor do
      Supabase — reordena o grid pra Formatos de Criativo ficar ao lado
      do Attendio IA, e deixa Perfil que Converte/Reputação 5 Estrelas
      por último (eles já aparecem bloqueados com "Em breve" — isso é só
      código, não depende dessa migration).
- [ ] A **URL do site continua `verticeia.vercel.app`** — eu não troco isso
      sozinho. Se quiser o nome novo na URL, dá pra renomear o projeto na
      Vercel (Settings → General → Project Name) ou, melhor ainda, apontar
      um domínio próprio (`attendio.com.br` ou parecido) quando tiver.
- [ ] Nome do produto **dentro da Hubla** (nome que aparece no checkout,
      fatura, etc.) — isso fica só no painel da Hubla, não tenho acesso.
- [ ] Variável de ambiente `NEXT_PUBLIC_CHECKOUT_VERTICE_IA` continua com
      esse nome internamente (só o identificador, nunca aparece pro
      usuário) — não precisa mexer, mas se quiser renomear por organização
      própria, me avisa.

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
