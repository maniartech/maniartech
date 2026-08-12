---
title: "Enterprise Systems Engineering"
headline: "An enterprise system is an operational control system, not an application with more screens."
description: "Systems that span departments, roles, approvals and audit obligations - engineered so invalid transitions are impossible, integrations can prove they agree, and the record survives the audit."
eyebrow: "Engineering practice"
seoDescription: "Enterprise software development: state models, authorization, maker-checker, integration reconciliation and audit evidence."
order: 1
tocDepth: 3
action:
  label: "What this practice takes responsibility for"
  url: "#the-decisions-we-take-responsibility-for"
factsKicker: "Up front - what this practice owns, what you receive, and the evidence behind it"
facts:
  - tag: "The situation"
    k: "Work crosses departments"
    note: "Roles, approvals, exceptions and handoffs - with a record that has to survive an audit."
  - tag: "What you receive"
    k: "Decisions, in writing"
    note: "State model, authorization matrix, integration failure paths, acceptance evidence and a documented handover."
  - tag: "The evidence"
    k: "A live accredited laboratory"
    note: "Running its daily analytical work on a system we built - with a public report checker anyone can test."
evidence:
  - label: "Chemo Test Laboratory"
    note: "Live in production - public report checker"
    url: "/case-studies/chemo/"
  - label: "Journey-to-system design"
    note: "The method paper, with its traceability matrix"
    url: "/white-papers/consumer-journey-systems-development/"
  - label: "15 years of LIMS work"
    note: "Field report - two laboratory systems, a decade apart"
    url: "/insights/lims-software-lessons/"
artifact: "State model, authorization matrix, integration failure paths, reconciliation structure and audit-record spec - documents you keep."
artifactAnchor: "#artifacts"
---

Most enterprise software fails in a way nobody budgets for. It ships on time, passes its tests, matches its specification - and still loses things. Staff keep a spreadsheet on the side "just until the system settles". Someone phones to ask where an approval is. Two departments each swear their module works, and both are right; it is the handoff between them that drops records.

Nothing crashes. There is no bug to file. The failure is structural, so it gets misdiagnosed as a training problem.

This practice exists for systems where that outcome is unaffordable: where the work crosses departments, where somebody must be accountable for each transition, and where a regulator, an auditor or a customer may one day ask the system to prove what happened.

## A workflow is not automated until invalid transitions are impossible

The governing idea is simple to state and expensive to retrofit: **an enterprise system is an operational control system**. Its job is not to display data. Its job is to make the wrong thing hard and the right thing recorded.

