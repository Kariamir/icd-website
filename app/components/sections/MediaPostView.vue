<!--
  /media/[slug] — ported from stitch_project_detail_page_template/_1/
  (ADR-013). One detail template for every post type (ADR-005); podcast and
  narrated posts show the audio panel. The design's Font Awesome icons never
  loaded in the app — they are AppIcon now — and the body renders from the
  post's structured blocks (app/utils/posts.ts).
-->
<script setup lang="ts">
import { mediaCategories } from '~/utils/routes'
import { relatedPosts, posts, type Post } from '~/utils/posts'
import { faDigits, faNumber } from '~/utils/format'
import { formatDuration } from '~/utils/articlesData'

const props = defineProps<{ post: Post }>()

const catLabel = computed(() => mediaCategories.find(m => m.value === props.post.category)?.label ?? '')
const related = computed(() => relatedPosts(props.post.slug, 3))
const toc = computed(() => props.post.body.filter(b => b.type === 'h2' || b.type === 'h3').map((b, i) => ({ id: `s${i + 1}`, text: (b as { text: string }).text })))
const headingIds = computed(() => {
  const map = new Map<number, string>()
  let n = 0
  props.post.body.forEach((b, i) => { if (b.type === 'h2' || b.type === 'h3') map.set(i, `s${++n}`) })
  return map
})
const idx = computed(() => posts.findIndex(p => p.slug === props.post.slug))
const prev = computed(() => posts[idx.value + 1])
const next = computed(() => posts[idx.value - 1])

const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  }
  catch { /* clipboard blocked — nothing to do */ }
}
</script>

