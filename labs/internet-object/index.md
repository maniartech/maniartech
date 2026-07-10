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

## What it is

Internet Object separates schema from data in a single, plain-text document. The header carries the schema once; the data rows follow it positionally, CSV-like, and are validated automatically as they parse. JSON repeats every key in every record; Internet Object sends the keys once. It is document-oriented, streaming-friendly — one bad record does not break the rest — and designed from a clean slate for data transport rather than retrofitted from JavaScript notation.

The reference parser ships on npm as `internet-object` — ESM and CommonJS, typed, tree-shakeable, zero runtime dependencies — with a Python parser also live and Rust, Go, C# and Dart parsers on the roadmap. We use it internally at ManiarTech.

## Why it matters

The payload shrinks, and you can prove it yourself. Internet Object is **over 40% smaller than minified JSON — up to roughly 60% on nested data — reproducible live on the playground**, and it costs **about 30% fewer LLM tokens** via the public benchmark repository at [github.com/maniartech/InternetObject-vs-JSON-benchmark](https://github.com/maniartech/InternetObject-vs-JSON-benchmark), measured against GPT-4 / cl100k_base.

Fewer wasted characters means fewer tokens, which in the LLM era is real inference cost saved — and every figure here is one you can re-run, not one you have to take on faith.

## Status & how to see it

The spec is a **1.0 draft, work-in-progress**: most of it is marked beta and provisional, nothing is locked as stable yet, and the JS library is feature-complete in practice but pre-1.0. The research has real lineage — the project dates to 2018 — so this is a maturing standard, not a weekend experiment.

The best way to feel it is hands-on:

- **Playground:** open [play.internetobject.org](https://play.internetobject.org) — Monaco editor, live schema validation, and JSON-vs-IO benchmarks you can run in the browser.
- **Reference parser:** read the source on [GitHub](https://github.com/maniartech/InternetObject-js).


