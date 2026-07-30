# ▶ RESUME HERE — maniartech.com v2

**Read this first in any new session.** This file is the single resume anchor and is
committed to the repo, so it travels even if the code moves to a new location.
(Deeper strategy/voice canon: `_ia/FOUNDRY-IA.md`, `_ia/BUILD-STATUS.md`, `_inbox/PROJECT-CANON.md`,
`_inbox/PRESENTATION-DOCTRINE.md`, and the auto-loaded memory files.)

Last updated: **2026-07-10**.

---

## What this is
A multi-page, SEO-first static rebuild of **maniartech.com** using the **Taj Mahal SSG**
(Go static-site generator; modules + YAML config + Pongo2 templates). Solo project, founder = **Aamir Maniar**.
- Project root: `E:\Projects\maniartech.com\maniartech` (published to GitHub — see below)
- Theme: `themes/maniartech/` (dark **#1a1a1a** + mint **#14cf93** — NOT the brand-guide navy/gold; keep dark+mint).
- Content: `site/`, `labs/`, `insights/`, `white-papers/` modules. IA/decisions in `_ia/`; raw dossiers in `_inbox/`; collateral in `_marketing/`.
- Separate repo that merges later: the Price Estimator at `E:\Projects\maniartech.com\price-estimator` (not part of this repo).

**We build this with the `tajmahal-ssg` skill** — invoke it (Skill tool → `tajmahal-ssg`) before any Taj Mahal
work (templates, `module.yaml`, theme, content, converting an external theme, troubleshooting). It carries the
framework knowledge and the gotchas below; don't reverse-engineer the framework from scratch.

## Objectives of the website
The core problem, in Aamir's words: *"we were never able to present ourselves."* A substance-rich, senior
engineering shop that is near-invisible. This site exists to fix that:
1. **Make ManiarTech visible & credible** — SEO-first multi-page site; the founder's voice when the words won't come (he approves, doesn't perform).
2. **Close the offshore trust gap** (India shop → US/EU buyers) through *radical verifiability* — every big claim one click from proof (JP Morgan pedigree, ISO, live playgrounds, public repos, case studies).
3. **Convert prospects** — primary CTA = **"Estimate a project"** (`/estimate/`); lead the buyer to a low-risk first step.
4. **Present per the Presentation Doctrine** (`_inbox/PRESENTATION-DOCTRINE.md`): *their safety first, our brilliance last, every claim verifiable.* Order = their problem → proof we deliver → why it's safe → JP Morgan credibility → **depth (the Foundry) as the CLOSER, never the opener** (depth-first poisons a cold buyer; it's fine for dev/recruiting audiences).
5. **Showcase the maker identity honestly** — the Foundry (authored standards/languages/libraries) is the proof of "we make technology, not just use it," but framed as a *supporting closer* so it doesn't read as risky/one-person/lock-in to pragmatic buyers.

Mantra: **"Their safety first. Our brilliance last. Every claim verifiable."**

## How to run
`tajmahal start` → serves on **port 8085** (config in `.claude/launch.json`).
If it panics / 500s on content: **stop tajmahal, `rm -rf .cache`, restart** (cache is sticky; a bad
`module.yaml` can leave a corrupt table). **Routing / `module.yaml` changes are startup-only — restart to pick them up.**

---

## ▶ IMMEDIATE NEXT (why this session was archived)

### 1. Move the code into a "real" repository — ✅ DONE (2026-07-10)
The code now lives at `E:\Projects\maniartech.com\maniartech`, on branch **`v2`**, pushed to
**`origin/v2`** at `git@github.com:maniartech/maniartech.git`. The entire v2 build was squashed into a
single migration commit **`02e34c5 "V2 Migration"`** (the granular history `b64bac4`…`cb96e98` recorded
below is pre-migration and no longer in this tree's log). `.gitignore` excludes `build/`, `.cache/`, `*.zip`
(the 51 MB `_external-themes.zip` Infolio dump stays local, gitignored).
- ⚠️ **Path/memory note:** the migration changed the project path, so auto-loaded memory keyed by the old
  path (`…-maniartech-v2`) did NOT follow. This committed RESUME.md + root `CLAUDE.md` are the durable
  anchor — a fresh session should read **RESUME.md → CLAUDE.md → `_ia/FOUNDRY-IA.md`** before anything.

### NEW (2026-07-11): Service-pages + trust-pages rebuild IN PROGRESS
Full plan + decisions: **`_inbox/app-se-page-redesign.md`**. Application SE page rebuilt as the prototype
(content-directory + real template, SEO title-tag split, JSON-LD, proof strip, FAQ, engagement models).
A multi-agent workflow drafted the other pages on the same system: enterprise-software-engineering, ai,
modernization, + NEW `/how-we-work/` and `/security/` (routes added to site/module.yaml -> RESTART the
server to pick up). Signals-inline/substance-dedicated trust architecture (no repeated founder/ISO
sections on service pages). P2 = per-page visuals (blueprint hero, diptych, cross-section) pending
metaphor alignment with Aamir. LinkedIn profile overhaul also completed this date
(`_marketing/linkedin/profile-and-strategy.md` - paste-ready).

**2026-07-23:** SEO strategy dossier at `_inbox/SEO-PLAN.md` (keyword tiers, outbound program,
honest ranking expectations). **Post-launch execution system at `_marketing/growth/`** - calendar
(W0-M9, go-live assumed Mon 2026-07-27), sole-founder weekly routine, AI social pipeline, launch
playbooks, listings/citations, metrics + CAPA, and `scripts/site-health.mjs` (verified working).
Growth program starts the week the site goes live.

**2026-07-30 (overnight build, UNCOMMITTED - Aamir to review):** Full non-home/about surface
rebuilt + all planned content written. (1) **3 white papers now REAL** (gamification / consumer
journey / cost drivers; every citation fetched+verified live; noindex removed; "Research" nav
dropdown added - the canon nav gate is satisfied). (2) **13 insights posts**: 4 new (LIMS cost,
real-estate presales, choosing a partner, in-house vs outsourced) + 6 upgraded (incl. a stale
UExL benchmark corrected against the live README). (3) **Case studies v2**: "case file" chapter
system (content-directory: index/build/decisions/outcome + outcomes[] stat strips + verbatim
quotes); Touchpoint role corrected everywhere (senior dev -> offshore partner, acquisition 2015
per Business Wire); Sales Navigator now LIVE + client named (Shantee Homes - per Aamir's ISO
usage; confirm). (4) **Estimate = "the specimen"** (sticky illustrative reply pane - labeled
Illustrative; Aamir to approve concept). (5) Contact = three doors; page.html editorial; insights/
white-papers list+article templates rebuilt (no uniform card grids). (6) **Service hero visuals
(P2)**: blueprint draw-once / systems-join-frame / noise-settles-to-signal / parts-swap-line-holds
- one-shot CSS SVG, whole at rest, reduced-motion safe. Verified: all routes 200, JSON-LD valid
(FAQPage forloop caps), site-health 75 pass / 1 fail (sitemap.xml - Aamir owns), zero console
errors, ASCII + no-body-`---` sweep clean. Committed as `b70f051` on Aamir's instruction (not pushed).
Foundry/labs/products detail pages intentionally untouched (recently built + Aamir-iterated).

**2026-07-30 (part 2, same session):** (a) **Modules now mirror the IA** (Aamir's call): one module
per top-level menu item - `services` / `work` / `foundry` (renamed labs) / `research` (insights +
white-papers merged, two collections) + `site` (home/about/standalone). ALL URLs unchanged, every
route verified 200 (`735cb52`). (b) **Visual enrichment**: real screenshots wired into case studies
from `_inbox/reference-images/` (RTL 2011 grid, Touchpoint demo journey map, Sales Navigator
estimate + portfolio - all sensitivity-checked; UpSport skipped, its shots contain copyrighted
media; Chemo awaits Aamir's clean capture and got an SVG journey rail instead); IO playground shot
(browser chrome cropped) into the IO post; SVG figures/charts authored inline: Cone of Uncertainty
(cost paper), decision-framework flow (gamification), journey-vs-seams diagram (journey paper),
strangler-fig 3-stage, LIMS lifecycle rail, UExL benchmark bars; papers' TL;DR moved to frontmatter
and rendered as the styled paper-tldr panel; NEW canvas piece `lib/case-viz/case-viz.js` (R-seam,
WebDoodling-ready, synchronous first draw, reduced-motion safe) - "600 forms -> 1" consolidation
on the RTL case via frontmatter `viz:` hook (extensible per-case).

**2026-07-30 (part 3 - "explain the concepts" pass, after Aamir's "still boring" verdict):**
Every foundry/products page now TEACHES its thing: real code panes (lang-diff/lang-pane pattern,
APIs verified against dossiers + fetched READMEs - never invented), one concept SVG per page
(fan-out, pipeline, comparison, workflow), benchmark charts with published numbers only.
Reference implementation of all patterns: `foundry/internet-object/index.md` + the pattern spec
in the session scratchpad (FIGURE-PATTERNS.md - re-derive from the IO page if lost). Indigo got
its before/after compile panes + refusal-gate diagram; UExL its parser->compiler->VM diagram +
bench chart. Services: Keystone Method arch drawn (sides first, keystone last - enterprise page),
strangler-fig 3-stage (modernization), AI triage figure (ai), dedicated-team growth figure
(how-we-work). Work: NLP pipeline (content-engine), estimation flow (sales-navigator), second
canvas piece "upsport-annotate" (ink lands on RUNNING video - case-viz.js is now a piece
registry). Research: decision quadrant (inhouse-vs-outsourced), audit-path (choosing-partner),
driver rail (LIMS cost). Products: five concept diagrams, dossier-calibrated (agent dropped
claims it could not ground - ordin audit-trail, tallery versioning). All 38 routes 200, no
console errors, body-dash + ASCII sweeps clean, site-health 75/1 (sitemap = Aamir's).

### 2. Pending content — the Team section placeholders (STILL OPEN, waiting on Aamir)
`site/about/team.md` prose is now clean/honest, but three invented bits remain in the template
**`themes/maniartech/templates/about.html`** and must be made real before launch:
- **Oomera Maniar's real title/remit** — `about.html:107` currently "Operations · keeps the process honest" (tail invented).
- **The real specialist domains** — `about.html:112–117` currently illustrative chips: Security · Data & ML · Cloud/DevOps · Frontend · Mobile · QA.
- **The third stat** — `about.html:122` currently "+1 · only when the work justifies it" (cryptic; wants a real fact).

---

## Current state — what's done (this session, 2026-07)

**Naming decisions (locked, rationale in `_ia/FOUNDRY-IA.md`):**
- **IQL → AddressQL** — full private rename (site + IA + `_inbox` dossiers; file `_inbox/iql.md` → `addressql.md`).
  Repo `iql_go`, import path, and the "Mastering IQL" book still say `iql` until Aamir renames them at the source.
- **PDML → PressML** — **public alias only**; internal specs/code/dossiers stay **PDML**. Do NOT sweep PDML→PressML internally.

**Foundry** (`/foundry/`) = the maker section (renamed from "Labs"): frosted mega-menu + fullscreen navigator,
`/foundry/` hub, `labs/* → foundry/*` URL migration. Model = **one project per page, facets are TAGS not folders,
maturity = a status badge**. Standards is a footer *doorway*, not a column. Menu column = a project's *lead noun*.

**About page** — a coherent interactive system (four distinct treatments, one language):
- **Hero → a 3×3 speed-cube** rendered in real 3D via Canvas 2D (no WebGL): `themes/maniartech/lib/cube-viz/cube-viz.js`. Loads scrambled, solves itself (solve = the reverse of the scramble), then drag/click-to-scramble. Metaphor: "Complexity, solved."
- **How we work → a spotlight**: one principle at a time, auto-advancing. `themes/maniartech/lib/how-showcase/how-showcase.js` (data from `site/about/work.md` frontmatter `principles`).
- **The team → a roster panel** (named leads + specialist chips + honest stats). Pure HTML/CSS. (← has the placeholders above.)
- **What drives us → a "verify it yourself" terminal** that types real runnable commands: `themes/maniartech/lib/term-proof/term-proof.js`.

**Home page:**
- **Hero gears → a living caption** (`themes/maniartech/lib/js/gear-caption.js`): one line under the gears whose
  last word crossfades through the business systems (sales → billing → operations …). **The gears themselves are untouched.**
  (We tried per-gear hover-naming and reverted it — hovering rotating geometry jitters. Do not reattempt that.)
- **"What we do" → an expanding service stage** (`.svc-stage` in `home.html` + `_mt.scss`): four panels; the open one
  widens and plays a small SVG vignette embodying its metaphor (blueprint draws once / parts swap while running /
  noise → signal / load rises, line holds). Pure CSS state. Panels link to their real service pages.

**Foundry page → the living map** (`themes/maniartech/lib/foundry-viz/foundry-viz.js`): orbiting constellation of everything
authored; the nav category links drive per-category highlighting.

**Recent commits (newest first):**
`b64bac4` gears/caption spacing · `edc1727` living gear caption · `28e421c` revert gear hover ·
`4aa8dd4` home service stage · `83e52e5` big v2 build-out (theme, Foundry, interactive About) · `cb96e98` initial.

---

## Design thinking — the crux from this session (the "why", so it isn't relearned the hard way)
The visual language that emerged over a long section-by-section iteration with Aamir:
- **Metaphor over decoration.** Like the theme's gears, a hero visual should *embody* the message, not garnish it — the cube = "complexity, solved"; the terminal = "verify it yourself." Anonymous/abstract art reads as meaningless ("what is this?").
- **Align on the metaphor BEFORE building.** Every miss this session came from building blind; the win (the cube) came only after agreeing the concept first. Discuss → confirm → build.
- **Canvas for visuals, HTML/SVG for words.** Never render paragraphs or names in canvas (blurry, unselectable); text stays crisp HTML/SVG *beside* the canvas.
- **Show, don't poster.** Content must be real and visible **at rest** — not empty boxes/dots that only mean something on hover. The About "How we work" heading says it: *"standards in the work, not on a poster."*
- **Vary the treatments.** Aamir hates uniform box grids and repetition — each section gets a distinct language (cube 3D · spotlight · roster · terminal · service-stage vignettes · Foundry map).
- **No interaction on moving geometry.** Per-gear hover-naming jittered (teeth/holes sweep under a still cursor → enter/leave loops) and was reverted — meaning must not require pointing at rotating parts.
- **Naming method.** Collision-check every candidate; the web/URL-query acronym space is exhausted (why IQL→AddressQL, riding the GraphQL `<Word>QL` pattern); prefer distinctive/coined names or that credible pattern; never fabricate proof — flag placeholders instead.

**Failed approaches already tried & rejected — do NOT reattempt:** About-page rising-line **timeline** (growth-chart cliché); empty numbered **assembly slabs** & anonymous **dot minimaps** (meaningless at rest); flat **icon-card grid** (boring/poster); **per-gear hover** naming (jitter). The keepers were: cube, spotlight, roster panel, terminal, service-stage vignettes, gear caption, Foundry map.

## Hard rules (do not violate)
- **Brand = dark + mint (#1a1a1a / #14cf93). NOT navy/gold.** The brand guide says indigo-navy + champagne-gold; the *site* deliberately keeps dark+mint. Keep it.
- **Governing Rule #1 — never exaggerate.** Every claim TRUE, SOURCED, CALIBRATED. Honest status labels. No fabricated proof/metrics/quotes. This is the moat.
- **Understated maker-tone** (brand guide §4): plain statements, quiet confidence, no "Yes — we build X!" bragging.
- **CSS: never `!important`.** `_mt.scss` is imported last; win via specificity. Fluid `clamp()` tokens; media queries for layout only.
- **Canvas visuals: WebDoodling-ready.** All drawing goes through a small `R` renderer seam so it can port to WebDoodling (Aamir's own lib) later — the dogfooding story.

## Gotchas
- **Taj Mahal:** list-page `content:` must be a bare collection name (`posts`, not `./posts/`) or the server panics; a `---` thematic break in a markdown *body* breaks frontmatter parsing (404); `module.yaml`/routing changes need a restart; `rm -rf .cache` to clear a stuck cache.
- **Canvas + this preview environment:** the harness preview tab often runs *hidden*, which pauses `requestAnimationFrame` (canvas looks blank) and makes `preview_screenshot` time out (the theme's GSAP/gear loops keep the compositor busy). Every canvas widget therefore does a **synchronous first draw at boot** so it's never blank; verify via DOM/pixel probes, not screenshots. Not a bug — an environment quirk.
- **Classifier outages:** the safety classifier intermittently goes "temporarily unavailable," blocking Bash/preview/Agent tools for a bit (Read/Grep/Glob/Edit/Write still work). Retry after a moment.

## Working style (Aamir)
Wants frank critique, not a yes-man. Iterates hard on visuals section-by-section ("boring", "pathetic",
"not presented best") — the pattern that works: **align on the metaphor first, then build; keep content
real and visible (not empty/abstract); vary layouts (he hates uniform box grids).** Commit only when he asks;
no `Co-Authored-By` trailers (his global rule).
