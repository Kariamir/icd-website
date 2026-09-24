<script setup lang="ts">
import type { TimelineEraViewModel, TimelineTone } from '~/utils/timelineData'
import { timelineArchive, timelineCta, timelineHero, timelineStats } from '~/utils/timelineData'

// Template `05b-timeline` rebuilt to follow
// `project_detail_page_template/05b_timeline_component/code.html`:
// breadcrumb → dotted-grid hero with badge, headline and four KPI cards →
// sticky era filter (really filters the timeline) → central-spine
// alternating timeline (era badges, milestone cards with a per-item
// highlight widget, and a supplementary note opposite each card) →
// archival spotlight gallery → dark booklet CTA strip. Shared header/footer
// come from the layout. Mockup accent colours (emerald/amber/indigo) are
// mapped onto token tones; radii follow docs/design-system-icd3d.md §4.1.

const props = defineProps<{ eras: TimelineEraViewModel[] }>()

const activeEra = ref<'all' | string>('all')
const timelineEl = ref<HTMLElement | null>(null)

const visibleEras = computed(() => activeEra.value === 'all' ? props.eras : props.eras.filter(e => e.id === activeEra.value))

// Alternate card side over the full chronology so filtering never flips a card.
const flipped = computed(() => {
  const map: Record<string, boolean> = {}
  let i = 0
  for (const era of props.eras) {
    for (const item of era.items) map[item.id] = i++ % 2 === 1
  }
  return map
})

const milestoneCount = computed(() => props.eras.reduce((n, e) => n + e.items.length, 0))

function selectEra(id: 'all' | string) {
  activeEra.value = id
  nextTick(() => {
    const el = timelineEl.value
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 160
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' })
  })
}

function toneClass(tone: TimelineTone) {
  return `tone-${tone}`
}
</script>

