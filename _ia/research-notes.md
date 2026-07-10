# Research Notes — Products, Services, Open Source (verified facts for copywriting)

Gathered 2026-06-11 from maniartech.com, internetobject.org, github.com/maniartech,
Chrome Web Store, LinkedIn. Every claim in site copy should trace back to a line
here (or to client-provided material). TODO items = unresolved, ask client.

## Products

### Internet Object — flagship open source
- Schema-first, text-based, document-oriented data serialization format;
  designed to address JSON's flaws.
- **~40–60% smaller payloads, ~30% fewer tokens than JSON** — VERIFIED 2026-06: bytes reproducible
  live on play.internetobject.org (real parser, IO uncompressed vs minified JSON: 43.6/45.5/59.8% on
  the 3 sample datasets); tokens via the public io-bench repo
  (github.com/maniartech/InternetObject-vs-JSON-benchmark, GPT-4/cl100k_base), 27–30% on multi-record data —
  strong AI/LLM cost angle: token count affects inference cost.
- Schema separated from data → eliminates 40–50% key-repetition overhead;
  validation at parse time.
- Rich types: decimal/binary/hex/octal numbers, multiple string types, ISO-8601
  dates, Inf/NaN. Parsers read JSON natively. Comments + inline variables.
  Streaming-friendly.
- Implementations: TypeScript/JS (official, 50★), Python (official), specs repo,
  interactive Playground. IDE support/linters in development.
- Status: active development, early production adoption testing. Site: internetobject.org.

### Processious
- "Objective-oriented JSON based (low-code) Business AutoPilot platform that
  reduces organizational complexity."
- <!-- TODO: status (live/beta/in development?), demo URL, screenshots, target users -->

### Taj Mahal SSG
- Static site generator in Go; modular architecture (modules per site section),
  YAML config, Pongo2 templates, esbuild asset pipeline with tree-shaking.
- The new maniartech.com itself will run on it — usable as a live proof point.
- <!-- TODO: public availability? open source or internal? docs URL? -->

### Documentor AI
- Site: "AI-driven document development tool generating diverse document types
  from legal & technical to stories with a single prompt."
- Chrome Web Store has "DocuMentor AI – AI Learning Assistant": instant AI
  analysis of technical content, one-click personalized summaries, 100% local,
  privacy-first.
- <!-- TODO: are these the same product? Which positioning is current? -->

### Web Doodling
- "Creative JavaScript framework for HTML5 canvas-based drawing and animations."
- No public footprint found (no repo/site surfaced).
- <!-- TODO: status, URL/repo, or keep as Labs item rather than full product page? -->

### Tallery Gallery
- 360° media ecosystem / Media Asset Management for bloggers → large media orgs.
- Features (LinkedIn): cloud MAM + storage, tagging, backups; permission-based
  sharing & collaboration; 13,000+ scalable vectors; Shutterstock/Unsplash/Pexels
  integrations; Adobe Creative Suite compatibility; dynamic galleries/portfolios.
- tallery.gallery currently unreachable (ECONNREFUSED). <!-- TODO: live URL? status? -->

## Open Source (github.com/maniartech — 42 repos)
- **signals** (Go) — pub-sub event system — **325★**, MIT. The headline OSS number.
- **InternetObject-js** (TS) — 50★ · **gotime** (Go, date/time) — 42★
- **conductor** (Go, async/await orchestration) — 12★ · **vault** (IndexedDB micro
  storage) — 7★ · **idgen** (Rust CLI for UUID/NanoID/CUID/ULID/ObjectID) — 5★
- Also: printeer (URL→PDF, Apache-2.0), uexl-go (expression language parser),
  rb-parsers (Rust rule-based tokenizer), InternetObject-Playground.
- Languages across org: Go, Rust, TypeScript, Python, JS — genuine polyglot depth.
- Safe claims: "40+ open-source repositories", "signals: 325+ stars". Do NOT claim
  org-wide star totals without counting.

## Services (current site)
- Enterprise software development & process automation
- AI-driven innovation/development; legacy system modernization
- Stack: Python, Rust, Go, ReactJS, TypeScript · GCP, AWS, Docker, OpenAI ·
  PostgreSQL, MongoDB, Redis, Elasticsearch
- ISO 9001:2015 (quality) + ISO/IEC 27001:2022 (infosec) [VERIFIED from cert PDFs 2026-06; 27001 = 2022 NOT 2013]. Entity: Maniar Technologies Private Limited; registered Thane (Mira Road East), Maharashtra, India. Founded 2010,
  by Mohamed Aamir Maniar. Legal entity: Maniar Technologies Private Limited.
- 5 testimonials exist on current site. <!-- TODO: get text + permission -->

## Classification (per client, 2026-06-11)
- **Labs (research & open source):** Internet Object (research + OSS),
  Signals (OSS), Taj Mahal SSG (OSS, not yet published — used internally,
  powers maniartech.com v2), Web Doodling (internal for now → OSS;
  HTML5-canvas creative animations/applications).
- **Products (commercial):** Processious (process automation),
  Tallery Gallery (DAM/MAM), **Taj Mahal Spaces (managed hosting for
  Taj Mahal sites — NEW)**. More products to be shared by client.
- Open-core story: Labs open-sources the engine (Taj Mahal SSG),
  Products sells the platform (Taj Mahal Spaces).
- <!-- TODO: Documentor AI not classified by client — Products or Labs? -->

## Narrative implications
- "Most companies use technology. We make it" is fully defensible: an original
  data format w/ spec + multi-language SDKs, an SSG in Go, a canvas framework,
  an automation platform, 40+ OSS repos in 5 languages.
- Internet Object's token-efficiency claim ties products to the AI services
  story: "we engineer for the AI era down to the byte level."
- Taj Mahal powering the site itself = self-demonstrating credibility.
- Product statuses vary widely — product pages must be honest per-product
  (Open Source / In Development / Beta) to protect overall credibility.
