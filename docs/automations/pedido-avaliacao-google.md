# Bônus: Pedido automático de avaliação no Google

Fluxo pronto pra importar no n8n. Quando o atendimento é finalizado no
CRM, ele espera 2 horas e manda uma mensagem no WhatsApp pedindo avaliação
no Google — automático, sem precisar lembrar de pedir na mão.

**Arquivo do fluxo:** [`pedido-avaliacao-google.json`](./pedido-avaliacao-google.json)

## O que esse fluxo faz

```
CRM finaliza atendimento
        │
        ▼
  Webhook recebe os dados
        │
        ▼
   Tem telefone? ──não──▶ (para por aqui)
        │ sim
        ▼
  Espera 2 horas
        │
        ▼
  Manda WhatsApp pedindo avaliação
  (via Evolution API)
```

Só 4 passos, de propósito — nada de automação complexa demais. A espera
de 2h é pra não parecer que a mensagem foi automática demais (chega
"depois" do atendimento, não no segundo seguinte).

## Como importar

1. Abra o seu n8n (self-hosted ou n8n cloud).
2. **Workflows → Import from File** e selecione o arquivo
   `pedido-avaliacao-google.json` (ou **Import from URL** colando o link
   raw desse arquivo no GitHub).
3. O fluxo abre com 4 blocos: Webhook, Tem telefone?, Esperar 2h e Enviar
   WhatsApp.

## O que você precisa configurar

### 1. Variáveis de ambiente do n8n

No seu n8n, em **Settings → Environment Variables** (ou no `.env` se for
self-hosted), adicione:

| Variável | O que é |
| --- | --- |
| `EVOLUTION_API_URL` | URL da sua instância da Evolution API (ex: `https://sua-evolution.com`) |
| `EVOLUTION_INSTANCE` | Nome da instância do WhatsApp conectado na Evolution API |
| `EVOLUTION_API_KEY` | Chave de API da sua instância Evolution |
| `LINK_AVALIACAO_GOOGLE` | Link direto de avaliação (pega em Perfil da Empresa no Google → "Peça avaliações") |

### 2. Webhook no seu CRM

Copie a **URL do webhook** que aparece no bloco "Webhook - CRM finalizado"
dentro do n8n (depois de ativar o fluxo) e cadastre ela no seu CRM, na
automação de "quando o negócio/atendimento for marcado como
finalizado/ganho" (o nome exato varia por CRM — procure por "Webhooks" ou
"Automações" nas configurações).

O CRM precisa enviar, no mínimo, esses dois campos no corpo do webhook:

```json
{
  "nome": "Nome do cliente",
  "telefone": "5511999999999"
}
```

Se o seu CRM manda os campos com outro nome (ex: `client_name` em vez de
`nome`), ajuste as referências `{{$json.nome}}` e `{{$json.telefone}}`
dentro dos blocos do fluxo pra bater com o que o seu CRM realmente envia.

### 3. Ativar

Depois de configurar as variáveis e o webhook no CRM, ativa o fluxo no
canto superior direito do n8n ("Active").

## Testar

Envie manualmente um POST de teste pra URL do webhook (pode usar o
Postman, Insomnia, ou até o `curl`) com o JSON de exemplo acima, usando
seu próprio telefone, pra confirmar que a mensagem chega certinho antes
de deixar rodando de verdade.
