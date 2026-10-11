<script setup lang="ts">
// Route /search — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'جستجوی جامع پرتال — هلدینگ ساختمانی ثاخت (ICD)',
  description: 'جستجو در آرشیو سایت هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <SearchResultsStitchView />
</template>
