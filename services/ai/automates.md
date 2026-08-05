---
heading: "AI in the workflow - extraction, classification, drafting, with a human gate"
---

The repetitive load in most operations is reading and re-typing: an email becomes a ticket, an invoice becomes ledger lines, a form becomes fields in the system. AI now does that reading well - but "well" is not "always", so the engineering that matters is the gate: every extraction carries a **confidence measure**, high-confidence cases flow straight through, and everything below the threshold lands in a **review queue** where a person confirms or corrects in seconds. The corrections feed back, the threshold is tuned on your real documents, and nothing the model was unsure about ever silently enters your records.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 216" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The confidence gate: a document is read by the model into structured fields; extractions above the confidence threshold flow into the system of record, extractions below it go to a human review queue whose corrections feed back into tuning">
  <g font-family="Consolas, monospace" font-size="12">
    <rect x="20" y="60" width="150" height="50" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="38" y="82" fill="#fff" font-weight="600">document</text>
    <text x="38" y="100" fill="rgba(255,255,255,.5)" font-size="10.5">invoice, email, form</text>
    <path d="M170 85 h34 M204 85 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="211" y="60" width="180" height="50" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="229" y="82" fill="#fff" font-weight="600">extract fields</text>
    <text x="229" y="100" fill="rgba(255,255,255,.5)" font-size="10.5">each with a confidence</text>
    <path d="M391 85 h34 M425 85 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="432" y="24" width="308" height="52" rx="8" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.6)"/>
    <text x="450" y="45" fill="#14cf93" font-weight="600">confident -> straight through</text>
    <text x="450" y="64" fill="rgba(255,255,255,.55)" font-size="10.5">into the system of record</text>
    <rect x="432" y="112" width="308" height="52" rx="8" fill="rgba(255,183,77,.07)" stroke="rgba(255,183,77,.5)"/>
    <text x="450" y="133" fill="rgba(255,183,77,.9)" font-weight="600">unsure -> human review queue</text>
    <text x="450" y="152" fill="rgba(255,255,255,.55)" font-size="10.5">a person confirms or corrects</text>
    <path d="M432 138 h-131 v-23" stroke="rgba(255,255,255,.3)" fill="none" stroke-dasharray="4 4"/>
    <path d="M301 111 l-4 7 h8 z" fill="rgba(255,255,255,.4)"/>
    <text x="20" y="188" fill="rgba(255,255,255,.55)" font-size="10.5">corrections feed back - the threshold is tuned on YOUR documents, never silently recorded past it</text>
    <text x="20" y="206" fill="rgba(255,255,255,.55)" font-size="10.5">before production: measured accuracy on a set of your real historical cases decides where the threshold sits</text>
  </g>
</svg>
<figcaption><strong>The confidence gate.</strong> Nothing the model was unsure about enters your records unchecked - that single design decision is the difference between an AI demo and an AI system.</figcaption>
</figure>

The same pattern covers classification (routing incoming work to the right queue), drafting (a reply or summary a person edits rather than writes), and flagging (the anomaly a human should look at first). Before any of it reaches production we evaluate it against a set of your actual historical cases - measured accuracy on your data, not a vendor benchmark - because that number is what decides where the threshold belongs. It is workflow engineering with a model inside, which is why it plugs into the enterprise systems we build rather than arriving as a separate chatbot.
