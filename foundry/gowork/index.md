---
title: "gowork"
headline: "A workspace doctor for multi-module Go."
description: "A CLI that diagnoses - and where safe, fixes - the inconsistencies that creep into Go workspaces: drifted replace directives, stale use entries, mismatched Go versions, and the chores go work leaves you to script by hand."
eyebrow: "Developer tool"
titleTag: "gowork - Friendly Tooling for Go Workspaces"
seoDescription: "gowork: a workspace doctor for Go multi-module repos - diagnoses drift, runs tidy and vendor workspace-wide. Private, pre-1.0."
order: 10
tocDepth: "3"
statusLine: "Private | Pre-1.0 | Internally used | Apache-2.0 in-tree, nothing published"
railMeta:
  - { k: "Type", v: "Developer tool - Go workspace CLI" }
  - { k: "Maturity", v: "Pre-1.0; core commands solid, link earlier-stage" }
  - { k: "Availability", v: "Private" }
  - { k: "Licence", v: "Apache-2.0 file in the tree; nothing is published, so no grant exists" }
  - { k: "Adoption", v: "Not externally available" }
  - { k: "Evidence", v: "Used daily in ManiarTech's own multi-module repositories" }
  - { k: "Reviewed", v: "13 August 2026" }
railLinks:
  - label: "Taj Mahal SSG"
    note: "One of the multi-module workspaces this tool serves"
    url: "/foundry/tajmahal-ssg/"
  - label: "Go engineering write-ups"
    note: "How we reason about tooling decisions"
    url: "/insights/"
privateReview: "The repository is private. Qualified customers can request a walkthrough of the doctor's checks and the safety model behind its automatic fixes."
---

Go workspaces (`go.work`) are deliberately minimal, and in a real multi-module repository that minimalism has a price: a `replace` in one module drifts from what the workspace says, a `use` entry points at a moved directory, one module's `go` version lags the rest, `go mod tidy` must run module-by-module in dependency order - and it cheerfully tries to fetch unpublished siblings that only exist on your disk. Most teams paper over this with Makefiles and tribal knowledge. gowork turns the tribal knowledge into commands.

## The signature exhibit: what the doctor sees

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A Go workspace graph of three modules where gowork doctor finds a replace directive drifted from the workspace, a use entry pointing at a deleted directory, and a lagging Go version - reporting each with an explanation and fixing the safe ones">
  <g font-family="inherit" font-size="12">
    <text x="40" y="28" fill="rgba(255,255,255,.8)" font-weight="600" font-size="12.5">gowork doctor - the workspace, diagnosed</text>
    <rect x="40" y="48" width="150" height="44" rx="8" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.4)"/>
    <text x="115" y="74" text-anchor="middle" fill="rgba(255,255,255,.8)" font-family="Consolas, monospace" font-size="11.5">go.work</text>
    <g fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.35)">
      <rect x="300" y="30" width="170" height="40" rx="7"/>
      <rect x="300" y="86" width="170" height="40" rx="7"/>
      <rect x="300" y="142" width="170" height="40" rx="7"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.75)" font-family="Consolas, monospace" font-size="11">
      <text x="385" y="54">module a - ok</text>
      <text x="385" y="110">module b - replace drift</text>
      <text x="385" y="166">module c - go 1.22 lags</text>
    </g>
    <g stroke="rgba(255,255,255,.3)" stroke-width="1.3">
      <line x1="190" y1="60" x2="298" y2="48"/><line x1="190" y1="70" x2="298" y2="105"/><line x1="190" y1="80" x2="298" y2="161"/>
    </g>
    <path d="M190 88 L298 210" stroke="rgba(240,90,90,.55)" stroke-width="1.4" stroke-dasharray="5 4"/>
    <rect x="300" y="196" width="170" height="34" rx="7" fill="rgba(240,90,90,.08)" stroke="rgba(240,90,90,.5)"/>
    <text x="385" y="217" text-anchor="middle" fill="rgba(240,90,90,.85)" font-family="Consolas, monospace" font-size="11">use ./gone - missing dir</text>
    <rect x="520" y="70" width="210" height="118" rx="9" fill="rgba(20,207,147,.08)" stroke="rgba(20,207,147,.5)"/>
    <text x="625" y="94" text-anchor="middle" fill="#14cf93" font-weight="600">the doctor's verdicts</text>
    <g fill="rgba(255,255,255,.65)" font-size="10.5">
      <text x="536" y="116">- drift: explained, auto-fixable</text>
      <text x="536" y="136">- stale use: explained, auto-fixable</text>
      <text x="536" y="156">- version lag: explained, asks first</text>
      <text x="536" y="176">- unsafe cases: report only</text>
    </g>
  </g>
</svg>
<figcaption><strong>Tell exactly what is wrong; fix only what is safe.</strong> The doctor explains every finding, repairs the mechanical cases, and leaves judgment calls to the engineer - the tool's safety model in one sentence.</figcaption>
</figure>

## The command surface

From the README: the core is `doctor` (diagnose and safely fix), `tidy` and `up` (run the whole workspace, every module in dependency order, with local siblings wired so nothing tries to fetch an unpublished module), `add` and `remove` (wire a module in or out), `vendor` (workspace-wide vendoring, which `go mod vendor` does not do), and `link` (develop against a local copy of a dependency - the README labels it earlier-stage than the rest). gowork is a companion to the `go` command, explicitly not a replacement.

## Known limits

- **Private and pre-1.0.** No public repository, no release. An Apache-2.0 licence file sits in the tree, but nothing is published - so no rights exist for anyone today, and we state the file rather than implying a release.
- **`link` is earlier-stage** than the core commands, per the project's own README.
- **Scope is the workspace**, not the build: it manages `go.work` and module wiring, and leaves compilation to the Go toolchain.

## Status: four facts, kept separate

- **Availability** - private.
- **Licence** - Apache-2.0 file present in the tree; unpublished, so no grant is in effect.
- **Maturity** - pre-1.0; used daily in our own multi-module repositories.
- **Adoption** - not externally available.

## What this demonstrates

The craft here is the safety model: a tool that changes developer infrastructure must explain every finding, fix only what is provably mechanical, and stop where judgment begins. We built gowork because our own workspaces punished manual upkeep - and the discipline of "diagnose loudly, repair conservatively" is the same one we apply to any automation we put inside a customer's engineering workflow.
