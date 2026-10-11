<script setup lang="ts">
import {
  formatFaNumber,
  getArticlesByType,
  getFeaturedArticle,
  getPodcastEpisodes,
  getTopicsByType,
  getTrendingArticles,
  mediaHubHref,
  mediaHubMeta,
  mediaTypeLabels,
  toFaDigits,
  type ArticleType,
} from '~/utils/articlesData'

// Template `04-article-main` (docs/page-templates-icd3d.md), rebuilt to match
// `project_detail_page_template/04_article_main/code.html` structurally:
// eyebrow + title + intro, a working topic-pill filter, the dark featured
// lead story spread, the «روایت ثاخت» podcast showcase (working simulated
// player + selectable episode list), then an 8/4 split of a sortable,
// paginated 2-column article grid and a sidebar (most-viewed, quote of the
// week, newsletter sign-up, PDF whitepapers). Site header/footer come from
// the shared layout. Corners follow the balanced scale in
// docs/design-system-icd3d.md §4.1, not the mockup's literal classes.

const props = defineProps<{ type: ArticleType }>()

type SortKey = 'newest' | 'oldest' | 'popular' | 'quick'
const PAGE_SIZE = 4

const route = useRoute()
const router = useRouter()

const meta = mediaHubMeta[props.type]
const hubHref = mediaHubHref[props.type]
const hubLabel = mediaTypeLabels[props.type].hub
const allArticles = getArticlesByType(props.type)
const topics = getTopicsByType(props.type)
const featured = getFeaturedArticle(props.type)
const trending = getTrendingArticles(props.type, 4)
const episodes = getPodcastEpisodes()
const hubs = (Object.keys(mediaHubHref) as ArticleType[]).map(t => ({ type: t, label: mediaTypeLabels[t].hub, href: mediaHubHref[t] }))

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'newest', label: 'جدیدترین مطالب' },
  { key: 'oldest', label: 'قدیمی‌ترین مطالب' },
  { key: 'popular', label: 'پربازدیدترین' },
  { key: 'quick', label: 'کوتاه‌ترین زمان مطالعه' },
]

function queryString(key: string): string | undefined {
  const v = route.query[key]
  return typeof v === 'string' ? v : undefined
}
function validTopic(key: string | undefined) {
  return key && topics.some(t => t.key === key) ? key : 'all'
}
function validSort(key: string | undefined): SortKey {
  return sortOptions.some(o => o.key === key) ? key as SortKey : 'newest'
}

const activeTopic = ref(validTopic(queryString('topic')))
const sortKey = ref<SortKey>(validSort(queryString('sort')))
const page = ref(Math.max(1, Number(queryString('page')) || 1))
const gridEl = ref<HTMLElement | null>(null)

const filtered = computed(() => {
  const list = activeTopic.value === 'all'
    ? allArticles.filter(a => a.slug !== featured?.slug)
    : allArticles.filter(a => a.topic === activeTopic.value)
  const sorted = [...list]
  if (sortKey.value === 'oldest') sorted.sort((a, b) => a.sortKey - b.sortKey)
  else if (sortKey.value === 'popular') sorted.sort((a, b) => b.views - a.views)
  else if (sortKey.value === 'quick') sorted.sort((a, b) => a.readingMinutes - b.readingMinutes)
  else sorted.sort((a, b) => b.sortKey - a.sortKey)
  return sorted
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const currentPage = computed(() => Math.min(page.value, pageCount.value))
const pagedArticles = computed(() => filtered.value.slice((currentPage.value - 1) * PAGE_SIZE, currentPage.value * PAGE_SIZE))

const pageItems = computed<(number | 'gap')[]>(() => {
  const total = pageCount.value
  const cur = currentPage.value
  const set = new Set([1, total, cur - 1, cur, cur + 1].filter(n => n >= 1 && n <= total))
  const sorted = [...set].sort((a, b) => a - b)
  const out: (number | 'gap')[] = []
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1]! > 1) out.push('gap')
    out.push(n)
  })
  return out
})

function selectTopic(key: string) {
  activeTopic.value = key
  page.value = 1
}

