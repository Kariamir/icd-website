<script setup lang="ts">
import { toFaDigits, type ArticleCardExtended } from '~/utils/articlesData'

// Article card from the `04_article_main` grid: image with topic chip,
// date • reading-time meta, title, two-line excerpt, author + «مطالعه کامل»
// footer. Reused by the article-detail related row and the board profile.
defineProps<{ article: ArticleCardExtended; href: string }>()
</script>

<template>
  <article class="media-card">
    <NuxtLink :to="href" class="media-card__media" tabindex="-1" aria-hidden="true">
      <BaseImage v-if="article.image" :src="article.image.src" :alt="article.image.alt || article.title" />
      <span class="media-card__chip" :class="{ 'media-card__chip--tint': article.audio?.episode }">
        {{ article.topicLabel }}
      </span>
    </NuxtLink>
    <div class="media-card__body">
      <div class="media-card__meta">
        <span>{{ article.date }}</span>
        <span aria-hidden="true">•</span>
        <span v-if="article.audio?.episode" class="media-card__audio">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z"/></svg>
          اپیزود {{ toFaDigits(article.audio.episode) }} — {{ toFaDigits(Math.round(article.audio.durationSec / 60)) }} دقیقه
        </span>
        <span v-else>{{ toFaDigits(article.readingMinutes) }} دقیقه مطالعه</span>
      </div>
      <h3 class="media-card__title">
        <NuxtLink :to="href">{{ article.title }}</NuxtLink>
      </h3>
      <p v-if="article.excerpt" class="media-card__excerpt">{{ article.excerpt }}</p>
    </div>
    <div class="media-card__footer">
      <span class="media-card__author">{{ article.author.name }}</span>
      <NuxtLink :to="href" class="media-card__more">
        مطالعه کامل
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
      </NuxtLink>
    </div>
  </article>
</template>

<style scoped>
.media-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 200ms ease;
}
.media-card:hover { border-color: var(--color-primary); }

.media-card__media { position: relative; display: block; aspect-ratio: 16 / 10; background: var(--color-surface); overflow: hidden; }
.media-card__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 400ms var(--motion-ease); }
.media-card:hover .media-card__media :deep(img) { transform: scale(1.04); }
.media-card__chip {
  position: absolute;
  inset-block-start: 12px;
  inset-inline-start: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 12px;
  font-weight: 700;
}
.media-card__chip--tint { background: var(--color-tint); border-color: var(--color-tint); color: var(--color-primary); }

.media-card__body { padding: var(--space-2) 20px; display: flex; flex-direction: column; gap: var(--space-1); flex: 1; }
.media-card__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; color: var(--color-text-muted); }
.media-card__audio { display: inline-flex; align-items: center; gap: 4px; color: var(--color-primary); font-weight: 600; }
.media-card__title { font: var(--text-h3); }
.media-card__title a { color: var(--color-text); text-decoration: none; transition: color 150ms ease; }
.media-card:hover .media-card__title a { color: var(--color-primary); }
.media-card__excerpt { font: var(--text-body-sm); color: var(--color-text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.media-card__footer { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding: 12px 20px var(--space-2); border-block-start: 1px solid var(--color-surface); }
.media-card__author { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.media-card__more { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 700; color: var(--color-primary); text-decoration: none; }
.media-card__more:hover { text-decoration: underline; }
</style>
