# Inbox Dossier — signals

> Collection doc (not a page yet). Source: local repo E:\Projects\signals\signals
> (README, v1.4-requirements.md, go.mod). Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — Open-source Go library. **PUBLISHED & POPULAR.**
**One-liner:** A lightweight, context-aware, type-safe event/signal system for Go —
lock-free reads, honest benchmarks, proven concurrency.
**Star asset:** ManiarTech's **most-starred public repo (~325★)** — the credibility
anchor for the whole Labs/open-source story.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | signals |
| Type | Go library — typed, thread-safe event dispatch (pub/sub) |
| Import | `github.com/maniartech/signals` |
| Author | ManiarTech® |
| License | **MIT** |
| Go version | **1.21+** |
| Dependencies | **Zero** (pure Go — also a supply-chain/trust-boundary selling point) |
| Stars | ~325★ (verify exact at build time) — the headline OSS number |
| **Status** | **PUBLISHED.** Current stable line v1.3.x; **v1.4 "almost ready, publishing soon"** (per Aamir). Branch `v1.4`, Phases 0–3 done, Phases 4–7 remaining. |
| Badges | CI (GitHub Actions), Go Report Card, pkg.go.dev — all live/public |
| Production | "Used by ManiarTech® and other companies in mission-critical applications" (README) |

## 2. Positioning / brand hooks

- **Headline:** "Lightweight, Context-Aware Event System for Go."
- Typed, thread-safe event dispatch with **two variants**: fire-and-forget **async**
  signals and error-aware **sync** signals.
- Strong, distinctive engineering-culture angle (see §5 — the honesty story).

## 3. Key features (for the page)

- **Two signal types:** Async (fire-and-forget) + Sync (error-aware, transaction-ready).
- **Context-aware:** every listener gets `context.Context` (cancellation, deadlines).
- **Lock-free reads:** copy-on-write core — `Emit` is a single atomic load, **0 allocs,
  no lock** on the read path. (Writes are O(n) by design — deliberate trade.)
- **Error handling:** `TryEmit` (sync stops on first error; async `errors.Join` of all),
  `OnError` sinks, short-circuit via `ErrStopPropagation` (control value, not failure).
- **Ordered dispatch:** sync FIFO (default) or LIFO; order stable across add/remove.
- **Rich subscriptions:** `AddOnce`/`AddOnceWithErr` one-shots, `*WithCancel` handle-based
  teardown, `Keys`/`HasKey` introspection.
- **Bounded async dispatch:** opt-in `MaxConcurrent` semaphore safety valve (v1.4).
- **Zero-value usable** (no constructor needed); **zero dependencies**.
- **Generics:** `signals.New[User]()`, `signals.NewSync[Order]()` — type-safe payloads.

## 4. Performance (honest, reproducible — every number from a committed benchmark)

Measured AMD Ryzen 7 5700G, reproducible via `go test -bench`. *Machine-specific —
"guidance, not guarantees" (their words).*
- **Sync emit (lock-free read path): ~8 ns / 0 allocs** (1 listener); ~33 ns / 0 allocs
  (10 listeners); ~1.1 ns aggregate concurrent (16 threads).
- **Async Emit = dispatch rate** (goroutine per listener), ~230 ns / 2 allocs (1 listener)
  — explicitly labeled as scheduling speed, NOT listener completion.
- Note to preserve: they RETIRED the old "sub-10ns/zero-alloc" blanket claim as misleading;
  now sync-only and labeled. (This honesty is the story — see §5.)

## 5. THE BRAND STORY (use this — it's rare and on-brand)

v1.4 is a **"correctness + verified-performance"** release with an explicit philosophy:
> "Ship something correct, honest, *and* fast… don't ship claims you can't reproduce."

- An external PR (#14) removed the performance machinery because its benchmarks couldn't be
  reproduced. ManiarTech kept the correctness fixes and **rebuilt performance the honest
  way** — lock-free copy-on-write, **benchmarked before any claim is written.**
- **Robustness is proven, not asserted:** a 17-invariant (I1–I17) proof standard —
  property-based + native fuzz + stress tests, all under `-race`, on a
  **{Linux, Windows, macOS} × {Go 1.21, latest}** CI matrix (Windows mandatory).
  Self-imposed rule: the words "robust / mission-critical / battle-tested" may NOT appear
  in docs until every invariant is green.
- Honest about breaking changes: v1.4 documents a silent runtime break (`Emit` →
  `TryEmit`) and an interface source-break, with a clear migration note.

→ **This is the differentiator for ALL of Labs:** "We hold our open source to a standard
most vendors don't hold their paid products to — every performance number reproducible,
every robustness claim mechanically proven." Ties directly to ISO 9001 quality ethos.

## 6. Use cases / SEO

Domain events, decoupled module communication (shared event registry as package vars),
transaction hooks (sync + error rollback), real-time/HFT price updates, graceful shutdown
(context cancel). SEO: "Go event system", "Go signals library", "Go pub sub", "thread-safe
event dispatch Go", "Go observer pattern generics".

## 7. Cross-sell already in the README (gift for us)

README ends with **"You Need Some Go Experts, Right?"** — pitches ManiarTech's Golang
services + careers (contact@ / careers@maniartech.com). Confirms the strategy: OSS repos
funnel to services. Our signals page should do the same — link to **Services / Go
expertise** and the **Estimator**.

## 8. Proposed shape for `_ia/labs/signals.md` (build later)

Hero (event system for Go + ~325★) → Two signal types (async/sync) → Key features
(lock-free, context-aware, typed) → **Honest-engineering story** (proven, reproducible —
§5) → Perf snapshot (labeled) → Quick code example → Links (GitHub/pkg.go.dev — all LIVE)
→ Cross-sell to Go services + Estimator.

## 9. Open questions for Aamir

- [ ] Exact **current star count** to cite (≈325 — confirm at build; or say "300+").
- [ ] Name real **adopter companies** ("used by … and other companies") — any we can name,
      or keep generic?
- [ ] v1.4 publish timing — write page for v1.4 now (lock-free, bounded async, OnError) or
      describe current v1.3.x and update on release? (Lean: write to v1.4, gate go-live.)
- [ ] OK to feature the **"honest engineering / proven robustness"** narrative prominently?
      (Strong, but it implies a past over-claim was corrected — confirm you're happy to own
      that publicly; it reads as integrity, not weakness.)
