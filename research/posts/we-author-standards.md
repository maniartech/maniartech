---
title: "Why a small engineering team authors its own standards"
description: "Internet Object, NITES, UExL, FUSE, Indigo - what it means to write specifications instead of only consuming them, and what that discipline does to everyday client work."
date: "2026-07-20"
order: 2
---

Most software companies consume standards. They use JSON because it is there, date libraries because someone wrote them, query conventions because a framework chose them. Nothing wrong with that - it is the sensible default.

We have ended up somewhere less usual: over the years, ManiarTech has **authored** a family of specifications and languages - written the grammar, the rules, the reference implementations. This post is about what that actually means, why a small team would take it on, and - the part a prospective client should care about - what the discipline does to ordinary project work.

One framing note before the list: these are **specifications we have authored and published**, not industry standards. Nobody elected them. They earn adoption the only way anything earns adoption - by being useful and being checkable.

## The family, with honest labels

- **[Internet Object](/foundry/internet-object/)** - a schema-first data serialization format, designed as a leaner alternative to JSON for structured records. The core idea: state the schema once, then let the data flow beneath it, instead of repeating every key in every record. Published, with a [live playground](https://play.internetobject.org) you can try in your browser. On the datasets in that playground it comes out 40-60% smaller than minified JSON, and on multi-record data it uses roughly 30% fewer LLM tokens - both figures reproducible, not aspirational (single records can break even or worse; the benchmark repo shows the method).
- **NITES** - a specification for expressing dates, times, and natural-language time syntax: one case-insensitive, intuitive set of format specifiers to replace the fragmented mess of `strftime` codes, Go's reference-date layout, and the case-sensitive `yyyy`/`MM` conventions that differ between languages. Its reference implementation, [gotime](/foundry/gotime/), is published and in use.
- **[UExL](/foundry/uexl/)** - our expression language and engine, public and benchmarked ([the numbers, and how to re-run them](/insights/uexl-zero-alloc/)). Pre-1.0.
- **FUSE** - a specification for realtime, reactive APIs. Research stage: the spec exists, the framework comes later, and we label it accordingly.
- **[Indigo](/foundry/indigo/)** - the most ambitious of the set: a language, not a format. A typed superset of Go that compiles to clean, idiomatic Go with no injected runtime. In research, pre-1.0, and honestly labeled as such - we mention it as evidence of depth, not as something we would put into your project.

## Why bother? The honest reasons

**Because the problems kept recurring.** Every spec above started as a wound: data payloads that were bloated for what they carried, time handling that fought us on every project, expression evaluation that allocated its way into GC pauses. At some point, patching around a problem for the fifth time costs more than solving it properly once. Writing a specification IS solving it properly once.

**Because our founder has always worked one level down.** Twenty-seven years of his career - tooling with its own script engine and compiler at an investment bank, object frameworks at a Fortune 500 - sit a level beneath the application. ManiarTech authoring specifications is that instinct at company scale. It is the believable reason a small team does this at all: it is not a marketing posture, it is a habit that predates the company.

**Because writing a spec is the strictest thinking tool we know.** Code can hide fuzzy thinking behind passing tests. A specification cannot - it must state every rule, every edge case, every failure mode, in language precise enough for a stranger to implement independently. Ambiguity that survives in code dies in a spec, or the spec is not done.

## What specification writing teaches about edge cases

That last point deserves examples, because "specs force rigor" is exactly the kind of claim that should be shown rather than asserted. Three small decisions, one from each of the main specifications:

**Internet Object: one bad record must not break the rest.** The spec makes record independence a design objective, not an implementation nicety - in a streamed collection, a malformed record is isolated and reported while the records around it keep parsing. That rule exists because we asked the un-glamorous question early: what happens at record 40,000 of 100,000 when one row is corrupt? Most formats answer "the whole document fails." Writing the spec forced us to answer better, once, for every implementation.

**NITES: the most common date bug is a casing bug.** In `strftime`, `%m` is months and `%M` is minutes - a one-shift-key mistake that ships to production constantly, in every language that inherited the convention. NITES specifiers are case-insensitive by design, and minutes get their own letter (`i`) precisely so the month/minute collision cannot exist. It also defines named layouts - `iso`, `rfc`, `http` - so the most common formats need no format string at all. A whole bug class, deleted at the grammar level.

**UExL: define what "missing" means before someone finds out in production.** The engine's null-coalescing operator falls back *only* on null or absent values - it deliberately preserves `0`, empty strings, and `false`, because "zero" is data, not absence. Optional chaining returns null instead of panicking. These sound obvious written down; they are exactly the semantics that most hand-rolled expression evaluators get subtly wrong, because nobody wrote them down.

None of these decisions is heroic. That is the point. A specification is a machine for making hundreds of small decisions explicitly, early, and once - instead of implicitly, late, and repeatedly in production.

## What this does to ordinary client work

This is the part that matters if you are evaluating us for a business system rather than a data format.

**Precision becomes the default register.** A team trained on specification-writing brings the same habits to your requirements: undefined behavior gets named, edge cases get asked about early, "what happens when this fails?" is a first-class question. The discipline transfers directly - vague requirements are just an unwritten spec.

**The ceiling is demonstrated, not claimed.** Any agency can say "we handle complex work." A published grammar, a benchmarked engine, and a playground you can type into are a different kind of sentence. You are not asked to believe anything - you are invited to check. That is the standard we hold our claims to generally, and it starts with the technical work being public.

**And none of it is imposed on you.** Worth stating plainly: your project is built on mainstream, hireable technology - Go, Python, React, PostgreSQL, MongoDB. Our specifications enter your codebase only if you choose them, with eyes open. The depth is why hard problems are comfortably in range; it is never a dependency you inherit by accident.

## The quiet economics of it

Authored foundations compound. The data format, the time library, the expression engine, the site generator this page is served by - each was expensive to build once, and each has been amortizing across projects ever since. When a client platform comes together in months rather than a year, this is a large part of why: we are composing from parts we understand completely, because we wrote the rules they obey.

That compounding is, in the end, the business case for the whole habit - and it is your project that collects the interest.

If you want the depth without the lock-in, [tell us what you are building](/estimate/). A senior engineer replies within one business day with a ballpark and an honest take.
