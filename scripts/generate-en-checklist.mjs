#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, '..');
const docsJsonPath = path.join(docsRoot, 'docs.json');
const auditDir = path.join(docsRoot, 'audit');
const checklistPath = path.join(auditDir, 'en-ui-sync-checklist.md');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function collectPages(items, pages = []) {
  for (const item of items ?? []) {
    if (typeof item === 'string') {
      pages.push(item);
      continue;
    }
    if (item && typeof item === 'object' && Array.isArray(item.pages)) {
      collectPages(item.pages, pages);
    }
  }
  return pages;
}

function sectionOf(route) {
  return route.includes('/') ? route.split('/')[0] : '(root)';
}

function buildChecklist() {
  const docs = readJson(docsJsonPath);
  const enLanguage = docs?.navigation?.languages?.find(
    lang => lang.language === 'en',
  );
  if (!enLanguage) {
    throw new Error('No English language configuration found in docs.json');
  }

  const routes = [];
  for (const tab of enLanguage.tabs ?? []) {
    for (const group of tab.groups ?? []) {
      collectPages(group.pages, routes);
    }
  }

  const uniqueRoutes = [...new Set(routes)];
  const grouped = new Map();

  for (const route of uniqueRoutes) {
    const section = sectionOf(route);
    if (!grouped.has(section)) grouped.set(section, []);
    grouped.get(section).push(route);
  }

  for (const [, list] of grouped.entries()) {
    list.sort((a, b) => a.localeCompare(b));
  }

  const lines = [];
  lines.push('# EN UI Sync Checklist');
  lines.push('');
  lines.push(
    `Generated: ${new Date().toISOString()} (total pages: ${uniqueRoutes.length})`,
  );
  lines.push('');
  lines.push('Use this checklist for manual page-by-page UI parity review.');
  lines.push('');
  lines.push('Review criteria per page:');
  lines.push('- [ ] Navigation path and tab names match current UI');
  lines.push('- [ ] Button/menu/action labels match current UI');
  lines.push('- [ ] Step-by-step flows match current UI behavior');
  lines.push('- [ ] Simple/Expert mode behavior is accurate (including badges)');
  lines.push('- [ ] Screenshots and alt text match current UI');
  lines.push('- [ ] Outbound links/anchors still resolve');
  lines.push('');

  const orderedSections = [...grouped.keys()].sort((a, b) =>
    a.localeCompare(b),
  );

  for (const section of orderedSections) {
    const pages = grouped.get(section) ?? [];
    lines.push(`## ${section} (${pages.length})`);
    lines.push('');
    for (const page of pages) {
      lines.push(`- [ ] \`${page}.mdx\``);
    }
    lines.push('');
  }

  fs.mkdirSync(auditDir, { recursive: true });
  fs.writeFileSync(checklistPath, `${lines.join('\n')}\n`);

  console.log(`Checklist written: ${path.relative(docsRoot, checklistPath)}`);
  console.log(`Pages listed: ${uniqueRoutes.length}`);
}

buildChecklist();