A status field that any user can set to any value is not a workflow - it is a text box with opinions. A workflow exists when the system knows which transitions are legal, from which state, by whom, under what conditions, and refuses everything else. Everything else this practice does follows from that: authorization attaches to transitions, audit records are written at transitions, operational metrics are derived from transitions, and reconciliation asks whether two systems agree about the transitions that happened.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="State model diagram: a record moves through Received, Under review, Approved and Issued, with guards on each transition. A rejection path returns to Received. Two attempted transitions - Received straight to Issued, and a reviewer approving their own submission - are drawn as blocked.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="26" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">Legal transitions, and the guards on them</text>
    <g fill="rgba(20,207,147,.12)" stroke="#14cf93" stroke-width="1.3">
      <rect x="40"  y="60" width="130" height="46" rx="8"/>
      <rect x="230" y="60" width="130" height="46" rx="8"/>
      <rect x="420" y="60" width="130" height="46" rx="8"/>
      <rect x="610" y="60" width="112" height="46" rx="8"/>
    </g>
    <g fill="#14cf93" text-anchor="middle" font-size="12.5" font-weight="600">
      <text x="105" y="88">Received</text>
      <text x="295" y="88">Under review</text>
      <text x="485" y="88">Approved</text>
      <text x="666" y="88">Issued</text>
    </g>
    <g stroke="rgba(255,255,255,.45)" stroke-width="1.5" fill="none" marker-end="url(#ar)">
      <path d="M170 83 L224 83"/>
      <path d="M360 83 L414 83"/>
      <path d="M550 83 L604 83"/>
    </g>
    <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="rgba(255,255,255,.45)"/></marker></defs>
    <g fill="rgba(255,255,255,.55)" text-anchor="middle" font-size="10.5">
      <text x="197" y="74">intake complete</text>
      <text x="387" y="74">reviewer != submitter</text>
      <text x="577" y="74">signatory role</text>
    </g>
    <path d="M295 110 C 295 150, 130 150, 108 112" fill="none" stroke="rgba(255,200,120,.6)" stroke-width="1.4" stroke-dasharray="4 3" marker-end="url(#ar2)"/>
    <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0 0 L8 4 L0 8 z" fill="rgba(255,200,120,.6)"/></marker></defs>
    <text x="205" y="152" fill="rgba(255,200,120,.8)" font-size="11" text-anchor="middle">rejected, with reason - the path most specs forget</text>
    <g stroke="rgba(240,90,90,.75)" stroke-width="1.6" fill="none">
      <path d="M105 190 L640 190" stroke-dasharray="5 4"/>
      <path d="M355 206 L385 236 M385 206 L355 236"/>
      <path d="M120 176 L90 206 M90 176 L120 206"/>
    </g>
    <text x="40" y="262" fill="rgba(240,90,90,.85)" font-size="11.5">Blocked by design: Received -&gt; Issued (no review), and a reviewer approving a record they submitted.</text>
    <text x="40" y="284" fill="rgba(255,255,255,.5)" font-size="11.5">Both are refused at the transition, not hidden in the UI - so the API cannot do what the screen forbids.</text>
  </g>
</svg>
<figcaption><strong>The state model is the system.</strong> Guards make maker-checker separation a property of the data, not a convention people are trained to follow.</figcaption>
</figure>

## The failure modes this practice is designed to prevent

These are the named paths by which enterprise systems go wrong. Each one has a control attached, and those controls are what the engagement actually buys.

<ul class="svc-failures">
<li><b>The unenforced approval</b><p>Authorization is checked in the interface but not at the transition, so the API - or an integration, or a bulk import - performs what the screen forbids. Discovered during an audit, months later.</p><span class="svc-control"><b>Control:</b> permissions attach to transitions, and the same guard runs whatever the entry point.</span></li>
<li><b>Maker-checker in name only</b><p>The system has a reviewer role, but nothing prevents the person who created a record from approving it - or from delegating to themselves during leave.</p><span class="svc-control"><b>Control:</b> separation is an invariant on the transition, and delegation is a first-class, time-bounded, audited grant.</span></li>
<li><b>The silent integration divergence</b><p>Two systems each believe they are correct. No error is raised because neither is checking. The disagreement surfaces at month-end, in a number somebody has to explain.</p><span class="svc-control"><b>Control:</b> a scheduled reconciliation that asserts agreement and reports the exceptions, rather than assuming success.</span></li>
<li><b>The replayed message</b><p>A retry, a redelivery or an impatient user creates the same record twice. Downstream totals are wrong and the duplicate is hard to find because both copies look legitimate.</p><span class="svc-control"><b>Control:</b> idempotency keys on every externally triggered write, so a repeat is recognized rather than re-executed.</span></li>
<li><b>The unowned exception</b><p>Rejection, rework, withdrawal and reissue are the paths that generate the most operational cost - and the ones a department-by-department specification never covers, because no single department owns them.</p><span class="svc-control"><b>Control:</b> exception paths are specified, built and accepted alongside the happy path, with an owner named for each.</span></li>
<li><b>The unprovable report</b><p>A document leaves the building carrying the company's name, and later nobody can reconstruct which data, which version and whose authorization produced it.</p><span class="svc-control"><b>Control:</b> report provenance - inputs, template version, authorizing principal and time - recorded with the artifact.</span></li>
<li><b>Status blindness</b><p>"Where is it, and what happens next?" cannot be answered without phoning someone who phones someone else. The most common question the system receives is the one it cannot answer.</p><span class="svc-control"><b>Control:</b> journey state is first-class in the data model, so the status view is a query rather than a project.</span></li>
</ul>

