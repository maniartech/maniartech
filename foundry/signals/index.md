---
title: "signals — a context-aware, type-safe event system for Go"
description: "A lightweight Go event/signals library — typed, context-aware, lock-free reads, and benchmarks we hold ourselves to."
labStatus: "Published"
category: "Libraries & Frameworks"
license: "MIT"
repo: "https://github.com/maniartech/signals"
order: 4
titleTag: "signals - a Type-Safe Event System for Go"
---

`signals` is a small, type-safe event/signal system for Go — published, MIT, and used in production.

## What it is

`signals` is a typed, thread-safe pub/sub system for Go, with two variants: fire-and-forget **async** signals and error-aware **sync** signals. Every listener receives a `context.Context`, so cancellation and deadlines flow through naturally. The read path is lock-free (copy-on-write), it has zero dependencies, and it's generic: `signals.New[User]()` gives you type-checked payloads.

The core idea in one picture: one emit, many listeners, and the compiler checking the payload type the whole way.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One publisher emits a typed User event through a signal, which fans it out to three independent listeners">
  <g font-family="inherit" font-size="12.5">
    <rect x="40" y="80" width="160" height="40" rx="8" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>
    <text x="120" y="98" text-anchor="middle" fill="rgba(255,255,255,.75)">your code</text>
    <text x="120" y="113" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11.5">Emit(ctx, user)</text>
    <line x1="200" y1="100" x2="288" y2="100" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    <polygon points="288,96 298,100 288,104" fill="rgba(255,255,255,.4)"/>
    <rect x="300" y="76" width="180" height="48" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.65)" stroke-width="1.5"/>
    <text x="390" y="96" text-anchor="middle" fill="#14cf93" font-weight="600">signals.New[User]()</text>
    <text x="390" y="112" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11.5">payload typed at compile time</text>
    <line x1="480" y1="90" x2="568" y2="49" stroke="rgba(20,207,147,.5)" stroke-width="1.5"/>
    <polygon points="565,45 578,45 569,54" fill="rgba(20,207,147,.5)"/>
    <line x1="480" y1="100" x2="568" y2="100" stroke="rgba(20,207,147,.5)" stroke-width="1.5"/>
    <polygon points="568,96 578,100 568,104" fill="rgba(20,207,147,.5)"/>
    <line x1="480" y1="110" x2="568" y2="151" stroke="rgba(20,207,147,.5)" stroke-width="1.5"/>
    <polygon points="565,155 578,155 569,146" fill="rgba(20,207,147,.5)"/>
    <g fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="1.2">
      <rect x="580" y="28" width="150" height="34" rx="6"/>
      <rect x="580" y="83" width="150" height="34" rx="6"/>
      <rect x="580" y="138" width="150" height="34" rx="6"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12">
      <text x="655" y="49">welcome email</text>
      <text x="655" y="104">audit log</text>
      <text x="655" y="159">analytics</text>
    </g>
  </g>
</svg>
<figcaption><strong>One emit, N listeners.</strong> The publisher never knows who is listening; each listener gets the typed payload and a <code>context.Context</code> for cancellation. Async signals dispatch and move on; sync signals run listeners in order and can report errors back.</figcaption>
</figure>

## Using it from code

The async variant is fire-and-forget - emit and keep moving:

```go
import "github.com/maniartech/signals"

var UserRegistered = signals.New[User]()

UserRegistered.AddListener(func(ctx context.Context, u User) {
    // send the welcome email
})

UserRegistered.Emit(ctx, newUser)
```

The sync variant is for work that must succeed together - listeners run in order, errors come back, and you can roll back:

```go
var OrderPlaced = signals.NewSync[Order]()

OrderPlaced.AddListenerWithErr(
    func(ctx context.Context, o Order) error {
        return chargeCard(ctx, o) // may fail
    })

if err := OrderPlaced.TryEmit(ctx, order); err != nil {
    // a listener failed - roll the transaction back
}
```

Because the signals are generic, passing the wrong payload type is a compile error, not a runtime surprise.

## Why it matters

It's public, it's MIT, and it's used in production — by ManiarTech and by other developers who pulled it into their own systems. The library is the proof, not a claim about it: the repository, the CI matrix, the benchmarks, and the package docs are all open for anyone to read.

What we're proud of is the discipline behind the numbers. Every performance figure comes from a committed benchmark you can re-run. On our reference machine, a sync emit on the lock-free read path measures around **8 ns with zero allocations** for a single listener. We label that as **guidance, not a guarantee** — it's machine-specific, and your hardware will differ. We'd rather under-promise a reproducible number than headline one you can't check. When an earlier blanket performance claim couldn't be reproduced, we retired it and rebuilt the numbers the honest way.

## Status & how to see it

Published and live. You can look at all of it yourself:

- **Source & benchmarks:** [github.com/maniartech/signals](https://github.com/maniartech/signals) — run `go test -bench` and reproduce the numbers above.
- **CI, Go Report Card, and pkg.go.dev** are all public from the README.


