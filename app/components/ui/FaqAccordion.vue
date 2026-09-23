<script setup lang="ts">
import type { FaqGroupViewModel } from '~/utils/faqData'

defineProps<{ groups: FaqGroupViewModel[] }>()
</script>

<template>
  <div class="faq-accordion">
    <div v-for="group in groups" :key="group.key" class="faq-accordion__group">
      <h2 class="faq-accordion__group-title">{{ group.title }}</h2>
      <details
        v-for="(item, index) in group.items"
        :key="item.question"
        class="faq-accordion__item"
        :open="group.key === groups[0]?.key && index === 0"
      >
        <summary class="faq-accordion__question">
          <span>{{ item.question }}</span>
          <span class="faq-accordion__icon" aria-hidden="true">+</span>
        </summary>
        <p class="faq-accordion__answer">{{ item.answer }}</p>
      </details>
    </div>
  </div>
</template>

<style scoped>
.faq-accordion { display: flex; flex-direction: column; gap: var(--space-6); }
.faq-accordion__group { display: flex; flex-direction: column; gap: var(--space-1); }
.faq-accordion__group-title {
  font: var(--text-h3);
  padding-block-end: var(--space-1);
  border-block-end: 1px solid var(--color-border);
  margin-block-end: var(--space-1);
}
.faq-accordion__item {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.faq-accordion__item + .faq-accordion__item { margin-block-start: var(--space-1); }
.faq-accordion__item[open] { border-color: var(--color-primary); }
.faq-accordion__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font: var(--text-label);
  color: var(--color-text);
  cursor: pointer;
  list-style: none;
}
.faq-accordion__question::-webkit-details-marker { display: none; }
.faq-accordion__item[open] .faq-accordion__question { color: var(--color-primary); }
.faq-accordion__icon {
  flex-shrink: 0;
  inline-size: 28px;
  block-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-weight: 700;
  transition: transform var(--motion-duration) var(--motion-ease);
}
.faq-accordion__item[open] .faq-accordion__icon {
  background: var(--color-tint);
  color: var(--color-primary);
  transform: rotate(45deg);
}
.faq-accordion__answer {
  padding-inline: var(--space-3);
  padding-block-end: var(--space-3);
  font: var(--text-body-sm);
  color: var(--color-text-muted);
  border-block-start: 1px solid var(--color-border);
  padding-block-start: var(--space-2);
}
</style>
