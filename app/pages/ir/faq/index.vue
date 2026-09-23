<script setup lang="ts">
import { irFaqGroups } from '~/utils/faqData'

useSeoMeta({
  title: 'پرسش‌های متداول سهامداران — ثاخت',
  description: 'پاسخ به پرسش‌های سهامداران درباره سود، مجامع عمومی و حاکمیت شرکتی هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <div class="faq-page">
      <header class="faq-page__header">
        <h1>پرسش‌های متداول سهامداران</h1>
        <p>پاسخ شفاف و دسته‌بندی‌شده به پرسش‌های حقوقی، مجمع عمومی و سامانه سهامداری کدال.</p>
      </header>
      <FaqAccordion :groups="irFaqGroups" />
    </div>
  </BaseContainer>
</template>

<style scoped>
.faq-page__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.faq-page__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.faq-page__header p { font: var(--text-body); color: var(--color-text-muted); }
.faq-page { padding-block-end: var(--space-8); }
</style>
