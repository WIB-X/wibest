#!/usr/bin/env python3
"""Pre-deploy validation gate for wibest.in.
Catches the recurring issue classes BEFORE they reach Google:
  1. Invalid JSON-LD (unescaped quotes, bad escapes, missing commas/braces)
  2. Literal \\x40 escapes (the @type bug)
  3. Clone leaks — a page carrying another page's template title/headline
  4. Empty Firestore-grid pages that are NOT noindexed (Soft-404 risk)
Run before every push:  python validate-site.py
Exit code 1 if any issue found.
"""
import re, json, glob, sys

errors = []

# Template strings that should never appear except on their own page
CLONE_LEAKS = [
    ("Best Hospitals in Bangalore 2026", "blog/best-hospitals-bangalore"),       # blog clone source
    ('"headline":"Best Hospitals in Bengaluru', "blog/best-hospitals-bangalore"),
]

files = [p for p in glob.glob("**/index.html", recursive=True) if "node_modules" not in p]
jsonld_total = 0

for p in files:
    try:
        html = open(p, encoding="utf-8").read()
    except Exception as e:
        errors.append(f"{p}: cannot read ({e})"); continue

    # 1 + 2: JSON-LD validity + \x40
    if "\\x40" in html:
        errors.append(f"{p}: contains literal \\x40 escape (should be @)")
    for b in re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL):
        jsonld_total += 1
        try:
            json.loads(b)
        except Exception as e:
            errors.append(f"{p}: INVALID JSON-LD -> {str(e)[:50]}")

    # 3: clone leaks (skip the legitimate source page)
    for needle, owner in CLONE_LEAKS:
        if needle in html and owner not in p.replace("\\", "/"):
            errors.append(f"{p}: clone leak — carries template string {needle!r}")

    # 4: empty Firestore grid not noindexed AND thin (Soft-404 risk).
    # An empty grid is fine if the page has substantial static content
    # (e.g. /hospitals/ has a city-guide). Only flag genuinely thin pages.
    pp = p.replace("\\", "/")
    head = html.split("<body")[0] if "<body" in html else html
    is_noindex = bool(re.search(r'<meta[^>]+name="robots"[^>]*noindex', head, re.I))
    has_empty_grid = any(g in html for g in [
        '<div class="school-grid" id="schoolGrid"></div>',
        '<div class="college-grid" id="collegeGrid"></div>',
        '<div class="hosp-grid" id="hospGrid"></div>',
        '<div class="grid" id="restGrid"></div>',
        '<div class="grid" id="schGrid"></div>',
        '<div class="grid" id="collGrid"></div>'])
    if has_empty_grid and not is_noindex:
        body = html.split("<body", 1)[-1]
        text = re.sub(r"<script[^>]*>.*?</script>", " ", body, flags=re.DOTALL)
        words = len(re.sub(r"<[^>]+>", " ", text).split())
        if words < 250:   # genuinely thin -> Soft-404 risk
            errors.append(f"{pp}: empty grid + not noindexed + thin ({words} words) — Soft-404 risk")

print(f"Checked {len(files)} pages, {jsonld_total} JSON-LD blocks.")
if errors:
    print(f"\n❌ {len(errors)} issue(s):")
    for e in errors[:40]:
        print("  -", e)
    sys.exit(1)
print("✅ ALL CLEAN — safe to deploy.")
