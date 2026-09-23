<script setup lang="ts">
import type { ArticleCardViewModel } from '~/types/content'

const props = defineProps<{
  title: string
  description?: string
  articles: ArticleCardViewModel[]
  hubHref: string
}>()
</script>

<template>
  <div class="article-index">
    <header class="article-index__header">
      <h1 class="article-index__title">{{ props.title }}</h1>
      <p v-if="props.description" class="article-index__description">{{ props.description }}</p>
    </header>

    <div v-if="props.articles.length" class="article-index__grid">
      <NuxtLink
        v-for="item in props.articles"
        :key="item.slug"
        :to="`${hubHref}/${item.slug}`"
        class="article-index__card"
      >
        <div class="article-index__media">
          <BaseImage v-if="item.image" :src="item.image.src" :alt="item.image.alt || item.title" />
        </div>
        <div class="article-index__body">
          <div class="article-index__meta">
            <span v-if="item.category">{{ item.category }}</span>
            <span v-if="item.date">{{ item.date }}</span>
          </div>
          <h2 class="article-index__card-title">{{ item.title }}</h2>
          <p v-if="item.excerpt" class="article-index__excerpt">{{ item.excerpt }}</p>
        </div>
      </NuxtLink>
    </div>

    <p v-else class="article-index__empty">مطلبی برای نمایش وجود ندارد.</p>
  </div>
</template>

<style scoped>
.article-index__header { padding-block: var(--space-4) var(--space-3); border-block-end: 2px solid var(--color-ink); margin-block-end: var(--space-4); }
.article-index__title { font: var(--text-h2); }
.article-index__description { font: var(--text-body); color: var(--color-text-muted); margin-block-start: var(--space-1); max-inline-size: 60ch; }

.article-index__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  padding-block-end: var(--space-8);
}
@media (min-width: 768px) { .article-index__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1200px) { .article-index__grid { grid-template-columns: repeat(3, 1fr); } }

.article-index__card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: inherit;
  text-decoration: none;
  transition: border-color var(--motion-duration) var(--motion-ease);
}
.article-index__card:hover { border-color: var(--color-primary); }
.article-index__media { aspect-ratio: 16 / 9; background: var(--color-surface); overflow: hidden; }
.article-index__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.article-index__body { padding: var(--space-2); display: flex; flex-direction: column; gap: 6px; }
.article-index__meta { display: flex; gap: var(--space-2); font: var(--text-label); color: var(--color-primary); }
.article-index__card-title { font: var(--text-h3); }
.article-index__excerpt { font: var(--text-body-sm); color: var(--color-text-muted); }
.article-index__empty { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-6); }
</style>
