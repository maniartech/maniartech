---
title: "gowork — friendly tooling for Go workspaces"
description: "A well-designed CLI that wraps Go's minimal go work experience and adds the multi-module workflow commands Go leaves out."
labStatus: "Internal | pre-1.0"
category: "Developer Tools"
order: 9
---

Go workspaces are how you develop several interdependent modules at once - and Go's native `go work` support is deliberately minimal: manual `go.work` editing, fiddly local `replace` management, no diagnostics, no higher-level workflow. Teams that live in multi-module repos feel that friction every day. We are one of those teams, so we built the tool we wished existed.

## What it adds on top of `go work`

<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> the command surface - <b>gowork</b></div>
<pre class="mt-code">gowork <span class="k">init</span>      <span class="c"># create a workspace properly</span>
gowork <span class="k">add</span>       <span class="c"># bring a module in</span>
gowork <span class="k">remove</span>    <span class="c"># take one out, cleanly</span>
gowork <span class="k">up</span>        <span class="c"># the flagship daily workflow - bring the workspace up to date</span>
gowork <span class="k">doctor</span>    <span class="c"># diagnose problems and auto-fix what is safe to fix</span>
gowork <span class="k">explain</span>   <span class="c"># per-code documentation for what doctor found</span>
gowork <span class="k">link</span>      <span class="c"># local replace management, without hand-editing go.work</span>
gowork <span class="k">mod</span>       <span class="c"># module lifecycle helpers, e.g. mod align</span></pre>
</div>

Each command is the higher-level operation Go omits, wrapped in a consistent, styled CLI - cobra underneath, lipgloss for output that reads at a glance, `golang.org/x/mod` doing the actual `go.mod` / `go.work` parsing, and a pure-Go SQLite cache so repeated operations stay fast.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Several interdependent Go modules sit above one go.work file; gowork stands between the developer and that file, providing init, add, up, doctor and link instead of manual editing">
  <g font-family="inherit" font-size="12">
    <g fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.38)" stroke-width="1.2">
      <rect x="60"  y="30" width="130" height="38" rx="6"/>
      <rect x="210" y="30" width="130" height="38" rx="6"/>
      <rect x="360" y="30" width="130" height="38" rx="6"/>
      <rect x="510" y="30" width="130" height="38" rx="6"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)" font-family="Consolas, monospace" font-size="11.5">
      <text x="125" y="53">core/go.mod</text>
      <text x="275" y="53">api/go.mod</text>
      <text x="425" y="53">worker/go.mod</text>
      <text x="575" y="53">shared/go.mod</text>
    </g>
    <g stroke="rgba(255,255,255,.25)" stroke-width="1.1">
      <line x1="125" y1="68" x2="330" y2="100"/><line x1="275" y1="68" x2="350" y2="100"/>
      <line x1="425" y1="68" x2="390" y2="100"/><line x1="575" y1="68" x2="410" y2="100"/>
    </g>
    <rect x="300" y="100" width="160" height="36" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" stroke-width="1.1"/>
    <text x="380" y="122" text-anchor="middle" fill="rgba(255,255,255,.6)" font-family="Consolas, monospace" font-size="11.5">go.work</text>
    <rect x="230" y="152" width="300" height="36" rx="8" fill="rgba(20,207,147,.13)" stroke="rgba(20,207,147,.6)" stroke-width="1.4"/>
    <text x="380" y="174" text-anchor="middle" fill="#14cf93" font-weight="600">gowork: init | add | up | doctor | link</text>
    <text x="655" y="174" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">instead of editing by hand</text>
  </g>
</svg>
<figcaption><strong>Where it sits.</strong> Your modules and their go.work stay standard Go - gowork replaces the manual editing and adds the diagnostics layer (`doctor`, `explain`) that the native tooling leaves out.</figcaption>
</figure>

## Status, honestly

gowork is **internal today, pre-1.0, under active development** (Go 1.24), with a roadmap toward v1.0 and richer post-1.0 diagnostics. It exists because we work with Go workspaces constantly and wanted the workflow Go's own tooling omits - the classic scratch-your-own-itch developer tool. The intent is to open-source it once we are satisfied with the output; per our link-dark rule, no repository link appears here until there is a public repository to read.
