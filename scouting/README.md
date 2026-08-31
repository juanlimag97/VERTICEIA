# Scouting — protótipo do score de oportunidade

Cruza estatísticas da [API-Football](https://www.api-football.com/) com
valor de mercado e contrato do Transfermarkt pra gerar um ranking de
"oportunidade" no elenco de um time.

Isso é um **protótipo de validação**, não o produto final — serve pra testar
a tese (o dado dá pra gerar um ranking útil?) antes de investir em uma
arquitetura de verdade (banco, agendamento, cobertura de várias ligas ao
mesmo tempo, UI).

## Setup

```bash
cd scouting
pip install -r requirements.txt
export FOOTBALL_API_KEY=sua_chave_aqui
```

## Uso

```bash
python main.py --team "Amazonas FC" --league 75 --season 2023
```

- `--league`: ID da liga na API-Football. As já validadas com dado bom:
  Série A = 71, Série B = 72, Série C = 75, Série D = 76, Paulista A1 = 475,
  Carioca 1 = 624.
- `--season`: o plano free da API-Football só libera 2022–2024, não a
  temporada atual — pra rodar com dado corrente é preciso plano pago.
- `--limit`: útil pra testar rápido com poucos jogadores antes de rodar o
  elenco inteiro (cada jogador dispara 1-2 requisições no Transfermarkt).

O resultado sai em `output/<time>_<temporada>_oportunidades.csv`, ranqueado
pelo score, e também imprime um top 10 no terminal.

## Como o score é calculado

Ver o docstring de `opportunity_score.py`. Resumindo: 50% desempenho
(gols+assistências por 90 min, amortecido pela quantidade de minutos),
30% "preço baixo" (valor de mercado invertido — mais barato, mais pontos),
20% urgência de contrato (quanto mais perto de vencer, maior a chance de
sair barato ou de graça). Os pesos estão como constantes no topo do arquivo
— é o primeiro chute, não uma fórmula validada com dado real ainda.

## Limitações conhecidas

- **Casamento de nome é por similaridade de texto** (`difflib`), não por ID
  cruzado — jogador com nome muito comum ou apelido diferente do nome
  completo pode não casar certo ou casar errado. Confira o campo
  `tm_matched` no CSV antes de confiar cegamente no resultado.
- **Scraping do Transfermarkt**: tecnicamente funciona (testado e validado),
  mas os Termos de Uso deles restringem uso comercial de dado extraído.
  Isso está OK pra prototipagem/validação interna; antes de colocar em
  produção vendendo pra cliente, validar o risco legal ou buscar uma fonte
  de dado de valor de mercado com uso comercial permitido.
- **Séries C/D não têm `rating` por partida** na API-Football — o score usa
  só gols/assistências/minutos pra essas ligas, então não captura qualidade
  de jogo fora dos números ofensivos (um bom zagueiro sem gol/assistência
  vai pontuar baixo aqui, por exemplo).
