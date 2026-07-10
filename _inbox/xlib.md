# Inbox Dossier — xlib

> Collection doc (not a page yet). Source: local repo E:\Projects\go-libs\xlib
> (README, CHANGELOG, go.mod, source). Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — Open-source Go library (research/foundation
layer). Tightly related to **UExL** and **Processious**.
**One-liner:** A high-performance, Excel-compatible function library for Go — the
computational core (377 pure functions) that powers expression engines like UExL.

**Relationship to UExL (the stated objective):** xlib is the **standard-library /
builtins layer for UExL** — it lets users call Excel functions (ROUND, AVERAGE,
PROPER, NPV…) inside UExL expressions. Architecture: App → UExL (expression engine)
→ **xlib (pure functions)**. Also a foundation for future spreadsheet/rule engines.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | xlib ("x") — Excel-Compatible Function Library for Go |
| Module path | **`github.com/maniartech/x`** (note: import path is `x`, not `xlib`) |
| Repo | git@github.com:maniartech/x.git · local: E:\Projects\go-libs\xlib |
| Author | ManiarTech® |
| Go version | 1.23 |
| Deps | shopspring/decimal, gonum, testify — real numeric/stats backing |
| **License** | **AGPL-3.0 OR Commercial** (dual). ⚠️ Different from MIT/ISC of other Labs items — copyleft for OSS, commercial license for proprietary/closed embedding. |
| Tagline (README) | "High-Performance Excel-Compatible Function Library for Go" |
| Part of | "Part of **Processious**" (processious.com) per README footer |

## 2. What it is / why it's impressive

- **377 pure functions across 9 packages**: calc (math), statistics, finance,
  datetime, engineering, text, logical, information, core.
- **Excel/Google Sheets compatible** — functions mirror Excel behavior & naming.
- **80.2% coverage of Excel/Sheets functions (332 of 414)** per v1.0.0 CHANGELOG &
  features list. 100% in **Text**, **Date & Time**, **Logical**; high in Math
  (90.1%), Statistical (87.4%), Information/Engineering (77.8%), Financial (76.4%).
  ⚠️ *Internal inconsistency:* the README "Excel/Sheets Compatibility" TABLE still
  says 70.8% / 293-of-414 (older figures) — **stale table vs. updated headline
  numbers. Use 80.2% / 332, and fix/ignore the table.** Confirm with Aamir.
- **Pure functions:** no side effects, thread-safe, no global state, no reflection.
- **Numeric model:** float64 (matches Excel's IEEE-754 internal representation);
  raw results returned so caller controls rounding. shopspring/decimal noted for
  exact-decimal needs.

## 3. Performance (proof points)

- Sub-10ns simple ops (Floor 0.34 ns/op, Divide 0.34, Round 6.13), **zero
  allocations** for most numeric functions; "38×–399× speedups for complex ops."
- Table: simple math 0.34 ns/0 allocs · rounding 6–7 ns/0 · small arrays 2–7 ns/0 ·
  3×3 matrix 148 ns/4 · stat distributions 34–123 ns/0 · text 10–380 ns/1–10.
- See PERFORMANCE_BASELINE.md + benchmark_baseline.txt in repo.

## 4. Quality signals

- **>90% test coverage**, all tests run with **race detection** (`-race`).
  Per-package: text 100%, engineering 99.4%, statistics 98.8%, calc 97.4%,
  datetime 95.9%, finance 94.8%, core 92.3%.
- Go Report Card + pkg.go.dev badges in README (so doc site expected on publish).
- Docs: EXCEL_COMPARISON.md, MISSING_FUNCTIONS_ANALYSIS.md (roadmap), MIGRATION.md.

## 5. Scope (honest framing)

In scope: math, statistics, finance, datetime, engineering, text.
**Out of scope by design:** Logical (AND/OR/IF → handled by UExL), Information
(ISBLANK… → Go's type system), Lookup/Reference (VLOOKUP… spreadsheet-specific),
Database (DSUM… → data libs). *(Good story: clean separation of concerns between
xlib = pure compute and UExL = evaluation.)*

## 6. Maturity / publication status

- CHANGELOG declares **v1.0.0 "Final Release" (2025-12-18)**, 80.2% coverage.
- BUT Aamir says xlib is "sort of ready, **finalization pending**" — consistent
  with UExL's remaining datetime/builtins/stdlib work (xlib feeds those).
- ⚠️ **Publication status UNCONFIRMED.** README shows public-style badges &
  `go get github.com/maniartech/x`, but since UExL (its main consumer) is NOT yet
  published, likely xlib isn't public yet either. **Do NOT link repo/pkg.go.dev on
  the live site until Aamir confirms it's public.** (See open Qs.)

## 7. Site placement — recommendation

- Likely a **Labs** entry, but it may be better presented as a **sub-component of
  UExL** (its standard library) rather than a standalone headline card — depends on
  whether Aamir wants xlib to have its own identity or live under UExL/Processious.
- The "Excel functions, in your expressions" angle is very tangible for business
  readers and pairs with Process Automation service + Processious + UExL.
- If standalone: hero (Excel-compatible Go compute) → 377 fns / 80% coverage →
  performance/zero-alloc → quality (90%+, race) → role as UExL stdlib → honest
  status. Gate links on publication.

## 8. Open questions for Aamir

- [ ] **Publication status & date** — is `github.com/maniartech/x` public now? If
      not, when? (Tied to UExL publish.)
- [ ] **Coverage number to use publicly:** 80.2% (332/414) — confirm, and OK to
      ignore the stale 70.8% table?
- [ ] **License framing** — comfortable featuring AGPL-3.0 + commercial dual
      license publicly? (It's a selling point but worth confirming the messaging.)
- [ ] **Branding:** standalone Labs card, OR present as "UExL standard library,"
      OR under Processious? (README says "Part of Processious.")
- [ ] Name to show: "xlib" vs import path "x" vs a friendlier product name?
- [ ] OK to publish the performance/zero-alloc numbers?
