<!--
  404 / error page — ported from stitch_project_detail_page_template/
  11_error_404/ (ADR-013). Works without WebGL (technical-requirements §9).
  The design's search posted nowhere; it now goes to /search, and every
  quick link resolves to a real route.
-->
<script setup lang="ts">
import type { IconName } from '~/utils/icons'

withDefaults(defineProps<{ code?: number }>(), { code: 404 })

const q = ref('')
function go() {
  navigateTo({ path: '/search', query: q.value.trim() ? { q: q.value.trim() } : {} })
}

const quick: { icon: IconName, label: string, to: string }[] = [
  { icon: 'domain', label: 'پروژه‌ها', to: '/projects' },
  { icon: 'key', label: 'پیش‌فروش واحدها', to: '/sales?status=pre-sale' },
  { icon: 'trending_up', label: 'دیده‌بان ثاخت', to: '/ir/financials' },
  { icon: 'headset_mic', label: 'تماس با ما', to: '/contact' },
]
</script>

<template>
  <section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-16 md:py-24">
    <img src="/img/projects/tehran-international-tower-1.jpg" alt="" class="absolute inset-x-0 bottom-0 h-1/2 w-full object-cover opacity-20 [mask-image:linear-gradient(to_top,black,transparent)]">
    <div class="relative z-10 mx-auto w-full max-w-3xl text-center">
      <span class="mb-4 inline-block select-none text-8xl font-black leading-none text-primary-container md:text-[140px]">{{ code === 404 ? '۴۰۴' : '۵۰۰' }}</span>
      <h1 class="mb-3 text-2xl font-extrabold text-ink md:text-3xl">{{ code === 404 ? 'صفحه مورد نظر یافت نشد' : 'خطایی رخ داد' }}</h1>
      <p class="mx-auto mb-9 max-w-lg text-body-md leading-relaxed text-secondary">
        {{ code === 404 ? 'صفحه‌ای که به دنبال آن هستید حذف شده یا نشانی آن تغییر کرده است.' : 'لطفاً چند لحظه بعد دوباره تلاش کنید.' }}
      </p>
      <form class="relative mx-auto mb-8 flex max-w-md items-center" role="search" @submit.prevent="go">
        <label for="nf-q" class="sr-only">جستجو</label>
        <input id="nf-q" v-model="q" type="search" placeholder="جستجو در پروژه‌ها، اخبار و اسناد…" class="h-12 w-full rounded-pill border border-border bg-surface-container-lowest pl-14 pr-5 text-body-sm text-ink focus:border-primary-container focus:outline-none">
        <button type="submit" class="absolute left-1.5 flex size-9 items-center justify-center rounded-pill bg-primary-container text-on-primary hover:bg-brand-hover"><AppIcon name="search" label="جستجو" /></button>
      </form>
      <div class="mb-12 flex flex-wrap items-center justify-center gap-3.5">
        <NuxtLink to="/" class="inline-flex h-12 items-center gap-2 rounded-pill bg-primary-container px-6 text-label-lg font-semibold text-on-primary hover:bg-brand-hover"><AppIcon name="home" />بازگشت به صفحه اصلی</NuxtLink>
        <NuxtLink to="/projects" class="inline-flex h-12 items-center gap-2 rounded-pill border border-border bg-surface-container-lowest px-6 text-label-lg font-semibold text-ink hover:border-primary-container hover:text-primary-container"><AppIcon name="apartment" />مشاهده پروژه‌ها</NuxtLink>
      </div>
      <div class="border-t border-border pt-8">
        <p class="mb-4 text-label-md text-outline">بخش‌های پرکاربرد:</p>
        <div class="flex flex-wrap justify-center gap-2.5">
          <NuxtLink v-for="l in quick" :key="l.to" :to="l.to" class="inline-flex items-center gap-2 rounded-pill border border-border bg-surface-container-lowest px-4 py-2 text-label-md text-ink hover:border-primary-container/50 hover:bg-brand-tint/40 hover:text-primary-container"><AppIcon :name="l.icon" />{{ l.label }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
