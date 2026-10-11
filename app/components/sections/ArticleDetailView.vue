<script setup lang="ts">
import { projects } from '~/utils/projectsData'
import {
  formatFaNumber,
  getArticlesByType,
  getTopicsByType,
  getTrendingArticles,
  mediaHubHref,
  mediaTypeLabels,
  toFaDigits,
  type ArticleDetailExtended,
  type ArticleType,
} from '~/utils/articlesData'

// Template `04-article-detail` (docs/page-templates-icd3d.md §8), rebuilt to
// match `project_detail_page_template/04_article_detail/code.html`:
// breadcrumb bar with reading time, an 8/4 split with the article panel
// (category + audio badges, date/views, headline, lead, author box with
// working share buttons, captioned hero image, podcast audio module,
// structured body with numbered subheads / pull quote / figure / checklist,
// tags + print-to-PDF, previous/next navigation, a validated comment form)
// and a sidebar (search → site search, hub/topic categories with counts,
// most-read list, investment CTA, featured-project tiles). A related-posts
// row closes the page (required by the §8 spec). Header/footer/newsletter
// strip belong to the shared layout.

const props = defineProps<{ article: ArticleDetailExtended; hubLabel: string; hubHref: string }>()

const type = computed<ArticleType>(() => props.article.contentType)
const requestUrl = useRequestURL()
const shareUrl = computed(() => requestUrl.href)

