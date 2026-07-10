---
title: "gotime — intuitive date and time for Go"
description: "An ergonomic date/time library for Go and the reference implementation of the NITES format spec — 100% test coverage, zero dependencies."
order: 22
labStatus: "Published"
category: "Open Source Libraries"
license: "MIT"
repo: "https://github.com/maniartech/gotime"
image: ""
---

# gotime — intuitive date and time for Go

**Status: Published · v2 · MIT · zero dependencies**

---

## What it is

`gotime` is an ergonomic layer over Go's standard `time` package. It trades the stdlib's
cryptic reference-time layout (`2006-01-02 15:04:05`) for human-readable format
specifiers (`yyyy-mm-dd hh:ii:ss`) — the **NITES** format system — and adds the date work
you actually reach for: smart parsing, one-line format conversion, human relative time
(`TimeAgo` → "5 minutes ago"), and business-date math (working days, quarters, ranges).
gotime is the published reference implementation of the NITES format specification.

## Why it matters

The checkable proof is in the repository: **100% test coverage** and **zero
dependencies** (stdlib only), both shown by the README badges. Full coverage on a
date/time library matters, because date/time is exactly where edge cases hide.

v2 is also a correctness story, not just a feature story. v1 panicked on bad user input;
**v2 removed that panic anti-pattern and returns errors instead**, so a malformed date is
something your code handles rather than something that takes down your process. That's the
kind of change we make toward idiomatic, predictable Go.

## Status & how to see it

Published as v2 and importable today at `github.com/maniartech/gotime/v2`. See it for
yourself:

- **Source, tests & coverage badge:** [github.com/maniartech/gotime](https://github.com/maniartech/gotime)
- Package docs are live on **pkg.go.dev**.

---

[ Browse the repositories → ] · [ Estimate your project → ]

---

`[note] Honesty gates applied:
- Proof = 100% test coverage + zero deps, both from README badges. No invented numbers
  (test-case count and star count omitted as not load-bearing).
- v2 framed as removing the panic anti-pattern (returns errors) — stated as a correctness
  improvement, not a swipe at v1.
- NITES named, per the brief (OK to name).
- Repo URL "https://github.com/maniartech/gotime" confirmed public in the brief; v2 module
  path noted for importers.`
