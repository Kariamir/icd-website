<script setup lang="ts">
// Route /careers — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'فرصت‌های شغلی و توسعه مسیر حرفه‌ای — هلدینگ ساختمانی ثاخت',
  description: 'فرصت‌های همکاری، مزایا و رفاه کارکنان، آموزش و پرسش‌های متداول.',
})
</script>

<template>
  <CareersView />
</template>
