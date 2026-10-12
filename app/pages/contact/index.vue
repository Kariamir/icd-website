<script setup lang="ts">
// Route /contact — «تماس با ما» (sitemap §9). Replaces the former
// "contact the managers" lead page; the CEO channel was retired (ADR-010).
useSeoMeta({
  title: 'تماس با ما — هلدینگ ساختمانی ثاخت',
  description: 'شماره تماس، نشانی دفاتر و مسیر مستقیم واحدهای فروش، امور سهامداران، شکایات و استخدام هلدینگ ثاخت.',
})
</script>

<template>
  <ContactView />
</template>
