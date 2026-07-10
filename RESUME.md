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
- Project root: `E:\Projects\maniartech.com\maniartech-v2`
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

### 1. Move the code into a "real" repository (Aamir's task)
Current git state: local repo on branch **`master`**, single branch, **no remote**. Latest commit `b64bac4`.
- `.gitignore` already excludes `build/`, `.cache/`, and `*.zip` (there's a 51 MB `_external-themes.zip` = Infolio source dump — gitignored; decide whether to keep it around locally or discard).
- **To publish:** `git remote add origin <url>` then `git push -u origin master` (GitHub private repo recommended). Or relocate the folder first.
- ⚠️ **If the code moves to a NEW path**, the auto-loaded memory (keyed by the old path
  `E--Projects-maniartech-com-maniartech-v2`) will **not** follow. That's exactly why this RESUME.md +
  the root `CLAUDE.md` are committed in-repo — they're the durable, path-independent anchor. A fresh
  session at the new location should read **RESUME.md → CLAUDE.md → `_ia/FOUNDRY-IA.md`** before anything.

### 2. Pending content — the Team section placeholders (flagged, waiting on Aamir)
On the About page team roster (`site/about/team.md` + `about.html`), three bits are placeholder/invented and must be made real before launch:
- **Oomera Maniar's real title/remit** (currently "Operations · keeps the process honest" — the tail is invented).
- **The real specialist domains** (currently illustrative: Security · Data & ML · Cloud/DevOps · Frontend · Mobile · QA).
- **The third stat** (currently "+1 · only when the work justifies it" — cryptic; wants a real fact).

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
