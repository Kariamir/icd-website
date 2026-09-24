<script setup lang="ts">
// `02a-index-card-grid` pagination: prev / page numbers / next + «صفحه X از Y»
// summary on one side, secondary «بارگذاری بیشتر» button on the other.
const props = defineProps<{
  page: number
  pageCount: number
  lastShownPage: number
  total: number
  noun: string
  canLoadMore: boolean
  loadMoreLabel: string
}>()

const emit = defineEmits<{ go: [page: number]; loadMore: [] }>()
const fa = (n: number) => n.toLocaleString('fa-IR')

// Windowed page list with ellipses once there are more than 7 pages.
const pages = computed<(number | '…')[]>(() => {
  const n = props.pageCount
  if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1)
  const set = new Set([1, n, props.page - 1, props.page, props.page + 1].filter(p => p >= 1 && p <= n))
  const sorted = [...set].sort((a, b) => a - b)
  const out: (number | '…')[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1]! > 1) out.push('…')
    out.push(p)
  })
  return out
})

const isShown = (p: number) => p >= props.page && p <= props.lastShownPage
</script>

<template>
  <nav class="index-pagination" aria-label="صفحه‌بندی">
    <div class="index-pagination__pages">
      <button type="button" class="index-pagination__btn index-pagination__btn--arrow" :disabled="page <= 1" aria-label="صفحه قبل" @click="emit('go', page - 1)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
      </button>
      <template v-for="(p, i) in pages" :key="i">
        <span v-if="p === '…'" class="index-pagination__gap">…</span>
        <button
          v-else
          type="button"
          class="index-pagination__btn"
          :class="{ 'is-active': isShown(p) }"
          :aria-current="p === page ? 'page' : undefined"
          @click="emit('go', p)"
        >
          {{ fa(p) }}
        </button>
      </template>
      <button type="button" class="index-pagination__btn index-pagination__btn--arrow" :disabled="lastShownPage >= pageCount" aria-label="صفحه بعد" @click="emit('go', lastShownPage + 1)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
      </button>
      <span class="index-pagination__summary">صفحه {{ fa(page) }} از {{ fa(pageCount) }} ({{ fa(total) }} {{ noun }})</span>
    </div>
    <button v-if="canLoadMore" type="button" class="index-pagination__more" @click="emit('loadMore')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      {{ loadMoreLabel }}
    </button>
  </nav>
</template>

<style scoped>
.index-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-block-start: var(--space-6);
  padding-block-start: var(--space-4);
  border-block-start: 1px solid var(--color-border);
}
.index-pagination__pages { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.index-pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 40px;
  block-size: 40px;
  padding-inline: 8px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-text);
  font: var(--text-label);
  font-size: 15px;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 160ms ease, border-color 160ms ease;
}
.index-pagination__btn:hover:not(:disabled):not(.is-active) { background: var(--color-surface); }
.index-pagination__btn.is-active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-white); }
.index-pagination__btn--arrow { color: var(--color-text-muted); }
.index-pagination__btn:disabled { opacity: 0.45; cursor: default; }
.index-pagination__gap { color: var(--color-text-muted); padding-inline: 4px; }
.index-pagination__summary { font: var(--text-body-sm); font-size: 13px; color: var(--color-text-muted); margin-inline-start: var(--space-1); }
.index-pagination__more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 30px;
  border: 2px solid var(--color-primary);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-primary);
  font: var(--text-label);
  font-family: inherit;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.index-pagination__more:hover { background: var(--color-tint); }
@media (max-width: 640px) { .index-pagination__more { inline-size: 100%; } }
</style>
