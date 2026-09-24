<script setup lang="ts">
import { footerColumns, legalNav, companyContact, routes } from '~/utils/routes'

// Global footer — consolidated from the footers in the
// project_detail_page_template mockups (02a_index_card_grid is the fullest:
// brand block + newsletter card, then 01a/01b's 5-column link grid, then a
// legal/social bar). Links map onto real routes only (see utils/routes.ts).
// The newsletter has no backend yet: it validates client-side and shows a
// success message. Balanced corner scale per docs/design-system-icd3d.md §4.1.

const email = ref('')
const status = ref<'idle' | 'error' | 'success'>('idle')
const errorMessage = ref('')
const shareNote = ref('')
let shareTimer: ReturnType<typeof setTimeout> | undefined

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function subscribe() {
  const value = email.value.trim()
  if (!value) {
    status.value = 'error'
    errorMessage.value = 'لطفاً آدرس پست الکترونیکی خود را وارد کنید.'
    return
  }
  if (!EMAIL_RE.test(value)) {
    status.value = 'error'
    errorMessage.value = 'قالب پست الکترونیکی معتبر نیست (مثال: name@example.com).'
    return
  }
  // TODO: POST to the newsletter endpoint once the WordPress/CRM backend exists.
  status.value = 'success'
  email.value = ''
}

function onInput() {
  if (status.value !== 'idle') status.value = 'idle'
}

async function share() {
  const url = window.location.href
  try {
    if (navigator.share) {
      await navigator.share({ title: document.title, url })
      return
    }
    await navigator.clipboard.writeText(url)
    shareNote.value = 'پیوند صفحه کپی شد'
  }
  catch {
    shareNote.value = ''
    return
  }
  clearTimeout(shareTimer)
  shareTimer = setTimeout(() => { shareNote.value = '' }, 2400)
}

onBeforeUnmount(() => clearTimeout(shareTimer))

const jalaliYear = new Intl.DateTimeFormat('fa-IR-u-ca-persian', { year: 'numeric' }).format(new Date())
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <NuxtLink :to="routes.home" class="site-footer__logo">
            <span class="site-footer__mark" aria-hidden="true">ث</span>
            <span class="site-footer__wordmark">
              <span class="site-footer__wordmark-title">شرکت بین‌المللی توسعه ساختمان (ثاخت)</span>
              <span class="site-footer__wordmark-sub">بزرگ‌ترین هلدینگ ساختمانی بازار سرمایه کشور</span>
            </span>
          </NuxtLink>
          <p class="site-footer__intro">
            پیشگام انبوه‌سازی و سرمایه‌گذاری در مگاپروژه‌های ساختمانی، تجاری و گردشگری ایران با اتکا به دانش مهندسی روز و تعهد به خلق ارزش پایدار برای سهامداران و جامعه.
          </p>
          <ul class="site-footer__badges">
            <li>
              <span>شناسه نماد بورس:</span>
              <strong class="site-footer__chip">ثاخت</strong>
            </li>
            <li>
              <span>کد معاملاتی:</span>
              <strong class="site-footer__chip site-footer__chip--latin">ICD1</strong>
            </li>
            <li><span class="site-footer__chip site-footer__chip--soft">عضو گروه سرمایه‌گذاری غدیر</span></li>
          </ul>
        </div>

        <div class="site-footer__newsletter">
          <h2 class="site-footer__newsletter-title">عضویت در خبرنامه سرمایه‌گذاری و گزارش‌های دیده‌بان ثاخت</h2>
          <p class="site-footer__newsletter-text">
            دریافت بی‌واسطه آخرین اطلاعیه‌های کدال، گزارش‌های پیشرفت فیزیکی پروژه‌ها و فرصت‌های پیش‌فروش واحدهای هلدینگ.
          </p>
          <form v-if="status !== 'success'" class="site-footer__form" novalidate @submit.prevent="subscribe">
            <label for="footer-newsletter-email" class="visually-hidden">پست الکترونیکی</label>
            <input
              id="footer-newsletter-email"
              v-model="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              dir="ltr"
              placeholder="name@example.com"
              class="site-footer__input"
              :class="{ 'is-invalid': status === 'error' }"
              :aria-invalid="status === 'error'"
              aria-describedby="footer-newsletter-msg"
              @input="onInput"
            >
            <button type="submit" class="site-footer__submit">ثبت و اشتراک</button>
          </form>
          <p
            id="footer-newsletter-msg"
            class="site-footer__form-msg"
            :class="{ 'is-error': status === 'error', 'is-success': status === 'success' }"
            aria-live="polite"
          >
            <template v-if="status === 'error'">{{ errorMessage }}</template>
            <template v-else-if="status === 'success'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
              عضویت شما ثبت شد. نخستین خبرنامه به‌زودی برایتان ارسال می‌شود.
              <button type="button" class="site-footer__reset" @click="status = 'idle'">ثبت ایمیل دیگر</button>
            </template>
            <template v-else>با عضویت، <NuxtLink :to="routes.legalPrivacy">سیاست حریم خصوصی</NuxtLink> ثاخت را می‌پذیرید.</template>
          </p>
        </div>
      </div>

      <div class="site-footer__grid">
        <nav v-for="col in footerColumns" :key="col.heading" class="site-footer__col" :aria-label="col.heading">
          <h3 class="site-footer__heading">{{ col.heading }}</h3>
          <ul>
            <li v-for="item in col.items" :key="item.href">
              <NuxtLink :to="item.href" class="site-footer__link">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <address class="site-footer__contact">
        <a :href="companyContact.phoneHref" class="site-footer__contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
          مرکز تماس: <span class="isolate-ltr">{{ companyContact.phone }}</span>
        </a>
        <a :href="`mailto:${companyContact.email}`" class="site-footer__contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
          <span class="isolate-ltr">{{ companyContact.email }}</span>
        </a>
        <span class="site-footer__contact-item">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
          {{ companyContact.address }}
        </span>
      </address>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">
          © {{ jalaliYear }} تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
        <div class="site-footer__bottom-end">
          <nav class="site-footer__legal" aria-label="لینک‌های حقوقی">
            <NuxtLink v-for="l in legalNav" :key="l.href" :to="l.href">{{ l.label }}</NuxtLink>
          </nav>
          <div class="site-footer__social">
            <button type="button" class="site-footer__social-btn" title="اشتراک‌گذاری این صفحه" aria-label="اشتراک‌گذاری این صفحه" @click="share">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4" /></svg>
            </button>
            <NuxtLink :to="routes.contact" class="site-footer__social-btn" title="تماس مستقیم" aria-label="تماس مستقیم">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </NuxtLink>
            <NuxtLink :to="routes.projectsMap" class="site-footer__social-btn" title="نقشه پروژه‌ها" aria-label="نقشه پروژه‌ها">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2ZM9 4v14M15 6v14" /></svg>
            </NuxtLink>
            <span v-if="shareNote" class="site-footer__share-note" role="status">{{ shareNote }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-ink);
  color: var(--color-white);
  margin-block-start: var(--space-8);

  --footer-muted: rgb(255 255 255 / 62%);
  --footer-line: rgb(255 255 255 / 12%);
  --footer-panel: rgb(255 255 255 / 6%);
}
.site-footer__inner {
  max-inline-size: 1440px;
  margin-inline: auto;
  padding: var(--space-8) var(--space-3) var(--space-4);
}

