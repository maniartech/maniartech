# io-bench audit - `InternetObject-vs-JSON-benchmark`

**Report only. Nothing was modified** - not the website, not the harness. 2026-08-12.

Harness under audit: `E:/Projects/internet-object/io-bench`
(published as `github.com/maniartech/internet-object-vs-json-benchmark`, ISC).

**Method.** The official implementation was installed from npm (`internet-object@0.2.1`) into a
scratch directory and used as the oracle: every specimen below was parsed with it, and every
number was recomputed independently of the harness. Tokenizer: `cl100k_base` via `js-tiktoken`.

---

## Headline

The harness is **not measuring Internet Object**. It measures a hand-written approximation of it,
produced by string concatenation in `src/formatters.js`, and never parsed back. That approximation
is close - but it is wrong in two ways that both flatter the result, and the committed specimen is
not a valid document.

The substantive claims nevertheless survive correction. On the committed 50-record corpus:

| Measurement | Value | Note |
|---|---|---|
| What the harness reports | **49.2% smaller** | byte formula omits `~ ` and newlines |
| Same corpus as a real document | **47.6% smaller** | the separators counted |
| With escaping corrected (valid IO) | **47.5% smaller, 27.2% fewer tokens** | parses 50/50 |

So the size figure is overstated by about 1.6 points; the token figure (~27%) stands. The
corrected escaping costs only 10 bytes and 3 tokens across 50 records - **the fix is nearly free,
and the claim is real.**

---

## 1. Can the official implementation generate and parse every specimen?

**Parse: yes. Generate: yes, but not the way the harness would need.** Neither is currently used.

- `io.parse()` reads the committed `data/data.io` - **but recovers only 24 of its 50 records.**
  Root cause below.
- Generation exists as `io.stringifyDocument(doc)`, which emits a full document
  (`"name, age\n---\n~ Alice, 30\n~ Bob, 25"`). But `io.stringify(plainArray)` returns **JSON**, not
  Internet Object. Generating IO therefore requires building an `IODocument` first; you cannot hand
  the API plain JS records and get IO text back.
- **Blocker for automation:** `internet-object@0.2.1` **does not load in Node at all**. Its `dist`
  contains ~400 extensionless relative imports (`from "./definitions"`), which Node's ESM resolver
  rejects; the CJS entry chains into the same graph. It loads only through a bundler - verified
  working via esbuild. This is a packaging defect, not a code defect, and it is why a browser
  playground works while `node -e "require('internet-object')"` fails.

### The escaping defect (the important one)

`escapeString()` quotes on comma, double-quote, newline and surrounding whitespace. It does **not**
quote the **apostrophe**, which Internet Object uses as a string delimiter (the harness relies on
it itself, for `d'2023-06-02'`). Five of the fifty committed records contain one:

```
~ Deanna D'Amore, 46, m, d'2023-08-25', {41713 Church Lane, Broomfield, IL}, ...
~ Pamela Kautzer, 44, m, d'2021-01-02', {1134 Kelley Glen, O'Keefeside, TX}, ...
```

Each opens an unterminated string and corrupts the parse from that point on. Parsed individually,
all 50 records are valid; parsed as one document, 24 survive and `InternetObject(SyntaxError)`
appears among the values.

The measured advantage is therefore partly obtained by emitting text that is **shorter because it
is invalid**. Colours are also emitted unescaped while names and streets are escaped - the same
class of bug waiting for a value with a comma in it.

### The separator asymmetry

In `src/benchmark.js` the two metrics measure two different documents:

- **bytes**: `ioRecords.reduce(len)` + header + 5 - the `~ ` prefixes and newlines are never counted
- **tokens**: `ioHeader + "\n---\n" + records.map(r => "~ " + r).join("\n")` - they are counted

JSON is measured as a whole document in both. Roughly 3 characters per record go missing from the
IO side of the byte comparison only.

## 2. Can randomness be replaced with committed deterministic datasets?

**Yes, and it should be.** Two sources of nondeterminism, both trivial to remove:

- `@faker-js/faker` is never seeded - add `faker.seed(N)`.
- `generators.js` uses bare `Math.random() > 0.1` for the optional `state` field - replace with a
  seeded PRNG so the sparse pattern is fixed too.

