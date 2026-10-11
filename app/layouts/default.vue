<script setup lang="ts">
/*
 * One layout for every route (ADR-013).
 *
 * The approved designs each shipped a full page including chrome. Mounting
 * them as-is produced two headers per page, so the ported views were first
 * given `layout: false` — which left the home page on the old SiteHeader and
 * every other page on its own inline copy. Two different menus.
 *
 * The chrome now lives here once; the ported views are body-only.
 */
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-ink">
    <SiteHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
