---
title: "UExL — an embeddable expression engine with zero allocations on the hot path"
description: "An embeddable Go expression engine with zero allocations on the boolean and string paths, reproducible from the repo."
labStatus: "Publish-ready | pre-1.0"
category: "Languages"
license: "TBC (MIT likely)"
repo: "https://github.com/maniartech/uexl-go"
order: 3
titleTag: "UExL - a Zero-Allocation Expression Engine for Go"
---

UExL (Universal Expression Language) is one of the standards we've authored — implementation-first, with the formal spec derived afterward from the finished reference engine. The Go implementation is done and in the publish queue.

## What it is

UExL is an embeddable, platform-independent expression-evaluation engine — the regex of expression evaluation. It turns runtime strings — in config files, database rows, or user-facing rule editors — into evaluated results, with the same semantics everywhere the engine is embedded.

The language reads the way rules are spoken:

<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> expressions - the language itself</div>
<pre class="mt-code"><span class="c"># pipes instead of nested calls - stages read left to right</span>
orders <span class="op">|filter:</span> $.paid <span class="op">|map:</span> $.qty * $.price <span class="op">|sum:</span> $

<span class="c"># explicit, safe semantics - no surprises in production rules</span>
user.plan <span class="op">??</span> <span class="s">"free"</span>        <span class="c"># falls back ONLY on null/absent - 0 and "" survive</span>
account<span class="op">?.</span>owner<span class="op">?.</span>email     <span class="c"># returns null instead of panicking on nil</span>

<span class="c"># Excel-familiar forms for the non-engineers writing the rules</span>
total &gt; 1000 <span class="op">?</span> <span class="s">"review"</span> : <span class="s">"auto-approve"</span>
status <span class="op">&lt;&gt;</span> <span class="s">"cancelled"</span></pre>
</div>

Eleven built-in pipes (map, filter, reduce, find, sort, unique and friends), Unicode-aware string handling, and errors - never panics - from a goroutine-safe core whose compiled expressions are immutable and shareable.

## A real engine, not a tree-walker

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The UExL pipeline: an expression string is parsed once, compiled to bytecode once, then the compiled expression is evaluated many times by a pooled VM with zero allocations on the hot paths">
  <g font-family="inherit" font-size="12.5">
    <rect x="30" y="46" width="160" height="56" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="110" y="70" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">"total &gt; 1000"</text>
    <text x="110" y="88" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">a string, at runtime</text>
    <line x1="190" y1="74" x2="240" y2="74" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/>
    <rect x="240" y="46" width="110" height="56" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="295" y="70" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">parser</text>
    <text x="295" y="88" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">once</text>
    <line x1="350" y1="74" x2="400" y2="74" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/>
    <rect x="400" y="46" width="110" height="56" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="455" y="70" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">compiler</text>
    <text x="455" y="88" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">bytecode, once</text>
    <line x1="510" y1="74" x2="560" y2="74" stroke="rgba(20,207,147,.6)" stroke-width="1.5"/>
    <rect x="560" y="36" width="170" height="76" rx="10" fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.6)" stroke-width="1.4"/>
    <text x="645" y="62" text-anchor="middle" fill="#14cf93" font-weight="600">VM: evaluate</text>
    <text x="645" y="80" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="11.5">thousands of times</text>
    <text x="645" y="98" text-anchor="middle" fill="#14cf93" font-size="11.5" font-weight="600">0 allocs on hot paths</text>
    <text x="380" y="150" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11.5">Compile once, evaluate forever - the pipeline that makes zero allocation possible.</text>
    <text x="380" y="172" text-anchor="middle" fill="rgba(255,255,255,.38)" font-size="11">Pooled VMs, immutable compiled expressions, errors instead of panics.</text>
  </g>
</svg>
<figcaption><strong>Parser &rarr; compiler &rarr; VM.</strong> The expression is parsed and compiled once; the hot path is bytecode running against your data. One-shot parse-and-eval is deliberately NOT the fast path - hot paths pre-compile.</figcaption>
</figure>

## The numbers, honestly framed

Of the three engines measured head-to-head - cel-go, expr and UExL - **UExL is the only one with zero allocations on the boolean/comparison and string-matching paths**, and the fastest in the scenarios measured.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the string pattern match benchmark: UExL about 108 nanoseconds and zero allocations versus about 325 and 348 nanoseconds with 4 allocations for expr and cel-go">
  <g font-family="inherit" font-size="12">
    <text x="40" y="28" fill="rgba(255,255,255,.8)" font-weight="600">String pattern match - ns per evaluation (lower is better)</text>
    <text x="40" y="64" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">UExL</text>
    <rect x="130" y="50" width="149" height="18" rx="4" fill="#14cf93"/>
    <text x="290" y="64" fill="rgba(255,255,255,.7)">~108 ns</text>
    <text x="362" y="64" fill="#14cf93" font-weight="600">0 allocs</text>
    <text x="40" y="96" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">expr</text>
    <rect x="130" y="82" width="448" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="590" y="96" fill="rgba(255,255,255,.7)">~325 ns | 4 allocs</text>
    <text x="40" y="128" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">cel-go</text>
    <rect x="130" y="114" width="480" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="622" y="128" fill="rgba(255,255,255,.7)">~348 ns | 4 allocs</text>
    <text x="40" y="158" fill="rgba(255,255,255,.45)" font-size="11">Warm-state medians, six runs, one machine. Timings drift by hardware; the allocation counts reproduce exactly.</text>
  </g>
</svg>
<figcaption><strong>Lead with the zeros, not the nanoseconds.</strong> Zero allocations means no GC pressure and predictable latency - the durable claim your own run of the public harness will confirm. Full scenario table and method: <a href="/insights/uexl-zero-alloc/">the zero-allocation write-up</a>.</figcaption>
</figure>

A function call still allocates a couple; one-shot evaluation is not the fast path. We state the claim's edges as plainly as the claim - that is what makes it checkable.

## Status & how to see it

UExL is **publish-ready but pre-1.0**: the language and implementation are finished, and what remains is release packaging — a license file, a frozen public API, CI, and the `v0.1.0` tag.

- **Engine repository:** the code is public — read it at [github.com/maniartech/uexl-go](https://github.com/maniartech/uexl-go), where the `benchmarks/` directory holds the comparison harness. Run it yourself.
- **Playground:** the interactive playground — with a live benchmark button and a bytecode disassembly view — is launching soon, so it is named here without a link until it is publicly reachable.
