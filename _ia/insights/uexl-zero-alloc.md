---
title: "UExL: the only zero-allocation expression engine (run the benchmark yourself)"
description: "A reproducible-benchmark launch post — leads with the exact zero-alloc claim and a harness you run on your own machine; timings vary."
order: 10
postStatus: "Coming"
date: 2026-07-01
image: ""
---

# UExL: the only zero-allocation expression engine (run the benchmark yourself)

**`[DRAFT — to write]`**

A reproducible-benchmark launch post. Not yet written; do not present as published.

## Outline

- Lead with the precise, falsifiable claim: UExL evaluates on the hot path with zero
  heap allocations — state it exactly, no looser superlative.
- Ship the harness first: a public, runnable benchmark repo so the reader reproduces the
  numbers on their own machine. Don't take our word for it.
- Be honest that absolute timings vary by hardware/Go version; what's reproducible is the
  zero-allocation behaviour, not a single wall-clock figure.
- Walk the design choice that buys zero-alloc, and where it doesn't apply.
- `[verify — Aamir]` link the live benchmark repo and confirm the exact calibrated wording
  the results support before any comparative ("faster than X") claim enters the body.
