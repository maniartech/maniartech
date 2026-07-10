# Inbox Dossier — AddressQL (URL-native query language)

> Collection doc (not a page yet). Source: local repo E:\Projects\iql_go (README,
> docs/specs/* incl. v1 + portability specs, "Mastering AddressQL" book, go.mod). Status:
> **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — **Research + open standard** (multi-language).
Plan per Aamir: **publish the research/spec, then the Go lib later.** **Internal so far.**
**One-liner:** AddressQL is a **URL-native, backend-neutral query language** — express filtering,
projection, sorting, and pagination intent in a single readable, cacheable, portable query
string. SQL-like power you can paste into a browser address bar. "It just works."

**🔑 This is ManiarTech's FIFTH authored standard:** Internet Object (data), NITES
(date/time), UExL (expressions), FUSE (realtime API protocol), **AddressQL (query language)**.
Multi-language by design (Go/JS/Rust portability specs already written).

---

## 1. Identity

| Field | Value |
|---|---|
| Name | AddressQL — URL-native query language |
| Type | Query-language **standard** + Go **reference implementation** (lexer/parser/AST + adaptors) |
| Import | `github.com/maniartech/iql` |
| Author | ManiarTech® |
| Go | 1.18+ |
| Adaptors | **MongoDB** (complete: filter/projection/sort/pipeline/$lookup), **SQL** (in repo), pluggable contract for any backend |
| Deps | testify (test); mongo-driver only if you import the mongo adaptor (clean) |
| License | TBC (LICENSE in repo — confirm) |
| Status | **Internal**, used in production internally; spec is v1; Go lib pre-public |

## 2. The problem it solves (real, daily, relatable)

How clients query REST APIs is a mess: flat `?status=open&minPrice=10` (brittle,
non-composable), JSON-body-on-GET (kills HTTP/CDN caching), GraphQL (whole separate
transport + schema + resolver + client stack), OData/FIQL/RSQL (heavy specs, ugly encoding,
weak types). **AddressQL's question:** *the minimum viable query language that's readable in a URL,
cacheable by any HTTP infra, backend-neutral, and still production-expressive?*
**Used internally to send SQL-like queries from the browser — and it "just works."**

## 3. The design (what makes it good)

- **URL-native parenthesized prefix syntax**, no precedence ambiguity:
  `query=and(eq(status,open),has(author,eq(country,us)))`.
- **Five independent, individually-optional params:** `query` (filter), `select`
  (projection/aliases/computed), `sort`, `limit`, `offset`. Concerns strictly separated.
- **Backend-neutral wire format** → same query string runs on MongoDB today, SQL tomorrow.
- **First-class typed literals** (no silent string coercion): `d()` date, `dt()` datetime,
  `t()` time, `decimal()`, `uuid()`, `obj()`, lists, `str()` for free text.
- **Deterministic canonical form** → identical intent = identical URL = identical **cache
  key** (CDN caching + URL signing work without client normalization).
- **Rich operators:** boolean and/or/not; eq/ne/lt/le/gt/ge; in/nin; contains/sw/ew;
  isNull; range/xrange; **relation predicates `has(...)`** (recursively composable);
  **aggregate predicates** `gt(count(comments),10)`. Select supports nested relations
  (unlimited depth), aliases, computed fields (count/sum/avg/min/max/coalesce/concat/…).
- **Extensible-but-not-permissive operator registry** (thread-safe): adaptors decide valid
  operators; unknown ops → structured error, never silently ignored.
- **Safe by default:** all input lexed/parsed before any adaptor; mongo adaptor
  `regexp.QuoteMeta`s text; no raw string interpolation (injection-resistant).

## 4. Honest non-goals (the trust-building rigor again)

Explicitly NOT: mutations (read-only language), auth/authz (server injects scope),
non-deterministic exprs (`now`/`today`/`random` — would break caches; excluded from v1),
schema introspection, streaming/subscriptions. Same intellectually-honest "here's what we
don't do" discipline as FuseAPI — feature it, don't sand it.

## 5. Multi-language / standard ambition (key)

`docs/specs/` is a **normative spec** (query-v1, select-v1, values-and-normalization,
adaptors-v1) PLUS **portability specs for Go, JavaScript, and Rust** already written. So
AddressQL is designed from day one as a cross-language standard — JS in the browser/edge, Go/Rust
on the server, all speaking the same query string. Plus a full **"Mastering AddressQL" book**
(~25 chapters across 7 sections) — serious documentation depth.

## 6. Comparison framing (ready content)

README has honest comparison tables vs custom params, GraphQL, OData, FIQL/RSQL, JSON-POST.
AddressQL's niche: **RESTful, HTTP-GET-cacheable, multi-backend, no special client tooling, paste-
able into curl/browser/SDK alike.** Concedes where GraphQL wins (mutations/subscriptions/
self-describing schema). Keep the honesty.

## 7. Error model / quality

Structured `errs.IQLError` (machine code + detail map); taxonomy (`parse/syntax`,
`operator/unknown`, `operator/arity`, `pagination/*`, `relation/unknown`, …) → clean
HTTP status mapping. Coverage profiles in repo (adaptors/mongo/overall). Same
disciplined-docs + structured-diagnostics pattern as the other ManiarTech standards.

## 8. Strategic significance

- **Fifth standard** → the "ManiarTech authors standards" thesis is now overwhelming
  (5 standards + Indigo the language). Strongly reinforces a dedicated **Research /
  Standards hub** page.
- **Enterprise-architect-facing** like FUSE (API query design is a real backend concern) →
  bridges Labs credibility to target clients.
- Pairs naturally with **FUSE** (both are API-layer standards) and with the data story
  (**Internet Object**) — a coherent "modern API stack, authored by us" narrative.
- SEO: "url query language", "rest api filtering standard", "graphql alternative rest",
  "odata alternative", "cacheable api query", "backend neutral query language".

## 9. Site placement

Labs **research/standard** entry; **publish research/spec now, Go lib later** (Aamir).
Present as research + internal-proven ("powers our own browser→API querying in production").
Demoable: a query-string → MongoDB-BSON translation, or a tiny live builder. No repo/install
links until the lib is public. Strong candidate for the Standards hub alongside IO/NITES/
UExL/FUSE.

## 10. Open questions for Aamir

- [ ] **Status/timing:** publish the spec first (when?), Go lib later (when?). Confirm
      "internal, production-proven" is OK to state.
- [ ] **License** (repo LICENSE — confirm; MIT? other?).
- [ ] Which adaptors to mention publicly now (MongoDB done; SQL in-progress; Elasticsearch
      planned per implementation-plan)?
- [ ] OK to say it's **used internally in production** ("browser→API SQL-like queries")?
- [ ] Feature on the **Research/Standards hub** with the other 4 standards? (Recommended.)
- [ ] Multi-language plan beyond Go (JS/Rust portability specs exist) — publish those too?
- [x] Name: renamed **IQL → AddressQL** (2026-07). Collision check found "IQL"/"Internet Query Language" taken (markkurossi/iql et al., + UNQL/UQL/USQL/WebQL/PathQuery); "AddressQL" verified clean and fits the `<Word>QL` (GraphQL) pattern. Rationale in `_ia/FOUNDRY-IA.md`. Repo/book/import ids still say `iql` until Aamir renames them.
