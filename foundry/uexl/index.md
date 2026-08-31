---
title: "UExL"
headline: "Compile the expression once. Evaluate it forever."
description: "An embeddable expression language for Go: expressions from configs, databases or rule editors compile to bytecode once, then evaluate on a pooled VM with zero allocations on the hot paths."
eyebrow: "Language"
titleTag: "UExL - a Zero-Allocation Expression Engine for Go"
seoDescription: "UExL: an embeddable Go expression engine. Parse once, compile to bytecode, evaluate on a pooled VM - zero allocations on its benchmarked hot paths."
order: 3
tocDepth: "3"
statusLine: "Public source | Pre-1.0, no release | Licence: none granted | Adoption: not yet"
artifacts:
  - label: "Read the source"
    url: "https://github.com/maniartech/uexl-go"
    primary: true
  - label: "The benchmark write-up"
    url: "/insights/uexl-zero-alloc/"
railMeta:
  - { k: "Type", v: "Expression language + Go reference engine" }
  - { k: "Maturity", v: "Pre-1.0; no tagged release" }
  - { k: "Availability", v: "Public source, readable on GitHub" }
  - { k: "Licence", v: "None granted today" }
  - { k: "Adoption", v: "Not available for adoption yet" }
  - { k: "Evidence", v: "Committed benchmark suite in the repository" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Repository"
    note: "The engine, its tests and its benchmark suite"
    url: "https://github.com/maniartech/uexl-go"
  - label: "Zero-allocation write-up"
    note: "How the numbers were measured, and what they do not claim"
    url: "/insights/uexl-zero-alloc/"
  - label: "Standards register"
    note: "Where UExL sits among the specifications we author"
    url: "/standards/"
privateReview: "The source is already public. What we offer beyond it is a walkthrough of the compiler and VM design - the Value-type architecture and the allocation-elimination decisions - for teams evaluating an embedded rules engine."
---

Rules your users write at runtime deserve a real language runtime - not a tree-walker glued to reflection.

## The pipeline is the idea

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The UExL pipeline: an expression string is parsed to an AST, validated and compiled to bytecode once - where an unknown function is refused at compile time - then evaluated repeatedly by a pooled VM which returns values or errors, never panics">
  <g font-family="inherit" font-size="12">
    <rect x="30" y="40" width="150" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="105" y="62" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">"total &gt; 1000"</text>
    <text x="105" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">a string, at runtime</text>
    <path d="M180 66 L228 66" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="230" y="40" width="120" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="290" y="62" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">parser</text>
    <text x="290" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">AST, once</text>
    <path d="M350 66 L398 66" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="400" y="40" width="150" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>
    <text x="475" y="62" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">validate + compile</text>
    <text x="475" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">bytecode, once</text>
    <path d="M550 58 L610 40" stroke="rgba(20,207,147,.6)" stroke-width="1.5"/>
    <path d="M475 92 L475 150" stroke="rgba(255,200,120,.6)" stroke-width="1.5"/>
    <rect x="612" y="16" width="118" height="76" rx="9" fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.6)" stroke-width="1.4"/>
    <text x="671" y="44" text-anchor="middle" fill="#14cf93" font-weight="600">pooled VM</text>
    <text x="671" y="62" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="10.5">evaluate thousands</text>
    <text x="671" y="78" text-anchor="middle" fill="#14cf93" font-size="10.5" font-weight="600">0 allocs, hot paths</text>
    <rect x="388" y="152" width="174" height="52" rx="9" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.55)" stroke-width="1.3"/>
    <text x="475" y="174" text-anchor="middle" fill="rgba(255,200,120,.9)" font-weight="600">refused at compile</text>
    <text x="475" y="192" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">unknownFn() -&gt; error, immediately</text>
    <rect x="612" y="152" width="118" height="52" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="671" y="174" text-anchor="middle" fill="rgba(255,255,255,.75)" font-weight="600">error value</text>
    <text x="671" y="192" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">never a panic</text>
    <path d="M671 92 L671 150" stroke="rgba(255,255,255,.3)" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="380" y="248" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11.5">Both refusal routes are the design: bad references die at compile time, bad data returns an error at eval time.</text>
    <text x="380" y="270" text-anchor="middle" fill="rgba(255,255,255,.38)" font-size="11">One-shot parse-and-eval is deliberately NOT the fast path - hot paths pre-compile.</text>
  </g>
</svg>
<figcaption><strong>Parse once, compile once, evaluate forever - and refuse early.</strong> A function the environment does not know fails at <em>compile</em> time, not in production at midnight; at eval time the VM returns errors, never panics. The per-evaluation cost is bytecode on a pooled VM, which is what makes zero allocation possible.</figcaption>
</figure>

Every system that lets users write rules - pricing formulas in a config file, routing conditions in a database row, thresholds in an admin screen - eventually evaluates expressions it has never seen at compile time. UExL gives that job a small language with its semantics written down, and an engine where the first two stages run once and the third runs forever. In code, the boundary is explicit - from the project's README:

