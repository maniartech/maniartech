---
audience: "engineering"
contentType: "engineering-deep-dive"
evidenceType: "Technical specification"
artifactLabel: "Live playground"
artifactUrl: "https://play.internetobject.org"
title: "From JSON to Internet Object: a lean, schema-first data format (Part 1)"
description: "How Internet Object trims JSON down to pure data - separating schema from records, collections, typed schemas, and a worked example that shrinks a JSON collection by more than half."
date: "2025-11-17"  # true first publication: Medium, 17 Nov 2025
titleTag: "JSON to Internet Object, Part 1 - a Leaner Format"
seoDescription: "A step-by-step walk from JSON to Internet Object: send the schema once, stream validated records, and cut payload size - reproducibly."
thread: "tools"
shortTitle: "JSON to Internet Object"
receipts:
  - "Internet Object"
  - "worked example"
keyReceipt: "628 B -> 273 B"
heroProof: "628 B -> 273 B"
heroProofNote: "a JSON collection rewritten, worked through byte by byte"
---

*First published in the ManiarTech Engineering Journal on Medium (November 2025); refreshed for maniartech.com.*

Internet Object is a lean, schema-first data format we designed for transmitting structured data efficiently. It was born from the everyday frustrations of JSON and grew into a research-driven effort to build a better interchange format for modern applications - APIs, data pipelines, and increasingly, LLM contexts where every token costs money.

The shortest way to explain it: JSON is familiar but verbose; CSV is compact but flat. Internet Object aims to combine the two - readable like CSV, expressive like JSON - for complex, hierarchical data.

This series walks through the format step by step. You only need to be comfortable with JSON and ordinary REST APIs to follow along - and everything below can be tried live in the [Internet Object playground](https://play.internetobject.org).

## From JSON to Internet Object

Start with a JSON object. Most JSON objects are already valid Internet Objects, so you can adopt the format without changing your data structures:

<pre><code>{
  "name": "Spiderman",
  "age": 25,
  "active": true,
  "address": {
    "street": "Queens",
    "city": "New York",
    "state": "NY"
  },
  "tags": ["agile", "emotional"]
}</code></pre>

This carries a lot of characters that are not data. The optimized Internet Object version of the same record looks like this:

<pre><code>Spiderman, 25, T, {Queens, New York, NY}, [agile, emotional]</code></pre>

Here is how we get there.

## Step 1: Simplify the syntax

Remove the quotation marks and the outer braces; `true` becomes `T`:

<pre><code>name: Spiderman, age: 25, active: T, address: {street: Queens, city: New York, state: NY}, tags: [agile, emotional]</code></pre>

This is already a valid *keyed* Internet Object document.

## Step 2: Separate schema from data

Pull the keys out into a schema:

<pre><code>name, age, active, address: {street, city, state}, tags</code></pre>

What remains is pure data:

<pre><code>Spiderman, 25, T, {Queens, New York, NY}, [agile, emotional]</code></pre>

Note that the nested object keeps its braces and the array keeps its brackets. Open objects - objects without surrounding braces - are valid only at the root; arrays always require brackets.

## Step 3: Combine schema and data in one document

A document joins the two with a data separator (three hyphens on their own line):

<pre><code>name, age, active, address: {street, city, state}, tags
&#45;&#45;&#45;
Spiderman, 25, T, {Queens, New York, NY}, [agile, emotional]</code></pre>

Like an HTML document with its head and body, an Internet Object document has a header (schema and metadata) and a data section.

## Step 4: Collections - where the savings compound

The format's real power shows with multiple records. Prefix each data row with `~` to form a collection:

<pre><code>name, age, active, address: {street, city, state}, tags
&#45;&#45;&#45;
~ Spiderman, 25, T, {Queens, New York, NY}, [agile, emotional]
~ Batman, 35, T, {Wayne Manor, Gotham, NJ}, [detective, wealthy]
~ Superman, 30, T, {Metropolis St, Metropolis, NY}, [strong, fast]</code></pre>

The equivalent JSON array repeats every field name for every object - in this small example, 45 repeated field names across three records. Internet Object states the structure once and lets the data flow beneath it.

## The size comparison, honestly measured

For the worked example above:

- Single object: JSON 190 bytes; Internet Object with schema 142 bytes (~25% smaller); data-only 67 bytes (~65% smaller).
- Three-object collection: JSON 628 bytes; Internet Object 273 bytes - roughly 57% smaller, and about 40% smaller than *minified* JSON.

The advantage grows with record count, because the schema is paid for once. Across the sample datasets in the [live playground](https://play.internetobject.org), documents come out 40-60% smaller than minified JSON - and on multi-record data the format uses roughly 30% fewer LLM tokens than JSON (single records can break even or worse; the [benchmark repository](https://github.com/maniartech/InternetObject-vs-JSON-benchmark) shows the method, so you can verify rather than take our word).

<figure class="mt-figure">
<a href="https://play.internetobject.org" target="_blank" rel="noopener"><img src="/themes/maniartech/assets/imgs/research/io-playground-2026-08.webp" alt="The Internet Object playground with the Recursive Schema Complex sample loaded: a schema pane defining $employee with a self-referencing reportingTo field, a six-record document pane of 363 bytes, the equivalent minified JSON output of 935 bytes on the right, and a computed badge reading 61.18% Smaller than minified JSON" loading="lazy"></a>
<figcaption><strong>The live playground, mid-comparison.</strong> A 146-byte schema plus a 363-byte document against 935 bytes of minified JSON. The badge does the math on your data as you type - note that it compares the document alone, so the schema is not in that 61.18%; counted in, this sample is 43.7% smaller. Click through and try your own. Captured 12 August 2026.</figcaption>
</figure>

## Step 5: Typed schemas

So far the schema only describes structure. It can also carry types:

<pre><code>name: string, age: number, active: bool, address: {street: string, city: string, state: string}, tags: [string]
&#45;&#45;&#45;
~ Spiderman, 25, T, {Queens, New York, NY}, [agile, emotional]</code></pre>

With types in place the parser validates as it reads - pass `"twenty-five"` as an age and the document is rejected at the boundary, not deep inside your application. Types also make the schema self-documenting, and they map cleanly onto interfaces and classes in typed languages.

When types are omitted, Internet Object infers them from the values - convenient for exploration, though explicit types are the right choice for production use.

## The document-oriented view

The deeper shift from JSON is that Internet Object is *document-oriented* rather than value-oriented. A document has a header and a data section; the header can carry schema, metadata, variables, and definitions. That structure is what enables collections, streaming-friendly layouts, and the richer features later parts of this series cover.

## What is in Part 2

[Part 2](/insights/from-json-to-internet-object-part-2/) covers comments (yes, real comments), the three object-definition styles (positional, keyed, and mixed), and the type system in depth - strings, decimals, big integers, dates, binary data, and constraint validation.

Internet Object is one of the open specifications we author at ManiarTech - the story of why a small engineering team writes its own standards is [its own post](/insights/we-author-standards/). Try the format in the [playground](https://play.internetobject.org), or read more at [internetobject.org](https://internetobject.org).
