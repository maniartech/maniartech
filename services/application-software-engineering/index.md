---
title: "Application and Product Engineering"
headline: "Someone has to be accountable for the architecture in year two. That is the job we take."
description: "A bounded product with a defined domain, a known user population and a lifecycle someone must own - built end to end, or reviewed with a written verdict you keep."
eyebrow: "Engineering practice"
seoDescription: "Custom application development and architecture review: domain boundaries, quality attributes, API contracts, operability and a documented handover."
order: 2
tocDepth: 3
action:
  label: "The decisions this practice owns"
  url: "#the-decisions-we-take-responsibility-for"
factsKicker: "Up front - what this practice is, the two ways in, and what you receive"
facts:
  - tag: "The situation"
    k: "A bounded product"
    note: "One domain, a known user population, and a lifecycle that outlives the first release."
  - tag: "Two ways in"
    k: "Build, or review"
    note: "We build it end to end, or we review what you already have and hand you a written verdict."
  - tag: "What you receive"
    k: "Architecture, in writing"
    note: "Decision records, a quality-attribute matrix, API contracts, operational runbooks and a handover checklist."
evidence:
  - label: "Sales Navigator"
    note: "A presales platform, live in production"
    url: "/case-studies/sales-navigator/"
  - label: "UpSport"
    note: "A founder's second venture with us"
    url: "/case-studies/upsport/"
  - label: "All case studies"
    note: "Delivered work with status stated per project"
    url: "/case-studies/"
artifact: "Architecture decision records, a quality-attribute matrix, system-context and API contracts, an operational-readiness checklist and a handover pack."
artifactAnchor: "#artifacts"
---

A custom application succeeds or fails long before the first screen is designed. It fails in year two, when a change that should take a week takes a quarter - because the boundaries were never drawn, the trade-offs were never written down, and the only person who understood why it works that way has left.

Most application work is sold as construction: you describe it, we build it. That framing quietly assigns the hard part - the architecture, and responsibility for it later - to nobody. This practice assigns it to us, and puts it in writing.

## Architecture accountability is the deliverable. The code is what carries it.

A bounded product is not a small enterprise system. It has one domain, a known user population, and an owner - which means its risks are different: not cross-department handoffs, but the slow loss of changeability. The governing question is not "does it work?" but **"what will the next change cost, and who can make it?"**

That is decided by things which are cheap to choose deliberately and expensive to discover: where the boundaries sit, which quality attributes the design is optimized for, who owns the data, what the contracts promise, and whether the reasoning survived in a form the next engineer can read.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="System context diagram: a bounded product at the centre with its own data ownership, surrounded by external systems it integrates with through stated contracts, and the quality attributes the design is optimized for listed alongside their costs.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="26" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">What a system-context decision actually fixes</text>
    <rect x="240" y="60" width="230" height="110" rx="12" fill="rgba(20,207,147,.10)" stroke="#14cf93" stroke-width="1.5"/>
    <text x="355" y="96" text-anchor="middle" fill="#14cf93" font-size="13.5" font-weight="600">The product</text>
    <text x="355" y="118" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="11.5">owns its data</text>
    <text x="355" y="136" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="11.5">and its lifecycle</text>
    <text x="355" y="156" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="10.5">everything else is a contract</text>
    <g fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.28)" stroke-width="1.1">
      <rect x="40" y="62" width="150" height="34" rx="6"/>
      <rect x="40" y="110" width="150" height="34" rx="6"/>
      <rect x="520" y="62" width="160" height="34" rx="6"/>
      <rect x="520" y="110" width="160" height="34" rx="6"/>
    </g>
    <g fill="rgba(255,255,255,.68)" font-size="11.5" text-anchor="middle">
      <text x="115" y="84">Identity provider</text>
      <text x="115" y="132">Payments</text>
      <text x="600" y="84">Accounting / ERP</text>
      <text x="600" y="132">Messaging / email</text>
    </g>
    <g stroke="rgba(255,255,255,.3)" stroke-width="1.2" stroke-dasharray="4 3">
      <path d="M190 79 L240 90"/><path d="M190 127 L240 120"/>
      <path d="M470 90 L520 79"/><path d="M470 120 L520 127"/>
    </g>
    <text x="355" y="196" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">each line is a contract with a version, an owner and a failure behaviour</text>
    <line x1="40" y1="216" x2="720" y2="216" stroke="rgba(255,255,255,.15)"/>
    <text x="40" y="240" fill="rgba(255,255,255,.72)" font-size="11.5">Optimized for: <tspan fill="#14cf93">changeability</tspan> and <tspan fill="#14cf93">operability</tspan>.</text>
    <text x="40" y="262" fill="rgba(255,255,255,.5)" font-size="11.5">Paid for with: more indirection than a prototype needs, and a deployment pipeline before the first release. Stated, not discovered.</text>
  </g>
