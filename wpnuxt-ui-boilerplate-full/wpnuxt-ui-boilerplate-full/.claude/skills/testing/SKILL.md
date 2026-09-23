# Skill: Testing

## Purpose

Provide confidence at the correct testing layers.

## Procedure

1.  Read `docs/testing.md`.
2.  Unit-test critical pure utilities and CMS adapters.
3.  Component-test reusable interactive UI where useful.
4.  Integration-test important CMS/data flows.
5.  End-to-end test critical user journeys when project scope warrants
    it.
6.  Test error, empty, loading, and content edge cases.
7.  Run typecheck, lint, tests, and production build before completion.

## Rules

-   Prefer tests that protect behavior and contracts over implementation
    details.
