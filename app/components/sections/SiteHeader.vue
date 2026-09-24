<script setup lang="ts">
import { primaryNav, headerCta, shareholderLogin, routes } from '~/utils/routes'

// Global header — one consistent version of the header every
// project_detail_page_template mockup carries (01a/01b/02a/04/07): ث mark +
// two-line wordmark, 5-item nav beside the logo with an underline on the
// active section, then search / FA-EN / «ورود سهامداران» / primary CTA.
// Mockups are desktop-only; below 1200px the nav collapses into a
// hamburger-triggered drawer. Balanced corner scale per
// docs/design-system-icd3d.md §4.1 (not the mockups' literal Tailwind radii).

const route = useRoute()

const openMenu = ref<number | null>(null)
const drawerOpen = ref(false)
const drawerSection = ref<number | null>(null)
const scrolled = ref(false)
const lang = ref<'fa' | 'en'>('fa')
const langHint = ref(false)
let langHintTimer: ReturnType<typeof setTimeout> | undefined

function isActive(href: string) {
  return route.path === href || route.path.startsWith(`${href}/`)
}

const activeIndex = computed(() => primaryNav.findIndex(item => isActive(item.href)))

function closeMenus() {
  openMenu.value = null
}

function toggleMenu(i: number) {
  openMenu.value = openMenu.value === i ? null : i
}

function openDrawer() {
  drawerSection.value = activeIndex.value >= 0 ? activeIndex.value : null
  drawerOpen.value = true
}

function closeDrawer() {
  drawerOpen.value = false
}

function toggleDrawerSection(i: number) {
  drawerSection.value = drawerSection.value === i ? null : i
}

