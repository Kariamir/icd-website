<script setup lang="ts">
import type { HubCardViewModel } from '~/types/content'
defineProps<{ cards: HubCardViewModel[]; columns?: 2 | 3 | 4 }>()
</script>

<template>
  <div class="card-grid" :style="{ '--cols': columns ?? 3 }">
    <NuxtLink v-for="card in cards" :key="card.href" :to="card.href" class="card-grid__item">
      <div v-if="card.image" class="card-grid__media">
        <BaseImage :src="card.image.src" :alt="card.image.alt" />
      </div>
      <h3 class="card-grid__title">{{ card.title }}</h3>
      <p class="card-grid__desc">{{ card.description }}</p>
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
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  transition: border-color var(--motion-duration) var(--motion-ease);
}
.card-grid__item:hover { border-color: var(--color-primary); }
.card-grid__media { aspect-ratio: 16 / 10; background: var(--color-surface); margin-block-end: var(--space-2); overflow: hidden; border-radius: var(--radius-sm); }
.card-grid__media :deep(img) { block-size: 100%; inline-size: 100%; object-fit: cover; }
.card-grid__title { font: var(--text-h3); margin-block-end: var(--space-1); }
.card-grid__desc { font: var(--text-body-sm); color: var(--color-text-muted); }

@media (max-width: 900px) {
  .card-grid { grid-template-columns: 1fr; }
}
</style>
