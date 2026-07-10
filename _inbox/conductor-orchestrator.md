# Inbox Dossier — Conductor / Orchestrator (name TBD)

> Collection doc (not a page yet). Source: local repo E:\Projects\go-libs\conductor
> (README, go.mod). Status: **collected** — open Qs at bottom.

## ⚠️ NAME NOT FINALIZED (per Aamir)
Folder = `conductor`; module path = `github.com/maniartech/orchestrator`; README title =
"Orchestrator". **Pick one canonical name before publish.** (Logged in RECONCILIATION.md.)
Earlier GitHub scan showed `maniartech/conductor` (~12★) — so "conductor" is the current
public repo name, "orchestrator" the module path. Decide & align.

**Classification:** ManiarTech® **Labs** — Open-source Go library (MIT). **UNDER REVAMP**
— README literally says *"🚧 We are revamping this library, don't use it yet."* Published
historically (~12★) but currently mid-redesign.
**One-liner:** An in-process **goroutine / task orchestration** library for Go — compose
tasks into **sequential + concurrent** workflows with timeouts, retries, error boundaries,
panic recovery, and live status — type-safe, zero-allocation.

**Relationship to signals:** complementary Go concurrency primitives. **signals** =
event dispatch (pub/sub); **this** = task/workflow orchestration (run/compose/await
goroutines). Together they form a small "ManiarTech Go concurrency toolkit."

---

## 1. Identity

| Field | Value |
|---|---|
| Name | **TBD** — Conductor (repo) vs Orchestrator (module/title) |
| Type | In-process goroutine/task orchestration library (NOT a distributed workflow engine) |
| Import | `github.com/maniartech/orchestrator` (current) |
| Author | ManiarTech® |
| License | **MIT** |
| Go | 1.18+ (generics) |
| Deps | gopsutil (system metrics) — note: not zero-dep like signals/gotime |
| Stars | ~12★ (per earlier scan) |
| **Status** | **UNDER REVAMP — "don't use it yet"** (active redesign; legacy moved aside) |

## 2. Concept / API (fluent builder)

Compose tasks into a tree of **Sequential** and **Concurrent** blocks, then `Await()`:
```go
orchestrator.Setup(
  orchestrator.Sequential(
    orchestrator.Task(keepInfraReady).Named("infra-ready"),
    orchestrator.Concurrent(
      orchestrator.Sequential( fetch, process, submit ).Named("pipeline"),
      orchestrator.Concurrent( prepA, prepB, prepC ).Named("deps"),
    ).Named("main"),
  ).Named("resource-handler"),
).Await()
```
- **Task** with `.Named()`, `.With(Config{Timeout, MaxConcurrency, Retries})`,
  `.ErrorBoundary(FailFast | CollectAll)`.
- **Result** bag: `result.Get("task-name")` (type-safe via generics).
- **Live status:** `GetStatus()` → NotStarted/Running/Completed/Cancelled.

## 3. Features (claimed; verify post-revamp before publishing numbers)

Zero-allocation execution (atomic status, object pooling) · thread-safe (sync/atomic,
race-free) · Go generics · panic recovery w/ stack traces · timeout & context-cancel ·
fluent builder · rich observability (status, timing, op IDs) · modular internal pkgs
(task/orchestration/config/errors/result/context/pool/status).

## 4. ⚠️ TONE FLAG — "Military-Grade" (reconcile with house honesty standard)
README headline: **"Military-Grade Goroutine Orchestration Library."** This clashes with
the **honest-engineering ethos** elsewhere (signals' v1.4 doc explicitly forbids
"military-grade / mission-critical / battle-tested" until every invariant is mechanically
proven). For brand consistency + trust, **drop or earn** "military-grade" — either back it
with the signals-style proof standard, or use calmer, provable language. Same goes for
"zero-allocation" claims (signals retired its blanket version). → Add to RECONCILIATION.

## 5. Positioning / use cases

In-process workflow composition: resource pipelines, fan-out/fan-in, concurrent I/O with
controlled dependencies, retwell-structured background processing. Distinct from
distributed workflow engines (Temporal, Cadence, Netflix Conductor — NOTE the name clash
with Netflix's "Conductor"! another reason to pick a distinct name). SEO: "go goroutine
orchestration", "go task workflow library", "concurrent sequential go tasks", "errgroup
alternative".

## 6. Honesty / status framing

- **Under revamp, "don't use yet"** — so: present as **active R&D**, NOT a ready library.
  Same handling as Printeer/UExL: teaser or hold until the revamp ships. Do NOT push
  `go get` while the README says don't-use.
- Re-verify all perf/robustness claims after revamp (see §4).

## 7. Site placement

Labs entry, but **low priority / teaser-only** until revamp lands and the name is fixed.
Could pair with signals as a "Go concurrency toolkit" mini-cluster. Don't headline it
while it's in flux; a published, proven signals carries the concurrency story for now.

## 8. Open questions for Aamir

- [ ] **Final name?** Conductor vs Orchestrator vs something new (avoid Netflix Conductor
      / generic "orchestrator" SEO collision).
- [ ] Revamp ETA + target version; publish timing.
- [ ] OK to drop **"military-grade"** for provable language (recommended), or will it earn
      the claim via a signals-style proof standard?
- [ ] Keep the gopsutil dependency, or go zero-dep like its siblings?
- [ ] Pair with signals as a "Go concurrency toolkit" on the site, or stand alone?