</svg>
<figcaption><strong>Boundaries and attributes are choices with prices.</strong> A design optimized for everything is optimized for nothing; naming what it is NOT optimized for is half the value of writing it down.</figcaption>
</figure>

## The failure modes this practice is designed to prevent

<ul class="svc-failures">
<li><b>The undrawn boundary</b><p>The product grows into whatever adjacent problem appears next. Two years later no one can describe what it is for, and every change touches everything.</p><span class="svc-control"><b>Control:</b> a stated system context - what is inside, what is a contract, and what is explicitly out.</span></li>
<li><b>Quality attributes chosen by accident</b><p>Nobody decided whether the design favours throughput, changeability or time-to-first-release, so it favours whatever the first deadline demanded - permanently.</p><span class="svc-control"><b>Control:</b> a quality-attribute matrix, agreed in writing, naming what is traded away.</span></li>
<li><b>The undocumented decision</b><p>An unusual choice looks like a mistake to the next engineer, who "fixes" it and reintroduces the problem it solved.</p><span class="svc-control"><b>Control:</b> decision records carrying the alternatives and the reason, kept in the repository.</span></li>
<li><b>Contract drift</b><p>An integration changes shape without a version, and the failure appears somewhere else entirely, weeks later.</p><span class="svc-control"><b>Control:</b> versioned contracts with stated failure behaviour, and tests that fail when the shape changes.</span></li>
<li><b>Ownership fog at handover</b><p>The software is delivered but the accounts, keys, pipelines and runbooks are not - so the customer owns the product without being able to operate it.</p><span class="svc-control"><b>Control:</b> a handover checklist worked through before the engagement closes, not after.</span></li>
<li><b>The demo that is not a system</b><p>What is shown works; what is not shown - backups, monitoring, error paths, the second environment - does not exist.</p><span class="svc-control"><b>Control:</b> operational readiness treated as an acceptance condition, not a phase-two hope.</span></li>
</ul>

## The decisions we take responsibility for

<div class="svc-decisions">
<dl>
<dt><span>Domain and system boundaries</span><span>What it turns on</span></dt>
<dd><span></span><span>What the product is for, what it will never be for, and which neighbouring systems it talks to rather than absorbs.</span></dd>
<dt><span>Quality attributes</span><span></span></dt>
<dd><span></span><span>Which of changeability, performance, security, operability and speed-to-first-release the design favours - and what each is traded against. Every one has a price paid somewhere else.</span></dd>
<dt><span>Data ownership</span><span></span></dt>
<dd><span></span><span>What this product is the source of truth for, and what it merely holds a copy of. Copies without a stated refresh rule become second truths.</span></dd>
<dt><span>API and integration contracts</span><span></span></dt>
<dd><span></span><span>Shape, versioning, idempotency and failure behaviour - including what happens when the counterparty is wrong rather than absent.</span></dd>
<dt><span>Security and privacy posture</span><span></span></dt>
<dd><span></span><span>What data is collected, where it lives, who can reach it, and what a security review would find. Decided at design time; retrofitting is a rewrite.</span></dd>
<dt><span>Operability and deployment</span><span></span></dt>
<dd><span></span><span>Environments, releases, backups, monitoring and the runbook - what "running it" means for whoever does it after us.</span></dd>
<dt><span>Written architecture decisions</span><span></span></dt>
<dd><span></span><span>Which choices are consequential enough to record, with alternatives and reasons, so the reasoning outlives the people.</span></dd>
<dt><span>Ownership and handover</span><span></span></dt>
<dd><span></span><span>Accounts, credentials, pipelines, documentation and the knowledge transfer - itemized and signed off.</span></dd>
<dt><span>Build, or do not build</span><span></span></dt>
<dd><span></span><span>Whether a product should be built at all, bought instead, or reduced to a smaller thing that solves the real problem. We would rather say this early.</span></dd>
</dl>
</div>

## Two ways in, and they are different engagements

**Build.** We take the product end to end: domain model, workflows, permissions, documents in and out, integrations, deployment and operations - handed over so your team can run it without us. End to end means the unglamorous parts, because those decide whether an application survives contact with real users.

