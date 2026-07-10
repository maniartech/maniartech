---
title: "Standards & Languages"
description: "The foundations we've authored — a Go superset (Indigo) and data, time, expression, and API standards. Some live and runnable today, the rest maturing in the open."
eyebrow: "The depth behind the work"
---

Over the years we've built and published our own foundations — a programming language, and a set of data, time, expression, and API standards we've authored. Some are live and runnable today; the rest are research and reference implementations we're maturing in the open. What's public, you can read and run right now. What's still maturing, here's the spec to critique — and none of it is something we'd ever make you adopt.

This is the work behind the work. It's *why* our client engineering runs deep. Below, each item tells you exactly what you can click today and what's still coming.

## Honest status, up front

We'd rather you know exactly where each project stands — and exactly what you can click — than have you discover it later. So every item on this page carries a plain status label, and the page is split into two halves: what you can open and run today, and what's maturing in the open (spec to read, no public code yet).

**Open now — read, run, or clone today:**

- **Published** — public, documented, and usable today, with a live link below.

**Maturing in the open — spec to read; public code not live yet:**

- **Publish-ready** — implementation complete; we're packaging the public release (license, API freeze, first tag). No public link yet.
- **Research / Draft** — the specification exists and is maturing; we invite review. Some have a live reference implementation; some are spec-only so far. Each item says which.
- **Design phase** — the idea is specified; the reference implementation is still being built.
- **Internal** — we use it in our own production; the spec is written, the public library isn't released yet.

None of these are "industry standards" handed down by a committee. They are **standards we've authored** — some young, some further along — and we label them honestly so you can judge for yourself. Where a link is dark, it's dark on purpose: we won't point you at a "coming soon" page and call that verifiable.

## Indigo — a Go superset whose output is plain, idiomatic Go you read in the diff

> **Status: Maturing in the open · pre-1.0 · active development**

Indigo is to Go what TypeScript is to JavaScript: a superset that adds a few carefully chosen ergonomics — and compiles your `.indigo` files down to clean, idiomatic `.go`. You don't take that on faith: the generated `.go` is right there in the diff — read it, diff it, ship it (or throw Indigo away and keep the Go).

It removes the friction every Go developer feels daily — error-handling boilerplate, no ternary, no map/filter, verbose nil checks — without changing what Go *is*:

- **Every valid Go file is already valid Indigo.** Adoption is zero-friction; you opt in feature by feature.
- **The output is plain Go.** It works with your existing toolchain, linters, and editors unchanged.
- **No runtime. No lock-in.** Nothing is injected into your code. Stop using Indigo any time and keep the generated Go forever.

A few of the ergonomics it adds — and exactly what each compiles down to. This table *is* the proof; the right column is the Go you'd read in the output:

| In Indigo | Compiles to |
|---|---|
| `data := load(path)!` + a function-scoped `catch` | idiomatic `if err != nil { return … }` |
| `users \|filter: $.Active \|map: $.Name` | a single fused `for` loop |
| `ok ? "ready" : "pending"` | a safe if/else expression |
| `input ?? "guest"` · `user?.Address?.City` | explicit, nil-guarded checks |

The engineering principle behind it: **"no output is better than wrong output."** Indigo refuses to write a `.go` file it can't stand behind. It preserves Go's exact semantics — side effects, short-circuiting, panic timing, defer ordering, package-init order — and if a feature can't preserve them for some construct, that feature is rejected, not faked. The behavior is pinned down in normative, RFC-grade specifications; errors carry stable codes (`indigo explain IND-PIPE-007`); and there's real tooling alongside it — an LSP, a VS Code extension, source maps, and an MCP server that exposes the compiler to AI tools. When the repo is public, every one of those is one click below — until then, treat this list as a claim we're about to let you check, not one we expect you to take on trust.

**Why it's still pre-1.0, and why that's the point.** A language that rewrites your code has to be *right* before it's fast to ship. We're maturing Indigo patiently — specs first, conformance second, release third — which is exactly why "pre-1.0" here should read as *serious*, not *unfinished*. When we ship, the spec version history and conformance suite ship with it, so "patient" is something you can read, not just a word on a page.

[Read more about Indigo →](/foundry/indigo/)

## The standards we've authored

