<script setup lang="ts">
import { salesNav } from '~/utils/routes'
import { salesFaqCenter } from '~/utils/faqData'

useSeoMeta({
  title: 'راهنمای گام‌به‌گام خرید و قرارداد — ثاخت',
  description: 'راهنمای پیش‌خرید، مراحل قرارداد، شرایط پرداخت و تحویل واحدهای هلدینگ ثاخت.',
})
</script>

<template>
  <div>
    <SubNav :items="salesNav" label="بخش‌های فروش" />
    <FaqCenter :config="salesFaqCenter" />
  </div>
</template>
