<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  highlightSegments,
  searchCategoryLabels,
  searchCategoryOrder,
  searchIndexSize,
  searchSiteDetailed,
  searchSuggestions,
  searchYears,
  sortSearchResults,
  toPersianDigits,
  tokenizeQuery,
  type SearchCategory,
  type SearchSortKey,
} from '~/utils/searchData'

// Template `10-search-results`, rebuilt to match
// `project_detail_page_template/10_search_results/code.html` structurally:
// breadcrumb, search panel (input + clear, submit, reset, trending
// suggestion chips), result summary with sort + year selects, category
// pills with live counts, result rows (badge / reference / status flag,
// highlighted title + excerpt, meta strip + CTA, optional thumbnail),
// the «not found?» help banner and pagination. Site header/footer come
// from the shared layout. Corners use the balanced scale in
// docs/design-system-icd3d.md §4.1 instead of the mockup's rounded-2xl/3xl.
// Search runs client-side over app/utils/searchData.ts; the query is kept
// in the URL (?q=) so results are shareable and the back button works.

const props = defineProps<{ initialQuery: string }>()

const PAGE_SIZE = 6

const draft = ref(props.initialQuery)
const activeQuery = computed(() => props.initialQuery.trim())
const activeCategory = ref<SearchCategory | 'all'>('all')
const sortKey = ref<SearchSortKey>('relevance')
const yearFilter = ref<number | 'all'>('all')
const page = ref(1)
const elapsedLabel = ref('')
const inputEl = ref<HTMLInputElement | null>(null)
const resultsTop = ref<HTMLElement | null>(null)

watch(() => props.initialQuery, (next) => {
  draft.value = next
  activeCategory.value = 'all'
  page.value = 1
})
watch([activeCategory, sortKey, yearFilter], () => { page.value = 1 })

const isBrowsing = computed(() => !tokenizeQuery(activeQuery.value).length)
const terms = computed(() => tokenizeQuery(activeQuery.value))

const baseResults = computed(() => searchSiteDetailed(activeQuery.value))
const yearResults = computed(() => yearFilter.value === 'all'
  ? baseResults.value
  : baseResults.value.filter(r => r.item.year === yearFilter.value))

const categoryCounts = computed(() => {
  const counts = Object.fromEntries(searchCategoryOrder.map(c => [c, 0])) as Record<SearchCategory, number>
  for (const r of yearResults.value) counts[r.item.category]++
  return counts
})

