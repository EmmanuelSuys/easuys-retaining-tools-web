# Retaining Tools launch runbook

This checklist keeps the public frontend, Worker API, and DNS activation in a
verifiable order. Do not announce the tool until every smoke check passes.

## 0. Clear the engineering release gate

1. Run the API repository's genuine benchmark suite with
   `npm run benchmark:run`.
2. Review and accept every engineering comparison; the repository-contained
   synthetic CI fixture proves only that the benchmark contract is readable.
3. Record the accepted evidence and set the API repository variable
   `RETAINING_PRODUCTION_APPROVED_SHA` to the exact reviewed API commit SHA only
   after the genuine suite passes. Every code change requires a fresh review
   and a new approved SHA.

If the genuine suite has any failed, missing, or evidence-free case, stop here.
Keep the public site in preview/no-index mode and do not deploy production.

## 1. Validate and deploy the Worker

1. Confirm the `production` GitHub environment contains
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
2. Configure and verify Cloudflare edge rate limiting for the calculation
   endpoint. Exercise representative and adversarial requests in staging and
   record Worker CPU/runtime and cost before public exposure.
3. Confirm `RETAINING_PRODUCTION_APPROVED_SHA` exactly matches the API commit
   selected by the engineering release decision in step 0.
4. Run the API repository's `Deploy Cloudflare Worker` workflow for
   `production`.
5. Confirm the generated host is:
   `https://easuys-retaining-tools-api.yellow-violet-f185.workers.dev`.
6. Require HTTP 200 from `/health` and `/version` and run one sample analysis
   request from the frontend origin with an explicit, project-specific
   `design_options.max_wall_displacement_mm` limit.

## 2. Enable and deploy GitHub Pages

1. In `easuys/easuys-retaining-tools-web`, open **Settings > Pages**.
2. Select **GitHub Actions** as the build and deployment source.
3. Rerun the `Deploy GitHub Pages` workflow.
4. Confirm the Pages deployment succeeds before changing DNS.

## 3. Activate DNS

Create this record in the authoritative `easuys.com` DNS zone:

```text
retaining  CNAME  easuys.github.io.
```

Wait for public resolution, then confirm the repository's custom domain is
`retaining.easuys.com` and HTTPS enforcement is available.

## 4. Public smoke checks

All of these must pass from outside the development machine:

```bash
curl -fsS https://easuys-retaining-tools-api.yellow-violet-f185.workers.dev/health
curl -fsSI https://retaining.easuys.com/
```

In a browser, run the sample retaining-wall project and verify:

- the API request returns HTTP 200 without a CORS error;
- all phases report convergence;
- the declared displacement serviceability limit, demand, and assessment are
  shown consistently in the result cards and exported report;
- plots, report preview, and JSON/HTML exports render;
- a study request produces the intended `mailto:` draft;
- desktop and mobile layouts remain usable.

## 5. Rollback

If the Worker smoke test fails, remove the public `retaining` DNS record or
disable the Pages deployment while keeping the repositories and previous
workflow artifacts intact. Fix and validate the API before reactivating DNS.
