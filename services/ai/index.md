---
title: "Applied AI Systems"
headline: "An AI answer without inspectable evidence is not ready to enter an operational workflow."
description: "Engineering probabilistic components into systems that carry consequence - suitability triage, grounding, evaluation, confidence and escalation, and the operational controls that make a model's behaviour governable."
eyebrow: "Engineering practice"
seoDescription: "Applied AI engineering: use-case triage, grounding and citations, evaluation sets, confidence and escalation policy, and model-change control."
order: 4
tocDepth: 3
action:
  label: "The decisions this practice owns"
  url: "#the-decisions-we-take-responsibility-for"
factsKicker: "Up front - what this practice controls, what you receive, and where we say no"
facts:
  - tag: "The situation"
    k: "A probabilistic component"
    note: "Being considered for a workflow that has to be right, or at least accountable when it is not."
  - tag: "The first deliverable"
    k: "Whether to use AI at all"
    note: "A suitability assessment that frequently concludes a deterministic rule is the better engineering."
  - tag: "What you receive"
    k: "An evaluation set"
    note: "Your own labelled cases, a failure taxonomy, a confidence and escalation policy, and a model-change checklist."
evidence:
  - label: "Content Engine"
    note: "Delivered client work, 2010-2011. Classical NLP, not modern LLM delivery. Current operating status not claimed."
    url: "/case-studies/content-engine/"
  - label: "Documentor"
    note: "Our own product, early-stage and in development. Not a customer deployment."
    url: "/products/documentor/"
  - label: "Where our AI work stands"
    note: "Maturity stated per artifact, on this page"
    url: "#where-our-own-ai-work-actually-stands"
artifact: "An AI suitability matrix, an evaluation scorecard against your own cases, a failure taxonomy, a confidence and escalation policy, and a model-change checklist."
artifactAnchor: "#artifacts"
---

The interesting question about AI in a business system is not what a model can do in a demonstration. It is what the system does on the day the model is confidently wrong - because it will be, and the workflow around it decides whether that is a caught exception or a decision nobody can reconstruct.

This practice is about placing probabilistic components inside systems that carry consequence. That is an engineering problem with a literature of its own: grounding, evaluation, calibration, escalation, and change control. It is not a catalogue of use cases.

## The first deliverable is often "do not use a model for this"

A large share of the problems brought to us as AI problems are better solved by a deterministic rule, a search index, a form validation, or fixing the data. Those solutions are testable, explainable, cheap, and they do not drift when a vendor updates a model.

So the practice starts with triage, and the triage has teeth: we would rather lose the AI portion of an engagement than put a probabilistic component where a rule belongs. The suitability question is not "could a model do this?" but **"what does being wrong cost here, how would we know, and who catches it?"**

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Decision gate diagram: an input is assessed for confidence and grounding; high-confidence grounded answers proceed with citations, low-confidence answers abstain and escalate to a human, and where the model is unavailable or unsuitable a deterministic fallback path is used.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="26" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">What happens when the model is not sure</text>
    <rect x="40" y="120" width="120" height="44" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="100" y="147" text-anchor="middle" fill="rgba(255,255,255,.85)">Request</text>
    <path d="M160 142 L212 142" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="212" y="112" width="140" height="60" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.4)"/>
    <text x="282" y="136" text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="12">Grounded?</text>
    <text x="282" y="156" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">sources retrieved + cited</text>
    <path d="M352 128 L410 96" stroke="rgba(20,207,147,.6)" stroke-width="1.4"/>
    <path d="M352 156 L410 190" stroke="rgba(255,200,120,.6)" stroke-width="1.4"/>
    <rect x="410" y="70" width="150" height="52" rx="8" fill="rgba(20,207,147,.10)" stroke="rgba(20,207,147,.6)"/>
    <text x="485" y="92" text-anchor="middle" fill="#14cf93" font-size="12" font-weight="600">Answer with citations</text>
    <text x="485" y="110" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">reviewer can check the source</text>
    <rect x="410" y="164" width="150" height="52" rx="8" fill="rgba(255,200,120,.08)" stroke="rgba(255,200,120,.55)"/>
    <text x="485" y="186" text-anchor="middle" fill="rgba(255,200,120,.9)" font-size="12" font-weight="600">Abstain, escalate</text>
    <text x="485" y="204" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="10.5">named human queue, not silence</text>
    <rect x="410" y="238" width="150" height="44" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)"/>
    <text x="485" y="266" text-anchor="middle" fill="rgba(255,255,255,.72)" font-size="12">Deterministic fallback</text>
    <path d="M282 172 C 282 260, 340 260, 406 260" stroke="rgba(255,255,255,.3)" stroke-width="1.3" stroke-dasharray="4 3" fill="none"/>
    <text x="300" y="248" fill="rgba(255,255,255,.45)" font-size="10.5">provider down, or out of scope</text>
    <text x="600" y="96" fill="rgba(255,255,255,.5)" font-size="11">logged with</text>
    <text x="600" y="112" fill="rgba(255,255,255,.5)" font-size="11">inputs + sources</text>
    <text x="600" y="190" fill="rgba(255,255,255,.5)" font-size="11">counted as a</text>
    <text x="600" y="206" fill="rgba(255,255,255,.5)" font-size="11">measured outcome</text>
  </g>
