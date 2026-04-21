import { existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const SCREENSHOT_VIEWPORT = {
  width: 1728,
  height: 1117,
};

const VISUAL_BLOCKING_SELECTORS = [
  '.mantine-Skeleton-root',
  '.mantine-datatable-loader-fetching',
  '.mantine-LoadingOverlay-root',
];

export function getScreenshotContextOptions() {
  const locale = process.env.SCREENSHOT_LOCALE || process.env.SCREENSHOT_LANGUAGE;

  return {
    viewport: { ...SCREENSHOT_VIEWPORT },
    screen: { ...SCREENSHOT_VIEWPORT },
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
    ...(locale ? { locale } : {}),
  };
}

export function getScriptRoot(importMetaUrl) {
  const scriptDir = dirname(fileURLToPath(importMetaUrl));
  return {
    scriptDir,
    root: join(scriptDir, '..'),
  };
}

export function getLoginConfig() {
  return {
    loginEmail:
      process.env.SCREENSHOT_LOGIN_EMAIL ?? 'maya.schmidt@acme-corp.com',
    loginPassword:
      process.env.SCREENSHOT_LOGIN_PASSWORD ?? 'localtesting!!',
  };
}

const DEFAULT_BASE_CANDIDATES = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://itellico-ai-local.uk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

async function isBaseReachable(base) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const response = await fetch(base, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
    });
    return response.ok || (response.status >= 300 && response.status < 400);
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function resolveBaseUrl(preferred = '') {
  const explicit = (preferred || process.env.SCREENSHOT_BASE_URL || '').trim();
  if (explicit) {
    return explicit.replace(/\/$/, '');
  }

  for (const candidate of DEFAULT_BASE_CANDIDATES) {
    if (await isBaseReachable(candidate)) {
      return candidate;
    }
  }

  return 'http://localhost:5173';
}

export function getWorkspaceTarget({
  teamId = '',
  teamSlug = '',
  teamName = '',
  defaultTeamName = 'CPlane',
} = {}) {
  return {
    teamId: teamId || process.env.SCREENSHOT_ACCOUNT_ID || '',
    teamSlug: teamSlug || process.env.SCREENSHOT_TEAM_SLUG || '',
    teamName: teamName || process.env.SCREENSHOT_ACCOUNT_NAME || defaultTeamName,
  };
}