const filtered = computed(() => {
  const list = activeCategory.value === 'all'
    ? yearResults.value
    : yearResults.value.filter(r => r.item.category === activeCategory.value)
  return sortSearchResults(list, sortKey.value)
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const pagedResults = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

/** Page buttons with ellipsis: 1 … (p-1) p (p+1) … N */
const pageItems = computed<(number | 'gap')[]>(() => {
  const total = pageCount.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const current = page.value
  const items: (number | 'gap')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) items.push('gap')
  for (let p = start; p <= end; p++) items.push(p)
  if (end < total - 1) items.push('gap')
  items.push(total)
  return items
})

async function goToPage(target: number) {
  page.value = Math.min(Math.max(1, target), pageCount.value)
  await nextTick()
  resultsTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function submitSearch() {
  const q = draft.value.trim()
  navigateTo({ path: '/search', query: q ? { q } : {} })
}

function clearDraft() {
  draft.value = ''
  inputEl.value?.focus()
}

function resetAll() {
  draft.value = ''
  activeCategory.value = 'all'
  sortKey.value = 'relevance'
  yearFilter.value = 'all'
  navigateTo({ path: '/search' })
}

function showAll() {
  activeCategory.value = 'all'
  yearFilter.value = 'all'
}

// Real (client-measured) search time for the «در ۰.۰۲ ثانیه» line.
onMounted(() => {
  watch(activeQuery, (q) => {
    const t0 = performance.now()
    searchSiteDetailed(q)
    const seconds = Math.max(0.01, (performance.now() - t0) / 1000)
    elapsedLabel.value = toPersianDigits(seconds.toFixed(2))
  }, { immediate: true })
})

const highlight = (text: string) => highlightSegments(text, terms.value)
</script>

<template>
  <div class="search-results">
    <div class="search-results__inner">
      <nav class="search-results__breadcrumb" aria-label="مسیریاب">
        <NuxtLink to="/">صفحه اصلی</NuxtLink>
        <span aria-hidden="true">‹</span>
        <NuxtLink v-if="!isBrowsing" to="/search">جستجوی سراسری پرتال ثاخت</NuxtLink>
        <span v-else class="search-results__breadcrumb-current" aria-current="page">جستجوی سراسری پرتال ثاخت</span>
        <template v-if="!isBrowsing">
          <span aria-hidden="true">‹</span>
          <span class="search-results__breadcrumb-current" aria-current="page">نتایج «{{ activeQuery }}»</span>
        </template>
      </nav>

      <h1 class="visually-hidden">جستجوی سراسری پرتال ثاخت</h1>

      <!-- Search panel -->
      <section class="search-results__panel" aria-label="جستجو">
        <form class="search-results__form" role="search" @submit.prevent="submitSearch">
          <div class="search-results__input-wrap">
            <svg class="search-results__input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /></svg>
            <label for="site-search-input" class="visually-hidden">جستجو در سایت</label>
            <input
              id="site-search-input"
              ref="inputEl"
              v-model="draft"
              type="search"
              name="q"
              class="search-results__input"
              placeholder="جستجو در پروژه‌ها، اطلاعیه‌های کدال، اخبار، واحدها و مناقصات..."
              autocomplete="off"
            >
            <button v-if="draft" type="button" class="search-results__clear" aria-label="پاک‌کردن متن" @click="clearDraft">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" /></svg>
            </button>
          </div>
          <div class="search-results__actions">
            <BaseButton type="submit" size="lg" class="search-results__submit">
              جستجو
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 19l-7-7m0 0 7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </BaseButton>
            <button type="button" class="search-results__reset" title="بازنشانی جستجو و فیلترها" @click="resetAll">نوسازی</button>
          </div>
        </form>
        <div class="search-results__suggestions">
          <span>پیشنهادهای پرتکرار:</span>
          <NuxtLink
            v-for="s in searchSuggestions"
            :key="s.label"
            :to="{ path: '/search', query: { q: s.query } }"
            class="search-results__chip"
            :class="{ 'is-active': activeQuery === s.query }"
          >
            {{ s.label }}
          </NuxtLink>
        </div>
      </section>

      <!-- Summary, sort, year, category pills -->
      <section ref="resultsTop" class="search-results__controls" aria-label="فیلتر نتایج">
        <div class="search-results__summary-row">
          <div class="search-results__summary">
            <span class="search-results__count">
              {{ toPersianDigits(yearResults.length) }} {{ isBrowsing ? 'مورد در پرتال' : 'نتیجه یافت شد' }}
            </span>
            <p v-if="!isBrowsing">
              برای عبارت <strong>«{{ activeQuery }}»</strong><template v-if="elapsedLabel"> در {{ elapsedLabel }} ثانیه</template>
            </p>
            <p v-else>عبارتی وارد نشده است؛ همه {{ toPersianDigits(searchIndexSize) }} محتوای نمایه‌شده نمایش داده می‌شود.</p>
          </div>
          <div class="search-results__selects">
            <label class="search-results__select">
              <span>مرتب‌سازی:</span>
              <select v-model="sortKey">
                <option value="relevance">{{ isBrowsing ? 'پیش‌فرض' : 'مرتبط‌ترین نتایج' }}</option>
                <option value="latest">جدیدترین انتشار</option>
                <option value="views">پربازدیدترین‌ها</option>
              </select>
            </label>
            <label class="search-results__select">
              <span>سال:</span>
              <select v-model="yearFilter">
                <option value="all">همه سال‌ها</option>
                <option v-for="y in searchYears" :key="y" :value="y">{{ toPersianDigits(y) }}</option>
              </select>
            </label>
          </div>
        </div>

        <div class="search-results__tabs" role="tablist" aria-label="دسته‌بندی نتایج">
          <button
            type="button"
            role="tab"
            class="search-results__tab"
            :class="{ 'is-active': activeCategory === 'all' }"
            :aria-selected="activeCategory === 'all'"
            @click="activeCategory = 'all'"
          >
            همه نتایج ({{ toPersianDigits(yearResults.length) }})
          </button>
          <button
            v-for="cat in searchCategoryOrder"
            :key="cat"
            type="button"
            role="tab"
            class="search-results__tab"
            :class="{ 'is-active': activeCategory === cat, 'is-empty': !categoryCounts[cat] }"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
          >
            {{ searchCategoryLabels[cat] }} ({{ toPersianDigits(categoryCounts[cat]) }})
          </button>
        </div>
      </section>

      <!-- No results at all -->
      <section v-if="!baseResults.length" class="search-results__empty" aria-live="polite">
        <span class="search-results__empty-icon" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35M8.5 8.5l5 5m0-5-5 5" stroke-linecap="round" /></svg>
        </span>
        <h2>نتیجه‌ای برای «{{ activeQuery }}» یافت نشد</h2>
        <p>ممکن است عبارت جستجو بیش از حد خاص باشد. پیشنهاد می‌کنیم:</p>
        <ul class="search-results__tips">
          <li>املای کلمات را بررسی کنید یا از کلمات کلی‌تر استفاده کنید (مثلاً «مگاپارس» به جای نام کامل پروژه).</li>
          <li>به جای عبارت کامل، یک یا دو کلیدواژه اصلی را جستجو کنید.</li>
          <li>از پیشنهادهای پرتکرار زیر یا بخش‌های اصلی سایت استفاده کنید.</li>
        </ul>
        <div class="search-results__empty-chips">
          <NuxtLink v-for="s in searchSuggestions" :key="s.label" :to="{ path: '/search', query: { q: s.query } }" class="search-results__chip">
            {{ s.label }}
          </NuxtLink>
        </div>
        <div class="search-results__empty-links">
          <BaseButton href="/projects" variant="secondary">مشاهده پروژه‌ها</BaseButton>
          <BaseButton href="/sales/available" variant="secondary">واحدهای قابل فروش</BaseButton>
          <BaseButton href="/ir" variant="secondary">دیده‌بان ثاخت</BaseButton>
        </div>
      </section>

      <!-- Results exist but not in this tab / year -->
      <section v-else-if="!filtered.length" class="search-results__empty search-results__empty--compact" aria-live="polite">
        <h2>در این دسته‌بندی نتیجه‌ای وجود ندارد</h2>
        <p>
          {{ activeCategory !== 'all' ? `«${searchCategoryLabels[activeCategory]}»` : '' }}
          {{ yearFilter !== 'all' ? `در سال ${toPersianDigits(yearFilter)}` : '' }}
          موردی مطابق جستجوی شما ندارد.
        </p>
        <BaseButton @click="showAll">نمایش همه نتایج</BaseButton>
      </section>

      <!-- Result list -->
      <section v-else class="search-results__list" aria-label="نتایج جستجو" aria-live="polite">
        <article v-for="{ item } in pagedResults" :key="item.id" class="search-results__item">
          <div class="search-results__item-body">
            <div class="search-results__item-top">
              <span class="search-results__badge" :class="`search-results__badge--${item.badgeTone}`">{{ item.badge }}</span>
              <span v-if="item.refLabel" class="search-results__ref">{{ item.refLabel }}</span>
              <template v-if="item.flag">
                <span class="search-results__dot" aria-hidden="true" />
                <span class="search-results__flag" :class="`search-results__flag--${item.flag.tone}`">{{ item.flag.text }}</span>
              </template>
            </div>
            <h2 class="search-results__title">
              <NuxtLink :to="item.href">
                <template v-for="(seg, i) in highlight(item.title)" :key="i">
                  <mark v-if="seg.match" class="search-results__mark">{{ seg.text }}</mark>
                  <template v-else>{{ seg.text }}</template>
                </template>
              </NuxtLink>
            </h2>
            <p v-if="item.excerpt" class="search-results__excerpt">
              <template v-for="(seg, i) in highlight(item.excerpt)" :key="i">
                <mark v-if="seg.match" class="search-results__mark">{{ seg.text }}</mark>
                <template v-else>{{ seg.text }}</template>
              </template>
            </p>
            <div class="search-results__meta">
              <span v-for="m in item.meta" :key="m">{{ m }}</span>
              <NuxtLink v-if="item.cta" :to="item.cta.href" class="search-results__cta">{{ item.cta.label }} ←</NuxtLink>
            </div>
          </div>
          <NuxtLink v-if="item.image" :to="item.href" class="search-results__thumb" tabindex="-1" aria-hidden="true">
            <BaseImage :src="item.image.src" :alt="item.image.alt" />
            <span class="search-results__thumb-caption">{{ item.image.caption }}</span>
          </NuxtLink>
        </article>
      </section>

      <!-- Help banner -->
      <section class="search-results__help" aria-label="راهنمایی">
        <div>
          <h2>موضوع یا مستند مورد نظر خود را نیافتید؟</h2>
          <p>کارشناسان روابط عمومی و امور سهامداران هلدینگ ثاخت در ساعات اداری پاسخگوی سوالات شما هستند.</p>
        </div>
        <div class="search-results__help-actions">
          <NuxtLink to="/contact" class="search-results__help-ghost">ثبت پرسش در سامانه مشتریان</NuxtLink>
          <a href="tel:02184550000" class="search-results__help-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z" /></svg>
            <span>مرکز تماس: <span dir="ltr">۰۲۱-۸۴۵۵</span></span>
          </a>
        </div>
      </section>

      <!-- Pagination -->
      <nav v-if="filtered.length && pageCount > 1" class="search-results__pagination" aria-label="صفحات نتایج">
        <button type="button" class="search-results__page search-results__page--arrow" :disabled="page === 1" aria-label="صفحه قبل" @click="goToPage(page - 1)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <template v-for="(p, i) in pageItems" :key="`${p}-${i}`">
          <span v-if="p === 'gap'" class="search-results__gap" aria-hidden="true">…</span>
          <button
            v-else
            type="button"
            class="search-results__page"
            :class="{ 'is-active': p === page }"
            :aria-current="p === page ? 'page' : undefined"
            @click="goToPage(p)"
          >
            {{ toPersianDigits(p) }}
          </button>
        </template>
        <button type="button" class="search-results__page search-results__page--arrow" :disabled="page === pageCount" aria-label="صفحه بعد" @click="goToPage(page + 1)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 19-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.search-results { background: var(--color-surface); color: var(--color-ink); }
.search-results__inner { max-inline-size: 1152px; margin-inline: auto; padding: var(--space-2) var(--space-3) var(--space-12); }

.search-results__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); padding-block: var(--space-2) var(--space-3); font: var(--text-body-sm); color: var(--color-text-muted); }
.search-results__breadcrumb a { color: inherit; text-decoration: none; }
.search-results__breadcrumb a:hover { color: var(--color-primary); }
.search-results__breadcrumb-current { color: var(--color-primary); font-weight: 600; }

