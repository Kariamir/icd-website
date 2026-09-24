<script setup lang="ts">
import { salesFaqCenter } from '~/utils/faqData'

useSeoMeta({
  title: 'راهنمای گام‌به‌گام خرید و قرارداد — ثاخت',
  description: 'راهنمای پیش‌خرید، مراحل قرارداد، شرایط پرداخت و تحویل واحدهای هلدینگ ثاخت.',
})
</script>

<template>
  <FaqCenter :config="salesFaqCenter" />
</template>
