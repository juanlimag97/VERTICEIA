/**
 * Templates de e-mail enviados via Resend (lib/email.ts). Os de
 * autenticação (convite/redefinição de senha) ficam no Supabase — ver
 * docs/email-templates.md — este arquivo é só pros disparados por código.
 */
export function implementacaoCallEmail(fullName: string, calendlyUrl: string) {
  const greeting = fullName ? `Olá, ${fullName}!` : "Olá!";

  const subject = "Vamos agendar sua call de implementação — Attendio";

  const html = `
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

  <p style="font-size: 15px; margin: 0 0 16px;">${greeting}</p>

  <p style="font-size: 14px; line-height: 1.6; color: #5c6472; margin: 0 0 8px;">
    Sua compra da <strong>Implementação</strong> foi aprovada — agora é só
    marcar um horário pra gente colocar tudo no ar junto com você.
  </p>
  <p style="font-size: 14px; line-height: 1.6; color: #5c6472; margin: 0 0 24px;">
    Clique no botão abaixo e escolha o dia e horário que funcionam melhor
    pra sua agenda.
  </p>

  <a href="${calendlyUrl}"
     style="display: block; text-align: center; background: #c8f23c; color: #0b0f14; text-decoration: none; font-size: 14px; font-weight: 700; padding: 14px 24px; border-radius: 999px;">
    Agendar minha call de implementação
  </a>

  <p style="font-size: 12px; line-height: 1.6; color: #8a93a3; margin: 28px 0 0;">
    Dúvidas antes da call? Só responder este e-mail.
  </p>

  <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 28px 0 16px;" />
  <p style="font-size: 11px; line-height: 1.6; color: #8a93a3; margin: 0;">
    Equipe Attendio
  </p>
</div>
`.trim();

  return { subject, html };
}
