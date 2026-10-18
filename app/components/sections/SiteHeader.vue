<script setup lang="ts">
/*
 * Site header — one instance for every route via layouts/default.vue
 * (ADR-014), styled after the approved Stitch header.
 *
 * Desktop: five menu items (sitemap §10). Each opens the page designed for
 * it; hovering or focusing an item reveals its sub-pages. Mobile: a drawer
 * with the same tree, so no destination is desktop-only (build checklist
 * Phase 4, "mobile navigation pattern").
 *
 * Everything — labels, targets, the CTA — comes from app/utils/routes.ts.
 */
import { primaryNav, headerCta, shareholderLogin, routes } from '~/utils/routes'

const route = useRoute()
const drawerOpen = ref(false)
const openGroup = ref<string | null>(null)

function pathOf(href: string) {
  return href.split('#')[0]!.split('?')[0]!
}

/** A top item is active on its own page and on every page of its cluster. */
const clusterPrefix: Record<string, string[]> = {
  [routes.about]: ['/about', '/companies', '/careers'],
  [routes.projects]: ['/projects'],
  [routes.sales]: ['/sales'],
  [routes.irFinancials]: ['/ir'],
  [routes.media]: ['/media'],
}

function isActive(href: string) {
  const prefixes = clusterPrefix[href] ?? [pathOf(href)]
  return prefixes.some(p => route.path === p || route.path.startsWith(p + '/'))
}

watch(() => route.fullPath, () => {
  drawerOpen.value = false
  openGroup.value = null
})

watch(drawerOpen, (open) => {
  if (import.meta.client) document.documentElement.style.overflow = open ? 'hidden' : ''
})

