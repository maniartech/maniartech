---
title: "Building software for testing laboratories: lessons from 15 years of LIMS work"
description: "What two real laboratory systems - one running since 2011, one live in production today - taught us about sample workflows, review chains, report integrity, and software that labs actually keep using."
date: "2026-07-22"
order: 5
---

Laboratory software is a niche with an unforgiving audience. A testing laboratory lives and dies by the integrity of its results: samples must be traceable, reviews must be enforced, reports must be tamper-proof, and the whole chain must survive an auditor's visit. Software that merely *mostly* works is not an option in a business whose product is trust.

We have built laboratory information management systems (LIMS) across a span most vendors cannot show: a system we delivered in 2011 that, by the lab's account, is still in daily use about 15 years later - and a complete laboratory platform running in production for an accredited testing laboratory today. Same domain, a decade apart. This post is what the two of them taught us.

## Lesson 1: The workflow IS the product

The 2011 engagement began with a sprawling legacy system - **600+ Microsoft Access forms and reports** accumulated over years of patching. Staff navigated forms; nobody could see the state of the lab.

What we shipped replaced that sprawl with essentially **one workflow-driven screen**: open it, and you know exactly where every sample stands - what has arrived, what is under test, what awaits review, what is ready to dispatch. Every action available exactly where the sample's state makes it relevant.

That compression - hundreds of forms into one living view - is the whole discipline of laboratory software in miniature. A lab is not a collection of data entry tasks; it is a pipeline of samples moving through states. Software that models the states, and makes them visible at a glance, gets adopted. Software that models the forms gets worked around.

The proof of the lesson is longevity: systems survive 15 years when they match how the work actually flows, because nobody has a reason to replace them.

## Lesson 2: The review chain is sacred - build it as enforcement, not decoration

An accredited laboratory's credibility rests on a simple rule: results are not results until the right people have reviewed and authorized them, in order. In the platform we run in production today, that chain is structural - **sample intake, multi-stage technical review, authorization, and only then report release**. A result physically cannot skip a stage, because the software will not construct a releasable report from an unauthorized result.

The design principle generalizes far beyond labs: when a process step exists to protect integrity, implement it as something the system *enforces*, not something it *displays*. Checkboxes get checked; state machines get obeyed. Auditors know the difference, and so do the failures.

## Lesson 3: A report is a promise - engineer its integrity end to end

A test report leaves the lab and enters the world, where the lab can no longer defend it. Forwarded PDFs, edited copies, results quoted out of context - every lab knows these risks.

For the current platform we engineered report delivery as a chain of custody: reports are **recipient-bound, gated on authorization, and delivered through one-time-password verification to the authorized recipient only** - a forwarded link fails, by design. Alongside it runs a **public report-authenticity checker**, where anyone holding a report can verify it is genuine ([reports.chemotestlaboratory.com](https://reports.chemotestlaboratory.com) - live, try it).

The lesson: in any domain where a document carries authority - certificates, approvals, compliance attestations - delivery and verifiability are not features bolted on after the "real" system. They are the point.

## Lesson 4: Compliance-adjacent software must be built compliance-shaped

Testing laboratories operate under accreditation regimes with real teeth - the lab we serve today holds NABL accreditation among others, and its systems must not undermine what its auditors certify. That shapes engineering choices from day one: role-based access as architecture, audit-friendly histories of who did what and when, and records that stay defensible years later.

Our own house discipline pulls in the same direction - we run an ISO 9001 and ISO 27001 certified process - and the fit matters: a vendor whose *own* work runs on documented process finds it natural to build systems that will face an auditor. A vendor who treats process as decoration builds software the same way.

## Lesson 5: Longevity is a design decision

The strongest validation we ever received cost nothing and took a decade to arrive: people who had used the 2011 system later **sought us out and waited for our availability** to build their own lab's platform. Software that users recommend a decade later is the only marketing a niche like this respects.

The ingredients are unglamorous: mainstream technology the lab can keep running, honest scoping, a workflow-first design that stays comprehensible, and root-cause fixes so the system gets more stable over its life rather than less. Longevity is not luck; it is a stack of small refusals to be clever.

## What we would tell a laboratory director evaluating software

- Ask any vendor to show you the **sample lifecycle** in their design before they show you screens. If they start with screens, the workflow is an afterthought.
- Ask how the review chain is **enforced** - and what, exactly, prevents an unauthorized result from reaching a report.
- Ask how a report is protected **after it leaves** - delivery, verification, revocation.
- Ask what happens at your **next audit** - where the histories live and how they are produced.
- And ask who will maintain the system in year five. If the answer requires the original vendor to still like you, the stack is wrong.

We build laboratory and operations systems as part of our [enterprise software engineering](/services/enterprise-software-engineering/) work - the full stories are in the [Reliable Analytical Laboratories](/case-studies/rtl/) and [Chemo Test Laboratory](/case-studies/chemo/) case studies. If your lab is outgrowing its current system, [tell us what you are running](/estimate/) - a senior engineer replies within one business day with an honest take, including whether you need new software at all.
