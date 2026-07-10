# Standards & Languages — Draft v2 (the depth page, done honestly, 2026-06)

> ★ AUDIENCE EXCEPTION (per PRESENTATION-DOCTRINE.md §"Know your audience"): this is a
> **depth-first** page for engineers, architects, and the curious — they *want* the standards and
> the language up front, so here the "we make technology" story is the magnet, not the poison. But
> every honesty rule still binds (Governing Rule #1): each item gets a **true, sourced, calibrated
> status label**; we call these **"standards we've authored"** at varying maturity — **never
> "industry standards"**; every claim is **verifiable** (spec, playground, or repo you can read and
> run); pre-1.0 work is framed as **patient maturation**, not as finished product. No headlined star
> counts, no invented numbers, no "stable/production-proven at scale" where it isn't true. The page
> closes by connecting all this depth back to the one thing a client cares about: **the rigor your
> project inherits.** Each `[note]` = placeholder / verify / rationale.

> ★ v2 — SKEPTIC PASS APPLIED. This audience is the one that *will* click, clone, and run benchstat.
> So: (1) the verify-it-yourself promise is now **scoped to what's actually clickable today** — the
> page visibly partitions **Open now** vs **Maturing in the open**, and never promises "browse the
> public repositories" while most are dark; (2) the only superlatives left are ones the reader can
> check on their own machine; (3) the IO "2018" claim is now **anchored to the public first commit**
> (verifiable in `git log`), not asserted as a round "eight years"; (4) banned jargon ("expert-quality
> Go") is gone; (5) the FUSE comparison table and the non-goals are **linked/shown**, not described
> second-hand.

---

## 1 · HERO  *(depth-first — for this audience, lead with the maker story)*

# Most software teams use technology. We also make it.

Over the years we've built and published our own foundations — a programming language, and a set of
data, time, expression, and API standards we've authored. **Some are live and runnable today; the
rest are research and reference implementations we're maturing in the open.** What's public, you can
**read and run right now**; what's still maturing, here's the **spec to critique** — and none of it
is something we'd ever make you adopt.

> This is the work behind the work. It's *why* our client engineering runs deep. Below, each item
> tells you exactly what you can click today and what's still coming.

`[Depth-first hero is CORRECT here (engineer/peer audience). The "we make technology, not just use
it" line — kept out of the home/about front door — is the magnet on THIS page. v2 fix (HIGH): the
old hero promised "yours to read, run, and check, line by line" as a blanket claim, but ~4 of 6
projects have no live link today. Reworded to the doctrine's own honest split: "what's public you can
read and run today; what's maturing, here's the spec to critique." No blanket "browse the public
repositories." No star counts, no superlatives.]`

---

## 2 · HONEST STATUS, UP FRONT  *(calibration before claims — builds trust with engineers)*

### What's open now, what's maturing, and how to read these labels.

We'd rather you know exactly where each project stands — and exactly what you can click — than have
you discover it later. So every item on this page carries a plain status label, and the page is split
into two halves: **what you can open and run today**, and **what's maturing in the open** (spec to
read, no public code yet).

**Open now — read, run, or clone today:**

- **Published** — public, documented, and usable today, with a live link below.

**Maturing in the open — spec to read; public code not live yet:**

- **Publish-ready** — implementation complete; we're packaging the public release (license, API
  freeze, first tag). No public link yet.
- **Research / Draft** — the specification exists and is maturing; we invite review. Some have a live
  reference implementation; some are spec-only so far. Each card says which.
- **Design phase** — the idea is specified; the reference implementation is still being built.
- **Internal** — we use it in our own production; the spec is written, the public library isn't
  released yet.

None of these are "industry standards" handed down by a committee. They are **standards we've
authored** — some young, some further along — and we label them honestly so you can judge for
yourself. **Where a link is dark, it's dark on purpose:** we won't point you at a "coming soon" page
and call that verifiable.

