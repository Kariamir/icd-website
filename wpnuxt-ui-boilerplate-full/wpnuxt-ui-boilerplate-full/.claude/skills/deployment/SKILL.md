# Skill: Deployment

## Purpose

Prepare and verify staging/production delivery.

## Procedure

1.  Confirm runtime/hosting target and Node/package-manager
    requirements.
2.  Configure environment variables without exposing secrets.
3.  Configure WordPress/WPGraphQL URLs, media domains, redirects,
    caching/CDN, and HTTPS.
4.  Run typecheck, lint, tests, and production build.
5.  Deploy to staging first when available.
6.  Smoke-test routes, forms, CMS updates, metadata, 404/error behavior,
    analytics/consent, and caching.
7.  Document deployment and rollback/redeploy procedure.

## Rules

-   Never assume local success proves production readiness.
