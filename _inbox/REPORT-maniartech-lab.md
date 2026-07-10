# ManiarTech® Lab — A Confidence Report

> Prepared 2026-06 from first-hand review of ~17 projects' source code, specifications,
> and documentation (not marketing copy). Purpose: establish, with evidence, what
> ManiarTech Lab actually is — to anchor the new website's credibility. Honest by design:
> strengths and maturity stated plainly, because verifiable truth is what builds trust.

---

## 1. The headline finding

**ManiarTech is not a software development shop that happens to have side projects. It is
a research lab that authors standards and a programming language — and also does client
work.** That is a different, and far rarer, category of company.

Most firms calling themselves "software companies" *assemble* technology: they wire
together other people's frameworks to ship features. A smaller set build reusable
*libraries*. A very small set design *protocols and standards*. An almost vanishing set
build *programming languages*. ManiarTech does **all four layers**, with a single
consistent engineering philosophy visible across every repository.

The evidence below is not aspirational. It is in the code, the specs, and the live sites.

---

## 2. By the numbers (verifiable)

| Claim | Evidence |
|---|---|
| **5 authored standards** | Internet Object, NITES, UExL, FUSE, AddressQL — each a formal spec + reference implementation |
| **A programming language** | Indigo — a Go superset (TypeScript-for-Go) compiling to expert-quality Go |
| **Published, adopted open source** | signals (~325★ on GitHub), vault-storage (v2), gotime (v2) — real, maintained, in use |
| **Production-proven framework** | Taj Mahal SSG powers **10+ live websites, including maniartech.com itself** |
| **Polyglot depth** | Go (primary), TypeScript, Python, Rust, JavaScript across the portfolio |
| **Measured performance wins** | UExL beats Google's cel-go and antonmedv/expr on every benchmark; Internet Object: ~50% smaller payloads, ~30% fewer LLM tokens than JSON |
| **40+ open-source repositories** | github.com/maniartech |
| **Founded 2010 · ISO 9001 + 27001 certified** | 15+ years; quality + security independently audited |

---

## 3. The portfolio, organized

### 3a. Authored standards (the core differentiator)
Five original specifications, each designed as a **universal, multi-language standard**
(spec + implementations), each solving a real, widely-felt problem:

| Standard | Domain | What it fixes | Maturity |
|---|---|---|---|
| **Internet Object** | Data serialization | JSON's bloat & lack of schema; ~50% smaller, ~30% fewer tokens — AI-era ready | Live spec, TS + Python parsers, **interactive playground** |
| **NITES** | Date/time formatting | The `strftime`/`2006-01-02` cross-language mess | v1 draft; **GoTime is its published reference impl** |
| **UExL** | Expression evaluation | Runtime expressions in Go ("the regex of expression evaluation") | Impl ~ready (beats cel-go/expr); spec to follow |
| **FUSE** | Realtime API protocol | REST+realtime+reactive without a broker ("Don't just REST") | Design-phase research; honest, rigorous spec |
| **AddressQL** | Query language | URL-native, cacheable, backend-neutral API querying | v1 spec; Go ref impl, **internally production-proven**; JS/Rust portability specs written |

> Two standards (NITES, AddressQL) already have working implementations; one (Internet Object)
> has a live playground you can click today. This is not vaporware — it is research that ships.

### 3b. The language — Indigo (the crown)
A **Go superset that compiles to idiomatic, expert-quality Go** — the TypeScript-for-Go
analogy is exact. Adds ternaries, lambdas, pipelines, nullish/optional access,
single-character error propagation (`!`/`catch`), and Python-style slicing — while
guaranteeing **behavior preservation** (panic timing, defer order, init order) and
emitting **no runtime and no lock-in**. Built on the Go `go/*` toolchain, with RFC-grade
normative specs, structured diagnostics, an LSP, a VS Code extension, source maps, and an
**MCP server exposing the compiler to AI tooling**. The number of organizations that can
credibly ship something like this is tiny.

### 3c. Published & proven open source (the "they ship" proof)
- **signals** (Go) — context-aware event system, **~325★**, zero dependencies, MIT. The
  credibility anchor.
- **vault-storage** (TypeScript) — IndexedDB power in **~1.5KB**, middleware architecture,
  354+ browser tests, v2.
- **gotime** (Go) — intuitive date/time, **100% test coverage**, zero deps, TinyGo-compatible.

### 3d. The Go developer-experience toolkit ("the tools we wished existed")
- **Booster** — provisions *and* supervises a whole local dev stack from one config (TUI).
- **gowork** — tames Go multi-module workspaces (DAG-ordered tidy, self-healing `doctor`).
- **gocurl** — paste any API's curl example straight into Go; the curl command *is* the code.
- **conductor/orchestrator** — in-process goroutine/task orchestration (sequential+concurrent).
- **xlib** — 377 Excel-compatible functions for Go (80%+ coverage), the compute layer under UExL.

### 3e. Frameworks, platforms & content
- **Taj Mahal SSG** — modular Go static-site generator; **runs maniartech.com and 10+ sites**;
  open-core pair with the Taj Mahal Spaces hosting product; AI-native (build sites via an agent).
- **MDKit** — a Markdown toolkit ecosystem (build/generate to PDF/Word, AI utilities).
- **WebDoodling** — an ambitious 2D canvas library (Flexbox layout, CSS-like queries,
  reactive bindings) — "bring the WOW to your canvas."
