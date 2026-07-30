---
title: "What we built"
---

## What we built

Chemo's laboratory now runs on a system we built on Processious - live, in production today. It covers the full sample lifecycle a testing lab runs on:

- **LIMS** - every sample tracked from inward through admin and technical review, approval, entry, authorization, in-lab analysis, checking, multi-step signing, and report dispatch. The centrepiece is a workflow view that shows the live state of every sample's analysis at a glance: a staged timeline, each step stamped with the responsible user and time, plus a per-sample progress indicator. Open it and you know exactly where every sample stands and who did what.
- **Accounts, Customers and Membership** modules, integrated into the same platform.
- **A custom reporting engine** that produces the lab's certificates and reports.
- **A customer portal** where the lab's own end-users log in to pull their billing and reports on demand.

Report delivery got particular engineering attention. A Chemo report is not a single page - it is a bundle carrying all the collected and generated artifacts and data. Delivery is locked down end to end: an authorized sender dispatches it, and only the recipient the customer has authorized can receive it. That recipient gets a link, but clicking it is not enough - they must enter report-specific details (the COA and so on), and only then does the system send a one-time password, to the authorized user alone. Forward the link to anyone else and it simply fails. Recipient-bound, OTP-gated, share-proof.

There is also a public report checker at reports.chemotestlaboratory.com, where anyone - customer or not - can enter a COA number and confirm a report is genuine. For an accredited lab whose certificates carry real weight, that anti-forgery check matters, and you can try it live.

The system runs on Go, MongoDB and React, hosted on AWS. We also built Chemo's public website, chemotestlaboratory.com, on our Taj Mahal SSG framework - so their digital stack, inside and out, runs on technology we make.
