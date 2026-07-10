# Inputs Needed From Aamir — Handover Checklist

> Everything in the site that's gated on you, in one place, so you can hand it over **one at a time**.
> Tell me the item + the content (paste text, or give a file path), and I'll wire it into the right
> page(s) and check it off here. Created 2026-06-29.
>
> **Priority tiers:** **Tier 1** = needed before the site goes live · **Tier 2** = makes it much
> stronger (the prospect's decisive asks) · **Tier 3** = completeness / mechanical confirms ·
> **Tier 4** = sharpeners & later content (improve, don't block). Hand them over in any order.

---

## ✅ Already resolved (no action — listed so you don't re-supply)
Founder LinkedIn (linkedin.com/in/aamironline) · ISO cert numbers (9001 123961/B/0001, 27001
123961/A/0001, URS/UKAS) · legal entity + address (Maniar Technologies Pvt Ltd; Mira Road East,
Thane, Maharashtra 401107) · Sales Navigator stack (Django 6/React 19/PostgreSQL/AWS) · Touchpoint
stack · Oomera's title ("Operations") · positioning (depth, not price) · public team = Aamir + Oomera
only for now (son/Nomaan held by your choice; Hitesh reserved until he signs).

---

## TIER 1 — Launch blockers (site shouldn't go live without these)

### Brand & visual assets — *the single biggest gap (every page is image-less today)*
- [x] **Logo — RECEIVED 2026-06-29** → `E:\Dropbox\Designs\ManiarTech\` (full set: color/black/white/gold,
  SVG+PNG, ISO 9001+27001 gold badge, QR codes, round stamp). **Palette: navy `#1b0f2e` + gold `#d3bc5f`;
  font: Century Gothic; mark: comet-star.** (Open Qs to Aamir: primary lockup navy-vs-gold · light-vs-dark
  site direction · written design concept? · QR/stamp/ISO-badge usage · tagline.)
- [ ] **Favicon** — can derive from the comet-star mark (confirm OK) or supply one
- [ ] **Founder headshot — Aamir** (good quality, plain/clean background ideally)
- [ ] **Headshot — Oomera**
- [ ] **Hero / section imagery direction** — supply photos, OR confirm we use tasteful stock/abstract/illustration
- [x] **ISO badge asset RECEIVED** (`iso.png` — gold laurel "ISO 9001 27001") → use as the visual, backed by
  cert numbers + URS/UKAS + verify line (so it reads as real, not a buyable sticker).

### Case-study visuals — *scrubbed/demo only; real customer data must never ship*
> **DECISION (Aamir, 2026-06-30):** Use the recovered originals **as interim BUILD placeholders** so the
> build isn't blocked; Aamir will supply **purpose-built demo-data captures** to swap in **before go-live**.
> Aamir is aware and explicitly confirmed he will NOT publish Chemo's real data ("Chemo won't like it…
> rest assured"). RERA numbers are **published/public**, so those are NOT a concern. No redaction needed —
> swap, don't mask. **Hard launch-gate:** these two must be replaced with demo versions before the site goes public.
- [~] **Chemo — DEMO screenshot RECEIVED (2026-06-30)** — Aamir shared a genuine **dummy-data** capture of the
  Chemo sample-list UI (Water Test / Mosquito Cream / FINALUX / etc.; reviewers John·Kelvin·Sara·David — all demo).
  Home page **"See it in action"** showcase + browser-frame component (`.mt-window`) are built and wired to
  `themes/maniartech/assets/imgs/projects/chemo-app.png`. ⏳ ACTION: Aamir to save the PNG to that exact path
  (Claude can't write pasted images to disk). Once dropped, it renders. Also wire into the Chemo case study.
- [ ] **Sales Navigator — DEMO screenshots** (to REPLACE interim `sales-navigator-t2586-01.webp`, which shows real
  Shantee project names/descriptions). Need a **demo project** (fictional name/location; demo customer). RERA is
  public, so not the blocker — the client name + project descriptions are. *(Interim placeholder OK to build with.)*
- [ ] *(Optional)* RTL, Booster, or any other clean screenshots you're happy to show
- *(Note: the `reference-images/` set Aamir shared earlier are the REAL-DATA reference originals, catalogued
  reference-only in `reference-images/README.md` — they confirm the views but are not the scrubbed/demo versions.)*

### Links that must resolve — *a dead nav link fails the site's one job*
- [ ] **GitHub org URL** (github.com/maniartech?) + confirm the **public repo count** (memory says 42 — confirm or say "cut the number")
- [ ] **Confirm the live links are OK** (already wired — just your yes): signals · gotime · vault-storage repos · Internet Object playground + repo · uexl-go repo
- [x] **Footer entity + address — CONFIRMED** (on old site + ISO cert): Maniar Technologies Pvt Ltd ·
  344/1301, Kalpataru Srishti Complex, Mira Road East, Thane, Maharashtra 401107, India. Wired into Contact §5.
- [x] **Contact — RECEIVED 2026-06-29** (from old site): contact@maniartech.com · careers@maniartech.com ·
  **+91-8976897675** · Thane address (matches the ISO cert). *Confirm these stay current for the new site.*

---

## TIER 2 — Trust multipliers (the prospect's decisive asks)
*(In the prospect walk-through, these are exactly what turned "cautious yes" into "I need more.")*
- [x] **Testimonials — RECEIVED + ALL PLACED (2026-06-29)** (→ `_inbox/testimonials.md`): 5 named quotes,
  verbatim, display confirmed by Aamir. ⭐ **Peter Haid (Strativity CPO)** → Touchpoint case + home ·
  **Shailesh Pichori (TendersInfo/Euclid)** → Content Engine case · **Jeff Hines (UpSport)** → home +
  reframed UpSport case (named, repeat-founder) · **Ashish Singh (Digi Mind)** + **Dimple Karnani (zehn)**
  → home strip.
- [ ] **★ One client quote for Chemo** — a sentence from the director who waited ~1 yr. *Highest-value single item on this whole list* (a client's own voice, not ours).
- [ ] **A second named teammate** (when you're ready) — name + role + photo; or tell me to keep holding
- [ ] **Hitesh** (when he signs + consents): confirm he's joining + name + role + the exact **"former CTO, Network18"** wording + a **verify link** (his LinkedIn)
- [ ] **Any real numbers** you're comfortable stating — years, projects delivered, clients served, OSS adoption (only true/citable ones)

---

## TIER 3 — Completeness / mechanical confirms
### ISO / procurement
- [ ] **Renewed Cycle-2 ISO certificate** (new dates), when issued — so I can print a validity line
- [ ] **URS online verification URL** — if they provide one (upgrades "verify by email" → one-click)
- [ ] *(Optional)* CIN / company registration number for the footer

### Per-page verify flags (small confirms)
- [ ] **Touchpoint** — do we have rights to show any **product UI screenshot**? (Strativity owns it.) If not, it stays text-only.
- [ ] **Content Engine** — confirm the **"tender"** example wording is OK to use verbatim
- [ ] **Internet Object** — confirm OK to state the **40–60% smaller / ~30% fewer-tokens** range publicly
- [ ] **UExL playground domain** — when live, give me the URL to wire the reserved "Try it" CTA
- [ ] **Estimator (interim)** — confirm the **response-time wording** (e.g. "a senior engineer replies within one business day")
- [ ] **Social handles** — LinkedIn company page (+ any others) for the footer
- [ ] **Touchpoint old stack** (Django 2 / Backbone / CoffeeScript…) — keep in metadata only, or surface it? *(recommend metadata only — reads dated)*
- [ ] Confirm any **"10+ sites on Taj Mahal"** / adopter naming you're OK to state

---

## TIER 4 — Sharpeners & later content (improve, not block)
- [ ] **★ The spearhead decision** — what ManiarTech leads with (the engineering-partner identity / which 1–2 domains). Sharpens the capabilities page + the whole positioning.
- [ ] **Ideal-client profile** — industry, size, the role you sell to, the pain that makes them call. Sharpens SEO + copy.
- [ ] **Labs pass-2 priorities** + appetite to **publish unpublished projects** sooner (the biggest OSS-awareness unlock)
- [ ] **≥1 real White Paper** — a topic + a draft/outline (brings the White Papers section into the nav)
- [ ] OK for me to **draft Insights / launch posts** from your specs for your approval (the content engine)
- [ ] **Estimator surface/launch plan** — when the real tool (separate repo) merges in

---

### How we'll work this
Hand me one item → I wire it into the exact page(s) → I check it off here and note where it landed.
Tier 1 + the two Tier 2 stars (a client quote + images) are what stand between "ready to build" and
"ready to launch." Everything else sharpens or completes. *(Source of the gaps: the per-page
`[verify — Aamir]` / `[PLACEHOLDER]` flags + the IA review — see `IA-REVIEW-2026-06-29.md`.)*
