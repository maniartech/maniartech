---
title: "GoCurl"
headline: "The curl command IS the Go code."
description: "A curl-ergonomic HTTP client for Go: paste the curl command an API documents and run it unchanged - with retries, timeouts and redaction wired around it."
eyebrow: "Library"
titleTag: "GoCurl - the curl Command as Go Code"
seoDescription: "GoCurl: paste any documented curl command straight into Go - hardened HTTP with idempotency-aware retries. Public source, MIT, pre-1.0."
order: 9
tocDepth: "3"
statusLine: "Public source | MIT | Pre-1.0 | Production-dogfooded"
artifacts:
  - label: "Repository"
    url: "https://github.com/maniartech/gocurl"
    primary: true
railMeta:
  - { k: "Type", v: "Go library + CLI - curl-ergonomic HTTP client" }
  - { k: "Maturity", v: "Pre-1.0; no tagged release" }
  - { k: "Availability", v: "Public source" }
  - { k: "Licence", v: "MIT" }
  - { k: "Adoption", v: "Not recommended as an external dependency yet" }
  - { k: "Evidence", v: "Dogfooded in ManiarTech's internal integration work" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Repository"
    note: "Source, fault-injection tests, benchmarks, CHANGELOG and VISION"
    url: "https://github.com/maniartech/gocurl"
reviewKicker: "Public evidence"
privateReview: "Nothing is gated - the source, its differential tests against real curl, and its doc-lint are public."
---

Every REST API documents itself with curl, and almost none ship a Go SDK for their long-tail endpoints - so every Go developer pays the same integration tax: mentally compiling a curl snippet into `http.NewRequest`, header maps, body encoding and auth. GoCurl deletes the translation step. **The command you tested in the shell is the code you ship**, and the library wires production behaviour around it.

## What the library wraps around the recipe


The request produced is standard `net/http`; the response comes back as standard Go types. Because GoCurl receives the *curl recipe*, it knows the intent - and puts the right execution pipeline around it: an overall timeout that bounds the whole retry loop (not per-attempt), **idempotency-aware retries** (a non-idempotent POST is not replayed), classified error kinds you can `errors.As` into, **secret redaction on every error, log and span path**, and bounded reads against untrusted servers. The README's comparison table against hand-rolled `net/http` is the page-one argument, and every row of it names the test that proves it.

## Proven, not promised - the project's own discipline

The repository's motto is *persuasion by example, not by marketing*, and it is mechanically enforced: an automated doc-lint (`TestDocHonestyLint`) fails the build if a claim ships without a named, un-skipped test behind it. The claims that matter are backed by a two-tier fault-injection harness - bounded retry budgets, HTTP/2 `GOAWAY` handling, graceful shutdown that never truncates a live stream, memory bounds against decompression bombs, no secret leaks on failure paths, soak tests for leaks and backpressure - and **wire-parity with real curl is proven by differential testing** against the actual curl binary.

On performance the README is deliberately modest: GoCurl targets **parity** with a well-tuned `net/http` client - parse once with `Prepare`, execute many with a pooled `Client` - and it publishes where it loses. It makes no "faster than net/http" claim, and neither do we.

## Supported and not supported

The curl surface is large, and the README states the boundary rather than hiding it: flag coverage is still expanding, and the pre-1.0 caveat is the *contract*, not the quality - the public API may still change, so pin a version and read the CHANGELOG when upgrading.

## Known limits

- **No tagged release.** Pre-1.0; the API may move. The repository's own guidance is to pin and follow the CHANGELOG.
- **Not recommended as an external production dependency yet** - our own position, stated plainly. We use it internally; the release-readiness bar for recommending it outward has not been met.
- **Curl-flag coverage is incomplete**, per the README and ROADMAP.

## Status: four facts, kept separate

- **Availability** - **public source** at [github.com/maniartech/gocurl](https://github.com/maniartech/gocurl).
- **Licence** - **MIT**, in the repository today.
- **Maturity** - pre-1.0, no tagged release; production-dogfooded internally.
- **Adoption** - inspect it freely; a stable release and public launch are planned once flag coverage and the release checklist meet our bar.

## What this demonstrates

The interesting engineering is the claim-verification machinery as much as the HTTP: differential testing against real curl, fault injection that breaks the network on purpose, and a lint that refuses to let documentation claim what a test does not prove. Turning "we say it works" into "the build fails if we overclaim" is exactly the standard an enterprise customer should demand of any integration layer that carries their traffic - and this is us practising it on our own account.
