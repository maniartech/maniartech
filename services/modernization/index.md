---
title: "Modernization and Migration"
headline: "A legacy system is usually the only complete specification of its own behaviour."
description: "Aging systems brought up to date incrementally, in production - with a defined rollback envelope at every stage, parity demonstrated before anything is retired, and cutovers authorized rather than discovered."
eyebrow: "Engineering practice"
seoDescription: "Legacy modernization done incrementally: seam analysis, parity testing, a defined rollback envelope and authorized cutovers - not a big-bang rewrite."
order: 3
tocDepth: 3
action:
  label: "The decisions this practice owns"
  url: "#the-decisions-we-take-responsibility-for"
factsKicker: "Up front - what this practice controls, what you receive, and the evidence behind it"
facts:
  - tag: "The situation"
    k: "It cannot stop serving"
    note: "A system the business depends on is slow, fragile or costly - and must keep running while it is fixed."
  - tag: "The governing claim"
    k: "A rollback envelope"
    note: "Per stage: what can be reversed, for how long, what must be reconciled, and which transitions need an authorized cutover."
  - tag: "The evidence"
    k: "A 2011 rebuild"
    note: "A 600-form Access sprawl rebuilt into one workflow application - by the lab's account, still in daily use."
evidence:
  - label: "RTL laboratory system"
    note: "Rebuilt 2011 - client-reported longevity"
    url: "/case-studies/rtl/"
  - label: "Rewrite or refactor?"
    note: "The strangler-fig decision, written up"
    url: "/insights/rewrite-vs-refactor-strangler-fig/"
  - label: "All case studies"
    note: "Delivered work with status stated per project"
    url: "/case-studies/"
artifact: "A system inventory and dependency graph, seam analysis, migration candidate matrix, parity-test plan, rollback criteria and a retirement decision record."
artifactAnchor: "#artifacts"
---

Aging systems do not get replaced because the replacement is terrifying. The all-at-once rewrite is late, over budget, and breaks the business on go-live - so the decision is deferred, the system gets more fragile, and the eventual rewrite gets more dangerous.

The reason rewrites stall at eighty percent is rarely engineering skill. It is that nobody could enumerate what the old system did. Fifteen years of edge cases, exceptions, and quiet fixes are encoded in code nobody reads and behaviour nobody documented. The old system is not merely the thing being replaced; it is the specification.

## Modernize against the legacy system, not away from it

The discipline is incremental replacement: move one capability at a time, in production, with the old and new running side by side **where the system and its dependencies permit it** - the strangler-fig pattern. Each move is small enough to understand, verify against the original, and reverse if it misbehaves.

That last word is where most modernization marketing overreaches, including ours until recently. Not everything is reversible. A destructive data transformation, an external system that has been repointed, a regulator notified of a new interface - each creates a moment after which "rollback" becomes restoration, reconciliation, or forward correction instead. Pretending otherwise is how teams discover the boundary during an incident.

So the governing claim of this practice is not that every step is reversible. It is that **every step has a stated rollback envelope, decided before the step is taken**.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of a migration stage: a reversible window in which traffic can be moved back, a reconciliation requirement, and a point of authorized cutover after which rollback becomes forward correction rather than reversal.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="26" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">One migration stage, and where reversibility ends</text>
    <line x1="40" y1="110" x2="720" y2="110" stroke="rgba(255,255,255,.2)" stroke-width="2"/>
    <rect x="40" y="86" width="330" height="48" rx="8" fill="rgba(20,207,147,.10)" stroke="rgba(20,207,147,.55)" stroke-width="1.3"/>
    <text x="205" y="106" text-anchor="middle" fill="#14cf93" font-size="12" font-weight="600">Reversible window</text>
    <text x="205" y="124" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">traffic can move back; both systems still authoritative</text>
    <rect x="392" y="86" width="150" height="48" rx="8" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.5)" stroke-width="1.3"/>
    <text x="467" y="106" text-anchor="middle" fill="rgba(255,200,120,.9)" font-size="12" font-weight="600">Reconcile</text>
    <text x="467" y="124" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">prove both agree, record breaks</text>
    <rect x="564" y="86" width="156" height="48" rx="8" fill="rgba(240,90,90,.08)" stroke="rgba(240,90,90,.55)" stroke-width="1.3"/>
    <text x="642" y="106" text-anchor="middle" fill="rgba(240,90,90,.9)" font-size="12" font-weight="600">Authorized cutover</text>
    <text x="642" y="124" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">named approver, planned date</text>
    <path d="M556 78 L556 146" stroke="rgba(240,90,90,.8)" stroke-width="1.6" stroke-dasharray="5 4"/>
    <text x="556" y="68" text-anchor="middle" fill="rgba(240,90,90,.9)" font-size="11">point of no simple return</text>
    <text x="40" y="180" fill="rgba(255,255,255,.72)" font-size="11.5" font-weight="600">Decided BEFORE the stage begins, not during it:</text>
    <g fill="rgba(255,255,255,.6)" font-size="11.5">
      <text x="40" y="204">- what can be reversed, and for how long the window stays open</text>
      <text x="40" y="226">- what data must be reconciled, and what an acceptable break rate is</text>
      <text x="40" y="248">- which transitions require an explicitly authorized cutover, and who authorizes them</text>
      <text x="40" y="270">- what parity must be demonstrated before the old capability may be retired</text>
    </g>
  </g>
