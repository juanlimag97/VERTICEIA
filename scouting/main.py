"""Protótipo: cruza API-Football (desempenho) + Transfermarkt (valor/contrato)
e gera um ranking de "oportunidade" pro elenco de um time.

Uso:
    export FOOTBALL_API_KEY=xxxxxxxx
    python main.py --team "Amazonas FC" --league 75 --season 2023

O plano free da API-Football só libera temporadas 2022-2024 — por isso o
default de --season é 2023, não a temporada atual.
"""

import argparse
import csv
import os
import sys
from pathlib import Path

from api_football import ApiFootballClient, ApiFootballError
from matching import best_match
from opportunity_score import compute_scores, parse_age, parse_market_value
from transfermarkt import get_player_profile, search_players

OUTPUT_DIR = Path(__file__).parent / "output"


def enrich_with_transfermarkt(player_name: str) -> dict:
    candidates = search_players(player_name)
    match = best_match(player_name, candidates)
    if not match:
        return {}
    return get_player_profile(match["path"])


def build_dataset(team_name: str, league_id: int, season: int, api_key: str, limit: int | None) -> list[dict]:
    client = ApiFootballClient(api_key)

    team = client.find_team(team_name)
    print(f"Time encontrado: {team['name']} (id {team['id']})")

    raw_players = client.get_team_players(team["id"], league_id, season)
    if limit:
        raw_players = raw_players[:limit]
    print(f"{len(raw_players)} jogadores retornados pela API-Football para essa liga/temporada.")

    dataset = []
    for entry in raw_players:
        player = entry["player"]
        stats = next((s for s in entry["statistics"] if s["league"]["id"] == league_id), None)
        if stats is None:
            continue

        print(f"  buscando Transfermarkt: {player['name']}...")
        try:
            tm = enrich_with_transfermarkt(player["name"])
        except Exception as exc:  # rede instável, bloqueio pontual etc.
            print(f"    aviso: falhou Transfermarkt para {player['name']}: {exc}")
            tm = {}

        dataset.append(
            {
                "id": player["id"],
                "name": player["name"],
                "position": stats["games"]["position"],
                "age_api": player["age"],
                "minutes": stats["games"]["minutes"] or 0,
                "goals": stats["goals"]["total"] or 0,
                "assists": stats["goals"]["assists"] or 0,
                "rating": stats["games"]["rating"],
                "market_value_raw": tm.get("market_value_raw"),
                "market_value": parse_market_value(tm.get("market_value_raw")),
                "contract_until": tm.get("contract_until"),
                "age_tm": parse_age(tm.get("birth_age_raw")),
                "tm_matched": bool(tm),
            }
        )

    return dataset


def write_csv(players: list[dict], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "score",
        "name",
        "position",
        "age_api",
        "minutes",
        "goals",
        "assists",
        "rating",
        "market_value_raw",
        "contract_until",
        "contract_months_left",
        "performance_score",
        "value_score",
        "contract_score",
        "tm_matched",
    ]
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(players)


def print_top(players: list[dict], n: int = 10) -> None:
    print(f"\nTop {n} oportunidades:")
    print(f"{'score':>6}  {'nome':<25}{'pos':<15}{'min':>5}{'gols':>5}{'ast':>4}  valor        contrato até")
    for p in players[:n]:
        print(
            f"{p['score']:>6.1f}  {p['name']:<25}{(p['position'] or '-'):<15}"
            f"{p['minutes']:>5}{p['goals']:>5}{p['assists']:>4}  "
            f"{(p['market_value_raw'] or '-'):<12} {p['contract_until'] or '-'}"
        )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--team", required=True, help='Nome do time, ex: "Amazonas FC"')
    parser.add_argument("--league", type=int, required=True, help="ID da liga na API-Football (ex: 75 = Série C)")
    parser.add_argument("--season", type=int, default=2023, help="Temporada (free plan: 2022-2024)")
    parser.add_argument("--api-key", default=os.environ.get("FOOTBALL_API_KEY"))
    parser.add_argument("--limit", type=int, default=None, help="Limitar nº de jogadores (útil pra teste rápido)")
    args = parser.parse_args()

    if not args.api_key:
        sys.exit("Faltou a API key. Use --api-key ou exporte FOOTBALL_API_KEY.")

    try:
        dataset = build_dataset(args.team, args.league, args.season, args.api_key, args.limit)
    except ApiFootballError as exc:
        sys.exit(f"Erro na API-Football: {exc}")

    if not dataset:
        sys.exit("Nenhum jogador com estatística encontrada pra essa combinação de time/liga/temporada.")

    ranked = compute_scores(dataset)

    output_path = OUTPUT_DIR / f"{args.team.replace(' ', '_')}_{args.season}_oportunidades.csv"
    write_csv(ranked, output_path)
    print(f"\nCSV salvo em: {output_path}")

    print_top(ranked)


if __name__ == "__main__":
    main()