**Review.** Sometimes the right engagement is an expert eye, not a build team. An architecture review produces a written verdict you keep: findings ranked by real risk rather than by how interesting they are to engineers; quick wins separated from structural work; a fix / modernize / **leave-alone** call on each part - leave-alone is a real category, because code that is ugly but stable and rarely touched is usually not your problem; and where it applies, a build-versus-buy recommendation including "an off-the-shelf product fits you better".

A review looks at what determines an application's future: whether the architecture can carry the next three years of roadmap, where performance breaks first, how access control would look to a security review, and how hard the system would be for a new team to take over - because that last one sets the price of every future change.

## Method, and what must be true to continue

<div class="svc-stage">
<h3 class="svc-stage-h"><span>01</span>Discovery</h3>
<p class="svc-stage-sub">Understand the problem before proposing anything.</p>
<dl>
<dt>Input</dt><dd>The problem as you describe it, whatever exists today, and the constraints that are real.</dd>
<dt>Engineering work</dt><dd>Domain walkthrough, user population, the systems it must live beside, and the quality attributes that actually matter here.</dd>
<dt>Decision</dt><dd>What the product is for - and what it is explicitly not for.</dd>
<dt>Deliverable</dt><dd>A scoped estimate you can challenge, with the assumptions it rests on named.</dd>
<dt>You provide</dt><dd>Access to the people who will use it, not only those commissioning it.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">You can state the product's boundary in one sentence, and we can state what we would refuse to add to it.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>02</span>Architecture</h3>
<p class="svc-stage-sub">Decisions made, written down, and open to challenge.</p>
<dl>
<dt>Input</dt><dd>The agreed boundary and the constraints from Discovery.</dd>
<dt>Engineering work</dt><dd>System context, data ownership, contracts, quality-attribute trade-offs, security posture, and the decision records for each consequential call.</dd>
<dt>Decision</dt><dd>The stack, the structure, and what the design is deliberately not optimized for.</dd>
<dt>Deliverable</dt><dd>A written architecture with its decision records - in language you can argue with.</dd>
<dt>You provide</dt><dd>A decision-maker who can settle trade-offs rather than defer them.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Every consequential decision has a record naming its alternatives, and no quality attribute is claimed without something traded for it.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>03</span>Build in reviewed increments</h3>
<p class="svc-stage-sub">Working software as it grows, not a reveal at the end.</p>
<dl>
<dt>Input</dt><dd>The agreed architecture and a prioritized slice.</dd>
<dt>Engineering work</dt><dd>Build, review, test - including the failure paths - and keep the decision records current as reality argues back.</dd>
<dt>Decision</dt><dd>What ships in each increment, and what is deferred rather than half-built.</dd>
<dt>Deliverable</dt><dd>Reviewed increments you can use, with their acceptance evidence.</dd>
<dt>You provide</dt><dd>Feedback on working software early enough for it to change something.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Each increment runs in a real environment with its tests and its error paths - not only on a developer machine.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>04</span>Operational readiness and handover</h3>
<p class="svc-stage-sub">The part that decides whether your team can actually run the thing after we leave.</p>
<dl>
<dt>Input</dt><dd>A system that passes acceptance, and the team who will run it.</dd>
<dt>Engineering work</dt><dd>Environments, releases, backups, monitoring, runbooks, credential transfer and knowledge handover.</dd>
<dt>Decision</dt><dd>Whether the receiving team can genuinely operate it - assessed, not assumed.</dd>
<dt>Deliverable</dt><dd>The handover pack: architecture, decisions, runbooks, accounts and an itemized checklist.</dd>
<dt>You provide</dt><dd>The people who will operate it, present for the transfer.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Your team has deployed a change and recovered from a simulated failure without us in the room.</dd>
</dl>
</div>

<span id="artifacts" style="scroll-margin-top:88px;"></span>

## What you receive

<div class="svc-artifact">
<div class="svc-art-head"><b>Quality-attribute matrix</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 02 deliverable</span></div>
<div class="svc-art-body">

| Attribute | Priority | How it is achieved | What it costs |
|---|---|---|---|
| Changeability | Primary | Bounded modules, contracts at the seams, decision records | More indirection than a prototype needs |
| Operability | Primary | One-command deploy, health checks, structured logs | A pipeline before the first release |
| Security and privacy | Constraint | Least privilege, encrypted at rest, no personal data in logs | Slower debugging; some convenience removed |
| Performance | Sufficient | Measured against a stated budget, optimized only where measured | Not architected for volumes it will not see |
| Time to first release | Traded | Scope reduced instead of quality | Fewer features on day one |

