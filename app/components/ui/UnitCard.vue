<script setup lang="ts">
import type { UnitViewModel } from '~/types/content'
import { unitStatusLabels } from '~/utils/unitsData'

defineProps<{ unit: UnitViewModel }>()
</script>

<template>
  <NuxtLink :to="`/sales/units/${unit.id}`" class="unit-card">
    <div class="unit-card__media">
      <BaseImage v-if="unit.floorPlanImage" :src="unit.floorPlanImage.src" :alt="unit.floorPlanImage.alt || unit.projectTitle" />
      <span class="unit-card__status" :class="`unit-card__status--${unit.status}`">{{ unitStatusLabels[unit.status] }}</span>
    </div>
    <div class="unit-card__body">
      <h3 class="unit-card__title">{{ unit.projectTitle }} — {{ unit.floor }}</h3>
      <p class="unit-card__meta">{{ unit.area }}<template v-if="unit.orientation"> · {{ unit.orientation }}</template></p>
      <p class="unit-card__price">{{ unit.priceLabel }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.unit-card { display: block; text-decoration: none; color: inherit; background: var(--color-white); border: 1px solid var(--color-border); transition: border-color var(--motion-duration) var(--motion-ease); }
.unit-card:hover { border-color: var(--color-primary); }
.unit-card__media { position: relative; aspect-ratio: 4 / 3; background: var(--color-surface); overflow: hidden; }
.unit-card__media :deep(img) { block-size: 100%; inline-size: 100%; object-fit: cover; }
.unit-card__status {
  position: absolute;
  inset-block-start: var(--space-1);
  inset-inline-start: var(--space-1);
  padding: 4px var(--space-1);
  font: var(--text-label);
  background: var(--badge-upcoming-bg);
  color: var(--badge-upcoming-text);
}
.unit-card__status--available { background: var(--color-status-success); color: var(--color-white); }
.unit-card__status--reserved { background: var(--color-tint); color: var(--color-primary); }
.unit-card__status--sold { background: var(--color-ink); color: var(--color-white); }
.unit-card__body { padding: var(--space-2); display: flex; flex-direction: column; gap: 4px; }
.unit-card__title { font: var(--text-h3); }
.unit-card__meta { font: var(--text-body-sm); color: var(--color-text-muted); }
.unit-card__price { font: var(--text-label); color: var(--color-primary); }
</style>
