<script setup lang="ts">
import type { EditorialPageViewModel } from '~/utils/editorialData'

defineProps<{ page: EditorialPageViewModel }>()
</script>

<template>
  <article class="static-editorial">
    <header class="static-editorial__header">
      <span v-if="page.eyebrow" class="static-editorial__eyebrow">{{ page.eyebrow }}</span>
      <h1 class="static-editorial__title">{{ page.title }}</h1>
      <p class="static-editorial__intro">{{ page.intro }}</p>
    </header>

    <nav v-if="page.sections.length > 1" class="static-editorial__toc" aria-label="دسترسی سریع به سرفصل‌ها">
      <span class="static-editorial__toc-label">دسترسی سریع:</span>
      <a v-for="section in page.sections" :key="section.id" :href="`#${section.id}`">{{ section.heading }}</a>
    </nav>

    <section
      v-for="section in page.sections"
      :id="section.id"
      :key="section.id"
      class="static-editorial__section"
    >
      <h2>{{ section.heading }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="static-editorial__body" v-html="section.bodyHtml" />
    </section>
  </article>
</template>

<style scoped>
.static-editorial__header { max-inline-size: 760px; padding-block: var(--space-6) var(--space-4); }
.static-editorial__eyebrow {
  display: inline-block;
  padding: 4px var(--space-2);
  background: var(--color-tint);
  color: var(--color-primary);
  font: var(--text-label);
  margin-block-end: var(--space-2);
}
.static-editorial__title { font: var(--text-h1-mobile); margin-block-end: var(--space-2); }
@media (min-width: 768px) { .static-editorial__title { font: var(--text-h2); } }
.static-editorial__intro { font: var(--text-body); color: var(--color-text-muted); }

.static-editorial__toc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  margin-block-end: var(--space-6);
}
.static-editorial__toc-label { font: var(--text-label); margin-inline-end: var(--space-1); }
.static-editorial__toc a {
  padding: 6px var(--space-2);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  text-decoration: none;
  font: var(--text-body-sm);
}
.static-editorial__toc a:hover { color: var(--color-primary); border-color: var(--color-primary); }

.static-editorial__section { padding-block-end: var(--space-6); scroll-margin-block-start: var(--space-8); }
.static-editorial__section h2 { font: var(--text-h3); margin-block-end: var(--space-2); border-inline-start: 4px solid var(--color-primary); padding-inline-start: var(--space-1); }
.static-editorial__body { font: var(--text-body); color: var(--color-text); }
.static-editorial__body :deep(p) { margin-block-end: var(--space-2); }
.static-editorial__body :deep(ul) { padding-inline-start: var(--space-3); display: flex; flex-direction: column; gap: 6px; }
</style>