// --- share ---
const copied = ref(false)
const linkedInHref = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`)
const telegramHref = computed(() => `https://t.me/share/url?url=${encodeURIComponent(shareUrl.value)}&text=${encodeURIComponent(props.article.title)}`)
async function copyLink() {
  try {
    await navigator.clipboard?.writeText(shareUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
  catch {
    copied.value = false
  }
}
function printArticle() {
  window.print()
}

// --- sidebar data ---
const searchQuery = ref('')
function submitSearch() {
  const q = searchQuery.value.trim()
  navigateTo(q ? { path: '/search', query: { q } } : '/search')
}

const hubCategories = computed(() => (Object.keys(mediaHubHref) as ArticleType[]).map(t => ({
  type: t,
  label: mediaTypeLabels[t].hub,
  href: mediaHubHref[t],
  count: getArticlesByType(t).length,
  topics: t === type.value ? getTopicsByType(t) : [],
})))

const trending = computed(() => getTrendingArticles(undefined, 4, props.article.slug))
const articleHref = (t: ArticleType, slug: string) => `${mediaHubHref[t]}/${slug}`

const projectTiles = ['megapars-tehran', 'tehran-international-tower']
  .map(slug => projects.find(p => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
  .map(p => ({ slug: p.slug, name: p.name, image: `/img/placeholder.svg` }))

// --- comment form ---
const comment = reactive({ name: '', email: '', message: '', notify: false })
const errors = reactive<{ name?: string; email?: string; message?: string }>({})
const commentSent = ref(false)
function submitComment() {
  errors.name = comment.name.trim() ? undefined : 'لطفاً نام و نام خانوادگی را وارد کنید.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(comment.email.trim()) ? undefined : 'یک پست الکترونیکی معتبر وارد کنید.'
  errors.message = comment.message.trim().length >= 10 ? undefined : 'متن دیدگاه باید دست‌کم ۱۰ نویسه باشد.'
  if (errors.name || errors.email || errors.message) {
    commentSent.value = false
    return
  }
  commentSent.value = true
  comment.name = ''
  comment.email = ''
  comment.message = ''
  comment.notify = false
}

const audioHeading = computed(() => {
  const a = props.article.audio
  if (!a) return ''
  return a.episode
    ? `نسخه شنیداری مقاله: پادکست «روایت ثاخت» (قسمت ${toFaDigits(a.episode)})`
    : 'نسخه شنیداری مقاله: روایت صوتی رادیو ثاخت'
})
</script>

<template>
  <div class="article-detail">
    <nav class="article-detail__breadcrumb" aria-label="مسیریاب">
      <div class="article-detail__crumbs">
        <NuxtLink to="/">صفحه اصلی</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/media">رسانه و دانش ثاخت</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink :to="hubHref" class="article-detail__crumb-hub">{{ hubLabel }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="article-detail__breadcrumb-current">{{ article.title }}</span>
      </div>
      <span class="article-detail__reading">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        زمان مطالعه: {{ toFaDigits(article.readingMinutes) }} دقیقه
      </span>
    </nav>

    <div class="article-detail__layout">
      <article class="article-detail__main">
        <div class="article-detail__meta-row">
          <div class="article-detail__badges">
            <NuxtLink :to="`${hubHref}?topic=${article.topic}`" class="article-detail__badge article-detail__badge--category">{{ article.category }}</NuxtLink>
            <span v-if="article.audio" class="article-detail__badge">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="11" r="2"/><path d="M8.5 14.5a5 5 0 1 1 7 0M5.6 17.4a9 9 0 1 1 12.8 0M12 13v8"/></svg>
              همراه با نسخه صوتی
            </span>
          </div>
          <div class="article-detail__stats">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>
              {{ article.date }}
            </span>
            <span class="article-detail__stats-sep" aria-hidden="true">|</span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>
              {{ formatFaNumber(article.views) }} بازدید
            </span>
          </div>
        </div>

        <h1 class="article-detail__title">{{ article.title }}</h1>
        <p v-if="article.excerpt" class="article-detail__lead">{{ article.excerpt }}</p>

        <div class="article-detail__author-box">
          <div class="article-detail__author">
            <span class="article-detail__author-avatar" aria-hidden="true">{{ article.author.initials }}</span>
            <div>
              <NuxtLink v-if="article.author.boardSlug" :to="'/about#board'" class="article-detail__author-name">{{ article.author.name }}</NuxtLink>
              <strong v-else class="article-detail__author-name">{{ article.author.name }}</strong>
              <span class="article-detail__author-role">{{ article.author.role }}</span>
            </div>
          </div>
          <div class="article-detail__share">
            <span class="article-detail__share-label">اشتراک‌گذاری:</span>
            <a :href="linkedInHref" target="_blank" rel="noopener noreferrer" class="article-detail__share-btn" title="لینکدین" aria-label="اشتراک در لینکدین">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4Z"/></svg>
            </a>
            <a :href="telegramHref" target="_blank" rel="noopener noreferrer" class="article-detail__share-btn" title="تلگرام" aria-label="اشتراک در تلگرام">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.9 4.3 18.7 19.4c-.24 1.07-.87 1.33-1.77.83l-4.9-3.61-2.36 2.27c-.26.26-.48.48-.99.48l.35-5 9.1-8.22c.4-.35-.08-.55-.62-.2L6.28 13.03l-4.84-1.51c-1.05-.33-1.07-1.05.22-1.56L20.6 2.74c.88-.33 1.65.2 1.3 1.56Z"/></svg>
            </a>
            <button type="button" class="article-detail__share-btn" :class="{ 'is-done': copied }" :title="copied ? 'لینک کپی شد' : 'کپی لینک مقاله'" :aria-label="copied ? 'لینک کپی شد' : 'کپی لینک مقاله'" @click="copyLink">
              <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>
            </button>
            <span v-if="copied" class="article-detail__copied" role="status">کپی شد</span>
          </div>
        </div>

        <figure v-if="article.image" class="article-detail__hero">
          <BaseImage :src="article.image.src" :alt="article.image.alt || article.title" />
          <figcaption v-if="article.heroCaption" class="article-detail__hero-caption">
            <span>{{ article.heroCaption }}</span>
            <span v-if="article.heroCredit" class="article-detail__hero-credit">{{ article.heroCredit }}</span>
          </figcaption>
        </figure>

        <section v-if="article.audio" class="article-detail__audio" aria-label="نسخه شنیداری">
          <div class="article-detail__audio-head">
            <span class="article-detail__audio-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10"/></svg>
              {{ audioHeading }}
            </span>
            <span class="article-detail__audio-duration">مدت زمان: {{ toFaDigits(Math.round(article.audio.durationSec / 60)) }} دقیقه</span>
          </div>
          <MediaAudioPlayer
            :duration-sec="article.audio.durationSec"
            :narrator="article.audio.narrator"
            :track-key="article.slug"
            :download-href="article.audioUrl"
            tone="light"
          />
        </section>

        <div class="article-detail__body">
          <template v-for="(block, i) in article.body" :key="i">
            <p v-if="block.type === 'p'">{{ block.text }}</p>
            <h2 v-else-if="block.type === 'h2'">{{ block.text }}</h2>
            <h3 v-else-if="block.type === 'h3'">{{ block.text }}</h3>
            <figure v-else-if="block.type === 'quote'" class="article-detail__pull-quote">
              <blockquote>{{ block.text }}</blockquote>
              <figcaption>
                <span>— {{ block.author }}</span>
                <template v-if="block.role">
                  <span class="article-detail__dot" aria-hidden="true">•</span>
                  <span class="article-detail__pull-quote-role">{{ block.role }}</span>
                </template>
              </figcaption>
            </figure>
            <figure v-else-if="block.type === 'figure'" class="article-detail__figure">
              <div class="article-detail__figure-media">
                <BaseImage :src="block.image.src" :alt="block.image.alt || block.caption" />
              </div>
              <figcaption>{{ block.caption }}</figcaption>
            </figure>
            <ul v-else-if="block.type === 'checklist'" class="article-detail__checklist">
              <li v-for="item in block.items" :key="item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4Z"/></svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </div>

        <div class="article-detail__tags-row">
          <div class="article-detail__tags">
            <span class="article-detail__tags-label">برچسب‌ها:</span>
            <NuxtLink v-for="tag in article.tags" :key="tag" :to="{ path: '/search', query: { q: tag.replace(/_/g, ' ') } }" class="article-detail__tag">#{{ tag }}</NuxtLink>
          </div>
          <button type="button" class="article-detail__pdf" @click="printArticle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
            دریافت نسخه PDF مقاله
          </button>
        </div>

        <nav v-if="article.previous || article.next" class="article-detail__pager" aria-label="مطالب قبلی و بعدی">
          <NuxtLink v-if="article.previous" :to="articleHref(article.previous.contentType, article.previous.slug)" class="article-detail__pager-link">
            <span class="article-detail__pager-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
            </span>
            <span>
              <span class="article-detail__pager-label">مطلب قبلی</span>
              <span class="article-detail__pager-title">{{ article.previous.title }}</span>
            </span>
          </NuxtLink>
          <NuxtLink v-if="article.next" :to="articleHref(article.next.contentType, article.next.slug)" class="article-detail__pager-link article-detail__pager-link--next">
            <span>
              <span class="article-detail__pager-label">مطلب بعدی</span>
              <span class="article-detail__pager-title">{{ article.next.title }}</span>
            </span>
            <span class="article-detail__pager-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
            </span>
          </NuxtLink>
        </nav>

        <section class="article-detail__comments" aria-labelledby="comments-title">
          <h2 id="comments-title">دیدگاه و پرسش‌های تخصصی شما</h2>
          <p class="article-detail__comments-hint">نظرات و سوالات شما پس از تایید مدیر سامانه، در این بخش نمایش داده خواهد شد.</p>
          <p v-if="commentSent" class="article-detail__comment-success" role="status">دیدگاه شما با موفقیت ثبت شد و پس از بررسی کارشناسان منتشر می‌شود.</p>
          <form class="article-detail__form" novalidate @submit.prevent="submitComment">
            <div class="article-detail__form-row">
              <label class="article-detail__field">
                <span>نام و نام خانوادگی <em aria-hidden="true">*</em></span>
                <input v-model="comment.name" type="text" placeholder="مثلاً: علی محمدی" :aria-invalid="Boolean(errors.name)" autocomplete="name">
                <small v-if="errors.name" class="article-detail__error">{{ errors.name }}</small>
              </label>
              <label class="article-detail__field">
                <span>پست الکترونیکی <em aria-hidden="true">*</em></span>
                <input v-model="comment.email" type="email" dir="ltr" placeholder="example@domain.com" :aria-invalid="Boolean(errors.email)" autocomplete="email">
                <small v-if="errors.email" class="article-detail__error">{{ errors.email }}</small>
              </label>
            </div>
            <label class="article-detail__field">
              <span>متن دیدگاه یا پرسش <em aria-hidden="true">*</em></span>
              <textarea v-model="comment.message" rows="4" placeholder="دیدگاه تخصصی خود را بنویسید..." :aria-invalid="Boolean(errors.message)" />
              <small v-if="errors.message" class="article-detail__error">{{ errors.message }}</small>
            </label>
            <div class="article-detail__form-foot">
              <label class="article-detail__check">
                <input v-model="comment.notify" type="checkbox">
                <span>اطلاع‌رسانی از پاسخ به دیدگاه از طریق ایمیل</span>
              </label>
              <BaseButton type="submit">ثبت و ارسال دیدگاه</BaseButton>
            </div>
          </form>
        </section>
      </article>

      <aside class="article-detail__sidebar">
        <div class="article-detail__box">
          <h3 class="article-detail__box-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            جستجو در رسانه و مقالات
          </h3>
          <form class="article-detail__search" role="search" @submit.prevent="submitSearch">
            <input v-model="searchQuery" type="search" placeholder="جستجوی عنوان، کلیدواژه یا نویسنده..." aria-label="عبارت جستجو">
            <button type="submit" aria-label="جستجو">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
            </button>
          </form>
        </div>

        <div class="article-detail__box">
          <h3 class="article-detail__box-head">
            <span>دسته‌بندی‌های محتوایی</span>
            <small>کل مطالب</small>
          </h3>
          <ul class="article-detail__categories">
            <li v-for="hub in hubCategories" :key="hub.type">
              <NuxtLink :to="hub.href" class="article-detail__category" :class="{ 'is-current': hub.type === type }">
                <span class="article-detail__category-name"><span class="article-detail__category-dot" aria-hidden="true" />{{ hub.label }}</span>
                <span class="article-detail__count">{{ toFaDigits(hub.count) }}</span>
              </NuxtLink>
              <ul v-if="hub.topics.length" class="article-detail__subcategories">
                <li v-for="topic in hub.topics" :key="topic.key">
                  <NuxtLink :to="`${hub.href}?topic=${topic.key}`" class="article-detail__category article-detail__category--sub" :class="{ 'is-current': topic.key === article.topic }">
                    <span class="article-detail__category-name">{{ topic.label }}</span>
                    <span class="article-detail__count">{{ toFaDigits(topic.count) }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="article-detail__box">
          <h3 class="article-detail__box-head">
            <span>پرخواننده‌ترین مطالب اخیر</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="article-detail__flame" aria-hidden="true"><path d="M12 2c1 4 5 5.5 5 11a5 5 0 0 1-10 0c0-2.5 1.2-4 2.5-5 .1 1.8 1 3 2 3.2C11 8.5 11.3 5 12 2Z"/></svg>
          </h3>
          <ol class="article-detail__popular">
            <li v-for="(item, i) in trending" :key="item.slug">
              <NuxtLink :to="articleHref(item.contentType, item.slug)">
                <span class="article-detail__rank" :class="{ 'is-first': i === 0 }">{{ toFaDigits(i + 1) }}</span>
                <span>
                  <span class="article-detail__popular-title">{{ item.title }}</span>
                  <span class="article-detail__popular-meta">
                    {{ item.date }} •
                    <template v-if="item.audio?.episode">پادکست {{ toFaDigits(Math.round(item.audio.durationSec / 60)) }} دقیقه</template>
                    <template v-else>{{ toFaDigits(item.readingMinutes) }} دقیقه مطالعه</template>
                  </span>
                </span>
              </NuxtLink>
            </li>
          </ol>
        </div>

        <div class="article-detail__cta">
          <span class="article-detail__cta-eyebrow">فرصت سرمایه‌گذاری</span>
          <h3>علاقه‌مند به دریافت اطلاعات واحدهای تجاری مگاپارس هستید؟</h3>
          <p>کاتالوگ تخصصی، پلن‌های معماری و شرایط پیش‌فروش اقساطی مگاپروژه را از کارشناسان فروش ثاخت دریافت نمایید.</p>
          <BaseButton href="/sales/consultation">درخواست تماس مشاوره خرید</BaseButton>
        </div>

        <div class="article-detail__box">
          <h3 class="article-detail__box-head article-detail__box-head--plain">
            <span>پروژه‌های شاخص گروه</span>
            <NuxtLink to="/projects" class="article-detail__see-all">مشاهده همه</NuxtLink>
          </h3>
          <div class="article-detail__projects">
            <NuxtLink v-for="p in projectTiles" :key="p.slug" :to="`/projects/${p.slug}`" class="article-detail__project">
              <BaseImage :src="p.image" :alt="p.name" />
              <span>{{ p.name }}</span>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <section v-if="article.related.length" class="article-detail__related" aria-labelledby="related-title">
      <div class="article-detail__related-head">
        <h2 id="related-title">مطالب مرتبط</h2>
        <NuxtLink :to="hubHref" class="article-detail__see-all">همه مطالب {{ hubLabel }}</NuxtLink>
      </div>
      <div class="article-detail__related-grid">
        <MediaArticleCard v-for="item in article.related" :key="item.slug" :article="item" :href="articleHref(item.contentType, item.slug)" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.article-detail { padding-block-end: var(--space-8); }

/* breadcrumb bar */
.article-detail__breadcrumb { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block: var(--space-2); border-block-end: 1px solid var(--color-border); font: var(--text-body-sm); font-size: 13px; color: var(--color-text-muted); }
.article-detail__crumbs { display: flex; align-items: center; gap: var(--space-1); min-inline-size: 0; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
.article-detail__crumbs a { color: inherit; text-decoration: none; }
.article-detail__crumbs a:hover { color: var(--color-primary); }
.article-detail__crumbs .article-detail__crumb-hub { color: var(--color-primary); font-weight: 600; }
.article-detail__breadcrumb-current { color: var(--color-text); font-weight: 600; max-inline-size: 28rem; overflow: hidden; text-overflow: ellipsis; }
.article-detail__reading { display: none; align-items: center; gap: 6px; flex-shrink: 0; }
@media (min-width: 768px) { .article-detail__reading { display: inline-flex; } }

.article-detail__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-6); padding-block: var(--space-6); }
@media (min-width: 1024px) { .article-detail__layout { grid-template-columns: 2fr 1fr; align-items: start; } }

/* article panel */
.article-detail__main { min-inline-size: 0; padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 640px) { .article-detail__main { padding: var(--space-6); } }

.article-detail__meta-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-block-end: 20px; }
.article-detail__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.article-detail__badge { display: inline-flex; align-items: center; gap: 4px; padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; font-weight: 600; text-decoration: none; }
.article-detail__badge svg { color: var(--color-primary); }
.article-detail__badge--category { background: var(--color-tint); color: var(--color-primary); font-weight: 700; }
.article-detail__badge--category:hover { background: var(--color-brand-blue); color: var(--color-white); }
.article-detail__stats { display: flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 500; color: var(--color-text-muted); }
.article-detail__stats > span { display: inline-flex; align-items: center; gap: 6px; }
.article-detail__stats-sep { color: var(--color-border); }

.article-detail__title { font: 800 clamp(26px, 3.2vw, 38px)/1.45 var(--font-body); color: var(--color-text); margin-block-end: var(--space-3); }
.article-detail__lead { font: 500 18px/1.9 var(--font-body); color: var(--color-text-muted); padding-block-end: var(--space-3); margin-block-end: var(--space-4); border-block-end: 1px solid var(--color-border); }

.article-detail__author-box { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); padding: var(--space-2); margin-block-end: var(--space-4); background: var(--color-surface); border-radius: var(--radius-md); }
.article-detail__author { display: flex; align-items: center; gap: 12px; }
.article-detail__author-avatar { inline-size: 48px; block-size: 48px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-tint); border: 1px solid rgb(0 94 184 / 20%); color: var(--color-primary); font-weight: 700; font-size: 14px; }
.article-detail__author-name { display: block; font-size: 14px; font-weight: 700; color: var(--color-text); text-decoration: none; }
a.article-detail__author-name:hover { color: var(--color-primary); }
.article-detail__author-role { display: block; font-size: 12px; color: var(--color-text-muted); margin-block-start: 2px; }
.article-detail__share { display: flex; align-items: center; gap: var(--space-1); }
.article-detail__share-label { font-size: 12px; font-weight: 500; color: var(--color-text-muted); }
.article-detail__share-btn { inline-size: 36px; block-size: 36px; display: inline-flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-text-muted); cursor: pointer; transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease; }
.article-detail__share-btn:hover { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); }
.article-detail__share-btn.is-done { background: var(--color-status-success); border-color: var(--color-status-success); color: var(--color-white); }
.article-detail__copied { font-size: 12px; font-weight: 600; color: var(--color-status-success); }

