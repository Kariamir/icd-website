<script setup lang="ts">
// `02a-index-card-grid` empty state — shown when the active filters match
// nothing; offers a one-click reset (and optional extra actions via slot).
withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: 'موردی مطابق فیلترهای انتخابی یافت نشد',
  text: 'فیلترها را تغییر دهید یا بازنشانی کنید تا نتایج بیشتری نمایش داده شود.',
})
defineEmits<{ reset: [] }>()
</script>

<template>
  <div class="index-empty" role="status">
    <span class="index-empty__icon" aria-hidden="true">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8.5 11h5" /></svg>
    </span>
    <h2 class="index-empty__title">{{ title }}</h2>
    <p class="index-empty__text">{{ text }}</p>
    <div class="index-empty__actions">
      <button type="button" class="index-empty__reset" @click="$emit('reset')">بازنشانی فیلترها</button>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.index-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-1);
  padding: var(--space-8) var(--space-3);
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
}
.index-empty__icon { display: inline-flex; align-items: center; justify-content: center; inline-size: 64px; block-size: 64px; border-radius: 50%; background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-primary); margin-block-end: var(--space-1); }
.index-empty__title { font: var(--text-h3); }
.index-empty__text { font: var(--text-body-sm); color: var(--color-text-muted); max-inline-size: 48ch; }
.index-empty__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1); margin-block-start: var(--space-2); }
.index-empty__reset {
  padding: 11px 24px;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
  font: var(--text-label);
  font-family: inherit;
  cursor: pointer;
}
.index-empty__reset:hover { background: var(--color-primary-hover); }
.index-empty__actions :slotted(a) {
  padding: 10px 22px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  font: var(--text-label);
  text-decoration: none;
}
.index-empty__actions :slotted(a:hover) { background: var(--color-tint); }
</style>
