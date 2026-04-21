/**
 * Capture onboarding/activation-checklist screenshots from a target account.
 *
 * Usage:
 *   node scripts/take-onboarding-screenshots.mjs
 *   node scripts/take-onboarding-screenshots.mjs --headed
 */

import { chromium } from 'playwright';
import { parseArgs } from 'util';
import {
  captureScreenshot,
  getLoginConfig,
  getScreenshotContextOptions,
  getScriptRoot,
  login,
  printAvailableTeams,
  resolveBaseUrl,
  resolveTargetTeam,
  setTheme,
  switchToTeam,
} from './lib/screenshot-helpers.mjs';

const { values } = parseArgs({
  options: {
    base: { type: 'string', default: '' },
    headed: { type: 'boolean', default: false },
    'team-id': { type: 'string', default: '' },
    'team-slug': { type: 'string', default: '' },
    'team-name': { type: 'string', default: '' },
  },
});

const BASE = await resolveBaseUrl(values.base);
const HEADED = values.headed;

const { root: ROOT } = getScriptRoot(import.meta.url);
const { loginEmail: LOGIN_EMAIL, loginPassword: LOGIN_PASSWORD } =
  getLoginConfig();
const ONBOARDING_TARGET = {
  teamId: values['team-id'] || process.env.SCREENSHOT_ONBOARDING_TEAM_ID || '',
  teamSlug:
    values['team-slug'] || process.env.SCREENSHOT_ONBOARDING_TEAM_SLUG || '',
  teamName:
    values['team-name'] || process.env.SCREENSHOT_ONBOARDING_TEAM || 'sub2',
};

// Main
const browser = await chromium.launch({ headless: !HEADED });
const context = await browser.newContext(getScreenshotContextOptions());
const page = await context.newPage();

await login(page, BASE, {
  loginEmail: LOGIN_EMAIL,
  loginPassword: LOGIN_PASSWORD,
});

if (page.url().includes('/onboarding') || page.url().includes('/welcome')) {
  console.log('  On onboarding page, waiting for account redirect...');
  await page.waitForURL('**/accounts/**', { timeout: 30000 }).catch(() => {});
}

console.log(`✓ Logged in (${page.url()})`);

console.log(
  `\nLooking for onboarding account matching ` +
    `${ONBOARDING_TARGET.teamSlug || ONBOARDING_TARGET.teamName || ONBOARDING_TARGET.teamId}...`,
);
const { team: onboardingTeam, teams } = await resolveTargetTeam(
  page,
  ONBOARDING_TARGET,
);

if (!onboardingTeam) {
  console.log('Available teams:');
  printAvailableTeams(teams);
  console.log(
    '\n✗ Could not find a matching onboarding account. ' +
      'Set SCREENSHOT_ONBOARDING_TEAM_SLUG, SCREENSHOT_ONBOARDING_TEAM_ID, or SCREENSHOT_ONBOARDING_TEAM.',
  );
  await browser.close();
  process.exit(1);
}

// Navigate to the target account dashboard
console.log('\nSwitching to onboarding account...');
await switchToTeam(page, BASE, onboardingTeam, 3000);
await page.waitForSelector('text="Quick actions"', { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(3000);

// Try to find and click the "Getting started" button in the sidebar to expand the checklist
console.log('\n📸 Capturing activation checklist...');
const gettingStartedBtn = await page.$('button:has-text("Getting started")');
if (gettingStartedBtn) {
  await gettingStartedBtn.click();
  await page.waitForTimeout(1000);
  console.log('  ✓ Expanded Getting Started checklist');
} else {
  console.log('  ⚠ Getting Started button not found in sidebar (may already be completed)');
}

// Capture light
await setTheme(page, 'light');
await page.waitForTimeout(500);
await captureScreenshot(page, ROOT, 'onboarding/activation-checklist', 'light');

// Capture dark
await setTheme(page, 'dark');
await page.waitForTimeout(500);
await captureScreenshot(page, ROOT, 'onboarding/activation-checklist', 'dark');

await browser.close();
console.log('\n✅ Done! Activation checklist screenshots captured.');
console.log('Note: Signup onboarding screenshots require a fresh account and must be captured manually.');