Better still: stop generating at report time. Commit the corpora as fixtures and have the harness
read them, so a number quoted on the website can be reproduced byte-for-byte years later. The
generator becomes a separate, explicitly-run tool that regenerates fixtures on demand.

This removes the "approximately +/-5% variation" caveat entirely. That variation is not a property
of the format - it is an artefact of re-rolling the corpus on every run.

## 3. Which datasets should represent small, medium, nested, sparse and adverse cases?

Measured, with corrected escaping, all parsing cleanly through the official implementation:

| Set | Shape | n=1 | n=100 |
|---|---|---|---|
| **A. user record** | the current corpus shape | 7.2% bytes / **-9.3%** tokens | 48.9% / 30.4% |
| **B. wide flat** | 20 short scalar fields | **0.0%** / **-18.6%** | 67.9% / 38.4% |
| **C. text-dominant** | id + a paragraph of prose | 0.0% / **-0.9%** | **2.4% / 1.9%** |
| **D. sparse** | 10 optional fields, mostly null | 14.4% / **0.0%** | **71.4% / 55.0%** |
| **E. nested** | three levels deep | 9.3% / **-14.8%** | 56.4% / 39.4% |
| **F. adverse** | apostrophes, commas, braces in values | **0.0%** / **-6.1%** | 24.5% / 6.5% |

Recommended committed set: **A** (the honest default), **C** (the case that nearly ties), **D**
(the best case), **F** (the case that hurts), plus **A at n=1** as the standing counter-example.
B and E are optional; they mostly restate A more dramatically.

**F must be in the set.** It is the only one that exercises the escaping path that is currently
broken, and it would have failed loudly on day one.

## 4. Where does JSON win or break even?

Clearly, and the page should say so:

- **Single records.** At n=1 JSON wins on **tokens** in four of six shapes (up to -18.6%), because
  the schema header is paid in full and amortised over nothing. Break-even on tokens arrives
  between n=1 and n=2 for the user-record shape.
- **Text-dominant payloads.** When the bytes are prose rather than keys, there is almost nothing to
  elide: **2.4% bytes / 1.9% tokens even at n=100**. Effectively a tie.
- **Values that force quoting.** Apostrophes, commas and structural characters push the advantage
  from ~49% down to **24.5% bytes / 6.5% tokens**.
- **Anything a compressor already handles.** Not measured here, and it should be: gzip removes much
  of JSON's key repetition. **Every claim in this harness is uncompressed**, which the website must
  state, because most APIs ship compressed. This is the largest untested threat to the claim.

## 5. Is `cl100k_base` explicitly pinned and reproducible?

**Partly. Named, not pinned.**

- The encoding name is explicit in code (`getEncoding('cl100k_base')`) - good.
- `js-tiktoken` is a caret range (`^1.0.15`) - the dependency can move under the result.
- No model-to-encoding mapping is documented. `cl100k_base` is the GPT-4 / GPT-3.5-turbo encoding;
  current OpenAI models use `o200k_base`, which will produce different numbers.
- No BPE-table checksum is asserted, so a silent upstream change would not be detected.

**Any token claim must name the tokenizer, the library version, and the fact that a different model
family will give a different number.** That is why my recommendation on the page concept was to
drop the token headline unless we are willing to carry that qualification - this audit strengthens
it rather than changing it.

## 6. Which claims survive across all datasets?

**Survives everywhere (structural, not empirical):**

- The schema is declared once instead of per record; key repetition is eliminated by construction.
- Per-record framing lets a parser isolate a bad record.
- **Advantage grows with record count and with field count.**

**Survives on the user-record corpus only, and must be scoped to it:**

- "~47-48% smaller" and "~27% fewer tokens" are properties of *that corpus at 50-100 records*,
  uncompressed, under `cl100k_base`. The current site's ">40% smaller" happens to be defensible
  across A, B, D and E at n=100 - but it is false for C (2.4%) and for every shape at n=1.

**Does not survive and must not be claimed:**

- Any single headline percentage without record count, shape and tokenizer beside it.
- Any advantage at n=1.
- Any advantage on text-dominant payloads.
- Anything about compressed transport - untested.

## 7. Live API-cost claims

**Agreed - remove from the website plan.** `benchmark.js` hardcodes `tokens / 1000 * 0.03`, which
is GPT-4 8K prompt pricing from 2023. It is already wrong, and it will be wrong again.

