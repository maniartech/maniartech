---
title: "Rewrite or refactor? The strangler-fig answer to aging systems"
description: "Why big-bang rewrites fail, when a rewrite is actually right, and how incremental modernization - old and new running side by side, every step reversible - de-risks the systems you cannot afford to break."
date: "2026-07-23"
order: 6
titleTag: "Rewrite vs Refactor - the Strangler Fig Approach"
seoDescription: "When a rewrite is justified, when refactoring wins, and how a strangler-fig migration modernizes a legacy system without a go-live gamble."
---

Every company running an aging system eventually faces the same meeting. The system still works - it runs the business, in fact - but it is slow to change, expensive to maintain, and built on technology that gets harder to hire for every year. Someone says the word "rewrite." Someone else remembers the last rewrite. The meeting ends without a decision, and the system ages another quarter.

This post is the decision framework we wish more of those meetings had - including the part most vendors will not say, about when a rewrite genuinely is the right call.

## Why big-bang rewrites fail so reliably

The all-at-once rewrite has a seductive logic: the old system is a mess, so build a clean one next to it, then switch. In practice it fails for reasons that are structural, not accidental:

- **The old system is the only complete specification.** Years of edge cases, exception handling, and quiet fixes live in that "legacy mess" and nowhere else. A rewrite team discovers them one production incident at a time.
- **The business does not stop.** While the rewrite crawls toward parity, the old system keeps changing - the target moves, and the new system chases a spec that will not hold still.
- **The risk arrives all at once.** A cutover weekend concentrates every unknown into a single event. If go-live breaks the business, there is often no way back - the moment of maximum risk is also the moment of least reversibility.

None of this means legacy systems should be left to rot. It means the *shape* of the replacement matters more than the ambition of it.

## Rewrite vs refactor: the real question is the shape of your risk

Strip away the technology and the decision has three basic postures, each with a different risk profile:

- **Refactor in place** improves the existing system incrementally - the risk is continuous but small, and the ceiling is limited: you keep the old architecture's fundamental constraints, and sometimes the old platform's hiring problem.
- **Big-bang rewrite** defers all risk to one concentrated moment - months of apparent calm, then a cutover where every unknown comes due simultaneously, with the least room to maneuver.
- **Strangler-fig migration** replaces the system piece by piece while it keeps running - risk stays small, visible, and above all *reversible* at every step, at the price of some duplicated infrastructure and discipline while old and new coexist.

Most modernization arguments are really arguments about which risk shape the business can live with. For a system the business depends on daily, the answer is rarely "all of it, on one weekend."

## The strangler-fig migration, step by step

The strangler fig is a tree that grows around a host, gradually taking over its structure until it stands on its own. Applied to software, the method looks like this:

**Audit and inventory first.** Before moving anything, understand what the system actually does - its modules, its data flows, its risks, and crucially, what is *not* worth migrating. Some parts of every legacy system exist only because nobody dared delete them. Deciding what to leave behind is where modernization starts paying for itself.

**Migrate one piece at a time.** Take a module, rebuild it on the modern stack, and route its traffic across. The rest of the system keeps running untouched. Risk stays small and visible at every step - a problem affects one module, not the business.

**Old and new run side by side.** The legacy system keeps serving while the modern one comes up behind it, with traffic switched gradually - which means the "cutover" never happens as an event. One day you notice the old system is no longer doing anything, and that is the whole ceremony.

**Every step is reversible.** If a migrated piece misbehaves, route back and fix it calmly. No point of no return, no praying on a Saturday night.

**Tested as it goes.** Each migrated piece ships with its tests, so "modernized" also means "verified" - not "we will find out in production."

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three stages of a strangler-fig migration: the legacy system running whole; new modules growing alongside while traffic shifts; the legacy core retired with the modern system standing on its own">
  <g font-family="inherit" font-size="12">
    <g>
      <rect x="40" y="50" width="180" height="120" rx="8" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
      <text x="130" y="115" text-anchor="middle" fill="rgba(255,255,255,.7)" font-weight="600">Legacy system</text>
      <text x="130" y="200" text-anchor="middle" fill="rgba(255,255,255,.5)">1. Serving everything</text>
    </g>
    <g>
      <rect x="300" y="50" width="180" height="120" rx="8" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.3)" stroke-width="1.2"/>
      <rect x="286" y="36" width="70" height="52" rx="6" fill="rgba(20,207,147,.16)" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
      <rect x="424" y="36" width="70" height="52" rx="6" fill="rgba(20,207,147,.16)" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
      <rect x="286" y="132" width="70" height="52" rx="6" fill="rgba(20,207,147,.16)" stroke="rgba(20,207,147,.6)" stroke-width="1.3"/>
      <text x="390" y="115" text-anchor="middle" fill="rgba(255,255,255,.55)" font-weight="600">Legacy core</text>
      <text x="390" y="200" text-anchor="middle" fill="rgba(255,255,255,.5)">2. New modules take traffic, one by one</text>
    </g>
    <g>
      <rect x="560" y="50" width="180" height="120" rx="8" fill="rgba(20,207,147,.14)" stroke="rgba(20,207,147,.65)" stroke-width="1.4"/>
      <rect x="588" y="80" width="54" height="38" rx="5" fill="rgba(20,207,147,.2)" stroke="rgba(20,207,147,.5)"/>
      <rect x="658" y="80" width="54" height="38" rx="5" fill="rgba(20,207,147,.2)" stroke="rgba(20,207,147,.5)"/>
      <rect x="588" y="126" width="124" height="30" rx="5" fill="rgba(20,207,147,.2)" stroke="rgba(20,207,147,.5)"/>
      <text x="650" y="200" text-anchor="middle" fill="rgba(255,255,255,.5)">3. Old core retired - no cutover event</text>
    </g>
    <g stroke="rgba(255,255,255,.3)" stroke-width="1.3" fill="none" marker-end="none">
      <path d="M228 110 H292"/><path d="M488 110 H552"/>
    </g>
    <text x="380" y="242" text-anchor="middle" fill="rgba(255,255,255,.45)" font-size="11.5">The service line never breaks: the business keeps running through every stage.</text>
  </g>
