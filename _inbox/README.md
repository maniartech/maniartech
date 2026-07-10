# _inbox — Project & Service Dossiers (collection stage)

Deep, sourced notes — one `.md` per project/service. NOT site pages yet.
Once the catalog is complete, these become `_ia/labs/*`, `_ia/products/*`,
and `_ia/services/*`. Each dossier ends with "Open questions for Aamir".

> ## ⭐ READ FIRST before ANY client-facing material: [PRESENTATION-DOCTRINE.md](PRESENTATION-DOCTRINE.md)
> (canonical "how to present ManiarTech" — governs website, sales decks, proposals, LinkedIn,
> pitches). Mantra: **"Their safety first. Our brilliance last. Every claim verifiable."** Paired
> with [customer-lens-review.md](customer-lens-review.md) (the Skeptic Test + root-cause diagnosis).
>
> **★ SINGLE CONSOLIDATED REFERENCE:** [PROJECT-CANON.md](PROJECT-CANON.md) — everything
> Aamir shared + every decision (final states) + the reasoning behind each recommendation,
> reconstructed from the full build-session transcript (2026-06-28). Read this to get fully
> caught up without re-reading every dossier.
>
> **★ HANDOVER CHECKLIST (what Aamir still needs to provide):** [INPUTS-FROM-AAMIR.md](INPUTS-FROM-AAMIR.md)
> — every site input gated on Aamir, tiered (launch-blockers → sharpeners), hand over one at a time.
>
> **If a session corrupts:** [RECOVERY.md](RECOVERY.md) — durable layers + the repeatable
> recovery procedure (how the 2026-06-28 recovery was done).
>
> **START HERE after any compaction:** [PROJECT-STATUS-AND-INPUTS.md](PROJECT-STATUS-AND-INPUTS.md)
> — roadmap, IA build directives, consolidated pending inputs, key conclusions.
> ⚠️ **`_ia/` is a STALE early draft** (predates the full catalog + strategy) — rebuild it,
> don't trust it. Strategy docs: REPORT-maniartech-lab · TRUST-STRATEGY · DISTRIBUTION-STRATEGY
> · RECONCILIATION · price-estimator.

## Labs (research / open source)
| Project | Dossier | Status |
|---|---|---|
| Internet Object | [internet-object.md](internet-object.md) | ✅ collected |
| UExL (expression language *standard*) | [uexl.md](uexl.md) | ✅ collected · 🟢 **PUBLISH-READY / in queue** (datetime+builtins+stdlib finalized; pending license+public-API+CI) · multi-lang standard (impl-first) · ✅ benchmarks **re-run & verified** (fastest on string/func/map, tied basic, 0-alloc; upgraded playground w/ bytecode+benchmark) |
| xlib (Excel fns for Go; UExL stdlib) | [xlib.md](xlib.md) | ✅ collected · ⚠️ publication TBC |
| signals (Go event system) | [signals.md](signals.md) | ✅ collected · ✅ PUBLISHED ~325★ (v1.4 soon) |
| Conductor/Orchestrator (Go task orchestration) | [conductor-orchestrator.md](conductor-orchestrator.md) | ✅ collected · ⚠️ under revamp ("don't use yet"), name TBD |
| gowork (Go workspace CLI) | [gowork.md](gowork.md) | ✅ collected · ⚠️ internal now, OSS later |
| gocurl (curl-ergonomic Go HTTP client) | [gocurl.md](gocurl.md) | ✅ collected · ⚠️ internal now, OSS later |
| **Indigo (Go superset language → expert Go)** | [indigo.md](indigo.md) | ✅ collected · ⭐ FLAGSHIP · pre-1.0; status TBC |
| vault-storage (browser storage) | [vault.md](vault.md) | ✅ collected · ✅ PUBLISHED v2.0.1 |
| printeer (web→PDF/PNG) | [printeer.md](printeer.md) | ✅ collected · ⚠️ partially published (overhaul WIP) |
| gotime (Go date/time) | [gotime.md](gotime.md) | ✅ collected · ✅ PUBLISHED v2.0.3 (new ver soon) |
| NITES (date/time format standard) | [nites.md](nites.md) | ✅ collected · research, finalization pending |
| FUSE / FuseAPI (realtime API protocol) | [fuseapi.md](fuseapi.md) | ✅ collected · research, design-phase (spec now, framework later) |
| AddressQL (URL-native query language) | [addressql.md](addressql.md) | ✅ collected · research/standard (v1 spec), internal-proven; lib later |
| Web Doodling (canvas/creative-coding) | [webdoodling.md](webdoodling.md) | ✅ collected · ⚠️ under dev (playground soon) |
| MDKit (markdown toolkit ecosystem) | [mdkit.md](mdkit.md) | ✅ collected · ⚠️ internal now, OSS (MIT) later |
| Taj Mahal SSG (Go static-site framework) | [tajmahal-ssg.md](tajmahal-ssg.md) | ✅ collected · ⚠️ OSS soon; powers maniartech.com + 10+ sites |
| (wider GitHub org, 40+ repos) | — | ⏳ pending |