function toggleGroup(label: string) {
  openGroup.value = openGroup.value === label ? null : label
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-surface-container-lowest/95 backdrop-blur">
    <div class="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-6 px-space-lg md:px-margin">
      <!-- Logo + desktop nav -->
      <div class="flex min-w-0 items-center gap-8">
        <NuxtLink to="/" class="flex shrink-0 items-center gap-3" aria-label="هلدینگ ساختمانی ثاخت — صفحه اصلی">
          <!-- The company's own mark (Asset Icd / logo_land.png). It carries both
               the Persian and the English name, so no wordmark sits beside it. -->
          <img src="/img/brand/icd-logo.png" alt="هلدینگ ساختمانی ثاخت" class="h-11 w-auto md:h-12">
        </NuxtLink>

        <nav class="hidden items-center gap-1 xl:flex" aria-label="منوی اصلی">
          <div v-for="item in primaryNav" :key="item.href" class="group/nav relative">
            <NuxtLink
              :to="item.href"
              class="relative flex h-20 items-center gap-1 whitespace-nowrap px-2.5 text-label-lg font-label-lg transition-colors duration-150"
              :class="isActive(item.href) ? 'text-primary-container' : 'text-ink hover:text-primary-container'"
              :aria-current="isActive(item.href) ? 'page' : undefined"
            >
              {{ item.label }}
              <AppIcon v-if="item.megaMenu" name="expand_more" class="text-outline transition-transform duration-150 group-hover/nav:rotate-180" />
              <span
                class="absolute inset-x-3 bottom-0 h-0.5 rounded-pill bg-primary-container transition-opacity"
                :class="isActive(item.href) ? 'opacity-100' : 'opacity-0'"
              />
            </NuxtLink>
            <div
              v-if="item.megaMenu"
              class="invisible absolute right-0 top-full z-50 w-72 translate-y-1 opacity-0 transition-all duration-150 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100"
            >
              <ul class="mt-1 overflow-hidden rounded-md border border-border bg-surface-container-lowest p-2 shadow-[0_18px_40px_-20px_rgba(4,28,44,0.35)]">
                <li v-for="sub in item.megaMenu[0]!.items" :key="sub.href">
                  <NuxtLink
                    :to="sub.href"
                    class="block rounded-sm px-3 py-2.5 text-body-sm text-ink transition-colors hover:bg-surface hover:text-primary-container"
                  >
                    <span>{{ sub.label }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <!-- Utilities + actions -->
      <div class="flex shrink-0 items-center gap-2">
        <NuxtLink to="/search" class="flex size-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-surface" aria-label="جستجو در سایت">
          <AppIcon name="search" />
        </NuxtLink>
        <button
          type="button"
          class="hidden h-10 items-center gap-1 rounded-pill px-3 text-label-md text-outline 2xl:flex"
          aria-disabled="true"
          title="نسخه انگلیسی به‌زودی"
        >
          <AppIcon name="language" />
          <span class="text-[12px] font-bold tracking-wider">EN</span>
        </button>
        <span class="mx-1 hidden h-8 w-px bg-border 2xl:block" />
        <NuxtLink
          :to="shareholderLogin.href"
          class="hidden h-10 items-center whitespace-nowrap rounded-pill border border-primary-container px-4 text-label-lg font-label-lg text-primary-container transition-colors hover:bg-brand-tint md:inline-flex xl:hidden 2xl:inline-flex"
        >
          {{ shareholderLogin.label }}
        </NuxtLink>
        <NuxtLink
          :to="headerCta.href"
          class="hidden h-10 items-center gap-2 whitespace-nowrap rounded-pill bg-primary-container px-5 text-label-lg font-label-lg text-on-primary transition-colors hover:bg-brand-hover sm:inline-flex"
        >
          {{ headerCta.label }}
        </NuxtLink>
        <button
          type="button"
          class="flex size-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-surface xl:hidden"
          :aria-expanded="drawerOpen"
          aria-controls="mobile-drawer"
          @click="drawerOpen = true"
        >
          <AppIcon name="menu" label="باز کردن منو" />
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150"
        leave-to-class="opacity-0"
      >
        <div v-if="drawerOpen" class="fixed inset-0 z-[60] bg-ink/50 xl:hidden" @click="drawerOpen = false" />
      </Transition>
      <Transition
        enter-active-class="transition-transform duration-200"
        enter-from-class="translate-x-full"
        leave-active-class="transition-transform duration-150"
        leave-to-class="translate-x-full"
      >
        <aside
          v-if="drawerOpen"
          id="mobile-drawer"
          class="fixed inset-y-0 right-0 z-[70] flex w-[min(360px,88vw)] flex-col bg-surface-container-lowest xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="منوی سایت"
        >
          <div class="flex h-20 items-center justify-between border-b border-border px-5">
            <span class="text-headline-sm font-headline-sm text-ink">منو</span>
            <button type="button" class="flex size-10 items-center justify-center rounded-pill hover:bg-surface" @click="drawerOpen = false">
              <AppIcon name="close" label="بستن منو" />
            </button>
          </div>
          <nav class="flex-1 overflow-y-auto px-3 py-4" aria-label="منوی موبایل">
            <div v-for="item in primaryNav" :key="item.href" class="border-b border-border/70 last:border-b-0">
              <div class="flex items-center">
                <NuxtLink
                  :to="item.href"
                  class="flex-1 px-3 py-4 text-body-md font-bold"
                  :class="isActive(item.href) ? 'text-primary-container' : 'text-ink'"
                >{{ item.label }}</NuxtLink>
                <button
                  v-if="item.megaMenu"
                  type="button"
                  class="flex size-10 items-center justify-center rounded-pill text-outline hover:bg-surface"
                  :aria-expanded="openGroup === item.label"
                  @click="toggleGroup(item.label)"
                >
                  <AppIcon :name="openGroup === item.label ? 'expand_less' : 'expand_more'" :label="`زیرمنوی ${item.label}`" />
                </button>
              </div>
              <ul v-if="item.megaMenu && openGroup === item.label" class="pb-3">
                <li v-for="sub in item.megaMenu[0]!.items" :key="sub.href">
                  <NuxtLink :to="sub.href" class="block rounded-sm px-6 py-2.5 text-body-sm text-secondary hover:bg-surface hover:text-primary-container">
                    {{ sub.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
          <div class="grid gap-3 border-t border-border p-5">
            <NuxtLink :to="headerCta.href" class="flex h-12 items-center justify-center rounded-pill bg-primary-container text-label-lg font-label-lg text-on-primary">
              {{ headerCta.label }}
            </NuxtLink>
            <NuxtLink :to="shareholderLogin.href" class="flex h-12 items-center justify-center rounded-pill border border-primary-container text-label-lg font-label-lg text-primary-container">
              {{ shareholderLogin.label }}
            </NuxtLink>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>
