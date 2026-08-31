"""Casamento de nome de jogador entre API-Football e Transfermarkt."""

import difflib


def best_match(name: str, candidates: list[dict]) -> dict | None:
    labels = [c["label"] for c in candidates]
    close = difflib.get_close_matches(name, labels, n=1, cutoff=0.5)
    if not close:
        return None
    return next(c for c in candidates if c["label"] == close[0])
