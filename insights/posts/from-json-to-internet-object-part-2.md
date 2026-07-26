---
title: "From JSON to Internet Object: comments, object structure and types (Part 2)"
description: "Internet Object beyond size savings - first-class comments, positional/keyed/mixed object styles, open vs closed objects, and a type system with constraints, decimals, dates, and binary data."
date: "2025-11-25"  # true first publication: Medium, 25 Nov 2025
order: 8
---

*First published in the ManiarTech Engineering Journal on Medium (November 2025); refreshed for maniartech.com.*

In [Part 1](/insights/from-json-to-internet-object-part-1/) we walked from JSON to Internet Object and measured the size difference - our worked collection came out roughly 57% smaller than JSON, and about 40% smaller than minified JSON. Efficiency, though, is only the start. This part covers the features that make the format not just smaller but more expressive: comments, flexible object structure, and a type system that validates at the parsing boundary.

## Comments: documenting your data

One of JSON's oldest frustrations is the lack of comments. Internet Object treats them as first-class, using `#`:

<pre><code># This is a comment about the schema
name, age, active
&#45;&#45;&#45;
# This is a comment about the data
Spiderman, 25, T  # Inline comments work too</code></pre>

For configuration files and long-lived data documents, this alone changes maintainability.

## Three ways to define an object

Internet Object gives you the best of the CSV and JSON worlds - per object.

**1. Sequential (positional)** - the most compact, CSV-like; values map to the schema by order:

<pre><code>name, age, city
&#45;&#45;&#45;
Spiderman, 25, New York</code></pre>

**2. Keyed** - the most expressive, JSON-like; order does not matter:

<pre><code>name, age, city
&#45;&#45;&#45;
name: Spiderman, city: New York, age: 25</code></pre>

**3. Mixed** - start positional, switch to keyed:

<pre><code>name, age, city, active
&#45;&#45;&#45;
Spiderman, 25, active: T, city: New York</code></pre>

The one rule: once you switch to key-value pairs, you cannot return to positional values in that object - after the first named field, every subsequent field must be named, so the parser always knows which field you mean.

## Open vs closed objects

The root object of a document may be written without braces - that is what makes the format look so clean. Any *nested* object must be enclosed in braces:

<pre><code>name, age, address: {street, city, coordinates: {lat, lon}}
&#45;&#45;&#45;
Spiderman, 25, {"123 Main St", "New York", {40.7128, -74.0060}}</code></pre>

The root (name, age, address) is open; the address and its coordinates are closed.

## The type system

Untyped fields default to `any` - maximum flexibility, minimal validation. Explicit types tighten the contract:

<pre><code>name: string, age: number
&#45;&#45;&#45;
Spiderman, 25</code></pre>

### Constraints

Types accept constraints, written in braces:

<pre><code>password: {string, minLen: 10, pattern: '^[a-zA-Z0-9]+$'},
age: {number, min: 0, max: 120},
role: {string, choices: ["admin", "user", "guest"]}</code></pre>

The parser enforces all of it - length, pattern, range, and allowed values - before your application ever sees the data.

### Optional and nullable

Two markers cover the usual reality of real-world records:

<pre><code>name: string, email?: string, phone*: string</code></pre>

`name` is required; `email?` may be omitted entirely; `phone*` may be null.

## The type gallery

**Strings** come in three flavors: open strings (no quotes - end at a structural character), regular strings (double-quoted, escape sequences), and raw strings (`r'...'` - no escaping, ideal for regexes and Windows paths):

<pre><code>path: r'C:\Users\Admin\Documents'
regex: r'\d{3}-\d{2}-\d{4}'</code></pre>

**Numbers** are three distinct types, because precision is a real requirement, not a footnote:

- `number` - standard 64-bit float; scientific notation, `NaN`/`Inf`, hex/octal/binary integer forms.
- `decimal` - fixed-precision, suffixed `m` (`price: 19.99m`) - for money, where float error is unacceptable.
- `bigint` - arbitrary precision, suffixed `n` (`id: 9007199254740991n`).

**Dates and times** are native, ISO-8601-based, with typed prefixes:

<pre><code>birthday: d'2025-01-01'
alarm: t'07:30:00'
meeting: dt'2025-01-01T14:00:00Z'</code></pre>

Date constraints work as you would expect (`{date, min: d'2000-01-01'}`).

**Base64 binary** (`avatar: b'SGVsbG8gV29ybGQ='`), **booleans** (`T`/`F` or `true`/`false`), and **arrays** (bracketed, nestable, with `minLen`/`maxLen`/`len` constraints) round out the set.

One honest note: this article covers the common constraints; the complete list per type belongs to the full specification and documentation, which are being prepared for publication alongside the format itself.

## Why this matters beyond bytes

Part 1's argument was economic - fewer bytes, fewer tokens. This part's argument is engineering: with comments you document intent where the data lives; with mixed definitions you balance brevity against readability per record; and with types and constraints the data validates itself at the boundary. Bad data gets rejected by the parser, not discovered three layers into your application.

More parts of this series are on the way, covering document metadata, variables, and definitions. Meanwhile, everything above runs live in the [Internet Object playground](https://play.internetobject.org) - the fastest way to get a feel for the format is to type into it.

Internet Object is one of the open specifications authored at ManiarTech - [why we do that at all](/insights/we-author-standards/) is a story of its own.
