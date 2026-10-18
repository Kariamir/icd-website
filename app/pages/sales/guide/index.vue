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
    <!--
      The buying guide keeps its search box but loses the «جستجوهای پرتکرار»
      chips and the category tab strip (owner's request, 2026-10-18): a reader
      here is working through the purchase steps in order, and a filter that
      hides most of them works against that.
    -->
    <FaqCenter :config="salesFaqCenter" :popular="false" :filterable="false" />
  </div>
</template>
