# Inbox Dossier — FuseAPI / FUSE Protocol

> Collection doc (not a page yet). Source: local specs
> E:\Projects\fuseapi\fuseapi-dev\specs (README, vision/overview, vision/why-fuse,
> full protocol+guide+roadmap set). Status: **collected** — open Qs at bottom.

**Classification:** ManiarTech® **Labs** — **Research + open standard.** Plan per Aamir:
**publish the research/spec now; build the framework later when time permits.**
**Status:** **pre-1.0, design phase** — wire protocol NOT yet frozen; PoC first.

**Naming (keep straight):** **FUSE** (Fast Unified Server Exchange) = the *protocol*
(the spec). **FuseAPI** = the *brand* + *Go reference implementation* (repo:
github.com/maniartech/fuseapi). "FuseAPI implements the FUSE protocol."

**One-liner:** An open protocol that unifies **REST + realtime push + reactive (live)
queries** on one server, one route table, one handler — no message broker, no second
tech stack. Your REST handlers are **live by default**.

---

## 1. Identity

| Field | Value |
|---|---|
| Protocol | **FUSE** — Fast Unified Server Exchange |
| Implementation | **FuseAPI** — Go reference server library |
| Author | Mohamed Aamir Maniar, **ManiarTech® Lab** · © 2025–2026 |
| Repo | github.com/maniartech/fuseapi |
| **Status** | **pre-1.0, DESIGN PHASE**; protocol not frozen; PoC pending |
| Spec license | **CC-BY-ND-4.0** (share/implement freely w/ attribution; no modified
  spec forks → single canonical FUSE. Implementing it in software is NOT a derivative.) |
| Impl license | **Apache-2.0** |
| Trademark | "FUSE™" common-law mark (unregistered); ManiarTech® |
| Academic | Has CITATION.cff — treated as citable research |
| Deps (impl goal) | Go stdlib + http2 + the app's own DB only (dependency-light) |

## 2. Positioning / brand (the copy is already excellent — reuse it)

- **Primary tagline:** "**Don't just REST.** — The reactive API framework; your handlers
  are live by default." *(Subverts "REST" = the paradigm AND "sit still." Ownable,
  unforgettable, no competitor can copy it without echoing FuseAPI. Strong.)*
- **Reserve hero line:** "**Your REST API is already real-time. It just doesn't know it
  yet.**" (scroll-stopper for a landing page.)
- Supporting: "The realtime you didn't write." / "One handler. Live by default." /
  "Why REST when your data is alive?"
- One-line positioning: "FuseAPI makes any database-backed API live, realtime, and
  reactive — on the same routes and same server that serve your REST — with no message
  broker and no second tech stack."

## 3. The idea (three pillars)

1. **Unified interface** — one `HandlerFunc(ctx, *Request) (*Response, error)` on
   `method`+`path` serves a normal REST call AND a live message. HTTP semantics
   preserved → OpenAPI/Postman/proxies/CDNs still work.
2. **Connection = best-effort cache, not infra** — realtime via **HTTP (up) + SSE
   (down)**, primitives already in every browser/proxy/CDN. **No WebSocket fleet, no
   broker.** Ephemeral, short-TTL, scale-to-zero; when the connection drops the client
   just **re-asks** — correctness never depends on the connection.
3. **Reactive by default** — a read handler with `live:true` stays live: FuseAPI
   **captures what data the handler read, watches for changes, and re-pushes the new
   result automatically** — **zero developer-written pub/sub or cache invalidation.**
   *This is the differentiator and the make-or-break ("read-set capture").*

## 4. The problem it removes

Today's live app = REST framework + WebSocket server + message broker + hand-written
cache-invalidation + client cache/reconnect/sync. FuseAPI's thesis: most of that exists
only because realtime was bolted *beside* the API instead of being a property *of* it.
FuseAPI collapses the realtime stack into one dependency-light server.

## 5. INTELLECTUAL HONESTY = brand asset (this is the standout quality)

The specs are a masterclass in honest positioning — worth showcasing *as* the brand:
- **Explicit non-goals:** NOT for durable delivery / exactly-once (best-effort by
  design), NOT gRPC (binary RPC/codegen), NOT Kafka/NATS (durable streams/fan-out),
  NOT multi-node guaranteed fan-out, NOT HFT/game netcode. "A framework that claims
  'best for everything' invites rejection."
- **Honest comparison table** vs gRPC/ConnectRPC, SignalR/Socket.IO, Mercure,
  Convex/sync engines — names competitors, concedes where they win. FuseAPI's two
  defining cells: **automatic reactive live queries + auto invalidation, as a library
  over YOUR database** (not a platform like Convex).
- **States its own risks:** reactive core is hard; the framing is copyable (moat =
  execution/correctness/DX); scope discipline must hold.
→ This "honest research" voice is the SAME thread as signals/gotime. It's a differentiator
in a category full of overclaiming. Feature the honesty, don't sand it off.

## 6. Standardization strategy

Intended as an **open, multi-language standard** (like IO/NITES/UExL): protocol/ docs
become RFC-style normative (MUST/SHOULD/MAY) at Phase 1, AFTER the reactive PoC informs
them. Precedent acknowledged (Meteor's DDP) with stated differences. PoC first:
prove automatic read-set reactivity over stock **Postgres**, gated on a **"no-stale
invariant"** harness, before freezing protocol or adding languages.

## 7. STRATEGIC SIGNIFICANCE — the FOURTH authored standard

ManiarTech standards now: **Internet Object** (data), **NITES** (date/time), **UExL**
(expressions), **FUSE** (API/realtime protocol). Four original protocols/standards from
one lab. This is overwhelming proof of "we make technology, not just use it." FUSE is the
most *enterprise-architect-facing* of them (REST/realtime/reactive is a CTO-level concern),
so it bridges Labs credibility → the kind of client ManiarTech wants.

## 8. SEO / audience

Audience: backend engineers/architects building realtime web/app APIs. SEO: "realtime
REST API", "reactive API framework", "live queries without websockets", "SSE realtime
Go", "Convex alternative self-hosted", "automatic cache invalidation API", "Meteor DDP
modern". Niche but high-intent and ownable ("FUSE protocol", "Don't just REST").

## 9. Site placement (decide at `_ia` phase)

Labs **research** entry now (publish-the-research stage; framework later). Page shape:
hero ("Don't just REST" / reserve line) → the problem (the 5-system realtime stack) →
three pillars → honest comparison table + explicit non-goals (the honesty IS the pitch)
→ status (design-phase research, PoC-first, standard-in-progress) → read the spec /
cite it / watch the repo. NO "go build with it" CTA yet (no shipping impl). Invite
implementers/reviewers — suits an open standard seeking adoption.

## 10. Open questions for Aamir

- [ ] Publish venue for the research — docs site (fuse.dev / fuseapi.dev?), PDF, the repo
      specs/ as-is? Any plan to post it (blog/HN/arXiv-style)?
- [ ] OK to feature the **honest comparison table** (names gRPC, Socket.IO, Convex, etc.)?
- [ ] Framework ETA is "later when time permits" — present purely as research/spec for
      now, with a "reference implementation in progress" note? (Recommended.)
- [ ] Confirm canonical name/brand + domain (FUSE protocol vs FuseAPI implementation split).
- [ ] Want a "call for implementers/reviewers" CTA to seed the standard?
- [ ] Present all 4 standards together on a dedicated "ManiarTech Standards/Research" page?
