-- Mostra o card "Receber o projeto no Lovable" na página do Attendio IA
-- (a UI já suporta isso pra qualquer produto com clone_url preenchido —
-- ver app/dashboard/[product]/page.tsx). Placeholder até você trocar pelo
-- link real de remix do Lovable (Supabase → Table Editor → products →
-- vertice-ia → coluna clone_url).
update public.products set clone_url = '#' where id = 'vertice-ia';