<template>
  <div class="history">
    <BaseContainer>
      <nav class="history__breadcrumb" aria-label="مسیریاب">
        <NuxtLink to="/">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11 12 4l9 7M5 10v10h14V10" /></svg>
          صفحه اصلی
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/about">درباره ثاخت</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="history__breadcrumb-current">تاریخچه و نقاط عطف ۴۰ ساله (از ۱۳۶۴ تا امروز)</span>
      </nav>
    </BaseContainer>

    <section class="history__hero">
      <div class="history__hero-grid" aria-hidden="true" />
      <BaseContainer>
        <div class="history__hero-inner">
          <span class="history__hero-badge">
            <span class="history__pulse" aria-hidden="true" />
            {{ timelineHero.badge }}
          </span>
          <h1>{{ timelineHero.title }}</h1>
          <p>{{ timelineHero.intro }}</p>
          <div class="history__stats">
            <div v-for="stat in timelineStats" :key="stat.label" class="history__stat">
              <strong :class="{ 'is-accent': stat.accent }">{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </BaseContainer>
    </section>

    <nav class="history__filter" aria-label="فیلتر دوران تاریخی">
      <BaseContainer>
        <div class="history__filter-inner">
          <span class="history__filter-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            فیلتر دوران تاریخی:
          </span>
          <div class="history__filter-pills" role="tablist">
            <button type="button" role="tab" :aria-selected="activeEra === 'all'" :class="{ 'is-active': activeEra === 'all' }" @click="selectEra('all')">
              همه دوران‌ها ({{ milestoneCount }})
            </button>
            <button
              v-for="era in eras"
              :key="era.id"
              type="button"
              role="tab"
              :aria-selected="activeEra === era.id"
              :class="{ 'is-active': activeEra === era.id }"
              @click="selectEra(era.id)"
            >
              {{ era.filterLabel }}
            </button>
          </div>
        </div>
      </BaseContainer>
    </nav>

    <BaseContainer>
      <section ref="timelineEl" class="history__timeline" aria-label="خط زمانی تاریخچه ثاخت">
        <div class="history__spine" aria-hidden="true" />
        <TransitionGroup name="history-era" tag="div" class="history__eras">
          <div v-for="era in visibleEras" :id="era.id" :key="era.id" class="history__era">
            <div class="history__era-anchor">
              <div class="history__era-badge" :class="toneClass(era.tone)">
                <span class="history__era-label">{{ era.label }}</span>
                <span class="history__era-years">{{ era.yearRange }}</span>
                <span class="history__era-desc">{{ era.description }}</span>
              </div>
            </div>

            <div
              v-for="item in era.items"
              :key="item.id"
              class="history__row"
              :class="{ 'history__row--flip': flipped[item.id] }"
            >
              <article class="history__card" :class="[toneClass(item.tone), { 'history__card--foundation': item.foundation }]">
                <header class="history__card-head">
                  <span class="history__tag">{{ item.tag }}</span>
                  <span class="history__years">{{ item.yearRange }}</span>
                </header>
                <h3>{{ item.title }}</h3>
                <p class="history__card-body">{{ item.body }}</p>

                <template v-if="item.highlight">
                  <div v-if="item.highlight.kind === 'checks'" class="history__hl history__hl--checks">
                    <span v-for="check in item.highlight.items" :key="check">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.7-9.3a1 1 0 0 0-1.4-1.4L9 10.6 7.7 9.3a1 1 0 0 0-1.4 1.4l2 2a1 1 0 0 0 1.4 0l4-4Z" clip-rule="evenodd" /></svg>
                      {{ check }}
                    </span>
                  </div>
                  <div v-else-if="item.highlight.kind === 'archive'" class="history__hl history__hl--archive">
                    <div>
                      <span>{{ item.highlight.label }}</span>
                      <strong>{{ item.highlight.value }}</strong>
                    </div>
                    <span class="history__hl-year">{{ item.highlight.year }}</span>
                  </div>
                  <div v-else-if="item.highlight.kind === 'note'" class="history__hl history__hl--note">
                    <span class="history__dot" aria-hidden="true" />
                    {{ item.highlight.text }}
                  </div>
                  <div v-else-if="item.highlight.kind === 'meta'" class="history__hl history__hl--meta">
                    <span v-for="m in item.highlight.items" :key="m">{{ m }}</span>
                  </div>
                  <div v-else-if="item.highlight.kind === 'stats'" class="history__hl history__hl--stats">
                    <div v-for="s in item.highlight.items" :key="s.label">
                      <strong>{{ s.value }}</strong>
                      <span>{{ s.label }}</span>
                    </div>
                  </div>
                  <div v-else-if="item.highlight.kind === 'registry'" class="history__hl history__hl--registry">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4" /></svg>
                    {{ item.highlight.text }}
                  </div>
                </template>
              </article>

              <div class="history__node" :class="[toneClass(item.tone), { 'history__node--foundation': item.foundation }]" aria-hidden="true">
                <svg v-if="item.foundation" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V9l8-6 8 6v12M9 21v-6h6v6" /></svg>
                <span v-else />
              </div>

              <aside v-if="item.aside" class="history__aside">
                <div v-if="item.aside.kind === 'note'" class="history__aside-note">
                  <strong>{{ item.aside.title }}</strong>
                  {{ item.aside.text }}
                </div>
                <div v-else-if="item.aside.kind === 'feature'" class="history__aside-feature">
                  <span class="history__aside-badge">{{ item.aside.badge }}</span>
                  <div>
                    <strong>{{ item.aside.title }}</strong>
                    {{ item.aside.text }}
                  </div>
                </div>
                <div v-else-if="item.aside.kind === 'card'" class="history__aside-card">
                  <span>{{ item.aside.title }}</span>
                  <p>{{ item.aside.text }}</p>
                </div>
                <blockquote v-else-if="item.aside.kind === 'quote'" class="history__aside-quote">
                  {{ item.aside.text }}
                  <cite>{{ item.aside.cite }}</cite>
                </blockquote>
                <span v-else-if="item.aside.kind === 'caption'" class="history__aside-caption">{{ item.aside.text }}</span>
                <span v-else-if="item.aside.kind === 'pill'" class="history__aside-pill">
                  <span class="history__dot history__dot--success" aria-hidden="true" />
                  {{ item.aside.text }}
                </span>
              </aside>
            </div>
          </div>
        </TransitionGroup>
      </section>
    </BaseContainer>

    <section class="history__archive">
      <BaseContainer>
        <header class="history__archive-head">
          <h2>{{ timelineArchive.title }}</h2>
          <p>{{ timelineArchive.intro }}</p>
        </header>
        <div class="history__archive-grid">
          <article v-for="doc in timelineArchive.items" :key="doc.title" class="history__archive-card">
            <div class="history__archive-media">
              <BaseImage :src="doc.image" :alt="doc.title" />
              <span class="history__archive-year" :class="toneClass(doc.tone)">{{ doc.year }}</span>
            </div>
            <h3>{{ doc.title }}</h3>
            <p>{{ doc.text }}</p>
          </article>
        </div>
      </BaseContainer>
    </section>

    <section class="history__cta-wrap">
      <BaseContainer>
        <div class="history__cta">
          <div class="history__cta-text">
            <span class="history__cta-badge">{{ timelineCta.badge }}</span>
            <h2>{{ timelineCta.title }}</h2>
            <p>{{ timelineCta.text }}</p>
          </div>
          <div class="history__cta-actions">
            <NuxtLink :to="timelineCta.primary.href" class="history__cta-btn history__cta-btn--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>
              {{ timelineCta.primary.label }}
            </NuxtLink>
            <NuxtLink :to="timelineCta.secondary.href" class="history__cta-btn history__cta-btn--ghost">
              {{ timelineCta.secondary.label }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
            </NuxtLink>
          </div>
        </div>
      </BaseContainer>
    </section>
  </div>
</template>

<style scoped>
.history { color: var(--color-text); }
.tone-ink { --tone: var(--color-ink); --tone-soft: var(--color-surface); }
.tone-blue { --tone: var(--color-brand-blue); --tone-soft: var(--color-tint); }
.tone-deep { --tone: var(--color-brand-blue-deep); --tone-soft: var(--color-tint); }
.tone-muted { --tone: var(--color-text-muted); --tone-soft: var(--color-surface); }

.history__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); padding-block: 14px; font-size: 12px; font-weight: 500; color: var(--color-text-muted); }
.history__breadcrumb a { display: inline-flex; align-items: center; gap: 4px; color: inherit; text-decoration: none; }
.history__breadcrumb a:hover { color: var(--color-primary); }
.history__breadcrumb-current { color: var(--color-ink); font-weight: 700; }

