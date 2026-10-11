<script setup lang="ts">
// Route /media/[slug] — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'صفحه تفصیلی مقاله و گزارش تحلیلی — هلدینگ ثاخت',
  description: 'مطلب تحلیلی رسانه ثاخت.',
})
</script>

<template>
  <MediaPostView />
</template>
