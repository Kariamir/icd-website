// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: true },

  // ADR-002 (docs/decisions.md): @wpnuxt/core hard-requires a reachable
  // WPGraphQL endpoint to boot `dev`/`build`, not just to introspect types.
  // No WordPress backend exists yet for this project, so the WPNuxt modules
  // are only registered once WPNUXT_WORDPRESS_URL is set — this lets the
  // frontend be built and previewed against local/mock data now, and
  // switched on the moment staging WordPress is live, with no other code
  // change required.
  modules: [
    ...(process.env.WPNUXT_WORDPRESS_URL ? ['@wpnuxt/core', '@wpnuxt/blocks'] : []),
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
    },
  },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/main.css',
  ],

  // Component subfolders (ui/sections/wordpress) are a required layer
  // boundary per docs/wpnuxt-ui-boilerplate-full project-structure.md, but
  // Nuxt's default auto-import prefixes nested folder names onto the
  // component tag (e.g. `sections/SiteHeader.vue` -> <SectionsSiteHeader>).
  // Disable that prefixing so components keep their own PascalCase name.
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/wordpress', pathPrefix: false },
  ],

  // The `wpNuxt` config key only type-checks/validates once @wpnuxt/core is
  // actually registered above (see ADR-002) — spread it in conditionally so
  // `nuxt typecheck` stays green with no backend configured yet.
  ...(process.env.WPNUXT_WORDPRESS_URL ? {
    wpNuxt: {
      wordpressUrl: process.env.WPNUXT_WORDPRESS_URL,
      cache: {
        enabled: true,
        maxAge: 300,
        swr: true,
      },
    },
  } : {}),

  fonts: {
    // Vazirmatn (fa) + a Latin pairing for the `en` locale, self-hosted at build time —
    // never fetched from a runtime CDN (Google Fonts is blocked from inside Iran; see
    // docs/02-build-checklist.md Phase 0).
    families: [
      { name: 'Vazirmatn', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Work Sans', provider: 'google', weights: [400, 500, 600, 700] },
    ],
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: { stylistic: false },
  },
})
