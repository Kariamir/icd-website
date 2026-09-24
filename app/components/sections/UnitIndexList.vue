<script setup lang="ts">
// Template `02a-index-card-grid` for the sales unit lists (/sales/available,
// /sales/pre-sale) — same skeleton as the project status indexes
// (IndexCardGrid): breadcrumb → intro banner → filter module (project / sale
// status / usage selects, area + floor range sliders, apply / reset) →
// results bar with sort pills → card grid → pagination + load more → empty
// state. The sale-status select defaults to the page's own status; picking
// the other status navigates to that list, «همه واحدها» widens this one.
import { getUnitArchiveCards, UNIT_USAGE_TYPES } from '~/utils/unitsData'
import { useIndexGridPaging, useIndexGridQuery, faNum } from '~/composables/useIndexGridQuery'

type SaleStatus = 'available' | 'reserved'

const props = defineProps<{ status: SaleStatus }>()

const SALE_ROUTES: Record<SaleStatus, string> = { available: '/sales/available', reserved: '/sales/pre-sale' }
const intro: Record<SaleStatus, { crumb: string; eyebrow: string; title: string; description: string }> = {
  available: {
    crumb: 'واحدهای آماده فروش',
    eyebrow: 'تحویل فوری — سند تک‌برگ',
    title: 'واحدهای آماده فروش هلدینگ ثاخت',
    description: 'واحدهای مسکونی، اداری و تجاری آماده تحویل در پروژه‌های بهره‌برداری‌شده و تکمیل‌شده هلدینگ، با امکان بازدید حضوری و انتقال سند رسمی.',
  },
  reserved: {
    crumb: 'پیش‌فروش',
    eyebrow: 'پیش‌فروش با شرایط اقساطی',
    title: 'پیش‌فروش پروژه‌های در حال ساخت',
    description: 'واحدهای قابل پیش‌خرید در پروژه‌های در حال ساخت هلدینگ، با قیمت‌گذاری روز قرارداد و برنامه پرداخت اقساطی متناسب با پیشرفت فیزیکی.',
  },
}

const allCards = getUnitArchiveCards()
const AREA_MIN = 40
const AREA_MAX = 300
const FLOOR_MIN = 0
const FLOOR_MAX = 60

const { applied, draft, apply, reset, setNow, buildQuery, isDirty, activeCount } = useIndexGridQuery({
  status: props.status as string,
  project: 'all',
  usage: 'all',
  areaMin: AREA_MIN,
  areaMax: AREA_MAX,
  floorMin: FLOOR_MIN,
  floorMax: FLOOR_MAX,
  sort: 'newest',
})

const projectOptions = [
  { value: 'all', label: 'تمام پروژه‌های دارای واحد' },
  ...Array.from(new Map(allCards.map(c => [c.projectSlug, c.projectTitle])).entries()).map(([value, label]) => ({ value, label })),
]
const statusOptions = [
  { value: 'all', label: 'همه واحدها' },
  { value: 'available', label: 'آماده فروش (تحویل فوری)' },
  { value: 'reserved', label: 'پیش‌فروش (در حال ساخت)' },
]
const usageOptions = [
  { value: 'all', label: 'تمامی کاربری‌ها' },
  ...Object.entries(UNIT_USAGE_TYPES).map(([value, label]) => ({ value, label: `واحد ${label}` })),
]
const sortOptions = [
  { value: 'newest', label: 'جدیدترین واحدها' },
  { value: 'area', label: 'بیشترین متراژ' },
  { value: 'price', label: 'کمترین قیمت' },
]

const filtered = computed(() => {
  const f = applied.value
  const list = allCards.filter(c =>
    (f.status === 'all' || c.status === f.status)
    && (f.project === 'all' || c.projectSlug === f.project)
    && (f.usage === 'all' || c.usage === f.usage)
    && c.areaSqm >= f.areaMin && c.areaSqm <= f.areaMax
    && c.floorNum >= f.floorMin && c.floorNum <= f.floorMax,
  )
  if (f.sort === 'area') return [...list].sort((a, b) => b.areaSqm - a.areaSqm)
  if (f.sort === 'price') return [...list].sort((a, b) => (a.priceBn ?? Infinity) - (b.priceBn ?? Infinity))
  return [...list].sort((a, b) => b.listedRank - a.listedRank)
})

const paging = useIndexGridPaging(filtered, 6)
const { visible } = paging

