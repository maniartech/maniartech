# maniartech.com — Site Map & IA Contract (REBUILT 2026-06)

> **This supersedes the old stale `_ia/`.** Built from the complete `_inbox/` catalog
> (Labs ×17, Products, 7 Services, the Keystone Method, strategy docs). This is the
> **contract**: nav, the Taj Mahal module map (page shapes), every page, show/hold decisions,
> and the homepage outline. **Confirm the module map before content generation** (per
> build-site.md Step 1–2).
>
> **⛔ GOVERNING RULE #1 applies to every page:** nothing exaggerated; honest status labels;
> every claim TRUE + SOURCED + CALIBRATED. Defaults below are deliberately the *conservative/
> honest* option — Aamir only intervenes to be bolder or fix a fact.
>
> **Primary CTA everywhere:** "Estimate Your Project →" (`/estimate/`). Secondary: Contact.
> **Positioning DECIDED (Aamir, 2026-06): DEPTH / QUALITY / WORLD-CLASS — the price-vs-depth
> question is RESOLVED toward depth.** A research-driven engineering lab that authors standards +
> a language, builds with senior/world-class engineers. **"~50% cost / cheaper" is REMOVED as a
> positioning pillar** (it contradicted the premium brand + reinforced the offshore-cheap
> stereotype). Don't claim "cheap" OR "premium-priced" — say nothing about price as a brand
> promise; handle price per-engagement (estimator/proposals). Underlying efficiency = a quiet
> benefit clients DISCOVER, never a billboard. ⚠️ Honesty: present the senior-only STANDARD +
> "building the best team" AMBITION — do NOT claim a world-class team already exists (no team yet).

---

## 1. Navigation

**Primary nav (6 + CTA button):**
`Services` · `Products` · `Labs` · `Case Studies` · `Insights` · `About` · **[ Estimate Your Project → ]**

- **Standards & Languages hub** = featured *inside* Labs (lead cluster) + a dedicated hub page
  (`/standards`); not a separate nav item (keeps nav lean). [DEFAULT — could be promoted.]
- **White Papers** = featured inside Insights + footer; cross-linked. [DEFAULT — could be nav.]
- **Partnerships** (Technology Partnership) = footer + linked from About/Services (selective/
  premium, not mass nav). [DEFAULT.]

**Footer:** Services · Products · Labs · Standards hub · Case Studies · White Papers · Insights ·
About · Partnerships · Careers · Contact · "Built with Taj Mahal" badge · newsletter signup ·
social/GitHub · ISO badges.

---

## 2. Module map (Taj Mahal page shapes — THE technical contract)

Shapes: **general pages** (standalone, bespoke), **list/article** (`/section/*` = listing +
inferred `<list>-article` detail), **docs tree** (`/**`, not used in v1).

| Module | Shape | Pattern | Why |
|---|---|---|---|
| `site` | general pages | `home: /`, `about: /about`, `contact: /contact`, `estimate: /estimate`, `careers: /careers`, `partnerships: /partnerships`, `standards: /standards` | Standalone designed pages |
| `services` | **general pages** | `services: /services`, `bpa: /services/business-process-automation`, … (7 details) | Curated set; bespoke per-service design (flagship Keystone is richer). Share a layout via one-line `{% extends %}` shims; flagship can diverge. *(Alt: list/article if uniform detail is preferred.)* |
| `products` | list/article | `products: /products/*` | Listing + detail per product; grows cheaply |
| `labs` | list/article | `labs: /labs/*` | Listing (grouped by `category` frontmatter) + detail per project (17) |
| `case-studies` | list/article | `case-studies: /case-studies/*` | Listing + detail per study |
| `white-papers` | list/article | `white-papers: /white-papers/*` | Listing + detail per paper (+ PDF) |
| `insights` | list/article | `insights: /insights/*` | Chronological blog (SEO/content engine) |

> Each `/*` auto-creates the inferred `<list>-article` page — never declared. Labs grouping
> (Standards & Languages · OSS Libraries · Dev Tools · Frameworks & Platforms) via `category`
> frontmatter + the listing template (per LABS-PAGE-IA.md).

---

## 3. Page inventory

