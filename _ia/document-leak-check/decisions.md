# Decision log (ADRs) - Document Leak Check

Lightweight ADRs: context, options weighed, choice, why. So future builders know the reasoning,
not just the result.

---

## D1 - Report, never fix
**Context.** The tool could offer to strip metadata and flatten redactions.
**Options.** (a) Report only. (b) Report + fix in browser. (c) Report + fix + re-download.
**Decision.** **(a) Report only, for v1 and as a standing position.**
**Why.** Fixing means writing a modified document the user then relies on. If our flattening is
imperfect, we have *created* the leak we exist to prevent - the single worst possible outcome for a
tool whose entire purpose is trust. Reporting carries no such liability. It is also the brand:
we produce evidence, we do not decorate. Revisit only with a hard correctness proof.

---

## D2 - No backend, no accounts, no telemetry
**Context.** Every competitor uploads files to a server.
**Options.** (a) Server-side processing. (b) Hybrid. (c) Entirely client-side.
**Decision.** **(c).**
**Why.** For this category the privacy promise is not a differentiator, it is a **precondition** -
you cannot ask someone to upload the confidential document they are checking for leaks. Every
server-based competitor is structurally excluded from the category. It also eliminates ops,
support, and the security surface, which is what makes a zero-maintenance tool possible.
**Cost accepted.** No usage data at all. We will not know how many people used it or what broke.

---

## D3 - v1 is PDF only
**Context.** The full concept covers PDF, Office formats and images.
**Options.** (a) Ship everything. (b) PDF only. (c) PDF + Office.
**Decision.** **(b).**
**Why.** Fake redaction is the sharpest revelation and it is a PDF phenomenon. Smallest build,
largest "oh no". Shipping something mediocre is the main risk to a programme whose product is
reputation.

---

## D4 - No AI/ML in v1
**Context.** On-device models (transformers.js / WebGPU) could improve PII recall.
**Options.** (a) Regex/heuristics. (b) On-device NER model. (c) Server model (excluded by D2).
**Decision.** **(a)**, with (b) logged as a future bet.
**Why.** A model is multi-MB on a page that must load instantly, adds an accuracy claim we would
have to defend, and breaks the three-year-no-maintenance property. Deterministic matching can be
described honestly and audited by the user.

---

## D5 - Differentiate on absolutes and accountability, not on algorithm
**Context.** Stage 1 research found the category is **not** empty: PDF X-ray and Tamperlens both
ship redaction checkers, and the pdf.js paint-order technique is publicly documented in a DEV
Community write-up. An earlier claim in `_marketing/free-tools-program.md` that nothing free did
this was wrong and has been corrected.
**Options.** (a) Compete on detection quality. (b) Compete on breadth of formats. (c) Compete on
the trust properties competitors structurally cannot match.
**Decision.** **(c)**, with (b) as the roadmap.
**Why.** We have no algorithmic moat and must not pretend to one. What a competitor cannot copy:
an **unconditional** no-upload guarantee (PDF X-ray hedges with "in-browser where possible"), a
**named, accountable publisher** (PDF X-ray carries no attribution - for a trust tool, anonymity is
a structural weakness), a principled refusal to fix, and limits stated in the product.

---

## D6 - Detection is deterministic paint-order analysis, with three mandatory false-positive rules
**Context.** The flagship finding must be stateable as fact, not a maybe.
**Decision.** Paint-order analysis over `page.getOperatorList()`, plus **all three** of: ignore
translucent shapes (non-stroking alpha via `ExtGState`), ignore shapes covering >~40% of the page,
and treat text render mode 3 separately.
**Why.** Paint order is a fact about the file. The three rules are not polish - without them the
tool fires on watermarks, highlights and every scanned document, which would destroy credibility
faster than shipping nothing. See `open-questions.md` Q3 for full mechanics.

---

## D7 - "No upload" is a browser-enforced guard, never a promise
**Context.** Aamir re-affirmed the constraint as non-negotiable (2026-08-30): pure client-side web
app, no PDF ever sent to a server. DocsRight's **N-18** applies - *every enforcement claim names its
guard; an unnamed guard is a blocking review finding.* A sentence in the footer is not a guard.

**Three layers, all required:**

1. **Content Security Policy naming no third-party origin.** `default-src 'self'; connect-src
   <see Q11>; img-src 'self' blob: data:; form-action 'none'; object-src 'none'; base-uri 'none';
   frame-ancestors 'none'`. The browser refuses exfiltration; it is not our code being trusted.
2. **A build-time guard that fails the build** if network primitives (`fetch`, `XMLHttpRequest`,
   `WebSocket`, `sendBeacon`, `new Image()`, dynamic `import()` of a remote URL) appear anywhere in
   the shipped bundle outside the one allow-listed pdf.js resource load. Modelled on DocsRight's
   own `frontend/scripts/check-print-isolation.mjs` pattern.
3. **No third-party anything at runtime** - no CDN, no web fonts, no analytics, no error reporting.
   Everything is bundled and served from one origin.

**The pdf.js trap, and the fix.** pdf.js fetches Adobe CMaps (`cMapUrl`) and standard font data
(`standardFontDataUrl`) by default, and `useWorkerFetch` defaults to true when those URLs are
valid. Unconfigured, it makes network requests *while processing the document*. In a network tab
that is indistinguishable from phoning home. **CMaps and standard fonts must be bundled and served
same-origin, or eliminated entirely (Q11).** The pdf.js worker script must also be bundled, never
loaded from a CDN.

**Wording discipline.** The claim we make is exactly: *your document is never transmitted; this
page cannot contact any origin but its own, and no endpoint exists that accepts a document.*
Not "we don't store your files" (a promise about behaviour) - a statement about what is
structurally possible, which the visitor can verify in the network tab in ten seconds.

---

_(Further ADRs appended as stages complete.)_
