# Free tools programme - engineering as marketing
(2026-08-30 | DECIDED with Aamir: build both shelves; first tool selected)

The reputation strategy behind the LinkedIn slate. Posts alone were never going to do it - this is
what the posts are *about*. Companion to `linkedin/content-strategy.md` (channel + format) and
`linkedin/post-drafts.md` (the posts themselves).

---

## The objective (Aamir, 2026-08-30)

Be seen as an expert **and** a genuine helper, by 13K LION-era contacts across mixed domains -
without spending time helping people one at a time.

Only one model satisfies all of that: **build once, help many, zero marginal time.** Give away
working software, not advice. Advice must be re-given to every person; a tool is given once.

Reference case: Chimney's founder built free embeddable financial calculators for bank websites and
converted 60+ financial institutions into customers - from the calculators, not from posting.

### The honest correction
This is **zero marginal time, not zero time.** A post costs an hour; a tool costs a weekend. The
weekend keeps paying and the hour does not.

### The rule that keeps it sustainable
**No backend. No accounts. No stored data. No ads. No telemetry.**

Which means: no support inbox, no ops, no security surface, no password resets, nobody emailing
when it is down. A static client-side page can be ignored for three years and still work. The
moment a tool has a login, it has become a job Aamir explicitly does not want.

## Two shelves, one promise, two channels

| | Org shelf | Dev shelf |
|---|---|---|
| Audience | Anyone and their organisation | Engineers |
| Channel | **LinkedIn** | GitHub, Hacker News, r/golang |
| Economics | **Build** - new, weekend-sized | **Harvest** - mostly already built |
| Promise | Nothing leaves your browser | Real licence, tagged, no telemetry |

Shared promise: **free, no strings.** No account, no data collection, no upsell, no ads.

Both live on one page on maniartech.com so the line reads as a line, not a scatter of one-offs.

### The cross-feed
Org tools get built **on our own published libraries**. Each org tool is then a live dogfooding
proof of a dev tool - which is the argument `research/posts/80-dogfood-first.md` already makes.
One build, two kinds of evidence.

## The dev shelf is a release problem, not a build problem

From `_ia/foundry-project-register.md`:

| Project | State | What it needs to become a giveaway |
|---|---|---|
| signals | MIT, v1.3.1, 331 stars | **Nothing.** Already adoptable |
| gotime | MIT, v2.0.4 | **Nothing** |
| vault-storage | MIT, v2.0.1 | **Nothing** |
| UExL | "Pre-1.0, **publish-ready**" but **no licence granted** | A LICENSE file + a tag. An afternoon |
| gowork | Apache-2.0 file present, unreleased, private | Flip to public + tag |
| GoCurl | MIT, public, register flags a **CONFLICT** | A ruling, not code |
| Internet Object | ISC, public, playground live | **Fix the npm package first** - it does not load in Node (~400 extensionless imports in `dist`) |
| Taj Mahal SSG | Private, "OSS planned" | **A business decision, not a giveaway decision** - do not fold into this programme |

**UExL is the highest-value, lowest-cost item we own**: finished and legally unusable. But
releasing under an open licence is irreversible - see Risks.

## The org shelf - selection criteria

Aamir's test, and it is the right one: **use-worthy AND share-worthy.**

Use-worthy is not enough. A PDF compressor is used constantly and shared never - there are fifty of
them, and forwarding one says nothing about the sender. **Share-worthy needs a revelation
attached**: the tool must show people something they did not know, ideally about their own files.
"Oh no" moments get forwarded; utilities do not.

This rules out: PDF compress/merge/split, image resize, format converters. All commodity.

## FIRST BUILD: the document leak check

**What it does.** Drop in a file. Entirely in the browser. It reports what the file is leaking:

- **Fake redactions** - black rectangles drawn over text that is still selectable underneath
- **Hidden metadata** - author, organisation, original filename, authoring software, edit history
- **Tracked changes and comments** left in the document
- **Hidden rows, columns and sheets** in spreadsheets
- **Personal data in the text** - names, emails, phone numbers, ID-shaped strings
- **GPS coordinates** in embedded images

**It does not fix anything.** It tells you the truth about your file. That is the brand: we produce
evidence, we do not decorate.