The page concept did not carry a cost claim, and it will not gain one. In the harness, cost should
either be deleted or become an explicitly user-supplied `--rate` with the rate echoed in the output
so it can never be mistaken for our own published figure.

---

## Proposed harness corrections

In priority order. Items 1-3 change published numbers; the rest protect them.

1. **Fix `escapeString`** - quote on apostrophe and on structural characters (`{ } [ ] : ~`), escape
   backslashes, and apply it to array elements too. Cost on the committed corpus: 10 bytes.
2. **Fix the byte formula** - measure the same document both metrics already tokenize, i.e. include
   `~ ` prefixes and newlines. Restates the size claim from 49.2% to 47.6%.
3. **Add a round-trip gate** - after building each document, `io.parse()` it, compare the recovered
   records against the source objects, and **fail the run** on any mismatch. This single check would
   have caught defect 1 immediately. Note the semantic caveat: IO's `d'...'` round-trips to a Date
   while JSON's is a string, so compare on normalised values, not identity.
4. **Vendor or bundle the official implementation** until the packaging defect is fixed upstream -
   an esbuild pre-step is enough, and the packaging bug should be filed against the package.
5. **Commit fixtures; seed the generator** - `faker.seed()`, replace `Math.random()`, and read
   corpora from `data/` rather than regenerating. Retires the +/-5% caveat.
6. **Pin the tokenizer** - exact `js-tiktoken` version, encoding name in the output header, and a
   checksum assertion on the BPE table.
7. **Add the five committed datasets** from question 3, and report them as a table rather than one
   number. Include n=1 and the text-dominant set - the cases where JSON wins - in the default run.
8. **Add an uncompressed/compressed pair** (gzip both documents and report both). Until this exists,
   every claim must be labelled uncompressed.
9. **Delete the cost block** or gate it behind an explicit user-supplied rate.
10. **Housekeeping** - the README uses emoji, which the project's ASCII-first rule prohibits in
    anything we publish or quote from; `ARCHITECTURE.md` documents modules that no longer match the
    code's behaviour once the above lands.

## Addendum - the playground has a related measurement issue (2026-08-12)

Checked after Aamir supplied a playground screenshot. The same class of defect io-bench has, one
layer up, in the artifact we intend to make the page's hero.

**The size badge excludes the schema.** From the shipped bundle:

```js
function Qg(o, i, l, s) { if (!o || s || !i) return; const u = 100 - o/i*100; ... }
// called as: Qg(ioDocumentEditor.length, jsonOutput.length, minified, suppress)
```

`o` is the **document editor's** contents. With "Separate Schema" on, the schema lives in its own
pane and is not counted. The screenshot's panes confirm it arithmetically: schema 163 B, document
363 B, JSON 935 B, badge **61.18%** - and 1 - 363/935 = 61.18% exactly. Counting the schema, the
same sample is **43.74% smaller**.

Neither number is dishonest; they answer different questions (marginal cost per record vs total
payload). But the badge does not say which it is, and at six records the schema is 31% of the
total IO bytes. Suggested fix: show both, or label the badge "document only".

**Second, smaller issue:** the JSON pane renders `date` values as full ISO datetimes
(`"2022-01-01T00:00:00.000Z"`), which is a faithful round-trip of IO's date type but not what a
developer would have hand-written (`"2022-01-01"`). It inflates the JSON baseline; on an
independent reconstruction the effect is worth roughly 11% of the JSON side. Worth confirming
in-app with the same toggles before acting.

Verified good: the sample round-trips through `internet-object@0.2.1` and my reconstruction of the
document measures **363 B**, matching the pane exactly.

## What this means for the Internet Object page

- The size claim can be published as **"about 47% smaller on a committed 50-record corpus,
  uncompressed"**, with the corpus linked - not as a bare ">40%".
- The token claim can be published only with tokenizer, version and model-family caveat attached.
  My recommendation to drop it as a *headline* stands; it is fine inside the benchmark component.
- The page's "single records can break even or worse" sentence is now **measured**, not asserted -
  at n=1 JSON wins on tokens by up to 18.6%. That number is worth showing, because it is the most
  credible thing on the page.
- Nothing may be published from this harness until corrections 1-3 land, because the current
  specimen does not round-trip.
