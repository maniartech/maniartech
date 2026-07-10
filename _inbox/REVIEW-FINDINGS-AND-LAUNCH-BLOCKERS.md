# IA Critical Review — Findings, Fixes Applied & Launch Blockers (2026-06)

> Output of the whole-site multi-agent critical review: **3 cold buyer personas** walking the live
> site + **3 cross-cutting auditors** (consistency · claim-audit/Governing-Rule-#1 · gated-flags)
> across all 21 client pages, reconciled by a lead-editor synthesis. This is the single "what the
> review found / what's fixed / what's still gated on Aamir" doc. Read after the dossiers + sitemap.

---

## Cold-panel verdict

All three personas independently landed on **"would hesitate"** (trust 4–6/10). **None bounced** —
the voice, the JP Morgan credibility bridge, the Keystone / strangler-fig method, the explicit
no-lock-in framing, and the candor (quarantined Ordin deck, "authored-not-industry" standards) earn
the first 30 seconds and several more. Every persona then hit the **same wall**.

**Top 3 site-level issues (no single-page review could see these):**
1. **Proof promised everywhere, delivered nowhere.** The "proof we deliver" slot is an honest
   placeholder on Home, Services, Enterprise SE, Application SE, AI, Modernization, Processious,
   Tallery, Estimate and White Papers *simultaneously* — so the repetition of the empty promise reads
   as a pattern of overpromising (the exact scar every buyer walked in with). **Unanimous #1 blocker.**
2. **Every credibility anchor collapses to one person.** "Senior team / our senior team / we built the
   platform" appear on a dozen pages, but no page — not even About's Team section — names a second
   human, so the plural language *amplifies* the bus-factor fear instead of answering it.
3. **Verifiability promised loudest where nothing is clickable**, plus a real stack contradiction a
   two-page reader catches ("Go, Python, React, PostgreSQL" as the build stack vs. Processious actually
   on Go/MongoDB/React). ISO, JP Morgan, client outcomes, the entity, and most Labs artifacts are all
   asserted with no link or left as placeholders.

---

## Fixes applied this pass — DONE, no input needed (34 surgical edits)

All claim-calibration "escapees" that survived the per-page reviews but broke **cross-page
consistency** are now fixed in visitor copy:

- **Cut the unbacked comparative "most teams our size carry neither"** wherever it survived (home,
  about) — it was already cut from 5 sibling pages; now gone site-wide.
- **Softened every "Our AI asks the questions / within minutes you'll see we understand"** estimator
  guarantee to the honest interim behaviour ("a senior engineer reads it back with a ballpark and an
  honest take") — home, Enterprise SE, Application SE, Processious (×2), Contact. The estimator isn't
  live yet, so present-tense tool language was overstating reality.
- **Standardized the bald absolute "Senior engineers only"** → the behaviour-based "Experienced
  engineers do your work" across home, about, Enterprise SE, Application SE, Modernization, Tallery
  (×2), Services, Estimate — closing the panel's "absolute in some places, hedge in others" finding.
- **Labs claim-calibration** (the page never got a v2 skeptic pass): cut the bald "~30% lighter than
  JSON" and "as fast or faster than cel-go and expr — run the benchmark yourself" (both unlinked /
  not-yet-public); de-headlined "~325★"; "10+ others" → "(and several others)"; "real, adopted" →
  "real, public".
- **home §6 verifiability**: "used by developers worldwide" → named, public signals repo; "40+ public
  repositories" → drop the unverified number; UExL "run them yourself" → "benchmark goes live at
  release" (it's not public yet, so the link pointed at nothing).
- **Dropped the V1/V2 version tokens** from Modernization §4 (the only page breaking the
  "Processious = one product, no versions" public-framing rule).
- **Founder-bio consistency**: about.md "trading-protocol tooling" → canonical "FIX-protocol
  analyzer"; Application SE "Patni (now IGATE)" → "iGATE", "one of India's largest" → verified
  "India's 4th-largest".
- **Status label**: Services "Tallery (in active development)" → canonical "in development".

---

## ✅ Resolved since the review — Aamir supplying proof (rolling log)

- **Internet Object size/token figures — RESTORED WITH PROOF (2026-06).** The softened "compact,
  schema-first" wording is replaced on Labs, Home, Standards and Application SE with the calibrated,
  verifiable claim: **over 40% smaller than minified JSON** (40–60% across the three live playground
  datasets — 43.6% / 45.5% / 59.8% — and the IO side isn't even compressed) + **~30% fewer LLM
  tokens** (io-bench, GPT-4/cl100k_base; 27–30% on multi-record data, breakeven ~3–5 records). Bytes
  are one-click reproducible at play.internetobject.org; tokens via the public io-bench repo
  (github.com/maniartech/InternetObject-vs-JSON-benchmark). **Both figures are now one-click verifiable.**

- **UExL benchmark — PUBLISHED + LINKED (2026-06).** Restored the head-to-head claim on Labs, Home,
  Standards and Application SE, sourced to the authoritative uexl-go README: UExL is the **only engine
  with zero allocations** on the boolean and string paths (exact + stable) and fastest across the
  measured scenarios vs cel-go/expr (string ~108 ns; map/100 ~11,400 ns vs ~15,150 / ~63,500). Linked
  to the public **github.com/maniartech/uexl-go#performance** (one-click reproducible). Calibrated: led
  with the exact alloc claim, hedged that timings vary; labeled UExL **pre-1.0** (license + v0.1.0
  pending). ⚠️ Did NOT link the separate comparison repo — its README is stale (shows UExL slowest,
  pre-optimization) and must be refreshed before linking. uexl-playground isn't live yet → the
  playground CTA is reserved with a placeholder href (Aamir wants it featured; domain TBD), to be
  wired the moment it goes live.

- **Founder LinkedIn — WIRED SITE-WIDE (2026-06).** Aamir supplied https://www.linkedin.com/in/aamironline.
  A 15-agent pass wired it into the founder reference on all 13 pages with founder-facing copy (on
  "Aamir Maniar" or the JP Morgan / 27-year line), and recorded it in the build-notes of the 2 pages
  without founder copy (products, white-papers). Every page citing the pedigree is now one click from
  the real profile — the credibility bridge that quietly upgrades the whole site. (Separate, still
  open: a real founder photo, and a *second* named team member for bus-factor.)

- **ISO (both certs) + legal entity — RESOLVED / REVERSED (2026-06).** Aamir negotiated with URS and is
  renewing/keeping BOTH. Verified from the certificate PDFs: entity **Maniar Technologies Private
  Limited**, registered **344/1301 Kalpataru Srishti Complex, Mira Road East, Thane, Maharashtra 401107,
  India** (Thane / Mumbai Metropolitan Region — not Mumbai proper) → **resolves the legal-entity +
  address + jurisdiction blocker**. Certs: **ISO/IEC 27001:2022** (123961/A/0001/UK/En, scope "Software
  Design, Development and Consultancy Services") + **ISO 9001:2015** (123961/B/0001/UK/En, scope "Software
  Design and Development"); registrar **URS**, accreditation **UKAS (0043)**, IAF. ⚠️ Date flag: the PDFs
  show expiry 06/08 June 2026 (the just-ended 3-yr Cycle 1); renewal (Cycle 2) secured/underway → state
  "9001:2015 + 27001:2022 certified by URS under UKAS" + cert #s + "verify current status with URS"; HOLD
  any printed "valid through" date until the renewed Cycle-2 cert is in hand. Full ISO + entity wire
  across pages pending that one confirmation.

## LAUNCH BLOCKERS — only Aamir can supply these (priority order)

These are real-value holes; **no copy can fabricate them** (Governing Rule #1). Each is a marked
`[PLACEHOLDER — needs Aamir]` in the drafts.

1. **★ ONE real, delivered client case study** — ✅ **SIX DRAFTED 2026-06**: (a) ⭐ **ANCHOR** `_inbox/case-study-rtl-lab.md` — Reliable Analytical Labs (Mumbai), MS Access→WPF modernization, **600+ forms→1, still in production ~15 yrs** (living, named, real screenshot); (b) depth `_inbox/case-study-procurement-nlp.md` — Euclid Infotech "Content Engine" NLP, pre-GenAI; (c) ⭐ **FLAGSHIP** `_inbox/case-study-touchpoint-dashboard.md` — Touchpoint Dashboard (customer-journey platform; Fortune 500 users, O'Reilly *Mapping Experiences* ref, Univ. Sydney course; Aamir = principal architect 2012–18, later ManiarTech offshore lead; framed as founder-role + offshore-partner, NOT client-vendor; product accolades are the PRODUCT's); (d) `_inbox/case-study-upsport.md` — UpSport in-browser video-review studio (record commentary + draw on live video, WebRTC + own WebDoodling [dogfood], PoC-first, ~2019; 2-person MT team built from scratch, Aamir led core). ⚠️ FINANCIAL FAILURE → REFRAMED v2 as ANONYMIZED capability + honesty proof (engineering ≠ business outcome); repeat-founder signal DECOUPLED from the named failure; a partnership was merely contemplated (never finalized — the venture dissolved first), so the Technology-Partnership service stays "selective/emerging, no completed venture yet". (e) ⭐⭐ `_inbox/case-study-chemo-lab.md` — **Chemo Test Laboratory** — a CURRENT, LIVE-IN-PRODUCTION analytical-lab LIMS built on **Processious** (= THE Processious-in-production client proof → resolves blocker #2); referral origin (RTL-system users incl. a director sought MT out + waited ~1 yr; validates RTL); Go/MongoDB/React/AWS; shared screenshots = reference-only (not published); a clean/demo screenshot coming from Aamir for the public page; public proof also = the live verifiable website (chemotestlaboratory.com, "Powered by ManiarTech") + a LIVE public report-authenticity checker (reports.chemotestlaboratory.com — 2nd verifiable URL) + a recipient-bound/OTP-gated/share-proof secure report-dispatch (strong 27001/security depth). (f) `_inbox/case-study-sales-navigator.md` — **Sales Navigator** (Shantee Homes, ANONYMIZED) — an end-to-end real-estate presales platform (showcase + interactive floor plans + estimation engine + sales-only inventory + WhatsApp/Email + admin CMS), in final dev, **go-live July 2026** → "active now" proof + proptech domain range; NOT live → no outcomes claimed; confidential proposal = reference-only. The blocker is now COMPREHENSIVELY solved (6 studies, every base): current-live (Chemo) + current-launching (Sales Navigator) + 15-yr-living (RTL) + international flagship (Touchpoint) + depth (Content Engine) + honesty proof (UpSport). Remaining = client consents / scrubbed screenshots / metrics / post-launch outcomes. Original ask: (situation → what we built → outcome; anonymized OK; a
   link or scrubbed screenshot is strongest). The #1 unanimous gap — unblocks the proof slot on Home,
   Services, Enterprise SE, Application SE, AI, Modernization, Products, Processious, Tallery, Estimate,
   White Papers, Contact. Candidates you already have: the **Processious production-client engagement**;
   old-site testimonials (with consent to name).
2. **★ Unblock the Processious flagship proof card** — 🟢 **ADDRESSED 2026-06**: the Processious-in-production client = **Chemo Test Laboratory** (`_inbox/case-study-chemo-lab.md` — live LIMS on Processious). Remaining: Chemo's OK to name + a SCRUBBED screenshot (real customer/staff names) + optional metric → then wire into the Processious card site-wide. Original ask: (a) name-the-client vs anonymize;
   (b) the actual outcome/metric; (c) ≥1 scrubbed production screenshot. This one asset lights up Home,
   Products, Services, Enterprise SE, Ordin and Partnerships at once.
3. **★ ISO verification** — ✅ **WIRED 2026-06** (both certs current & renewing; 9001:2015 + 27001:2022, URS/UKAS, cert nos. 123961/B/0001 & 123961/A/0001, verify-by-email at info@urs-certification.com, no printed expiry until the post-Aug recert cert — across all pages). Original ask: certificate **numbers** for 9001 + 27001, body (**URS**) + accreditation
   (**UKAS**), a public verify/registry link, **confirm 27001 version (2022 vs 2013)** + issue/expiry
   dates. Ship the line *with* cert#+body+link, or soften site-wide to "documented, repeatable
   process." (An unverified ISO claim makes a small unknown shop *more* suspicious, not less.)
4. **★ Legal entity + registered address + jurisdiction** — ✅ **WIRED 2026-06**: Maniar Technologies Private Limited · 344/1301 Kalpataru Srishti Complex, Mira Road East, Thane, Maharashtra 401107, India · incorporated India (Maharashtra) — into Contact §5 + footer. Optional remaining: CIN/reg number. (Prior note: "Mumbai,
   since 2010" is verified but the exact entity isn't in copy. Contact §5 is a hard gate; procurement
   reads the omission as "offshore-hiding."
5. **★ Founder LinkedIn URL** — ✅ **RESOLVED 2026-06**: https://www.linkedin.com/in/aamironline supplied
   and wired site-wide; the JP Morgan / 27-year pedigree is now one click from proof. ~~Don't publish
   "JP Morgan" bald on pages that gate on the link.~~ *(now moot — link supplied & wired.)*
6. **★ Resolve all placeholder nav/detail links** — the five service/capability detail URLs,
   About/team links, the BPA target slug. A routing page whose routes don't resolve fails its one job.
7. **★ Estimator interim reality** — until the live tool merges, the primary CTA routes to a simple
   "tell us what you're building" intake + "Talk to a human." Confirm the **response SLA** (e.g. one
   business day), the surface (`/estimate` vs subdomain), and that omitting the "~50% cost" message is
   deliberate (recommended: keep it off).
8. **★ White Papers stays OUT of nav** until ≥1 genuinely-published, full-readable paper exists with a
   named-author byline + a verifiable link.
9. **★ Booster TUI demo asset** — the strongest demo can't ship text-only, **and** existing
   screenshots contain real client "Sales Navigator" property names that **must be scrubbed** before
   any publication.

---

## HIGH — high-impact, not strictly launch-gating

- **1–2 named senior team members** (name, role, photo, consent) **+ a continuity statement**, OR an
  honest written continuity/handover commitment. Backs the site-wide "senior team" language; the #2
  bus-factor blocker. (Never imply a larger salaried headcount than exists.)
- **Harmonize the tech-stack claim** so a two-page reader catches no contradiction. Generic line says
  "Go, Python, React, PostgreSQL"; Processious is Go/MongoDB/React; Sales Navigator is
  Python/Django+PostgreSQL; Tallery/Documentor are Django/PostgreSQL/Next.js. Pick one honest formula
  (e.g. "mainstream, hireable technology — commonly Go, Python, React, and PostgreSQL or MongoDB") and
  confirm each page's stack is accurate + OK to state publicly.
- **Product-evidence media** (antidote to "in development = vaporware"): Tallery screenshots/demo;
  Documentor link or screen-recording; a real sample estimator interaction.
- **Repo/playground/artifact links** so "check it yourself" is one click: GitHub org URL + verified
  public-repo count (42? — cut the number if unverifiable); signals repo (don't headline stars);
  Internet Object playground + spec; named Go repos; UExL (uexl-go, public — linked). **Hold AddressQL/FUSE/Indigo/Ordin links dark**
  until their public release/LICENSE is confirmed.
- **Show-vs-hold calls**: Documentor public while fundraising? Ordin positioning (Processious sub-page
  vs hold)? Mention Engage at all, or cut? Show Booster now vs hold?
- **Re-verify every per-product status label at publish** (don't ship "in production"/"available" for
  anything in development).

---

## MEDIUM / LOW — polish before launch

- **Founder-pedigree reconciliation**: state "27-year career" (founder) AND "since 2010" (firm)
  explicitly so 2026−2010=16 doesn't read as inflation (estimate.md already models this); keep "FIX-
  protocol analyzer", "iGATE", Countrywide as a plain list item (at most "(now part of Bank of
  America)", never the home-loan/Fortune flex); confirm "Patni = India's 4th-largest".
- **License framing per project** (fair-code/source-available ≠ open source; confirm Ordin LICENSE
  before any n8n comparison; omit the Internet Object version-number conflict 0.2.1 vs 1.0.0-beta.1).
- **Hold all unverified quantitative/comparative claims** until measured + reproducible + linked
  (Ordin perf targets; star/repo counts;
  Taj Mahal "powers N others"). The fabricated Ordin pitch-deck content must **never** be sourced.
- **Newsletter/notify infra** wired to a real provider before any signup CTA goes live.
- **Content hygiene**: scrub the dc-editor README boilerplate (personal Vercel URL + email) before any
  Documentor link-out; never let "Military Grade Robustness" reach copy; scrub all demo assets of real
  client/property names; confirm the public inbox (hello@/contact@/sales@) + the "Talk to a human"
  destination; optional business phone for procurement.
- **Naming/positioning**: "Application" vs "Custom" Software Engineering; is Architecture Review &
  Advisory its own offering; Ordin canonical name/one-liner; Processious public one-liner; Tallery
  target customer + "scoped pilot first" model; Partnerships redacted assets + appetite/criteria.

---

## Status

- **All 21 client-facing IA pages are drafted, critically reviewed (cold-panel + claim-audit +
  cross-page consistency), and the safe fixes are applied.** The drafts are doctrine-compliant on
  order and on every guardrail; the residual gaps are the real-value holes above.
- **Verdict: trust is "borderline" — and turns to "yes" the moment blockers #1–#5 are filled.** One
  real case study + a second named face + verifiable ISO/entity/LinkedIn links is the difference
  between "would hesitate" and "earns the meeting."
- Lowest-priority remaining build work (not gated on Aamir): Labs detail pages (×17), then theme
  conversion (Infolio → Taj Mahal) + site generation.
