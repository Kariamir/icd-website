<script setup lang="ts">
// Template `02a-index-card-grid` (docs/page-templates-icd3d.md §4), rebuilt
// to match `project_detail_page_template/02a_index_card_grid/code.html`:
// breadcrumb → intro banner → filter module (region / status / usage selects,
// built-area + floors range sliders, apply / reset) → results bar with sort
// pills → 3-column project card grid → pagination + «load more» → empty
// state. One component serves all four status indexes; the status select
// defaults to the page's status and switching it navigates to that status's
// index (or «همه وضعیت‌ها» widens the current page). Filters / sort / page
// live in the URL query. Site header/footer come from the shared layout.
import {
  STATUS,
  PROJECT_REGIONS,
  PROJECT_USAGE_TYPES,
  getProjectArchiveCards,
  type ProjectStatusKey,
} from '~/utils/projectsData'
import { useIndexGridPaging, useIndexGridQuery, faNum } from '~/composables/useIndexGridQuery'

const props = defineProps<{ status: ProjectStatusKey }>()

const intro: Record<ProjectStatusKey, { eyebrow: string; title: string; description: string }> = {
  'upcoming': {
    eyebrow: 'پروژه‌های آتی — طراحی و فاز مطالعاتی',
    title: 'پروژه‌های آتی هلدینگ ثاخت',
    description: 'مگاپروژه‌هایی که در مرحله مطالعات مفهومی، طراحی و اخذ مجوز قرار دارند؛ نسل بعدی پرتفوی تجاری، مسکونی و گردشگری هلدینگ.',
  },
  'under-construction': {
    eyebrow: 'پرتفوی مگاپروژه‌های ملی در حال اجرا',
    title: 'پروژه‌های در حال ساخت هلدینگ ثاخت',
    description: 'مجموعه‌ای از مگاپروژه‌های تجاری، اداری، مسکونی و گردشگری در حال اجرا با رعایت دقیق‌ترین استانداردهای مهندسی سازه و معماری پایدار.',
  },
  'operating': {
    eyebrow: 'دارایی‌های مولد و در حال بهره‌برداری',
    title: 'پروژه‌های در حال بهره‌برداری',
    description: 'مجتمع‌های تجاری، اداری و اقامتی هلدینگ که به بهره‌برداری رسیده‌اند و در حال خلق ارزش پایدار برای سهامداران و بهره‌برداران هستند.',
  },
  'completed': {
    eyebrow: 'کارنامه پروژه‌های تحویل‌شده',
    title: 'پروژه‌های تکمیل‌شده و تحویل قطعی',
    description: 'پروژه‌هایی که ساخت آن‌ها به پایان رسیده و به‌طور کامل تحویل شده‌اند؛ شاهدی بر کیفیت اجرا و تعهد زمانی هلدینگ ثاخت.',
  },
}

const allCards = getProjectArchiveCards()
const AREA_MIN = 10000
const AREA_MAX = 50000
const FLOORS_MIN = 1
const FLOORS_MAX = 60

const { applied, draft, apply, reset, setNow, buildQuery, isDirty, activeCount } = useIndexGridQuery({
  status: props.status as string,
  region: 'all',
  usage: 'all',
  areaMin: AREA_MIN,
  areaMax: AREA_MAX,
  floorsMin: FLOORS_MIN,
  floorsMax: FLOORS_MAX,
  sort: 'newest',
})

const statusOptions = [
  { value: 'all', label: 'تمام وضعیت‌ها' },
  ...(Object.entries(STATUS) as [ProjectStatusKey, { label: string }][]).map(([value, s]) => ({ value, label: s.label })),
]
const regionOptions = [
  { value: 'all', label: 'تمام استان‌ها و مناطق (سراسری)' },
  ...Object.entries(PROJECT_REGIONS).map(([value, label]) => ({ value, label })),
]
const usageOptions = [
  { value: 'all', label: 'تمامی کاربری‌ها' },
  ...Object.entries(PROJECT_USAGE_TYPES).map(([value, label]) => ({ value, label })),
]
const sortOptions = [
  { value: 'newest', label: 'جدیدترین پروژه‌ها' },
  { value: 'area', label: 'بیشترین متراژ زیربنا' },
  { value: 'phase', label: 'پیشرفته‌ترین فاز اجرایی' },
]

const filtered = computed(() => {
  const f = applied.value
  const list = allCards.filter(c =>
    (f.status === 'all' || c.status === f.status)
    && (f.region === 'all' || c.region === f.region)
    && (f.usage === 'all' || c.usageType === f.usage)
    && c.areaSqm >= f.areaMin && c.areaSqm <= f.areaMax
    && c.floorsCount >= f.floorsMin && c.floorsCount <= f.floorsMax,
  )
  if (f.sort === 'area') return [...list].sort((a, b) => b.areaSqm - a.areaSqm)
  if (f.sort === 'phase') return [...list].sort((a, b) => b.phaseScore - a.phaseScore)
  return [...list].sort((a, b) => b.startYear - a.startYear)
})