### `site` + `services` (general pages)
| Page | URL | Status | Content source |
|---|---|---|---|
| Home | `/` | build | §6 outline + all dossiers |
| About | `/about` | build (needs real team/founder inputs) | TRUST-STRATEGY; dogfood model; 15yr/ISO |
| Standards & Languages hub | `/standards` | build | "5 standards + Indigo" narrative; links Labs details |
| Estimate Your Project | `/estimate` | build (intent-capture landing; tool merges later) | price-estimator.md |
| Contact | `/contact` | build | — |
| Partnerships (Technology Partnership) | `/partnerships` | build (premium/selective; NO track-record) | service-technology-partnership.md |
| Careers | `/careers` | build (light; "we're growing") | — |
| Services overview | `/services` | build | the 6 services + Keystone teaser |

**Services — 3 CATEGORIES + 2 CROSS-CUTTING CAPABILITIES (restructured & APPROVED, Aamir 2026-06).**
Root `/services` overview shows all five.

**TOP-LEVEL CATEGORIES (the "WHAT" — non-overlapping domains):**

**1) ⭐ Enterprise Software Engineering** `/services/enterprise-software-engineering` — *the systems
that run your operations.* **Keystone Method** (the method for the whole practice). Powered by
Processious, Ordin, Tallery. Sub:
  - **Business Process Automation & Integration** `/.../process-automation` — flagship; Keystone, value ladder, "stairs to the palace." Proof: Processious/Ordin/Engage.
  - **Digital Asset Management** `/.../digital-asset-management` — on Tallery framework.
  - **Business Analytics** `/.../business-analytics` — capability backed by systems work; NO standalone track-record claim yet.
**2) Application Software Engineering** `/services/application-software-engineering` — *applications
& products, built for you.* Sub:
  - **Custom application development** `/.../custom-development` — bespoke, end-to-end; Sales Navigator (anon) proof.
  - **Architecture review & advisory** `/.../architecture-advisory` — audit existing, recommend.
**3) Technology Partnership** `/partnerships` — build WITH you (co-founder/equity); selective/premium.

**CROSS-CUTTING CAPABILITIES (the "HOW" — woven through 1 & 2; own showcase pages; NOT competing categories):**
- **AI** `/services/ai` — agentic, knowledge-grounded AI applied across operations AND apps. Proof: Documentor + Estimator. *(was "AI-Driven Innovation".)*
- **Modernization & Migration** `/services/modernization` — bring existing systems (enterprise OR app) onto modern stacks, **incl. Go** (⭐ authored-Go-ecosystem proof) + dogfood proof (own rebuilds: Tallery/Processious); honest polyglot framing. *(merges legacy-mod + golang dossiers.)*

> **WHY (Aamir approved 2026-06):** AI + Modernization were the overlap culprits — they're
> *capabilities*, not domains, so they go INTO everything. Separating the "what" (domains 1–3)
> from the "how" (capabilities) removes the bleed. AI/Modernization keep their own pages + proof
> + SEO; framed as "what we bring," not competing buckets. No taxonomy is 100% exclusive, but the
> real bleed is gone; remaining line = operations-systems vs applications/products (clean).
> Dossier mapping: bpa + dam → Enterprise SE · custom-software-engineering → Application SE ·
> ai-engineering → AI capability · legacy-modernization + golang-transition → Modernization capability.

### `products` — `/products/*`
| Product | URL | Status label | Show? |
|---|---|---|---|
| Processious | `/products/processious` | **In production** | ✅ SHOW (flagship; no version numbers) |
| Ordin | `/products/ordin` | In development (fair-code) | ✅ SHOW (modest) |
| Documentor.AI | `/products/documentor` | Early-stage | 🟡 modest entry + AI-service capability proof (confirm fundraise publicity) |
| Tallery Gallery | `/products/tallery-gallery` | In development (framework) | 🟡 modest "framework"; DAM *service* is the primary face |
| ~~Growthicious~~ | — | Planning | ⛔ HOLD (off public site) |
| ~~Taj Mahal Spaces~~ | — | Future | ⛔ HOLD (future-mention on Taj Mahal SSG labs page only) |
| *(Booster = Labs/Dev-Tools entry, not a product page yet)* | | Internal | dogfood proof |

