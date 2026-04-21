#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, '..');
const docsJsonPath = path.join(docsRoot, 'docs.json');
const rulesPath = path.join(scriptDir, 'audit-rules.en.json');
const auditDir = path.join(docsRoot, 'audit');

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const writeReport = args.has('--write');
const strictStale = args.has('--strict-stale');
const outputJsonOnly = args.has('--json');

function readArgValue(flag) {
  const direct = rawArgs.find(arg => arg.startsWith(`${flag}=`));
  if (direct) {
    return direct.slice(flag.length + 1).trim() || null;
  }
  const idx = rawArgs.indexOf(flag);
  if (idx >= 0 && idx + 1 < rawArgs.length) {
    const value = rawArgs[idx + 1];
    if (!value.startsWith('--')) {
      return value.trim() || null;
    }
  }
  return null;
}

const sectionFilterRaw = readArgValue('--section');
const sectionFilter = sectionFilterRaw ? sectionFilterRaw.toLowerCase() : null;

function sanitizeForFileName(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getReportPaths(section) {
  if (!section) {
    return {
      jsonPath: path.join(auditDir, 'en-docs-report.json'),
      mdPath: path.join(auditDir, 'en-docs-report.md'),
    };
  }
  const suffix = sanitizeForFileName(section);
  return {
    jsonPath: path.join(auditDir, `en-docs-report.${suffix}.json`),
    mdPath: path.join(auditDir, `en-docs-report.${suffix}.md`),
  };
}

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

function routeToFile(route) {
  const cleaned = (route || '').replace(/^\/+|\/+$/g, '');
  return path.join(docsRoot, cleaned ? `${cleaned}.mdx` : 'index.mdx');
}

function sectionOf(route) {
  return route.includes('/') ? route.split('/')[0] : '(root)';
}

function headingToSlug(raw) {
  const withoutLinks = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const withoutTags = withoutLinks.replace(/<[^>]+>/g, '');
  const withoutCode = withoutTags.replace(/[`*_~]/g, '');
  const normalized = withoutCode
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return normalized;
}

function lineFromIndex(content, index) {
  let line = 1;
  for (let i = 0; i < index; i += 1) {
    if (content[i] === '\n') {
      line += 1;
    }
  }
  return line;
}

function findInternalLinks(content) {
  const links = [];
  const patterns = [
    /\[[^\]]*]\(([^)]+)\)/g,
    /href\s*=\s*"([^"]+)"/g,
  ];

  for (const pattern of patterns) {
    let match = pattern.exec(content);
    while (match) {
      links.push({ raw: match[1].trim(), index: match.index });
      match = pattern.exec(content);
    }
  }

  return links;
}

function normalizeLink(raw) {
  const link = raw.replace(/^<|>$/g, '').trim();
  if (!link) return null;
  if (link.startsWith('http://') || link.startsWith('https://')) return null;
  if (link.startsWith('mailto:') || link.startsWith('tel:')) return null;
  if (link.startsWith('javascript:') || link.startsWith('data:')) return null;
  if (link.startsWith('#')) return null;
  if (!link.startsWith('/')) return null;
  if (/^\/(images|logo|favicon)\//.test(link)) return null;
  return link;
}

function splitPathHash(link) {
  const [pathAndQuery, hash = ''] = link.split('#');
  const [pathname] = pathAndQuery.split('?');
  return { pathname, hash };
}

function getAnchorsForFile(filePath, cache) {
  if (cache.has(filePath)) return cache.get(filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const anchors = new Set();
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (headingMatch) {
      anchors.add(headingToSlug(headingMatch[1]));
    }
    const idMatch = line.match(/id\s*=\s*["']([^"']+)["']/);
    if (idMatch) {
      anchors.add(idMatch[1]);
    }
  }

  cache.set(filePath, anchors);
  return anchors;
}

function buildMarkdownReport(report) {
  const lines = [];
  lines.push('# EN Docs Audit Report');
  lines.push('');
  lines.push(`Generated: ${report.generatedAt}`);
  if (report.sectionFilter) {
    lines.push(`Section filter: ${report.sectionFilter}`);
  }
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Pages audited: ${report.summary.pagesAudited}`);
  lines.push(`- Missing docs pages: ${report.summary.missingDocsPages}`);
  lines.push(`- Broken links: ${report.summary.brokenLinks}`);
  lines.push(`- Broken anchors: ${report.summary.brokenAnchors}`);
  lines.push(`- Stale pattern hits: ${report.summary.stalePatterns}`);
  lines.push('');

  lines.push('## Section Breakdown');
  lines.push('');
  lines.push('| Section | Pages | Issues |');
  lines.push('| --- | ---: | ---: |');
  for (const row of report.sectionBreakdown) {
    lines.push(`| ${row.section} | ${row.pages} | ${row.issues} |`);
  }
  lines.push('');

  if (report.issues.length > 0) {
    lines.push('## Issues');
    lines.push('');
    lines.push('| Severity | Type | Section | File | Line | Details |');
    lines.push('| --- | --- | --- | --- | ---: | --- |');
    for (const issue of report.issues) {
      const details = issue.message?.replace(/\|/g, '\\|') ?? '';
      lines.push(
        `| ${issue.severity} | ${issue.type} | ${issue.section} | \`${issue.file}\` | ${issue.line ?? ''} | ${details} |`,
      );
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const docs = readJson(docsJsonPath);
  const rules = readJson(rulesPath);

  const enLanguage = docs?.navigation?.languages?.find(
    lang => lang.language === 'en',
  );
  if (!enLanguage) {
    console.error('No English language configuration found in docs.json');
    process.exit(2);
  }

  const pages = [];
  for (const tab of enLanguage.tabs ?? []) {
    for (const group of tab.groups ?? []) {
      collectPages(group.pages, pages);
    }
  }
  let uniquePages = [...new Set(pages)];
  if (sectionFilter) {
    uniquePages = uniquePages.filter(route => {
      if (sectionFilter === '(root)') {
        return !route.includes('/');
      }
      return sectionOf(route).toLowerCase() === sectionFilter;
    });
  }

  const { jsonPath: reportJsonPath, mdPath: reportMdPath } =
    getReportPaths(sectionFilter);

  const issues = [];
  const sectionStats = new Map();
  const anchorCache = new Map();

  const bumpSection = (section, key) => {
    if (!sectionStats.has(section)) {
      sectionStats.set(section, { pages: 0, issues: 0 });
    }
    sectionStats.get(section)[key] += 1;
  };

  for (const route of uniquePages) {
    const section = sectionOf(route);
    bumpSection(section, 'pages');

    const filePath = routeToFile(route);
    const relFile = path.relative(docsRoot, filePath);

    if (!fs.existsSync(filePath)) {
      issues.push({
        severity: 'error',
        type: 'missing-doc-page',
        section,
        file: relFile,
        line: 1,
        message: `Route '${route}' is listed in EN navigation but file is missing.`,
      });
      bumpSection(section, 'issues');
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    for (const rule of rules.patterns ?? []) {
      const regex = new RegExp(rule.pattern, rule.flags || 'g');
      let match = regex.exec(content);
      while (match) {
        issues.push({
          severity: 'warning',
          type: `stale-pattern:${rule.id}`,
          section,
          file: relFile,
          line: lineFromIndex(content, match.index),
          message: rule.message,
        });
        bumpSection(section, 'issues');
        match = regex.exec(content);
      }
    }

    for (const candidate of findInternalLinks(content)) {
      const link = normalizeLink(candidate.raw);
      if (!link) continue;

      const { pathname, hash } = splitPathHash(link);
      const targetFile = routeToFile(pathname);
      const targetExists = fs.existsSync(targetFile);

      if (!targetExists) {
        issues.push({
          severity: 'error',
          type: 'broken-link',
          section,
          file: relFile,
          line: lineFromIndex(content, candidate.index),
          message: `Internal link target not found: ${link}`,
        });
        bumpSection(section, 'issues');
        continue;
      }

      if (hash) {
        const anchors = getAnchorsForFile(targetFile, anchorCache);
        if (!anchors.has(hash)) {
          issues.push({
            severity: 'error',
            type: 'broken-anchor',
            section,
            file: relFile,
            line: lineFromIndex(content, candidate.index),
            message: `Anchor '#${hash}' not found for target '${pathname}'.`,
          });
          bumpSection(section, 'issues');
        }
      }
    }
  }

  const summary = {
    pagesAudited: uniquePages.length,
    missingDocsPages: issues.filter(i => i.type === 'missing-doc-page').length,
    brokenLinks: issues.filter(i => i.type === 'broken-link').length,
    brokenAnchors: issues.filter(i => i.type === 'broken-anchor').length,
    stalePatterns: issues.filter(i => i.type.startsWith('stale-pattern:')).length,
  };

  const sectionBreakdown = [...sectionStats.entries()]
    .map(([section, data]) => ({
      section,
      pages: data.pages,
      issues: data.issues,
    }))
    .sort((a, b) => a.section.localeCompare(b.section));

  const report = {
    generatedAt: new Date().toISOString(),
    sectionFilter,
    summary,
    sectionBreakdown,
    issues,
  };

  if (writeReport) {
    fs.mkdirSync(auditDir, { recursive: true });
    fs.writeFileSync(reportJsonPath, JSON.stringify(report, null, 2));
    fs.writeFileSync(reportMdPath, buildMarkdownReport(report));
  }

  if (outputJsonOnly) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    if (sectionFilter) {
      console.log(`Section filter: ${sectionFilter}`);
    }
    console.log(`Pages audited: ${summary.pagesAudited}`);
    console.log(`Missing docs pages: ${summary.missingDocsPages}`);
    console.log(`Broken links: ${summary.brokenLinks}`);
    console.log(`Broken anchors: ${summary.brokenAnchors}`);
    console.log(`Stale pattern hits: ${summary.stalePatterns}`);
    if (writeReport) {
      console.log(`Report written: ${path.relative(docsRoot, reportMdPath)}`);
      console.log(`Report written: ${path.relative(docsRoot, reportJsonPath)}`);
    }
  }

  const hasErrors =
    summary.missingDocsPages > 0 ||
    summary.brokenLinks > 0 ||
    summary.brokenAnchors > 0;
  const hasStrictStale = strictStale && summary.stalePatterns > 0;

  if (hasErrors || hasStrictStale) {
    process.exit(1);
  }
}

main();
