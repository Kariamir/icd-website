<script setup lang="ts">
import type { EditorialBlock, EditorialIcon, EditorialPageViewModel } from '~/utils/editorialData'
import { projects } from '~/utils/projectsData'

// Template `05-static-editorial` rebuilt to follow
// `project_detail_page_template/05_static_editorial_plain/code.html`:
// breadcrumb band → hero image (live badge, symbol badge, headline) →
// editorial intro split (headline + accent rule + badge | lead paragraphs)
// → jump-link TOC (tracks the section in view) → typed content blocks
// (paginated two-column specialty list, blue callout banner, featured
// project carousel with arrows + segment tracker, governance pillars,
// prose, related news). Site header/footer/newsletter come from the shared
// layout. Radii follow the balanced scale (docs/design-system-icd3d.md
// §4.1), not the mockup's rounded-3xl.

const props = defineProps<{ page: EditorialPageViewModel }>()

const tocItems = computed(() => props.page.blocks.filter(b => b.navLabel).map(b => ({ id: b.id, label: b.navLabel! })))
const activeTocId = ref<string | null>(tocItems.value[0]?.id ?? null)

// Paginated specialty lists: current page per block id.
const listPage = reactive<Record<string, number>>({})
function listPages(block: Extract<EditorialBlock, { kind: 'list' }>) {
  return Math.max(1, Math.ceil(block.items.length / (block.pageSize ?? 10)))
}
function listColumns(block: Extract<EditorialBlock, { kind: 'list' }>) {
  const size = block.pageSize ?? 10
  const page = listPage[block.id] ?? 0
  const slice = block.items.slice(page * size, page * size + size)
  const half = Math.ceil(slice.length / 2)
  return [slice.slice(0, half), slice.slice(half)]
}

// Featured-project carousel: index of the first visible card per block id.
const VISIBLE_CARDS = 3
const carouselStart = reactive<Record<string, number>>({})
function carouselWindow(block: Extract<EditorialBlock, { kind: 'projects' }>) {
  const start = carouselStart[block.id] ?? 0
  return block.items.slice(start, start + VISIBLE_CARDS)
}
function carouselMax(block: Extract<EditorialBlock, { kind: 'projects' }>) {
  return Math.max(0, block.items.length - VISIBLE_CARDS)
}
function carouselStep(block: Extract<EditorialBlock, { kind: 'projects' }>, delta: number) {
  const next = (carouselStart[block.id] ?? 0) + delta
  carouselStart[block.id] = Math.min(carouselMax(block), Math.max(0, next))
}
function trackerStyle(block: Extract<EditorialBlock, { kind: 'projects' }>) {
  const n = Math.max(block.items.length, 1)
  const start = carouselStart[block.id] ?? 0
  return {
    inlineSize: `${(Math.min(VISIBLE_CARDS, n) / n) * 100}%`,
    insetInlineStart: `${(start / n) * 100}%`,
  }
}

