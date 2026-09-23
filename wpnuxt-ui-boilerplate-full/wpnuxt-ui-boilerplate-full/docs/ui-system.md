# UI System

## Goal
Visual design can change between clients. Component contracts and implementation quality should remain predictable.

## Design tokens
Every project defines semantic tokens for at least:
- color: background, surface, text, muted, border, primary, danger;
- typography: font families, text sizes, line heights, weights;
- spacing scale;
- radii;
- shadows;
- container widths;
- breakpoints;
- motion duration/easing.

Prefer `--color-text` over names such as `--black-900` in component APIs. Primitive palette tokens can exist underneath semantic tokens.

## Component API
Components must expose intent, not internal CSS details.

Prefer:
```vue
<BaseButton variant="primary" size="lg" />
```

Avoid:
```vue
<BaseButton background="#000" padding="13px 29px" />
```

## Reuse threshold
Create a reusable primitive when the same behavior/visual rule appears more than once or is clearly part of the site's system. Do not generalize a unique art-directed section too early.

## Responsive rule
Start from the smallest layout. Add complexity as viewport space increases. Test content expansion, long titles, missing images, and translated text.

## CMS independence
`components/ui` must not import WPNuxt composables. A reusable UI primitive should be usable with static data, another CMS, or tests.
