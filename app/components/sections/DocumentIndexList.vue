<script setup lang="ts">
import { documentCategories, irContacts, type DocumentCategoryKey, type DocumentHubContent, type DocumentRecord } from '~/utils/documentsData'
import { formatJalaliLong, irFaDigits } from '~/utils/irDateUtils'

// Template `02b-index-simple-list`, rebuilt to follow
// `project_detail_page_template/02b_index_simple_list/code.html` section by
// section: breadcrumb + badge row + title, two featured report cards, the
// AGM / capital-markets-day spotlight with three downloadable rows, a quick
// related-links strip, the filterable document repository (search + type +
// fiscal year + reset, result count, list rows with PDF icon / tags / CODAL
// tracking number / date / size / «مشاهده در کدال» / «دریافت PDF», load
// more) and the IR contacts block. Site header/footer/newsletter come from
// the shared layout. Corners follow the balanced scale in
// docs/design-system-icd3d.md §4.1, not the mockup's rounded-2xl classes.

const props = defineProps<{ hub: DocumentHubContent }>()

const PAGE_SIZE = 6

const searchQuery = ref('')
const categoryFilter = ref<DocumentCategoryKey | 'all'>('all')
const yearFilter = ref('all')
const visibleCount = ref(PAGE_SIZE)

const dateKey = (d: DocumentRecord) => d.published.y * 10000 + d.published.m * 100 + d.published.d

const sortedDocuments = computed(() => [...props.hub.documents].sort((a, b) => dateKey(b) - dateKey(a)))

const yearOptions = computed(() =>
  Array.from(new Set(props.hub.documents.map(d => d.year))).sort((a, b) => b.localeCompare(a, 'fa')),
)

function normalize(value: string) {
  return irFaDigits(value).replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/‌/g, ' ').trim()
}

const filteredDocuments = computed(() => {
  const q = normalize(searchQuery.value)
  return sortedDocuments.value
    .filter(d => categoryFilter.value === 'all' || d.category === categoryFilter.value)
    .filter(d => yearFilter.value === 'all' || d.year === yearFilter.value)
    .filter(d => !q || normalize(`${d.title} ${d.summary} ${d.codalTrackingNo ?? ''}`).includes(q))
})

const visibleDocuments = computed(() => filteredDocuments.value.slice(0, visibleCount.value))
const remainingCount = computed(() => Math.max(filteredDocuments.value.length - visibleCount.value, 0))
const hasActiveFilters = computed(() => !!searchQuery.value || categoryFilter.value !== 'all' || yearFilter.value !== 'all')

watch([searchQuery, categoryFilter, yearFilter], () => { visibleCount.value = PAGE_SIZE })

function resetFilters() {
  searchQuery.value = ''
  categoryFilter.value = 'all'
  yearFilter.value = 'all'
}

function countByCategory(key: DocumentCategoryKey) {
  return props.hub.documents.filter(d => d.category === key).length
}

