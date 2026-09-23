# Definition of Done

A UI feature/page is done when all applicable items are true.

## Architecture
- Code is in the correct layer/folder.
- Presentational UI is not coupled to raw WordPress/GraphQL shapes.
- Existing components were reused where appropriate.
- New architectural decisions are documented.

## WordPress/WPNuxt
- WordPress content is fetched through WPNuxt for normal CMS use cases.
- Custom GraphQL exists only when required.
- Generated types are used.
- CMS data is normalized before presentation.
- Missing/null CMS fields do not crash rendering.

## UI
- Matches the approved design at required breakpoints.
- Mobile is intentionally designed, not only scaled down.
- Repeated visual values use design tokens.
- Loading/empty/error states are handled where applicable.

## Accessibility
- Semantic HTML and heading order are correct.
- Keyboard and focus behavior work.
- Images and controls have correct accessible names/alt behavior.
- Required contrast and reduced-motion behavior are respected.

## SEO/routing
- Correct HTTP/404 behavior.
- Title, description, canonical, and social metadata are handled as applicable.
- Internal WordPress backend URLs are not accidentally exposed as frontend navigation URLs.

## Performance
- Images are responsive and dimensioned.
- Queries request only necessary content.
- No unnecessary client-only rendering or duplicate fetching.
- Caching/rendering strategy fits content freshness.

## Engineering
- Typecheck passes.
- Lint passes.
- Tests pass.
- Production build passes.
- No new console errors or hydration warnings.
- Documentation matches the implementation.
