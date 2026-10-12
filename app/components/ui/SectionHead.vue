<script setup lang="ts">
/*
 * Section heading in the Stitch pattern: small blue eyebrow, heading, an
 * optional one-line aside on the far side, and a hairline underneath.
 */
withDefaults(defineProps<{
  title: string
  eyebrow?: string
  aside?: string
  tone?: 'light' | 'dark'
  as?: 'h2' | 'h3'
}>(), {
  eyebrow: undefined,
  aside: undefined,
  tone: 'light',
  as: 'h2',
})
</script>

<template>
  <div
    class="mb-10 flex flex-col justify-between gap-3 border-b pb-6 md:mb-12 md:flex-row md:items-end"
    :class="tone === 'dark' ? 'border-surface-container-lowest/15' : 'border-border'"
  >
    <div>
      <p v-if="eyebrow" class="mb-1 text-label-lg font-label-lg text-primary-container" :class="tone === 'dark' && 'text-brand-tint'">{{ eyebrow }}</p>
      <component
        :is="as"
        class="text-headline-md font-headline-md md:text-headline-lg"
        :class="tone === 'dark' ? 'text-surface-container-lowest' : 'text-ink'"
      >{{ title }}</component>
    </div>
    <div class="flex items-center gap-4">
      <p v-if="aside" class="max-w-md text-body-sm" :class="tone === 'dark' ? 'text-surface-dim' : 'text-secondary'">{{ aside }}</p>
      <slot />
    </div>
  </div>
</template>
