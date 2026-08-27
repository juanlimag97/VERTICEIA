-- Área de Membros — schema inicial
-- Rode este arquivo no SQL Editor do Supabase (ou via `supabase db push`).

-- ─────────────────────────────────────────────────────────────────────────
-- profiles: um registro por usuário autenticado, espelhando auth.users
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: usuário lê o próprio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: usuário atualiza o próprio perfil"
  on public.profiles for update
  using (auth.uid() = id);

-- Cria o profile automaticamente quando alguém se cadastra no Supabase Auth
-- (login/senha ou magic link). O acesso a produtos é concedido depois,
-- pelo webhook da Hubla, quando a compra é identificada pelo e-mail.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────
-- products: catálogo de produtos/módulos da área de membros
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.products (
  id text primary key, -- slug, ex: 'vertice-ia'
  name text not null,
  description text,
  panda_video_id text, -- id do vídeo (ou da pasta) no Panda Video
  hubla_product_id text unique, -- id do produto na Hubla, usado pelo webhook
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "products: qualquer usuário autenticado lê o catálogo"
  on public.products for select
  to authenticated
  using (true);

-- Catálogo inicial — ajuste nomes/descrições, o panda_video_id de cada um
-- depois de subir os vídeos no Panda Video, e o hubla_product_id de cada um
-- com o id real do produto na Hubla (veja README.md).
insert into public.products (id, name, description, sort_order) values
  ('vertice-ia', 'Vértice IA', 'O programa principal.', 1),
  ('perfil-que-converte', 'Perfil que Converte', 'Como estruturar seu perfil para converter.', 2),
  ('reputacao-5-estrelas', 'Reputação 5 Estrelas', 'Construindo prova social e reputação.', 3),
  ('formatos-de-criativo', 'Formatos de Criativo', 'Formatos de criativo que performam.', 4)
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────────────────
-- product_access: quem tem acesso a qual produto (liberado pelo webhook)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.product_access (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  product_id text not null references public.products (id) on delete cascade,
  source text not null default 'hubla',
  hubla_transaction_id text,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (profile_id, product_id)
);

alter table public.product_access enable row level security;

create policy "product_access: usuário lê o próprio acesso"
  on public.product_access for select
  using (auth.uid() = profile_id);

-- Nenhuma policy de insert/update/delete para usuários: essas linhas só são
-- escritas pelo backend (webhook da Hubla) usando a service role key, que
-- ignora RLS.

create index if not exists product_access_profile_id_idx
  on public.product_access (profile_id);