const icons: Record<EditorialIcon, string> = {
  eco: 'M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7',
  gavel: 'm14 5 5 5M9 10l5-5M11.5 7.5l5 5M4 20l7.5-7.5M3 21h10',
  shield: 'M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Zm-3 9 2 2 4-4',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.6',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  edit: 'M4 20h4L19 9l-4-4L4 16v4ZM13 7l4 4',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  scale: 'M12 4v16M5 20h14M4 8h16M7 8l-3 7h6L7 8Zm10 0-3 7h6l-3-7Z',
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  if (!tocItems.value.length || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    if (visible[0]) activeTocId.value = visible[0].target.id
  }, { rootMargin: '-120px 0px -55% 0px' })
  for (const item of tocItems.value) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="editorial">
    <div class="editorial__crumb-band">
      <BaseContainer>
        <nav class="editorial__breadcrumb" aria-label="مسیریاب">
          <NuxtLink to="/">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11 12 4l9 7M5 10v10h14V10" /></svg>
            صفحه اصلی
          </NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink v-if="page.breadcrumbParent.href" :to="page.breadcrumbParent.href">{{ page.breadcrumbParent.label }}</NuxtLink>
          <span v-else>{{ page.breadcrumbParent.label }}</span>
          <span aria-hidden="true">/</span>
          <span class="editorial__breadcrumb-current">{{ page.title }}</span>
        </nav>
      </BaseContainer>
    </div>

    <BaseContainer>
      <div class="editorial__hero" :class="{ 'editorial__hero--compact': page.hero.compact }">
        <BaseImage :src="page.hero.image" :alt="page.hero.alt" />
        <div class="editorial__hero-scrim" />
        <span v-if="page.hero.liveBadge" class="editorial__hero-live">
          <span class="editorial__hero-live-dot" aria-hidden="true" />
          {{ page.hero.liveBadge }}
        </span>
        <div class="editorial__hero-caption">
          <span v-if="page.hero.codeBadge" class="editorial__hero-code">{{ page.hero.codeBadge }}</span>
          <h1>{{ page.hero.heading }}</h1>
          <p v-if="page.hero.subheading">{{ page.hero.subheading }}</p>
        </div>
      </div>

      <section class="editorial__lead">
        <div class="editorial__lead-head">
          <span v-if="page.eyebrow" class="editorial__eyebrow">{{ page.eyebrow }}</span>
          <h2>
            {{ page.lead.heading }}
            <span v-if="page.lead.highlight" class="editorial__lead-highlight">{{ page.lead.highlight }}</span>
          </h2>
          <div class="editorial__lead-rule" aria-hidden="true" />
          <span v-if="page.lead.badge" class="editorial__lead-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 9.5 4.5H6v3.5L3.5 10.5 6 13v3.5h3.5L12 19l2.5-2.5H18V13l2.5-2.5L18 8V4.5h-3.5L12 2Zm-1 12.4-3-3 1.4-1.4 1.6 1.6 4.1-4.1 1.4 1.4-5.5 5.5Z" /></svg>
            {{ page.lead.badge }}
          </span>
        </div>
        <div class="editorial__lead-body">
          <p v-for="(para, i) in page.lead.paragraphs" :key="i">{{ para }}</p>
        </div>
      </section>

      <nav v-if="tocItems.length > 1" class="editorial__toc" aria-label="دسترسی سریع به سرفصل‌ها">
        <span class="editorial__toc-label">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h10M4 18h13" /></svg>
          دسترسی سریع به سرفصل‌ها:
        </span>
        <div class="editorial__toc-links">
          <a
            v-for="item in tocItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="{ 'is-active': activeTocId === item.id }"
            :aria-current="activeTocId === item.id ? 'location' : undefined"
          >{{ item.label }}</a>
        </div>
      </nav>

      <template v-for="block in page.blocks" :key="block.id">
        <!-- Two-column specialty list with pagination dots -->
        <section v-if="block.kind === 'list'" :id="block.id" class="editorial__block editorial__list-block">
          <header class="editorial__block-head editorial__block-head--center">
            <span class="editorial__eyebrow">{{ block.eyebrow }}</span>
            <h2>{{ block.heading }}</h2>
            <p>{{ block.description }}</p>
          </header>
          <div class="editorial__list-grid">
            <ul v-for="(col, ci) in listColumns(block)" :key="ci" class="editorial__list">
              <li v-for="item in col" :key="item.title" class="editorial__list-item">
                <span class="editorial__list-bullet" aria-hidden="true" />
                <span class="editorial__list-title">{{ item.title }}</span>
                <span v-if="item.en" class="editorial__list-en" dir="ltr">{{ item.en }}</span>
              </li>
            </ul>
          </div>
          <div v-if="listPages(block) > 1" class="editorial__dots" role="tablist" aria-label="صفحه‌های فهرست">
            <button
              v-for="p in listPages(block)"
              :key="p"
              type="button"
              role="tab"
              :aria-selected="(listPage[block.id] ?? 0) === p - 1"
              :aria-label="`صفحه ${p}`"
              :class="{ 'is-active': (listPage[block.id] ?? 0) === p - 1 }"
              @click="listPage[block.id] = p - 1"
            />
          </div>
        </section>

        <!-- Callout banner -->
        <section v-else-if="block.kind === 'callout'" :id="block.id" class="editorial__block">
          <div class="editorial__callout">
            <div>
              <h2>{{ block.heading }}</h2>
              <p>{{ block.description }}</p>
            </div>
            <NuxtLink :to="block.cta.href" class="editorial__callout-cta">
              {{ block.cta.label }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
            </NuxtLink>
          </div>
        </section>

        <!-- Featured projects carousel -->
        <section v-else-if="block.kind === 'projects'" :id="block.id" class="editorial__block">
          <div class="editorial__row-head">
            <div>
              <span class="editorial__eyebrow editorial__eyebrow--plain">{{ block.eyebrow }}</span>
              <h2>{{ block.heading }}</h2>
            </div>
            <div class="editorial__carousel-controls">
              <NuxtLink :to="block.allHref" class="editorial__text-link">{{ block.allLabel }} ({{ projects.length }} پروژه)</NuxtLink>
              <button type="button" class="editorial__arrow" aria-label="پروژه قبلی" :disabled="(carouselStart[block.id] ?? 0) === 0" @click="carouselStep(block, -1)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 6 6 6-6 6" /></svg>
              </button>
              <button type="button" class="editorial__arrow editorial__arrow--primary" aria-label="پروژه بعدی" :disabled="(carouselStart[block.id] ?? 0) >= carouselMax(block)" @click="carouselStep(block, 1)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 6-6 6 6 6" /></svg>
              </button>
            </div>
          </div>
          <div class="editorial__project-grid">
            <NuxtLink v-for="card in carouselWindow(block)" :key="card.slug" :to="`/projects/${card.slug}`" class="editorial__project">
              <div class="editorial__project-media">
                <BaseImage :src="card.image" :alt="card.name" />
                <span class="editorial__status" :class="`editorial__status--${card.status}`">{{ card.statusLabel }}</span>
              </div>
              <div class="editorial__project-body">
                <span class="editorial__project-location">{{ card.location }}</span>
                <h3>{{ card.name }}</h3>
                <p>{{ card.description }}</p>
                <div class="editorial__project-metric">
                  <span>{{ card.metricLabel }}</span>
                  <strong>{{ card.metricValue }}</strong>
                </div>
              </div>
            </NuxtLink>
          </div>
          <div class="editorial__tracker" aria-hidden="true">
            <span :style="trackerStyle(block)" />
          </div>
        </section>

        <!-- Governance / ESG pillars -->
        <section v-else-if="block.kind === 'pillars'" :id="block.id" class="editorial__block">
          <div class="editorial__pillars-panel">
            <header class="editorial__block-head">
              <span class="editorial__eyebrow editorial__eyebrow--plain">{{ block.eyebrow }}</span>
              <h2>{{ block.heading }}</h2>
              <p>{{ block.description }}</p>
            </header>
            <div class="editorial__pillars">
              <article v-for="pillar in block.items" :key="pillar.title" class="editorial__pillar">
                <div>
                  <span class="editorial__pillar-icon" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[pillar.icon]" /></svg>
                  </span>
                  <h3>{{ pillar.title }}</h3>
                  <p>{{ pillar.text }}</p>
                </div>
                <NuxtLink :to="pillar.href" class="editorial__text-link">
                  {{ pillar.linkLabel }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
                </NuxtLink>
              </article>
            </div>
          </div>
        </section>

        <!-- Prose -->
        <section v-else-if="block.kind === 'prose'" :id="block.id" class="editorial__block editorial__prose">
          <div class="editorial__prose-head">
            <span v-if="block.number" class="editorial__prose-number">{{ block.number }}</span>
            <span v-if="block.eyebrow" class="editorial__eyebrow editorial__eyebrow--plain">{{ block.eyebrow }}</span>
            <h2>{{ block.heading }}</h2>
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="editorial__prose-body" v-html="block.bodyHtml" />
        </section>

        <!-- Related news -->
        <section v-else-if="block.kind === 'news' && block.items.length" :id="block.id" class="editorial__block">
          <div class="editorial__row-head">
            <h2>{{ block.heading }}</h2>
            <NuxtLink :to="block.allHref" class="editorial__text-link">{{ block.allLabel }}</NuxtLink>
          </div>
          <div class="editorial__news">
            <article v-for="item in block.items" :key="item.href" class="editorial__news-item">
              <span class="editorial__news-date">{{ item.date }}</span>
              <h3><NuxtLink :to="item.href">{{ item.title }}</NuxtLink></h3>
              <p>{{ item.excerpt }}</p>
              <NuxtLink :to="item.href" class="editorial__text-link">مطالعه خبر کامل ←</NuxtLink>
            </article>
          </div>
        </section>
      </template>
    </BaseContainer>
  </div>
</template>

<style scoped>
.editorial { color: var(--color-text); padding-block-end: var(--space-8); }

.editorial__crumb-band { background: var(--color-surface); border-block-end: 1px solid var(--color-border); }
.editorial__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: 12px; }
.editorial__breadcrumb a { display: inline-flex; align-items: center; gap: 4px; color: inherit; text-decoration: none; }
.editorial__breadcrumb a:hover { color: var(--color-primary); }
.editorial__breadcrumb-current { color: var(--color-text); font-weight: 700; }

/* Hero */
.editorial__hero {
  position: relative;
  margin-block: var(--space-4) var(--space-6);
  block-size: 380px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-ink);
  border: 1px solid var(--color-border);
}
@media (min-width: 640px) { .editorial__hero { block-size: 480px; } }
@media (min-width: 1024px) { .editorial__hero { block-size: 540px; } }
.editorial__hero--compact { block-size: 300px; }
@media (min-width: 1024px) { .editorial__hero--compact { block-size: 340px; } }
.editorial__hero :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.editorial__hero-scrim { position: absolute; inset: 0; background: linear-gradient(to top, var(--color-ink) 0%, rgb(4 28 44 / 40%) 45%, transparent 100%); }
.editorial__hero-live {
  position: absolute;
  inset-block-start: var(--space-3);
  inset-inline-start: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 6px var(--space-2);
  background: rgb(255 255 255 / 90%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-ink);
}
.editorial__hero-live-dot { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--color-status-success); animation: editorial-pulse 2s ease-in-out infinite; }
@keyframes editorial-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .editorial__hero-live-dot { animation: none; } }
.editorial__hero-caption { position: absolute; inset-inline: var(--space-4); inset-block-end: var(--space-4); max-inline-size: 56rem; color: var(--color-white); }
.editorial__hero-code { display: inline-block; padding: 4px 12px; margin-block-end: 12px; border-radius: var(--radius-xs); background: var(--color-brand-blue); font-size: 12px; font-weight: 700; }
.editorial__hero-caption h1 { font: 700 28px/1.3 var(--font-body); margin-block-end: var(--space-1); }
@media (min-width: 768px) { .editorial__hero-caption h1 { font: 700 38px/1.25 var(--font-body); } }
.editorial__hero-caption p { display: none; font: var(--text-body-sm); color: var(--color-tint); }
@media (min-width: 640px) { .editorial__hero-caption p { display: block; font-size: 16px; } }

