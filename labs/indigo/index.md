---
title: "Indigo — a Go superset that compiles to clean, idiomatic Go"
description: "A Go superset language whose compiler holds one contract: no output is better than wrong output."
labStatus: "Research · in development"
category: "Languages"
license: "TBC (frontend BSD-3)"
order: 1
---

Indigo is the flagship of the standards we've authored — ManiarTech making a language, not just using one. It is pre-1.0, and we are letting it mature at the pace a language deserves.

## What it is

Indigo is a Go superset. Every valid Go file is already a valid Indigo file, so adoption costs nothing to start. On top of Go it adds a few carefully chosen ergonomics — a ternary, lambdas, pipelines, nullish coalescing, optional access, Python-style slicing, and a `!` / `catch` form of error handling that removes the `if err != nil { return }` boilerplate while keeping Go's explicit `(T, error)` model intact. No exceptions, no panic/recover, no injected runtime.

It compiles `.indigo` files to clean, idiomatic Go you read in the diff — output that stays in the plain Go toolchain and works with your existing build systems, linters and editors unchanged. There is no runtime library and no lock-in: you can stop using Indigo at any time and keep the generated Go.

## Why it matters

The compiler holds one contract: **no output is better than wrong output.** It never writes a `.go` file it cannot stand behind — no widening to `any`, no hidden closures, no reflection outside one approved helper, no compiler-smell names. If a feature cannot preserve Go's exact behavior — side effects, short-circuiting, defer ordering, panic timing, init order — it is rejected, not faked.

That is a claim you can check by reading the generated diff. Indigo is a Go superset that compiles to clean, idiomatic Go you read in the diff — the proof is in the output, not in a promise about it.

## Status & how to see it

Indigo is **pre-1.0**, with normative, RFC-grade specs as the source of truth and a compiler under active development. We treat pre-1.0 as patient maturation — the rigor (formal specs, conformance, a meaningful-coverage bar) is what makes the label read as serious rather than unfinished.

The public-versus-internal status of the source is not yet confirmed, so we name the project plainly here rather than link to a repository. When publication is settled, this page will carry the repository and, where the pure-Go compiler allows, an interactive playground.


