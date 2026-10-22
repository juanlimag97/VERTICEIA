"use client";

import { useEffect, useState } from "react";
import "@videojs/react/video/skin.css";
import { Video, VideoPlayer as Player, VideoSkin } from "@videojs/react/video";

export function VideoPlayer({ productId }: { productId: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/video-url?product=${encodeURIComponent(productId)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { url: string }) => {
        if (!cancelled) setSrc(data.url);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-100 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900">
        Não foi possível carregar o vídeo. Tente recarregar a página.
      </div>
    );
  }

  if (!src) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-900">
        Carregando vídeo...
      </div>
    );
  }

  return (
    <Player>
      <VideoSkin
        style={
          {
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "1rem",
            "--media-accent-color": "#4f46e5",
          } as React.CSSProperties
        }
      >
        <Video src={src} playsInline preload="auto" />
      </VideoSkin>
    </Player>
  );
}
