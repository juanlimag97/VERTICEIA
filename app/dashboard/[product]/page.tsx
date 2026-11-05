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
import { getCloneCardCopy } from "@/lib/clone-card-config";

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
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-10 text-center dark:border-white/10 dark:bg-grafite">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-white/5">
            <Lock className="h-5 w-5" />
          </span>
          <p className="font-medium">Você ainda não tem acesso a este produto.</p>
          <p className="max-w-sm text-sm text-cinza-texto">
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

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-white/10">
        <CompleteToggle productId={product.id} completed={!!access.completed_at} />
        <div className="flex items-center gap-1">
          <FavoriteButton productId={product.id} />
          {supportUrl && (
            <a
              href={supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-cinza-texto transition hover:bg-zinc-100 dark:hover:bg-white/5"
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
            {product.video_key ? (
              <VideoPlayer productId={product.id} />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-cinza-texto dark:border-white/10 dark:bg-grafite">
                Vídeo ainda não configurado para este produto.
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <CloneCard cloneUrl={product.clone_url} {...getCloneCardCopy(product.id)} />
          </div>
        </div>
      ) : product.video_key ? (
        <VideoPlayer productId={product.id} />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-cinza-texto dark:border-white/10 dark:bg-grafite">
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
        className="inline-flex items-center gap-1.5 text-sm text-cinza-texto transition hover:text-tinta dark:hover:text-nevoa"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Voltar
      </Link>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt/15 text-volt-escuro dark:bg-volt/10 dark:text-volt">
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
