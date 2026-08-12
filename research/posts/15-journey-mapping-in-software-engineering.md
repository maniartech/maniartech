---
audience: "enterprise"
contentType: "architecture-analysis"
evidenceType: "Production field evidence"
artifactLabel: "Public report checker"
artifactUrl: "https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/"
authorUrl: "https://www.linkedin.com/in/aamironline"
author: "Aamir Maniar"
authorRole: "Managing Director & Engineering Head"
title: "We learned journey mapping from marketing, then pointed it at a laboratory sample"
description: "Six years building a customer-journey platform for Fortune 500 CX teams taught us a discipline that belongs to marketing. Here is what survived the move into systems engineering, what did not, and what it changed in a live laboratory system."
date: "2026-08-11"
titleTag: "Journey Mapping in Software Engineering"
seoDescription: "What a marketing discipline - customer journey mapping - changes about system design when the traveler is a laboratory sample instead of a buyer."
thread: "process"
shortTitle: "Journey mapping, transferred"
receipts:
  - "6 years on the platform"
  - "live LIMS"
keyReceipt: "2012-2018 firsthand"
heroProof: "6 years inside the tool"
heroProofNote: "then the same lens on a live laboratory system you can verify"
---

In 2012 I joined the engineering team of a product whose entire subject was customer journeys. Touchpoint Dashboard was one of the pioneering platforms for mapping how customers actually move through an organization - not the org chart's version, the customer's version - and managing every touchpoint along the way. It was bought by customer-experience teams at large brands, referenced in James Kalbach's *Mapping Experiences* (O'Reilly Media - the standard text on the discipline), and acquired by the consultancy Strativity Group in 2015. I worked on it for six years - first as a senior developer on its engineering team, then, from April 2017, leading ManiarTech's small team as the product's offshore engineering development partner.

If you have never seen the product, here it is in its vendor's own words - worth a couple of minutes, because everything below is a story about carrying that way of seeing into a domain it was never built for.

<figure class="mt-figure mt-video" id="tpd-video">
<iframe src="https://www.youtube-nocookie.com/embed/pogDFIhBY34" title="What is Touchpoint Dashboard? - the vendor's own product overview" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
<figcaption><strong>The tool this story starts in.</strong> "What is Touchpoint Dashboard?", from the product's official channel. Journeys mapped across stages, every touchpoint owned - the vocabulary the rest of this post carries into a laboratory.</figcaption>
</figure>

Journey mapping is a marketing discipline. It comes out of service design and customer experience; its vocabulary is personas, channels, moments of truth, emotion curves. Nothing about it announces itself as a software engineering method.

