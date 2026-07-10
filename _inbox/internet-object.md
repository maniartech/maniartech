# Inbox Dossier — Internet Object

> Collection doc (not a page yet). Source of truth for the eventual
> `_ia/labs/internet-object.md`. Every fact traces to a source below.
> Status of THIS doc: **fairly complete** — open questions at the bottom.

**Classification:** ManiarTech® **Labs** — Research project + Open-source library
**One-liner:** A schema-first, human-readable data serialization format —
a "respectful JSON alternative" built for the web/AI era.

---

## 1. Identity & authorship

| Field | Value |
|---|---|
| Name | Internet Object (IO) |
| Type | Data interchange / serialization **format** + reference **parsers** |
| Author / Researcher | Mohamed Aamir Maniar, at **ManiarTech® Lab** |
| Contact | aamir@internetobject.org · contact@maniartech.com |
| Spec version | **1.0 Draft** — `Work-in-Progress` (spec last updated 12 Oct 2025) |
| JS pkg version | npm `internet-object` — package.json **0.2.1** vs CHANGELOG **1.0.0-beta.1** ⚠️ → **omit version from site for now** (Aamir reviewing versioning separately) |
| Parsers | JS/TS ✅ live · Python ✅ live · **Rust, Go, C#, Dart + more 🔜 coming** |
| Internal use | Used internally at ManiarTech (nameable dogfooding proof) |
| License | **ISC** · © 2018–2026 ManiarTech® (note: project dates back to 2018) |
| Website | https://internetobject.org |
| Docs | https://docs.internetobject.org |
| Spec repo (local) | E:\Projects\internet-object\io-specs (GitBook-structured) |
| JS/TS parser (local) | E:\Projects\internet-object\io-js2 |
| GitHub | maniartech/InternetObject-js (TS, ~50★), -py (Python), -specs, -Playground (MIT) |
| npm | https://www.npmjs.com/package/internet-object (`@latest` stable, `@next` preview) |
| **Playground** | **https://play.internetobject.org** (LIVE) · local: io-playground |
| Social | X: @internetobject |

## 2. Positioning (verbatim from internetobject.org)

- **Hero:** "Transform your data exchange with a modern serialization format
  designed for the AI era."
- **Tagline:** "A Respectful JSON Alternative"
- **Headline stat:** "50% Smaller Payloads, ~30% Fewer Tokens"
- **Differentiator:** "Designed from the ground up for web data transport,
  not retrofitted from JavaScript notation."
- **Section heading:** "Meet Internet Object — Efficient Data Exchange &
  Structured Storage"
- **CTAs:** "Try IO in Playground" / "Try IO"
- Value props: Schema-First Validated Data · Intuitive Syntax (JSON & CSV-like) ·
  Human-Readable, Machine-Optimized · Stream-Ready / real-time.

> Tone note: "**Respectful** JSON alternative" is a deliberate stance — it
> credits JSON rather than trashing it. Keep that graciousness in our copy.

## 3. The problem it addresses

JSON (designed ~2001 for JS object notation, not as a wire/transport format):
- Repeats every key in every record → 40–50% key-repetition overhead at scale.
- No native schema → validation logic scatters across services.
- Mixes metadata with data; limited type system; not streaming-first.
- In the LLM era, wasted characters = wasted **tokens** = real inference cost.

## 4. How it works (the "aha" — keep these examples)

**Schema + data in one document** (`---` separates header/schema from data):
```io
name: string, age: int
---
~ Alice, 30
~ Bob, 25
```
- `~` rows = a collection (array of records). One row = single object.
- Values are positional (CSV-like), validated against the schema automatically.

**Nested + typed:**
```io
name:string, age:int, active:bool, address: {street:string, city:string}
---
~ John Doe, 25, T, {Bond Street, New York}
~ Jane Doe, 20, T, {Main Street, San Francisco}
```
The equivalent JSON is ~3× the bytes (repeated keys, braces, quotes).

**Separate, reusable schema + metadata header** (schema sent once, cached):
```io
~ schemaUrl: "https://example.com/schemas/person.io"
~ recordCount: 3
---
~ John Doe, 25, T, {Bond Street, New York}, [JavaScript, Python]
```

## 5. Design objectives (from spec /objectives.md)

Uninfluenced (clean-slate) design · Human-friendly (plain-text, no tools needed) ·
Minimal footprint (data/schema separation) · Schema-first · Document-oriented
(records + definitions + schemas + comments in one doc) · Complex data types ·
Streaming-friendly (one bad record MUST NOT break the rest) · Platform/language
independent · Inline comments · Reusability (variables + references).

**The Zen / "Poetic Principles"** (spec has an actual poem — distinctive brand
asset worth featuring): small over large, readability, reuse over verbosity,
separate data from definitions, separate headers from data, separate errors from
data, record independence, "trust not the sender" (defensive parsing).

## 6. Feature / type system

- **Structure:** document = header section + data section; structural elements,
  literals, comments, encoding.
- **Strings:** open / regular / raw. **Numbers:** number, bigint, decimal,
  NaN/Infinity. Plus base64, date & time, booleans, nulls, arrays, objects.
- **Schema Definition Language (SDL):** typed members; derived string types
  (email, url, date, time, datetime); derived number types (int, byte, int16,
  int32, …); MemberDef modifiers (optional `?`, nullable `*`, default, choices);
  TypeDef per-type option contracts; validation rules (min/max, length, pattern);
  variables (`@var`), schema references (`$Name`), `$schema` default.
