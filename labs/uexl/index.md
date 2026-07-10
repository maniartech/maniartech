---
title: "UExL — an embeddable expression engine with zero allocations on the hot path"
description: "An embeddable Go expression engine with zero allocations on the boolean and string paths, reproducible from the repo."
labStatus: "Publish-ready · pre-1.0"
category: "Languages"
license: "TBC (MIT likely)"
repo: "https://github.com/maniartech/uexl-go"
order: 3
---

UExL (Universal Expression Language) is one of the standards we've authored — implementation-first, with the formal spec derived afterward from the finished reference engine. The Go implementation is done and in the publish queue.

## What it is

UExL is an embeddable, platform-independent expression-evaluation engine — the regex of expression evaluation. It turns runtime strings — in config files, database rows, or user-facing rule editors — into evaluated results, with the same semantics everywhere the engine is embedded. It is a real parser → compiler → VM pipeline, not a tree-walker: pre-compile an expression once, evaluate it thousands of times.

It offers readable pipes instead of nested calls, explicit semantics (`??` falls back only on null or absent; `?.` returns null without panicking), Excel-familiar syntax alongside Python/JS styles, and a safe-by-construction Go core that returns errors rather than panicking. The Go engine is the flagship implementation, with the language intended to become a cross-language standard.

## Why it matters

Of the three engines measured — cel-go, expr and UExL — **UExL is the only one with zero allocations on the boolean and string paths**, and the fastest in the scenarios measured.

That allocation claim is the stable one: zero allocations means no GC pressure and predictable latency, which is the real moat. It holds on the boolean/comparison/string hot paths shown — a function call still allocates a couple — and you can reproduce it from the repository. Timings vary run to run, so we lead with the alloc count, which does not.

## Status & how to see it

UExL is **publish-ready but pre-1.0**: the language and implementation are finished, and what remains is release packaging — a license file, a frozen public API, CI, and the `v0.1.0` tag.

- **Engine repository:** the code is public — read it at [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go), where you can run the comparison harness yourself.
- **Playground:** the interactive playground — with a live benchmark button and a bytecode disassembly view — is launching soon, so it is named here without a link until it is publicly reachable.


