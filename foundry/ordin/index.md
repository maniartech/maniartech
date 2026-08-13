---
title: "Ordin"
headline: "Declare the workflow. The engine runs it, and remembers."
description: "A workflow-automation engine in development: workflows declared in YAML, executed through pluggable activity nodes, with expression-driven routing and an inspectable execution history."
eyebrow: "Product"
titleTag: "Ordin - Plugin-Driven Workflow Automation"
seoDescription: "Ordin: ManiarTech's workflow engine in development - YAML-declared workflows, pluggable activities, expression-driven routing. Private; fair-code model declared."
order: 2
tocDepth: "3"
statusLine: "In development | Private | Fair-code model declared in-tree, terms not finalised"
railMeta:
  - { k: "Type", v: "Workflow-automation engine (Go)" }
  - { k: "Maturity", v: "In development; runtime past prototype" }
  - { k: "Availability", v: "Private" }
  - { k: "Licence", v: "Fair-code model declared in the tree; terms not finalised, nothing published" }
  - { k: "Adoption", v: "Not available" }
  - { k: "Evidence", v: "Committed example workflows in the repository" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Processious"
    note: "The platform Ordin is being built to power"
    url: "/products/processious/"
  - label: "UExL"
    note: "The expression-engine discipline behind dynamic YAML values"
    url: "/foundry/uexl/"
privateReview: "The repository is private. Qualified customers can request a design walkthrough of the workflow model, the plugin loader and the execution semantics."
---

Workflow engines fail in one of two ways: they hide the process inside code nobody can read, or they draw it in a proprietary designer nobody can diff. Ordin's position is that a workflow should be a **declared document** - YAML you can read, review and version - executed by an engine that keeps an inspectable record of what actually happened.

## The model, on a real workflow

This is a committed example from the repository - a scheduler that appends timestamped lines to a file, trivially small on purpose, because it shows every part of the model:

```yaml
name: helloworld
description: Logs the Hello World to the file every second
version: 1.0

nodes:
  - name: timer
    type: scheduler.Timer
    params:
      timer: 1s
      count: 5

  - name: logger
    type: fileio.WriteFile
    params:
      mode: "a+"
      filepath: "./logger.txt"
      content: !expr >
        time(true) + ' ' + 'Hello' + '\n'
```

Three things are visible in twenty lines. **Nodes are typed plugins** (`scheduler.Timer`, `fileio.WriteFile`) - the engine loads and verifies them, so capabilities are added by writing a plugin, not by patching the core. **Values can be expressions** - the `!expr` tag makes YAML dynamic, evaluated at execution time. And **the workflow is a document**: it diffs, reviews and versions like any other code.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ordin's execution model: a YAML workflow is validated into a definition; the plugin loader verifies and provides typed activity nodes; the orchestrator executes them with expression-driven routing; execution history is recorded and inspectable">
  <g font-family="inherit" font-size="12">
    <rect x="30" y="40" width="150" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)"/>
    <text x="105" y="62" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">YAML workflow</text>
    <text x="105" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">declared, versioned, diffable</text>
    <path d="M180 66 L226 66" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="228" y="40" width="150" height="52" rx="9" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.4)"/>
    <text x="303" y="62" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">validated definition</text>
    <text x="303" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">workflow manager + state</text>
    <path d="M378 66 L424 66" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="426" y="40" width="160" height="52" rx="9" fill="rgba(20,207,147,.1)" stroke="rgba(20,207,147,.55)"/>
    <text x="506" y="62" text-anchor="middle" fill="#14cf93" font-weight="600">orchestrator</text>
    <text x="506" y="80" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="10.5">plugin nodes; !expr routing</text>
    <path d="M586 66 L632 66" stroke="rgba(255,255,255,.35)" stroke-width="1.4"/>
    <rect x="634" y="40" width="96" height="52" rx="9" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.45)"/>
    <text x="682" y="62" text-anchor="middle" fill="rgba(255,255,255,.85)" font-weight="600">history</text>
    <text x="682" y="80" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">inspectable</text>
    <rect x="228" y="140" width="358" height="46" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.3)"/>
    <text x="407" y="159" text-anchor="middle" fill="rgba(255,255,255,.75)" font-weight="600">plugin loader</text>
    <text x="407" y="177" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="10.5">scans, verifies and sets up typed plugins before any workflow runs them</text>
    <path d="M303 138 L303 94" stroke="rgba(255,255,255,.3)" stroke-width="1.3" stroke-dasharray="4 3"/>
    <path d="M506 138 L506 94" stroke="rgba(255,255,255,.3)" stroke-width="1.3" stroke-dasharray="4 3"/>
  </g>
</svg>
<figcaption><strong>Declared, validated, executed, remembered.</strong> The stages come from the repository's own component map: workflow manager, workflow state, orchestrator, plugin loader. Plugins are verified before they run - a workflow can only invoke what the loader has accepted.</figcaption>
</figure>

## Where it fits

Ordin is being built as the automation core behind [Processious](/products/processious/) - the long-running, scheduled and event-driven work of that platform runs through it. That is also its design pressure: an engine that will carry regulated operations must favour explicit definitions and inspectable history over cleverness.

## Known limits

- **In development.** The runtime is past prototype - event-to-activity execution, output-based routing, fan-out and the plugin set above work end to end - and it is not presented as best-in-class yet.
- **Private.** There is no public repository, package or release.
- **Licensing is declared, not finalised.** The tree carries a fair-code licence marker; the actual terms are not finalised and nothing is published, so no rights exist for anyone today.
- **No performance claims** - we do not publish numbers we cannot let you reproduce.

## Status: four facts, kept separate

- **Availability** - private.
- **Licence** - a **fair-code model is declared in the repository**; terms not finalised; nothing published.
- **Maturity** - in development, past prototype.
- **Adoption** - not available.

## What this demonstrates

An engine like this is a study in boundaries: what belongs in the declared document versus the plugin, what the orchestrator may decide versus what it must record, and how far YAML can be made dynamic before it stops being reviewable. Those are the same boundary decisions every enterprise workflow system lives or dies by - which is why we are building this one carefully rather than quickly.