// The `en` locale isn't built yet — the toggle is visual only and says so.
function selectLang(next: 'fa' | 'en') {
  lang.value = next
  if (next === 'en') {
    langHint.value = true
    clearTimeout(langHintTimer)
    langHintTimer = setTimeout(() => {
      langHint.value = false
      lang.value = 'fa'
    }, 2600)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  closeMenus()
  closeDrawer()
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

watch(() => route.fullPath, () => {
  closeMenus()
  closeDrawer()
})

watch(drawerOpen, (open) => {
  if (import.meta.client) document.documentElement.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(langHintTimer)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="site-header__bar">
      <div class="site-header__start">
        <NuxtLink :to="routes.home" class="site-header__logo" aria-label="هلدینگ ساختمانی ثاخت — صفحه اصلی">
          <span class="site-header__mark" aria-hidden="true">ث</span>
          <span class="site-header__wordmark">
            <span class="site-header__wordmark-title">هلدینگ ساختمانی ثاخت</span>
            <span class="site-header__wordmark-sub">شرکت بین‌المللی توسعه ساختمان (سهامی عام)</span>
          </span>
        </NuxtLink>

        <nav class="site-header__nav" aria-label="ناوبری اصلی">
          <ul class="site-header__nav-list">
            <li
              v-for="(item, i) in primaryNav"
              :key="item.href"
              class="site-header__nav-item"
              @mouseenter="openMenu = i"
              @mouseleave="closeMenus"
            >
              <NuxtLink
                :to="item.href"
                class="site-header__nav-link"
                :class="{ 'is-active': isActive(item.href) }"
                :aria-current="isActive(item.href) ? 'page' : undefined"
              >
                {{ item.label }}
              </NuxtLink>
              <button
                v-if="item.megaMenu"
                type="button"
                class="site-header__nav-toggle"
                :aria-expanded="openMenu === i"
                :aria-label="`زیرمنوی ${item.label}`"
                @click="toggleMenu(i)"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
              <div v-if="item.megaMenu" v-show="openMenu === i" class="site-header__dropdown">
                <template v-for="(col, ci) in item.megaMenu" :key="ci">
                  <p v-if="col.heading" class="site-header__dropdown-heading">{{ col.heading }}</p>
                  <NuxtLink
                    v-for="link in col.items"
                    :key="link.href"
                    :to="link.href"
                    class="site-header__dropdown-link"
                    :class="{ 'is-active': route.path === link.href }"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </template>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div class="site-header__actions">
        <NuxtLink :to="routes.search" class="site-header__icon-btn" aria-label="جستجو در سایت" title="جستجو">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        </NuxtLink>

        <div class="site-header__lang" role="group" aria-label="انتخاب زبان">
          <svg class="site-header__lang-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></svg>
          <button type="button" :class="{ 'is-active': lang === 'fa' }" :aria-pressed="lang === 'fa'" @click="selectLang('fa')">FA</button>
          <button type="button" :class="{ 'is-active': lang === 'en' }" :aria-pressed="lang === 'en'" title="نسخه انگلیسی به‌زودی" @click="selectLang('en')">EN</button>
          <span v-if="langHint" class="site-header__lang-hint" role="status">نسخه انگلیسی به‌زودی فعال می‌شود</span>
        </div>

        <!-- Shareholder portal (routes.authLogin / routes.account) isn't built yet — points to /ir for now. -->
        <NuxtLink :to="shareholderLogin.href" class="site-header__login" :aria-label="shareholderLogin.label" aria-current="false">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
          <span class="site-header__login-label">{{ shareholderLogin.label }}</span>
        </NuxtLink>

        <NuxtLink :to="headerCta.href" class="site-header__cta">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
          <span>{{ headerCta.label }}</span>
        </NuxtLink>

        <button
          type="button"
          class="site-header__burger"
          :aria-expanded="drawerOpen"
          aria-controls="site-drawer"
          aria-label="باز کردن منو"
          @click="openDrawer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
    </div>
  </header>

  <Transition name="site-drawer">
    <div v-if="drawerOpen" class="site-drawer" @click.self="closeDrawer">
      <aside id="site-drawer" class="site-drawer__panel" role="dialog" aria-modal="true" aria-label="منوی سایت">
        <div class="site-drawer__head">
          <NuxtLink :to="routes.home" class="site-header__logo" aria-label="صفحه اصلی">
            <span class="site-header__mark" aria-hidden="true">ث</span>
            <span class="site-header__wordmark">
              <span class="site-header__wordmark-title">هلدینگ ساختمانی ثاخت</span>
            </span>
          </NuxtLink>
          <button type="button" class="site-drawer__close" aria-label="بستن منو" @click="closeDrawer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <NuxtLink :to="routes.search" class="site-drawer__search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          جستجو در پروژه‌ها، اخبار و گزارش‌ها
        </NuxtLink>

        <nav aria-label="ناوبری موبایل">
          <ul class="site-drawer__list">
            <li v-for="(item, i) in primaryNav" :key="item.href" class="site-drawer__item">
              <div class="site-drawer__row">
                <NuxtLink :to="item.href" class="site-drawer__link" :class="{ 'is-active': isActive(item.href) }">
                  {{ item.label }}
                </NuxtLink>
                <button
                  v-if="item.megaMenu"
                  type="button"
                  class="site-drawer__expand"
                  :class="{ 'is-open': drawerSection === i }"
                  :aria-expanded="drawerSection === i"
                  :aria-label="`زیرمنوی ${item.label}`"
                  @click="toggleDrawerSection(i)"
                >
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                </button>
              </div>
              <div v-if="item.megaMenu" v-show="drawerSection === i" class="site-drawer__sub">
                <template v-for="(col, ci) in item.megaMenu" :key="ci">
                  <NuxtLink
                    v-for="link in col.items"
                    :key="link.href"
                    :to="link.href"
                    class="site-drawer__sub-link"
                    :class="{ 'is-active': route.path === link.href }"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </template>
              </div>
            </li>
          </ul>
        </nav>

        <div class="site-drawer__footer">
          <div class="site-header__lang site-header__lang--drawer" role="group" aria-label="انتخاب زبان">
            <button type="button" :class="{ 'is-active': lang === 'fa' }" :aria-pressed="lang === 'fa'" @click="selectLang('fa')">فارسی</button>
            <button type="button" :class="{ 'is-active': lang === 'en' }" :aria-pressed="lang === 'en'" @click="selectLang('en')">English</button>
          </div>
          <p v-if="langHint" class="site-drawer__hint" role="status">نسخه انگلیسی به‌زودی فعال می‌شود</p>
          <!-- Shareholder portal isn't built yet — points to /ir for now. -->
          <NuxtLink :to="shareholderLogin.href" class="site-drawer__btn site-drawer__btn--outline">{{ shareholderLogin.label }}</NuxtLink>
          <NuxtLink :to="headerCta.href" class="site-drawer__btn site-drawer__btn--primary">{{ headerCta.label }}</NuxtLink>
        </div>
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.site-header {
  position: sticky;
  inset-block-start: 0;
  z-index: 50;
  background: rgb(255 255 255 / 96%);
  backdrop-filter: blur(10px);
  border-block-end: 1px solid var(--color-border);
  transition: box-shadow 200ms ease;
}
.site-header.is-scrolled { box-shadow: 0 6px 20px rgb(4 28 44 / 8%); }

.site-header__bar {
  max-inline-size: 1440px;
  margin-inline: auto;
  padding-inline: var(--space-3);
  block-size: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.site-header__start { display: flex; align-items: center; gap: var(--space-4); min-inline-size: 0; }

/* --- logo --- */
.site-header__logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: var(--color-ink); flex-shrink: 0; }
.site-header__mark {
  inline-size: 40px;
  block-size: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-ink);
  color: var(--color-white);
  font-size: 22px;
  font-weight: 800;
  border-radius: var(--radius-sm);
  border-inline-end: 4px solid var(--color-brand-blue);
  transition: background-color 160ms ease;
}
.site-header__logo:hover .site-header__mark { background: var(--color-brand-blue-deep); }
.site-header__wordmark { display: flex; flex-direction: column; gap: 4px; }
.site-header__wordmark-title { font-size: 17px; font-weight: 800; line-height: 1; letter-spacing: -0.01em; }
.site-header__wordmark-sub { font-size: 11px; font-weight: 500; color: var(--color-text-muted); line-height: 1.2; }

/* --- desktop nav --- */
.site-header__nav { display: none; }
.site-header__nav-list { list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: var(--space-3); }
.site-header__nav-item { position: relative; display: flex; align-items: center; gap: 2px; }
.site-header__nav-link {
  display: inline-block;
  padding-block: 28px 26px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: none;
  border-block-end: 2px solid transparent;
  white-space: nowrap;
  transition: color 160ms ease, border-color 160ms ease;
}
.site-header__nav-link:hover { color: var(--color-primary); }
.site-header__nav-link.is-active { color: var(--color-primary); font-weight: 700; border-block-end-color: var(--color-primary); }
.site-header__nav-toggle {
  border: 0;
  background: none;
  padding: 4px;
  color: var(--color-text-muted);
  cursor: pointer;
  border-radius: var(--radius-xs);
  display: flex;
}
.site-header__nav-toggle:hover, .site-header__nav-toggle[aria-expanded='true'] { color: var(--color-primary); background: var(--color-surface); }
.site-header__nav-toggle[aria-expanded='true'] svg { transform: rotate(180deg); }

.site-header__dropdown {
  position: absolute;
  inset-block-start: calc(100% - 6px);
  inset-inline-start: calc(-1 * var(--space-2));
  min-inline-size: 280px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 32px rgb(4 28 44 / 10%);
  padding: var(--space-1);
  display: flex;
  flex-direction: column;
  z-index: 5;
}
.site-header__dropdown-heading { font: var(--text-label); font-size: 12px; color: var(--color-text-muted); padding: 8px 12px 4px; }
.site-header__dropdown-link {
  position: relative;
  display: block;
  padding: 10px 12px;
  padding-inline-start: 24px;
  font: var(--text-body-sm);
  color: var(--color-ink);
  text-decoration: none;
  border-radius: var(--radius-xs);
}
.site-header__dropdown-link::before {
  content: '';
  position: absolute;
  inset-inline-start: 12px;
  inset-block-start: 50%;
  inline-size: 5px;
  block-size: 5px;
  border-radius: 50%;
  background: var(--color-border);
  transform: translateY(-50%);
}
.site-header__dropdown-link:hover { background: var(--color-surface); color: var(--color-primary); }
.site-header__dropdown-link.is-active { color: var(--color-primary); font-weight: 700; }
.site-header__dropdown-link:hover::before, .site-header__dropdown-link.is-active::before { background: var(--color-primary); }

/* --- actions --- */
.site-header__actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.site-header__icon-btn {
  inline-size: 40px;
  block-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-ink);
  text-decoration: none;
  transition: color 160ms ease, background-color 160ms ease;
}
.site-header__icon-btn:hover { color: var(--color-primary); background: var(--color-surface); }

.site-header__lang {
  position: relative;
  display: none;
  align-items: center;
  gap: 2px;
  block-size: 40px;
  padding-inline: 10px 4px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
}
.site-header__lang-icon { margin-inline-end: 4px; }
.site-header__lang button {
  border: 0;
  background: none;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-text-muted);
  padding: 6px 9px;
  border-radius: var(--radius-pill);
  cursor: pointer;
  font-family: var(--font-en);
}
.site-header__lang button:hover { color: var(--color-ink); }
.site-header__lang button.is-active { background: var(--color-ink); color: var(--color-white); }
.site-header__lang-hint {
  position: absolute;
  inset-block-start: calc(100% + 8px);
  inset-inline-end: 0;
  white-space: nowrap;
  background: var(--color-ink);
  color: var(--color-white);
  font-size: 12px;
  padding: 6px 12px;
  border-radius: var(--radius-xs);
  box-shadow: 0 8px 20px rgb(4 28 44 / 20%);
}

.site-header__login {
  display: none;
  align-items: center;
  gap: 6px;
  block-size: 40px;
  padding-inline: var(--space-2);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 160ms ease;
}
.site-header__login:hover { background: var(--color-tint); }

.site-header__cta {
  display: none;
  align-items: center;
  gap: 6px;
  block-size: 40px;
  padding-inline: 18px;
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgb(0 94 184 / 20%);
  transition: background-color 160ms ease;
}
.site-header__cta:hover { background: var(--color-primary-hover); }

.site-header__burger {
  inline-size: 40px;
  block-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-ink);
  cursor: pointer;
}
.site-header__burger:hover { background: var(--color-surface); }

