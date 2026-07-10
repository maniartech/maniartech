# Case Studies — LIST PAGE (Taj Mahal list/article module; 2026-06-29)

> ★ This is the **list page** of a Taj Mahal **list/article** module: `case-studies: /case-studies/*`
> → this list page + an inferred **article page** per study. Per the skill (Ch. 9), the list page
> renders an `articles` collection — **each card is generated from the article's frontmatter**
> (`title`, `caseStatus` badge, `description`, `url`), ordered by `order`. So the cards in §2 are NOT
> hand-authored copy; they mirror what the template emits from the six article files
> (`_ia/case-study-*.md`). **To change a card, edit that study's frontmatter.** Doctrine: client proof
> is the #1 trust currency; order = living/verifiable first.

---

## 1 · LIST-PAGE INTRO  *(static content above the auto-rendered list)*

# What we've built for clients — told straight.

No invented numbers. No logos we can't stand behind. A few real engagements — what the client faced,
what we built, and where it stands today. Where you can check it yourself, we link it.

**[ Get a free project estimate → ]**   ·   [ Talk to a human ]

---

## 2 · THE LIST  *(auto-rendered from each article's frontmatter, sorted by `order`)*

`[Each item = one card the list template emits per article: caseStatus badge · title · description ·
"Read the full case →" → /case-studies/<slug>/. Mirror of the six article files; do not hand-edit here.]`

**`[ In production ]`  Chemo Test Laboratory — a LIMS in production on Processious**
A laboratory information management system live in production on our own Processious platform —
verifiable on the lab's live site.  → `/case-studies/chemo/`

**`[ Delivered; long-running ]`  Reliable Analytical Laboratories: 600 forms became one**
We replaced a 600-form legacy system with a single workflow screen — still running, by the lab's
account, ~15 years on.  → `/case-studies/rtl/`

**`[ In progress (live 2026) ]`  An entire real-estate presales platform, end to end**
An end-to-end real-estate presales platform — showcase, floor plans, an estimation-and-payment-plan
engine, and a DAM — going live in 2026.  → `/case-studies/sales-navigator/`

**`[ Delivered (2012–2018) ]`  Touchpoint Dashboard**
Principal-architect engineering on a pioneering customer-journey platform used by Fortune 500 teams;
referenced in O'Reilly's *Mapping Experiences*.  → `/case-studies/touchpoint/`

**`[ Delivered (2010–2011) ]`  Content Engine — Euclid Infotech**
Production natural-language paraphrasing with context-aware word-sense disambiguation — applied NLP a
decade before the AI wave.  → `/case-studies/content-engine/`

**`[ Delivered (engineering); venture closed ]`  Frontier engineering, told honestly**
An in-browser video-review studio (draw live on running video) on WebRTC and our own WebDoodling —
shared honestly: the engineering shipped; the venture didn't.  → `/case-studies/upsport/`

---

## 3 · CTA
### See how we'd approach yours.
**[ Get a free project estimate → ]**   ·   [ Talk to a human ]

---

`[note] LIST/ARTICLE WIRING (tajmahal-ssg Ch. 9): at site generation, module `case-studies` declares
`case-studies: /case-studies/*`. The six `_ia/case-study-*.md` drafts become the article content,
placed in the `case-studies/` content dir under clean slugs (`chemo.md`, `rtl.md`,
`sales-navigator.md`, `touchpoint.md`, `content-engine.md`, `upsport.md` → `/case-studies/<slug>/`).
Article frontmatter drives the cards: `title · description · caseStatus` (display badge — NOT the
reserved `status`) `· order` (curated, living-first) `· client · services · tech · image`. The list
template loops `articles` sorted by `order`; pagination via `page_size` if the set grows. Honest
framing per study lives in each article's own [note] + _inbox/case-study-proof-snippets.md.]`
