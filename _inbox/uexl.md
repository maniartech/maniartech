# Inbox Dossier — UExL (Universal Expression Language)

> Collection doc (not a page yet). Source of truth for the eventual
> `_ia/labs/uexl.md`. Sources: io.. local repos uexl-go + uexl-playground,
> README/go.mod. Status: **collected** — open questions at bottom.

**Classification:** ManiarTech® **Labs** — **Research project + standard** (open-source planned)
**🌐 MULTI-LANGUAGE STANDARD (like IO & NITES):** UExL is intended to become a
universal, cross-language expression-language standard with implementations in multiple
languages. **Process is REVERSED vs IO/NITES:** here the **implementation comes first**
(Go impl ~ready), and the **formal spec is written afterward**, derived from the
finalized reference implementation. So today: spec NOT ready, Go implementation sort-of
ready. → This makes **three authored standards** at ManiarTech: IO (data), NITES (time),
**UExL (expressions)**.
**⚠️ PUBLICATION STATUS: PUBLISH-READY — IN QUEUE (updated 2026-06).** Aamir: the three
former blockers — **datetime, builtins, and standard lib — are now FINALIZED**, and "it is
ready to be published now, in queue." So the *language/implementation is done*; what remains
is **release packaging**. Still NOT public yet → do NOT link GitHub/playground/`go get` on the
live site until Aamir confirms the public release.
**Remaining release-packaging work (from the repo's own `LAUNCH_CHECKLIST.md`):**
- ⬜ **LICENSE file** — the #1 blocker (no license = "all rights reserved"; nobody can use it).
  MIT recommended; **still needs to be chosen + added.**
- ⬜ **Public API surface** — today only `EvalExpr(expr)` is exported; the launch needs the
  planned `Eval(expr, vars)` + `Evaluator`/`Option` surface designed and frozen.
- ⬜ **CI** (GitHub Actions test matrix), README update (see benchmark caution below), tag `v0.1.0`.
- ✅ Already done: all tests pass `-race`, production panics removed, repo hygiene, docs mostly.
→ **Version decided: `v0.1.0`** (signals unstable pre-1.0 API — honest launch label). Since the
impl is finalized, plan to write the FULL page now and gate go-live on the public tag + license
(option C). See §11.

**One-liner:** An embeddable, platform-independent expression-evaluation engine —
"the regex of expression evaluation." Turns runtime strings into evaluated
results — **as fast or faster than cel-go and expr** (measured: fastest on
string/function/map, tied on basic), with **zero allocations** on the
boolean/comparison/string hot paths.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | UExL (Universal Expression Language) |
| Type | Embeddable expression language + evaluation engine (parser → compiler → VM) |
| Flagship impl | **Go** — `github.com/maniartech/uexl` (Go 1.22) |
| Playground | React 19 + TypeScript, runs UExL via **Go→WebAssembly** (client-side) |
| Author | ManiarTech® (Mohamed Aamir Maniar) |
| Repos | maniartech/uexl-go (engine) · maniartech/uexl-playground (WASM playground) |
| Local | E:\Projects\uexl\uexl-go · E:\Projects\uexl\uexl-playground |
| License | <!-- TODO: confirm — not stated in README I read; check LICENSE file --> |
| Maturity | **Not yet stable-released** (README); API reflects current `main` |
| Deps | Minimal: testify (test), rivo/uniseg (grapheme), yaml (indirect) — lean |

## 2. Positioning / brand hooks (verbatim-ish, great copy)

- **Headline:** "An embeddable, platform-independent expression evaluation engine
  with zero allocations on the hot path."
- **The big metaphor:** "**The regex of expression evaluation**" — just as regex
  became the universal standard for text patterns (write once, embed anywhere),
  UExL aims to be the universal standard for expression evaluation. *(Strong,
  memorable positioning — lead with this.)*
- "No codegen, no `eval()`, no panics."
- "A language engineers are happy to embed and business users are happy to write."
- Tagline candidates: "Write once, evaluate anywhere." / "Excel-familiar,
  production-safe."

## 3. The problem it solves

Go projects needing runtime expression eval usually stitch together a JSON field,
a reflect-heavy eval lib, and `interface{}` assertions — then fight panics from
unexpected input. UExL ends that: expressions in config files, DB rows, or
user-facing rule editors evaluate the same everywhere the engine is embedded,
with the same semantics and error behavior.

## 4. What makes it distinctive (the engineering story)

- **Pipes, not nested calls** — chainable, readable transformation stages:
  `orders |filter: $item.status == "shipped" |map: $item.total |reduce: ($acc||0)+$item`
  **11 built-in pipes:** map, filter, reduce, find, some, every, sort, unique,
  groupBy, chunk, window (+ passthrough `|:`). Scope vars: `$item $index $acc
  $last $window $chunk`.
- **Explicit semantics — no silent surprises:** `??` falls back only on null/absent
  (preserves `0`, `""`, `false`); `?.` optional chaining returns null without panic;
  strict where it should be strict.
- **Excel-compatible syntax** for non-engineers: `^` power, `<>` not-equals, `?:`
  IF(), `+` string concat — *and* Python/JS styles (`**`) coexist.
- **Production Go, safe by construction:** zero panics (errors, never panic),
  goroutine-safe immutable Env/CompiledExpr, **zero allocs on hot path** (bool/
  comparison), compile-time function validation, Unicode-aware (byte/rune/grapheme,
  e.g. emoji-family `graphemeLen` = 1), single-import API.
- **Three-stage pipeline:** Expression → Parser (AST) → Compiler (Bytecode) → VM.
  Pre-compile once, evaluate thousands of times; pooled VMs (`sync.Pool`).
- **Extensible:** custom Functions, custom Pipes, and `Lib` bundles
  (e.g. a FinanceLib adding pv/fv/irr). Default env ships ~42 functions + 13 pipe handlers.

## 5. Performance (headline proof — ★ I RE-RAN THE BENCHMARKS MYSELF, 2026-06)

> ✅ **Ground truth: I ran the head-to-head comparison harness myself** (`E:\Projects\uexl\
> golang-expression-evaluation-comparison`, Go 1.26, AMD Ryzen 7 5700G, `-benchmem`,
> `-benchtime=1s`). The news is GOOD — and **better than the stored docs showed:** UExL has
> clearly been **optimized further** (basic-expr path ~266 → ~153 ns/op), so the old "#3 on
> basic" story is **superseded.** My even-earlier "fastest at everything" table was wrong the
> other way; THIS is the measured truth.

**Measured results (fresh run, ns/op · allocs/op):**

| Scenario | expr | cel-go | **UExL** | UExL verdict |
|---|:--:|:--:|:--:|---|
| **Basic boolean/general** | 162 / 1 | 155 / 1 | **153 / 0** | tied-fastest **+ only 0-alloc** |
| **String (startsWith)** | 366 / 4 | 269 / 4 | **146 / 0** | 🏆 **fastest — 1.8× vs cel-go, 2.5× vs expr; 0 alloc** |
| **Function call** | 298 / 4 | 273 / 4 | **154 / 2** | 🏆 **fastest (~1.8×)** |
| **Array map (100)** | 17,486 / 111 | 60,496 / 621 | **12,437 / 104** | 🏆 **fastest — 1.4× vs expr, 4.9× vs cel-go** |

**The honest, MEASURED headline:**
- 🏆 **Fastest on string-match, function calls, and array-map** — clear margins (1.4×–2.5×),
  robust to run-to-run noise.
- **Basic/general expr: now on par with expr & cel-go** (all ~150–160 ns, within noise) — UExL
  is no longer the clear #3; it's competitive AND the **only zero-allocation** one there.
- 🏆 **Fewest allocations in EVERY scenario** (verified): basic & string **0 allocs** (vs 1 / 4),
  func 2 (vs 4), map 104 (vs 111 / 621). No GC pressure, predictable latency = the real moat.
- Honest scoping: "zero-alloc" applies to the **boolean/comparison/string** hot paths shown
  (func still allocates 2). Always **pre-compile** for hot paths (one-shot eval allocates).

**Robust re-run (6×2s, warm medians) — used to fix the repo docs:**
basic uexl ~125 / expr ~165 / cel-go ~165; string uexl ~108 / expr ~325 / cel-go ~348;
func uexl ~153 / expr ~228 / cel-go ~267; map uexl ~11,400 / expr ~15,150 / cel-go ~63,500.
**UExL fastest in every scenario, only zero-alloc on bool+string.**

> ✅ **DONE — repo docs fixed (2026-06):** updated the **uexl-go README** "Performance" section
> to these measured numbers + honest methodology; added **SUPERSEDED banners** to the two stale
> wip-notes (`FINAL_PERFORMANCE_RESULTS.md`, `BENCHMARK_COMPARISON.md`). **Deliberately left
> alone:** the README's API examples (`uexl.Eval` etc.) — that's the public-API-freeze launch
> task (Aamir's), not verified yet; and the comparison repo's `benchmark_results.txt` (a raw
> 10-framework dump — regenerating needs all 10 frameworks run).
> ⚠️ **Before the SITE publishes a number:** run **benchstat over more/longer runs** for stable
> medians; timings vary run-to-run (allocation counts are the rock-solid claim). The playground's
> live **Benchmark button** lets visitors verify it themselves — lean into that.

## 6. Playground (uexl-playground)

- Interactive, **mobile-friendly**, **100% client-side via Go→WASM** (no server).
- Stack: React 19 + TS, Vite 7, Tailwind v4, shadcn-style UI, **CodeMirror 6**
  (chosen over Monaco for mobile). Deploys to **GitHub Pages**.
- Features: custom UExL syntax highlighting; red-squiggle parse/compile/runtime
  diagnostics; click-error-to-jump; Result/Errors tabs; JSON context editor;
  examples library (arithmetic, pipes, strings, nullish, groupBy, sort…);
  **share via URL hash** (base64); status bar (cursor, exec time, result type,
  WASM status); Ctrl/Cmd+Enter to run; dark/light theme.
- <!-- TODO: confirm LIVE URL — deploy base is /uexl-playground/, likely
     https://maniartech.github.io/uexl-playground/ . Verify & whether a custom
     domain (e.g. play.uexl.org) is planned. -->

### ★ Playground UPGRADE (Aamir shared screenshot, 2026-06) — now a polished, IDE-grade tool
The playground has been significantly upgraded. Verified from the screenshot:
- **Branded, professional dark UI** (amber/orange accent + the UExL logo mark) — looks like a
  real product, not a toy. Two-file IDE layout: **`expression.uexl`** (left) + **`context.json`**
  (right, with a **Format** button). Named example: "Basic arithmetic" (breadcrumb: Playground ›
  Basic arithmetic → an **examples gallery**). Left rail: docs · share · GitHub · experiments.
  Status bar: cursor pos, char count, "Ready". Run = Ctrl+Enter.
- **★ Bytecode disassembly panel** ("Disassembly appears after a run") — the playground now
  **visibly shows the compiled bytecode**. This is a *powerful proof asset*: it demonstrates,
  on screen, that UExL is a real **parser → compiler → VM** language (§4), not a tree-walking
  toy. Strong "we make technology" / standards-depth signal.
- **★ Built-in Benchmark button** (top bar) — benchmarking is *in the playground itself*. The
  "beats cel-go / expr" claim (§5) becomes something a visitor can **run and verify live** —
  the reproducible-benchmark ethos made interactive. Squarely Governing-Rule-#1-aligned
  (reproducible, method shown), so it's a claim we can stand behind loudly.
- **Site value:** an excellent **screenshot/embed/demo asset** (like the Booster TUI, WebDoodling)
  — the bytecode + benchmark views are visually distinctive and screenshot-worthy. When UExL
  publishes, embed or link the playground prominently on the UExL page and the Standards hub.
- ⚠️ Still gated on UExL not being public yet — confirm whether this upgraded playground is
  publicly reachable / linkable before putting a live link on the site.

## 7. Use cases (for the page)

Rule engines, pricing/discount logic, feature flags & targeting, dynamic
validation, low-code/config-driven behavior, user-facing formula fields,
data transformation pipelines, business-user-authored rules. Pairs naturally
with **Processious** (rules/automation) and our **Process Automation** service.

## 8. SEO angle

Primary: "Go expression language", "expression evaluation engine", "embeddable
rules engine Go", "cel-go alternative", "expr alternative". Secondary: "runtime
expression evaluation", "Excel-like formula engine", "zero-allocation Go".
Hook: the benchmark table (developers search for "fastest Go expression engine").

## 9. Proposed shape for `_ia/labs/uexl.md` (build later)

Hero ("regex of expression evaluation" + zero-alloc claim) → The problem (Go
runtime-eval pain) → The idea (3-stage pipeline, embed anywhere) → Distinctive
features (pipes, explicit semantics, Excel syntax) → **Performance table** (the
money shot) → Try it (Playground, WASM) → Honest status (research/pre-stable,
open source) → Bridge to Process Automation service + Processious + /estimate.

## 11. Presentation while UNPUBLISHED (decide at `_ia` phase)

Since UExL isn't public yet, options for the site:
- **(A) Teaser / "Coming soon" Labs card** — show the concept + "the regex of
  expression evaluation" + a "Notify me / coming soon" note, NO repo/playground
  links, NO benchmark table yet. Builds the research-depth narrative without
  over-promising. *(Recommended.)*
- **(B) Omit entirely** until published, then add a full page.
- **(C) Full page but gated** — write it now, publish the page only when repos go live.
Recommendation: **(A)** — a teaser keeps Labs looking active/deep; flip to a full
page (with benchmarks + links) the day it's published.

## 12. Open questions for Aamir

- [ ] **When is publication planned?** (Drives whether we teaser now or wait.)
- [ ] **License** on publication? (MIT like others?)
- [ ] Live playground URL + whether a landing site (like internetobject.org) is planned.
- [x] ~~Other language implementations planned?~~ → **YES — multi-language standard like
      IO/NITES.** Which languages after Go? (JS/TS, Python, Rust, C#, Dart — match IO's set?)
- [ ] Spec timing: written AFTER Go impl finalizes (reverse process). Rough ETA for
      (a) impl finalization, (b) spec draft?
- [ ] On publication: OK to show the benchmark table naming expr & cel-go?
- [ ] Version/maturity label at launch (e.g. "beta / pre-1.0")?
