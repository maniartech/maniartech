---
title: "Chemo Test Laboratory — a LIMS in production on Processious"
description: "A laboratory information management system live in production on our own Processious platform — verifiable on the lab's live site."
caseStatus: "In production"
client: "Chemo Test Laboratory"
services: "LIMS · Process automation (Processious)"
tech: "Processious · Go · MongoDB · React · AWS"
order: 1
proof:
  - { label: "chemotestlaboratory.com", url: "https://www.chemotestlaboratory.com" }
  - { label: "reports.chemotestlaboratory.com", url: "https://reports.chemotestlaboratory.com" }
---

Chemo Test Laboratory runs its sample workflow on a laboratory information management system we built on our own Processious platform. It is live today, and the relationship is still growing.

## The situation

Chemo Test Laboratory is an analytical testing laboratory — 35 years in the field, accredited by NABL, the US FDA and ISO 9001:2015, testing for pharma, cosmetics, food, agri, packaging and medical-device clients. A lab like that lives by its samples: every one has to move through intake, review, testing, authorization and signing, and every report it issues carries real regulatory weight.

They came to ManiarTech and asked for a system built to that standard — one where staff can see exactly where every sample stands, and where a finished report reaches only the person it was meant for.

## What we built

We built Chemo's laboratory management system on **Processious**, our process-automation platform. It covers the full sample lifecycle a testing lab runs on — intake through testing, authorization, and secure dispatch:

- **LIMS** — every sample tracked from inward through admin and technical review, approval, entry, authorization, in-lab analysis, checking, multi-step signing, and report dispatch. The centrepiece is a workflow view that shows the live state of every sample's analysis at a glance: a staged timeline, each step stamped with who handled it and when, plus a per-sample progress indicator. Open it and you know where every sample stands.
- **Accounts, Customers, and Membership** modules, integrated into the same platform.
- A **custom reporting engine** that produces the lab's certificates and reports.
- A **customer portal** where the lab's own end-users log in to pull their billing and reports on demand.

It runs on **Go, MongoDB and React**, hosted on **AWS**. Inventory and Dashboard modules are next.

### Security depth: a report delivered to exactly one person

A Chemo report isn't a single page — it's a **bundle** carrying all the collected and generated artifacts and data. The delivery is built so that bundle reaches only the right person and no one else:

- An authorized sender dispatches a report, and only the recipient the customer has authorized can receive it.
- That recipient gets a link, but clicking it isn't enough: they must enter report-specific details (the COA, and so on), and only then does the system send a **one-time password — to the authorized user alone.**
- Forward that link to anyone else and it simply fails. The bundle is recipient-bound, OTP-gated, and share-proof.

We also built Chemo's **public website** — chemotestlaboratory.com — on our **Taj Mahal SSG** framework. So their digital stack, inside and out, runs on technology we make.

## Where it stands — and verify it yourself

The system is in production now, running real analytical work. Two parts of it are public and you can check them yourself:

- **[chemotestlaboratory.com](https://www.chemotestlaboratory.com)** — Chemo's website, built on our Taj Mahal SSG. Its footer reads **"Powered by ManiarTech."**
- **[reports.chemotestlaboratory.com](https://reports.chemotestlaboratory.com)** — the report checker, where anyone (customer or not) can enter a report's COA number and confirm it's genuine. For an accredited lab whose certificates carry real weight, that anti-forgery check is part of the system we built.

## Why it matters

The origin says more than any metric could. Some of the people who chose us had used a lab system we built years earlier — including a director — and sought ManiarTech out at their new laboratory, insisting they wanted us specifically. When we proposed building on Processious, which we were still maturing, they waited about a year for it.

A 35-year, NABL / US-FDA / ISO-accredited lab now runs its daily work on what we built. That's the endorsement.


[Estimate Your Project →](/estimate/) · [Talk to a human →](/contact/)
