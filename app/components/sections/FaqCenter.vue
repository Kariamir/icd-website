<script setup lang="ts">
import type { FaqCenterConfig } from '~/utils/faqData'

// Template `05d-faq` rebuilt to follow
// `project_detail_page_template/05d_faq_accordion/code.html`: breadcrumb →
// centred hero (badge, title, intro, search with button, popular-search
// chips) → category tabs with live counts → grouped accordion beside a
// sticky support sidebar (advisor photo card with phone + ticket CTA,
// documents card, SLA card) → dark "didn't find your answer?" CTA. Tabs,
// search and chips really filter the mock data; an empty state appears
// when nothing matches. Shared header/footer come from the layout.

/*
 * `searchable` and `filterable` are both on by default — /sales/guide keeps
 * the full centre. /ir/financials turns both off (owner's request,
 * 2026-10-18): on that page the FAQ is a short reference list under a long
 * document archive, and a second search box and a second row of pills right
 * below the archive's own read as a duplicate of them.
 */
const props = withDefaults(defineProps<{
  config: FaqCenterConfig
  searchable?: boolean
  filterable?: boolean
}>(), { searchable: true, filterable: true })

const query = ref('')
const activeKey = ref<'all' | string>('all')
const resultsEl = ref<HTMLElement | null>(null)

const q = computed(() => query.value.trim().toLowerCase())

const searchedGroups = computed(() => props.config.groups.map(g => ({
  ...g,
  items: g.items.filter(i => !q.value || `${i.tag} ${i.question} ${i.answer}`.toLowerCase().includes(q.value)),
})))

const totalCount = computed(() => searchedGroups.value.reduce((n, g) => n + g.items.length, 0))
const visibleGroups = computed(() => searchedGroups.value.filter(g => g.items.length && (activeKey.value === 'all' || g.key === activeKey.value)))

function countFor(key: string) {
  return searchedGroups.value.find(g => g.key === key)?.items.length ?? 0
}

