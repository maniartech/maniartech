---
title: "The calls that mattered"
---

## The calls that mattered

**Streamline, don't port.** The safe-looking move was a form-for-form migration of the Access system into .NET. We argued for the opposite: rebuild the interface around the sample's journey, collapsing 600+ forms and reports into one workflow screen and one report. The trade-off was real - staff had to learn a new screen, and every workflow had to be rethought rather than copied. But porting the sprawl would have modernized the technology while preserving the problem.

**Keep the lab's domain model, replace the tool.** The Access system was built by the lab's own people and encoded years of domain knowledge. We treated it as the specification, not the enemy - working with the team that built it rather than around them. That is why the rebuild fit the lab's actual practice instead of an outsider's idea of it.

**A dark UI, in 2011.** Against the convention of the day, we shipped the application dark, because analysts sit in front of it for long hours and a dark screen is easier on the eyes across a shift. It looked unusual then; it reads as obvious now.

**Reporting on XPS.** For the reports and label printing we built on XPS, the document technology already inside .NET, rather than bolting on a third-party reporting suite. One less external dependency to license and maintain, and it proved capable of genuinely high-quality output.
