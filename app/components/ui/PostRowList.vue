<!--
  The rows that run beside a lead story.

  WHY THIS IS A COMPONENT AND NOT MARKUP IN TWO PLACES (ADR-032): the owner
  asked for the HR section to look like the homepage's news section, and the
  only way two things stay looking alike is for them to be one thing.

  THE DIVIDER BUG THIS FIXES. The rows used to be `divide-y` on the <ul> with
  `py-5 first:pt-0` on the <a> inside each <li>. Tailwind's `first:` matches
  the first child of the element's own parent — and each <a> is the only
  child of its <li> — so EVERY row lost its top padding, not just the first.
  The rule, drawn on the <li>'s top border, therefore sat flush against the
  photograph above it: measured at 0px of clearance, which is what reads as
  a line touching the content.

  The spacing now lives on the <li>, where `first:` and `last:` mean what
  they say, and it is symmetric: equal air above and below every rule, none
  wasted at the two ends of the column. The thumbnail column is a fixed
  track, so every row's text starts on the same vertical line whatever the
  photograph's aspect ratio.
-->
<script setup lang="ts">
import type { Post } from '~/utils/posts'

defineProps<{
  posts: Post[]
  /** Per-slug label overriding the category, keyed by post slug. */
  badges?: Record<string, string>
  /** Fallback label resolver, normally the category's name. */
  label?: (post: Post) => string
}>()
</script>

<template>
  <ul class="flex flex-col">
    <li
      v-for="post in posts"
      :key="post.slug"
      class="border-t border-border py-6 first:border-t-0 first:pt-0 last:pb-0 md:py-7"
    >
      <NuxtLink
        :to="`/media/${post.slug}`"
        class="group grid grid-cols-[6rem_1fr] items-center gap-x-5 md:grid-cols-[7rem_1fr]"
      >
        <div class="aspect-[4/3] overflow-hidden rounded-md bg-surface-alt">
          <img
            :src="post.image"
            :alt="post.title"
            loading="lazy"
            class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          >
        </div>
        <div class="min-w-0">
          <p class="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-label-md">
            <span class="font-label-lg text-primary-container">{{ badges?.[post.slug] ?? label?.(post) }}</span>
            <span class="text-secondary">{{ post.date }}</span>
          </p>
          <h3 class="text-body-md font-bold leading-relaxed text-ink transition-colors group-hover:text-primary-container md:text-body-lg">{{ post.title }}</h3>
        </div>
      </NuxtLink>
    </li>
  </ul>
</template>
