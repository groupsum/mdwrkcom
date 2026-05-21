# @mdwrk/mdwrkcom-content-pack

MdWrk public-site content distribution.

This package distributes the mdwrk.com source content tree, markdown data, public assets, and generated discovery artifacts.

## Why

Use it when you need the content itself as a package boundary rather than consuming the mdwrk.com deploy host repository structure directly.

## What

- Source content and markdown data roots.
- Sitemap definition path and generated discovery outputs.
- Path helpers for consumers that need stable package-relative access.

## Installation

Node.js 20.x through 22.x, matching the root workspace engine contract.

```bash
npm install @mdwrk/mdwrkcom-content-pack
```

## Usage

```ts
import { mdwrkcomContentPack, resolveMdwrkcomContentPackPath } from "@mdwrk/mdwrkcom-content-pack";

console.log(mdwrkcomContentPack.generatedArtifacts);
console.log(resolveMdwrkcomContentPackPath(mdwrkcomContentPack.sitemapPath));
```

## Related

- [Root README](../../../README.md)