function normalizeAsSlug(value = '') {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function clearBrowserState(page, base) {
  await page.context().clearCookies();

  await page.goto(base, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(500);

  await page
    .evaluate(async () => {
      localStorage.clear();
      sessionStorage.clear();

      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }
    })
    .catch(() => {});

  await page
    .evaluate(async () => {
      await fetch('/v1/_allauth/browser/v1/auth/session', {
        method: 'DELETE',
        credentials: 'include',
      }).catch(() => {});
    })
    .catch(() => {});
}

async function fetchCurrentUserEmail(page) {
  try {
    return await page.evaluate(async () => {
      try {
        const response = await fetch('/api/v1/users/me/', {
          credentials: 'include',
        });
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        return typeof data?.email === 'string' ? data.email : null;
      } catch {
        return null;
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (
      message.includes('Execution context was destroyed') ||
      message.includes('Target page, context or browser has been closed')
    ) {
      return null;
    }
    throw error;
  }
}

async function setInputValue(page, selector, value, timeout = 30000) {
  const input = await page.waitForSelector(selector, { timeout });
  await input.evaluate((element, nextValue) => {
    if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
      return;
    }
    element.removeAttribute('readonly');
    element.removeAttribute('disabled');
    const prototype =
      element instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
    descriptor?.set?.call(element, nextValue);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    element.focus();
  }, value);
  await page.waitForTimeout(200);
}

export async function login(page, base, { loginEmail, loginPassword }) {
  await clearBrowserState(page, base);
  await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const emailSelector =
    'input[type="email"], input[name="email"], input[placeholder*="email" i], input[placeholder*="Email" i]';
  await setInputValue(page, emailSelector, loginEmail);

  const passwordInput = await page.$(
    'input[type="password"], input[name="password"]',
  );
  if (passwordInput) {
    await setInputValue(
      page,
      'input[type="password"], input[name="password"]',
      loginPassword,
      15000,
    );
    const submitBtn = await page.$(
      'button[type="submit"], button:has-text("Sign in"), button:has-text("Log in"), button:has-text("Login"), button:has-text("Anmelden"), button:has-text("Einloggen")',
    );
    if (submitBtn) {
      await submitBtn.click();
    }
  } else {
    const nextBtn = await page.$(
      'button[type="submit"], button:has-text("Continue"), button:has-text("Next"), button:has-text("Weiter"), button:has-text("Fortfahren")',
    );
    if (nextBtn) {
      await nextBtn.click();
    }
    await page.waitForTimeout(1500);
    await setInputValue(
      page,
      'input[type="password"]',
      loginPassword,
      15000,
    );
    const submitBtn = await page.$(
      'button[type="submit"], button:has-text("Sign in"), button:has-text("Log in"), button:has-text("Login"), button:has-text("Anmelden"), button:has-text("Einloggen")',
    );
    if (submitBtn) {
      await submitBtn.click();
    }
  }

  await Promise.race([
    page.waitForLoadState('domcontentloaded', { timeout: 10000 }),
    page.waitForTimeout(1200),
  ]).catch(() => {});

  await page
    .waitForURL(url => !url.pathname.startsWith('/login'), { timeout: 30000 })
    .catch(() => {});

  const expectedEmail = loginEmail.trim().toLowerCase();
  let resolvedEmail = null;
  for (let attempt = 0; attempt < 20; attempt += 1) {
    resolvedEmail = await fetchCurrentUserEmail(page);
    if (resolvedEmail?.trim().toLowerCase() === expectedEmail) {
      return;
    }
    await page.waitForTimeout(500);
  }

  throw new Error(
    `Screenshot login resolved unexpected user: ${resolvedEmail || 'unknown'} (expected ${loginEmail})`,
  );
}

async function fetchTeamsOnce(page) {
  return page.evaluate(async () => {
    try {
      const res = await fetch('/api/v1/teams/', { credentials: 'include' });
      const text = await res.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      return {
        ok: res.ok,
        status: res.status,
        teams: data?.items || data || [],
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        teams: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
}

export async function fetchTeams(page, { retries = 20, delayMs = 1500 } = {}) {
  let lastResult = { ok: false, status: 0, teams: [] };

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      lastResult = await fetchTeamsOnce(page);
    } catch (error) {
      lastResult = {
        ok: false,
        status: 0,
        teams: [],
        error: error instanceof Error ? error.message : String(error),
      };
    }
    const teams = Array.isArray(lastResult.teams) ? lastResult.teams : [];

    if (teams.length > 0) {
      return { ...lastResult, teams };
    }

    if (attempt < retries - 1) {
      await page.waitForLoadState('domcontentloaded').catch(() => {});
      await page.waitForTimeout(delayMs);
    }
  }

  return {
    ...lastResult,
    teams: Array.isArray(lastResult.teams) ? lastResult.teams : [],
  };
}

export function findTeamMatch(teams, { teamId = '', teamSlug = '', teamName = '' }) {
  const normalizedSlug = normalizeAsSlug(teamSlug);
  const normalizedName = teamName.trim().toLowerCase();

  if (teamId) {
    const exactId = teams.find(team => team.uuid === teamId || team.id === teamId);
    if (exactId) {
      return exactId;
    }
  }

  if (normalizedSlug) {
    const exactSlug = teams.find(
      team =>
        normalizeAsSlug(team.slug || '') === normalizedSlug ||
        normalizeAsSlug(team.public_trust_slug || '') === normalizedSlug ||
        normalizeAsSlug(team.name || '') === normalizedSlug,
    );
    if (exactSlug) {
      return exactSlug;
    }
  }

  if (normalizedName) {
    const exactName = teams.find(
      team => (team.name || '').toLowerCase() === normalizedName,
    );
    if (exactName) {
      return exactName;
    }

    const partialName = teams.find(team =>
      (team.name || '').toLowerCase().includes(normalizedName),
    );
    if (partialName) {
      return partialName;
    }
  }

  return null;
}

export async function resolveTargetTeam(page, target) {
  const result = await fetchTeams(page);
  const teams = result.teams;
  const team = findTeamMatch(teams, target);
  return { team, teams, status: result.status, ok: result.ok };
}

export function printAvailableTeams(teams) {
  for (const team of teams) {
    const slugSuffix = team.slug ? ` slug=${team.slug}` : '';
    console.log(`  - ${team.name} (${team.uuid})${slugSuffix}`);
  }
}

export async function waitForAccountSwitch(page) {
  await page
    .waitForSelector('text="Switching account"', { timeout: 3000 })
    .then(() =>
      page.waitForSelector('text="Switching account"', {
        state: 'hidden',
        timeout: 20000,
      }),
    )
    .catch(() => {});
}

export async function switchToTeam(page, base, team, waitMs = 2000) {
  await page.goto(`${base}/accounts/${team.uuid}/dashboard`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });
  await waitForAccountSwitch(page);
  await page.waitForTimeout(waitMs);
}

export async function setTheme(page, mode) {
  await page.emulateMedia({ colorScheme: mode });
  await page.evaluate(currentMode => {
    localStorage.setItem('mantine-color-scheme', currentMode);
    document.documentElement.setAttribute(
      'data-mantine-color-scheme',
      currentMode,
    );
    window.dispatchEvent(
      new StorageEvent('storage', {
        key: 'mantine-color-scheme',
        newValue: currentMode,
      }),
    );
    if (currentMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, mode);
  await page.waitForTimeout(600);
}

export async function waitForVisualStability(
  page,
  { timeout = 20000, stableMs = 700 } = {},
) {
  const startedAt = Date.now();
  let stableSince = null;

  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  while (Date.now() - startedAt < timeout) {
    const blockingCount = await page
      .evaluate(selectors => {
        const isVisible = element => {
          if (!(element instanceof HTMLElement)) {
            return false;
          }

          const style = window.getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            Number(style.opacity || '1') === 0
          ) {
            return false;
          }

          return rect.width > 2 && rect.height > 2;
        };

        const largeBusyCount = Array.from(
          document.querySelectorAll('[aria-busy="true"]'),
        ).filter(element => {
          if (!isVisible(element)) {
            return false;
          }
          const rect = element.getBoundingClientRect();
          return rect.width * rect.height > 5000;
        }).length;

        const explicitBlockingCount = selectors.reduce((count, selector) => {
          return (
            count +
            Array.from(document.querySelectorAll(selector)).filter(isVisible)
              .length
          );
        }, 0);

        return explicitBlockingCount + largeBusyCount;
      }, VISUAL_BLOCKING_SELECTORS)
      .catch(() => 0);

    if (blockingCount === 0) {
      const visibleImagesReady = await page
        .evaluate(() => {
          const isVisible = element => {
            if (!(element instanceof HTMLElement)) {
              return false;
            }
            const style = window.getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            if (
              style.display === 'none' ||
              style.visibility === 'hidden' ||
              Number(style.opacity || '1') === 0
            ) {
              return false;
            }
            return rect.width > 8 && rect.height > 8;
          };

          const images = Array.from(document.images).filter(isVisible);
          return images.every(img => img.complete);
        })
        .catch(() => true);

      if (!visibleImagesReady) {
        stableSince = null;
        await page.waitForTimeout(250);
        continue;
      }

      if (stableSince === null) {
        stableSince = Date.now();
      }
      if (Date.now() - stableSince >= stableMs) {
        return;
      }
    } else {
      stableSince = null;
    }

    await page.waitForTimeout(250);
  }

  console.warn('  ! Timed out waiting for visual stability before screenshot');
}

function normalizeScreenshotSuffix(suffix = '') {
  if (!suffix) {
    return '';
  }

  return suffix.startsWith('_') || suffix.startsWith('-') ? suffix : `_${suffix}`;
}

export function getScreenshotFileName(imageName, mode, suffix = '') {
  const flatName = imageName.replaceAll('/', '__');
  return `${flatName}${normalizeScreenshotSuffix(suffix)}-${mode}.png`;
}

export async function captureScreenshot(
  page,
  root,
  imageName,
  mode,
  { suffix = '' } = {},
) {
  const dir = join(root, 'images');
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const fileName = getScreenshotFileName(imageName, mode, suffix);
  const filePath = join(root, 'images', fileName);
  await waitForVisualStability(page);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`  ✓ ${fileName}`);
}