</svg>
<figcaption><strong>The envelope, not a promise.</strong> Naming where reversibility ends is what makes the reversible part trustworthy.</figcaption>
</figure>

## The failure modes this practice is designed to prevent

<ul class="svc-failures">
<li><b>The eighty-percent rewrite</b><p>The new system handles the main path and stalls on the edge cases nobody knew existed. The old system cannot be switched off, so both run - at double the cost, indefinitely.</p><span class="svc-control"><b>Control:</b> capability-by-capability replacement, each verified against the original before the next begins.</span></li>
<li><b>The unmapped dependency</b><p>Something else was reading that database directly - a report, a script, a partner integration - and nobody knew until it broke.</p><span class="svc-control"><b>Control:</b> a dependency graph built from evidence, including the consumers nobody documented.</span></li>
<li><b>Parity assumed, not demonstrated</b><p>The new capability looks right. Months later a discrepancy surfaces in a number that was wrong from the start.</p><span class="svc-control"><b>Control:</b> a parity-test plan running old and new against the same inputs, with the differences examined rather than explained away.</span></li>
<li><b>The discovered cutover</b><p>A step turns out to be irreversible in the middle of the night, because nobody asked beforehand.</p><span class="svc-control"><b>Control:</b> the rollback envelope decided and authorized before the stage begins.</span></li>
<li><b>Retirement without authority</b><p>The old system is switched off because the new one seems fine - and something that depended on it disappears with it.</p><span class="svc-control"><b>Control:</b> a retirement decision record: what proved parity, who authorized it, what was verified as no longer consuming it.</span></li>
<li><b>Modernized onto something unhireable</b><p>The rewrite lands on a stack the team cannot staff, converting a maintenance problem into a recruitment one.</p><span class="svc-control"><b>Control:</b> target stack chosen for who can maintain it, not for what is interesting.</span></li>
</ul>

## The decisions we take responsibility for

<div class="svc-decisions">
<dl>
<dt><span>Seams</span><span>What it turns on</span></dt>
<dd><span></span><span>Where the system can genuinely be cut - a boundary with low coupling and observable behaviour on both sides. Seams determine the whole sequence; picking them badly makes every later step harder.</span></dd>
<dt><span>Migration order</span><span></span></dt>
<dd><span></span><span>Which capability moves first. Usually the one that is well understood, independently verifiable, and valuable enough to justify the machinery - not the one that is most annoying.</span></dd>
<dt><span>The rollback envelope</span><span></span></dt>
<dd><span></span><span>Per stage: what is reversible, for how long, what must be reconciled, and which transitions need explicit authorization.</span></dd>
<dt><span>Parity definition</span><span></span></dt>
<dd><span></span><span>What "the same" means for this capability - identical outputs, or equivalent within a stated tolerance, and who decides when they differ.</span></dd>
<dt><span>Data ownership during transition</span><span></span></dt>
<dd><span></span><span>Which system is authoritative while both run, and how the other is kept correct. Two authoritative systems is the most expensive state to be in.</span></dd>
<dt><span>Cutover and retirement</span><span></span></dt>
<dd><span></span><span>What must be true before the old capability is retired, who authorizes it, and what is verified as no longer depending on it.</span></dd>
<dt><span>Target technology</span><span></span></dt>
<dd><span></span><span>Go where the workload genuinely benefits; modern Python or another mainstream stack where that is the better decision. The test is who can maintain it, not what we enjoy writing.</span></dd>
<dt><span>What not to migrate</span><span></span></dt>
<dd><span></span><span>Parts that are stable, rarely touched and cheap to leave alone. Modernizing them spends risk for no return.</span></dd>
</dl>
</div>