function scrollToArchive() {
  document.getElementById('document-archive')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openCategory(key: DocumentCategoryKey) {
  searchQuery.value = ''
  yearFilter.value = 'all'
  categoryFilter.value = key
  scrollToArchive()
}

function tagLabel(d: DocumentRecord) {
  return d.tagLabel ?? documentCategories[d.category].label
}

const spotlightIcons: Record<'video' | 'pdf' | 'doc', string> = {
  video: 'M15 10l4.6-2.3A1 1 0 0 1 21 8.6v6.8a1 1 0 0 1-1.4.9L15 14M5 18h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2Z',
  pdf: 'M7 21h10a2 2 0 0 0 2-2V9.4a1 1 0 0 0-.3-.7l-5.4-5.4a1 1 0 0 0-.7-.3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2ZM12 11v6m0 0-3-3m3 3 3-3',
  doc: 'M9 12h6m-6 4h6M7 21h10a2 2 0 0 0 2-2V9.4a1 1 0 0 0-.3-.7l-5.4-5.4a1 1 0 0 0-.7-.3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z',
}
</script>

<template>
  <div class="document-index">
    <nav class="document-index__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/ir">دیده‌بان ثاخت</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="document-index__breadcrumb-current">{{ hub.breadcrumbLabel }}</span>
    </nav>

    <header class="document-index__hero">
      <div class="document-index__badges">
        <span v-for="(badge, i) in hub.badges" :key="badge" class="document-index__badge" :class="{ 'document-index__badge--live': i === 0 }">
          <span v-if="i === 0" class="document-index__badge-dot" aria-hidden="true" />
          {{ badge }}
        </span>
      </div>
      <h1>{{ hub.title }}</h1>
      <p>{{ hub.intro }}</p>
    </header>

    <section class="document-index__featured" aria-labelledby="document-featured-heading">
      <div class="document-index__section-head">
        <div>
          <h2 id="document-featured-heading">{{ hub.featuredHeading }}</h2>
          <p>{{ hub.featuredSubheading }}</p>
        </div>
        <button type="button" class="document-index__text-link" @click="scrollToArchive">
          مشاهده بایگانی کلی اسناد
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 5-7 7 7 7" /></svg>
        </button>
      </div>
      <div class="document-index__featured-grid">
        <article v-for="card in hub.featured" :key="card.title" class="document-index__feature-card">
          <button type="button" class="document-index__feature-hit" :aria-label="`${card.title} — ${card.ctaLabel}`" @click="openCategory(card.category)" />
          <div class="document-index__feature-media">
            <BaseImage :src="card.image" :alt="card.title" />
            <span class="document-index__feature-badge">{{ card.badge }}</span>
          </div>
          <div class="document-index__feature-body">
            <div class="document-index__feature-title-row">
              <h3>{{ card.title }}</h3>
              <span class="document-index__round-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
              </span>
            </div>
            <p>{{ card.description }}</p>
            <div class="document-index__feature-footer">
              <span>تعداد اسناد در دسترس: {{ irFaDigits(countByCategory(card.category)) }} سند · {{ card.meta }}</span>
              <strong>{{ card.ctaLabel }} ←</strong>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="document-index__spotlight" aria-labelledby="document-spotlight-heading">
      <div class="document-index__spotlight-content">
        <span class="document-index__eyebrow"><span class="document-index__eyebrow-dot" aria-hidden="true" />{{ hub.spotlight.eyebrow }}</span>
        <h2 id="document-spotlight-heading">{{ hub.spotlight.title }}</h2>
        <p>{{ hub.spotlight.description }}</p>
        <div class="document-index__spotlight-rows">
          <NuxtLink v-for="row in hub.spotlight.rows" :key="row.title" :to="row.href" class="document-index__spotlight-row">
            <span class="document-index__file-icon" :class="`document-index__file-icon--${row.icon}`" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="spotlightIcons[row.icon]" /></svg>
            </span>
            <span class="document-index__spotlight-text">
              <strong>{{ row.title }}</strong>
              <span>{{ row.meta }}</span>
            </span>
            <span class="document-index__round-icon document-index__round-icon--sm" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
            </span>
          </NuxtLink>
        </div>
      </div>
      <div class="document-index__spotlight-media">
        <BaseImage :src="hub.spotlight.image" :alt="hub.spotlight.title" />
      </div>
    </section>

    <section class="document-index__quick-links" aria-labelledby="document-quick-heading">
      <div>
        <h3 id="document-quick-heading">پیوندهای مرتبط و سریع</h3>
        <p>دسترسی به بخش‌های تخصصی امور سهامداری</p>
      </div>
      <ul>
        <li v-for="link in hub.quickLinks" :key="link.label">
          <NuxtLink :to="link.href">
            <span>{{ link.label }}</span>
            <span class="document-index__quick-arrow" aria-hidden="true">←</span>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <section id="document-archive" class="document-index__archive" aria-labelledby="document-archive-heading">
      <div class="document-index__archive-head">
        <div>
          <span class="document-index__pill">{{ hub.archiveEyebrow }}</span>
          <h2 id="document-archive-heading">{{ hub.archiveTitle }}</h2>
          <p>{{ hub.archiveSubtitle }}</p>
        </div>
        <div class="document-index__count" aria-live="polite">
          نمایش <strong>{{ irFaDigits(visibleDocuments.length) }}</strong> سند از مجموع
          <strong>{{ irFaDigits(filteredDocuments.length) }}</strong> سند
          <template v-if="hasActiveFilters">(از {{ irFaDigits(hub.documents.length) }} سند منتشرشده)</template>
          <template v-else>منتشرشده در کدال</template>
        </div>
      </div>

      <div class="document-index__filters" role="search">
        <label class="document-index__field document-index__field--search">
          <span class="visually-hidden">جستجوی عنوان سند یا شماره پیگیری</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input v-model="searchQuery" type="search" placeholder="جستجوی عنوان سند یا شماره پیگیری...">
        </label>
        <label class="document-index__field">
          <span class="visually-hidden">نوع سند</span>
          <select v-model="categoryFilter">
            <option value="all">همه انواع اسناد و گزارش‌ها</option>
            <option v-for="key in hub.categories" :key="key" :value="key">
              {{ documentCategories[key].filterLabel }} ({{ irFaDigits(countByCategory(key)) }})
            </option>
          </select>
        </label>
        <label class="document-index__field document-index__field--year">
          <span class="visually-hidden">سال مالی</span>
          <select v-model="yearFilter">
            <option value="all">همه سال‌ها</option>
            <option v-for="year in yearOptions" :key="year" :value="year">سال مالی {{ year }}</option>
          </select>
        </label>
        <button type="button" class="document-index__reset" :disabled="!hasActiveFilters" @click="resetFilters">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4v5h5M20 20v-5h-5M5.5 15a7 7 0 0 0 12.3 2.5M18.5 9A7 7 0 0 0 6.2 6.5" /></svg>
          بازنشانی فیلتر
        </button>
      </div>

      <div v-if="visibleDocuments.length" class="document-index__list">
        <article v-for="d in visibleDocuments" :key="d.id" class="document-index__row">
          <div class="document-index__row-main">
            <span class="document-index__file-icon document-index__file-icon--pdf" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21h10a2 2 0 0 0 2-2V9.4a1 1 0 0 0-.3-.7l-5.4-5.4a1 1 0 0 0-.7-.3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /><path d="M13 3v5a1 1 0 0 0 1 1h5" /></svg>
              <span class="document-index__file-type">{{ d.fileType }}</span>
            </span>
            <div>
              <div class="document-index__row-tags">
                <span class="document-index__tag" :class="`document-index__tag--${documentCategories[d.category].tone}`">{{ tagLabel(d) }}</span>
                <span v-if="d.codalTrackingNo" class="document-index__tag document-index__tag--outline">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
                  تاییدیه کدال: {{ d.codalTrackingNo }}
                </span>
                <span class="document-index__row-date">تاریخ انتشار: {{ formatJalaliLong(d.published) }}</span>
              </div>
              <h3 class="document-index__row-title">{{ d.title }}</h3>
              <p class="document-index__row-summary">{{ d.summary }}</p>
            </div>
          </div>
          <div class="document-index__row-actions">
            <span class="document-index__row-size">{{ d.fileType }} • {{ d.fileSizeLabel }}</span>
            <a
              v-if="d.codalUrl"
              :href="d.codalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="document-index__btn document-index__btn--outline"
              title="مشاهده اطلاعیه در سامانه رسمی کدال"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
              مشاهده در کدال
            </a>
            <a :href="d.href" class="document-index__btn document-index__btn--primary" :title="`دریافت فایل ${d.fileType}`">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
              دریافت {{ d.fileType }}
            </a>
          </div>
        </article>
      </div>
      <div v-else class="document-index__empty">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 21h10a2 2 0 0 0 2-2V9.4a1 1 0 0 0-.3-.7l-5.4-5.4a1 1 0 0 0-.7-.3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /><path d="M9.5 13.5l5 5m0-5-5 5" /></svg>
        <strong>سندی مطابق فیلترهای انتخابی یافت نشد.</strong>
        <p>عبارت جستجو را کوتاه‌تر کنید یا فیلتر سال مالی و نوع سند را تغییر دهید.</p>
        <button type="button" class="document-index__btn document-index__btn--outline" @click="resetFilters">بازنشانی فیلترها</button>
      </div>

      <div v-if="remainingCount > 0" class="document-index__more">
        <button type="button" class="document-index__more-btn" @click="visibleCount += PAGE_SIZE">
          بارگذاری اسناد و دوره‌های مالی پیشین ({{ irFaDigits(remainingCount) }} سند دیگر)
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
        </button>
      </div>
    </section>

    <section class="document-index__contacts" aria-labelledby="document-contacts-heading">
      <div class="document-index__contacts-intro">
        <span class="document-index__pill">{{ hub.contactsEyebrow }}</span>
        <h2 id="document-contacts-heading">{{ hub.contactsTitle }}</h2>
        <p>{{ hub.contactsIntro }}</p>
        <div class="document-index__contact-desk">
          <strong>میز ارتباط سریع امور سهام</strong>
          <p>برای طرح هرگونه پرسش مستقیم با کارشناسان تماس بگیرید یا پیام خود را ثبت فرمایید.</p>
          <BaseButton href="/contact">ارتباط با کارشناسان سهامداری</BaseButton>
        </div>
      </div>
      <div class="document-index__contact-grid">
        <div v-for="c in irContacts" :key="c.email" class="document-index__contact-card">
          <div class="document-index__contact-avatar">
            <BaseImage :src="c.image" :alt="c.name" />
          </div>
          <h3>{{ c.name }}</h3>
          <span class="document-index__contact-role">{{ c.role }}</span>
          <div class="document-index__contact-meta">
            <a :href="`mailto:${c.email}`" dir="ltr">{{ c.email }}</a>
            <span>{{ c.phone }}</span>
            <small>{{ c.note }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.document-index { padding-block-end: var(--space-8); }

.document-index__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.document-index__breadcrumb a { color: inherit; text-decoration: none; }
.document-index__breadcrumb a:hover { color: var(--color-primary); }
.document-index__breadcrumb-current { color: var(--color-text); font-weight: 600; }

/* hero */
.document-index__hero { padding-block: var(--space-2) var(--space-6); border-block-end: 1px solid var(--color-border); max-inline-size: 900px; }
.document-index__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-block-end: var(--space-2); }
.document-index__badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text); font-size: 12px; font-weight: 600; }
.document-index__badge--live { background: var(--color-tint); color: var(--color-primary); font-weight: 700; }
.document-index__badge-dot { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--color-primary); animation: document-index-pulse 2s ease-in-out infinite; }
@keyframes document-index-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .document-index__badge-dot { animation: none; } }
.document-index__hero h1 { font: var(--text-h2); font-weight: 800; margin-block-end: var(--space-2); }
@media (min-width: 1024px) { .document-index__hero h1 { font-size: 46px; } }
.document-index__hero p { font: var(--text-body); color: var(--color-text-muted); margin: 0; }

