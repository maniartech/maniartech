---
audience: "enterprise"
contentType: "field-report"
evidenceType: "Production field evidence"
artifactLabel: "Public report checker"
artifactUrl: "https://reports.chemotestlaboratory.com"
authorUrl: "https://www.linkedin.com/in/aamironline"
author: "Aamir Maniar"
authorRole: "Managing Director & Engineering Head"
title: "Building software for testing laboratories: lessons from 15 years of LIMS work"
description: "What two real laboratory systems - one running since 2011, one live in production today - taught us about sample workflows, review chains, report integrity, and software that labs actually keep using."
date: "2026-07-22"
titleTag: "Laboratory Software - 15 Years of LIMS Lessons"
seoDescription: "What ~15 years of laboratory systems taught us about sample lifecycles, review chains, report integrity and why some LIMS software lasts."
thread: "domains"
shortTitle: "15 years of LIMS"
receipts:
  - "LIMS"
  - "since 2011"
keyReceipt: "two real systems"
heroProof: "~15 years"
heroProofNote: "one laboratory system, still in daily service"
---

Laboratory software is a niche with an unforgiving audience. A testing laboratory lives and dies by the integrity of its results: samples must be traceable, reviews must be enforced, reports must be tamper-proof, and the whole chain must survive an auditor's visit. Software that merely *mostly* works is not an option in a business whose product is trust.

We have built laboratory information management systems (LIMS) across a span most vendors cannot show: a system we delivered in 2011 that, by the lab's account, is still in daily use about 15 years later - and a complete laboratory platform running in production for an accredited testing laboratory today. Same domain, a decade apart. This post is what the two of them taught us.

## Lesson 1: The sample lifecycle IS the product

The 2011 engagement began with a sprawling legacy system - **600+ Microsoft Access forms and reports** accumulated over years of patching. The lab ran thousands of tests, grouped in series, each with many parameters, through a genuinely complex pipeline: a sample is received, logged, accepted by the lab, analysed, reviewed, signed off more than once, then dispatched and invoiced. The Access system captured all of it - and buried it. Staff navigated forms; nobody could see the state of the lab.

What we shipped replaced that sprawl with essentially **one workflow-driven screen**: open it, and you know exactly where every sample stands - created, in lab, analysis complete, checked, signed, report dispatched, invoiced. Every action available exactly where the sample's state makes it relevant.

That compression - hundreds of forms into one living view - is the whole discipline of laboratory software in miniature. A lab is not a collection of data entry tasks; it is a pipeline of samples moving through states. Software that models the states, and makes them visible at a glance, gets adopted. Software that models the forms gets worked around.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A laboratory sample's lifecycle as a staged rail: Received, In Lab, Analysis, Checked, Signed, Dispatched, Invoiced - with review gates marked between analysis, checking and signing">
  <g font-family="inherit" font-size="12">
    <line x1="50" y1="70" x2="710" y2="70" stroke="rgba(255,255,255,.22)" stroke-width="2"/>
    <g fill="#14cf93">
      <circle cx="60" cy="70" r="7"/><circle cx="165" cy="70" r="7"/><circle cx="270" cy="70" r="7"/>
    </g>
    <g fill="rgba(20,207,147,.5)" stroke="#14cf93" stroke-width="1.5">
      <circle cx="375" cy="70" r="7"/><circle cx="480" cy="70" r="7"/>
    </g>
    <g fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.45)" stroke-width="1.5">
      <circle cx="585" cy="70" r="7"/><circle cx="690" cy="70" r="7"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)">
      <text x="60" y="45">Received</text><text x="165" y="45">In Lab</text><text x="270" y="45">Analysis</text>
      <text x="375" y="45">Checked</text><text x="480" y="45">Signed</text>
      <text x="585" y="45">Dispatched</text><text x="690" y="45">Invoiced</text>
    </g>
    <g stroke="rgba(240,200,90,.6)" stroke-width="1.2" stroke-dasharray="3 4">
      <line x1="322" y1="52" x2="322" y2="90"/><line x1="427" y1="52" x2="427" y2="90"/>
    </g>
    <g text-anchor="middle" fill="rgba(240,200,90,.75)" font-size="10.5">
      <text x="322" y="106">review gate</text><text x="427" y="106">sign-off gate</text>
    </g>
    <text x="380" y="146" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11.5">Every sample is somewhere on this rail. The software's job is to make that visible in one look - and to enforce the gates.</text>
  </g>
</svg>
<figcaption><strong>The sample lifecycle.</strong> States, not forms. The gates in the middle are where a result becomes a defensible report - they must be enforced by the system, not by habit.</figcaption>
</figure>

The proof of the lesson is longevity: systems survive 15 years when they match how the work actually flows, because nobody has a reason to replace them. A decade later, when we built our second laboratory platform, we kept the same workflow-at-a-glance DNA - a staged timeline for every sample, each step stamped with who did it and when. It is the closest thing we have to a signature.

## What generic tools get wrong about laboratory work