/* Intro split */
.editorial__lead {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  align-items: start;
  padding-block-end: var(--space-6);
  margin-block-end: var(--space-6);
  border-block-end: 1px solid var(--color-border);
}
@media (min-width: 1024px) { .editorial__lead { grid-template-columns: 5fr 7fr; gap: var(--space-6); } }
.editorial__lead-head h2 { font: 700 28px/1.35 var(--font-body); margin-block: var(--space-1) var(--space-2); }
@media (min-width: 768px) { .editorial__lead-head h2 { font: var(--text-h2); font-weight: 700; } }
.editorial__lead-highlight { color: var(--color-brand-blue); font-variant-numeric: tabular-nums; }
.editorial__lead-rule { inline-size: 80px; block-size: 6px; border-radius: var(--radius-pill); background: var(--color-brand-blue); margin-block-end: var(--space-3); }
.editorial__lead-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font: var(--text-label);
  color: var(--color-text-muted);
}
.editorial__lead-badge svg { color: var(--color-brand-blue); flex-shrink: 0; }
.editorial__lead-body { display: flex; flex-direction: column; gap: var(--space-2); font: var(--text-body); line-height: 1.9; color: var(--color-text-muted); }

.editorial__eyebrow {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  background: var(--color-tint);
  color: var(--color-brand-blue);
  font-size: 12px;
  font-weight: 700;
}
.editorial__eyebrow--plain { padding: 0; background: none; }