const paging = useIndexGridPaging(filtered, 6)
const { visible } = paging

const effectiveStatus = computed(() => applied.value.status as ProjectStatusKey | 'all')
const heading = computed(() => (effectiveStatus.value === 'all'
  ? { eyebrow: 'پرتفوی مگاپروژه‌های ملی و بین‌المللی', title: 'پروژه‌ها و شاهکارهای عمرانی هلدینگ ثاخت', description: intro['under-construction'].description }
  : intro[props.status]))

const statusTotal = computed(() => allCards.filter(c => effectiveStatus.value === 'all' || c.status === effectiveStatus.value).length)

const crumbs = computed(() => [
  { label: 'صفحه اصلی', to: '/' },
  { label: 'پروژه‌ها', to: '/projects' },
  { label: effectiveStatus.value === 'all' ? 'آرشیو جامع پروژه‌های عمرانی و ساختمانی' : `پروژه‌های ${STATUS[props.status].label}` },
])

// Switching the status select to another specific status moves to that
// status's own index URL, carrying the other filters along.
function onApply() {
  const target = draft.status
  if (target !== 'all' && target !== props.status && target in STATUS) {
    const q = buildQuery(draft)
    delete q.status
    return navigateTo({ path: STATUS[target as ProjectStatusKey].index, query: q })
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
  <div class="project-index">
    <IndexGridIntro :crumbs="crumbs" :eyebrow="heading.eyebrow" :title="heading.title" :description="heading.description" />

    <IndexGridFilterPanel :dirty="isDirty" :active-count="activeCount" @apply="onApply" @reset="reset">
      <IndexGridSelect v-model="draft.region" label="موقعیت جغرافیایی" icon="location" :options="regionOptions" />
      <IndexGridSelect v-model="draft.status" label="وضعیت عملیاتی و مهندسی" icon="status" :options="statusOptions" />
      <IndexGridSelect v-model="draft.usage" label="نوع کاربری و ساختار پروژه" icon="type" :options="usageOptions" />
      <template #secondary>
        <IndexGridRange
          v-model:low="draft.areaMin"
          v-model:high="draft.areaMax"
          label="محدوده زیربنا (مترمربع)"
          :min="AREA_MIN"
          :max="AREA_MAX"
          :step="1000"
          unit="m²"
          :min-label="`${faNum(AREA_MIN)} متر`"
          :max-label="`${faNum(AREA_MAX)} متر`"
        />
        <IndexGridRange
          v-model:low="draft.floorsMin"
          v-model:high="draft.floorsMax"
          label="تعداد طبقات و ارتفاع سازه"
          :min="FLOORS_MIN"
          :max="FLOORS_MAX"
          unit="طبقه"
          :min-label="`کم‌مرتبه (${faNum(FLOORS_MIN)}+)`"
          :max-label="`آسمان‌خراش (${faNum(FLOORS_MAX)})`"
        />
      </template>
    </IndexGridFilterPanel>

    <div ref="resultsEl" class="project-index__results-anchor">
      <IndexGridResultsBar
        v-model:sort="sort"
        :count="filtered.length"
        :total="statusTotal"
        noun="پروژه"
        :total-note="`از مجموع ${faNum(allCards.length)} پروژه ملی در دست هلدینگ`"
        :sort-options="sortOptions"
      />
    </div>

    <template v-if="filtered.length">
      <div class="project-index__grid">
        <ProjectCard v-for="card in visible" :key="card.slug" :project="card" />
      </div>
      <IndexGridPagination
        :page="paging.page.value"
        :page-count="paging.pageCount.value"
        :last-shown-page="paging.lastShownPage.value"
        :total="filtered.length"
        noun="پروژه"
        :can-load-more="paging.canLoadMore.value"
        load-more-label="بارگذاری پروژه‌های بیشتر"
        @go="goToPage"
        @load-more="paging.loadMore"
      />
    </template>
    <IndexGridEmpty
      v-else
      title="پروژه‌ای مطابق فیلترهای انتخابی یافت نشد"
      text="محدوده زیربنا، تعداد طبقات یا موقعیت جغرافیایی را تغییر دهید، یا همه وضعیت‌ها را بررسی کنید."
      @reset="reset"
    >
      <NuxtLink to="/projects/map">مشاهده اطلس تعاملی پروژه‌ها</NuxtLink>
    </IndexGridEmpty>
  </div>
</template>

<style scoped>
.project-index {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding: 0 var(--space-3) var(--space-12);
}

.project-index__results-anchor { scroll-margin-block-start: var(--space-12); }

.project-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
@media (min-width: 720px) { .project-index__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .project-index__grid { grid-template-columns: repeat(3, 1fr); } }
</style>
