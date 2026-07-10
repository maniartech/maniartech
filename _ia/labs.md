# Labs — LIST PAGE (Taj Mahal list/article module; 2026-06-29)

> ★ List page of a list/article module: `labs: /labs/*` → this list page + an article per project,
> grouped by `category`. Cards auto-render from each article's frontmatter (`title · labStatus badge ·
> description · url`), ordered by `order` within category. AUDIENCE = technical evaluators / peers /
> recruits — they clicked "Labs," so depth-first is OK — but the cold-panel discipline binds:
> **proof-first, honest status on every item, "standards we've authored" (never "industry standards"),
> everything verifiable, link-dark where unpublished.**
> **STATE 2026-06-29:** 7 flagship articles built (✅-linked below); 10 remaining = "detail coming"
> (pass 2). Link-dark verified: Indigo has zero links, UExL's playground is non-clickable, Taj Mahal
> carries no repo link, signals' star count is never headlined.

---

## 1 · HERO

# We don't just use technology. We make it.

Most software firms assemble tools. Over the years we've built our own — open-source libraries, a
data format, an expression engine, even a programming language (in development). Some is published and
adopted; some is still in the lab. **All of it is open to read, run, and verify** — we'd rather show
you than tell you.

> Honest labels on everything below: what's **published and in use**, what's in **beta / publish-ready**,
> and what's still **research / internal**. We won't dress up an experiment as a finished product.

---

## 2 · THE CATALOG  *(grouped by `category`; cards auto-render from article frontmatter, proof-first)*

`[Each ✅-linked item = a built detail article (/labs/<slug>/) the list template renders as a card
(labStatus badge + title + description, sorted by order). Items marked *(detail coming)* are in the
catalog but their article is pass-2 — status label shown, no detail link yet. signals' star count is
never headlined; links are dark where the work isn't public.]`

### Standards & Languages
- **`[ Research / in development ]` ⭐ Indigo** — a Go superset that compiles to clean, idiomatic Go you read in the diff; *"no output is better than wrong output."*  → `/labs/indigo/`
- **`[ Published ]` Internet Object** — a compact, schema-first data format; >40% smaller than minified JSON, ~30% fewer LLM tokens, runnable in the live playground.  → `/labs/internet-object/`
- **`[ Publish-ready · pre-1.0 ]` UExL** — an embeddable expression engine; the only one of cel-go/expr/UExL with **zero allocations** on the boolean & string paths.  → `/labs/uexl/`
- **`[ Research / draft spec ]` NITES** — a human-readable date/time format spec (GoTime is its reference impl).  *(detail coming)*
- **`[ Research / design phase ]` FUSE** — a real-time API protocol spec ("don't just REST").  *(detail coming)*
- **`[ Research; proven internally ]` AddressQL** — a URL-native query language.  *(detail coming)*

### Open Source Libraries
- **`[ Published ]` signals** — a context-aware, type-safe Go event/signals library, used in production.  → `/labs/signals/`
- **`[ Published ]` gotime** — intuitive Go date/time (100% test coverage); the reference impl of NITES.  → `/labs/gotime/`
- **`[ Published ]` vault-storage** — a ~1.5KB TypeScript library giving browser storage IndexedDB power.  → `/labs/vault-storage/`
- **`[ Research / foundation ]` xlib** — Excel-compatible functions for Go (the compute layer under UExL).  *(detail coming)*

### Developer Tools
- **`[ Internal · OSS planned ]` Booster** — a dev-environment orchestrator; we run our own products on it.  *(detail coming)*
- **`[ Internal · OSS later ]` gowork** — friendlier Go multi-module workspace management.  *(detail coming)*
- **`[ Internal · OSS later ]` gocurl** — run a curl command directly as Go HTTP code.  *(detail coming)*
- **`[ In development ]` Orchestrator** — in-process Go goroutine/task orchestration (a library — *not* Ordin, the workflow product).  *(detail coming)*

### Frameworks & Platforms
- **`[ Internal · OSS planned ]` Taj Mahal SSG** — the Go static-site framework that powers this very site and live client sites.  → `/labs/tajmahal-ssg/`
- **`[ Internal · OSS planned ]` MDKit** — a markdown toolkit ecosystem.  *(detail coming)*
- **`[ In development ]` WebDoodling** — a creative-coding / canvas framework.  *(detail coming)*
- **`[ Partially published; overhaul in progress ]` Printeer** — web-page → PDF/PNG rendering.  *(detail coming)*

---

## 3 · WHY SO MUCH, AND SO MUCH STILL PRE-1.0?  *(reframe the breadth honestly)*

Because we build the way some people practice an instrument — constantly, patiently, for the craft. A
standard or a tool advances only when the research yields a real answer; we don't force it, and we
don't fake "done." That's why the work runs deep, and why we label honestly what's finished and what
isn't. **It's also how a small team comes to author this much** — and the rigor behind it is exactly
what your project inherits.

`[Turns the cold-panel "17 unfinished projects = scattered" risk into the patient-maker story + honest
labels. Organized, proof-first, labeled — not a wall.]`

---

## 4 · CTA

### This is the depth we bring to client work.

**[ See our services → ]**   ·   [ Browse the repositories → ]   ·   [ Estimate your project → ]

`[Bridges Labs (capability) → services/delivery. "Browse the repositories" links the GitHub org (the
verifiability the cold panel rewarded) — verify the org URL before publish.]`

---

`[note] LIST/ARTICLE WIRING (tajmahal-ssg Ch. 9): module `labs` = `labs: /labs/*` → this list page +
articles in `_ia/labs/`. **Built (pass 1, flagship 7):** indigo · internet-object · uexl · signals ·
gotime · vault-storage · tajmahal-ssg. **Queued (pass 2, 10):** nites · fuse · iql · xlib · gowork ·
gocurl · orchestrator · mdkit · webdoodling · printeer. Article frontmatter drives the cards:
`title · description · labStatus` (badge — NOT the reserved `status`) `· order · category · license ·
repo` (empty unless public) `· playground` (empty unless live) `· image`. The list template groups by
`category` and sorts by `order`. ★ LINK-DARK VERIFIED (2026-06-29): Indigo zero links; UExL repo-only
(playground = non-clickable "launching soon"); Taj Mahal no repo link (only the Chemo client link); IO
playground + repo live (allowed); signals/gotime/vault repos linked (published); signals ★ not
headlined. Pass-2 articles will follow the same rules.]`
