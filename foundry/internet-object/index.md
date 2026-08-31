---
title: "Internet Object"
headline: "Declare the shape once, then send only data."
description: "A schema-first, human-readable data format. The schema becomes the document's contract - so payloads shrink, validation happens during the parse, and one bad record cannot poison the rest."
eyebrow: "Standard"
titleTag: "Internet Object - a Schema-First JSON Alternative"
seoDescription: "Internet Object: a schema-first data format. In its published benchmark, about 49% smaller than JSON and about 27% fewer AI tokens at 100 user records."
order: 2
tocDepth: "3"
statusLine: "Spec: 1.0 working draft | JS package: 0.2.1 (ISC) | Playground: live | Adoption: evaluate, don't commit"
artifacts:
  - label: "Try the playground"
    url: "https://play.internetobject.org"
    primary: true
  - label: "Repository"
    url: "https://github.com/maniartech/InternetObject-js"
  - label: "Specification"
    url: "https://docs.internetobject.org"
railMeta:
  - { k: "Type", v: "Data-format standard with reference implementations" }
  - { k: "Spec", v: "1.0 working draft, provisional" }
  - { k: "JS package", v: "0.2.1, pre-1.0, on npm" }
  - { k: "Licence", v: "ISC - JavaScript implementation only" }
  - { k: "Adoption", v: "Available for evaluation; not a stable-format commitment" }
  - { k: "Lineage", v: "In development since 2018 (project README)" }
  - { k: "Reviewed", v: "12 August 2026" }
railLinks:
  - label: "Live playground"
    note: "Transform your own data; the byte math runs on what you type"
    url: "https://play.internetobject.org"
  - label: "Published benchmark"
    note: "The harness behind the numbers quoted on this page"
    url: "https://github.com/maniartech/InternetObject-vs-JSON-benchmark"
  - label: "npm: internet-object"
    note: "v0.2.1, ISC, ESM + CJS + types"
    url: "https://www.npmjs.com/package/internet-object"
  - label: "The design story"
    note: "From JSON to Internet Object, in two parts"
    url: "/insights/from-json-to-internet-object-part-1/"
reviewKicker: "Public evidence"
privateReview: "Nothing is gated. The specification, source, package, benchmark harness and playground are all public - inspect them before you talk to us."
---

The specimen in the hero is the whole idea at three records: the keys JSON repeats are exactly the characters Internet Object deletes. That repetition is invisible at three records and expensive at thirty thousand - on the wire, in a context window, and in the eyes of whoever has to check the data's shape, which JSON itself has no opinion about.

What makes the format worth evaluating is not the byte saving on its own. It is what the schema being *in* the document lets the parser do, and how far the schema language goes beyond field names.

## What the schema language can express

A header that only listed field names would be a compression trick. Internet Object's schema line is a type system: derived string types (`email`, `url`, `date`), constrained numbers (`int32`, ranges, `min`/`max`), optional `?` and nullable `*` modifiers, defaults, choices, and reusable named schemas that can reference themselves:

<figure class="mt-figure">
<a href="https://play.internetobject.org" target="_blank" rel="noopener"><img src="/themes/maniartech/assets/imgs/research/io-playground-2026-08.webp" alt="The Internet Object playground with the Recursive Schema Complex sample loaded: a schema pane defining $employee with a self-referencing reportingTo field, a six-record document pane of 363 bytes, the equivalent minified JSON output of 935 bytes on the right, and a computed badge reading 61.18% Smaller than minified JSON" loading="lazy"></a>
<figcaption><strong>What to notice: the schema references itself.</strong> The playground's sample defines <code>$employee</code> with <code>reportingTo?: $employee</code>, so an employee nests an employee - and the last record uses <code>N</code> for the one who reports to nobody. The badge is computed live, not copywritten, but it compares the 363-byte <em>document</em> against the JSON; the 146-byte schema sits in its own pane and is not counted. Counting it, this sample is 43.7% smaller. Captured 12 August 2026.</figcaption>
</figure>

## What the schema being *in* the document changes

