import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createClient } from "@/lib/supabase/server";
import { createR2Client, R2_BUCKET_NAME } from "@/lib/r2";

// Gera uma URL assinada e temporária (2h) para o vídeo de um produto,
// guardado no Cloudflare R2. Só libera a URL se o usuário logado tiver
// acesso ao produto — essa checagem é obrigatória aqui porque esta rota
// pode ser chamada direto (fora da página do produto), então ela não pode
// confiar em nenhuma verificação feita no lado do cliente.

export async function GET(request: Request) {
  const productId = new URL(request.url).searchParams.get("product");

  if (!productId) {
    return NextResponse.json({ error: "missing_product" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { data: access } = await supabase
    .from("product_access")
    .select("id")
    .eq("product_id", productId)
    .is("revoked_at", null)
    .maybeSingle();

  if (!access) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("video_key")
    .eq("id", productId)
    .maybeSingle();

  if (!product?.video_key) {
    return NextResponse.json({ error: "no_video" }, { status: 404 });
  }

  const url = await getSignedUrl(
    createR2Client(),
    new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: product.video_key }),
    { expiresIn: 60 * 60 * 2 }
  );

  return NextResponse.json({ url });
}
