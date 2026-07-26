---
title: "Rewrite or refactor? The strangler-fig answer to aging systems"
description: "Why big-bang rewrites fail, when a rewrite is actually right, and how incremental modernization - old and new running side by side, every step reversible - de-risks the systems you cannot afford to break."
date: "2026-07-23"
order: 6
---

Every company running an aging system eventually faces the same meeting. The system still works - it runs the business, in fact - but it is slow to change, expensive to maintain, and built on technology that gets harder to hire for every year. Someone says the word "rewrite." Someone else remembers the last rewrite. The meeting ends without a decision, and the system ages another quarter.

This post is the decision framework we wish more of those meetings had - including the part most vendors will not say, about when a rewrite genuinely is the right call.

## Why big-bang rewrites fail so reliably

The all-at-once rewrite has a seductive logic: the old system is a mess, so build a clean one next to it, then switch. In practice it fails for reasons that are structural, not accidental:

- **The old system is the only complete specification.** Years of edge cases, exception handling, and quiet fixes live in that "legacy mess" and nowhere else. A rewrite team discovers them one production incident at a time.
- **The business does not stop.** While the rewrite crawls toward parity, the old system keeps changing - the target moves, and the new system chases a spec that will not hold still.
- **The risk arrives all at once.** A cutover weekend concentrates every unknown into a single event. If go-live breaks the business, there is often no way back - the moment of maximum risk is also the moment of least reversibility.

None of this means legacy systems should be left to rot. It means the *shape* of the replacement matters more than the ambition of it.

## The strangler-fig alternative

The strangler fig is a tree that grows around a host, gradually taking over its structure until it stands on its own. Applied to software, the method looks like this:

**Audit and inventory first.** Before moving anything, understand what the system actually does - its modules, its data flows, its risks, and crucially, what is *not* worth migrating. Some parts of every legacy system exist only because nobody dared delete them. Deciding what to leave behind is where modernization starts paying for itself.

**Migrate one piece at a time.** Take a module, rebuild it on the modern stack, and route its traffic across. The rest of the system keeps running untouched. Risk stays small and visible at every step - a problem affects one module, not the business.

**Old and new run side by side.** The legacy system keeps serving while the modern one comes up behind it, with traffic switched gradually - which means the "cutover" never happens as an event. One day you notice the old system is no longer doing anything, and that is the whole ceremony.

**Every step is reversible.** If a migrated piece misbehaves, route back and fix it calmly. No point of no return, no praying on a Saturday night.

**Tested as it goes.** Each migrated piece ships with its tests, so "modernized" also means "verified" - not "we will find out in production."

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

## The proof that patience works

The longest-running validation we can offer: in 2011 we took over a laboratory's sprawling legacy platform - **600+ Microsoft Access forms** grown over years - and replaced it with a single workflow-driven application. Not by switching everything off one weekend, but by understanding what the sprawl actually did, keeping the operation running, and shipping a system its users could see themselves in. By the lab's account, it is **still in daily use about 15 years later** - and its users later sought us out to build a second laboratory platform, which runs in production today.

Systems earn that kind of lifespan when the migration respects the business it serves - and when the result is boring, in the best sense: comprehensible, maintainable, and quietly doing its job a decade on.

## A self-assessment to bring to the meeting

1. Which parts of the system change most often? (Those migrate first - that is where the pain is.)
2. Which parts have not changed in years and work fine? (Candidates to leave alone or retire.)
3. What breaks the business if it breaks? (Those get the most careful, most reversible treatment.)
4. What does the system do that nobody can explain? (That is your rewrite risk, quantified.)
5. Who maintains the result in year three? (The answer chooses your destination stack.)

If you are weighing this decision for a system you cannot afford to break, our [Modernization & Migration](/services/modernization/) practice does exactly this work. Or skip straight to the honest conversation: [tell us what you are running](/estimate/) - a senior engineer replies within one business day, including "leave it alone" if that is the truth.
