---
title: Processious
description: Our process-automation and application platform - in production today, running a client's operations, on mainstream technology your own team can maintain.
productStatus: In production
titleTag: "Processious - Process Automation Platform"
---

Processious is our process-automation and application platform. We use it to build the systems a
business actually runs on - workflows, line-of-business applications, and the data and rules behind
them - and to ship them faster than building from scratch, on technology your own team can maintain.

## Is this you?

- **Your processes live in spreadsheets, email, and people's heads** - and you need them automated, connected, and auditable.
- **You need a custom line-of-business application** - built properly, the first time, not bolted together from off-the-shelf parts that don't quite fit.
- **You're outgrowing manual workflows** - approvals, hand-offs, escalations, and audit trails that should run themselves.
- **You need it built on technology you can keep** - not a tool only one vendor understands.

## It's in production today

Processious is a working platform we built, own, and operate - and it's in production serving a client's operations. We'd rather show you than tell you.

**Chemo Test Laboratory** - we built their laboratory management system on Processious. It runs in production today, handling samples from intake through testing, authorization, and secure, recipient-verified report delivery. Their public website runs on our Taj Mahal framework too - there's a *"Powered by ManiarTech"* credit in its footer. Both of these are live and public, so you don't have to take our word for it:

- [chemotestlaboratory.com](https://www.chemotestlaboratory.com) - their production site, running on our stack.
- [reports.chemotestlaboratory.com](https://reports.chemotestlaboratory.com) - the report-authenticity checker, part of the recipient-verified delivery Processious handles.

## What a process looks like on Processious

The clearest way to explain the platform is to walk that real process - the laboratory workflow it runs today:

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four workflow stages - sample intake, testing, authorization, verified delivery - moving left to right, driven by events, on top of two platform layers: role-based access and an audit trail">
  <g font-family="inherit" font-size="12.5">
    <text x="40" y="28" fill="rgba(255,255,255,.8)" font-weight="600">The lab workflow Processious runs in production</text>
    <g fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2">
      <rect x="40" y="48" width="155" height="40" rx="8"/>
      <rect x="215" y="48" width="155" height="40" rx="8"/>
      <rect x="390" y="48" width="155" height="40" rx="8"/>
      <rect x="565" y="48" width="155" height="40" rx="8"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.75)">
      <text x="117" y="72">Sample intake</text>
      <text x="292" y="72">Testing</text>
      <text x="467" y="72">Authorization</text>
      <text x="642" y="72">Verified delivery</text>
    </g>
    <g stroke="rgba(255,255,255,.45)" stroke-width="1.5">
      <line x1="195" y1="68" x2="209" y2="68"/>
      <line x1="370" y1="68" x2="384" y2="68"/>
      <line x1="545" y1="68" x2="559" y2="68"/>
    </g>
    <g fill="rgba(255,255,255,.5)">
      <polygon points="209,63 209,73 216,68"/>
      <polygon points="384,63 384,73 391,68"/>
      <polygon points="559,63 559,73 566,68"/>
    </g>
    <text x="380" y="112" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11.5">events move the work forward: hand-offs, notifications, escalations</text>
    <rect x="40" y="130" width="680" height="36" rx="8" fill="rgba(20,207,147,.10)" stroke="rgba(20,207,147,.5)" stroke-width="1.2"/>
    <text x="380" y="152" text-anchor="middle" fill="rgba(255,255,255,.7)">Role-based access: each step is performed only by the roles allowed to perform it</text>
    <rect x="40" y="178" width="680" height="36" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" stroke-width="1.2"/>
    <text x="380" y="200" text-anchor="middle" fill="rgba(255,255,255,.7)">Audit trail: every action and hand-off is recorded as it happens</text>
  </g>
</svg>
<figcaption><strong>A real process, not a mock-up.</strong> These are the stages of the laboratory system linked above; the two layers underneath are the platform doing its job on every step. You can verify the system is live at the links in the previous section.</figcaption>
</figure>

A process on Processious is defined once, as a sequence of steps. Work then moves between the steps
on events: a completed test triggers authorization, an authorized report triggers delivery, and the
hand-offs, notifications, and escalations run themselves instead of living in someone's inbox. Each
step is performed under role-based access control, so the platform - not convention - decides who may
act at each stage. And everything that happens is written to an audit trail as it happens, not
reconstructed later when someone asks.

## Why it's safe to build on

- **Mainstream, maintainable technology.** Processious is built on technology your own team - or any team - can hire for and maintain (Go, MongoDB, React). What we deliver is comprehensible software, not a black box only we can reason about.
- **Right-sized, never over-engineered.** We start at the scale your problem actually needs and grow only as it earns it.
- **Led and reviewed by senior engineers.** We do not substitute trainees for the experienced engineers presented during the engagement.
- **Delivered on an independently audited process.** ISO 9001:2015 (quality) and ISO/IEC 27001:2022 (information security) management systems, audited by URS under UKAS accreditation - a documented, repeatable delivery process and a defined way your data is handled.
- **Built to be handed over.** Because it's our own platform, we know exactly how your system is put together - and we document it so it lives in systems, not in one person's head.

## Who builds it

Processious was built by ManiarTech - a senior engineering team founded in 2010 by [Aamir Maniar](https://www.linkedin.com/in/aamironline), who earlier in his career built financial-technology systems at **JP Morgan** and worked as a technology architect at firms including Countrywide Financial, Patni (now iGATE), and Oakton. The same team that designed the platform builds and supports your system on it.

## How it's built

*For the technically curious:* we didn't assemble Processious from parts - we engineered its foundation ourselves, with a schema-driven data layer, role-based access control, and multi-tenancy underneath the workflow engine. The practical payoff for you: the systems we build on it are solid, maintainable, and yours.