**Labs collection effectively COMPLETE (17 projects). Also: [price-estimator.md](price-estimator.md)
(primary CTA + growth engine).**

## Products (commercial / service-powering) — NEXT PHASE
> Aamir (2026-06): the remaining projects are **products that power ManiarTech's
> services** (enterprise dev, process automation). Labs/standards collection is DONE.
| Product | Dossier | Status |
|---|---|---|
| **Processious** — Business Process Automation + Enterprise Systems/ERPs | [processious.md](processious.md) | ✅ collected · ⭐ FLAGSHIP PRODUCT · **V1 LIVE IN PRODUCTION** (customer + internal); V2 in dev (Go re-arch base); V3 (no-code) planned |
| **Ordin** — Process Orchestrator / workflow engine | [ordin.md](ordin.md) | ✅ collected · 🚧 in development (core infra done, "not best-in-class yet" per own roadmap) · **fair-code** (n8n-style) · ⛔ pitch-deck is FABRICATED placeholder (quarantine) · resolve naming vs conductor/Orchestrator |
| **Tallery Gallery** — collaborative DAM/MAM | [tallery-gallery.md](tallery-gallery.md) | ✅ collected · 🚧 in development (V1 launched & failed/COVID — PRIVATE; V2 rebuild, server ~70–80%, client by 2nd dev). Django 6/PostgreSQL/ninja. Strong rigor + team signals. |
| Taj Mahal Spaces — managed Taj Mahal hosting | — | ⏳ pending |
| Booster (dev-env orchestrator) | [booster.md](booster.md) | ✅ collected · ⚠️ proprietary now · DIRECTION = future **enterprise open-core product** (OSS core + enterprise edition); NOW = capability/dogfood proof in Labs, no product page. Gate: define the "and much more" differentiator. |
| **Documentor.AI** — "vibe document development" AI platform | [documentor-ai.md](documentor-ai.md) | ✅ collected · ✅ CLASSIFIED = **Product (AI venture)**, NOT Labs · 🚧 post-POC, seeking investors · flagship AI-engineering proof · agentic + RAG (LangGraph/pgvector) |
| **Growthicious** — AI content-strategy / authority-building platform | [growthicious.md](growthicious.md) | ✅ collected · 🟡 **PLANNING stage** (concept+SRS, nothing built) · product + future service · recommend HOLD off public site · pricing/testimonials in docs = illustrative only |
| (more — Aamir to share) | — | ⏳ pending |

**Note:** Processious/Tallery/Taj Mahal Spaces have public sites + LinkedIn (researched
earlier — see research-notes.md). Ordin is new. These products are the COMMERCIAL/services
layer; the Labs/standards/tooling underpin them (e.g. UExL/xlib → Processious;
conductor → Ordin?).

