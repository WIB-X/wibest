#!/usr/bin/env python3
"""Bake static college cards into /colleges/<city>/best-<stream>/ pages
from the Firestore export (colleges-export.json). Mirrors college-stream.js
filtering and markup; JS replaces the grid via innerHTML at runtime."""
import json, re, glob, html

with open("colleges-export.json", encoding="utf-8") as f:
    raw = json.load(f)

def unwrap(v):
    for k in ("stringValue", "integerValue", "doubleValue", "booleanValue"):
        if k in v:
            return int(v[k]) if k == "integerValue" else v[k]
    return None

colleges = []
for row in raw:
    doc = row.get("document")
    if not doc:
        continue
    c = {k: unwrap(v) for k, v in doc["fields"].items()}
    c["id"] = doc["name"].rsplit("/", 1)[-1]
    colleges.append(c)

print(f"Loaded {len(colleges)} colleges")

def esc(s):
    return html.escape(str(s or ""), quote=True)

baked = skipped = 0
for path in glob.glob("colleges/*/best-*/index.html"):
    with open(path, encoding="utf-8") as f:
        page = f.read()
    if '<div class="grid" id="collGrid"></div>' not in page:
        skipped += 1
        continue
    m_city = re.search(r'window\.WIB_COLL_CITY = "([^"]+)"', page)
    m_stream = re.search(r'window\.WIB_COLL_STREAM = "([^"]+)"', page)
    if not m_city:
        skipped += 1
        continue
    city, stream = m_city.group(1).lower(), (m_stream.group(1).lower() if m_stream else "")

    rows = [c for c in colleges
            if str(c.get("city", "")).lower() == city
            and (not stream or stream in str(c.get("stream", "")).lower())]
    rows.sort(key=lambda c: c.get("rating") or 0, reverse=True)
    if not rows:
        print(f"  — no rows: {path}")
        skipped += 1
        continue

    cards = []
    for i, c in enumerate(rows[:30], 1):
        rating = f'<div class="ccard-rating">&#9733; {float(c["rating"]):.1f}</div>' if c.get("rating") else ""
        tags = ""
        if c.get("nirfRank"): tags += f'<span class="meta-tag">NIRF #{esc(c["nirfRank"])}</span>'
        if c.get("type"):     tags += f'<span class="meta-tag">{esc(c["type"])}</span>'
        if c.get("fees"):     tags += f'<span class="meta-tag">{esc(c["fees"])}</span>'
        if c.get("accreditation"): tags += f'<span class="meta-tag">{esc(c["accreditation"])}</span>'
        desc = f'<div class="ccard-desc">{esc(str(c["description"])[:200])}</div>' if c.get("description") else ""
        web = f'<a href="{esc(c["website"])}" target="_blank" rel="noopener" class="btn-web">Website</a>' if c.get("website") else ""
        cards.append(
            f'<div class="ccard"><div class="ccard-rank">#{i}</div>'
            f'<div class="ccard-top"><div class="ccard-name">{esc(c.get("name", "Unnamed"))}</div>{rating}</div>'
            f'<div class="ccard-meta">{tags}</div>{desc}'
            f'<div class="ccard-actions">{web}</div></div>'
        )

    page = page.replace('<div class="grid" id="collGrid"></div>',
                        f'<div class="grid" id="collGrid">{"".join(cards)}</div>')
    page = re.sub(r'(<span id="collCount">)[^<]*(</span>)',
                  rf'\g<1>{len(rows)}\g<2>', page)
    with open(path, "w", encoding="utf-8") as f:
        f.write(page)
    baked += 1
    print(f"  ✓ {path} ({len(rows)} colleges)")

print(f"\nDone. baked={baked} skipped={skipped}")
