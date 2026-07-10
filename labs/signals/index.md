---
title: "signals — a context-aware, type-safe event system for Go"
description: "A lightweight Go event/signals library — typed, context-aware, lock-free reads, and benchmarks we hold ourselves to."
labStatus: "Published"
category: "Libraries & Frameworks"
license: "MIT"
repo: "https://github.com/maniartech/signals"
order: 4
---

`signals` is a small, type-safe event/signal system for Go — published, MIT, and used in production.

## What it is

`signals` is a typed, thread-safe pub/sub system for Go, with two variants: fire-and-forget **async** signals and error-aware **sync** signals. Every listener receives a `context.Context`, so cancellation and deadlines flow through naturally. The read path is lock-free (copy-on-write), it has zero dependencies, and it's generic: `signals.New[User]()` gives you type-checked payloads.

## Why it matters

It's public, it's MIT, and it's used in production — by ManiarTech and by other developers who pulled it into their own systems. The library is the proof, not a claim about it: the repository, the CI matrix, the benchmarks, and the package docs are all open for anyone to read.

What we're proud of is the discipline behind the numbers. Every performance figure comes from a committed benchmark you can re-run. On our reference machine, a sync emit on the lock-free read path measures around **8 ns with zero allocations** for a single listener. We label that as **guidance, not a guarantee** — it's machine-specific, and your hardware will differ. We'd rather under-promise a reproducible number than headline one you can't check. When an earlier blanket performance claim couldn't be reproduced, we retired it and rebuilt the numbers the honest way.

## Status & how to see it

Published and live. You can look at all of it yourself:

- **Source & benchmarks:** [github.com/maniartech/signals](https://github.com/maniartech/signals) — run `go test -bench` and reproduce the numbers above.
- **CI, Go Report Card, and pkg.go.dev** are all public from the README.