## The decisions we take responsibility for

An engagement is not a list of features to implement. These are the decisions we own, and the thing each one actually turns on.

<div class="svc-decisions">
<dl>
<dt><span>System and department boundaries</span><span>What it turns on</span></dt>
<dd><span></span><span>Where custody genuinely transfers and coupling is lowest - not where the org chart draws its lines. Boundaries placed on the org chart reproduce its handoff failures in software.</span></dd>
<dt><span>State and lifecycle</span><span></span></dt>
<dd><span></span><span>The named states a record occupies, the legal transitions between them, and the guard on each. This is decided before the schema, because it determines the schema.</span></dd>
<dt><span>Data ownership</span><span></span></dt>
<dd><span></span><span>Exactly one context owns each record; everything else reads it through a stated contract. Ambiguous ownership is how two departments end up with two truths.</span></dd>
<dt><span>Authorization model</span><span></span></dt>
<dd><span></span><span>Which role may perform which transition, how delegation works during absence, and which separations are invariants rather than policy.</span></dd>
<dt><span>Integration behaviour</span><span></span></dt>
<dd><span></span><span>Contract, retry semantics, idempotency, and what each side is trusted to assert - plus what happens when the other system is wrong, not merely down.</span></dd>
<dt><span>Failure handling</span><span></span></dt>
<dd><span></span><span>Which failures are retried, which are queued for a human, and which must stop the process. Silent failure is a design decision people make by not making it.</span></dd>
<dt><span>Audit evidence</span><span></span></dt>
<dd><span></span><span>Which transitions are audit-significant, and what is recorded: principal, prior and new state, time, reason, correlation. Not everything - deciding which is the work.</span></dd>
<dt><span>Operational metrics</span><span></span></dt>
<dd><span></span><span>Which measures are derived from enforced states rather than typed by hand, so a number cannot disagree with the record it summarizes.</span></dd>
<dt><span>Acceptance conditions</span><span></span></dt>
<dd><span></span><span>What must be demonstrated before a department goes live - including the exception paths, which is where acceptance usually stops short.</span></dd>
<dt><span>Handover</span><span></span></dt>
<dd><span></span><span>What another team needs to run and extend this without us: decisions, models, runbooks and the reasoning behind the calls.</span></dd>
</dl>
</div>

## The Keystone Method, with its exit gates

We work department by department. Each stage ends in something you can inspect, and nothing large is committed before the stage before it has proven out. The exit gate matters more than the stage name: it is the condition that must be true before we are allowed to continue.

