<script setup lang="ts">
import { STATUS, projectSummaries as projects, getProjectDetail } from '~/utils/projectsData'
import type { ProjectStatusKey } from '~/utils/catalog'

// Template `01b-cluster-hub-visual` (docs/page-templates-icd3d.md §3), rebuilt
// to match `project_detail_page_template/01b_cluster_hub_visual/code.html`
// structurally: breadcrumb + title, segmented status filter, a real
// multi-field filter strip, a result/sort/view-mode bar, a scrollable
// property card list (mini engineering-spec strip, favorite toggle,
// footer CTA — richer on the active card) synced to the map, and a
// portfolio summary strip. Site header/footer are the shared layout, not
// reproduced here. Styling uses the balanced (not sharp, not fully round)
// corner scale from docs/design-system-icd3d.md §4.1, not the mockup's
// literal Tailwind rounded-2xl/3xl/full classes.
//
// The map panel is now a real interactive map of Iran (`IranProjectMap`),
// replacing the percentage-positioned pins on a blank plate and the
// «satellite layer» toggle, which toggled nothing.

type ViewMode = 'map' | 'grid'
type SortKey = 'featured' | 'area' | 'progress'

const activeStatus = ref<ProjectStatusKey | 'all'>('all')
const activeSlug = ref<string | null>(projects.find(p => p.featured)?.slug ?? projects[0]?.slug ?? null)
const viewMode = ref<ViewMode>('map')
const sortKey = ref<SortKey>('featured')
const searchQuery = ref('')
const usageFilter = ref('all')
const provinceFilter = ref('all')
const companyFilter = ref('all')
const areaBandFilter = ref<'all' | 'high' | 'mid' | 'low'>('all')
const favorites = reactive(new Set<string>())
const mapEl = ref<InstanceType<typeof import('./IranProjectMap.vue').default> | null>(null)

const statusEntries = Object.entries(STATUS) as [ProjectStatusKey, typeof STATUS[ProjectStatusKey]][]

const allDetails = projects.map(p => getProjectDetail(p.slug)!).filter(Boolean)

const usageOptions = computed(() => Array.from(new Set(allDetails.map(d => d.usage))))
const provinceOptions = computed(() => Array.from(new Set(allDetails.map(d => d.location.split('،')[0]!.trim()))))
const companyOptions = computed(() => Array.from(new Set(allDetails.map(d => d.ownerCompany ?? 'هلدینگ ثاخت (مستقیم)'))))

const areaBands = {
  high: { label: 'بیش از ۳۰,۰۰۰ متر مربع', test: (n: number) => n > 30000 },
  mid: { label: '۲۰,۰۰۰ تا ۳۰,۰۰۰ متر مربع', test: (n: number) => n >= 20000 && n <= 30000 },
  low: { label: 'کمتر از ۲۰,۰۰۰ متر مربع', test: (n: number) => n < 20000 },
} as const

function countByStatus(key: ProjectStatusKey) {
  return projects.filter(p => p.status === key).length
}

const filteredCards = computed(() => {
  const q = searchQuery.value.trim()
  return projects
    .filter(p => activeStatus.value === 'all' || p.status === activeStatus.value)
    .map(p => ({ ...p, detail: getProjectDetail(p.slug)! }))
    .filter(c => !q || c.name.includes(q) || c.detail.location.includes(q))
    .filter(c => usageFilter.value === 'all' || c.detail.usage === usageFilter.value)
    .filter(c => provinceFilter.value === 'all' || c.detail.location.startsWith(provinceFilter.value))
    .filter(c => companyFilter.value === 'all' || (c.detail.ownerCompany ?? 'هلدینگ ثاخت (مستقیم)') === companyFilter.value)
    .filter(c => areaBandFilter.value === 'all' || areaBands[areaBandFilter.value].test(c.detail.areaSqm))
})

const sortedCards = computed(() => {
  const list = [...filteredCards.value]
  if (sortKey.value === 'area') return list.sort((a, b) => b.detail.areaSqm - a.detail.areaSqm)
  if (sortKey.value === 'progress') return list.sort((a, b) => (b.detail.progressPercent ?? -1) - (a.detail.progressPercent ?? -1))
  return list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
})

