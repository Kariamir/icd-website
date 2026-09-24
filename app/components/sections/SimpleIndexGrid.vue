<script setup lang="ts">
// Template `02a-index-card-grid` (docs/page-templates-icd3d.md §4) for the
// non-project archives: board, honors, careers. Same skeleton as the project
// status indexes (IndexCardGrid) — breadcrumb → intro banner → filter module
// (up to three facet selects + keyword search, apply / reset) → results bar
// with sort pills → card grid → pagination + load more → empty state — with
// facets / sort keys supplied per item by the page. Filters, sort and page
// live in the URL query.
import { NuxtLink } from '#components'
import type { IndexGridIcon } from '~/components/ui/IndexGridSelect.vue'
import type { IndexGridCrumb } from '~/components/ui/IndexGridIntro.vue'
import { useIndexGridPaging, useIndexGridQuery } from '~/composables/useIndexGridQuery'

export interface SimpleIndexItem {
  key: string
  title: string
  meta?: string
  excerpt?: string
  image?: { src: string; alt: string }
  href?: string
  /** Pill badge on the card (e.g. «هیات‌مدیره», «گواهینامه»). */
  badge?: string
  /** Small grey chips under the title. */
  tags?: string[]
  /** Bottom stat strip (label / value pairs). */
  stats?: { label: string; value: string }[]
  /** Values matched by `filters[].key`. */
  facets?: Record<string, string>
  /** Values compared by `sortOptions[].by`. */
  sortKeys?: Record<string, number | string>
  /** Optional footer call-to-action. */
  cta?: { label: string; href: string }
}

export interface SimpleIndexFilter {
  key: string
  label: string
  allLabel: string
  icon?: IndexGridIcon
  /** Defaults to the distinct facet values present in `items`. */
  options?: { value: string; label: string }[]
}

export interface SimpleIndexSort {
  value: string
  label: string
  by: string
  dir: 'asc' | 'desc'
}

const props = withDefaults(defineProps<{
  title: string
  description?: string
  items: SimpleIndexItem[]
  crumbs?: IndexGridCrumb[]
  eyebrow?: string
  filters?: SimpleIndexFilter[]
  search?: { label: string; placeholder?: string }
  sortOptions?: SimpleIndexSort[]
  noun?: string
  pageSize?: number
  variant?: 'media' | 'portrait' | 'text'
  loadMoreLabel?: string
  emptyTitle?: string
  emptyText?: string
}>(), {
  description: undefined,
  crumbs: undefined,
  eyebrow: undefined,
  filters: () => [],
  search: undefined,
  sortOptions: () => [],
  noun: 'مورد',
  pageSize: 9,
  variant: 'media',
  loadMoreLabel: 'بارگذاری موارد بیشتر',
  emptyTitle: undefined,
  emptyText: undefined,
})

const defaults: Record<string, string> = { q: '', sort: props.sortOptions[0]?.value ?? '' }
for (const f of props.filters) defaults[f.key] = 'all'

const { applied, draft, apply, reset, setNow, isDirty, activeCount } = useIndexGridQuery(defaults)

const filterOptions = computed(() => props.filters.map((f) => {
  const opts = f.options ?? Array.from(new Set(props.items.map(i => i.facets?.[f.key]).filter((v): v is string => Boolean(v))))
    .map(v => ({ value: v, label: v }))
  return { ...f, options: [{ value: 'all', label: f.allLabel }, ...opts] }
}))

const filtered = computed(() => {
  const a = applied.value
  const q = (a.q ?? '').trim()
  const list = props.items.filter(item =>
    props.filters.every(f => a[f.key] === 'all' || item.facets?.[f.key] === a[f.key])
    && (!q || [item.title, item.meta, item.excerpt, ...(item.tags ?? [])].some(t => t?.includes(q))),
  )
  const sortDef = props.sortOptions.find(s => s.value === a.sort)
  if (!sortDef) return list
  const dir = sortDef.dir === 'asc' ? 1 : -1
  return [...list].sort((x, y) => {
    const vx = x.sortKeys?.[sortDef.by]
    const vy = y.sortKeys?.[sortDef.by]
    if (vx === undefined || vy === undefined) return 0
    if (typeof vx === 'number' && typeof vy === 'number') return (vx - vy) * dir
    return String(vx).localeCompare(String(vy), 'fa') * dir
  })
})