/* Hero */
.history__hero { position: relative; overflow: hidden; padding-block: var(--space-8); background: linear-gradient(to bottom, var(--color-surface), var(--color-white)); border-block: 1px solid var(--color-border); }
.history__hero-grid { position: absolute; inset: 0; opacity: 0.18; background-image: radial-gradient(var(--color-brand-blue) 1px, transparent 1px); background-size: 24px 24px; pointer-events: none; }
.history__hero-inner { position: relative; text-align: center; }
.history__hero-badge { display: inline-flex; align-items: center; gap: var(--space-1); padding: 6px 14px; margin-block-end: 20px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-brand-blue); font-size: 12px; font-weight: 700; }
.history__pulse { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--color-brand-blue); animation: history-pulse 2s ease-in-out infinite; }
@keyframes history-pulse { 50% { opacity: 0.3; } }
@media (prefers-reduced-motion: reduce) { .history__pulse { animation: none; } }
.history__hero h1 { max-inline-size: 56rem; margin-inline: auto; margin-block-end: 20px; font: 800 30px/1.35 var(--font-body); color: var(--color-ink); }
@media (min-width: 1024px) { .history__hero h1 { font-size: 46px; } }
.history__hero p { max-inline-size: 48rem; margin-inline: auto; margin-block-end: var(--space-6); font-size: 16px; line-height: 1.8; color: var(--color-text-muted); }
.history__stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); max-inline-size: 64rem; margin-inline: auto; }
@media (min-width: 1024px) { .history__stats { grid-template-columns: repeat(4, 1fr); } }
.history__stat { padding: 20px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); text-align: center; }
.history__stat strong { display: block; font: 800 34px/1.2 var(--font-body); color: var(--color-ink); font-variant-numeric: tabular-nums; }
.history__stat strong.is-accent { color: var(--color-brand-blue); }
.history__stat span { display: block; margin-block-start: 4px; font-size: 12px; color: var(--color-text-muted); }