.article-detail__hero { position: relative; margin: 0 0 var(--space-4); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border); aspect-ratio: 16 / 9; background: var(--color-surface); }
.article-detail__hero :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 600ms var(--motion-ease); }
.article-detail__hero:hover :deep(img) { transform: scale(1.01); }
.article-detail__hero-caption { position: absolute; inset-inline: 0; inset-block-end: 0; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-1); padding: var(--space-4) var(--space-2) var(--space-2); background: linear-gradient(to top, rgb(4 28 44 / 82%), rgb(4 28 44 / 40%) 60%, transparent); color: var(--color-white); font-size: 12px; }
.article-detail__hero-credit { font-size: 11px; opacity: 0.8; }

.article-detail__audio { margin-block-end: var(--space-6); padding: 20px; border-radius: var(--radius-md); border: 1px solid rgb(0 94 184 / 20%); background: linear-gradient(135deg, var(--color-surface), rgb(232 232 232 / 70%)); }
.article-detail__audio-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-end: 12px; }
.article-detail__audio-title { display: inline-flex; align-items: center; gap: var(--space-1); font-size: 14px; font-weight: 700; color: var(--color-primary); }
.article-detail__audio-duration { font-size: 12px; font-weight: 500; color: var(--color-text-muted); }

/* body */
.article-detail__body { display: flex; flex-direction: column; gap: var(--space-3); font: 400 16px/2 var(--font-body); color: var(--color-text); }
.article-detail__body h2 { font: 700 clamp(20px, 2.2vw, 24px)/1.5 var(--font-body); color: var(--color-text); padding-block: var(--space-2) 4px; padding-inline-start: 12px; border-inline-start: 4px solid var(--color-brand-blue); }
.article-detail__body h3 { font: 700 clamp(18px, 2vw, 20px)/1.55 var(--font-body); color: var(--color-text); padding-block-start: var(--space-1); }
.article-detail__pull-quote { margin: var(--space-2) 0; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border-inline-start: 4px solid var(--color-brand-blue); background: color-mix(in srgb, var(--color-tint) 35%, transparent); }
.article-detail__pull-quote blockquote { margin: 0; font: 700 clamp(17px, 1.8vw, 20px)/1.8 var(--font-body); color: var(--color-text); }
.article-detail__pull-quote figcaption { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-start: 12px; font-size: 12px; font-weight: 700; color: var(--color-primary); }
.article-detail__dot { color: var(--color-border); }
.article-detail__pull-quote-role { font-weight: 400; color: var(--color-text-muted); }
.article-detail__figure { margin: var(--space-2) 0; padding: 12px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.article-detail__figure-media { aspect-ratio: 2 / 1; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface-alt); }
.article-detail__figure-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.article-detail__figure figcaption { margin-block-start: 10px; text-align: center; font-size: 12px; font-weight: 500; color: var(--color-text-muted); }
.article-detail__checklist { display: flex; flex-direction: column; gap: 10px; }
.article-detail__checklist li { display: flex; align-items: flex-start; gap: var(--space-1); font-size: 14px; line-height: 1.9; }
.article-detail__checklist svg { flex-shrink: 0; margin-block-start: 5px; color: var(--color-brand-blue); }

