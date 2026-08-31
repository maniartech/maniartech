# Assumptions log - Document Leak Check
Every assumption made on Aamir's behalf. Veto any of these and the plan updates.

| # | Assumption | Basis | Confidence | Impact if wrong |
|---|---|---|---|---|
| A1 | Audience is a **technical founder** (Aamir), building with a small senior team | Session context; `_marketing/free-tools-program.md` | High | Interview posture only |
| A2 | Stack is **TypeScript**, static output, no server | Hard constraint stated by Aamir; shop is Go/TS | High | Rewrite of architecture stage |
| A3 | **No AI/ML component in v1.** PII detection is deterministic pattern-matching | KISS; model weights would be a multi-MB download and an accuracy claim we would have to defend | Med | See open question Q2 |
| A4 | Dev philosophy: **KISS / DRY / YAGNI, no over-engineering, idiomatic, robust, changeable** | Aamir's global CLAUDE.md states exactly this | High | None - confirmed by canon |
| A5 | Success = **reputation and reach**, not signups or revenue. No conversion funnel in the product | `_marketing/free-tools-program.md` | High | Would add analytics + CTA requirements, breaking the no-telemetry constraint |
| A6 | The tool must survive **three years of zero maintenance** | Aamir's stated constraint | High | Rules out most dependency-heavy designs |
| A7 | Primary geography is **India + international English**, single language at launch | LION network composition; DPDP timing | Med | i18n requirement |

## Vetoed / superseded
_(none yet)_
