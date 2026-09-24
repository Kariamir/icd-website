<script setup lang="ts">
// Labelled select for the `02a-index-card-grid` filter panel (label on top
// per design-system §4 forms rule, small context icon, custom chevron).
export type IndexGridIcon = 'location' | 'status' | 'type' | 'person' | 'calendar' | 'briefcase' | 'award' | 'building' | 'layers'

defineProps<{
  label: string
  icon?: IndexGridIcon
  options: { value: string; label: string }[]
}>()

const model = defineModel<string>({ required: true })
const id = useId()

const icons: Record<IndexGridIcon, string> = {
  location: 'M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12ZM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  status: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z',
  type: 'M4 21V5l8-3 8 3v16M9 21v-5h6v5M8 8h2M14 8h2M8 12h2M14 12h2',
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
  calendar: 'M4 6h16v15H4zM4 10h16M9 3v4M15 3v4',
  briefcase: 'M3 8h18v12H3zM9 8V5h6v3M3 13h18',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.5 14 7 22l5-3 5 3-1.5-8',
  building: 'M3 21h18M5 21V7l7-4 7 4v14M10 21v-4h4v4',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5',
}
</script>

<template>
  <div class="index-select">
    <label :for="id" class="index-select__label">
      <span>{{ label }}</span>
      <svg v-if="icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[icon]" /></svg>
    </label>
    <div class="index-select__control">
      <select :id="id" v-model="model">
        <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <svg class="index-select__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </div>
  </div>
</template>

<style scoped>
.index-select { display: flex; flex-direction: column; gap: 8px; }
.index-select__label { display: flex; align-items: center; justify-content: space-between; font: var(--text-label); font-size: 12px; color: var(--color-text-muted); }
.index-select__label svg { color: var(--color-text-muted); opacity: 0.6; }
.index-select__control { position: relative; }
.index-select__control select {
  inline-size: 100%;
  appearance: none;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  padding: 12px 16px;
  padding-inline-end: 40px;
  font: var(--text-body-sm);
  font-size: 15px;
  font-family: inherit;
  color: var(--color-text);
  cursor: pointer;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.index-select__control select:hover { border-color: var(--color-text-muted); }
.index-select__control select:focus-visible { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-tint); }
.index-select__chevron { position: absolute; inset-inline-end: 14px; inset-block-start: 50%; transform: translateY(-50%); color: var(--color-text-muted); pointer-events: none; }
</style>