```go
// One line for scripts and REPLs - parses, compiles and runs each call.
result, err := uexl.Eval("price * qty * (1 - discount)", vars)

// Pre-compile for hot paths - goroutine-safe, pool-backed.
expr := uexl.MustCompile("price * qty * (1 - discount)")
result, err := expr.Eval(ctx, vars)
```

## The language reads the way rules are spoken

<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> expressions - the language itself</div>
<pre class="mt-code"><span class="c"># pipes instead of nested calls - stages read left to right</span>
orders <span class="op">|filter:</span> $item.status == <span class="s">"shipped"</span> <span class="op">|map:</span> $item.total <span class="op">|reduce:</span> ($acc ?? 0) + $item

<span class="c"># explicit, safe semantics - no surprises in production rules</span>
count <span class="op">??</span> 0               <span class="c"># falls back ONLY on null/absent - 0 and "" survive</span>
user<span class="op">?.</span>address<span class="op">?.</span>city      <span class="c"># returns null instead of panicking on nil</span>

<span class="c"># Excel-familiar forms for the non-engineers writing the rules</span>
total &gt; 1000 <span class="op">?</span> <span class="s">"review"</span> : <span class="s">"auto-approve"</span>
status <span class="op">&lt;&gt;</span> <span class="s">"cancelled"</span></pre>
</div>

Eleven built-in pipe types (`map`, `filter`, `reduce`, `find`, `some`, `every`, `sort`, `unique`, `groupBy`, `chunk`, `window`), Unicode-aware string handling at byte, rune and grapheme level, and typed result helpers (`AsFloat64`, `AsBool`, `AsString`) that refuse to coerce rather than guessing - `AsBool(1)` is an error, not `true`.

The semantic choices are deliberate. Real data has valid falsy values, so `??` falls back only on null or absent - a `0` or an empty string survives. `x.a.b ?? c` makes only `b` safe; if `a` is missing, that is still an error, because silently swallowing a broken path is how rule systems rot.

## Environments: what an expression may see

An expression evaluates inside an `Env` - the functions, pipe handlers and globals it is permitted to use. Environments are **immutable after construction and safe to share across goroutines**; extending one is copy-on-write, so a tenant-specific child environment cannot disturb its parent. This is also what makes the compile-time refusal possible: the compiler validates every function reference against the environment before any bytecode exists.

```go
env := uexl.DefaultWith(
    uexl.WithFunctions(uexl.Functions{
        "discount": func(args ...any) (any, error) { /* ... */ },
    }),
)
child := env.Extend(uexl.WithGlobals(map[string]any{"tenantID": "acme"}))
```

## The measured result

From the repository's own README - benchmarked head-to-head against `expr` and `cel-go` on AMD Ryzen 7 5700G (Windows/amd64), Go 1.26, `-benchmem`, reporting the **warm-state median of 6 runs**, all engines on their pre-compiled hot paths. The headline scenario is the one in the hero above; UExL leads all four scenarios in that measurement, with 0 allocs on the boolean/comparison and string paths.


The hot-path boundary is stated as plainly as the numbers, in the README's own note: a custom function call still costs 2 allocations, a `|map:` over 100 items costs ~104, and one-shot `Eval()` - parse, compile and run in a single call - costs roughly 10,000 ns with allocations. **Pre-compiling is not an optimization tip; it is the intended use.**

## Known limits

- **No licence is granted.** The repository has no LICENSE file, so the source is readable but not legally reusable - see status below.
- **No tagged release.** The README states the API reflects the current `main` branch; pre-1.0 means it may move.
- **Zero allocations is path-specific**: boolean/comparison and string-matching paths, on the stated toolchain. Function calls and collection pipes allocate, and the README says so.
- **The playground is not deployed.** A local playground exists in the project workspace but there is nothing public to run; the public artifact is the source itself.

## Status: four facts, kept separate

- **Availability** - the Go source is **public and readable** at [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go).
- **Licence** - **none is granted today.** Readable is not reusable, and nothing on this page is an invitation to depend on it.
- **Maturity** - **pre-1.0, no tagged release.** The language and implementation are feature-complete; release packaging is not.
- **Adoption** - **not available for adoption.** What stands between here and adoptable is a licence file, a frozen public API, CI and a `v0.1.0` tag.

## What this demonstrates

Building UExL meant designing a language's semantics (the `??` and `?.` rules exist because production data has valid zeroes), then engineering a runtime to hold them - a bytecode compiler, a pooled VM, and a Value architecture that eliminates allocation from the paths that run millions of times. That is compiler and runtime engineering applied to a business problem: letting non-engineers write rules a production Go system can execute safely. The same discipline applies when an enterprise system needs configurable behaviour that cannot be allowed to crash the process that hosts it.
