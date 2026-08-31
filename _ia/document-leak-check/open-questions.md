# Open questions - Document Leak Check
Each tagged **resolve-now** / **defer-to-phase** / **spike**. Nothing dissolves into vagueness.

| # | Question | Tag | Why it matters |
|---|---|---|---|
| Q1 | Does this live at `maniartech.com/tools/...` on Taj Mahal SSG, or standalone? | **resolve-now** | Brand accrual, deploy pipeline, whether Taj Mahal serves a JS-heavy app page |
| Q2 | Is deterministic PII matching good enough, or is recall so poor it damages credibility? | **spike** (deferred - not in v1) | A scan that misses obvious personal data undermines the reputation this exists to build |
| Q4 | Who builds it - Aamir alone, or the team? | **resolve-now** | Effort sizing and roadmap realism |
| Q5 | Offline / installable PWA? | **defer-to-phase** | A no-upload tool that runs offline is a stronger proof, but adds a service worker to maintain |
| Q6 | Accessibility target - WCAG 2.1 AA? | **defer-to-phase** | A free public tool from an ISO-certified shop should meet it; needs confirming as a requirement |
| Q7 | Do we publish the source? | **defer-to-phase** | "Check the network tab" is verifiable already; open source is stronger but adds a repo to maintain |
| Q8 | Encrypted / password-protected PDFs - refuse, or ask for the password client-side? | **resolve-now** | PDF X-ray refuses them. Handling them is a small differentiator but touches the trust story |
| Q9 | What exactly does a shareable result contain? | **defer-to-phase** | Sharing is the growth mechanism, but a summary must carry zero document content |
| Q10 | Does the leak check stay pure, or become a DocsRight funnel? | **resolve-now** | Recommendation: stay pure - no CTA, no capture, no DocsRight mention in-product. A lead magnet that behaves like one forfeits the trust that makes it work. Attribution does the work |
| Q11 | Can we reach CSP `connect-src 'none'`, or do we settle for `'self'`? | **spike** | See below - this decides whether the guarantee is absolute or merely same-origin |

### Q11 detail - the strength of the guarantee
`connect-src 'none'` makes the claim absolute: the page cannot open a network connection at all.
`connect-src 'self'` is weaker in principle (a script *could* POST to our own origin) though there
is no endpoint to receive it on static hosting, and the build guard in D7 forbids the call.

**Spike:** can pdf.js run with zero runtime fetches by bundling CMaps and standard font data as
imported modules rather than fetched URLs? Note CMaps are only needed for CJK encodings - most
Latin documents never touch them.
**Fallback if not:** `connect-src 'self'` with the D7 build guard, and precise wording.
**Third option worth testing:** ship with no CMaps and `connect-src 'none'` by default; if a
document needs CJK decoding, say so explicitly rather than silently fetching.

## Resolved

### Q3 - Can a fake redaction be detected reliably enough to state as a finding, not a maybe?
**RESOLVED - yes, deterministically, for the common case.** (Spike closed by research, 2026-08-30.)

The signal is **paint order**. A page's content stream is a sequence of operators executed onto a
blank canvas; later operations paint over earlier ones. If text is painted *before* a filled
rectangle that covers it, the rectangle is an overlay and the text is still in the file. This is a
fact about the file, not a guess - which is what lets us report it as a finding.

Mechanics: `page.getOperatorList()`, iterate `fnArray`, match `OPS.rect` / `OPS.constructPath`
(vector overlays) and `OPS.paintImageXObject` / `OPS.paintJpegXObject` (image overlays), compare
against text item positions from the text layer. Overlay index > text index means the text survives.

**False-positive rules that must be implemented (all three):**
1. **Ignore translucent shapes.** The graphics state carries a non-stroking alpha (`ca`, set via a
   named `ExtGState`). Anything meaningfully translucent is a highlight, not a redaction.
2. **Ignore shapes covering more than ~40% of the page.** That is a watermark, stamp or page
   background. Nobody redacts a name by covering half the page.
3. **Handle text render mode 3 (`3 Tr`) separately.** It draws nothing and is *normal* in scanned
   OCR documents - reporting it as a failed redaction would fire on every scanned document ever
   produced.

**Residual limits (must be stated in the product):** scanned PDFs without a text layer cannot be
verified; encrypted PDFs cannot be read unless decrypted first (see Q8).
