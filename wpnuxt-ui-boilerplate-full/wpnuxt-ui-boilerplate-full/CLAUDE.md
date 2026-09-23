# CLAUDE.md --- WPNuxt UI Boilerplate

## Mission

Build maintainable website frontends with Nuxt and WPNuxt while
WordPress remains the content backend.

The primary goal is consistency across projects. New websites can change
their visual design, but must keep the same architectural boundaries,
naming rules, content flow, and quality gates unless a documented
Architecture Decision Record says otherwise.

## Core stack

-   Nuxt 4.1+
-   Vue 3 + TypeScript
-   `@wpnuxt/core`
-   `@wpnuxt/blocks` when Gutenberg block rendering is required
-   WordPress + WPGraphQL
-   Nuxt Image for frontend image rendering
-   pnpm

Do not bypass WPNuxt with ad-hoc REST or GraphQL clients for normal
WordPress content. Extend WPNuxt queries when the default data shape is
insufficient.

## Architecture rule

Use this dependency direction:

`pages -> features/sections -> ui components -> composables/data adapters -> WPNuxt -> WordPress`

A lower layer must not depend on a higher layer.

### Layer responsibilities

1.  **WordPress** owns editorial content and CMS data.
2.  **WPNuxt/data layer** fetches WordPress data and normalizes
    CMS-specific shapes.
3.  **Feature/section layer** maps normalized content into a page
    section.
4.  **UI layer** renders reusable visual primitives and must stay
    CMS-agnostic where practical.
5.  **Page layer** composes sections, route behavior, SEO, and
    page-level loading/error states.

## Required project structure

``` text
app/
  assets/css/
  components/
    ui/             # CMS-agnostic reusable primitives
    sections/       # reusable page sections
    wordpress/      # WP/Gutenberg-specific rendering components
  composables/      # frontend behavior and normalized content APIs
  layouts/
  pages/
  types/
  utils/
extend/queries/     # WPNuxt custom/extended GraphQL queries
server/              # only for server concerns that cannot live in WPNuxt/config
docs/
```

Use Nuxt's active app directory conventions for the installed Nuxt
version. Do not create folders only to imitate another framework.

## Source-of-truth rules

-   WordPress is the source of truth for editorial content.
-   Nuxt is the source of truth for presentation and interaction.
-   Design tokens are the source of truth for colors, typography,
    spacing, radii, shadows, breakpoints, and motion.
-   A component must not contain project-specific CMS fetching unless it
    is explicitly a WordPress adapter/component.
-   Do not hard-code editable business content into Vue templates when
    it belongs in WordPress.

## Component rules

Before creating a component, classify it: - `ui`:
primitive/presentational and reusable across sites. - `sections`:
composition such as Hero, CTA, FAQ, Gallery, FeatureGrid. - `wordpress`:
translates WordPress/Gutenberg content into frontend components.

A UI component: - accepts typed props; - emits typed events; - does not
fetch WordPress data; - has accessible HTML semantics; - supports
responsive layouts; - uses tokens instead of unexplained magic values.

A section component: - accepts a clear view model; - can compose UI
components; - should not know raw GraphQL connection shapes; - should be
easy to replace for a different visual design.

## WordPress/WPNuxt rules

-   Use WPNuxt generated composables for posts, pages, menus, and nodes.
-   Use `useNodeByUri()` when a route can resolve to more than one
    WordPress content type.
-   Put custom `.gql` operations in `extend/queries/`.
-   Prefer generated types over handwritten duplicates.
-   Normalize ACF/connection values at the data boundary before passing
    them to UI.
-   Use `v-sanitize-html` only for trusted WordPress HTML that
    intentionally needs HTML rendering.
-   Use `@wpnuxt/blocks` when the site uses Gutenberg as a
    layout/content system. Override blocks in `components/blocks/` or
    the configured block component location rather than scattering block
    switches through pages.
-   Never expose WordPress admin credentials or private tokens in public
    runtime config.

## Mandatory project planning and progress tracking

Before writing or modifying application code, the developer --- whether
Claude Code, a human developer, or another coding agent --- must plan
the project as a whole. Do not start implementation from the first
visible page or component without understanding the complete requested
scope.

### Planning procedure

1.  Read this `CLAUDE.md` and the relevant files in `docs/`.
2.  Inspect the existing repository before proposing new structure or
    dependencies.
3.  Identify the project scope: routes/pages, WordPress content models,
    WPNuxt queries, shared UI, sections, layouts, integrations, SEO,
    responsive behavior, accessibility, testing, and deployment/build
    concerns.
4.  Resolve important unknowns before implementation. Record reasonable
    assumptions when a detail cannot be resolved.
5.  Break the work into small, verifiable implementation tasks in
    dependency order.
