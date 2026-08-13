# Internet Object - page concept and content outline

**Status: CONCEPT FOR REVIEW. No implementation.** Nothing in this document has been built.
Written 2026-08-12, after the Foundry P0 register was accepted and its claim corrections landed.

Source of facts: `_ia/foundry-project-register.md` (row 1). Where this concept needs a fact that
P0 did not establish, it says so in **Evidence still to gather** rather than assuming it.

---

## 1. The decisive idea

Every JSON document carries its field names again in every record. That is invisible at three
records and expensive at thirty thousand - on the wire, in a context window, and in the eyes of
whoever has to validate it, because JSON has no opinion about shape at all.

Internet Object moves the shape out of the data and into a header the document declares once.
What follows is records, not repeated keys.

**Page thesis (one sentence):**

> Declare the shape once, then send only data - so the schema becomes the document's contract
> rather than a validation layer bolted on beside it.

That single move is what produces every other property worth putting on the page: smaller
payloads, fewer tokens, validation during the parse rather than after it, and per-record error
isolation. The page should make the reader see the move, then watch its consequences fall out.

## 2. What this page must NOT be

- Not the README. The README teaches the API. This page explains why the format exists, what it
  refuses to do, and what a reader can check.
- Not a compression pitch. "40% smaller" as a headline invites a comparison the format will
  sometimes lose (single records can break even or worse - the current page already says so, and
  that sentence should survive to the rebuild).
- Not "Published". P0 established the correction: spec is a 1.0 working draft, the JS package is
  0.2.1, and only the JavaScript implementation carries a licence.

## 3. Representation strategy

The register's cross-cutting finding applies most sharply here: **our strongest Foundry evidence
is runnable, and `play.internetobject.org` is the best artifact we own.** The current page buries
it under a static screenshot two thirds of the way down.

Proposed order of evidence, per the directive's priority list:

| Rank | Artifact | Use |
|---|---|---|
| 1 | The playground | Hero. The reader transforms real data before reading a paragraph |
| 2 | Real specimen pair | The same dataset as JSON and as IO, with a computed delta |
| 3 | `io-bench` harness | The token/size claims, with corpus and method beside them |
| 4 | Public package + repo | Availability and licence, stated per implementation |
| 5 | Custom diagrams | Only for parse-time validation and per-record isolation |

**Hero concept - "The same data, twice."** A single real dataset shown in both formats side by
side, with the schema header pulled out and highlighted as the thing that replaced the repetition,
and a delta computed from the two specimens rather than typed into the HTML. Beside it, one
control: *open this exact document in the playground*. The reader's first interaction is with the
format, not with our prose.

### The specimen: use the playground's own employee sample (Aamir, 2026-08-12)

The playground's default document is a better hero than the faker user-record corpus, because it
demonstrates something the user records cannot: **a recursive schema**. `$employee` references
itself through `reportingTo?: $employee`, and the document nests real employees inside employees,
with `N` for the one who reports to nobody. A reader who understands that in five seconds
understands that this is a schema language, not a CSV with better manners.

Verified from the screenshot and from the playground's own bundle:

- schema pane **163 B**, document pane **363 B**, JSON output **935 B**, badge **61.18% Smaller
  than minified JSON**;
- the sample round-trips through `internet-object@0.2.1` - I reconstructed it and the document
  measures **363 B exactly**, matching the pane.

**Two measurement caveats we must carry, or we repeat the io-bench mistake one layer up:**

1. **The badge excludes the schema.** The bundle computes it as `100 - ioDocument/jsonOutput*100`
   from the *document editor's* contents; with "Separate Schema" on, the 163 B schema is not in the
   numerator. 1 - 363/935 = 61.18% exactly, which confirms it. Counted honestly for a six-record
   sample, schema included, the same document is **43.74% smaller**. Both numbers are defensible -
   the schema amortises away as records grow - but the page must say which one it is showing.
2. **The JSON side renders dates as full ISO datetimes** (`"2022-01-01T00:00:00.000Z"`) because
   that is the faithful round-trip of IO's `date` type, where a developer would have hand-written
   `"2022-01-01"`. That inflates the JSON baseline. On my reconstruction the effect is worth about
   11% of the JSON side. Direction is certain; the exact in-app figure needs a check with the same
   toggles set.

