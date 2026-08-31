"""Cálculo do score de oportunidade.

Fórmula (ajustável nos pesos abaixo):
  score = 100 * (W_PERF * desempenho + W_VALUE * preço_baixo + W_CONTRACT * urgência_de_contrato)

- desempenho: (gols/90 * 1.0 + assistências/90 * 0.7), normalizado dentro do
  elenco consultado e amortecido pela quantidade de minutos jogados (jogador
  com poucos minutos não infla o score por amostra pequena).
- preço_baixo: valor de mercado normalizado e invertido (mais barato = score
  maior). Sem dado de valor -> neutro (0.5), não penaliza nem beneficia.
- urgência_de_contrato: quanto mais perto do fim do contrato, maior o
  score (jogador pode sair barato ou de graça em breve).
"""

import re
from datetime import date, datetime

W_PERF = 0.5
W_VALUE = 0.3
W_CONTRACT = 0.2

MINUTES_FOR_FULL_RELIABILITY = 900  # ~10 jogos completos


def parse_market_value(raw: str | None) -> float | None:
    if not raw:
        return None
    text = raw.replace("€", "").strip()
    multiplier = 1.0
    if "mi" in text:
        multiplier = 1_000_000
        text = text.split("mi")[0]
    elif "mil" in text:
        multiplier = 1_000
        text = text.split("mil")[0]
    text = text.strip().replace(".", "").replace(",", ".")
    try:
        return float(text) * multiplier
    except ValueError:
        return None


def parse_age(raw: str | None) -> int | None:
    if not raw:
        return None
    match = re.search(r"\((\d+)\)", raw)
    return int(match.group(1)) if match else None


def months_until_contract_ends(contract_until: str | None, today: date | None = None) -> float | None:
    if not contract_until:
        return None
    today = today or date.today()
    try:
        end = datetime.strptime(contract_until, "%d/%m/%Y").date()
    except ValueError:
        return None
    return (end - today).days / 30.44


def contract_urgency(months_left: float | None) -> float:
    if months_left is None:
        return 0.3
    if months_left <= 6:
        return 1.0
    if months_left <= 12:
        return 0.7
    if months_left <= 24:
        return 0.4
    return 0.1


def per90(total: float | None, minutes: float | None) -> float:
    if not minutes:
        return 0.0
    return (total or 0) * 90 / minutes


def normalize(values: list[float]) -> list[float]:
    lo, hi = min(values), max(values)
    if hi == lo:
        return [0.5 for _ in values]
    return [(v - lo) / (hi - lo) for v in values]


def compute_scores(players: list[dict]) -> list[dict]:
    """Recebe uma lista de jogadores já enriquecidos e devolve com 'score'."""
    perf_raw = []
    for p in players:
        reliability = min(1.0, (p["minutes"] or 0) / MINUTES_FOR_FULL_RELIABILITY)
        offense = per90(p["goals"], p["minutes"]) * 1.0 + per90(p["assists"], p["minutes"]) * 0.7
        perf_raw.append(offense * reliability)
    perf_norm = normalize(perf_raw)

    values = [p["market_value"] for p in players if p["market_value"] is not None]
    value_norm_by_id = {}
    if values:
        norm = normalize(values)
        idx = 0
        for p in players:
            if p["market_value"] is not None:
                value_norm_by_id[p["id"]] = 1 - norm[idx]  # invertido: barato = alto
                idx += 1

    for p, perf in zip(players, perf_norm):
        value_score = value_norm_by_id.get(p["id"], 0.5)
        months_left = months_until_contract_ends(p["contract_until"])
        contract_score = contract_urgency(months_left)
        p["performance_score"] = round(perf, 3)
        p["value_score"] = round(value_score, 3)
        p["contract_score"] = round(contract_score, 3)
        p["contract_months_left"] = round(months_left, 1) if months_left is not None else None
        p["score"] = round(100 * (W_PERF * perf + W_VALUE * value_score + W_CONTRACT * contract_score), 1)

    return sorted(players, key=lambda p: p["score"], reverse=True)