/* --- search panel --- */
.search-results__panel { background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-3); margin-block-end: var(--space-4); box-shadow: 0 4px 20px -2px rgb(4 28 44 / 5%); }
@media (min-width: 768px) { .search-results__panel { padding: var(--space-4); } }
.search-results__form { display: flex; flex-direction: column; gap: 12px; }
@media (min-width: 768px) { .search-results__form { flex-direction: row; align-items: stretch; } }
.search-results__input-wrap { position: relative; flex: 1; }
.search-results__input-icon { position: absolute; inset-inline-start: var(--space-2); inset-block-start: 50%; transform: translateY(-50%); color: var(--color-text-muted); pointer-events: none; }
.search-results__input {
  inline-size: 100%;
  block-size: 56px;
  padding-inline: 48px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font: var(--text-body);
  font-size: 16px;
  font-weight: 500;
  color: var(--color-ink);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
.search-results__input::-webkit-search-cancel-button { display: none; }
.search-results__input:focus { outline: none; background: var(--color-white); border-color: var(--color-primary); box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 12%, transparent); }
.search-results__clear { position: absolute; inset-inline-end: 12px; inset-block-start: 50%; transform: translateY(-50%); display: flex; padding: 6px; border: none; border-radius: var(--radius-pill); background: none; color: var(--color-text-muted); cursor: pointer; }
.search-results__clear:hover { color: var(--color-ink); background: var(--color-surface-alt); }
.search-results__actions { display: flex; gap: var(--space-1); }
.search-results__submit { flex: 1; }
@media (min-width: 768px) { .search-results__submit { flex: none; } }
.search-results__reset { padding-inline: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text-muted); font: var(--text-label); cursor: pointer; }
.search-results__reset:hover { color: var(--color-ink); border-color: var(--color-text-muted); }
.search-results__suggestions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-start: var(--space-2); padding-block-start: var(--space-2); border-block-start: 1px solid var(--color-border); }
.search-results__suggestions > span { font-size: 12px; font-weight: 600; color: var(--color-text-muted); margin-inline-end: 4px; }
.search-results__chip { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; text-decoration: none; transition: background-color 0.2s ease, color 0.2s ease; }
.search-results__chip:hover,
.search-results__chip.is-active { background: var(--color-tint); color: var(--color-primary); }

