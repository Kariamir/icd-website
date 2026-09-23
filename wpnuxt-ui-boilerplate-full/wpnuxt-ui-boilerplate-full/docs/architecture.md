# Architecture

## Purpose
This boilerplate separates CMS concerns from presentation. WordPress editors can manage content while frontend developers can build a fast, testable UI without coupling every component to WordPress.

## System
```text
[Editor]
   |
   v
[WordPress + WPGraphQL]
   |
   v
[@wpnuxt/core / @wpnuxt/blocks]
   |
   v
[Data adapters + typed view models]
   |
   v
[Sections]
   |
   v
[UI components]
   |
   v
[Nuxt SSR / browser]
```

## Boundary rule
Raw CMS data stops at the data/adapter boundary. Components below that boundary receive frontend-oriented data.

Bad:
```text
Button -> usePageByUri() -> WordPress
```

Good:
```text
Page -> usePageByUri() -> mapPage() -> HeroSection -> BaseButton
```

## Rendering strategy
Choose per route, not by habit:
- SSR: dynamic pages requiring fresh server rendering.
- ISR/SWR: public editorial pages that can tolerate controlled staleness.
- Prerender: stable pages known at build time.
- Client-only: only for browser-dependent behavior, not normal content rendering.

Document non-default route rules in the concrete project's Nuxt config and README.

## Extension policy
Start with WPNuxt defaults. Add custom GraphQL operations only for missing fields, custom post types, ACF, special filtering, or a smaller/more suitable payload.
