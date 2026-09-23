# Testing Strategy

## Test pyramid
Use the smallest useful test level.

### Unit
Test pure mappers, formatters, URL normalization, and non-trivial composable logic.

### Component
Test reusable UI behavior, variants, keyboard behavior, and important conditional rendering.

### Integration
Test page/content mapping for representative WordPress payloads, especially custom fields and nullable content.

### End-to-end
Cover critical user paths: navigation, forms, search/filter if present, primary conversion flows, and 404 behavior.

## Required engineering checks
Before a feature is complete, run the project's equivalents of:
```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

For significant UI changes, also verify at representative mobile and desktop widths and check the browser console for errors/hydration warnings.