/* --- controls --- */
.search-results__controls { display: flex; flex-direction: column; gap: var(--space-2); margin-block-end: var(--space-3); scroll-margin-block-start: var(--space-3); }
.search-results__summary-row { display: flex; flex-direction: column; gap: var(--space-2); }
@media (min-width: 768px) { .search-results__summary-row { flex-direction: row; align-items: center; justify-content: space-between; } }
.search-results__summary { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); }
.search-results__count { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-primary); font: var(--text-label); font-size: 12px; }
.search-results__summary p { font-size: 13px; font-weight: 500; color: var(--color-text-muted); }
.search-results__summary strong { color: var(--color-ink); }
.search-results__selects { display: flex; flex-wrap: wrap; gap: 12px; }
.search-results__select { display: flex; align-items: center; gap: var(--space-1); font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.search-results__select select { padding: 8px 12px; padding-inline-end: 32px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-white); font-size: 12px; font-weight: 600; color: var(--color-ink); cursor: pointer; }
.search-results__select select:focus { outline: 2px solid var(--color-primary); outline-offset: 1px; }
.search-results__tabs { display: flex; gap: var(--space-1); overflow-x: auto; padding-block-end: 4px; scrollbar-width: none; }
.search-results__tab { flex-shrink: 0; padding: 8px var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); font-size: 12px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease; }
.search-results__tab:hover { background: var(--color-surface-alt); }
.search-results__tab.is-empty { color: var(--color-text-muted); }
.search-results__tab.is-active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-white); font-weight: 700; }