.article-detail__tags-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); margin-block-start: var(--space-6); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
.article-detail__tags { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); }
.article-detail__tags-label { font-size: 12px; font-weight: 700; color: var(--color-text-muted); }
.article-detail__tag { padding: 4px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; text-decoration: none; transition: background-color 150ms ease, color 150ms ease; }
.article-detail__tag:hover { background: var(--color-tint); color: var(--color-primary); }
.article-detail__pdf { display: inline-flex; align-items: center; gap: 6px; padding: 0; border: none; background: none; font: inherit; font-size: 12px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; }
.article-detail__pdf svg { color: var(--color-status-error); }
.article-detail__pdf:hover { color: var(--color-primary); }

.article-detail__pager { display: grid; grid-template-columns: 1fr; gap: var(--space-2); margin-block-start: var(--space-4); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
@media (min-width: 640px) { .article-detail__pager { grid-template-columns: 1fr 1fr; } }
.article-detail__pager-link { display: flex; align-items: center; gap: 12px; padding: var(--space-2); border-radius: var(--radius-md); background: var(--color-surface); border: 1px solid transparent; color: inherit; text-decoration: none; transition: background-color 150ms ease, border-color 150ms ease; min-inline-size: 0; }
.article-detail__pager-link:hover { background: var(--color-surface-alt); border-color: var(--color-border); }
.article-detail__pager-link--next { justify-content: flex-end; text-align: end; }
.article-detail__pager-link > span:not(.article-detail__pager-icon) { min-inline-size: 0; }
.article-detail__pager-icon { inline-size: 32px; block-size: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-white); color: var(--color-text-muted); }
.article-detail__pager-link:hover .article-detail__pager-icon { color: var(--color-primary); }
.article-detail__pager-label { display: block; font-size: 11px; font-weight: 500; color: var(--color-text-muted); }
.article-detail__pager-title { display: block; font-size: 13px; font-weight: 700; color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.article-detail__pager-link:hover .article-detail__pager-title { color: var(--color-primary); }

/* comments */
.article-detail__comments { margin-block-start: var(--space-6); padding-block-start: var(--space-4); border-block-start: 1px solid var(--color-border); }
.article-detail__comments h2 { font: 700 18px/1.5 var(--font-body); margin-block-end: 6px; }
.article-detail__comments-hint { font-size: 12px; color: var(--color-text-muted); margin-block-end: var(--space-3); }
.article-detail__comment-success { margin-block-end: var(--space-2); padding: 12px var(--space-2); border-radius: var(--radius-sm); background: color-mix(in srgb, var(--color-status-success) 10%, transparent); color: var(--color-status-success); font-size: 13px; font-weight: 600; }
.article-detail__form { display: flex; flex-direction: column; gap: var(--space-2); }
.article-detail__form-row { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
@media (min-width: 640px) { .article-detail__form-row { grid-template-columns: 1fr 1fr; } }
.article-detail__field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 700; color: var(--color-text); }
.article-detail__field em { font-style: normal; color: var(--color-status-error); }
.article-detail__field input, .article-detail__field textarea { font: var(--text-body-sm); font-size: 13px; padding: 12px var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-surface); color: var(--color-text); resize: vertical; transition: border-color 150ms ease, box-shadow 150ms ease; }
.article-detail__field input:focus, .article-detail__field textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 1px var(--color-primary); background: var(--color-white); }
.article-detail__field [aria-invalid='true'] { border-color: var(--color-status-error); }
.article-detail__error { font-size: 12px; font-weight: 500; color: var(--color-status-error); }
.article-detail__form-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block-start: var(--space-1); }
.article-detail__check { display: inline-flex; align-items: center; gap: var(--space-1); font-size: 12px; color: var(--color-text-muted); cursor: pointer; }
.article-detail__check input { accent-color: var(--color-brand-blue); }

