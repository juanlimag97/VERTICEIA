import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock, LifeBuoy } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { VideoPlayer } from "@/components/video-player";
import { ProductIcon } from "@/components/product-icon";
import { ExpandableDescription } from "@/components/product/expandable-description";
import { CompleteToggle } from "@/components/product/complete-toggle";
import { FavoriteButton } from "@/components/product/favorite-button";
import { CloneCard } from "@/components/product/clone-card";
import { CreativeFormatsGrid } from "@/components/product/creative-formats-grid";

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
    .select("id, completed_at")
    .eq("product_id", productId)
    .is("revoked_at", null)
    .maybeSingle();

  const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL;

  if (!access) {
    return (
      <div className="flex flex-col gap-6">
        <ProductHeader product={product} />
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
            <Lock className="h-5 w-5" />
          </span>
          <p className="font-medium">Você ainda não tem acesso a este produto.</p>
          <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
            {user?.email}, se você já comprou, aguarde alguns instantes ou
            fale com o suporte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ProductHeader product={product} />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <CompleteToggle productId={product.id} completed={!!access.completed_at} />
        <div className="flex items-center gap-1">
          <FavoriteButton productId={product.id} />
          {supportUrl && (
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <LifeBuoy className="h-4 w-4" />
              Precisa de ajuda?
            </a>
          )}
        </div>
      </div>

      {product.id === "formatos-de-criativo" ? (
        <CreativeFormatsGrid />
      ) : product.clone_url ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {product.panda_video_id ? (
              <VideoPlayer pandaVideoId={product.panda_video_id} />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
                Vídeo ainda não configurado para este produto.
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <CloneCard cloneUrl={product.clone_url} />
          </div>
        </div>
      ) : product.panda_video_id ? (
        <VideoPlayer pandaVideoId={product.panda_video_id} />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
          Vídeo ainda não configurado para este produto.
        </div>
      )}
    </div>
  );
}

function ProductHeader({
  product,
}: {
  product: { id: string; name: string; description: string | null };
}) {
  return (
    <div>
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
          <ProductIcon productId={product.id} className="h-5 w-5" />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">
          {product.name}
        </h1>
      </div>
      {product.description && (
        <div className="mt-3 ml-14">
          <ExpandableDescription text={product.description} />
        </div>
      )}
    </div>
  );
}
