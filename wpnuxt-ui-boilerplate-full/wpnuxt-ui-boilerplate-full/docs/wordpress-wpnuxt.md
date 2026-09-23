# WordPress + WPNuxt Integration

## Baseline
WordPress provides content through WPGraphQL. WPNuxt is the standard bridge into Nuxt.

Current WPNuxt 2.x uses `@wpnuxt/core`; Gutenberg rendering is available through `@wpnuxt/blocks`. WPNuxt generates typed composables from GraphQL operations and supports server-side caching.

## Minimum Nuxt configuration
```ts
export default defineNuxtConfig({
  modules: ['@wpnuxt/core'],
  wpNuxt: {
    wordpressUrl: process.env.WPNUXT_WORDPRESS_URL,
    cache: {
      enabled: true,
      maxAge: 300,
      swr: true,
    },
  },
})
```

Use environment variables for deployment-specific URLs.

## Standard fetching
Use generated WPNuxt composables such as:
```ts
const { data: posts } = await usePosts()
const { data: page } = await usePageByUri({ uri: route.path })
```

For polymorphic WordPress routes, prefer the WPNuxt node-by-URI flow and narrow the generated union type.

## Custom data
Put custom operations in `extend/queries/*.gql`. Keep operations focused on the fields the UI needs. Let WPNuxt generate the composable and TypeScript types.

## Gutenberg
When Gutenberg controls page content/layout:
1. install/configure `@wpnuxt/blocks`;
2. render with its block renderer;
3. override known block components centrally;
4. keep visual styling aligned with the frontend design system.

Do not parse block HTML manually when a supported block representation exists.

## HTML
Use WPNuxt's sanitized HTML directive for intentional WordPress HTML. Do not use raw `v-html` as the default content renderer.

## ACF/custom fields
Normalize ACF scalar and connection shapes before they reach presentational components. Use WPNuxt helpers/generated types when available.

## Authentication
Public marketing sites should remain anonymous by default. Add `@wpnuxt/auth` only when the product requires authenticated WordPress behavior. Keep secrets server-side.