/* shared heads */
.document-index__section-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-3); }
.document-index__section-head h2, .document-index__archive-head h2, .document-index__contacts h2, .document-index__spotlight h2 { font: var(--text-h3); font-size: 24px; font-weight: 800; margin: 0; }
.document-index__section-head p, .document-index__archive-head p { font: var(--text-body-sm); color: var(--color-text-muted); margin: 4px 0 0; }
.document-index__text-link { display: inline-flex; align-items: center; gap: 4px; border: none; background: none; padding: 0; font: var(--text-label); font-size: 13px; color: var(--color-primary); cursor: pointer; font-family: inherit; }
.document-index__text-link:hover { color: var(--color-primary-hover); text-decoration: underline; }
.document-index__pill { display: inline-flex; padding: 4px 12px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-primary); font-size: 12px; font-weight: 700; margin-block-end: var(--space-1); }

/* featured */
.document-index__featured { margin-block: var(--space-4); padding: var(--space-4) var(--space-3); background: var(--color-surface); border-radius: var(--radius-lg); }
.document-index__featured-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .document-index__featured-grid { grid-template-columns: 1fr 1fr; } }
.document-index__feature-card { position: relative; display: flex; flex-direction: column; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; }
.document-index__feature-card:hover { border-color: var(--color-primary); box-shadow: 0 8px 24px rgb(4 28 44 / 8%); }
.document-index__feature-hit { position: absolute; inset: 0; z-index: 2; border: none; background: transparent; cursor: pointer; border-radius: inherit; }
.document-index__feature-hit:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.document-index__feature-media { position: relative; block-size: 240px; overflow: hidden; background: var(--color-surface-alt); }
.document-index__feature-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 0.6s var(--motion-ease); }
.document-index__feature-card:hover .document-index__feature-media :deep(img) { transform: scale(1.04); }
.document-index__feature-badge { position: absolute; inset-block-start: var(--space-2); inset-inline-start: var(--space-2); padding: 4px 12px; border-radius: var(--radius-pill); background: rgb(255 255 255 / 92%); color: var(--color-primary); font-size: 12px; font-weight: 700; }
.document-index__feature-body { flex: 1; display: flex; flex-direction: column; padding: var(--space-3); }
.document-index__feature-title-row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-end: var(--space-1); }
.document-index__feature-title-row h3 { font: var(--text-h3); font-size: 20px; font-weight: 800; margin: 0; }
.document-index__feature-card:hover h3 { color: var(--color-primary); }
.document-index__feature-body > p { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0; flex: 1; }
.document-index__feature-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-start: var(--space-3); padding-block-start: var(--space-2); border-block-start: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-muted); }
.document-index__feature-footer strong { color: var(--color-primary); }
.document-index__round-icon { flex-shrink: 0; inline-size: 32px; block-size: 32px; border-radius: 50%; background: var(--color-tint); color: var(--color-primary); display: flex; align-items: center; justify-content: center; }
.document-index__round-icon--sm { inline-size: 28px; block-size: 28px; }

