<script setup lang="ts">
/*
 * Saved units — ported from the approved canvas artboard `Favorites.dc.html`.
 *
 * A sold unit stays in the list rather than disappearing: the buyer saved it
 * for a reason, and the useful move is to offer the units like it. That is why
 * its card swaps the filled primary action for an outlined "similar units".
 */
import { favouriteUnits } from '~/utils/account'
import { phFor } from '~/utils/media'

const statusTone: Record<string, string> = {
  'موجود': 'bg-primary text-white',
  'پیش‌فروش': 'bg-tint text-primary',
  'فروخته شد': 'bg-surface-alt text-ink',
}
</script>

<template>
  <div class="flex flex-col gap-space-lg">
    <div>
      <h1 class="mb-[6px] text-headline-lg font-normal">واحدهای موردعلاقه</h1>
      <p class="text-body-lg text-text-muted">چهار واحد ذخیره کرده‌اید.</p>
    </div>

    <div class="grid gap-space-lg md:grid-cols-2">
      <article
        v-for="u in favouriteUnits"
        :key="u.unit"
        class="flex flex-col overflow-hidden rounded-md border border-border bg-white"
      >
        <img
          :src="phFor(u.project)"
          alt=""
          loading="lazy"
          class="aspect-video w-full bg-surface-alt object-cover"
        >

        <div class="flex grow flex-col gap-[10px] p-[20px]">
          <div class="flex flex-wrap items-baseline gap-space-sm">
            <h2 class="text-headline-sm font-headline-sm">
              واحد <span class="num">{{ u.unit }}</span>
            </h2>
            <span
              class="rounded-pill px-[12px] py-1 text-label-md font-label-lg"
              :class="statusTone[u.status]"
            >{{ u.status }}</span>
          </div>

          <p class="text-body-sm text-text-muted">{{ u.project }}</p>
          <p class="num text-body-sm text-text-muted">{{ u.specs }}</p>

          <div class="grow" />

          <div class="flex flex-wrap items-center gap-[12px]">
            <NuxtLink
              v-if="!u.sold"
              to="/sales"
              class="rounded-pill bg-primary px-[20px] py-[10px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover"
            >
              مشاهده واحد
            </NuxtLink>
            <NuxtLink
              v-else
              to="/sales"
              class="rounded-pill border border-primary px-[20px] py-[10px] text-label-lg font-label-lg text-primary transition-colors hover:bg-tint"
            >
              واحدهای مشابه
            </NuxtLink>

            <button
              type="button"
              :aria-label="`حذف واحد ${u.unit} از علاقه‌مندی‌ها`"
              class="rounded-pill border border-border px-[20px] py-[10px] text-label-lg font-label-lg text-status-error transition-colors hover:bg-surface"
            >
              حذف
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
