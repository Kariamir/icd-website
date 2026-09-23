<script setup lang="ts">
import type { DocumentViewModel } from '~/types/content'

defineProps<{ title: string; description?: string; documents: DocumentViewModel[] }>()
</script>

<template>
  <div class="document-index">
    <header class="document-index__header">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>

    <ul v-if="documents.length" class="document-index__list">
      <li v-for="doc in documents" :key="doc.title" class="document-index__row">
        <div class="document-index__info">
          <span class="document-index__filetype" aria-hidden="true">{{ doc.fileType }}</span>
          <div>
            <h2 class="document-index__title">{{ doc.title }}</h2>
            <span class="document-index__meta">{{ doc.year }} · {{ doc.fileSizeLabel }}</span>
          </div>
        </div>
        <a :href="doc.href" class="document-index__download">دریافت فایل</a>
      </li>
    </ul>
    <p v-else class="document-index__empty">سندی برای نمایش وجود ندارد.</p>
  </div>
</template>

<style scoped>
.document-index__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.document-index__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.document-index__header p { font: var(--text-body); color: var(--color-text-muted); }

.document-index__list { display: flex; flex-direction: column; border: 1px solid var(--color-border); margin-block-end: var(--space-8); }
.document-index__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--color-white);
}
.document-index__row + .document-index__row { border-block-start: 1px solid var(--color-border); }
.document-index__info { display: flex; align-items: center; gap: var(--space-2); }
.document-index__filetype {
  flex-shrink: 0;
  inline-size: 40px;
  block-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-text-muted);
  font: var(--text-label);
}
.document-index__title { font: var(--text-h3); }
.document-index__meta { font: var(--text-body-sm); color: var(--color-text-muted); }
.document-index__download {
  flex-shrink: 0;
  color: var(--color-primary);
  font: var(--text-label);
  text-decoration: none;
  white-space: nowrap;
}
.document-index__download:hover { text-decoration: underline; }
.document-index__empty { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-6); }
</style>
