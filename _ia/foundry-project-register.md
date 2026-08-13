# Foundry project register (P0)

**Purpose.** One verified row per Foundry project, assembled BEFORE any page work, so that
every claim on a rebuilt page can be traced to something checked rather than remembered.
Directive: `Foundry reconstruction directive`, 2026-08-12.

**Method.** Facts below come from four sources, in this order of authority:
1. the project's own working tree on this machine (`E:/Projects/<project>`), including its
   LICENSE file, README, tests, benchmark harness and git HEAD;
2. the GitHub REST API for public visibility, SPDX licence and last push (queried 2026-08-12);
3. the npm registry for published packages (queried 2026-08-12);
4. live HTTP checks of every artifact URL the site points at.

Nothing here is inferred from the current website. Where a fact could not be established, the
field says so explicitly - it is never filled with a plausible guess.

**Reading the status fields.** Four independent axes, never collapsed into one label:
`maturity` (how finished), `availability` (who can obtain it), `licence` (what rights are
granted, present tense only), `adoption position` (whether we invite external use).
A project can be public source with no licence - that is `availability: public source` +
`licence: none granted` + `adoption position: not adoptable`, which is exactly UExL today.

---

## Summary

| Project | Type | Maturity | Availability | Licence (present) | Adoption |
|---|---|---|---|---|---|
| Internet Object | Standard + reference impls | Pre-1.0 (npm 0.2.1) | Public source + playground + npm | ISC (JS impl) | Adoptable, pre-1.0 caveat |
| UExL | Language / engine | Pre-1.0, publish-ready | Public source, no release | **None granted** | Not adoptable |
| signals | Go library | Stable, v1.3.1 | Public source + tagged release | MIT | Adoptable |
| Vault Storage | TS browser library | Stable, v2.0.1 | Public source + npm | MIT | Adoptable |
| gotime | Go library | Stable, v2.0.4 | Public source + tagged release | MIT | Adoptable |
| Processious | Platform (product) | Client production | Private | Proprietary | Commercial engagement |
| Taj Mahal SSG | Developer tool | Production-dogfooded | **Private** | None published | Not available |
| Booster | Developer tool | Production-dogfooded | Private | None published | Not available |
| Ordin | Workflow engine | In development | Private | Not decided | Not available |
| Indigo | Language | Active research | Private | Not decided (frontend BSD-3 noted) | Not available |
| GoCurl | Go library | Pre-1.0 | **Public source (CONFLICT - see below)** | MIT | **Ruling needed** |
| gowork | Developer tool | Pre-1.0 | Private | Apache-2.0 file present, unreleased | Not available |
| Documentor.AI | AI product | Early-stage | Private | Proprietary | Not available |
| Enterprise DAM | Product / service | Early-stage | Private | Proprietary | Managed service |

Standards without their own Foundry detail page (NITES, FUSE, AddressQL, PressML) are governed
by `/standards/`, which was rebuilt and gated in the 2026-08-11 programme. They are listed here
only where a Foundry page references them.

---

## Gate A - public, evidence-rich flagships

### 1. Internet Object

