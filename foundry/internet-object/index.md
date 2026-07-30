---
title: "Internet Object — a schema-first, smaller-than-JSON data format"
description: "A respectful JSON alternative: over 40% smaller payloads and ~30% fewer LLM tokens, reproducible live."
labStatus: "Published"
category: "Standards"
license: "ISC"
repo: "https://github.com/maniartech/InternetObject-js"
playground: "https://play.internetobject.org"
order: 2
---

Internet Object is one of the standards we've authored — a schema-first, human-readable serialization format built for the web and AI era. We call it a respectful JSON alternative: it credits JSON rather than trashing it.

## See it, don't take our word for it

The whole idea in one screen: JSON repeats every key in every record; Internet Object states the schema once, then sends rows.

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> the JSON you send today</div>
<pre class="mt-code">[
  {<span class="s">"name"</span>: <span class="s">"Alice"</span>, <span class="s">"age"</span>: 30},
  {<span class="s">"name"</span>: <span class="s">"Bob"</span>,   <span class="s">"age"</span>: 25}
]</pre>
</div>
<span class="lang-arrow">&rarr;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> the same data in Internet Object</div>
<pre class="mt-code"><span class="c">name: string, age: int</span>
<span class="op">---</span>
<span class="op">~</span> Alice, 30
<span class="op">~</span> Bob, 25</pre>
</div>
</div>

The header above the `---` is the schema — sent once, or hosted at a URL and cached forever. Each `~` row is a record, positional like CSV, but **validated against the schema as it parses**. Nesting keeps the same shape:

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> nested and typed - the schema</div>
<pre class="mt-code">name:<span class="k">string</span>, age:<span class="k">int</span>, active:<span class="k">bool</span>,
address: {street:<span class="k">string</span>, city:<span class="k">string</span>}</pre>
</div>
<span class="lang-arrow">&plus;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> the data rows</div>
<pre class="mt-code"><span class="op">~</span> John Doe, 25, T, {Bond Street, New York}
<span class="op">~</span> Jane Doe, 20, T, {Main Street, San Francisco}</pre>
</div>
</div>

The equivalent JSON of that nested collection is roughly three times the bytes — repeated keys, braces, and quotes are exactly the characters the format deletes. And the schema language goes far beyond primitive types: derived string types (`email`, `url`, `date`), constrained numbers (`int32`, ranges), optional `?` and nullable `*` modifiers, defaults, choices, and reusable schema references.

## What the savings measure as

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart: on the playground's sample datasets Internet Object documents are 40 to 60 percent smaller than minified JSON, and multi-record data costs about 30 percent fewer LLM tokens">
  <g font-family="inherit" font-size="12.5">
    <text x="40" y="30" fill="rgba(255,255,255,.8)" font-weight="600">Bytes on the wire (playground sample datasets, vs minified JSON)</text>
    <text x="40" y="66" fill="rgba(255,255,255,.75)">JSON</text>
    <rect x="150" y="52" width="520" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="678" y="66" fill="rgba(255,255,255,.6)">100%</text>
    <text x="40" y="98" fill="rgba(255,255,255,.75)">IO</text>
    <rect x="150" y="84" width="260" height="18" rx="4" fill="#14cf93"/>
    <rect x="410" y="84" width="52" height="18" rx="4" fill="rgba(20,207,147,.25)"/>
    <text x="472" y="98" fill="#14cf93" font-weight="600">40-60% smaller</text>
    <text x="40" y="150" fill="rgba(255,255,255,.8)" font-weight="600">LLM tokens on multi-record data (GPT-4 / cl100k_base tokenizer)</text>
    <text x="40" y="186" fill="rgba(255,255,255,.75)">JSON</text>
    <rect x="150" y="172" width="520" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="678" y="186" fill="rgba(255,255,255,.6)">100%</text>
    <text x="40" y="218" fill="rgba(255,255,255,.75)">IO</text>
    <rect x="150" y="204" width="364" height="18" rx="4" fill="#14cf93"/>
    <text x="524" y="218" fill="#14cf93" font-weight="600">~30% fewer tokens</text>
  </g>