</svg>
<figcaption><strong>Abstention is a feature.</strong> A system that cannot decline is a system that guesses; the escalation path is what makes the confident answers usable.</figcaption>
</figure>

## The failure modes this practice is designed to prevent

<ul class="svc-failures">
<li><b>The ungrounded answer</b><p>The model produces something plausible with no retrievable source. It is right often enough to be trusted, and wrong often enough to matter.</p><span class="svc-control"><b>Control:</b> retrieval with citations, and a test that fails when an answer cites nothing the reviewer can open.</span></li>
<li><b>Evaluation by demonstration</b><p>The system was judged on examples chosen because they worked. Nobody knows the accuracy on the cases that actually occur.</p><span class="svc-control"><b>Control:</b> an evaluation set built from YOUR real cases, labelled by someone who knows the domain, scored before launch and after every change.</span></li>
<li><b>Uniform confidence</b><p>The system answers identically whether it is certain or guessing, so the reviewer has nothing to prioritize.</p><span class="svc-control"><b>Control:</b> a confidence and abstention policy, with thresholds set from measured performance rather than intuition.</span></li>
<li><b>Silent model change</b><p>The vendor updates the model. Behaviour shifts. Nobody notices until an outcome is questioned months later.</p><span class="svc-control"><b>Control:</b> version pinning where the provider supports it, plus re-running the evaluation set as a release gate.</span></li>
<li><b>Prompt injection through content</b><p>Instructions hidden in a document or a web page are followed as if they came from the user.</p><span class="svc-control"><b>Control:</b> retrieved content treated as untrusted data, privileged actions gated behind explicit confirmation, and injection cases carried in the evaluation set.</span></li>
<li><b>The unbounded dependency</b><p>The workflow cannot function if one vendor changes pricing, terms or availability - and the cost per request was never budgeted.</p><span class="svc-control"><b>Control:</b> a stated cost and latency budget, a deterministic fallback, and an exit path assessed before the build.</span></li>
<li><b>Nobody owns the wrong answer</b><p>An AI-assisted decision is questioned and no one can say what the system saw, what it returned, or who accepted it.</p><span class="svc-control"><b>Control:</b> inputs, retrieved sources, output and the accepting human recorded as an audit trail.</span></li>
</ul>

## The decisions we take responsibility for

<div class="svc-decisions">
<dl>
<dt><span>Whether to use a model at all</span><span>What it turns on</span></dt>
<dd><span></span><span>Cost of being wrong, detectability, and whether a deterministic alternative exists. This decision is made first and revisited if evaluation disappoints.</span></dd>
<dt><span>Grounding and attribution</span><span></span></dt>
<dd><span></span><span>What the model may see, how sources are retrieved, and whether an answer must carry citations a human can open.</span></dd>
<dt><span>Evaluation design</span><span></span></dt>
<dd><span></span><span>Which cases form the set, who labels them, what counts as correct, and what score is good enough to launch - agreed before the number exists.</span></dd>
<dt><span>Confidence, abstention and escalation</span><span></span></dt>
<dd><span></span><span>What the system does when unsure: answer with a caveat, abstain, or route to a named human queue with the context attached.</span></dd>
<dt><span>Human review boundaries</span><span></span></dt>
<dd><span></span><span>Which decisions require a human before they take effect, which are reviewed after the fact, and which are fully automated.</span></dd>
<dt><span>Data boundaries and vendor terms</span><span></span></dt>
<dd><span></span><span>What data may leave your environment, to which provider and deployment mode, under what retention and training terms - documented and agreed for the engagement before anything flows.</span></dd>
<dt><span>Cost and latency budgets</span><span></span></dt>
<dd><span></span><span>What a request may cost and how long it may take, enforced in the design rather than discovered in an invoice.</span></dd>
<dt><span>Model-change control</span><span></span></dt>
<dd><span></span><span>How a version change is detected, evaluated and approved - the same discipline as any other dependency upgrade.</span></dd>
<dt><span>Portability and exit</span><span></span></dt>
<dd><span></span><span>What it would take to move providers, and what stops working if you must. Assessed at design time, while it is still cheap.</span></dd>
</dl>
</div>

