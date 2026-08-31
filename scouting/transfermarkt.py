"""Scraper mínimo pra Transfermarkt (valor de mercado + contrato).

Usar só pra prototipagem/validação interna — ver ressalva de Termos de Uso
no README antes de rodar isso em produção.
"""

import re
import time

import requests

BASE_URL = "https://www.transfermarkt.com.br"
SEARCH_URL = f"{BASE_URL}/schnellsuche/ergebnis/schnellsuche"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "pt-BR,pt;q=0.9",
}

# Delay educado entre requisições pra não martelar o site.
SECONDS_BETWEEN_CALLS = 1.5

PLAYER_LINK_RE = re.compile(r'href="(/[a-z0-9-]+/profil/spieler/(\d+))"[^>]*>\s*([^<]+?)\s*<')
MARKET_VALUE_RE = re.compile(r'data-header__market-value-wrapper">\s*(€[\d.,]+\s*(?:mil|mi\.)?)')
LABEL_VALUE_RE = re.compile(
    r'data-header__label">([^<]+)<.*?data-header__content[^"]*">\s*([^<]+)', re.S
)

_last_call = 0.0


def _throttled_get(url: str, params: dict | None = None) -> requests.Response:
    global _last_call
    wait = SECONDS_BETWEEN_CALLS - (time.monotonic() - _last_call)
    if wait > 0:
        time.sleep(wait)
    resp = requests.get(url, headers=HEADERS, params=params, timeout=15)
    _last_call = time.monotonic()
    resp.raise_for_status()
    return resp


def search_players(name: str) -> list[dict]:
    resp = _throttled_get(SEARCH_URL, {"query": name})
    seen: dict[str, dict] = {}
    for path, pid, label in PLAYER_LINK_RE.findall(resp.text):
        seen.setdefault(pid, {"id": pid, "path": path, "label": re.sub(r"\s+", " ", label).strip()})
    return list(seen.values())


def get_player_profile(path: str) -> dict:
    resp = _throttled_get(f"{BASE_URL}{path}")
    html = resp.text

    profile = {
        "market_value_raw": None,
        "contract_until": None,
        "birth_age_raw": None,
        "position": None,
        "height": None,
    }

    mv = MARKET_VALUE_RE.search(html)
    if mv:
        profile["market_value_raw"] = mv.group(1).strip()

    for label, value in LABEL_VALUE_RE.findall(html):
        label, value = label.strip(), value.strip()
        if label.startswith("Contrato at") and value:
            profile["contract_until"] = value
        elif label.startswith("Nasc") and value:
            profile["birth_age_raw"] = value
        elif label == "Posição:" and value:
            profile["position"] = value
        elif label == "Altura:" and value:
            profile["height"] = value

    return profile
