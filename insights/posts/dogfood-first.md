---
title: "Dogfood first, then release: how we decide software is ready"
description: "Why we run our own libraries, platforms, and tools in production before recommending them to anyone - and why so much of our work is deliberately pre-1.0."
date: "2026-07-21"
order: 3
---

There is a question every software vendor should be able to answer and most cannot: **do you use this yourself?**

Not in a demo. Not in a proof of concept. In production, on work that matters to you, where a failure costs you something real.

At ManiarTech, that question is the release gate. Nothing we build gets recommended to a client before it has earned its keep on our own work. We call it dogfood-first, and it shapes almost everything about how our technology matures - including the parts that look slow from the outside.

## What running on your own tools actually looks like

This is not a slogan for us; it is an inventory.

- **This website is built on Taj Mahal**, our own static-site generator, written in Go. So is the public website of one of our clients, an accredited testing laboratory - a site that has to work every day for a real business, not just look good in a portfolio.
- **Processious, our process-automation platform, runs a client's laboratory operations in production today** - sample intake, multi-stage technical review and authorization, and secure report delivery. Before it carried their work, it carried ours.
- **Our open-source Go libraries** - signals for events, gotime for date and time work, vault-storage for browser storage - were published because we had already been using them in real systems and they held up. Publication was the last step, not the first.
- **Our development environments are provisioned by Booster**, an orchestration tool we built for ourselves. Every project we start exercises it again.

The pattern is consistent: build the tool because the work demands it, run it until it stops surprising us, and only then let it near anyone else's project.

## Why so much of our work is pre-1.0 - deliberately

If you browse our [Foundry](/foundry/), you will notice honest labels everywhere: in development, research, internal. We could stamp 1.0 on more things. We do not, and the reason is the same discipline in reverse.

A version number is a promise. 1.0 says: the design is settled, the edges are known, you can build on this. A lot of software ships that promise before it is true - and then spends years walking it back through breaking changes.

We would rather let a library sit at 0.x while it matures on our own production work, absorb the design lessons while breaking changes are still cheap, and cut 1.0 when the promise is real. Our internal shorthand for this is blunt: **no output is better than wrong output.** A rushed answer - in a compiler, in a data format, in a version number - is a defect with a delay on it.

## The trade-off, stated honestly

Dogfood-first has a real cost, and it is fair to name it: **we are slower to public releases than a marketing calendar would like.** Projects spend longer unpublished. Some sit for years between the idea and the release, because the honest answer to "is this ready?" kept being "not yet."

What we get in exchange:

- **Battle-tested defaults.** By the time a tool reaches a client project, its sharp edges have already cut us, not the client.
- **Real documentation.** Docs written by the people who had to operate the thing, not by the people who hoped it would work.
- **An honest catalog.** When everything carries a truthful status label, "in production" actually means something. A buyer can calibrate instead of guessing.

## A concrete example

Our [signals](/foundry/signals/) library - a small, type-safe event system for Go - is a fair miniature of the whole model. It existed because our own systems needed clean event handling. It ran inside real projects first. It was published only when it had stopped changing underneath us, and it has since been used by developers we have never met - which is the point of the model: **the last step of dogfooding is that the food turns out to be fine for everyone.**

The same path is being walked right now by bigger things - our data format, our expression engine, our document tooling - each at its own honest stage, each maturing on real work before it asks for anyone's trust.

## What this means if you hire us

Two practical consequences.

First, **your project inherits tested foundations** - but only where they genuinely fit, and never as a dependency you have not agreed to. Client work is built on mainstream, hireable technology; our own tools appear in your stack only with your eyes open and your say-so.

Second, **the honesty travels.** A team that will not overstate its own version numbers is not going to overstate your project's status either. The discipline is the same muscle: say what is true, ship what is ready, and let the labels mean something.

If that is the kind of engineering relationship you want, tell us what you are building - [get a free estimate](/estimate/), and a senior engineer replies within one business day with a ballpark and an honest take.