/* Sticky era filter */
.history__filter { position: sticky; inset-block-start: 88px; z-index: 30; background: rgb(255 255 255 / 95%); backdrop-filter: blur(8px); border-block-end: 1px solid var(--color-border); padding-block: 14px; }
.history__filter-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.history__filter-label { display: none; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--color-text-muted); white-space: nowrap; }
.history__filter-label svg { color: var(--color-brand-blue); }
@media (min-width: 1024px) { .history__filter-label { display: inline-flex; } }
.history__filter-pills { display: flex; gap: var(--space-1); overflow-x: auto; scrollbar-width: none; }
.history__filter-pills button { padding: var(--space-1) var(--space-2); border: none; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font: 500 12px/1.6 var(--font-body); white-space: nowrap; cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.history__filter-pills button:hover { background: var(--color-tint); color: var(--color-ink); }
.history__filter-pills button.is-active { background: var(--color-ink); color: var(--color-white); font-weight: 700; }

/* Timeline */
.history__timeline { position: relative; padding-block: var(--space-8) var(--space-12); }
.history__spine { position: absolute; inset-block: 0; inset-inline-start: 26px; inline-size: 4px; border-radius: var(--radius-pill); background: linear-gradient(180deg, var(--color-tint) 0%, var(--color-brand-blue) 15%, var(--color-brand-blue) 85%, var(--color-tint) 100%); }
@media (min-width: 1024px) { .history__spine { inset-inline-start: 50%; transform: translateX(50%); } }
.history__eras { position: relative; display: flex; flex-direction: column; gap: var(--space-8); }
.history__era { scroll-margin-block-start: 180px; }
.history-era-enter-active, .history-era-leave-active { transition: opacity 250ms ease, transform 250ms ease; }
.history-era-enter-from, .history-era-leave-to { opacity: 0; transform: translateY(12px); }
.history-era-leave-active { position: absolute; inline-size: 100%; }

.history__era-anchor { position: relative; z-index: 1; display: flex; justify-content: flex-start; margin-block-end: var(--space-6); }
@media (min-width: 1024px) { .history__era-anchor { justify-content: center; } }
.history__era-badge { display: flex; flex-direction: column; align-items: center; padding: 12px var(--space-3); border: 4px solid var(--color-white); border-radius: var(--radius-lg); background: var(--tone); color: var(--color-white); box-shadow: 0 8px 20px rgb(4 28 44 / 18%); text-align: center; }
.history__era-label { font-size: 12px; font-weight: 500; color: var(--color-tint); }
.history__era-years { font: 800 24px/1.3 var(--font-body); font-variant-numeric: tabular-nums; }
.history__era-desc { font-size: 11px; opacity: 0.8; }

.history__row { position: relative; display: grid; grid-template-columns: 56px 1fr; grid-template-areas: 'node card'; align-items: start; margin-block-end: var(--space-6); }
@media (min-width: 1024px) {
  .history__row { grid-template-columns: 1fr 72px 1fr; grid-template-areas: 'card node aside'; }
  .history__row--flip { grid-template-areas: 'aside node card'; }
}
.history__card { grid-area: card; padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: 0 1px 2px rgb(4 28 44 / 6%); transition: box-shadow 200ms ease, transform 200ms ease; }
.history__card:hover { box-shadow: 0 10px 24px rgb(4 28 44 / 10%); transform: translateY(-2px); }
.history__card--foundation { border: 2px solid color-mix(in srgb, var(--color-brand-blue) 30%, transparent); background: linear-gradient(135deg, var(--color-white), var(--color-surface)); }
.history__card-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: 12px; border-block-end: 1px solid var(--color-surface-alt); }
.history__tag { padding: 4px 12px; border-radius: var(--radius-pill); background: var(--tone-soft); color: var(--tone); font-size: 12px; font-weight: 700; }
.history__years { font-size: 14px; font-weight: 800; color: var(--color-ink); font-variant-numeric: tabular-nums; }
.history__card h3 { font: 800 19px/1.5 var(--font-body); color: var(--color-ink); margin-block-end: 10px; }
.history__card-body { font: var(--text-body-sm); line-height: 1.85; color: var(--color-text-muted); }