The final column is the point. An attribute nobody traded anything for was not prioritized - it was hoped for.

</div>
</div>

<div class="svc-artifact">
<div class="svc-art-head"><b>Architecture decision record</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 02 deliverable, kept in the repository</span></div>
<div class="svc-art-body">

| Field | Entry |
|---|---|
| Decision | Estimates are computed server-side from versioned rule sets, never in the client |
| Status | Accepted |
| Context | Pricing rules change several times a year; an estimate must be reproducible months later, in a dispute |
| Alternatives | Client-side calculation (faster to build, unauditable); hardcoded rules (simplest, wrong within a year) |
| Consequence | Every estimate stores the rule-set version that produced it; recomputation is possible; the client cannot be trusted to price |
| Trade-off accepted | A network round trip per estimate, and a rules-versioning mechanism to maintain |

</div>
</div>

Also in the pack: the system-context and API contracts, a threat-model excerpt where the data justifies one, an acceptance-evidence plan, an operational-readiness checklist, and the ownership and handover checklist itemizing accounts, credentials and pipelines.

## Field evidence

**Sales Navigator** - a presales platform for a residential developer, live in production. One system that is simultaneously a line-of-business application, a pricing and estimation engine, a document generator and an asset library behind a single login - which is why the catalogue of application "types" is a poor description of real work. It was built in about four months; that is a fact about one project of that scope, not a delivery-speed offer. [The case study](/case-studies/sales-navigator/) states what is and is not claimed.

**A founder's second venture.** UpSport came to us from a founder who had worked with us before - "their work is on time, high quality, and fairly priced," in his words, and the repeat engagement is the part we would weigh if we were you. [Read it](/case-studies/upsport/).

**Six years inside one product.** Touchpoint Dashboard was a customer-journey platform we engineered through growth and an acquisition - evidence about sustained ownership of a product's architecture rather than a single delivery. [The story](/insights/journey-mapping-in-software-engineering/).

## Controls and assurance

**Quality and security management.** ManiarTech's quality and information-security management systems have been independently audited by URS under UKAS accreditation. Current certificate status can be verified with the registrar using certificate numbers 123961/B/0001 and 123961/A/0001.

**Who does the work.** Client work is led and reviewed by ManiarTech's senior engineering core, with vetted specialists engaged where the problem requires them. We do not substitute trainees for the experienced engineers presented during the engagement. For complex products we build a dedicated team chosen for the work rather than whoever is free; for smaller scopes and reviews the engagement is deliberately lighter. We do not force a large engagement onto a small problem.

**Technology.** Mainstream stacks another team can hire for - commonly Go, Python, React, and PostgreSQL or MongoDB. Documentation ships as the work happens, and technology decisions are agreed as the project runs, so nothing in your codebase is a surprise later. NDAs are routine.

## Where this practice fits, and where it does not

<div class="svc-fit">
<div class="is-fit">
<h3>A good fit</h3>
<ul>
<li>A bounded product with one domain and an identifiable user population.</li>
<li>Something that must still be changeable in three years, by people who are not us.</li>
<li>An existing system where you need an independent verdict before committing budget.</li>
<li>A founder or product owner who can settle trade-offs rather than defer them.</li>
</ul>
</div>
<div class="is-not">
<h3>A poor fit</h3>
<ul>
<li>Work that spans departments, approvals and audit obligations - that is <a href="/services/enterprise-software-engineering/">enterprise systems engineering</a>, and the risks are different.</li>
<li>A throwaway prototype to test an idea. Build it cheaply; do not pay for architecture you intend to discard.</li>
<li>A packaged product already fits and only configuration is needed. We will say so.</li>
<li>Staff augmentation, where the decisions are made elsewhere and we are asked only to type.</li>
</ul>
</div>
</div>

<span id="begin" style="scroll-margin-top:88px;"></span>

## How to begin

Two openings, depending on where you are. If you are building something: describe what the product is for, who uses it, and what it must still be able to do in three years. If you already have one: tell us what you are deciding - whether to extend it, replace it, or leave it alone - and we will tell you what a review would examine.

Either way the first response is technical, from a senior engineer, and it will include what we would need to understand before anyone quotes a number.

<p class="svc-action"><a href="/contact/">Discuss a product or request an architecture review &rarr;</a></p>
