---
title: "Taj Mahal SSG — the Go static-site framework that powers this site"
description: "A modular Go static-site generator — it powers maniartech.com and client sites; OSS release planned."
labStatus: "Internal · OSS planned"
category: "Developer Tools"
license: "TBC"
order: 7
---

Taj Mahal SSG is our own static-site generator, written in Go. It is internal today — not yet released — but it isn't a prototype: it runs in production on this very website and on live client sites. An open-source release is planned.

## What it is

Taj Mahal SSG turns Markdown content and Django/Jinja-style templates into fast, SEO-friendly static sites. Its defining idea is **modules**: each section of a site — docs, blog, a landing area — is an independent module with its own content, routes, and optionally its own theme. That modular architecture is what sets it apart from Hugo/Jekyll-style generators, and it is what lets a single site grow without turning into one tangled tree.

A module is one small YAML file plus a content directory. This is not a hypothetical - the excerpt below is this site's own Research module, verbatim minus comments:

<div class="lang-diff">
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot"></span> the module - <b>research/module.yaml</b></div>
<pre class="mt-code"><span class="k">name:</span> research

<span class="k">pages:</span>
  - <span class="k">insights:</span>
      <span class="k">path:</span> <span class="s">/insights/*</span>
      <span class="k">content:</span> posts
  - <span class="k">white-papers:</span>
      <span class="k">path:</span> <span class="s">/white-papers/*</span>
      <span class="k">content:</span> papers

<span class="k">page_size:</span> 10</pre>
</div>
<span class="lang-arrow">&plus;</span>
<div class="lang-pane">
<div class="lp-bar"><span class="lp-dot ok"></span> the content that feeds it</div>
<pre class="mt-code">research/
  module.yaml
  posts/              <span class="c"># -&gt; /insights/*</span>
    dogfood-first.md
    lims-software-lessons.md
    ...
  papers/             <span class="c"># -&gt; /white-papers/*</span>
    cost-drivers-custom-software.md
    ...</pre>
</div>
</div>

The `/*` in a path means "this is a collection": Taj Mahal infers the list page and the article pages from the Markdown files it finds, so adding a blog post is dropping one file into `posts/`. No routing table to edit, no template to touch.

<figure class="mt-figure mt-fig-diagram">
<svg viewBox="0 0 760 236" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pipeline: independent site modules feed their Markdown content, together with a Pongo2 theme, into the Taj Mahal build, which outputs a plain-HTML static site">
  <g font-family="inherit" font-size="12.5">
    <g fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="1.2">
      <rect x="40" y="30" width="170" height="34" rx="6"/>
      <rect x="40" y="84" width="170" height="34" rx="6"/>
      <rect x="40" y="138" width="170" height="34" rx="6"/>
    </g>
    <g text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12">
      <text x="125" y="51">site module</text>
      <text x="125" y="105">research module</text>
      <text x="125" y="159">labs module</text>
    </g>
    <text x="125" y="196" text-anchor="middle" fill="rgba(255,255,255,.5)" font-size="11">each: Markdown content + routes</text>
    <line x1="210" y1="47" x2="288" y2="88" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    <line x1="210" y1="101" x2="288" y2="101" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    <line x1="210" y1="155" x2="288" y2="114" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    <polygon points="288,97 298,101 288,105" fill="rgba(255,255,255,.4)"/>
    <rect x="300" y="72" width="180" height="60" rx="8" fill="rgba(20,207,147,.15)" stroke="rgba(20,207,147,.65)" stroke-width="1.5"/>
    <text x="390" y="97" text-anchor="middle" fill="#14cf93" font-weight="600">Taj Mahal build</text>
    <text x="390" y="115" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="11.5">content rendered through templates</text>
    <rect x="305" y="180" width="170" height="36" rx="6" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.4)" stroke-width="1.2"/>
    <text x="390" y="202" text-anchor="middle" fill="rgba(255,255,255,.7)" font-size="12">theme: Pongo2 + assets</text>
    <line x1="390" y1="180" x2="390" y2="140" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>
    <polygon points="386,140 390,132 394,140" fill="rgba(255,255,255,.4)"/>
    <line x1="480" y1="102" x2="558" y2="102" stroke="rgba(20,207,147,.5)" stroke-width="1.5"/>
    <polygon points="558,98 568,102 558,106" fill="rgba(20,207,147,.5)"/>
    <rect x="570" y="72" width="160" height="60" rx="8" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>
    <text x="650" y="97" text-anchor="middle" fill="rgba(255,255,255,.8)" font-weight="600">static site</text>
    <text x="650" y="115" text-anchor="middle" fill="rgba(255,255,255,.55)" font-size="11.5">plain HTML, CDN-ready</text>
  </g>
</svg>
<figcaption><strong>Modules in, static site out.</strong> The three module boxes are this site's real modules. Each owns its content and routes; the build renders every module's Markdown through the theme's Pongo2 templates and emits plain HTML - nothing to run on the server.</figcaption>
</figure>

Around that core it carries the things you'd want from a serious framework rather than a script: theme inheritance, a built-in asset pipeline (tree-shaking, bundling, minification), custom tags and plugins, and docs-site features like auto-inferred list/article pages and sidebar navigation.

It is also **AI-native**. Taj Mahal ships an agent skill for building sites — this page, and the site around it, is built through that skill. A framework you can drive with an AI agent is a sharp fit for how we build in 2026.

## Why it matters

The proof is self-referential and you can check it.

- **It powers maniartech.com.** The site you are reading right now is generated by Taj Mahal SSG. There is no stronger credibility test for a static-site generator than the maker's own site running on it.
- **It powers live client sites.** [chemotestlaboratory.com](https://chemotestlaboratory.com), the public site of a 35-year, NABL / US-FDA / ISO-accredited testing laboratory, is built on Taj Mahal — its footer reads **"Powered by ManiarTech."**

Across our own and client work, Taj Mahal is in production on more than ten sites. That makes "production-proven" an honest statement rather than an aspiration.

## Status & how to see it

Taj Mahal SSG is **internal**. It is used in production on 10+ of our own and client sites, and an **open-source release is planned**. We are naming it here plainly rather than pointing to a repository, because the code isn't public yet.

To see it working, you already are — this page is the demo. For an independent example, visit [chemotestlaboratory.com](https://chemotestlaboratory.com) and read the footer.


