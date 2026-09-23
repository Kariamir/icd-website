<script setup lang="ts">
import { salesGuideGroups } from '~/utils/faqData'

useSeoMeta({
  title: 'راهنمای گام‌به‌گام خرید و قرارداد — ثاخت',
  description: 'راهنمای پیش‌خرید، مراحل قرارداد و شرایط پرداخت واحدهای هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <div class="faq-page">
      <header class="faq-page__header">
        <h1>راهنمای گام‌به‌گام خرید و قرارداد</h1>
        <p>پاسخ به پرسش‌های متداول خریداران درباره مراحل پیش‌خرید، تضامین و شرایط پرداخت.</p>
      </header>
      <FaqAccordion :groups="salesGuideGroups" />
    </div>
  </BaseContainer>
</template>

<style scoped>
.faq-page__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.faq-page__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.faq-page__header p { font: var(--text-body); color: var(--color-text-muted); }
.faq-page { padding-block-end: var(--space-8); }
</style>
