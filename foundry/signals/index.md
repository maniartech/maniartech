---
title: "signals"
headline: "One emit, N typed listeners - checked by the compiler."
description: "A typed, in-process signaling library for Go - the observer pattern with compile-time payload safety: async fire-and-forget and error-aware sync signals inside one binary, with a context in every listener."
eyebrow: "Library"
titleTag: "signals - a Type-Safe Event System for Go"
seoDescription: "signals: typed in-process signaling for Go - the observer pattern with generics, sync and async variants, transaction-safe TryEmit. MIT, v1.3.1."
order: 4
tocDepth: "3"
statusLine: "MIT | Tagged v1.3.1 | In production in our own systems | 331 stars at last review"
artifacts:
  - label: "Repository"
    url: "https://github.com/maniartech/signals"
    primary: true
  - label: "Package docs"
    url: "https://pkg.go.dev/github.com/maniartech/signals"
railMeta:
  - { k: "Type", v: "Go library - typed pub/sub events" }
  - { k: "Maturity", v: "Stable; tagged v1.3.1. A v1.4 rewrite is in progress, not yet published" }
  - { k: "Availability", v: "Public source, public tagged release" }
  - { k: "Licence", v: "MIT" }
  - { k: "Adoption", v: "Adoptable; go-gettable today" }
  - { k: "Evidence", v: "Used in production in ManiarTech's own systems" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Repository"
    note: "Source, CI and a committed benchmark file"
    url: "https://github.com/maniartech/signals"
  - label: "pkg.go.dev"
    note: "API reference as Go publishes it"
    url: "https://pkg.go.dev/github.com/maniartech/signals"
reviewKicker: "Public evidence"
privateReview: "The v1.4 work in progress - a lock-free copy-on-write core with a committed benchstat discipline - can be walked through on request; it has not reached the public repository yet."
---

Modules in one Go binary need to react to each other without importing each other - the observer pattern, made type-safe.

## One event, typed listeners

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One publisher emits a typed User event through a signal, which fans it out to three independent listeners, each receiving the typed payload and a context">
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
<figcaption><strong>The publisher never knows who is listening - but everyone is in the same process.</strong> These are function calls inside one binary, not messages on a wire. Each listener receives the typed payload and a <code>context.Context</code>, so cancellation and deadlines flow through; passing the wrong payload type is a compile error, not a runtime surprise.</figcaption>
</figure>

`signals` is **an in-process signaling mechanism** - not a message broker, not an event-driven services pattern; nothing crosses a network or gets persisted. Go teams usually improvise this shape with channels that leak goroutines, `interface{}` payloads that defer type errors to runtime, or ad-hoc callback slices with no error story. Here the payload is a type parameter - `signals.New[User]()` will not accept an `Order` - every listener receives a `context.Context`, and the failure semantics are chosen per signal.

## Two signal types, because two kinds of work exist

Fire-and-forget work (analytics, notifications) and must-succeed-together work (payments, inventory) have different failure semantics, so the library gives them different types rather than one type with flags - from the README:

```go
// Async - non-critical events; emit and move on.
var UserRegistered = signals.New[User]()

UserRegistered.AddListener(func(ctx context.Context, u User) {
    // send the welcome email
})
UserRegistered.Emit(ctx, User{ID: 1, Name: "John Doe"})

// Sync - transaction-safe; listeners run in order, errors come back.
var OrderProcessed = signals.NewSync[Order]()

OrderProcessed.AddListenerWithErr(func(ctx context.Context, o Order) error {
    return chargeCard(ctx, o) // may fail
})
if err := OrderProcessed.TryEmit(ctx, order); err != nil {
    // a listener failed - roll the transaction back
}
```

`TryEmit` on a sync signal is the transaction-safety primitive: listeners execute in order, the first error stops the chain, and the caller decides what failure means. The async variant keeps its own contract - dispatch happens off the caller's critical path.

## The measured result

The public repository commits its benchmark file (`signals_benchmark_test.go`), and the README's headline figure comes from it: **5.66 ns/op for a single-listener emit, with zero allocations** on that path, and **93.5% test coverage** - the README's own numbers, reproducible with `go test -bench` on your hardware. As with every microbenchmark, the figure is machine-specific: treat it as the shape of the cost, not a guarantee.

## Interest, stated as interest

The repository stood at **331 stars** when this page was last reviewed - the most externally validated artifact in our Foundry. That is public interest, not adoption: we know it runs in production in **our own systems**, and we do not claim to know who else has shipped it.

## What's in flight - stated as in flight

A v1.4 rewrite exists in the project's working tree and has **not yet reached the public repository**. It replaces the current `sync.RWMutex` listener list with a lock-free copy-on-write core - emission becomes a single atomic load of an immutable slice - and it carries a written measurement rule: *no performance number reaches the README until it is produced by a committed benchmark and compared against a committed baseline with `benchstat`*. It also documents a breaking change to async `Emit` semantics in advance of shipping it.

We describe that work here because the discipline is the point - but none of it is public yet, so none of it is offered as evidence. What you can verify today is v1.3.1.

## Known limits

- **In-process only, by design.** `signals` connects modules inside one binary. It is not a message bus: there is no delivery across processes, no persistence, no retry, no ordering guarantee between separate binaries. If you need events to survive a crash or cross a service boundary, you need a broker - this library is the wrong tool, on purpose.
- **Concurrency in v1.3.1 is mutex-based.** The published release guards its listener list with `sync.RWMutex`; the lock-free core is unreleased work in progress, as stated above.
- **Benchmark figures are machine-specific**, and the README's coverage figure (93.5%) is its own claim - re-measure both on your checkout if they matter to your decision.
- **A breaking change is planned** for async `Emit` semantics in v1.4. Pin the tag; the migration path is documented with the rewrite.

## Status: four facts, kept separate

- **Availability** - public source and a public tagged release: `go get github.com/maniartech/signals`.
- **Licence** - **MIT**, in the repository today.
- **Maturity** - **stable at v1.3.1**. The v1.4 rewrite is unpublished work in progress and is labelled as such everywhere on this page.
- **Adoption** - adoptable now; pin `v1.3.1`.

## What this demonstrates

An in-process signaling library is a small thing to build and an easy thing to build wrong. The engineering worth noticing is in the contracts: payloads the compiler checks, contexts that flow to every listener, failure semantics chosen per signal instead of discovered in production - and a scope statement that says plainly what the library refuses to be. The work in flight shows the other half of the discipline: a performance rewrite that will not publish a number without a committed benchmark behind it. Knowing where a mechanism's boundary is - and saying so - is what an enterprise customer is actually hiring when the module seams in question are theirs.
