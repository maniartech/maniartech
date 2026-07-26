---
title: "Zero allocations on the hot path: engineering UExL, and proving it"
description: "How our expression engine evaluates boolean and string expressions with zero heap allocations, where it wins against cel-go and expr, where it loses, and how to run the benchmark yourself."
date: "2026-07-23"
order: 1
---

UExL is our embeddable expression language for Go - the kind of engine you reach for when business rules, filters, or computed fields need to be evaluated thousands of times per second inside a larger system. This post makes one precise claim about it, shows the numbers behind that claim, tells you where UExL loses, and gives you the harness to check all of it on your own machine.

That structure is deliberate. Performance posts usually make broad claims and hope nobody checks. We would rather make a narrow claim and insist that you do.

## The claim, stated exactly

Of the three Go expression engines we benchmarked - UExL, cel-go, and expr - **UExL is the only one that evaluates with zero heap allocations on the boolean and string paths.**

Not "low allocations." Not "fast." Zero allocations, on those specific paths. This is the claim we lead with because, unlike wall-clock timings, it is exact and stable: allocation counts do not vary with your hardware, your CPU load, or your Go version's scheduler mood. Either the profiler shows zero or it does not.

## Why allocations matter more than nanoseconds

In a long-running Go service, every heap allocation is a small loan from the garbage collector, and the GC collects its interest at the worst times. An expression engine sitting on a hot path - evaluating rules per request, per record, per event - can allocate millions of times per hour. That shows up not as slow averages but as **latency spikes**: the occasional slow request that is nothing to do with your code and everything to do with collection pauses.

An engine that does not allocate on its hot path simply does not contribute to that problem. That is worth more to a production service than winning any single microbenchmark - which is why it is the property we engineered for and the one we headline.

## The numbers - and the one we lose

From our benchmark run (Go, same machine, same harness for all three engines; timings vary run to run, allocation counts do not):

- **String path:** UExL ~108 ns per evaluation vs ~325 ns (one competitor) and ~348 ns (the other) - with zero allocations against their several.
- **Map access over 100 keys:** UExL ~11,400 ns vs ~15,150 ns (expr) and ~63,500 ns (cel-go).
- **Basic arithmetic: UExL is slower** - ~266 ns vs expr's ~130 ns. We are not the fastest at everything, and pretending otherwise would be exactly the kind of claim this post exists to avoid.

That last line matters. If your workload is dominated by simple arithmetic over trusted inputs, expr is a fine engine and may serve you better today. UExL's case is strongest where expressions are string-heavy, structure-heavy, or running hot enough that GC pressure is a real concern.

## Run it yourself

The benchmark suite lives in the public repository - [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go#performance) - with the harness and methodology in the README. Clone it, run it, and compare your numbers to ours. Your absolute timings will differ from the figures above; the zero-allocation behavior on the boolean and string paths should reproduce exactly, because that is the nature of the claim.

If you find a case where it does not reproduce, we genuinely want the issue report - a benchmark that cannot survive strangers is not a benchmark.

## An honest status label

UExL is **pre-1.0**. The engine is public and the benchmark is reproducible, but the API is still allowed to move while it matures on our own production work - that is how we build everything, [dogfood first](/insights/dogfood-first/). If you adopt it today, you are adopting a fast, measured, honestly-labeled 0.x - and we would rather tell you that plainly than decorate it with a version number it has not earned yet.

## The larger point

We build expression evaluation into client systems regularly - rules engines, filters, computed fields inside business platforms. UExL exists because we kept needing an engine with a specific performance envelope, and building it taught us exactly where the costs live in this class of software.

That is the real argument of this post, beyond any benchmark: **a team that measures precisely, states claims narrowly, and publishes the harness is showing you how it will treat your project's claims too.** If that is the engineering culture you want on your own systems, [tell us what you are building](/estimate/) - a senior engineer replies within one business day.
