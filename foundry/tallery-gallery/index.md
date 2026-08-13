---
title: "Enterprise DAM"
headline: "Assets as governed records, not files in a folder."
description: "A digital-asset-management platform in development, offered as a managed service: ingestion, metadata, permissions, review and distribution, with audit history."
eyebrow: "Product"
titleTag: "Enterprise DAM - Digital Asset Management"
seoDescription: "Enterprise DAM: assets as governed records - metadata, permissions, review, distribution and audit history. Early-stage; managed service."
order: 4
tocDepth: "3"
statusLine: "Early-stage | Private | Managed-service model | No production deployment claimed"
railMeta:
  - { k: "Type", v: "Product - digital asset management" }
  - { k: "Maturity", v: "Early-stage, in development" }
  - { k: "Availability", v: "Private; offered as a managed service" }
  - { k: "Licence", v: "Proprietary" }
  - { k: "Adoption", v: "Managed-service engagement; no self-serve tier" }
  - { k: "Evidence", v: "Our own product under active development; no production deployment claimed" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Application & Product Engineering"
    note: "The practice building this product"
    url: "/services/application-software-engineering/"
  - label: "Booster"
    note: "The tool that orchestrates this product's development stack"
    url: "/products/booster/"
privateReview: "The product is in development and private. A demonstration for qualified customers is possible by arrangement; a masked interface tour will join this page when captures are approved."
---

Every organization accumulates assets - images, documents, media, brand material - and most keep them in a shared drive where the only metadata is a filename, the only permission is "everyone", and the only history is whoever remembers. A digital asset management system's job is to make assets behave like **governed records**: described, permissioned, versioned, reviewed, and accountable.

## The lifecycle is the product

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The asset lifecycle: ingestion attaches metadata; permissions govern access; renditions are derived per channel; review and approval gate publication; distribution delivers approved assets; and an audit history records every step across the whole lifecycle">
  <g font-family="inherit" font-size="12">
    <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)" stroke-width="1.2">
      <rect x="30"  y="50" width="105" height="44" rx="8"/>
      <rect x="152" y="50" width="105" height="44" rx="8"/>
      <rect x="274" y="50" width="105" height="44" rx="8"/>
      <rect x="396" y="50" width="120" height="44" rx="8"/>
      <rect x="533" y="50" width="105" height="44" rx="8"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600" font-size="11.5">
      <text x="82"  y="69">ingestion</text>
      <text x="204" y="69">metadata</text>
      <text x="326" y="69">permissions</text>
      <text x="456" y="69">review + approval</text>
      <text x="585" y="69">distribution</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10">
      <text x="82"  y="85">files arrive</text>
      <text x="204" y="85">described, findable</text>
      <text x="326" y="85">who sees what</text>
      <text x="456" y="85">gate before publish</text>
      <text x="585" y="85">to channels</text>
    </g>
    <g stroke="rgba(20,207,147,.5)" stroke-width="1.4">
      <line x1="135" y1="72" x2="150" y2="72"/><line x1="257" y1="72" x2="272" y2="72"/>
      <line x1="379" y1="72" x2="394" y2="72"/><line x1="516" y1="72" x2="531" y2="72"/>
    </g>
    <rect x="274" y="130" width="105" height="40" rx="8" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.35)"/>
    <text x="326" y="149" text-anchor="middle" fill="rgba(255,255,255,.75)" font-size="11">renditions</text>
    <text x="326" y="163" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10">derived per channel</text>
    <path d="M326 96 L326 128" stroke="rgba(255,255,255,.3)" stroke-width="1.3" stroke-dasharray="4 3"/>
    <rect x="30" y="196" width="608" height="42" rx="9" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="334" y="215" text-anchor="middle" fill="#14cf93" font-weight="600">audit history</text>
    <text x="334" y="231" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">every step above writes to it - who ingested, who approved, who distributed, when</text>
  </g>
</svg>
<figcaption><strong>Governance is the difference between a DAM and a drive.</strong> Metadata makes assets findable, permissions make access deliberate, review gates publication, and the audit history makes the whole lifecycle answerable - the same record-keeping discipline as any governed enterprise system.</figcaption>
</figure>

Under the hood it is a deliberately mainstream stack - a Python/Django backend, a React client, PostgreSQL with vector search behind the AI-assisted search and chat over asset contents - because a product meant to hold an organization's assets for years must be maintainable by ordinary teams, including one day the customer's own.

## Known limits

- **Early-stage.** The product is in development; its maturity and its commercial model are two different facts, and this page keeps them apart.
- **No production deployment is claimed.** The managed-service offer is a commercial position, not operating evidence.
- **Private.** No public artifact or trial exists; interface captures will join this page when approved.

## Status: four facts, kept separate

- **Availability** - private, offered as a **managed service** - we run it for you, rather than shipping software.
- **Licence** - proprietary.
- **Maturity** - **early-stage, in development.**
- **Adoption** - by managed-service engagement; no self-serve tier.

## What this demonstrates

A DAM is quietly one of the harder product shapes: files with lifecycles, permissions with organizational meaning, search across content types, and a history someone will one day audit. Building ours on a mainstream, maintainable stack - and refusing to claim operating evidence before it exists - shows the posture we bring to any customer system that must hold valuable material for years: governed, boring underneath, and accurate about its own maturity.
