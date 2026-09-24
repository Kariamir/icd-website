<script setup lang="ts">
import { calendarCategories, calendarSupport, fiscalYearOf, type CalendarCategoryKey, type CalendarEventDerived } from '~/utils/calendarData'
import { addDaysIso, formatJalaliLong, isoToJalali, jalaliMonthNames, todayIso, irFaDigits } from '~/utils/irDateUtils'

// Template `02c-calendar-module`, rebuilt to follow
// `project_detail_page_template/02c_calendar_module/code.html`: breadcrumb,
// two-column hero (title + ticker / intro + three live metrics), a sidebar
// with upcoming/past event tabs, category checkboxes, fiscal-year selector
// and a calendar-sync card (.ics + Google Calendar), big-date event rows
// with type chips, time/location, inline links, add-to-calendar and a
// round link to the related document, «load more», and the shareholder
// support strip. Header/footer/newsletter come from the shared layout.

const props = defineProps<{ events: CalendarEventDerived[] }>()

const PAGE_SIZE = 6
type Tab = 'upcoming' | 'past'

const today = todayIso()
const activeTab = ref<Tab>('upcoming')
const selectedCategories = ref<CalendarCategoryKey[]>([])
const fiscalFilter = ref('all')
const visibleCount = ref(PAGE_SIZE)
const openMenuId = ref<string | null>(null)

const categoryKeys = Object.keys(calendarCategories) as CalendarCategoryKey[]

const upcomingAll = computed(() => props.events.filter(e => e.iso >= today).sort((a, b) => a.iso.localeCompare(b.iso)))
const pastAll = computed(() => props.events.filter(e => e.iso < today).sort((a, b) => b.iso.localeCompare(a.iso)))

const tabEvents = computed(() => (activeTab.value === 'upcoming' ? upcomingAll.value : pastAll.value)
  .filter(e => fiscalFilter.value === 'all' || e.fiscalYear === fiscalFilter.value))

const filteredEvents = computed(() => selectedCategories.value.length
  ? tabEvents.value.filter(e => selectedCategories.value.includes(e.category))
  : tabEvents.value)

const visibleEvents = computed(() => filteredEvents.value.slice(0, visibleCount.value))
const remainingCount = computed(() => Math.max(filteredEvents.value.length - visibleCount.value, 0))

watch([activeTab, selectedCategories, fiscalFilter], () => {
  visibleCount.value = PAGE_SIZE
  openMenuId.value = null
}, { deep: true })

function countFor(key: CalendarCategoryKey) {
  return tabEvents.value.filter(e => e.category === key).length
}

function toggleCategory(key: CalendarCategoryKey) {
  const list = selectedCategories.value
  const next = list.includes(key) ? list.filter(k => k !== key) : [...list, key]
  selectedCategories.value = next.length === categoryKeys.length ? [] : next
}

function resetFilters() {
  selectedCategories.value = []
  fiscalFilter.value = 'all'
}

const currentFiscal = fiscalYearOf(isoToJalali(today))
const fiscalOptions = computed(() => Array.from(new Set(props.events.map(e => e.fiscalYear))).sort().reverse())
function fiscalLabel(key: string) {
  const [a, b] = key.split('-')
  return `سال مالی ${irFaDigits(a!)} - ${irFaDigits(b!)}${key === currentFiscal ? ' (جاری)' : ''}`
}

// ---- hero metrics ----
const nextEvent = computed(() => upcomingAll.value[0])
const fiscalYearEnd = computed(() => `۳۱ شهریور ${irFaDigits(currentFiscal.split('-')[1]!)}`)
const silentPeriods = computed(() => props.events
  .filter(e => e.category === 'silent-period')
  .map(e => ({ start: e.iso, end: addDaysIso(e.iso, e.durationDays ?? 10) }))
  .sort((a, b) => a.start.localeCompare(b.start)))
const activeSilent = computed(() => silentPeriods.value.find(p => p.start <= today && today < p.end))
const nextSilent = computed(() => silentPeriods.value.find(p => p.start > today))

// ---- calendar export ----
const icsStamp = (iso: string) => iso.replace(/-/g, '')