6.  Create or refresh the **Project Progress Checklist** in this file
    before implementation starts.
7.  Only then begin coding.

The plan is not a substitute for implementation. Keep it concise,
actionable, and synchronized with the real project.

### Checklist rules

-   The checklist below is the canonical implementation progress tracker
    for the project.
-   Replace the template items with project-specific tasks during
    initial planning. Do not leave generic placeholders once the real
    scope is known.
-   Use Markdown checkboxes: `[ ]` pending and `[x]` completed.
-   Order tasks by dependency and group them by milestone or
    architectural layer.
-   A task can be checked only after its implementation and applicable
    validation are complete.
-   Update the checklist immediately when scope changes or a task is
    completed.
-   Add newly discovered work instead of silently doing untracked work.
-   Do not delete incomplete tasks to make progress appear complete. If
    an item is intentionally removed from scope, mark it `~~cancelled~~`
    and add a short reason.
-   For blocked work, keep it unchecked and append
    `— BLOCKED: <reason>`.
-   At the start of every development session, read this checklist and
    continue from the next valid unchecked task.
-   Before handoff, reconcile the checklist with the repository and
    `docs/definition-of-done.md`.
-   Never claim the project is complete while required checklist items
    remain unchecked.

## Development Skills

Before implementing work, use the matching skill in `.claude/skills/`.

Available skills:

-   `project-planning` --- inspect the whole project, create the
    implementation plan, and maintain the live progress checklist in
    this file.
-   `requirements-intake` --- collect missing frontend, brand, content,
    CMS, integration, and delivery requirements before implementation.
-   `architecture` --- define or review project boundaries, dependency
    direction, directory structure, rendering, and architectural
    decisions.
-   `wpnuxt-data` --- implement WordPress/WPGraphQL/WPNuxt queries,
    generated composables, adapters, content models, and error states.
-   `gutenberg-blocks` --- implement Gutenberg/WPNuxt block rendering
    and project-specific block overrides.
-   `ui-component` --- create reusable CMS-agnostic UI primitives.
-   `design-system` --- establish tokens, typography, spacing,
    containers, breakpoints, interaction states, and global UI
    conventions.
-   `page-implementation` --- compose complete pages from data adapters
    and reusable sections.
-   `responsive-ui` --- implement and verify mobile, tablet, desktop,
    and content-driven responsive behavior.
-   `forms` --- implement accessible forms, validation, submission
    states, spam protection, and provider integrations.
-   `seo` --- implement metadata, canonicals, social cards, structured
    data, sitemap/robots, and indexing rules.
-   `accessibility` --- review and implement semantic, keyboard, focus,
    contrast, form, media, and motion accessibility.
-   `performance` --- optimize rendering, hydration, images, fonts,
    caching, GraphQL payloads, and third-party scripts.
-   `testing` --- define and implement unit, component, integration, and
    end-to-end coverage.
-   `quality-check` --- perform final code, UI, CMS, responsive,
    accessibility, SEO, and build validation.
-   `code-review` --- review changes for architecture violations,
    regressions, duplication, unsafe coupling, and maintainability.
-   `deployment` --- prepare environments, build/deploy configuration,
    production verification, caching, and rollback documentation.
-   `documentation` --- keep README, architecture, content contracts,
    decisions, workflow, and Definition of Done synchronized with
    implementation.

### Skill selection rule

For every non-trivial task:

1.  Identify the primary skill.
2.  Read that skill before coding.
3.  Read any secondary skills that materially affect the task.
4.  Follow the relevant project documents referenced by the skill.
5.  Update the live Project Progress Checklist after validated progress.

Do not treat skills as optional suggestions. They are the reusable
implementation procedures for this boilerplate.

## Project Progress Checklist

```{=html}
<!--
This section is intentionally stored in CLAUDE.md so Claude Code, humans, and other coding agents share one visible source of progress.
On a new project, replace the template below with the actual plan before implementation.
Keep this section current throughout development.
-->
```
### 0. Discovery and architecture

-   [ ] Inspect repository, requirements, existing dependencies, and
    constraints.
-   [ ] Define routes/pages and page responsibilities.
-   [ ] Define WordPress content models and ownership of editable
    content.
-   [ ] Define WPNuxt data requirements and required custom queries.
-   [ ] Identify reusable UI primitives, sections, layouts, and view
    models.
-   [ ] Record architectural decisions or exceptions in
    `docs/decisions.md`.

### 1. Foundation

-   [ ] Configure Nuxt, WPNuxt, runtime configuration, and environment
    contract.
-   [ ] Implement design tokens and global UI foundations.
-   [ ] Implement shared layout, navigation, and global states.
-   [ ] Implement shared TypeScript types/utilities required by the
    plan.

