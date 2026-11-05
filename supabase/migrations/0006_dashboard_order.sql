-- Reordena o grid do dashboard: Formatos de Criativo passa a ficar ao
-- lado do produto principal (Attendio IA), não no final da lista.
-- Perfil que Converte e Reputação 5 Estrelas (ainda "Em breve", travados
-- no código em lib/dashboard.ts) ficam por último.

update public.products set sort_order = 1 where id = 'vertice-ia';
update public.products set sort_order = 2 where id = 'formatos-de-criativo';
update public.products set sort_order = 3 where id = 'perfil-que-converte';
update public.products set sort_order = 4 where id = 'reputacao-5-estrelas';