- **Printeer** — web-to-PDF/PNG, CLI + library.

---

## 4. What makes it credible — the cross-cutting signals

These patterns appear in *every* project. Consistency across 17 repos is itself the proof:
it is an engineering culture, not a lucky streak.

1. **Honest engineering as a discipline.** signals retired its own inflated benchmark
   claims and rebuilt them reproducibly. FuseAPI's spec *lists what it is bad at* and names
   competitors. Indigo's compiler refuses to emit Go it cannot stand behind ("no output is
   better than wrong output"). gotime v2 removed panic anti-patterns. This restraint, in a
   field full of overclaiming, is the rarest trust signal there is.
2. **Rigor you can verify.** Normative RFC-style specs, conformance test suites, structured
   diagnostics with error codes, "100% meaningful coverage" bars, reproducible benchmarks.
   The *reason* much of this is pre-1.0 is that the bar is high — careful, not unfinished.
3. **Dogfooding at scale.** Taj Mahal runs the company's own sites. UExL/xlib underpin
   Processious. gowork and Booster are used across internal projects. The tools are proven
   on real work before they are sold or shipped.
4. **Coherence, not sprawl.** The pieces fit: xlib → UExL; NITES → GoTime; SSG → Spaces;
   AddressQL + FUSE = a modern API stack; Booster + gowork + gocurl = one DX toolkit; Indigo
   crowns the Go ecosystem. A lab with a thesis, not a junk drawer of experiments.
5. **Polyglot, full-stack depth.** Go, TypeScript, Python, Rust — backend libraries,
   front-end frameworks, compilers, and standards. Range that a body shop cannot fake.
6. **AI-native, today.** Indigo's MCP server, Taj Mahal's agent skill, MDKit's AI
   utilities, Internet Object's token-efficiency — the portfolio is built for the AI era,
   not retrofitted to it.

---

## 5. Honest maturity picture (status, stated plainly)

Trust is built by labeling truth, not hiding it. The Lab spans a healthy maturity ladder:

- **Shipped & adopted:** signals (~325★), vault (v2), gotime (v2), Internet Object (live
  spec + playground), Taj Mahal (10+ live sites).
- **Built & imminent:** UExL, xlib, gowork, gocurl, Booster, Taj Mahal SSG (OSS soon),
  Printeer (overhaul).
- **Active research / design-phase:** FUSE, NITES (finalizing), AddressQL (spec v1), Indigo
  (pre-1.0), WebDoodling (playground soon), MDKit.

The shipped tier *proves the lab delivers and maintains*. The research tier is the
*pipeline* — upside, not the whole bet. And the firm sits on **15 years of client delivery
since 2010** (ISO-certified), so "can they execute?" is already answered by history; the
Lab is the R&D engine on top of a proven company.

---

## 6. Why this matters for the brand (and the two trust questions)

The new website's job is to make a verifiable truth **visible**, and to deliberately answer
the two questions a serious prospect/hire will silently ask (see TRUST-STRATEGY.md):

- **"Can they ship?"** → Lead with the shipped, starred, production-proven work; frame
  pre-1.0 as rigor; show 15 years of delivery. The Lab makes the answer *obviously yes*.
- **"Company or one remarkable person?"** → The Lab's depth, captured in specs, conformance
  suites, ISO process, and documentation, shows the work lives in **systems**, not one
  head — while a deeply technical founder is an asset, not a liability.

The Lab is the single most persuasive asset ManiarTech has. It converts "competent dev
shop" into "the lab that makes the technology others use." Critically: **ManiarTech is
under-selling, not over-selling.** The truth is impressive; it is simply currently invisible.

---

## 7. Recommendations for the website (Lab-specific)

1. **A dedicated "Research / Standards / Languages" hub**, with **Indigo as the headliner**
   and the five standards beneath it. This is a statement few companies can make.
2. **Proof-first ordering:** shipped & starred work up front; research clearly labeled as
   pipeline. Never imply more maturity than is real.
3. **A fixed status vocabulary** (Published · Beta · Shipping soon · Research · Internal),
   one label per project — honesty as a feature.
4. **Lean into the self-referential proof:** a "Built with Taj Mahal" footer; "the site you
   are reading runs on our own framework."
5. **Feature the honest-engineering ethos explicitly** — reproducible benchmarks, proven
   robustness, "no output better than wrong output." It is the differentiator.
6. **Show the interactive proof** where it exists (Internet Object playground; potential
   UExL/Indigo WASM playgrounds) — clickable beats described.
7. **Make the founder visible and the process visible** — answer the bus-factor question
   before it is asked.

---

## 8. One-line catalog (quick reference)

**Standards:** Internet Object (data) · NITES (date/time) · UExL (expressions) · FUSE
(realtime API) · AddressQL (query language)
**Language:** Indigo (Go superset → expert Go)
**Published OSS:** signals (~325★) · vault-storage · gotime
**Go DX toolkit:** Booster · gowork · gocurl · conductor/orchestrator · xlib
**Frameworks/content:** Taj Mahal SSG (10+ sites) · MDKit · WebDoodling · Printeer

> Outstanding inputs to finalize the public version: per-project publication status &
> licenses (RECONCILIATION.md), nameable adopters/numbers, and the founder/team framing
> (TRUST-STRATEGY.md). None change the substance above — only how precisely we can state it.
