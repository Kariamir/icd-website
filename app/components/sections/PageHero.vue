<script setup lang="ts">
/*
 * Page hero in the approved Stitch language: full-bleed image under an ink
 * scrim, breadcrumb and title anchored low and right.
 *
 * `plain` drops the image for the IR cluster, which is exempt from the
 * image-led style (ADR-008, sitemap §14.1): a solid ink band, compact.
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
}>(), {
  subtitle: undefined,
  eyebrow: undefined,
  image: '/img/ph/skyline-2.svg',
  breadcrumb: () => [],
  size: 'md',
  plain: false,
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
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
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
      <div class="max-w-3xl border-r-4 border-primary-container pr-6">
        <p v-if="eyebrow" class="mb-2 text-label-lg font-label-lg text-brand-tint">{{ eyebrow }}</p>
        <h1 class="text-headline-lg-mobile font-headline-lg text-surface-container-lowest md:text-headline-xl">{{ title }}</h1>
        <p v-if="subtitle" class="mt-3 max-w-2xl text-body-lg text-surface-dim">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.default" class="mt-8">
        <slot />
      </div>
    </div>
  </section>
</template>
