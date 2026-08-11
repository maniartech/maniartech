---
audience: "engineering"
contentType: "engineering-deep-dive"
evidenceType: "Reproducible benchmark"
artifactLabel: "Benchmark harness"
artifactUrl: "https://github.com/maniartech/uexl-go#performance"
title: "Zero allocations on the hot path: engineering UExL, and proving it"
description: "How our expression engine evaluates boolean and string expressions with zero heap allocations, where it wins against cel-go and expr, where it loses, and how to run the benchmark yourself."
date: "2026-07-23"
titleTag: "UExL - Zero-Allocation Expression Evaluation in Go"
seoDescription: "How our expression engine evaluates boolean and string expressions with zero heap allocations, where it wins and loses, and how to re-run the benchmark."
thread: "tools"
shortTitle: "Zero allocations"
receipts:
  - "UExL"
  - "benchmark"
keyReceipt: "run it yourself"
heroProof: "108 ns, zero allocations"
heroProofNote: "measured against cel-go and expr, with the harness to re-run it"
---


UExL is our embeddable expression language for Go - the kind of engine you reach for when business rules, filters, or computed fields must be evaluated thousands of times per second inside a larger system. This post makes one precise claim about it, shows the engineering that produces the claim, publishes the optimization journal behind it - including the trade-off it forces on you as a user - and gives you the harness to check all of it on your own machine.

That structure is deliberate. Performance posts usually make broad claims and hope nobody checks. We would rather make a narrow claim and insist that you do.

## The claim, stated exactly

Of the three Go expression engines we benchmarked - UExL, cel-go, and expr - **UExL is the only one that evaluates with zero heap allocations on the boolean/comparison and string-matching paths.**

Not "low allocations." Not "fast." Zero allocations, on those specific paths, for pre-compiled expressions. This is the claim we lead with because, unlike wall-clock timings, it is exact: allocation counts do not vary with your hardware or your CPU load. They are a property of the code and the Go toolchain that compiled it - a future compiler could in principle allocate differently - so the claim is scoped to the toolchain in the harness. On any given setup, either the profiler shows zero or it does not.

## Why allocations matter more than nanoseconds

In a long-running Go service, every heap allocation is a small loan from the garbage collector, and the GC collects its interest at the worst times. An expression engine sitting on a hot path - evaluating rules per request, per record, per event - can allocate millions of times per hour. That shows up not as slow averages but as **latency spikes**: the occasional slow request that has nothing to do with your code and everything to do with collection pauses.

The arithmetic is unforgiving. An engine that allocates four times per evaluation, at a modest 5,000 evaluations per second, hands the collector 72 million objects an hour - forever, for as long as the service runs. An engine that does not allocate on its hot path simply does not contribute to that problem. That property is worth more to a production service than winning any single microbenchmark - which is why it is the property we engineered for, and the one we headline.

## The memory model: pay 48 bytes to never pay the heap

Zero allocations is not a compiler flag; it is a decision about how values are represented. The natural VM stack in Go is a slice of `interface{}` - and that is precisely where allocations generally slip into the heap in this class of engine. Converting a `float64` to an `interface{}` **boxes** it whenever the value escapes - Go's escape analysis can keep a conversion on the stack when it stays local, but a VM stack is the opposite of local: a long-lived slice written by one handler and read by others. There the runtime allocates a small heap object per boxed value, and the GC inherits it.

UExL's VM stack is `[]Value`, where `Value` is a plain struct - a tagged union that keeps every primitive inline:

```go
// types/value.go - the foundation of the zero-allocation claim
type Value struct {
    AnyVal   any       // 16 bytes - only arrays, maps, objects land here
    StrVal   string    // 16 bytes - strings stored inline (header, no copy)
    FloatVal float64   //  8 bytes - numbers stored inline
    Typ      valueType //  1 byte  - type discriminator
    BoolVal  bool      //  1 byte  - booleans stored inline
    // padding to 48 bytes
}
```

Pushing a number onto the stack is a struct assignment into a pre-allocated slice - a memory copy, not an allocation. The VM exposes typed fast paths (`pushFloat64`, `pushString`, `pushBool`) so hot operations never round-trip through `interface{}` at all.

The trade-off is stated as plainly as the win: a `Value` is 48 bytes where an `interface{}` header is 16. UExL deliberately spends **3x the stack width** to buy **zero boxing**. Wider stack slots cost a few cache lines on a structure that is allocated once and reused; boxing costs a heap object per operation, forever. For a hot-path engine that is not a close call - but it is a real cost, and the struct was already slimmed once (56 to 48 bytes) by field reordering, because padding is part of the design too.

Around the value model sit three more structural decisions:

- **Compile once, evaluate many.** A three-stage pipeline - parser to AST, compiler to bytecode, a small stack VM executing it. Parsing, validation, and function resolution are paid once at compile time; the hot path only executes bytecode.
- **Pooled VMs.** `CompiledExpr.Eval()` borrows a `*vm.VM` from a per-environment `sync.Pool` and returns it on completion. In a steady-state concurrent workload the pool stays warm, so evaluations do not even pay for VM construction.
- **Errors, never panics.** Bad input produces an error value, not a recovered panic - a correctness decision, but also a performance one, because panic/recover machinery stays out of the hot loop.

