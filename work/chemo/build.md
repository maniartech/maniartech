---
title: "What we built"
---

## What we built

Chemo's laboratory now runs on a system we built on Processious - live, in production today. It covers the full sample lifecycle a testing lab runs on:

- **LIMS** - every sample tracked from inward through admin and technical review, approval, entry, authorization, in-lab analysis, checking, multi-step signing, and report dispatch. The centrepiece is a workflow view that shows the live state of every sample's analysis at a glance: a staged timeline, each step stamped with the responsible user and time, plus a per-sample progress indicator. Open it and you know exactly where every sample stands and who did what.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The staged timeline every Chemo sample moves through: Inward, Admin Review, Assigned, Technical Review, In Lab, Tests Done, Authorization, Signed, Dispatched">
  <g font-family="inherit" font-size="11">
    <line x1="45" y1="66" x2="715" y2="66" stroke="rgba(255,255,255,.22)" stroke-width="2"/>
    <g fill="#14cf93">
      <circle cx="55" cy="66" r="6"/><circle cx="137" cy="66" r="6"/><circle cx="219" cy="66" r="6"/>
      <circle cx="301" cy="66" r="6"/><circle cx="383" cy="66" r="6"/>
    </g>
    <g fill="rgba(20,207,147,.45)" stroke="#14cf93" stroke-width="1.4">
      <circle cx="465" cy="66" r="6"/><circle cx="547" cy="66" r="6"/>
    </g>
    <g fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.45)" stroke-width="1.4">
      <circle cx="629" cy="66" r="6"/><circle cx="705" cy="66" r="6"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.68)">
      <text x="55" y="44">Inward</text><text x="137" y="44">Admin</text><text x="219" y="44">Assigned</text>
      <text x="301" y="44">Tech Review</text><text x="383" y="44">In Lab</text>
      <text x="465" y="44">Tests Done</text><text x="547" y="44">Authorized</text>
      <text x="629" y="44">Signed</text><text x="705" y="44">Dispatched</text>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.38)" font-size="10">
      <text x="55" y="90">who + when</text><text x="301" y="90">who + when</text><text x="547" y="90">who + when</text>
    </g>
    <text x="380" y="128" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11.5">The workflow view shows this rail live for every sample in the lab - each completed step stamped with the responsible user and time.</text>
  </g>
</svg>
<figcaption><strong>A sample's journey through the lab.</strong> The staged timeline is the product's centrepiece - the record of a sample is the record of its journey.</figcaption>
</figure>
- **Accounts, Customers and Membership** modules, integrated into the same platform.
- **A custom reporting engine** that produces the lab's certificates and reports.
- **A customer portal** where the lab's own end-users log in to pull their billing and reports on demand.

Report delivery got particular engineering attention. A Chemo report is not a single page - it is a bundle carrying all the collected and generated artifacts and data. Delivery is locked down end to end: an authorized sender dispatches it, and only the recipient the customer has authorized can receive it. That recipient gets a link, but clicking it is not enough - they must enter report-specific details (the COA and so on), and only then does the system send a one-time password, to the authorized user alone. Forward the link to anyone else and it simply fails. Recipient-bound, OTP-gated, share-proof.

There is also a public report checker at reports.chemotestlaboratory.com, where anyone - customer or not - can enter a COA number and confirm a report is genuine. For an accredited lab whose certificates carry real weight, that anti-forgery check matters, and you can try it live.

The system runs on Go, MongoDB and React, hosted on AWS. We also built Chemo's public website, chemotestlaboratory.com, on our Taj Mahal SSG framework - so their digital stack, inside and out, runs on technology we make.