But six years of building the tool leaves you thinking in it. And when we later designed a laboratory information management system for [Chemo Test Laboratory](https://www.chemotestlaboratory.com/) - an accredited analytical testing lab, live in production today - we found ourselves running the same analysis, with one strange substitution: the traveler was not a customer. It was a sample.

This is the story of what survived that move, what did not, and what it changed in the built system. It is a field report, in the first person. If what you need instead is the generalized method - how to elicit journeys, translate them into architecture and controls, govern them, and write acceptance evidence against them - that is a separate paper: [Journey-to-system design](/white-papers/consumer-journey-systems-development/).

## What six years inside a journey platform actually teaches

You can read the theory of journey mapping in an afternoon. What you cannot read is what we had a rare seat for: watching organizations use a tool built for exactly this problem, and seeing which uses of it changed anything.

Two lessons stuck, and both turned out to be about systems, not marketing.

**The gap is normal, not pathological.** The companies buying journey tooling were not badly run. They were ordinarily run - competent departments, coherent internal structure, and a customer experience that fell into the cracks between those departments anyway. That is the natural equilibrium Conway's law predicts: an organization produces designs that copy its own communication structure. If Fortune 500 companies need dedicated platforms and full-time teams to fight that gravity, then a mid-sized business commissioning a custom system should assume the same gravity is acting on its project - and that the system will inherit the org chart unless someone actively prevents it.

**A map is worth exactly what it governs.** The journey maps that changed anything were wired to ownership and action: every touchpoint had someone responsible for it, every broken handoff became a work item with a name against it. Maps made for a workshop wall changed nothing at all - and we could see the difference from inside the product, in which accounts kept using it and which quietly stopped.

That second lesson is the one that transferred hardest into engineering. A journey map that does not change the schema, the scope, or the build order is decoration. If it changes none of those three, we do not draw it.

## The translation problem

Here is what makes the move genuinely awkward rather than a simple analogy.

A laboratory sample has no emotions. It makes no decisions, has no persona, chooses no channel, and cannot become an advocate for your brand. Half of journey mapping's vocabulary describes an interior life the traveler does not have. Point the discipline at a sample without adapting it and you get a workshop deliverable about the feelings of a vial.

What remains when you strip out the interiority turns out to be the structural half - and the structural half is the part that was always doing the work:

- A **traveler** with a goal, moving through **steps in time**.
- **Seams** where the traveler passes between owners - which is where things are lost.
- **State** the traveler and everyone serving them needs to be able to see.
- A **map that governs decisions**, or is not worth drawing.

None of those four require a person. They require a thing that moves through an organization and can get stuck. A sample qualifies. So does an insurance claim, a shipment, a purchase requisition, a permit application, a court filing.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two journey rails compared. Above: a customer journey through Awareness, Research, Decision, Purchase and Delivery. Below: a laboratory sample's journey through Inward, Review, In Lab, Authorized and Dispatched. Between them, three labels mark what transfers: the seam between stages, an owner per step, and visible state. To the right, three substitutions: emotion becomes custody and authority, channel becomes handoff, persona becomes traveler including non-human ones.">
  <g font-family="inherit" font-size="12">
    <text x="40" y="30" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">The traveler marketing maps</text>
    <line x1="52" y1="66" x2="600" y2="66" stroke="rgba(255,255,255,.22)" stroke-width="2"/>
    <g fill="rgba(255,255,255,.55)">
      <circle cx="60" cy="66" r="5.5"/><circle cx="195" cy="66" r="5.5"/><circle cx="330" cy="66" r="5.5"/>
      <circle cx="465" cy="66" r="5.5"/><circle cx="595" cy="66" r="5.5"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="11.5">
      <text x="60" y="52">Awareness</text><text x="195" y="52">Research</text><text x="330" y="52">Decision</text>
      <text x="465" y="52">Purchase</text><text x="595" y="52">Delivery</text>
    </g>
    <g stroke="rgba(240,90,90,.6)" stroke-width="1.3" stroke-dasharray="3 3">
      <line x1="127" y1="74" x2="127" y2="228"/>
      <line x1="262" y1="74" x2="262" y2="228"/>
      <line x1="397" y1="74" x2="397" y2="228"/>
      <line x1="530" y1="74" x2="530" y2="228"/>
    </g>
    <g fill="rgba(255,255,255,.62)" font-size="11" text-anchor="middle">
      <text x="127" y="130">the seam</text>
      <text x="262" y="130">an owner</text>
      <text x="397" y="130">visible state</text>
      <text x="530" y="130">a map that</text>
      <text x="127" y="146">between steps</text>
      <text x="262" y="146">per step</text>
      <text x="397" y="146">at a glance</text>
      <text x="530" y="146">governs</text>
    </g>
    <text x="330" y="180" text-anchor="middle" fill="#14cf93" font-size="11.5" font-weight="600">what transfers - none of it needs a person</text>
    <text x="40" y="268" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">The traveler a laboratory maps</text>
    <line x1="52" y1="228" x2="600" y2="228" stroke="rgba(255,255,255,.22)" stroke-width="2"/>
    <g fill="#14cf93">
      <circle cx="60" cy="228" r="5.5"/><circle cx="195" cy="228" r="5.5"/><circle cx="330" cy="228" r="5.5"/>
      <circle cx="465" cy="228" r="5.5"/><circle cx="595" cy="228" r="5.5"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="11.5">
      <text x="60" y="250">Inward</text><text x="195" y="250">Review</text><text x="330" y="250">In Lab</text>
      <text x="465" y="250">Authorized</text><text x="595" y="250">Dispatched</text>
    </g>
    <line x1="632" y1="40" x2="632" y2="256" stroke="rgba(255,255,255,.18)" stroke-width="1"/>
    <text x="652" y="62" fill="rgba(255,255,255,.75)" font-size="11.5" font-weight="600">what changes</text>
    <g fill="rgba(255,255,255,.6)" font-size="11">
      <text x="652" y="92">emotion</text>
      <text x="652" y="108">-&gt; custody</text>
      <text x="652" y="140">channel</text>
      <text x="652" y="156">-&gt; handoff</text>
      <text x="652" y="188">persona</text>
      <text x="652" y="204">-&gt; traveler,</text>
      <text x="652" y="220">incl. non-</text>
      <text x="652" y="236">human ones</text>
    </g>
    <text x="40" y="318" fill="rgba(255,255,255,.5)" font-size="11.5">Strip out the interior life of the traveler and the structural half remains - and the structural half was always doing the work.</text>
  </g>
</svg>
<figcaption><strong>The same lens, two travelers.</strong> A buyer and a vial share a structure: steps in time, seams between owners, state someone needs to see. What does not survive the move is the vocabulary built for a mind.</figcaption>
</figure>

## What the lens changed in a live laboratory system

A testing lab is exactly the kind of organization Conway's law shapes: reception, admin, technicians, analysts, checkers, signatories, dispatch. Each is a real department with a real head. A data-first design can easily carve the system into modules along those lines - and recreate, in software, precisely the boundaries where samples already stall and paperwork already chases people.

Three concrete things came out differently because we ran the journey analysis first.

**The sample's journey became the schema, not a status column.** A sample at Chemo travels a long regulated path: inward, administrative review, assignment, technical review, in-lab analysis, tests done, authorization, signing, dispatch. We built the system so that the record of a sample *is* the record of its journey - a staged timeline where each completed step is stamped with who performed it and when, with per-sample progress. The centerpiece of the product is a workflow view showing that rail live, for every sample in the building.

That is not a reporting feature bolted on at the end. It is the shape of the data, chosen at the start, and it directly answers one of the most persistent questions in systems managing long-running work: *where is my thing, and what happens next?* When journey state is first-class in the model, that view costs little. When it is not, it costs a great deal and usually never gets built - which is why so many organizations answer the question by phoning someone who phones someone else.

**Two travelers appeared that a data-first analysis would have missed.** This is the part I would point to if I had to justify the method in one paragraph. Ask "what entities does the lab manage?" and you get samples, tests, customers, invoices. Ask "who travels through this system and its outputs?" and two more people walk into the room:

- *The report recipient.* A lab report is confidential, regulated data, and its delivery is a journey with its own failure mode: the emailed link that gets forwarded. So delivery is recipient-bound rather than link-protected. The authorized recipient follows a link, must enter report-specific details, and only then receives a one-time password sent solely to them. Forward the link and it simply fails. The friction is real and we judged it correct for this data.
- *The verifier* - a regulator, an auditor, a buyer holding a certificate and wondering whether it is genuine. They will never log in to the lab's system, so they are invisible to any analysis that starts from internal entities. They are perfectly visible the moment you ask who travels through the outputs. The answer was a public report checker: anyone can enter a certificate number and confirm a report is real. You can [try it yourself](https://reports.chemotestlaboratory.com/v1/app/chemo/report-checker/) - no account, no relationship with the lab required.

**Scope got a principled boundary.** Journey-first is as much a scoping discipline as a design one. Walking the journeys tells you which ones must work end to end now and which are someone else's problem this year - and that gives you a defensible answer to "what are we not building yet?", which is usually the harder question.

## Where I would not oversell this

Some honesty about the edges, since the whole point of the discipline is noticing where things break.

**This is not a controlled experiment.** We have no A/B comparison proving journey-first builds succeed where data-first builds fail, and I do not believe anyone has one that isolates the variable. What I can show is that specific decisions came out differently - the schema's shape, two features the analysis surfaced and prioritized, the scope boundary - and you can inspect two of those decisions live from outside the company.

**The regulated version is stricter than the marketing version.** Marketing journey mapping asks how a step feels. A regulated journey asks who is *permitted* to move this to the next step, and what evidence of that survives an audit two years later. Custody and authority replace emotion, and they are harder requirements: an emotion curve that is slightly wrong costs you a campaign, while an authority chain that is slightly wrong costs you an accreditation.

**The lens earns less on some systems.** Batch back-office processing, integration-heavy plumbing, systems whose "traveler" completes its trip in one hop - these have thin journeys, and the analysis returns little. It is a complement to rigorous data modeling in regulated domains, never a replacement for it.

**And the discipline degenerates if you let it.** The failure mode we watched from inside Touchpoint for six years - beautiful maps that governed nothing - transfers just as readily as the useful parts. The test is unchanged: if the map has not altered the schema, the scope, or the build order, it was decoration.

## The short version

A marketing discipline turned out to have a structural core that has nothing to do with marketing. Six years of building the tool taught us that core, mostly by showing us which uses of it were real. Pointed at a laboratory, it produced a system whose data model is a journey, plus two features for people who never log in - one of which you can go and use right now, on a live accredited lab's certificates.

If you are commissioning a system: ask whoever is building it to name the travelers before they show you a schema. If auditors, verifiers, or your customers' customers are missing from that list, the analysis is not finished yet.

And if you are the one who has to specify, govern or accept such a system, the companion paper turns this experience into a method you can require of a vendor - discovery inputs, the translation into architecture and controls, governance, acceptance evidence, and a traceability matrix to fill in: [Journey-to-system design](/white-papers/consumer-journey-systems-development/).
