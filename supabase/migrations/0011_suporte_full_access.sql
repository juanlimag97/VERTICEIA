-- Libera acesso a todos os produtos do catálogo para a conta de suporte.
-- Pré-requisito: o usuário suporte@attendio.com.br já precisa existir em
-- Authentication → Users (Add user) antes de rodar isto — o profile é
-- criado automaticamente pelo trigger on_auth_user_created. Se a conta
-- ainda não existir, este comando simplesmente não insere nada (não dá
-- erro, mas também não faz efeito).
insert into public.product_access (profile_id, product_id, source, granted_at)
select p.id, prod.id, 'manual', now()
from public.profiles p
cross join public.products prod
where p.email = 'suporte@attendio.com.br'
on conflict (profile_id, product_id)
do update set revoked_at = null, granted_at = now();
