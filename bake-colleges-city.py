#!/usr/bin/env python3
"""Bake static college cards into /colleges/<city>/index.html city pages
from colleges-export.json. Mirrors the page's inline renderColleges() markup;
the JS replaces the grid via innerHTML at runtime (skeletons -> live data).
Run after any Firestore import: python bake-colleges-city.py"""
import json, re, glob, html

with open("colleges-export.json", encoding="utf-8") as f:
    raw = json.load(f)

def unwrap(v):
    for k in ("stringValue", "integerValue", "doubleValue", "booleanValue"):
        if k in v:
            return int(v[k]) if k == "integerValue" else v[k]
    if "arrayValue" in v:
        return [unwrap(x) for x in v["arrayValue"].get("values", [])]
    return None

colleges = []
for row in raw:
    doc = row.get("document")
    if not doc:
        continue
    c = {k: unwrap(v) for k, v in doc["fields"].items()}
    c["id"] = doc["name"].rsplit("/", 1)[-1]
    colleges.append(c)

def completeness(c):
    return sum(1 for v in c.values() if v not in (None, "", 0, []))

deduped = {}
for c in colleges:
    key = (str(c.get("name", "")).lower(), str(c.get("city", "")).lower())
    if key not in deduped or completeness(c) > completeness(deduped[key]):
        deduped[key] = c
colleges = list(deduped.values())
print(f"Loaded {len(colleges)} colleges (after dedupe)")

def esc(s):
    return html.escape(str(s or ""), quote=True)

def fmt_fees(a):
    if not a: return "N/A"
    a = float(a)
    if a >= 100000: return f"{a/100000:.1f}L"
    if a >= 1000: return f"{a/1000:.0f}K"
    return str(int(a))

def fmt_pkg(a):
    if not a: return "N/A"
    a = float(a)
    if a >= 100000: return f"{a/100000:.1f}L"
    return str(int(a))

STAR = '<svg viewBox="0 0 16 16"><path d="M8 1.5l2.18 4.42 4.87.71-3.52 3.43.83 4.84L8 12.42l-4.36 2.48.83-4.84L1 6.63l4.87-.71z"/></svg>'

def card(c):
    r = c.get("google_rating") or 0
    try: r = float(r)
    except: r = 0
    rating = f'<div class="card-rating">{STAR} {r:.1f}</div>' if r > 0 else ""
    meta = ""
    if c.get("stream"): meta += f'<span class="meta-tag stream">{esc(c["stream"])}</span>'
    meta += f'<span class="meta-tag">{esc(c.get("city",""))}</span><span class="meta-tag">{esc(c.get("type",""))}</span>'
    if c.get("accreditation"): meta += f'<span class="meta-tag">{esc(c["accreditation"])}</span>'
    pp = c.get("placement_percent")
    stats = (f'<div class="card-stats">'
             f'<div class="stat"><div class="stat-val">{fmt_fees(c.get("fees"))}</div><div class="stat-label">Annual Fees</div></div>'
             f'<div class="stat"><div class="stat-val">{str(pp)+"%" if pp else "N/A"}</div><div class="stat-label">Placements</div></div>'
             f'<div class="stat"><div class="stat-val">{fmt_pkg(c.get("avg_package"))}</div><div class="stat-label">Avg Package</div></div></div>')
    courses = c.get("courses") or []
    if isinstance(courses, list) and courses:
        chips = "".join(f'<span class="course-chip">{esc(co)}</span>' for co in courses[:4])
        courses_html = f'<div class="card-courses">{chips}</div>'
    else:
        courses_html = ""
    cid = esc(c["id"])
    return (f'<div class="card" onclick="location.href=\'/college-detail.html?id={cid}\'">'
            f'<div class="card-top"><div class="card-name">{esc(c.get("name","College"))}</div>{rating}</div>'
            f'<div class="card-meta">{meta}</div>{stats}{courses_html}'
            f'<div class="card-actions"><button class="btn-details" onclick="event.stopPropagation();location.href=\'/college-detail.html?id={cid}\'">View Details</button>'
            f'<button class="btn-enquiry" onclick="event.stopPropagation();location.href=\'/college-detail.html?id={cid}&amp;enquire=true\'">Enquire</button></div></div>')

def replace_grid(page, inner):
    """Replace collegeGrid contents (skeletons or old bake) div-balanced."""
    start_tag_m = re.search(r'<div class="college-grid" id="collegeGrid">', page)
    if not start_tag_m:
        return None
    start = start_tag_m.start()
    tag_end = start_tag_m.end()
    i, depth = start, 0
    while i < len(page):
        if page.startswith("<div", i):
            depth += 1; i += 4
        elif page.startswith("</div>", i):
            depth -= 1; i += 6
            if depth == 0:
                return page[:start] + '<div class="college-grid" id="collegeGrid">' + inner + "</div>" + page[i:]
        else:
            i += 1
    return None

baked = skipped = 0
for path in glob.glob("colleges/*/index.html"):
    page = open(path, encoding="utf-8").read()
    m = re.search(r"const CITY='([^']+)'", page)
    if not m:
        skipped += 1
        continue
    city = m.group(1).lower()
    rows = [c for c in colleges if str(c.get("city","")).lower() == city]
    rows.sort(key=lambda c: float(c.get("google_rating") or 0), reverse=True)
    if not rows:
        print(f"  - no data: {path}")
        skipped += 1
        continue
    inner = "".join(card(c) for c in rows[:40])
    new = replace_grid(page, inner)
    if new is None:
        print(f"  - grid not found: {path}")
        skipped += 1
        continue
    open(path, "w", encoding="utf-8").write(new)
    baked += 1
    print(f"  + {path} ({len(rows)} colleges)")

print(f"\nDone. baked={baked} skipped={skipped}")
