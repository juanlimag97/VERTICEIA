-- Mapeia o Formatos de Criativo (order bump) pro id real confirmado com
-- um teste de pagamento no sandbox da Hubla em 05/11/2026.

update public.products
set hubla_product_id = 'wx5HnFH0s0DisDIvSsVL'
where id = 'formatos-de-criativo';