</svg>
<figcaption><strong>The strangler-fig migration.</strong> New growth carries more and more of the load until the old core is doing nothing - and switching it off is an anticlimax, which is the point.</figcaption>
</figure>

## When a rewrite IS the right answer

Honesty requires the other half of the framework. A full rewrite is legitimate when:

- **The system is small enough** that a rewrite fits in weeks, not quarters - below a certain size, incremental machinery costs more than it protects.
- **The platform is truly dead** - the runtime, OS, or hardware it needs is unmaintainable, and no incremental bridge exists.
- **The business logic is genuinely simple** and fully known - the rare case where the old system holds no secrets.
- **Nothing depends on continuity** - internal tools with tolerant users and forgiving downtime windows.

If a vendor prescribes a full rewrite for a large, business-critical system without walking through the strangler-fig option first, ask them who carries the risk of the cutover weekend. It is rarely them.

## What the destination should be - and an honest note on stacks

Modernization has two halves: how you migrate, and what you land on. Our rule for the destination: **mainstream, hireable technology** - a stack your own team, or any team, can maintain. The point of leaving a hard-to-staff legacy is defeated if you land somewhere equally exotic.

And the destination should be chosen by the workload, not by a vendor's favorite language. We work deeply in Go - deeply enough to have [built our own tooling and libraries in its ecosystem](/foundry/) - and we move systems to Go where high concurrency or performance-critical paths genuinely benefit. We have also modernized systems onto current Python, because that was the right call for those systems. A modernization partner selling one destination for every workload is selling their preference, not your outcome.

## How this played out: 600 Access forms became one system

The longest-running validation we can offer started in 2011, when we took over the modernization of a laboratory's test-management platform. The original had been built in-house, in Microsoft Access, by people who knew the lab intimately - and over years of growth it had swelled to **600+ forms**, about as many reports, and a sprawl of data tables, wrapped around a genuinely complex pipeline: a sample is received, logged, accepted, analysed, reviewed, signed off more than once, then dispatched and invoiced. It captured everything and had become hard to learn, hard to train on, and slow under its own weight.

Three things about how that engagement ran are the whole framework in miniature:

**The audit came first.** The real work was not porting; it was understanding what those hundreds of forms actually did - working hand in hand with the people who had built the original and knew every workflow in it. That understanding is what made the second step possible.

**The replacement was a compression, not a copy.** We rebuilt the system around the sample's journey rather than around the forms: **600+ forms and reports became one workflow-driven screen and one report**, with role-based access governing who could check, sign, and authorize at each step, and the accounts and invoicing system integrated into the same application. Faster, and far easier to learn - because it modeled the work, not the history of patches.

**The business never stopped.** The engagement ran for some two-plus years, the lab kept operating throughout, and the relationship kept extending - the lab later came back for a second phase, a web portal that let its own customers download their analytical reports directly. By the lab's account, the system is **still in daily use about 15 years later**, with the lab's own modifications along the way - and its users later sought us out to build a second laboratory platform, which runs in production today.

Systems earn that kind of lifespan when the migration respects the business it serves - and when the result is boring, in the best sense: comprehensible, maintainable, and quietly doing its job a decade on.

## A rewrite vs refactor decision checklist

Bring these questions to the meeting; they do most of the framework's work:

1. Which parts of the system change most often? (Those migrate first - that is where the pain is.)
2. Which parts have not changed in years and work fine? (Candidates to leave alone or retire.)
3. What breaks the business if it breaks? (Those get the most careful, most reversible treatment.)
4. What does the system do that nobody can explain? (That is your rewrite risk, quantified.)
5. Who understands the current system - and are they available to the migration? (Their knowledge is the specification; plan around it.)
6. What is the smallest piece that could move first and prove the approach? (If no such piece exists, be suspicious of any plan.)
7. Who maintains the result in year three? (The answer chooses your destination stack.)

If you are weighing this decision for a system you cannot afford to break, our [Modernization & Migration](/services/modernization/) practice does exactly this work. Or skip straight to the honest conversation: [tell us what you are running](/estimate/) - a senior engineer replies within one business day, including "leave it alone" if that is the truth.