### Why this one
- **Share-worthy by construction.** Run it on your own published PDFs and you will find something.
  That "oh no" is the shareable moment, and the sharer gains status by passing it on.
- **Use-worthy and recurring.** You would run it before every external document send, not once.
- **The privacy promise is not a differentiator here - it is a precondition.** You cannot ask
  somebody to upload the confidential document they are checking for leaks. **Every competitor with
  a server is structurally excluded from this category.** That is a moat, not a feature.
- **On brand.** Verification, evidence, and a refusal to overclaim. Doctrine-compliant without a
  single boast.
- ~~Nothing free does this in one place.~~ **CORRECTED 2026-08-30:** this was wrong. At least two
  direct competitors exist - PDF X-ray (`pdfxray.fly.dev`) and Tamperlens - plus several
  "unredact" utilities, and the detection technique is publicly documented. The category is not
  empty. Differentiation has been re-derived on real ground; see
  `_ia/document-leak-check/01-discovery.md`.

### Evidence the problem is real
- Two online PDF makers leaked thousands of user-uploaded documents in July 2024 - passports,
  driving licences, contracts.
- The Nitro PDF breach exposed Google (3,600+ accounts, 32,000 documents), Apple (584 accounts,
  6,405 files) and Microsoft (3,330 accounts, 2,390 documents).
- Some free converters harvest content snippets for model training or sale to data brokers.
- Security guidance now states plainly that browser-based tools processing files locally are
  categorically safer for confidential material.

### Timing (India, where much of the network sits)
DPDP Rules notified Nov 2025. **2026 is the "build and test" year**; soft enforcement ends
**13 Nov 2026**; full substantive obligations from **13 May 2027**. Organisations are being asked
where personal data actually sits, and mostly cannot answer.

**Framing guard:** never position this as "DPDP compliance." Scanning one document does not make an
organisation compliant, and claiming otherwise breaks Governing Rule #1. Say what it does - *finds
personal data in a document before you send it* - and let the reader connect it.

### Scope honesty (engineering)
Feasible client-side: PDF text extraction and redaction-overlay detection (pdf.js); metadata
extraction; DOCX/XLSX inspection (they are ZIP+XML - hidden sheets, tracked changes and comments are
all readable); image EXIF/GPS.

**Not feasible client-side:** reliable OCR. A *scanned* PDF's redaction cannot be verified, and the
tool must say so rather than passing it silently. PII detection is pattern-matching, not
intelligence - it will miss things, and the tool must state that. **The stated limit is on brand,
not a weakness to hide.**

**v1 scope: PDF only** - fake redaction + metadata. Sharpest revelation, smallest build. Office
formats and images follow.

### The post that ships with it
Teardown format, per `linkedin/content-strategy.md`:
artifact = a redacted PDF; diagnosis = the black box is a drawing, the text is still under it;
fix = how real redaction works, and a free checker; principle = **a rectangle is not a deletion**;
soft close = go check one of your own published PDFs.

## Sequencing

1. **Week 1 (paperwork, no engineering):** UExL licence + tag; GoCurl ruling; gowork public. Three
   real developer giveaways from decisions alone.
2. **Weeks 2-4:** build the document leak check, v1, PDF only.
3. **Ship, then announce.** Never announce a cadence, then ship. No public schedule promises - a
   standard we control, not a date we might miss (house rule).
4. **Then:** the data file health check (ops audience, ties directly to the Internet Object work).

## Risks and open decisions

- **Open-sourcing is irreversible.** UExL's "no licence" may be deliberate. Aamir's call, not a
  default.
- **Shipping something mediocre damages the reputation this exists to build.** Better one tool that
  is unarguably good than four that are fine. Fix the Internet Object npm loading bug before
  promoting it anywhere.
- **Taj Mahal SSG stays out of this programme.** Potentially commercially valuable; a separate
  decision.
- **This compounds slowly** - six to twelve tools before "the person who makes those," call it a
  year. It is slower than posting and it is the only version that survives not wanting to spend
  time on it.
- **Positioning risk:** a generic "LinkedIn influencer" register would damage the senior-shop
  positioning the whole site exists to build. The giving must stay engineering-shaped.