/* TOC */
.editorial__toc {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
  padding: 12px;
  margin-block-end: var(--space-8);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
.editorial__toc-label { display: inline-flex; align-items: center; gap: var(--space-1); padding-inline: 12px; font: var(--text-label); }
.editorial__toc-label svg { color: var(--color-brand-blue); }
.editorial__toc-links { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.editorial__toc-links a {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease;
}
.editorial__toc-links a:hover { background: var(--color-tint); color: var(--color-brand-blue); }
.editorial__toc-links a.is-active { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); }

/* Blocks */
.editorial__block { margin-block-end: var(--space-8); scroll-margin-block-start: 120px; }
.editorial__block-head { max-inline-size: 48rem; margin-block-end: var(--space-4); }
.editorial__block-head--center { margin-inline: auto; text-align: center; }
.editorial__block-head h2, .editorial__row-head h2 { font: var(--text-h2); font-weight: 700; margin-block: var(--space-1); }
.editorial__block-head p { font-size: 16px; line-height: 1.7; color: var(--color-text-muted); }

.editorial__list-grid { display: grid; grid-template-columns: 1fr; column-gap: var(--space-8); max-inline-size: 64rem; margin-inline: auto; }
@media (min-width: 768px) { .editorial__list-grid { grid-template-columns: 1fr 1fr; } }
.editorial__list { list-style: none; margin: 0; padding: 0; }
.editorial__list-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 14px var(--space-1);
  border-block-end: 1px solid var(--color-border);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  transition: background-color 160ms ease;
}
.editorial__list-item:hover { background: var(--color-surface); }
.editorial__list-bullet { inline-size: 12px; block-size: 12px; border-radius: 3px; background: var(--color-brand-blue); flex-shrink: 0; }
.editorial__list-title { flex: 1; font-size: 16px; font-weight: 700; }
.editorial__list-en { font-size: 12px; color: var(--color-text-muted); font-family: var(--font-en); text-align: end; }
.editorial__dots { display: flex; justify-content: center; gap: 6px; margin-block-start: var(--space-4); }
.editorial__dots button { inline-size: 8px; block-size: 8px; padding: 0; border: none; border-radius: var(--radius-pill); background: var(--color-border); cursor: pointer; transition: inline-size 200ms ease, background-color 200ms ease; }
.editorial__dots button.is-active { inline-size: 24px; background: var(--color-brand-blue); }

