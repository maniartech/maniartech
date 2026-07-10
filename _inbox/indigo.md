# Inbox Dossier — Indigo

> Collection doc (not a page yet). Source: local repo E:\Projects\indigo\indigo
> (README, normative docs/specs/*, grammar, go.mod). Status: **collected** — open Qs below.

**Classification:** ManiarTech® **Labs** — **a programming language + compiler** (open
source; license TBC, frontend derives BSD-3 from Go stdlib). **The "big brother" of the
ManiarTech Go ecosystem.** Status: **pre-1.0** (1.0 specs normative; compiler active dev).
**One-liner:** **Indigo is to Go what TypeScript is to JavaScript** — a Go *superset* that
adds a few carefully-chosen ergonomics and compiles `.indigo` files to **expert-quality,
idiomatic `.go`** that reads as if a senior Go dev hand-wrote it.

**Why it's the flagship:** this is ManiarTech making *a language*. It's the deepest possible
expression of "we make technology, not just use it" — and it solves pain **every** Go
developer feels daily (error-handling boilerplate, no ternary, no map/filter, verbose nil
checks). If positioned well, Indigo could be the single most impressive thing on the site.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | Indigo |
| Type | **Go superset language + transpiler/compiler** (.indigo → .go) |
| Import / CLI | `github.com/maniartech/indigo` · `cmd/indigo` |
| Author | ManiarTech® |
| Compiler | **Pure Go**, built on the `go/*` stdlib (`go/parser`/`go/scanner` frontend + `go/types`-backed lowering). **No CGo, no external parser, NO runtime injected into your code.** |
| Go versions | Source+target tracked separately; targets **Go 1.24 / 1.25 / 1.26** |
| License | TBC — frontend portions BSD-3-Clause (from Go stdlib); confirm overall |
| Status | **pre-1.0**, specs are normative for 1.0; compiler under active development |

## 2. The core promise (positioning gold)

- **"A Go superset that compiles to expert-quality Go."** TS-for-Go analogy is exact and
  instantly understood by the audience.
- **Every valid Go file is a valid Indigo file** (superset, zero-friction adoption).
- **Output stays in the plain Go toolchain** — generated `.go` works with existing build
  systems, linters, editors unchanged. **No runtime library, no lock-in.** You can stop
  using Indigo anytime and keep the generated Go.

## 3. Language features (each adds real daily value)

| Feature | Indigo | Lowers to |
|---|---|---|
| Ternary | `ok ? "ready" : "pending"` | safe if/else expression lowering |
| Lambdas | `x => x * 2` | typed func literal |
| Pipelines | `users \|filter: $.Active \|map: $.Name` | a single fused `for` loop |
| Nullish coalescing | `input ?? "guest"` | explicit nil checks |
| Optional access | `user?.Address?.City`, `xs?[0]` | nil-guarded field/index |
| **Error propagation** | `data := load(path)!` + `catch { … }` | idiomatic `if err != nil` returns |
| Python slicing | `xs[-1]`, `xs[1:-1]` | bounds-correct slice exprs |

6 pipeline ops only: map, filter, take, skip, reduce, sortBy (anything else → structured error).

**Signature feature — `!` / `catch` error handling:** kills Go's `if err != nil { return }`
boilerplate while **preserving Go's explicit `(T, error)` model** — no exceptions, no
panic/recover, no runtime. `expr!` returns from the enclosing named function on non-nil
error; function-scoped `catch` wraps/replaces the error at return time via plain `defer`.
Generated names are **semantic** (`readUserErr`, `hasErr`), deterministic, collision-safe.
(See the README's before/after — it's a perfect demo.)

## 4. Engineering rigor (apex of the house honesty/quality thread)

- **Compiler contract: "no output is better than wrong output"** — it *never* writes a
  `.go` file it can't stand behind. Forbidden: widening to `any`, hidden closures/IIFEs,
  reflection (outside one approved typed-nil helper), compiler-smell names (`__value`,`tmp`).
- **Behavior preservation guaranteed:** runtime results, side effects, short-circuiting,
  panic timing/values, defer ordering, named-return semantics, package init order. If a
  feature can't preserve these for a construct, it's **rejected**, not faked.
- **Normative, RFC-grade specs** (docs/specs/) are the single source of truth — governance,
  terminology, compatibility model, per-feature grammar/semantics/lowering/diagnostics/
  conformance. Behavior changes start with a spec change.
- **Structured, stable diagnostics:** every error has a code (`IND-PIPE-007`), labeled span,
  suggestion; `indigo explain <code>`; NDJSON output for tooling.
- **Engineering bar:** "100% meaningful coverage on new/changed production packages, no
  undocumented grey areas."

## 5. Tooling ecosystem (already broad — a real product, not a toy)

- **LSP** (`indigo lsp`) — native diagnostics + editor features over stdio, with a
  **gopls-backed shadow-Go channel** mapped through source maps.
- **VS Code extension** (syntax + LSP client).
- **MCP server** — exposes the compiler to **AI tooling over Model Context Protocol**
  (timely AI angle).
- **Bidirectional source maps** (Source Map v3 compatible, exact-or-omitted).
- **Embedding API** — `indigo.Compile(ctx, Request{...})`, in-memory, concurrent-safe;
  source problems are structured diagnostics, never Go errors.
- CLI: build / check / run / watch / explain / lsp; `--source-maps`, `--message-format=json`.
- Tree-sitter grammar kept as an editor-ecosystem asset.

## 6. Strategic significance

- **The crown of the Go ecosystem.** Booster/gowork/gocurl are tools *around* Go; Indigo
  *extends Go itself*. It elevates ManiarTech from "builds great Go tools" to "builds a
  **language**." Very few companies anywhere do this credibly.
- Extends the "we make technology" thesis to its limit: 4 standards (IO/NITES/UExL/FUSE) +
  **a language**. Pair them on a "Research & Standards" hub; Indigo is the headliner.
- The TS-for-Go story is **viral-friendly** (devs instantly get it) — best SEO/PR asset in
  the portfolio: "TypeScript for Go", "Go superset", "Go transpiler", "Go error handling
  without if err != nil", "Go ternary / map filter".
- Honest-engineering ethos at its peak ("no output better than wrong output") — exactly the
  trust signal the site needs.

## 7. Honesty / status framing

- **pre-1.0**, parser flag/feature coverage still completing, "not yet recommended for
  production-critical paths" (README). Present as **ambitious, rigorously-specified, active
  research/dev** — not a finished product. The rigor (specs + conformance + coverage bar)
  makes "pre-1.0" read as *serious*, not *unfinished*.
- No runtime/lock-in is a genuine de-risker to advertise (adopt incrementally, leave anytime).

## 8. Site placement

Likely a **flagship Labs/Standards feature** — possibly THE hero of the Labs section, or its
own spotlight. Hugely demoable: the `!`/`catch` before/after, a pipeline → fused-for-loop,
the live LSP. When ready, give it the richest treatment (interactive playground? the compiler
is pure-Go → WASM-able, like the IO/UExL playgrounds). Clarify publication status first.

## 9. Open questions for Aamir

- [ ] **Status:** public repo now, or internal? Published / pre-1.0 timeline? "Big brother"
      but is it OSS-released or still internal like Booster/gowork?
- [ ] **License** on release (frontend is BSD-3 from Go; what's the overall license)?
- [ ] OK to lead hard with **"TypeScript for Go"** as the positioning line?
- [ ] Is a **playground** planned (pure-Go compiler → WASM, like IO/UExL)? Huge for the page.
- [ ] Should Indigo headline a "ManiarTech Research / Standards / Languages" hub alongside
      IO/NITES/UExL/FUSE?
- [ ] Naming: "Indigo" — any collision concerns (there are other "Indigo" projects)? Confirm.
- [ ] OK to feature the MCP/AI-tooling integration as a selling point?
