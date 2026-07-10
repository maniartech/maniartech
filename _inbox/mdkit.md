# Inbox Dossier — MDKit

> Collection doc (not a page yet). Source: local repo E:\Projects\MDKit\mdkit
> (README, package.json, packages/, IP-CONFIDENTIAL.md). Status: **collected** — open Qs below.

## ⚠️ CONFIDENTIALITY / STATUS
- **INTERNAL now; open-source LATER.** Aamir: "keep internal for some time (to build
  confidence), then open source." Carries the ManiarTech **IP-CONFIDENTIAL** notice
  (project: "MarkdownKit - Markdown Processor").
- ⚠️ **License discrepancy to resolve:** the README footer says **"MIT License"** and
  shows a public `git clone github.com/maniartech/mdkit`, but the repo also has
  IP-CONFIDENTIAL (proprietary). The MIT/clone text reflects the *eventual* open intent;
  it is NOT public yet. **Until public: no repo/npm links on the live site.**
- **Used across internal ManiarTech projects** (real dogfooding — see §5).

**Classification:** ManiarTech® **Labs** (eventual OSS toolkit), internal for now.
**One-liner:** A comprehensive, modular **Markdown toolkit** — build, generate
(HTML/PDF/Word), extend syntax, and run AI utilities over Markdown. The tooling layer
behind ManiarTech's "AI + Markdown" workflow.

**Strategic hook (Aamir's framing):** **AI works excellently with Markdown** — it's the
lingua franca between humans and LLMs. MDKit is the ecosystem that lets you *work with
Markdown at scale*: assemble it, transform it, publish it, and apply AI to it. Ties
directly to **Documentor AI** and the **AI Engineering** service.

---

## 1. Identity

| Field | Value |
|---|---|
| Name | MDKit (a.k.a. MarkdownKit) |
| Type | Modular Markdown toolkit — **monorepo** (Bun workspaces) |
| Lang/Runtime | TypeScript; **Bun** (recommended) + **Node.js**, **Deno** (roadmap) |
| CLI | `@mdkit/cli` (commands: build, generate, serve, init; aliases mdkit / mdkit-cli / maniar-mdkit) |
| Author | ManiarTech® |
| License | **MIT (intended on release)** — currently internal/confidential ⚠️ |
| Version | 0.1.0 (early) |
| Repo (future) | github.com/maniartech/mdkit |

## 2. Packages (the ecosystem)

- **builder** — concatenates many Markdown files into one with ordering rules (recursive
  traversal, `index.md` first, **numeric-prefix ordering** `1-intro.md`, ignore rules).
- **generator** — Markdown → **HTML, PDF (Paged.js print layouts), Word/DOCX (Mammoth.js)**;
  configurable CSS, multi-output from one source.
- **preprocessor** — custom Markdown syntax via **unified/remark/rehype** plugins
  (footnotes, callouts, highlight, custom node transforms; potential MDX).
- **utils** — **AI utilities** (summarize, translate, code-explain via OpenAI/Python
  microservice) + **Mermaid → PNG/SVG** + code highlighting.
- **cli** — orchestrates builder→preprocessor→generator; plugin architecture; live-reload
  dev server; conflict detection.
- **web-ui** (optional) — **Next.js** app: drag-drop Markdown, live HTML/PDF preview, AI
  features via UI.
- **config** — shared config package.

## 3. Tech stack (credible, modern)

remark.js (parse) · remark-rehype + rehype-stringify (HTML) · Paged.js (printable
HTML/PDF) · Mammoth.js (DOCX) · mermaid-cli (diagrams) · Commander.js + Chalk (CLI) ·
OpenAI API / Python microservice (AI) · Bun workspaces (monorepo).

## 4. Why it matters (positioning)

- **The "AI + Markdown" thesis is timely and true.** LLMs read/write Markdown natively;
  teams increasingly author docs, specs, and content in Markdown. MDKit is the
  industrial toolkit for that world — assemble → extend → publish (HTML/PDF/DOCX) →
  AI-process. A real workflow, not a toy converter.
- **Plugin/monorepo architecture** signals it's built as a platform, not a script.
- Relates to **Documentor AI** (AI doc generation) and **Taj Mahal SSG** (both are
  Markdown-centric) — a coherent "Markdown is our content substrate" story.

## 5. Dogfooding insight (nice connective tissue)

MDKit's **builder** (numeric-prefix ordering, `index.md`-first, concat into one doc) is
exactly the pattern behind ManiarTech's own **spec "books"** — Internet Object, UExL,
FuseAPI, NITES all ship long-form docs as ordered Markdown trees. So MDKit is plausibly
the tooling that *produces* the company's own specs/books (and the test.md.pdf in-repo
suggests PDF spec output — e.g. the NITES PDF). Confirm, but if true it's a strong
"we build the tools we run on" point.

## 6. SEO / audience

Devs/teams doing docs-as-code, technical writers, AI-content workflows. SEO: "markdown
to pdf", "markdown to word", "markdown toolkit", "concatenate markdown files", "remark
plugins", "markdown ai summarize", "docs as code toolkit", "mermaid to image".

## 7. Site placement (decide at `_ia` phase)

Internal now → teaser later → full Labs page on open-sourcing. Frame under the **AI +
Markdown** narrative; pair with Documentor AI and AI services. NO repo/npm links until
public. The web-ui + PDF/DOCX output are demoable when ready.

## 8. Open questions for Aamir

- [ ] **License/status:** confirm MIT-on-release; when does it go public? (README already
      says MIT + public clone — reconcile with IP-CONFIDENTIAL.)
- [ ] Is MDKit the engine behind your **specs/books** (IO/UExL/FuseAPI/NITES PDFs)? OK to
      say "we build our own documentation with it"?
- [ ] Relationship to **Documentor AI** — separate products, or MDKit = the OSS toolkit
      and Documentor AI = the product on top? (Important for Labs vs Products framing.)
- [ ] Which AI backends to mention publicly (OpenAI? own microservice? Claude)? (Note:
      for AI features, ManiarTech should prefer latest Claude models per house guidance.)
- [ ] Lead the page on the **AI + Markdown** angle, or the doc-generation (PDF/DOCX) angle?