So the hero shows the specimen and states its terms: *six records, schema counted, uncompressed,
against minified JSON*. A smaller honest number with its method beside it is worth more than 61.18%
with an asterisk, and it is the same standard we just imposed on io-bench.

Two open questions for this hero, both listed in section 8: whether we embed the playground or
deep-link it, and whether the hero shows the 6-record employee sample (clearer) or a larger corpus
(better numbers).

## 4. Section outline

Mapped to the per-project editorial contract. Section numbers are the page's, not the contract's.

### Hero - the specimen pair (contract 4, partly 1)
The transformable specimen described above. Above it, the four-axis status line, because a reader
deciding whether to evaluate a format needs its maturity before its benchmarks.

### 1. Why this exists (contract 1)
The problem, told as history rather than positioning: the project dates to **2018**, before the
LLM era made token cost a budget line. The original motivation was payload and validation; the
token argument arrived later and is a consequence, not the origin. Saying so is more credible
than retrofitting an AI rationale onto a 2018 design.

The "respectful JSON alternative" stance belongs here and should stay: the page credits JSON,
because a format that opens by trashing the incumbent reads as marketing.

### 2. The engineering thesis (contract 2)
One paragraph. The thesis sentence from section 1 above, then the immediate consequence: if the
schema is in the document, validation happens *during* the parse, and a parse either produces
conforming records or tells you which record failed.

### 3. How the document is put together (contract 3)
The system model: header (schema and definitions) then records. Diagram earns its place only if
it shows the parse path - **input -> schema resolution -> per-record validation -> typed records**,
with the failure branch drawn, because the failure branch is the design's whole point.

Reuses P3 component 5 (format explainer) plus a narrow cutaway for the parse pipeline.

### 4. Reading it in code (contract 4)
The API surface, but chosen for what it *demonstrates* rather than as documentation: `parse`,
schema inference via `loadInferred`, definition reuse via `parseDefinitions`, and
`createStreamReader` - streaming being the strongest argument for per-record isolation.

**Blocked:** the local JS checkout is at a 2020 commit while the public repo was pushed
2026-07-14. Per the register, no implementation detail gets quoted until the repo is re-cloned.

### 5. The decisive trade-off (contract 5)
The honest cost of schema-first: the document is no longer self-describing to a naive reader, the
schema and data must travel together or be resolved, and a single record pays the header cost
without amortising it. This is the section that earns the rest of the page.

Candidate for P3 component 9 (decision record) - **only if** the alternatives are documented in
the spec or repo history. If they are not, this stays prose and no alternatives are invented.

### 6. Failure behaviour and known limits (contract 6, 10)
Per-record error recovery is the existing page's best figure and should survive in some form: in
JSON one bad byte fails the payload; in Internet Object each record stands alone.

The known-limits panel, stated calmly:
- specification is a **working draft**, mostly beta, nothing locked as stable;
- JavaScript package is **0.2.1** - the version number is the honest signal;
- **Go and Python implementations carry no licence** and are not maintained in step with the
  JavaScript one;
- single-record documents can break even or lose against JSON;
- adopting the format today means accepting that the format may still change.

### 7. Evidence and reproducibility (contract 7)
P3 component 6 (benchmark widget) plus component 8 (evidence ledger). Every number arrives with
corpus, method and a link to the harness. The two inherited claims - "over 40% smaller" and "~30%
fewer LLM tokens" - are **re-derived from `io-bench` or dropped**; they do not survive on their
current footing (see section 8).

The evidence ledger distinguishes, in one small table: what is public and checkable (playground,
package, repo, harness), what is measured and by what method, and what is not claimed at all
(production deployments - none are verified, and none will be asserted).

### 8. Maturity, availability, adoption (contract 8, 9)
The four axes as separate statements, already corrected in P0 and reused verbatim here:
specification 1.0 working draft (provisional); JS package 0.2.1 pre-1.0; availability public across
spec, source, package, docs and playground; **licence ISC, JavaScript implementation only**;
adoption available for evaluation, not a stable-format commitment.

Adoption guidance in plain terms: evaluate it on a real dataset of yours in the playground; treat
it as evaluable, not settled; do not put a provisional format under a system you cannot migrate.

### 9. What this demonstrates (contract 10)
Per the directive, this must translate capability rather than sell:

> Designing a data format meant resolving schema evolution, per-record failure semantics, streaming
> and human readability against each other, then holding those decisions steady across a
> specification and multiple implementations for seven years. That is the same discipline an
> enterprise system needs when its data contract has to outlive the service that introduced it.

No CTA language in this section. The page's single conversion sits after it, per the Services
conversion rule now enforced by the gate: **zero body estimator links, exactly one `/contact/`**.

## 5. What each visual must do

Directive rule 4: every visual performs explanatory work. Four visuals, no more:

| Visual | Explains | Not a repeat of |
|---|---|---|
| Specimen pair (hero) | The move: shape out of the data, into the header | Any prose - it comes first |
| Parse-path cutaway | That validation happens during parse, with a failure branch | Section 3's text, which describes the parts, not the flow |
| Per-record isolation | Why one bad record does not fail the payload | Section 6's limits list |
| Benchmark strip | The size/token result WITH its corpus and method | Section 7's ledger, which is about claim provenance |

The playground screenshot (`io-playground-2026-08.webp`, refreshed 2026-08-12) is demoted or dropped: a screenshot of an
interactive artifact is strictly worse than the artifact when the artifact is one click away.

## 6. Reuse from the current page

Worth keeping (verified or self-evidently sound):
- the "respectful JSON alternative" framing;
- the per-record error-recovery figure's argument;
- the caveat that single records can break even or worse;
- the 2018 lineage;
- the corrected four-axis status block from P0.

Retired:
- "Published" as a summary label (already corrected);
- the static playground screenshot as primary evidence;
- both headline numbers, until re-derived.

## 7. Acceptance-gate check

Against the directive's page gate, as currently planned:

| Gate item | Position |
|---|---|
| Register row complete | Yes - row 1 |
| Claims traceable | Yes, once the two numbers are re-derived |
| Copy materially exceeds current page | Yes - thesis, trade-off and limits sections are new |
| Strongest artifact above first long prose | Yes - the specimen pair is the hero |
| Project-appropriate representation | Yes - format explainer, not a generic diagram |
| Screenshots legible and captioned | N/A if the screenshot is dropped |
| Four axes separate | Yes |
| Known limits stated | Yes - section 6 |
| Public/private boundary correct | Yes - per-implementation licensing |
| Responsive 375 / 768 / 1280x720 | To verify at build |
| Rail useful, 0 estimator, 1 contact | To verify at build |
| Fragments and artifacts resolve | To verify at build |
| Site gate green | To verify at build |

## 8. Evidence still to gather (blocks the build, not this review)

1. **Re-clone `InternetObject-js`.** The local checkout is ~6 years behind the public repo. No API
   or implementation detail may be quoted until this is done.
2. **Re-derive both headline numbers from `io-bench`,** recording corpus, record count, tokenizer
   and method - or drop them. The token figure in particular needs the tokenizer named, since
   "~30% fewer tokens" is meaningless without one.
3. **Read the specification for documented non-goals.** Section 5's trade-off is only allowed to
   name rejected alternatives if the spec or repo history documents them. Otherwise it stays as
   accepted costs, with no invented alternatives.
4. **Confirm the playground deep-links.** The hero's "open this document in the playground" control
   depends on the playground accepting a document via URL. If it does not, the hero becomes a
   static specimen pair plus a plain playground link.
5. **Decide the specimen dataset.** It must be real, multi-record, non-confidential and boring
   enough to be obviously honest.

## 9. Decisions I need from you

1. **Embed or link the playground?** Embedding puts a live artifact in the hero but adds a
   cross-origin iframe and a heavier page; linking is lighter and safer but costs the immediacy.
   My recommendation: **static specimen pair in the hero with a computed delta, plus a prominent
   deep link** - the reader still sees real data first, and the page stays self-contained.
2. **Do the two headline numbers survive?** I recommend re-deriving the size number (cheap,
   reproducible from `io-bench`) and **dropping the token number** unless we are prepared to name a
   tokenizer and pin a version, because it will silently rot as models change.
3. **How prominent should the Go and Python implementations be?** They are public, unlicensed and
   effectively unmaintained. Options: state them in the limits panel only (my recommendation),
   or give them a row in the evidence ledger with an explicit "not maintained in step" label.
4. **Is "seven years" usable** in section 9, or would you rather the page not date the project at
   all?