/* --- brand + newsletter row --- */
.site-footer__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  padding-block-end: var(--space-6);
  border-block-end: 1px solid var(--footer-line);
}
@media (min-width: 1024px) { .site-footer__top { grid-template-columns: 5fr 7fr; gap: var(--space-6); align-items: center; } }

.site-footer__logo { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; margin-block-end: var(--space-2); }
.site-footer__mark {
  inline-size: 40px;
  block-size: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-brand-blue);
  color: var(--color-white);
  font-size: 22px;
  font-weight: 800;
  border-radius: var(--radius-sm);
}
.site-footer__wordmark { display: flex; flex-direction: column; gap: 4px; }
.site-footer__wordmark-title { font-size: 17px; font-weight: 700; line-height: 1.3; }
.site-footer__wordmark-sub { font-size: 12px; color: var(--color-tint); }
.site-footer__intro { font: var(--text-body-sm); line-height: 1.9; color: var(--footer-muted); max-inline-size: 52ch; margin-block-end: var(--space-2); }

.site-footer__badges { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 10px var(--space-2); font-size: 12px; color: var(--footer-muted); }
.site-footer__badges li { display: flex; align-items: center; gap: 6px; }
.site-footer__chip { display: inline-block; padding: 3px 10px; border-radius: var(--radius-xs); background: var(--footer-panel); border: 1px solid var(--footer-line); color: var(--color-tint); font-weight: 700; }
.site-footer__chip--latin { font-family: var(--font-en); letter-spacing: 0.04em; color: var(--color-white); direction: ltr; unicode-bidi: isolate; }
.site-footer__chip--soft { border-radius: var(--radius-pill); font-weight: 500; }

.site-footer__newsletter {
  background: var(--footer-panel);
  border: 1px solid var(--footer-line);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}