`[★ This section IS the honesty gate, made visible. v2 fix (HIGH, the #1 problem): the page's whole
trust strategy is verify-it-yourself, but only IO (live playground) and NITES/GoTime are clickable
today; UExL, AddressQL, FUSE, and Indigo's repo are dark. So §2 now explicitly PARTITIONS the page into
"Open now" vs "Maturing in the open," and states plainly that dark links are dark on purpose. The
promise now matches what's clickable. Directly enforces: "call them standards we've authored at
varying maturity, NOT industry standards; honest per-item labels."]`

---

## 3 · THE FLAGSHIP — INDIGO  *(the language; the deepest expression of "we make it")*

### Indigo — a Go superset whose output is plain, idiomatic Go you read in the diff.

**Status: Maturing in the open · pre-1.0 · active development** `[verify: is the repo public at
launch, or internal-first? The verify-link below is non-negotiable — Aamir]`

Indigo is to Go what TypeScript is to JavaScript: a **superset** that adds a few carefully chosen
ergonomics — and compiles your `.indigo` files down to clean, idiomatic `.go`. **You don't take that
on faith: the generated `.go` is right there in the diff — read it, diff it, ship it (or throw Indigo
away and keep the Go).**

It removes the friction every Go developer feels daily — error-handling boilerplate, no ternary, no
map/filter, verbose nil checks — without changing what Go *is*:

- **Every valid Go file is already valid Indigo.** Adoption is zero-friction; you opt in feature by feature.
- **The output is plain Go.** It works with your existing toolchain, linters, and editors unchanged.
- **No runtime. No lock-in.** Nothing is injected into your code. Stop using Indigo any time and keep
  the generated Go forever.