/* spotlight */
.document-index__spotlight { display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: center; padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-block-end: var(--space-4); }
@media (min-width: 1024px) { .document-index__spotlight { grid-template-columns: 7fr 5fr; padding: var(--space-6) var(--space-4); } }
.document-index__eyebrow { display: inline-flex; align-items: center; gap: var(--space-1); font-size: 12px; font-weight: 700; color: var(--color-text-muted); margin-block-end: var(--space-1); }
.document-index__eyebrow-dot { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--color-primary); }
.document-index__spotlight h2 { font-size: 28px; line-height: 1.35; margin-block-end: var(--space-1); }
.document-index__spotlight-content > p { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0 0 var(--space-3); }
.document-index__spotlight-rows { display: flex; flex-direction: column; gap: 12px; }
.document-index__spotlight-row { display: flex; align-items: center; gap: 12px; padding: 14px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); text-decoration: none; color: var(--color-text); transition: border-color 0.2s; }
.document-index__spotlight-row:hover { border-color: var(--color-primary); }
.document-index__spotlight-row:hover strong { color: var(--color-primary); }
.document-index__spotlight-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.document-index__spotlight-text strong { font-size: 14px; }
.document-index__spotlight-text span { font-size: 12px; color: var(--color-text-muted); }
.document-index__spotlight-media { border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 16 / 9; background: var(--color-surface-alt); }
@media (min-width: 1024px) { .document-index__spotlight-media { aspect-ratio: 4 / 3; } }
.document-index__spotlight-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }

.document-index__file-icon { position: relative; flex-shrink: 0; inline-size: 44px; block-size: 44px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; background: var(--color-tint); color: var(--color-primary); }
.document-index__file-icon--video { background: var(--color-surface-alt); color: var(--color-ink); }
.document-index__file-icon--doc { background: var(--color-surface-alt); color: var(--color-brand-blue-deep); }
.document-index__file-type { position: absolute; inset-block-end: -6px; padding: 1px 5px; border-radius: var(--radius-xs); background: var(--color-primary); color: var(--color-white); font-size: 9px; font-weight: 800; letter-spacing: 0.5px; }

/* quick links */
.document-index__quick-links { display: grid; grid-template-columns: 1fr; gap: var(--space-3); padding-block: var(--space-4); border-block: 1px solid var(--color-border); }
@media (min-width: 768px) { .document-index__quick-links { grid-template-columns: 3fr 9fr; } }
.document-index__quick-links h3 { font: var(--text-h3); font-size: 20px; font-weight: 800; margin: 0; }
.document-index__quick-links > div p { font-size: 12px; color: var(--color-text-muted); margin: 4px 0 0; }
.document-index__quick-links ul { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: 12px var(--space-4); }
@media (min-width: 640px) { .document-index__quick-links ul { grid-template-columns: 1fr 1fr; } }
.document-index__quick-links a { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); font-size: 14px; font-weight: 700; color: var(--color-text); text-decoration: none; padding-block: 4px; }
.document-index__quick-links a:hover { color: var(--color-primary); }
.document-index__quick-arrow { color: var(--color-primary); transition: transform 0.2s; }
.document-index__quick-links a:hover .document-index__quick-arrow { transform: translateX(-4px); }

