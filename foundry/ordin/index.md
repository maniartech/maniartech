---
title: Ordin
description: A workflow-automation engine - YAML-defined workflows, pluggable activities; fair-code / source-available. In active development.
productStatus: In development
titleTag: "Ordin - Plugin-Driven Workflow Automation"
---

Ordin is a workflow-automation engine. You define workflows in YAML, wire in pluggable activities,
and Ordin runs them - an event starts the flow, plugins do the work, and the results decide where
the flow goes next.

## The model, in one picture

This is Ordin's own sample flow - a server-monitoring loop, exactly as it appears in the workflow
definition:

```yaml
flows:
  - timer: ping_server
  - ping_server.success: [reset_failure_count, update_log]
  - ping_server.failure: log_failure
```

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A timer event triggers a ping_server activity; on success the flow fans out to reset_failure_count and update_log, on failure it routes to log_failure; a band below lists the plugins that do the work">
  <g font-family="inherit" font-size="12.5">
    <rect x="40" y="64" width="110" height="40" rx="8" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.35)" stroke-width="1.2"/>
    <text x="95" y="88" text-anchor="middle" fill="rgba(255,255,255,.75)">timer event</text>
    <line x1="150" y1="84" x2="264" y2="84" stroke="rgba(255,255,255,.45)" stroke-width="1.5"/>
    <polygon points="264,79 264,89 271,84" fill="rgba(255,255,255,.5)"/>
    <rect x="271" y="64" width="140" height="40" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.6)" stroke-width="1.2"/>
    <text x="341" y="88" text-anchor="middle" fill="rgba(255,255,255,.8)">ping_server</text>
    <g stroke-width="1.5" fill="none">
      <line x1="411" y1="84" x2="514" y2="42" stroke="rgba(20,207,147,.55)"/>
      <line x1="411" y1="84" x2="514" y2="90" stroke="rgba(20,207,147,.55)"/>
      <line x1="411" y1="84" x2="514" y2="158" stroke="rgba(240,90,90,.55)"/>
    </g>
    <g>
      <polygon points="514,37 514,47 521,42" fill="rgba(20,207,147,.7)"/>
      <polygon points="514,85 514,95 521,90" fill="rgba(20,207,147,.7)"/>
      <polygon points="514,153 514,163 521,158" fill="rgba(240,90,90,.7)"/>
    </g>
    <text x="452" y="52" text-anchor="middle" fill="#14cf93" font-size="11.5">success</text>
    <text x="446" y="136" text-anchor="middle" fill="rgba(240,90,90,.85)" font-size="11.5">failure</text>
    <g fill="rgba(20,207,147,.12)" stroke="rgba(20,207,147,.55)" stroke-width="1.2">
      <rect x="521" y="24" width="199" height="36" rx="8"/>
      <rect x="521" y="72" width="199" height="36" rx="8"/>
    </g>
    <rect x="521" y="140" width="199" height="36" rx="8" fill="rgba(240,90,90,.10)" stroke="rgba(240,90,90,.55)" stroke-width="1.2"/>
    <g text-anchor="middle" fill="rgba(255,255,255,.75)" font-size="11.5">
      <text x="620" y="46">reset_failure_count</text>
      <text x="620" y="94">update_log</text>
      <text x="620" y="162">log_failure</text>
    </g>
    <rect x="40" y="196" width="680" height="36" rx="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.3)" stroke-width="1.2"/>
    <text x="380" y="218" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12">Plugins do the work: shell, HTTP checks, file I/O, email markup, templates, expressions, cron / timer</text>
  </g>
</svg>
<figcaption><strong>Event in, routed outputs out.</strong> The diagram is the YAML above, drawn: a timer fires the check, and the activity's own outcome decides the route - success fans out to two follow-up activities, failure gets its own handler. The plugin band lists the activity types implemented in the engine today.</figcaption>
</figure>

Three ideas carry the whole engine. **Events start execution** - a timer or cron schedule fires and
the flow begins. **Activities are plugins** - the work itself (running a shell command, checking an
endpoint, touching files, rendering a template or an email) is done by pluggable activities, so the
engine stays small and the vocabulary grows by adding plugins. **Outputs route the flow** - each
activity's result picks the next step, including fanning out one result to several downstream
activities, which is how a three-line YAML file becomes a running monitoring loop.

## Where it stands

Ordin is **in development**, and we describe it the way its own roadmap does: the runtime is past the
prototype stage, with event-to-activity execution, output-based routing, fan-out, and the plugin set
above working end to end - and it is not best-in-class yet. The roadmap tracks the gaps as openly as
the features. It's **fair-code / source-available** - you can read the source; the licence is not a
permissive open-source one. We don't publish performance claims we can't let you reproduce.

Ordin is also being built as the automation engine behind [Processious](/products/processious/), our
process-automation platform - the long-running, scheduled, event-driven work runs through it.

## Why it matters to your project

Reliable automation is less about a clever script and more about an engine that runs work predictably,
recovers cleanly, and leaves a trail you can audit. Ordin is where we concentrate that engineering, so
the automation we build for you rests on a foundation we understand end to end.
