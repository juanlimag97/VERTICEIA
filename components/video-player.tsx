export function VideoPlayer({ pandaVideoId }: { pandaVideoId: string }) {
  const base = process.env.NEXT_PUBLIC_PANDA_PLAYER_BASE_URL;

  if (!base) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
        Configure NEXT_PUBLIC_PANDA_PLAYER_BASE_URL para exibir o vídeo.
      </div>
    );
  }

  const src = `${base.replace(/\/$/, "")}/embed/?v=${encodeURIComponent(pandaVideoId)}`;

  return (
    <div className="aspect-video overflow-hidden rounded-xl bg-black">
      <iframe
        src={src}
        className="h-full w-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