/* archive */
.document-index__archive { padding-block: var(--space-6) var(--space-4); scroll-margin-top: var(--space-4); }
.document-index__archive-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-3); }
.document-index__archive-head h2 { font-size: 28px; }
.document-index__count { font-size: 12px; font-weight: 600; color: var(--color-text-muted); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: 8px 14px; }
.document-index__count strong { color: var(--color-text); }

.document-index__filters { display: grid; grid-template-columns: 1fr; gap: 12px; align-items: center; padding: var(--space-2); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); margin-block-end: var(--space-3); }
@media (min-width: 768px) { .document-index__filters { grid-template-columns: 4fr 4fr 2fr 2fr; } }
.document-index__field { position: relative; display: flex; align-items: center; }
.document-index__field svg { position: absolute; inset-inline-start: 12px; color: var(--color-text-muted); pointer-events: none; }
.document-index__field input, .document-index__field select { inline-size: 100%; block-size: 42px; padding-inline: 12px; border: 1px solid var(--color-border); border-radius: var(--radius-xs); background: var(--color-white); color: var(--color-text); font: inherit; font-size: 13px; font-weight: 500; }
.document-index__field--search input { padding-inline-start: 36px; }
.document-index__field input:focus, .document-index__field select:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-tint); }
.document-index__reset { display: inline-flex; align-items: center; justify-content: center; gap: 6px; block-size: 42px; padding-inline: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text); font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
.document-index__reset:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
.document-index__reset:disabled { opacity: 0.5; cursor: default; }

