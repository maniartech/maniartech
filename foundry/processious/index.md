---
title: "Processious"
headline: "A workflow is not automated until invalid transitions are impossible."
description: "Our process-automation platform: explicit states, role-gated transitions and audit evidence - in production, carrying a client laboratory's operations."
eyebrow: "Product"
titleTag: "Processious - Process Automation Platform"
seoDescription: "Processious: explicit states, role-gated transitions and audit evidence - in production, running a client laboratory's operations."
order: 1
tocDepth: "3"
statusLine: "In production | Client-carrying | Private | Commercial engagement"
artifacts:
  - label: "The system it carries: Chemo case study"
    url: "/case-studies/chemo/"
    primary: true
  - label: "Verify a live output"
    url: "https://reports.chemotestlaboratory.com"
railMeta:
  - { k: "Type", v: "Process-automation and application platform" }
  - { k: "Maturity", v: "Client production - carries a live laboratory system" }
  - { k: "Availability", v: "Private; delivered through commercial engagements" }
  - { k: "Licence", v: "Proprietary" }
  - { k: "Adoption", v: "Via an engagement, not a download" }
  - { k: "Evidence", v: "An accredited laboratory's operations run on it daily" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Chemo Test Laboratory case study"
    note: "The full story of the system Processious carries"
    url: "/case-studies/chemo/"
  - label: "reports.chemotestlaboratory.com"
    note: "Public report verification - a live output of the platform"
    url: "https://reports.chemotestlaboratory.com"
  - label: "Enterprise Systems Engineering"
    note: "The practice this platform is the substrate for"
    url: "/services/enterprise-software-engineering/"
privateReview: "The platform is private and its client deployment is confidential. Qualified customers can request an architecture and operating walkthrough; a sanitized interface tour is available in conversation."
---

**A business process is a state machine with permissions** - and the platform's job is to make illegal transitions impossible, not merely discouraged.

## States, roles, transitions, evidence

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A state machine of a laboratory sample lifecycle: intake, review, testing, authorization and signed states connected by permitted transitions; a technician's attempt to jump from testing straight to signed is rejected because that transition requires the authorizer role; every permitted transition writes an audit record of who, what and when">
  <g font-family="inherit" font-size="12">
    <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)" stroke-width="1.2">
      <rect x="30"  y="60" width="110" height="42" rx="8"/>
      <rect x="180" y="60" width="110" height="42" rx="8"/>
      <rect x="330" y="60" width="110" height="42" rx="8"/>
      <rect x="480" y="60" width="120" height="42" rx="8"/>
    </g>
    <rect x="640" y="60" width="90" height="42" rx="8" fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
    <g text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">
      <text x="85"  y="85">intake</text>
      <text x="235" y="85">review</text>
      <text x="385" y="85">testing</text>
      <text x="540" y="85">authorization</text>
    </g>
    <text x="685" y="85" text-anchor="middle" fill="#14cf93" font-weight="600">signed</text>
    <g stroke="rgba(20,207,147,.55)" stroke-width="1.5">
      <line x1="140" y1="81" x2="178" y2="81"/><line x1="290" y1="81" x2="328" y2="81"/>
      <line x1="440" y1="81" x2="478" y2="81"/><line x1="600" y1="81" x2="638" y2="81"/>
    </g>
    <g text-anchor="middle" font-size="10" fill="rgba(255,255,255,.45)">
      <text x="159" y="72">clerk</text><text x="309" y="72">reviewer</text>
      <text x="459" y="72">technician</text><text x="619" y="72">authorizer</text>
    </g>
    <path d="M385 102 C 430 190, 560 190, 668 104" stroke="rgba(240,90,90,.6)" stroke-width="1.5" fill="none" stroke-dasharray="5 4"/>
    <rect x="410" y="160" width="230" height="46" rx="8" fill="rgba(240,90,90,.1)" stroke="rgba(240,90,90,.55)"/>
    <text x="525" y="179" text-anchor="middle" fill="rgba(240,90,90,.85)" font-weight="600">REJECTED: testing -&gt; signed</text>
    <text x="525" y="196" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">requires the authorizer role - the platform refuses, not a policy document</text>
    <rect x="30" y="240" width="700" height="52" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)"/>
    <text x="380" y="261" text-anchor="middle" fill="rgba(255,255,255,.75)" font-weight="600">audit record - written by the transition itself</text>
    <text x="380" y="280" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5" font-family="Consolas, monospace">who (role + user) | what (from-state -&gt; to-state) | when | on which record</text>
    <text x="380" y="318" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">The record of what happened is a side effect of the machine, not a diary someone remembers to keep.</text>
  </g>
</svg>
<figcaption><strong>The rejection is the feature.</strong> Each transition names the roles permitted to make it; an attempt outside those roles is refused by the platform, and every permitted transition writes its own audit record. The stages shown are the real production workflow's, as published in the case study; the rules illustrated are the platform's operating model, not client data.</figcaption>
</figure>

The exhibit above is the platform's operating model, shown on the workflow it actually carries in production - a testing laboratory's sample lifecycle, whose stages are public in [the case study](/case-studies/chemo/): intake, review, testing, authorization, signing. Most workflow tools automate the happy path and leave the rules in people's heads; when an auditor asks who approved a record and under what authority, the answer is a shrug and a spreadsheet. Processious exists to make that question boring.

## In production, verifiable from outside

Processious carries the operations of **Chemo Test Laboratory** - a 35-year, NABL-accredited analytical testing laboratory - as its production deployment. Two things about that are checkable without trusting us:

- **The case study** ([/case-studies/chemo/](/case-studies/chemo/)) describes the system, its controls, and the delivery.
- **A live output**: [reports.chemotestlaboratory.com](https://reports.chemotestlaboratory.com) authenticates a report by its COA number - report delivery bound to the authorized recipient is a platform control you can watch working from the public side.

The client's data and the deployment's internals are confidential and stay out of this page; a sanitized interface tour is available in conversation.

## What the platform provides

- **Workflow and state model** - processes defined as states and transitions, with the legal moves explicit.
- **Role-based controls** - who may act is part of the process definition, enforced at the transition.
- **Auditability** - the who/what/when record produced by the machine itself, because regulated operations are judged on their records.
- **Line-of-business applications** - the screens, data and rules around the workflow, built on mainstream technology a client's own team can maintain.
- **Integration boundaries** - the platform is a substrate that connects to what a business already runs, not a silo that replaces it.

[Ordin](/products/ordin/), our workflow engine in development, is being built as the automation core behind this platform - long-running, scheduled and event-driven work runs through it.

## Known limits

- **Private, and delivered through engagements.** There is no download, trial or self-serve tier; adopting Processious means engaging us to build on it.
- **One production deployment is claimed** - the laboratory system above. We do not claim a customer fleet, and the platform's evidence is exactly as deep as that deployment.
- **Interface screenshots are pending approval.** A masked interface tour will join this page once captures are approved for publication; until then the case study and the live verifier are the visible evidence.

## Status: four facts, kept separate

- **Availability** - private; commercial engagement only.
- **Licence** - proprietary.
- **Maturity** - **client production**: a live accredited laboratory runs on it.
- **Adoption** - through an engagement. The technology underneath is mainstream, so a client team can maintain what we build on it.

## What this demonstrates

Building this platform required deciding where state lives, which transitions are legal, who may act, and what evidence survives - and then making the software enforce those answers under a regulator's gaze. That is precisely the discipline of our [Enterprise Systems Engineering](/services/enterprise-software-engineering/) practice, and Processious is where it was proven on our own account before being applied to anyone else's.
