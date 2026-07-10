---
title: "Internet Object — a schema-first, smaller-than-JSON data format"
description: "A respectful JSON alternative: over 40% smaller payloads and ~30% fewer LLM tokens, reproducible live."
order: 12
labStatus: "Published (spec 1.0 draft)"
category: "Standards & Languages"
license: "ISC"
repo: "https://github.com/maniartech/InternetObject-js"
playground: "https://play.internetobject.org"
image: ""
---

# Internet Object — a schema-first, smaller-than-JSON data format

**Status: Published (spec 1.0 draft)**

Internet Object is one of the standards we've authored — a schema-first,
human-readable serialization format built for the web and AI era. We call it a
respectful JSON alternative: it credits JSON rather than trashing it.

---

## What it is

Internet Object separates schema from data in a single, plain-text document. The
header carries the schema once; the data rows follow it positionally, CSV-like, and
are validated automatically as they parse. JSON repeats every key in every record;
Internet Object sends the keys once. It is document-oriented, streaming-friendly
(one bad record does not break the rest), and designed from a clean slate for data
transport rather than retrofitted from JavaScript notation.

The reference parser ships on npm as `internet-object` — ESM and CommonJS, typed,
tree-shakeable, zero runtime dependencies — with a Python parser also live and
Rust, Go, C# and Dart parsers on the roadmap. We use it internally at ManiarTech.

## Why it matters

The payload shrinks, and you can prove it yourself. Internet Object is **over 40%
smaller than minified JSON — up to roughly 60% on nested data — reproducible live on
the playground**, and it costs **about 30% fewer LLM tokens** via the public
benchmark repository (github.com/maniartech/InternetObject-vs-JSON-benchmark,
measured against GPT-4 / cl100k_base). Fewer wasted characters means fewer tokens,
which in the LLM era is real inference cost saved — and every figure here is one you
can re-run, not one you have to take on faith.

## Status & how to see it

The spec is a **1.0 draft, work-in-progress**: most of it is marked beta and
provisional, nothing is locked as stable yet, and the JS library is feature-complete
in practice but pre-1.0. The research has real lineage — the project dates to 2018 —
so this is a maturing standard, not a weekend experiment. The best way to feel it is
hands-on: open the live playground at **https://play.internetobject.org** (Monaco
editor, live schema validation, JSON-vs-IO benchmarks) and read the reference parser
on **GitHub**.

---

[ Explore the standards → ] · [ Estimate your project → ]

---

`[note] Honesty / link rules applied:
- labStatus "Published (spec 1.0 draft)"; license "ISC".
- LIVE LINKS ALLOWED and used: playground https://play.internetobject.org and repo
  https://github.com/maniartech/InternetObject-js. Benchmark repo named in prose.
- Proof claims: ">40% smaller than minified JSON (up to ~60% nested), reproducible
  live on the playground" and "~30% fewer LLM tokens" via the public benchmark repo
  (GPT-4 / cl100k_base). No invented metrics.
- VERSION NUMBER omitted on purpose (0.2.1 vs 1.0.0-beta.1 unresolved) — only the
  "spec 1.0 draft" stage is named.
- Status told honestly: draft/beta, nothing stable yet; "respectful" stance kept.
- "standards we've authored" used; "industry standard" NOT used. Understated voice.`