const paging = useIndexGridPaging(filtered, props.pageSize)
const { visible } = paging

const sort = computed({
  get: () => applied.value.sort ?? '',
  set: (v: string) => { setNow('sort', v) },
})

const resolvedCrumbs = computed<IndexGridCrumb[]>(() => props.crumbs ?? [{ label: 'صفحه اصلی', to: '/' }, { label: props.title }])

const resultsEl = ref<HTMLElement | null>(null)
function goToPage(n: number) {
  paging.goTo(n)
  resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="simple-index" :class="`simple-index--${variant}`">
    <IndexGridIntro :crumbs="resolvedCrumbs" :eyebrow="eyebrow" :title="title" :description="description" />

    <IndexGridFilterPanel
      v-if="filters.length || search"
      :dirty="isDirty"
      :active-count="activeCount"
      @apply="apply"
      @reset="reset"
    >
      <IndexGridSelect
        v-for="f in filterOptions"
        :key="f.key"
        :model-value="draft[f.key] ?? 'all'"
        :label="f.label"
        :icon="f.icon"
        :options="f.options"
        @update:model-value="(v: string) => (draft[f.key] = v)"
      />
      <template v-if="search" #secondary>
        <IndexGridSearch
          :model-value="draft.q ?? ''"
          class="simple-index__search"
          :label="search.label"
          :placeholder="search.placeholder"
          @update:model-value="(v: string) => (draft.q = v)"
        />
      </template>
    </IndexGridFilterPanel>

    <div ref="resultsEl" class="simple-index__results-anchor">
      <IndexGridResultsBar
        v-model:sort="sort"
        :count="filtered.length"
        :total="items.length"
        :noun="noun"
        :sort-options="sortOptions"
      />
    </div>

    <template v-if="filtered.length">
      <div class="simple-index__grid">
        <component
          :is="item.href ? NuxtLink : 'article'"
          v-for="item in visible"
          :key="item.key"
          :to="item.href"
          class="simple-index__card"
          :class="{ 'is-link': item.href }"
        >
          <div v-if="item.image && variant !== 'text'" class="simple-index__media">
            <BaseImage :src="item.image.src" :alt="item.image.alt || item.title" />
            <div class="simple-index__scrim" aria-hidden="true" />
            <span v-if="item.badge" class="simple-index__badge">{{ item.badge }}</span>
            <div class="simple-index__overlay">
              <div class="simple-index__heading">
                <span v-if="item.meta" class="simple-index__overlay-meta">{{ item.meta }}</span>
                <h2 class="simple-index__overlay-title">{{ item.title }}</h2>
              </div>
              <span v-if="item.href" class="simple-index__arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
              </span>
            </div>
          </div>
          <div class="simple-index__body">
            <template v-if="!item.image || variant === 'text'">
              <span v-if="item.badge" class="simple-index__badge simple-index__badge--inline">{{ item.badge }}</span>
              <h2 class="simple-index__title">{{ item.title }}</h2>
              <p v-if="item.meta" class="simple-index__meta">{{ item.meta }}</p>
            </template>
            <div v-if="item.tags?.length" class="simple-index__tags">
              <span v-for="t in item.tags" :key="t" class="simple-index__chip">{{ t }}</span>
            </div>
            <p v-if="item.excerpt" class="simple-index__excerpt">{{ item.excerpt }}</p>
            <dl v-if="item.stats?.length" class="simple-index__stats">
              <div v-for="s in item.stats" :key="s.label">
                <dt>{{ s.label }}</dt>
                <dd>{{ s.value }}</dd>
              </div>
            </dl>
            <slot :item="item" />
            <NuxtLink v-if="item.cta && !item.href" :to="item.cta.href" class="simple-index__cta">
              {{ item.cta.label }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            </NuxtLink>
          </div>
        </component>
      </div>
      <IndexGridPagination
        :page="paging.page.value"
        :page-count="paging.pageCount.value"
        :last-shown-page="paging.lastShownPage.value"
        :total="filtered.length"
        :noun="noun"
        :can-load-more="paging.canLoadMore.value"
        :load-more-label="loadMoreLabel"
        @go="goToPage"
        @load-more="paging.loadMore"
      />
    </template>
    <IndexGridEmpty v-else :title="emptyTitle" :text="emptyText" @reset="reset">
      <slot name="empty-actions" />
    </IndexGridEmpty>
  </div>
</template>

<style scoped>
.simple-index { padding-block-end: var(--space-12); }
.simple-index__results-anchor { scroll-margin-block-start: var(--space-12); }
.simple-index__search { grid-column: 1 / -1; }

.simple-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
@media (min-width: 720px) { .simple-index__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1080px) { .simple-index__grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1080px) { .simple-index--portrait .simple-index__grid { grid-template-columns: repeat(4, 1fr); gap: var(--space-3); } }

.simple-index__card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1), border-color 250ms ease;
}
.simple-index__card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -10px rgb(4 28 44 / 14%); }
.simple-index__card.is-link:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }
.simple-index--text .simple-index__card { border-block-start: 3px solid var(--color-primary); }

