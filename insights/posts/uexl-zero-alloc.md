---
title: "UExL: the only zero-allocation expression engine (run the benchmark yourself)"
description: "A reproducible-benchmark launch post — leads with the exact zero-alloc claim and a harness you run on your own machine. Coming soon."
postStatus: "Coming soon"
date: "2026-06-25"
order: 1
---

This piece is in progress — here's what it will cover.

## What it will cover

- The precise, falsifiable claim: UExL evaluates on the hot path with zero heap allocations — stated exactly, no looser superlative.
- A public, runnable benchmark harness so you can reproduce the numbers on your own machine, rather than take our word for it.
- Why absolute timings vary by hardware and Go version — and why what's reproducible is the zero-allocation behaviour, not a single wall-clock figure.
- The design choice that buys zero-alloc, and where it doesn't apply.

Want to see how we think about performance and honest claims? Read more in [Insights](/insights/), or [get a free estimate](/estimate/) for your own project.
