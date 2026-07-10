# If a session corrupts — how to recover (read this first)

> Written after the 2026-06-28 recovery so this is never a panic again. Aamir's standing
> wish: **if the chat breaks, nothing important should be lost.** This is how we keep that true.

## The two durable layers (neither depends on the chat window)
1. **`_inbox/` = the knowledge base / source of truth.** Decisions, facts, reasoning, and the
   recovered material live here as plain `.md` files on disk. Start any new/recovered session by
   reading **`_inbox/PROJECT-CANON.md`** (the consolidated catch-up doc), then
   `PROJECT-STATUS-AND-INPUTS.md` and `REVIEW-FINDINGS-AND-LAUNCH-BLOCKERS.md`.
2. **Raw chat transcripts = the backup behind it.** Claude Code auto-writes every session to
   `C:\Users\aamir\.claude\projects\E--Projects-maniartech-com-maniartech-v2\<sessionId>.jsonl`
   as the conversation happens. Even something we never wrote down by hand is recoverable here.

## Recovery procedure (what worked, repeatable)
1. **List the transcripts:** look in the path above for `*.jsonl` (newest = most recent
   sessions). The big files (~30 MB) are full chats; tiny ones are short/fresh sessions.
   (Session titles/ids are also listable via the session-management tools.)
2. **Strip to just the conversation** (the 30 MB is mostly tool output): a small Node script
   parses each line as JSON and keeps only `type:"user"`/`"assistant"` **text** blocks (skip
   tool_result blocks and `<system-reminder>`). This shrinks ~30 MB → ~600 KB of real talk.
3. **Distill in chunks:** split the clean text at turn boundaries and have a few parallel
   sub-agents each summarize a chunk into *decisions / what Aamir shared / how Claude
   responded*; reconcile into/against `PROJECT-CANON.md` (keep FINAL states where decisions
   evolved).
4. **Recover images/PDFs separately** (text extraction drops them): the same script pulls
   `type:"image"` blocks (base64) and writes them to `reference-images/`. Label by the nearest
   preceding user text. Flag sensitivity (see `reference-images/README.md`).

## The real guarantee = the as-we-go discipline (not luck)
- **Write decisions to `_inbox/` the moment they're made** — that's why the last recovery was
  ~90% painless. The transcript is the safety net; the `_inbox/` docs are the plan.
- Keep `PROJECT-CANON.md` current: if a newer decision supersedes it, update it (newer wins).
- The `.jsonl` transcripts are the ultimate backup — **don't clear the `.claude/projects`
  folder** for this project, or that backup layer is gone (the `_inbox/` docs still stand).

*Last full recovery: 2026-06-28 (origin session f1c912b8). See PROJECT-CANON.md for the result.*
