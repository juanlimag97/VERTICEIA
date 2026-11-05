# E-mails de autenticação (convite e redefinição de senha)

Cole isso em **Supabase → Authentication → Email Templates**. São só dois
templates que a área de membros usa:

- **Invite user** → e-mail que a pessoa recebe quando compra (webhook da
  Hubla) e precisa criar a senha pela primeira vez. Leva direto pra tela
  de criar senha — não precisa passar por "esqueci minha senha" como em
  outras plataformas.
- **Reset Password** → e-mail do "Esqueci minha senha".

O remetente (`de: ...@...`) só muda depois de configurar um SMTP próprio
com o seu domínio (Project Settings → Auth → SMTP Settings). O **conteúdo**
abaixo já pode ser colado agora, independente disso.

Estrutura inspirada num e-mail de boas-vindas que você gostou (saudação
pelo nome, box de acesso, passos numerados, botão grande) — adaptada pro
nosso fluxo e paleta.

---

## Invite user

**Subject:**
```
Seu acesso à Attendio está liberado 🎉
```

**Message body (HTML):**
```html
<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #0b0f14;">
  <table role="presentation" style="margin: 0 0 28px;">
    <tr>
      <td style="width: 24px; height: 24px; background: #c8f23c; border-radius: 6px; text-align: center; vertical-align: middle;">
        <span style="color: #0b0f14; font-size: 11px; font-weight: 700;">A</span>
      </td>
      <td style="padding-left: 8px; font-size: 12px; font-weight: 800; letter-spacing: -0.02em;">
        attendio
      </td>
    </tr>
  </table>
  <hr style="border: none; border-top: 2px solid #c8f23c; margin: 0 0 28px;" />

  {{if .Data.full_name}}<p style="font-size: 15px; margin: 0 0 16px;">Olá, {{ .Data.full_name }}!</p>{{else}}<p style="font-size: 15px; margin: 0 0 16px;">Olá!</p>{{end}}

  <p style="font-size: 14px; line-height: 1.6; color: #5c6472; margin: 0 0 8px;">
    Sua compra foi aprovada e seu acesso já está liberado!
  </p>
  <p style="font-size: 14px; line-height: 1.6; color: #5c6472; margin: 0 0 24px;">
    Bem-vindo à <strong>Attendio</strong>.
  </p>

  <div style="background: #f4f3ee; border-radius: 12px; padding: 20px; margin: 0 0 24px;">
    <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #5c6472; margin: 0 0 8px;">
      Acesso à plataforma
    </p>
    <p style="font-size: 13px; line-height: 1.6; color: #0b0f14; margin: 0;">
      Use o e-mail da compra (<strong>{{ .Email }}</strong>) pra entrar.
      Clique no botão abaixo pra criar sua senha agora — é só um clique,
      sem precisar de "esqueci minha senha".
    </p>
  </div>

  <p style="font-size: 13px; font-weight: 700; margin: 0 0 12px;">Por onde começar:</p>
  <ol style="font-size: 13px; line-height: 1.7; color: #0b0f14; margin: 0 0 28px; padding-left: 20px;">
    <li>Clique no botão abaixo e crie sua senha.</li>
    <li>No dashboard, veja os produtos liberados pra sua conta.</li>
    <li>Abra o primeiro e assista a aula inicial.</li>
  </ol>

  <a href="{{ .ConfirmationURL }}"
     style="display: block; text-align: center; background: #c8f23c; color: #0b0f14; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 999px;">
    Criar minha senha e acessar
  </a>

  <p style="font-size: 12px; line-height: 1.6; color: #8a93a3; margin: 28px 0 0;">
    Se você não fez essa compra, pode ignorar este e-mail.
  </p>

  <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 28px 0 16px;" />
  <p style="font-size: 11px; line-height: 1.6; color: #8a93a3; margin: 0;">
    Equipe Attendio<br />
    Este e-mail foi enviado para {{ .Email }} porque você comprou um
    produto da Attendio.
  </p>
</div>
```

---

## Reset Password

**Subject:**
```
Redefinir sua senha — Attendio
```

**Message body (HTML):**
```html
<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #0b0f14;">
  <table role="presentation" style="margin: 0 0 28px;">
    <tr>
      <td style="width: 24px; height: 24px; background: #c8f23c; border-radius: 6px; text-align: center; vertical-align: middle;">
        <span style="color: #0b0f14; font-size: 11px; font-weight: 700;">A</span>
      </td>
      <td style="padding-left: 8px; font-size: 12px; font-weight: 800; letter-spacing: -0.02em;">
        attendio
      </td>
    </tr>
  </table>
  <hr style="border: none; border-top: 2px solid #c8f23c; margin: 0 0 28px;" />

  <h1 style="font-size: 20px; margin: 0 0 16px;">Redefinir sua senha</h1>

  <p style="font-size: 14px; line-height: 1.6; color: #5c6472; margin: 0 0 24px;">
    Recebemos um pedido para redefinir a senha da conta
    <strong>{{ .Email }}</strong>. Clique no botão abaixo para escolher
    uma nova senha.
  </p>

  <a href="{{ .ConfirmationURL }}"
     style="display: block; text-align: center; background: #c8f23c; color: #0b0f14; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 999px;">
    Criar nova senha
  </a>

  <p style="font-size: 12px; line-height: 1.6; color: #8a93a3; margin: 28px 0 0;">
    Se você não pediu essa redefinição, pode ignorar este e-mail — sua
    senha continua a mesma.
  </p>

  <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 28px 0 16px;" />
  <p style="font-size: 11px; line-height: 1.6; color: #8a93a3; margin: 0;">
    Equipe Attendio
  </p>
</div>
```

---

## Depois de colar

1. Salve cada template no Supabase.
2. Manda um teste real: no seu app, use "Esqueci minha senha" com seu
   próprio e-mail e confere se chegou com essa cara nova.
3. O `{{if .Data.full_name}}` só personaliza a saudação se a Hubla tiver
   mandado nome no payload da compra — se não mandar, cai no "Olá!"
   genérico, sem quebrar.
4. Quando tiver o domínio configurado com SMTP próprio (ver README), o
   remetente muda de `noreply@mail.app.supabase.io` para o seu e-mail —
   sem precisar mexer nesses templates de novo.
5. Opcional: se quiser um endereço/CNPJ no rodapé (como empresas maiores
   costumam colocar por exigência legal de e-mail marketing), me avisa
   com os dados que eu adiciono — não inventei nenhum aqui.