const activeProject = computed(() => projects.find(p => p.slug === activeSlug.value))
const activeDetail = computed(() => (activeSlug.value ? getProjectDetail(activeSlug.value) : null))

function toggleFavorite(slug: string) {
  if (favorites.has(slug)) favorites.delete(slug)
  else favorites.add(slug)
}

/* Choosing a card from the list moves the map to that project. */
function focusOnMap(slug: string) {
  activeSlug.value = slug
  mapEl.value?.focusSlug(slug)
}

const totalAreaSqm = allDetails.reduce((sum, d) => sum + d.areaSqm, 0)
</script>

<template>
  <div class="map-explorer">
    <nav class="map-explorer__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="map-explorer__breadcrumb-current">اطلس و کاوشگر تعاملی پروژه‌ها</span>
    </nav>

    <header class="map-explorer__intro">
      <h1>اطلس تعاملی و پایش جغرافیایی پروژه‌های هلدینگ ثاخت</h1>
      <p>ردیابی مکانی، شناسنامه مهندسی و آخرین وضعیت ساخت‌وساز در پروژه‌های شاخص هلدینگ.</p>
    </header>

    <div class="map-explorer__filters" role="group" aria-label="فیلتر وضعیت پروژه">
      <button type="button" class="map-explorer__filter-pill" :class="{ 'is-active': activeStatus === 'all' }" @click="activeStatus = 'all'">
        همه پروژه‌ها ({{ projects.length }})
      </button>
      <button
        v-for="[key, meta] in statusEntries"
        :key="key"
        type="button"
        class="map-explorer__filter-pill"
        :class="[`status-${key}`, { 'is-active': activeStatus === key }]"
        @click="activeStatus = key"
      >
        {{ meta.label }} ({{ countByStatus(key) }})
      </button>
    </div>

    <div class="map-explorer__search-bar">
      <label class="map-explorer__field map-explorer__field--search">
        <span class="map-explorer__field-label">جستجوی نام یا موقعیت پروژه</span>
        <span class="map-explorer__search-input">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
          <input v-model="searchQuery" type="text" placeholder="مثلاً «تهران» یا «برج بین‌المللی»">
          <button v-if="searchQuery" type="button" class="map-explorer__search-clear" title="پاک کردن" @click="searchQuery = ''">×</button>
        </span>
      </label>
      <label class="map-explorer__field">
        <span class="map-explorer__field-label">کاربری اصلی</span>
        <select v-model="usageFilter">
          <option value="all">همه کاربری‌ها</option>
          <option v-for="u in usageOptions" :key="u" :value="u">{{ u }}</option>
        </select>
      </label>
      <label class="map-explorer__field">
        <span class="map-explorer__field-label">استان / موقعیت</span>
        <select v-model="provinceFilter">
          <option value="all">همه استان‌ها</option>
          <option v-for="p in provinceOptions" :key="p" :value="p">{{ p }}</option>
        </select>
      </label>
      <label class="map-explorer__field">
        <span class="map-explorer__field-label">شرکت مجری / تابعه</span>
        <select v-model="companyFilter">
          <option value="all">کلیه شرکت‌های گروه</option>
          <option v-for="c in companyOptions" :key="c" :value="c">{{ c }}</option>
        </select>
      </label>
      <label class="map-explorer__field">
        <span class="map-explorer__field-label">متراژ زیربنا</span>
        <select v-model="areaBandFilter">
          <option value="all">همه متراژها</option>
          <option v-for="(band, key) in areaBands" :key="key" :value="key">{{ band.label }}</option>
        </select>
      </label>
    </div>

    <div class="map-explorer__meta-row">
      <div class="map-explorer__meta-text">
        <h2>پروژه‌های شاخص در محدوده انتخابی</h2>
        <p>نمایش {{ sortedCards.length }} مورد از مجموع {{ projects.length }} پروژه فعال هلدینگ</p>
      </div>
      <div class="map-explorer__meta-controls">
        <label class="map-explorer__sort">
          <span>مرتب‌سازی:</span>
          <select v-model="sortKey">
            <option value="featured">شاخص‌ترین پروژه‌ها</option>
            <option value="area">بیشترین مساحت زیربنا</option>
            <option value="progress">درصد پیشرفت فیزیکی</option>
          </select>
        </label>
        <div class="map-explorer__view-toggle" role="group" aria-label="حالت نمایش">
          <button type="button" :class="{ 'is-active': viewMode === 'map' }" @click="viewMode = 'map'">نمای نقشه</button>
          <button type="button" :class="{ 'is-active': viewMode === 'grid' }" @click="viewMode = 'grid'">شبکه‌ای</button>
        </div>
      </div>
    </div>

    <div class="map-explorer__body" :class="`is-${viewMode}`">
      <ul class="map-explorer__list" aria-label="فهرست پروژه‌ها">
        <li v-for="card in sortedCards" :key="card.slug">
          <article
            class="map-explorer__card"
            :class="{ 'is-active': card.slug === activeSlug }"
            @mouseenter="activeSlug = card.slug"
            @focusin="activeSlug = card.slug"
          >
            <div class="map-explorer__card-accent" />
            <div class="map-explorer__card-row">
              <div class="map-explorer__card-thumb" :class="`status-${card.status}`">
                <img :src="card.detail.image" :alt="card.name" loading="lazy" class="map-explorer__card-img">
                <span class="map-explorer__card-status-badge" :class="`status-${card.status}`">
                  {{ STATUS[card.status].label }}<template v-if="card.detail.progressPercent"> ({{ card.detail.progressPercent }}٪)</template>
                </span>
                <span class="map-explorer__card-code">کد: {{ card.code }}</span>
              </div>
              <div class="map-explorer__card-content">
                <div class="map-explorer__card-head">
                  <span class="map-explorer__card-eyebrow">{{ card.detail.category }}</span>
                  <button
                    type="button"
                    class="map-explorer__card-favorite"
                    :class="{ 'is-favorite': favorites.has(card.slug) }"
                    :title="favorites.has(card.slug) ? 'حذف از نشان‌شده‌ها' : 'نشان‌کردن پروژه'"
                    @click.stop="toggleFavorite(card.slug)"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" :fill="favorites.has(card.slug) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.6"><path d="M12 21s-7.5-4.6-10-9.1C.4 8.1 2.3 4.5 6 4a5 5 0 0 1 6 2.4A5 5 0 0 1 18 4c3.7.5 5.6 4.1 4 7.9-2.5 4.5-10 9.1-10 9.1Z"/></svg>
                  </button>
                </div>
                <h3 class="map-explorer__card-title">{{ card.name }}</h3>
                <p class="map-explorer__card-location">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
                  {{ card.detail.location }}
                </p>
                <div class="map-explorer__card-stats">
                  <div><span>مساحت زیربنا</span><strong>{{ card.detail.area }}</strong></div>
                  <div><span>تعداد طبقات</span><strong>{{ card.detail.floors }}</strong></div>
                  <div><span>شرکت مجری</span><strong>{{ card.detail.ownerCompany ?? 'هلدینگ ثاخت' }}</strong></div>
                </div>
                <div class="map-explorer__card-footer">
                  <div class="map-explorer__card-footer-stat">
                    <span>وضعیت پیشرفت</span>
                    <strong>{{ card.detail.year }}</strong>
                  </div>
                  <div class="map-explorer__card-actions">
                    <button v-if="card.slug === activeSlug" type="button" class="map-explorer__card-btn map-explorer__card-btn--secondary" @click="viewMode = 'map'; focusOnMap(card.slug)">
                      مشاهده روی نقشه
                    </button>
                    <NuxtLink :to="`/projects/${card.slug}`" class="map-explorer__card-btn" :class="card.slug === activeSlug ? 'map-explorer__card-btn--primary' : 'map-explorer__card-btn--outline'">
                      {{ card.slug === activeSlug ? 'شناسنامه و تور پروژه' : 'مشاهده جزئیات' }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </li>
        <li v-if="!sortedCards.length" class="map-explorer__empty">پروژه‌ای مطابق فیلترهای انتخابی یافت نشد.</li>
      </ul>

      <div v-if="viewMode === 'map'" class="map-explorer__map">
        <!--
          A real map of Iran, drawn from self-hosted geometry — no tile
          service, because Google Maps and Mapbox are both unreachable from
          inside Iran. See app/utils/iranMap.ts.
        -->
        <IranProjectMap
          ref="mapEl"
          :projects="sortedCards"
          :active-slug="activeSlug"
          @select="activeSlug = $event"
        />

        <div v-if="activeProject && activeDetail" class="map-explorer__floating-card">
          <div class="map-explorer__floating-head">
            <span class="map-explorer__floating-tag">پروژه در حال نمایش</span>
            <span class="map-explorer__floating-title">{{ activeProject.name }}</span>
          </div>
          <dl class="map-explorer__floating-stats">
            <div><dt>موقعیت مکانی</dt><dd>{{ activeDetail.location }}</dd></div>
            <div><dt>زیربنای کل</dt><dd>{{ activeDetail.area }}</dd></div>
            <div><dt>کاربری</dt><dd>{{ activeDetail.usage }}</dd></div>
            <div><dt>شرکت مجری</dt><dd>{{ activeDetail.ownerCompany ?? 'هلدینگ ثاخت' }}</dd></div>
          </dl>
          <NuxtLink :to="`/projects/${activeProject.slug}`" class="map-explorer__floating-cta">
            ورود به صفحه اختصاصی پروژه
          </NuxtLink>
        </div>
      </div>

      <div v-else class="map-explorer__grid-note">
        <p>حالت شبکه‌ای فعال است — فهرست کامل پروژه‌های فیلترشده در ستون سمت راست نمایش داده می‌شود.</p>
      </div>
    </div>

    <div class="map-explorer__summary">
      <div><strong>{{ projects.length }}</strong><span>پروژه فعال هلدینگ</span></div>
      <div><strong>{{ totalAreaSqm.toLocaleString('fa-IR') }}</strong><span>مجموع متراژ زیربنا (متر مربع)</span></div>
      <div><strong>{{ countByStatus('under-construction') }}</strong><span>پروژه در حال ساخت</span></div>
      <div><strong>{{ countByStatus('operating') + countByStatus('completed') }}</strong><span>پروژه بهره‌برداری‌شده یا تکمیل‌شده</span></div>
    </div>
  </div>
</template>

<style scoped>
.map-explorer {
  color: var(--color-ink);
  background: var(--color-white);
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-3) var(--space-3) var(--space-12);

  --status-upcoming-bg: var(--color-surface-alt);
  --status-upcoming-fg: var(--color-ink);
  --status-under-construction-bg: var(--color-tint);
  --status-under-construction-fg: var(--color-brand-blue);
  --status-operating-bg: var(--color-brand-blue);
  --status-operating-fg: var(--color-white);
  --status-completed-bg: var(--color-ink);
  --status-completed-fg: var(--color-white);
}

