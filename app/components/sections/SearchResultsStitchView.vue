<!--
  /search — ported from stitch_project_detail_page_template/10_search_results/
  (ADR-013). The design was a static mock; it now searches the site catalog
  (app/utils/siteSearch.ts): `?q=` the query, `?type=` the tab, `?sort=`.
-->
<script setup lang="ts">
import { search, searchTypes, searchSuggestions, normalise, type SearchType } from '~/utils/siteSearch'
import { faDigits } from '~/utils/format'

const route = useRoute()
const router = useRouter()

const q = computed(() => String(route.query.q ?? '').trim())
const draft = ref(q.value)
watch(q, v => (draft.value = v))

const type = computed(() => (searchTypes.some(t => t.value === route.query.type) ? route.query.type : '') as SearchType | '')
const sort = computed(() => (route.query.sort === 'latest' ? 'latest' : 'relevance'))

const hits = computed(() => search(q.value))
const counts = computed(() => Object.fromEntries(searchTypes.map(t => [t.value, hits.value.filter(h => h.type === t.value).length])) as Record<SearchType, number>)
const list = computed(() => {
  const l = type.value ? hits.value.filter(h => h.type === type.value) : hits.value
  return sort.value === 'latest' ? [...l].sort((a, b) => b.sortKey - a.sortKey) : l
})
const typeLabel = (t: SearchType) => searchTypes.find(x => x.value === t)?.label ?? ''

function submit() {
  router.push({ path: '/search', query: draft.value.trim() ? { q: draft.value.trim() } : {} })
}
function setQuery(patch: Record<string, string | undefined>) {
  router.replace({ query: { ...route.query, ...patch } })
}

/** Wraps matches in <mark>; escapes everything else. */
function highlight(text: string) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const terms = normalise(q.value).split(' ').filter(t => t.length > 1)
  if (!terms.length) return esc
  const re = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return esc.replace(re, '<mark class="rounded-xs bg-brand-tint px-0.5 text-ink">$1</mark>')
}
</script>

<template>
  <div class="bg-surface py-8 md:py-12">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <nav aria-label="مسیر صفحه" class="mb-6 flex items-center gap-2 text-label-md text-secondary">
        <NuxtLink to="/" class="hover:text-primary-container">صفحه اصلی</NuxtLink>
        <AppIcon name="chevron_left" class="text-outline" />
        <span class="font-semibold text-primary-container">جستجو</span>
      </nav>

      <section class="mb-8 rounded-lg border border-border bg-surface-container-lowest p-6 md:p-8">
        <h1 class="mb-5 text-headline-md font-headline-md text-ink">جستجو در سایت</h1>
        <form class="flex flex-col gap-3 md:flex-row" role="search" @submit.prevent="submit">
          <div class="relative flex-grow">
            <label for="site-q" class="sr-only">عبارت جستجو</label>
            <AppIcon name="search" class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-outline" />
            <input id="site-q" v-model="draft" type="search" placeholder="نام پروژه، شرکت، خبر یا سند…" class="h-14 w-full rounded-md border border-border bg-surface pl-12 pr-12 text-body-md font-medium text-ink focus:border-primary-container focus:bg-surface-container-lowest focus:outline-none">
            <button v-if="draft" type="button" class="absolute left-4 top-1/2 -translate-y-1/2 text-outline hover:text-ink" @click="draft = ''"><AppIcon name="close" label="پاک کردن" /></button>
          </div>
          <button type="submit" class="flex h-14 items-center justify-center gap-2 rounded-pill bg-primary-container px-8 text-label-lg font-bold text-on-primary hover:bg-brand-hover">جستجو <AppIcon name="arrow_back" /></button>
        </form>
        <div class="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span class="ml-1 text-label-md font-semibold text-outline">پیشنهادها:</span>
          <NuxtLink v-for="s in searchSuggestions" :key="s" :to="{ path: '/search', query: { q: s } }" class="rounded-pill bg-surface px-3 py-1 text-label-md text-secondary transition-colors hover:bg-brand-tint hover:text-primary-container">{{ s }}</NuxtLink>
        </div>
      </section>

      <template v-if="q">
        <div class="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p class="text-body-sm text-secondary">
            <span class="ml-2 rounded-pill bg-brand-tint px-3 py-1 text-label-md font-bold text-primary-container">{{ faDigits(hits.length) }} نتیجه</span>
            برای «<strong class="text-ink">{{ q }}</strong>»
          </p>
          <label class="flex items-center gap-2 text-label-md text-secondary">مرتب‌سازی
            <select :value="sort" class="h-9 rounded-xs border border-border bg-surface-container-lowest px-2 text-label-md text-ink" @change="setQuery({ sort: ($event.target as HTMLSelectElement).value === 'latest' ? 'latest' : undefined })">
              <option value="relevance">مرتبط‌ترین</option>
              <option value="latest">جدیدترین</option>
            </select>
          </label>
        </div>

        <div class="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          <button type="button" class="shrink-0 rounded-pill border px-4 py-2 text-label-md font-bold" :class="!type ? 'border-primary-container bg-primary-container text-on-primary' : 'border-border bg-surface-container-lowest text-ink'" @click="setQuery({ type: undefined })">همه ({{ faDigits(hits.length) }})</button>
          <button
            v-for="t in searchTypes" :key="t.value" type="button" :disabled="!counts[t.value]"
            class="shrink-0 rounded-pill border px-4 py-2 text-label-md font-semibold disabled:opacity-40"
            :class="type === t.value ? 'border-primary-container bg-primary-container text-on-primary' : 'border-border bg-surface-container-lowest text-ink hover:bg-surface'"
            @click="setQuery({ type: t.value })"
          >{{ t.label }} ({{ faDigits(counts[t.value]) }})</button>
        </div>

        <ul v-if="list.length" class="space-y-4">
          <li v-for="h in list" :key="h.href">
            <NuxtLink :to="h.href" class="group flex gap-5 rounded-md border border-border bg-surface-container-lowest p-5 transition-colors hover:border-primary-container">
              <img v-if="h.image" :src="h.image" alt="" loading="lazy" class="hidden h-24 w-36 shrink-0 rounded-sm object-cover sm:block">
              <span v-else class="hidden size-24 shrink-0 items-center justify-center rounded-sm bg-surface text-primary-container sm:flex"><AppIcon :name="h.type === 'documents' ? 'picture_as_pdf' : 'description'" class="text-2xl" /></span>
              <span class="min-w-0 flex-1">
                <span class="mb-1 flex flex-wrap items-center gap-2 text-label-md">
                  <span class="rounded-pill bg-surface px-2.5 py-0.5 font-bold text-primary-container">{{ typeLabel(h.type) }}</span>
                  <span class="text-secondary">{{ h.meta }}</span>
                </span>
                <span class="block text-body-lg font-bold text-ink group-hover:text-primary-container" v-html="highlight(h.title)" />
                <span class="mt-1 line-clamp-2 block text-body-sm text-secondary" v-html="highlight(h.text)" />
              </span>
            </NuxtLink>
          </li>
        </ul>
        <div v-else class="rounded-lg border border-border bg-surface-container-lowest p-12 text-center">
          <p class="mb-2 text-headline-sm font-headline-sm text-ink">نتیجه‌ای یافت نشد</p>
          <p class="text-body-sm text-secondary">املای عبارت را بررسی کنید یا از پیشنهادهای بالا استفاده کنید.</p>
        </div>
      </template>
      <div v-else class="rounded-lg border border-dashed border-border p-12 text-center text-body-md text-secondary">عبارتی را برای جستجو وارد کنید.</div>
    </div>
  </div>
</template>
