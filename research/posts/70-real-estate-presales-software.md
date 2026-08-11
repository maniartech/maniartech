---
audience: "enterprise"
contentType: "field-report"
evidenceType: "Production field evidence"
artifactLabel: "The live platform"
artifactUrl: "https://sales.shanteehomes.com"
authorUrl: "https://www.linkedin.com/in/aamironline"
author: "Aamir Maniar"
authorRole: "Managing Director & Engineering Head"
title: "Real estate presales software: what building Sales Navigator taught us"
description: "Inventory, interactive floor plans, presentation-driven selling, RERA milestone payment plans, and role-based access - the real domain problems of presales software, learned by building a full platform in about four months."
date: "2026-07-27"
titleTag: "Real Estate Presales Software - Build Lessons"
seoDescription: "What building Sales Navigator taught us about presales platforms: inventory, floor plans, RERA milestone payment plans and estimates a buyer can trust."
thread: "domains"
shortTitle: "Presales software"
receipts:
  - "proptech"
  - "RERA"
keyReceipt: "built in ~4 months"
---

Presales is the part of real estate that happens before a booking exists: showing projects, walking a customer through floor plans and pricing, producing an estimate they can take home, and keeping track of which units are actually available. At most developers - including established ones with thousands of homes delivered - this still runs on a mix of printed brochures, slide decks, spreadsheets, and phone calls.