.document-index__list { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: var(--color-white); }
.document-index__row { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-3); transition: background 0.2s; }
@media (min-width: 900px) { .document-index__row { flex-direction: row; align-items: center; justify-content: space-between; } }
.document-index__row + .document-index__row { border-block-start: 1px solid var(--color-border); }
.document-index__row:hover { background: var(--color-surface); }
.document-index__row-main { display: flex; align-items: flex-start; gap: var(--space-2); }
.document-index__row-tags { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-end: 6px; }
.document-index__tag { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: var(--radius-xs); font-size: 11px; font-weight: 700; }
.document-index__tag--tint { background: var(--color-tint); color: var(--color-primary); }
.document-index__tag--blue { background: var(--color-brand-blue); color: var(--color-white); }
.document-index__tag--ink { background: var(--color-ink); color: var(--color-white); }
.document-index__tag--neutral { background: var(--color-surface-alt); color: var(--color-ink); }
.document-index__tag--outline { border: 1px solid var(--color-border); color: var(--color-text-muted); }
.document-index__tag--outline svg { color: var(--color-primary); }
.document-index__row-date { font-size: 12px; color: var(--color-text-muted); }
.document-index__row-title { font: var(--text-h3); font-size: 16px; margin: 0; }
.document-index__row-summary { font-size: 12px; line-height: 1.7; color: var(--color-text-muted); margin: 4px 0 0; }
.document-index__row-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); flex-shrink: 0; align-self: flex-end; }
@media (min-width: 900px) { .document-index__row-actions { align-self: center; } }
.document-index__row-size { font-size: 12px; font-weight: 600; color: var(--color-text-muted); margin-inline-end: var(--space-1); white-space: nowrap; }
.document-index__btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius-pill); font: inherit; font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.document-index__btn--outline { border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-text); }
.document-index__btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.document-index__btn--primary { border: 1px solid var(--color-primary); background: var(--color-primary); color: var(--color-white); }
.document-index__btn--primary:hover { background: var(--color-primary-hover); border-color: var(--color-primary-hover); }

.document-index__empty { display: flex; flex-direction: column; align-items: center; gap: var(--space-1); text-align: center; padding: var(--space-6) var(--space-3); border: 1px dashed var(--color-border); border-radius: var(--radius-md); color: var(--color-text-muted); }
.document-index__empty strong { color: var(--color-text); font-size: 15px; }
.document-index__empty p { font-size: 13px; margin: 0 0 var(--space-1); }

.document-index__more { display: flex; justify-content: center; margin-block-start: var(--space-4); }
.document-index__more-btn { display: inline-flex; align-items: center; gap: var(--space-1); padding: 12px 24px; border: 1px solid var(--color-primary); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.document-index__more-btn:hover { background: var(--color-tint); }

/* contacts */
.document-index__contacts { display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: start; padding: var(--space-6) var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-block-start: var(--space-4); }
@media (min-width: 1024px) { .document-index__contacts { grid-template-columns: 4fr 8fr; } }
.document-index__contacts h2 { font-size: 26px; margin-block-end: var(--space-1); }
.document-index__contacts-intro > p { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0 0 var(--space-3); }
.document-index__contact-desk { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: var(--space-2); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.document-index__contact-desk strong { font-size: 13px; }
.document-index__contact-desk p { font-size: 12px; color: var(--color-text-muted); margin: 0 0 var(--space-1); }
.document-index__contact-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 640px) { .document-index__contact-grid { grid-template-columns: 1fr 1fr; } }
.document-index__contact-card { display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.document-index__contact-avatar { inline-size: 112px; block-size: 112px; border-radius: 50%; overflow: hidden; border: 3px solid var(--color-tint); background: var(--color-surface-alt); margin-block-end: var(--space-2); }
.document-index__contact-avatar :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.document-index__contact-card h3 { font: var(--text-h3); font-weight: 800; margin: 0 0 4px; }
.document-index__contact-role { font-size: 12px; font-weight: 700; color: var(--color-primary); margin-block-end: var(--space-2); }
.document-index__contact-meta { inline-size: 100%; display: flex; flex-direction: column; gap: 6px; padding-block-start: 12px; border-block-start: 1px solid var(--color-border); font-size: 12px; color: var(--color-text); }
.document-index__contact-meta a { color: var(--color-text); text-decoration: none; font-family: var(--font-en); }
.document-index__contact-meta a:hover { color: var(--color-primary); }
.document-index__contact-meta small { font-size: 11px; color: var(--color-text-muted); }

.visually-hidden { position: absolute; inline-size: 1px; block-size: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
</style>