| Field | Finding |
|---|---|
| Type | Data-format standard with reference implementations |
| Source location | Public: `github.com/maniartech/InternetObject-js` (51 stars). Also public: `InternetObject-go` (0 stars), `InternetObject-py` (1 star). Local: `E:/Projects/internet-object/` (io-js, io-go, io-bench, InternetObject-Playground) |
| README/docs | `docs.internetobject.org` (200), `www.internetobject.org` (200). Local README-DEV.md, development-guidelines.md. JS tree last reviewed at local commit `1adb753` (2020-05-25); GitHub push 2026-07-14 - **the local checkout is far behind the public repo; re-clone before quoting code** |
| Real screenshots | None in repo. The Playground is a live React app - screenshot it from the running site, or better, link it |
| Runnable artifact | **`play.internetobject.org` (verified 200)** - strongest artifact in the whole Foundry. Build stamp `20260714`; default sample demonstrates a **recursive schema** (`reportingTo?: $employee`). npm `internet-object` v0.2.1 (verified, maintainer `maniartech`) - note the published package **does not load in Node** (~400 extensionless imports in `dist`); it works only through a bundler |
| Maturity | Pre-1.0. npm latest is **0.2.1** - the site's "Published" label is true of availability but overstates maturity |
| Availability | Public source, public package, public playground, public docs |
| Licence | **ISC** (GitHub SPDX and npm agree) for the JS implementation. `InternetObject-go` and `InternetObject-py` carry **no licence**. The **playground is AGPL-3.0** (its own footer and bundle) - a different licence from the library, and the page must not blur them |
| Operating evidence | Not claimed. No verified production deployment; do not assert one. **Date discrepancy to resolve:** the site says the project "dates to 2018"; the playground footer reads (c) 2019-present. Pick one and source it |
| Benchmark evidence | `io-bench/` exists locally (own harness, README + ARCHITECTURE.md + data). The site's "over 40% smaller / ~30% fewer LLM tokens" claims must be re-derived from this harness and stated with corpus, method and tokenizer, or dropped |
| Known limitations | Pre-1.0 API; Go and Python implementations are unlicensed and the Python one has had no commits since 2021; the published npm package cannot be imported by Node without a bundler; the playground's size badge **excludes the schema pane** (see the benchmark audit) |
| Private review | Not needed - everything material is public |
| Website deficiencies | Maturity conflated with availability ("Published"); headline compression/token numbers lack method beside them; the playground - the single best artifact - is not the page's centrepiece; sibling implementations' unlicensed state is unstated |
| Recommended representation | **Live playground embed or a real transformed specimen** (format explainer, component 5): the same document as JSON and as Internet Object side by side, with the schema pulled out, invariants named, plus a benchmark strip carrying method and corpus |

### 2. UExL

| Field | Finding |
|---|---|
| Type | Expression language + Go reference engine |
| Source location | Public: `github.com/maniartech/uexl-go`. Local: `E:/Projects/uexl/uexl-go` (HEAD `242ebb3`, 2026-07-19), plus `uexl-playground` (local only) |
| README/docs | README.md, LAUNCH_CHECKLIST.md, agents.md, compiler-vm-upgrade.md in the repo |
| Real screenshots | None. `uexl-playground` exists locally but is **not deployed** (`play.uexl.org` does not resolve) |
| Runnable artifact | **None public.** No npm package (`npm/uexl` 404). **`uexl.org` is an unrelated third party ("UEXL Institute") - never link it as ours** |
| Maturity | Pre-1.0, publish-ready. **No git tags, no release** |
| Availability | Public source (readable on GitHub), no release, no package |
| Licence | **None granted.** GitHub SPDX is null and there is no LICENSE file. Readable is not reusable |
| Operating evidence | Not claimed |
| Benchmark evidence | Substantial: `benchmarks/` (constant_load, excel_operators, performance, pipe, raw_pipe, unicode_builtins, value_microbench) plus a `results/` directory. The zero-allocation claim was already corrected in the Insights article to be toolchain-scoped and median-of-six with no discards - **reuse that exact framing, do not re-derive loosely** |
| Known limitations | Pre-1.0; no licence so it cannot be adopted; allocation figures are toolchain- and path-specific |
| Private review | Source is already readable; a walkthrough of the compiler/VM design is the useful offer |
| Website deficiencies | `license: "TBC (MIT likely)"` states an INTENDED licence - forbidden, must be present-tense "none granted"; "Publish-ready" reads as available; the four axes are collapsed |
| Recommended representation | **Compiler/runtime pipeline** (component 4) - source -> parser/AST -> compile -> validation gate -> bytecode -> VM result, with the refusal path drawn, plus a benchmark widget carrying toolchain, run count and central statistic |

### 3. signals

