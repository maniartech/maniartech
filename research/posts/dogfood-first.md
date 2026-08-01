---
title: "Dogfood first, then release: how we decide software is ready"
description: "Why we run our own libraries, platforms, and tools in production before recommending them to anyone - and why so much of our work is deliberately pre-1.0."
date: "2026-07-21"
order: 3
titleTag: "Dogfood First - How We Decide Software Is Ready"
seoDescription: "We rebuilt maniartech.com on our own static-site framework before offering it to anyone. What dogfooding first buys a client, with the specifics."
thread: "process"
shortTitle: "Dogfood first"
receipts:
  - "release policy"
keyReceipt: "deliberately pre-1.0"
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

## Case in point: this site runs on a framework we have not released yet

Taj Mahal is worth a closer look, because it is the dogfood gate operating in plain view, right now.

It is a static-site generator with a specific opinion: every section of a site - the blog, the docs, the service pages, a landing area - is an independent **module** with its own content directory, its own routes, and, if it wants one, its own theme. Content is Markdown with YAML frontmatter; presentation is Django-style templates with theme inheritance; assets go through a built-in bundling and minification pipeline rather than a bolted-on toolchain. It currently runs **more than ten of our own live websites**, plus that laboratory client's public site, plus the page you are reading.

It is not open source yet. Not because it is secret - because it has not passed its own gate.

Rebuilding maniartech.com on it has been the hardest workout the framework has had: a multi-section site with a blog, case studies, long-form documents, and a custom theme, built under real deadline pressure by people with no patience for their own tool's excuses. A framework that survives that is shaped differently from one designed on a whiteboard:

- **Content ordering is strictly deterministic** - numeric filename prefix, then frontmatter order, then timestamp - because "mostly alphabetical" is tolerable on a five-page demo and maddening on a two-hundred-page site.
- **Error reporting is a headline feature**, not an afterthought, because the person staring at a broken template at midnight is usually one of us. Nothing improves a framework's error messages like the author having to read them.
- **Documentation is part of the definition of done.** Taj Mahal ships with a full manual - an eight-part book, around twenty-nine chapters - written by the people who operate the tool daily, covering the failure modes we actually hit, not the happy path we hoped for.
- **We know its remaining rough edges precisely.** Which configuration changes need a restart. How to recover when the content cache gets into a bad state. Our own build notes record every surprise, and that list is the honest release checklist: the framework goes public when the surprises run out, not when a launch date arrives.

That last point is the whole model in one sentence. Most software is released when the roadmap says so. Ours is released when the dogfooding stops producing incident notes.

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

## A concrete example that completed the loop

Our [signals](/foundry/signals/) library - a small, type-safe event system for Go - is a fair miniature of the whole model. It existed because our own systems needed clean event handling. It ran inside real projects first. It was published only when it had stopped changing underneath us, and it has since been used by developers we have never met - which is the point of the model: **the last step of dogfooding is that the food turns out to be fine for everyone.**

The same path is being walked right now by bigger things - our data format, our expression engine, the site generator this page is served by - each at its own honest stage, each maturing on real work before it asks for anyone's trust.

## What dogfooding buys you as a client

Two practical consequences.

First, **your project inherits tested foundations** - but only where they genuinely fit, and never as a dependency you have not agreed to. Client work is built on mainstream, hireable technology; our own tools appear in your stack only with your eyes open and your say-so.

Second, **the honesty travels.** A team that will not overstate its own version numbers is not going to overstate your project's status either. The discipline is the same muscle: say what is true, ship what is ready, and let the labels mean something.

If that is the kind of engineering relationship you want, tell us what you are building - [get a free estimate](/estimate/), and a senior engineer replies within one business day with a ballpark and an honest take.
