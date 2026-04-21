#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(docsRoot, '..');
const requestedLocale = (
  process.env.SCREENSHOT_LOCALE ||
  process.env.SCREENSHOT_LANGUAGE ||
  ''
)
  .trim()
  .toLowerCase();
const scenarioExplicitlyProvided = process.argv.includes('--scenario');
const defaultScenario =
  process.env.SCREENSHOT_SEED_SCENARIO ||
  (!scenarioExplicitlyProvided && requestedLocale.startsWith('de')
    ? 'german'
    : 'standard');

const SEED_SCENARIOS = {
  standard: {
    teamSlug: 'acme-corp',
    teamName: 'Acme Corp',
    loginEmail: 'maya.schmidt@acme-corp.com',
  },
  agency: {
    teamSlug: 'acme-agency',
    teamName: 'Acme Agency',
    loginEmail: 'julia.partner@acme-corp.com',
  },
  german: {
    teamSlug: 'beispiel-gmbh',
    teamName: 'Beispiel GmbH',
    loginEmail: 'anna.huber@beispiel-gmbh.de',
  },
  'german-agency': {
    teamSlug: 'beispiel-agentur',
    teamName: 'Beispiel Agentur',
    loginEmail: 'katrin.partner@beispiel-agentur.de',
  },
};

const SUPPLEMENTAL_SCENARIO_TARGETS = {
  agency: ['accounts/subaccounts', 'accounts/agency-settings'],
  'german-agency': ['accounts/subaccounts', 'accounts/agency-settings'],
};

const DEFAULT_SUPPLEMENTAL_SCENARIOS = {
  standard: ['agency'],
  german: ['german-agency'],
};

const { values } = parseArgs({
  options: {
    scenario: {
      type: 'string',
      default: defaultScenario,
    },
    base: { type: 'string', default: '' },
    headed: { type: 'boolean', default: false },
    only: { type: 'string', default: '' },
    suffix: { type: 'string', default: '' },
    'team-slug': { type: 'string', default: '' },
    'team-id': { type: 'string', default: '' },
    'team-name': { type: 'string', default: '' },
    python: { type: 'string', default: process.env.SCREENSHOT_PYTHON || 'python' },
    'seed-mode': {
      type: 'string',
      default: process.env.SCREENSHOT_SEED_MODE || 'docker',
    },
    'backend-dir': {
      type: 'string',
      default: path.join(repoRoot, 'backend'),
    },
    clear: { type: 'boolean', default: false },
    'skip-seed': { type: 'boolean', default: false },
    'skip-simple': { type: 'boolean', default: false },
    'skip-interactive': { type: 'boolean', default: false },
    'skip-onboarding': { type: 'boolean', default: false },
    'skip-prune': { type: 'boolean', default: false },
    'skip-audit': { type: 'boolean', default: false },
  },
});

const requestedScenario = (values.scenario || 'standard').trim().toLowerCase();
const scenario =
  requestedScenario === 'standard-admin'
    ? SEED_SCENARIOS.standard
    : requestedScenario === 'agency-admin'
      ? SEED_SCENARIOS.agency
      : requestedScenario === 'german-admin'
        ? SEED_SCENARIOS.german
        : requestedScenario === 'german-agency-admin'
          ? SEED_SCENARIOS['german-agency']
      : SEED_SCENARIOS[requestedScenario];

if (!scenario) {
  console.error(
    `Unknown screenshot seed scenario '${values.scenario}'. ` +
      `Available scenarios: ${Object.keys(SEED_SCENARIOS).join(', ')}.`,
  );
  process.exit(2);
}

const effectiveTeamSlug = values['team-slug'] || scenario.teamSlug;
const effectiveTeamName = values['team-name'] || scenario.teamName;
const requestedOnlyTargets = values.only
  ? values.only
      .split(',')
      .map(value => value.trim())
      .filter(Boolean)
  : [];
const seedMode = (values['seed-mode'] || 'docker').trim().toLowerCase();