Data. Time. Expressions. The API itself. These are the foundations software is built *on* — and over the years we've designed our own, each as an open specification with a reference implementation. One of them you can run in your browser right now (Internet Object); one ships today as a Go library (NITES via GoTime). The rest are spec-to-read, code-still-maturing — and each one below tells you which. Here's where each stands, told straight.

### Internet Object — a schema-first, human-readable data format

> **Status: Open now · Published · spec 1.0 Draft (beta) · live playground + two reference parsers**

A compact, schema-first alternative to JSON, designed from a clean slate for the web and AI era rather than retrofitted from JavaScript notation. It separates schema from data so keys aren't repeated on every record — **over 40% smaller than minified JSON** in the live playground (up to ~60% on nested data, and the Internet Object side isn't even compressed), and in the LLM era, **~30% fewer tokens** (measured with the GPT-4 tokenizer, and reproducible from the public benchmark). It's a respectful JSON alternative: it credits JSON rather than trashing it.

- **You can try it right now.** A live, in-browser playground lets you write Internet Object, watch it validate against a schema in real time, and compare the output against JSON.
- Reference parsers in **JavaScript/TypeScript** and **Python** are live today; Rust, Go, C#, and Dart parsers are on the roadmap.
- We use it internally — honest dogfooding, not a slide-deck format.

**Honest status:** the spec is a 1.0 *Draft* (work in progress); most features are marked beta, a few experimental; nothing is locked as "stable" yet. It's not a weekend toy: the JavaScript reference implementation's first public commit dates to **December 2018** — you can read the full history in `git log` on the public repo. That's the verifiable maturity signal; we're not rounding it into a slogan.

[Read more about Internet Object →](/foundry/internet-object/)

### UExL — the regex of expression evaluation

> **Status: Publish-ready · pre-1.0 · implementation complete · runnable benchmark live now**

An embeddable, language-independent expression engine — the way regex became the universal standard for text patterns, UExL aims to be a universal standard for evaluating expressions. It turns runtime strings (in config files, database rows, or user-authored rule editors) into evaluated results, with the same semantics everywhere it's embedded. It's a real **parser → compiler → VM**, not a tree-walking toy.

- **Reproducible benchmarks you can run yourself.** Head-to-head against cel-go and expr on the same hardware, UExL is the only one with **zero allocations** on the boolean/comparison and string-matching paths, and the fastest across the scenarios we measured (string match ~108 ns vs ~325/348 ns; a map over 100 items ~11,400 ns vs ~15,150 / ~63,500). Timings vary run-to-run; the allocation counts are exact and stable — UExL's most durable advantage, and the claim your own run will confirm. The `benchmarks/` and `vm/` directories ship in the repo, so the strong claim is the one *your* run makes, not ours.
- **Explicit semantics, no silent surprises:** nullish fallback that preserves `0`/`""`/`false`, optional chaining that returns null instead of panicking, Excel-familiar syntax for non-engineers.
- **Safe by construction:** errors, never panics; immutable, goroutine-safe compiled expressions.

**Honest status:** the language and Go implementation are complete and the repo is public now; what remains is release packaging (license finalization, public API freeze, the `v0.1.0` tag) — so we label it pre-1.0, and the interactive playground follows with the release. A pre-1.0 API may still change; the label is itself an honest signal.

[Read more about UExL →](/foundry/uexl/)

### NITES — one intuitive time format for every language

> **Status: Open now (via GoTime) · Research / Draft · spec v1.0 (finalizing) · live reference implementation**

Natural and Intuitive Time Expression Syntax: one human-readable, case-insensitive set of date/time format specifiers to replace the fragmented mess of `strftime`, Go's `2006-01-02` reference date, and the case-sensitive `yyyy`/`MM` conventions that differ language to language. Single character means no padding, doubled means zero-padded; minutes are `i`/`ii`, not `m` — which quietly removes the classic month-vs-minute bug. Named layouts (`iso`, `rfc`, `sql`) replace cryptic format strings.

- **It already ships in real code.** NITES is the specification; **GoTime**, our published Go library, is its reference implementation — so this is a standard that runs today, not vaporware. This is the one item in this section, besides Internet Object, with a live artifact to click.
- Aspiration stated honestly: we'd like NITES to become a cross-language standard. Today it's a v1.0 draft, finalizing, with one reference implementation.