function goToPage(n: number) {
  page.value = Math.min(pageCount.value, Math.max(1, n))
  gridEl.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(sortKey, () => { page.value = 1 })

// Keep filter/sort/page in the URL so views are shareable and the article
// detail sidebar can deep-link into a topic (`?topic=`).
watch([activeTopic, sortKey, currentPage], () => {
  const query: Record<string, string> = {}
  if (activeTopic.value !== 'all') query.topic = activeTopic.value
  if (sortKey.value !== 'newest') query.sort = sortKey.value
  if (currentPage.value > 1) query.page = String(currentPage.value)
  router.replace({ query })
})
watch(() => route.query.topic, (next) => {
  const t = validTopic(typeof next === 'string' ? next : undefined)
  if (t !== activeTopic.value) selectTopic(t)
})

// --- podcast showcase ---
const activeEpisodeSlug = ref(episodes[0]?.slug)
const activeEpisode = computed(() => episodes.find(e => e.slug === activeEpisodeSlug.value) ?? episodes[0])
const listEpisodes = computed(() => episodes.filter(e => e.slug !== activeEpisode.value?.slug).slice(0, 3))

// --- newsletter ---
const newsletterContact = ref('')
const newsletterState = ref<'idle' | 'error' | 'success'>('idle')
function submitNewsletter() {
  const value = newsletterContact.value.trim()
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const isPhone = /^(\+98|0)?9\d{9}$/.test(value.replace(/[\s-]/g, '').replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))
  if (!isEmail && !isPhone) {
    newsletterState.value = 'error'
    return
  }
  newsletterState.value = 'success'
  newsletterContact.value = ''
}

const whitepapers = [
  { title: 'گزارش عملکرد هیات‌مدیره سال ۱۴۰۲', href: '/ir/financials' },
  { title: 'سفیدنامه مهندسی ارزش در برج‌سازی', href: '/ir/governance' },
  { title: 'گزارش حاکمیت شرکتی و کنترل‌های داخلی', href: '/ir/governance' },
]

const hrefFor = (slug: string) => `${hubHref}/${slug}`
const storyHref = (slug: string) => `${mediaHubHref.story}/${slug}`
const minutes = (sec: number) => toFaDigits(Math.round(sec / 60))
</script>

