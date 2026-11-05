-- Substitui o placeholder da 0009 pelo link real de remix do Lovable.
update public.products
set clone_url = 'https://lovable.dev/projects/811c2c69-4751-4540-b168-a41b7bbe2f9a/remix'
where id = 'vertice-ia';
