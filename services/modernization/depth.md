---
heading: "The depth behind a Go migration"
---

Most shops that offer a move to Go use Go. We have spent years building for it, in the open.

- [signals](/foundry/signals/), our open-source Go event library, is public on GitHub for anyone to read and run.
- Alongside it we have authored Go developer tooling and utility libraries in-house - the workflow, orchestration, and command-line tooling we built to make our own Go work faster.
- We also develop Indigo, a pre-1.0 research language exploring a Go superset that compiles to clean, idiomatic Go on the principle that no output is better than wrong output. It is in active development, and we mention it only as evidence of how deeply we work in Go - never as something we put into your migration. By design it produces plain Go that runs on the standard toolchain, with no runtime and no lock-in.

We do not ask you to adopt any of it. Your system is migrated onto mainstream Go any team can maintain. It is simply why the hard parts of a Go migration are within range for us - we have built inside the ecosystem you are moving to.
