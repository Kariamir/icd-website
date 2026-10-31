<!--
  The next ordinary (عادی) and extraordinary (فوق‌العاده) general meetings,
  with the shareholder-relations desks beneath them.

  This replaces the full «تقویم اطلاع‌رسانی و مجامع عمومی» section and the
  «گزارش‌های شفافیت و حاکمیت شرکتی» archive, both removed on 2026-10-18 at the
  owner's request: a shareholder arriving here wants the date of the next
  meeting and someone to call, not a filterable calendar of thirty events.
  `calendarEventRecords` and `documentHubs.governance` are untouched — the
  records are still there for whatever needs them next.
-->
<script setup lang="ts">
import { calendarEventRecords, calendarSupport } from '~/utils/calendarData'
import { formatJalaliLong } from '~/utils/irDateUtils'

const todayIso = new Date().toISOString().slice(0, 10)

const assemblies = computed(() => calendarEventRecords.filter(e => e.category === 'assembly'))
const isEgm = (title: string) => title.includes('فوق‌العاده')

/**
 * The next one of each kind. If none is scheduled, the card says so rather
 * than falling back to the last one held — an AGM that happened in ۱۴۰۴ shown
 * under «مجمع بعدی» would be read as a date to attend.
 */
function next(egm: boolean) {
  return assemblies.value
    .filter(e => isEgm(e.title) === egm && e.iso >= todayIso)
    .sort((a, b) => a.iso.localeCompare(b.iso))[0]
}

const cards = computed(() => [
  { key: 'agm', label: 'مجمع عمومی عادی سالیانه', event: next(false) },
  { key: 'egm', label: 'مجمع عمومی فوق‌العاده', event: next(true) },
])

const desks = [
  {
    title: 'امور سهامداران',
    text: 'ثبت‌نام سجام، سود نقدی مصوب مجامع، گواهی سهام و نقل‌وانتقال.',
    phoneLabel: calendarSupport.phoneLabel,
    phoneHref: calendarSupport.phoneHref,
  },
  {
    title: 'دبیرخانه هیئت‌مدیره',
    text: 'ترکیب هیئت‌مدیره و کمیته‌ها، صورت‌جلسات مجامع و معاملات با اشخاص وابسته.',
    phoneLabel: calendarSupport.messageLabel,
    phoneHref: calendarSupport.messageHref,
  },
]
</script>

<template>
  <section id="calendar" class="scroll-mt-40">
    <SectionHead eyebrow="مجامع عمومی" title="مجامع پیش‌رو" aside="زمان و دستور جلسه مجامع بعدی" />

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
      <article
        v-for="c in cards" :key="c.key"
        class="flex flex-col rounded-md border border-border bg-surface-container-lowest p-6"
      >
        <span class="mb-4 w-fit rounded-pill bg-brand-tint px-3 py-1 text-label-md font-bold text-primary-container">{{ c.label }}</span>

        <template v-if="c.event">
          <h3 class="mb-3 text-body-lg font-bold leading-snug text-ink">{{ c.event.title }}</h3>
          <p class="mb-5 text-body-sm leading-relaxed text-secondary">{{ c.event.description }}</p>
          <dl class="mt-auto grid grid-cols-1 gap-3 border-t border-border pt-4 text-label-md sm:grid-cols-2">
            <div>
              <dt class="text-secondary">تاریخ برگزاری</dt>
              <dd class="mt-1 font-bold text-ink">{{ formatJalaliLong(c.event.date) }}</dd>
            </div>
            <div v-if="c.event.timeLabel">
              <dt class="text-secondary">ساعت</dt>
              <dd class="mt-1 font-bold text-ink">{{ c.event.timeLabel }}</dd>
            </div>
            <div v-if="c.event.location" class="sm:col-span-2">
              <dt class="text-secondary">محل برگزاری</dt>
              <dd class="mt-1 font-bold text-ink">{{ c.event.location }}</dd>
            </div>
          </dl>
        </template>

        <p v-else class="mt-auto text-body-sm leading-relaxed text-secondary">
          تاریخ {{ c.label }} بعدی هنوز اعلام نشده است. آگهی دعوت در سامانه کدال و در همین صفحه منتشر می‌شود.
        </p>
      </article>
    </div>

    <!-- Contact shareholder relations — kept (owner's request) -->
    <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
      <article v-for="d in desks" :key="d.title" class="rounded-md border border-border bg-surface p-6">
        <h3 class="text-body-lg font-bold text-ink">{{ d.title }}</h3>
        <p class="mt-2 text-body-sm leading-relaxed text-secondary">{{ d.text }}</p>
        <a
          :href="d.phoneHref"
          class="mt-4 inline-flex h-10 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-md font-bold text-primary-container hover:bg-brand-tint"
        >{{ d.phoneLabel }}</a>
      </article>
    </div>
  </section>
</template>