.map-explorer__breadcrumb { display: flex; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.map-explorer__breadcrumb a { color: inherit; text-decoration: none; }
.map-explorer__breadcrumb a:hover { color: var(--color-primary); }
.map-explorer__breadcrumb-current { color: var(--color-text); font-weight: 600; }

.map-explorer__intro { padding-block-end: var(--space-3); max-width: 68ch; }
.map-explorer__intro h1 { font: var(--text-h2); margin-block-end: var(--space-1); }
.map-explorer__intro p { font: var(--text-body-sm); color: var(--color-text-muted); }

.map-explorer__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-block-end: var(--space-2);
}

.map-explorer__filter-pill {
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-ink);
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: border-color 160ms ease;
}
.map-explorer__filter-pill:hover { border-color: var(--color-brand-blue); }
.map-explorer__filter-pill.is-active {
  background: var(--status-upcoming-bg);
  color: var(--status-upcoming-fg);
  border-color: transparent;
}
.map-explorer__filter-pill.status-under-construction.is-active { background: var(--status-under-construction-bg); color: var(--status-under-construction-fg); }
.map-explorer__filter-pill.status-operating.is-active { background: var(--status-operating-bg); color: var(--status-operating-fg); }
.map-explorer__filter-pill.status-completed.is-active { background: var(--status-completed-bg); color: var(--status-completed-fg); }

