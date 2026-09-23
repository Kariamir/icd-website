<script setup lang="ts">
// Project status badge — the four values are fixed by
// docs/design-system-icd3d.md §2 / docs/01-sitemap.md §5.1. Do not invent new
// statuses or colors here; extend the design system doc first.
export type ProjectStatus = 'upcoming' | 'under-construction' | 'operating' | 'completed'

const props = defineProps<{ status: ProjectStatus }>()

const labels: Record<ProjectStatus, string> = {
  'upcoming': 'آتی',
  'under-construction': 'در حال ساخت',
  'operating': 'در حال بهره‌برداری',
  'completed': 'تکمیل‌شده',
}
const label = computed(() => labels[props.status])
</script>

<template>
  <span class="status-badge" :class="`status-badge--${status}`">{{ label }}</span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding-block: 4px;
  padding-inline: var(--space-2);
  font: var(--text-label);
  border-radius: var(--radius-pill);
}
.status-badge--upcoming {
  background: var(--badge-upcoming-bg);
  color: var(--badge-upcoming-text);
  border: 1px solid var(--color-border);
}
.status-badge--under-construction {
  background: var(--badge-under-construction-bg);
  color: var(--badge-under-construction-text);
}
.status-badge--operating {
  background: var(--badge-operating-bg);
  color: var(--badge-operating-text);
}
.status-badge--completed {
  background: var(--badge-completed-bg);
  color: var(--badge-completed-text);
}
</style>