In the JSON world, validation is a separate layer you remember to add - a JSON Schema file, a validator dependency, a CI step. In Internet Object the parse *is* the validation: the parser resolves the schema header first, then checks every record against it as it reads. There is no moment where the data exists in your program unvalidated.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The parse path: the document's schema header is resolved first, then each record is validated against it as it is read; conforming records emerge as typed data while a failing record is reported with its position and the parse continues">
  <g font-family="inherit" font-size="12">
    <rect x="30" y="30" width="150" height="48" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.35)"/>
    <text x="105" y="51" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">schema header</text>
    <text x="105" y="68" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">resolved once</text>
    <rect x="30" y="150" width="150" height="48" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.35)"/>
    <text x="105" y="171" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">~ record stream</text>
    <text x="105" y="188" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">read one at a time</text>
    <path d="M180 54 L250 100" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <path d="M180 174 L250 128" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="252" y="90" width="160" height="52" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.45)"/>
    <text x="332" y="112" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">validate during parse</text>
    <text x="332" y="130" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">types, ranges, presence</text>
    <path d="M412 104 L482 66" stroke="rgba(20,207,147,.6)" stroke-width="1.5"/>
    <path d="M412 128 L482 178" stroke="rgba(255,200,120,.6)" stroke-width="1.5"/>
    <rect x="484" y="40" width="180" height="52" rx="8" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.6)"/>
    <text x="574" y="62" text-anchor="middle" fill="#14cf93" font-weight="600">typed records</text>
    <text x="574" y="80" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">int is int, date is date</text>
    <rect x="484" y="152" width="180" height="52" rx="8" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.55)"/>
    <text x="574" y="174" text-anchor="middle" fill="rgba(255,200,120,.9)" font-weight="600">error, with position</text>
    <text x="574" y="192" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">reported; the parse continues</text>
    <text x="380" y="236" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">The refusal path is part of the design: a failing record is an error value, not an exception that ends the document.</text>
  </g>
</svg>
<figcaption><strong>Validation is not a separate step.</strong> The parser checks each record against the declared schema as it reads it - so a record that emerges from the parse is already known to conform, and one that fails is reported with its position while the rest of the document survives.</figcaption>
</figure>

That last property deserves its own picture, because it is a rule of the specification, not a courtesy of one implementation: **one bad record must not break the rest.**

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
<figcaption><strong>Record independence.</strong> In JSON, one bad byte fails the whole payload. In Internet Object each record stands alone - built for streams, logs and pipelines that cannot afford all-or-nothing parsing.</figcaption>
</figure>

## Reading it from code

The reference implementation ships on npm as `internet-object` - ESM and CommonJS, typed, zero runtime dependencies. From the project's own README:

```ts
import { parse } from 'internet-object';

const text =
  'name: string, age: int
' +
  '---
' +
  '~ Alice, 30
' +
  '~ Bob, 25
';

const doc = parse(text);
console.log(doc.toObject());
// [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]
```

The surface goes well past `parse`: `load()` and `validateObject()` check existing JavaScript data against a schema (throwing and non-throwing forms), `loadInferred` infers a schema from data, `parseDefinitions` makes named schemas reusable across documents, and `createStreamReader` consumes Node streams, WHATWG streams or any async iterable - which is where record independence earns its keep.

```ts
import { createStreamReader } from 'internet-object';

const reader = createStreamReader(responseBody);   // fetch Response, stream, generator...
for await (const record of reader) {
  // each record arrives validated; a bad one surfaces as an error, not a crash
}
```

## The trade-off, stated plainly

Schema-first is not free, and the price should be stated as plainly as the win:

- **The document is no longer self-describing to a naive reader.** A JSON blob explains itself; an Internet Object document assumes you can see its header, so schema and data must travel together or the schema must be resolvable.
- **A single record pays the header without amortising it.** For one small record the schema line can cost more than the keys it replaces - the playground will happily show you a case where JSON wins.
- **A provisional spec means the contract can still move.** Until 1.0 is frozen, adopting the format means accepting that the format may change under you.

The bet is that most data that matters is *many records of the same shape* - result sets, exports, logs, LLM context - and for that shape, paying the schema once is the right trade.

## The measured result

