<script setup lang="ts">
import type { NuxtError } from '#app'

// Nuxt's global error page — covers both 404 and 500 (docs/page-templates
// -icd3d.md #18 "11-error-system"), rebuilt to match
// `project_detail_page_template/11_error_404/code.html`: big brand-blue
// status numeral, title + explanation, capsule search bar, two primary
// actions and a row of «popular sections» pills over a soft radial glow.
// Header/footer come from the default layout via <NuxtLayout>. The 500
// branch must render with zero WebGL/3D per docs/01-sitemap.md §9 and
// §12 row 52 — this page is plain HTML/CSS only.
const props = defineProps<{ error: NuxtError }>()

const route = useRoute()
const is404 = computed(() => props.error.statusCode === 404)
const searchQuery = ref('')

useSeoMeta({
  title: () => is404.value ? 'صفحه مورد نظر یافت نشد (۴۰۴) — ثاخت' : 'خطای سرور — ثاخت',
  robots: 'noindex',
})

const quickLinks = [
  { label: 'پروژه‌ها', href: '/projects', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m4-4h1m-1 4h1m-6 8v-4h4v4' },
  { label: 'پیش‌فروش واحدها', href: '/sales/pre-sale', icon: 'M15 7a4 4 0 1 1-3.87 5H3v3h3v-3m6.13 0A4 4 0 0 1 15 7Zm0 0' },
  { label: 'سهام ثاخت', href: '/ir', icon: 'M3 17l6-6 4 4 8-8m0 0h-6m6 0v6' },
  { label: 'تماس با ما', href: '/contact', icon: 'M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Zm-3 2v1a3 3 0 0 1-3 3h-2' },
]

function go(href: string) {
  clearError({ redirect: href })
}

function submitSearch() {
  const q = searchQuery.value.trim()
  go(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
}

function retry() {
  clearError({ redirect: route.fullPath })
}
</script>

<template>
  <NuxtLayout>
    <section class="error-page">
      <div class="error-page__inner">
        <p class="error-page__code" aria-hidden="true">{{ error.statusCode }}</p>
        <h1 class="error-page__title">
          {{ is404 ? 'صفحه مورد نظر یافت نشد' : 'خطایی در سرور رخ داد' }}
        </h1>
        <p class="error-page__desc">
          {{ is404
            ? 'متاسفانه صفحه‌ای که به دنبال آن هستید حذف شده یا آدرس آن تغییر کرده است.'
            : 'در پردازش درخواست شما مشکلی پیش آمد. لطفاً چند لحظه دیگر دوباره تلاش کنید؛ در صورت تکرار، با پشتیبانی تماس بگیرید.' }}
        </p>

        <form class="error-page__search" role="search" @submit.prevent="submitSearch">
          <label for="error-search" class="visually-hidden">جستجو در سایت</label>
          <input
            id="error-search"
            v-model="searchQuery"
            type="search"
            name="q"
            placeholder="جستجو در نام پروژه‌ها، اسناد یا محتوا..."
            autocomplete="off"
          >
          <button type="submit" class="error-page__search-btn" aria-label="جستجو">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" stroke-linecap="round" /></svg>
          </button>
        </form>

        <div class="error-page__actions">
          <button type="button" class="error-page__btn error-page__btn--primary" @click="go('/')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5M5 10v10h5v-6h4v6h5V10" stroke-linecap="round" stroke-linejoin="round" /></svg>
            بازگشت به صفحه اصلی
          </button>
          <button v-if="is404" type="button" class="error-page__btn error-page__btn--ghost" @click="go('/projects')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m4-4h1m-1 4h1m-6 8v-4h4v4" stroke-linecap="round" stroke-linejoin="round" /></svg>
            مشاهده پروژه‌ها
          </button>
          <button v-else type="button" class="error-page__btn error-page__btn--ghost" @click="retry">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4v6h6M20 20v-6h-6M5.5 15A7.5 7.5 0 0 0 19 17M18.5 9A7.5 7.5 0 0 0 5 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            تلاش مجدد
          </button>
        </div>

        <nav class="error-page__quick" aria-label="بخش‌های پرکاربرد">
          <p>بخش‌های پرکاربرد برای راهنمایی شما:</p>
          <div class="error-page__pills">
            <a
              v-for="link in quickLinks"
              :key="link.href"
              :href="link.href"
              class="error-page__pill"
              @click.prevent="go(link.href)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path :d="link.icon" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {{ link.label }}
            </a>
          </div>
        </nav>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 70vh;
  padding: var(--space-8) var(--space-3);
  background:
    radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--color-brand-blue) 6%, transparent) 0%, transparent 70%),
    var(--color-surface);
}
@media (min-width: 768px) { .error-page { padding-block: var(--space-12); } }
.error-page__inner { inline-size: 100%; max-inline-size: 768px; text-align: center; }

.error-page__code {
  font: var(--text-h1);
  font-family: var(--font-en);
  font-size: 96px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-brand-blue);
  margin-block-end: var(--space-2);
  user-select: none;
  direction: ltr;
}
@media (min-width: 768px) { .error-page__code { font-size: 140px; } }
.error-page__title { font: var(--text-h2); font-size: 30px; font-weight: 800; color: var(--color-ink); margin-block-end: 12px; }
.error-page__desc { font: var(--text-body); font-size: 16px; color: var(--color-text-muted); max-inline-size: 520px; margin: 0 auto var(--space-4); }

.error-page__search { position: relative; display: flex; align-items: center; max-inline-size: 448px; margin: 0 auto var(--space-4); }
.error-page__search input {
  inline-size: 100%;
  block-size: 48px;
  padding-inline: 20px 56px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  font: var(--text-body-sm);
  color: var(--color-ink);
  box-shadow: 0 1px 2px rgb(4 28 44 / 5%);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.error-page__search input::-webkit-search-cancel-button { display: none; }
.error-page__search input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent); }
.error-page__search-btn { position: absolute; inset-inline-end: 6px; inline-size: 36px; block-size: 36px; display: flex; align-items: center; justify-content: center; border: none; border-radius: var(--radius-pill); background: var(--color-primary); color: var(--color-white); cursor: pointer; transition: background-color 0.2s ease; }
.error-page__search-btn:hover { background: var(--color-primary-hover); }

.error-page__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-block-end: var(--space-6); }
.error-page__btn { display: inline-flex; align-items: center; gap: var(--space-1); block-size: 48px; padding-inline: var(--space-3); border-radius: var(--radius-pill); font: var(--text-label); font-size: 15px; cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
.error-page__btn--primary { border: 1px solid var(--color-primary); background: var(--color-primary); color: var(--color-white); }
.error-page__btn--primary:hover { background: var(--color-primary-hover); }
.error-page__btn--ghost { border: 1px solid var(--color-border); background: var(--color-white); color: var(--color-ink); }
.error-page__btn--ghost:hover { border-color: var(--color-primary); color: var(--color-primary); }

.error-page__quick { padding-block-start: var(--space-4); border-block-start: 1px solid var(--color-border); }
.error-page__quick p { font-size: 12px; font-weight: 500; color: var(--color-text-muted); margin-block-end: var(--space-2); }
.error-page__pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }
.error-page__pill { display: inline-flex; align-items: center; gap: var(--space-1); padding: 8px var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-ink); font-size: 13px; font-weight: 500; text-decoration: none; transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease; }
.error-page__pill svg { color: var(--color-primary); }
.error-page__pill:hover { border-color: var(--color-primary); color: var(--color-primary); background: color-mix(in srgb, var(--color-tint) 30%, var(--color-white)); }
</style>
