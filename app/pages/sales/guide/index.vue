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
      The buying guide draws the questions and nothing that narrows them: no
      search box, no «جستجوهای پرتکرار» chips, no category tab strip (owner's
      request — the chips and tabs on 2026-10-18, the search box on
      2026-11-03, ADR-033). A reader here is working through the purchase
      steps in order, and every control that hid some of them worked against
      that. The site-wide search in the header still finds this page's
      content.
    -->
    <FaqCenter :config="salesFaqCenter" :searchable="false" :popular="false" :filterable="false" />
  </div>
</template>