.editorial__callout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--color-brand-blue);
  color: var(--color-white);
  text-align: center;
}
@media (min-width: 768px) { .editorial__callout { flex-direction: row; padding: var(--space-6); text-align: start; } }
.editorial__callout h2 { font: 700 24px/1.4 var(--font-body); margin-block-end: var(--space-1); }
.editorial__callout p { font-size: 16px; color: var(--color-tint); max-inline-size: 36rem; }
.editorial__callout-cta {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-brand-blue);
  font: var(--text-label);
  text-decoration: none;
  transition: background-color 160ms ease;
}
.editorial__callout-cta:hover { background: var(--color-tint); }
.editorial__callout-cta svg { transition: transform 160ms ease; }
.editorial__callout-cta:hover svg { transform: translateX(-4px); }

.editorial__row-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); padding-block-end: var(--space-2); margin-block-end: var(--space-4); border-block-end: 1px solid var(--color-border); }
.editorial__carousel-controls { display: flex; align-items: center; gap: 12px; }
.editorial__text-link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 700; color: var(--color-brand-blue); text-decoration: none; }
.editorial__text-link:hover { text-decoration: underline; }
.editorial__carousel-controls .editorial__text-link { margin-inline-end: var(--space-2); }
.editorial__arrow { inline-size: 40px; block-size: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-ink); cursor: pointer; }
.editorial__arrow:hover:not(:disabled) { background: var(--color-surface); }
.editorial__arrow--primary { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); }
.editorial__arrow--primary:hover:not(:disabled) { background: var(--color-brand-blue-deep); }
.editorial__arrow:disabled { opacity: 0.4; cursor: not-allowed; }