| Field | Finding |
|---|---|
| Type | Go library (typed event system) |
| Source location | Public: `github.com/maniartech/signals` - **331 stars, the most externally validated artifact we have**. Local: `E:/Projects/signals/signals` (HEAD `51f8bcf`, 2026-06-13). **DIVERGENCE (found 2026-08-13): the local tree is 59 commits AHEAD of origin/master.** Public v1.3.1 uses a `sync.RWMutex` core; the lock-free `atomic.Pointer` rewrite, the `bench/` baseline discipline, `ErrStopPropagation`, LIFO ordering, `MaxConcurrent` and the corrected README all exist ONLY locally. The public README is the old marketing one (unqualified 5.66ns, "other companies", and a Go Report Card badge that links to nanomsg/mangos, the wrong repo). **Pushing is Aamir's call** - until then the page may only cite v1.3.1 |
| README/docs | README + `bench/README.md`, `bench/baseline.txt`, `bench/lockfree-vs-baseline.txt` |
| Real screenshots | None; none appropriate - this is a library |
| Runnable artifact | Go module, importable. Tagged **v1.3.1** |
| Maturity | Stable, tagged v1.3.1 |
| Availability | Public source, public tagged release |
| Licence | **MIT** (LICENSE file and GitHub SPDX agree) |
| Operating evidence | Site says "used in production" - **must be qualified to OUR internal production** unless a client system can be named. No third-party adoption is verified; 331 stars is interest, not adoption |
| Benchmark evidence | Committed harness with a baseline and a lock-free comparison. Existing page already labels ~8 ns/zero-alloc as machine-specific guidance, not a guarantee - keep that |
| Known limitations | Not documented on the page; extract from README/tests |
| Private review | Not needed |
| Website deficiencies | Unqualified "used in production"; stars not used as the honest social signal they are; known limits absent; the honesty motif appears in the numbers section |
| Recommended representation | **Reproducible benchmark widget** (component 6) fed by `bench/`, plus a small architecture cutaway of the lock-free read path - the decisive design idea |

### 4. Vault Storage

| Field | Finding |
|---|---|
| Type | TypeScript browser-storage library |
| Source location | **Public: `github.com/maniartech/vault` (MIT, 7 stars).** The site currently links `github.com/maniartech/vault-storage`, which **404s** - the repo name is `vault`, the package name is `vault-storage`. Local: `E:/Projects/vault/vault` (HEAD `4896629`, tag v2.0.1) |
| README/docs | README.md + `docs/` (audited and corrected 2026-08-11; those corrections are still uncommitted in the vault repo) |
| Real screenshots | None; none appropriate |
| Runnable artifact | **npm `vault-storage` v2.0.1, licence MIT** (verified) |
| Maturity | Stable, v2.0.1 tagged |
| Availability | Public source + public npm package |
| Licence | **MIT** (LICENSE file, npm metadata and GitHub SPDX all agree) |
| Operating evidence | Not claimed |
| Benchmark evidence | Size claim (~1.48 KB gzipped) was verified during the Insights rebuild - reuse that figure and its method |
| Known limitations | Documented and already on the page: **backup export of encrypted data is decrypted at export time**. Keep it - it is the most credible sentence on the page |
| Private review | Not needed |
| Website deficiencies | **(a) the repo link 404s (twice, lines 7 and 84); (b) the test claim is false** - the page says "350+ browser tests - run in real Chrome and Firefox", but `karma.conf.cjs` line 79-81 has Firefox commented out; the verified figure is 355 executed / 354 passed, **Chrome only** |
| Recommended representation | **Architecture cutaway** of the Proxy + pending-operation map + middleware chain, and a code specimen contrasting the localStorage-shaped call with what it does underneath |

### 5. gotime

| Field | Finding |
|---|---|
| Type | Go library, reference implementation of NITES |
| Source location | Public: `github.com/maniartech/gotime` (44 stars). Local: `E:/Projects/gotime/gotime` (HEAD `2781a4d`, tag v2.0.4) |
| README/docs | README.md, RELEASENOTES.md |
| Real screenshots | None; none appropriate |
| Runnable artifact | Go module. Tagged **v2.0.4**. **The npm package named `gotime` belongs to `karlhanks`, not us - never cite it** |
| Maturity | Stable, v2.0.4 |
| Availability | Public source, public tagged release |
| Licence | **MIT** |
| Operating evidence | Not claimed |
| Benchmark evidence | `*_bench_test.go` files present (business_calendar, calendar_math and others). The "100% test coverage" claim must be re-measured from `go test -cover` before it is repeated |
| Known limitations | Not yet documented |
| Private review | Not needed |
| Website deficiencies | "100% test coverage" is unverified as stated; relationship to the NITES specification is asserted but not shown |
| Recommended representation | **Format explainer** (component 5) - the fragmented date/time formats NITES replaces, side by side, with gotime as the executable proof |

---

## Gate B - production and platform evidence

### 6. Processious

