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

UExL is our embeddable expression language for Go - the kind of engine you reach for when business rules, filters, or computed fields need to be evaluated thousands of times per second inside a larger system. This post makes one precise claim about it, shows the numbers behind that claim, tells you exactly where the claim stops, and gives you the harness to check all of it on your own machine.

That structure is deliberate. Performance posts usually make broad claims and hope nobody checks. We would rather make a narrow claim and insist that you do.

## The claim, stated exactly

Of the three Go expression engines we benchmarked - UExL, cel-go, and expr - **UExL is the only one that evaluates with zero heap allocations on the boolean/comparison and string-matching paths.**

Not "low allocations." Not "fast." Zero allocations, on those specific paths, for pre-compiled expressions. This is the claim we lead with because, unlike wall-clock timings, it is exact and stable: allocation counts do not vary with your hardware, your CPU load, or your Go version's scheduler mood. Either the profiler shows zero or it does not.

## Why allocations matter more than nanoseconds

In a long-running Go service, every heap allocation is a small loan from the garbage collector, and the GC collects its interest at the worst times. An expression engine sitting on a hot path - evaluating rules per request, per record, per event - can allocate millions of times per hour. That shows up not as slow averages but as **latency spikes**: the occasional slow request that is nothing to do with your code and everything to do with collection pauses.

The arithmetic is unforgiving. An engine that allocates four times per evaluation, evaluating a modest 5,000 expressions per second, is handing the collector 72 million objects an hour - forever, for as long as the service runs. An engine that does not allocate on its hot path simply does not contribute to that problem, no matter how hot the path gets. That is worth more to a production service than winning any single microbenchmark - which is why it is the property we engineered for and the one we headline.

## How the engine avoids allocating

Zero-allocation evaluation is not a trick; it is a set of design decisions that all point the same way.

- **Compile once, evaluate many.** UExL is a three-stage pipeline - parser to AST, compiler to bytecode, then a small VM that executes it. All the expensive work (parsing, validation, function resolution) happens once at compile time. The hot path only executes bytecode.
- **Nothing per-evaluation on the fast paths.** For boolean, comparison, and string-matching expressions, the VM works without touching the heap - no boxed intermediates, no per-call closures, no temporary slices.
- **Pooled VMs, immutable inputs.** Virtual machines are reused from a pool rather than constructed per call, and compiled expressions and environments are immutable - which is also what makes concurrent evaluation safe without locks around your rules.
- **Errors, never panics.** Bad input produces an error value, not a recovered panic - a correctness decision, but also a performance one, because panic/recover machinery is not sitting in the hot loop.

None of this is exotic; it is the standard playbook for latency-sensitive Go, applied all the way down instead of most of the way.

## The numbers, with their reproducibility framing

These are warm-state medians over six benchmark runs on one of our machines (AMD Ryzen 7 5700G, Go 1.26), from the head-to-head harness linked below. Treat the timings as guidance, not guarantees - they are machine-specific and vary run to run. The allocation counts are the part that reproduces exactly.

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
    <text x="40" y="288" fill="rgba(255,255,255,.45)" font-size="11.5">Warm-state medians, six runs, AMD Ryzen 7 5700G / Go 1.26. Timings drift by machine; the allocation counts reproduce exactly.</text>
  </g>
</svg>
<figcaption><strong>The two hot paths, drawn.</strong> Bars are our medians - rerun the public harness and trust your own. The zeros are the durable claim.</figcaption>
</figure>

## Where the claim stops

A narrow claim is only honest if its edges are drawn plainly, so here they are.

- **Function calls still allocate.** Two allocations per call - fewer than the four the other engines show, but not zero. The zero-allocation claim is scoped to the boolean/comparison and string paths, and we state it that way everywhere.
- **One-shot evaluation is not the fast path.** If you parse, compile, and run an expression once and throw it away, the whole pipeline costs on the order of ~10,000 ns with allocations. UExL's performance case assumes you pre-compile and evaluate repeatedly - which is what hot paths do, but if your workload evaluates each expression once, this engine's headline property does not apply to you.
- **Timings are one machine's story.** We publish medians and the method, not universal truths. If your benchmark disagrees with our nanoseconds, believe yours.

If your workload is one-shot, allocation-insensitive, and simple, any of the three engines will serve you well - expr and cel-go are both solid projects. UExL's case is strongest where expressions are string-heavy, structure-heavy, or running hot enough that GC pressure is a real concern.

## Run the benchmark yourself

The harness and methodology are public: the repository at [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go#performance) documents the setup - clone the shared comparison suite, add the UExL benchmark file from the repo, and run:

```bash
go test -bench=. -benchmem -benchtime=2s -count=6
```

Your absolute timings will differ from the figures above; the zero-allocation behavior on the boolean and string paths should reproduce exactly, because that is the nature of the claim.

If you find a case where it does not reproduce, we genuinely want the issue report.

<p class="mt-pull">A benchmark that cannot survive strangers is <em>not a benchmark</em>.</p>

## An honest status label

UExL is **pre-1.0**. The engine is public and the benchmark is reproducible, but the API is still allowed to move while it matures on our own production work - that is how we build everything, [dogfood first](/insights/dogfood-first/). If you adopt it today, you are adopting a fast, measured, honestly-labeled 0.x - and we would rather tell you that plainly than decorate it with a version number it has not earned yet.

## The larger point

We build expression evaluation into client systems regularly - rules engines, pricing and discount logic, feature targeting, computed fields inside business platforms. UExL exists because we kept needing an engine with a specific performance envelope, and building it taught us exactly where the costs live in this class of software.

That is the real argument of this post, beyond any benchmark: **a team that measures precisely, states claims narrowly, publishes the harness, and draws the edges of its own claim is showing you how it will treat your project's claims too.** If that is the engineering culture you want on your own systems, [tell us what you are building](/estimate/) - a senior engineer reviews it and responds.