<template>
  <div class="media-index">
    <nav class="media-index__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/media">رسانه ثاخت</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="media-index__breadcrumb-current">{{ hubLabel }}</span>
      <div class="media-index__hub-switch" role="navigation" aria-label="بخش‌های رسانه">
        <NuxtLink
          v-for="hub in hubs"
          :key="hub.type"
          :to="hub.href"
          class="media-index__hub-link"
          :class="{ 'is-active': hub.type === type }"
        >
          {{ hub.label }}
        </NuxtLink>
      </div>
    </nav>

    <!-- Sub-header + category pills -->
    <section class="media-index__head">
      <div class="media-index__head-row">
        <div>
          <div class="media-index__eyebrow">
            <span class="media-index__eyebrow-mark" aria-hidden="true" />
            {{ meta.eyebrow }}
          </div>
          <h1 class="media-index__title">{{ meta.title }}</h1>
        </div>
        <p class="media-index__intro">{{ meta.description }}</p>
      </div>
      <div class="media-index__pills" role="group" aria-label="دسته‌بندی مطالب">
        <button type="button" class="media-index__pill" :class="{ 'is-active': activeTopic === 'all' }" :aria-pressed="activeTopic === 'all'" @click="selectTopic('all')">
          همه مطالب ({{ toFaDigits(allArticles.length) }})
        </button>
        <button
          v-for="topic in topics"
          :key="topic.key"
          type="button"
          class="media-index__pill"
          :class="{ 'is-active': activeTopic === topic.key, 'media-index__pill--podcast': topic.podcast }"
          :aria-pressed="activeTopic === topic.key"
          @click="selectTopic(topic.key)"
        >
          <svg v-if="topic.podcast" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="11" r="2"/><path d="M8.5 14.5a5 5 0 1 1 7 0M5.6 17.4a9 9 0 1 1 12.8 0M12 13v8"/></svg>
          {{ topic.label }} ({{ toFaDigits(topic.count) }})
        </button>
      </div>
    </section>

    <!-- Section 1: featured lead story -->
    <section v-if="featured" class="media-index__hero" aria-label="مطلب ویژه">
      <div class="media-index__hero-media">
        <BaseImage v-if="featured.image" :src="featured.image.src" :alt="featured.image.alt || featured.title" />
        <div class="media-index__hero-scrim" />
        <span v-if="featured.featuredBadge" class="media-index__hero-badge">{{ featured.featuredBadge }}</span>
      </div>
      <div class="media-index__hero-content">
        <div>
          <div class="media-index__hero-meta">
            <span class="media-index__hero-chip">{{ featured.category }}</span>
            <span>| {{ featured.date }}</span>
          </div>
          <h2 class="media-index__hero-title">
            <NuxtLink :to="hrefFor(featured.slug)">{{ featured.title }}</NuxtLink>
          </h2>
          <p class="media-index__hero-excerpt">{{ featured.excerpt }}</p>
        </div>
        <div class="media-index__hero-footer">
          <div class="media-index__hero-author">
            <span class="media-index__avatar" aria-hidden="true">{{ featured.author.initials }}</span>
            <div>
              <NuxtLink v-if="featured.author.boardSlug" :to="'/about#board'" class="media-index__hero-author-name">{{ featured.author.name }}</NuxtLink>
              <span v-else class="media-index__hero-author-name">{{ featured.author.name }}</span>
              <span class="media-index__hero-author-role">{{ featured.author.role }}</span>
            </div>
          </div>
          <div class="media-index__hero-actions">
            <span class="media-index__hero-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              {{ toFaDigits(featured.readingMinutes) }} دقیقه مطالعه
            </span>
            <NuxtLink :to="hrefFor(featured.slug)" class="media-index__hero-go" :aria-label="`مطالعه ${featured.title}`">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: podcast showcase -->
    <section v-if="activeEpisode" class="media-index__podcast" aria-labelledby="podcast-title">
      <div class="media-index__podcast-head">
        <div class="media-index__podcast-brand">
          <span class="media-index__podcast-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0"/></svg>
          </span>
          <div>
            <div class="media-index__podcast-title-row">
              <h2 id="podcast-title">پادکست اختصاصی «روایت ثاخت»</h2>
              <span class="media-index__season">{{ activeEpisode.audio?.season }}</span>
            </div>
            <p>گفتگوی بی‌پرده با طراحان سازه، معماران برجسته و مدیران ارشد بازار سرمایه و مسکن</p>
          </div>
        </div>
        <NuxtLink :to="`${mediaHubHref.story}?topic=podcast`" class="media-index__text-link">
          آرشیو کامل اپیزودها
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
        </NuxtLink>
      </div>

      <div class="media-index__podcast-grid">
        <div class="media-index__player-box">
          <div>
            <div class="media-index__player-meta">
              <span>اپیزود {{ toFaDigits(activeEpisode.audio?.episode ?? 0) }}<template v-if="activeEpisode.slug === episodes[0]?.slug"> • تازه‌ترین پخش</template></span>
              <span class="media-index__live"><span class="media-index__live-dot" aria-hidden="true" />پخش آنلاین با کیفیت 320kbps</span>
            </div>
            <h3 class="media-index__player-title">
              <NuxtLink :to="storyHref(activeEpisode.slug)">{{ activeEpisode.title }}</NuxtLink>
            </h3>
            <p class="media-index__player-excerpt">{{ activeEpisode.excerpt }}</p>
          </div>
          <MediaAudioPlayer
            :duration-sec="activeEpisode.audio?.durationSec ?? 0"
            :track-key="activeEpisode.slug"
            tone="dark"
            download-href="#"
          >
            <template #footer>
              <span class="media-index__listeners">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 15v-3a8 8 0 0 1 16 0v3M4 15a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z"/></svg>
                بیش از {{ formatFaNumber(activeEpisode.audio?.listeners ?? 0) }} شنونده تخصصی
              </span>
              <span class="media-index__platforms">قابل دریافت در: <strong>Castbox</strong> • <strong>Apple Podcasts</strong></span>
            </template>
          </MediaAudioPlayer>
        </div>

        <ul class="media-index__episodes" aria-label="اپیزودهای اخیر">
          <li v-for="ep in listEpisodes" :key="ep.slug">
            <button type="button" class="media-index__episode" @click="activeEpisodeSlug = ep.slug">
              <span class="media-index__episode-thumb">
                <BaseImage v-if="ep.image" :src="ep.image.src" :alt="ep.image.alt || ep.title" />
                <span class="media-index__episode-play" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>
                </span>
              </span>
              <span class="media-index__episode-body">
                <span class="media-index__episode-meta">
                  <span>اپیزود {{ toFaDigits(ep.audio?.episode ?? 0) }}</span>
                  <span>{{ minutes(ep.audio?.durationSec ?? 0) }} دقیقه</span>
                </span>
                <span class="media-index__episode-title">{{ ep.title }}</span>
                <span class="media-index__episode-excerpt">{{ ep.excerpt }}</span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- Section 3: articles grid + sidebar -->
    <section class="media-index__layout">
      <div ref="gridEl" class="media-index__main">
        <div class="media-index__grid-head">
          <h2>
            <span class="media-index__eyebrow-mark" aria-hidden="true" />
            {{ meta.gridTitle }}
          </h2>
          <label class="media-index__sort">
            <span>مرتب‌سازی:</span>
            <select v-model="sortKey">
              <option v-for="o in sortOptions" :key="o.key" :value="o.key">{{ o.label }}</option>
            </select>
          </label>
        </div>
        <p class="media-index__count">
          نمایش {{ toFaDigits(pagedArticles.length) }} مطلب از {{ toFaDigits(filtered.length) }} مورد
          <template v-if="activeTopic !== 'all'"> در دسته «{{ topics.find(t => t.key === activeTopic)?.label }}»</template>
        </p>

        <div v-if="pagedArticles.length" class="media-index__grid">
          <MediaArticleCard v-for="item in pagedArticles" :key="item.slug" :article="item" :href="hrefFor(item.slug)" />
        </div>
        <div v-else class="media-index__empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 5h16v14H4zM8 9h8M8 13h5"/></svg>
          <strong>مطلبی در این دسته منتشر نشده است</strong>
          <p>دسته دیگری را انتخاب کنید یا همه مطالب را ببینید.</p>
          <BaseButton variant="secondary" @click="selectTopic('all')">نمایش همه مطالب</BaseButton>
        </div>

        <nav v-if="pageCount > 1" class="media-index__pagination" aria-label="صفحه‌بندی">
          <button type="button" class="media-index__page-btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">صفحه قبلی</button>
          <div class="media-index__pages">
            <template v-for="(item, i) in pageItems" :key="`${item}-${i}`">
              <span v-if="item === 'gap'" class="media-index__page-gap">...</span>
              <button
                v-else
                type="button"
                class="media-index__page-num"
                :class="{ 'is-active': item === currentPage }"
                :aria-current="item === currentPage ? 'page' : undefined"
                @click="goToPage(item)"
              >
                {{ toFaDigits(item) }}
              </button>
            </template>
          </div>
          <button type="button" class="media-index__page-btn media-index__page-btn--primary" :disabled="currentPage === pageCount" @click="goToPage(currentPage + 1)">صفحه بعدی</button>
        </nav>
      </div>

      <aside class="media-index__sidebar">
        <div class="media-index__widget">
          <div class="media-index__widget-head">
            <h3>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 17 6-6 4 4 8-8M15 7h6v6"/></svg>
              پربازدیدترین مطالب هفته
            </h3>
            <span class="media-index__widget-tag">دیده‌بان</span>
          </div>
          <ol class="media-index__trending">
            <li v-for="(item, i) in trending" :key="item.slug">
              <NuxtLink :to="hrefFor(item.slug)">
                <span class="media-index__trending-kicker">{{ toFaDigits(String(i + 1).padStart(2, '0')) }} • {{ item.topicLabel }}</span>
                <span class="media-index__trending-title">{{ item.title }}</span>
                <span class="media-index__trending-meta">{{ formatFaNumber(item.views) }} بازدید • {{ item.date }}</span>
              </NuxtLink>
            </li>
          </ol>
        </div>

        <figure class="media-index__quote">
          <svg class="media-index__quote-glyph" width="110" height="110" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 7H6a2 2 0 0 0-2 2v4h4v4l3-4V9a2 2 0 0 0-1-2Zm10 0h-4a2 2 0 0 0-2 2v4h4v4l3-4V9a2 2 0 0 0-1-2Z"/></svg>
          <span class="media-index__quote-label">نقل‌قول تحلیلی هفته</span>
          <blockquote>{{ meta.quote.text }}</blockquote>
          <figcaption>
            <strong>{{ meta.quote.author }}</strong>
            <span>{{ meta.quote.role }}</span>
          </figcaption>
        </figure>

        <div class="media-index__widget">
          <div class="media-index__widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            <h3>خبرنامه دیده‌بان مسکن</h3>
          </div>
          <p class="media-index__widget-text">تحلیل‌های هفتگی بازار املاک و مستجدات پروژه‌های ثاخت مستقیماً به ایمیل شما ارسال می‌شود.</p>
          <form class="media-index__newsletter" novalidate @submit.prevent="submitNewsletter">
            <label class="media-index__field">
              <span>ایمیل یا شماره همراه</span>
              <input
                v-model="newsletterContact"
                type="text"
                inputmode="email"
                placeholder="ایمیل سازمانی یا شماره تماس شما"
                :aria-invalid="newsletterState === 'error'"
                @input="newsletterState = 'idle'"
              >
            </label>
            <p v-if="newsletterState === 'error'" class="media-index__field-error">لطفاً یک ایمیل معتبر یا شماره همراه ۱۱ رقمی وارد کنید.</p>
            <p v-if="newsletterState === 'success'" class="media-index__field-success" role="status">عضویت شما ثبت شد؛ نخستین شماره خبرنامه را هفته آینده دریافت می‌کنید.</p>
            <BaseButton type="submit">عضویت در خبرنامه تحلیلی</BaseButton>
            <p class="media-index__fine-print">اطلاعات شما نزد هلدینگ محفوظ است.</p>
          </form>
        </div>

        <div class="media-index__widget media-index__widget--alt">
          <h3 class="media-index__widget-plain-title">گزارشات و اسناد فنی (PDF)</h3>
          <p class="media-index__widget-text">دریافت نسخه چاپی سفیدنامه‌ها و گزارش‌های ارزیابی عملکرد سالانه.</p>
          <ul class="media-index__docs">
            <li v-for="doc in whitepapers" :key="doc.title">
              <NuxtLink :to="doc.href">
                <span>{{ doc.title }}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.media-index { padding-block-end: var(--space-8); }

