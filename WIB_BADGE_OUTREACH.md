# WIB Score Badge — Outreach Playbook

How to get hospitals and restaurants to embed the WIB Score badge on their websites. Each embed = a do-follow backlink from a real Indian business website. Those are the highest-value SEO links you can earn.

**Tool**: https://wibest.in/embed/score/
**Time per outreach**: ~3 minutes per business
**Realistic conversion**: 3-8% of contacted businesses → 30-80 backlinks over 12 months at 1,000 contacts.

---

## Why this works

1. **Indian hospitals love verification badges.** They put NABH, JCI, ISO, AHPI logos on their About pages prominently. A "Verified by WIB" badge slots into that existing pattern.

2. **The badge HTML is dead simple.** Their marketing team copies one HTML block. No technical work, no script, no security review needed.

3. **Mutual value.** They get external validation; we get a topical, do-follow backlink. No money changes hands.

4. **The badge URL doesn't break.** Self-contained inline HTML — no JS to load, no external script that could fail. Their developers won't push back.

---

## Target list — who to contact

### Tier 1: highest probability of adoption

**Trust/Foundation hospitals** (BAPS, Father Muller, JSS, RIMS, Aditya Birla Memorial, MGM, Manipal trust hospitals)
- They like external recognition more than corporate chains
- Less brand-policing; can adopt without HQ approval
- Marketing budget is smaller; free credibility tools are welcome

**Tier-3 city hospitals** featured in WIB's "Beyond the Metros" report
- Bhopal: Bansal, Chirayu, Apollo Sage
- Nagpur: NKP Salve, Wockhardt, Care, Orange City
- Mysore: Apollo BGS, JSS, Manipal Mysuru, Columbia Asia
- Vadodara: Sterling, Bhailal Amin, Sunshine Global, Tristar
- Patna: Paras HMRI, Ruban Memorial
- They got coverage in WIB; receptive to follow-up

**Standalone fine-dining restaurants** (less likely chains)
- Villa Maya (Trivandrum), Khorikaa (Guwahati), Dalma (Bhubaneswar), Mahalaxmi Bhojanalay (Vadodara)
- They tend to invest in website credibility more than chain restaurants

### Tier 2: medium probability

- Corporate hospital chains (Apollo, Fortis, Manipal, Max) — marketing teams are larger, more review steps. Still worth contacting; if they bite, you get 10+ backlinks at once (each branch).
- IHG, Marriott, ITC, Taj hotel restaurants — hotel marketing teams handle these; longer cycle but possible.

### Tier 3: low priority

- Government hospitals (AIIMS, RIMS, etc.) — government websites rarely change. Skip.
- Food delivery chains — they don't care about WIB validation.

---

## Email template — hospitals

**Subject:** Quick free tool for [Hospital Name] — verified rating badge for your website

**Body:**

```
Hi [Marketing/Communications Lead],

I run wibest.in, an independent India comparison platform that ranks hospitals by data, not paid placement. We've been tracking [Hospital Name] in our dataset since [year/recent date] and you currently have a [X.X] verified rating with NABH accreditation noted.

Quick free thing you might want: we just shipped an embeddable badge tool for businesses featured on WIB. Three styles, three sizes, one line of HTML — your team can drop it into your website's About page or Accreditations section in 60 seconds.

Build yours here (no signup, no login):
https://wibest.in/embed/score/

Why your team might want this:
- External validation alongside your NABH/JCI/ISO badges
- No tech work — pure HTML snippet, works in any CMS
- Free forever; we benefit from referral traffic, you benefit from credibility
- The badge links to your WIB profile, which we drive organic search traffic to (we get [reasonable number]+ unique visitors per month, growing 100%+ MoM)

Your WIB profile: https://wibest.in/hospitals/[city-slug]/

Happy to walk your marketing team through it on a 10-min call if useful.

[YOUR NAME]
Founder, wibest.in
hello@wibest.in
```

**Personalisation that matters** (60 seconds per email):
- Replace `[Hospital Name]` with their exact name
- Replace `[X.X]` with their actual WIB rating
- Replace `[city-slug]` with their city (e.g., `bangalore`, `mumbai`)
- Find the marketing/communications person's name on their website's About/Contact page

