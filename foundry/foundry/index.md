---
title: "The Foundry — the technology we've built"
description: "The libraries, standards, tools, languages, and products ManiarTech has built over the years — labelled honestly, most of it open to read and run. It's where our engineering discipline comes from."
sections:
  - name: "Products"
    anchor: "products"
    blurb: "Software a customer can run."
    view: "/products/"
    viewLabel: "All products"
    items:
      - name: "Processious"
        desc: "A process-automation and application platform, running a client's operations today."
        status: "In production"
        live: true
        tags: ["Product"]
        url: "/products/processious/"
      - name: "Ordin"
        desc: "YAML-defined workflows run durably, with an audit trail of what happened."
        status: "In development"
        tags: ["Product", "Source-available"]
        url: "/products/ordin/"
      - name: "Documentor.AI"
        desc: "Drafts from your own knowledge, so it cites your facts — not the internet's."
        status: "Early-stage"
        tags: ["Product"]
        url: "/products/documentor/"
      - name: "Enterprise DAM"
        desc: "Turns a shared drive into an asset system a team can run on."
        status: "Early-stage"
        tags: ["Product"]
        url: "/products/tallery-gallery/"
  - name: "Languages"
    anchor: "languages"
    blurb: "Two of them, built over the years."
    view: "/foundry/languages/"
    viewLabel: "The languages page"
    items:
      - name: "Indigo"
        desc: "A Go superset that compiles to clean, idiomatic Go you read in the diff."
        status: "Research"
        tags: ["Language"]
        url: "/foundry/indigo/"
      - name: "UExL"
        desc: "An embeddable expression engine with zero allocations on the hot path."
        status: "Publish-ready"
        tags: ["Language", "Open source"]
        url: "/foundry/uexl/"
  - name: "Standards"
    anchor: "standards"
    blurb: "Specifications we've authored — for data, time, APIs, and queries."
    view: "/standards/"
    viewLabel: "Standards hub"
    items:
      - name: "Internet Object"
        desc: "A compact, schema-first data format — smaller than JSON, runnable in a live playground."
        status: "Published"
        live: true
        tags: ["Standard", "Open source", "Playground"]
        url: "/foundry/internet-object/"
      - name: "NITES"
        desc: "One human-readable date/time format to replace the fragmented mess."
        status: "Research"
        tags: ["Standard"]
        url: "/standards/#nites"
      - name: "FUSE"
        desc: "A protocol that unifies REST, live queries, and push on one server."
        status: "Research"
        tags: ["Standard"]
        url: "/standards/#fuse"
      - name: "AddressQL"
        desc: "A URL-native, backend-neutral query language — SQL-like power in an address bar."
        status: "Research"
        tags: ["Standard"]
        url: "/standards/#addressql"
  - name: "Libraries & Frameworks"
    anchor: "libraries"
    blurb: "Code you import and build on."
    view: "/foundry/#libraries"
    viewLabel: "All libraries"
    items:
      - name: "signals"
        desc: "A context-aware, type-safe Go event/signals library, used in production."
        status: "Published"
        live: true
        tags: ["Library", "Open source"]
        url: "/foundry/signals/"
      - name: "gotime"
        desc: "Intuitive Go date/time with 100% test coverage — the reference impl of NITES."
        status: "Published"
        live: true
        tags: ["Library", "Open source"]
        url: "/foundry/gotime/"
      - name: "vault-storage"
        desc: "A ~1.5 KB TypeScript library that gives browser storage IndexedDB power."
        status: "Published"
        live: true
        tags: ["Library", "Open source"]
        url: "/foundry/vault-storage/"
      - name: "gocurl"
        desc: "Run a curl command directly as Go HTTP code."
        status: "Internal"
        tags: ["Library", "Open source"]
        url: "/foundry/gocurl/"
  - name: "Developer Tools"
    anchor: "tools"
    blurb: "Things you run to build and ship."
    view: "/foundry/#tools"
    viewLabel: "All tools"
    items:
      - name: "Taj Mahal SSG"
        desc: "The Go static-site generator that powers this very site and live client sites."
        status: "Internal"
        tags: ["Tool", "Open source"]
        url: "/foundry/tajmahal-ssg/"
      - name: "Booster"
        desc: "One config brings up a whole local stack; we run our own products on it."
        status: "Internal"
        tags: ["Tool"]
        url: "/products/booster/"
      - name: "gowork"
        desc: "Friendlier multi-module workspace management for Go."
        status: "Internal"
        tags: ["Tool"]
        url: "/foundry/gowork/"
---

Over the years we've built our own libraries, standards, tools, a couple of languages, and the
products we run on. It's a matter-of-fact part of the work here — patient, and mostly in the open.
None of it is something we make you adopt; but it's where our engineering discipline comes from, and
most of it you can read and run yourself.
