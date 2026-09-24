<script setup lang="ts">
// Generic hub card grid — styled as part of the `02a-index-card-grid` card
// family (image, title, description, arrow footer). Props unchanged.
import type { HubCardViewModel } from '~/types/content'
defineProps<{ cards: HubCardViewModel[]; columns?: 2 | 3 | 4 }>()
</script>

<template>
  <div class="card-grid" :style="{ '--cols': columns ?? 3 }">
    <NuxtLink v-for="card in cards" :key="card.href" :to="card.href" class="card-grid__item">
      <div v-if="card.image" class="card-grid__media">
        <BaseImage :src="card.image.src" :alt="card.image.alt" />
      </div>
      <div class="card-grid__body">
        <h3 class="card-grid__title">{{ card.title }}</h3>
        <p class="card-grid__desc">{{ card.description }}</p>
        <span class="card-grid__more">
          مشاهده
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  gap: var(--space-4);
}
.card-grid__item {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1);
}
.card-grid__item:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -10px rgb(4 28 44 / 14%); }
.card-grid__media { aspect-ratio: 16 / 10; background: var(--color-surface-alt); overflow: hidden; }
.card-grid__media :deep(img) { block-size: 100%; inline-size: 100%; object-fit: cover; transition: transform 500ms ease-out; }
.card-grid__item:hover .card-grid__media :deep(img) { transform: scale(1.05); }
.card-grid__body { flex: 1; display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); }
.card-grid__title { font: var(--text-h3); font-weight: 700; }
.card-grid__desc { font: var(--text-body-sm); color: var(--color-text-muted); }
.card-grid__more { display: inline-flex; align-items: center; gap: 6px; margin-block-start: auto; padding-block-start: var(--space-1); font: var(--text-label); font-size: 13px; color: var(--color-primary); }

@media (max-width: 900px) {
  .card-grid { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .card-grid__item, .card-grid__media :deep(img) { transition: none; }
  .card-grid__item:hover { transform: none; }
}
</style>
