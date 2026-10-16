<script setup lang="ts">
/*
 * A subsidiary's own logo, with the typographic monogram as the fallback.
 *
 * The client's logos (Asset Icd) are 150×150 PNGs — small for the sizes this
 * is used at, so they are rendered no larger than they were supplied and
 * never upscaled past that. Higher-resolution or vector marks are on the
 * asset list; when they arrive, nothing here changes but the files.
 */
import type { Company } from '~/utils/catalog'

withDefaults(defineProps<{
  company: Company
  /** Height of the logo box in px. Kept at or under the source's 150px. */
  size?: number
}>(), { size: 92 })
</script>

<template>
  <span class="flex flex-col items-center justify-center text-center">
    <img
      v-if="company.logo"
      :src="company.logo"
      :alt="company.name"
      loading="lazy"
      class="w-auto max-w-full object-contain"
      :style="{ height: `${size}px` }"
    >
    <template v-else>
      <span class="text-2xl font-extrabold text-ink md:text-3xl">{{ company.mark }}</span>
      <span class="mt-1 text-[10px] font-bold uppercase tracking-widest text-secondary">{{ company.markSub }}</span>
    </template>
  </span>
</template>