## On data, providers and training - what we actually commit to

We do not make a blanket promise about what a third-party service does with data, because that promise depends on the provider, the deployment mode and the account terms, and it is not ours to give.

What we commit to is the engineering discipline around it: **before customer data enters an AI system, the provider, deployment mode, data location, retention period, training policy and deletion procedure are documented and agreed for the engagement.** Those choices are written into the design record with everything else, and if a workflow cannot tolerate the available terms, that is a finding we report rather than a detail we skip.

Where data sensitivity requires it, the assessment includes options that keep data inside your boundary, and the cost and capability trade-offs of doing so.

## Method, and what must be true to continue

<div class="svc-stage">
<h3 class="svc-stage-h"><span>01</span>Suitability triage</h3>
<p class="svc-stage-sub">Decide whether this should use a model - and be willing to conclude it should not.</p>
<dl>
<dt>Input</dt><dd>The workflow, the decision being made, and what currently goes wrong.</dd>
<dt>Engineering work</dt><dd>Assess cost of error, detectability, data availability and whether a deterministic alternative exists; identify the human already accountable.</dd>
<dt>Decision</dt><dd>Model, rule, or neither.</dd>
<dt>Deliverable</dt><dd>An AI suitability matrix covering each candidate use case.</dd>
<dt>You provide</dt><dd>An accurate account of what happens today when the decision is wrong.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Every candidate is either recommended with a stated success measure, or rejected with a reason - and at least one is usually rejected.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>02</span>Evaluation before build</h3>
<p class="svc-stage-sub">Build the measuring instrument before the thing it measures.</p>
<dl>
<dt>Input</dt><dd>Real cases from your operation, including the awkward ones.</dd>
<dt>Engineering work</dt><dd>Assemble a labelled evaluation set, define correctness, build the failure taxonomy, and establish a baseline - often including how the current manual process scores.</dd>
<dt>Decision</dt><dd>The launch threshold, agreed before any number is known.</dd>
<dt>Deliverable</dt><dd>The evaluation set itself, in your hands, and a scorecard format.</dd>
<dt>You provide</dt><dd>Domain experts to label, and agreement on what "correct" means.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">The set contains the cases that actually occur, including known-hard and adversarial ones, and the threshold is agreed in writing.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>03</span>Build the system around the model</h3>
<p class="svc-stage-sub">The model is a component. The system is grounding, confidence, escalation and logging.</p>
<dl>
<dt>Input</dt><dd>The suitability decision, the evaluation set and the agreed data boundaries.</dd>
<dt>Engineering work</dt><dd>Retrieval and citation, confidence thresholds and abstention, the human-review queue, the deterministic fallback, cost and latency controls, and the audit trail.</dd>
<dt>Decision</dt><dd>Thresholds, review boundaries and fallback behaviour - set from measurement.</dd>
<dt>Deliverable</dt><dd>The working system, its scorecard, and the confidence and escalation policy.</dd>
<dt>You provide</dt><dd>The named humans who staff the review queue.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">The system meets the agreed threshold on the evaluation set, abstains when it should, and every answer is reconstructable from its log.</dd>
</dl>
</div>

<div class="svc-stage">
<h3 class="svc-stage-h"><span>04</span>Operate and control change</h3>
<p class="svc-stage-sub">Behaviour is monitored, and a model change is a release, not an event that happens to you.</p>
<dl>
<dt>Input</dt><dd>A live system and its monitoring.</dd>
<dt>Engineering work</dt><dd>Track accuracy, abstention and escalation rates, cost and latency; re-run evaluation on provider or prompt changes; investigate drift.</dd>
<dt>Decision</dt><dd>Whether a change may ship, and whether the use case still earns its place.</dd>
<dt>Deliverable</dt><dd>An operational monitoring plan and a model-change checklist.</dd>
<dt>You provide</dt><dd>Continued labelling of the cases the system escalates - that is what keeps the set representative.</dd>
<dt class="svc-gate">Exit gate</dt><dd class="svc-gate">Your team can run the evaluation and read the result without us.</dd>
</dl>
</div>

<span id="artifacts" style="scroll-margin-top:88px;"></span>

## What you receive

<div class="svc-artifact">
<div class="svc-art-head"><b>AI suitability matrix</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 01 deliverable</span></div>
<div class="svc-art-body">