function applySearch(term?: string) {
  if (term !== undefined) query.value = term
  activeKey.value = 'all'
  nextTick(() => resultsEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function resetAll() {
  query.value = ''
  activeKey.value = 'all'
}
</script>

<template>
  <div class="faq-center">
    <BaseContainer>
      <nav class="faq-center__breadcrumb" aria-label="مسیریاب">
        <NuxtLink to="/">صفحه اصلی</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink :to="config.breadcrumb.parentHref">{{ config.breadcrumb.parentLabel }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="faq-center__breadcrumb-current">{{ config.breadcrumb.current }}</span>
      </nav>

      <section class="faq-center__hero">
        <span class="faq-center__badge">{{ config.badge }}</span>
        <h1>{{ config.title }}</h1>
        <p>{{ config.intro }}</p>
        <form v-if="searchable" class="faq-center__search" role="search" @submit.prevent="applySearch()">
          <label class="visually-hidden" for="faq-center-search">جستجو در پرسش‌ها</label>
          <svg class="faq-center__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input id="faq-center-search" v-model="query" type="search" :placeholder="config.searchPlaceholder" autocomplete="off">
          <button v-if="query" type="button" class="faq-center__search-clear" aria-label="پاک کردن جستجو" @click="query = ''">×</button>
          <button type="submit" class="faq-center__search-btn">جستجو</button>
        </form>
        <div v-if="searchable" class="faq-center__chips">
          <span>جستجوهای پرتکرار:</span>
          <button
            v-for="term in config.popularSearches"
            :key="term"
            type="button"
            :class="{ 'is-active': query === term }"
            @click="applySearch(term)"
          >
            {{ term }}
          </button>
        </div>
      </section>

      <div v-if="filterable" ref="resultsEl" class="faq-center__tabs" role="tablist" aria-label="دسته‌بندی پرسش‌ها">
        <button type="button" role="tab" :aria-selected="activeKey === 'all'" :class="{ 'is-active': activeKey === 'all' }" @click="activeKey = 'all'">
          همه پرسش‌ها ({{ totalCount }})
        </button>
        <button
          v-for="group in config.groups"
          :key="group.key"
          type="button"
          role="tab"
          :aria-selected="activeKey === group.key"
          :class="{ 'is-active': activeKey === group.key }"
          :disabled="countFor(group.key) === 0"
          @click="activeKey = group.key"
        >
          {{ group.tabLabel ?? group.title }} ({{ countFor(group.key) }})
        </button>
      </div>

      <div class="faq-center__layout">
        <div class="faq-center__main">
          <p v-if="q" class="faq-center__result-note" role="status">
            {{ totalCount }} پرسش برای «{{ query.trim() }}» پیدا شد.
          </p>
          <FaqAccordion v-if="visibleGroups.length" :groups="visibleGroups" />
          <div v-else class="faq-center__empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8.5 9.5l5 5M13.5 9.5l-5 5" /></svg>
            <h2>پرسشی با این عبارت پیدا نشد</h2>
            <p>عبارت دیگری را امتحان کنید یا پرسش خود را مستقیماً برای کارشناسان ما ارسال کنید.</p>
            <div class="faq-center__empty-actions">
              <button type="button" class="faq-center__btn faq-center__btn--ghost" @click="resetAll">نمایش همه پرسش‌ها</button>
              <NuxtLink :to="config.advisor.ticketHref" class="faq-center__btn faq-center__btn--primary">{{ config.advisor.ticketLabel }}</NuxtLink>
            </div>
          </div>
        </div>

        <aside class="faq-center__sidebar" aria-label="پشتیبانی و راهنما">
          <div class="faq-center__card faq-center__advisor">
            <div class="faq-center__advisor-media">
              <BaseImage :src="config.advisor.image" :alt="config.advisor.imageAlt" />
              <div class="faq-center__advisor-scrim" />
              <div class="faq-center__advisor-caption">
                <span>{{ config.advisor.badge }}</span>
                <p>{{ config.advisor.caption }}</p>
              </div>
            </div>
            <h3>{{ config.advisor.title }}</h3>
            <p>{{ config.advisor.text }}</p>
            <a :href="`tel:${config.advisor.phone}`" class="faq-center__phone">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z" /></svg>
              <span dir="ltr">{{ config.advisor.phoneLabel }}</span>
              <small>{{ config.advisor.extension }}</small>
            </a>
            <NuxtLink :to="config.advisor.ticketHref" class="faq-center__btn faq-center__btn--primary faq-center__btn--block">{{ config.advisor.ticketLabel }}</NuxtLink>
          </div>

          <div class="faq-center__card faq-center__docs">
            <div class="faq-center__docs-head">
              <span class="faq-center__docs-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" /></svg>
              </span>
              <h3>{{ config.documents.title }}</h3>
            </div>
            <p>{{ config.documents.text }}</p>
            <NuxtLink :to="config.documents.href" class="faq-center__docs-link">
              {{ config.documents.linkLabel }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
            </NuxtLink>
          </div>

          <div class="faq-center__sla">
            <div class="faq-center__sla-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
              {{ config.sla.title }}
            </div>
            <p v-for="line in config.sla.lines" :key="line">{{ line }}</p>
          </div>
        </aside>
      </div>

      <section class="faq-center__cta">
        <div class="faq-center__cta-glow" aria-hidden="true" />
        <div class="faq-center__cta-text">
          <span>{{ config.cta.eyebrow }}</span>
          <h2>{{ config.cta.title }}</h2>
          <p>{{ config.cta.text }}</p>
        </div>
        <div class="faq-center__cta-actions">
          <NuxtLink :to="config.cta.primary.href" class="faq-center__btn faq-center__btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z" /></svg>
            {{ config.cta.primary.label }}
          </NuxtLink>
          <NuxtLink :to="config.cta.secondary.href" class="faq-center__btn faq-center__btn--glass">{{ config.cta.secondary.label }}</NuxtLink>
        </div>
      </section>
    </BaseContainer>
  </div>
</template>

<style scoped>
.faq-center { color: var(--color-text); padding-block-end: var(--space-8); }

.faq-center__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); padding-block: var(--space-3) var(--space-1); font-size: 12px; font-weight: 500; color: var(--color-text-muted); }
.faq-center__breadcrumb a { color: inherit; text-decoration: none; }
.faq-center__breadcrumb a:hover { color: var(--color-primary); }
.faq-center__breadcrumb-current { color: var(--color-ink); font-weight: 700; }

.faq-center__hero { max-inline-size: 48rem; margin-inline: auto; padding-block: var(--space-4) var(--space-6); text-align: center; }
.faq-center__badge { display: inline-block; padding: 6px var(--space-2); margin-block-end: var(--space-2); border-radius: var(--radius-pill); border: 1px solid color-mix(in srgb, var(--color-brand-blue) 20%, transparent); background: color-mix(in srgb, var(--color-tint) 60%, transparent); color: var(--color-brand-blue); font-size: 12px; font-weight: 600; }
.faq-center__hero h1 { margin-block-end: var(--space-2); font: 800 26px/1.5 var(--font-body); color: var(--color-ink); }
@media (min-width: 1024px) { .faq-center__hero h1 { font-size: 36px; } }
.faq-center__hero > p { max-inline-size: 42rem; margin-inline: auto; margin-block-end: var(--space-4); font-size: 16px; line-height: 1.8; color: var(--color-text-muted); }

.faq-center__search { position: relative; display: flex; align-items: center; max-inline-size: 42rem; margin-inline: auto; border-radius: var(--radius-pill); box-shadow: 0 20px 40px -20px color-mix(in srgb, var(--color-brand-blue) 35%, transparent); }
.faq-center__search input { inline-size: 100%; padding: var(--space-2) 48px; padding-inline-end: 150px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); font: var(--text-body-sm); }
.faq-center__search input:focus { outline: none; border-color: var(--color-brand-blue); box-shadow: 0 0 0 2px var(--color-brand-blue); }
.faq-center__search input::-webkit-search-cancel-button { display: none; }
.faq-center__search-icon { position: absolute; inset-inline-start: var(--space-2); color: var(--color-text-muted); pointer-events: none; }
.faq-center__search-clear { position: absolute; inset-inline-end: 112px; inline-size: 28px; block-size: 28px; border: none; border-radius: 50%; background: var(--color-surface); color: var(--color-text-muted); font-size: 18px; line-height: 1; cursor: pointer; }
.faq-center__search-btn { position: absolute; inset-inline-end: var(--space-1); padding: 10px 20px; border: none; border-radius: var(--radius-pill); background: var(--color-brand-blue); color: var(--color-white); font: 600 12px/1.5 var(--font-body); cursor: pointer; transition: background-color 160ms ease; }
.faq-center__search-btn:hover { background: var(--color-brand-blue-deep); }
.faq-center__chips { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: var(--space-1); margin-block-start: var(--space-2); font-size: 12px; color: var(--color-text-muted); }
.faq-center__chips button { padding: 4px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text-muted); font: inherit; cursor: pointer; transition: border-color 160ms ease, color 160ms ease; }
.faq-center__chips button:hover, .faq-center__chips button.is-active { border-color: var(--color-brand-blue); color: var(--color-brand-blue); }