<div class="svc-stage">
<h3 class="svc-stage-h"><span>01</span>Survey</h3>
<p class="svc-stage-sub">Map how the work really flows - including the workarounds, which is usually where the truth lives.</p>
<dl>
<dt>Input</dt><dd>Access to the people who do the work, and whatever documentation exists.</dd>
<dt>Engineering work</dt><dd>Sit with each role, trace real records end to end, collect the spreadsheets and side-channels people rely on.</dd>
<dt>Decision</dt><dd>Which processes are in scope, and which travelers - including non-human ones and external parties - the system must serve.</dd>
<dt>Deliverable</dt><dd>A process inventory and role map of the department as it actually works.</dd>
<dt>You provide</dt><dd>Time from the people who do the work, not only their managers.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Every process in scope has a named owner and at least one walked-through real example, including one that went wrong.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>02</span>Document</h3>
<p class="svc-stage-sub">Write down the rules, so the knowledge stops living in one person's head.</p>
<dl>
<dt>Input</dt><dd>The Survey inventory and the exceptions it surfaced.</dd>
<dt>Engineering work</dt><dd>Specify states, transitions, guards, record definitions and the authorization matrix; identify audit-significant events and retention obligations.</dd>
<dt>Decision</dt><dd>Which transitions are legal, who may perform them, and which separations are invariants.</dd>
<dt>Deliverable</dt><dd>Documented workflows, an authorization matrix, record definitions and an audit-evidence specification.</dd>
<dt>You provide</dt><dd>Ratification - by the people with authority to say "yes, that is the rule".</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Every state has a defined exit, every exception path has an owner, and the authorization matrix has no blank cells.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>03</span>Design</h3>
<p class="svc-stage-sub">Decide the shape - including what should not be built at all.</p>
<dl>
<dt>Input</dt><dd>The documented model, plus the constraints of the systems already running.</dd>
<dt>Engineering work</dt><dd>Boundaries, data ownership, integration contracts and failure behaviour, reconciliation design, and the acceptance conditions each will be judged by.</dd>
<dt>Decision</dt><dd>What is automated, what stays a plain form, what is deferred, and what we recommend not building.</dd>
<dt>Deliverable</dt><dd>A system design with the workflow model, integration points, reconciliation approach and the no-build calls written down with reasons.</dd>
<dt>You provide</dt><dd>Decisions on the trade-offs we surface, and access to the owners of adjacent systems.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">One journey is designed end to end - including its failure paths - and you can describe what the first live department will do differently on day one.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>04</span>Set the Keystone</h3>
<p class="svc-stage-sub">Take one department live on real records - the load-bearing stone that lets the rest stand.</p>
<dl>
<dt>Input</dt><dd>The approved design and a named first department.</dd>
<dt>Engineering work</dt><dd>Build and integrate; migrate or parallel-run; prove the exception paths; train; execute a documented cutover.</dd>
<dt>Decision</dt><dd>Go or no-go, judged against the acceptance conditions set in Design - not against a date.</dd>
<dt>Deliverable</dt><dd>The built, integrated system live for one department, with acceptance evidence and a cutover record.</dd>
<dt>You provide</dt><dd>An accountable owner in that department, and users who can commit to the transition.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Real work has completed end to end in production, including at least one rejection and one exception, and the status view answers "where is it" without anyone being phoned.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>05</span>Bear Load</h3>
<p class="svc-stage-sub">Watch what the system now measures, fix at root cause, and carry the method to the next department.</p>
<dl>
<dt>Input</dt><dd>A live department and the metrics its enforced states now produce.</dd>
<dt>Engineering work</dt><dd>Monitor dwell time, exception and rejection rates and reconciliation breaks; fix causes rather than symptoms; scope the next department with what this one taught us.</dd>
<dt>Decision</dt><dd>What is genuinely stable, what needs rework, and whether the next department is ready.</dd>
<dt>Deliverable</dt><dd>A live metrics view, a punch list burning down, and the next department scoped.</dd>
<dt>You provide</dt><dd>A frank account of what staff are still doing on the side - that list is the real backlog.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">The department can run a normal week without us, and handover material is current rather than promised.</dd>
</dl>
</div>

<span id="artifacts" style="scroll-margin-top:88px;"></span>

## What you receive

Documents you keep, in formats another engineer can act on. Two sanitized specimens:

<div class="svc-artifact">
<div class="svc-art-head"><b>Authorization matrix</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 02 deliverable</span></div>
<div class="svc-art-body">

| Transition | Intake clerk | Reviewer | Signatory | Invariant enforced |
|---|---|---|---|---|
| Received to Under review | Yes | Yes | Yes | Intake fields complete |
| Under review to Approved | No | Yes | Yes | Reviewer is not the submitter |
| Under review to Rejected | No | Yes | Yes | Reason is mandatory |
| Approved to Issued | No | No | Yes | Signatory role, current delegation only |
| Any to Withdrawn | No | No | Yes | Reason recorded, downstream notified |

A blank cell is not permitted. "No" is a decision; empty means the question was never asked.

</div>
</div>