## Services
| Service | Dossier | Status |
|---|---|---|
| **Business (Process) Automation & Integration** — ⭐ MAIN service | [service-business-process-automation.md](service-business-process-automation.md) | ✅ collected · flagship · **method = "The ManiarTech Keystone Method"** (lockup, not bare "Keystone") · consultative/understand-first; proof = Processious + Ordin + Engage + white papers + ISO |
| **Enterprise Digital Asset Management (DAM)** — on Tallery Gallery framework | [service-enterprise-dam.md](service-enterprise-dam.md) | ✅ collected · service backed by Tallery Gallery framework (parallels BPA↔Processious); honest "framework not live SaaS" framing |
| **AI-Driven Innovation & Development** | [service-ai-engineering.md](service-ai-engineering.md) | ✅ collected · proof = Documentor (agentic+RAG) + AI Estimator (pairs AI-service↔Documentor like BPA↔Processious) |
| **Legacy System Modernization** | [service-legacy-modernization.md](service-legacy-modernization.md) | ✅ collected · de-risk/incremental method; dogfood proof (we modernize our OWN systems: Tallery, Processious) |
| **Transition to Golang ecosystem** | [service-golang-transition.md](service-golang-transition.md) | ✅ collected · specialization of Legacy Mod · ⭐ unmatchable proof (authored Go ecosystem + Indigo); honest polyglot framing |
| **Custom Software Engineering** (build any app + architecture advisory) — was "Enterprise Software Development" | [service-custom-software-engineering.md](service-custom-software-engineering.md) | ✅ collected · the broad/umbrella service · proof-led (portfolio = ceiling); 2 pillars Build+Advise; ⭐ real example = **Sales Navigator** (real-estate, end-to-end, in-progress; = Booster-screenshot project, scrub names) |

| **Technology Partnership** (ManiarTech as technology co-founder) | [service-technology-partnership.md](service-technology-partnership.md) | ✅ collected · build-WITH-you (equity/shared-risk, not fee) · ⚠️ NO completed venture yet (selective/emerging) · proof = own ventures + venture-grade rigor · ⛔ Love-and-Beyond ref doc is CONFIDENTIAL (never publish/name) |

**Services set COMPLETE (7):** Custom Software Engineering (umbrella) · Business Process
Automation/Keystone (flagship) · Enterprise DAM · AI-Driven Innovation · Legacy Modernization ·
Transition to Go · Technology Partnership. PATTERN: most are backed by an owned framework/proof.

**Workflow:** Aamir shares one at a time → I research (repo + web) → write
dossier → log open questions. Build `_ia/` only after the catalog is covered.

**Content/strategy sources also in `_inbox/`:** [team.md](team.md) (the real team/people
composition + honesty rules — staff vs consultants vs BD partner; supersedes the stale website
photo), [founder-bio.md](founder-bio.md) (verified
27yr founder story + maker-ethos/Bansuri + ISO rarity), [values-how-we-work.md](values-how-we-work.md)
(lived values as checkable behaviors incl. ethics line, NOT a generic values page),
[growth-channel-partnerships.md](growth-channel-partnerships.md) (post-site growth: BD/agency
delivery partners, 2 business models + visibility tension, OSS-inbound, ethics screen, sequencing).

**See [RECONCILIATION.md](RECONCILIATION.md)** — consolidated register of all flagged
residues (naming, license, version/status, docs, confidentiality) to clean up during
`_ia` build so the site presents a consistent, trustworthy face.

## 🔑 Cross-cutting narrative — "Standards authored at ManiarTech"
**FIVE** research projects, each meant to become a **universal, multi-language
standard** (spec + implementations across languages) — PLUS **Indigo, a language**:
- **Internet Object** — data serialization (spec-first; TS/Py parsers + playground live)
- **NITES** — date/time format syntax (spec-first; GoTime is the published reference impl)
- **UExL** — expression language (impl-first/reverse: Go impl ~ready, spec to follow)
- **FUSE / FuseAPI** — realtime/reactive API protocol (spec-now/design-phase; Go ref impl later)
- **AddressQL** — URL-native, backend-neutral query language (v1 spec; Go ref impl, internal-proven; JS/Rust portability specs written)
- **Indigo** — ⭐ a Go superset LANGUAGE (TypeScript-for-Go); the crown of the ecosystem
Dedicated "ManiarTech Standards / Research / Languages" hub page strongly warranted — Indigo headlines.

This trio is the proof of "Most companies use technology. **We make it.**" A firm that
authors standards, not just consumes them. Use as the spine of the Labs section.
Also a recurring **honest-engineering** thread (proven, reproducible, idiomatic
refactors): signals v1.4, gotime v2, xlib purity, UExL safe semantics.