/* sidebar */
.article-detail__sidebar { display: flex; flex-direction: column; gap: var(--space-4); min-inline-size: 0; }
.article-detail__box { padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.article-detail__box-title { display: flex; align-items: center; gap: var(--space-1); font-size: 14px; font-weight: 700; margin-block-end: 12px; }
.article-detail__box-title svg { color: var(--color-primary); }
.article-detail__box-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: var(--space-2); border-block-end: 1px solid var(--color-border); font-size: 14px; font-weight: 700; }
.article-detail__box-head small { font-size: 12px; font-weight: 400; color: var(--color-text-muted); }
.article-detail__box-head--plain { border-block-end: none; padding-block-end: 0; }
.article-detail__flame { color: var(--color-status-error); }
.article-detail__see-all { font-size: 12px; font-weight: 600; color: var(--color-primary); text-decoration: none; }
.article-detail__see-all:hover { text-decoration: underline; }

.article-detail__search { position: relative; }
.article-detail__search input { inline-size: 100%; font: var(--text-body-sm); font-size: 13px; padding: 12px var(--space-2); padding-inline-end: 44px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-surface); color: var(--color-text); }
.article-detail__search input:focus { outline: none; border-color: var(--color-primary); background: var(--color-white); }
.article-detail__search button { position: absolute; inset-block: 6px; inset-inline-end: 6px; inline-size: 32px; display: flex; align-items: center; justify-content: center; border: none; border-radius: var(--radius-xs); background: none; color: var(--color-text-muted); cursor: pointer; }
.article-detail__search button:hover { color: var(--color-primary); background: var(--color-tint); }