.simple-index__media { position: relative; block-size: 240px; background: var(--color-surface-alt); overflow: hidden; }
.simple-index--portrait .simple-index__media { block-size: auto; aspect-ratio: 4 / 5; }
.simple-index__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 500ms ease-out; }
.simple-index__card:hover .simple-index__media :deep(img) { transform: scale(1.05); }
.simple-index__scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgb(4 28 44 / 75%), transparent 55%, rgb(0 0 0 / 8%)); }
.simple-index__badge {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-end: var(--space-2);
  padding: 4px 12px;
  font: var(--text-label);
  font-size: 12px;
  background: var(--color-tint);
  color: var(--color-brand-blue);
  border-radius: var(--radius-pill);
}
.simple-index__badge--inline { position: static; align-self: flex-start; }
.simple-index__overlay {
  position: absolute;
  inset-inline: var(--space-2);
  inset-block-end: var(--space-2);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-1);
  color: var(--color-white);
}
.simple-index__heading { display: flex; flex-direction: column; gap: 2px; min-inline-size: 0; }
.simple-index__overlay-meta { font-size: 12px; font-weight: 600; opacity: 0.85; }
.simple-index__overlay-title { font: var(--text-h3); font-weight: 700; color: var(--color-white); }
.simple-index__arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 40px;
  block-size: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 6px 16px rgb(0 0 0 / 25%);
  transition: transform 250ms ease, background-color 250ms ease;
}
.simple-index__card:hover .simple-index__arrow { transform: scale(1.1); background: var(--color-primary-hover); }

.simple-index__body { flex: 1; display: flex; flex-direction: column; gap: 12px; padding: var(--space-3); }
.simple-index--portrait .simple-index__body { padding: var(--space-2); }
.simple-index__title { font: var(--text-h3); font-weight: 700; }
.simple-index__meta { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-start: -6px; }
.simple-index__tags { display: flex; flex-wrap: wrap; gap: 6px; }
.simple-index__chip { padding: 3px 10px; background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; font-weight: 700; border-radius: var(--radius-xs); }
.simple-index__excerpt {
  font: var(--text-body-sm);
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.simple-index__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: var(--space-2);
  margin: auto 0 0;
  padding-block-start: var(--space-2);
  border-block-start: 1px solid var(--color-border);
}
.simple-index__stats dt { font-size: 12px; color: var(--color-text-muted); margin-block-end: 2px; }
.simple-index__stats dd { margin: 0; font-size: 15px; font-weight: 700; }
.simple-index__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  font: var(--text-label);
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease;
}
.simple-index__cta:hover { background: var(--color-primary); color: var(--color-white); }

@media (prefers-reduced-motion: reduce) {
  .simple-index__card, .simple-index__media :deep(img), .simple-index__arrow { transition: none; }
  .simple-index__card:hover { transform: none; }
}
</style>
