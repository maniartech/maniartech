# Case study — RTL Test Management System, Reliable Analytical Laboratories (Draft v1, 2026-06)

> Second case study, from Aamir's narrative (2026-06). ★ THE ANCHOR / LEAD case study: a **living,
> named** engagement with **visual proof** (a real screenshot) and a showpiece metric (**600+ forms →
> one workflow screen**), **still running robustly in 2026 — ~15 years on.** Per CASE-STUDY-TEMPLATE
> this LEADS the case-studies section (Content Engine = supporting depth behind it). Also a flagship
> proof for **Legacy Modernization** capability + **Enterprise Software Engineering**, and the single
> strongest answer to the "can they ship something solid that LASTS?" trust fear. Every claim TRUE +
> SOURCED (Governing Rule #1); secondhand facts hedged.

---

## PART A — Intake (captured from Aamir, compaction-safe)
- **Client:** **Reliable Analytical Laboratories (RTL)** — a prominent analytical lab in **Mumbai**.
  (⚠️ Aamir is NOT in contact with RTL now. Naming stance: OK to name as long as presented respectfully
  / not maligned — doesn't feel consent is needed. See naming caveats in the notes.)
- **Origin:** the lab's own team had built the original record-tracking system in-house in **MS Access**
  (their coordinator was a capable half-developer). The brief = modernize that internal system.
  `[Aamir 2026-06: company name OK; do NOT name the individual.]`
- **Era:** ~2011. ManiarTech engaged ~**2+ years**.
- **Domain / scale:** the lab runs **thousands of tests, grouped by series**, each with **many
  parameters** to test per requirements. Legacy MS Access app = **600+ forms**, ~that many reports +
  many data tables. **Complex workflows:** sample received → record created (login) → lab accepts →
  analysis → review cycle → signature(s) → dispatch. Plus invoicing/accounts.
- **Problem:** the MS Access version was **way too complicated** (user-flow + training) **and extremely
  slow.**
- **What we did:** modernized on **WPF (.NET)** AND **streamlined everything** —
  - **600+ forms and reports → ONE form + ONE report.** (★ the showpiece metric.)
  - **workflow-oriented UI** — "you immediately know where things are / what's happening with the
    sample" (status board: created · in lab · analysis complete · checked · signed 1 · signed 2 ·
    report disp. · invoice auth. · invoice disp. — see screenshot).
  - **role/permission-based ACL** — who can access which feature / who's allowed what.
  - **notifications + requisitions** → simpler.
  - **Dark UI in 2011** (ahead of its time) → stress-free long working hours.
  - **integrated the Accounts/invoicing system** into the same app.
  - **reporting engine on XPS** (.NET built-in) → excellent-quality reports, **label printing**, more.
  - **Phase 2 (later):** also built a **web version** (.NET / **ASPX**) so RTL's CUSTOMERS could
    **download their analytical reports directly from RTL's website** — a customer-facing self-service
    report portal. = an expanded engagement (the lab came back for more).
- **Outcome / longevity:** "amazing experience"; engaged ~2+ years. **By the lab's account (old staff),
  the app is STILL in production in 2026 — ~15 years on — running robustly** (they've made some of
  their own modifications since). `[SECONDHAND + Aamir now OUT OF CONTACT → state as "by the lab's
  account / we understand it's still in use"; can't firm it up; keep hedged.]`
- **Real-world visibility:** RTL is prominent enough that its analytical-assurance marks/reports are
  seen around the city (malls, restaurants, etc.) — context for the client's standing.
- **Visual proof:** ✅ Aamir provided a **screenshot** (the "Samples and Testing" status board — dark
  workflow UI + right-side action panel). `[use WITH RTL's OK; shown sample refs look like
  test/demo data + "All Customers" — confirm no real customer data before publishing.]`

`[OPEN for Aamir (none required): (1) NAMING decided 2026-06 — COMPANY name RTL = OK; the individual
(coordinator) must NOT be named (done). Screenshot OK to show; title bar names RTL — consistent. (2)
"still running in 2026" stays hedged (out of contact). (3) any hard before→after (training time, speed)
if recalled — honest only, never invented.]`

---

## PART B — The case-study page (draft)

---
title: "Reliable Analytical Laboratories: 600 forms became one — and it's still running 15 years on"
client: "Reliable Analytical Laboratories (RTL), Mumbai"
industry: "Analytical testing laboratory"
services: ["Legacy modernization", "Enterprise software engineering", "Web portal development"]
tech: ["C# / WPF (.NET)", "ASP.NET (ASPX) web portal", "XPS reporting", "role-based access control"]
duration: "~2011, ~2+ year engagement · in production 15+ years"
status: "case-study"
---

# 600 forms became one — and the system is still running the lab 15 years later

> A sprawling, slow MS Access system rebuilt into a single workflow-oriented application that the lab
> still runs today.

> **Client:** Reliable Analytical Laboratories (RTL), a prominent Mumbai analytical lab ·
> **Work:** legacy modernization — MS Access → WPF/.NET, end-to-end lab workflow, role-based access,
> integrated accounts, XPS reporting · **When:** ~2011 · **Result:** **600+ forms and reports
> consolidated into one workflow screen and one report** — and, by the lab's account, **still in
> production in 2026.**

## The client
Reliable Analytical Laboratories is one of Mumbai's prominent analytical testing labs — the kind whose
assurance marks you'll spot on products and at venues across the city. They run **thousands of tests,
grouped in series, each with many parameters**, through a genuinely complex pipeline.

## The challenge
The lab had built its own test-tracking system in-house, in **Microsoft Access** — and over years of
growth it had expanded to **600+ forms**, about as many reports, and a sprawl of data tables, wrapped
around genuinely complex laboratory workflow: a sample is received, logged, accepted by the lab,
analysed, reviewed, signed off (more than once), then dispatched and invoiced. It captured a great
deal — but it had outgrown the tool it was built in: hard to learn and to train new staff on, and slow
under its own weight.

Notably, the original system had been built in-house by the lab's own team. So this wasn't "replace a
vendor" — it was take a deeply-understood internal system and make it **fast, learnable, and built to
last.** We worked hand in hand with the people who knew every workflow in it.

## Our approach
We rebuilt the system on **WPF (.NET)** — but the real work wasn't porting, it was **streamlining.**

- **600+ forms and reports → one.** We replaced the entire form sprawl with a **single,
  workflow-oriented screen** and a single report. The UI is organised around the *sample's journey*:
  open it and you see, at a glance, exactly where every sample is and what's happening to it —
  created, in lab, analysis complete, checked, signed, report dispatched, invoiced.
- **Role-based access (ACL).** Who can check, who can sign, who can authorise an invoice — access is
  governed by role, so the right people do the right steps.
- **Less friction.** Built-in notifications and requisitions removed the manual chasing the old system
  forced on people.
- **A dark UI — in 2011.** We built it dark a decade before it was fashionable, so analysts could work
  long hours with less eye strain.
- **Beyond the lab workflow.** We integrated the **accounts and invoicing** system into the same
  application, and built a **reporting engine on XPS** (the .NET document technology) that produced
  high-quality reports, **label printing**, and more.

## What we delivered
A single WPF application that runs the lab end to end — sample login, analysis, multi-step review and
signing, dispatch, and invoicing — with role-based access, notifications, integrated accounts, and an
XPS-based reporting and label engine.

Later, we extended the system to the web: a **.NET (ASP.NET) customer portal** that let the lab's own
clients **download their analytical reports directly from RTL's website** — turning report delivery
into self-service.

`[IMAGE — the "Samples and Testing" status board screenshot (provided by Aamir). Use with RTL's OK;
confirm no real customer data is shown.]`

## The results
- **600+ forms and reports → one workflow screen and one report.**
- A system **far faster and far easier to learn and use** than the MS Access original.
- The **whole lab plus its accounting** in one role-governed application.
- The lab later **came back to extend the system to the web** — a customer report-download portal — and
  kept running the core for years after.
- **Still running the lab in 2026** — around fifteen years on (with the lab's own later modifications),
  by the lab's account. `[secondhand; Aamir out of contact → keep "by the lab's account / we understand",
  can't state it more firmly.]`

`[No named client quote — Aamir is out of contact and the individual is not to be named. The screenshot
+ the 15-year run + the 600→1 metric carry the page; publish without a quote. Do NOT fabricate one.]`

## Why it matters
The best test of how software is built is how long it keeps working. This system has run a busy
analytical lab — through real workflows, real audits, real daily load — for **fifteen years.** That's
not a screenshot of a demo; it's the kind of solid, maintainable engineering that's still doing its job
long after most software would have been replaced.

**Have a system like this?** [Estimate your project →](/estimate/) · [Talk to us →](/contact/)

---

## Placement / usage notes
- **★ LEAD case study** — living, named, visual proof, a showpiece metric, and unmatched longevity.
  Anchor the case-studies section with this; Content Engine sits behind it as depth.
- **Also a flagship proof for:** Legacy Modernization capability (MS Access → modern, streamlined);
  Enterprise Software Engineering; and the **"can they ship something solid that LASTS?"** trust fear —
  a 15-year production run is the single strongest answer on the whole site.
- **Home proof strip:** "600 forms → 1 · still running 15 years later" is a perfect headline result.
- **Honesty guardrails:** "still running in 2026" is by the lab's account (secondhand) → hedged; Aamir
  is now OUT OF CONTACT, so it can't be firmed up. **NAMING:** Aamir's stance = OK to name without
  consent IF respectful/non-maligning. Caveats flagged: he can't manage an objection (out of contact);
  the screenshot title bar itself names RTL; the old-system framing must CREDIT not criticize (reframed
  accordingly). Conservative alt = anonymize ("a prominent Mumbai analytical laboratory") + scrub the
  screenshot title bar — loses little. No invented before→after numbers; "prominent / marks seen across the city" kept as light context, not a hard claim. Dark-UI-in-
  2011 is a true, tasteful "ahead of its time" detail (parallels Content Engine's pre-GenAI NLP — a
  pattern worth noting across the section: ManiarTech keeps building ahead of the curve).