.site-footer__newsletter-title { font: var(--text-h3); color: var(--color-white); margin-block-end: var(--space-1); }
.site-footer__newsletter-text { font: var(--text-body-sm); color: var(--footer-muted); margin-block-end: var(--space-2); }
.site-footer__form { display: flex; flex-direction: column; gap: 10px; }
@media (min-width: 640px) { .site-footer__form { flex-direction: row; } }
.site-footer__input {
  flex: 1;
  min-inline-size: 0;
  block-size: 48px;
  padding-inline: var(--space-2);
  background: var(--color-white);
  color: var(--color-ink);
  border: 2px solid transparent;
  border-radius: var(--radius-xs);
  font: var(--text-body-sm);
  font-family: var(--font-en), var(--font-fa);
  text-align: start;
}
.site-footer__input::placeholder { color: var(--color-text-muted); }
.site-footer__input:focus { outline: none; border-color: var(--color-brand-blue); }
.site-footer__input.is-invalid { border-color: var(--color-status-error); }
.site-footer__submit {
  block-size: 48px;
  padding-inline: var(--space-3);
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-brand-blue);
  color: var(--color-white);
  font: var(--text-label);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 160ms ease;
}
.site-footer__submit:hover { background: var(--color-brand-blue-deep); }
.site-footer__form-msg { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-block-start: 10px; min-block-size: 20px; font-size: 12px; color: var(--footer-muted); }
.site-footer__form-msg a { color: var(--color-tint); }
.site-footer__form-msg.is-error {
  color: var(--color-white);
  padding: 8px 12px;
  background: rgb(194 59 59 / 22%);
  border: 1px solid var(--color-status-error);
  border-radius: var(--radius-xs);
}
.site-footer__form-msg.is-success {
  font-size: 14px;
  color: var(--color-white);
  padding: 12px var(--space-2);
  background: rgb(31 138 76 / 22%);
  border: 1px solid var(--color-status-success);
  border-radius: var(--radius-sm);
}
.site-footer__reset { border: 0; background: none; color: var(--color-tint); text-decoration: underline; cursor: pointer; font-size: 12px; margin-inline-start: auto; }

/* --- link grid --- */
.site-footer__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4) var(--space-3);
  padding-block: var(--space-6) var(--space-4);
}
@media (min-width: 768px) { .site-footer__grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1100px) { .site-footer__grid { grid-template-columns: repeat(5, 1fr); } }
.site-footer__heading {
  font: var(--text-label);
  color: var(--color-white);
  padding-block-end: 10px;
  margin-block-end: var(--space-2);
  border-block-end: 1px solid var(--footer-line);
}
.site-footer__col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.site-footer__link { font: var(--text-body-sm); color: var(--footer-muted); text-decoration: none; transition: color 160ms ease; }
.site-footer__link:hover { color: var(--color-tint); }

/* --- contact strip --- */
.site-footer__contact {
  font-style: normal;
  display: flex;
  flex-wrap: wrap;
  gap: 10px var(--space-4);
  padding-block: var(--space-2);
  border-block-start: 1px solid var(--footer-line);
}
.site-footer__contact-item { display: inline-flex; align-items: center; gap: 8px; font: var(--text-body-sm); color: var(--footer-muted); text-decoration: none; }
.site-footer__contact-item svg { color: var(--color-tint); flex-shrink: 0; }
a.site-footer__contact-item:hover { color: var(--color-white); }

/* --- legal bar --- */
.site-footer__bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-block-start: var(--space-3);
  border-block-start: 1px solid var(--footer-line);
}
@media (min-width: 900px) { .site-footer__bottom { flex-direction: row; align-items: center; justify-content: space-between; } }
.site-footer__copyright { font-size: 12px; color: var(--footer-muted); line-height: 1.8; }
.site-footer__bottom-end { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2) var(--space-3); }
.site-footer__legal { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-3); }
.site-footer__legal a { font-size: 12px; color: var(--footer-muted); text-decoration: none; }
.site-footer__legal a:hover { color: var(--color-tint); }
.site-footer__social { position: relative; display: flex; align-items: center; gap: var(--space-1); }
.site-footer__social-btn {
  inline-size: 36px;
  block-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--footer-line);
  border-radius: var(--radius-pill);
  background: none;
  color: var(--footer-muted);
  cursor: pointer;
  text-decoration: none;
  transition: color 160ms ease, border-color 160ms ease;
}
.site-footer__social-btn:hover { color: var(--color-white); border-color: var(--color-tint); }
.site-footer__share-note {
  position: absolute;
  inset-block-end: calc(100% + 8px);
  inset-inline-start: 0;
  white-space: nowrap;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  background: var(--color-white);
  color: var(--color-ink);
}

@media (max-width: 479px) {
  .site-footer__inner { padding-inline: var(--space-2); }
}
</style>
