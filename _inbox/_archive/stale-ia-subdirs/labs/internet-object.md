---
title: "Internet Object — A Modern Data Serialization Format"
description: "Internet Object is a schema-first, human-readable data interchange format — 50% smaller payloads and ~30% fewer tokens than JSON. A research & open-source project by ManiarTech® Labs."
lab_status: "Research · Open Source"
---

<!-- LABS PROJECT HERO -->
# Internet Object

**A schema-first data serialization format, designed from first
principles — 50% smaller payloads and ~30% fewer tokens than JSON.**

<!-- TODO image: Internet Object logo / code sample visual -->

[internetobject.org](https://internetobject.org) · [GitHub](https://github.com/maniartech/InternetObject-js) · [Playground](https://github.com/maniartech/InternetObject-Playground) <!-- TODO confirm playground URL -->

---

## The problem

JSON repeats every key in every record, carries no schema, and offers a
handful of primitive types. At scale that redundancy costs real money —
in bandwidth, in ambiguity, and now in **LLM tokens**, where every
wasted character is inference cost.

## The research

Internet Object separates the **schema** from the **data**, so records
carry values, not repeated keys — eliminating the 40–50% key-repetition
overhead built into JSON. The result is dramatically more compact,
still human-readable, and **validated at parse time**.

- **50% smaller payloads, ~30% fewer tokens** than equivalent JSON —
  built for the AI era, where token count is a line item.
- **Schema-first** — explicit, validated API contracts instead of
  validation logic scattered across services.
- **Rich type system** — decimal/binary/hex/octal numbers, multiple
  string types, ISO-8601 dates, Inf/NaN.
- **JSON-compatible** — parsers read JSON natively; migrate gradually.
- **Streaming-friendly**, with comments and inline variables.

<!-- TODO: short before/after code sample (JSON vs Internet Object) -->

## Status & ecosystem

Open specification with official **TypeScript/JavaScript** and
**Python** parsers, an interactive playground, and IDE tooling in
development. Actively developed; early production adoption underway.

---

**This is the rigor we bring to client work.**
[Explore our services →](/services/) · [Estimate your project →](/estimate/)
