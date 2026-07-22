---
heading: "Security in the software we ship"
---

Process is half the answer. The other half is whether security shows up in the engineering itself - and for that we can point to something public.

[Chemo Test Laboratory](/case-studies/chemo/) is an accredited analytical lab whose test reports carry regulatory weight. Their laboratory system - built by us, live in production - treats a report as what it is: confidential data that must reach exactly one person.

- A dispatched report can be received only by the recipient the customer has authorized.
- Opening the link is not enough. The recipient must supply report-specific details, and only then is a one-time password issued - to the authorized user alone.
- A forwarded link is useless: the one-time password never reaches whoever is holding it. The report is bound to its recipient, not to the URL.

The flip side of that design is public. Anyone - customer or not - can confirm a Chemo report is genuine by entering its COA number at the lab's [report checker](https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/). It is live today; try it yourself. The full story is in [the Chemo case study](/case-studies/chemo/).