## The numbers, with their reproducibility framing

These are medians of six benchmark runs (no runs discarded) on one of our machines (AMD Ryzen 7 5700G, Go 1.26), from the public head-to-head harness linked below. Treat the timings as guidance, not guarantees - they are machine-specific and vary run to run. The allocation counts are the part that reproduces exactly on a given toolchain.

- **Boolean/general expression:** UExL ~125 ns, 0 allocs - vs ~165 ns, 1 alloc for both expr and cel-go.
- **String pattern match:** UExL ~108 ns, 0 allocs - vs ~325 ns, 4 allocs (expr) and ~348 ns, 4 allocs (cel-go).
- **Custom function call:** UExL ~153 ns, 2 allocs - vs ~228 ns, 4 allocs (expr) and ~267 ns, 4 allocs (cel-go).
- **Map over 100 items:** UExL ~11,400 ns, 104 allocs - vs ~15,150 ns, 111 allocs (expr) and ~63,500 ns, 621 allocs (cel-go).

Read the allocation column before the timing column. The timings will drift on your hardware; the zeros will not.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the string pattern match benchmark: UExL about 108 nanoseconds with zero allocations, expr about 325 nanoseconds with 4 allocations, cel-go about 348 nanoseconds with 4 allocations">
  <g font-family="inherit" font-size="12.5">
    <text x="40" y="30" fill="rgba(255,255,255,.8)" font-weight="600">String pattern match - time per evaluation (lower is better)</text>
    <g font-size="12">
      <text x="40" y="66" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">UExL</text>
      <rect x="120" y="52" width="149" height="18" rx="4" fill="#14cf93"/>
      <text x="280" y="66" fill="rgba(255,255,255,.7)">~108 ns</text>
      <text x="352" y="66" fill="#14cf93" font-weight="600">0 allocs</text>
      <text x="40" y="98" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">expr</text>
      <rect x="120" y="84" width="448" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
      <text x="580" y="98" fill="rgba(255,255,255,.7)">~325 ns</text>
      <text x="652" y="98" fill="rgba(255,255,255,.5)">4 allocs</text>
      <text x="40" y="130" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">cel-go</text>
      <rect x="120" y="116" width="480" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
      <text x="612" y="130" fill="rgba(255,255,255,.7)">~348 ns</text>
      <text x="684" y="130" fill="rgba(255,255,255,.5)">4 allocs</text>
    </g>
    <text x="40" y="184" fill="rgba(255,255,255,.8)" font-weight="600">Boolean / general expression</text>
    <g font-size="12">
      <text x="40" y="220" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">UExL</text>
      <rect x="120" y="206" width="266" height="18" rx="4" fill="#14cf93"/>
      <text x="397" y="220" fill="rgba(255,255,255,.7)">~125 ns</text>
      <text x="469" y="220" fill="#14cf93" font-weight="600">0 allocs</text>
      <text x="40" y="252" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">both others</text>
      <rect x="120" y="238" width="352" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
      <text x="483" y="252" fill="rgba(255,255,255,.7)">~165 ns</text>
      <text x="555" y="252" fill="rgba(255,255,255,.5)">1 alloc</text>
    </g>
    <text x="40" y="288" fill="rgba(255,255,255,.45)" font-size="11.5">Medians of six runs (none discarded), AMD Ryzen 7 5700G / Go 1.26. Timings drift by machine; allocation counts reproduce per toolchain.</text>
  </g>
</svg>
<figcaption><strong>The two hot paths, drawn.</strong> Bars are our medians - rerun the public harness and trust your own. The zeros are the durable claim.</figcaption>
</figure>

## The optimization journal: 41% in four measured phases

Zero allocations came from the value model. The speed came later, and the project's own optimization journal records exactly how - because "profile first, optimize second" only counts if the profiles are kept. On the engine's internal boolean benchmark (a different machine and benchmark than the table above - internal numbers and public-harness numbers must never be mixed), evaluation went from 106 ns to 62 ns in four measured phases:

