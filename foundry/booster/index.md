---
title: "Booster"
headline: "One configuration, the whole stack, every machine."
description: "Our dev-environment orchestrator: a single declarative configuration describes a project's complete local stack - services, data stores, dependencies - and Booster brings it up the same way on every engineer's machine."
eyebrow: "Developer tool"
titleTag: "Booster - Dev-Environment Orchestrator"
seoDescription: "Booster: one declarative configuration brings up a project's whole local stack consistently. Private; production-dogfooded internally."
order: 8
tocDepth: "3"
statusLine: "Internal | Production-dogfooded | Private | Proprietary"
railMeta:
  - { k: "Type", v: "Developer tool - environment orchestrator" }
  - { k: "Maturity", v: "Production-dogfooded across our own projects" }
  - { k: "Availability", v: "Private" }
  - { k: "Licence", v: "Proprietary; none published" }
  - { k: "Adoption", v: "Not externally available" }
  - { k: "Evidence", v: "Runs the local stacks of ManiarTech's own product development" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Enterprise DAM"
    note: "One of the products whose development stack Booster runs"
    url: "/products/tallery-gallery/"
  - label: "How we work"
    note: "The delivery process this tooling exists to serve"
    url: "/how-we-work/"
privateReview: "Booster is a proprietary internal tool; its source and configuration format are confidential. Qualified customers can request a walkthrough of the orchestration model and how it shapes our delivery consistency."
---

Every multi-service project has a day-one problem: a new machine needs the database, the object store, the cache, the search service and three applications running in the right order with the right wiring before anyone writes a line of code. Most teams solve it with a README of setup steps that rots, or a pile of shell scripts nobody owns. Booster is our answer: **the environment is described once, declaratively, and brought up the same way everywhere.**

## The model

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Booster's model: one declarative configuration describes services, data stores and dependencies; the orchestrator derives a startup plan, supervises the running processes, and reports state - including failures - back to the engineer">
  <g font-family="inherit" font-size="12">
    <rect x="40" y="40" width="190" height="56" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)"/>
    <text x="135" y="63" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">one configuration</text>
    <text x="135" y="81" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">services, stores, dependencies</text>
    <path d="M230 68 L288 68" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="290" y="40" width="180" height="56" rx="9" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.55)"/>
    <text x="380" y="63" text-anchor="middle" fill="#14cf93" font-weight="600">orchestrator</text>
    <text x="380" y="81" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">derives order, starts, supervises</text>
    <path d="M470 56 L530 42" stroke="rgba(20,207,147,.5)" stroke-width="1.4"/>
    <path d="M470 68 L530 82" stroke="rgba(20,207,147,.5)" stroke-width="1.4"/>
    <path d="M470 80 L530 122" stroke="rgba(20,207,147,.5)" stroke-width="1.4"/>
    <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)">
      <rect x="532" y="26" width="188" height="32" rx="6"/>
      <rect x="532" y="66" width="188" height="32" rx="6"/>
      <rect x="532" y="106" width="188" height="32" rx="6"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.72)" font-size="11.5">
      <text x="626" y="46">data stores + object storage</text>
      <text x="626" y="86">application services</text>
      <text x="626" y="126">workers + supporting tools</text>
    </g>
    <rect x="290" y="150" width="180" height="52" rx="9" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.5)"/>
    <text x="380" y="172" text-anchor="middle" fill="rgba(255,200,120,.85)" font-weight="600">failure is a state</text>
    <text x="380" y="190" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">a service that dies is reported, not silent</text>
    <path d="M380 148 L380 96" stroke="rgba(255,200,120,.5)" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="380" y="232" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">Same configuration, same result - a new machine is productive in the time it takes to run one command.</text>
  </g>
</svg>
<figcaption><strong>Declare, derive, supervise.</strong> The engineer maintains a description of the stack, not a procedure for assembling it. Startup order is derived from dependencies; running processes are supervised; a failure is a reported state, not a silent absence. The schematic is illustrative - the configuration format itself is confidential.</figcaption>
</figure>

## Evidence, scoped to what we can show

Booster is proprietary and its source and configuration format are confidential, so this page does not print them. What it can say plainly:

- **It runs our own product development.** The local stacks behind our products - including [Enterprise DAM](/products/tallery-gallery/), whose backend, database, object storage, cache and search service come up under Booster - are orchestrated by it daily.
- **It is dogfooding, not a demo.** The tool exists because our own multi-service projects punished manual setup; it earns its keep every time a machine is rebuilt or a new engineer joins.

We deliberately make no time-savings claim with a number on it, because we have not measured one. What we can say plainly is that environment setup stopped being a task we think about.

## Known limits

- **Private and proprietary.** No source, package or configuration reference is published, and none of it is available for adoption.
- **Internal scope.** Booster orchestrates local development stacks; it is not a production deployment or container-orchestration system, and we do not present it as one.
- **The exhibit above is a schematic**, labelled as such - not a rendering of the confidential configuration format.

## Status: four facts, kept separate

- **Availability** - **private.**
- **Licence** - proprietary; none published.
- **Maturity** - **production-dogfooded** across ManiarTech's own projects.
- **Adoption** - not externally available. Qualified customers can request a walkthrough of the orchestration model.

## What this demonstrates

Tooling is a mirror of a team's discipline: we would rather encode an environment once, declaratively, than document a procedure and hope. The same instinct - make the machine hold the invariant, not the engineer's memory - is what we bring to a customer's build pipelines, environments and onboarding when consistency across machines and people is the actual requirement.