## Method, and what must be true to continue

<div class="svc-stage">
<h3 class="svc-stage-h"><span>01</span>Inventory and dependency mapping</h3>
<p class="svc-stage-sub">Find out what is really there, including the consumers nobody remembers.</p>
<dl>
<dt>Input</dt><dd>Access to the running system, its data stores, and the people who operate it.</dd>
<dt>Engineering work</dt><dd>Enumerate capabilities, integrations, scheduled jobs, reports and direct database consumers; find the undocumented ones by evidence, not by asking.</dd>
<dt>Decision</dt><dd>What is in scope, and what is deliberately left alone.</dd>
<dt>Deliverable</dt><dd>A system inventory and a dependency graph.</dd>
<dt>You provide</dt><dd>Access, and the people who know where the workarounds are.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Every consumer of the system's data is named, including the ones discovered rather than declared.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>02</span>Seam analysis and sequencing</h3>
<p class="svc-stage-sub">Decide where to cut, and in what order.</p>
<dl>
<dt>Input</dt><dd>The inventory and dependency graph.</dd>
<dt>Engineering work</dt><dd>Identify candidate seams, assess coupling and observability at each, and score candidates for risk, verifiability and value.</dd>
<dt>Decision</dt><dd>The first capability to move, and the sequence after it.</dd>
<dt>Deliverable</dt><dd>A seam analysis and a migration candidate matrix.</dd>
<dt>You provide</dt><dd>Business input on which capabilities can tolerate change and when.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">The first capability can be described, verified independently, and reversed - or its cutover point is explicitly identified.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>03</span>Move one capability, in production</h3>
<p class="svc-stage-sub">Old and new side by side where dependencies permit; traffic moved gradually.</p>
<dl>
<dt>Input</dt><dd>The chosen seam, its rollback envelope, and a parity-test plan.</dd>
<dt>Engineering work</dt><dd>Build the replacement, run both against the same inputs, compare, move traffic in increments, reconcile and investigate every difference.</dd>
<dt>Decision</dt><dd>Proceed, hold, or reverse - decided against the parity evidence, not the schedule.</dd>
<dt>Deliverable</dt><dd>The capability live, with its parity results and reconciliation report.</dd>
<dt>You provide</dt><dd>An owner who can authorize a cutover, and acceptance of a stated tolerance where outputs legitimately differ.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Parity is demonstrated on real traffic, and every reconciliation break is explained rather than tolerated.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>04</span>Retire, and repeat</h3>
<p class="svc-stage-sub">The old capability is switched off deliberately, by someone with the authority to do it.</p>
<dl>
<dt>Input</dt><dd>A capability running on the new system with parity demonstrated.</dd>
<dt>Engineering work</dt><dd>Verify nothing still consumes the old path, plan and execute retirement, then carry the learning into the next seam.</dd>
<dt>Decision</dt><dd>Retirement authorized - or deferred, with the reason recorded.</dd>
<dt>Deliverable</dt><dd>A retirement decision record and the next stage scoped.</dd>
<dt>You provide</dt><dd>The named authorizer.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">The old capability is off, nothing broke, and the record says who decided and on what evidence.</dd>
</dl>
</div>

<span id="artifacts" style="scroll-margin-top:88px;"></span>

## What you receive

<div class="svc-artifact">
<div class="svc-art-head"><b>Migration candidate matrix</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 02 deliverable</span></div>
<div class="svc-art-body">

