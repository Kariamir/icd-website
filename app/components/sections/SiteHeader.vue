<script setup lang="ts">
/*
 * Chrome lifted out of the approved design at
 * stitch_project_detail_page_template/projects/ (ADR-013).
 *
 * It lives here, in the layout, rather than inside each ported view. Before
 * this, every ported page carried its own copy with the active tab hard-coded
 * to whichever design it came from, and the home page — which was never
 * designed in Stitch — used a different header entirely. That was the menu
 * inconsistency between the home page and the rest of the site.
 *
 * The nav is now generated from `primaryNav` in app/utils/routes.ts, the single
 * source of truth for the route table, and the active item is derived from the
 * current route.
 */
import { primaryNav } from '~/utils/routes'

const route = useRoute()

const activeClass = 'text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container font-bold pb-1 transition-colors duration-150'
const idleClass = 'text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150'

function isActive(href: string) {
  const path = href.split('#')[0].split('?')[0]
  if (!path || path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<template>
<header class="bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Logo & Primary Nav Links -->
<div class="flex items-center gap-10">
<NuxtLink class="flex items-center gap-3" to="/">
<div class="w-9 h-9 bg-ink flex items-center justify-center text-surface-container-lowest font-headline-md text-headline-md tracking-tighter">
            ث
          </div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md text-ink tracking-tight leading-tight">هلدینگ ساختمانی ثاخت</span>
<span class="text-label-md font-label-md text-outline tracking-wider">ICD HOLDING</span>
</div>
</NuxtLink>
<!-- Desktop Navigation Items -->
<nav class="hidden lg:flex items-center gap-7 pt-1" aria-label="منوی اصلی">
<NuxtLink
v-for="item in primaryNav"
:key="item.href"
:to="item.href"
:class="isActive(item.href) ? activeClass : idleClass"
:aria-current="isActive(item.href) ? 'page' : undefined"
>{{ item.label }}</NuxtLink>
</nav>
</div>
<!-- Left: Actions & Utility Controls -->
<div class="flex items-center gap-3">
<!-- Icons -->
<div class="flex items-center gap-1 pl-3 border-l border-border">
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>
</button>
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors flex items-center gap-1 text-label-md font-label-md" title="Language">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" /></svg>
<span class="font-headline-sm text-[12px] uppercase tracking-wider">EN</span>
</button>
</div>
<!-- Shareholders Portal (Secondary) -->
<NuxtLink class="hidden sm:inline-flex items-center px-4 py-2 text-label-lg font-label-lg text-primary-container border border-primary-container hover:bg-brand-tint transition-colors duration-150" to="/ir">
          ورود سهامداران
        </NuxtLink>
<!-- Fast Consultation CTA (Primary) -->
<NuxtLink class="inline-flex items-center px-5 py-2 text-label-lg font-label-lg text-on-primary bg-primary-container hover:bg-brand-blue-deep transition-colors duration-150" to="/contact">
          مشاوره و تماس سریع
        </NuxtLink>
</div>
</div>
</header>
</template>
