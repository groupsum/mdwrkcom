---
title: Local Setup
slug: getting-started/local-setup
section: Getting Started
sectionOrder: 1
order: 4
toc: true
date: 2026-05-02
status: published
author: CobyCloud
excerpt: This path is for maintainers, internal adopters, and self-hosting operators who want more control than the browser or PWA flows provide.
---

## What it covers

This path is for maintainers, internal adopters, and self-hosting operators who want more control than the browser or PWA flows provide.

## Workspace prerequisites

- Node.js `>=20 <23`
- npm `>=10`
- a local checkout of the relevant repository or repositories

## Basic local workflow

1. Clone the repository that owns the surface you want to work on.
2. Install workspace dependencies.
3. Start or build the surface you need.

```bash
git clone https://github.com/groupsum/mdwrk.git
cd mdwrk
npm install --ignore-scripts
```

## Common local commands

Run the client during development:

```bash
npm run dev:client
```

Run the client during development:

```bash
npm run dev:client
```

Build the client:

```bash
npm run build -w apps/client
```

Build the mdwrk.com site host from its own repo:

```bash
git clone https://github.com/groupsum/mdwrk-com.git
cd mdwrk-com
npm install --ignore-scripts
npm run build
```

## Self-hosting notes

The mdwrk.com site host is a static site build. Set `VITE_SITE_URL` at build time so `robots.txt` and `sitemap.xml` use the correct public origin.

```bash
VITE_SITE_URL=https://mdwrk.com npm run build
```

The public site host is intended to sit behind a reverse proxy. Its Docker Compose configuration should keep services internal-only rather than exposing ports directly.

## When to choose another path

Choose browser use or the PWA route when you just want to write.
Choose standalone modules when you want package reuse without running the whole repository workspace.

## Quick Reference

Use this article to understand Local Setup in the MdWrk Getting Started surface. Local Setup explains how this MdWrk surface works in the current client and package system.

Key concepts covered here:

- local Markdown files
- workspace organization
- extension host contracts
- developer package reuse

Useful follow-up pages:

- [Local-First Markdown Workspace](/features/local-first-markdown-workspace)
- [GitHub Sync](/docs/github-sync)
- [PWA Installation](/docs/getting-started/pwa-installation)

Use local setup when you want to run MdWrk from repository checkouts, create your own builds, or host the public surfaces yourself.
