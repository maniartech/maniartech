---
heading: "Answers from your documents - with the source shown"
---

The answers your team hunts for already exist in contracts, manuals, test reports and tickets; the failure is retrieval, not knowledge. The mechanics of doing this properly: your documents are indexed and stay yours; when someone asks, the system retrieves the relevant passages first and the model answers **only from what was retrieved** - with a citation to the exact document and passage it drew on, so anyone can click through and verify. When retrieval finds nothing relevant, the honest output is "not in your documents" - a grounded system is allowed to say "I don't know", and one that never says it should worry you.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grounded answering flow: a question goes to retrieval over your own documents; if relevant passages are found the model answers only from them, with a citation to the source; if nothing relevant is found the system says not in your documents instead of guessing">
  <g font-family="Consolas, monospace" font-size="12">
    <rect x="20" y="46" width="150" height="50" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="38" y="68" fill="#fff" font-weight="600">question</text>
    <text x="38" y="86" fill="rgba(255,255,255,.5)" font-size="10.5">from your team</text>
    <path d="M170 71 h34 M204 71 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="211" y="46" width="190" height="50" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)"/>
    <text x="229" y="68" fill="#fff" font-weight="600">retrieve first</text>
    <text x="229" y="86" fill="rgba(255,255,255,.5)" font-size="10.5">YOUR documents, indexed + yours</text>
    <path d="M401 71 h34 M435 71 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="442" y="24" width="298" height="56" rx="8" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.6)"/>
    <text x="460" y="46" fill="#14cf93" font-weight="600">answer, with the source shown</text>
    <text x="460" y="66" fill="rgba(255,255,255,.55)" font-size="10.5">cites the document and passage</text>
    <rect x="442" y="96" width="298" height="56" rx="8" fill="rgba(255,183,77,.07)" stroke="rgba(255,183,77,.5)"/>
    <text x="460" y="118" fill="rgba(255,183,77,.9)" font-weight="600">"not in your documents"</text>
    <text x="460" y="138" fill="rgba(255,255,255,.55)" font-size="10.5">nothing found -> say so, never guess</text>
    <text x="20" y="188" fill="rgba(255,255,255,.55)" font-size="10.5">where the answer feeds a decision, the evidence goes to a person before anything acts on it</text>
  </g>
</svg>
<figcaption><strong>Grounded, drawn.</strong> The model never answers from thin air: it answers from what retrieval found in your own documents, or it says it found nothing. Both paths are honest.</figcaption>
</figure>

Where the answer feeds a decision - a quoted clause, a compliance position - the system is built to show its evidence to a person rather than act alone. This is the same architecture behind [Documentor](/products/documentor/), the AI document platform we are building ourselves: generation grounded in uploaded knowledge, a person in the loop by design. We run these mechanics on our own product before recommending them on yours.
