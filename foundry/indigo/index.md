---
title: "Indigo — a Go superset that compiles to clean, idiomatic Go"
description: "A Go superset language whose compiler holds one contract: no output is better than wrong output."
labStatus: "Research | in development"
category: "Languages"
license: "TBC (frontend BSD-3)"
order: 1
titleTag: "Indigo - a Go Superset Compiling to Idiomatic Go"
---

Indigo is the flagship of the standards we've authored — ManiarTech making a language, not just using one. It is pre-1.0, and we are letting it mature at the pace a language deserves.

## What it is

Indigo is a Go superset. Every valid Go file is already a valid Indigo file, so adoption costs nothing to start. On top of Go it adds a few carefully chosen ergonomics — and compiles `.indigo` files to clean, idiomatic Go you read in the diff. TypeScript is to JavaScript what Indigo is to Go.

You don't take "idiomatic output" on faith. Here is the shape of it:

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> you write - <b>main.indigo</b></div>
<pre class="mt-code"><span class="k">func</span> load(id <span class="k">int</span>) (<span class="k">string</span>, <span class="k">error</span>) {
    user := fetch(id)<span class="op">!</span>
    tier := user.Pro <span class="op">?</span> <span class="s">"pro"</span> : <span class="s">"free"</span>
    <span class="k">return</span> render(tier), <span class="k">nil</span>
} <span class="k">catch</span> {
    <span class="k">return</span> <span class="s">""</span>, err
}</pre>
</div>
<span class="lang-arrow">&rarr;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> it ships - <b>main.go</b> <span class="lp-idiom">idiomatic</span></div>
<pre class="mt-code"><span class="k">func</span> load(id <span class="k">int</span>) (<span class="k">string</span>, <span class="k">error</span>) {
    user, err := fetch(id)
    <span class="k">if</span> err != <span class="k">nil</span> {
        <span class="k">return</span> <span class="s">""</span>, err
    }
    tier := <span class="s">"free"</span>
    <span class="k">if</span> user.Pro {
        tier = <span class="s">"pro"</span>
    }
    <span class="k">return</span> render(tier), <span class="k">nil</span>
}</pre>
</div>
</div>

The right pane is the point: plain Go a senior reviewer would wave through - explicit `(T, error)` returns, no injected runtime, no hidden closures, nothing to unlearn. Stop using Indigo any day and keep the generated Go forever.

## The ergonomics, and exactly what each compiles to

Each feature earns its place only if its lowering preserves Go's exact semantics - side effects, short-circuiting, defer ordering, panic timing, init order. This table is the contract:

| You write | It compiles to |
|---|---|
| `data := load(path)!` with a function-scoped `catch` | idiomatic `if err != nil { return ... }` |
| `ok ? "ready" : "pending"` | a safe if/else lowering |
| `users \|filter: $.Active \|map: $.Name` | a single fused `for` loop |
| `input ?? "guest"` | explicit nil/absence checks |
| `user?.Address?.City` | nil-guarded field access |
| `x => x * 2` | a typed func literal |

No exceptions, no panic/recover as control flow, no reflection outside one approved helper. If a feature cannot preserve the semantics for some construct, that feature is rejected for that construct - not faked.

## Why "no output is better than wrong output" is the whole design

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Indigo compiler contract: a feature request passes through semantics checks; if any Go behavior cannot be preserved the compiler refuses rather than emitting approximate code">
  <g font-family="inherit" font-size="12.5">
    <rect x="30" y="70" width="150" height="56" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="105" y="94" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">.indigo source</text>
    <text x="105" y="112" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">go/parser frontend</text>
    <line x1="180" y1="98" x2="240" y2="98" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/>
    <rect x="240" y="58" width="220" height="80" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)" stroke-width="1.3"/>
    <text x="350" y="84" text-anchor="middle" fill="#14cf93" font-weight="600">semantics gate</text>
    <text x="350" y="103" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="11.5">side effects | short-circuit | defer</text>
    <text x="350" y="119" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="11.5">panic timing | init order</text>
    <line x1="460" y1="80" x2="540" y2="60" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
    <rect x="540" y="34" width="190" height="52" rx="10" fill="rgba(20,207,147,.13)" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
    <text x="635" y="56" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">idiomatic .go emitted</text>
    <text x="635" y="74" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">read it in the diff</text>
    <line x1="460" y1="116" x2="540" y2="138" stroke="rgba(240,90,90,.55)" stroke-width="1.3"/>
    <rect x="540" y="116" width="190" height="52" rx="10" fill="rgba(240,90,90,.08)" stroke="rgba(240,90,90,.5)" stroke-width="1.3"/>
    <text x="635" y="138" text-anchor="middle" fill="rgba(240,90,90,.85)" font-weight="600">refusal, with error code</text>
    <text x="635" y="156" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">indigo explain IND-PIPE-007</text>
    <text x="380" y="196" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11.5">A language that rewrites your code has to be right before it is fast to ship - refusal is a feature.</text>
  </g>
</svg>
<figcaption><strong>The compiler's one contract.</strong> Every lowering passes a semantics gate; what cannot be preserved is refused with a stable, explainable error code - never approximated. "No output is better than wrong output."</figcaption>
</figure>

The tooling around the compiler is real engineering, not an afterthought: normative RFC-grade specifications, stable error codes with `indigo explain`, an LSP with a VS Code extension, source maps, and an MCP server that exposes the compiler to AI tools.

## Status & how to see it

Indigo is **pre-1.0**, with normative specs as the source of truth and a compiler under active development. We treat pre-1.0 as patient maturation — the rigor (formal specs, conformance, a meaningful-coverage bar) is what makes the label read as serious rather than unfinished.

The public-versus-internal status of the source is not yet confirmed, so we name the project plainly here rather than link to a repository. When publication is settled, this page will carry the repository and, where the pure-Go compiler allows, an interactive playground. Until then: the code panes above are the claim we are preparing to let you check - not one we ask you to take on trust.
