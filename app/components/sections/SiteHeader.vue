<script setup lang="ts">
import { primaryNav, headerCta, routes } from '~/utils/routes'

const openMenu = ref<number | null>(null)
function toggle(i: number) {
  openMenu.value = openMenu.value === i ? null : i
}
function close() {
  openMenu.value = null
}
</script>

<template>
  <header class="site-header">
    <BaseContainer class="site-header__bar">
      <NuxtLink :to="routes.home" class="site-header__logo" aria-label="ثاخت — صفحه اصلی">
        ثاخت
      </NuxtLink>

      <nav class="site-header__nav" aria-label="ناوبری اصلی" @focusout="close">
        <ul>
          <li v-for="(item, i) in primaryNav" :key="item.href" class="site-header__nav-item">
            <button
              type="button"
              class="site-header__nav-trigger"
              :aria-expanded="openMenu === i"
              @click="toggle(i)"
              @mouseenter="openMenu = i"
            >
              {{ item.label }}
            </button>
            <div
              v-if="item.megaMenu"
              v-show="openMenu === i"
              class="site-header__mega"
              @mouseleave="close"
            >
              <div v-for="(col, ci) in item.megaMenu" :key="ci" class="site-header__mega-col">
                <p v-if="col.heading" class="site-header__mega-heading">{{ col.heading }}</p>
                <NuxtLink
                  v-for="link in col.items"
                  :key="link.href"
                  :to="link.href"
                  class="site-header__mega-link"
                  @click="close"
                >
                  {{ link.label }}
                </NuxtLink>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <button type="button" class="site-header__icon-btn" aria-label="جستجو در سایت">
          <NuxtLink :to="routes.search" aria-hidden="true">🔍</NuxtLink>
        </button>
        <button type="button" class="site-header__icon-btn" aria-label="تغییر زبان">EN</button>
        <NuxtLink :to="routes.authLogin" class="site-header__icon-btn" aria-label="ورود / پروفایل">
          👤
        </NuxtLink>
        <BaseButton :href="headerCta.href" size="md">{{ headerCta.label }}</BaseButton>
      </div>
    </BaseContainer>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--color-white);
  border-block-end: 1px solid var(--color-border);
  position: sticky;
  inset-block-start: 0;
  z-index: 40;
}
.site-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  block-size: 88px;
}
.site-header__logo {
  font: var(--text-h3);
  font-weight: 700;
  color: var(--color-ink);
  text-decoration: none;
}
.site-header__nav ul {
  list-style: none;
  display: flex;
  gap: var(--space-3);
  margin: 0;
  padding: 0;
}
.site-header__nav-item { position: relative; }
.site-header__nav-trigger {
  background: none;
  border: 0;
  font: var(--text-body-sm);
  font-weight: 600;
  color: var(--color-ink);
  cursor: pointer;
  padding-block: var(--space-2);
}
.site-header__nav-trigger:hover,
.site-header__nav-trigger[aria-expanded='true'] {
  color: var(--color-primary);
}
.site-header__mega {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 24px rgb(4 28 44 / 8%);
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3);
  min-inline-size: 260px;
}
.site-header__mega-col { display: flex; flex-direction: column; gap: var(--space-1); }
.site-header__mega-heading { font: var(--text-label); color: var(--color-text-muted); }
.site-header__mega-link {
  text-decoration: none;
  color: var(--color-ink);
  font: var(--text-body-sm);
  padding-block: 4px;
}
.site-header__mega-link:hover { color: var(--color-primary); }
.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.site-header__icon-btn {
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--color-ink);
  text-decoration: none;
  font: var(--text-body-sm);
}

@media (max-width: 900px) {
  .site-header__nav { display: none; } /* mobile nav pattern tracked separately — checklist Phase 4 */
}
</style>