/* --- results --- */
.search-results__list { display: flex; flex-direction: column; gap: var(--space-2); }
.search-results__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
@media (min-width: 768px) { .search-results__item { flex-direction: row; align-items: flex-start; } }
.search-results__item:hover { border-color: var(--color-primary); box-shadow: 0 10px 30px -4px rgb(4 28 44 / 6%); }
.search-results__item-body { flex: 1; min-inline-size: 0; order: 2; }
@media (min-width: 768px) { .search-results__item-body { order: 0; } }
.search-results__item-top { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-end: var(--space-1); }
.search-results__badge { padding: 2px 10px; border-radius: var(--radius-pill); border: 1px solid; font-size: 11px; font-weight: 700; line-height: 1.6; }
.search-results__badge--blue { color: var(--color-primary); background: color-mix(in srgb, var(--color-tint) 40%, var(--color-white)); border-color: var(--color-tint); }
.search-results__badge--green { color: var(--color-status-success); background: color-mix(in srgb, var(--color-status-success) 8%, var(--color-white)); border-color: color-mix(in srgb, var(--color-status-success) 30%, var(--color-white)); }
.search-results__badge--amber { color: var(--color-ink); background: var(--color-surface-alt); border-color: var(--color-surface-alt); }
.search-results__badge--sky { color: var(--color-brand-blue-deep); background: var(--color-white); border-color: var(--color-tint); }
.search-results__badge--purple { color: var(--color-white); background: var(--color-brand-blue-deep); border-color: var(--color-brand-blue-deep); }
.search-results__badge--neutral { color: var(--color-text-muted); background: var(--color-surface); border-color: var(--color-border); }
.search-results__ref { font-size: 12px; color: var(--color-text-muted); }
.search-results__dot { inline-size: 5px; block-size: 5px; border-radius: 50%; background: var(--color-border); }
.search-results__flag { font-size: 12px; font-weight: 600; }
.search-results__flag--success { color: var(--color-status-success); }
.search-results__flag--primary { color: var(--color-primary); }
.search-results__flag--error { color: var(--color-status-error); }
.search-results__flag--muted { color: var(--color-text-muted); font-weight: 500; }
.search-results__title { font: var(--text-h3); font-size: 19px; font-weight: 700; margin-block-end: var(--space-1); }
.search-results__title a { color: var(--color-ink); text-decoration: none; }
.search-results__item:hover .search-results__title a,
.search-results__title a:focus-visible { color: var(--color-primary); }
.search-results__excerpt { font: var(--text-body-sm); color: var(--color-text-muted); line-height: 1.8; margin-block-end: var(--space-2); }
.search-results__mark { padding: 1px 5px; border-radius: 4px; background: color-mix(in srgb, var(--color-tint) 75%, var(--color-white)); color: var(--color-brand-blue-deep); font-weight: 700; }
.search-results__meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1) var(--space-2); padding-block-start: 12px; border-block-start: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-muted); }
.search-results__cta { margin-inline-start: auto; color: var(--color-primary); font-weight: 700; text-decoration: none; }
.search-results__cta:hover { text-decoration: underline; }
.search-results__thumb { position: relative; flex-shrink: 0; inline-size: 100%; block-size: 160px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-ink); border: 1px solid var(--color-border); order: 1; }
@media (min-width: 768px) { .search-results__thumb { inline-size: 176px; block-size: 128px; order: 0; } }
.search-results__thumb :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; opacity: 0.85; }
.search-results__thumb-caption { position: absolute; inset-inline: 6px; inset-block-end: 6px; padding: 2px 8px; border-radius: var(--radius-pill); background: rgb(4 28 44 / 78%); color: var(--color-white); font-size: 11px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* --- empty states --- */
.search-results__empty { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-6) var(--space-3); background: var(--color-white); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); text-align: center; }
.search-results__empty--compact { padding-block: var(--space-4); }
.search-results__empty-icon { inline-size: 72px; block-size: 72px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; background: var(--color-surface); color: var(--color-text-muted); }
.search-results__empty h2 { font: var(--text-h3); font-size: 22px; font-weight: 800; }
.search-results__empty p { font: var(--text-body-sm); color: var(--color-text-muted); }
.search-results__tips { margin: 0; padding-inline-start: var(--space-3); max-inline-size: 560px; text-align: start; font: var(--text-body-sm); color: var(--color-text-muted); }
.search-results__tips li + li { margin-block-start: 4px; }
.search-results__empty-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1); }
.search-results__empty-links { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1); margin-block-start: var(--space-1); }

