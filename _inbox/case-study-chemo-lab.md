# Case study — Chemo Test Laboratory LIMS (on Processious) (Draft v1, 2026-06)

> Fifth case study, from Aamir's narrative (2026-06). ★★ POSSIBLY THE STRONGEST: a **CURRENT,
> IN-PRODUCTION** analytical-lab system, **built on our own Processious platform** — so it is BOTH the
> living/recent anchor AND the **Processious-in-production CLIENT PROOF** the whole site has been
> gating on (unblocks launch-blocker #2 + the Processious card on ~6 pages). Origin is pure trust:
> people who'd used the **RTL** lab system we built years earlier (incl. a director) sought ManiarTech
> out at their new lab and **waited ~1 year** for us. Pairs with RTL = analytical-lab DOMAIN depth.
> Every claim TRUE + SOURCED (Governing Rule #1).
>
> ✅ **SCREENSHOTS (Aamir 2026-06):** the screenshots Aamir shared (with real customer/staff data) are
> **REFERENCE ONLY — NOT for publishing.** For the public page, **Aamir will supply a SEPARATE,
> clean/demo screenshot** (no confidential data) → there IS a public visual slot, awaiting that clean
> image. Other proof is already public + verifiable: the **live website (chemotestlaboratory.com,
> "Powered by ManiarTech")** + named client + in-production narrative.

---

## PART A — Intake (captured from Aamir, compaction-safe)
- **Client:** **Chemo Test Laboratory** ("Chemo") — an analytical testing laboratory.
- **★ Origin (referral/trust — the hook):** two people — **one of them a director of Chemo** — had used
  the **RTL** analytical-lab system ManiarTech built (see RTL case study) and found it **excellent to
  work with.** When they began working at Chemo, they asked ManiarTech to build a **similar system** —
  and insisted they wanted it **built by ManiarTech only.** When ManiarTech proposed building it on
  **Processious** (then being matured as the base framework), they **WAITED ~1 YEAR** for it.
  `[individuals NOT named — per the Akshay/Jeff precedent; tell via "people who'd used the lab system we
  built, including a director".]`
- **What we built (LIVE IN PRODUCTION NOW):** modules on **Processious** — **LIMS** (full sample
  lifecycle: inward → admin/technical review → approval → entry → authorization → in-lab/analysis →
  tests complete → checker authorization → checked-and-signed → report dispatch), **Accounts**,
  **Customers**, **Membership.** **More coming:** **Inventories, Dashboards** (growing relationship).
- **★ FLAGSHIP UI — sample workflow at a glance:** a **Sample Workflow Detail** view shows the **live
  state of every sample's analysis** in real time — a staged timeline (Inward → Admin/Technical Review →
  Approved → Entry → Authorized → In-Lab/WIP → Tests Complete → Checker Auth → Checked-and-Signed →
  Report Dispatched), each step **stamped with the responsible user + time**, plus a per-sample %
  progress. Open it and you instantly know where every sample stands and who did what. **Same
  workflow-at-a-glance DNA as the RTL system** (a ManiarTech signature). → **Best candidate for the
  public clean/demo screenshot.**
- **★ Secure report DISPATCH (engineering depth):** a Chemo report is a **bundle** (not one page — all
  collected + generated artifacts + data). Delivery is locked down: an authorized sender emails it →
  only the **customer-authorized recipient** can receive it → they get a **link** → clicking requires
  entering **report data (COA etc.)** → on submit an **OTP is sent ONLY to the authorized user** (so a
  forwarded/shared link **FAILS**) → after OTP, they download the bundle. Multi-factor, **recipient-
  bound, share-proof.** (Strong ISO-27001 / data-security depth proof.)
- **★ Public report CHECKER (LIVE, verifiable):**
  **reports.chemotestlaboratory.com/v1/app/chemo/report-checker/** — anyone (even non-customers) enters
  a **COA number** to verify a report's authenticity. Verified LIVE 2026-06 ("© 2025 Chemo Test
  Laboratory"; no MT badge on this subpage, but it's part of the system MT built). = anti-forgery /
  report-authenticity tool, publicly checkable → **2nd verifiable live Chemo URL.**
- **Customer portal:** the customer's **consumers** log in to download their **billing and reports**
  (self-service).
- **Tech:** **Processious** framework ("superfast, enterprise-grade"); **Golang**, **MongoDB**,
  **React**; hosted on **AWS**; a **custom reports engine** producing their lab reports/COAs.
- **Status:** ✅ **LIVE IN PRODUCTION (2026).** Screenshots show real June-2026 production data (75
  samples, full workflow timelines).
- **★ Public website too:** Chemo's website **www.chemotestlaboratory.com** is built on ManiarTech's
  **Taj Mahal SSG** framework — LIVE (verified 2026-06), footer publicly reads **"Powered by
  ManiarTech®"** (links to maniartech.com). So MT built Chemo's **FULL digital stack on its OWN
  frameworks**: LIMS on Processious + website on Taj Mahal SSG.
- **Chemo profile (verified from their site):** a serious analytical lab — **35+ years**, accredited
  **NABL · US FDA · Maharashtra FDA · ISO 9001:2015**; pharma/cosmetics/food/agri/packaging/medical-
  device testing. Tagline "One-Stop Solution for Analytical Testing Services"; "3C philosophy —
  Commitment, Consistency, Credibility."
- **★ NAMING NOW LOW-RISK:** Chemo PUBLICLY credits ManiarTech on its own site footer ("Powered by
  ManiarTech®") → the relationship is already public/reciprocal, so naming Chemo as a client is clearly
  fine. (The LIMS-screenshot SCRUB is a SEPARATE, still-mandatory issue — customer/staff data.)

`[OPEN for Aamir: (1) naming is now LOW-RISK (Chemo publicly credits ManiarTech on its site footer) —
but a CLIENT QUOTE from them (esp. the director who sought us out) is still the highest-value ask = the
single strongest testimonial on the site; worth requesting. (2) screenshots are reference-only, NOT
published (Aamir confirmed) — no scrub needed.
(3) any metric (samples/month, users, turnaround, # labs live)? honest only. (4) confirm naming the
stack (Golang/MongoDB/React/AWS) publicly is fine.]`

---

## PART B — The case-study page (draft)

---
title: "A lab that waited a year for us — now running live on Processious"
client: "Chemo Test Laboratory"
industry: "Analytical testing laboratory"
services: ["Enterprise software engineering", "Process automation (Processious)"]
tech: ["Processious", "Go", "MongoDB", "React", "AWS"]
duration: "Live in production (2026); ongoing"
status: "case-study"
---

# They'd used a lab system we built years earlier — so they waited a year for us to build their next one

> A current, in-production laboratory system — LIMS, accounts, customers and more — built on our own
> Processious platform, for a lab that chose us specifically and waited a year for it.

> **Client:** Chemo Test Laboratory — a 35-year, NABL / US-FDA / ISO-9001-accredited analytical lab ·
> **How it started:** people who'd used the lab system we built years earlier — including a director —
> sought us out and asked for ManiarTech *only* · **What we built:** their internal lab platform on
> **Processious** + their public website (**chemotestlaboratory.com**) on our **Taj Mahal SSG** — their
> whole digital stack on our own frameworks · **Tech:** Go · MongoDB · React · AWS · **Status:** live in
> production, and growing.

## The best referral isn't a logo — it's a year of patience
Years ago we built a test-management system for an analytical lab that's still running today. Some of
the people who used it day in, day out — one of them now a director — moved on to a new laboratory,
**Chemo Test Laboratory.** When they needed a system there, they didn't run a vendor search. They came
to ManiarTech and said they wanted it built by us, and only us.

We proposed building it on **Processious**, our process-automation platform, which we were still
maturing for exactly this kind of work. That meant waiting. They **waited about a year** — because they'd
seen what we build, and they wanted it done right. That patience is the most honest endorsement a team
can get.

## What we built
Chemo's laboratory now runs on a system we built on Processious — **live, in production today.** It
covers the full sample lifecycle a testing lab lives by:

- **LIMS** — every sample tracked from inward through admin and technical review, approval, entry,
  authorization, in-lab analysis, checking, multi-step signing, and report dispatch. Its centrepiece is
  a **workflow view that shows the live state of every sample's analysis at a glance** — a staged
  timeline, each step stamped with who did it and when, and a clear progress indicator. Open it and you
  know instantly where every sample stands. (It's the same workflow-first design that's kept the RTL
  lab system usable for 15 years — a ManiarTech signature.)
- **Accounts, Customers, and Membership** modules, integrated into the same platform.
- A **custom reporting engine** that produces the lab's certificates and reports.

It runs on **Go, MongoDB, and React**, hosted on **AWS** — and the relationship is still growing:
**Inventory and Dashboard** modules are next.

And it isn't just the internal system. We also built Chemo's **public website —
[chemotestlaboratory.com](https://www.chemotestlaboratory.com) — on our own Taj Mahal SSG framework.**
So their entire digital presence, inside and out, runs on technology we make. (See for yourself: their
site footer reads "Powered by ManiarTech.")

`[IMAGE — a clean/demo screenshot of the Chemo LIMS sample-workflow board, to be supplied by Aamir with
NO confidential customer/staff data (the shared screenshots are reference-only). A clean workflow-board
visual is strong proof here.]`

`[Metric — needs Aamir, if available: samples processed, users, turnaround, # of labs/units live. Honest
only; the live-in-production status + the module scope already carry it.]`

## The hard part: a confidential report, delivered to exactly one person
A lab report isn't a newsletter — it's confidential, regulated data, and it has to reach the *right*
person and no one else. Chemo's reports aren't single pages, either; they're **bundles** carrying all
the collected and generated artifacts and data. So we engineered the delivery to match:

- An authorized sender dispatches a report — and **only the recipient the customer has authorized** can
  receive it.
- That recipient gets a link, but clicking it isn't enough: they must enter **report-specific details
  (the COA, and so on)**, and only then does the system send a **one-time password — to the authorized
  user alone.**
- **Forward that link to anyone else and it simply fails** — the OTP never reaches them. The bundle
  unlocks only for the person it was meant for.

We also built a **public report checker** —
[reports.chemotestlaboratory.com](https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/)
— where *anyone*, customer or not, can enter a report's COA number and confirm it's genuine. For an
accredited lab whose certificates carry real weight — a regulator, an auditor, a buyer checking a
product — that anti-forgery check matters, and you can try it live yourself. And for the customer's own
end-users, a **portal** lets them log in and pull their billing and reports on demand.

## Why it matters
- **It's live, and it's current.** Real analytical work runs through this system today — not a demo, not
  a pilot.
- **It's our second analytical-lab system.** Paired with the 15-year-old system that inspired this
  referral, it's real domain depth: we know how labs actually work.
- **Their whole stack runs on what we make.** The internal lab platform is on **Processious**; the
  public website is on our **Taj Mahal SSG**. Inside and out, Chemo runs on ManiarTech technology — and
  you can verify the public half yourself at chemotestlaboratory.com (it credits us right in the footer).
- **Security engineered in, not bolted on.** Confidential report bundles reach exactly one authorized
  person — recipient-bound, OTP-gated, share-proof — and anyone can verify a report's authenticity at a
  public checker. That's what the ISO 27001 certificate is *supposed* to mean; here it's the actual
  engineering, and you can try the checker live.
- **They chose us, and waited.** The strongest trust signal in this whole set isn't a metric. It's a
  client who wanted ManiarTech specifically and was willing to wait a year to get it.

**Need a system your operations actually run on?** [Estimate your project →](/estimate/) · [Talk to us →](/contact/)

---

## Placement / usage notes
- **★ CO-ANCHOR with RTL** — RTL = the 15-year longevity proof; Chemo = the current, in-production proof
  that the same expertise is active *now* and that clients seek us out. Tell them as a pair (the
  referral literally connects them) → a powerful analytical-lab domain narrative.
- **★ THIS IS THE PROCESSIOUS CLIENT PROOF** — it backs the "Processious, in production for a client"
  claim across the site. Wire it into the Processious product page §3 proof slot + the home/services
  proof slots → resolves launch-blocker #2 and a big part of #1. (Keep Processious public framing: name
  "Processious", NO version numbers/internal state.)
- **Honesty guardrails:** individuals NOT named (the director etc.) — tell via roles; current happy
  client → strongly recommend getting their OK to name + a quote (best testimonial on the site);
  qualitative outcome (no invented metrics); "live in production" is firsthand/true.
- **SCREENSHOTS (Aamir confirmed):** the shared screenshots are reference-only (not published); Aamir
  will supply a SEPARATE clean/demo screenshot (no confidential data) for the public page → that's the
  public visual, alongside the verifiable live website + named client.
- **WebDoodling/Processious dogfood thread + "ahead of the curve":** fits the pattern; also strengthens
  the Processious product page (real named-ish client in production).
