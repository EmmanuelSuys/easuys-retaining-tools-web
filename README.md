# EA Suys Retaining Tools Web

Public GitHub Pages frontend for `https://retaining.easuys.com/`.

This repository is intentionally frontend-only. The engineering logic stays in
the private Cloudflare Worker repository:

`https://easuys-retaining-tools-api.workers.dev`

The interface is a dedicated retaining-wall workspace rather than a generic
calculator list. It consumes plot-ready arrays from the API and avoids
recomputing structural mechanics client-side.

## Deployment

The repo includes a GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`.

Published site assumptions:

- default branch: `main`
- custom domain: `retaining.easuys.com`
- static artifact includes `index.html`, compiled `app.js`, `styles.css`,
  `CNAME`, and the screenshot acceptance set under `docs/screenshots/`
