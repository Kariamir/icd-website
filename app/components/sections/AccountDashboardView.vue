<script setup lang="ts">
/*
 * Account home — ported from the approved canvas artboard `Main.dc.html`.
 *
 * The order of this page is the argument it makes: what needs doing, then the
 * four counts, then the purchase files themselves. The red "action needed"
 * banner sits above the tiles because a buyer whose contract is stalled on a
 * rejected ID scan should not have to read four numbers first.
 */
import { accountAlert, accountSummary, orders } from '~/utils/account'

const stepColour: Record<string, string> = {
  done: 'border-status-success text-status-success',
  current: 'border-primary text-primary',
  pending: 'border-border text-text-muted',
}
</script>

<template>
  <div class="flex flex-col gap-space-lg">
    <div>
      <h1 class="mb-[6px] text-headline-lg font-normal">خوش آمدید</h1>
      <p class="text-body-lg text-text-muted">دو پرونده خرید فعال دارید.</p>
    </div>

    <!-- action needed -->
    <div
      role="status"
      class="flex flex-wrap items-center gap-space-md rounded-md border border-status-error border-r-4 border-r-status-error bg-white px-space-lg py-[20px]"
    >
      <div class="flex-[999_1_320px] min-w-0">
        <p class="mb-1 text-body-md font-label-lg">{{ accountAlert.title }}</p>
        <p class="text-body-sm text-text-muted">{{ accountAlert.body }}</p>
      </div>
      <NuxtLink
        :to="accountAlert.cta.href"
        class="rounded-pill bg-primary px-space-lg py-[12px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover"
      >
        {{ accountAlert.cta.label }}
      </NuxtLink>
    </div>

    <!-- summary tiles -->
    <div class="grid grid-cols-2 gap-space-md md:grid-cols-4">
      <div
        v-for="tile in accountSummary"
        :key="tile.label"
        class="rounded-md border border-border bg-white p-[20px]"
      >
        <p
          class="num text-headline-lg font-headline-md leading-none"
          :class="tile.alert && 'text-status-error'"
        >{{ tile.value }}</p>
        <p class="mt-[6px] text-body-sm text-text-muted">{{ tile.label }}</p>
      </div>
    </div>

    <!-- purchase files -->
    <section class="overflow-hidden rounded-md border border-border bg-white">
      <div class="flex flex-wrap items-center gap-[12px] border-b border-border px-space-lg py-[20px]">
        <h2 class="text-headline-sm font-headline-sm">پرونده‌های خرید</h2>
        <div class="grow" />
        <NuxtLink to="/account/orders" class="text-label-lg font-label-lg text-primary hover:underline">مشاهده همه</NuxtLink>
      </div>

      <div class="flex flex-col gap-space-lg p-space-lg">
        <div
          v-for="(order, i) in orders"
          :key="order.id"
          :class="i > 0 && 'border-t border-border pt-space-lg'"
        >
          <div class="mb-space-md flex flex-wrap items-baseline gap-[10px]">
            <p class="text-body-md font-label-lg">
              واحد <span class="num">{{ order.unit }}</span> — {{ order.project }}
            </p>
            <span
              class="rounded-pill px-[12px] py-1 text-label-md font-label-lg"
              :class="order.tone === 'success' ? 'bg-status-success text-white' : 'bg-tint text-primary'"
            >{{ order.status }}</span>
            <div class="grow" />
            <span class="num text-body-sm text-text-muted">{{ order.ref }}</span>
          </div>

          <ol class="grid grid-cols-2 gap-space-sm md:grid-cols-4">
            <li
              v-for="s in order.steps"
              :key="s.label"
              class="border-t-[3px] pt-[10px] text-label-md leading-5"
              :class="stepColour[s.state]"
            >
              <p class="font-label-lg">{{ s.label }}</p>
              <p v-if="s.action" class="font-label-lg text-status-error">{{ s.action }}</p>
              <p v-else class="num text-text-muted">{{ s.meta }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>