---

## Email template — restaurants

**Subject:** Free tool for [Restaurant Name] — your verified rating badge

**Body:**

```
Hi [Owner / Manager Name],

I run wibest.in, an independent India comparison platform. We feature [Restaurant Name] in our dataset with a verified [X.X] rating — it's one of the standout spots in our [City] coverage.

We just shipped a free embeddable badge tool. Your team can paste a single HTML block on your website (or in your Linktree, Instagram bio link page, etc.) showing your WIB-verified rating. Useful for credibility signalling to first-time customers researching where to eat in [city].

Build yours here (no signup, no login):
https://wibest.in/embed/score/

Why this might be useful:
- Standalone external validation (we have no commercial relationship with any restaurant)
- No tech work needed — copy and paste
- Free forever
- Your WIB profile links from the badge: https://wibest.in/restaurants/[city-slug]/

If you ever want to highlight specific things on your WIB profile — signature dishes, chef name, an Eater-style "what to order" guide — drop me an email and we'll write it in.

[YOUR NAME]
Founder, wibest.in
hello@wibest.in
```

---

## Sending plan

### Week 1: warm targets
- 20 contacted (Tier 1 trust hospitals + tier-3 hospitals from our reports)
- Send Monday through Wednesday morning IST (best hospital marketing response window)
- Track in spreadsheet: business name, contact name, email, sent date, replied, badge installed

### Week 2-4: scale up
- 40-60 per week (Tier 1 + Tier 2 mix)
- Standardise tracking
- Follow-up after 7 days if no response (single follow-up only)

### Month 2+
- Continue at 30-40/week
- Add new hospitals as WIB dataset expands
- Watch GA `badge_copied` event to see which segments convert best

---

## Tracking what works

In GA:
- **Event**: `badge_copied`
- **Event category**: `embed`
- **Event label**: `<vertical>/<business_name>`

Filter by event_label to see who's actively using the tool. Once a business copies the badge, follow up after 7 days to confirm installation:

> "Hi [name], hope the WIB badge install went smoothly. If you ran into any technical issue dropping it in, happy to help. If you've already published it, would love to see — sharing my latest update on this with our weekly digest readers."

---

## Following up after install

Once a business publishes the badge:

1. **Confirm the live URL** — search Google for `site:[their-domain] wibest.in` to find the page hosting the badge
2. **Add them to a "WIB Featured" page** on wibest.in — every adoption gets reciprocal recognition
3. **Mention them in the next weekly newsletter** — "5 hospitals just added the WIB verified badge to their sites this week. Welcome!"
4. **Cross-link** — link to their WIB profile from a relevant report or city page

This creates a flywheel: badge install → press coverage → more badge installs.

---

## Common objections and responses

**"We need legal/management approval to display third-party badges"**
> "Totally understand. The badge HTML is entirely self-contained — no external scripts, no data collection, just an inline link back to your WIB profile. Happy to send the exact HTML for your legal team's review before you install."

**"We want to know how WIB calculates the rating"**
> "Editorial — verified address, NABH status, specialties cross-checked against your website. Ratings are normalised from public review aggregates (Google, Practo, where available). Full methodology at wibest.in/editorial-process/."

**"What if our rating changes?"**
> "The badge shows the rating at the time you copied it. If the rating shifts meaningfully, just regenerate the snippet from /embed/score/ and replace it. We don't auto-update embedded HTML so we never break your site by pushing changes."

**"Can we pay you to feature us more prominently?"**
> "No — we don't accept payment for listings or ratings. That's the whole point of WIB. The badge is free and independent."

---

## Why this is more leveraged than directory submissions

Directory backlinks (Yellow Pages style) are:
- Low authority
- Often nofollow
- Penalised by Google when overused

Hospital/restaurant website backlinks are:
- High authority (real Indian businesses with their own domain authority)
- Do-follow (your link rules apply)
- Topically aligned (Google sees: "WIB is trusted by Apollo, Fortis, etc." — perfect signal)

**Realistic monthly impact of 30 high-quality backlinks**: domain authority +3 to +5 over 6 months, organic traffic +30-50% from improved SERP rankings. Worth the outreach time.
