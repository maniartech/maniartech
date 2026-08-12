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

**2026-07-30 (part 4 - link fixes + SEO gate):** Aamir's review caught menu links that "worked"
(HTTP 200) but betrayed their labels - gocurl/gowork cards and menu items anchor-linked because no
pages existed (REAL pages built from dossiers, module.yaml + shims added - routes are
startup-only); AddressQL/PressML pointed at a languages page that lacked them (sections added,
deep-anchored); 5 dead mobile anchors restored; ordin's wrong Processious path fixed. New
verification standard: recursive crawl (every link 200 + every #anchor resolves) PLUS
label-vs-destination audit (4,822 labeled links). **NEW `scripts/seo/`** (seo-check.mjs + README):
crawling SEO gate - first run found 10 FAIL / 122 WARN, now 0 FAIL / 7 documented-advisory.
base.html gained `titleTag:` / `seoDescription:` frontmatter overrides (snippet layer only; H1s
keep editorial voice) - ~50 pages got crafted snippet text. GOTCHA recorded: NEW frontmatter keys
need server restart + rm -rf .cache (body edits hot-reload; frontmatter does not).

**2026-08-01 (part 5 - the HUB pass, after Aamir: "the navigator pages ... show their contents as
list and that too in boring style"):** He was right, and it was measurable: with nav/footer stripped,
`/services/` `/case-studies/` `/white-papers/` `/insights/` each had **0 images, 0 canvas, 0 SVG, 0
code**. Every enrichment pass had landed on leaf pages; the hubs the top nav points at were directory
listings wearing a hero, and all six shared one shape (hero -> card grid -> CTA).

Aamir's brief for the fix: hubs **summarize** (short, push down fast - visuals carry the load, not more
words); **canvas** for concepts, mini-apps under `themes/maniartech/lib/` welcome, other media allowed
where it explains better; a **bespoke hero per hub**; home + about explicitly OUT of scope, still frozen.

- **NEW mini-app `lib/hub-viz/hub-viz.js`** - same doctrine as case-viz (R renderer seam, synchronous
  first draw, play once and rest WHOLE, reduced-motion jumps to the final frame, interaction only after
  the geometry stops). Unlike case-viz it mounts **every** `canvas[data-hub-viz]`, so a page can host a
  hero plus body pieces. Four pieces: `services-lanes` (three lanes feed one system, two capability
  bands crossing all three), `work-timeline` (the REAL 2010->today engagement record to scale, hover a
  bar for its note - narrow canvases stack the label above the bar), `papers-evidence` (sourced claims
  keep their citations; unsourced ones stay visible as hollow dashed bars - "we didn't publish these"),
  `insights-cadence` (filler drifts past, the few worth publishing lift out and stay).
- **/services/** card grid -> spotlight rows, each with a REAL artifact (Chemo screenshot, Sales
  Navigator estimate) + a link to the case that proves it; partnership gets a drawn shared-trunk
  diagram; the two capabilities became panes carrying their service-page hero SVGs.
- **/case-studies/** -> the cabinet: timeline hero + one row per case carrying its strongest artifact
  at rest (4 real screenshots; Content Engine + UpSport get drawn artifacts, they have none).
- **/foundry/** -> the workshop: every shelf opens with a SPECIMEN of what it holds (Indigo before/after,
  Internet Object vs JSON, a signals snippet, a Booster terminal, and for Products the two public URLs).
  Specimens are copied from the detail pages so the hub cannot drift from what it summarises.
- **/white-papers/** -> each paper leads with the figure that carries its argument, drawn from its own
  TL;DR. **/insights/** -> the four topic lanes were dead text; they now name a real grouping and point
  at the piece to start with (hand-curated - there is no tag taxonomy; do NOT add counts, they drift).

**Two real bugs found and fixed during this pass (both were live):**
1. **`categories` is a RESERVED frontmatter key in Taj Mahal** - it is coerced to `[]string`, so a list
   of MAPS under it parses to an empty slice and the loop renders NOTHING, with no error anywhere. The
   three service cards had therefore been **missing from the live `/services/` page**. Key renamed to
   `serviceLines`. Never name a frontmatter list of maps `categories` (or `tags`).
2. **Foundry mobile overflowed 83px** - grid items default to `min-width:auto`, so the long `signals`
   code line widened its track and pushed the page sideways. Fixed with `min-width:0` on `.shelf-spec`
   (the `pre` keeps its own `overflow-x`).

**Verification (all re-run after the pass):** 56 pages crawled, **seo-check 0 FAIL / 7 documented
advisory**; site-health 75 pass / 1 fail (sitemap.xml, Aamir's); every new link target 200; zero console
errors; **0 horizontal overflow at 390px on all five hubs**. Visual review was done with real
screenshots via headless Chrome (`--headless --screenshot`, and `--force-prefers-reduced-motion` to
capture the resting frame) - note headless enforces a MINIMUM window width, so a `--window-size=390`
capture is cropped desktop layout, not mobile; measure mobile in the browser pane instead.
**UNCOMMITTED - Aamir to review.**

**2026-08-01 (part 6 - the /insights/ hero saga, ended well):** After the hub pass Aamir
rejected the insights hero visual repeatedly; the final page is commits `eba16ba..8303cb1`.
The arc, so the lessons stick: (1) eight illustrative concepts (canvas metaphors, 3D, CSS-3D)
all failed for one reason - they argued a metaphor ABOUT the archive instead of showing it;
(2) a reference design Aamir sent taught the fix - the hero can be a CONTROL, not a picture;
(3) that shelf then proved unmaintainable (labels in 4 places, hardcoded counts, a 149-line
layout engine) -> rebuilt config-driven: threads live ONCE in tajmahal.yaml `context.threads`,
counts derived at runtime, CSS grid instead of JS layout, and seo-check gained /insights/
integrity FAILs (unknown/missing thread, count drift, pagination, heroProof without note);
(4) the shelf was still a lower-fidelity duplicate of the index below it -> replaced with the
proof strip: the archive's four strongest checkable numbers from `heroProof:` frontmatter,
each linking to its post; (5) the cadence promise ("once or twice a month") cut per Governing
Rule #1 - replaced by a standard + an invitation to correct us; (6) hero now owns 100svh
(navbar is absolute/73px, so svh IS full height), BANDS not columns - statement centred in the
space above the strip (measured 105px air above = below), proof as four equal cells with
dividers BETWEEN them so no rule can cross empty space; (7) final review measured alpha-blended
WCAG contrast and fixed six failing styles (2.9-3.8:1 -> 5.2-6.2:1). Every claim on the hero
traces to a post; the gate proves it stays that way.

**2026-08-05 (part 7 - full-view heroes rolled onward, thumb rules codified):** `3b3cf75`.
The insights lessons became the **8 page-design thumb rules in CLAUDE.md** (100svh hero /
bands not columns / measured air / design for the content type / hero shows what the page
cannot / data lives once / alpha-blended AA floor / no future promises), and a shared
`.view-hero`/`.vh-*` frame in `_mt.scss`. Applied per content type: /white-papers/ strip =
each paper's METHOD in its own words (`method`/`methodNote` frontmatter); /standards/ went
from a bare page.html shim to a registry-board hero (`registry:` frontmatter, six rows,
mint = something public to open); /foundry/languages/ strip = four one-line SPECIMENS
(real syntax only - PressML's cell says "syntax unpublished" because showing unreadable
code would lie). Work/Foundry/Services hubs still have the older two-column heroes.

**2026-08-05 (part 8 - the ARTICLE pages, "people will often come here"):** Aamir: article
pages were plain (bare title + prose + dead right half); wanted a beautiful working sidebar,
real header, and support for images/diagrams/code in articles. Both article templates
(`insights-article.html`, `white-papers-article.html`) rebuilt on the vh frame:
- **Full-view article hero** - title at article scale (`.ah-h1`), dek, byline, and an
  `.ah-facts` strip: THE THREAD (from `context.threads`) / THE READ (minutes derived from
  `content|striptags|wordcount`, stamped by JS - never typed) / THE RECEIPT (`heroProof` ->
  `keyReceipt` -> receipts). Papers: THE METHOD / THE READ / THE RULE.
- **NEW `lib/article/article.js`** - builds "On this page" from the h2s actually rendered
  (markdown auto-IDs), scrollspy at a 30%-viewport reading line, top reading-progress bar,
  copy-link control, `data-lang` chips stamped from fenced-code classes. Everything derived,
  nothing typed. GOTCHA fixed: `align-items:start` on the grid made the aside as short as
  its content so `position:sticky` had no track - the aside must stretch.
- **Prose furniture** in `_mt.scss`: `.mt-callout` (+`.is-flip` sky variant), `.mt-pull`,
  code-chip styling, `article-cover` (optional `heroImage`/`heroImageAlt`/`heroImageCaption`
  frontmatter -> cover figure + og:image + schema; base.html og:image is now a block).
- **All 13 posts enriched** (Governing Rule #1 - only structures already in the text): new
  SVG diagrams (dogfood release gate, presales journey w/ scope boundary, decisions-vs-
  screens), NITES casing code, LIMS rate arithmetic block, pulls + callouts everywhere;
  vault-storage fences labeled js/bash. Verified: 16 article pages 200, seo-check 0 FAIL,
  no console errors, sticky TOC + scrollspy + progress verified in screenshots, one contrast
  fix (red flags text 4.26 -> 5.7). Screenshot workaround recorded: headless Chrome ignores
  URL fragments when capturing - wrap the target in a local `frame.html` iframe (fragment
  scrolls inside the iframe) and screenshot that.

**2026-08-05 (part 9 - services rewritten, then the IP/lock-in stand cleared):** Two things.

(a) **Services pages were generic** (Aamir: "content is pathetic ... client will in one second
[see] that this company does not know about these jobs"). Diagnosis: posture, not practice -
no domain vocabulary, no named deliverables, phrases recycled verbatim across pages, and the
honesty doctrine curdled into hedging ("as the goal of a method, never a guaranteed outcome"
appeared TWICE on one page). Fixed by writing from the work: /services/enterprise-software-
engineering/ now presents the COMPLETE surface Aamir named - a nine-card catalog (process
automation, enterprise workflows, enterprise integration, analytics & dashboards, document/
report engines, portals, gamification, DAM, access control & audit) plus five full-width deep
dives using the trade's own words (maker-checker, delegation on leave, exception queues, SLA
escalation, idempotent retries, reconciliation, state-derived metrics, asset renditions), with
an enforced-approval-chain figure drawn from the Processious production reality. Application =
domain model first + a written advisory verdict; AI = stated mechanics (grounded answers with
citations that can say "not in your documents", confidence thresholds, human review queue,
evals on the client's own cases); Modernization intro cut from nine sentences to three with the
RTL proof pulled up. Header menu now lists the five enterprise anchors. `865b03f`.

(b) **The code/IP ownership + lock-in stand is GONE from the entire public site** (Aamir: the
honest answer is "it depends on the project type and the deal", so we must never take a public
position). Removed from ~27 places across copy, FAQs, meta descriptions, home/services/products/
languages templates, and three insights posts. Section files renamed `ownership.md` ->
`handover.md` (both `site/how-we-work/` and `services/application-software-engineering/`) so the
concept is out of the codebase too. Replacement framing everywhere is the substance that is true
regardless of terms: mainstream hireable technology, documentation as a deliverable, decisions
written down, handover built in. Blog posts kept their buyer-education value - "Ownership and
lock-in questions" became "Continuity questions" (maintainability, docs, who maintains it in
year three, is knowledge held by one person); in-house-vs-outsourced's "partner lock-in" risk
became "the knowledge sits outside" with the IP/accounts contract advice dropped.
**Enforced by a new FAIL block in `scripts/seo/seo-check.mjs`** (13 banned patterns over rendered
text + meta + JSON-LD; `\b` guards stop "blocking"/"interlocking" false positives) - verified by
deliberately re-adding the claim (3 FAILs) and restoring. Rule recorded in CLAUDE.md
Non-negotiables. **Left alone deliberately, flag for Aamir:** `/partnerships/` still says a
partnership's code and documentation are "protected for you ... continuity is a written term of
the deal" - that is escrow/continuity in a negotiated equity deal, explicitly deal-scoped, not a
blanket ownership promise. Say the word if it should go too.

**2026-08-05 (part 10 - enterprise LOCKED; the other three services raised to its bar):** Aamir
locked /services/enterprise-software-engineering/ as the reference and called the rest still not
publishable. Application/AI/Modernization now carry the enterprise structure - catalog grid
(`offerings.items`/`ways.items` -> `.svc-cap` cards) + full-width deep-dive bands with drawn
mechanics: Application got the eight-card "what we build" catalog + the anatomy-of-an-application
stack figure (six layers under the UI sliver) and full-width build/advise bands (ways.md deleted,
folded into offerings.md); AI got the six-shape catalog + BOTH mechanism flows drawn (grounded
answers w/ citation or "not in your documents"; the confidence gate w/ human review queue and
threshold feedback) - two SVG text collisions caught by zoom screenshot review, fixed; Modernization
got its six-shape catalog + a new data band ("the data comes across - and proves it": mapping,
written cleansing rules, reconciliation that keeps running side-by-side). `3890130`. Also this date:
scrollbar-gutter reserved site-wide (`fd2927c` - svh heroes made the scrollbar arrive late and shove
the page ~15px), and the superseded insights-hero brief committed as a record (`784218a`).
Aamir to review the three raised pages; /partnerships/ untouched (see part 9 flag).

**2026-08-05 (part 11 - proof de-duplicated; partnerships rebuilt):** Aamir's two catches:
(a) the same projects on almost every page read fishy -> content-level dedup (`6f6cd7d`):
enterprise (locked) keeps Chemo+RTL; application's copies of both labs removed (points at
/case-studies/, keeps the UpSport quote); AI's Chemo card AND its FAQ line citing the lab as
AI proof removed (it wasn't AI work) - Content Engine + Documentor remain in two wide cards;
modernization keeps its RTL anchor but loses the Ashish Singh quote that duplicated
enterprise (quote block now conditional). The uniform ~4 mentions/page that remain are the
header MEGA-MENU (navigation, legitimate - checked before "fixing"). (b) /partnerships/ was
still the generic page.html shim -> real template on the vh frame: strip = 6-years-through-
acquisition (Touchpoint) / the returning founder (UpSport) / selective-by-design; record
section = both engagements + the Peter Haid (Strativity CPO) "loyal and trustworthy partner"
quote the site never used; essay updated ("testimonial we don't have yet" contradicted the
quote now above it). Facts/record in frontmatter. Partnership framing stays honest: no
completed equity deal is claimed - the record shows BEHAVIOR inside long engagements.

**2026-08-05 (part 12 - partnership terms made real):** Aamir shared his actual reply to a
partnership inquiry ("Joe"); the page now carries those terms verbatim-in-spirit (`43ba837`):
capital/opex/direct dev costs funded from the partner's side (the page had CLAIMED "we can
bring the network and capital ourselves" - contradiction removed); hybrid cash+equity with a
cash floor covering the technical team's direct cost, remainder as meaningful founder equity
vesting on delivery; PAID DISCOVERY & FEASIBILITY phase before any co-founder commitment; the
five yes-criteria (legal / ethical / genuinely useful / sustainable / serious long-term); and
the full 13-item disclosure list grouped four ways, with due diligence running both ways.
The confidential venture briefing (`_inbox/service-technology-partnership.md` guardrail: the
"Love and Beyond" matrimony-app proposal) remains unnamed - only generalized method on the
page. If Aamir's email register changes, THIS page must follow: it is his voice, not ours.

**2026-08-05 (part 13 - partnerships made OPERABLE):** Aamir: content good, page needs to be
interesting - interactive where it applies. The page IS a filter and a checklist, so those became
working controls (`63bb0dd`, NEW `lib/partner/partner.js` - verdict text lives in markup, JS only
toggles visibility, counts derived from DOM): the "Is this you?" fit check routes honestly BOTH
ways (0-1 ticks -> estimate page; all 4 -> the conversation); the 13-item disclosure list ticks
with derived progress + a copy-as-ASCII button; five-gate strip replaces the criteria wall; safe
section regrouped along the life of the deal. TESTED PROGRAMMATICALLY (Aamir: "test it yourself
and then confirm") - verdicts asserted at every tick count, copy builder spied, refusal path
checked, 0 overflow at 390. Also this date: pushed everything after rebasing over Nomaan's
accidental .sass-cache commit, then untracked + gitignored .sass-cache/ (`7968acb`).

**2026-08-05 (part 14 - partnerships BANDED):** Aamir (with the same annotated screenshot -
NOTE: his port-7000 server predates all of today's partnership files, he has been reviewing a
stale render): page still boring. Root cause was rhythm, not content: one narrow prose river.
Rebuilt on the content-directory pattern (`a5003c3`): site/partnerships/ = index.md (hero
frontmatter + opening) + fit/deal/gates/shown/safe/build/stay/bring/who.md, template renders
ten numbered bands (01 record ... 10 conversation) with alternating bg-soft and a DIFFERENT
treatment per band. NEW: "shown, not claimed" is now three drawn document specimens - an
estimate with [ESTIMATE]/[FACT]/[UNCONFIRMED] marks, the "we will NOT do" list, a risk-register
row - each chipped ILLUSTRATIVE (estimate-page precedent). Safe section = 2x2 grid along the
life of the deal (safe.md `phases:` frontmatter). Widgets survived the move - re-asserted
programmatically. Band anchor ids: #record #fit #deal #gates #shown #structure #builder
#homework #conversation.

**2026-08-11 (part 15 - the INSIGHTS EDITORIAL PROGRAM begins):** Aamir commissioned an external
review of Insights: 6.5/10 - "polished agency content marketing, not the published thinking of an
unusually deep engineering company." Findings accepted as the program: unresolved audience; too
much agency-generic material (ManiarTech appears only in final paragraphs); evidence presentation
promises more than it delivers; honesty REPEATED instead of demonstrated; over-funnelled (3 CTAs
per article); two factual errors. Agreed direction (Aamir + reviewer): a TWO-TRACK technical
publication - Engineering & Architecture / Enterprise Systems & Decisions - all 13 posts publishable
but several need RECONSTRUCTION; 10-point quality gate; explicit evidence labels (Production field
evidence / Reproducible benchmark / Architecture analysis / Experience-based estimate / Research
synthesis / Technical specification / Enterprise decision framework - NO default "every claim
sourced"); LIMS lessons = the flagship benchmark ("generic tools model records; a laboratory runs
on states and transitions" is the earned-insight standard). Editorial rule: "publish engineering
decisions, field evidence and decision frameworks - not commentary about software."

**P0 DONE (`ed1243b`):** both factual errors fixed against the book (ordering: frontmatter `order:`
NOT implemented, filename prefix only, stripped from URLs; manual = nine parts / 32 chapters);
unearned "every claim sourced" receipt default removed. **BUG found while verifying:** all 13 posts
carry dead `order:` frontmatter - the shelf renders in date/insertion order, NOT the intended
editorial sequence. Fix inside P1 via numeric filename prefixes (slugs strip them; URLs unchanged)
since editorial order changes anyway. **P1/P2/P3 in the task list.** DECISIONS AAMIR OWES:
(1) one-business-day reply promise - operationally committed or remove site-wide? (2) bylines:
"Aamir Maniar" on articles like the papers, or team voice? (3) approve the two-entrance hub concept
before any hub redesign (metaphor rule); (4) LIMS flagship needs his "what we tried that didn't
work" material + confidentiality review of sanitized artifacts; (5) reconfirm "more than ten of our
own live websites" in dogfood-first.

**2026-08-11 (part 16 - reviewer corrections applied + all five decisions executed):**
**CORRECTION to part 15's diagnosis (do not canonize the old one):** the shelf was NOT "arbitrary
insertion order" - lists default to a date sort with slug tie-breaker - and prefixes alone would
NOT have fixed it: lists use sort_order only when module.yaml requests it. Empirically verified on
a CLEAN cache (the shared .cache is sticky: renamed files keep old rows - the first probe measured
stale data; test protocol = robocopy the tree to scratchpad, fresh .cache, own port):
`order: sort_order` on the insights list IS honored by this binary (Provisional ch. confirmed);
prefixes populate sort_order and strip from URLs; unprefixed files sort as 0 - so ALL posts must
carry prefixes. DONE (`7a6c97a`): 13 posts renamed 10-...130- in editorial sequence (LIMS flagship
first, generic tail last), dead `order:` frontmatter removed, module.yaml `order: sort_order` +
documented, dogfood sentence now distinguishes doc-trees from lists. **AAMIR: stop 7000, rm -rf
.cache, restart - renamed files have stale cache rows.**
Decisions executed per reviewer directive (`0708eae` + follow-ups): (1) one-business-day SLA
REMOVED site-wide (24 files incl. locked enterprise page - copy-only, layout untouched; papers CTA
too) -> "a senior engineer reviews it and responds"; seo-check FAILs on any response-time promise
until Aamir commits an SLA operationally. (2) Named bylines: template renders author/authorRole,
JSON-LD Person+jobTitle; Aamir Maniar named on the six experience pieces; benchmarks stay
team-voiced until P3. (3) Two-entrance hub APPROVED as concept - current hero RETAINED until the
audience taxonomy has real classified content behind it; prototype entrances beneath the hero
later. (4) LIMS flagship: sanitized abstractions only (role classes, control categories,
non-exploitable threat scenarios); Aamir supplies the underlying truth incl. failures - the agent
must NOT infer missing failures. (5) "10+ live sites" removed (dogfood + foundry/tajmahal-ssg) ->
"multiple live websites, including this one and a client laboratory's public site" until recounted.
Commit messages are immutable once pushed - the corrected diagnosis lives here and in `7a6c97a`.

**2026-08-11 (part 17 - P1 infrastructure SHIPPED, verified clean):** Reviewer verified part 16
("substantially accurate") with two notes, both handled: (a) `_inbox/app-se-page-redesign.md`'s
"SLA CONFIRMED" line explicitly SUPERSEDED (it could have led a future agent to restore the
promise); (b) SLA edits landing inside the ordering commit = history untidiness, acknowledged,
immutable. P1 shipped (`cae10f4`): all 13 posts carry `audience`/`contentType`/`evidenceType`
from the approved sets + artifact pointers (harness/playground/repo/report-checker/live
platform/RTL case) + `authorUrl` on named pieces; article hero receipt cell -> EVIDENCE cell
(label leads, proof is the note, artifact one click); byline links to the verifiable profile;
Person JSON-LD gains url/sameAs; template emits mt-audience/mt-content-type/mt-evidence metas
and seo-check FAILs unlabeled/invented labels (gate proven by deliberate break: 6 FAILs, restored).
**The 7000 server was restarted with .cache cleared per the directive** - the clean pass is
against the REAL server: 56 pages 0 FAIL, editorial order 10->130 live. NEXT: prototype the two
audience entrances BENEATH the insights hero (do not replace it), then P2 - the LIMS flagship
(blocked on Aamir's failure/incident material and confidentiality pass), then P3.

**2026-08-11 (part 17b - audience entrances live):** The reviewer-sequence step 3 shipped: two
doors beneath the untouched insights hero, driving the index as a second filter dimension
(data-audience on rows; counts derived 6 eng / 7 ent; composed live labels; toggle-off returns to
everything; row-level seo-check gate). Index heading corrected ("newest first" was false since the
editorial reorder -> "in reading order - strongest evidence first"). Known UX refinement for later:
an audience+thread combination can be legitimately empty (enterprise x tools today) - the empty
state shows honestly; consider greying impossible combos when the taxonomy settles. NEXT: P2, the
LIMS flagship - BLOCKED on Aamir's failure/incident material + confidentiality pass.

**2026-08-11 (part 18 - P3 begins: from-source article rebuilds, UNCOMMITTED awaiting review):**
The P3 method is now established on two articles: read the actual project repo, verify every claim
and code sample against source, re-measure every number before publishing.
- **UExL (30-uexl-zero-alloc.md):** body rebuilt from `E:\Projects\uexl\uexl-go` (48-byte Value
  struct, 106->62ns four-phase optimization journal + descending-bars SVG, stale-cache contract
  callout, pipes/one-shot boundary section). Internal journal numbers kept strictly separate from
  the public-harness table. Per Aamir: no "competitors" wording (fixed + verified 0 occurrences).
  Two judgment calls put to him: (a) internal 62ns numbers published alongside public table OK?
  (b) stale-cache contract paragraph matches shipped engine behavior?
- **Vault (60-vault-storage-localstorage-alternative.md):** full body rebuilt from
  `E:\Projects\vault\vault` v2.0 source per Aamir's brief ("IndexedDB, Proxies, Plugins and Smart
  Design behind localStorage kind of simple yet robust API"). Design-story structure: Proxy per-key
  pending-queue (race-timeline SVG figure + fire-and-forget trade-off callout), 7-operation
  middleware pipeline (EncryptedVault quoted whole as proof), encryption internals (PBKDF2->AES-GCM,
  coalesced key derivation, per-key credential provider, rich-type tags), expiration as Web Worker
  deadline scheduler (not a poller), honest-edges section (XSS threat model, plaintext export,
  same-tab events, evictable quota). CRITICAL: the old article's code samples used APIs that DO NOT
  EXIST in shipped v2 (`new EncryptedVault('auth',{...})` args reversed, `createExpiration`,
  `vault.setMeta`, README's `vault.on()` - README itself has drifted; code is truth). All new
  samples verified against src; sizes re-measured via the repo's own `npm run size` (core 1.48 KB
  gz - now the heroProof; 355 Karma specs, all passing, in real Chrome). seo-check: 0 FAIL. Headless
  Chrome note: writes now need `--user-data-dir` + absolute `--screenshot` path (access-denied
  otherwise), and section shots go through the frame.html?a=<heading-id> iframe trick.
Both articles sit DIRTY per the standing review-first rule - commit only on Aamir's explicit word.
**Part 18b - external review round applied (same day):** five P1 findings fixed in place:
(1) vault test claim corrected - 355 specs under Karma in real CHROME only (Firefox commented out
in karma.conf; reviewer observed one timing-sensitive performance spec fail, so no "all passing");
(2) vault threat-model bullet now conditions at-rest protection on credential handling (server-
fetched-after-auth protects a stolen device; hardcoded does not); (3) UExL boxing claim scoped to
escape analysis (interface conversion allocates when the value escapes - a VM stack forces it);
(4) zero-alloc "exact and stable" scoped to the Go toolchain, not universal; (5) benchmark method
de-flaked: median of six runs, NO runs discarded (was "discard first run or two" - selective
sampling). Same fixes mirrored into the vault repo README/EVENTS_SYSTEM_TESTS (also uncommitted).

**2026-08-11 (part 19 - the journey-mapping transfer story, NEW article, uncommitted):** Aamir:
"After building Touchpoint Dashboard we gained a good understanding of Customer Journey Mapping
from the marketing perspective, and applied the same concept in software engineering with Chemo
Test Laboratory. This is the story we should add." NEW post
`research/posts/15-journey-mapping-in-software-engineering.md` (prefix 15 = slots between the LIMS
flagship and cost-to-build; verified live as row 2 of the shelf). enterprise / architecture-analysis
/ Production field evidence, thread `process`, Aamir byline.
- **Why a new piece and not a duplicate:** the white paper `20-consumer-journey-systems-development`
  argues the METHOD (literature, diagnostic, procurement advice); `10-lims-software-lessons` covers
  the DOMAIN. Neither tells the transfer itself. This article is the story: what a marketing
  discipline loses and keeps when the traveler is a sample - emotion/persona/channel drop out,
  traveler + steps-in-time + seams + governing-map survive (emotion -> custody/authority, channel
  -> handoff, persona -> traveler incl. non-human). Cross-links to the paper in both directions of
  reading (article -> paper twice); the paper does NOT yet link back (one-line edit, unmade,
  awaiting Aamir).
- Sourced only from committed material: work/touchpoint/*, work/chemo/* (index/build/decisions),
  the paper. Aamir supplied the vendor video - verified via YouTube oEmbed as "What is Touchpoint
  Dashboard?" on the official TPDashboard channel before citing.
- Two-rail translation SVG (customer rail over sample rail, transfer labels between, substitutions
  in a right column). **LESSON: never leave a blank line inside a `<figure>`/`<svg>` block in
  Markdown** - it terminates the raw-HTML block and the indented SVG lines then render as a CODE
  LISTING. Caught by screenshot review, not by any gate; the other articles' SVGs are blank-line
  free, which is why they were fine.
- Verified: seo-check 57 pages / 0 FAIL / 6 warn (the /white-papers/ heading-skip warning cleared
  itself - the fresh cache picked up Aamir's uncommitted white-papers.html edit).
- **Dev server note:** new content files are startup-only, so the server was restarted with a fresh
  cache. `tajmahal.yaml` sets `port: 8080`, so it now serves on **8080**, not the 7000 Aamir had
  running (7000 must have come from a flag or older config). seo-check takes the base URL as argv:
  `node scripts/seo/seo-check.mjs http://localhost:8080`.
- **Video, and the genre call (Aamir asked "is it okayish to embed video in papers?"):** the
  Touchpoint overview video is EMBEDDED in the insights article (`figure.mt-figure.mt-video`,
  `id="tpd-video"`, youtube-nocookie host, `loading="lazy"`, 16:9) and only CITED as a link in the
  white paper - inline where the product is described, plus a line in "Verify it yourself".
  Rationale: papers cite, articles embed. A paper is an evidence document whose register is text +
  traceable sources; dropping a vendor MARKETING video into the middle of an argument that
  deliberately refuses untraceable vendor statistics lowers that register, and adds a third-party
  frame to an otherwise self-contained page. As a citation it is unimpeachable - it is the primary
  artifact for "this product existed and here is what it did". Flipping it back is one edit if he
  disagrees. New style: `.mt-video` in `_mt.scss` (declares its own 16:9 box so prose never
  reflows when the iframe loads).

**2026-08-11 (part 19b - the white paper REPOSITIONED so it stops duplicating the Insight):**
Reviewer's brief: keep both, but split them cleanly - Insight = first-person engineering field
report (what happened, what we learned, Touchpoint->Chemo narrative); paper = enterprise decision
and governance framework (what you should require, document and verify). The old paper repeated
~8 of the Insight's beats.
- **Renamed** (URL unchanged - filename is the slug): "Journey-to-system design: an enterprise
  method for turning operational journeys into architecture, controls and acceptance evidence".
  Avoids the false journeys-vs-data-modelling conflict the old title implied.
- **Rebuilt to 10 sections:** executive decision brief (incl. when it is UNSUITABLE) / the
  enterprise failure being controlled (5 named patterns) / required discovery inputs (8-row table,
  each with the defect its absence causes) / translation into architecture (the core: every journey
  step owes 9 named artifacts - bounded context, state machine, data ownership, event+invariant,
  authorization, audit record, integration boundary, acceptance test, telemetry; new SVG draws it)
  / governance (journey owner, decision rights, milestone cadence, change control on the state
  model, drift signals) / sanitized field evidence (Touchpoint + Chemo + Shantee as a 3-row
  comparison table, narrative delegated to the Insight) / failure modes and limits / adoption and
  verification (8 observable conditions, no invented ROI) / the traceability matrix + worked row +
  CSV download / what we claim vs do not.
- **New downloadable artifact:** `root/downloads/journey-to-system-traceability-matrix.csv` ->
  served at `/downloads/...csv`. **`root/` is the static passthrough dir** (that is how
  `robots.txt` is served) - new files there are startup-only, so restart to serve them.
- **Cross-links now asymmetric and correct:** Insight -> paper twice ("if what you need is the
  generalized method"), paper -> Insight once as "the underlying field report". The Insight's old
  reference to the paper by its FORMER title was corrected - watch for this whenever a paper is
  renamed.
- **Insight calibration (reviewer's four):** "hundreds of serious organizations" -> "organizations";
  "carves the system into modules" -> "can easily carve"; "features that would not otherwise exist"
  (unknowable counterfactual) -> "features the analysis surfaced and prioritized"; "the single
  most-asked question of any system" -> "one of the most persistent questions in systems managing
  long-running work".
- **Paywalled links removed site-wide (Aamir):** HBR and O'Reilly URLs dropped from the journey
  paper AND `30-gamification-enterprise-motivation.md`; the works are still CITED in full by
  reference, labeled "(Subscription publisher; cited by reference.)". Free sources kept (Conway on
  the author's own site, NN/g, Business Wire, YouTube, client sites). Sweep for
  hbr.org|oreilly.com|wsj|ft|nytimes|jstor|sciencedirect|springer returns 0 in content.
- Verified: 57 pages / 0 FAIL / 6 warn; figure rebalanced after a screenshot showed a void in its
  left column; CSV serves 200.

**2026-08-11 (part 19c - the A+ pass on the paper, plus a copy rule):**
- **"Nine named artifacts" was an architectural overstatement and is now "nine design questions"**
  (reviewer). Not every transition should emit an event, cross an integration boundary, write a
  regulatory audit record or carry every telemetry measure - forcing that buys event noise,
  coupling, audit bulk and observability cost. Each answer yields an artifact WHERE WARRANTED, and
  a deliberate "not applicable, because..." is a valid design decision. Language changed in all
  three places it lived: figure header + footnote, figcaption, and the body list intro.
  Six rules refined accordingly: invariants always preserved but events emitted only when a
  component/audit process/external party must observe; data ownership names an authoritative owner
  with API/event/projection chosen per case (not projections universally); audit records scoped to
  security-/regulatory-/business-significant transitions but complete when taken (principal, prior
  and new state, time, reason, correlation id); integration boundary explicitly marked N/A for
  internal steps; telemetry selected by operational risk, privacy and decision usefulness;
  acceptance = a risk-based suite (happy path, authorization denials, exceptions, retry and
  reconciliation), not "one test per journey". Verification item 3 in section 8 was swept to match.
- **Bibliography strengthened** now that the paywalled URLs are gone: Shostack has vol. 62, no. 1
  (Jan-Feb 1984), pp. 133-139; Kalbach has 1st edition, O'Reilly Media, 2016, ISBN 978-1-4919-2352-8
  (the ISBN the removed O'Reilly URL encoded), plus the Figure 6-21 locator.
- **COPY RULE (Aamir, screenshot): do not declare "no sign-up wall" / "nothing here is gated".**
  Announcing that we do not do something bad reads as weird and defensive - nobody expects a blog
  post to be gated. The article facts strip's READ cell is now just the time plus "Estimated from
  this page's word count" (factual, matches the strip's kicker). Changed in BOTH
  `insights-article.html` and `white-papers-article.html`, so it applies to every article and paper.

**2026-08-11 (part 20 - /standards/ publishable working-draft revision, UNCOMMITTED):**
Content-model, evidence and status-accuracy pass; hero, registry treatment and typography
deliberately preserved (not a redesign).
- **Governing rule now enforced in copy AND in code:** six things are never conflated - a public
  specification, public source, a public concept note, an unpublished spec offered for private
  review, an internal implementation, and something ready to adopt. **Internet Object is the ONLY
  project with a publicly accessible specification.**
- **Registry rebuilt to carry four independent facts per row** (`public` / `review` / `maturity` /
  `adopt`), rendered as four columns with a header row. `what` moved to a sub-line under the name.
  Order now matches the body: IO, UExL, NITES, Indigo, FUSE, AddressQL.
- **Verified against reality before writing status** (this is the part that matters): uexl-go has
  **no LICENSE and no tags** -> "public source", never open-source/production-ready; InternetObject-js
  is **ISC** and active; gotime is **MIT** and active; InternetObject-py has **no license and no
  commits since 2021** -> the old page called it a parser "live today", which it is not.
- Working-draft notice + `pageStatus`/`lastReviewed` frontmatter, rendered below the hero
  (`#publication-status`); page stays indexable. Adoption-assurance line under the registry.
  New sections: "What 'private review available' means" and "What this means for you".
- CTA replaced: "Request a technical review" -> `/contact/`; page-level estimate CTA removed (global
  nav still carries it; verified 0 `/estimate/` links inside `.standards-body`).
- **Honesty motif: 13 occurrences -> 0.** "labeled honestly" -> "published with their actual status";
  "Honest status, up front" -> "Publication and maturity status". Accuracy is now demonstrated by
  the status system instead of asserted.
- **Nine seo-check gates added** and each proven by deliberate break-then-restore: non-IO public-spec
  claim, "spec below", "maturing in the open", "labeled honestly", "implementation complete",
  UExL open-source/production-ready, private-review-as-unrestricted-source, missing registry fact,
  missing artifact link, missing notice/review date, noindex.
- **Two design defects found by screenshot, not by gates:** (1) "Not available for adoption" was
  rendering in MINT, which reads as *available* - `.sr-adopt` is now neutral and mint only when
  `adoptable: true` (GoTime alone). (2) The longer hero `<em>` overflowed on mobile: `.vh-h1 em` is
  `white-space:nowrap` for its absolute underline, and `body{overflow-x:hidden}` meant the phrase was
  silently CLIPPED at 375px (h1 scrollWidth 538 vs 351) with no scrollbar to reveal it. Fixed for
  every hero site-wide: below 768px the em wraps and the underline is painted per line-fragment via
  a background gradient + `box-decoration-break:clone`. Re-probed: 2 lines, no clipping, 0 overflow.
- Verified: 57 pages / 0 FAIL / 6 warn (all pre-existing); all 6 registry anchors resolve; all 6
  external artifact URLs return 200; mobile 375px has 0 horizontal overflow and body tables scroll
  inside their own container; ASCII clean (middot -> `|` per CLAUDE.md).

**2026-08-11 (part 20b - reviewer's five closing fixes on /standards/):**
1. **Status now above the fold.** The hero is 100svh, so the notice below it could be missed
   entirely; added a `.vh-status` pill under the dek ("Public working draft | Last reviewed
   11 August 2026") linking to `#publication-status`. The full notice stays below the hero.
2. **Private review is never hidden again.** It was being dropped at <=991px, which silently
   deleted one of the four facts the page exists to state. The registry now uses
   `grid-template-areas` (`--sr-areas`) instead of column-dropping: 4 columns on desktop,
   3 columns with review wrapping to its own row at <=991px, fully stacked at <=767px - and at
   narrow widths it labels itself inline ("Private review: ...") because the column header cannot
   reach it. Probed at 375px: all six rows show it, 0 horizontal overflow.
3. **Meta description corrected** - it said "the rest is private work", which erased the public
   implementations. Now "one public specification, two public implementations, and concept notes
   over private work" (159 chars).
4. **Adoption contradiction removed.** The section intro said neither UExL nor NITES "is packaged
   for you to adopt" while the page elsewhere correctly calls GoTime MIT-licensed and adoptable.
   Rewritten to state the difference explicitly - GoTime adoptable now, UExL not (no license, no
   release).
5. **Middot swept.** The page's own was in the notice; the last one rendering on /standards/ came
   from the GLOBAL footer (`includes/footer.html`), so that was changed too - it affects every
   page's copyright line. NOTE: the home page still renders 14 middots in its own content; left
   alone as out of scope for this brief, and still open as a site-wide ASCII sweep.

**2026-08-11 (part 20c - /standards/ body moved onto the insights reading shell):**
The body was capped by `.standards-body { max-width: 820px }` on the WHOLE container, leaving the
right half of a very long page empty. Fixed by REUSING the article shell rather than inventing a
standards-only nav:
- `.standards-layout` / `.standards-main` mirror `.article-layout` / `.article-main`
  (grid `minmax(0,1fr) 300px`, same gap, no `align-items:start` so the sticky inner has a track);
  the 820px cap moved onto the prose column only. Markup: `<main class="standards-main">` (notice +
  `.article-body`) + `<aside class="standards-aside">` with the SAME `.aside-inner` / `.toc` /
  `.toc-list` / `.am-link` classes, and `{% lib "article/article.js" %}` in `scripts_extra`.
  No JS was copied - the shared runtime builds the TOC from `.article-body h2[id]`, scrollspies it,
  and guards its optional controls (reading time, progress bar, copy-link), so none of the
  insights-only UI renders here.
- Rail content is navigation + status + evidence only, no second CTA: derived TOC, a publication
  status block (page status, last reviewed, "Internet Object - the only one", label-led so status
  is never colour-alone), the four verified public artifact links, and the private-review note
  linking to `#what-private-review-available-means`.
- **Trap worth remembering:** putting `max-height`/`overflow` on the flex `.aside-inner` made the
  flex column SHRINK the `.toc` (which owns `overflow-y:auto`) instead of scrolling the rail -
  clientHeight 180 vs content 305, silently clipping the last TOC entries. Fixed with
  `> * { flex: 0 0 auto }` + `.toc { max-height: none }` so the RAIL scrolls as one region.
- Responsive: two columns >=992px (matches insights); at <=991px the layout becomes a flex column
  with the aside `order:-1` so the TOC becomes a jump-nav ABOVE the body, non-sticky, with the
  duplicated status/artifact/review blocks hidden (they are body copy at that width - nothing
  unique is lost); <=767px adds 44px tap targets.
- Verified at 1440/1280/1024/900/768/375: TOC built from all 7 rendered h2s with 0 broken links,
  active-section highlighting works, rail visible at the top AND halfway down, 0 horizontal overflow
  at every width, body tables scroll inside their own `overflow-x:auto` (13 table internals extend
  past 375px but all are contained), registry private-review still visible at every width, page
  usable with JS off (nav ships `hidden` with an empty list; all 7 sections render). Gate: 57 pages
  / 0 FAIL / 6 warn.

**2026-08-11 (part 20d - Aamir's two hits on the new rail: double scrollbars, and no way to reach
a standard):**
- **Double scrollbars.** `overflow-y:auto` on the sticky `.aside-inner` parked a second scrollbar
  hard against the page scrollbar - reads as breakage. RULE: the rail must FIT, not scroll. Removed
  every internal scroll region from it; instead the rail was trimmed (compact 2-line status block
  replacing the 3-row `<dl>`; the "Public artifacts" block CUT - with project entries now in the nav
  each of those links is one click away in its own section, so it was pure duplication). Rail went
  1118px -> 725px, which fits a ~780px viewport; below that
  `@media (max-height: 790px) { .aside-inner { position: static } }` gracefully stops it being
  sticky rather than hiding its own foot. Zero scroll containers inside `.standards-layout` now.
- **"How do I go to a standard?"** The TOC was h2-only, so the six PROJECTS - the actual units of
  interest on a registry page - were unreachable. Extended the SHARED runtime with an opt-in:
  `<nav class="toc" data-depth="3">` also collects `h3[id]`, marks them `is-sub`, and shortens the
  label to the name before the dash ("Indigo - a Go superset..." -> "Indigo"). Default is unchanged
  h2-only, verified: the insights article still renders 5 items with no sub-entries and no
  `data-depth`, white papers carry none either. Standards now lists 13 entries (7 sections + 6
  nested projects), 0 broken links, scrollspy active across both levels.
- Verified 1440x900 sticky mid-page (active state lands on the project being read), and 375px:
  13 items, TOC above the body, single column, 44px taps, 0 overflow, 0 extra scrollers.
  Gate: 57 pages / 0 FAIL / 6 warn.

**2026-08-11 (part 21 - SERVICES SECTION REBUILD programme begins; P0 done, P1-P3 pending):**
Brief: rebuild /services/ + the four practice pages as an enterprise engineering portfolio, not
an agency/body-shop structure. The brief itself sequences P0..P8 and sets a REVIEW GATE after
P3 (the Enterprise flagship) - "do not begin mass rewriting before the Enterprise flagship has
been reviewed and accepted". Baseline recorded before any change: **57 pages / 0 FAIL / 6 warn**.
- **P0 COMPLETE -> `_ia/services-claims-register.md`** (new, the gate for all copy). Audited the
  live service content, templates and the `_inbox` service dossiers. Findings:
  - **5 BLOCKED claims** that cannot be published in any form until Aamir rules:
    (B1) AI FAQ answers "No - your data is not used to train any third-party model" as a flat
    absolute; that is a guarantee about someone else's processing and holds only per provider,
    tier and configuration. (B2) "**Every step reversible**" appears 6x in modernization
    INCLUDING the page description and seoDescription - untrue for destructive data transforms
    and external cutovers; needs a rollback envelope instead. (B3) "Experienced engineers only -
    no juniors learning on your project" is a staffing PROMISE of the same class as the response
    SLA we removed. (B4) ISO certificate numbers are specific and checkable but their CURRENT
    VALIDITY is unverified. (B5) the footer attaches "Engineering since 1999" to Maniar
    Technologies Pvt. Ltd. while Services/estimate say the firm ships "since 2010".
  - 6 REVISE claims (Sales Navigator "four months" must never generalize to delivery speed; RTL
    "15 years" is client-reported; etc.).
  - **AI evidence maturity pinned from `foundry/*/index.md`:** Documentor = Early-stage,
    Tallery = Early-stage, Ordin = In development, Processious = In production, Booster =
    Internal. **Content Engine has NO productStatus key** -> cannot be cited until Aamir states
    it. Many Foundry projects carry no status at all; for the evidence index use the /standards/
    publication model instead, which is already verified and gated.
  - **IA decision recorded as canon:** four PRACTICES (Enterprise Systems / Application and
    Product / Modernization and Migration / Applied AI) separated from four ENGAGEMENT MODELS
    (assessment and architecture review / delivery / embedded partnership / selective co-founder
    partnership). Technology Partnership stops being a third kind of software. All routes
    preserved - no redirects needed.
  - **Template state:** `service-detail.html` EXISTS BUT IS ORPHANED (nothing extends it); the
    four practice pages each carry their own 211-251 line template, ~1,100 lines of duplication
    to replace with one shell reusing the proven /standards/ reading shell + `article/article.js`
    (`data-depth="3"` available). Do NOT build another TOC.
- **P0 rulings received from Aamir (all five, recorded in the register's terms):** B1 flat "No"
  on AI training NOT approved - remove at P6, use "provider, deployment mode, data location,
  retention, training policy and deletion are documented and agreed per engagement"; do NOT name
  providers until he supplies the deployment inventory (recorded as MISSING INPUT). B2 "every step
  reversible" NOT approved - replace at P5 with a **rollback envelope**; do not infer an RTL or
  Processious incident history. B3 staffing: publish "led and reviewed by the senior engineering
  core, with vetted specialists engaged where the problem requires them; we do not substitute
  trainees for the experienced engineers presented during the engagement" - never "experienced
  engineers only" / "no juniors" / unconditional senior-only. B4 ISO: certificates EXPIRED JUNE
  2026, Cycle 2 recertification was scheduled Jul/Aug 2026, final status unknown -> use the
  restrained "independently audited by URS under UKAS accreditation; current certificate status
  can be verified with the registrar using 123961/B/0001 and 123961/A/0001", print NO new validity
  date, and log a SITE-WIDE current-status verification item (URS client-verification route, not
  inference from the old PDFs). B5 dates: firm = 2010, Aamir's career = 1999/27 years; footer
  should read "Company founded 2010". Content Engine = historical delivered client work 2010-2011,
  NOT a current product and NOT principal proof for Applied AI.
- **P1 DONE - one canonical shell.** The orphaned `service-detail.html` was rebuilt as the shared
  practice shell (hero + facts strip + `.svc-layout` main/sticky rail + `article/article.js` TOC,
  `tocDepth` opt-in). Practice-specific content arrives ONLY through frontmatter (`facts`,
  `evidence`, `artifact`, `action`), so a practice page is a one-line `{% extends %}` shim -
  ~1,100 lines of duplicated template collapse to one. Shell geometry REUSES the /standards/
  rules by comma-grouping the selectors (`.standards-layout, .svc-layout` etc), not by copying.
  New information-bearing components (no card grids): `.svc-decisions` (decision/turns-on table),
  `.svc-failures` (failure path + the control that prevents it), `.svc-stage` (input / work /
  decision / deliverable / you-provide / EXIT GATE), `.svc-artifact` (sanitized specimen),
  `.svc-fit` (good/poor fit).
- **P2 DONE - Services root** rebuilt from the "What do you need built?" + free-estimate chooser
  into an engineering position. Four PRACTICES (registry with situation/risk, then entrances
  carrying thesis + owned decisions + evidence link) separated from four ENGAGEMENT MODELS.
  Primary action is now "Bring us a system that has to be right" -> /contact/. Zero estimate CTAs.
- **P3 DONE - Enterprise Systems Engineering flagship** rebuilt as the editorial benchmark:
  operational-control-system thesis; 7 named failure modes each paired with its control; 10 owned
  decisions with what each turns on; the Keystone Method with per-stage input/work/decision/
  deliverable/customer-responsibility/**exit gate**; two sanitized artifacts (authorization matrix
  with "a blank cell is not permitted", audit-record specification); state-model SVG showing
  BLOCKED transitions (self-approval, skip-review); integration failure-path + reconciliation SVG;
  field evidence at verified levels only; approved staffing/ISO/date wording; fit and poor-fit.
- **Verification:** gate **57 pages / 0 FAIL / 5 warn - one BETTER than the 6-warn baseline**
  (the old `/services/` h1->h3 heading skip is gone). TOC builds 10 entries, 0 broken TOC links,
  0 broken in-page anchors, 0 "free estimate" CTAs, 0 banned absolutes on the new pages. 375px:
  single column, TOC above body, 0 horizontal overflow, 0 uncontained overflow elements.
  **Two layout bugs found by screenshot, not by gates:** a theme rule flexes divs inside prose
  (stage cards laid out sideways) -> components now declare `display:block`; and the rail was 884px
  against 840 available -> trimmed to 803 (same "the rail must FIT" rule as /standards/).
- **Interim fixes on not-yet-rebuilt pages (Aamir spotted the first one on screen):**
  (a) `/services/application-software-engineering/` had 8 catalog cards in a 3-up grid, leaving a
  ragged empty 9th cell. Filled with an INVITATION card, dashed mint border so it reads as a
  different KIND of card and can never be mistaken for a 9th capability claim. Kept in the
  template, NOT in `offerings.items`, so the data stays a record of work actually done.
  **Aamir's correction, worth keeping as a copy rule:** the first draft titled it "Your
  application", which is a CATEGORY ERROR - every other card names a TYPE of application, so a
  possessive noun reads as a ninth type. The cell that closes a list of types must ask a question:
  "What do you want to build?", with the body stating outright that these are types, not a
  catalogue. The principle carries into P4: the catalog must not imply it is exhaustive.
  (b) **Removed the B3-disapproved staffing claim from the live site rather than leaving it up
  through P4-P7:** "Experienced engineers only" was in FIVE hero strips (ai, application,
  how-we-work, modernization, security) and "no juniors learning on your project" in
  `services/ai/trust.md`. Hero strips now read "ISO 9001 & 27001 management systems,
  independently audited | Senior-led engineering | Company founded 2010" - which also applies the
  B4 restrained ISO wording and the B5 date convention in one pass. Site-wide count of both banned
  phrases is now 0.
**2026-08-11 (part 21b - P3 review REJECTED as complete; rail + CTA system fixed):** Reviewer
approved the editorial direction and rejected the implementation as finished. Three findings, all
correct:
- **The rail bug was mine and my "graceful fallback" was wrong.** `@media (max-height: 790px) {
  position: static }` meant that at 1280x720 - an ordinary laptop - the 796px rail scrolled off the
  top while the grid kept reserving its 300px column, so the reader saw an EMPTY right side for
  almost the whole page. Replaced with a **compact sticky mode**: at <=880px the rail stays sticky
  but tightens gaps, caps the nav with a thin internal scrollbar, and hides only the block that
  repeats body copy; at <=700px it also drops the evidence block. "On this page" + evidence stay on
  screen at every laptop height. Verified sticky at 720 (rail 638), 768, 900 (rail 803) and 1080,
  with mid-scroll screenshots at each.
- **The global header CTA was a live strategic contradiction:** "Estimate a project" sat beside
  pages arguing an estimate must FOLLOW engineering understanding. Header (desktop + mobile menu)
  now reads **"Discuss a system" -> /contact/**. `/estimate/` remains reachable from the pages that
  actually offer it.
- **Conversion density cut on the rebuilt pages:** the hero action is now in-page ORIENTATION
  ("See the four practices" -> #practices; "What this practice takes responsibility for" ->
  #the-decisions...), leaving exactly ONE contact conversion in the body, at the end, after the
  evidence. Rail carries zero CTAs. Measured: root and enterprise each 1 body /contact/, 0
  /estimate/.
- **Modernization's rejected absolutes removed ahead of P5** (they were live and disapproved):
  "every step reversible" x4, "no go-live weekend" x3 including the description, seoDescription and
  the strangler diagram caption -> the approved rollback-envelope wording ("what can be reversed,
  for how long, what must be reconciled, and which transitions require an explicitly authorized
  cutover"; side-by-side migration now conditioned on "where the system and its dependencies
  permit it"). Site-wide count of both phrases is 0. The FULL P5 rebuild is still outstanding.
- Gate after all of it: 57 pages / 0 FAIL / 5 warn (still one better than baseline).
- **STILL UNFINISHED, confirmed: P4 application, P5 modernization, P6 AI are on the OLD templates**
  (no TOC, no rail, old headings, 4 body conversions each, "honest" motif on AI). Services must not
  be closed until those three are rebuilt on the shared shell, then P7 partnership + cross-site
  reconciliation and P8 verification.

**2026-08-11 (part 21d - AI corrections, P7 reconciliation, P8 sweep; SERVICES PROGRAMME COMPLETE, uncommitted):**
- **The two AI corrections Aamir made a condition of approving P4-P6:** "Honest description of what
  happens today..." -> "**An accurate account** of what happens today when the decision is wrong";
  and the generic AI evidence rail (Standards / Insights / All case studies - true of any practice)
  replaced with the three things that are actually evidence about OUR AI work, each carrying its
  maturity qualification: **Content Engine** (delivered client work 2010-2011, classical NLP, not
  modern LLM delivery, current operating status not claimed), **Documentor** (our own product,
  early-stage and in development, not a customer deployment), and the page's own **maturity
  section** (`#where-our-own-ai-work-actually-stands`). Motif 0, fragments 0 broken, links 200.
- **P7 - partnership is an ENGAGEMENT MODEL, not a fifth practice.** The four engagement models moved
  OUT of `services/services/index.md` frontmatter into `tajmahal.yaml context.engagementModels` -
  one source, because /services/ and /partnerships/ both render them now. /partnerships/ gained an
  unnumbered orientation strip (`.eng-models`) that loops that list and marks its own row from a
  `modelKey` frontmatter match (never hand-written markup), a hero back-link to
  `/services/#engagement-models`, and an opening paragraph placing it: *an engagement model, not a
  separate kind of engineering - the work inside it is whichever of the four practices the venture
  needs.* Nav (desktop + big navigator) rebuilt around the same distinction: a group label
  "Engineering practices" over the four canonical names, a rule, then "Engagement model".
- **P7 found real navigation rot:** the big navigator still linked SEVEN dead anchors
  (`#process-automation`, `#enterprise-integration`, `#business-analytics`, `#gamification`,
  `#digital-asset-management`, `#custom-development`, `#architecture-advisory`) left behind by the
  45 deleted section files - **on all 57 pages**, invisible to every existing gate because the
  PAGE resolved 200 and only the ANCHOR was gone. Home's four panels and the marquee still carried
  the old names, and the modernization panel contradicted its own page ("uptime intact ... your
  operations never stop") - now "each step with a stated rollback envelope decided before the step
  is taken". Case-study `services:` labels reconciled to the canonical practice vocabulary.
- **P8 - site-wide claim sweep.** The ISO wording Aamir approved for Services was applied everywhere
  it had NOT been: home (hero, checklist, bio, stat), footer, big navigator, about, contact,
  estimate, how-we-work, security, processious, partnerships. `/security/` was the worst case - its
  FAQ answered "**It is current.**" about a certificate whose cycle we cannot assert from here.
  Present-tense "ISO-certified" is gone; what remains is what is true and checkable: the management
  systems, the standards, the audit by URS under UKAS, the certificate numbers, and the registrar as
  the ONLY authority on today's status (`/contact/#assurance`). Banned staffing absolutes removed
  from home (hero note + checklist), about, estimate, careers, processious, and BOTH cost-drivers
  pieces; the publishable form is senior-led + no substitution of trainees for the engineers
  presented. Site-wide middot sweep finished: **14 rendered middots -> 0** (the last one was an
  entity, `&middot;`, which a character-only scan had missed).
- **Three new seo-check gates, each proven by break-then-restore:** (1) **fragment reachability** -
  every in-site `#anchor` must resolve to a real id, which is the gate that would have caught the
  seven dead nav links; (2) **ruled-out claims** - staffing absolutes and unqualified current
  certification, checked in body copy AND meta descriptions (it immediately caught three instances
  my greps had missed: "No junior engineers learning on your project" on home, "we staff senior
  engineers only" in the cost-drivers paper and post); (3) **middot separators**, entity-aware.
- **Verification: 57 pages / 0 FAIL / 5 warn** (all five pre-existing). Fragment audit **0 broken**.
  Responsive probe over 16 pages x 375 / 768 / 1280x720 = **48 checks, zero horizontal overflow and
  every sticky rail fits its viewport** - including the 1280x720 case that was rejected earlier.
  Confidentiality sweep: 0 leaks of the private briefing, 0 provider names on the AI page, 0 SLA
  phrasing, 0 emoji.
- **P7/P8 close-out - the conversion architecture (Aamir's final review).** `/how-we-work/` was still
  running the old pattern: an estimator CTA plus "Talk to a human" in the hero, then the estimator
  again at the foot. It is a SUBSTANCE page, so it now earns its ask: the hero carries an in-page
  orientation link ("See how an engagement runs" -> `#process`, a new anchor on the process section)
  and NO conversion; the single conversion is "Discuss a system" -> `/contact/`, placed last, after
  the process, the assurance facts, the handover and the FAQ. "with a ballpark and an honest take"
  is gone from the page. `/estimate/` stays reachable from its own entrances as a distinct scoping
  tool - it is simply never the ask on a substance page.
- **Home's disclosed exception resolved.** The primary CTA is now "Discuss a system" -> `/contact/`
  in BOTH primary positions (hero and the closing band - fixing the hero alone would have had the
  page contradict its own promise eight sections later), with "Or use the project estimator" as a
  quiet secondary route (`.hero-alt`). The closing copy no longer sells the estimator, and the hero
  note's leftover "a straight estimate" is now "a straight read".
- **New gate: conversion density**, proven by break-then-restore on both conditions. Counted inside
  `<main>` ONLY - the global header and footer legitimately carry `/contact/` on every page, so a
  whole-document count measures the chrome, not the page. Gated set = the four practices,
  `/services/` and `/how-we-work/`: **0 body `/estimate/`, exactly 1 body `/contact/`** on each.
  Measured: all six read 0 / 1 (whole-document `/contact/` is 7 on each - that is the chrome).
  Home is deliberately NOT in the gated set (2 body estimator links, both the secondary route; 3
  body `/contact/`). `/partnerships/` is also out: its one estimator link is a DEFLECTION ("if only
  one of the four is true, a conventional engagement fits you better - get an estimate instead"),
  which is the estimator used exactly as intended.
- **Partnership fit-control copy corrected (final review item).** The low-fit verdict opened with
  "Honestly:" (the rejected motif) and closed with "the faster, cheaper way to get what you need"
  (an unnecessary comparative claim). It now reads: *"With only one of the four conditions met, a
  conventional engagement is likely to be the more proportionate route. Use the project estimator to
  describe the work."* The control's lead-in carried the same motif one line above ("the routing
  below is honest, both ways") and is now "the routing below points away from a partnership as
  readily as toward one" - the meaning kept, the motif gone.
  The other four uses were then replaced with Aamir's own wording: `shown.md:39` "makes its own weak
  points explicit"; `stay.md:5` "how we protect against it in practice"; `stay.md:11` "our answer to
  'what if one person is gone'"; `who.md:9` "the material risks". **`shown.md:5` is RETAINED on
  Aamir's instruction** because it rejects the motif rather than using it ("We won't tell you we're
  'the honest ones'; that's the exact line a sales pitch uses") - it is the one rendered instance
  left on the page, and it is deliberate.
- **Re-verified after the change: 57 pages / 0 FAIL / 5 warn; 0 broken fragments; 48 responsive
  checks (16 pages x 375 / 768 / 1280x720) with zero overflow and every rail fitting.**
- **Gate hardening deferred (Aamir, not release-blocking):** the conversion-density regex only
  matches double-quoted root-relative hrefs, and it counts density without checking that the
  `/contact/` conversion occurs AFTER the evidence rather than merely once.

- **SERVICES IS NOW COMPLETE (P0-P8) and entirely UNCOMMITTED, awaiting Aamir's review.**
  The **AI provider/deployment inventory**, a **renewed ISO certificate or URS confirmation**, and
  **real rollback-envelope detail from RTL/Processious** are tracked EVIDENCE UPGRADES, not blockers
  (Aamir, 2026-08-11): the published copy is already qualified so that each one only makes a stated
  claim more specific - none of them makes current copy false. Still open and NOT part of this
  programme: sitemap.xml, the about.html team placeholders, and the vault repo's 10 dirty doc files.

**2026-08-11 (part 21c - P4, P5, P6 rebuilt; all four practices now on the shared shell):**
- **Planning source superseded first (Aamir):** `_ia/capability-modernization.md` still carried
  "every step reversible" and could have restored the rejected claim into future copy. It now opens
  with a **SUPERSEDED IN PART banner** stating the approved rollback-envelope wording and pointing
  at register item B2; the draft line is marked superseded rather than deleted, and the claims
  register keeps the original quotation as historical audit evidence (verified still present).
- **P4 Application and Product Engineering:** thesis = "architecture accountability is the
  deliverable; the code is what carries it". Six failure modes (undrawn boundary, quality
  attributes chosen by accident, undocumented decision, contract drift, ownership fog at handover,
  the demo that is not a system); nine owned decisions; the build/review split made explicit with
  "leave-alone" as a real verdict category; 4 stages with exit gates (the handover gate is "your
  team deployed a change and recovered from a simulated failure without us in the room"); two
  sanitized artifacts - a quality-attribute matrix whose last column is WHAT IT COSTS, and an ADR
  specimen; system-context SVG naming what the design is NOT optimized for. Sales Navigator's
  "four months" is stated as a fact about one project, explicitly not a delivery-speed offer.
- **P5 Modernization and Migration:** governing claim replaced - not "every step reversible" but
  "every step has a stated rollback envelope, decided before the step is taken". The page says
  outright that our own marketing overreached here until recently. New SVG draws the reversible
  window -> reconcile -> AUTHORIZED CUTOVER with the point of no simple return marked. Migration
  candidate matrix includes a row whose envelope is "destructive transform - cutover, not
  reversible", and the rollback-criteria/retirement record names the authorizer. Go position kept
  pragmatic ("Go where the workload benefits; modern Python or another mainstream stack where that
  is the better decision"). No RTL/Processious incident history inferred.
- **P6 Applied AI Systems:** the flat "No" on third-party training is GONE from copy and from FAQ
  JSON-LD (the whole FAQ block went with the old template). Replaced by a section stating what we
  actually commit to: provider, deployment mode, data location, retention, training policy and
  deletion documented and agreed per engagement, and reported as a finding if the available terms
  do not fit. NO providers named (inventory still MISSING from Aamir). Seven failure modes incl.
  prompt injection and silent model change; confidence-gate SVG (grounded -> cited / abstain ->
  named queue / deterministic fallback); suitability matrix whose worked example REJECTS a use case
  ("Decide credit eligibility -> No. Use the rules."); maturity stated per artifact with Content
  Engine as **historical delivered client work 2010-2011, current status not claimed, not evidence
  of modern LLM/agentic/RAG delivery** per Aamir's ruling.
- **Template consolidation complete:** ~1,100 lines across four bespoke templates -> an 89-line
  `service-detail.html` + four 2-4 line shims. 45 superseded section files deleted across the four
  practice content dirs; each is now a single `index.md`.
- **Verification:** gate **57 pages / 0 FAIL / 5 warn**. Every practice page: TOC yes, rail yes,
  exactly 1 body /contact/, 0 /estimate/, 0 banned absolutes. The IP/OWNERSHIP GATE EARNED ITS
  KEEP - it caught two phrasings I wrote ("an evaluation set you own", "whether you own the product
  or only possess it"); both rephrased to describe the artifact and the capability, never an
  ownership position. Honesty motif swept to 0 on all pages.
  **Dev-server note: content edits in these content dirs did NOT hot-reload reliably - the gate
  reported a failure that was already fixed on disk. Restart + `rm -rf .cache` before trusting a
  gate result after editing service content.**
- **STILL OPEN: P7 (partnership repositioned as an engagement model + cross-site reconciliation of
  nav, related links, case studies, Insights, Standards, Foundry, white papers) and P8 (full
  verification sweep). Services stays open until both are done.**

- **NEXT (after Aamir's review of the flagship): P4 application -> P5 modernization (apply the
  rollback envelope) -> P6 AI (remove the flat "No", needs the provider inventory) -> P7
  partnership + cross-site reconciliation -> P8 full verification.** Superseded enterprise section
  files (13) were deleted; the other three practices still use their old templates and content
  until their phase.

**2026-08-11 (part 19 - WHITE PAPERS program opens; P0 + platform fixes DONE, uncommitted):**
Insights closed (3 commits landed, unpushed). External review graded the papers B to A-: the gap is
evidence precision and publication discipline, not presentation. Editorial rule adopted: *a white
paper must help a customer make, govern or verify a consequential decision; if it only explains an
idea it belongs in Insights.* P0 (claims) and platform items 1/5/6 are DONE:
- **Chemo credential (site-wide, was the publication blocker):** "US FDA-accredited" could not be
  verified (lab's own site says government approved / QMS certified) and FDA approval is not
  accreditation. Removed from the journey paper AND from work/chemo/index.md, work/chemo/outcome.md,
  foundry/tajmahal-ssg/index.md and the pitch deck (source + built) - the review only caught the
  paper; a new seo-check gate caught the rest. NABL kept; regimes now stated separately (NABL
  accreditation / government approval / ISO certification). Correction notes added to the internal
  dossiers (_ia/case-studies/chemo.md, _inbox/case-study-chemo-lab.md) so it cannot re-propagate.
- **Gamification** retitled to the evidence-and-controls framing; "reliably backfire" removed;
  Mekler restated correctly (output quantity up, NO significant intrinsic-motivation effect either
  way); "two hard vetoes" -> a five-point control policy (public ranking = exceptional
  justification; pay-linked scoring = normally prohibited; pre-launch assessment; stop rules before
  pilot; segment results); "when not to gamify" -> use when / do not use when.
- **Cost Drivers**: Cone of Uncertainty no longer claimed to predict cross-vendor dispersion (it
  describes one estimate's accuracy over a project's life) - the 5-10x spread is labeled a
  ManiarTech observation consistent with the condition, not predicted by the model; integration
  superlinearity, junior-team totals and security-retrofit "multiples" all relabeled as practitioner
  judgment; rhetoric ("second 80%", "monopoly prices") replaced with precise mechanism.
- **Journey-First**: "structurally impossible" -> "materially reduces status blindness"; "no data
  model would ever" -> "unlikely to surface"; "days not weeks" qualified by system size.
- **Platform**: hub promise replaced with the traceable-sources wording; papers renamed 10-/20-/30-
  + `order: sort_order` added to the white-papers collection (verified on a FRESH cache after a full
  server restart - order is Cost Drivers, Journey, Gamification; URLs unchanged); /white-papers/
  h1->h3 heading skip fixed (card titles are now h2 via .pc-title; warnings 7 -> 6).
- **Two new seo-check gates**, both proven by break-then-restore: unverified FDA-accreditation
  phrasing, and the six corrected overreach phrases returning to any paper.
STILL OPEN (P1-P5): per-paper version/dateModified/audience/decision/evidence-limits/citation, PDF
generation, downloadable artifacts (Estimate Comparison Matrix, Journey-to-System Traceability
Matrix, Gamification Risk Assessment), executive decision briefs, single end CTA + sidebar tools,
then the three flagship rebuilds. Gamification needs an independent psychology/domain review before
it can be called finished. NOTE: the dev server on 7000 was restarted by me with a cleared .cache.

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
- **Taj Mahal:** list-page `content:` must be a bare collection name (`posts`, not `./posts/`) or the server panics; a `---` thematic break in a markdown *body* breaks frontmatter parsing (404); `module.yaml`/routing changes AND **new frontmatter keys** need a restart (+ `rm -rf .cache`) — body edits hot-reload, frontmatter does not; `rm -rf .cache` to clear a stuck cache.
- **Taj Mahal RESERVED frontmatter keys — `categories` (and `tags`).** They are coerced to `[]string`. A list of MAPS under such a key parses to an EMPTY slice, so the template loop renders nothing — silently, with no error in the log or the page. This had been eating the three service cards on the live `/services/` page. Name data lists something else (`serviceLines`, `studies`, `sections`).
- **Grid + long code lines:** grid items default to `min-width:auto`, so a wide `<pre>` widens its track and pushes the whole page sideways on mobile. Put `min-width:0` on the grid item and let the `pre` keep its own `overflow-x`.
- **Screenshots for visual review:** headless Chrome works and DOES capture canvas — `chrome --headless --disable-gpu --hide-scrollbars --virtual-time-budget=6000 --window-size=W,H --screenshot=out.png URL`. Add `--force-prefers-reduced-motion` to capture a piece's RESTING frame (rAF does not finish inside the virtual-time budget). **Headless enforces a minimum window width**, so `--window-size=390` yields cropped desktop layout, not a mobile render — measure mobile in the browser pane (`resize_window` + a scrollWidth/offender probe) instead.
- **Canvas + this preview environment:** the harness preview tab often runs *hidden*, which pauses `requestAnimationFrame` (canvas looks blank) and makes `preview_screenshot` time out (the theme's GSAP/gear loops keep the compositor busy). Every canvas widget therefore does a **synchronous first draw at boot** so it's never blank; verify via DOM/pixel probes, not screenshots. Not a bug — an environment quirk.
- **Classifier outages:** the safety classifier intermittently goes "temporarily unavailable," blocking Bash/preview/Agent tools for a bit (Read/Grep/Glob/Edit/Write still work). Retry after a moment.

## Working style (Aamir)
Wants frank critique, not a yes-man. Iterates hard on visuals section-by-section ("boring", "pathetic",
"not presented best") — the pattern that works: **align on the metaphor first, then build; keep content
real and visible (not empty/abstract); vary layouts (he hates uniform box grids).** Commit only when he asks;
no `Co-Authored-By` trailers (his global rule).