<div class="svc-artifact">
<div class="svc-art-head"><b>Audit record specification</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 02 deliverable</span></div>
<div class="svc-art-body">

| Field | Example | Why it is required |
|---|---|---|
| Principal | `u:4821 (reviewer)` or `svc:intake-api` | Humans and services both act; both must be attributable |
| Prior state / new state | `under_review -> approved` | A value alone cannot prove a legal transition occurred |
| Time | ISO-8601 with timezone | Cross-border operations make local time ambiguous |
| Reason | Required on reject, withdraw, override | The exception paths are what get questioned later |
| Correlation id | `req:9f2c...` | Ties the transition to the integration message that caused it |
| Delegation | Grant id, if acting under delegation | "Who was allowed to do this, on that date" is an audit question |

</div>
</div>

The full set for a typical engagement: the state and transition model, the authorization matrix, a department discovery inventory, integration failure paths, a reconciliation report structure, the audit-record specification, and a journey-to-system traceability matrix - the last of which is [published as a blank CSV](/downloads/journey-to-system-traceability-matrix.csv) alongside the method paper, so you can see the instrument before you engage us.

## Integration is complete only when the systems can prove they agree

Enterprise integration is usually specified as a set of messages. That is the easy half. The half that decides whether the integration is trustworthy is what happens when the other system is not down, but wrong.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Integration failure paths: a message either succeeds, is retried with an idempotency key, is queued for human handling, or is caught by scheduled reconciliation which reports disagreements as exceptions.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="26" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">Four paths, all specified before build</text>
    <rect x="40" y="52" width="128" height="42" rx="8" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.3)"/>
    <text x="104" y="78" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="12.5">Transition</text>
    <g stroke="rgba(255,255,255,.3)" stroke-width="1.4" fill="none">
      <path d="M168 73 L214 73"/><path d="M168 73 C 195 73, 195 125, 214 125"/>
      <path d="M168 73 C 195 73, 195 177, 214 177"/>
    </g>
    <g font-size="12">
      <rect x="214" y="54" width="150" height="38" rx="7" fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.6)"/>
      <text x="289" y="78" text-anchor="middle" fill="#14cf93">accepted</text>
      <rect x="214" y="106" width="150" height="38" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,200,120,.55)"/>
      <text x="289" y="130" text-anchor="middle" fill="rgba(255,200,120,.9)">retry, same key</text>
      <rect x="214" y="158" width="150" height="38" rx="7" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)"/>
      <text x="289" y="182" text-anchor="middle" fill="rgba(255,255,255,.7)">queued for a human</text>
    </g>
    <text x="380" y="130" fill="rgba(255,255,255,.5)" font-size="11">idempotency key means a</text>
    <text x="380" y="145" fill="rgba(255,255,255,.5)" font-size="11">repeat is recognized, not re-run</text>
    <rect x="520" y="52" width="200" height="144" rx="10" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.22)"/>
    <text x="620" y="78" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="12.5" font-weight="600">Reconciliation</text>
    <text x="620" y="100" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11">scheduled, independent of the</text>
    <text x="620" y="115" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11">message path</text>
    <text x="620" y="140" text-anchor="middle" fill="#14cf93" font-size="11.5">asserts both sides agree</text>
    <text x="620" y="162" text-anchor="middle" fill="rgba(240,90,90,.85)" font-size="11.5">reports what does not</text>
    <text x="620" y="182" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">as exceptions with an owner</text>
    <text x="40" y="228" fill="rgba(255,255,255,.5)" font-size="11.5">A system that only reports transport errors will happily stay wrong. Agreement has to be asserted on a schedule, not assumed.</text>
  </g>
</svg>
<figcaption><strong>Failure paths are the specification.</strong> Retry, queue and reconciliation are decided in Design, because retrofitting idempotency into a live integration means reprocessing history.</figcaption>
</figure>

## Field evidence