function run(command, args, options = {}) {
  const pretty = [command, ...args].join(' ');
  console.log(`\n$ ${pretty}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? docsRoot,
    env: options.env ?? process.env,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function runSeedCommand(seedArgs, env) {
  if (seedMode === 'docker') {
    run(
      'docker',
      ['compose', 'exec', '-T', 'django', 'python', 'manage.py', ...seedArgs],
      {
        cwd: values['backend-dir'],
        env,
      },
    );
    return;
  }

  if (seedMode !== 'local') {
    console.error(
      `Unknown seed mode '${values['seed-mode']}'. Available modes: docker, local.`,
    );
    process.exit(2);
  }

  const directManagePath = path.join(values['backend-dir'], 'manage.py');
  const nestedManagePath = path.join(values['backend-dir'], 'django_app', 'manage.py');
  const manageEntry = existsSync(directManagePath)
    ? 'manage.py'
    : existsSync(nestedManagePath)
      ? 'django_app/manage.py'
      : null;

  if (!manageEntry) {
    console.error(
      `Could not find manage.py under ${values['backend-dir']}. ` +
        'Use --seed-mode docker or point --backend-dir at the Django app root.',
    );
    process.exit(2);
  }

  run(values.python, [manageEntry, ...seedArgs], {
    cwd: values['backend-dir'],
    env,
  });
}

function unique(values) {
  return [...new Set(values)];
}

function buildScenarioEnv(activeScenarioKey, options = {}) {
  const {
    honorExplicitTeamOverride = true,
  } = options;
  const activeScenario = SEED_SCENARIOS[activeScenarioKey];
  const activeTeamSlug =
    honorExplicitTeamOverride && values['team-slug']
      ? values['team-slug']
      : activeScenario.teamSlug;
  const activeTeamName =
    honorExplicitTeamOverride && values['team-name']
      ? values['team-name']
      : activeScenario.teamName;
  const env = {
    ...process.env,
  };

  if (honorExplicitTeamOverride && values['team-id']) {
    env.SCREENSHOT_ACCOUNT_ID = values['team-id'];
  }
  if (honorExplicitTeamOverride && values['team-slug']) {
    env.SCREENSHOT_TEAM_SLUG = values['team-slug'];
  } else if (activeTeamSlug) {
    env.SCREENSHOT_TEAM_SLUG = activeTeamSlug;
  }
  if (honorExplicitTeamOverride && values['team-name']) {
    env.SCREENSHOT_ACCOUNT_NAME = values['team-name'];
  } else if (activeTeamName) {
    env.SCREENSHOT_ACCOUNT_NAME = activeTeamName;
  }
  if (!env.SCREENSHOT_LOGIN_EMAIL && activeScenario.loginEmail) {
    env.SCREENSHOT_LOGIN_EMAIL = activeScenario.loginEmail;
  }

  return {
    env,
    activeTeamSlug,
    activeTeamName,
  };
}

function buildCommonArgs({
  teamSlug,
  teamName,
  onlyTargets = [],
}) {
  const args = [];

  if (values.base) {
    args.push('--base', values.base);
  }
  if (values.headed) {
    args.push('--headed');
  }
  if (values.suffix) {
    args.push('--suffix', values.suffix);
  }
  if (onlyTargets.length) {
    args.push('--only', onlyTargets.join(','));
  }
  if (values['team-id']) {
    args.push('--team-id', values['team-id']);
  }
  if (teamSlug) {
    args.push('--team-slug', teamSlug);
  }
  if (teamName) {
    args.push('--team-name', teamName);
  }

  return args;
}

function splitOnlyTargets(primaryScenarioKey, onlyTargets) {
  const primaryTargets = [];
  const supplementalTargets = new Map();
  const preferredSupplementalScenarios =
    DEFAULT_SUPPLEMENTAL_SCENARIOS[primaryScenarioKey] ?? [];

  for (const target of onlyTargets) {
    const matchingScenarioKey =
      preferredSupplementalScenarios.find(scenarioKey =>
        SUPPLEMENTAL_SCENARIO_TARGETS[scenarioKey]?.includes(target),
      ) ??
      Object.entries(SUPPLEMENTAL_SCENARIO_TARGETS).find(([, targets]) =>
        targets.includes(target),
      )?.[0];

    if (!matchingScenarioKey || matchingScenarioKey === primaryScenarioKey) {
      primaryTargets.push(target);
      continue;
    }

    supplementalTargets.set(matchingScenarioKey, [
      ...(supplementalTargets.get(matchingScenarioKey) ?? []),
      target,
    ]);
  }

  return {
    primaryTargets: unique(primaryTargets),
    supplementalTargets,
  };
}

function runCapturePass(
  activeScenarioKey,
  onlyTargets = [],
  options = {},
) {
  const {
    honorExplicitTeamOverride = true,
  } = options;
  const { env, activeTeamSlug, activeTeamName } = buildScenarioEnv(
    activeScenarioKey,
    { honorExplicitTeamOverride },
  );
  const commonArgs = buildCommonArgs({
    teamSlug: activeTeamSlug,
    teamName: activeTeamName,
    onlyTargets,
  });

  if (!values['skip-seed']) {
    if (!activeTeamSlug) {
      console.error(
        'Seeding requires a target team slug. Provide --team-slug or use a scenario with a default workspace.',
      );
      process.exit(2);
    }

    const seedArgs = [
      'seed_demo_workspace',
      '--scenario',
      activeScenarioKey,
      '--team-slug',
      activeTeamSlug,
      '--execute',
    ];
    if (!values['team-name'] && activeTeamName) {
      seedArgs.push('--team-name', activeTeamName);
    }
    if (values.clear) {
      seedArgs.push('--clear');
    }

    runSeedCommand(seedArgs, env);
  }

  if (!values['skip-simple']) {
    run(process.execPath, ['scripts/take-screenshots.mjs', ...commonArgs], {
      cwd: docsRoot,
      env,
    });
  }

  if (!values['skip-interactive']) {
    run(
      process.execPath,
      ['scripts/take-interactive-screenshots.mjs', ...commonArgs],
      {
        cwd: docsRoot,
        env,
      },
    );
  }

  return env;
}

let finalEnv;
if (requestedOnlyTargets.length) {
  const { primaryTargets, supplementalTargets } = splitOnlyTargets(
    requestedScenario,
    requestedOnlyTargets,
  );

  if (primaryTargets.length) {
    finalEnv = runCapturePass(requestedScenario, primaryTargets);
  }

  for (const [scenarioKey, targets] of supplementalTargets.entries()) {
    finalEnv = runCapturePass(scenarioKey, targets, {
      honorExplicitTeamOverride: false,
    });
  }

  if (!primaryTargets.length && supplementalTargets.size === 0) {
    finalEnv = buildScenarioEnv(requestedScenario).env;
  }
} else {
  finalEnv = runCapturePass(requestedScenario);

  for (const scenarioKey of DEFAULT_SUPPLEMENTAL_SCENARIOS[requestedScenario] ?? []) {
    const targets = SUPPLEMENTAL_SCENARIO_TARGETS[scenarioKey] ?? [];
    if (!targets.length) {
      continue;
    }
      console.log(
        `\nRunning supplemental ${scenarioKey} capture pass for ${targets.join(', ')}`,
      );
    finalEnv = runCapturePass(scenarioKey, targets, {
      honorExplicitTeamOverride: false,
    });
  }
}

const hasOnboardingTarget =
  Boolean(process.env.SCREENSHOT_ONBOARDING_TEAM_SLUG) ||
  Boolean(process.env.SCREENSHOT_ONBOARDING_TEAM_ID) ||
  Boolean(process.env.SCREENSHOT_ONBOARDING_TEAM);

if (!values['skip-onboarding'] && hasOnboardingTarget) {
  const onboardingArgs = ['scripts/take-onboarding-screenshots.mjs'];
  if (values.base) {
    onboardingArgs.push('--base', values.base);
  }
  if (values.headed) {
    onboardingArgs.push('--headed');
  }
  if (values.suffix) {
    onboardingArgs.push('--suffix', values.suffix);
  }
  run(process.execPath, onboardingArgs, {
    cwd: docsRoot,
    env: finalEnv ?? process.env,
  });
} else if (!values['skip-onboarding']) {
  console.log(
    '\nSkipping onboarding screenshots: set SCREENSHOT_ONBOARDING_TEAM_SLUG, ' +
      'SCREENSHOT_ONBOARDING_TEAM_ID, or SCREENSHOT_ONBOARDING_TEAM to include them.',
  );
}

if (!values['skip-prune']) {
  run(process.execPath, ['scripts/prune-unused-images.mjs'], {
    cwd: docsRoot,
    env: finalEnv ?? process.env,
  });
}

if (!values['skip-audit']) {
  run(process.execPath, ['scripts/audit-screenshot-coverage.mjs'], {
    cwd: docsRoot,
    env: finalEnv ?? process.env,
  });
}
