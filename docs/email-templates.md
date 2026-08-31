# E-mails de autenticação (convite e redefinição de senha)

Cole isso em **Supabase → Authentication → Email Templates**. São só dois
templates que a área de membros usa:

- **Invite user** → e-mail que a pessoa recebe quando compra (webhook da
  Hubla) e precisa criar a senha pela primeira vez.
- **Reset Password** → e-mail do "Esqueci minha senha".

O remetente (`de: ...@...`) só muda depois de configurar um SMTP próprio
com o seu domínio (Project Settings → Auth → SMTP Settings). O **conteúdo**
abaixo já pode ser colado agora, independente disso.

---

## Invite user

**Subject:**
```
Seu acesso à Vértice IA está pronto 🎉
```

**Message body (HTML):**
```html
<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
  <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4f46e5; margin: 0 0 24px;">
    Vértice IA
  </p>

  <h1 style="font-size: 20px; margin: 0 0 16px;">Sua compra foi confirmada!</h1>

  <p style="font-size: 14px; line-height: 1.6; color: #52525b; margin: 0 0 24px;">
    Recebemos sua compra e seu acesso à área de membros já está liberado.
    Falta só um passo: clique no botão abaixo para criar sua senha e
    entrar.
  </p>

  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background: #4f46e5; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px;">
    Criar minha senha
  </a>

  <p style="font-size: 12px; line-height: 1.6; color: #a1a1aa; margin: 24px 0 0;">
    Se você não fez essa compra, pode ignorar este e-mail.
  </p>
</div>
```

---

## Reset Password

**Subject:**
```
Redefinir sua senha — Vértice IA
```

**Message body (HTML):**
```html
<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #18181b;">
  <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #4f46e5; margin: 0 0 24px;">
    Vértice IA
  </p>

  <h1 style="font-size: 20px; margin: 0 0 16px;">Redefinir sua senha</h1>

  <p style="font-size: 14px; line-height: 1.6; color: #52525b; margin: 0 0 24px;">
    Recebemos um pedido para redefinir a senha da sua conta. Clique no
    botão abaixo para escolher uma nova senha.
  </p>

  <a href="{{ .ConfirmationURL }}"
     style="display: inline-block; background: #4f46e5; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px;">
    Criar nova senha
  </a>

  <p style="font-size: 12px; line-height: 1.6; color: #a1a1aa; margin: 24px 0 0;">
    Se você não pediu essa redefinição, pode ignorar este e-mail — sua
    senha continua a mesma.
  </p>
</div>
```

---

## Depois de colar

1. Salve cada template no Supabase.
2. Manda um teste real: no seu app, use "Esqueci minha senha" com seu
   próprio e-mail e confere se chegou com essa cara nova.
3. Quando tiver o domínio configurado com SMTP próprio (ver README), o
   remetente muda de `noreply@mail.app.supabase.io` para o seu e-mail —
   sem precisar mexer nesses templates de novo.
