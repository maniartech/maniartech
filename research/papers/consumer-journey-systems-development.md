---
title: "Build the journey, not the database: why systems designed around data flows fail the people who move through them"
description: "Custom systems are usually designed around internal data and department boundaries. The people who use them experience a journey that crosses those boundaries - and the gap between the two is where systems fail. A practical method for mapping the journey before the schema, from a team that spent six years building a customer-journey platform."
figure: "journey-cross"
paperStatus: "Published"
date: "2026-06-12"
order: 2
author: "Aamir Maniar"
tldr:
  - "Most custom business systems are designed around data: the entities, the tables, the modules that mirror departments. But the people who move through a system - customers, staff, auditors, partners - do not experience entities. They experience a journey: a sequence of steps toward a goal that cuts across module and department boundaries. The gap between how a system is structured and how it is travelled is where systems quietly fail: re-entered data, shadow spreadsheets, phone calls to find out where things stand, and eventually abandonment. The fix is not more features. It is to map the journeys before you draw the schema, let the journeys pick the schema's seams, sequence the build so one journey works end to end early, and watch for specific drift signals during delivery. This costs days, not months, and it changes what gets built and in what order."
  - "We make this argument as practitioners, not theorists: our founder spent six years (2012-2018) building Touchpoint Dashboard - first as a senior developer on its engineering team, later with ManiarTech as the product's offshore engineering development partner - a pioneering customer-journey-management platform that counted Fortune 500 brands among its users. We apply the same lens today to systems as unglamorous as a laboratory's sample pipeline and a property developer's presales flow."
titleTag: "The Consumer Journey in Systems Development"
seoDescription: "Why systems designed around data flows fail the people who move through them - and a journey-first method that changes what you build, in what order."
method: "A practitioner paper"
methodNote: "reasoned from six years inside a journey platform; no untraceable statistics quoted"
---

## Why it matters: the failure mode nobody budgets for

If you are commissioning a custom system, the risk you probably price in is technical: it ships late, it has bugs, it does not scale. Those risks are real but visible - you find out fast, and contracts cover them.

The risk almost nobody prices in is a system that ships on time, passes its tests, matches its specification, and still fails the people who use it. Staff keep a spreadsheet on the side "just until the system settles in." Customers phone to ask where their order, sample, or application stands, because the system cannot tell them. Two departments each swear their module works, and both are right - it is the handoff between them that loses things. Nothing crashes. The failure is structural, so it never shows up in a bug tracker, and it gets misdiagnosed as a training problem or user resistance.

Our claim in this paper is that this failure mode has a common root: the system was designed around internal data flows and department boundaries, while the people it serves experience it as a journey that crosses those boundaries. Understanding that gap - and closing it before the schema is drawn - is one of the highest-leverage, lowest-cost moves available to anyone commissioning software.

## Method and sources

This is a practitioner paper, not a survey study. We do not present original quantitative data, and we do not quote adoption-failure statistics from vendor surveys, because we could not trace the commonly cited ones to primary sources we would stand behind. Where we describe failure patterns, they are presented as reasoned argument from experience, and labeled as such.

What the paper does rest on:

- Named, checkable literature. Journey mapping and its ancestor, service blueprinting, are established practice with primary sources: G. Lynn Shostack's 1984 Harvard Business Review article that introduced service blueprinting [Shostack, HBR, 1984](https://hbr.org/1984/01/designing-services-that-deliver); James Kalbach's Mapping Experiences, the standard O'Reilly reference on journey and experience diagrams [Kalbach, O'Reilly](https://www.oreilly.com/library/view/mapping-experiences/9781491923528/); the Nielsen Norman Group's practical guidance on when journey maps are worth making [Kaplan, NN/g, 2016](https://www.nngroup.com/articles/customer-journey-mapping/); and Melvin Conway's 1968 observation - now known as Conway's law - that organizations produce system designs that copy their own communication structures [Conway, Datamation, 1968](https://www.melconway.com/Home/Committees_Paper.html).
- Three real ManiarTech projects, described with the same calibration we use everywhere: only what we can state honestly, with hedges where our knowledge is secondhand, and no outcome claims for work that has not shipped.

One of those projects gives us unusual standing on this topic. From 2012 to 2018, our founder worked on Touchpoint Dashboard - not a system that happened to have users, but a platform whose entire purpose was mapping and managing customer journeys, sold to organizations whose customer-experience teams had discovered exactly the gap this paper describes. We spent six years building the tool companies bought when they realized their internal structure did not match their customers' experience. That vantage point shaped how we build everything else.

## The same system, two shapes

Take a system every business knows: order handling. Ask the organization to describe it and you get a data-flow picture: a Customers table, an Orders table, an Inventory module owned by warehouse, an Invoicing module owned by finance, a Dispatch module owned by logistics. Each module is coherent, each has an owner, and the boxes map neatly onto the org chart.

Now ask the customer to describe it: "I placed the order, then I waited, then I got an invoice that did not match the quote, then I called twice to find out where it was, then it arrived." That is not a module list. It is a journey - a sequence in time, with a goal, with waits and handoffs, and with an emotional trajectory (confidence eroding into doubt) that no schema diagram captures.

Both descriptions are true. The trouble is that only one of them usually governs the design. The staff member processing the order has a journey too - and so does the auditor who arrives a year later and needs to reconstruct what happened. A journey, in the systems context we mean here, is simply: a specific person, with a goal, moving through a sequence of steps that the system either carries smoothly or drops at the seams.

The seams are the point. Journeys, by their nature, cross the boundaries that data-first designs are organized around. A journey is precisely the thing that does not live in any one module - which is why module-by-module development, module-by-module testing, and module-by-module sign-off can all succeed while the journey fails.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three system modules drawn as columns - Orders, Invoicing, Dispatch - with one customer journey line crossing all three; the journey drops into gaps at each module boundary">
  <g font-family="inherit" font-size="12.5">
    <g fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" stroke-width="1.2">
      <rect x="40"  y="40" width="200" height="200" rx="8"/>
      <rect x="280" y="40" width="200" height="200" rx="8"/>
      <rect x="520" y="40" width="200" height="200" rx="8"/>
    </g>
    <g fill="rgba(255,255,255,.65)" text-anchor="middle" font-weight="600">
      <text x="140" y="66">Orders</text>
      <text x="380" y="66">Invoicing</text>
      <text x="620" y="66">Dispatch</text>
    </g>
    <g fill="rgba(255,255,255,.35)" text-anchor="middle" font-size="11">
      <text x="140" y="84">owned by sales</text>
      <text x="380" y="84">owned by finance</text>
      <text x="620" y="84">owned by logistics</text>
    </g>
    <path d="M60 150 C 110 120, 180 130, 235 150 S 255 195, 285 170 C 340 130, 420 130, 475 165 S 500 205, 525 175 C 575 135, 650 135, 700 150"
          fill="none" stroke="#14cf93" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="60" cy="150" r="4.5" fill="#14cf93"/>
    <circle cx="700" cy="150" r="4.5" fill="#14cf93"/>
    <g stroke="rgba(240,90,90,.75)" stroke-width="1.4" fill="none">
      <circle cx="260" cy="172" r="17"/>
      <circle cx="500" cy="180" r="17"/>
    </g>
    <g fill="rgba(240,90,90,.85)" text-anchor="middle" font-size="11.5">
      <text x="260" y="215">the seam</text>
      <text x="500" y="222">the seam</text>
    </g>
    <g fill="rgba(255,255,255,.5)" font-size="11.5">
      <text x="40" y="272">One person's journey crosses every module. The modules can each pass their tests while the journey fails at the seams.</text>
    </g>
  </g>
</svg>
<figcaption><strong>The gap this paper is about.</strong> Modules mirror the org chart; the journey crosses them. Everything between the boxes is where re-entered data, shadow spreadsheets and "where is my order?" calls live.</figcaption>
</figure>

## Why builds default to data-first

It is worth being fair about why this happens, because the causes are structural, not stupidity:

- Schemas are concrete; journeys are not. Early in a project, everyone is anxious for tangible progress. An entity-relationship diagram looks like progress. A journey map looks like a workshop deliverable. So the schema gets drawn first, and from that point on it quietly governs everything downstream.
- The people in the room own departments, not journeys. Requirements are gathered department by department, because that is who attends the meetings. Each department describes its own slice accurately. Nobody in the room owns the handoffs, so the handoffs go unspecified - and unbuilt.
- Conway's law does the rest. Conway observed in 1968 that a system's design tends to mirror the communication structure of the organization that builds it [Conway, 1968](https://www.melconway.com/Home/Committees_Paper.html). Commissioned software mirrors the client's org chart for the same reason: the modules follow the reporting lines of the people who specified them.
- Demos show screens, not sequences. Progress reviews naturally demo one module at a time. A demo of "the approval screen" can look excellent while the journey that leads into and out of it does not exist yet. The build can be months in before anyone tries to travel it end to end.

None of these forces is malicious, and none announces itself. That is why journey thinking has to be deliberate: the default gradient of a software project runs the other way.

## Where the gap shows up

When a system's structure and its journeys diverge, the damage surfaces in three recognizable patterns. We offer these as a diagnostic, from experience across our own projects and the systems we have been asked to replace:

1. Swivel-chair work. A person re-enters data from one module into another, or from the system into a document, because the journey crosses a seam the system does not bridge. Every re-entry is a place the design forced a human to be the integration layer.
2. Shadow systems. Staff maintain a parallel spreadsheet, a WhatsApp thread, or a paper register that tracks what the "real" system cannot: usually the state of things in transit between modules. The shadow system is a hand-drawn map of the journey the built system ignored. It is also where the real operational truth ends up living, which is how organizations end up with an expensive system of record that does not contain the record.
3. Status blindness. The most common journey question anyone asks of any system is: where is my thing, and what happens next? My sample, my order, my application, my approval. If answering it requires a phone call to a person who then asks someone else, the system has failed its most basic journey obligation - even if every module inside it works.

If you run a custom system today, you can audit for all three this week without touching the software: ask staff what they re-type, what they track on the side, and what questions they can only answer by asking around.

## What building a journey platform taught us

Touchpoint Dashboard existed because large organizations kept discovering the gap described above - at the scale of the whole enterprise. A bank's mortgage customer experiences one journey; inside the bank, that journey crosses marketing, sales, underwriting, legal, and servicing, each with its own systems and metrics. Customer-experience teams needed a way to see the journey as the customer travels it, laid over the org that delivers it. Touchpoint Dashboard was one of the pioneering platforms for doing that: mapping journeys, managing every touchpoint along them, and collaborating across the departments a journey crosses. The product is referenced in James Kalbach's Mapping Experiences (O'Reilly), the standard text on the discipline, and was acquired in 2015 by customer-experience consultancy Strativity Group [Business Wire, 2015](https://www.businesswire.com/news/home/20151019005065/en/Strativity-Group-Inc.-Acquires-Touchpoint-Dashboard-LLC.), which described it as a leading SaaS journey-mapping platform.

Our founder joined the product's engineering team in 2012 as a senior developer - it was ManiarTech's first international engagement - designing and building core modules across journey mapping, analytics, and collaboration. After the Strativity acquisition, the relationship deepened: from April 2017, ManiarTech served as the product's offshore engineering development partner, with a small dedicated team, through July 2018. Six years inside one product, watching Fortune 500 brands use it, teaches you two things that no article can:

First, the gap is universal. The organizations buying journey tooling were not badly run; they were normally run. Every one of them had competent departments and incoherent journeys, because coherent departments and incoherent journeys is the natural equilibrium Conway's law predicts. If it takes Fortune 500 companies dedicated platforms and full-time teams to fight this gravity, a mid-sized business commissioning a custom system should assume the same gravity is acting on its project.

Second, the map is only valuable if it governs decisions. The journey maps that changed anything were the ones wired to ownership and action - every touchpoint with someone responsible for it, every broken handoff turned into a work item. Maps made for a workshop wall changed nothing. That lesson transfers directly to systems development: a journey map that does not shape the schema, the scope, and the build order is decoration.

## The journey of a laboratory sample

The journey lens is not just for consumer experiences. Consider the system we built - live in production today - for Chemo Test Laboratory, an NABL- and US FDA-accredited analytical testing lab with more than 35 years of history [chemotestlaboratory.com](https://www.chemotestlaboratory.com/).

A testing lab's core "traveler" is not a person at all. It is a sample. Every sample travels a long, regulated journey: inward receipt, administrative and technical review, approval, entry, authorization, in-lab analysis, test completion, checker authorization, signing, and finally report dispatch. That journey crosses every internal boundary the lab has - reception, admin, technicians, analysts, checkers, signatories, dispatch - and a classic data-first LIMS design would carve it into modules along exactly those lines, recreating the seams where samples stall and paperwork chases people.

We designed the system around the journey instead. Its centerpiece is a workflow view that shows the live state of every sample's journey at a glance: a staged timeline from inward to dispatched, each completed step stamped with who performed it and when, with per-sample progress. Open it and the journey question - where is this sample, and what happens next - is answered in one look, for every sample in the building. The stages of the journey are the schema: the record of a sample is the record of its journey.

The journey lens also surfaced travelers a data-first analysis would have missed entirely:

- The report recipient. A lab report is confidential, regulated data, and its delivery is a journey of its own. We engineered it so that a dispatched report can only be received by the customer-authorized recipient: they follow a link, must enter report-specific details, and only then receive a one-time password sent solely to them - so a forwarded link simply fails. The journey ends with the right person, and only the right person, holding the report.
- The verifier. A lab certificate's value depends on third parties - a buyer, a regulator, an auditor - being able to trust it. Those third parties are travelers too, and they will never log in. So the system includes a public report checker, where anyone can enter a certificate number and confirm the report is genuine [report checker](https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/) - you can try it yourself. No internal data model would ever have produced that feature; only asking "who else travels through this system's outputs?" does.
- The customer's own consumers, who get a portal to pull their reports and billing on demand instead of requesting them by phone.

We are careful with claims here: this system is live and in daily production use, and the workflow design follows the same journey-at-a-glance approach that has kept an earlier lab system of ours in use for many years. We cite no performance metrics because we will not invent any.

## A property buyer's journey through presales

A third, recent example: we built a complete presales platform, Sales Navigator, for Shantee Homes, a residential property developer in the Mumbai metropolitan region. The system is live in production; it launched recently, so we claim no business outcomes - only design decisions.

The developer's presales ran the way most do: demonstrations, price estimates, inventory, and follow-ups spread across people, slide decks, and spreadsheets. The data-first framing of that problem produces a property database with an admin panel. The journey-first framing asks: what does a buyer actually travel through? They are shown the company and the project; they explore a floor plan and pick a unit; they ask what it truly costs - not the headline rate, but the full picture with taxes, charges, and a payment schedule; and they want to take that answer home.

That journey, walked step by step with the client before anything was built, dictated the system's shape: a tablet-ready showcase and a slide-based presentation builder for the guided walkthrough; interactive floor plans with unit selection; and - the hard part - an estimation engine that computes the complete, real cost (agreement value, GST, registration, stamp duty, other charges) with a milestone-based payment plan, a governed discount-approval workflow, and a clean, branded estimate the buyer can carry away over WhatsApp or email. The sales staff journey got its own design decisions, notably live unit availability that staff see and customers never do.

Just as important is what the journey lens kept out. The scope is deliberately presales only - no bookings, no payments, no post-sales - because that is the journey the client needed fixed first, built on a foundation that can extend later. Journey-first thinking is as much a scoping discipline as a design one: it gives you a principled answer to "what do we not build yet?"

## The method: journey-first without slowing delivery

A fair objection: journey mapping has a reputation for workshop theater - weeks of sticky notes producing a mural nobody consults again. The Nielsen Norman Group's own guidance stresses that journey maps must be tied to real decisions to be worth making [NN/g, 2016](https://www.nngroup.com/articles/customer-journey-mapping/). We agree, and the version we practice is deliberately lightweight. It adds days to the front of a project, not weeks, and most of it replaces analysis you would do anyway, done in a worse order.

1. Name the travelers. List every kind of person or thing that moves through the system: customers, each staff role, and the ones everyone forgets - auditors, regulators, verifiers, your customer's customers, and non-human travelers like a sample or a shipment. Ten minutes of listing travelers routinely surfaces whole features (and whole compliance obligations) a department-by-department requirements process would miss.
2. Walk each journey before drawing any schema. For each traveler: the steps, in time order, from first contact to done - including the waits, the handoffs, and the failure paths (rejection, rework, escalation). Shostack's service-blueprinting insight applies directly: chart the front-stage experience and the back-stage work together, so every visible step is connected to the internal machinery that serves it [Shostack, 1984](https://hbr.org/1984/01/designing-services-that-deliver). One page per journey. Plain boxes and arrows. Done in days.
3. Let the journeys pick the schema's seams. Now design the data model - but where module boundaries are optional, place them where the journeys are quiet, not where the org chart suggests. Make journey state a first-class part of the model: the Chemo system's sample record is its staged timeline, which is why status blindness is structurally impossible there. Ask of every design: can this record answer "where is my thing and what happens next?" without a join nobody will build?
4. Sequence the build as journey slices, not modules. Ship one traveler's journey end to end - thin, but complete - before broadening. A thin end-to-end slice forces every handoff to exist early, which is exactly when handoff problems are cheap to fix. It also transforms progress reviews: instead of demoing screens, you walk a named traveler through the system, start to finish, and everyone can see what is real.
5. Instrument the journey. Build in the status view from the start - where each item is, who acted, what is next. This is the single feature users forgive the least when it is missing, and it costs little when the journey states are already first-class in the model (and much when they are not).

## Signals a build has drifted from its users

During delivery, watch for these. Each is cheap to check and strongly diagnostic; they are how we audit our own projects:

- Demo order matches the org chart. If every review demos one department's module, no one is watching the seams. Insist on end-to-end walkthroughs of a named traveler.
- "That will be handled in training." When a clumsy journey step is answered with training plans rather than design changes, the system has started demanding that people adapt to it, rather than the reverse.
- Status questions have no screen. If a stakeholder asks "so where would I see where my order/sample/application is?" and the answer involves querying the database, the journey is not instrumented.
- The spec has entities but no sequences. A requirements document that lists what the system stores, with no time-ordered account of what anyone does, is a schema wearing a spec's clothing.
- Handoffs are nobody's requirement. Check who signed off the transition between module A and module B. If the answer is "both teams, implicitly," it is no one.
- Early users keep a side spreadsheet in the pilot. Do not dismiss it as habit. It is a map of what the system does not carry - read it as requirements.

## Analysis: what we can claim, and what we cannot

The honest version of our claim is narrower than "journey mapping fixes software projects," and worth stating precisely.

What we claim: designing from journeys changes real decisions - what gets scoped in and out, where module seams fall, what the record structure treats as first-class, what ships first, and how progress is judged. We have shown those decision changes concretely in three projects. The cost of the practice is small (days), the failure patterns it guards against are common and expensive, and the diagnostic signals are checkable in any project this week. On that cost-benefit reasoning, we think journey-first design is close to a free option for anyone commissioning a system.

What we cannot claim: we have no controlled comparison proving journey-first builds succeed where data-first builds fail, and we do not believe anyone else has one that isolates the variable either - which is why this paper cites no adoption-failure percentages. Our evidence is practitioner experience: deep in one journey-platform engagement, current in two others. That is real grounding, but it is three projects and a point of view, not a dataset.

Limits of the method itself, from using it: journey-first is a complement to data modeling, not a replacement - regulated domains still need rigorous schemas, and integration-heavy or batch back-office systems have thinner journeys where the lens earns less. The mapping can degenerate into theater if the maps are not wired to scope, schema, and sequence decisions - the central lesson of the Touchpoint years. And journeys change; a map is a working document, revisited at each build milestone, or it rots like any other document.

## What to do with this

If you are commissioning a custom system:

- Ask your vendor to name the travelers before they show you a schema or a module list. If auditors, verifiers, or your customers' customers are missing, the analysis is incomplete.
- Ask to see one-page journey walks for the top three travelers, failure paths included, before sign-off on scope.
- Ask which journey ships end to end first - and make an end-to-end walkthrough, not a module demo, the format of every progress review.
- Put "where is my thing?" in the acceptance criteria: every long-running item the system manages should have a status view answering it in one look.

If you already run a custom system and suspect drift, spend one week on the three-symptom audit: what staff re-type (swivel-chair), what they track on the side (shadow systems), and what questions require phone calls (status blindness). The results are your journey backlog, already prioritized by pain.

## Verify it yourself

Every external claim in this paper traces to a primary, linkable source, and every project claim is calibrated to what we can honestly state:

- G. Lynn Shostack, "Designing Services That Deliver," Harvard Business Review, January 1984: https://hbr.org/1984/01/designing-services-that-deliver
- Melvin E. Conway, "How Do Committees Invent?", Datamation, April 1968, hosted by the author: https://www.melconway.com/Home/Committees_Paper.html
- James Kalbach, Mapping Experiences: A Complete Guide to Creating Value through Journeys, Blueprints and Diagrams, O'Reilly Media: https://www.oreilly.com/library/view/mapping-experiences/9781491923528/ (the text in which Touchpoint Dashboard is referenced)
- Kate Kaplan, "When and How to Create Customer Journey Maps," Nielsen Norman Group, 2016: https://www.nngroup.com/articles/customer-journey-mapping/
- Strativity Group's acquisition of Touchpoint Dashboard, Business Wire, October 19, 2015: https://www.businesswire.com/news/home/20151019005065/en/Strativity-Group-Inc.-Acquires-Touchpoint-Dashboard-LLC.
- Chemo Test Laboratory (live client system): https://www.chemotestlaboratory.com/ (their site footer credits ManiarTech) and the public report checker at https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/
- Project claims: the Touchpoint Dashboard role is stated as it was - our founder joined the product's engineering team in 2012 as a senior developer, and from April 2017 ManiarTech served as the product's offshore engineering development partner, through July 2018. The Fortune 500 usage is his firsthand observation as a builder on the product. The real-estate presales platform launched recently and is live in production; no business outcomes are claimed for it yet.

## About the author

Aamir Maniar is the founder of ManiarTech, a software engineering and research company. He spent six years building Touchpoint Dashboard, a pioneering customer-journey-management platform - as a senior developer, and later through ManiarTech as its offshore engineering development partner - and applies journey-first design to the enterprise systems ManiarTech builds today.

If you are planning a system and want the journey mapped before the schema, [get a free estimate](/estimate/) or [talk to us](/contact/).