</svg>
<figcaption><strong>Both figures are reproducible, not promotional.</strong> The byte comparison runs live in the playground on your own data; the token benchmark's method and harness are public - re-run either before you believe us. Single records can break even or worse; the win is multi-record data, where the schema is paid for once.</figcaption>
</figure>

Fewer wasted characters means fewer tokens, and in the LLM era that is real inference cost - on every request, for as long as the system runs.

## Built for imperfect data: record independence

Internet Object is document-oriented and streaming-friendly by rule, not by luck: the specification requires that **one bad record must not break the rest**.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A stream of records where one malformed record is flagged and skipped while every other record still parses">
  <g font-family="inherit" font-size="12">
    <g fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2">
      <rect x="40"  y="40" width="120" height="34" rx="6"/>
      <rect x="180" y="40" width="120" height="34" rx="6"/>
      <rect x="460" y="40" width="120" height="34" rx="6"/>
      <rect x="600" y="40" width="120" height="34" rx="6"/>
    </g>
    <rect x="320" y="40" width="120" height="34" rx="6" fill="rgba(240,90,90,.12)" stroke="rgba(240,90,90,.6)" stroke-width="1.2"/>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)">
      <text x="100" y="61">~ record 1</text><text x="240" y="61">~ record 2</text>
      <text x="520" y="61">~ record 4</text><text x="660" y="61">~ record 5</text>
    </g>
    <text x="380" y="61" text-anchor="middle" fill="rgba(240,90,90,.85)">~ record 3</text>
    <g text-anchor="middle" font-size="11">
      <text x="380" y="98" fill="rgba(240,90,90,.8)">malformed: reported, skipped</text>
      <text x="380" y="130" fill="rgba(255,255,255,.5)">the other four parse anyway - errors stay separate from data, per the spec's own rules</text>
    </g>
  </g>
</svg>
<figcaption><strong>Per-record error recovery.</strong> In JSON, one bad byte fails the whole payload. In Internet Object each record stands alone - built for streams, logs and pipelines that cannot afford all-or-nothing parsing.</figcaption>
</figure>

## Using it from code

The reference parser ships on npm as `internet-object` - ESM and CommonJS, typed, tree-shakeable, zero runtime dependencies, Node 18+. A Python parser is live too; Rust, Go, C# and Dart are on the roadmap.

```js
import { parse } from "internet-object";

const doc = parse(
  "name: string, age: int\n" +
  "---\n" +
  "~ Alice, 30\n" +
  "~ Bob, 25\n"
);

// records were validated against the schema during the parse
for (const person of doc.data) {
  console.log(person.name, person.age);
}
```

The API surface goes well past `parse`: `stringify`, schema inference with `loadInferred`, definition reuse with `parseDefinitions`, and `createStreamReader` for Node, WHATWG and async-iterable streams.

## Status & how to see it

The spec is a **1.0 draft, work-in-progress**: most of it is marked beta and provisional, nothing is locked as stable yet, and the JS library is feature-complete in practice but pre-1.0. The research has real lineage - the project dates to 2018, and you can read that history in the repository's own log.

- **Playground:** open [play.internetobject.org](https://play.internetobject.org) - Monaco editor, live schema validation, and JSON-vs-IO comparisons that run on whatever you type.
- **Reference parser:** read the source on [GitHub](https://github.com/maniartech/InternetObject-js).
- **The deeper story:** the two-part series [From JSON to Internet Object](/insights/from-json-to-internet-object-part-1/) walks the design decisions step by step.

<figure class="mt-figure">
<a href="https://play.internetobject.org" target="_blank" rel="noopener"><img src="/themes/maniartech/assets/imgs/research/io-playground.webp" alt="The Internet Object playground: schema and definitions on the left, equivalent JSON on the right, and a live badge reading 59.78% Smaller Than Minified JSON" loading="lazy"></a>
<figcaption><strong>The playground, live.</strong> Type your own data and watch the byte math update - the badge is computed, not copywritten.</figcaption>
</figure>
