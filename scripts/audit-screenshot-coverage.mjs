#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, '..');
const imagesRoot = path.join(docsRoot, 'images');

function toLogicalBase(base) {
  return base.replaceAll('__', '/');
}

const rawArgs = process.argv.slice(2);
const outputJson = rawArgs.includes('--json');

function walk(dir, matcher, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, matcher, results);
      continue;
    }
    if (matcher(full)) {
      results.push(full);
    }
  }
  return results;
}

function collectDocsImageRefs() {
  const mdxFiles = walk(docsRoot, file => file.endsWith('.mdx'));
  const refs = new Map();

  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/\/images\/([^"\s]+?)-(light|dark)\.png/g)) {
      const base = toLogicalBase(match[1]);
      const current = refs.get(base) ?? new Set();
      current.add(match[2]);
      refs.set(base, current);
    }
  }

  return refs;
}

function collectImageFiles() {
  const pngFiles = walk(imagesRoot, file => file.endsWith('.png'));
  const files = new Map();

  for (const file of pngFiles) {
    const rel = path.relative(imagesRoot, file).replace(/\\/g, '/');
    const match = rel.match(/^(.*)-(light|dark)\.png$/);
    if (!match) {
      continue;
    }
    const [, flatBase, mode] = match;
    const base = toLogicalBase(flatBase);
    const current = files.get(base) ?? new Set();
    current.add(mode);
    files.set(base, current);
  }

  return files;
}

function collectScriptRefs(knownRefs) {
  const refs = new Set();
  const simpleScript = fs.readFileSync(
    path.join(scriptDir, 'take-screenshots.mjs'),
    'utf8',
  );
  const interactiveScript = fs.readFileSync(
    path.join(scriptDir, 'take-interactive-screenshots.mjs'),
    'utf8',
  );
  const onboardingScript = fs.readFileSync(
    path.join(scriptDir, 'take-onboarding-screenshots.mjs'),
    'utf8',
  );

  for (const text of [simpleScript, interactiveScript, onboardingScript]) {
    for (const match of text.matchAll(/['"]([A-Za-z0-9/_-]+)['"]/g)) {
      const value = match[1];
      if (knownRefs.has(value)) {
        refs.add(value);
      }
    }
  }

  return refs;
}

function sorted(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

const docRefs = collectDocsImageRefs();
const imageFiles = collectImageFiles();
const docRefNames = new Set(docRefs.keys());
const imageNames = new Set(imageFiles.keys());
const knownRefs = new Set([...docRefNames, ...imageNames]);
const scriptRefs = collectScriptRefs(knownRefs);

const refsMissingFiles = sorted(
  [...docRefNames].filter(base => !imageNames.has(base)),
);
const refsMissingLight = sorted(
  [...docRefs.entries()]
    .filter(([, modes]) => !modes.has('light'))
    .map(([base]) => base),
);
const refsMissingDark = sorted(
  [...docRefs.entries()]
    .filter(([, modes]) => !modes.has('dark'))
    .map(([base]) => base),
);
const filePairsMissingLight = sorted(
  [...imageFiles.entries()]
    .filter(([, modes]) => !modes.has('light'))
    .map(([base]) => base),
);
const filePairsMissingDark = sorted(
  [...imageFiles.entries()]
    .filter(([, modes]) => !modes.has('dark'))
    .map(([base]) => base),
);
const docsNotCoveredByScripts = sorted(
  [...docRefNames].filter(base => !scriptRefs.has(base)),
);
const docsCoveredByScripts = docRefNames.size - docsNotCoveredByScripts.length;
const scriptOutputsUnusedInDocs = sorted(
  [...scriptRefs].filter(base => !docRefNames.has(base)),
);
const imageFilesUnusedInDocs = sorted(
  [...imageNames].filter(base => !docRefNames.has(base)),
);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    docsReferencedImages: docRefNames.size,
    docsCoveredByScripts,
    imageFileBases: imageNames.size,
    scriptManagedImages: scriptRefs.size,
    refsMissingFiles: refsMissingFiles.length,
    docsNotCoveredByScripts: docsNotCoveredByScripts.length,
    imageFilesUnusedInDocs: imageFilesUnusedInDocs.length,
  },
  refsMissingFiles,
  refsMissingLight,
  refsMissingDark,
  filePairsMissingLight,
  filePairsMissingDark,
  docsNotCoveredByScripts,
  scriptOutputsUnusedInDocs,
  imageFilesUnusedInDocs,
};

if (outputJson) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

console.log('Screenshot Coverage Audit');
console.log('');
console.log(`Docs-referenced image bases: ${report.summary.docsReferencedImages}`);
console.log(`Docs refs covered by scripts: ${report.summary.docsCoveredByScripts}`);
console.log(`Image file bases on disk: ${report.summary.imageFileBases}`);
console.log(`Script-managed image bases: ${report.summary.scriptManagedImages}`);
console.log('');
console.log(`Refs missing files: ${report.summary.refsMissingFiles}`);
console.log(
  `Docs refs not covered by scripts: ${report.summary.docsNotCoveredByScripts}`,
);
console.log(
  `Image files unused in docs: ${report.summary.imageFilesUnusedInDocs}`,
);

function printSection(title, items) {
  if (!items.length) {
    return;
  }
  console.log(`\n${title}`);
  for (const item of items) {
    console.log(`- ${item}`);
  }
}

printSection('Docs refs missing image files', refsMissingFiles);
printSection('Docs refs not covered by screenshot scripts', docsNotCoveredByScripts);
printSection('Image files unused in docs', imageFilesUnusedInDocs);