## FUSE — REST that's live by default

> **Status: Maturing in the open · Research / Design phase · spec maturing · reference implementation in progress**

Fast Unified Server Exchange: an open protocol that unifies REST, realtime push, and reactive (live) queries on one server, one route table, one handler — no message broker, no WebSocket fleet, no second tech stack. A read handler marked live stays live: the protocol captures what data the handler read, watches for changes, and re-pushes the new result automatically — no developer-written pub/sub or cache invalidation. (FUSE is the protocol; **FuseAPI** is the Go reference implementation of it.)

What makes the FUSE specs worth reading is their intellectual honesty, which we consider a feature, not a disclaimer:

- **Explicit non-goals.** FUSE is *not* for durable/exactly-once delivery, *not* a gRPC or Kafka replacement, *not* multi-node guaranteed fan-out. A framework that claims it's best for everything invites rejection.
- **An honest comparison** that names the alternatives — gRPC, Socket.IO, Mercure, Convex — and concedes where each of them wins:

| vs. | They win when… | FUSE fits when… |
|---|---|---|
| **gRPC** | you need strict contracts / cross-language RPC at scale | one server, REST + live, no second stack |
| **Socket.IO** | you want a mature, battle-tested socket layer | you don't want to hand-write pub/sub or invalidation |
| **Mercure** | you want a standalone SSE hub decoupled from your API | reactivity should live *in* the handler |
| **Convex** | you'll adopt a full managed backend platform | you keep your own DB/stack and add reactivity |

**Honest status:** this is design-phase research. The wire protocol is **not frozen**; a proof-of-concept comes first (proving automatic reactivity over stock Postgres against a "no-stale" invariant) before the spec is finalized or more languages are added. We're publishing the research now and building the framework as time allows — so this is a spec to read and critique, not yet a library to build on.

## AddressQL — SQL-like power you can paste into a URL

> **Status: Maturing in the open · Internal (used in our own production) · spec v1 · library pre-public**

AddressQL is a URL-native, backend-neutral query language. Express filtering, projection, sorting, and pagination as a single readable, cacheable query string — SQL-like power you can paste into a browser address bar. Because the canonical form is deterministic, identical intent produces an identical URL and therefore an identical cache key, so CDN caching and URL signing work without any client-side normalization. The same query string runs against MongoDB today and SQL tomorrow.

- **Used where it counts: in our own production.** The concrete use is the proof — we send AddressQL queries straight from the browser to our APIs, which run them as SQL-like queries over MongoDB in production.
- **Honest non-goals, again:** read-only (no mutations), no auth (the server injects scope), no non-deterministic functions like `now`/`random` that would break caches. The same "here's what we deliberately don't do" discipline as FUSE.
- Designed as a cross-language standard from day one — portability specs for Go, JavaScript, and Rust are already written, alongside a full "Mastering AddressQL" reference.

**Honest status:** internal and used in our own production; the specification is v1; the Go reference library is pre-public. No install or repo links here until it's released.

## This is the rigor your project inherits

You'll likely never write a line of Indigo or send a single Internet Object document. That's fine — we don't make you adopt any of this. Your project is built on mainstream, hireable technology you (or any team) can maintain.

So why does it matter that we author standards and build a language? Because it's the same engineering discipline, pointed at your problem:

- The team that insists **"no output is better than wrong output"** in a compiler brings that same refusal-to-fake-it to your codebase.
- The team that ships a **runnable benchmark** and says *"don't take our word, run it yourself"* gives you software whose claims you can check.
- The team that writes **explicit non-goals** before features — that names what it *won't* do — is the team that will tell you, honestly, when something shouldn't be built.

That's the difference between a team that *uses* technology and one that can *build* it when your problem needs more than off-the-shelf. And we hold ourselves to the same standard on this very page: what's public, you can read and run today — open the Internet Object playground, clone the JavaScript parser and read its history back to 2018, pull GoTime and run NITES. What's still maturing, we're not asking you to trust on faith — we're handing you the spec to critique, and we'll light up each repo and benchmark as it actually ships. Verifiable doesn't mean "everything's clickable today"; it means we only claim what you can check, and we tell you plainly which is which.


**[Get a free project estimate →](/estimate/)**  ·  [Explore the Foundry →](/foundry/)
