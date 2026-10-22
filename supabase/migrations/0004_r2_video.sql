-- Troca a fonte do vídeo de "Panda Video" (pago) para Cloudflare R2
-- (armazenamento gratuito, S3-compatível, sem custo de banda de saída).
--
-- `video_key` é o caminho do arquivo dentro do bucket R2 (ex:
-- 'vertice-ia/aula-1.mp4'). A URL de reprodução é gerada na hora, assinada
-- e temporária, pela rota app/api/video-url/route.ts — nunca é um link
-- público fixo.

alter table public.products
  add column if not exists video_key text;

comment on column public.products.panda_video_id is
  'Depreciado — trocado por video_key (Cloudflare R2). Mantido só para não perder histórico.';
