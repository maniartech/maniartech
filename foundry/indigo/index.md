---
title: "Indigo"
headline: "No output is better than wrong output."
description: "A Go superset in active research: ternaries, lambdas, pipelines and error propagation compile to expert-readable Go - or the compiler refuses to emit at all."
eyebrow: "Language"
titleTag: "Indigo - a Go Superset Compiling to Idiomatic Go"
seoDescription: "Indigo: a Go superset compiling to expert-quality Go - and a compiler that refuses wrong output. Active research; private."
order: 1
tocDepth: "3"
statusLine: "Active research | Private | Pre-1.0 | Licence not decided"
railMeta:
  - { k: "Type", v: "Language - Go superset + compiler" }
  - { k: "Maturity", v: "Active research, pre-1.0" }
  - { k: "Availability", v: "Private" }
  - { k: "Licence", v: "Not decided (the tree vendors Go's BSD-3 licence for toolchain code)" }
  - { k: "Adoption", v: "Not available" }
  - { k: "Evidence", v: "Committed grammar, analyzer, fixtures and docs in the repository" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Languages we author"
    note: "Where Indigo sits among UExL, AddressQL and PressML"
    url: "/foundry/languages/"
  - label: "UExL"
    note: "The published sibling: same pipe philosophy, embeddable engine"
    url: "/foundry/uexl/"
privateReview: "The repository is private. Qualified customers can request a compiler-design walkthrough - the frontend, the go/types-backed lowering, and the refusal semantics."
---

Transpiled languages have a credibility problem: the generated code is where bugs go to hide, and the day you need to debug it, you discover it was written for a machine. Indigo's founding constraint attacks that directly: the compiler emits **Go an expert would write by hand** - and where it cannot preserve Go's semantics exactly, it **refuses to emit anything at all**. Every valid Go file is already valid Indigo, and the output stays inside the plain Go toolchain: build systems, linters and editors keep working unchanged.

## What it adds, and what that compiles to

Each ergonomic in the specimen above lowers to the idiomatic Go pattern named beside it, from the compiler's own documentation - not to runtime helpers. The pipeline operator set is deliberately closed - `map`, `filter`, `take`, `skip`, `reduce`, `sortBy`, exactly six - and anything else is rejected with a structured diagnostic. The compiler is pure Go: an extended `go/parser` frontend with `go/types`-backed lowering, no CGo, no runtime library injected into your code.

## The refusal path is the design

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Indigo compile path: Indigo source flows through semantic analysis and lowering to generated Go; where semantics cannot be preserved, the compiler takes the refusal path instead, emitting a structured diagnostic with a code, a labeled span and a suggestion - and writes no Go file at all">
  <g font-family="inherit" font-size="12">
    <rect x="30" y="40" width="140" height="50" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)"/>
    <text x="100" y="61" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">.indigo source</text>
    <text x="100" y="78" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">every Go file is valid input</text>
    <path d="M170 65 L216 65" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="218" y="40" width="160" height="50" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)"/>
    <text x="298" y="61" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">semantic analysis</text>
    <text x="298" y="78" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">go/types-backed</text>
    <path d="M378 65 L424 65" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="426" y="40" width="130" height="50" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)"/>
    <text x="491" y="61" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">lowering</text>
    <text x="491" y="78" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">to idiomatic patterns</text>
    <path d="M556 55 L612 42" stroke="rgba(20,207,147,.6)" stroke-width="1.5"/>
    <rect x="614" y="20" width="116" height="50" rx="9" fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.6)"/>
    <text x="672" y="41" text-anchor="middle" fill="#14cf93" font-weight="600">generated Go</text>
    <text x="672" y="58" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">expert-readable</text>
    <path d="M491 90 L491 138" stroke="rgba(255,200,120,.6)" stroke-width="1.5"/>
    <rect x="356" y="140" width="270" height="56" rx="9" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.55)"/>
    <text x="491" y="161" text-anchor="middle" fill="rgba(255,200,120,.9)" font-weight="600">refusal: no .go file is written</text>
    <text x="491" y="180" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5" font-family="Consolas, monospace">IND-PIPE-007 + labeled span + suggestion; indigo explain &lt;code&gt;</text>
    <text x="380" y="226" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">The compiler's contract: it never writes a file it cannot stand behind - correctness outranks convenience.</text>
  </g>
</svg>
<figcaption><strong>Where correctness cannot be preserved, nothing is emitted.</strong> Diagnostics are structured and stable - every error carries a code, a labeled source span and usually a suggestion, and <code>indigo explain</code> documents each code in depth. A transpiler you can trust is defined by what it refuses to do.</figcaption>
</figure>

## Known limits

- **Active research, pre-1.0.** No release exists; the language surface may change. We are letting it mature at the pace a language deserves.
- **Private.** There is no public repository to read.
- **Licence not decided.** The tree vendors Go's BSD-3 licence for the toolchain code it builds on; Indigo's own licence is an open decision, and nothing is granted today.
- **Deliberately small surface.** Six pipeline operators, exactly; features that cannot lower to clean Go do not get added.

## Status: four facts, kept separate

- **Availability** - private.
- **Licence** - not decided; no grant exists.
- **Maturity** - active research, pre-1.0.
- **Adoption** - not available.

## What this demonstrates

Building Indigo means holding a hard line under temptation: every proposed feature must lower to Go an expert would sign, or it is refused - and the refusal must arrive as a precise, explained diagnostic rather than a mystery. That is compiler engineering as an exercise in restraint, and it is the same judgment we apply when a customer's system needs code generation, migration tooling, or any machinery whose output humans must live with and debug.
