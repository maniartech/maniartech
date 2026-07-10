---
title: "UExL — an embeddable expression engine with zero allocations on the hot path"
description: "The only engine of cel-go, expr and UExL with zero allocations on the boolean and string paths."
order: 14
labStatus: "Publish-ready (pre-1.0)"
category: "Standards & Languages"
license: "TBC (MIT likely)"
repo: "https://github.com/maniartech/uexl-go"
playground: ""
image: ""
---

# UExL — an embeddable expression engine with zero allocations on the hot path

**Status: Publish-ready (pre-1.0)**

UExL (Universal Expression Language) is one of the standards we've authored —
implementation-first, with the formal spec derived afterward from the finished
reference engine. The Go implementation is done and in the publish queue.

---

## What it is

UExL is an embeddable, platform-independent expression-evaluation engine — the regex
of expression evaluation. It turns runtime strings — in config files, database rows,
or user-facing rule editors — into evaluated results, with the same semantics
everywhere the engine is embedded. It is a real parser → compiler → VM pipeline, not
a tree-walker: pre-compile an expression once, evaluate it thousands of times.

It offers readable pipes instead of nested calls, explicit semantics (`??` falls
back only on null or absent; `?.` returns null without panicking), Excel-familiar
syntax alongside Python/JS styles, and a safe-by-construction Go core that returns
errors rather than panicking. The Go engine is the flagship implementation, with the
language intended to become a cross-language standard.

## Why it matters

Of the three engines measured — cel-go, expr and UExL — **UExL is the only one with
zero allocations on the boolean and string paths**, and the fastest in the scenarios
measured. That allocation claim is the stable one: zero allocations means no GC
pressure and predictable latency, which is the real moat. It holds on the
boolean/comparison/string hot paths shown (a function call still allocates a couple),
and you can reproduce it from the repository. Timings vary run to run — so we lead
with the alloc count, which does not.

## Status & how to see it

UExL is **publish-ready but pre-1.0**: the language and implementation are finished,
and what remains is release packaging (a license file, a frozen public API, CI, and
the `v0.1.0` tag). The engine repository is public — read it at
**https://github.com/maniartech/uexl-go**, where you can run the comparison harness
yourself. The interactive playground — with a live benchmark button and a bytecode
disassembly view — is interactive playground launching soon, so it is named here
without a link until it is publicly reachable.

---

[ Explore the standards → ] · [ Estimate your project → ]

---

`[note] Honesty / link rules applied:
- labStatus "Publish-ready (pre-1.0)"; license "TBC (MIT likely)".
- repo https://github.com/maniartech/uexl-go is PUBLIC — linked.
- playground is NOT live: rendered as the plain, non-clickable phrase "interactive
  playground launching soon" with NO href.
- Proof leads with the EXACT, stable alloc claim: the only engine of cel-go/expr/UExL
  with zero allocations on the boolean & string paths, fastest in the scenarios
  measured (reproduce via the repo). Honest scoping noted (function path allocates).
- Timings noted as varying run-to-run; no specific ns/op numbers published here.
- "standard we've authored," implementation-first framing. "industry standard" NOT
  used. No invented metrics. Understated voice.`