| Field | Finding |
|---|---|
| Type | Process-automation and application platform (product) |
| Source location | Private. Local: `E:/Projects/processious` (prcs-v2, src, research, rpm) |
| README/docs | Internal only. `chemo-workflow-large.drawio` is a real workflow artifact worth mining for the architecture cutaway |
| Real screenshots | **None captured yet.** This is the biggest evidence gap in Gate B - the strongest available proof is the live client laboratory system, and any capture needs irreversible masking of client data plus Aamir's release approval |
| Runnable artifact | None public. Live client system, not publicly reachable |
| Maturity | **Client production** - carries the Chemo Test Laboratory system |
| Availability | Private (commercial engagement) |
| Licence | Proprietary |
| Operating evidence | Strongest in the Foundry: a live accredited laboratory runs on it. Wording must stay inside what `/case-studies/chemo/` already supports (NABL accreditation / government approval / ISO certification stated separately - the FDA claim was removed in the 2026-08-11 sweep and must not return) |
| Benchmark evidence | None; not the relevant proof for this project |
| Known limitations | To be drafted from internal docs |
| Private review | Architecture and operating walkthrough for qualified customers |
| Website deficiencies | No real interface evidence; the platform's controls (state machine, permissions, audit) are described in prose rather than shown |
| Recommended representation | **State/workflow simulator** (component 7) driven by the real Chemo workflow rules, plus an **annotated interface plate** once a masked capture is approved |

### 7. Taj Mahal SSG

| Field | Finding |
|---|---|
| Type | Developer tool (Go static-site generator) |
| Source location | **Private - `github.com/maniartech/tajmahal` is NOT public (verified 404 via API).** Local: `E:/Projects/tajmahal/src` (HEAD `166dd1d`, 2026-07-21) |
| README/docs | Internal. The `tajmahal-ssg` skill in this workspace is effectively its documentation |
| Real screenshots | None needed - the artifact is this website |
| Runnable artifact | None public. **This site is the artifact** |
| Maturity | **Production-dogfooded** - runs maniartech.com and live client sites |
| Availability | **Private** |
| Licence | **None published.** Local tree has no LICENSE file |
| Operating evidence | This website, plus a client laboratory's public site. Verifiable by inspection of the rendered result |
| Benchmark evidence | A `build-perf-merged-20260718` tag exists locally, suggesting build-performance work; **no published harness** - do not quote build numbers without one |
| Known limitations | Startup-only routing/frontmatter changes; cache must be cleared after content-directory edits (both learned repeatedly during this build) |
| Private review | Architecture and operating workflow walkthrough |
| Website deficiencies | The four axes are collapsed into "Internal \| OSS planned"; `license: "TBC"` states an intention, not a present grant |
| Recommended representation | **Architecture cutaway** - module -> content directory -> template resolution -> render -> static output, with the startup-only boundary drawn, since that boundary is the design's real consequence |

### 8. Booster

| Field | Finding |
|---|---|
| Type | Developer tool (dev-environment orchestrator) |
| Source location | Private. Local: `E:/Projects/booster` (HEAD `141e609`, 2026-08-07). **Contains `IP-CONFIDENTIAL.md` - read it before publishing anything about this project** |
| README/docs | README.md, agents.md, plus a session log |
| Real screenshots | None found. It is a CLI: the honest visual is real terminal output, not a mockup |
| Runnable artifact | None public (`booster.exe` is a local build) |
| Maturity | Production-dogfooded across our own projects |
| Availability | Private |
| Licence | None published |
| Operating evidence | Used across ManiarTech projects; a `booster-runners-test.yaml` and session log exist as internal evidence |
| Benchmark evidence | None published. "New machine productive in minutes rather than days" is currently unsourced - either measure it or drop it |
| Known limitations | To be drafted |
| Private review | Config model and orchestration walkthrough |
| Website deficiencies | Unsourced time-saving claim; honesty motif at line 64; no real artifact |
| Recommended representation | **Real config specimen + captured terminal session** - one `booster.yaml` beside the stack it brings up. Note the IP-confidential constraint first |

### 9. Ordin

