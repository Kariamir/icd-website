// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

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
    // '@nuxt/fonts' removed: it resolved Vazirmatn/Work Sans from the Google
    // provider at dev/build time, which fails from inside Iran and silently
    // fell back to a system font. Fonts are now self-hosted in public/fonts
    // with plain @font-face rules in app/assets/css/main.css.
    '@nuxt/eslint',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      link: [
        { rel: 'preload', href: '/fonts/Vazirmatn-Variable.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
      ],
    },
  },

  css: [
    '~/assets/css/tokens.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css',
  ],

  // ADR-013: the approved designs are authored in Tailwind utilities. The
  // bridge in app/assets/css/tailwind.css maps those class names onto this
  // project's own tokens, so no Material colour or 0px corner survives the
  // port. Tailwind is loaded as a Vite plugin (v4 needs no PostCSS config).
  vite: {
    plugins: [tailwindcss()],
  },

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

  // Retired and merged routes (ADR-005, ADR-009, ADR-015). Permanent
  // redirects so old links and bookmarks land on the page that replaced them.
  routeRules: {
    // The map is a section on /projects now, not a page of its own (ADR-023).
    '/projects/map': { redirect: { to: '/projects', statusCode: 301 } },
    '/sales/available': { redirect: { to: '/sales', statusCode: 301 } },
    '/sales/pre-sale': { redirect: { to: '/sales?status=pre-sale', statusCode: 301 } },
    '/ir': { redirect: { to: '/ir/financials', statusCode: 301 } },
    // The four IR sub-pages are now sections on the consolidated page (ADR-016).
    '/ir/symbol': { redirect: { to: '/ir/financials#symbol', statusCode: 301 } },
    '/ir/calendar': { redirect: { to: '/ir/financials#calendar', statusCode: 301 } },
    // The #governance section was removed on 2026-10-18; its documents are in
    // the archive on the same page, which is where this now lands.
    '/ir/governance': { redirect: { to: '/ir/financials#documents-archive', statusCode: 301 } },
    '/ir/faq': { redirect: { to: '/ir/financials#faq', statusCode: 301 } },
    // About was merged in ADR-004 but its old URLs were never redirected.
    '/about/history': { redirect: { to: '/about#history', statusCode: 301 } },
    '/about/board': { redirect: { to: '/about#board', statusCode: 301 } },
    '/about/board/**': { redirect: { to: '/about#board', statusCode: 301 } },
    // #vision was removed at the owner's request (ADR-024); its two old
    // URLs land on the committees section, the nearest surviving content.
    '/about/vision': { redirect: { to: '/about#committees', statusCode: 301 } },
    '/about/org-chart': { redirect: { to: '/about#committees', statusCode: 301 } },
    '/about/honors': { redirect: { to: '/about#history', statusCode: 301 } },
    '/about/csr': { redirect: { to: '/about#committees', statusCode: 301 } },
    '/about/ceo': { redirect: { to: '/about#contact', statusCode: 301 } },
    '/media/news': { redirect: { to: '/media?category=news', statusCode: 301 } },
    '/media/news/**': { redirect: { to: '/media?category=news', statusCode: 301 } },
    '/media/stories': { redirect: { to: '/media?category=stories', statusCode: 301 } },
    '/media/stories/**': { redirect: { to: '/media?category=stories', statusCode: 301 } },
    '/media/reports': { redirect: { to: '/ir/financials?group=committee-reports', statusCode: 301 } },
    '/media/reports/**': { redirect: { to: '/ir/financials?group=committee-reports', statusCode: 301 } },
    // /careers becomes «امور اداری و منابع انسانی» at /hr, and the terms page
    // is merged into the privacy page — one destination each (ADR-024).
    '/careers': { redirect: { to: '/hr', statusCode: 301 } },
    '/careers/**': { redirect: { to: '/hr', statusCode: 301 } },
    '/legal/terms': { redirect: { to: '/legal/privacy', statusCode: 301 } },
  },

  typescript: {
    strict: true,
  },

  eslint: {
    config: { stylistic: false },
  },
})
