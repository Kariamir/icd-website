<script setup lang="ts">
/*
 * Project status badge — design-system §2 status table. Four states, all from
 * the ten-colour palette: upcoming = outline grey, under construction = tint,
 * operating = brand blue, completed = ink.
 */
import { projectStatus, type ProjectStatusKey } from '~/utils/catalog'

defineProps<{ status: ProjectStatusKey }>()

const tone: Record<ProjectStatusKey, string> = {
  'upcoming': 'bg-surface-container-lowest text-ink border border-border',
  'under-construction': 'bg-brand-tint text-primary-container',
  'operating': 'bg-primary-container text-on-primary',
  'completed': 'bg-ink text-on-primary',
}
</script>

<template>
  <span class="inline-flex items-center rounded-pill px-3 py-1 text-label-md font-label-md" :class="tone[status]">
    {{ projectStatus[status].short }}
  </span>
</template>