| Field | Finding |
|---|---|
| Type | Workflow-automation engine |
| Source location | **FOUND 2026-08-13 (Aamir):** WSL `//wsl.localhost/Ubuntu/home/aamir/projects/processious/ordin` - HEAD `f578f4f` (2026-06-09), remote `github.com/maniartech/ordin` (**private** - API 404) |
| README/docs | README.md (component map + plugin-loader sequence), TODO.md, docs/, specs/, examples/ (helloworld, ping-server, chemo-workflow, scheduler) - real workflow YAMLs with `!expr` dynamic values |
| Real screenshots | None |
| Runnable artifact | None |
| Maturity | In development |
| Availability | Private |
| Licence | **Fair Code model DECLARED in-tree** (LICENSE file referencing faircode.io) - but terms are not finalised and nothing is published, so no rights exist for anyone today. The rebuilt page states exactly that |
| Operating evidence | None. Do not imply any |
| Benchmark evidence | None |
| Known limitations | In development; API unstable |
| Private review | Design walkthrough, if Aamir approves |
| Website deficiencies | Licence stated as if decided; the page's "own sample flow" figure needs verification against the current repo |
| Recommended representation | **State/workflow simulator** or a real YAML workflow specimen with its execution trace - once the source is located and verified |

---

## Gate C - research and internal tooling

### 10. Indigo

| Field | Finding |
|---|---|
| Type | Language (Go superset) |
| Source location | Private - `github.com/maniartech/indigo` NOT public. Local: `E:/Projects/indigo/indigo` (HEAD `c1b1841`, 2026-08-09 - actively developed) |
| README/docs | Local; a `LICENSES` directory exists (**inspect: which components, which licences**) |
| Real screenshots | None; none appropriate |
| Runnable artifact | None public |
| Maturity | Active research, pre-1.0 |
| Availability | Private |
| Licence | Not decided. Page says "TBC (frontend BSD-3)" - resolve from the `LICENSES` directory before publishing anything |
| Operating evidence | None |
| Benchmark evidence | None published |
| Known limitations | Pre-1.0 language; no release; no stability commitment |
| Private review | Compiler design walkthrough |
| Website deficiencies | Licence field mixes decided and undecided; the "no output is better than wrong output" contract is asserted but never demonstrated |
| Recommended representation | **Compiler pipeline with the refusal path** (component 4) - the contract is about what the compiler REFUSES to emit, so the refusal branch is the page |

### 11. GoCurl - **CONFLICT, needs Aamir's ruling before the page is touched**

| Field | Finding |
|---|---|
| Type | Go library + CLI (curl-ergonomic HTTP client) |
| Source location | **`github.com/maniartech/gocurl` IS PUBLIC** - verified via API: MIT licence, ~1.5 MB, pushed 2026-06-21, created 2024-08-17, with full source (api.go, body.go, circuit_breaker.go), tests, benchmarks, CHANGELOG, CONTRIBUTING, SECURITY, ROADMAP, VISION. Local: `E:/Projects/go-libs/gocurl` (HEAD `8283650`, 2026-07-21, MIT LICENSE present) |
| README/docs | Public README, CHANGELOG, ROADMAP, VISION, CONTRIBUTING, SECURITY |
| Real screenshots | None; none appropriate |
| Runnable artifact | Public Go module (untagged) |
| Maturity | Pre-1.0, no tags. Production-dogfooded internally |
| Availability | **Public source** (contradicts both the current page and the directive) |
| Licence | **MIT** - present in the public repo and locally |
| Operating evidence | Internal use; not independently verifiable |
| Benchmark evidence | `alloc_budget_test.go`, `bench_fairness_test.go`, `bench_roundtrip_test.go`, `benchmark_test.go`, `benchcmp` in the public repo - a real harness |
| Known limitations | Pre-1.0, untagged, flag coverage incomplete per the current page |
| Private review | Not applicable if the repo stays public |
| Website deficiencies | **The page states a falsehood**: "per our link-dark rule there is no repository link here until the day there is a public repository to read" - there is one, and has been since at least June 2026 |
| **Ruling needed** | The directive instructs labelling GoCurl "Internal ... the source is private". **That is contradicted by the evidence.** Either (a) the public repo is intended - the page should say public source, MIT, pre-1.0, and link it; or (b) it was pushed ahead of readiness - it should be made private first, and only then does the directive's wording become true. I have not applied either, because both are publication decisions. The false sentence has been neutralised in the meantime |
| Recommended representation | **Code comparison specimen** - the curl command and the Go call side by side, which is literally the project's thesis |

### 12. gowork

