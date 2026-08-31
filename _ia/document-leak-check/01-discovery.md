# 01 - Discovery Brief: Document Leak Check
Stage 1. Problem, market, competitors, and the recommended feature strategy.

---

## The problem

The number-one redaction mistake is drawing a black rectangle over sensitive text without removing
the text from the file. PDF viewers render in layers: the overlay sits on top, the text underneath
is untouched, and anyone can select and copy it.

The same class of problem covers metadata nobody looks at - author, organisation, original
filename, authoring software - which travels with every document sent outside the building.

**Neither failure is visible to the person sending the document.** That is the whole product: make
an invisible failure visible, before the document leaves.

## Market context - this keeps happening to careful people

| Year | Incident |
|---|---|
| 2014 | The New York Times published NSA documents whose blacked-out text was recoverable by copy-paste |
| 2012 | Samsung's attorneys filed improperly redacted financial data in the Apple v Samsung patent case |
| 2019 | Paul Manafort's attorneys filed a court response whose black rectangles a Guardian reporter copy-pasted straight out |
| Dec 2025 | Released Epstein-case government documents; the Guardian reported some redactions could be undone with basic techniques |

Courts treat this as a failure of reasonable diligence - exposure to sanctions, re-production
orders and cost shifting.

**Relevance:** if the New York Times, a Fortune-500 legal team and the US government all shipped
this bug, "check before you send" is not a beginner's concern. That framing is also what makes the
tool share-worthy without exaggerating anything.

### Adjacent evidence: why "no upload" matters
- Two online PDF makers leaked thousands of user-uploaded documents in July 2024 - passports,
  driving licences, contracts.
- The Nitro PDF breach exposed Google (3,600+ accounts, 32,000 documents), Apple (584 accounts,
  6,405 files) and Microsoft (3,330 accounts, 2,390 documents).
- Some free converters harvest content for model training or sale to data brokers.

### Timing (India)
DPDP Rules notified Nov 2025. 2026 is the "build and test" year; soft enforcement ends 13 Nov 2026;
full substantive obligations from 13 May 2027. **Framing guard: never claim this delivers DPDP
compliance.** Scanning one document does not make an organisation compliant.

## Competitive analysis

**The category is not empty. Correcting an earlier error in the programme doc.**

| Competitor | What it does | Processing | Weaknesses we can honestly beat |
|---|---|---|---|
| **PDF X-ray** (`pdfxray.fly.dev`) | The closest competitor. Redaction verification, hidden metadata, text-layer vs visual-render mismatch, scanned-PDF oddities. Side-by-side view, SVG overlays, severity list, exportable report | **"In-browser scanning option (where possible)"** - a hedge, and it is hosted on a server platform | The hedge is the opening. No creator attribution anywhere - an anonymous tool asking for your confidential document. Offers remediation suggestions, so it is drifting toward fixing |
| **Tamperlens** (`tamperlens.com/redaction-check`) | Redaction check | Unclear | Narrow; single-purpose |
| **unredact** (GitHub, leedrake5) | Reads poorly redacted documents to recover originals | Local CLI | Offensive framing, developer-only, not a check-before-send tool |
| **textfixer / obfuscate.online** etc. | "Unredact a PDF" utilities | Mostly server | Ad-supported, thin, no metadata coverage |
| **Redactable / Redactor.ai / RedactLaw** | Commercial redaction *products* | Server, paid | They redact; they do not verify someone else's work. Different job |

**The technique is public.** A DEV Community write-up documents the pdf.js operator-list approach
in detail, including false-positive handling. **We have no algorithmic moat and must not pretend
to one.**

## Where the real differentiation is

Since the technique is public and competitors exist, differentiation has to come from things a
competitor cannot copy by writing better code:

1. **Unconditional client-side, stated as an absolute.** PDF X-ray says "in-browser *where
   possible*." We say: always, no exceptions, no server exists to send it to. Verifiable in the
   network tab in ten seconds. This is the precondition argument - for *this* category a hedge is a
   disqualification, because you cannot ask someone to upload the confidential document they are
   checking for leaks.
2. **A named firm signs it.** PDF X-ray carries no attribution. For a tool whose entire value is
   trust, an anonymous app is at a structural disadvantage. A 27-year, ISO-certified engineering
   firm putting its name on it is the differentiator that cannot be cloned.
3. **Report-only, on principle** (ADR D1). Competitors drift toward remediation. We state why we
   refuse: if our fix is imperfect we have created the leak we exist to prevent.
4. **Honest limits, stated in the product.** Scanned PDFs cannot be verified. Pattern-matching is
   not intelligence. Nobody else says this out loud, and saying it is the same move as publishing
   our worst benchmark number.
5. **No signup, no quota, no ads, no telemetry.** Structurally free because there is no server cost
   to recover.

## Recommended feature strategy

| Tier | Features |
|---|---|
| **Table stakes** (must have to be credible) | Fake-redaction detection with paint-order proof; hidden metadata extraction; per-finding page + location; clear severity; works offline once loaded |
| **Differentiators** (why us) | Absolute no-upload guarantee with a "verify this yourself" instruction; named accountable publisher; explicit refusal to fix, with the reasoning shown; a stated limits panel that is part of the result, not buried in a footer |
| **Delighters** | Copy-the-evidence (show the actual extractable text under the box, so the finding is undeniable); a shareable summary that contains no document content; keyboard-only operation |
| **Future bets** | Office formats (tracked changes, comments, hidden sheets); image EXIF/GPS; PII pattern scan; on-device NER model (ADR D4 defers this) |

**Deliberately not built:** redaction itself, OCR, file conversion, storage, accounts, sharing.