/* breadcrumb + hub switch */
.media-index__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.media-index__breadcrumb a { color: inherit; text-decoration: none; }
.media-index__breadcrumb a:hover { color: var(--color-primary); }
.media-index__breadcrumb-current { color: var(--color-text); font-weight: 600; }
.media-index__hub-switch { display: flex; gap: 4px; margin-inline-start: auto; padding: 4px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-pill); }
.media-index__breadcrumb .media-index__hub-link { padding: 6px 14px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 700; color: var(--color-text-muted); }
.media-index__breadcrumb .media-index__hub-link.is-active { background: var(--color-ink); color: var(--color-white); }

/* sub-header */
.media-index__head { padding-block: var(--space-3) var(--space-3); margin-block-end: var(--space-6); border-block-end: 1px solid var(--color-border); }
.media-index__head-row { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-3); }
.media-index__eyebrow { display: inline-flex; align-items: center; gap: var(--space-1); font: var(--text-label); color: var(--color-primary); margin-block-end: var(--space-1); }
.media-index__eyebrow-mark { display: inline-block; inline-size: 10px; block-size: 10px; border-radius: 3px; background: var(--color-brand-blue); flex-shrink: 0; }
.media-index__title { font: var(--text-h2); font-weight: 700; }
.media-index__intro { font: var(--text-body-sm); color: var(--color-text-muted); max-inline-size: 28rem; }

