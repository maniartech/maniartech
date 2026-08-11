# Application Software Engineering page — redesign plan (2026-07-11)

> **SCOPE EXPANDED (Aamir, 2026-07-11, ultracode):** this system now covers ALL service pages +
> the dedicated trust pages in one build: application-software-engineering (prototype, built inline),
> enterprise-software-engineering, ai, modernization, PLUS NEW pages /how-we-work/ (process + quality +
> engagement-model substance) and /security/ (ISO 27001 / procurement audience). All drafted by a
> multi-agent workflow (draft -> adversarial claim-audit -> fix -> cross-page consistency), each page
> unique copy on the same system: SEO title-tag split (buyer vocabulary in title tag, brand term in H1),
> FAQPage + Service JSON-LD, hero micro-trust line, mid-page CTA after proof, one-business-day SLA close,
> signals-inline/substance-dedicated trust architecture. module.yaml: how-we-work + security routes
> ADDED (server restart required). P2 (per-page visuals) still pending metaphor alignment with Aamir.

> Agreed with Aamir 2026-07-11 (discussion-first, per working style). This plan governs the rebuild
> of `/services/application-software-engineering/` and becomes the PROTOTYPE for the other three
> service pages (enterprise / ai / modernization) once approved. The existing copy in
> `_ia/service-application-software-engineering.md` remains the voice/claims source; this doc
> redesigns the PRESENTATION and section structure.

## Why (the diagnosis)
- Current page = doctrine-compliant copy rendered as a wall of prose through the shared
  `service-detail.html` shim. No treatments, no sections, no proof. Boring, and unconvincing.
- Biggest substantive gap: ZERO proof on the page that owns the most proof on the site
  (RTL, Chemo, Sales Navigator, UpSport, Touchpoint are all application builds).
- Redundancy problem (Aamir): founder/safety/ISO blocks repeated on every service page hurt SEO
  (near-duplicate content, pages compete) and read as copy-paste.

## Governing decisions (agreed)
1. **Signals inline, substance dedicated.** Service pages carry COMPRESSED trust signals (one
   cred-line + links), never full founder/process/ISO sections. Substance lives at dedicated pages:
   /about/ (founder/team), /how-we-work/ (process + quality + ISO -- PAGE DOES NOT EXIST YET, see
   open inputs), /case-studies/ (proof + testimonials).
2. **No dedicated testimonials page** (industry evidence: they get no traffic and convert poorly).
   Social proof goes contextually next to claims; case studies remain the proof destination.
3. **Content-directory structure** for general pages with complex sections (like site/about/):
   one file per section, template consumes them. Applies to all service pages going forward.
