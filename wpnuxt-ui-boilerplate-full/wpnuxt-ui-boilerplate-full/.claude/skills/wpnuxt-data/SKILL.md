# Skill: WPNuxt Data Integration

## Purpose

Implement type-safe WordPress data access through WPNuxt and WPGraphQL.

## Procedure

1.  Read `docs/wordpress-wpnuxt.md` and `docs/content-contract.md`.
2.  Confirm the WordPress/WPGraphQL schema before coding.
3.  Prefer WPNuxt generated composables and supported extension
    mechanisms.
4.  Add custom `.gql` operations only when required.
5.  Normalize raw CMS data into stable frontend view models.
6.  Handle loading, empty, error, and not-found states.
7.  Keep query fragments/payloads minimal.
8.  Verify draft/preview, authentication, pagination, taxonomy, or
    multilingual behavior when in scope.
9.  Update the content contract when fields or assumptions change.

## Rules

-   Do not bind reusable UI directly to raw GraphQL connection shapes.
-   Do not expose secrets in public runtime config.
-   Do not guess field names; inspect the schema.
