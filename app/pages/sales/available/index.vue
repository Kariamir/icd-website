<script setup lang="ts">
// Route /sales/available — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'فروش و پیش‌فروش — هلدینگ ساختمانی ثاخت',
  description: 'واحدهای آماده فروش هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <SalesAvailableView />
</template>
