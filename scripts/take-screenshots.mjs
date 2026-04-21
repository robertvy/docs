/**
 * Automated screenshot tool for itellicoAI documentation.
 * Logs in, navigates to each app page, takes light + dark screenshots.
 *
 * Usage:
 *   node scripts/take-screenshots.mjs
 *   node scripts/take-screenshots.mjs --only dashboard,agents
 *   node scripts/take-screenshots.mjs --headed   # watch in browser
 */

import { chromium } from 'playwright';
import { parseArgs } from 'util';
import {
  captureScreenshot,
  getLoginConfig,
  getScreenshotContextOptions,
  getScriptRoot,
  getWorkspaceTarget,
  login,
  printAvailableTeams,
  resolveBaseUrl,
  resolveTargetTeam,
  setTheme,
  switchToTeam,
  waitForAccountSwitch,
} from './lib/screenshot-helpers.mjs';

const { values } = parseArgs({
  options: {
    only: { type: 'string', default: '' },
    base: { type: 'string', default: '' },
    headed: { type: 'boolean', default: false },
    suffix: { type: 'string', default: '' },
    'team-id': { type: 'string', default: '' },
    'team-slug': { type: 'string', default: '' },
    'team-name': { type: 'string', default: '' },
  },
});

const BASE = await resolveBaseUrl(values.base);
const HEADED = values.headed;
const ONLY = values.only ? values.only.split(',').map(s => s.trim()) : [];
const SCREENSHOT_SUFFIX = values.suffix;
const { root: ROOT } = getScriptRoot(import.meta.url);
const { loginEmail: LOGIN_EMAIL, loginPassword: LOGIN_PASSWORD } =
  getLoginConfig();
const TARGET_WORKSPACE = getWorkspaceTarget({
  teamId: values['team-id'],
  teamSlug: values['team-slug'],
  teamName: values['team-name'],
});

// Simple page-level screenshots: [imagePath, appRouteSuffix]
// These are pages that just need a navigate + screenshot, no interaction.
const SIMPLE_PAGES = [
  ['dashboard/main-dashboard', '/dashboard'],
  ['agents/agents-list', '/agents'],
  ['conversations/conversations-list', '/conversations'],
  ['manage/conversations-list', '/conversations'],
  ['notifications/notifications-inbox', '/notifications'],
  ['manage/tasks-overview', '/tasks/kanban'],
  ['telephony/phone-numbers-list', '/telephony/phone-numbers'],
  ['manage/campaign-list', '/campaigns'],
  ['manage/widgets-list', '/web'],
  ['manage/contacts-list', '/contacts'],
  ['hours/business-hours-list', '/schedules'],
  ['accounts/api-keys', '/api-keys'],
  ['accounts/account-settings', '/account/settings'],
  ['accounts/agency-settings', '/account/agency'],
  ['accounts/team-members', '/account/team'],
  ['accounts/subaccounts', '/account/subaccounts'],
  ['accounts/security', '/settings/security'],
  ['accounts/integrations', '/integrations'],
  ['accounts/profile', '/settings/profile'],
  ['accounts/user-preferences', '/settings/preferences'],
  ['quality-studio/overview-dashboard', '/quality-studio/dashboard'],
  ['manage/dashboard-default', '/dashboard'],
];

async function isPageLoaded(page) {
  // Check if the sidebar/nav rendered (i.e. not stuck on splash screen)
  const sidebar = await page.$('nav, aside, [class*="sidebar"], [class*="navbar"]');
  return !!sidebar;
}

function resolveRouteUrl(accountId, route) {
  if (route.startsWith('/settings/')) {
    return `${BASE}${route}`;
  }
  return `${BASE}/accounts/${accountId}${route}`;
}

async function captureRoute(page, accountId, imageName, routeSuffix) {
  if (ONLY.length && !ONLY.some(o => imageName.includes(o))) return;

  const url = resolveRouteUrl(accountId, routeSuffix);
  console.log(`\n📸 ${imageName} → ${routeSuffix}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // Wait for "Switching account" modal to disappear if present
    await waitForAccountSwitch(page);
    await page.waitForSelector('text="Quick actions"', { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // If stuck on splash screen, try SPA navigation from dashboard
    if (!(await isPageLoaded(page))) {
      console.log(`  ⚠ Splash screen detected, trying SPA navigation...`);
      // Load dashboard first (known working page)
      await page.goto(`${BASE}/accounts/${accountId}/dashboard`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForSelector('text="Quick actions"', { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(2000);
      // Try SPA nav via sidebar link - search by href containing route parts
      const routeParts = routeSuffix.split('/').filter(Boolean);
      const lastPart = routeParts[routeParts.length - 1];
      // Try multiple search terms: full suffix, last part, and words within
      const searchTerms = [routeSuffix, lastPart, ...lastPart.split('-')];
      let clicked = null;
      for (const term of searchTerms) {
        clicked = await page.evaluate((t) => {
          const links = document.querySelectorAll('a[href]');
          for (const a of links) {
            if (a.href.includes(t)) { a.click(); return a.href; }
          }
          return null;
        }, term);
        if (clicked) break;
      }
      if (clicked) {
        console.log(`  → SPA navigating via sidebar: ${clicked}`);
        await page.waitForTimeout(5000);
      } else {
        console.log(`  ✗ No sidebar link found for ${lastPart}`);
      }
    }

    if (
      routeSuffix === '/account/agency' &&
      !new URL(page.url()).pathname.endsWith('/account/agency')
    ) {
      console.log(
        '  ⚠ Agency Settings is not available for this workspace/user; keeping existing screenshot.',
      );
      return;
    }

    await setTheme(page, 'light');
    await captureScreenshot(page, ROOT, imageName, 'light', {
      suffix: SCREENSHOT_SUFFIX,
    });

    await setTheme(page, 'dark');
    await captureScreenshot(page, ROOT, imageName, 'dark', {
      suffix: SCREENSHOT_SUFFIX,
    });
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
  }
}

// Main
const browser = await chromium.launch({ headless: !HEADED });
const context = await browser.newContext(getScreenshotContextOptions());
const page = await context.newPage();

await login(page, BASE, {
  loginEmail: LOGIN_EMAIL,
  loginPassword: LOGIN_PASSWORD,
});

const currentAccountId = page.url().match(/accounts\/([^/]+)/)?.[1] ?? '';
const { team: targetTeam, teams, status } = await resolveTargetTeam(
  page,
  TARGET_WORKSPACE,
);

if (!targetTeam) {
  console.log('\n✗ Could not resolve a screenshot workspace.');
  console.log(`Current page: ${page.url()}`);
  console.log(`Team lookup status: ${status || 'unknown'}`);
  console.log('Available teams:');
  printAvailableTeams(teams);
  await browser.close();
  process.exit(1);
}

if (currentAccountId !== targetTeam.uuid) {
  await switchToTeam(page, BASE, targetTeam);
}

console.log(
  `Using workspace: ${targetTeam.name} (${targetTeam.uuid})${
    targetTeam.slug ? ` slug=${targetTeam.slug}` : ''
  }\n`,
);

for (const [imageName, route] of SIMPLE_PAGES) {
  await captureRoute(page, targetTeam.uuid, imageName, route);
}

await browser.close();
console.log('\n✅ Done! Captured simple page screenshots.');
console.log('Run with --headed to watch the browser.');
