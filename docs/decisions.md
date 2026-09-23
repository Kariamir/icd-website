# Architecture Decision Log

## ADR-001: Migrate frontend from React/Vite to Nuxt 4 + WPNuxt
- **Status:** accepted
- **Date:** 2026-09-23
- **Context:** The project's original architecture (docs/technical-requirements-icd3d.md) specified WordPress + a custom PHP REST API layer (`icd/v1`) + a shared React/Vite 3D module. The project owner explicitly approved replacing this with `wpnuxt-ui-boilerplate-full`'s architecture: Nuxt 4 + Vue 3 + TypeScript + WPGraphQL via `@wpnuxt/core`/`@wpnuxt/blocks`, as a full in-place replacement.
- **Decision:** The frontend is rebuilt on Nuxt 4 + WPNuxt, following `wpnuxt-ui-boilerplate-full`'s required project structure (`app/components/{ui,sections,wordpress}`, `composables/`, `extend/queries/`, layer boundary `pages -> sections -> ui -> composables -> WPNuxt -> WordPress`). `docs/technical-requirements-icd3d.md`'s custom PHP `icd/v1` API layer is superseded — WordPress content is now reached through WPGraphQL, not a bespoke REST namespace.
- **Consequences:** The design system (docs/design-system-icd3d.md), route table (docs/01-sitemap.md), and RTL rules are unchanged and still authoritative — only the delivery framework and CMS integration method changed. `docs/technical-requirements-icd3d.md` §3 (PHP API endpoint table) no longer describes the real integration path; it should be read as historical/superseded rather than updated line-by-line, since the content models in §2 are still valid and should be implemented as WPGraphQL/WPNuxt queries + WordPress custom post types instead.
- **Alternatives:** Keep the React/Vite + PHP API architecture (rejected — explicitly superseded by owner instruction).

## ADR-002: WPNuxt modules load conditionally, only once a real backend exists
- **Status:** accepted
- **Date:** 2026-09-23
- **Context:** `@wpnuxt/core` hard-requires a reachable WPGraphQL endpoint to boot `nuxt dev`/`nuxt build` (not only to introspect types for codegen) — confirmed by testing against a placeholder URL, which fails the entire app rather than degrading gracefully. No WordPress/WPGraphQL backend exists yet for this project.
- **Decision:** `@wpnuxt/core` and `@wpnuxt/blocks` are only added to `nuxt.config.ts`'s `modules` array when `WPNUXT_WORDPRESS_URL` is set (see `nuxt.config.ts`). All pages currently render from local view-model data in `app/utils/*Data.ts` (ported from the project's own prior React implementation, not placeholder copy) rather than WPNuxt composables.
- **Consequences:** The frontend can be built, previewed, and reviewed today with zero WordPress backend. The moment staging WordPress + WPGraphQL is live, setting `WPNUXT_WORDPRESS_URL` (see `.env.example`) turns the modules back on with no other code change. Each page's data-fetching still needs to be rewired from the local view-model files to real WPNuxt composables/queries once the content models in docs/technical-requirements-icd3d.md §2 exist in WordPress — tracked in the Project Progress Checklist in this repo's `CLAUDE.md`.
- **Alternatives:** Stand up a throwaway/mock WPGraphQL server just to satisfy the module (rejected as unnecessary overhead before real content modeling decisions — sitemap §13 — are made).

## ADR-003: 3D hero scene (HeroScene/CloudSystem/TehranTower) not yet ported
- **Status:** accepted (tracked, not resolved)
- **Date:** 2026-09-23
- **Context:** The prior React implementation's Three.js hero scene components (`src/components/HeroScene.jsx`, `CloudSystem.jsx`, `TehranTower.jsx`) were deleted along with the old `src/` tree during the migration and were never committed to git, so they could not be recovered (unlike `ClusterHub`, `ProjectsMapExplorer`, and `ProjectDetail`, which the project owner recovered from editor history and were ported faithfully).
- **Decision:** The homepage hero (block 0) currently renders the non-3D fallback state only (dark gradient + title + CTA), which already satisfies docs/technical-requirements-icd3d.md §9's requirement that every 3D page have a non-WebGL fallback. `app/components/sections/HeroSection.vue` has a code comment marking where a client-only 3D scene mounts.
- **Consequences:** The homepage is functionally complete but visually simpler than before until the 3D hero is rebuilt. Rebuilding it is a discrete, trackable task (3D scene work does not block any other page).
- **Alternatives:** Reconstruct the scene from memory of the deleted files (rejected — would not be the owner's real prior work, and risks silently fabricating implementation details).