We recently built a complete presales platform, end to end, for an established residential and commercial developer in the Mumbai metropolitan region. It is called Sales Navigator, it went from proposal to production in roughly four months, and it launched recently - live at [sales.shanteehomes.com](https://sales.shanteehomes.com). The full write-up is in the [case study](/case-studies/sales-navigator/); this post is about the domain itself - what real estate presales software actually has to solve, which we did not fully appreciate until we built one.

## What real estate presales software actually has to do

The naive version of the brief is "a website with our projects on it." The real scope is wider, because presales is a workflow, not a brochure:

- **Project and inventory management.** Multiple projects, each with wings, floors, and units; every unit carrying a type, an area, a price basis, and a live status. The inventory is the spine - everything else hangs off it.
- **Interactive floor plans.** Customers do not buy from a table of unit numbers. They buy from a plan they can zoom into and a unit they can point at. Making plans first-class objects - selectable, linked to live availability and pricing - is much of what separates presales software from a listings page.
- **Estimation.** The moment a customer is interested, they want a number - a complete, defensible one, on the spot. This turned out to be the hardest module (more below).
- **Presentation.** Real-estate selling is performance: a sales executive with a tablet, walking a family through a project. The software has to serve that moment, not just store data.
- **Sharing and follow-up.** Whatever the customer saw - the estimate above all - has to reach them over the channels they actually use. Here that means WhatsApp and email, as branded, professional documents.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The presales journey the platform is organised around: present, explore, estimate, share - with bookings, payments and post-sales deliberately outside the version-one boundary">
  <g font-family="Consolas, monospace" font-size="12">
    <text x="20" y="30" fill="rgba(255,255,255,.8)" font-size="12.5" font-weight="600" font-family="inherit">The selling journey the system is organised around - not the database entities</text>
    <rect x="20" y="52" width="150" height="56" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="38" y="76" fill="#fff" font-weight="600">PRESENT</text>
    <text x="38" y="94" fill="rgba(255,255,255,.55)" font-size="10.5">tablet, in the room</text>
    <path d="M170 80 h22 M192 80 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="199" y="52" width="150" height="56" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="217" y="76" fill="#fff" font-weight="600">EXPLORE</text>
    <text x="217" y="94" fill="rgba(255,255,255,.55)" font-size="10.5">floor plans, live units</text>
    <path d="M349 80 h22 M371 80 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="378" y="52" width="150" height="56" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="396" y="76" fill="#fff" font-weight="600">ESTIMATE</text>
    <text x="396" y="94" fill="rgba(255,255,255,.55)" font-size="10.5">costs + RERA schedule</text>
    <path d="M528 80 h22 M550 80 l-7 -4 v8 z" stroke="rgba(255,255,255,.4)" fill="rgba(255,255,255,.4)"/>
    <rect x="557" y="52" width="150" height="56" rx="10" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="575" y="76" fill="#fff" font-weight="600">SHARE</text>
    <text x="575" y="94" fill="rgba(255,255,255,.55)" font-size="10.5">WhatsApp + email</text>
    <line x1="20" y1="138" x2="740" y2="138" stroke="rgba(255,255,255,.2)" stroke-dasharray="5 5"/>
    <text x="20" y="164" fill="rgba(255,255,255,.5)" font-size="10.5">below this line - bookings, payments, post-sales, construction tracking: OUT of v1 by decision, not omission.</text>
    <text x="20" y="182" fill="rgba(255,255,255,.5)" font-size="10.5">cutting at the presales boundary is why it shipped in months.</text>
  </g>
</svg>
<figcaption><strong>The scope, drawn.</strong> Four stages in, everything else deliberately out - the boundary is the reason the platform went from proposal to production in roughly four months.</figcaption>
</figure>

## RERA payment plan software: why the estimation engine is the hard part

A real-estate estimate in India is not "price times area." A complete one covers the agreement value at a per-square-foot rate, GST, stamp duty, registration charges, development and legal charges, amenities and maintenance - each governed by its own rules, some varying by jurisdiction. We built the tax and charge structures as configurable masters rather than hardcoded logic, because these rules change and the sales team cannot wait for a developer every time they do.

Then comes the part specific to how under-construction property is sold: the **milestone payment plan**. Under RERA, buyers pay in instalments tied to construction stages - a percentage on booking, on plinth, on each slab, on possession. A serious estimate lays this entire schedule out: each milestone, its percentage, its amount. Sales Navigator generates that plan automatically and renders the whole thing - cost breakdown plus payment schedule, RERA registration details referenced - as a clean, branded estimate sheet ready to print or share.

One more piece proved essential: a **discount approval workflow**. Discounts happen in real sales conversations, and pretending otherwise just pushes them into untracked side deals. Modeling discounts as governed, approval-gated adjustments keeps the flexibility and the control.

If you are evaluating RERA payment plan software, this is the checklist we would apply: configurable taxes and charges, milestone schedules generated rather than typed, governed discounts, and output a customer can actually be handed.

## Presentation-driven selling changes the design

Because the primary user is a sales executive holding a tablet in front of a customer, the platform includes a slide-based presentation builder - the sales team composes branded project "stories" (themes, transitions, per-slide media) and publishes them without touching a designer. Behind it sits a digital asset library for images, brochures, floor plans, and video, so every artifact a presentation needs lives in one managed place.

<p class="mt-pull">The lesson: in this domain, <em>the demo is the product</em>. A platform that is merely a good database will not be used in the room where selling happens.</p>

Software that is not in that room decays into an admin chore - however complete its data model.

## Role-based access: what the customer must never see

Presales software has two audiences with opposite needs. The customer should see a polished showcase; the sales team additionally needs live unit availability - available, on hold, sold. That inventory status is commercially sensitive and customer-invisible by design: staff see it, buyers never do. Role-based users and groups govern the rest - who edits content, who approves discounts, who manages masters.

This sounds like a standard access-control exercise, and mechanically it is. The domain lesson is how much of the client's trust rode on it.

<aside class="mt-callout is-flip">
<span class="co-tag">The question that mattered</span>
<p>"Can a customer ever see the sold board?" was among the first questions the client asked - and the answer had to be architectural, not procedural. A policy can be forgotten; a permission model cannot.</p>
</aside>

## What four months taught us

- **Scope to presales, deliberately.** The platform excludes bookings, payments, post-sales, and construction tracking - by decision, not omission. Mapping the developer's actual workflow and cutting v1 at the presales boundary is why it shipped in months, on a foundation built to extend later.
- **The workflow beats the feature list.** The system is organised around the selling journey - present, explore, estimate, share - rather than around database entities. Our laboratory work taught us the same thing in a different vocabulary: model the flow, not the forms.
- **Configurability is a feature the buyer will not name.** Nobody asks for "masters" in a requirements meeting. But taxes, jurisdictions, amenities, and charge structures all change, and every one we made configurable is a future change request that never needs to be filed.
- **Breadth in months is a composition story.** Showcase, presentation builder, portfolio, floor plans, estimation engine, asset library, access control - built in roughly four months on a current mainstream stack (Django, React, PostgreSQL, AWS). That pace is possible because we compose from building blocks proven in earlier systems rather than starting each platform from zero.

## Where it stands - honestly

Sales Navigator launched recently. It is live, and the developer's team is beginning to run presales on it - which means there are no business outcomes to report yet, and we will not manufacture any. We state what is true today: the platform exists, it is in production, and you can see it at [sales.shanteehomes.com](https://sales.shanteehomes.com). When real results are in, the [case study](/case-studies/sales-navigator/) will carry them.

If your sales team is running presales on spreadsheets and slide decks, [tell us how it works today](/estimate/) - a senior engineer reviews it and responds with an honest read on what software would and would not fix.
