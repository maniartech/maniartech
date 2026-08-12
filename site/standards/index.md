---
title: "Standards & Languages"
description: "ManiarTech-authored specifications, languages and protocol research: one public specification, two public implementations, and concept notes over private work."
eyebrow: "The depth behind the work"
pageStatus: "Public working draft"
lastReviewed: "11 August 2026"
# The registry - THE single source of truth for the hero status board. Each row
# anchors to its section below and MUST carry all four facts, because conflating
# them is how a page like this misleads: `public` (what anyone can open TODAY),
# `review` (what a qualified customer can be walked through privately),
# `maturity` (where it actually stands), and `adopt` (whether a customer should
# take it on). `open: true` means there is a public artifact to click today.
# seo-check enforces all four fields plus the working-draft notice.
registry:
  - name: "Internet Object"
    what: "Schema-first, human-readable data format"
    public: "Specification 1.0 Draft, playground, JS/TS parser"
    review: "Implementation walkthrough"
    maturity: "Experimental public draft"
    adopt: "Evaluation only"
    open: true
    anchor: "#internet-object"
  - name: "UExL"
    what: "Embeddable expression engine - parser, compiler, VM"
    public: "Go source and runnable benchmark; specification unpublished"
    review: "Draft spec, architecture, benchmark"
    maturity: "Pre-release, unlicensed"
    adopt: "Evaluation only"
    open: true
    anchor: "#uexl"
  - name: "NITES"
    what: "One date/time format syntax across languages"
    public: "GoTime implementation and docs; standalone spec unpublished"
    review: "Draft cross-language specification"
    maturity: "GoTime usable; standard unfinished"
    adopt: "GoTime adoptable (MIT)"
    adoptable: true   # the ONLY genuinely adoptable artifact here - drives the mint accent
    open: true
    anchor: "#nites"
  - name: "Indigo"
    what: "A Go superset that compiles to idiomatic Go"
    public: "Concept note only"
    review: "Compiler, specification and tooling demonstration"
    maturity: "Active internal development"
    adopt: "Not available for adoption"
    anchor: "#indigo"
  - name: "FUSE"
    what: "One protocol for REST, realtime push and live queries"
    public: "Concept and non-goals only"
    review: "Protocol design and proof-of-concept, when appropriate"
    maturity: "Design phase"
    adopt: "Not available for adoption"
    anchor: "#fuse"
  - name: "AddressQL"
    what: "A URL-native, backend-neutral query language"
    public: "Concept note and sanitized production-use description"
    review: "Private specification and architecture walkthrough"
    maturity: "Internal implementation"
    adopt: "Not available externally"
    anchor: "#addressql"
---

Over the years we have designed and built our own foundations: a programming language, and data, time, expression and API standards. This page is the register of that work - **ManiarTech-authored specifications, languages and protocol research** - published with their actual status rather than their intended one.

Most of it is unfinished, and this page says so per project. One specification is publicly accessible today. Two projects have public implementations whose specifications are not published. Three are public concept notes over private or internal work. None of it is anything we would require a client to adopt, and none of it is an industry standard recognized by any committee.

## Publication and maturity status

Six terms are used consistently across this page. They mean different things and are never interchanged:

- **Public specification** - the specification document itself is published and anyone can read it.
- **Public implementation** - source code is public. This says nothing about whether the specification is published, or whether the licensing permits use.
- **Public concept note** - a description of the design exists publicly. The specification is not public.
- **Private technical review available** - a qualified customer can be walked through selected material under confidentiality. See below.
- **Internal implementation** - we run it in our own systems; it is not released.
- **Unavailable for external adoption** - not licensed, packaged or supported for anyone else to build on.

A dark link is dark on purpose. We will not point you at a "coming soon" page and count that as something you can verify.

## What "private review available" means

Qualified customers evaluating ManiarTech for a technically demanding engagement may request a walkthrough of selected specifications, implementations, tests and architectural decisions. Reviews may use sanitized excerpts, demonstrations or controlled repository access, depending on the project. Confidential, security-sensitive and client-specific material is excluded.

A private review is not a production release, a source-distribution promise, or a licensing commitment. It exists so that a serious buyer can judge the depth of the engineering behind our client work without us having to publish everything, or ask anyone to take a claim on trust.

## Public specification

<span id="internet-object" style="scroll-margin-top:88px;"></span>

### Internet Object - a schema-first, human-readable data format

> **Public specification - 1.0 Draft - experimental**

A compact, schema-first alternative to JSON, designed from a clean slate for the web and AI era rather than retrofitted from JavaScript notation. It separates schema from data so keys are not repeated on every record - over 40% smaller than minified JSON in the live playground (up to about 60% on nested data, with the Internet Object side uncompressed), and around 30% fewer tokens measured with the GPT-4 tokenizer. It is a respectful JSON alternative: it credits JSON rather than trashing it.