function eventRange(e: CalendarEventDerived) {
  if (e.time) {
    const [h, m] = e.time.split(':').map(Number)
    const pad = (n: number) => String(n).padStart(2, '0')
    const start = `${icsStamp(e.iso)}T${pad(h!)}${pad(m!)}00`
    const end = `${icsStamp(e.iso)}T${pad(Math.min(h! + 2, 23))}${pad(m!)}00`
    return { start, end, allDay: false }
  }
  return { start: icsStamp(e.iso), end: icsStamp(addDaysIso(e.iso, e.durationDays ?? 1)), allDay: true }
}

function escapeIcs(text: string) {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

function buildIcs(list: CalendarEventDerived[]) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ICD 3D//IR Calendar//FA', 'CALSCALE:GREGORIAN', 'X-WR-CALNAME:تقویم مالی ثاخت', 'X-WR-TIMEZONE:Asia/Tehran']
  for (const e of list) {
    const r = eventRange(e)
    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.id}@icd3d.ir`,
      `DTSTAMP:${icsStamp(today)}T000000Z`,
      r.allDay ? `DTSTART;VALUE=DATE:${r.start}` : `DTSTART;TZID=Asia/Tehran:${r.start}`,
      r.allDay ? `DTEND;VALUE=DATE:${r.end}` : `DTEND;TZID=Asia/Tehran:${r.end}`,
      `SUMMARY:${escapeIcs(e.title)}`,
      `DESCRIPTION:${escapeIcs(e.description)}`,
      ...(e.location ? [`LOCATION:${escapeIcs(e.location)}`] : []),
      'END:VEVENT',
    )
  }
  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}

function downloadIcs(list: CalendarEventDerived[], filename: string) {
  if (!list.length) return
  const blob = new Blob([buildIcs(list)], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  openMenuId.value = null
}

function googleUrl(e: CalendarEventDerived) {
  const r = eventRange(e)
  const params = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates: `${r.start}/${r.end}`, details: e.description, ctz: 'Asia/Tehran' })
  if (e.location) params.set('location', e.location)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function toggleMenu(id: string) {
  openMenuId.value = openMenuId.value === id ? null : id
}

function closeMenu() { openMenuId.value = null }
onMounted(() => document.addEventListener('click', closeMenu))
onBeforeUnmount(() => document.removeEventListener('click', closeMenu))

function gregorianShort(iso: string) {
  return iso.slice(5)
}

const linkIcons: Record<'live' | 'doc' | 'download', string> = {
  live: 'M15 10l4.6-2.3A1 1 0 0 1 21 8.6v6.8a1 1 0 0 1-1.4.9L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z',
  doc: 'M9 12h6m-6 4h6M7 21h10a2 2 0 0 0 2-2V9.4a1 1 0 0 0-.3-.7l-5.4-5.4a1 1 0 0 0-.7-.3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z',
  download: 'M12 4v12m0 0 5-5m-5 5-5-5M5 20h14',
}
</script>

<template>
  <div class="calendar-index">
    <nav class="calendar-index__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/ir">دیده‌بان ثاخت</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="calendar-index__breadcrumb-current" aria-current="page">تقویم مالی و رویدادهای بازار سرمایه</span>
    </nav>

    <header class="calendar-index__hero">
      <div class="calendar-index__hero-title">
        <span class="calendar-index__eyebrow"><span aria-hidden="true" />شفافیت شرکتی و افشای اطلاعات کدال</span>
        <h1>تقویم مالی ثاخت</h1>
        <p>شرکت بین‌المللی توسعه ساختمان (سهامی عام) — نماد بورسی: <strong>ثاخت (ICD1)</strong></p>
      </div>
      <div class="calendar-index__hero-body">
        <p>
          در ارائه‌های گزارش‌های دوره‌ای، کنفرانس‌های برخط تحلیل سودآوری و مجامع عمومی سالیانه شرکت بین‌المللی توسعه ساختمان (ثاخت) شرکت نمایید.
          در ادامه، زمان‌بندی دقیق رویدادهای مالی پیش‌رو، دوره‌های سکوت اطلاعاتی، مواعد پرداخت سود و پیوندهای مستقیم اسناد کدال را مشاهده فرمایید.
        </p>
        <div class="calendar-index__metrics">
          <div class="calendar-index__metric">
            <span class="calendar-index__metric-label">رویداد نزدیک بعدی</span>
            <strong>{{ nextEvent ? formatJalaliLong(nextEvent.date) : '—' }}</strong>
            <span class="calendar-index__metric-sub calendar-index__metric-sub--link">{{ nextEvent ? calendarCategories[nextEvent.category].label : 'رویداد پیش‌رو ثبت نشده' }}</span>
          </div>
          <div class="calendar-index__metric">
            <span class="calendar-index__metric-label">سال مالی جاری منتهی به</span>
            <strong>{{ fiscalYearEnd }}</strong>
            <span class="calendar-index__metric-sub">دوره ۱۲ ماهه حسابرسی</span>
          </div>
          <div class="calendar-index__metric">
            <span class="calendar-index__metric-label">وضعیت دوره سکوت</span>
            <strong class="calendar-index__silent" :class="activeSilent ? 'is-active' : 'is-free'">
              <span aria-hidden="true" />{{ activeSilent ? 'فعال' : 'غیرفعال (آزاد)' }}
            </strong>
            <span class="calendar-index__metric-sub">
              <template v-if="activeSilent">تا {{ formatJalaliLong(isoToJalali(activeSilent.end)) }}</template>
              <template v-else-if="nextSilent">دوره بعدی: {{ formatJalaliLong(isoToJalali(nextSilent.start)) }}</template>
              <template v-else>امکان مصاحبه و اطلاع‌رسانی</template>
            </span>
          </div>
        </div>
      </div>
    </header>

    <div class="calendar-index__workspace">
      <aside class="calendar-index__sidebar">
        <div class="calendar-index__side-block">
          <h2>رویدادها</h2>
          <div class="calendar-index__tabs" role="tablist" aria-label="حالت‌های زمانی رویدادها">
            <button type="button" role="tab" :aria-selected="activeTab === 'upcoming'" :class="{ 'is-active': activeTab === 'upcoming' }" @click="activeTab = 'upcoming'">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 5v14L6 12Z" /></svg>
              <span>رویدادهای پیش‌رو</span>
              <small>{{ irFaDigits(upcomingAll.length) }}</small>
            </button>
            <button type="button" role="tab" :aria-selected="activeTab === 'past'" :class="{ 'is-active': activeTab === 'past' }" @click="activeTab = 'past'">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17 5v14L6 12Z" /></svg>
              <span>رویدادهای گذشته و آرشیو</span>
              <small>{{ irFaDigits(pastAll.length) }}</small>
            </button>
          </div>
        </div>

        <fieldset class="calendar-index__side-block">
          <legend>دسته‌بندی موضوعی</legend>
          <label class="calendar-index__check">
            <input type="checkbox" :checked="!selectedCategories.length" @change="selectedCategories = []">
            <span>همه رویدادها ({{ irFaDigits(tabEvents.length) }})</span>
          </label>
          <label v-for="key in categoryKeys" :key="key" class="calendar-index__check" :class="{ 'is-empty': !countFor(key) }">
            <input type="checkbox" :checked="selectedCategories.includes(key)" @change="toggleCategory(key)">
            <span>{{ calendarCategories[key].filterLabel }} ({{ irFaDigits(countFor(key)) }})</span>
          </label>
        </fieldset>

        <div class="calendar-index__side-block">
          <label class="calendar-index__side-label" for="calendar-fiscal">سال مالی</label>
          <select id="calendar-fiscal" v-model="fiscalFilter" class="calendar-index__select">
            <option value="all">همه سال‌های مالی</option>
            <option v-for="fy in fiscalOptions" :key="fy" :value="fy">{{ fiscalLabel(fy) }}</option>
          </select>
        </div>

        <div class="calendar-index__sync">
          <div class="calendar-index__sync-head">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
            همگام‌سازی با تقویم شخصی
          </div>
          <p>تقویم رسمی رویدادهای ثاخت را در Google Calendar، Outlook یا هر تقویم سازگار با فرمت iCal ذخیره کنید.</p>
          <button type="button" class="calendar-index__sync-btn" :disabled="!upcomingAll.length" @click="downloadIcs(upcomingAll, 'icd3d-ir-calendar.ics')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="linkIcons.download" /></svg>
            دریافت فایل استاندارد (.ics)
          </button>
          <a v-if="nextEvent" :href="googleUrl(nextEvent)" target="_blank" rel="noopener noreferrer" class="calendar-index__sync-btn" title="افزودن رویداد نزدیک بعدی به گوگل کلندر">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" /></svg>
            افزودن به گوگل کلندر
          </a>
        </div>
      </aside>

      <section class="calendar-index__events" :aria-label="activeTab === 'upcoming' ? 'رویدادهای پیش‌رو' : 'رویدادهای گذشته'">
        <div v-if="visibleEvents.length" class="calendar-index__list">
          <article v-for="e in visibleEvents" :key="e.id" class="calendar-index__row" :class="{ 'is-past': activeTab === 'past' }">
            <div class="calendar-index__date" :aria-label="formatJalaliLong(e.date)">
              <span class="calendar-index__date-month">{{ jalaliMonthNames[e.date.m - 1] }}</span>
              <span class="calendar-index__date-day">{{ irFaDigits(e.date.d) }}</span>
              <span class="calendar-index__date-year">{{ irFaDigits(e.date.y) }} / <span dir="ltr">{{ gregorianShort(e.iso) }}</span></span>
            </div>

            <div class="calendar-index__content">
              <div class="calendar-index__chips">
                <span class="calendar-index__chip" :class="`calendar-index__chip--${e.category}`">{{ calendarCategories[e.category].label }}</span>
                <span v-if="e.timeLabel" class="calendar-index__meta">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  {{ e.timeLabel }}
                </span>
                <span v-if="e.location" class="calendar-index__meta">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
                  {{ e.location }}
                </span>
                <span v-if="e.secondaryTag" class="calendar-index__chip calendar-index__chip--soft">{{ e.secondaryTag }}</span>
                <span v-if="activeTab === 'past'" class="calendar-index__chip calendar-index__chip--done">برگزار شد</span>
              </div>
              <h3>{{ e.title }}</h3>
              <p>{{ e.description }}</p>
              <div v-if="e.links?.length" class="calendar-index__links">
                <template v-for="(link, i) in e.links" :key="link.label">
                  <span v-if="i > 0" class="calendar-index__links-sep" aria-hidden="true">|</span>
                  <NuxtLink :to="link.href">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path :d="linkIcons[link.icon]" /></svg>
                    {{ link.label }}
                  </NuxtLink>
                </template>
              </div>
            </div>

            <div class="calendar-index__actions">
              <div v-if="activeTab === 'upcoming'" class="calendar-index__add" @click.stop>
                <button type="button" class="calendar-index__icon-btn" :aria-expanded="openMenuId === e.id" title="افزودن به تقویم" @click="toggleMenu(e.id)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M12 13v5M9.5 15.5h5" /></svg>
                </button>
                <div v-if="openMenuId === e.id" class="calendar-index__menu" role="menu">
                  <a :href="googleUrl(e)" target="_blank" rel="noopener noreferrer" role="menuitem" @click="closeMenu">افزودن به Google Calendar</a>
                  <button type="button" role="menuitem" @click="downloadIcs([e], `${e.id}.ics`)">دریافت فایل .ics (Outlook / iCal)</button>
                </div>
              </div>
              <NuxtLink :to="e.relatedHref" class="calendar-index__arrow" :title="e.relatedLabel" :aria-label="`${e.relatedLabel} — ${e.title}`">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
              </NuxtLink>
            </div>
          </article>
        </div>
        <div v-else class="calendar-index__empty">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M9.5 14.5l5 5m0-5-5 5" /></svg>
          <strong>رویدادی مطابق فیلترهای انتخابی یافت نشد.</strong>
          <p>دسته‌بندی یا سال مالی دیگری را انتخاب کنید یا به زبانه {{ activeTab === 'upcoming' ? 'رویدادهای گذشته' : 'رویدادهای پیش‌رو' }} بروید.</p>
          <button type="button" class="calendar-index__more-btn" @click="resetFilters">بازنشانی فیلترها</button>
        </div>

        <div v-if="remainingCount > 0" class="calendar-index__more">
          <button type="button" class="calendar-index__more-btn" @click="visibleCount += PAGE_SIZE">
            بارگذاری {{ irFaDigits(Math.min(remainingCount, PAGE_SIZE)) }} رویداد دیگر
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </section>
    </div>

    <section class="calendar-index__support">
      <div>
        <span class="calendar-index__support-eyebrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2Zm16 0a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2ZM17 18a4 4 0 0 1-4 3h-1" /></svg>
          {{ calendarSupport.eyebrow }}
        </span>
        <h2>{{ calendarSupport.title }}</h2>
        <p>{{ calendarSupport.description }}</p>
      </div>
      <div class="calendar-index__support-actions">
        <a :href="calendarSupport.phoneHref" class="calendar-index__support-btn calendar-index__support-btn--primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z" /></svg>
          {{ calendarSupport.phoneLabel }}
        </a>
        <NuxtLink :to="calendarSupport.messageHref" class="calendar-index__support-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          {{ calendarSupport.messageLabel }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.calendar-index { padding-block-end: var(--space-8); }

.calendar-index__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.calendar-index__breadcrumb a { color: inherit; text-decoration: none; }
.calendar-index__breadcrumb a:hover { color: var(--color-primary); }
.calendar-index__breadcrumb-current { color: var(--color-text); font-weight: 600; }

/* hero */
.calendar-index__hero { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding-block: var(--space-3) var(--space-6); border-block-end: 1px solid var(--color-border); }
@media (min-width: 1024px) { .calendar-index__hero { grid-template-columns: 5fr 7fr; align-items: start; } }
.calendar-index__eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: var(--radius-xs); background: var(--color-tint); color: var(--color-primary); font-size: 12px; font-weight: 700; margin-block-end: var(--space-2); }
.calendar-index__eyebrow span { inline-size: 8px; block-size: 8px; background: var(--color-primary); border-radius: 2px; }
.calendar-index__hero h1 { font: var(--text-h2); font-size: 52px; font-weight: 800; line-height: 1.1; margin-block-end: var(--space-1); }
.calendar-index__hero-title p { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0; }
.calendar-index__hero-title strong { color: var(--color-text); }
.calendar-index__hero-body > p { font: var(--text-body); font-size: 16px; color: var(--color-text-muted); margin: 0 0 var(--space-3); }
.calendar-index__metrics { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 640px) { .calendar-index__metrics { grid-template-columns: repeat(3, 1fr); } }
.calendar-index__metric { display: flex; flex-direction: column; gap: 6px; padding: var(--space-2); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.calendar-index__metric-label { font-size: 12px; color: var(--color-text-muted); }
.calendar-index__metric strong { font-size: 18px; font-weight: 800; color: var(--color-text); }
.calendar-index__metric-sub { font-size: 11px; color: var(--color-text-muted); }
.calendar-index__metric-sub--link { color: var(--color-primary); font-weight: 600; }
.calendar-index__silent { display: inline-flex; align-items: center; gap: 6px; }
.calendar-index__silent span { inline-size: 10px; block-size: 10px; border-radius: 2px; }
.calendar-index__silent.is-free { color: var(--color-status-success); }
.calendar-index__silent.is-free span { background: var(--color-status-success); }
.calendar-index__silent.is-active { color: var(--color-primary); }
.calendar-index__silent.is-active span { background: var(--color-primary); }

/* workspace */
.calendar-index__workspace { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding-block: var(--space-4); }
@media (min-width: 1024px) { .calendar-index__workspace { grid-template-columns: 280px 1fr; align-items: start; } }
.calendar-index__sidebar { display: flex; flex-direction: column; gap: var(--space-3); }
@media (min-width: 1024px) { .calendar-index__sidebar { position: sticky; top: var(--space-3); } }
.calendar-index__side-block { margin: 0; padding: 0 0 var(--space-3); border: none; border-block-end: 1px solid var(--color-border); }
.calendar-index__side-block h2, .calendar-index__side-block legend, .calendar-index__side-label { display: block; font: var(--text-h3); font-size: 16px; font-weight: 800; margin-block-end: 12px; padding: 0; }
.calendar-index__tabs { display: flex; flex-direction: column; gap: 4px; }
.calendar-index__tabs button { display: flex; align-items: center; gap: var(--space-1); inline-size: 100%; padding: 10px 12px; border: none; border-radius: var(--radius-sm); background: none; color: var(--color-text-muted); font: inherit; font-size: 14px; font-weight: 600; text-align: start; cursor: pointer; }
.calendar-index__tabs button svg { opacity: 0; }
.calendar-index__tabs button span { flex: 1; }
.calendar-index__tabs button small { min-inline-size: 24px; padding: 2px 8px; border-radius: var(--radius-pill); background: var(--color-surface-alt); color: var(--color-text); font-size: 11px; font-weight: 700; text-align: center; }
.calendar-index__tabs button:hover { background: var(--color-surface); color: var(--color-text); }
.calendar-index__tabs button.is-active { background: var(--color-tint); color: var(--color-primary); font-weight: 700; }
.calendar-index__tabs button.is-active svg { opacity: 1; }
.calendar-index__tabs button.is-active small { background: var(--color-primary); color: var(--color-white); }

.calendar-index__check { display: flex; align-items: flex-start; gap: var(--space-1); padding-block: 6px; font-size: 13px; color: var(--color-text); cursor: pointer; }
.calendar-index__check input { margin-block-start: 3px; inline-size: 16px; block-size: 16px; accent-color: var(--color-primary); cursor: pointer; }
.calendar-index__check.is-empty { color: var(--color-text-muted); }
.calendar-index__select { inline-size: 100%; block-size: 44px; padding-inline: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-white); color: var(--color-text); font: inherit; font-size: 13px; font-weight: 600; }
.calendar-index__select:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-tint); }

.calendar-index__sync { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-2); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.calendar-index__sync-head { display: flex; align-items: center; gap: var(--space-1); font-size: 14px; font-weight: 800; color: var(--color-text); }
.calendar-index__sync-head svg { color: var(--color-primary); }
.calendar-index__sync p { font-size: 12px; line-height: 1.7; color: var(--color-text-muted); margin: 0 0 4px; }
.calendar-index__sync-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text); font: inherit; font-size: 12px; font-weight: 700; text-decoration: none; cursor: pointer; }
.calendar-index__sync-btn:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
.calendar-index__sync-btn:disabled { opacity: 0.5; cursor: default; }

/* event rows */
.calendar-index__list { border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); }
.calendar-index__row { display: grid; grid-template-columns: 76px 1fr; gap: var(--space-2); padding: var(--space-3); transition: background 0.2s; }
@media (min-width: 768px) { .calendar-index__row { grid-template-columns: 110px 1fr auto; gap: var(--space-3); } }
.calendar-index__row + .calendar-index__row { border-block-start: 1px solid var(--color-border); }
.calendar-index__row:first-child { border-start-start-radius: inherit; border-start-end-radius: inherit; }
.calendar-index__row:last-child { border-end-start-radius: inherit; border-end-end-radius: inherit; }
.calendar-index__row:hover { background: var(--color-surface); }
.calendar-index__date { display: flex; flex-direction: column; align-items: flex-start; }
.calendar-index__date-month { font-size: 13px; font-weight: 700; color: var(--color-text-muted); }
.calendar-index__date-day { font-size: 52px; font-weight: 900; line-height: 1; color: var(--color-ink); margin-block: 4px; }
@media (min-width: 768px) { .calendar-index__date-day { font-size: 64px; } }
.calendar-index__row:not(.is-past):first-child .calendar-index__date-day { color: var(--color-primary); }
.calendar-index__row.is-past .calendar-index__date-day { color: var(--color-text-muted); }
.calendar-index__date-year { font-size: 11px; color: var(--color-text-muted); font-weight: 600; }
.calendar-index__content { min-inline-size: 0; }
.calendar-index__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 6px var(--space-1); margin-block-end: var(--space-1); }
.calendar-index__chip { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: var(--radius-xs); font-size: 11px; font-weight: 700; background: var(--color-surface-alt); color: var(--color-ink); }
.calendar-index__chip--assembly { background: var(--color-brand-blue); color: var(--color-white); }
.calendar-index__chip--quarterly-report, .calendar-index__chip--webcast { background: var(--color-tint); color: var(--color-primary); }
.calendar-index__chip--fiscal { background: var(--color-ink); color: var(--color-white); }
.calendar-index__chip--dividend { background: var(--color-white); color: var(--color-primary); box-shadow: inset 0 0 0 1px var(--color-primary); }
.calendar-index__chip--soft { background: var(--color-white); color: var(--color-text-muted); box-shadow: inset 0 0 0 1px var(--color-border); font-weight: 600; }
.calendar-index__chip--done { background: var(--color-surface); color: var(--color-text-muted); }
.calendar-index__meta { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--color-text-muted); }
.calendar-index__content h3 { font: var(--text-h3); font-size: 18px; font-weight: 800; margin: 0 0 6px; }
.calendar-index__content > p { font-size: 13px; line-height: 1.8; color: var(--color-text-muted); margin: 0; }
.calendar-index__links { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-start: 12px; font-size: 12px; font-weight: 700; }
.calendar-index__links a { display: inline-flex; align-items: center; gap: 4px; color: var(--color-primary); text-decoration: none; }
.calendar-index__links a:hover { text-decoration: underline; }
.calendar-index__links-sep { color: var(--color-border); }
.calendar-index__actions { grid-column: 1 / -1; display: flex; align-items: center; justify-content: flex-end; gap: var(--space-1); }
@media (min-width: 768px) { .calendar-index__actions { grid-column: auto; align-self: center; } }
.calendar-index__add { position: relative; }
.calendar-index__icon-btn { inline-size: 40px; block-size: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-white); color: var(--color-text-muted); cursor: pointer; }
.calendar-index__icon-btn:hover, .calendar-index__icon-btn[aria-expanded='true'] { border-color: var(--color-primary); color: var(--color-primary); }
.calendar-index__menu { position: absolute; inset-block-start: calc(100% + 6px); inset-inline-end: 0; z-index: 5; min-inline-size: 220px; display: flex; flex-direction: column; padding: 6px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); box-shadow: 0 12px 28px rgb(4 28 44 / 12%); }
.calendar-index__menu a, .calendar-index__menu button { display: block; padding: 9px 10px; border: none; border-radius: var(--radius-xs); background: none; color: var(--color-text); font: inherit; font-size: 13px; font-weight: 600; text-align: start; text-decoration: none; cursor: pointer; }
.calendar-index__menu a:hover, .calendar-index__menu button:hover { background: var(--color-tint); color: var(--color-primary); }
.calendar-index__arrow { inline-size: 44px; block-size: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-primary); color: var(--color-white); transition: background 0.2s; }
.calendar-index__arrow:hover { background: var(--color-primary-hover); }
.calendar-index__row.is-past .calendar-index__arrow { background: var(--color-ink); }

.calendar-index__empty { display: flex; flex-direction: column; align-items: center; gap: var(--space-1); padding: var(--space-6) var(--space-3); text-align: center; border: 1px dashed var(--color-border); border-radius: var(--radius-md); color: var(--color-text-muted); }
.calendar-index__empty strong { color: var(--color-text); font-size: 15px; }
.calendar-index__empty p { font-size: 13px; margin: 0 0 var(--space-1); }
.calendar-index__more { display: flex; justify-content: center; margin-block-start: var(--space-4); }
.calendar-index__more-btn { display: inline-flex; align-items: center; gap: var(--space-1); padding: 11px 24px; border: 1px solid var(--color-ink); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.calendar-index__more-btn:hover { background: var(--color-ink); color: var(--color-white); }

/* support */
.calendar-index__support { display: grid; grid-template-columns: 1fr; gap: var(--space-3); align-items: center; margin-block-start: var(--space-4); padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 1024px) { .calendar-index__support { grid-template-columns: 1fr 340px; padding: var(--space-6) var(--space-4); } }
.calendar-index__support-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--color-primary); margin-block-end: var(--space-1); }
.calendar-index__support h2 { font: var(--text-h3); font-size: 24px; font-weight: 800; margin: 0 0 var(--space-1); }
.calendar-index__support p { font-size: 14px; line-height: 1.8; color: var(--color-text-muted); margin: 0; }
.calendar-index__support-actions { display: flex; flex-direction: column; gap: 12px; }
.calendar-index__support-btn { display: flex; align-items: center; justify-content: center; gap: var(--space-1); padding: 13px 20px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text); font-size: 14px; font-weight: 700; text-decoration: none; }
.calendar-index__support-btn:hover { border-color: var(--color-primary); color: var(--color-primary); }
.calendar-index__support-btn--primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-white); }
.calendar-index__support-btn--primary:hover { background: var(--color-primary-hover); color: var(--color-white); }
</style>