/* --- help banner --- */
.search-results__help {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  margin-block-start: var(--space-6);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: linear-gradient(to left, var(--color-ink), color-mix(in srgb, var(--color-ink) 80%, var(--color-brand-blue)));
  color: var(--color-white);
  text-align: center;
}
@media (min-width: 768px) { .search-results__help { flex-direction: row; justify-content: space-between; padding: var(--space-4); text-align: start; } }
.search-results__help h2 { font: var(--text-h3); font-size: 19px; font-weight: 700; margin-block-end: 6px; }
.search-results__help p { font: var(--text-body-sm); color: rgb(255 255 255 / 72%); }
.search-results__help-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; flex-shrink: 0; }
.search-results__help-ghost,
.search-results__help-primary { display: inline-flex; align-items: center; gap: var(--space-1); padding: 10px 20px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; text-decoration: none; color: var(--color-white); transition: background-color 0.2s ease; }
.search-results__help-ghost { border: 1px solid rgb(255 255 255 / 20%); background: rgb(255 255 255 / 10%); }
.search-results__help-ghost:hover { background: rgb(255 255 255 / 20%); }
.search-results__help-primary { background: var(--color-primary); }
.search-results__help-primary:hover { background: var(--color-primary-hover); }

/* --- pagination --- */
.search-results__pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px; margin-block-start: var(--space-6); }
.search-results__page { inline-size: 40px; block-size: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); font-size: 13px; font-weight: 600; cursor: pointer; transition: background-color 0.2s ease; }
.search-results__page:hover:not(:disabled) { background: var(--color-surface-alt); }
.search-results__page.is-active { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-white); font-weight: 700; }
.search-results__page:disabled { color: var(--color-border); cursor: not-allowed; }
.search-results__gap { inline-size: 28px; text-align: center; color: var(--color-text-muted); font-weight: 700; }
</style>
