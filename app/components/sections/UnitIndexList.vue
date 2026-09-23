<script setup lang="ts">
import type { UnitViewModel } from '~/types/content'

defineProps<{ title: string; description?: string; units: UnitViewModel[] }>()
</script>

<template>
  <div class="unit-index">
    <header class="unit-index__header">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>

    <div v-if="units.length" class="unit-index__grid">
      <UnitCard v-for="unit in units" :key="unit.id" :unit="unit" />
    </div>
    <p v-else class="unit-index__empty">واحدی برای نمایش وجود ندارد.</p>
  </div>
</template>

<style scoped>
.unit-index__header { padding-block: var(--space-4) var(--space-4); max-inline-size: 720px; }
.unit-index__header h1 { font: var(--text-h2); margin-block-end: var(--space-2); }
.unit-index__header p { font: var(--text-body); color: var(--color-text-muted); }
.unit-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); padding-block-end: var(--space-8); }
@media (min-width: 768px) { .unit-index__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1200px) { .unit-index__grid { grid-template-columns: repeat(3, 1fr); } }
.unit-index__empty { font: var(--text-body); color: var(--color-text-muted); padding-block: var(--space-6); }
</style>
