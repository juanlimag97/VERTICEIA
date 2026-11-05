-- Rebrand: "Vértice IA" agora se chama "Attendio".
--
-- O slug/id técnico do produto ('vertice-ia') continua o mesmo de
-- propósito — ele é referenciado por product_access.product_id (chave
-- estrangeira) e por URLs já compartilhadas (/dashboard/vertice-ia).
-- Trocar o id exigiria migrar todo acesso já concedido; o nome exibido
-- é o que realmente importa pro usuário final.

update public.products
set name = 'Attendio'
where id = 'vertice-ia';
