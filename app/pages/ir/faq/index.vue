<script setup lang="ts">
import { irNav } from '~/utils/routes'
import { irFaqCenter } from '~/utils/faqData'

useSeoMeta({
  title: 'پرسش‌های متداول سهامداران — ثاخت',
  description: 'پاسخ به پرسش‌های سهامداران، خریداران و شرکای تجاری درباره سود، مجامع عمومی، پیش‌فروش و حاکمیت شرکتی هلدینگ ثاخت.',
})
</script>

<template>
  <div>
    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />
    <FaqCenter :config="irFaqCenter" />
  </div>
</template>
