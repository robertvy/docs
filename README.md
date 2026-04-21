# Documentation Workspace

This directory contains the Mintlify docs site, image assets, and the local tooling
used to audit docs quality and refresh screenshots from the live app.

## Local docs development

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) if you want a local
preview:

```bash
npm i -g mint
mint dev
```

Run that from `/documentation`, where `docs.json` lives.

## Screenshot workflow

The docs screenshot pipeline has two parts:

1. Seed a reproducible demo workspace in the backend
2. Capture light and dark screenshots from the frontend with Playwright

### Backend sample data

Use the existing Django management command to populate a target workspace:

```bash
cd backend
docker compose exec -T django python manage.py seed_demo_workspace --team-slug acme-corp --execute --clear
```

The seeder supports scenario-specific workspace states:

- `standard`: standalone customer/admin workspace on `acme-corp`
- `agency`: agency-access workspace on `acme-agency` with subaccounts, agency defaults, and parent-billed child accounts plus independent direct-billed accounts

Examples:

```bash
cd backend
docker compose exec -T django python manage.py seed_demo_workspace --scenario standard --execute --clear
docker compose exec -T django python manage.py seed_demo_workspace --scenario agency --execute --clear
```

By default, the screenshot pipeline logs in with:

- `maya.schmidt@acme-corp.com` for the `standard` scenario
- `julia.partner@acme-corp.com` for the `agency` scenario

Both use `localtesting!!` unless you override `SCREENSHOT_LOGIN_EMAIL` and
`SCREENSHOT_LOGIN_PASSWORD`.

This command creates realistic docs/demo data for:

- agents and goals
- contacts and custom fields
- schedules
- tasks
- knowledge bases and items
- tools and actions
- conversations and post-call analysis
- campaigns
- quality studio issues
- evals and suites
- webhooks
- notifications

### Screenshot capture

From `/documentation`, you can now use the packaged workflow:

```bash
npm run screenshots:refresh -- --team-slug acme-corp
```

By default, the refresh wrapper seeds through `docker compose exec -T django ...`
from `/backend`, so it matches the local backend setup used in this repo.

Scenario-aware examples:

```bash
npm run screenshots:refresh -- --scenario standard --clear
npm run screenshots:refresh -- --scenario agency --clear
```

Useful flags:

- `--scenario standard|agency`: choose the demo workspace shape and default login
- `--seed-mode docker|local`: seed through Docker Compose (default) or a host Python interpreter
- `--clear`: clear and reseed the demo workspace first
- `--headed`: watch the browser while screenshots are taken
- `--only greeting,widget`: capture only matching image names
- `--skip-seed`: skip the backend seeder if the workspace is already prepared
- `--skip-onboarding`: skip the separate onboarding checklist screenshot

The refresh script runs:

- `scripts/take-screenshots.mjs`
- `scripts/take-interactive-screenshots.mjs`
- `scripts/take-onboarding-screenshots.mjs` when an onboarding target is configured
- `scripts/audit-screenshot-coverage.mjs`

When you run a full refresh from the `standard` scenario, the wrapper also runs a
supplemental `agency` capture pass for agency-only screenshots such as
`accounts/subaccounts` and `accounts/agency-settings`, so those images are not
overwritten by a standard customer workspace.

### Target workspace selection

The screenshot scripts can resolve the target workspace by:

- `--team-slug`
- `--team-id`
- `--team-name`

Equivalent environment variables are also supported:

- `SCREENSHOT_TEAM_SLUG`
- `SCREENSHOT_ACCOUNT_ID`
- `SCREENSHOT_ACCOUNT_NAME`

Onboarding screenshots support their own target variables:

- `SCREENSHOT_ONBOARDING_TEAM_SLUG`
- `SCREENSHOT_ONBOARDING_TEAM_ID`
- `SCREENSHOT_ONBOARDING_TEAM`

## Audits

Docs content audit:

```bash
npm run audit:en
```

Screenshot coverage audit:

```bash
npm run screenshots:audit
```

That report tells you:

- which docs-referenced screenshots are missing on disk
- which docs-referenced screenshots are not currently reproducible by script
- which image files are unused in docs
