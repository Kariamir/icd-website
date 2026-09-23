<script setup lang="ts">
import { NuxtLink } from '#components'

export interface SimpleIndexItem {
  key: string
  title: string
  meta?: string
  excerpt?: string
  image?: { src: string; alt: string }
  href?: string
}

defineProps<{ title: string; description?: string; items: SimpleIndexItem[] }>()
</script>

<template>
  <div class="simple-index">
    <header class="simple-index__header">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>

    <div v-if="items.length" class="simple-index__grid">
      <component
        :is="item.href ? NuxtLink : 'div'"
        v-for="item in items"
        :key="item.key"
        :to="item.href"
        class="simple-index__card"
      >
        <div v-if="item.image" class="simple-index__media">
          <BaseImage :src="item.image.src" :alt="item.image.alt || item.title" />
        </div>
        <div class="simple-index__body">
          <h2>{{ item.title }}</h2>
          <p v-if="item.meta" class="simple-index__meta">{{ item.meta }}</p>
          <p v-if="item.excerpt" class="simple-index__excerpt">{{ item.excerpt }}</p>
          <slot :item="item" />
        </div>
      </component>
    </div>
    <p v-else class="simple-index__empty">موردی برای نمایش وجود ندارد.</p>
  </div>
</template>

<style scoped>
.simple-index__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.simple-index__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.simple-index__header p { font: var(--text-body); color: var(--color-text-muted); }

.simple-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); padding-block-end: var(--space-8); }
@media (min-width: 640px) { .simple-index__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .simple-index__grid { grid-template-columns: repeat(3, 1fr); } }

.simple-index__card { display: flex; flex-direction: column; background: var(--color-white); border: 1px solid var(--color-border); color: inherit; text-decoration: none; }
.simple-index__media { aspect-ratio: 4 / 3; background: var(--color-surface); overflow: hidden; }
.simple-index__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.simple-index__body { padding: var(--space-2); display: flex; flex-direction: column; gap: 4px; }
.simple-index__body h2 { font: var(--text-h3); }
.simple-index__meta { font: var(--text-label); color: var(--color-primary); }
.simple-index__excerpt { font: var(--text-body-sm); color: var(--color-text-muted); }
.simple-index__empty { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-6); }
</style>
