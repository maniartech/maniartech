---
title: Senior Software Engineering, Built to Last
description: ManiarTech designs, builds, and modernizes the systems companies depend on — senior engineers, an independently audited process, and mainstream technology your own team can maintain.
seoDescription: "Senior software engineering from India for clients worldwide: custom applications, process automation and modernization, on an independently audited process."
# The Home work stage (templates/includes/work-stage.html). `chips` must equal the
# matching foundry page's `statusLine` split on " | " - seo-check.mjs fails on drift.
# Named `workStage`, not tags/categories: a list of maps under those keys is silently emptied.
workStage:
  - key: processious
    name: Processious
    kind: "Platform | in production"
    line: "A workflow is not automated until invalid transitions are impossible."
    page: /products/processious/
    chips: ["In production", "Client-carrying", "Private", "Commercial engagement"]
    verifyLabel: "Verify a live output"
    verifyUrl: "https://reports.chemotestlaboratory.com"
    verifyExternal: true
  - key: internet-object
    name: Internet Object
    kind: "Data format | standard"
    line: "Declare the shape once, then send only data."
    page: /foundry/internet-object/
    chips: ["Spec: 1.0 working draft", "JS package: 0.2.1 (ISC)", "Playground: live", "Adoption: evaluate, don't commit"]
    verifyLabel: "Try the playground"
    verifyUrl: "https://play.internetobject.org"
    verifyExternal: true
  - key: uexl
    name: UExL
    kind: "Expression language | Go"
    line: "Compile the expression once. Evaluate it forever."
    page: /foundry/uexl/
    chips: ["Public source", "Pre-1.0, no release", "Licence: none granted", "Adoption: not yet"]
    verifyLabel: "Read the source"
    verifyUrl: "https://github.com/maniartech/uexl-go"
    verifyExternal: true
  - key: tajmahal
    name: Taj Mahal
    kind: "Site framework | Go"
    line: "Don't build a website. Build a Taj Mahal."
    page: /foundry/tajmahal-ssg/
    chips: ["Production-dogfooded", "Private", "Open source planned"]
---

You're looking at the default starter. This page is rendered from
`site/home/index.md` using the `home.html` template in the `default` theme — edit
the file and it hot-reloads as you save.

## Next steps

1. **Make it yours** — edit this text in `site/home/index.md`, and the hero above
   from its `title` / `description` frontmatter.
2. **Add a page** — list it in `site/module.yaml` and drop a Markdown file in `site/`
   (e.g. `site/contact/index.md` for a `contact: /contact/` page).
3. **Restyle** — templates live in `themes/default/templates/`, and the CSS (with the
   animation you're seeing) is `themes/default/lib/main.css`.
4. **Ship it** — run `tajmahal build` to generate the static site into `build/`.

Happy building!
