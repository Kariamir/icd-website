<script setup lang="ts">
/*
 * Renders an icon from app/utils/icons.ts. Decorative by default (aria-hidden);
 * pass `label` when the icon is the only content of a control, e.g. an
 * icon-only button, so assistive tech announces it.
 */
import { icons, type IconName } from '~/utils/icons'

const props = withDefaults(defineProps<{
  name: IconName
  label?: string
  strokeWidth?: number
}>(), {
  label: undefined,
  strokeWidth: 1.6,
})

const d = computed(() => icons[props.name])
</script>

<template>
  <svg
    class="inline-block size-[1.25em] shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
  ><path :d="d" /></svg>
</template>