.map-explorer__search-bar {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  padding: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  margin-block-end: var(--space-3);
}
@media (min-width: 1024px) { .map-explorer__search-bar { grid-template-columns: 2fr repeat(4, 1fr); } }

.map-explorer__field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.map-explorer__field select, .map-explorer__field input { min-width: 0; width: 100%; }
.map-explorer__field-label { font: var(--text-label); font-size: 12px; color: var(--color-text-muted); }
.map-explorer__field select {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  background: var(--color-white);
  padding: 10px var(--space-2);
  font: var(--text-body-sm);
  color: var(--color-text);
  font-family: inherit;
}
.map-explorer__search-input {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  background: var(--color-white);
  padding: 8px var(--space-2);
  color: var(--color-text-muted);
}
.map-explorer__search-input input { border: none; outline: none; flex: 1; font: var(--text-body-sm); color: var(--color-text); background: transparent; }
.map-explorer__search-clear { border: none; background: none; cursor: pointer; font-size: 16px; color: var(--color-text-muted); line-height: 1; }

.map-explorer__meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-block-end: var(--space-2);
}
.map-explorer__meta-text h2 { font: var(--text-h3); }
.map-explorer__meta-text p { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-start: 2px; }
.map-explorer__meta-controls { display: flex; align-items: center; gap: var(--space-2); flex-wrap: wrap; }
.map-explorer__sort { display: flex; align-items: center; gap: 8px; font: var(--text-body-sm); }
.map-explorer__sort select { border: 1px solid var(--color-border); border-radius: var(--radius-xs); padding: 8px var(--space-2); font: var(--text-body-sm); font-family: inherit; }
.map-explorer__view-toggle { display: flex; border: 1px solid var(--color-border); border-radius: var(--radius-pill); overflow: hidden; }
.map-explorer__view-toggle button { border: none; background: var(--color-white); padding: 8px 16px; font: var(--text-body-sm); font-weight: 700; cursor: pointer; font-family: inherit; }
.map-explorer__view-toggle button.is-active { background: var(--color-ink); color: var(--color-white); }

