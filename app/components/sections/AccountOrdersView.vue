<script setup lang="ts">
/*
 * Purchase tracking — ported from the approved canvas artboard `Orders.dc.html`.
 *
 * The live file gets the full vertical timeline, with the stalled step naming
 * what is wrong and carrying the button that fixes it. A file where all four
 * steps are done collapses to one line and a link to the contract: a finished
 * purchase does not need four green dots restating themselves.
 */
import { orders } from '~/utils/account'

function isComplete(order: typeof orders[number]) {
  return order.steps.every(s => s.state === 'done')
}
</script>

<template>
  <div class="flex flex-col gap-space-lg">
    <div>
      <h1 class="mb-[6px] text-headline-lg font-normal">پیگیری وضعیت خرید</h1>
      <p class="text-body-lg text-text-muted">دو پرونده خرید دارید.</p>
    </div>

    <section
      v-for="order in orders"
      :key="order.id"
      class="overflow-hidden rounded-md border border-border bg-white"
    >
      <div class="flex flex-wrap items-center gap-[12px] border-b border-border bg-surface px-space-lg py-[20px]">
        <h2 class="text-headline-sm font-headline-sm">
          واحد <span class="num">{{ order.unit }}</span> — {{ order.project }}
        </h2>
        <span
          class="rounded-pill px-[12px] py-1 text-label-md font-label-lg"
          :class="order.tone === 'success' ? 'bg-status-success text-white' : 'bg-tint text-primary'"
        >{{ order.status }}</span>
        <div class="grow" />
        <span class="num text-body-sm text-text-muted">{{ order.ref }}</span>
      </div>

      <!-- a finished file: one line and the contract -->
      <div
        v-if="isComplete(order)"
        class="flex flex-wrap items-center gap-space-lg p-space-lg"
      >
        <p class="flex-[999_1_320px] min-w-0 text-body-sm text-text-muted">{{ order.closingNote }}</p>
        <NuxtLink
          to="/account/documents"
          class="rounded-pill border border-primary px-[20px] py-[10px] text-label-lg font-label-lg text-primary transition-colors hover:bg-tint"
        >
          دریافت قرارداد
        </NuxtLink>
      </div>

      <!-- a live file: the full timeline -->
      <div v-else class="p-space-lg">
        <ol class="mb-space-lg flex flex-col">
          <li
            v-for="(s, i) in order.steps"
            :key="s.label"
            class="flex items-start gap-space-md"
          >
            <div class="flex shrink-0 flex-col items-center self-stretch">
              <span
                aria-hidden="true"
                class="size-[14px] shrink-0 rounded-pill border-[3px] box-border"
                :class="{
                  'bg-status-success border-status-success': s.state === 'done',
                  'bg-white border-primary': s.state === 'current',
                  'bg-border border-border': s.state === 'pending',
                }"
              />
              <span
                v-if="i < order.steps.length - 1"
                aria-hidden="true"
                class="w-[2px] grow"
                :class="s.state === 'done' ? 'bg-status-success' : 'bg-border'"
                style="min-height: 28px"
              />
            </div>

            <div :class="i < order.steps.length - 1 ? 'grow pb-[20px]' : 'grow'">
              <p
                class="text-body-md font-label-lg"
                :class="{
                  'text-primary': s.state === 'current',
                  'text-text-muted': s.state === 'pending',
                }"
              >{{ s.label }}</p>
              <p
                class="mt-[2px] text-body-sm"
                :class="s.state === 'pending' ? 'text-text-muted' : 'num text-text-muted'"
              >{{ s.meta }}</p>

              <NuxtLink
                v-if="s.state === 'current'"
                to="/account/documents"
                class="mt-[12px] inline-block rounded-pill bg-primary px-[20px] py-[10px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover"
              >
                بارگذاری مدرک
              </NuxtLink>
            </div>
          </li>
        </ol>

        <div
          v-if="order.facts"
          class="flex flex-wrap gap-margin border-t border-border pt-[20px]"
        >
          <div v-for="f in order.facts" :key="f.label">
            <p class="text-body-sm text-text-muted">{{ f.label }}</p>
            <p class="num mt-[2px] text-body-md font-label-lg">{{ f.value }}</p>
          </div>
          <div class="grow" />
          <NuxtLink
            to="/account/tickets"
            class="self-center rounded-pill border border-primary px-[20px] py-[10px] text-label-lg font-label-lg text-primary transition-colors hover:bg-tint"
          >
            سوال درباره این پرونده
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
