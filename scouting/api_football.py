"""Cliente mínimo para a API-Football (v3.football.api-sports.io)."""

import time

import requests

BASE_URL = "https://v3.football.api-sports.io"

# Plano free: 10 req/min. Deixamos folga pra não tomar 429.
MIN_SECONDS_BETWEEN_CALLS = 6.5


class ApiFootballError(RuntimeError):
    pass


class ApiFootballClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self._last_call = 0.0

    def _get(self, path: str, params: dict) -> dict:
        wait = MIN_SECONDS_BETWEEN_CALLS - (time.monotonic() - self._last_call)
        if wait > 0:
            time.sleep(wait)
        resp = requests.get(
            f"{BASE_URL}{path}",
            headers={"x-apisports-key": self.api_key},
            params=params,
            timeout=15,
        )
        self._last_call = time.monotonic()
        resp.raise_for_status()
        payload = resp.json()
        if payload.get("errors"):
            raise ApiFootballError(str(payload["errors"]))
        return payload

    def find_team(self, name: str) -> dict:
        payload = self._get("/teams", {"search": name})
        if not payload["response"]:
            raise ApiFootballError(f"Nenhum time encontrado para '{name}'")
        return payload["response"][0]["team"]

    def get_team_players(self, team_id: int, league_id: int, season: int) -> list[dict]:
        players: list[dict] = []
        page = 1
        while True:
            payload = self._get(
                "/players",
                {"team": team_id, "league": league_id, "season": season, "page": page},
            )
            players.extend(payload["response"])
            paging = payload["paging"]
            if paging["current"] >= paging["total"]:
                break
            page += 1
        return players