.media-index__pills { display: flex; gap: var(--space-1); overflow-x: auto; padding-block-end: 4px; scrollbar-width: none; }
.media-index__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  padding: 9px 20px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text);
  font: var(--text-label);
  font-size: 13px;
  cursor: pointer;
  transition: border-color 150ms ease, color 150ms ease, background-color 150ms ease;
}
.media-index__pill:hover { border-color: var(--color-primary); color: var(--color-primary); }
.media-index__pill--podcast { background: var(--color-tint); border-color: var(--color-primary); color: var(--color-primary); }
.media-index__pill.is-active { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-white); }

/* featured lead story */
.media-index__hero {
  display: grid;
  grid-template-columns: 1fr;
  min-block-size: 460px;
  margin-block-end: var(--space-8);
  background: var(--color-ink);
  color: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
@media (min-width: 1024px) { .media-index__hero { grid-template-columns: 5fr 7fr; } }
.media-index__hero-media { position: relative; min-block-size: 288px; order: 1; }
@media (min-width: 1024px) { .media-index__hero-media { order: 2; } }
.media-index__hero-media :deep(img) { position: absolute; inset: 0; inline-size: 100%; block-size: 100%; object-fit: cover; filter: grayscale(25%) contrast(1.1); }
.media-index__hero-scrim { position: absolute; inset: 0; background: linear-gradient(to top, var(--color-ink), rgb(4 28 44 / 40%) 45%, transparent); }
@media (min-width: 1024px) { .media-index__hero-scrim { background: linear-gradient(to left, var(--color-ink), rgb(4 28 44 / 40%) 35%, transparent 70%); } }
.media-index__hero-badge { position: absolute; inset-block-start: var(--space-3); inset-inline-end: var(--space-3); padding: 6px 12px; border-radius: var(--radius-pill); background: var(--color-brand-blue); color: var(--color-white); font-size: 12px; font-weight: 700; }
.media-index__hero-content { position: relative; z-index: 1; order: 2; display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-3); padding: var(--space-4); }
@media (min-width: 768px) { .media-index__hero-content { padding: var(--space-6); } }
@media (min-width: 1024px) { .media-index__hero-content { order: 1; } }
.media-index__hero-meta { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-end: var(--space-2); font: var(--text-body-sm); color: rgb(255 255 255 / 70%); }
.media-index__hero-chip { padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-primary); font-size: 12px; font-weight: 700; }
.media-index__hero-title { font: 700 clamp(26px, 3vw, 38px)/1.3 var(--font-body); margin-block-end: var(--space-2); }
.media-index__hero-title a { color: inherit; text-decoration: none; }
.media-index__hero-title a:hover { color: var(--color-tint); }
.media-index__hero-excerpt { font: var(--text-body); font-size: 16px; color: rgb(255 255 255 / 78%); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.media-index__hero-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block-start: var(--space-3); border-block-start: 1px solid rgb(255 255 255 / 18%); }
.media-index__hero-author { display: flex; align-items: center; gap: 12px; }
.media-index__avatar { inline-size: 42px; block-size: 42px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); background: var(--color-brand-blue); color: var(--color-white); font-weight: 700; font-size: 13px; }
.media-index__hero-author-name { display: block; font: var(--text-label); color: var(--color-white); text-decoration: none; }
a.media-index__hero-author-name:hover { color: var(--color-tint); }
.media-index__hero-author-role { display: block; font-size: 12px; color: rgb(255 255 255 / 65%); margin-block-start: 4px; }
.media-index__hero-actions { display: flex; align-items: center; gap: 12px; }
.media-index__hero-time { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: rgb(255 255 255 / 70%); }
.media-index__hero-go { inline-size: 38px; block-size: 38px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); transition: background-color 150ms ease; }
.media-index__hero-go:hover { background: var(--color-tint); }

