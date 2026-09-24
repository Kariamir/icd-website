<script setup lang="ts">
// `02a-index-card-grid` filter module: a row of labelled selects (default
// slot), a secondary row (range sliders / search — `secondary` slot) and the
// «اعمال فیلتر» / «بازنشانی» actions. The parent owns the draft state; this
// panel only lays it out and emits `apply` / `reset`.
defineProps<{
  dirty?: boolean
  activeCount?: number
}>()

defineEmits<{ apply: []; reset: [] }>()
</script>

<template>
  <section class="index-filter" aria-label="فیلتر نتایج">
    <form class="index-filter__form" @submit.prevent="$emit('apply')">
      <div class="index-filter__fields">
        <slot />
      </div>
      <div class="index-filter__bottom">
        <div class="index-filter__secondary">
          <slot name="secondary" />
        </div>
        <div class="index-filter__actions">
          <button type="submit" class="index-filter__apply" :class="{ 'is-dirty': dirty }">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 5h18l-7 8.5V19l-4 2v-7.5Z" /></svg>
            اعمال فیلتر
            <span v-if="dirty" class="index-filter__dirty-dot" aria-label="تغییرات اعمال‌نشده" />
          </button>
          <button type="button" class="index-filter__reset" :disabled="!activeCount && !dirty" @click="$emit('reset')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 11A8 8 0 1 0 17.7 17M20 4v7h-7" /></svg>
            بازنشانی
            <span v-if="activeCount" class="index-filter__count">{{ activeCount.toLocaleString('fa-IR') }}</span>
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<style scoped>
.index-filter {
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  margin-block-end: var(--space-4);
}
.index-filter__fields {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  padding-block-end: var(--space-3);
  border-block-end: 1px solid var(--color-surface-alt);
}
@media (min-width: 640px) { .index-filter__fields { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .index-filter__fields { grid-template-columns: repeat(3, 1fr); } }

.index-filter__bottom {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  align-items: center;
  padding-block-start: var(--space-3);
}
@media (min-width: 1024px) { .index-filter__bottom { grid-template-columns: 2fr 1fr; } }
.index-filter__secondary { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 640px) { .index-filter__secondary { grid-template-columns: repeat(2, 1fr); } }
.index-filter__secondary:empty { display: none; }

.index-filter__actions { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-1); flex-wrap: wrap; }
.index-filter__apply,
.index-filter__reset {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font: var(--text-label);
  font-family: inherit;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease;
}
.index-filter__apply {
  position: relative;
  padding: 13px 26px;
  background: var(--color-primary);
  color: var(--color-white);
  border: 1px solid transparent;
}
.index-filter__apply:hover { background: var(--color-primary-hover); }
.index-filter__apply.is-dirty { box-shadow: 0 0 0 3px var(--color-tint); }
.index-filter__dirty-dot {
  position: absolute;
  inset-block-start: 6px;
  inset-inline-end: 10px;
  inline-size: 7px;
  block-size: 7px;
  border-radius: 50%;
  background: var(--color-white);
}
.index-filter__reset {
  padding: 12px 20px;
  background: var(--color-surface);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}
.index-filter__reset:hover:not(:disabled) { background: var(--color-surface-alt); color: var(--color-text); }
.index-filter__reset:disabled { opacity: 0.55; cursor: default; }
.index-filter__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 20px;
  block-size: 20px;
  padding-inline: 6px;
  border-radius: var(--radius-pill);
  background: var(--color-ink);
  color: var(--color-white);
  font-size: 11px;
}

@media (max-width: 640px) {
  .index-filter { padding: var(--space-2); }
  .index-filter__actions > button { flex: 1; }
}
</style>
