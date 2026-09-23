# Skill: Architecture

## Purpose

Keep every project on the same maintainable WordPress + WPNuxt frontend
architecture.

## Required direction

`pages → sections/features → UI → adapters/composables → WPNuxt → WordPress`

## Procedure

1.  Read `docs/architecture.md`, `docs/project-structure.md`,
    `docs/content-contract.md`, and `docs/decisions.md`.
2.  Identify the layer where the change belongs.
3.  Keep presentational components independent from WordPress/WPGraphQL
    shapes.
4.  Put CMS translation in adapters/view models.
5.  Prefer reusable sections over page-specific duplication.
6.  Record material deviations and tradeoffs in `docs/decisions.md`.

## Rules

-   UI primitives must not fetch WordPress data.
-   Pages should orchestrate, not become data/query monoliths.
-   Avoid introducing a second CMS abstraction when WPNuxt already
    provides the required integration.
