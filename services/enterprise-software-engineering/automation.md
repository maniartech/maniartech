---
heading: "Process automation & enterprise workflows"
---

The flagship, and the part most vendors get wrong. Automating a business process is not "add a status field" - it is modeling the process as states and transitions the system *enforces*: who may move a record forward, what happens on rejection, who inherits an approval when the approver is on leave, and how long a step may sit before someone is notified. In the laboratory platform we run in production, a result physically cannot reach a report until intake, technical review and authorization have each been completed by a person entitled to do them - the software will not construct the report otherwise. In the presales platform we shipped in 2026, discounts are not a text box; they are governed, approval-gated adjustments, because pretending discounts do not happen just pushes them into untracked side deals.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 216" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An enforced workflow: submit, review, authorize, release - a rejection path returns to the maker with a reason, delegation covers an absent approver, and every transition is stamped with the user and time">
  <g font-family="Consolas, monospace" font-size="12">
    <rect x="20" y="46" width="140" height="46" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="38" y="68" fill="#fff" font-weight="600">submit</text>
    <text x="38" y="84" fill="rgba(255,255,255,.5)" font-size="10.5">maker</text>
    <path d="M160 69 h34 M194 69 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="201" y="46" width="140" height="46" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="219" y="68" fill="#fff" font-weight="600">review</text>
    <text x="219" y="84" fill="rgba(255,255,255,.5)" font-size="10.5">checker - never the maker</text>
    <path d="M341 69 h34 M375 69 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="382" y="46" width="150" height="46" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="400" y="68" fill="#fff" font-weight="600">authorize</text>
    <text x="400" y="84" fill="rgba(255,255,255,.5)" font-size="10.5">delegable on leave</text>
    <path d="M532 69 h34 M566 69 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="573" y="46" width="167" height="46" rx="8" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.6)"/>
    <text x="591" y="68" fill="#14cf93" font-weight="600">release</text>
    <text x="591" y="84" fill="rgba(255,255,255,.55)" font-size="10.5">only from authorized data</text>
    <path d="M271 92 v36 h-181 v-32" stroke="rgba(255,183,77,.55)" fill="none" stroke-dasharray="4 4"/>
    <path d="M90 96 l-4 7 h8 z" fill="rgba(255,183,77,.6)"/>
    <text x="110" y="146" fill="rgba(255,183,77,.8)" font-size="10.5">rejected -> back to the maker, with the reason on the record</text>
    <text x="20" y="188" fill="rgba(255,255,255,.55)" font-size="10.5">every transition stamped: who, when, from-state, to-state | SLA timers escalate steps that sit too long | exceptions queue for a human</text>
  </g>
</svg>
<figcaption><strong>An enforced chain, not a decorated one.</strong> This is the workflow DNA running a client laboratory in production today - checkboxes get checked, state machines get obeyed.</figcaption>
</figure>

What this covers in practice: approval and authorization chains, maker-checker separation, role matrices and delegation, exception queues, SLA timers and escalations, notifications over the channels your team actually reads (email, WhatsApp), and audit trails written at the moment of action - not reconstructed later. Delivered department by department through the Keystone Method below, because a process is only automatable once it is understood.