.faq-center__tabs { display: flex; gap: 10px; overflow-x: auto; padding-block-end: 12px; margin-block-end: var(--space-4); border-block-end: 1px solid var(--color-border); scrollbar-width: none; scroll-margin-block-start: 110px; }
.faq-center__tabs button { flex-shrink: 0; padding: 10px 20px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text-muted); font: 600 12px/1.5 var(--font-body); white-space: nowrap; cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.faq-center__tabs button:hover:not(:disabled) { background: var(--color-surface); }
.faq-center__tabs button.is-active { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); font-weight: 700; }
.faq-center__tabs button:disabled { opacity: 0.45; cursor: not-allowed; }

.faq-center__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: start; margin-block-end: var(--space-8); }
@media (min-width: 1024px) { .faq-center__layout { grid-template-columns: 8fr 4fr; } }
.faq-center__result-note { margin-block-end: var(--space-2); font: var(--text-body-sm); color: var(--color-text-muted); }
.faq-center__empty { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: var(--space-8) var(--space-3); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); text-align: center; color: var(--color-text-muted); }
.faq-center__empty h2 { font: var(--text-h3); color: var(--color-ink); }
.faq-center__empty p { font: var(--text-body-sm); max-inline-size: 28rem; }
.faq-center__empty-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1); margin-block-start: var(--space-1); }

.faq-center__btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); padding: 12px var(--space-3); border: 1px solid transparent; border-radius: var(--radius-pill); font: var(--text-label); text-decoration: none; cursor: pointer; transition: background-color 160ms ease; }
.faq-center__btn--primary { background: var(--color-brand-blue); color: var(--color-white); }
.faq-center__btn--primary:hover { background: var(--color-brand-blue-deep); }
.faq-center__btn--ghost { background: var(--color-white); border-color: var(--color-border); color: var(--color-ink); }
.faq-center__btn--ghost:hover { border-color: var(--color-brand-blue); color: var(--color-brand-blue); }
.faq-center__btn--glass { background: rgb(255 255 255 / 10%); border-color: rgb(255 255 255 / 20%); color: var(--color-white); }
.faq-center__btn--glass:hover { background: rgb(255 255 255 / 20%); }
.faq-center__btn--block { inline-size: 100%; border-radius: var(--radius-md); }