@media (max-width: 479px) {
  .site-header__bar { padding-inline: var(--space-2); }
  .site-header__wordmark-sub { display: none; }
  .site-header__wordmark-title { font-size: 15px; }
}
@media (min-width: 640px) {
  .site-header__lang { display: flex; }
  .site-header__cta { display: inline-flex; }
}
@media (min-width: 768px) {
  .site-header__login { display: inline-flex; }
}
@media (min-width: 1200px) {
  .site-header__nav { display: block; }
  .site-header__burger { display: none; }
}
/* 1200–1439px: 5 nav items + 4 actions are tight — shorten the secondary pieces. */
@media (min-width: 1200px) and (max-width: 1439px) {
  .site-header__start { gap: var(--space-3); }
  .site-header__nav-list { gap: var(--space-2); }
  .site-header__wordmark-sub { display: none; }
  .site-header__login { padding-inline: 0; inline-size: 40px; justify-content: center; }
  .site-header__login-label { display: none; }
}

/* --- mobile drawer --- */
.site-drawer {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgb(4 28 44 / 45%);
  display: flex;
  justify-content: flex-start;
}
.site-drawer__panel {
  inline-size: min(360px, 88vw);
  block-size: 100%;
  overflow-y: auto;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3) var(--space-3);
  box-shadow: 0 0 40px rgb(4 28 44 / 20%);
}
.site-drawer__head { display: flex; align-items: center; justify-content: space-between; padding-block-end: var(--space-1); border-block-end: 1px solid var(--color-border); min-block-size: 56px; }
.site-drawer__close {
  inline-size: 40px;
  block-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: none;
  cursor: pointer;
  color: var(--color-ink);
}
.site-drawer__search {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 12px var(--space-2);
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font: var(--text-body-sm);
  text-decoration: none;
}
.site-drawer__list { list-style: none; margin: 0; padding: 0; }
.site-drawer__item { border-block-end: 1px solid var(--color-border); }
.site-drawer__row { display: flex; align-items: center; justify-content: space-between; }
.site-drawer__link {
  flex: 1;
  padding-block: 14px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-ink);
  text-decoration: none;
}
.site-drawer__link.is-active { color: var(--color-primary); font-weight: 800; }
.site-drawer__link.is-active::before {
  content: '';
  display: inline-block;
  inline-size: 3px;
  block-size: 16px;
  margin-inline-end: 8px;
  vertical-align: -2px;
  background: var(--color-primary);
  border-radius: var(--radius-pill);
}
.site-drawer__expand {
  inline-size: 36px;
  block-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: var(--color-surface);
  border-radius: var(--radius-xs);
  color: var(--color-ink);
  cursor: pointer;
}
.site-drawer__expand svg { transition: transform 160ms ease; }
.site-drawer__expand.is-open svg { transform: rotate(180deg); }
.site-drawer__sub { display: flex; flex-direction: column; padding-block-end: var(--space-1); padding-inline-start: var(--space-2); }
.site-drawer__sub-link { padding-block: 8px; font: var(--text-body-sm); color: var(--color-text-muted); text-decoration: none; }
.site-drawer__sub-link.is-active, .site-drawer__sub-link:hover { color: var(--color-primary); }
.site-drawer__footer { margin-block-start: auto; display: flex; flex-direction: column; gap: 10px; padding-block-start: var(--space-2); }
.site-header__lang--drawer { display: flex; justify-content: center; padding-inline: 4px; align-self: stretch; }
.site-header__lang--drawer button { flex: 1; font-family: inherit; }
.site-drawer__hint { font-size: 12px; color: var(--color-text-muted); text-align: center; }
.site-drawer__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  block-size: 46px;
  border-radius: var(--radius-pill);
  font: var(--text-label);
  text-decoration: none;
}
.site-drawer__btn--outline { border: 1px solid var(--color-primary); color: var(--color-primary); }
.site-drawer__btn--primary { background: var(--color-primary); color: var(--color-white); }

.site-drawer-enter-active, .site-drawer-leave-active { transition: opacity 200ms ease; }
.site-drawer-enter-active .site-drawer__panel, .site-drawer-leave-active .site-drawer__panel { transition: transform 240ms var(--motion-ease); }
.site-drawer-enter-from, .site-drawer-leave-to { opacity: 0; }
.site-drawer-enter-from .site-drawer__panel, .site-drawer-leave-to .site-drawer__panel { transform: translateX(100%); }

@media (prefers-reduced-motion: reduce) {
  .site-drawer-enter-active, .site-drawer-leave-active,
  .site-drawer-enter-active .site-drawer__panel, .site-drawer-leave-active .site-drawer__panel { transition: none; }
}
</style>
