# EA Suys Retaining Tools Web

Public GitHub Pages frontend for `https://retaining.easuys.com/`.

This repository is intentionally frontend-only. The engineering logic stays in
the private Cloudflare Worker repository:

`https://easuys-retaining-tools-api.workers.dev`

The interface is a dedicated retaining-wall workspace rather than a generic
calculator list. It consumes plot-ready arrays from the API and avoids
recomputing structural mechanics client-side.

