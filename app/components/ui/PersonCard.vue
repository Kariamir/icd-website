<script setup lang="ts">
/*
 * One person on a governance surface — the holding's board and executives on
 * /about#board, the committee members and secretaries on /about#committees,
 * and each subsidiary's own board on /companies/[slug] (ADR-024).
 *
 * Before this, three places drew the same idea three different ways. The
 * shape is one card: portrait or monogram, name, role, then whatever
 * attribute rows the caller has. `size` changes the scale, not the anatomy,
 * so a board chair and a committee secretary are recognisably the same
 * object at different weights — which is what lets the secretary be shown
 * smaller without looking like a different component.
 *
 * A person with no supplied photograph gets a MONOGRAM, never a silhouette:
 * a grey outline of a head reads as a missing picture of that specific
 * person, a monogram reads as a design decision.
 */
import { initialsOf } from '~/utils/governanceData'

withDefaults(defineProps<{
  name: string
  role?: string
  image?: string
  /** Secondary line under the role — the legal shareholder, a unit, a title. */
  note?: string
  /** Chips along the card's top edge. */
  badges?: string[]
  /** Attribute rows at the foot. */
  rows?: { label: string, value: string }[]
  size?: 'lg' | 'md' | 'sm'
  tone?: 'light' | 'dark'
  /** Draws the accent rule along the top — used for the chair and the CEO. */
  accent?: boolean
}>(), {
  role: undefined,
  image: undefined,
  note: undefined,
  badges: () => [],
  rows: () => [],
  size: 'md',
  tone: 'light',
  accent: false,
})
</script>

<template>
  <article
    class="person flex h-full flex-col overflow-hidden rounded-lg border"
    :class="[
      tone === 'dark' ? 'border-surface-container-lowest/15 bg-surface-container-lowest' : 'border-border bg-surface-container-lowest',
      accent && 'person--accent',
    ]"
  >
    <!-- portrait -->
    <div
      v-if="image && size !== 'sm'"
      class="overflow-hidden bg-surface-alt"
      :class="size === 'lg' ? 'aspect-[4/5]' : 'aspect-square'"
    >
      <img :src="image" :alt="name" loading="lazy" class="size-full object-cover object-top">
    </div>

    <div :class="size === 'lg' ? 'p-7' : size === 'md' ? 'p-6' : 'p-5'">
      <div v-if="badges.length || (size === 'sm' || !image)" class="mb-4 flex items-start justify-between gap-3">
        <!-- a small portrait, or a monogram when none was supplied -->
        <img
          v-if="image && size === 'sm'"
          :src="image"
          :alt="name"
          loading="lazy"
          class="size-12 shrink-0 rounded-pill object-cover object-top"
        >
        <span
          v-else-if="!image"
          aria-hidden="true"
          class="flex shrink-0 items-center justify-center rounded-pill bg-brand-tint font-bold text-primary-container"
          :class="size === 'sm' ? 'size-10 text-label-lg' : 'size-12 text-body-md'"
        >{{ initialsOf(name) }}</span>
        <span v-else class="shrink-0" />

        <ul v-if="badges.length" class="flex flex-wrap justify-end gap-1.5">
          <li
            v-for="b in badges"
            :key="b"
            class="rounded-pill border border-border px-3 py-1 text-label-md text-secondary"
          >{{ b }}</li>
        </ul>
      </div>

      <h3
        class="font-bold leading-snug text-ink"
        :class="size === 'lg' ? 'text-headline-sm font-headline-sm' : size === 'md' ? 'text-body-lg' : 'text-body-md'"
      >{{ name }}</h3>
      <p
        v-if="role"
        class="mt-1 font-bold text-primary-container"
        :class="size === 'sm' ? 'text-label-md' : 'text-label-lg'"
      >{{ role }}</p>
      <p v-if="note" class="mt-2 text-label-md leading-relaxed text-secondary">{{ note }}</p>

      <dl v-if="rows.length" class="mt-4 space-y-1.5 border-t border-border pt-4 text-label-md text-secondary">
        <div v-for="r in rows" :key="r.label" class="flex justify-between gap-3">
          <dt class="shrink-0">{{ r.label }}</dt>
          <dd class="text-left font-bold text-ink">{{ r.value }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<style scoped>
/*
 * A real border, not an inset shadow: the portrait fills the top of the card
 * under `overflow: hidden`, so a shadow drawn inside the box disappears
 * behind the photograph.
 */
.person--accent {
  border-block-start: 4px solid var(--color-primary-container);
}
</style>
