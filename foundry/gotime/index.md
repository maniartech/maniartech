---
title: "gotime"
headline: "yyyy-mm-dd, not 2006-01-02."
description: "An ergonomic date/time library for Go and the reference implementation of the NITES format notation: human-readable format specifiers, one-line conversion, relative time and business-calendar arithmetic on Go's own time engine."
eyebrow: "Library"
titleTag: "gotime - Intuitive Date and Time for Go"
seoDescription: "gotime: human-readable date/time formatting for Go and the NITES reference implementation - MIT, v2.0.4, zero dependencies, measured coverage."
order: 5
tocDepth: "3"
statusLine: "MIT | v2.0.4 tagged | Zero dependencies | Reference implementation of NITES"
artifacts:
  - label: "Repository"
    url: "https://github.com/maniartech/gotime"
    primary: true
  - label: "NITES on /standards/"
    url: "/standards/#nites"
railMeta:
  - { k: "Type", v: "Go library; reference implementation of NITES" }
  - { k: "Maturity", v: "Stable; tagged v2.0.4" }
  - { k: "Availability", v: "Public source, public tagged release" }
  - { k: "Licence", v: "MIT" }
  - { k: "Adoption", v: "Adoptable; go-gettable today" }
  - { k: "Spec status", v: "NITES itself is a research-stage notation - see /standards/" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Repository"
    note: "Source, docs and the committed test suite"
    url: "https://github.com/maniartech/gotime"
  - label: "NITES in the standards register"
    note: "The notation's own status, kept separate from this library's"
    url: "/standards/#nites"
  - label: "pkg.go.dev"
    note: "API reference as Go publishes it"
    url: "https://pkg.go.dev/github.com/maniartech/gotime/v2"
reviewKicker: "Public evidence"
privateReview: "Nothing is gated - source, docs and tests are public."
---

Go's date formatting is famous for the wrong reason: to format a date you must remember that January 2nd, 2006 at 15:04:05 is the reference moment, and write your layout as that literal date. It is clever, it is documented, and after a decade of Go, most of us still look it up. gotime's position is that a format string should say what it means.

## The signature exhibit: the same format, twice

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> standard Go - the reference-time layout</div>
<pre class="mt-code">time.Now().Format(<span class="s">"2006-01-02 15:04:05"</span>)

<span class="c">// you must remember that 2006 means yyyy,</span>
<span class="c">// 01 means the month, 02 the day, 15 the</span>
<span class="c">// hour, 04 the minute, 05 the second</span></pre>
</div>
<span class="lang-arrow">&rarr;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> gotime - NITES specifiers</div>
<pre class="mt-code">gotime.Format(time.Now(), <span class="s">"yyyy-mm-dd hh:ii:ss"</span>)

<span class="c">// the format string says what it means:</span>
<span class="c">// year, month, day, hour, minute, second</span></pre>
</div>
</div>

The right-hand notation is **NITES** - a format-specifier notation we author, with its own entry on [/standards/](/standards/#nites). gotime is its **reference implementation**: the library is stable and tagged, while the notation itself is still research-stage. Those are two different maturities, and this page keeps them apart.

## What flows through it

Input to output, the shape is always the same - parse against a readable format, operate, format back out. Errors are Go errors: a value that does not match its format returns `(time.Time{}, err)`, never a guess.

```go
// Parse - the format says what the input means
date, err := gotime.Parse("07/07/2025", "mm/dd/yyyy")

// Convert - one line between formats, parse errors surface
iso, err := gotime.Convert("07/07/2025", "mm/dd/yyyy", "yyyy-mm-dd")
// -> "2025-07-07"

// Relative time and calendar arithmetic
ago  := gotime.TimeAgo(time.Now().Add(-5 * time.Minute))  // "5 minutes ago"
next := gotime.WorkDay(1, time.Now())                     // next business day
```

Underneath, gotime is a layer on Go's own `time` package - it extends the standard engine rather than replacing it, so a `gotime` call and a stdlib call agree about what time it is. Zero dependencies, TinyGo-compatible per the README.

## Edge cases, from the library's own documentation

Date/time is exactly where edge cases hide, so the docs answer them explicitly - this matrix is drawn from `docs/api-reference/calendar-math.md`:

| Case | Call | Result |
|---|---|---|
| Feb 28 in a common year | `IsLastDayOfMonth(2025-02-28)` | `true` |
| Feb 28 in a leap year | `IsLastDayOfMonth(2024-02-28)` | `false` |
| Feb 29 in a leap year | `IsLastDayOfMonth(2024-02-29)` | `true` |
| Jul 31 | `IsLastDayOfMonth(2025-07-31)` | `true` |
| Malformed input | `Parse("31/31/2025", "mm/dd/yyyy")` | an error, not a guess |

Business-calendar helpers (`WorkDay`, working-day ranges) carry the same discipline: the calendar math is tested rather than assumed, which is the whole reason to use a library for this.

## Test evidence, measured

The README badges claim 100% coverage; we re-measured rather than repeating them. `go test -cover` on 13 August 2026, at v2.0.4:

- **public package `gotime/v2`: 100.0% of statements**
- **`internal/nites` (the format engine): 100.0%**
- **`internal/cache`: 100.0%**
- `internal/utils`: 13.6% - a lower-level helper package, stated here so the headline number has its scope.

Full coverage on the public surface of a date/time library matters, because the value of the library *is* its edge-case behaviour.

## Known limits

- **NITES is not a settled standard.** The notation is research-stage; adopting gotime means adopting a library with a stable API, not a frozen industry format. The notation's status lives on [/standards/](/standards/#nites) and may evolve.
- **Coverage is scoped as stated above** - the public package measures 100.0%; one internal helper package does not.
- **The npm package named `gotime` is unrelated.** It belongs to a different maintainer; this is a Go module only - `go get github.com/maniartech/gotime/v2`.

## Status: four facts, kept separate

- **Availability** - public source and a public tagged release: `go get github.com/maniartech/gotime/v2@v2.0.4`.
- **Licence** - **MIT**, in the repository today.
- **Maturity** - **stable at v2.0.4** as a library. The NITES notation it implements is research-stage - two maturities, deliberately not blended.
- **Adoption** - adoptable now. The API is the commitment; the notation's evolution is tracked on the standards page.

## What this demonstrates

Wrapping an API everyone already trusts - without breaking its semantics - is quieter engineering than building a new engine, and harder than it looks: every convenience has to agree exactly with the stdlib behaviour underneath it, and every calendar edge case has to be decided rather than inherited by accident. Measured full coverage on the public surface is what that discipline looks like in a repository. It is the same posture we take when extending a customer's existing system: respect the engine, improve the interface, and prove the seams.