.map-explorer__body { display: flex; gap: var(--space-3); align-items: stretch; }
.map-explorer__body.is-grid { flex-direction: column; }

.map-explorer__list {
  list-style: none;
  margin: 0;
  padding: var(--space-1);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
.map-explorer__body.is-map .map-explorer__list { flex: 0 0 420px; max-height: 780px; overflow-y: auto; }
.map-explorer__body.is-grid .map-explorer__list { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-2); }
@media (min-width: 640px) { .map-explorer__body.is-grid .map-explorer__list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1200px) { .map-explorer__body.is-grid .map-explorer__list { grid-template-columns: repeat(3, 1fr); } }
.map-explorer__empty { grid-column: 1 / -1; padding: var(--space-4); text-align: center; color: var(--color-text-muted); font: var(--text-body-sm); }

.map-explorer__card {
  position: relative;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}
.map-explorer__card:hover { border-color: var(--color-brand-blue); }
.map-explorer__card.is-active { border-color: var(--color-brand-blue); box-shadow: 0 6px 18px rgb(4 28 44 / 10%); }
.map-explorer__card-accent { height: 4px; background: transparent; }
.map-explorer__card.is-active .map-explorer__card-accent { background: var(--color-brand-blue); }
.map-explorer__card-row { display: flex; gap: var(--space-2); padding: var(--space-2); }

.map-explorer__card-thumb {
  position: relative;
  flex: 0 0 128px;
  height: 104px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-tint), var(--color-surface-alt));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand-blue-deep);
}
.map-explorer__card-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.map-explorer__card-status-badge {
  position: absolute;
  top: 8px;
  inset-inline-end: 8px;
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  border-radius: var(--radius-pill);
  background: var(--status-upcoming-bg);
  color: var(--status-upcoming-fg);
}
.map-explorer__card-status-badge.status-under-construction { background: var(--status-under-construction-bg); color: var(--status-under-construction-fg); }
.map-explorer__card-status-badge.status-operating { background: var(--status-operating-bg); color: var(--status-operating-fg); }
.map-explorer__card-status-badge.status-completed { background: var(--status-completed-bg); color: var(--status-completed-fg); }
.map-explorer__card-code {
  position: absolute;
  bottom: 8px;
  inset-inline-start: 8px;
  padding: 2px 8px;
  font-size: 10px;
  font-family: monospace;
  background: rgb(4 28 44 / 80%);
  color: var(--color-white);
  border-radius: var(--radius-xs);
}