const isAll = computed(() => applied.value.status === 'all')
const heading = computed(() => (isAll.value
  ? { ...intro[props.status], eyebrow: 'فروش و پیش‌فروش', title: 'همه واحدهای فروش هلدینگ ثاخت' }
  : intro[props.status]))
const statusTotal = computed(() => allCards.filter(c => isAll.value || c.status === applied.value.status).length)

const crumbs = computed(() => [
  { label: 'صفحه اصلی', to: '/' },
  { label: 'فروش و پیش‌فروش', to: '/sales' },
  { label: isAll.value ? 'همه واحدها' : intro[props.status].crumb },
])

function onApply() {
  const target = draft.status
  if ((target === 'available' || target === 'reserved') && target !== props.status) {
    const q = buildQuery(draft)
    delete q.status
    return navigateTo({ path: SALE_ROUTES[target], query: q })
  }
  return apply()
}

const sort = computed({
  get: () => applied.value.sort,
  set: (v: string) => { setNow('sort', v) },
})

const resultsEl = ref<HTMLElement | null>(null)
function goToPage(n: number) {
  paging.goTo(n)
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="unit-index">
    <IndexGridIntro :crumbs="crumbs" :eyebrow="heading.eyebrow" :title="heading.title" :description="heading.description" />

    <IndexGridFilterPanel :dirty="isDirty" :active-count="activeCount" @apply="onApply" @reset="reset">
      <IndexGridSelect v-model="draft.project" label="پروژه" icon="building" :options="projectOptions" />
      <IndexGridSelect v-model="draft.status" label="وضعیت فروش" icon="status" :options="statusOptions" />
      <IndexGridSelect v-model="draft.usage" label="کاربری واحد" icon="type" :options="usageOptions" />
      <template #secondary>
        <IndexGridRange
          v-model:low="draft.areaMin"
          v-model:high="draft.areaMax"
          label="محدوده متراژ (مترمربع)"
          :min="AREA_MIN"
          :max="AREA_MAX"
          :step="5"
          unit="m²"
          :min-label="`${faNum(AREA_MIN)} متر`"
          :max-label="`${faNum(AREA_MAX)} متر`"
        />
        <IndexGridRange
          v-model:low="draft.floorMin"
          v-model:high="draft.floorMax"
          label="طبقه واحد"
          :min="FLOOR_MIN"
          :max="FLOOR_MAX"
          min-label="همکف"
          :max-label="`طبقه ${faNum(FLOOR_MAX)}`"
        />
      </template>
    </IndexGridFilterPanel>

    <div ref="resultsEl" class="unit-index__results-anchor">
      <IndexGridResultsBar
        v-model:sort="sort"
        :count="filtered.length"
        :total="statusTotal"
        noun="واحد"
        :total-note="`از مجموع ${faNum(statusTotal)} واحد ${isAll ? 'در فهرست فروش' : status === 'available' ? 'آماده فروش' : 'پیش‌فروش'}`"
        :sort-options="sortOptions"
      />
    </div>

    <template v-if="filtered.length">
      <div class="unit-index__grid">
        <UnitCard v-for="unit in visible" :key="unit.id" :unit="unit" />
      </div>
      <IndexGridPagination
        :page="paging.page.value"
        :page-count="paging.pageCount.value"
        :last-shown-page="paging.lastShownPage.value"
        :total="filtered.length"
        noun="واحد"
        :can-load-more="paging.canLoadMore.value"
        load-more-label="بارگذاری واحدهای بیشتر"
        @go="goToPage"
        @load-more="paging.loadMore"
      />
    </template>
    <IndexGridEmpty
      v-else
      title="واحدی مطابق فیلترهای انتخابی یافت نشد"
      text="محدوده متراژ یا طبقه را گسترده‌تر کنید، یا برای دریافت پیشنهاد اختصاصی با کارشناسان فروش در تماس باشید."
      @reset="reset"
    >
      <NuxtLink to="/sales/consultation">درخواست مشاوره خرید</NuxtLink>
    </IndexGridEmpty>
  </div>
</template>

<style scoped>
.unit-index {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding-block-end: var(--space-12);
}
.unit-index__results-anchor { scroll-margin-block-start: var(--space-12); }
.unit-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
@media (min-width: 720px) { .unit-index__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .unit-index__grid { grid-template-columns: repeat(3, 1fr); } }
</style>