.faq-center__sidebar { display: flex; flex-direction: column; gap: var(--space-3); }
@media (min-width: 1024px) { .faq-center__sidebar { position: sticky; inset-block-start: 112px; } }
.faq-center__card { padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); box-shadow: 0 1px 2px rgb(4 28 44 / 5%); }
.faq-center__advisor { display: flex; flex-direction: column; align-items: center; text-align: center; }
.faq-center__advisor-media { position: relative; inline-size: 100%; aspect-ratio: 4 / 3; margin-block-end: 20px; overflow: hidden; border-radius: var(--radius-md); background: var(--color-surface); }
.faq-center__advisor-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 500ms ease; }
.faq-center__advisor:hover .faq-center__advisor-media :deep(img) { transform: scale(1.03); }
.faq-center__advisor-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgb(4 28 44 / 70%), transparent 60%); }
.faq-center__advisor-caption { position: absolute; inset-inline: 12px; inset-block-end: 12px; text-align: start; color: var(--color-white); }
.faq-center__advisor-caption span { display: inline-block; padding: 2px 10px; margin-block-end: 4px; border-radius: var(--radius-pill); background: color-mix(in srgb, var(--color-brand-blue) 85%, transparent); font-size: 11px; font-weight: 600; }
.faq-center__advisor-caption p { font-size: 12px; color: var(--color-surface-alt); }
.faq-center__advisor h3 { font: 700 16px/1.5 var(--font-body); color: var(--color-ink); margin-block-end: var(--space-1); }
.faq-center__advisor > p { font-size: 12px; line-height: 1.8; color: var(--color-text-muted); margin-block-end: 20px; }
.faq-center__phone { display: flex; align-items: center; justify-content: center; gap: var(--space-1); inline-size: 100%; padding: 12px var(--space-2); margin-block-end: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); color: var(--color-brand-blue); font-weight: 700; text-decoration: none; transition: border-color 160ms ease; }
.faq-center__phone:hover { border-color: var(--color-brand-blue); }
.faq-center__phone span { font-variant-numeric: tabular-nums; }
.faq-center__phone small { font-size: 12px; font-weight: 400; color: var(--color-text-muted); }

.faq-center__docs-head { display: flex; align-items: center; gap: 12px; margin-block-end: 12px; }
.faq-center__docs-icon { display: flex; align-items: center; justify-content: center; inline-size: 36px; block-size: 36px; border-radius: var(--radius-sm); background: color-mix(in srgb, var(--color-tint) 50%, transparent); color: var(--color-brand-blue); }
.faq-center__docs h3 { font: 700 14px/1.5 var(--font-body); color: var(--color-ink); }
.faq-center__docs p { margin-block-end: var(--space-2); font-size: 12px; line-height: 1.8; color: var(--color-text-muted); }
.faq-center__docs-link { display: inline-flex; align-items: center; gap: var(--space-1); font-size: 12px; font-weight: 700; color: var(--color-brand-blue); text-decoration: none; }
.faq-center__docs-link:hover { text-decoration: underline; }

.faq-center__sla { padding: 20px; border: 1px solid color-mix(in srgb, var(--color-brand-blue) 15%, transparent); border-radius: var(--radius-lg); background: color-mix(in srgb, var(--color-tint) 25%, transparent); font-size: 12px; line-height: 1.8; color: var(--color-text-muted); }
.faq-center__sla-title { display: flex; align-items: center; gap: var(--space-1); margin-block-end: var(--space-1); color: var(--color-brand-blue); font-weight: 700; }
.faq-center__sla p + p { margin-block-start: 4px; }

.faq-center__cta { position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-4); border-radius: var(--radius-lg); background: linear-gradient(to left, var(--color-ink), color-mix(in srgb, var(--color-ink) 85%, var(--color-brand-blue)), var(--color-ink)); color: var(--color-white); text-align: center; box-shadow: 0 24px 48px -24px rgb(4 28 44 / 50%); }
@media (min-width: 768px) { .faq-center__cta { flex-direction: row; padding: var(--space-6); text-align: start; } }
.faq-center__cta-glow { position: absolute; inset-inline-start: -64px; inset-block-start: -64px; inline-size: 256px; block-size: 256px; border-radius: 50%; background: color-mix(in srgb, var(--color-brand-blue) 25%, transparent); filter: blur(48px); pointer-events: none; }
.faq-center__cta-text { position: relative; }
.faq-center__cta-text span { display: inline-block; margin-block-end: var(--space-1); font-size: 12px; font-weight: 700; color: var(--color-tint); }
.faq-center__cta-text h2 { margin-block-end: var(--space-1); font: 800 24px/1.5 var(--font-body); }
.faq-center__cta-text p { max-inline-size: 36rem; font: var(--text-body-sm); color: var(--color-border); }
.faq-center__cta-actions { position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
</style>
