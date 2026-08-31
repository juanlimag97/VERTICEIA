import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

// Documentação: https://hubla.gitbook.io/docs/webhooks
// Eventos tratados: customer.member_added / customer.member_removed
// (disparados quando um comprador ganha/perde acesso a um produto — é
// exatamente o gatilho certo para liberar/revogar a área de membros).
//
// Autenticação: a Hubla envia o token configurado no painel dela no header
// `x-hubla-token`. Compare com HUBLA_WEBHOOK_TOKEN (variável de ambiente).

const hublaEventSchema = z.object({
  type: z.enum(["customer.member_added", "customer.member_removed"]),
  version: z.string().optional(),
  event: z.object({
    user: z.object({
      email: z.string().email(),
      firstName: z.string().optional().nullable(),
      lastName: z.string().optional().nullable(),
    }),
    product: z.object({
      id: z.string(),
      name: z.string().optional(),
    }),
  }),
});

function isAuthorized(request: Request) {
  const expected = process.env.HUBLA_WEBHOOK_TOKEN;
  if (!expected) return false;

  const received = request.headers.get("x-hubla-token") ?? "";
  const expectedBuf = Buffer.from(expected);
  const receivedBuf = Buffer.from(received);

  return (
    expectedBuf.length === receivedBuf.length &&
    timingSafeEqual(expectedBuf, receivedBuf)
  );
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const rawBody = await request.json().catch(() => null);
  const parsed = hublaEventSchema.safeParse(rawBody);

  if (!parsed.success) {
    // Payload que não reconhecemos (outro tipo de evento, ex: fatura/lead) —
    // confirma recebimento sem processar, para a Hubla não ficar reenviando.
    return NextResponse.json({ ignored: true });
  }

  const { type, event } = parsed.data;
  const fullName = [event.user.firstName, event.user.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const supabase = createAdminClient();

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("hubla_product_id", event.product.id)
    .maybeSingle();

  if (productError) {
    console.error("[hubla webhook] erro ao buscar produto:", productError);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }

  if (!product) {
    console.error(
      `[hubla webhook] produto Hubla "${event.product.id}" (${event.product.name ?? "sem nome"}) não está mapeado em public.products.hubla_product_id`
    );
    return NextResponse.json({ error: "unmapped_product" }, { status: 404 });
  }

  const profileId = await getOrCreateProfileId(supabase, event.user.email, fullName);
  if (!profileId) {
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }

  if (type === "customer.member_added") {
    const { error } = await supabase.from("product_access").upsert(
      {
        profile_id: profileId,
        product_id: product.id,
        source: "hubla",
        granted_at: new Date().toISOString(),
        revoked_at: null,
      },
      { onConflict: "profile_id,product_id" }
    );

    if (error) {
      console.error("[hubla webhook] erro ao conceder acesso:", error);
      return NextResponse.json({ error: "internal_error" }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("product_access")
      .update({ revoked_at: new Date().toISOString() })
      .eq("profile_id", profileId)
      .eq("product_id", product.id);

    if (error) {
      console.error("[hubla webhook] erro ao revogar acesso:", error);
      return NextResponse.json({ error: "internal_error" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

/**
 * Retorna o id (uuid) do profile correspondente ao e-mail do comprador,
 * criando o usuário no Supabase Auth (com convite por e-mail) se ainda não
 * existir. Isso permite que o acesso seja liberado antes mesmo do comprador
 * ter feito login pela primeira vez.
 */
async function getOrCreateProfileId(
  supabase: ReturnType<typeof createAdminClient>,
  email: string,
  fullName: string
) {
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existingProfile) {
    return existingProfile.id;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const { data: invited, error: inviteError } =
    await supabase.auth.admin.inviteUserByEmail(email, {
      data: fullName ? { full_name: fullName } : undefined,
      redirectTo: siteUrl
        ? `${siteUrl}/auth/callback?redirectTo=/auth/set-password`
        : undefined,
    });

  if (!inviteError && invited.user) {
    return invited.user.id;
  }

  // Corrida rara: o usuário foi criado entre o select acima e o invite
  // (ex: acabou de se cadastrar sozinho). Busca de novo.
  const { data: retryProfile, error: retryError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (retryError || !retryProfile) {
    console.error(
      "[hubla webhook] erro ao criar/localizar usuário:",
      inviteError ?? retryError
    );
    return null;
  }

  return retryProfile.id;
}
