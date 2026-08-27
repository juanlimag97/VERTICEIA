import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoPlayer } from "@/components/video-player";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product: productId } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .maybeSingle();

  if (!product) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: access } = await supabase
    .from("product_access")
    .select("id")
    .eq("product_id", productId)
    .is("revoked_at", null)
    .maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          ← Voltar
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">{product.name}</h1>
        {product.description && (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
        )}
      </div>

      {access ? (
        product.panda_video_id ? (
          <VideoPlayer pandaVideoId={product.panda_video_id} />
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
            Vídeo ainda não configurado para este produto.
          </div>
        )
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-medium">Você ainda não tem acesso a este produto.</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {user?.email}, se você já comprou, aguarde alguns instantes ou
            fale com o suporte.
          </p>
        </div>
      )}
    </div>
  );
}