.map-explorer__card-content { flex: 1; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.map-explorer__card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--space-1); }
.map-explorer__card-eyebrow { font-size: 11px; font-weight: 700; color: var(--color-text-muted); }
.map-explorer__card.is-active .map-explorer__card-eyebrow { color: var(--color-brand-blue); }
.map-explorer__card-favorite { border: none; background: none; cursor: pointer; color: var(--color-border); flex-shrink: 0; padding: 0; }
.map-explorer__card-favorite:hover, .map-explorer__card-favorite.is-favorite { color: #c23b6b; }
.map-explorer__card-title { font-size: 16px; font-weight: 700; margin: 0; }
.map-explorer__card-location { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--color-text-muted); margin: 0; }

.map-explorer__card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-1);
  padding: 8px;
  background: var(--color-surface);
  border-radius: var(--radius-xs);
  margin-block: 4px;
}
.map-explorer__card-stats div { display: flex; flex-direction: column; gap: 2px; }
.map-explorer__card-stats span { font-size: 10px; color: var(--color-text-muted); }
.map-explorer__card-stats strong { font-size: 12px; font-weight: 700; }

.map-explorer__card-footer { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); flex-wrap: wrap; }
.map-explorer__card-footer-stat { display: flex; flex-direction: column; gap: 1px; }
.map-explorer__card-footer-stat span { font-size: 10px; color: var(--color-text-muted); }
.map-explorer__card-footer-stat strong { font-size: 12px; font-weight: 700; }
.map-explorer__card-actions { display: flex; gap: 6px; flex-wrap: wrap; }
.map-explorer__card-btn { border-radius: var(--radius-pill); padding: 8px 14px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid transparent; cursor: pointer; font-family: inherit; }
.map-explorer__card-btn--outline { border-color: var(--color-ink); color: var(--color-ink); background: transparent; }
.map-explorer__card-btn--secondary { background: var(--color-tint); color: var(--color-brand-blue-deep); }
.map-explorer__card-btn--primary { background: var(--color-brand-blue); color: var(--color-white); }

.map-explorer__map {
  position: relative;
  flex: 1;
  min-height: 780px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.map-explorer__floating-card {
  position: absolute;
  bottom: var(--space-2);
  inset-inline-end: var(--space-2);
  width: 300px;
  background: var(--color-white);
  border: 1px solid var(--color-brand-blue);
  border-radius: var(--radius-md);
  box-shadow: 0 12px 32px rgb(4 28 44 / 18%);
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
}
.map-explorer__floating-tag { display: inline-block; width: fit-content; font-size: 11px; font-weight: 700; color: var(--color-brand-blue); background: var(--color-tint); padding: 2px 8px; border-radius: var(--radius-pill); }
.map-explorer__floating-title { font-size: 15px; font-weight: 700; }
.map-explorer__floating-stats { display: flex; flex-direction: column; gap: 4px; margin: 0; }
.map-explorer__floating-stats div { display: flex; justify-content: space-between; font-size: 12px; }
.map-explorer__floating-stats dt { color: var(--color-text-muted); margin: 0; }
.map-explorer__floating-stats dd { margin: 0; font-weight: 600; }
.map-explorer__floating-cta { text-align: center; background: var(--color-brand-blue); color: var(--color-white); border-radius: var(--radius-pill); padding: 9px; font-size: 12px; font-weight: 700; text-decoration: none; }


.map-explorer__grid-note { flex: 1; display: flex; align-items: center; justify-content: center; text-align: center; color: var(--color-text-muted); font: var(--text-body-sm); padding: var(--space-4); }

.map-explorer__summary {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
  margin-block-start: var(--space-4);
  padding: var(--space-3);
  background: var(--color-surface);
  border-radius: var(--radius-md);
}
@media (min-width: 900px) { .map-explorer__summary { grid-template-columns: repeat(4, 1fr); } }
.map-explorer__summary > div { border-inline-start: 2px solid var(--color-brand-blue); padding-inline-start: var(--space-2); display: flex; flex-direction: column; gap: 2px; }
.map-explorer__summary strong { font: var(--text-h3); }
.map-explorer__summary span { font-size: 12px; color: var(--color-text-muted); }

@media (max-width: 900px) {
  .map-explorer__body.is-map { flex-direction: column; }
  .map-explorer__body.is-map .map-explorer__list { flex: none; max-height: 420px; }
  .map-explorer__map { min-height: 420px; }
}
</style>