> **List/article (DONE 2026-06-29):** `products: /products/*` → list page `_ia/products.md` + articles
> in `_ia/products/` (`processious · ordin · documentor · tallery-gallery · booster`). Frontmatter
> drives the cards: `title · description · productStatus` (badge — NOT the reserved `status`) `· order
> · image`. ⚠️ Tallery's article title = the capability label **"Enterprise Digital Asset Management"** —
> the brand is NOT surfaced in copy; slug `tallery-gallery` is internal routing only. Growthicious +
> Taj Mahal Spaces held off the list.

### `labs` — `/labs/*` (listing grouped by category + detail ×17)
- **Standards & Languages:** Indigo ⭐ · Internet Object · NITES · UExL *(publish-ready)* · FUSE/FuseAPI · AddressQL
- **Open Source Libraries:** signals (~325★) · gotime · vault-storage · xlib
- **Developer Tools:** Booster · gowork · gocurl · conductor/orchestrator
- **Frameworks & Platforms:** Taj Mahal SSG *(powers this site; Spaces future-mention)* · MDKit · WebDoodling · Printeer
- Each card: honest status label + one proof badge. UExL/IO link live playgrounds (gate on publish).

> **List/article (pass 1 DONE 2026-06-29):** `labs: /labs/*` → list page `_ia/labs.md` (grouped by
> `category`) + articles in `_ia/labs/`. **7 flagship articles built:** indigo · internet-object · uexl
> · signals · gotime · vault-storage · tajmahal-ssg. **10 queued (pass 2):** nites · fuse · iql · xlib ·
> gowork · gocurl · orchestrator · mdkit · webdoodling · printeer (shown on the list page as "detail
> coming"). Frontmatter drives cards: `title · description · labStatus` (badge — NOT reserved `status`)
> `· order · category · license · repo` (empty unless public) `· playground` (empty unless live) `·
> image`. Link-dark verified: Indigo no links · UExL playground non-clickable · Taj Mahal no repo link ·
> signals ★ not headlined.

### `case-studies` — `/case-studies/*` (6 drafted, 2026-06; canonical wording in `_inbox/case-study-proof-snippets.md`)
| Study | Public framing | Status | Source dossier |
|---|---|---|---|
| **Chemo Test Laboratory** | NAMED (publicly credits MT); LIMS on Processious, in production; 2 live verify URLs | ready (scrub screenshots) | case-study-chemo-lab.md |
| **Reliable Analytical Labs (RTL)** | company NAMED, individual NOT; 600 forms→1, ~15-yr living (hedged) | ready | case-study-rtl-lab.md |
| **Sales Navigator** (real-estate) | ANONYMIZED ("a Mumbai-region developer"); in-progress, no outcomes till 2026 | ready (anon) | case-study-sales-navigator.md |
| **Touchpoint Dashboard** | product NAMED; founder = principal architect (honest); O'Reilly ref | ready | case-study-touchpoint-dashboard.md |
| **Content Engine (Euclid Infotech)** | NAMED; 2010 applied NLP/AI heritage; cost NOT headlined | ready | case-study-procurement-nlp.md |
| **UpSport** | ANONYMIZED; capability + honesty proof (engineering ≠ business outcome) | ready (anon) | case-study-upsport.md |

> **List/article wiring (tajmahal-ssg Ch. 9):** module `case-studies` = `case-studies: /case-studies/*`
> → a **list page** (`_ia/case-studies.md` = its static intro) + an inferred **article page** per study.
> **DONE 2026-06-29:** the six articles now live in `_ia/case-studies/` as clean slugs (`chemo` · `rtl`
> · `sales-navigator` · `touchpoint` · `content-engine` · `upsport` → `/case-studies/<slug>/`). **Article frontmatter drives the list cards:** `title · description ·
> caseStatus` (display badge — NOT the reserved `status`) `· order` (curated, living-first) `· client ·
> services · tech · image`. The list template loops `articles` sorted by `order`; pagination via
> `page_size` if the set grows.

### `white-papers` — `/white-papers/*`
Launch set (2–3, quality-first; outlines until written):
1. "How gamification enhances motivation in the enterprise" — ties to **Engage**.
2. "The consumer journey in systems development."
3. "The real cost drivers of custom software" — ties to the **Estimator**.

### `insights` — `/insights/*`
Blog / SEO engine. **List/article (DONE 2026-06-29):** list page `_ia/insights.md` + 4 seed-post stubs
in `_ia/insights/` (`uexl-zero-alloc · dogfood-first · we-author-standards · cost-drivers-custom-software`),
all `postStatus: "Coming"` (placeholders — posts written later, never shown as published). Frontmatter
drives the cards: `title · description · postStatus` (badge — NOT the reserved `status`) `· order · date
· image`.

---

## 4. Show / Hold summary (honest, status-driven)
- ✅ **Show, full confidence:** Processious (in production), published Labs (signals, vault,
  gotime, IO), UExL (publish-ready), Taj Mahal SSG (powers this site), all services, About,
  the Keystone Method.
- 🟡 **Show, honestly labeled / modest:** Ordin (in dev), Documentor (early-stage + AI proof),
  Tallery (framework, via DAM service), Booster (internal/dogfood), research standards
  (NITES/FUSE/AddressQL = Research), pre-publish Labs (teaser until live).
- ⛔ **Hold:** Growthicious (planning), Taj Mahal Spaces (future), the LnB venture (confidential).

---

## 5. Cross-cutting (every relevant page)
- Honest status vocabulary: **Published · Beta · Shipping soon · Research · Internal · In
  production · In development · Early-stage · Planning.** One per item.
- "Built with Taj Mahal" footer badge (passive distribution). Newsletter signup. ISO badges
  (verify currency). Apply RECONCILIATION fixes (one canonical name/license/version per project).
- Voice register = the **Love-and-Beyond honesty tone** (mark estimates, no unbacked superlatives).

---

## 6. Homepage outline (`/`) — REBUILT on the Presentation Doctrine (matches `home.md`)
> ⚠️ **SUPERSEDED:** the earlier depth-first outline (H1 *"Most companies use technology. We make
> it."* + a numbers proof-strip) is retired — that hero is now the **CLOSER**, not the opener. The
> live structure is in `home.md` (skeptic-lens rebuild: lead with their safety, depth as closer).
> Summary:
1. **Hero** — their outcome + buyer-respected trust: *"The software your business runs on —
   engineered right, and built to last."* Sub: senior team; founder ex-**JP Morgan**; ISO process;
   mainstream tech; **no lock-in**; honest estimate. (NO price claim.) CTA: **Estimate Your Project →**.
2. **Is this you?** — problem-first; the customer sees themselves in 5 sec; "SMEs welcome."
3. **Proof we deliver** — client case studies (Chemo on Processious · RTL 15-yr · a real-estate
   developer), the #1 trust currency, moved up.
4. **Why it's safe** — de-risk: senior-only · no lock-in · right-sized · ISO process ·
   quality-before-handoff · straight talk.
5. **The people behind it** — JP-Morgan-led founder (MD & Engineering Head) + Oomera (Operations) +
   senior network + documented process (the bus-factor answer).
6. **And we go deeper than most (the CLOSER)** — *"we don't just use technology — we make it"* → the
   rigor your project inherits; benefit + no-lock-in + verifiable (IO playground, UExL benchmark, GitHub).
7. **Closing CTA:** Estimate Your Project → · Talk to a human.
> (The old standalone "proof strip of numbers" is folded into §3/§5 — lead with client proof + the
> founder, not a stats bar. signals ~325★ is never headlined.)

---

## 7. Defaults applied + the few flagged for Aamir
**Defaulted (honesty-safe; override by reacting to the draft):** page shapes/URLs, nav, status
labels, show/hold, section ordering, homepage structure, which playgrounds to gate.
**Genuinely wants Aamir (batch later — gate LAUNCH, not BUILD):**
- Positioning emphasis (depth vs value) — defaulted depth-led; confirm.
- 2 real case studies (intake), real numbers for the proof strip, brand assets, team/founder
  framing, testimonials.
- Confirm publicly-linkable repos/playgrounds (UExL/IO live links), license per project.
- Documentor fundraise publicity level; confirm Sales Navigator (anonymized) usage.

> **Next step (per build-site.md):** confirm this module map → mine `_inbox/` brand assets →
> convert the Infolio theme to the page shapes above → generate content from dossiers → build &
> verify. Theme conversion targets: home, general-page, service-detail, `products`/`labs`/
> `case-studies`/`white-papers`/`insights` list + `-article`, `standards` hub, `estimate`, 404.
