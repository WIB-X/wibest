#!/usr/bin/env python3
"""Bake static school cards into /schools/<city>/best-<board>/ pages
from the Firestore export (schools-export.json). Mirrors school-board.js."""
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

baked = skipped = 0
for path in glob.glob("schools/*/best-*/index.html"):
    with open(path, encoding="utf-8") as f:
        page = f.read()
    m_grid = re.search(r'<div class="grid" id="schGrid"></div>|<div class="grid" id="schoolGrid"></div>', page)
    if not m_grid:
        skipped += 1
        continue
    grid_tag = m_grid.group(0)
    m_city = re.search(r'window\.WIB_SCH_CITY = "([^"]+)"', page)
    m_board = re.search(r'window\.WIB_SCH_BOARD = "([^"]+)"', page)
    if not m_city:
        skipped += 1
        continue
    city, board = m_city.group(1).lower(), (m_board.group(1).lower() if m_board else "")

    rows = [s for s in schools
            if str(s.get("city", "")).lower() == city
            and (not board or board in str(s.get("board", "")).lower())]
    rows.sort(key=lambda s: s.get("rating") or 0, reverse=True)
    if not rows:
        print(f"  - no rows: {path}")
        skipped += 1
        continue

    cards = []
    for i, s in enumerate(rows[:30], 1):
        rating = f'<div class="scard-rating">&#9733; {float(s["rating"]):.1f}</div>' if s.get("rating") else ""
        b = s.get("board") or s.get("type") or ""
        tags = f'<span class="meta-tag board">{esc(b)}</span>' if b else ""
        if s.get("area") or s.get("locality"): tags += f'<span class="meta-tag">{esc(s.get("area") or s.get("locality"))}</span>'
        if s.get("grades") or s.get("gradeRange"): tags += f'<span class="meta-tag">{esc(s.get("grades") or s.get("gradeRange"))}</span>'
        if s.get("fees"): tags += f'<span class="meta-tag">{esc(s["fees"])}</span>'
        desc = f'<div class="scard-desc">{esc(str(s["description"])[:200])}</div>' if s.get("description") else ""
        web = f'<a href="{esc(s["website"])}" target="_blank" rel="noopener" class="btn-web">Website</a>' if s.get("website") else ""
        cards.append(
            f'<div class="scard"><div class="scard-rank">#{i}</div>'
            f'<div class="scard-top"><div class="scard-name">{esc(s.get("name", "Unnamed"))}</div>{rating}</div>'
            f'<div class="scard-meta">{tags}</div>{desc}'
            f'<div class="scard-actions">{web}</div></div>'
        )

    page = page.replace(grid_tag, grid_tag.replace("></div>", f">{''.join(cards)}</div>"))
    page = re.sub(r'(<span id="schCount">)[^<]*(</span>)', rf'\g<1>{len(rows)}\g<2>', page)
    with open(path, "w", encoding="utf-8") as f:
        f.write(page)
    baked += 1
    print(f"  + {path} ({len(rows)} schools)")

print(f"\nDone. baked={baked} skipped={skipped}")
