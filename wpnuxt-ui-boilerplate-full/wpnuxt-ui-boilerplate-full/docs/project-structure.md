# Project Structure

```text
app/
  assets/css/
    main.css
    tokens.css
  components/
    ui/
      BaseButton.vue
      BaseContainer.vue
      BaseImage.vue
    sections/
      HeroSection.vue
      CtaSection.vue
      FaqSection.vue
    wordpress/
      WordPressContent.vue
  composables/
    useSiteNavigation.ts
    usePageViewModel.ts
  layouts/
    default.vue
  pages/
  types/
    content.ts
    ui.ts
  utils/
    content.ts
extend/
  queries/
public/
server/
docs/
CLAUDE.md
```

## Placement test
Ask these questions in order:
1. Is it a generic visual primitive? Put it in `components/ui`.
2. Is it a reusable composition of primitives? Put it in `components/sections`.
3. Does it translate WordPress-specific output? Put it in `components/wordpress` or the WPNuxt block override directory.
4. Does it coordinate route-level content? Put it in `pages` plus a composable/view-model mapper.
5. Is it a custom WordPress GraphQL operation? Put it in `extend/queries`.

Do not create generic folders named `helpers`, `common`, or `misc` as dumping grounds. Name code by responsibility.