4. **Metaphor language: the drafting room** (aligned before building, per design language):
   - Hero = "the blueprint that draws once" (extends home's svc-stage vignette for this service)
   - Build/Advise = a diptych (drafting-new vs inspecting-existing)
   - Depth closer = a cross-section (application layers, Foundry artifacts pinned per layer)
   All content REAL AND VISIBLE AT REST (no empty-on-hover); words in HTML/SVG never canvas;
   synchronous first draw; vary treatments per section.

## Page structure (content directory: site/application-software-engineering/)

| # | File | Section | Treatment | Keyword target (H2/body) |
|---|---|---|---|---|
| 1 | index.md (frontmatter) | Hero: H1 + lead + CTAs + MICRO-TRUST LINE + blueprint visual | SVG line-draw, completes once, whole at rest | title tag carries buyer terms (below) |
| 2 | index.md (body) | "Is this you" problem framing | compact numbered/prose, existing copy trimmed | "custom application", "outgrown spreadsheets/off-the-shelf" |
| 3 | ways.md | Build / Advise -- the page's spine | two-panel diptych, contrasting visual grammar | "custom software development, end to end" / "architecture review & advisory services" |
| 4 | proof.md | Proof strip: RTL + Chemo + Sales Navigator cards, real outcomes, links to case studies + ONE contextual quote | proof cards w/ real numbers at rest | "case studies", outcome phrases |
| 4b | (template) | MID-PAGE CTA after proof (conviction peak) | inline CTA band | -- |
| 5 | lifecycle.md | What happens after "yes": discovery -> architecture -> build -> ship -> support, with the client-visible deliverable at each stage | horizontal rail, REAL deliverables at rest (NOT empty numbered slabs -- that pattern was rejected) | "software development process" |
| 6 | engagement.md | How you can hire us (fixed-scope / T&M / dedicated team / advisory) | compact model cards | "engagement models", "dedicated development team" |
| 7 | ownership.md | You own the code + no lock-in + visible stack list | guarantee block + stack line | "IP ownership", "Go, Python, React, PostgreSQL" |
| 8 | trust.md | ONE cred-line: 27-yr founder (link /about/) + ISO w/ cert nos (link verify / how-we-work) + senior-only | single-line band, links | "ISO 9001 27001 software development" |
| 9 | depth.md | Depth closer: cross-section of an application's layers w/ Foundry artifacts pinned + verifiable links | SVG cross-section | "we build the layers under software" (brand) |
| 10 | specialized.md | Routing to AI / Modernization / Enterprise SE | compact 3-card row | internal links w/ descriptive anchors |
| 11 | faq.md | Honest FAQ (5-7 real questions) | accordion or plain list | long-tail: cost, ownership, timeline, "already have developers", when NOT to build |
| 12 | (template) | Final CTA close w/ expectation-setting line | existing CTA band + copy | -- |

## SEO plan
- **Title tag:** "Custom Application Development Services | ManiarTech" (buyer vocabulary; H1 stays
  the brand term "Application Software Engineering").
- **Meta description:** buyer terms + differentiators (senior-only, ISO, own the code).
- **H2s carry search phrases** (see table), H1 = brand category. One H1 only.
- **Structured data:** FAQPage JSON-LD (from faq.md) + Service/Organization schema in the template.
- **Internal links:** proof -> case studies; trust -> about + how-we-work; specialized -> sibling
  services; depth -> foundry pages. Descriptive anchor text everywhere.
- **No shared boilerplate** across service pages (each sibling page gets unique copy when its turn comes).

## CRO amendments (locked in after review)
1. Micro-trust line in the hero next to the CTA ("ISO 9001 & 27001 | senior engineers only | since 2010").
2. Mid-page CTA after the proof section.
3. Final CTA keeps risk-reversal ("free, no-obligation; a senior engineer reads it back with a
   ballpark and an honest take").
4. Scannability: every section has a keyword-bearing H2; bullets over paragraphs where possible.

## Template work
- `application-software-engineering.html` becomes a real template (currently a 1-line shim to
  service-detail.html), consuming the content directory the way `about.html` does.
- Includes: mid-page CTA band; JSON-LD injection; the three visuals (blueprint SVG, diptych,
  cross-section) as template partials/lib.
- Other three service pages STAY on the shim until this prototype is approved.

## Honesty guardrails for this page (Rule #1)
- No logo wall (no consented logo set). Named-clients line only where already public (Chemo, RTL).
- No industries-served grid (ICP not decided -- would be decoration).
- Proof numbers only the verified ones: 600+ forms -> 1 (RTL), ~15 years in production (RTL),
  live in production (Chemo), built in ~3-4 months / launching July 2026 (Sales Navigator -- no
  outcome claims until launched).
- Quote for proof strip: choose from `_inbox/testimonials.md` (Jeff Hines / Ashish Singh / Dimple
  Karnani are app-build-relevant; Peter Haid belongs to Touchpoint). Verbatim only.
- Engagement models section ships ONLY with Aamir-confirmed facts (see below).

## Inputs -- RESOLVED (Aamir, 2026-07-11)
1. **Engagement models (verbatim facts, calibrate in copy):** all shapes possible (fixed-scope,
   T&M, dedicated team, advisory) -- but the PRIMARY model is **building a dedicated team for
   complex projects** (one or more members, picked as highly suitable for that particular work);
   simpler projects and advisory take lighter shapes. Depends on availability of existing people;
   **in many cases work starts immediately** (senior engineer starts, then new team members are
   brought in as the project demands). Copy MUST read convincing, not fishy: lead with the primary
   dedicated-team story, present flexibility second; never "we do everything!" commodity framing;
   no invented minimums (none given).
2. **/how-we-work/ -- YES, create it.** Engagement-model SUBSTANCE lives there (plus process/
   quality/ISO); the service page keeps a compact engagement section linking to it.
3. **Estimator SLA -- SUPERSEDED 2026-08-11 (editorial review): the one-business-day promise is
   NOT operationally committed** (inbox ownership, absence coverage, escalation - none decided) and
   was REMOVED site-wide in `0708eae`. Canonical copy: "a senior engineer reviews it and responds."
   `scripts/seo/seo-check.mjs` FAILs on any response-time promise - do NOT restore a clock to any
   page until Aamir commits an SLA operationally and removes that gate. (Original note, kept for
   history: this line previously read CONFIRMED, from an early input round.)

## Build phases
- **P1:** content directory files (all sections except engagement.md if inputs pending) +
  real template + trust/micro-trust/CTA bands + title/meta/H2 keyword pass + JSON-LD. Page works
  with plain treatments.
- **P2:** the three visuals (blueprint hero draw-once; Build/Advise diptych; depth cross-section),
  each aligned on look before coding per working style.
- **P3 (later):** roll the system to enterprise / ai / modernization with per-page variation
  (Aamir hates uniform repetition -- same system, different expressions).

## ★ FIELD FINDING (2026-07-11, binary-verified on the running server) — forloop casing
**Pongo2 forloop variables in THIS Taj Mahal binary are CAPITALIZED (Go struct-field names):**
`{{ forloop.Counter }}`, `{% if not forloop.Last %}`, `forloop.First`, `forloop.Counter0`, etc.
The lowercase forms (`forloop.counter`, `forloop.last`) that the skill's ERRATA and book snippets
show render as EMPTY / always-false -> symptoms were empty loop counters and trailing commas in
JSON-LD arrays. Verified by fixing the prototype and re-rendering (counters -> 01..05, FAQPage JSON-LD
-> valid). USE CAPITALS in every service/trust page template. (The workflow was told lowercase and so
emitted the bug into security.html -> fixed 2026-07-11.)

## Taj Mahal gotchas that apply
- Body content must not contain `---` thematic breaks (breaks frontmatter parsing).
- After adding the content directory / template changes: restart tajmahal, `rm -rf .cache` if 500s.
- Server currently running on port 9000 (was 8085 in config, 9090 earlier this session).