- **Collections & streaming:** record-granular streaming; per-record error
  recovery.

## 7. Reference implementation (JS/TS — io-js2)

- npm `internet-object`. ESM + CommonJS dual package, TypeScript types,
  **tree-shakeable, zero runtime dependencies**, Node 18+.
- API surface: `parse`, `stringify`/`stringifyDocument`, `load`/`loadObject`/
  `loadCollection`, `validateObject`, `parseDefinitions`, `loadInferred`
  (schema inference), `createStreamReader` (Node/WHATWG/AsyncIterable),
  template-literal API ``io.doc`...` `` / ``io.schema`{...}` ``.
- Core classes: IODocument, IOObject, IOCollection, IODefinitions, IOSchema,
  IOError / IOValidationError / IOSyntaxError.
- Implementation feature status (README): parsing ✅, schema validation ✅,
  type system ✅, load/validate ✅, stringify ✅, error handling ✅,
  inference ✅, streaming ✅.

## 7b. Playground — LIVE interactive product (play.internetobject.org)

A real, published, hands-on surface — strongest "try it now" proof point IO has.
- Live tagline: "Internet Object Playground: Experience the New Data Format."
- Repo: maniartech/InternetObject-Playground (local: io-playground) · **MIT**.
- Built on the real library (`internet-object` from ../io-js2) — dogfoods the parser.
- Features: **Monaco** editor (real-time IO syntax), live schema validation &
  instant feedback, **click-error-to-jump** navigation, **performance benchmarks
  vs JSON**, examples library, dual output (formatted JSON / minified),
  **non-blocking parsing via Web Workers** (big docs stay responsive),
  shareable state (lz-string URL compression → "share this IO snippet" links).
- Quality signals worth citing: **WCAG 2.1 AA** accessibility (keyboard + screen
  reader), documented security practices (npm/yarn audit, Dependabot, GH Actions).
- Stack: React 18 + Vite 6 + TypeScript + Recoil + react-router. App version 0.1.0.
- → On our page this becomes the primary "Try IO in Playground" CTA.

**Placement decision (proposed, confirm at `_ia` phase):**
- **IO Labs page** = **embed it live** (iframe / trimmed inline editor) + big
  "Open full Playground →" button. Let developers feel the 50%-smaller payload.
- **Home page** = **static teaser only** — side-by-side JSON-vs-IO snippet with
  the "~50% smaller, ~30% fewer tokens" stat + link out. No heavy Monaco embed on
  home (keeps it fast and focused on the buyer's path to the Estimator).

## 8. Maturity — HONEST framing (important for credibility)

- Spec is **1.0 Draft / Work-in-Progress**. The spec's own FEATURE-STATUS marks
  nearly everything **Beta (provisional)**; several items **Experimental**
  (decimal precision/scale, variables, complex schema refs, sized ints, dynamic
  schema, MemberDef/TypeDef, error-format). **Nothing is locked as `Stable` yet.**
- JS lib is **beta** (1.0.0-beta.1) — feature-complete in practice, pre-1.0.
- Project lineage: © 2018 → research has real history (≈8 years), not a weekend toy.
- **DO claim:** active research, beta, open spec, working multi-language parsers,
  real benchmarks (50%/30%). **DO NOT claim:** "stable", "1.0 final",
  "production-proven at scale" — not yet supportable.

## 9. SEO angle (for the eventual page)

- Primary: "JSON alternative", "data serialization format", "schema-first data format".
- Secondary: "reduce JSON payload size", "fewer LLM tokens", "data interchange
  format", "schema validation at parse time", "streaming data format".
- AI-era hook ("~30% fewer tokens") is the timely differentiator — lead with it.

## 10. Proposed shape for `_ia/labs/internet-object.md` (build later)

Hero (name + 50%/30% claim) → The problem (JSON at scale + tokens) → The idea
(schema/data separation, one example) → Key features (typed, streaming, JSON-compat,
human-readable) → Ecosystem (spec, TS + Python parsers, playground) → Honest
status (research/beta, open spec) → "This is the rigor we bring to client work"
→ CTAs (Read the spec / Try the playground / GitHub) + bridge to /services + /estimate.

## 11. Decisions & open questions (updated 2026-06-11)

**Decided:**
- **Multi-language parsers — roadmap to feature:** JS/TS (live) + Python (live),
  with **Rust, Go, C#, Dart, and more parsers coming.** Frame as "official parsers
  across the stack" → reinforces "platform & language independent" objective.
  Show shipped vs. coming honestly (e.g. badges: JS ✅, Python ✅, Rust/Go/C#/Dart 🔜).
- **Adopter we can name: ManiarTech itself — "used internally."** Real-world,
  honest dogfooding proof. (Playground also dogfoods the JS parser.)
- **Zen poem:** undecided — keep in dossier; decide at `_ia` finalization.
- **Version number:** Aamir to review versioning separately; **omit a version
  number from the page for now** (don't show 0.2.1 vs 1.0.0-beta.1 until confirmed).

**Still open:**
- [ ] Confirm exact Python parser maturity wording.
- [x] ~~Playground canonical URL~~ → **https://play.internetobject.org** (live).
- [ ] Preferred primary CTA on our page: "Try the Playground" (recommended), "Read the spec", or "Star on GitHub"?
