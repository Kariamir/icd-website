<!--
  The lead story of a post feed: the photograph full-bleed under a gradient,
  with the category, date, reading time, title and excerpt over it.

  Extracted from the homepage's media block (ADR-032) so that block and the
  «آکادمی و اخبار منابع انسانی» section on /hr are the same component rather
  than two copies that drift. CMS-agnostic: it takes a view model, not a
  query.
-->
<script setup lang="ts">
import type { Post } from '~/utils/posts'
import { faDigits } from '~/utils/format'

defineProps<{
  post: Post
  /** Overrides the category label — /hr shows the HR desk's own kind. */
  badge?: string
  /** Category label, when no `badge` is given. */
  categoryLabel?: string
}>()
</script>

<template>
  <NuxtLink
    :to="`/media/${post.slug}`"
    class="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg bg-ink lg:min-h-[520px]"
  >
    <img
      :src="post.image"
      :alt="post.title"
      class="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
    >
    <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/5" />
    <div class="relative p-7 md:p-10">
      <p class="mb-4 flex flex-wrap items-center gap-3 text-label-md">
        <span class="rounded-pill bg-brand-tint px-3 py-1 font-label-lg text-primary-container">{{ badge ?? categoryLabel }}</span>
        <span class="text-surface-dim">{{ post.date }}</span>
        <span class="text-surface-dim">· {{ faDigits(post.readingMinutes) }} دقیقه مطالعه</span>
      </p>
      <h3 class="mb-4 max-w-2xl text-headline-md font-headline-md leading-snug text-surface-container-lowest md:text-headline-lg">{{ post.title }}</h3>
      <p class="mb-6 max-w-xl text-body-md leading-relaxed text-surface-dim">{{ post.excerpt }}</p>
      <span class="inline-flex items-center gap-2 text-label-lg font-label-lg text-brand-tint">
        ادامه مطلب <AppIcon name="arrow_back" class="transition-transform group-hover:-translate-x-1" />
      </span>
    </div>
  </NuxtLink>
</template>
