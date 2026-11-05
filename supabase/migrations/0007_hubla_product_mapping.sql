-- Mapeia o Attendio IA pro id que a Hubla manda em `event.product.id` nos
-- webhooks (confirmado com um teste real no sandbox da Hubla em
-- 05/11/2026 — é o id da OFERTA, não do produto "pai" na Hubla, apesar do
-- nome do campo no payload ser só "product").

update public.products
set hubla_product_id = 'QEEFHEi0qjiCKXnlGfkA'
where id = 'vertice-ia';