| Field | Finding |
|---|---|
| Type | Developer tool (Go workspace CLI) |
| Source location | Private - `github.com/maniartech/gowork` NOT public. Local: `E:/Projects/go-libs/gowork` (HEAD `cb22141`, 2026-07-03) |
| README/docs | Local only |
| Real screenshots | None; CLI - terminal capture is the honest form |
| Runnable artifact | None public |
| Maturity | Pre-1.0 |
| Availability | Private |
| Licence | **Apache-2.0 file present in the local tree but nothing is published** - so no licence is granted to anyone today |
| Operating evidence | Internal use in multi-module repos |
| Benchmark evidence | None |
| Known limitations | Pre-1.0; unreleased |
| Private review | Walkthrough |
| Website deficiencies | Honesty motif at line 56; no licence field at all, though a licence file exists locally - state present availability, not the file |
| Recommended representation | **Command-surface specimen** - the real `gowork` commands against the raw `go work` equivalent |

### 13. Documentor.AI

| Field | Finding |
|---|---|
| Type | AI document platform (product) |
| Source location | Private. Local: `E:/Projects/documentor` (substantial: accounts, autocomplete, handoff and tracker docs) |
| README/docs | Internal implementation trackers and handoff analyses |
| Real screenshots | **None captured.** A real interface exists locally - a masked capture is feasible and would be the strongest evidence, subject to approval |
| Runnable artifact | None public |
| Maturity | **Early-stage, in development. Not a customer deployment** (matches the Applied AI page ruling - keep the two consistent) |
| Availability | Private |
| Licence | Proprietary |
| Operating evidence | **None.** Must not be presented as operating |
| Benchmark evidence | None |
| Known limitations | Early-stage; no availability commitment |
| Private review | Demonstration, if Aamir approves |
| Website deficiencies | The page describes the product as though it were available; the maturity qualification that the Applied AI page carries is absent here |
| Recommended representation | **Architecture cutaway** of grounding: sources -> knowledge base -> drafting agent -> cited document, with the citation boundary drawn - matching the Applied AI page's grounding model |

### 14. Enterprise DAM (Tallery Gallery)

| Field | Finding |
|---|---|
| Type | Product offered as a managed service |
| Source location | Private. Local: `E:/Projects/tallerygallery` (tg, tg-container, tg-webclient, plus zipped snapshots) |
| README/docs | Internal |
| Real screenshots | A web client exists locally (`tg-webclient`) - a masked capture is feasible |
| Runnable artifact | None public |
| Maturity | Early-stage |
| Availability | Private; offered as a managed service |
| Licence | Proprietary |
| Operating evidence | None verified. "Offered today as a managed Enterprise DAM service" is a commercial position, not operating evidence - keep them distinct |
| Benchmark evidence | None |
| Known limitations | Early-stage |
| Private review | Demonstration |
| Website deficiencies | Early-stage maturity and managed-service availability are blurred into one impression of a running product |
| Recommended representation | **Annotated interface plate** once a masked capture is approved; otherwise an architecture cutaway |

---

## Cross-cutting findings

1. **The strongest Foundry evidence is runnable, not visual.** `play.internetobject.org` is the
   single best artifact we own, and the current page does not lead with it. There are almost no
   product screenshots anywhere in the source trees; the private products (Processious,
   Documentor, DAM) each need a deliberate, masked capture that does not exist yet.
2. **Two dead or wrong public links** were found: the Vault Storage repo URL 404s, and the
   Foundry pages have no gate that would have caught it. External links are not crawled by
   `seo-check.mjs` - P1 should add an artifact-resolution gate.
3. **Three licence fields state intentions rather than present grants** (UExL "TBC (MIT likely)",
   Taj Mahal "TBC", Indigo "TBC (frontend BSD-3)"), and Ordin's page states a licensing model
   that has not been decided.
4. **No third-party adoption is verifiable anywhere.** signals has 331 stars and gotime 44 -
   that is interest, not adoption, and neither may be stated as use.
5. **The honesty motif survives in the Foundry** (booster, gocurl, gowork, signals,
   tajmahal-ssg, vault-storage, foundry hub, products hub) - the Services sweep did not reach
   this module.

## Open questions for Aamir

1. **GoCurl publication (blocking that page only).** The public MIT repo contradicts the
   directive's "source is private" wording. Which is intended?
2. **Screenshot approval and masking.** Processious, Documentor.AI and Enterprise DAM all need
   captures that do not exist. Who approves the masked exports, and is the Chemo client
   interface usable at all?
3. **Booster IP constraint.** `IP-CONFIDENTIAL.md` sits in the Booster repo. What may be said?
4. **Ordin source location** could not be found on this machine.
5. **Internet Object maturity.** npm is at 0.2.1 - may the page say pre-1.0 plainly?
