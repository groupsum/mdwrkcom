import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MDWRKCOM_CONTENT_PACK_NAME,
  mdwrkcomContentPack,
  mdwrkcomLanderRenderingIntent,
  resolveMdwrkcomContentPackPath,
  resolveMdwrkcomContentPackUrl,
} from '../dist/index.js';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const hashFile = (filePath) => crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');

const collectFiles = (root, ignored = new Set(), baseRoot = root) => {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(root, entry.name);
    const relativePath = path.relative(baseRoot, entryPath).replace(/\\/g, '/');
    if (ignored.has(relativePath) || ignored.has(entry.name)) return [];
    if (entry.isDirectory()) return collectFiles(entryPath, ignored, baseRoot);
    if (entry.name === 'AGENTS.md') return [];
    return [entryPath];
  });
};

assert.equal(MDWRKCOM_CONTENT_PACK_NAME, '@mdwrk/mdwrkcom-content-pack');
assert.equal(mdwrkcomContentPack.sitemapPath, 'data/content-sitemap.yaml');
assert.equal(mdwrkcomLanderRenderingIntent.compilerPackage, '@mdwrk/lander-core');
assert.equal(mdwrkcomLanderRenderingIntent.rendererPackage, '@mdwrk/lander-react');
assert.ok(mdwrkcomLanderRenderingIntent.componentIntents.some((intent) => intent.kind === 'page_shell'));
assert.ok(mdwrkcomLanderRenderingIntent.componentIntents.some((intent) => intent.kind === 'structured_data_graph'));
assert.deepEqual(
  mdwrkcomLanderRenderingIntent.schemaIntents.map((intent) => intent.kind).sort(),
  ['FAQPage', 'ItemList', 'SoftwareApplication', 'SoftwareSourceCode', 'TechArticle', 'WebSite'],
);
assert.ok(resolveMdwrkcomContentPackPath('data/content-sitemap.yaml').endsWith('/data/content-sitemap.yaml'));
assert.equal(resolveMdwrkcomContentPackUrl('content/pages/index.md').protocol, 'file:');
assert.ok(resolveMdwrkcomContentPackUrl('content/pages/index.md').pathname.endsWith('/content/pages/index.md'));

for (const artifact of mdwrkcomContentPack.generatedArtifacts) {
  const packaged = path.join(packageRoot, 'generated', artifact);
  assert.ok(fs.existsSync(packaged), `${artifact} must exist in generated output`);
  assert.ok(hashFile(packaged).length > 0, `${artifact} must be readable`);
}

for (const rootName of ['content', 'data', 'public']) {
  const files = collectFiles(path.join(packageRoot, rootName));
  assert.ok(files.length > 0, `${rootName} must contain packaged files`);
}