### 2. WordPress data layer

-   [ ] Implement/extend required WPNuxt queries and generated types.
-   [ ] Implement CMS-to-view-model normalization.
-   [ ] Verify loading, empty, error, preview/private, and 404 behavior
    as applicable.

### 3. UI and pages

-   [ ] Implement planned reusable UI primitives.
-   [ ] Implement planned reusable sections/features.
-   [ ] Implement all planned routes/pages.
-   [ ] Verify responsive behavior against project requirements.

### 4. Cross-cutting requirements

-   [ ] Implement SEO metadata, canonical URLs, social metadata, and
    structured data as applicable.
-   [ ] Complete accessibility review.
-   [ ] Complete performance/image/caching review.
-   [ ] Add required tests.
-   [ ] Update project documentation to match the implementation.

### 5. Verification and handoff

-   [ ] Run type checking.
-   [ ] Run linting.
-   [ ] Run tests.
-   [ ] Run production build.
-   [ ] Complete `docs/definition-of-done.md`.
-   [ ] Reconcile this checklist with the repository; no required work
    is untracked.
-   [ ] Write final implementation/handoff summary, including unresolved
    blockers or intentionally deferred work.

## Page implementation workflow

For every page: 1. Read `docs/architecture.md`,
`docs/content-contract.md`, and `docs/ui-system.md`. 2. Identify which
content is CMS-owned and which behavior is frontend-owned. 3. Reuse
existing UI and section components before creating new ones. 4.
Define/extend the WordPress query only when current WPNuxt composables
are insufficient. 5. Normalize data into a typed view model. 6. Compose
the page from sections. 7. Implement SEO metadata and canonical
behavior. 8. Implement loading, empty, 404, and error states as
applicable. 9. Check responsive behavior and accessibility. 10. Run the
Definition of Done in `docs/definition-of-done.md`.

## Styling rules

-   Mobile-first.
-   Use semantic design tokens.
-   Keep global CSS small: reset/base, tokens, typography, utilities
    that truly are global.
-   Keep component-specific styling with the component or chosen project
    styling system.
-   Avoid page-specific one-off CSS when a reusable section/component is
    the correct abstraction.
-   Do not reproduce desktop layouts on mobile by shrinking everything.

## TypeScript rules

-   TypeScript is required for application code.
-   Avoid `any`. If external data is uncertain, use `unknown` and narrow
    it.
-   Keep CMS types at the boundary; expose smaller frontend view-model
    types to UI components.
-   Do not duplicate WPNuxt generated GraphQL types without a reason.

## SEO and routing

-   WordPress slugs/URIs must map predictably to Nuxt routes.
-   Preserve canonical URLs intentionally.
-   Set title, description, Open Graph, and relevant structured data at
    page level.
-   Redirect legacy WordPress URLs when migration changes public URLs.
-   Do not index preview/private routes.

## Performance

-   Use SSR/ISR/SWR according to content freshness requirements.
-   Prefer Nuxt Image/WPNuxt image integration for WordPress media.
-   Set image dimensions/aspect ratio to reduce layout shift.
-   Lazy-load below-the-fold media and expensive client components.
-   Avoid unnecessary client-only rendering.
-   Keep WordPress payloads limited to fields required by the UI.

## Accessibility

Target WCAG 2.2 AA for normal website work: - semantic landmarks and
headings; - keyboard access; - visible focus; - labels/names for
controls; - useful alt text for meaningful images; - decorative images
ignored by assistive technology; - adequate contrast; - reduced-motion
behavior where relevant.

## Change discipline

Do not silently introduce a new architecture, state library, CSS
framework, CMS access method, or folder convention. If a change affects
future projects, document the decision in `docs/decisions.md` first.

## Commands before completion

Use the scripts provided by the concrete project. At minimum, run the
equivalents of:

``` bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

If a command is unavailable, state that clearly in the implementation
summary. Never claim a check passed if it was not run.

## Definition of Done

A task is complete only when it satisfies `docs/definition-of-done.md`
and leaves documentation consistent with the implementation.

## Frontend Requirements Intake Gate

Before planning implementation, read
`docs/frontend-requirements-intake.md`.

The developer---Claude Code, another coding agent, or a human---must
inspect existing project material and request all missing frontend
requirements and assets before large-scale UI work begins. Do not guess
critical brand, design, content, WordPress, functional, SEO,
accessibility, or deployment requirements.

After discovery:

1.  Summarize confirmed frontend requirements and unresolved items.
2.  Convert the confirmed scope into the live Project Progress Checklist
    in this file.
3.  Mark unresolved critical requirements as blockers.
4.  Start implementation only for workstreams whose requirements are
    sufficiently defined.