**A live accredited laboratory.** Chemo Test Laboratory runs its daily analytical work on a system we built on our Processious platform: sample intake, administrative and technical review, authorization, multi-step signing and tamper-evident report delivery. Two parts are verifiable from outside our company - the laboratory's own site, and a [public report checker](https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/) where anyone can confirm a certificate is genuine, without an account. [The case study](/case-studies/chemo/) states what we can and cannot claim; we publish no throughput or outcome numbers, because we have not measured any.

**A system that lasted.** A 600-form Microsoft Access sprawl we rebuilt into one workflow-driven application in 2011 is, by the laboratory's account, still in daily service about fifteen years later. That is client-reported longevity, not a measurement of ours - and it is the reason this practice treats maintainability as an acceptance condition rather than an aspiration.

**The method is published.** The journey-first approach these engagements use is written up as [a method paper](/white-papers/consumer-journey-systems-development/) with its sources and its traceability matrix, and the field report behind it - [how the method reached a laboratory at all](/insights/journey-mapping-in-software-engineering/) - is published separately. You can read the method and judge it before you hire anyone.

## Controls and assurance

**Quality and security management.** ManiarTech's quality and information-security management systems have been independently audited by URS under UKAS accreditation. Current certificate status can be verified with the registrar using certificate numbers 123961/B/0001 and 123961/A/0001.

**Who does the work.** Client work is led and reviewed by ManiarTech's senior engineering core, with vetted specialists engaged where the problem requires them. We do not substitute trainees for the experienced engineers presented during the engagement. ManiarTech has delivered software as a company since 2010; it was founded by [Aamir Maniar](/about/), whose software-engineering career began in 1999 and includes building financial-technology systems at JP Morgan.

**Testing and acceptance.** Acceptance is organized by journey rather than by module - a named traveler walked end to end, plus its rejection, rework and escalation paths. Module-level tests can all pass while the journey fails; that is precisely the defect class this practice targets.

**Operational readiness.** The system ships able to answer where things are, what failed and what is slow: status views derived from enforced states, exception queues with owners, and reconciliation reports on a schedule.

**Technology choice.** Mainstream stacks another team can hire for and maintain. Where we use something we authored, it is a decision we justify and you can decline - our own standards and libraries are [published with their actual status](/standards/), and nothing on that page is something we require a client to adopt.

## Where this practice fits, and where it does not

<div class="svc-fit">
<div class="is-fit">
<h3>A good fit</h3>
<ul>
<li>Work crosses departments, roles or organizations, and the handoffs are where things go wrong.</li>
<li>Approvals, delegation and separation of duties are real requirements, not preferences.</li>
<li>An auditor, regulator or customer may need the system to prove what happened.</li>
<li>The process is genuinely known to the people doing it, even if it has never been written down.</li>
<li>You can commit an accountable owner per department, and users who can absorb a change.</li>
</ul>
</div>
<div class="is-not">
<h3>A poor fit</h3>
<ul>
<li>The process itself is undecided and the software is expected to settle the argument. Decide the process first; we can help, but not by building.</li>
<li>Nobody can be made accountable for a transition. If no one may approve, the system cannot enforce approval.</li>
<li>A bounded product with one user population and no cross-department governance - that is <a href="/services/application-software-engineering/">application and product engineering</a>, and it is a different discipline.</li>
<li>A packaged product already fits. We will say so; the cheapest enterprise system is the one you do not commission.</li>
<li>The date is fixed before the exception paths are known. We would rather decline than agree to a plan we expect to miss.</li>
</ul>
</div>
</div>

<span id="begin" style="scroll-margin-top:88px;"></span>

## How to begin

Bring us the system that has to be right. The first conversation is technical: what the work is, where it crosses boundaries, what has to be provable afterwards, and what happens today when something is rejected. From that we can tell you which practice fits, what the first stage would examine, and whether we are the right firm at all.

An estimate follows once the problem is understood. It is not something we can responsibly produce before.

<p class="svc-action"><a href="/contact/">Discuss an operational system &rarr;</a></p>