| Candidate use case | Cost of being wrong | Detectable? | Deterministic alternative | Verdict |
|---|---|---|---|---|
| Classify inbound documents by type | Low - reviewer sees it next | Yes, immediately | Filename and template rules cover ~70% | **Model, with rules first** |
| Extract totals from invoices | High - flows into a ledger | Only at reconciliation | Template extraction where layouts are known | **Model, human review before posting** |
| Decide credit eligibility | Very high - regulated | Slowly, and disputed | Explicit policy rules already exist | **No. Use the rules.** |
| Draft replies to routine queries | Low - reviewed before sending | Yes, by the sender | Templates cover common cases | **Model, always human-sent** |

</div>
</div>

<div class="svc-artifact">
<div class="svc-art-head"><b>Confidence and escalation policy</b><span class="is-sanitized">Sanitized specimen</span><span>Stage 03 deliverable</span></div>
<div class="svc-art-body">

| Condition | System behaviour | Who sees it |
|---|---|---|
| Grounded, above threshold | Answer with citations; logged with sources | Recorded; sampled in review |
| Grounded, below threshold | Answer marked provisional, queued for review before it takes effect | Named reviewer queue |
| No supporting source retrieved | Abstain - no answer offered | Reviewer queue, flagged as unsupported |
| Retrieved content contains instructions | Content treated as data; privileged actions refused | Security log, counted as an injection attempt |
| Provider unavailable or over budget | Deterministic fallback path | Operations alert |

Every row is a measured outcome, not a hope: abstention and escalation rates are monitored, and a rate that drifts is treated as a defect.

</div>
</div>

Also in the pack: the failure taxonomy, a grounding and citation test, an AI data-flow diagram, a threat-model excerpt, the human-review decision table, the model-change checklist and the operational monitoring plan.

## Where our own AI work actually stands

We state maturity per artifact, because "we have an AI product" is the least informative thing a firm can say:

- **Documentor** - our document-processing product, **early-stage and in development**. Not a customer deployment.
- **Ordin** - **in development**.
- **Content Engine** - historical delivered client work from 2010-2011, an NLP and content-processing system from our engineering history. Current operating status is not claimed, and it is not evidence of modern LLM, agentic or retrieval-augmented delivery.
- **Processious** - our process-automation platform, **in production**, carrying a client laboratory system. It is the substrate AI components would sit inside, not an AI product.

Stated plainly: our depth here is in the engineering discipline around probabilistic components - evaluation, grounding, escalation, change control - and in the operational systems they must live inside. Where a claim would need a shipped customer AI deployment to support it, we do not make it.

## Controls and assurance

**Quality and security management.** ManiarTech's quality and information-security management systems have been independently audited by URS under UKAS accreditation. Current certificate status can be verified with the registrar using certificate numbers 123961/B/0001 and 123961/A/0001.

**Who does the work.** This is not a separate AI team bolted on. Client work is led and reviewed by ManiarTech's senior engineering core, with vetted specialists engaged where the problem requires them. We do not substitute trainees for the experienced engineers presented during the engagement.

**Maintainability.** AI components are engineered to be run by your own team - documented, monitored, with the evaluation set in your hands - so you inherit a system you can operate rather than a dependency on us.

## Where this practice fits, and where it does not

<div class="svc-fit">
<div class="is-fit">
<h3>A good fit</h3>
<ul>
<li>A high-volume judgement where being approximately right is genuinely useful and a human can catch the rest.</li>
<li>Unstructured input - documents, messages, notes - that rules have failed to tame.</li>
<li>An accountable owner exists for the decision the model assists.</li>
<li>You can supply real cases to evaluate against, including the difficult ones.</li>
</ul>
</div>
<div class="is-not">
<h3>A poor fit</h3>
<ul>
<li>A regulated or legally consequential decision that must be explainable rule by rule.</li>
<li>Explicit policy already exists and is stable - implement the policy, not a model of it.</li>
<li>No labelled cases can be produced, so no one could tell whether it works.</li>
<li>The data cannot leave your environment and no acceptable deployment mode exists within your constraints. We would report that rather than proceed.</li>
<li>The goal is to have AI in the product. That is a marketing objective; we are the wrong firm for it.</li>
</ul>
</div>
</div>

<span id="begin" style="scroll-margin-top:88px;"></span>

## How to begin

Bring a use case, not a technology. Describe the decision being made today, who makes it, how often it is wrong, and what happens when it is. The first output is a suitability assessment - and it will tell you plainly where a rule would serve you better than a model.

<p class="svc-action"><a href="/contact/">Evaluate an AI use case &rarr;</a></p>
