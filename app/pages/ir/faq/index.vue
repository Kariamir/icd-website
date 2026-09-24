<script setup lang="ts">
import { irFaqCenter } from '~/utils/faqData'

useSeoMeta({
  title: 'پرسش‌های متداول سهامداران — ثاخت',
  description: 'پاسخ به پرسش‌های سهامداران، خریداران و شرکای تجاری درباره سود، مجامع عمومی، پیش‌فروش و حاکمیت شرکتی هلدینگ ثاخت.',
})
</script>

<template>
  <FaqCenter :config="irFaqCenter" />
</template>
