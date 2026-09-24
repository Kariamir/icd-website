<script setup lang="ts">
// `02a-index-card-grid` results bar: live result count on one side, sort
// pills («مرتب‌سازی بر اساس») on the other.
defineProps<{
  count: number
  total: number
  noun: string
  totalNote?: string
  sortOptions: { value: string; label: string }[]
}>()

const sort = defineModel<string>('sort', { required: true })
const fa = (n: number) => n.toLocaleString('fa-IR')
</script>

<template>
  <div class="index-results">
    <p class="index-results__count" aria-live="polite">
      <span class="index-results__pulse" aria-hidden="true" />
      <strong>نمایش {{ fa(count) }} {{ noun }}</strong>
      <span class="index-results__total">({{ totalNote ?? `از مجموع ${fa(total)} ${noun}` }})</span>
    </p>
    <div class="index-results__sort" role="group" aria-label="مرتب‌سازی">
      <span class="index-results__sort-label">مرتب‌سازی بر اساس:</span>
      <button
        v-for="o in sortOptions"
        :key="o.value"
        type="button"
        class="index-results__pill"
        :class="{ 'is-active': sort === o.value }"
        :aria-pressed="sort === o.value"
        @click="sort = o.value"
      >
        {{ o.label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.index-results {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-block-end: var(--space-3);
}
.index-results__count { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font: var(--text-body-sm); }
.index-results__count strong { font-weight: 700; font-size: 15px; }
.index-results__total { color: var(--color-text-muted); font-size: 13px; }
.index-results__pulse { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--color-primary); animation: index-pulse 2s ease-in-out infinite; }
@keyframes index-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .index-results__pulse { animation: none; } }

.index-results__sort { display: flex; align-items: center; gap: 8px; overflow-x: auto; max-inline-size: 100%; padding-block-end: 2px; }
.index-results__sort-label { font: var(--text-body-sm); font-size: 13px; color: var(--color-text-muted); flex-shrink: 0; }
.index-results__pill {
  flex-shrink: 0;
  padding: 7px 15px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text);
  font: var(--text-label);
  font-size: 12px;
  font-family: inherit;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}
.index-results__pill:hover { border-color: var(--color-primary); }
.index-results__pill.is-active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-white); }
</style>
