<!--
  /media — ported from stitch_project_detail_page_template/media/ (ADR-013).
  One categorised feed (ADR-005): the tabs set `?category=` and filter the
  grid, `?page=` paginates it, and the designed empty state shows only when a
  category has no posts. Posts come from app/utils/posts.ts (ADR-015).
-->
<script setup lang="ts">
import { mediaCategories, type MediaCategory } from '~/utils/routes'
import { postsByCategory } from '~/utils/posts'
import { faDigits, faNumber } from '~/utils/format'

const PAGE = 9
const route = useRoute()

const category = computed(() => {
  const c = String(route.query.category ?? '')
  return (mediaCategories.some(m => m.value === c) ? c : '') as MediaCategory | ''
})
const page = computed(() => Math.max(1, Number(route.query.page) || 1))
const all = computed(() => postsByCategory(category.value))
const pages = computed(() => Math.max(1, Math.ceil(all.value.length / PAGE)))
const list = computed(() => all.value.slice((page.value - 1) * PAGE, page.value * PAGE))
const label = (c: string) => mediaCategories.find(m => m.value === c)?.label ?? ''

const tabs = computed(() => [
  { value: '', label: 'همه مطالب', count: postsByCategory('').length },
  ...mediaCategories.map(m => ({ ...m, count: postsByCategory(m.value).length })),
])

function to(c: string, p = 1) {
  return { path: '/media', query: { ...(c ? { category: c } : {}), ...(p > 1 ? { page: String(p) } : {}) } }
}

const cta: Record<MediaCategory, string> = {
  news: 'مطالعه خبر', stories: 'مطالعه روایت', podcast: 'شنیدن پادکست', analysis: 'مطالعه تحلیل', tenders: 'مشاهده آگهی',
}
</script>

<template>
  <div>
    <PageHero
      image="/img/projects/sparrow-rasht-1.jpg"
      eyebrow="آرشیو رسمی مقالات و گزارش‌ها"
      title="رسانه ثاخت"
      subtitle="روایت توسعه، تحلیل‌های مهندسی و نبض بازار املاک و مستغلات"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'رسانه ثاخت' }]"
      size="sm"
    />

    <nav class="sticky top-20 z-40 border-b border-border bg-surface-container-lowest/95 backdrop-blur" aria-label="دسته‌بندی مطالب">
      <ul class="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-space-lg [scrollbar-width:none] md:px-margin">
        <li v-for="t in tabs" :key="t.value" class="shrink-0">
          <NuxtLink
            :to="to(t.value)"
            class="relative flex h-14 items-center gap-2 px-4 text-label-lg font-label-lg transition-colors"
            :class="category === t.value ? 'text-primary-container' : 'text-secondary hover:text-ink'"
            :aria-current="category === t.value ? 'page' : undefined"
          >
            {{ t.label }}
            <span class="rounded-pill px-2 text-label-sm" :class="category === t.value ? 'bg-brand-tint text-primary-container' : 'bg-surface text-outline'">{{ faDigits(t.count) }}</span>
            <span v-if="category === t.value" class="absolute inset-x-4 bottom-0 h-0.5 rounded-pill bg-primary-container" />
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <section class="bg-surface py-12 md:py-16">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead
          :title="category ? label(category) : 'آخرین انتشارات'"
          :aside="`${faDigits(all.length)} مطلب`"
        />

        <div v-if="list.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="p in list"
            :key="p.slug"
            :to="`/media/${p.slug}`"
            class="group flex flex-col overflow-hidden rounded-md border border-border bg-surface-container-lowest transition-colors hover:border-primary-container"
          >
            <div class="relative aspect-[16/10] overflow-hidden bg-surface-alt">
              <img :src="p.image" :alt="p.title" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]">
              <span class="absolute right-4 top-4 rounded-pill bg-surface-container-lowest/95 px-3 py-1 text-label-md font-bold text-primary-container">{{ label(p.category) }}</span>
              <span v-if="p.audio" class="absolute bottom-4 left-4 flex items-center gap-2 rounded-pill bg-ink/85 px-3 py-1.5 text-label-md font-bold text-surface-container-lowest">
                <AppIcon name="play_arrow" />{{ faDigits(Math.round(p.audio.durationSec / 60)) }} دقیقه
              </span>
            </div>
            <div class="flex flex-1 flex-col p-6">
              <div class="mb-3 flex items-center justify-between text-label-md text-secondary">
                <span>{{ p.date }}</span>
                <span v-if="p.deadline" class="text-status-error">مهلت: {{ p.deadline }}</span>
                <span v-else>{{ faDigits(p.readingMinutes) }} دقیقه مطالعه</span>
              </div>
              <h3 class="mb-3 text-body-lg font-bold leading-relaxed text-ink group-hover:text-primary-container">{{ p.title }}</h3>
              <p class="mb-5 line-clamp-2 text-body-sm text-secondary">{{ p.excerpt }}</p>
              <div class="mt-auto flex items-center justify-between border-t border-border pt-4 text-label-md">
                <span class="flex items-center gap-1 font-bold text-primary-container">{{ cta[p.category] }} <AppIcon name="chevron_left" /></span>
                <span class="text-outline">{{ faNumber(p.views) }} بازدید</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="mx-auto max-w-xl rounded-lg border border-border bg-surface-container-lowest p-12 text-center">
          <span class="mx-auto mb-5 flex size-14 items-center justify-center rounded-md border border-border text-secondary"><AppIcon name="description" /></span>
          <h3 class="mb-2 text-headline-sm font-headline-sm text-ink">مطلبی در این دسته یافت نشد</h3>
          <p class="mb-6 text-body-sm text-secondary">در حال حاضر محتوایی در این دسته منتشر نشده است.</p>
          <NuxtLink to="/media" class="inline-flex h-11 items-center gap-2 rounded-pill border border-primary-container px-6 text-label-lg text-primary-container hover:bg-brand-tint"><AppIcon name="refresh" />مشاهده همه مطالب</NuxtLink>
        </div>

        <nav v-if="pages > 1" class="mt-12 flex items-center justify-center gap-2" aria-label="صفحه‌بندی">
          <NuxtLink
            v-for="n in pages"
            :key="n"
            :to="to(category, n)"
            class="flex size-10 items-center justify-center rounded-sm border text-body-sm font-bold transition-colors"
            :class="n === page ? 'border-primary-container bg-primary-container text-on-primary' : 'border-border bg-surface-container-lowest text-ink hover:border-primary-container'"
            :aria-current="n === page ? 'page' : undefined"
          >{{ faDigits(n) }}</NuxtLink>
        </nav>
      </div>
    </section>
  </div>
</template>