.article-detail__categories { display: flex; flex-direction: column; gap: 4px; font-size: 13px; font-weight: 500; }
.article-detail__category { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding: 10px; border-radius: var(--radius-sm); color: var(--color-text); text-decoration: none; transition: background-color 150ms ease, color 150ms ease; }
.article-detail__category:hover, .article-detail__category.is-current { background: var(--color-surface); color: var(--color-primary); }
.article-detail__category-name { display: inline-flex; align-items: center; gap: var(--space-1); }
.article-detail__category-dot { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--color-border); }
.article-detail__category.is-current .article-detail__category-dot, .article-detail__category:hover .article-detail__category-dot { background: var(--color-brand-blue); }
.article-detail__count { padding: 2px 8px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 11px; }
.article-detail__category:hover .article-detail__count, .article-detail__category.is-current .article-detail__count { background: var(--color-tint); color: var(--color-primary); }
.article-detail__subcategories { display: flex; flex-direction: column; gap: 2px; margin-inline-start: var(--space-3); padding-inline-start: var(--space-1); border-inline-start: 1px solid var(--color-border); }
.article-detail__category--sub { padding-block: 7px; font-size: 12px; }

.article-detail__popular { display: flex; flex-direction: column; gap: var(--space-2); }
.article-detail__popular a { display: flex; align-items: flex-start; gap: 14px; color: inherit; text-decoration: none; }
.article-detail__rank { inline-size: 24px; block-size: 24px; flex-shrink: 0; margin-block-start: 2px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; font-weight: 700; }
.article-detail__rank.is-first { background: var(--color-tint); color: var(--color-primary); }
.article-detail__popular-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 13px; font-weight: 700; line-height: 1.7; color: var(--color-text); }
.article-detail__popular a:hover .article-detail__popular-title { color: var(--color-primary); }
.article-detail__popular-meta { display: block; margin-block-start: 4px; font-size: 11px; color: var(--color-text-muted); }

