// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    // Bundled Claude Code skill scripts and reference/scaffold material —
    // not application code, not covered by this project's lint rules.
    '.claude/**',
    '.impeccable/**',
    'wpnuxt-ui-boilerplate-full/**',
    'project_detail_page_template/**',
    'design-refs/**',
  ],
})
