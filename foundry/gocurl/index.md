---
title: "GoCurl — the curl command IS the Go code"
description: "A curl-ergonomic HTTP client and CLI for Go: paste any curl command from any API doc straight into your code, and run the exact same command in your shell."
labStatus: "Internal · pre-1.0"
category: "Libraries & Frameworks"
license: "MIT"
order: 8
---

Every REST API documents itself with curl. Almost none ship a Go SDK for their long-tail endpoints — so every Go developer pays the same integration tax: mentally translating a curl example into `http.NewRequest`, header maps, body encoding and auth. GoCurl removes that translation step. The curl command literally is the code.

## The whole idea in one screen

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> what the API doc gives you - <b>shell</b></div>
<pre class="mt-code">curl -X POST https://api.example.com/v1/orders \
  -H <span class="s">"Authorization: Bearer $TOKEN"</span> \
  -H <span class="s">"Content-Type: application/json"</span> \
  -d <span class="s">'{"sku": "A-503", "qty": 2}'</span></pre>
</div>
<span class="lang-arrow">&rarr;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> the same command, in Go - <b>orders.go</b></div>
<pre class="mt-code">resp, err := gocurl.Curl(ctx,
  <span class="s">"curl -X POST https://api.example.com/v1/orders"</span>,
  <span class="s">"-H"</span>, <span class="s">"Authorization: Bearer $TOKEN"</span>,
  <span class="s">"-H"</span>, <span class="s">"Content-Type: application/json"</span>,
  <span class="s">"-d"</span>, <span class="s">`{"sku": "A-503", "qty": 2}`</span>)
<span class="c">// a standard *http.Response - net/http underneath</span></pre>
</div>
</div>

This is the key distinction: GoCurl is **not** a curl-to-Go code generator that emits boilerplate for you to paste and maintain. It executes the curl command directly at runtime and hands you a standard `*http.Response`. Test the command in your shell, then run the exact same string in production code - one syntax in both places.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One curl command flows to two places: the gocurl CLI in your shell and the gocurl library in your Go code - both built on net/http, both returning the same result">
  <g font-family="inherit" font-size="12.5">
    <rect x="40" y="66" width="200" height="58" rx="10" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.55)" stroke-width="1.3"/>
    <text x="140" y="92" text-anchor="middle" fill="#14cf93" font-weight="600">one curl command</text>
    <text x="140" y="110" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11">from any API's docs</text>
    <line x1="240" y1="82" x2="320" y2="56" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/>
    <line x1="240" y1="108" x2="320" y2="134" stroke="rgba(255,255,255,.35)" stroke-width="1.3"/>
    <rect x="320" y="30" width="200" height="52" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="420" y="52" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">shell: gocurl CLI</text>
    <text x="420" y="70" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">try it, debug it</text>
    <rect x="320" y="108" width="200" height="52" rx="10" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="420" y="130" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">code: gocurl library</text>
    <text x="420" y="148" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">ship the identical command</text>
    <line x1="520" y1="56" x2="600" y2="82" stroke="rgba(20,207,147,.55)" stroke-width="1.3"/>
    <line x1="520" y1="134" x2="600" y2="108" stroke="rgba(20,207,147,.55)" stroke-width="1.3"/>
    <rect x="600" y="66" width="130" height="58" rx="10" fill="rgba(255,255,255,.05)" stroke="rgba(20,207,147,.5)" stroke-width="1.3"/>
    <text x="665" y="92" text-anchor="middle" fill="rgba(255,255,255,.85)" font-family="Consolas, monospace" font-size="12">*http.Response</text>
    <text x="665" y="110" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">plain net/http</text>
  </g>
</svg>
<figcaption><strong>One syntax, two places.</strong> The CLI mirrors the library exactly, so what you debugged in the shell is what runs in production - no translation, no drift.</figcaption>
</figure>

## The surface, briefly

- **Entry points** take the command as one string or separate argv tokens: `Curl` returns the `*http.Response`; `CurlString` gives body plus response; `CurlJSON` decodes straight into your struct; `CurlBytes` and `CurlDownload` cover raw bytes and streamed file downloads.
- **Variables:** `$VAR` / `${VAR}` expand from the environment automatically, or pass an explicit `Variables` map through the `*WithVars` variants - testable, and nothing reads your process env behind your back. `.env` files are supported.
- **Lean by design:** built on stdlib `net/http` (plus HTTP/2 support, brotli, dotenv) - not a framework, a convenience layer with standard types at every boundary.

## Status, honestly

GoCurl is **internal today, pre-1.0, under active development** - built to scratch a real daily itch, since our own team integrates many REST APIs that only document curl. The plan is to open-source it (MIT) once the parser's flag coverage and the release checklist meet our bar; per our link-dark rule there is no repository link here until the day there is a public repository to read. When it ships, this page carries the repo and runnable examples.