| Capability | Coupling | Verifiable independently | Rollback envelope | Sequence |
|---|---|---|---|---|
| Report generation | Low - reads only | Yes, outputs comparable | Fully reversible; no state written | First |
| Document delivery | Medium - external mail provider | Yes, with a test recipient | Reversible until the provider is repointed | Second |
| Invoicing | High - writes to the ledger | Partially; totals comparable | Reversible within the period; irreversible after close | Later, staged |
| Historical archive | Low - static | Comparable by checksum | Destructive transform - **cutover, not reversible** | Last, authorized |

The rollback column is the one that changes plans. A capability whose envelope closes early is sequenced late, when the team has practice.

</div>
</div>

<div class="svc-artifact">
<div class="svc-art-head"><b>Rollback criteria and retirement record</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 03-04 deliverable</span></div>
<div class="svc-art-body">

| Field | Entry |
|---|---|
| Stage | Report generation moved to the new service |
| Reversible until | Traffic reaches 100% and the legacy job is disabled - approximately 14 days |
| Reverse by | Routing traffic back; no data restoration required |
| Reconciliation | Daily output comparison; break rate must be zero for 5 consecutive days |
| Cutover authorization | Not required at this stage - reversal is a routing change |
| Retirement evidence | Zero legacy invocations for 30 days; no direct database consumers remain |
| Authorized by | Named operations owner, with date |

</div>
</div>

Also in the pack: the system inventory and dependency graph, seam analysis, a data-mapping worksheet, the parity-test plan and reconciliation reports.

## Field evidence

**A 600-form sprawl, rebuilt.** In 2011 we replaced a Microsoft Access estate with one workflow-driven application for a testing laboratory. By the laboratory's account it is still in daily service about fifteen years later - client-reported longevity rather than a measurement of ours, and the reason this practice treats maintainability as an acceptance condition. [The case study](/case-studies/rtl/).

**Our own platforms, module by module.** Processious was migrated capability by capability rather than rewritten, which is where much of this method was tested on systems where we bore the consequences ourselves. It runs in production today, carrying a client laboratory system.

**The decision written up.** When to modernize incrementally and when a rewrite is genuinely the right call is set out in [rewrite or refactor](/insights/rewrite-vs-refactor-strangler-fig/) - including the cases where incremental replacement is the wrong tool.

## Controls and assurance

**Quality and security management.** ManiarTech's quality and information-security management systems have been independently audited by URS under UKAS accreditation. Current certificate status can be verified with the registrar using certificate numbers 123961/B/0001 and 123961/A/0001.

**Who does the work.** Client work is led and reviewed by ManiarTech's senior engineering core, with vetted specialists engaged where the problem requires them. We do not substitute trainees for the experienced engineers presented during the engagement.

**Target technology.** Go where the workload benefits from it; modern Python or another mainstream stack where that is the better decision. The test is always who can maintain the result.

## Where this practice fits, and where it does not

<div class="svc-fit">
<div class="is-fit">
<h3>A good fit</h3>
<ul>
<li>The system carries real business load and cannot go dark for a cutover weekend.</li>
<li>Its behaviour is worth preserving even where it is undocumented.</li>
<li>Seams exist, or can be created, at boundaries with observable behaviour.</li>
<li>Someone can authorize a cutover and accept a stated parity tolerance.</li>
</ul>
</div>
<div class="is-not">
<h3>A poor fit</h3>
<ul>
<li>The business process itself is changing fundamentally. Migrating behaviour you intend to discard is waste - that is a new build.</li>
<li>The system is small enough to rebuild wholesale in weeks. Incremental machinery costs more than it saves.</li>
<li>A packaged product now covers the domain properly. Buying beats migrating; we will say so.</li>
<li>No environment exists where old and new can run together, and none can be created - the method's core assumption fails.</li>
</ul>
</div>
</div>

<span id="begin" style="scroll-margin-top:88px;"></span>

## How to begin

A modernization assessment is the sane first step: what the system is, who depends on it, where the seams are, and what the first capability to move would be. It produces the inventory, the dependency graph and a sequenced recommendation - including, sometimes, "leave this alone and fix the two things that actually hurt".

<p class="svc-action"><a href="/contact/">Request a modernization assessment &rarr;</a></p>