.history__hl { margin-block-start: var(--space-2); font-size: 12px; }
.history__hl--checks { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); padding: 12px; border-radius: var(--radius-md); background: var(--color-surface); font-weight: 600; }
.history__hl--checks span { display: flex; align-items: center; gap: 6px; }
.history__hl--checks svg { color: var(--color-status-success); flex-shrink: 0; }
.history__hl--archive { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: 14px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: linear-gradient(to left, var(--color-surface), color-mix(in srgb, var(--color-tint) 40%, transparent)); }
.history__hl--archive span { display: block; color: var(--color-text-muted); }
.history__hl--archive strong { color: var(--color-ink); }
.history__hl-year { color: var(--color-brand-blue) !important; font-weight: 700; white-space: nowrap; }
.history__hl--note { display: flex; align-items: center; gap: var(--space-1); color: var(--color-text-muted); font-weight: 500; }
.history__dot { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--tone, var(--color-brand-blue)); flex-shrink: 0; }
.history__dot--success { background: var(--color-status-success); inline-size: 10px; block-size: 10px; }
.history__hl--meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-1); padding: 12px; border-radius: var(--radius-md); background: var(--color-surface); font-weight: 600; }
.history__hl--stats { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); }
.history__hl--stats div { padding: 10px; border-radius: var(--radius-sm); background: var(--color-surface); text-align: center; color: var(--color-text-muted); }
.history__hl--stats strong { display: block; font-size: 14px; color: var(--color-ink); font-variant-numeric: tabular-nums; }
.history__hl--registry { display: flex; align-items: center; gap: 12px; padding-block-start: var(--space-1); border-block-start: 1px solid var(--color-surface-alt); color: var(--color-text-muted); font-weight: 500; }
.history__hl--registry svg { color: var(--color-brand-blue); flex-shrink: 0; }

.history__node { grid-area: node; justify-self: center; position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; inline-size: 32px; block-size: 32px; margin-block-start: var(--space-2); border-radius: 50%; background: var(--color-white); border: 4px solid var(--tone); box-shadow: 0 2px 6px rgb(4 28 44 / 20%); color: var(--color-white); }
@media (min-width: 1024px) { .history__node { margin-block-start: var(--space-4); } }
.history__node span { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--tone); }
.history__node--foundation { inline-size: 40px; block-size: 40px; background: var(--color-ink); border-color: var(--color-white); box-shadow: 0 6px 14px rgb(4 28 44 / 30%); }

.history__aside { grid-area: aside; display: none; font-size: 12px; line-height: 1.8; color: var(--color-text-muted); }
@media (min-width: 1024px) { .history__aside { display: block; padding-block-start: var(--space-2); } }
.history__aside strong { display: block; margin-block-end: 4px; color: var(--color-ink); }
.history__aside-note { padding: var(--space-2); border: 1px solid var(--color-tint); border-radius: var(--radius-md); background: color-mix(in srgb, var(--color-tint) 30%, transparent); }
.history__aside-feature { display: flex; align-items: center; gap: 12px; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); }
.history__aside-badge { flex-shrink: 0; display: flex; align-items: center; justify-content: center; inline-size: 48px; block-size: 48px; border-radius: var(--radius-sm); background: var(--color-tint); color: var(--color-brand-blue); font: 700 16px/1 var(--font-en); }
.history__aside-card { padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); }
.history__aside-card span { display: block; margin-block-end: 4px; font-weight: 700; }
.history__aside-quote { margin: 0; padding: 20px; border: 1px solid var(--color-border); border-inline-start: 4px solid var(--color-brand-blue); border-radius: var(--radius-md); background: var(--color-white); font-style: italic; }
.history__aside-quote cite { display: block; margin-block-start: var(--space-1); font-style: normal; font-weight: 700; color: var(--color-ink); }
.history__aside-caption { display: block; padding-block-start: var(--space-2); color: var(--color-text-muted); opacity: 0.8; }
.history__aside-pill { display: inline-flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); font-weight: 600; }

