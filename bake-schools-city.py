#!/usr/bin/env python3
"""Bake static school .card markup into /schools/<city>/index.html city pages
from schools-export.json. The page's inline renderSchools() replaces the grid
via innerHTML on load, so no user-facing duplication. Fixes Soft 404 caused by
skeleton-loader-only grids that look empty to Googlebot."""
import json, re, glob, html

with open("schools-export.json", encoding="utf-8") as f:
    raw = json.load(f)

def unwrap(v):
    for k in ("stringValue", "integerValue", "doubleValue", "booleanValue"):
        if k in v:
            return int(v[k]) if k == "integerValue" else v[k]
    return None

schools = []
for row in raw:
    doc = row.get("document")
    if not doc:
        continue
    s = {k: unwrap(v) for k, v in doc["fields"].items()}
    s["id"] = doc["name"].rsplit("/", 1)[-1]
    schools.append(s)

print(f"Loaded {len(schools)} schools")

def esc(x):
    return html.escape(str(x or ""), quote=True)

STAR = '<svg viewBox="0 0 16 16"><path d="M8 1.5l2.18 4.42 4.87.71-3.52 3.43.83 4.84L8 12.42l-4.36 2.48.83-4.84L1 6.63l4.87-.71z"/></svg>'

def fmt_fees(f):
    try:
        f = int(f)
    except (TypeError, ValueError):
        return "N/A"
    if f <= 0:
        return "N/A"
    if f >= 100000:
        return f"₹{f/100000:.1f}L"
    return f"₹{f/1000:.0f}K"

SKELETON = ('<div class="school-grid" id="schoolGrid"><div class="skeleton skeleton-card" '
            'style="height:240px"></div><div class="skeleton skeleton-card" '
            'style="height:240px"></div><div class="skeleton skeleton-card" '
            'style="height:240px"></div></div>')

baked = skipped = 0
for path in glob.glob("schools/*/index.html"):
    with open(path, encoding="utf-8") as f:
        page = f.read()
    if SKELETON not in page:
        skipped += 1
        continue
    city = path.replace("\\","/").split("/")[1]
    rows = [s for s in schools if str(s.get("city", "")).lower() == city.lower()]
    rows.sort(key=lambda s: s.get("rating") or 0, reverse=True)
    if not rows:
        print(f"  - no rows: {city}")
        skipped += 1
        continue

    cards = []
    for s in rows[:30]:
        rating = s.get("rating") or 0
        rating_html = (f'<div class="card-rating">{STAR} {float(rating):.1f}</div>'
                       if rating > 0 else "")
        board = s.get("board") or ""
        board_tag = f'<span class="meta-tag board">{esc(board)}</span>' if board and board != "N/A" else ""
        sid = esc(s.get("id", ""))
        cards.append(
            f'<div class="card" onclick="location.href=\'/school-detail.html?id={sid}\'">'
            f'<div class="card-top"><div class="card-name">{esc(s.get("name", "School"))}</div>{rating_html}</div>'
            f'<div class="card-meta">{board_tag}<span class="meta-tag">{esc(s.get("city", ""))}</span>'
            f'<span class="meta-tag">{esc(s.get("type", "Co-ed"))}</span></div>'
            f'<div class="card-stats">'
            f'<div class="stat"><div class="stat-val">{fmt_fees(s.get("fees"))}</div><div class="stat-label">Annual Fees</div></div>'
            f'<div class="stat"><div class="stat-val">{esc(s.get("board_results") or s.get("results") or "N/A")}</div><div class="stat-label">Results</div></div>'
            f'<div class="stat"><div class="stat-val">{esc(s.get("student_teacher_ratio") or "N/A")}</div><div class="stat-label">S:T Ratio</div></div>'
            f'</div>'
            f'<div class="card-actions"><button class="btn-details" onclick="event.stopPropagation();location.href=\'/school-detail.html?id={sid}\'">View Details</button></div>'
            f'</div>'
        )

    filled = f'<div class="school-grid" id="schoolGrid">{"".join(cards)}</div>'
    page = page.replace(SKELETON, filled)
    with open(path, "w", encoding="utf-8") as f:
        f.write(page)
    baked += 1
    print(f"  + {city} ({len(rows)} schools)")

print(f"\nDone. baked={baked} skipped={skipped}")
