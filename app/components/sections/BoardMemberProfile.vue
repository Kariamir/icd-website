<script setup lang="ts">
import { boardMembers, type BoardMemberExtended } from '~/utils/boardData'
import { getArticlesByBoardMember, mediaHubHref, toFaDigits } from '~/utils/articlesData'

// /about/board/[slug] is listed as a use of the `04-article-detail`
// template (docs/page-templates-icd3d.md §8), so the profile reuses that
// mockup's editorial language: breadcrumb bar, 8/4 split, a white article
// panel (badges + stats row, headline, lead, «author box» turned into a
// portrait + key-facts card with share buttons, body with numbered
// subheads / pull quote / career timeline / checklist, tag row with
// print-to-PDF, previous/next member navigation) and a sidebar of widgets
// (other members, committees, governance documents, IR contact CTA). A
// row of the member's articles/podcast appearances closes the page.

const props = defineProps<{ member: BoardMemberExtended }>()

const requestUrl = useRequestURL()
const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard?.writeText(requestUrl.href)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
  catch {
    copied.value = false
  }
}
const linkedInHref = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(requestUrl.href)}`)
function printProfile() {
  window.print()
}

const index = computed(() => boardMembers.findIndex(m => m.slug === props.member.slug))
const previousMember = computed(() => boardMembers.length > 1 ? boardMembers[(index.value - 1 + boardMembers.length) % boardMembers.length] : undefined)
const nextMember = computed(() => boardMembers.length > 2 ? boardMembers[(index.value + 1) % boardMembers.length] : undefined)
const otherMembers = computed(() => boardMembers.filter(m => m.slug !== props.member.slug))
const memberArticles = computed(() => getArticlesByBoardMember(props.member.slug, 3))

const facts = computed(() => [
  { label: 'سمت', value: props.member.role },
  { label: 'نوع عضویت', value: props.member.memberType },
  { label: 'تحصیلات', value: props.member.education },
  { label: 'نماینده', value: props.member.representing },
].filter((f): f is { label: string; value: string } => Boolean(f.value)))

const governanceDocs = [
  { title: 'گزارش حاکمیت شرکتی و کنترل‌های داخلی ۱۴۰۲', href: '/ir/governance' },
  { title: 'منشور هیات‌مدیره و آیین‌نامه کمیته‌ها', href: '/ir/governance' },
  { title: 'گزارش فعالیت هیات‌مدیره — سال مالی ۱۴۰۲', href: '/ir/financials' },
]
</script>

<template>
  <div class="board-profile">
    <nav class="board-profile__breadcrumb" aria-label="مسیریاب">
      <div class="board-profile__crumbs">
        <NuxtLink to="/">صفحه اصلی</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/about">درباره ثاخت</NuxtLink>
        <span aria-hidden="true">/</span>
        <NuxtLink to="/about/board" class="board-profile__crumb-hub">مدیران و اعضای هیات‌مدیره</NuxtLink>
        <span aria-hidden="true">/</span>
        <span class="board-profile__breadcrumb-current">{{ member.name }}</span>
      </div>
      <span v-if="member.sinceYear" class="board-profile__since">عضو هیات‌مدیره از سال {{ member.sinceYear }}</span>
    </nav>

    <div class="board-profile__layout">
      <article class="board-profile__main">
        <div class="board-profile__meta-row">
          <div class="board-profile__badges">
            <span class="board-profile__badge board-profile__badge--role">{{ member.role }}</span>
            <span v-if="member.memberType" class="board-profile__badge">{{ member.memberType }}</span>
          </div>
          <div class="board-profile__stats">
            <span v-if="member.experienceYears">{{ toFaDigits(member.experienceYears) }} سال سابقه حرفه‌ای</span>
            <span v-if="member.experienceYears && member.committees?.length" class="board-profile__sep" aria-hidden="true">|</span>
            <span v-if="member.committees?.length">عضو {{ toFaDigits(member.committees.length) }} کمیته تخصصی</span>
          </div>
        </div>

        <h1 class="board-profile__title">{{ member.name }}</h1>
        <p v-if="member.summary" class="board-profile__lead">{{ member.summary }}</p>

        <div class="board-profile__card">
          <div v-if="member.image" class="board-profile__portrait">
            <BaseImage :src="member.image.src" :alt="member.image.alt || member.name" />
          </div>
          <div class="board-profile__card-body">
            <dl class="board-profile__facts">
              <div v-for="fact in facts" :key="fact.label" class="board-profile__fact">
                <dt>{{ fact.label }}</dt>
                <dd>{{ fact.value }}</dd>
              </div>
            </dl>
            <div class="board-profile__share">
              <span class="board-profile__share-label">اشتراک‌گذاری پروفایل:</span>
              <a :href="linkedInHref" target="_blank" rel="noopener noreferrer" class="board-profile__share-btn" title="لینکدین" aria-label="اشتراک در لینکدین">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-4Z"/></svg>
              </a>
              <button type="button" class="board-profile__share-btn" :class="{ 'is-done': copied }" :aria-label="copied ? 'لینک کپی شد' : 'کپی لینک پروفایل'" :title="copied ? 'لینک کپی شد' : 'کپی لینک پروفایل'" @click="copyLink">
                <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/></svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>
              </button>
              <span v-if="copied" class="board-profile__copied" role="status">کپی شد</span>
            </div>
          </div>
        </div>

        <div class="board-profile__body">
          <h2>۱. معرفی و مسئولیت‌ها</h2>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="board-profile__bio" v-html="member.bioHtml" />

          <figure v-if="member.quote" class="board-profile__pull-quote">
            <blockquote>{{ member.quote }}</blockquote>
            <figcaption>
              <span>— {{ member.name }}</span>
              <span class="board-profile__dot" aria-hidden="true">•</span>
              <span class="board-profile__pull-quote-role">{{ member.role }}</span>
            </figcaption>
          </figure>

          <template v-if="member.career?.length">
            <h2>۲. سوابق حرفه‌ای</h2>
            <ol class="board-profile__timeline">
              <li v-for="item in member.career" :key="item.period + item.title">
                <span class="board-profile__timeline-period">{{ item.period }}</span>
                <strong>{{ item.title }}</strong>
                <span class="board-profile__timeline-org">{{ item.organization }}</span>
              </li>
            </ol>
          </template>

          <template v-if="member.expertise?.length">
            <h3>۳. حوزه‌های تخصص</h3>
            <ul class="board-profile__checklist">
              <li v-for="item in member.expertise" :key="item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4Z"/></svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </div>

        <div class="board-profile__tags-row">
          <div v-if="member.committees?.length" class="board-profile__tags">
            <span class="board-profile__tags-label">کمیته‌ها:</span>
            <span v-for="c in member.committees" :key="c" class="board-profile__tag">{{ c }}</span>
          </div>
          <button type="button" class="board-profile__pdf" @click="printProfile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
            دریافت رزومه (PDF)
          </button>
        </div>

        <nav v-if="previousMember || nextMember" class="board-profile__pager" aria-label="اعضای قبلی و بعدی">
          <NuxtLink v-if="previousMember" :to="`/about/board/${previousMember.slug}`" class="board-profile__pager-link">
            <span class="board-profile__pager-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m0 0-6-6m6 6-6 6"/></svg>
            </span>
            <span>
              <span class="board-profile__pager-label">عضو قبلی</span>
              <span class="board-profile__pager-title">{{ previousMember.name }}</span>
            </span>
          </NuxtLink>
          <NuxtLink v-if="nextMember" :to="`/about/board/${nextMember.slug}`" class="board-profile__pager-link board-profile__pager-link--next">
            <span>
              <span class="board-profile__pager-label">عضو بعدی</span>
              <span class="board-profile__pager-title">{{ nextMember.name }}</span>
            </span>
            <span class="board-profile__pager-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>
            </span>
          </NuxtLink>
        </nav>
      </article>

      <aside class="board-profile__sidebar">
        <div class="board-profile__box">
          <h3 class="board-profile__box-head">
            <span>سایر اعضای هیات‌مدیره</span>
            <NuxtLink to="/about/board" class="board-profile__see-all">مشاهده همه</NuxtLink>
          </h3>
          <ul class="board-profile__members">
            <li v-for="m in otherMembers" :key="m.slug">
              <NuxtLink :to="`/about/board/${m.slug}`">
                <span class="board-profile__member-avatar">
                  <BaseImage v-if="m.image" :src="m.image.src" :alt="m.image.alt || m.name" />
                </span>
                <span>
                  <span class="board-profile__member-name">{{ m.name }}</span>
                  <span class="board-profile__member-role">{{ m.role }}</span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div v-if="member.committees?.length" class="board-profile__box">
          <h3 class="board-profile__box-head"><span>کمیته‌های تخصصی</span></h3>
          <ul class="board-profile__committees">
            <li v-for="c in member.committees" :key="c">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Z"/></svg>
              {{ c }}
            </li>
          </ul>
        </div>

        <div class="board-profile__box board-profile__box--alt">
          <h3 class="board-profile__box-plain">اسناد حاکمیت شرکتی (PDF)</h3>
          <ul class="board-profile__docs">
            <li v-for="doc in governanceDocs" :key="doc.title">
              <NuxtLink :to="doc.href">
                <span>{{ doc.title }}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="board-profile__cta">
          <span class="board-profile__cta-eyebrow">امور سهامداران</span>
          <h3>پرسشی از هیات‌مدیره یا امور سرمایه‌گذاران دارید؟</h3>
          <p>پرسش‌های سهامداران درباره عملکرد و تصمیمات هیات‌مدیره از طریق واحد روابط سرمایه‌گذاران پیگیری و پاسخ داده می‌شود.</p>
          <BaseButton href="/ir/governance">ارتباط با امور سرمایه‌گذاران</BaseButton>
        </div>
      </aside>
    </div>

    <section v-if="memberArticles.length" class="board-profile__related" aria-labelledby="board-related-title">
      <div class="board-profile__related-head">
        <h2 id="board-related-title">مطالب، گزارش‌ها و گفتگوها</h2>
        <NuxtLink to="/media" class="board-profile__see-all">رسانه ثاخت</NuxtLink>
      </div>
      <div class="board-profile__related-grid">
        <MediaArticleCard v-for="item in memberArticles" :key="item.slug" :article="item" :href="`${mediaHubHref[item.contentType]}/${item.slug}`" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.board-profile { padding-block-end: var(--space-8); }

.board-profile__breadcrumb { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding-block: var(--space-2); border-block-end: 1px solid var(--color-border); font-size: 13px; color: var(--color-text-muted); }
.board-profile__crumbs { display: flex; align-items: center; gap: var(--space-1); min-inline-size: 0; overflow-x: auto; white-space: nowrap; scrollbar-width: none; }
.board-profile__crumbs a { color: inherit; text-decoration: none; }
.board-profile__crumbs a:hover { color: var(--color-primary); }
.board-profile__crumbs .board-profile__crumb-hub { color: var(--color-primary); font-weight: 600; }
.board-profile__breadcrumb-current { color: var(--color-text); font-weight: 600; }
.board-profile__since { display: none; flex-shrink: 0; }
@media (min-width: 768px) { .board-profile__since { display: inline; } }

.board-profile__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-6); padding-block: var(--space-6); }
@media (min-width: 1024px) { .board-profile__layout { grid-template-columns: 2fr 1fr; align-items: start; } }

.board-profile__main { min-inline-size: 0; padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 640px) { .board-profile__main { padding: var(--space-6); } }

.board-profile__meta-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-block-end: 20px; }
.board-profile__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.board-profile__badge { padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; font-weight: 600; }
.board-profile__badge--role { background: var(--color-tint); color: var(--color-primary); font-weight: 700; }
.board-profile__stats { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--color-text-muted); }
.board-profile__sep { color: var(--color-border); }

.board-profile__title { font: 800 clamp(28px, 3.2vw, 38px)/1.4 var(--font-body); margin-block-end: var(--space-2); }
.board-profile__lead { font: 500 18px/1.9 var(--font-body); color: var(--color-text-muted); padding-block-end: var(--space-3); margin-block-end: var(--space-4); border-block-end: 1px solid var(--color-border); }

.board-profile__card { display: grid; grid-template-columns: 1fr; gap: var(--space-3); padding: var(--space-2); margin-block-end: var(--space-4); background: var(--color-surface); border-radius: var(--radius-md); }
@media (min-width: 640px) { .board-profile__card { grid-template-columns: 180px 1fr; align-items: start; } }
.board-profile__portrait { aspect-ratio: 1; inline-size: 100%; max-inline-size: 220px; border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface-alt); border: 1px solid var(--color-border); }
.board-profile__portrait :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.board-profile__card-body { display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-2); block-size: 100%; }
.board-profile__facts { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 768px) { .board-profile__facts { grid-template-columns: 1fr 1fr; } }
.board-profile__fact { display: flex; flex-direction: column; gap: 4px; padding-block-end: var(--space-1); border-block-end: 1px solid var(--color-border); }
.board-profile__fact dt { font-size: 12px; color: var(--color-text-muted); }
.board-profile__fact dd { font-size: 14px; font-weight: 700; line-height: 1.7; }
.board-profile__share { display: flex; align-items: center; gap: var(--space-1); }
.board-profile__share-label { font-size: 12px; color: var(--color-text-muted); }
.board-profile__share-btn { inline-size: 36px; block-size: 36px; display: inline-flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-text-muted); cursor: pointer; transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease; }
.board-profile__share-btn:hover { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); }
.board-profile__share-btn.is-done { background: var(--color-status-success); border-color: var(--color-status-success); color: var(--color-white); }
.board-profile__copied { font-size: 12px; font-weight: 600; color: var(--color-status-success); }

.board-profile__body { display: flex; flex-direction: column; gap: var(--space-3); font: 400 16px/2 var(--font-body); }
.board-profile__body h2 { font: 700 clamp(20px, 2.2vw, 24px)/1.5 var(--font-body); padding-block: var(--space-2) 4px; padding-inline-start: 12px; border-inline-start: 4px solid var(--color-brand-blue); }
.board-profile__body h3 { font: 700 20px/1.55 var(--font-body); padding-block-start: var(--space-1); }
.board-profile__bio :deep(p) { margin-block-end: var(--space-2); }
.board-profile__pull-quote { margin: var(--space-2) 0; padding: var(--space-3) var(--space-4); border-radius: var(--radius-md); border-inline-start: 4px solid var(--color-brand-blue); background: color-mix(in srgb, var(--color-tint) 35%, transparent); }
.board-profile__pull-quote blockquote { margin: 0; font: 700 clamp(17px, 1.8vw, 20px)/1.8 var(--font-body); }
.board-profile__pull-quote figcaption { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-start: 12px; font-size: 12px; font-weight: 700; color: var(--color-primary); }
.board-profile__dot { color: var(--color-border); }
.board-profile__pull-quote-role { font-weight: 400; color: var(--color-text-muted); }

.board-profile__timeline { display: flex; flex-direction: column; gap: 0; border-inline-start: 2px solid var(--color-tint); margin-inline-start: 6px; }
.board-profile__timeline li { position: relative; display: flex; flex-direction: column; gap: 2px; padding-block: 0 var(--space-3); padding-inline-start: var(--space-3); line-height: 1.7; }
.board-profile__timeline li:last-child { padding-block-end: 0; }
.board-profile__timeline li::before { content: ''; position: absolute; inset-inline-start: -8px; inset-block-start: 6px; inline-size: 14px; block-size: 14px; border-radius: 50%; background: var(--color-white); border: 3px solid var(--color-brand-blue); }
.board-profile__timeline-period { font-size: 12px; font-weight: 700; color: var(--color-primary); }
.board-profile__timeline strong { font-size: 15px; }
.board-profile__timeline-org { font-size: 13px; color: var(--color-text-muted); }

.board-profile__checklist { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media (min-width: 640px) { .board-profile__checklist { grid-template-columns: 1fr 1fr; } }
.board-profile__checklist li { display: flex; align-items: flex-start; gap: var(--space-1); font-size: 14px; line-height: 1.9; }
.board-profile__checklist svg { flex-shrink: 0; margin-block-start: 5px; color: var(--color-brand-blue); }

.board-profile__tags-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); margin-block-start: var(--space-6); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
.board-profile__tags { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); }
.board-profile__tags-label { font-size: 12px; font-weight: 700; color: var(--color-text-muted); }
.board-profile__tag { padding: 4px 12px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text-muted); font-size: 12px; }
.board-profile__pdf { display: inline-flex; align-items: center; gap: 6px; padding: 0; border: none; background: none; font: inherit; font-size: 12px; font-weight: 700; color: var(--color-text-muted); cursor: pointer; }
.board-profile__pdf svg { color: var(--color-status-error); }
.board-profile__pdf:hover { color: var(--color-primary); }

.board-profile__pager { display: grid; grid-template-columns: 1fr; gap: var(--space-2); margin-block-start: var(--space-4); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
@media (min-width: 640px) { .board-profile__pager { grid-template-columns: 1fr 1fr; } }
.board-profile__pager-link { display: flex; align-items: center; gap: 12px; padding: var(--space-2); border-radius: var(--radius-md); background: var(--color-surface); border: 1px solid transparent; color: inherit; text-decoration: none; transition: background-color 150ms ease, border-color 150ms ease; }
.board-profile__pager-link:hover { background: var(--color-surface-alt); border-color: var(--color-border); }
.board-profile__pager-link--next { justify-content: flex-end; text-align: end; }
.board-profile__pager-icon { inline-size: 32px; block-size: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--color-white); color: var(--color-text-muted); }
.board-profile__pager-link:hover .board-profile__pager-icon { color: var(--color-primary); }
.board-profile__pager-label { display: block; font-size: 11px; color: var(--color-text-muted); }
.board-profile__pager-title { display: block; font-size: 13px; font-weight: 700; }
.board-profile__pager-link:hover .board-profile__pager-title { color: var(--color-primary); }

.board-profile__sidebar { display: flex; flex-direction: column; gap: var(--space-4); min-inline-size: 0; }
.board-profile__box { padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.board-profile__box--alt { background: var(--color-surface-alt); }
.board-profile__box-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: var(--space-2); border-block-end: 1px solid var(--color-border); font-size: 14px; font-weight: 700; }
.board-profile__box-plain { font-size: 14px; font-weight: 700; margin-block-end: 12px; }
.board-profile__see-all { font-size: 12px; font-weight: 600; color: var(--color-primary); text-decoration: none; }
.board-profile__see-all:hover { text-decoration: underline; }

.board-profile__members { display: flex; flex-direction: column; gap: 12px; }
.board-profile__members a { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
.board-profile__member-avatar { inline-size: 44px; block-size: 44px; flex-shrink: 0; border-radius: 50%; overflow: hidden; background: var(--color-surface); }
.board-profile__member-avatar :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.board-profile__member-name { display: block; font-size: 13px; font-weight: 700; }
.board-profile__members a:hover .board-profile__member-name { color: var(--color-primary); }
.board-profile__member-role { display: block; font-size: 11px; color: var(--color-text-muted); margin-block-start: 2px; }

.board-profile__committees { display: flex; flex-direction: column; gap: var(--space-1); }
.board-profile__committees li { display: flex; align-items: center; gap: var(--space-1); padding: 10px 12px; border-radius: var(--radius-sm); background: var(--color-surface); font-size: 13px; font-weight: 600; }
.board-profile__committees svg { flex-shrink: 0; color: var(--color-primary); }

.board-profile__docs { display: flex; flex-direction: column; gap: var(--space-1); }
.board-profile__docs a { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); padding: 10px 12px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-xs); color: var(--color-text); text-decoration: none; font-size: 13px; font-weight: 600; transition: border-color 150ms ease; }
.board-profile__docs a:hover { border-color: var(--color-primary); }
.board-profile__docs svg { flex-shrink: 0; color: var(--color-primary); }

.board-profile__cta { position: relative; overflow: hidden; padding: var(--space-3); border-radius: var(--radius-lg); background: var(--color-ink); color: var(--color-white); }
.board-profile__cta::after { content: ''; position: absolute; inset-block-end: -40px; inset-inline-end: -40px; inline-size: 144px; block-size: 144px; border-radius: 50%; background: rgb(0 94 184 / 25%); filter: blur(32px); pointer-events: none; }
.board-profile__cta-eyebrow { display: inline-block; margin-block-end: 12px; padding: 4px 12px; border-radius: var(--radius-pill); border: 1px solid rgb(255 255 255 / 12%); background: rgb(255 255 255 / 10%); color: var(--color-tint); font-size: 11px; font-weight: 700; }
.board-profile__cta h3 { font: 700 16px/1.6 var(--font-body); margin-block-end: var(--space-1); }
.board-profile__cta p { font-size: 12px; line-height: 1.9; color: rgb(255 255 255 / 72%); margin-block-end: 20px; }
.board-profile__cta :deep(.base-button) { position: relative; z-index: 1; inline-size: 100%; justify-content: center; }

.board-profile__related-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-1); padding-block-end: 12px; margin-block-end: var(--space-3); border-block-end: 2px solid var(--color-ink); }
.board-profile__related-head h2 { font: 700 22px/1.4 var(--font-body); }
.board-profile__related-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .board-profile__related-grid { grid-template-columns: repeat(3, 1fr); } }

@media print {
  .board-profile__breadcrumb, .board-profile__sidebar, .board-profile__share, .board-profile__pager, .board-profile__related, .board-profile__pdf { display: none; }
  .board-profile__layout { display: block; }
  .board-profile__main { border: none; padding: 0; }
}
</style>