/* Archive spotlight */
.history__archive { padding-block: var(--space-8); background: var(--color-surface); border-block: 1px solid var(--color-border); }
.history__archive-head { max-inline-size: 42rem; margin-inline: auto; margin-block-end: var(--space-6); text-align: center; }
.history__archive-head h2 { font: 800 28px/1.4 var(--font-body); color: var(--color-ink); margin-block-end: 12px; }
.history__archive-head p { font: var(--text-body-sm); color: var(--color-text-muted); }
.history__archive-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .history__archive-grid { grid-template-columns: repeat(3, 1fr); } }
.history__archive-card { padding: 20px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); transition: box-shadow 200ms ease; }
.history__archive-card:hover { box-shadow: 0 10px 24px rgb(4 28 44 / 10%); }
.history__archive-media { position: relative; aspect-ratio: 16 / 9; margin-block-end: var(--space-2); overflow: hidden; border-radius: var(--radius-md); background: var(--color-surface-alt); }
.history__archive-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; filter: grayscale(0.4); transition: filter 300ms ease; }
.history__archive-card:hover .history__archive-media :deep(img) { filter: none; }
.history__archive-year { position: absolute; inset-block-start: 12px; inset-inline-start: 12px; padding: 4px 10px; border-radius: var(--radius-pill); background: var(--tone); color: var(--color-white); font-size: 11px; font-weight: 700; }
.history__archive-card h3 { font: 800 14px/1.5 var(--font-body); color: var(--color-ink); margin-block-end: 6px; }
.history__archive-card p { font-size: 12px; line-height: 1.8; color: var(--color-text-muted); }

/* CTA strip */
.history__cta-wrap { padding-block: var(--space-8); }
.history__cta { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: var(--space-4); padding: var(--space-4); border-radius: var(--radius-lg); background: linear-gradient(to left, var(--color-ink), color-mix(in srgb, var(--color-ink) 82%, var(--color-brand-blue))); color: var(--color-white); text-align: center; }
@media (min-width: 1024px) { .history__cta { flex-direction: row; padding: var(--space-6); text-align: start; } }
.history__cta-text { max-inline-size: 42rem; }
.history__cta-badge { display: inline-block; padding: 4px 14px; margin-block-end: 12px; border-radius: var(--radius-pill); background: rgb(255 255 255 / 10%); color: var(--color-tint); font-size: 12px; font-weight: 700; }
.history__cta h2 { font: 800 26px/1.5 var(--font-body); margin-block-end: 12px; }
.history__cta p { font: var(--text-body-sm); line-height: 1.8; color: var(--color-surface-alt); opacity: 0.85; }
.history__cta-actions { display: flex; flex-direction: column; gap: 14px; inline-size: 100%; }
@media (min-width: 640px) { .history__cta-actions { flex-direction: row; inline-size: auto; } }
.history__cta-btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); padding: 14px var(--space-3); border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; transition: background-color 160ms ease; }
.history__cta-btn--primary { background: var(--color-brand-blue); color: var(--color-white); }
.history__cta-btn--primary:hover { background: var(--color-brand-blue-deep); }
.history__cta-btn--ghost { background: rgb(255 255 255 / 10%); color: var(--color-white); border: 1px solid rgb(255 255 255 / 20%); }
.history__cta-btn--ghost:hover { background: rgb(255 255 255 / 20%); }
</style>