In the project's published benchmark - [InternetObject-vs-JSON-benchmark](https://github.com/maniartech/InternetObject-vs-JSON-benchmark), runnable from its repository - Internet Object reduced serialized size by about **49%** and GPT-4-tokenizer (`cl100k_base`) token count by about **27%** against minified JSON at 100 records:

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of the published benchmark at 100 generated user records: Internet Object 10,052 bytes versus JSON 19,807 bytes, a 49.25 percent reduction; and 4,174 tokens versus 5,749 tokens under the cl100k_base tokenizer, a 27.40 percent reduction">
  <g font-family="inherit" font-size="12">
    <text x="40" y="28" fill="rgba(255,255,255,.8)" font-weight="600">Serialized size - 100 user records (published benchmark)</text>
    <text x="40" y="62" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">JSON</text>
    <rect x="110" y="48" width="520" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="640" y="62" fill="rgba(255,255,255,.6)">19,807 B</text>
    <text x="40" y="94" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">IO</text>
    <rect x="110" y="80" width="264" height="18" rx="4" fill="#14cf93"/>
    <text x="384" y="94" fill="#14cf93" font-weight="600">10,052 B - 49.25% smaller</text>
    <text x="40" y="146" fill="rgba(255,255,255,.8)" font-weight="600">Tokens, cl100k_base - the same 100 records</text>
    <text x="40" y="180" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">JSON</text>
    <rect x="110" y="166" width="520" height="18" rx="4" fill="rgba(255,255,255,.28)"/>
    <text x="640" y="180" fill="rgba(255,255,255,.6)">5,749 tok</text>
    <text x="40" y="212" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace">IO</text>
    <rect x="110" y="198" width="378" height="18" rx="4" fill="#14cf93"/>
    <text x="498" y="212" fill="#14cf93" font-weight="600">4,174 tok - 27.40% fewer</text>
  </g>
</svg>
<figcaption><strong>The published benchmark's own figures, with its own scope.</strong> The corpus is generated user records (name, age, gender, date, nested address, colours array, boolean); results vary with record shape and count; the harness uses simulated Internet Object serialization and reports approximately &plusmn;5% variation between runs. Token counts are the <code>cl100k_base</code> tokenizer - a different model family tokenizes differently. Re-run it from the repository before you believe us.</figcaption>
</figure>

Two boundaries worth repeating from the harness itself: at **one record** the schema header can make Internet Object break even or lose outright, and payloads dominated by long prose rather than repeated keys have little for the format to remove. The win is multi-record, structured data - which is what APIs, exports and LLM context windows mostly are.

## Known limits

- The **specification is a working draft** - most of it marked beta, nothing locked as stable.
- The **JavaScript package is 0.2.1** - feature-complete in practice (parsing, validation, type system, streaming, schema inference per its README), but the version number is the accurate signal of its maturity.
- **Go and Python implementations exist in public repositories but carry no licence** and are not maintained in step with the JavaScript one.
- The **published npm package currently requires a bundler** - its module graph does not resolve under plain Node ESM imports (register finding, 2026-08-12).
- **Single-record and prose-heavy payloads** can break even or lose against JSON - see the trade-off section above.

## Status: four facts, kept separate

- **Specification** - a **1.0 working draft**, provisional.
- **JavaScript package** - **0.2.1, pre-1.0**, on npm, licence **ISC (JavaScript implementation only)**.
- **Availability** - public specification, public source, public package, public docs and a public playground. The playground itself is AGPL-3.0 - its licence, not the library's.
- **Adoption** - **available for evaluation; not a stable-format commitment.** Try it on your own data in the playground; do not put a provisional format under a system you cannot migrate.

The project has been in development since **2018** (its README's own copyright line) - a long-horizon standards effort, not a weekend format.

## What this demonstrates

Designing a data format meant resolving schema evolution, per-record failure semantics, streaming and human readability against each other - then holding those decisions steady across a specification, multiple implementations and a live playground for eight years. That is the same discipline an enterprise system needs when its data contract has to outlive the service that introduced it: the shape declared once, validated at the boundary, and versioned deliberately.