| Phase | Change | Result | Gain |
|---|---|---|---|
| 1 | Type-specialized comparison handlers - assert once in the dispatch switch, pass concrete types down | 106 -> 103 ns | 3% |
| 2 | Context variables pre-resolved into a slice - array index instead of a map lookup per access | 103 -> 93 ns | 10% |
| 3 | Conditional map clearing with Go 1.21's `clear()` - skip the work when the map is empty | 93 -> 90 ns | 4% |
| 4 | Pointer-based cache invalidation - skip rebuilding the variable cache when the same context map arrives again | 90 -> 62 ns | **31%** |

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Descending bar chart of the four optimization phases: baseline 106 nanoseconds, then 103 after type-specialized handlers, 93 after context variable caching, 90 after conditional map clearing, and 62 after pointer-based cache invalidation">
  <g font-family="Consolas, monospace" font-size="11.5">
    <text x="30" y="26" fill="rgba(255,255,255,.8)" font-size="12.5" font-weight="600" font-family="inherit">The journal, drawn - internal boolean benchmark, ns per evaluation</text>
    <rect x="30"  y="61"  width="120" height="159" rx="5" fill="rgba(255,255,255,.14)"/>
    <rect x="176" y="66"  width="120" height="154" rx="5" fill="rgba(255,255,255,.18)"/>
    <rect x="322" y="81"  width="120" height="139" rx="5" fill="rgba(255,255,255,.22)"/>
    <rect x="468" y="85"  width="120" height="135" rx="5" fill="rgba(255,255,255,.26)"/>
    <rect x="614" y="127" width="120" height="93"  rx="5" fill="rgba(20,207,147,.55)"/>
    <g text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">
      <text x="90"  y="53">106</text><text x="236" y="58">103</text><text x="382" y="73">93</text><text x="528" y="77">90</text><text x="674" y="119" fill="#14cf93">62</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">
      <text x="90"  y="238">baseline</text>
      <text x="236" y="238">typed handlers</text>
      <text x="382" y="238">var cache</text>
      <text x="528" y="238">clear() guard</text>
      <text x="674" y="238">cache invalidation</text>
    </g>
  </g>
</svg>
<figcaption><strong>Four phases, each profiled before and after.</strong> Before: over half the CPU time was setup - cache rebuilds and map operations. After: 78% of the time is the VM actually executing bytecode, which is what you want a profile to say.</figcaption>
</figure>

Phase 4 deserves its own paragraph, because it is both the biggest win and the one that puts a rule on *you*. The engine caches resolved context variables and, before rebuilding that cache, compares the incoming context map's pointer against the last one. Same pointer, no rebuild - a 2-3 ns check that replaces a rebuild costing tens of nanoseconds, which is where most of the 31% came from.

<aside class="mt-callout is-flip">
<span class="co-tag">The trade-off this puts on you</span>
<p>Pointer equality cannot see mutation. If you reuse the same context map across evaluations but change its values in place, the variable cache goes stale and the engine will not notice - detecting that would require hashing the map, which costs more than it saves. The contract: <b>pass a new map when values change</b>, or accept stale reads. This is documented engine behavior, not a bug we hope you will not find.</p>
</aside>

## Where the claim stops

A narrow claim is only honest if its edges are drawn plainly.

- **Function calls still allocate.** Two allocations per call - fewer than the four the other engines show, but not zero. The zero-allocation claim is scoped to the boolean/comparison and string paths, and we state it that way everywhere.
- **Pipes allocate by design.** A `|map:` over 100 items costs ~104 allocations - it is building a new collection, which is allocation-shaped work. Faster than expr (111) and far leaner than cel-go (621), but nobody's zero.
- **One-shot evaluation is not the fast path.** Parse + compile + run in one call costs on the order of ~10,000 ns with allocations. UExL's performance case assumes you pre-compile and evaluate repeatedly - which is what hot paths do. If your workload evaluates each expression once, this engine's headline property does not apply to you.
- **Timings are one machine's story.** We publish medians and the method, not universal truths. If your benchmark disagrees with our nanoseconds, believe yours.

If your workload is one-shot, allocation-insensitive, and simple, any of the three engines will serve you well - expr and cel-go are both solid projects. UExL's case is strongest where expressions are string-heavy or running hot enough that GC pressure is a real concern.

## Run the benchmark yourself

The harness and methodology are public: the repository at [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go#performance) documents the setup - clone the shared comparison suite, add the UExL benchmark file from the repo, and run:

```bash
go test -bench=. -benchmem -benchtime=2s -count=6
```

Take the median of the six runs - the same rule our table used, with no runs discarded. Your absolute timings will differ; the zero-allocation behavior on the boolean and string paths should reproduce exactly on a current Go toolchain, because that is the nature of the claim.

If you find a case where it does not reproduce, we genuinely want the issue report.

<p class="mt-pull">A benchmark that cannot survive strangers is <em>not a benchmark</em>.</p>

## Status, and what is still on the table

UExL is **pre-1.0**: the engine is public and the benchmark is reproducible, but the API is still allowed to move while it matures on our own production work - [dogfood first](/insights/dogfood-first/), then release. The performance work is not finished either, and the journal says where the remaining time lives: stack push/pop (~14% of the profile, already inlined, hard to shrink safely), comparison dispatch (~13%, would need compile-time type inference in the bytecode), and the ~3.6% the pointer-comparison check itself costs - kept, because it bought 31%. The design documents target 20-35 ns as the eventual floor; whether that is reachable without trading away the stack overflow checks is an open engineering question, and it will be answered in the same journal, with the same profiles.

That journal is the real argument of this post. A team that profiles before optimizing, records every phase with its before-and-after, documents the trade-offs its optimizations impose on users, and publishes the harness is showing you how it treats claims in general - including the ones it will one day make about your system.
