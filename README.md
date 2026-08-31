# EA Suys Retaining Tools Web

Public GitHub Pages frontend for `https://retaining.easuys.com/`.

This repository is intentionally frontend-only. The engineering logic stays in
the private Cloudflare Worker repository:

`https://easuys-retaining-tools-api.yellow-violet-f185.workers.dev`

The interface is a dedicated retaining-wall workspace rather than a generic
calculator list. It consumes plot-ready arrays from the API and avoids
recomputing structural mechanics client-side.

## Pull-request checks

Pull requests run a separate read-only build and test workflow. It has no Pages
permissions, deployment steps, secrets, artifacts, push trigger, or manual
dispatch path; a green pull request therefore does not publish the preview.

## Deployment

The repo includes a GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`.

Published site assumptions:

- default branch: `main`
- custom domain: `retaining.easuys.com`
- static artifact includes `index.html`, compiled `app.js`, `styles.css`,
  `CNAME`, and the screenshot acceptance set under `docs/screenshots/`

The one-time publication and verification procedure is recorded in
[`docs/launch_runbook.md`](docs/launch_runbook.md). Pages, DNS, and the Worker
must all be activated before the public URL is considered live.