/* podcast showcase */
.media-index__podcast { margin-block-end: var(--space-8); padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 768px) { .media-index__podcast { padding: var(--space-4); } }
.media-index__podcast-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block-end: var(--space-3); margin-block-end: var(--space-3); border-block-end: 1px solid var(--color-border); }
.media-index__podcast-brand { display: flex; align-items: center; gap: var(--space-2); }
.media-index__podcast-icon { inline-size: 48px; block-size: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); background: var(--color-brand-blue); color: var(--color-white); }
.media-index__podcast-title-row { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); }
.media-index__podcast-title-row h2 { font: 700 22px/1.4 var(--font-body); }
.media-index__season { padding: 2px 8px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-primary); font-size: 11px; font-weight: 700; }
.media-index__podcast-brand p { font: var(--text-body-sm); color: var(--color-text-muted); }
.media-index__text-link { display: inline-flex; align-items: center; gap: 4px; font: var(--text-label); color: var(--color-primary); text-decoration: none; }
.media-index__text-link:hover { color: var(--color-primary-hover); text-decoration: underline; }

.media-index__podcast-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 1024px) { .media-index__podcast-grid { grid-template-columns: 7fr 5fr; } }
.media-index__player-box { display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-3); padding: var(--space-3); background: var(--color-ink); color: var(--color-white); border-radius: var(--radius-md); border-inline-end: 4px solid var(--color-brand-blue); }
@media (min-width: 768px) { .media-index__player-box { padding: var(--space-4); } }
.media-index__player-meta { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-1); font-size: 12px; font-weight: 600; color: var(--color-tint); margin-block-end: 12px; }
.media-index__live { display: inline-flex; align-items: center; gap: 6px; }
.media-index__live-dot { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--color-status-success); animation: media-index-pulse 1.6s ease-in-out infinite; }
@keyframes media-index-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .media-index__live-dot { animation: none; } }
.media-index__player-title { font: 700 22px/1.45 var(--font-body); margin-block-end: var(--space-1); }
.media-index__player-title a { color: var(--color-white); text-decoration: none; }
.media-index__player-title a:hover { color: var(--color-tint); }
.media-index__player-excerpt { font: var(--text-body-sm); color: rgb(255 255 255 / 72%); }
.media-index__listeners { display: inline-flex; align-items: center; gap: 4px; }
.media-index__platforms strong { color: var(--color-white); font-family: var(--font-en); }

