<script setup lang="ts">
/*
 * Support — ported from the approved canvas artboard `Tickets.dc.html`.
 *
 * One open conversation shown in full, closed ones listed below it. The staff
 * reply sits on the tint ground and the buyer's on the grey one, so who said
 * what is legible without reading the names — which matters in a thread the
 * buyer returns to weeks later.
 */
import { closedTickets, openTicket } from '~/utils/account'

const reply = ref('')
</script>

<template>
  <div class="flex flex-col gap-space-lg">
    <div class="flex flex-wrap items-end gap-space-md">
      <div class="flex-[999_1_300px] min-w-0">
        <h1 class="mb-[6px] text-headline-lg font-normal">تیکت پشتیبانی</h1>
        <p class="text-body-lg text-text-muted">یک گفتگوی باز دارید.</p>
      </div>
      <button
        type="button"
        class="rounded-pill bg-primary px-space-lg py-[14px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover"
      >
        تیکت جدید
      </button>
    </div>

    <!-- the open thread -->
    <section class="overflow-hidden rounded-md border border-border bg-white">
      <div class="flex flex-wrap items-center gap-[12px] border-b border-border bg-surface px-space-lg py-[20px]">
        <h2 class="text-headline-sm font-headline-sm">{{ openTicket.subject }}</h2>
        <span class="rounded-pill bg-tint px-[12px] py-1 text-label-md font-label-lg text-primary">{{ openTicket.status }}</span>
        <div class="grow" />
        <span class="num text-body-sm text-text-muted">{{ openTicket.ref }}</span>
      </div>

      <div class="flex flex-col gap-space-lg p-space-lg">
        <div v-for="(m, i) in openTicket.messages" :key="i" class="flex gap-[12px]">
          <span
            aria-hidden="true"
            class="inline-flex size-9 shrink-0 items-center justify-center rounded-pill text-label-md font-label-lg"
            :class="m.staff ? 'bg-primary text-white' : 'bg-tint text-ink'"
          >{{ m.initials }}</span>

          <div
            class="flex-[999_1_auto] min-w-0 rounded-md px-[20px] py-space-md"
            :class="m.staff ? 'bg-tint' : 'bg-surface'"
          >
            <p class="mb-[6px] flex flex-wrap items-baseline gap-space-sm">
              <span class="text-body-sm font-label-lg">{{ m.author }}</span>
              <span class="num text-label-md text-text-muted">{{ m.at }}</span>
            </p>
            <p class="text-body-md">{{ m.body }}</p>
          </div>
        </div>

        <form class="flex flex-col gap-[12px] border-t border-border pt-[20px]" @submit.prevent>
          <label for="reply" class="text-label-lg font-label-lg">پاسخ شما</label>
          <textarea
            id="reply"
            v-model="reply"
            name="reply"
            rows="3"
            placeholder="پیام خود را بنویسید…"
            class="resize-y rounded-xs border border-border px-space-md py-[14px] text-body-md text-ink focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          />
          <div class="flex flex-wrap items-center gap-[12px]">
            <button
              type="submit"
              :disabled="!reply.trim()"
              class="rounded-pill bg-primary px-space-lg py-[12px] text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
            >
              ارسال پاسخ
            </button>
            <button
              type="button"
              class="rounded-pill border border-primary px-space-lg py-[12px] text-label-lg font-label-lg text-primary transition-colors hover:bg-tint"
            >
              پیوست فایل
            </button>
            <div class="grow" />
            <button
              type="button"
              class="rounded-pill border border-border px-space-lg py-[12px] text-label-lg font-label-lg text-text-muted transition-colors hover:bg-surface"
            >
              بستن تیکت
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- closed -->
    <section class="overflow-hidden rounded-md border border-border bg-white">
      <h2 class="border-b border-border px-space-lg py-[20px] text-headline-sm font-headline-sm">تیکت‌های بسته</h2>
      <div class="px-space-lg pb-space-md pt-space-sm">
        <div
          v-for="(t, i) in closedTickets"
          :key="t.subject"
          class="flex flex-wrap items-center gap-[12px] py-space-md"
          :class="i < closedTickets.length - 1 && 'border-b border-border'"
        >
          <button type="button" class="text-body-md font-label-lg text-primary hover:underline">{{ t.subject }}</button>
          <span class="rounded-pill bg-surface-alt px-[12px] py-1 text-label-md font-label-lg text-ink">بسته</span>
          <div class="grow" />
          <span class="num text-body-sm text-text-muted">{{ t.date }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
