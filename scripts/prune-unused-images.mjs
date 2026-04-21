#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, rmSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, '..');
const imagesRoot = path.join(docsRoot, 'images');

function toFileBase(base) {
  return base.replaceAll('/', '__');
}

function loadAuditReport() {
  const raw = execFileSync(
    process.execPath,
    ['scripts/audit-screenshot-coverage.mjs', '--json'],
    {
      cwd: docsRoot,
      encoding: 'utf8',
    },
  );
  return JSON.parse(raw);
}

function deleteUnusedImagePair(basePath) {
  const deleted = [];
  const flatBase = toFileBase(basePath);
  for (const mode of ['light', 'dark']) {
    const filePath = path.join(imagesRoot, `${flatBase}-${mode}.png`);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
      deleted.push(path.relative(docsRoot, filePath));
    }
  }
  return deleted;
}

function deleteStrayPngFiles(directory, deleted = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      deleteStrayPngFiles(fullPath, deleted);
      continue;
    }
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.png') {
      continue;
    }
    if (!entry.name.match(/-(light|dark)\.png$/)) {
      unlinkSync(fullPath);
      deleted.push(path.relative(docsRoot, fullPath));
    }
  }
  return deleted;
}

function removeEmptyDirectories(directory, { isRoot = false } = {}) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      removeEmptyDirectories(path.join(directory, entry.name));
    }
  }

  if (isRoot) {
    return;
  }

  if (readdirSync(directory).length === 0) {
    rmSync(directory, { recursive: true, force: true });
  }
}

const audit = loadAuditReport();
const unusedBases = audit.imageFilesUnusedInDocs ?? [];
const deletedFiles = [];

for (const basePath of unusedBases) {
  deletedFiles.push(...deleteUnusedImagePair(basePath));
}

deletedFiles.push(...deleteStrayPngFiles(imagesRoot));

removeEmptyDirectories(imagesRoot, { isRoot: true });

console.log(
  JSON.stringify(
    {
      deletedCount: deletedFiles.length,
      deletedFiles,
      unusedBasesPruned: unusedBases.length,
    },
    null,
    2,
  ),
);
