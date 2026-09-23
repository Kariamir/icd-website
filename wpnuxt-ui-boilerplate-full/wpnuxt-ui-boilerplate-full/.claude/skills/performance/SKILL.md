# Skill: Performance

## Purpose

Keep WPNuxt sites fast without premature complexity.

## Procedure

1.  Read `docs/performance.md`.
2.  Minimize GraphQL payloads.
3.  Use Nuxt/WPNuxt image capabilities and responsive media.
4.  Avoid unnecessary client-only components and hydration.
5.  Lazy-load expensive below-the-fold features.
6.  Optimize fonts and third-party scripts.
7.  Apply caching/SWR/ISR based on content freshness requirements.
8.  Check layout shift, production bundle warnings, and Web
    Vitals/Lighthouse when practical.

## Rules

-   Optimize measured or predictable bottlenecks; do not sacrifice
    maintainability for micro-optimizations.