.article-detail__cta { position: relative; overflow: hidden; padding: var(--space-3); border-radius: var(--radius-lg); background: var(--color-ink); color: var(--color-white); }
.article-detail__cta::after { content: ''; position: absolute; inset-block-end: -40px; inset-inline-end: -40px; inline-size: 144px; block-size: 144px; border-radius: 50%; background: rgb(0 94 184 / 25%); filter: blur(32px); pointer-events: none; }
.article-detail__cta-eyebrow { display: inline-block; margin-block-end: 12px; padding: 4px 12px; border-radius: var(--radius-pill); border: 1px solid rgb(255 255 255 / 12%); background: rgb(255 255 255 / 10%); color: var(--color-tint); font-size: 11px; font-weight: 700; }
.article-detail__cta h3 { font: 700 16px/1.6 var(--font-body); margin-block-end: var(--space-1); }
.article-detail__cta p { font-size: 12px; line-height: 1.9; color: rgb(255 255 255 / 72%); margin-block-end: 20px; }
.article-detail__cta :deep(.base-button) { position: relative; z-index: 1; inline-size: 100%; justify-content: center; }

.article-detail__projects { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-block-start: 12px; }
.article-detail__project { position: relative; display: block; aspect-ratio: 1; border-radius: var(--radius-sm); overflow: hidden; background: var(--color-surface); }
.article-detail__project :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 300ms ease; }
.article-detail__project:hover :deep(img) { transform: scale(1.05); }
.article-detail__project span { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: var(--space-1); background: linear-gradient(to top, rgb(4 28 44 / 70%), transparent 60%); color: var(--color-white); font-size: 11px; font-weight: 700; }

/* related */
.article-detail__related { padding-block-start: var(--space-2); }
.article-detail__related-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: var(--space-3); border-block-end: 2px solid var(--color-ink); }
.article-detail__related-head h2 { font: 700 22px/1.4 var(--font-body); }
.article-detail__related-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .article-detail__related-grid { grid-template-columns: repeat(3, 1fr); } }

@media print {
  .article-detail__breadcrumb, .article-detail__sidebar, .article-detail__audio, .article-detail__share, .article-detail__pager, .article-detail__comments, .article-detail__related, .article-detail__pdf { display: none; }
  .article-detail__layout { display: block; }
  .article-detail__main { border: none; padding: 0; }
}
</style>
