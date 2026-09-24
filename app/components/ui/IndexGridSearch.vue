<script setup lang="ts">
// Labelled free-text search field for the `02a-index-card-grid` filter panel.
defineProps<{ label: string; placeholder?: string }>()
const model = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div class="index-search">
    <label :for="id" class="index-search__label">{{ label }}</label>
    <div class="index-search__control">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
      <input :id="id" v-model="model" type="search" :placeholder="placeholder">
      <button v-if="model" type="button" class="index-search__clear" title="پاک کردن" @click="model = ''">×</button>
    </div>
  </div>
</template>

<style scoped>
.index-search { display: flex; flex-direction: column; gap: 8px; }
.index-search__label { font: var(--text-label); font-size: 12px; color: var(--color-text-muted); }
.index-search__control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  padding: 0 14px;
  color: var(--color-text-muted);
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.index-search__control:focus-within { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-tint); }
.index-search__control input { flex: 1; min-inline-size: 0; border: none; outline: none; background: transparent; padding-block: 12px; font: var(--text-body-sm); font-size: 15px; font-family: inherit; color: var(--color-text); }
.index-search__control input::-webkit-search-cancel-button { display: none; }
.index-search__clear { border: none; background: none; cursor: pointer; font-size: 18px; line-height: 1; color: var(--color-text-muted); padding: 0; }
</style>
