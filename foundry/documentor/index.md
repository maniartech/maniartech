---
title: Documentor.AI
description: An AI document platform - describe the document you want; it drafts from your own knowledge so it cites your facts, not the internet's.
productStatus: Early-stage
---

Documentor.AI is an AI document platform with a simple idea: describe the document you want, and it
drafts it from *your own knowledge* - so it works from your facts, not the open internet's.

## How it works

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your sources flow into a knowledge base, a drafting agent writes against it, producing a document that cites your sources; a feedback loop runs from the document back to the agent labeled: you review and steer in chat">
  <g font-family="inherit" font-size="12.5">
    <g fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" stroke-width="1.2">
      <rect x="40" y="48" width="150" height="52" rx="8"/>
      <rect x="228" y="48" width="160" height="52" rx="8"/>
      <rect x="610" y="48" width="116" height="52" rx="8"/>
    </g>
    <rect x="426" y="48" width="150" height="52" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2"/>
    <g text-anchor="middle">
      <text x="115" y="68" fill="rgba(255,255,255,.78)" font-weight="600">Your sources</text>
      <text x="115" y="86" fill="rgba(255,255,255,.5)" font-size="11">PDFs, docs, notes</text>
      <text x="308" y="68" fill="rgba(255,255,255,.78)" font-weight="600">Knowledge base</text>
      <text x="308" y="86" fill="rgba(255,255,255,.5)" font-size="11">indexed for retrieval</text>
      <text x="501" y="68" fill="rgba(255,255,255,.85)" font-weight="600">Drafting agent</text>
      <text x="501" y="86" fill="rgba(255,255,255,.55)" font-size="11">grounded in your facts</text>
      <text x="668" y="68" fill="rgba(255,255,255,.78)" font-weight="600">Document</text>
      <text x="668" y="86" fill="rgba(255,255,255,.5)" font-size="11">cites your sources</text>
    </g>
    <g stroke="rgba(255,255,255,.45)" stroke-width="1.5">
      <line x1="190" y1="74" x2="221" y2="74"/>
      <line x1="388" y1="74" x2="419" y2="74"/>
      <line x1="576" y1="74" x2="603" y2="74"/>
    </g>
    <g fill="rgba(255,255,255,.5)">
      <polygon points="221,69 221,79 228,74"/>
      <polygon points="419,69 419,79 426,74"/>
      <polygon points="603,69 603,79 610,74"/>
    </g>
    <polyline points="665,100 665,140 501,140 501,110" fill="none" stroke="rgba(20,207,147,.55)" stroke-width="1.5"/>
    <polygon points="496,112 506,112 501,104" fill="rgba(20,207,147,.7)"/>
    <text x="583" y="162" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">you review and steer in chat; the agent asks when unsure</text>
  </g>
</svg>
<figcaption><strong>Grounding first, drafting second.</strong> The agent only writes after your material is indexed, so claims trace back to your sources - and the loop back from the document is the point: drafting is a conversation you steer, not a one-shot dump of text.</figcaption>
</figure>

You upload the material that defines what is true for you - PDFs, documents, notes - and it is
indexed into a knowledge base built for retrieval. When you describe the document you want, a
drafting agent writes against that knowledge base, so the output cites your facts instead of
improvising from the open internet. Then the loop closes: you refine the draft section by section
in chat - insert, rewrite, restructure - while the agent streams its changes and asks rather than
guesses when it's unsure. A person stays in the loop the whole way.

## Where it stands

Documentor.AI is **early-stage**. We're actively building it; it isn't open for general use yet, and
we'll say so plainly here when that changes. There are no sign-ups, tiers, or prices to quote today.

## Why we're building it

Most AI writing tools are fluent and unmoored - confident text with no grounding in what's true for
*you*. Documentor.AI is our attempt to fix that at the root: grounding drafts in a knowledge base you
control, so the output cites your facts and stays accountable to them.
