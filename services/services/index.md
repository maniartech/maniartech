---
title: "Engineering practices"
headline: "We take responsibility for the engineering decisions your business will live with."
description: "Four engineering practices for systems that carry operational responsibility - enterprise systems, application and product engineering, modernization, and applied AI - with the discovery, architecture records, controls and handover that make the result inspectable."
eyebrow: "What we do"
seoDescription: "Enterprise systems, application engineering, modernization and applied AI - the decisions we own and the evidence you can inspect."
action:
  label: "See the four practices"
  url: "#practices"
# FOUR PRACTICES (what the work IS). Deliberately NOT the old three-lane
# taxonomy, which mixed practices, capabilities and an engagement model.
# Each entrance states the situation, the risk, our thesis and real decisions -
# never a title plus a paragraph.
practices:
  - name: "Enterprise Systems Engineering"
    url: "/services/enterprise-software-engineering/"
    situation: "Work crosses departments, roles and approvals, and the record of what happened has to survive an audit."
    risk: "The system passes every module test and still loses things at the seams between departments."
    thesis: "An enterprise system is an operational control system. A workflow is not automated until invalid transitions are impossible."
    decisions:
      - "Where state lives, and which transitions are legal"
      - "Who may move a record forward - and who may not"
      - "What evidence survives, and for how long"
    evidenceLabel: "A live accredited laboratory runs on this"
    evidenceUrl: "/case-studies/chemo/"
  - name: "Application and Product Engineering"
    url: "/services/application-software-engineering/"
    situation: "A bounded product with a defined domain, a known user population and a lifecycle someone has to own."
    risk: "A product that works on day one and cannot be changed safely in year two, because nothing about its architecture was written down."
    thesis: "Architecture accountability is the deliverable. The code is what carries it."
    decisions:
      - "Domain and system boundaries"
      - "Which quality attributes the design is optimized for, and what they cost"
      - "Who owns the data, the contracts and the deployment after handover"
    evidenceLabel: "Sales Navigator, live in production"
    evidenceUrl: "/case-studies/sales-navigator/"
  - name: "Modernization and Migration"
    url: "/services/modernization/"
    situation: "A system the business depends on is slow, fragile or expensive to keep alive - and cannot stop serving while it is fixed."
    risk: "A rewrite that reaches 80% and stalls, because the old system was the only complete specification of its edge cases."
    thesis: "A legacy system is often the only complete specification of its own behaviour. Modernize against it, not away from it."
    decisions:
      - "Where the seams are, and what can move independently"
      - "The rollback envelope for each stage - and which transitions need an authorized cutover"
      - "How parity is demonstrated before anything is retired"
    evidenceLabel: "A 2011 operations system, still in daily service"
    evidenceUrl: "/case-studies/rtl/"
  - name: "Applied AI Systems"
    url: "/services/ai/"
    situation: "A probabilistic component is being considered for a workflow that has to be right, or at least has to be accountable when it is not."
    risk: "A confident answer with no inspectable evidence behind it, entering an operational decision nobody can later reconstruct."
    thesis: "An AI answer without inspectable evidence is not ready to enter an operational workflow."
    decisions:
      - "Whether the problem should use a model at all, or a deterministic rule"
      - "What the system does when confidence is low - abstain, escalate, or fall back"
      - "How the behaviour is evaluated before and after a model changes"
    evidenceLabel: "How we decide AI is the wrong tool"
    evidenceUrl: "/insights/"
# ENGAGEMENT MODELS (how we work together) are a separate axis - a partnership
# is not a kind of software - and they now live in tajmahal.yaml `context.
# engagementModels`, because /partnerships/ shows the same four. One source.
# Shared foundations applied across all four practices.
foundations:
  - name: "Operational discovery"
    what: "We map how the work actually flows - including the workarounds, which is usually where the truth lives - before anything is designed."
  - name: "Research and authored methods"
    what: "Where we have researched a problem, the method is published and you can read it before you hire us."
  - name: "Architecture and decision records"
    what: "Consequential decisions are written down with their alternatives and their reasons, so the next engineer inherits the reasoning."
  - name: "Standards and reusable engineering assets"
    what: "We author our own specifications, languages and libraries; you are never required to adopt any of them."
  - name: "Quality and security controls"
    what: "Independently audited quality and information-security management systems, verifiable with the registrar."
  - name: "Testing and acceptance evidence"
    what: "Acceptance is organized around journeys and failure paths, not screens - and the evidence is yours."
  - name: "Observability and operational readiness"
    what: "The system ships able to answer where things are, what failed, and what is slow."
  - name: "Mainstream, transferable technology"
    what: "Built on stacks another team can hire for and maintain."
  - name: "Documentation and handover"
    what: "Handover is designed into the engagement, not assembled at the end of it."
---

We are not a supplier of interchangeable developer capacity. We take responsibility for the engineering decisions a business has to live with for years - what the system's boundaries are, which states are legal, who is permitted to act, what evidence survives, and what should not be built at all.

That is a narrower offer than "we build software", and a more accurate one. Below: the four practices, the decisions each one owns, the foundations under all of them, the evidence you can inspect before contacting us, and where we are the wrong firm to call.
