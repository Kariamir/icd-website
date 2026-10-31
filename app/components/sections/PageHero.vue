<script setup lang="ts">
/*
 * Page hero in the approved Stitch language: full-bleed image under an ink
 * scrim, breadcrumb and title anchored low and right.
 *
 * `plain` drops the image for the IR cluster, which is exempt from the
 * image-led style (ADR-008, sitemap §14.1): a solid ink band, compact.
 *
 * `mark` puts a logo on a light tile beside the title — used by the company
 * pages, where the subsidiary's own mark belongs next to its name. Because
 * the marks are transparent PNGs in whatever colour each company uses, the
 * tile is always light; dropping them straight onto the scrim would lose the
 * dark ones entirely.
 *
 * `faded` dims the photograph so the mark and the name carry the band rather
 * than competing with the building behind them.
 */
interface Crumb { label: string, href?: string }

withDefaults(defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
  image?: string
  breadcrumb?: Crumb[]
  size?: 'lg' | 'md' | 'sm'
  plain?: boolean
  mark?: string
  markAlt?: string
  faded?: boolean
  /**
   * `object-position` for the background photograph. The default centres it,
   * which crops equally top and bottom — wrong when the subject is in the
   * upper half, as on /hr, where centring cut the worker's head off
   * (ADR-028).
   */
  imagePosition?: string
}>(), {
  subtitle: undefined,
  eyebrow: undefined,
  image: '/img/ph/skyline-2.svg',
  breadcrumb: () => [],
  size: 'md',
  plain: false,
  mark: undefined,
  markAlt: '',
  faded: false,
  imagePosition: 'center',
})

const heights = {
  lg: 'min-h-[520px] md:min-h-[600px]',
  md: 'min-h-[400px] md:min-h-[460px]',
  sm: 'min-h-[260px] md:min-h-[300px]',
}
</script>

<template>
  <section
    class="relative flex w-full items-end overflow-hidden bg-ink"
    :class="plain ? 'min-h-[220px] md:min-h-[260px]' : heights[size]"
  >
    <template v-if="!plain">
      <img
        :src="image"
        alt=""
        class="absolute inset-0 size-full object-cover transition-opacity"
        :class="faded ? 'opacity-35' : 'opacity-100'"
        :style="{ objectPosition: imagePosition }"
      >
      <div class="absolute inset-0" :class="faded ? 'bg-gradient-to-t from-ink via-ink/70 to-ink/40' : 'bg-gradient-to-t from-ink via-ink/55 to-ink/10'" />
    </template>
    <div class="relative z-10 mx-auto w-full max-w-[1440px] px-space-lg pb-12 pt-16 md:px-margin md:pb-16">
      <nav v-if="breadcrumb.length" aria-label="مسیر صفحه" class="mb-4">
        <ol class="flex flex-wrap items-center gap-2 text-label-md text-surface-dim">
          <li v-for="(c, i) in breadcrumb" :key="i" class="flex items-center gap-2">
            <NuxtLink v-if="c.href" :to="c.href" class="transition-colors hover:text-surface-container-lowest">{{ c.label }}</NuxtLink>
            <span v-else class="text-surface-container-lowest">{{ c.label }}</span>
            <AppIcon v-if="i < breadcrumb.length - 1" name="chevron_left" class="text-outline" />
          </li>
        </ol>
      </nav>
      <div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
        <span
          v-if="mark"
          class="flex h-24 w-32 shrink-0 items-center justify-center rounded-md bg-surface-container-lowest p-4 shadow-[0_18px_40px_-24px_rgba(4,28,44,0.8)] md:h-28 md:w-40"
        >
          <img :src="mark" :alt="markAlt" class="max-h-full max-w-full object-contain">
        </span>
        <div class="max-w-3xl border-r-4 border-primary-container pr-6">
          <p v-if="eyebrow" class="mb-2 text-label-lg font-label-lg text-brand-tint">{{ eyebrow }}</p>
          <h1 class="text-headline-lg-mobile font-headline-lg text-surface-container-lowest md:text-headline-xl">{{ title }}</h1>
          <p v-if="subtitle" class="mt-3 max-w-2xl text-body-lg text-surface-dim">{{ subtitle }}</p>
        </div>
      </div>
      <div v-if="$slots.default" class="mt-8">
        <slot />
      </div>
    </div>
  </section>
</template>