What is public today:

- **The specification** - [docs.internetobject.org](https://docs.internetobject.org/). This is the only ManiarTech specification you can read in full without talking to us.
- **A live playground** - [play.internetobject.org](https://play.internetobject.org/). Write Internet Object, watch it validate against a schema in real time, and compare the output against JSON.
- **The JavaScript/TypeScript reference parser** - [github.com/maniartech/InternetObject-js](https://github.com/maniartech/InternetObject-js), ISC-licensed and actively maintained. Its first public commit dates to December 2018, which you can confirm from the repository history.
- **A Python parser** - [github.com/maniartech/InternetObject-py](https://github.com/maniartech/InternetObject-py). Stated accurately: the source is public, it carries **no license file**, and it has not been updated since 2021. Treat it as a reference artifact to read, not a dependency to adopt.

**Status.** The specification is a 1.0 *Draft*: most features are marked beta, a few experimental, and nothing is locked as stable. Parsers for other languages are intended, not delivered. Evaluate it freely; we would not put an experimental format on a client's critical path without the agreement described at the end of this page.

[Read more about Internet Object](/foundry/internet-object/)

## Public implementations, unpublished specifications

Both projects below have code you can read today, and neither has a published specification. They differ on adoption, which is the distinction that matters: GoTime, the NITES reference implementation, is MIT-licensed and can be adopted on its own terms right now. UExL is not packaged for adoption - no license, no release.

<span id="uexl" style="scroll-margin-top:88px;"></span>

### UExL - an embeddable expression engine

> **Public source - unpublished specification - pre-release**

An embeddable, language-independent expression engine that turns runtime strings - in config files, database rows, or user-authored rule editors - into evaluated results with the same semantics everywhere it is embedded. It is a real parser, compiler and VM, not a tree-walking interpreter.

What is public today:

- **The Go source and the benchmark harness** - [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go). The `benchmarks/` and `vm/` directories ship in the repository, so the head-to-head numbers are ones your own run produces rather than ones we assert. Our measured results and the method are written up in [a separate engineering post](/insights/uexl-zero-alloc/).
- Design decisions worth reading regardless of adoption: explicit nullish fallback that preserves `0`, `""` and `false`; optional chaining that returns null rather than panicking; errors instead of panics; immutable, goroutine-safe compiled expressions.

**Status.** The core engine is implemented; licensing, API stabilization, CI and the first tagged release remain. The specification is not published. Concretely: the repository currently carries **no license file and no tagged release**, so it is public source rather than open-source software you can build on, and we do not describe it as production-ready. A pre-release API may still change.

[Read more about UExL](/foundry/uexl/)

<span id="nites" style="scroll-margin-top:88px;"></span>

### NITES - one date/time format syntax across languages

> **Public implementation - unpublished standalone specification - draft**

Natural and Intuitive Time Expression Syntax: one human-readable, case-insensitive set of date/time format specifiers to replace the fragmented mess of `strftime`, Go's `2006-01-02` reference date, and the case-sensitive conventions that differ language to language. A single character means no padding, doubled means zero-padded; minutes are `i`/`ii`, not `m`, which quietly removes the classic month-versus-minute bug. Named layouts (`iso`, `rfc`, `sql`) replace cryptic format strings.

A draft formatting language currently implemented and documented through **GoTime**. The standalone cross-language specification is not yet public.

What is public today:

- **GoTime** - [github.com/maniartech/gotime](https://github.com/maniartech/gotime), MIT-licensed and actively maintained. It is a Go library you can adopt on its own terms today.

**Two different adoption decisions, and they should not be confused.** Adopting GoTime means taking an MIT-licensed Go library into a Go project - an ordinary, low-risk dependency decision. Adopting *NITES* would mean betting on a cross-language standard that does not yet have a published specification or a second implementation. The first is available now; the second is not something we would ask anyone to commit to yet.

## Public concept notes, private or internal work

For the three below, what is public is a description of the design. The specifications and implementations are not published. Each is available for private technical review by qualified customers.

<span id="indigo" style="scroll-margin-top:88px;"></span>

### Indigo - a Go superset whose output is plain, idiomatic Go

> **Internal active development - public concept note - private review available**

Indigo is to Go what TypeScript is to JavaScript: a superset that adds a few carefully chosen ergonomics and compiles `.indigo` files down to clean, idiomatic `.go`. It targets the friction every Go developer feels daily - error-handling boilerplate, no ternary, no map/filter, verbose nil checks - without changing what Go is.

The design contracts it is being built to hold, stated as design contracts rather than verified properties, because the compiler is not yet inspectable from outside:

- **Every valid Go file is intended to be valid Indigo**, so adoption would be incremental, feature by feature.
- **The output is plain Go**, readable in the diff and compatible with the existing toolchain, linters and editors.
- **No runtime is injected**, so stopping use of Indigo would leave generated Go that still compiles and runs on the standard toolchain.
- **Semantic preservation** - side effects, short-circuiting, panic timing, defer ordering and package-init order - governed by the principle that *no output is better than wrong output*: a feature that cannot preserve Go's semantics for a construct is rejected rather than faked.

A few of the ergonomics, and what each is designed to compile down to:

| In Indigo | Compiles to |
|---|---|
| `data := load(path)!` plus a function-scoped `catch` | idiomatic `if err != nil { return ... }` |
| `users \|filter: $.Active \|map: $.Name` | a single fused `for` loop |
| `ok ? "ready" : "pending"` | a safe if/else expression |
| `input ?? "guest"` and `user?.Address?.City` | explicit, nil-guarded checks |

Internal implementation claims - normative specifications with stable error codes (`indigo explain IND-PIPE-007`), an LSP, a VS Code extension, source maps, an MCP server, and a conformance suite - exist in our internal tree and can be demonstrated in a private review. Until they are independently inspectable, treat them as claims we are willing to show you, not as published facts.

[Read more about Indigo](/foundry/indigo/)

<span id="fuse" style="scroll-margin-top:88px;"></span>

### FUSE - REST that is live by default

> **Design phase - public concept and non-goals - private review when appropriate**

Fast Unified Server Exchange: a proposed protocol under internal design, unifying REST, realtime push and reactive (live) queries on one server, one route table, one handler - no message broker, no WebSocket fleet, no second stack. A read handler marked live stays live: the protocol captures what data the handler read, watches for changes, and re-pushes the new result. (FUSE is the protocol; FuseAPI is the Go reference implementation being built against it.)

What is public is this description and the non-goals below. The protocol specification and the proof-of-concept are not published.

- **Explicit non-goals.** FUSE is *not* for durable or exactly-once delivery, *not* a gRPC or Kafka replacement, *not* multi-node guaranteed fan-out.
- **Where the alternatives win**, named plainly:

| vs. | They win when... | FUSE would fit when... |
|---|---|---|
| **gRPC** | you need strict contracts or cross-language RPC at scale | one server, REST plus live, no second stack |
| **Socket.IO** | you want a mature, battle-tested socket layer | you do not want to hand-write pub/sub or invalidation |
| **Mercure** | you want a standalone SSE hub decoupled from your API | reactivity should live *in* the handler |
| **Convex** | you will adopt a full managed backend platform | you keep your own database and stack, and add reactivity |

**Status.** Design phase. The wire protocol is not frozen. A proof-of-concept comes first - proving automatic reactivity over stock Postgres against a no-stale invariant - before the specification is finalized or further languages are considered.

<span id="addressql" style="scroll-margin-top:88px;"></span>

### AddressQL - SQL-like power you can paste into a URL

> **Internal production use - public concept note - private specification**

AddressQL is a URL-native, backend-neutral query language: filtering, projection, sorting and pagination expressed as a single readable, cacheable query string. Because the canonical form is deterministic, identical intent produces an identical URL and therefore an identical cache key, so CDN caching and URL signing work without client-side normalization.

- **It runs in our own production.** We send AddressQL queries from the browser to our APIs, which execute them as SQL-like queries over MongoDB. That is a sanitized description of real use, not a public artifact you can inspect.
- **Deliberate non-goals:** read-only (no mutations), no authentication (the server injects scope), and no non-deterministic functions such as `now` or `random` that would break cache keys.
- Portability specifications for Go, JavaScript and Rust exist internally, alongside a full reference document.

**Status.** Internal implementation. The specification is written but not published, and there is no public library. What appears on this page is a description of AddressQL, not the specification itself - that is available through private review.

## What this means for you

**Client systems are never required to adopt these projects.** Experimental components are used only with explicit agreement, a documented exit path, and a mainstream alternative. Your project is built on mainstream, hireable technology that you or any other team can maintain.

So why does this page exist? Because the same engineering discipline is pointed at client work:

- A team that insists *no output is better than wrong output* in a compiler brings that refusal to fake it to your codebase.
- A team that ships a runnable benchmark and says *run it yourself* gives you software whose claims you can check.
- A team that writes explicit non-goals before features is the team that will tell you plainly when something should not be built.

And the same standard applies to this page. What is public here, you can open right now: the Internet Object specification and playground, the ISC-licensed JavaScript parser and its history back to 2018, the MIT-licensed GoTime library, the UExL source and its benchmark. What is not public is named as not public, with its licensing and maintenance state stated rather than implied.

## Inspect the work with us

Evaluating ManiarTech for a technically demanding engagement? Request a private standards and architecture review - a walkthrough of selected specifications, implementations, tests and design decisions, subject to confidentiality.

**[Request a technical review](/contact/)**  |  [Explore the Foundry](/foundry/)
