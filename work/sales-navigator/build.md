---
title: "What we built"
---

## What we built

A single platform that carries presales from first impression to a signed-off estimate:

- **An integrated showcase and presentation builder.** A polished, mobile- and tablet-ready presentation of the company and its projects, plus a slide-based "story" builder - themes, transitions, per-slide media - so the sales team can craft and publish guided, branded walkthroughs without touching a designer. All of it is editable through an admin panel; no developer is needed to change content.
- **A projects portfolio.** Every project in one place, each with its units, wings, amenities, floor plans, brochures and estimations, tagged residential, commercial or featured.
- **Interactive floor plans.** Unit selection and zoom across 1/2/3BHK layouts, alongside amenities, location maps with connectivity, transparent price lists, and downloadable brochures.
- **An estimation engine - the hard part.** It computes a full, real-estate-grade cost: agreement value at the unit's rate, GST, registration, stamp duty, development and legal charges, amenities and maintenance. It lays out a milestone-by-milestone payment plan tied to construction-completion stages, applies a governed discount-approval workflow, and produces a clean, branded, RERA-referenced estimate ready to print or share over WhatsApp and email.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The estimation engine flow: a selected unit feeds the cost build-up of agreement value, GST, stamp duty, registration, charges, amenities and maintenance, which feeds a milestone payment plan tied to construction stages, ending in a branded estimate shared by print, WhatsApp or email">
  <g font-family="inherit" font-size="10.5">
    <g fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.35)" stroke-width="1.2">
      <rect x="10" y="36" width="150" height="118" rx="8"/>
      <rect x="625" y="36" width="125" height="118" rx="8"/>
    </g>
    <g fill="rgba(20,207,147,.10)" stroke="rgba(20,207,147,.55)" stroke-width="1.2">
      <rect x="195" y="36" width="180" height="118" rx="8"/>
      <rect x="410" y="36" width="180" height="118" rx="8"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.85)" font-size="12" font-weight="600">
      <text x="85" y="58">Unit selection</text>
      <text x="285" y="58">Cost build-up</text>
      <text x="500" y="58">Payment plan</text>
      <text x="687" y="58">Estimate</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.65)">
      <text x="85" y="82">project, wing,</text>
      <text x="85" y="97">unit + rate</text>
      <text x="285" y="80">agreement value @ rate</text>
      <text x="285" y="95">GST</text>
      <text x="285" y="110">stamp duty + registration</text>
      <text x="285" y="125">development + legal</text>
      <text x="285" y="140">amenities + maintenance</text>
      <text x="500" y="82">milestone-by-milestone,</text>
      <text x="500" y="97">tied to construction</text>
      <text x="500" y="112">stages, RERA-referenced</text>
      <text x="687" y="82">branded sheet -</text>
      <text x="687" y="97">print, WhatsApp,</text>
      <text x="687" y="112">email</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="14">
      <text x="177" y="99">&rarr;</text><text x="392" y="99">&rarr;</text><text x="607" y="99">&rarr;</text>
    </g>
    <text x="380" y="182" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11">A governed discount-approval workflow gates any discount before it reaches the estimate.</text>
  </g>
</svg>
<figcaption><strong>From unit to shareable estimate.</strong> The engine computes the full cost stack at the unit's rate, lays the total across construction-stage milestones, and outputs a branded, RERA-referenced sheet for print, WhatsApp or email.</figcaption>
</figure>

- **A digital asset library.** A built-in manager for project images, brochures, floor plans and video, with previews.
- **Masters and access control.** Configurable amenities and tax-jurisdiction masters, role-based users and groups, and sales-only inventory - unit availability (available / on hold / sold) that staff see and customers never do.

The whole platform runs on a current stack - Django 6, React 19, PostgreSQL, and AWS - and went from start to launch in about four months.
