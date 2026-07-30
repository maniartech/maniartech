---
title: "gotime — intuitive date and time for Go"
description: "An ergonomic date/time library for Go and the reference implementation of the NITES format spec — 100% test coverage, zero dependencies."
labStatus: "Published"
category: "Libraries & Frameworks"
license: "MIT"
repo: "https://github.com/maniartech/gotime"
order: 5
---

`gotime` is an ergonomic date and time library for Go — published as v2, MIT, with zero dependencies.

## What it is

`gotime` is an ergonomic layer over Go's standard `time` package. It trades the stdlib's cryptic reference-time layout (`2006-01-02 15:04:05`) for human-readable format specifiers (`yyyy-mm-dd hh:ii:ss`) — the **NITES** format system — and adds the date work you actually reach for: smart parsing, one-line format conversion, human relative time (`TimeAgo` → "5 minutes ago"), and business-date math (working days, quarters, ranges). gotime is the published reference implementation of the NITES format specification.

## The whole pitch in two lines

Go's stdlib formats dates by example: you write the magic reference date `Jan 2, 3:04:05 PM 2006` in the exact layout you want. Every Go developer has looked it up twice in the same afternoon. NITES specifiers just say what they mean:

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> stdlib time - format by magic date</div>
<pre class="mt-code">t.Format(<span class="s">"2006-01-02 15:04:05"</span>)
<span class="c">// why 2006? why 15?</span>
<span class="c">// memorize: Jan 2, 3:04:05 PM, 2006</span></pre>
</div>
<span class="lang-arrow">&rarr;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> gotime - say what you mean <span class="lp-idiom">NITES</span></div>
<pre class="mt-code">gotime.Format(t, <span class="s">"yyyy-mm-dd hh:ii:ss"</span>)
<span class="c">// the specifier reads like the output</span>
<span class="c">// nothing to memorize</span></pre>
</div>
</div>

Both lines produce the same string. The difference is that the second one is readable by the person who didn't write it.

## Using it from code

The rest of the library follows the same instinct - the common date chores, one call each:

```go
import "github.com/maniartech/gotime/v2"

s := gotime.Format(time.Now(), "mmmm dt, yyyy")
// "July 7th, 2025"

d, _ := gotime.Parse("07/07/2025", "mm/dd/yyyy")

iso, _ := gotime.Convert("07/07/2025",
    "mm/dd/yyyy", "yyyy-mm-dd") // parse + format
// "2025-07-07"

ago := gotime.TimeAgo(fiveMinutesAgo)
// "5 minutes ago"

next := gotime.WorkDay(1, time.Now()) // next business day
n := gotime.NetWorkDays(start, end)   // business days between
```

## Why it matters

The checkable proof is in the repository: **100% test coverage** and **zero dependencies** (stdlib only), both shown by the README badges. Full coverage on a date/time library matters, because date/time is exactly where edge cases hide.

v2 is also a correctness story, not just a feature story. v1 panicked on bad user input; **v2 removed that panic anti-pattern and returns errors instead**, so a malformed date is something your code handles rather than something that takes down your process. That's the kind of change we make toward idiomatic, predictable Go.

## Status & how to see it

Published as v2 and importable today at `github.com/maniartech/gotime/v2`. See it for yourself:

- **Source, tests & coverage badge:** [github.com/maniartech/gotime](https://github.com/maniartech/gotime)
- Package docs are live on **pkg.go.dev**.