A few of the ergonomics it adds — and exactly what each compiles down to (this table *is* the proof —
the right column is the Go you'd read in the output):

| In Indigo | Compiles to |
|---|---|
| `data := load(path)!` + a function-scoped `catch` | idiomatic `if err != nil { return … }` |
| `users \|filter: $.Active \|map: $.Name` | a single fused `for` loop |
| `ok ? "ready" : "pending"` | a safe if/else expression |
| `input ?? "guest"` · `user?.Address?.City` | explicit, nil-guarded checks |

**The engineering principle behind it: "no output is better than wrong output."** Indigo refuses to
write a `.go` file it can't stand behind. It preserves Go's exact semantics — side effects,
short-circuiting, panic timing, defer ordering, package-init order — and if a feature can't preserve
them for some construct, that feature is **rejected, not faked**. The behavior is pinned down in
normative, RFC-grade specifications; errors carry stable codes (`indigo explain IND-PIPE-007`); and
there's real tooling alongside it — an LSP, a VS Code extension, source maps, and an MCP server that
exposes the compiler to AI tools. **(When the repo is public, every one of those is one click below —
until then, treat this list as a claim we're about to let you check, not one we expect you to take on
trust.)**

**Why it's still pre-1.0, and why that's the point.** A language that rewrites your code has to be
*right* before it's fast to ship. We're maturing Indigo patiently — specs first, conformance second,
release third — which is exactly why "pre-1.0" here should read as *serious*, not *unfinished*. When
we ship, the spec version history and conformance suite ship with it, so "patient" is something you
can read, not just a word on a page.

**[ Read a sample of the generated Go → ]**   ·   **[ Repo + tooling — link goes live at launch ]**

`[verify: License on release (frontend is BSD-3 from the Go stdlib; overall TBC). OK to lead with
"TypeScript for Go"? Is a WASM playground / a public "before-and-after .go sample" page planned? — all
open Qs for Aamir.]`
`[v2 fixes: (MED) removed banned jargon — "compiles to expert-quality Go" and "reads as if a senior Go
engineer hand-wrote it" are both gone (Doctrine explicitly bans "expert-quality Go"). Replaced with a
CHECKABLE framing: read the generated .go in the diff yourself; the compile-to table is reframed as
the proof. (skeptic, repo) The four-item tooling list now explicitly flags itself as "a claim we're
about to let you check" while the repo is dark, and the verify-link is marked non-negotiable. Added a
"the spec version history ships with it" line so "patient maturation" is demonstrable, not just
asserted. The before/after sample CTA is a PLACEHOLDER — needs Aamir to confirm a public sample page.]`

---

## 4 · THE STANDARDS WE'VE AUTHORED  *(several original specifications, honestly labeled)*

### Beyond the language, we've authored standards for the layers most teams just consume.

Data. Time. Expressions. The API itself. These are the foundations software is built *on* — and over
the years we've designed our own, each as an open specification with a reference implementation. **One
of them you can run in your browser right now (Internet Object); one ships today as a Go library
(NITES via GoTime). The rest are spec-to-read, code-still-maturing — and each card tells you which.**
Here's where each one stands, told straight.

---

#### Internet Object — a schema-first, human-readable data format

**Status: OPEN NOW · Published · spec 1.0 Draft (beta) · live playground + two reference parsers**

A compact, schema-first alternative to JSON, designed from a clean slate for the web and AI era
rather than retrofitted from JavaScript notation. It separates schema from data so keys aren't
repeated on every record — **over 40% smaller than minified JSON** in the live playground (up to
~60% on nested data, and the IO side isn't even compressed), and in the LLM era, **~30% fewer tokens**
([reproduce the benchmark](https://github.com/maniartech/InternetObject-vs-JSON-benchmark), GPT-4 tokenizer).
It's a **respectful** JSON alternative: it credits JSON rather than trashing it.

- **You can try it right now.** A live, in-browser playground lets you write Internet Object, watch it
  validate against a schema in real time, and compare the output against JSON.
- Reference parsers in **JavaScript/TypeScript** and **Python** are live today; Rust, Go, C#, and Dart
  parsers are on the roadmap.
- We use it internally — honest dogfooding, not a slide-deck format.

**Honest status:** the spec is a 1.0 *Draft* (work in progress); most features are marked beta, a few
experimental; nothing is locked as "stable" yet. It's **not a weekend toy: the JavaScript reference
implementation's first public commit dates to December 2018** — you can read the full history in
`git log` on the public repo. (That's the verifiable maturity signal; we're not rounding it into a
slogan.)

**[ Open the playground → ]**   ·   **[ Read the spec → ]**   ·   **[ See the commit history (Dec 2018 →) → ]**

`[verify: omit version number on the page for now (package.json 0.2.1 vs CHANGELOG 1.0.0-beta.1 —
Aamir reviewing versioning). Playground is genuinely live: play.internetobject.org.
v2 fix (HIGH): the old "research dates to 2018 — roughly eight years of patient work, not a weekend
toy" was flagged as unsourced. It is, in fact, VERIFIABLE: the public InternetObject-js repo's first
commit is 2018-12-04 (confirmed via git log; remote github.com/maniartech/InternetObject-js). So the
fix is NOT to cut the date — it's to ANCHOR it to the checkable artifact (first public commit + a link
to the commit history) and drop the rounded, unfalsifiable "roughly eight years of patient work"
rhetoric. A peer who clones now SEES the 2018 history. "Respectful JSON alternative" stance preserved.
Payload/token figures CONFIRMED 2026-06 and now quoted, calibrated to the verifiable range: bytes
**40–60% smaller than minified JSON** are reproducible live on play.internetobject.org (real parser,
IO uncompressed); the **~30% fewer tokens** figure is from the io-bench GPT-4/cl100k_base benchmark
(27–30% on multi-record data; single records can be larger — breakeven ~3–5 records). Both figures are
now one-click verifiable: bytes on the playground, tokens via the public io-bench repo
(github.com/maniartech/InternetObject-vs-JSON-benchmark).]`

---

#### UExL — the regex of expression evaluation

**Status: Public (pre-1.0) · implementation complete · `v0.1.0` tag + license being finalized · runnable benchmark live now**

An embeddable, language-independent expression engine — the way regex became the universal standard
for text patterns, UExL aims to be a universal standard for evaluating expressions. It turns runtime
strings (in config files, database rows, or user-authored rule editors) into evaluated results, with
the same semantics everywhere it's embedded. It's a real **parser → compiler → VM**, not a
tree-walking toy.

- **Reproducible benchmarks you can run yourself.** Head-to-head against **cel-go** and **expr** on
  the same hardware, UExL is the **only one with zero allocations** on the boolean/comparison and
  string-matching paths, and the fastest across the scenarios we measured (string match ~108 ns vs
  ~325/348 ns; a map over 100 items ~11,400 ns vs ~15,150 / ~63,500). **Timings vary run-to-run; the
  allocation counts are exact and stable** — UExL's most durable advantage, and the claim your own run
  will confirm. The `benchmarks/` and `vm/` directories ship in the repo, so the strong claim is the
  one *your* run makes, not ours. **[Reproduce it →](https://github.com/maniartech/uexl-go#performance)**
- **Explicit semantics, no silent surprises:** nullish fallback that preserves `0`/`""`/`false`,
  optional chaining that returns null instead of panicking, Excel-familiar syntax for non-engineers.
- **Safe by construction:** errors, never panics; immutable, goroutine-safe compiled expressions.

**Honest status:** the language and Go implementation are complete and **the repo is public now**;
what remains is release packaging (license finalization, public API freeze, the `v0.1.0` tag) — so we
label it **pre-1.0**, and the interactive playground follows with the release. The version label at launch
(`v0.1.0`) is itself an honest signal: a pre-1.0 API that may still change. `[verify: target tag/date
for v0.1.0, to give this an imminence signal a peer can hold us to — Aamir]`

**[ View the repo + run the benchmark → ](https://github.com/maniartech/uexl-go)**   ·   **[ Try it in the playground → ]**
`[PLACEHOLDER — UExL playground URL: launching soon, domain TBD (Aamir). Reserve this CTA now; wire the
href the moment the domain is live. Do NOT ship a link that 404s — a dead "try it" button backfires
(cf. the stale comparison-repo README).]`

`[Aamir confirmed 2026-06: PUBLISH the benchmark + link uexl-go (public). uexl-playground is not live yet (private/404); Aamir wants the
playground CTA FEATURED now (2026-06, "link playground also, domain later") → RESERVE the "Try it in
the playground" CTA with a PLACEHOLDER href and wire it when the domain is live; do NOT ship a live
link until then. License being finalized (MIT likely),
no v0.1.0 tag yet → keep the pre-1.0 label honest. Benchmark numbers sourced to the authoritative
uexl-go README Performance section (post zero-alloc Value migration). ⚠️ The separate comparison repo
golang-expression-evaluation-comparison has a STALE README showing UExL slowest 9388 ns/op pre-opt —
do NOT link THAT repo until its README is refreshed; link uexl-go. Lead with the EXACT alloc claim
(stable) over raw timings (vary). v2 fixes: (MED) downgraded the universal-quantifier superlative — "the standout,
rock-solid claim is the fewest allocations in EVERY scenario tested" → "the most consistent result was
the fewest allocations in the scenarios we measured," and explicitly deferred any "every scenario"
boldness to the reproducible public run. Claim-strength now matches proof-availability for a
benchmark-literate audience. (LOW) softened "finished and in our release queue" → "implementation
complete, packaging in progress," and added a PLACEHOLDER for a dated v0.1.0 milestone so "imminent"
is checkable, not just asserted. Spec is written AFTER the Go impl finalizes (reverse process) — so
"standard" here = authored-standard-in-formation.]`

---

#### NITES — one intuitive time format for every language

**Status: OPEN NOW (via GoTime) · Research / Draft · spec v1.0 (finalizing) · live reference implementation**

Natural and Intuitive Time Expression Syntax: one human-readable, case-insensitive set of date/time
format specifiers to replace the fragmented mess of `strftime`, Go's `2006-01-02` reference date, and
the case-sensitive `yyyy`/`MM` conventions that differ language to language. Single character means no
padding, doubled means zero-padded; minutes are `i`/`ii`, not `m` — which quietly removes the classic
month-vs-minute bug. Named layouts (`iso`, `rfc`, `sql`) replace cryptic format strings.

- **It already ships in real code.** NITES is the specification; **GoTime**, our published Go library,
  is its reference implementation — so this is a standard that runs today, not vaporware. (This is the
  one card in this section besides Internet Object with a *live* artifact to click.)
- Aspiration stated honestly: we'd like NITES to become a cross-language standard. Today it's a v1.0
  draft, finalizing, with one reference implementation.

**[ Read the spec → ]**   ·   **[ See GoTime (live Go library) → ]**

`[verify: repo remote is currently named "idsf-specs" — confirm canonical name/repo before linking.
Ambition ("universal standard") explicitly paired with current state (v1.0 draft, one impl) per
dossier — ambition + proof, no overclaim. Status now tagged "OPEN NOW (via GoTime)" so it sits clearly
on the clickable side of the partition.]`

---

#### FUSE — REST that's live by default

**Status: Maturing in the open · Research / Design phase · spec maturing · reference implementation in progress**

Fast Unified Server Exchange: an open protocol that unifies REST, realtime push, and reactive (live)
queries on one server, one route table, one handler — no message broker, no WebSocket fleet, no second
tech stack. A read handler marked live stays live: the protocol captures what data the handler read,
watches for changes, and re-pushes the new result automatically — no developer-written pub/sub or
cache invalidation. (FUSE is the protocol; **FuseAPI** is the Go reference implementation of it.)

What makes the FUSE specs worth reading is their **intellectual honesty**, which we consider a feature,
not a disclaimer — and you don't have to take our word, because the two assets below are in the spec
itself:

- **Explicit non-goals (read them in the spec).** FUSE is *not* for durable/exactly-once delivery,
  *not* a gRPC or Kafka replacement, *not* multi-node guaranteed fan-out. "A framework that claims it's
  best for everything invites rejection."
- **An honest comparison table you can read in the spec** that names the alternatives — gRPC,
  Socket.IO, Mercure, Convex — and concedes where each of them wins. This is the asset we'd most want a
  skeptic to open first, so we link straight to it rather than describe it.

  > *(Excerpt — the full table, with the "where it wins" column, is in the linked spec.)*
  >
  > | vs. | They win when… | FUSE fits when… |
  > |---|---|---|
  > | **gRPC** | you need strict contracts / cross-language RPC at scale | one server, REST + live, no second stack |
  > | **Socket.IO** | you want a mature, battle-tested socket layer | you don't want to hand-write pub/sub or invalidation |
  > | **Mercure** | you want a standalone SSE hub decoupled from your API | reactivity should live *in* the handler |
  > | **Convex** | you'll adopt a full managed backend platform | you keep your own DB/stack and add reactivity |
  >
  > `[PLACEHOLDER — needs Aamir: this excerpt is a faithful paraphrase of the comparison table's SHAPE
  > from the FUSE specs, NOT a verbatim copy. Confirm the exact "where each wins" wording before
  > publishing, OR replace this excerpt with a direct deep-link to the table in the spec. Do not ship
  > the excerpt as if it were the canonical text until Aamir signs off.]`

**Honest status:** this is design-phase research. The wire protocol is **not frozen**; a
proof-of-concept comes first (proving automatic reactivity over stock Postgres against a "no-stale"
invariant) before the spec is finalized or more languages are added. We're publishing the research now
and building the framework as time allows — so this is a spec to read and critique, not yet a library
to build on.

**[ Read the non-goals + comparison table → ]**   ·   **[ For implementers & reviewers → ]**

`[verify: publish venue/domain for the research (fuse.dev / fuseapi.dev?). v2 fix (MED): the
comparison table and non-goals were previously DESCRIBED only; this audience finds telling-not-showing
weaker than showing. Now the page (a) links straight to the table/non-goals as the primary CTA, and
(b) includes a short EXCERPT — explicitly flagged as a paraphrase needing Aamir's sign-off, NOT
fabricated as canonical text. NO "go build with it" CTA — no shipping impl yet. Spec license
CC-BY-ND-4.0, impl Apache-2.0.]`

---

#### AddressQL — SQL-like power you can paste into a URL

**Status: Maturing in the open · Internal (used in our own production) · spec v1 · library pre-public**

URL-native query language: a URL-native, backend-neutral query language. Express filtering, projection,
sorting, and pagination as a single readable, cacheable query string — SQL-like power you can paste
into a browser address bar. Because the canonical form is deterministic, identical intent produces an
identical URL and therefore an identical cache key, so CDN caching and URL signing work without any
client-side normalization. The same query string runs against MongoDB today and SQL tomorrow.

- **Used where it counts: in our own production.** The concrete use is the proof — we send AddressQL queries
  straight from the browser to our APIs, which run them as SQL-like queries over MongoDB in production.
  `[verify OK to state "used internally in production over MongoDB" — Aamir]`
- **Honest non-goals, again:** read-only (no mutations), no auth (the server injects scope), no
  non-deterministic functions like `now`/`random` that would break caches. The same "here's what we
  deliberately don't do" discipline as FUSE.
- Designed as a cross-language standard from day one — portability specs for Go, JavaScript, and Rust
  are already written, alongside a full "Mastering AddressQL" reference.

**Honest status:** internal and used in our own production; the specification is v1; the Go reference
library is pre-public. No install or repo links here until it's released.

**[ Coming soon — the research publishes first, the library follows ]**

`[verify: confirm "used internally in production over MongoDB" wording is OK; license TBC; which
adaptors to name publicly (MongoDB complete, SQL in-repo). v2 fix (LOW): cut "and it just works" — a
breezy, unverifiable adjective on the one fully-dark project that risks triggering re-scrutiny of the
rest. Replaced with the CONCRETE internal use as the proof (browser → API, SQL-like over MongoDB in
production), kept the honest "Internal" label. NO repo/install links until public.]`

---

## 5 · WHY THIS IS HERE  *(connect the depth back to the client — the closer)*

### This is the rigor your project inherits.

You'll likely never write a line of Indigo or send a single Internet Object document. That's fine —
**we don't make you adopt any of this.** Your project is built on mainstream, hireable technology you
(or any team) can maintain.

So why does it matter that we author standards and build a language? Because it's the same engineering
discipline, pointed at your problem:

- The team that insists **"no output is better than wrong output"** in a compiler brings that same
  refusal-to-fake-it to your codebase.
- The team that ships a **runnable benchmark** and says *"don't take our word, run it yourself"* gives
  you software whose claims you can check.
- The team that writes **explicit non-goals** before features — that names what it *won't* do — is the
  team that will tell you, honestly, when something shouldn't be built.

That's the difference between a team that *uses* technology and one that can *build* it when your
problem needs more than off-the-shelf. And we hold ourselves to the same standard on this very page:
**what's public, you can read and run today** — open the Internet Object playground, clone the
JavaScript parser and read its history back to 2018, pull GoTime and run NITES. **What's still
maturing, we're not asking you to trust on faith — we're handing you the spec to critique, and we'll
light up each repo and benchmark as it actually ships.** Verifiable doesn't mean "everything's
clickable today"; it means **we only claim what you can check, and we tell you plainly which is which.**

`[★ THE CLOSER per brief: "connect depth → the rigor your project inherits." Reframed the three ways
the doctrine demands: BENEFIT to them (same rigor on their code), NO LOCK-IN ("we don't make you adopt
any of this; mainstream hireable tech"), and VERIFIABLE. v2 fix (HIGH): the old closer promised "you
can verify all of it yourself — read the specs, run the playgrounds, browse the public repositories,"
which is undeliverable today for ~4 of 6 projects and would invert into a credibility hit. Rewritten to
scope the promise precisely: names the THREE things actually clickable now (IO playground, IO JS repo
+ 2018 history, GoTime/NITES), frames the rest as "spec to critique, repos light up as they ship," and
redefines "verifiable" honestly as "we only claim what you can check, and we tell you which is which."]`

---

## 6 · CTA

### Want that rigor on your project?

The fastest way to see how we think is a free, no-obligation estimate — or just talk to a person.

**[ Get a free project estimate → ]**   ·   [ Talk to a human ]

---

## Notes on this draft
- **Depth-first by design** — the audience exception applies (engineers/architects/peers want the
  standards up front). The "we make technology" line, kept out of the home/about front door, is the
  hero here.
- **Per-item honest labels** on every project, now tagged **Open now** vs **Maturing in the open** so
  the page's clickability matches its promise (§2), reinforced in each card.
- **"Standards we've authored," never "industry standards"** — stated explicitly in §2 and threaded
  throughout.
- **Verifiability scoped to what's live** — the hero (§1) and closer (§5) no longer make a blanket
  "browse the public repositories" promise; they name the three currently-clickable artifacts (IO
  playground, IO JS repo + 2018 commit history, GoTime/NITES) and frame the rest as "spec to critique,
  repos light up at ship." No headlined star counts; no invented numbers; no "stable/production-proven
  at scale" where untrue.
- **Two specific flagged claims resolved:** IO "2018" is now anchored to the verifiable first public
  commit (Dec 2018, readable in `git log`) instead of the rounded "eight years"; Indigo's banned
  "expert-quality Go / senior engineer" superlative is replaced with "read the generated .go in the
  diff yourself."
- **Superlatives downgraded to checkable form** — UExL's "fewest allocations in EVERY scenario" →
  "fewest in the scenarios we measured," with the bold claim deferred to the reader's own benchstat run.
- **Strongest assets shown, not just told** — FUSE's comparison table and non-goals are now linked as
  the primary CTA, with a paraphrased excerpt explicitly flagged for Aamir's sign-off.
- **Pre-1.0 framed as patient maturation** — explicitly for Indigo ("why pre-1.0 is the point," + "spec
  history ships with it") and in the FUSE/UExL/AddressQL status paragraphs.
- **Closer (§5) connects depth → client benefit + no-lock-in + honestly-scoped verifiable**, then a
  low-risk CTA.

### Placeholders left for Aamir / verify
- **Indigo:** public-vs-internal at launch (verify-link non-negotiable); overall license; OK to lead
  with "TypeScript for Go"; is a public before/after `.go` sample page + WASM playground planned (the
  "Read a sample of the generated Go" CTA depends on it).
- **Internet Object:** omit version number for now; payload/token figures CONFIRMED (2026-06) and now
  quoted as a calibrated range (bytes 40–60% smaller than minified JSON, reproducible live; ~30% fewer
  tokens via the io-bench GPT-4 tokenizer); Python parser maturity wording. (2018 date is sourced to
  the public first commit — confirmed via git log.)
- **UExL:** NOT public yet — keep all repo/playground/benchmark links dark until release; license (MIT?);
  exact benchmark numbers gated on public release + benchstat; **a dated `v0.1.0` milestone** to give
  the "publish-ready" status a checkable imminence signal; confirm naming expr/cel-go on publication.
- **NITES:** confirm canonical repo/name (currently "idsf-specs"); finalization ETA / draft-RFC framing.
- **FUSE:** publish venue/domain; **confirm the exact comparison-table "where each wins" wording** (the
  excerpt on the page is a paraphrase pending sign-off) OR replace the excerpt with a direct deep-link;
  confirm CC-BY-ND-4.0 / Apache-2.0 split presentation.
- **AddressQL:** confirm "used internally in production over MongoDB" wording is OK; license; which adaptors to
  name; lib release timing.
- **All:** final link targets/URLs for every "Read the spec / Open the playground / Repo" CTA — and the
  page must not go live with the "Open now" CTAs (IO playground, IO repo, GoTime) pointing anywhere that
  isn't actually live, since the whole v2 fix rests on those three being clickable.