Most labs that come to us are not replacing a LIMS. They are escaping a patchwork - spreadsheets, a generic CRM, shared folders, and a great deal of institutional memory. The patchwork fails in predictable ways, and the failures all trace to one root: **generic tools model records, while a lab runs on states and transitions.**

- A spreadsheet row cannot enforce that analysis happens before checking, or that checking happens before signing. It records what someone typed, in whatever order they typed it.
- Generic permissions govern who can open a document, not who can move a sample from "tests complete" to "authorized" - which is the permission that actually matters to an accreditor.
- Audit history in generic tools is an afterthought: file versions and edit timestamps, not a defensible account of which qualified person approved which result and when.
- And the report - the lab's actual product - leaves as an ordinary attachment, with nothing binding it to the reviewed, authorized data it claims to represent.

None of this is the tools' fault; they were not built for a business whose product is a defensible result. But it explains a pattern we see repeatedly: the lab's throughput grows, the patchwork's error rate grows faster, and the gap gets papered over with the most expensive material available - senior staff attention.

## Lesson 2: The review chain is sacred - build it as enforcement, not decoration

An accredited laboratory's credibility rests on a simple rule: results are not results until the right people have reviewed and authorized them, in order. In the platform we run in production today, that chain is structural - **sample intake, multi-stage technical review, authorization, and only then report release**. A result physically cannot skip a stage, because the software will not construct a releasable report from an unauthorized result.

The design principle generalizes far beyond labs: when a process step exists to protect integrity, implement it as something the system *enforces*, not something it *displays*.

<p class="mt-pull">Checkboxes get checked; <em>state machines get obeyed</em>. Auditors know the difference, and so do the failures.</p>

## Lesson 3: A report is a promise - engineer its integrity end to end

A test report leaves the lab and enters the world, where the lab can no longer defend it. Forwarded PDFs, edited copies, results quoted out of context - every lab knows these risks.

For the current platform we engineered report delivery as a chain of custody: reports are **recipient-bound, gated on authorization, and delivered through one-time-password verification to the authorized recipient only** - a forwarded link fails, by design.

<aside class="mt-callout">
<span class="co-tag">Check it yourself</span>
<p>Alongside the delivery chain runs a public report-authenticity checker, where anyone holding a report can verify it is genuine: <a href="https://reports.chemotestlaboratory.com" target="_blank" rel="noopener">reports.chemotestlaboratory.com</a> - live, try it.</p>
</aside>

The lesson: in any domain where a document carries authority - certificates, approvals, compliance attestations - delivery and verifiability are not features bolted on after the "real" system. They are the point.

## Lesson 4: Compliance-adjacent software must be built compliance-shaped

Testing laboratories operate under accreditation regimes with real teeth - the lab we serve today holds NABL accreditation among others, and its systems must not undermine what its auditors certify. That shapes engineering choices from day one: role-based access as architecture, audit-friendly histories of who did what and when, and records that stay defensible years later.

This was true even in 2011: the system we built then governed every step by role - who can check, who can sign, who can authorize an invoice - because in a lab, "anyone can click it" is not a convenience, it is a finding waiting to happen.

Our own house discipline pulls in the same direction - we run an ISO 9001 and ISO 27001 certified process - and the fit matters: a vendor whose *own* work runs on documented process finds it natural to build systems that will face an auditor. A vendor who treats process as decoration builds software the same way.

## Lesson 5: Longevity is a design decision

The strongest validation we ever received cost nothing and took a decade to arrive: people who had used the 2011 system later **sought us out and waited for our availability** to build their own lab's platform. Software that users recommend a decade later is the only marketing a niche like this respects.

The ingredients are unglamorous: mainstream technology the lab can keep running, honest scoping, a workflow-first design that stays comprehensible, and root-cause fixes so the system gets more stable over its life rather than less. Longevity is not luck; it is a stack of small refusals to be clever.

## What we would tell a laboratory director evaluating LIMS software

- Ask any vendor to show you the **sample lifecycle** in their design before they show you screens. If they start with screens, the workflow is an afterthought.
- Ask how the review chain is **enforced** - and what, exactly, prevents an unauthorized result from reaching a report.
- Ask how a report is protected **after it leaves** - delivery, verification, revocation.
- Ask how **instrument and analysis data enters the system** - captured, or retyped by hand - and what guards against transcription error, because every manual re-entry point is a future nonconformity.
- Ask what happens at your **next audit** - where the histories live and how they are produced.
- And ask who will maintain the system in year five. If the answer requires the original vendor to still like you, the stack is wrong.

We build laboratory and operations systems as part of our [enterprise software engineering](/services/enterprise-software-engineering/) work - the full stories are in the [Reliable Analytical Laboratories](/case-studies/rtl/) and [Chemo Test Laboratory](/case-studies/chemo/) case studies. If your lab is outgrowing its current system, [tell us what you are running](/estimate/) - a senior engineer reviews it and responds with an honest take, including whether you need new software at all.
