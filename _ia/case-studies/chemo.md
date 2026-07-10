---
title: "Chemo Test Laboratory — a LIMS in production on Processious"
description: "A laboratory information management system live in production on our own Processious platform — verifiable on the lab's live site."
order: 10
caseStatus: "In production"
client: "Chemo Test Laboratory"
industry: "Analytical testing laboratory"
services: ["Enterprise software engineering", "Process automation (Processious)"]
tech: ["Processious", "Go", "MongoDB", "React", "AWS"]
image: ""
---

# Chemo Test Laboratory — a LIMS in production on Processious

**Status: In production**

Chemo Test Laboratory runs its sample workflow on a laboratory information management
system we built on our own Processious platform. It is live today, and the relationship
is still growing.

---

## The situation

Chemo Test Laboratory is an analytical testing laboratory — 35 years in the field,
accredited by NABL, the US FDA and ISO 9001:2015, testing for pharma, cosmetics, food,
agri, packaging and medical-device clients. A lab like that lives by its samples: every
one has to move through intake, review, testing, authorization and signing, and every
report it issues carries real regulatory weight.

They came to ManiarTech and asked for a system built to that standard — one where staff
can see exactly where every sample stands, and where a finished report reaches only the
person it was meant for.

## What we built

We built Chemo's laboratory management system on **Processious**, our process-automation
platform. It covers the full sample lifecycle a testing lab runs on — intake through
testing, authorization, and secure dispatch:

- **LIMS** — every sample tracked from inward through admin and technical review,
  approval, entry, authorization, in-lab analysis, checking, multi-step signing, and
  report dispatch. The centrepiece is a workflow view that shows the live state of every
  sample's analysis at a glance: a staged timeline, each step stamped with who handled it
  and when, plus a per-sample progress indicator. Open it and you know where every sample
  stands.
- **Accounts, Customers, and Membership** modules, integrated into the same platform.
- A **custom reporting engine** that produces the lab's certificates and reports.
- A **customer portal** where the lab's own end-users log in to pull their billing and
  reports on demand.

It runs on **Go, MongoDB and React**, hosted on **AWS**. Inventory and Dashboard modules
are next.

`[scrubbed Sample Workflow Detail screenshot — Aamir to supply]`

### Security depth: a report delivered to exactly one person

A Chemo report isn't a single page — it's a **bundle** carrying all the collected and
generated artifacts and data. The delivery is built so that bundle reaches only the right
person and no one else:

- An authorized sender dispatches a report, and only the recipient the customer has
  authorized can receive it.
- That recipient gets a link, but clicking it isn't enough: they must enter
  report-specific details (the COA, and so on), and only then does the system send a
  **one-time password — to the authorized user alone.**
- Forward that link to anyone else and it simply fails. The bundle is recipient-bound,
  OTP-gated, and share-proof.

We also built Chemo's **public website** — chemotestlaboratory.com — on our **Taj Mahal
SSG** framework. So their digital stack, inside and out, runs on technology we make.

## Where it stands — and verify it yourself

The system is in production now, running real analytical work. Two parts of it are public
and you can check them yourself:

- **chemotestlaboratory.com** — Chemo's website, built on our Taj Mahal SSG. Its footer
  reads **"Powered by ManiarTech."**
- **reports.chemotestlaboratory.com** — the report checker, where anyone (customer or
  not) can enter a report's COA number and confirm it's genuine. For an accredited lab
  whose certificates carry real weight, that anti-forgery check is part of the system we
  built.

## Why it matters

The origin says more than any metric could. Some of the people who chose us had used a
lab system we built years earlier — including a director — and sought ManiarTech out at
their new laboratory, insisting they wanted us specifically. When we proposed building on
Processious, which we were still maturing, they waited about a year for it.

A 35-year, NABL / US-FDA / ISO-accredited lab now runs its daily work on what we built.
That's the endorsement.

---

**Estimate Your Project →** · **Talk to a human**

---

`[note] Scrubbed / gated from the source dossier:
- Real customer names from the source screenshots — NOT included (scrubbed).
- Staff usernames and any real per-step "stamped by user" data — NOT included.
- The reference-only screenshots carrying real June-2026 production data (75 samples,
  real customers/staff) — NOT used. The single screenshot slot is a placeholder for a
  separate scrubbed/demo asset Aamir will supply.
- The referring individuals (incl. the director) — referenced by role only, never named,
  per the established precedent.
- No invented metrics: samples/month, user counts, turnaround, and number of labs live
  are all omitted because there is no public-safe figure. `[verify — Aamir]` if a quote
  from the director or any honest metric becomes available — a client quote is the
  highest-value addition here.
- Processious framing kept public: named only as "Processious," with no version numbers
  or internal maturity state.
- Confidential dossier notes (placement strategy, launch-blocker references) — NOT
  copied.`
