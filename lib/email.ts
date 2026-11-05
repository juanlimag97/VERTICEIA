import "server-only";

/**
 * Envio de e-mail transacional via Resend (https://resend.com). Usado só
 * pra e-mails que não são de autenticação (esses continuam pelos
 * templates do Supabase — ver docs/email-templates.md).
 */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error(
      "[email] RESEND_API_KEY ou RESEND_FROM_EMAIL não configurados — e-mail não enviado."
    );
    return { error: "not_configured" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`[email] falha ao enviar (${response.status}):`, body);
    return { error: "send_failed" as const };
  }

  return { error: null };
}
