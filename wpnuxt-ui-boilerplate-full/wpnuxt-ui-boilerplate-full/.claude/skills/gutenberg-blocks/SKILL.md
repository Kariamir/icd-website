# Skill: Gutenberg Blocks

## Purpose

Render Gutenberg content through WPNuxt without turning pages into large
block-type switch statements.

## Procedure

1.  Confirm Gutenberg is in scope.
2.  Read `docs/wordpress-wpnuxt.md`.
3.  Use `@wpnuxt/blocks` where appropriate.
4.  Map supported core/custom blocks to project components.
5.  Override blocks at the block-rendering layer.
6.  Provide safe fallback behavior for unsupported blocks.
7.  Verify nested blocks, media, links, alignment, responsive behavior,
    and editor-created edge cases.

## Rules

-   Keep block-specific WordPress knowledge out of generic UI
    primitives.
-   Do not duplicate block rendering logic across pages.
