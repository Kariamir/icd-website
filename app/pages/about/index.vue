<script setup lang="ts">
// Route /about — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'درباره ثاخت — هلدینگ ساختمانی ثاخت',
  description: 'تاریخچه، کارنامه، خانواده ثاخت، هیات‌مدیره، کمیته‌ها و حاکمیت شرکتی.',
})
</script>

<template>
  <AboutStitchView />
</template>