.media-index__episodes { display: flex; flex-direction: column; gap: 12px; }
.media-index__episode {
  inline-size: 100%;
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-2);
  text-align: start;
  font-family: inherit;
  color: inherit;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color 150ms ease, background-color 150ms ease;
}
.media-index__episode:hover, .media-index__episode:focus-visible { border-color: var(--color-primary); background: var(--color-white); }
.media-index__episode-thumb { position: relative; flex-shrink: 0; inline-size: 64px; block-size: 64px; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface-alt); }
.media-index__episode-thumb :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.media-index__episode-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgb(4 28 44 / 35%); color: var(--color-white); opacity: 0; transition: opacity 150ms ease; }
.media-index__episode:hover .media-index__episode-play, .media-index__episode:focus-visible .media-index__episode-play { opacity: 1; }
.media-index__episode-body { flex: 1; min-inline-size: 0; display: flex; flex-direction: column; gap: 4px; }
.media-index__episode-meta { display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.media-index__episode-title { font: var(--text-h3); font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.media-index__episode:hover .media-index__episode-title { color: var(--color-primary); }
.media-index__episode-excerpt { font: var(--text-body-sm); color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* grid + sidebar */
.media-index__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); }
@media (min-width: 1024px) { .media-index__layout { grid-template-columns: 2fr 1fr; align-items: start; } }
.media-index__main { scroll-margin-block-start: var(--space-3); }
.media-index__grid-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; border-block-end: 2px solid var(--color-ink); }
.media-index__grid-head h2 { display: flex; align-items: center; gap: var(--space-1); font: 700 22px/1.4 var(--font-body); }
.media-index__sort { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.media-index__sort select { font: inherit; color: var(--color-text); padding: 6px 10px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-white); }
.media-index__count { font: var(--text-body-sm); color: var(--color-text-muted); margin-block: 12px var(--space-3); }
.media-index__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .media-index__grid { grid-template-columns: 1fr 1fr; } }

.media-index__empty { display: flex; flex-direction: column; align-items: center; gap: var(--space-1); text-align: center; padding: var(--space-6) var(--space-3); background: var(--color-white); border: 1px dashed var(--color-border); border-radius: var(--radius-md); color: var(--color-text-muted); }
.media-index__empty strong { color: var(--color-text); font: var(--text-h3); }
.media-index__empty p { font: var(--text-body-sm); margin-block-end: var(--space-1); }

.media-index__pagination { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-start: var(--space-6); padding: var(--space-2); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.media-index__page-btn { padding: 8px 16px; border-radius: var(--radius-pill); border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-text); font: var(--text-label); font-size: 13px; cursor: pointer; }
.media-index__page-btn:hover:not(:disabled) { background: var(--color-surface-alt); }
.media-index__page-btn--primary { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); }
.media-index__page-btn--primary:hover:not(:disabled) { background: var(--color-brand-blue-deep); }
.media-index__page-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.media-index__pages { display: flex; align-items: center; gap: 6px; }
.media-index__page-num { inline-size: 34px; block-size: 34px; border: none; border-radius: var(--radius-xs); background: none; color: var(--color-text); font: var(--text-label); font-size: 13px; cursor: pointer; }
.media-index__page-num:hover { background: var(--color-surface-alt); }
.media-index__page-num.is-active { background: var(--color-brand-blue); color: var(--color-white); }
.media-index__page-gap { color: var(--color-text-muted); }

