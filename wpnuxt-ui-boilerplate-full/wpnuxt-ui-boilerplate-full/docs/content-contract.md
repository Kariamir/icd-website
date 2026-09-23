# Content Contract

## Purpose
Prevent WordPress schema details from spreading through the UI.

## Pattern
```ts
// CMS/generated shape -> mapper -> frontend view model
export interface HeroViewModel {
  eyebrow?: string
  title: string
  description?: string
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  primaryAction?: {
    label: string
    href: string
  }
}
```

The mapper owns CMS quirks such as nullable nested fields, GraphQL connection nodes, ACF wrappers, and fallback values.

## Rules
- Do not pass an entire generated `Page` object to every child component.
- Map only fields needed by the component.
- Preserve `null` versus empty meaning intentionally.
- Do not invent editorial fallback copy inside low-level components.
- Put required-content validation near the boundary.
- Keep links normalized to frontend URLs if WordPress returns backend-domain URLs.

## Ownership
WordPress owns: titles, body copy, editorial images, menu entries, reusable editorial fields.

Frontend owns: interaction state, breakpoints, component variants, animation behavior, loading/error UI, accessibility behavior, layout implementation.
