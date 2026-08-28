-- Progresso do usuário por produto + link de "clonar o projeto"

alter table public.product_access
  add column if not exists completed_at timestamptz;

alter table public.products
  add column if not exists clone_url text;