.editorial__project-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .editorial__project-grid { grid-template-columns: repeat(3, 1fr); } }
.editorial__project { display: flex; flex-direction: column; border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; background: var(--color-white); color: inherit; text-decoration: none; transition: border-color 160ms ease; }
.editorial__project:hover { border-color: var(--color-brand-blue); }
.editorial__project-media { position: relative; block-size: 256px; overflow: hidden; background: var(--color-surface); }
.editorial__project-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 300ms ease; }
.editorial__project:hover .editorial__project-media :deep(img) { transform: scale(1.05); }
.editorial__status { position: absolute; inset-block-start: var(--space-2); inset-inline-end: var(--space-2); padding: 4px 12px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; }
.editorial__status--upcoming { background: var(--badge-upcoming-bg); color: var(--badge-upcoming-text); }
.editorial__status--under-construction { background: var(--badge-under-construction-bg); color: var(--badge-under-construction-text); }
.editorial__status--operating { background: var(--badge-operating-bg); color: var(--badge-operating-text); }
.editorial__status--completed { background: var(--badge-completed-bg); color: var(--badge-completed-text); }
.editorial__project-body { display: flex; flex-direction: column; flex: 1; padding: var(--space-3); }
.editorial__project-location { font-size: 12px; color: var(--color-text-muted); }
.editorial__project-body h3 { font: var(--text-h3); margin-block: 4px 12px; }
.editorial__project-body p { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-end: var(--space-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.editorial__project-metric { margin-block-start: auto; display: flex; justify-content: space-between; padding-block-start: var(--space-2); border-block-start: 1px solid var(--color-border); font: var(--text-body-sm); }
.editorial__project-metric span { color: var(--color-text-muted); }
.editorial__project-metric strong { font-variant-numeric: tabular-nums; }
.editorial__tracker { position: relative; block-size: 6px; margin-block-start: var(--space-4); border-radius: var(--radius-pill); background: var(--color-surface-alt); overflow: hidden; }
.editorial__tracker span { position: absolute; inset-block: 0; border-radius: var(--radius-pill); background: var(--color-brand-blue); transition: inset-inline-start 300ms var(--motion-ease); }

.editorial__pillars-panel { padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 768px) { .editorial__pillars-panel { padding: var(--space-6); } }
.editorial__pillars { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .editorial__pillars { grid-template-columns: repeat(3, 1fr); } }
.editorial__pillar { display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-3); padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.editorial__pillar-icon { inline-size: 48px; block-size: 48px; display: flex; align-items: center; justify-content: center; margin-block-end: var(--space-2); border-radius: var(--radius-sm); background: var(--color-tint); color: var(--color-brand-blue); }
.editorial__pillar h3 { font: var(--text-h3); margin-block-end: var(--space-1); }
.editorial__pillar p { font: var(--text-body-sm); line-height: 1.8; color: var(--color-text-muted); }
.editorial__pillar .editorial__text-link { font-size: 14px; }

.editorial__prose { display: grid; grid-template-columns: 1fr; gap: var(--space-2); padding-block-end: var(--space-6); border-block-end: 1px solid var(--color-border); margin-block-end: var(--space-6); }
@media (min-width: 1024px) { .editorial__prose { grid-template-columns: 4fr 8fr; gap: var(--space-6); } }
.editorial__prose-head h2 { font: 700 24px/1.4 var(--font-body); margin-block-start: 4px; }
.editorial__prose-number { display: inline-flex; align-items: center; justify-content: center; inline-size: 36px; block-size: 36px; margin-block-end: var(--space-1); border-radius: var(--radius-sm); background: var(--color-ink); color: var(--color-white); font-weight: 700; }
.editorial__prose-body { font: var(--text-body); line-height: 1.9; color: var(--color-text-muted); max-inline-size: 75ch; }
.editorial__prose-body :deep(p) { margin-block-end: var(--space-2); }
.editorial__prose-body :deep(strong) { color: var(--color-text); }
.editorial__prose-body :deep(ul) { list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-1); }
.editorial__prose-body :deep(li) { position: relative; padding-inline-start: var(--space-3); }
.editorial__prose-body :deep(li)::before { content: ''; position: absolute; inset-inline-start: 0; inset-block-start: 0.75em; inline-size: 8px; block-size: 8px; border-radius: 2px; background: var(--color-brand-blue); }

.editorial__news { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .editorial__news { grid-template-columns: repeat(3, 1fr); } }
.editorial__news-item { padding: var(--space-2); border-radius: var(--radius-md); transition: background-color 160ms ease; }
.editorial__news-item:hover { background: var(--color-surface); }
.editorial__news-date { font-size: 12px; color: var(--color-text-muted); font-variant-numeric: tabular-nums; }
.editorial__news-item h3 { font: var(--text-h3); margin-block: var(--space-1); }
.editorial__news-item h3 a { color: inherit; text-decoration: none; }
.editorial__news-item h3 a:hover { color: var(--color-primary); }
.editorial__news-item p { font: var(--text-body-sm); color: var(--color-text-muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-block-end: 12px; }
</style>
