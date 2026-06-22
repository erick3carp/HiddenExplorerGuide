# Hidden Explorer Guide

A Next.js guide to locally curated destinations in New Smyrna Beach.

## Local development

Use Node.js 20, then install and run the app:

```powershell
npm.cmd ci
npm.cmd run dev
```

Copy `.env.example` to `.env.local` and add values only when needed. The map works with OpenStreetMap when `NEXT_PUBLIC_MAPTILER_KEY` is blank.

## Production checks

Run the same checks used by GitHub Actions:

```powershell
npm.cmd run build
npx.cmd playwright install chromium firefox webkit
npm.cmd run test:e2e
```

The suite checks:

- Production rendering of core routes in Chromium, Firefox, WebKit, and mobile Chrome.
- Horizontal overflow on a phone viewport.
- Automated WCAG A and AA rules on representative pages.
- HTTP status codes for internal links discovered from the site.

Automated accessibility testing does not replace keyboard, screen-reader, zoom, and real-device testing.

## GitHub Actions

The workflow at `.github/workflows/ci.yml` runs for pull requests and pushes to `main`.

1. Push this project to a GitHub repository.
2. Open **Settings > Secrets and variables > Actions**.
3. Add `NEXT_PUBLIC_MAPTILER_KEY` if the production map uses MapTiler.
4. Add `NEXT_PUBLIC_SENTRY_DSN` after creating the Sentry project.
5. Open a pull request and confirm the **Production readiness** check passes.

The test report is uploaded as a GitHub Actions artifact when browser checks fail.

## Sentry error monitoring

Monitoring is disabled when `NEXT_PUBLIC_SENTRY_DSN` is blank.

1. Create a Sentry project for Next.js.
2. Add its public DSN as `NEXT_PUBLIC_SENTRY_DSN` in GitHub and the hosting platform.
3. Set `NEXT_PUBLIC_SENTRY_ENVIRONMENT` to `production` in the hosting platform.
4. For readable production stack traces, also add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` to the hosting platform's server-side environment variables.
5. Deploy and use Sentry's test-event flow to confirm the event reaches the project.

Do not commit `.env.local`, Sentry auth tokens, or other credentials. Public variables prefixed with `NEXT_PUBLIC_` are included in browser code and must never contain secrets.

## Release checklist

- GitHub Actions is green on the release commit.
- Production environment variables are configured.
- Sentry receives a test event and source maps resolve correctly.
- The deployed home, Explore, destination, and Map pages are smoke-tested.
- Keyboard navigation and 200% zoom are checked manually.
- The deployment is tested on at least one physical iPhone and Android device.