<template>
  <div>
    <!-- Breadcrumb bar -->
    <div class="border-b border-border bg-surface">
      <div class="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-space-lg py-3 text-label-md text-secondary md:px-8">
        <nav aria-label="مسیر صفحه" class="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap">
          <NuxtLink to="/" class="hover:text-primary-container">صفحه اصلی</NuxtLink>
          <AppIcon name="chevron_left" class="text-outline" />
          <NuxtLink to="/media" class="hover:text-primary-container">رسانه ثاخت</NuxtLink>
          <AppIcon name="chevron_left" class="text-outline" />
          <NuxtLink :to="`/media?category=${post.category}`" class="font-semibold text-primary-container">{{ catLabel }}</NuxtLink>
        </nav>
        <span class="hidden shrink-0 items-center gap-1.5 md:flex"><AppIcon name="schedule" />{{ faDigits(post.readingMinutes) }} دقیقه مطالعه</span>
      </div>
    </div>

    <div class="mx-auto max-w-[1360px] px-space-lg py-12 md:px-8 md:py-20">
      <div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 xl:gap-16">
        <article class="rounded-lg border border-border bg-surface-container-lowest p-6 sm:p-10 md:p-14 lg:col-span-8">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-pill bg-brand-tint px-4 py-1.5 text-label-md font-bold text-primary-container">{{ catLabel }}</span>
              <span v-if="post.audio" class="flex items-center gap-1.5 rounded-pill bg-surface px-3.5 py-1.5 text-label-md text-secondary"><AppIcon name="headset_mic" class="text-primary-container" />همراه با نسخه صوتی</span>
              <span v-if="post.deadline" class="rounded-pill bg-status-error/10 px-3.5 py-1.5 text-label-md font-bold text-status-error">مهلت دریافت اسناد: {{ post.deadline }}</span>
            </div>
            <div class="flex items-center gap-4 text-label-md text-secondary">
              <span class="flex items-center gap-1.5"><AppIcon name="calendar_month" class="text-outline" />{{ post.date }}</span>
              <span class="flex items-center gap-1.5"><AppIcon name="visibility" class="text-outline" />{{ faNumber(post.views) }}</span>
            </div>
          </div>

          <h1 class="mb-6 text-2xl font-extrabold leading-snug text-ink sm:text-3xl md:text-4xl">{{ post.title }}</h1>
          <p class="mb-8 border-b border-border/60 pb-8 text-body-lg leading-relaxed text-secondary">{{ post.excerpt }}</p>

          <div class="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-md border border-border/60 bg-surface p-5">
            <div class="flex items-center gap-4">
              <span class="flex size-12 items-center justify-center rounded-pill border border-primary-container/20 bg-primary-container/10 font-bold text-primary-container">{{ post.author.initials }}</span>
              <div>
                <p class="text-body-sm font-bold text-ink">{{ post.author.name }}</p>
                <p class="mt-0.5 text-label-md text-secondary">{{ post.author.role }}</p>
              </div>
            </div>
            <button type="button" class="inline-flex h-9 items-center gap-2 rounded-pill border border-border bg-surface-container-lowest px-4 text-label-md text-secondary transition-colors hover:border-primary-container hover:text-primary-container" @click="copyLink">
              <AppIcon :name="copied ? 'check' : 'share'" />{{ copied ? 'پیوند کپی شد' : 'کپی پیوند' }}
            </button>
          </div>

          <figure class="mb-12 overflow-hidden rounded-lg">
            <img :src="post.image" :alt="post.title" class="aspect-[16/9] w-full object-cover">
          </figure>

          <div v-if="post.audio" class="mb-12 rounded-md border border-primary-container/20 bg-surface p-6">
            <div class="mb-4 flex items-center justify-between">
              <span class="flex items-center gap-2.5 text-body-sm font-bold text-primary-container"><AppIcon name="headset_mic" />
                {{ post.audio.episode ? `قسمت ${faDigits(post.audio.episode)} پادکست روایت ثاخت` : 'روایت صوتی مقاله' }}
              </span>
              <span class="text-label-md text-secondary">{{ formatDuration(post.audio.durationSec) }}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-pill bg-primary-container/40 text-on-primary" aria-hidden="true"><AppIcon name="play_arrow" /></span>
              <div class="h-2 flex-1 rounded-pill bg-surface-container-lowest ring-1 ring-border" />
            </div>
            <p class="mt-3 text-label-md text-outline">فایل صوتی پس از بارگذاری در سامانه پخش می‌شود. گوینده: {{ post.audio.narrator }}</p>
          </div>

          <div class="space-y-6 text-[16px] leading-8 text-on-surface">
            <template v-for="(b, i) in post.body" :key="i">
              <p v-if="b.type === 'p'">{{ b.text }}</p>
              <h2 v-else-if="b.type === 'h2'" :id="headingIds.get(i)" class="scroll-mt-28 border-r-4 border-primary-container pr-4 pt-4 text-xl font-bold text-ink sm:text-2xl">{{ b.text }}</h2>
              <h3 v-else-if="b.type === 'h3'" :id="headingIds.get(i)" class="scroll-mt-28 pt-2 text-lg font-bold text-ink sm:text-xl">{{ b.text }}</h3>
              <figure v-else-if="b.type === 'quote'" class="my-8 rounded-lg border-r-4 border-primary-container bg-brand-tint/30 p-8">
                <blockquote class="text-lg font-bold leading-relaxed text-ink sm:text-xl">{{ b.text }}</blockquote>
                <figcaption class="mt-4 text-label-md font-bold text-primary-container">— {{ b.author }}<span v-if="b.role" class="font-normal text-secondary"> · {{ b.role }}</span></figcaption>
              </figure>
              <figure v-else-if="b.type === 'figure'" class="my-8 overflow-hidden rounded-lg border border-border">
                <img :src="b.image.src" :alt="b.caption" loading="lazy" class="aspect-[16/9] w-full object-cover">
                <figcaption class="bg-surface p-4 text-center text-label-md text-secondary">{{ b.caption }}</figcaption>
              </figure>
              <ul v-else-if="b.type === 'checklist'" class="space-y-3">
                <li v-for="it in b.items" :key="it" class="flex items-start gap-2.5 text-body-sm"><AppIcon name="check_circle" class="mt-1 text-primary-container" /><span>{{ it }}</span></li>
              </ul>
            </template>
          </div>

          <div v-if="post.category === 'tenders'" class="mt-10 flex flex-col items-start justify-between gap-4 rounded-md border border-border bg-surface p-6 sm:flex-row sm:items-center">
            <p class="text-body-sm text-secondary">اسناد این آگهی و الزامات ثبت مدارک در صفحه اسناد و گزارش‌ها منتشر شده است.</p>
            <NuxtLink to="/ir/financials?group=tenders" class="inline-flex h-11 shrink-0 items-center gap-2 rounded-pill bg-primary-container px-5 text-label-lg text-on-primary hover:bg-brand-hover"><AppIcon name="download" />دریافت اسناد</NuxtLink>
          </div>

          <div class="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
            <span class="ml-1 text-label-md font-bold text-secondary">برچسب‌ها:</span>
            <NuxtLink v-for="t in post.tags" :key="t" :to="{ path: '/search', query: { q: t.replace(/_/g, ' ') } }" class="rounded-pill bg-surface px-3.5 py-1.5 text-label-md text-secondary transition-colors hover:bg-brand-tint hover:text-primary-container">#{{ t }}</NuxtLink>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
            <NuxtLink v-if="prev" :to="`/media/${prev.slug}`" class="group flex items-center gap-3 rounded-md border border-border/60 bg-surface p-5 hover:border-primary-container">
              <AppIcon name="arrow_forward" class="text-outline group-hover:text-primary-container" />
              <div class="min-w-0"><span class="block text-label-sm text-outline">مطلب قبلی</span><span class="line-clamp-1 text-label-lg font-bold text-ink group-hover:text-primary-container">{{ prev.title }}</span></div>
            </NuxtLink>
            <NuxtLink v-if="next" :to="`/media/${next.slug}`" class="group flex items-center justify-end gap-3 rounded-md border border-border/60 bg-surface p-5 text-left hover:border-primary-container sm:col-start-2">
              <div class="min-w-0"><span class="block text-label-sm text-outline">مطلب بعدی</span><span class="line-clamp-1 text-label-lg font-bold text-ink group-hover:text-primary-container">{{ next.title }}</span></div>
              <AppIcon name="arrow_back" class="text-outline group-hover:text-primary-container" />
            </NuxtLink>
          </div>
        </article>

        <aside class="space-y-8 lg:sticky lg:top-28 lg:col-span-4">
          <form action="/search" method="get" class="rounded-lg border border-border bg-surface-container-lowest p-6" role="search">
            <label for="post-search" class="sr-only">جستجو در مطالب</label>
            <div class="relative">
              <input id="post-search" name="q" type="search" placeholder="جستجو در مقالات و تحلیل‌ها…" class="h-12 w-full rounded-md border border-border bg-surface pl-11 pr-4 text-body-sm text-ink focus:border-primary-container focus:outline-none">
              <button type="submit" class="absolute left-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary-container"><AppIcon name="search" label="جستجو" /></button>
            </div>
          </form>

          <nav v-if="toc.length" class="rounded-lg border border-border bg-surface-container-lowest p-6" aria-label="سرفصل‌ها">
            <h2 class="mb-4 border-b border-border pb-3 text-body-sm font-bold text-ink">سرفصل‌های این مطلب</h2>
            <a v-for="t in toc" :key="t.id" :href="`#${t.id}`" class="block rounded-sm p-2.5 text-label-lg text-secondary transition-colors hover:bg-surface hover:text-primary-container">{{ t.text }}</a>
          </nav>

          <div v-if="related.length" class="rounded-lg border border-border bg-surface-container-lowest p-6">
            <h2 class="mb-4 border-b border-border pb-3 text-body-sm font-bold text-ink">مطالب مرتبط</h2>
            <NuxtLink v-for="r in related" :key="r.slug" :to="`/media/${r.slug}`" class="group mb-4 flex gap-3 last:mb-0">
              <img :src="r.image" alt="" class="size-16 shrink-0 rounded-sm object-cover">
              <span class="line-clamp-2 text-label-lg font-bold text-ink group-hover:text-primary-container">{{ r.title }}</span>
            </NuxtLink>
          </div>

          <NuxtLink to="/sales/consultation" class="group block overflow-hidden rounded-lg border border-border bg-surface-container-lowest">
            <div class="relative aspect-[16/10]">
              <img src="/img/ph/tower-2.svg" alt="" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
              <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 to-transparent p-5 text-surface-container-lowest">
                <span class="mb-1 text-label-md font-bold text-brand-tint">فرصت‌های پیش‌فروش</span>
                <span class="text-body-sm font-bold">مشاوره خرید و سرمایه‌گذاری</span>
              </div>
            </div>
            <span class="flex items-center justify-center gap-2 bg-primary-container py-3 text-label-lg font-bold text-on-primary">درخواست مشاوره <AppIcon name="arrow_back" /></span>
          </NuxtLink>
        </aside>
      </div>
    </div>
  </div>
</template>