.media-index__sidebar { display: flex; flex-direction: column; gap: var(--space-3); }
.media-index__widget { padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.media-index__widget--alt { background: var(--color-surface-alt); }
.media-index__widget-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: var(--space-2); border-block-end: 1px solid var(--color-border); }
.media-index__widget-head h3, .media-index__widget-title h3, .media-index__widget-plain-title { display: flex; align-items: center; gap: var(--space-1); font: var(--text-h3); }
.media-index__widget-head svg, .media-index__widget-title svg { color: var(--color-primary); flex-shrink: 0; }
.media-index__widget-tag { padding: 2px 8px; border-radius: var(--radius-xs); background: var(--color-surface-alt); color: var(--color-text-muted); font-size: 11px; font-weight: 700; }
.media-index__widget-title { display: flex; align-items: center; gap: var(--space-1); margin-block-end: var(--space-1); }
.media-index__widget-plain-title { margin-block-end: var(--space-1); }
.media-index__widget-text { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-end: var(--space-2); }

.media-index__trending li + li { border-block-start: 1px solid var(--color-border); }
.media-index__trending a { display: flex; flex-direction: column; gap: 4px; padding-block: 12px; text-decoration: none; color: inherit; }
.media-index__trending li:first-child a { padding-block-start: 0; }
.media-index__trending-kicker { font-size: 11px; font-weight: 700; color: var(--color-primary); }
.media-index__trending-title { font: var(--text-label); font-size: 14px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.media-index__trending a:hover .media-index__trending-title { color: var(--color-primary); }
.media-index__trending-meta { font-size: 12px; color: var(--color-text-muted); }

.media-index__quote { position: relative; overflow: hidden; margin: 0; padding: var(--space-3); background: var(--color-ink); color: var(--color-white); border-radius: var(--radius-md); border-inline-end: 4px solid var(--color-brand-blue); }
.media-index__quote-glyph { position: absolute; inset-block-end: -24px; inset-inline-end: -18px; color: rgb(255 255 255 / 8%); pointer-events: none; }
.media-index__quote-label { position: relative; display: block; font: var(--text-label); font-size: 12px; color: var(--color-tint); margin-block-end: var(--space-1); }
.media-index__quote blockquote { position: relative; margin: 0 0 var(--space-2); font: var(--text-body); font-size: 16px; line-height: 1.9; }
.media-index__quote figcaption { position: relative; display: flex; flex-direction: column; gap: 4px; padding-block-start: 12px; border-block-start: 1px solid rgb(255 255 255 / 18%); }
.media-index__quote figcaption strong { font: var(--text-label); }
.media-index__quote figcaption span { font-size: 12px; color: rgb(255 255 255 / 65%); }

.media-index__newsletter { display: flex; flex-direction: column; gap: 12px; }
.media-index__newsletter :deep(.base-button) { inline-size: 100%; justify-content: center; }
.media-index__field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 700; }
.media-index__field input { font: var(--text-body-sm); padding: 10px 14px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-white); color: var(--color-text); }
.media-index__field input:focus { outline: none; border-color: var(--color-primary); }
.media-index__field input[aria-invalid='true'] { border-color: var(--color-status-error); }
.media-index__field-error { font-size: 12px; color: var(--color-status-error); }
.media-index__field-success { font-size: 12px; color: var(--color-status-success); font-weight: 600; }
.media-index__fine-print { font-size: 11px; color: var(--color-text-muted); text-align: center; }

.media-index__docs { display: flex; flex-direction: column; gap: var(--space-1); }
.media-index__docs a { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding: 10px 12px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-xs); color: var(--color-text); text-decoration: none; font-size: 13px; font-weight: 600; transition: border-color 150ms ease; }
.media-index__docs a:hover { border-color: var(--color-primary); }
.media-index__docs a span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.media-index__docs svg { color: var(--color-primary); flex-shrink: 0; }
</style>
