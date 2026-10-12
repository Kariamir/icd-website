<script setup lang="ts">
// Homepage — nine fixed blocks, sitemap §3.1 (v1.5): do not reorder without
// approval. Built in the approved Stitch visual language (no Stitch design
// existed for the home page) and fed from the same catalog as every other
// page (ADR-015), so a card here always opens the page it names.
import { companies, projects, units } from '~/utils/catalog'
import { posts } from '~/utils/posts'
import { irDocuments } from '~/utils/irDocuments'
import { honors } from '~/utils/honorsData'
import { quote, IR_SYMBOL_IS_MOCK, snapshotDateLabel } from '~/utils/irSymbolData'
import { mediaCategories } from '~/utils/routes'
import { ph } from '~/utils/media'
import { faDigits, faNumber } from '~/utils/format'

useSeoMeta({
  title: 'هلدینگ ساختمانی ثاخت — شرکت بین‌المللی توسعه ساختمان',
  description: 'هلدینگ ساخت‌وساز و املاک پذیرفته‌شده در بورس تهران؛ پروژه‌ها، فروش و پیش‌فروش، دیده‌بان سهامداران و رسانه ثاخت.',
})

const totalArea = projects.reduce((s, p) => s + p.areaSqm, 0)
const stats = [
  { value: '۱۳۶۴', label: 'سال تاسیس' },
  { value: `${faNumber(Math.round(totalArea / 1000))} هزار`, label: 'مترمربع زیربنا' },
  { value: faDigits(projects.length), label: 'پروژه' },
  { value: '۸۲٬۳۰۸', label: 'میلیارد ریال سرمایه ثبتی' },
]

const featured = projects.find(p => p.featured)!
const featuredSide = projects.filter(p => p.slug !== featured.slug && (p.featured || p.status === 'under-construction')).slice(0, 2)
const preSale = units.filter(u => u.status === 'pre-sale')
const latestPosts = posts.filter(p => p.category !== 'tenders').slice(0, 3)
const latestDoc = [...irDocuments].sort((a, b) => b.sortKey - a.sortKey)[0]!
const change = ((quote.last - quote.prevClose) / quote.prevClose) * 100
const catLabel = (c: string) => mediaCategories.find(m => m.value === c)?.label ?? ''
</script>

<template>
  <div>
    <!-- 0 — Hero (3D scene pending, ADR-003; this is the designed fallback) -->
    <section class="relative flex min-h-[640px] items-end overflow-hidden bg-ink md:min-h-[calc(100vh-5rem)]">
      <img :src="ph('skyline', 2)" alt="" class="absolute inset-0 size-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/0" />
      <div class="relative z-10 mx-auto w-full max-w-[1440px] px-space-lg pb-20 md:px-margin md:pb-28">
        <p class="mb-4 inline-flex items-center gap-2 rounded-pill border border-surface-container-lowest/20 bg-surface-container-lowest/10 px-4 py-1.5 text-label-md text-brand-tint"><span class="size-1.5 rounded-pill bg-brand-tint" />شرکت بین‌المللی توسعه ساختمان · نماد ثاخت</p>
        <h1 class="max-w-4xl text-headline-xl-mobile font-headline-xl leading-tight text-surface-container-lowest md:text-[88px] md:leading-[1.05]">ساختن، با انضباط مهندسی</h1>
        <p class="mt-5 max-w-xl text-body-lg text-surface-dim">هلدینگ ساخت‌وساز و املاک؛ توسعه پروژه‌های نهادی از ۱۳۶۴.</p>
        <div class="mt-9 flex flex-wrap gap-4">
          <NuxtLink to="/projects" class="inline-flex h-14 items-center gap-2 rounded-pill bg-surface-container-lowest px-8 text-label-lg font-label-lg text-ink hover:bg-surface-alt">کشف پروژه‌ها <AppIcon name="arrow_back" /></NuxtLink>
          <NuxtLink to="/sales/consultation" class="inline-flex h-14 items-center rounded-pill border border-surface-container-lowest/60 px-8 text-label-lg font-label-lg text-surface-container-lowest hover:bg-surface-container-lowest/10">مشاوره خرید</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 1 — ثاخت در یک نگاه -->
    <section class="border-b border-border bg-surface-container-lowest">
      <div class="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-5">
        <div v-for="(s, i) in stats" :key="s.label" class="border-border p-8 md:p-10" :class="[i % 2 === 1 && 'border-r', i > 1 && 'border-t lg:border-t-0', i > 0 && 'lg:border-r']">
          <div class="text-headline-lg font-headline-lg text-ink">{{ s.value }}</div>
          <div class="mt-1 text-label-lg text-primary-container">{{ s.label }}</div>
        </div>
        <NuxtLink to="/about" class="col-span-2 flex items-center justify-between gap-3 border-t border-border bg-surface p-8 text-label-lg font-bold text-primary-container transition-colors hover:bg-brand-tint/40 md:p-10 lg:col-span-1 lg:border-r lg:border-t-0">
          بیشتر درباره ثاخت <AppIcon name="arrow_back" />
        </NuxtLink>
      </div>
    </section>

    <!-- 2 — خانواده ثاخت (before projects, ADR-011) -->
    <section class="bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="خانواده ثاخت" title="هشت شرکت، یک زنجیره">
          <NuxtLink to="/companies" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">همه شرکت‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <ul class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <li v-for="c in companies" :key="c.slug">
            <NuxtLink :to="`/companies/${c.slug}`" class="group flex h-40 flex-col items-center justify-center rounded-lg border border-border bg-surface-container-lowest p-4 text-center transition-colors hover:border-primary-container md:h-48">
              <span class="text-2xl font-extrabold text-ink group-hover:text-primary-container md:text-3xl">{{ c.mark }}</span>
              <span class="mt-1 text-[10px] font-bold uppercase tracking-widest text-secondary">{{ c.markSub }}</span>
              <span class="mt-3 text-label-md text-secondary">{{ c.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- 3 — پروژه‌های شاخص -->
    <section class="bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="پروژه‌ها" title="پروژه‌های شاخص">
          <NuxtLink to="/projects" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">مشاهده همه پروژه‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <NuxtLink :to="`/projects/${featured.slug}`" class="group relative min-h-[420px] overflow-hidden rounded-lg bg-ink lg:col-span-7 lg:row-span-2">
            <img :src="featured.image" :alt="featured.name" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]">
            <div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
            <div class="absolute inset-x-0 bottom-0 p-8">
              <StatusPill :status="featured.status" class="mb-3" />
              <h3 class="text-headline-lg font-headline-lg text-surface-container-lowest">{{ featured.name }}</h3>
              <p class="mt-2 max-w-lg text-body-md text-surface-dim">{{ featured.excerpt }}</p>
              <div v-if="featured.progress != null" class="mt-5 max-w-sm">
                <div class="mb-1.5 flex justify-between text-label-md text-surface-container-lowest"><span>پیشرفت فیزیکی</span><span>{{ faDigits(featured.progress) }}٪</span></div>
                <div class="h-1.5 rounded-pill bg-surface-container-lowest/20"><div class="h-full rounded-pill bg-brand-tint" :style="{ width: `${featured.progress}%` }" /></div>
              </div>
            </div>
          </NuxtLink>
          <ProjectTile v-for="p in featuredSide" :key="p.slug" :project="p" show-status aspect="aspect-[16/9]" class="lg:col-span-5" />
        </div>
      </div>
    </section>

    <!-- 4 — بنر فروش و پیش‌فروش -->
    <section class="relative overflow-hidden bg-primary-container">
      <img :src="ph('interior', 1)" alt="" class="absolute inset-0 size-full object-cover opacity-20 mix-blend-luminosity">
      <div class="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-space-lg py-16 md:flex-row md:items-center md:px-margin md:py-20">
        <div class="max-w-2xl text-on-primary">
          <p class="mb-2 text-label-lg text-brand-tint">فروش و پیش‌فروش</p>
          <h2 class="text-headline-lg-mobile font-headline-lg md:text-headline-lg">پیش‌فروش {{ faDigits(preSale.length) }} واحد در پروژه‌های در حال ساخت</h2>
          <p class="mt-3 text-body-md text-surface-container-lowest/80">قرارداد رسمی، پرداخت مرحله‌ای و تحویل با ضمانت‌نامه.</p>
        </div>
        <div class="flex shrink-0 flex-wrap gap-3">
          <NuxtLink to="/sales/consultation" class="inline-flex h-14 items-center rounded-pill bg-surface-container-lowest px-8 text-label-lg font-label-lg text-primary-container hover:bg-brand-tint">مشاوره خرید</NuxtLink>
          <NuxtLink to="/sales?status=pre-sale" class="inline-flex h-14 items-center rounded-pill border border-surface-container-lowest/60 px-8 text-label-lg font-label-lg text-on-primary hover:bg-surface-container-lowest/10">واحدهای پیش‌فروش</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 5 — ویجت دیده‌بان ثاخت -->
    <section class="bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="دیده‌بان ثاخت" title="نماد ثاخت و آخرین اطلاعیه">
          <NuxtLink to="/ir/financials" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">اطلاعات سرمایه‌گذاران <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <NuxtLink to="/ir/symbol" class="group rounded-lg border border-border bg-surface-container-lowest p-8 transition-colors hover:border-primary-container lg:col-span-5">
            <div class="mb-6 flex items-center justify-between">
              <span class="text-headline-sm font-headline-sm text-ink">ثاخت <span class="text-label-md text-secondary" dir="ltr">ICD1</span></span>
              <span class="rounded-pill bg-status-success/10 px-3 py-1 text-label-md font-bold text-status-success" dir="ltr">{{ change >= 0 ? '+' : '' }}{{ faNumber(change, 2) }}٪</span>
            </div>
            <p class="text-label-md text-secondary">آخرین معامله</p>
            <p class="text-headline-xl-mobile font-headline-xl text-ink">{{ faNumber(quote.last) }} <span class="text-body-md text-secondary">ریال</span></p>
            <dl class="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-body-sm">
              <div><dt class="text-secondary">قیمت پایانی</dt><dd class="font-bold text-ink">{{ faNumber(quote.close) }}</dd></div>
              <div><dt class="text-secondary">حجم معاملات</dt><dd class="font-bold text-ink">{{ faNumber(quote.volume / 1_000_000, 1) }} میلیون</dd></div>
            </dl>
            <p class="mt-5 flex items-center gap-1.5 text-label-md text-outline"><AppIcon name="schedule" />{{ IR_SYMBOL_IS_MOCK ? 'داده نمایشی' : 'به‌روز' }} · {{ snapshotDateLabel() }}</p>
          </NuxtLink>
          <NuxtLink :to="`/ir/financials/${latestDoc.slug}`" class="group flex flex-col rounded-lg border border-border bg-surface-container-lowest p-8 transition-colors hover:border-primary-container lg:col-span-7">
            <span class="mb-6 flex size-12 items-center justify-center rounded-md bg-brand-tint text-primary-container"><AppIcon name="description" /></span>
            <p class="mb-2 text-label-md text-secondary">آخرین سند منتشرشده · {{ latestDoc.date }}</p>
            <h3 class="mb-3 text-headline-sm font-headline-sm text-ink group-hover:text-primary-container">{{ latestDoc.title }}</h3>
            <p class="text-body-md text-secondary">{{ latestDoc.summary[0] }}</p>
            <span class="mt-auto flex items-center gap-2 pt-6 text-label-lg font-bold text-primary-container">مطالعه و دریافت <AppIcon name="arrow_back" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 6 — نبض ثاخت -->
    <section class="bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="رسانه ثاخت" title="نبض ثاخت">
          <NuxtLink to="/media?category=news" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">مشاهده همه اخبار <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <NuxtLink v-for="p in latestPosts" :key="p.slug" :to="`/media/${p.slug}`" class="group flex flex-col overflow-hidden rounded-md border border-border transition-colors hover:border-primary-container">
            <div class="aspect-[16/10] overflow-hidden bg-surface-alt"><img :src="p.image" :alt="p.title" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"></div>
            <div class="flex flex-1 flex-col p-6">
              <p class="mb-2 flex items-center justify-between text-label-md"><span class="font-bold text-primary-container">{{ catLabel(p.category) }}</span><span class="text-secondary">{{ p.date }}</span></p>
              <h3 class="text-body-lg font-bold leading-relaxed text-ink group-hover:text-primary-container">{{ p.title }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 7 — افتخارات و اعتماد (trust signal only, no CTA) -->
    <section class="border-y border-border bg-surface py-12">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          <li v-for="h in honors.slice(0, 6)" :key="h.title" class="flex max-w-56 items-center gap-3 text-label-md text-secondary">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-pill bg-surface-container-lowest text-primary-container ring-1 ring-border"><AppIcon name="workspace_premium" /></span>
            {{ h.title }}
          </li>
        </ul>
      </div>
    </section>

    <!-- 8 — بنر پایانی مشاوره -->
    <section class="bg-ink py-20 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-space-lg md:px-margin lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="mb-2 text-label-lg text-brand-tint">درخواست مشاوره</p>
          <h2 class="text-headline-lg-mobile font-headline-lg text-surface-container-lowest md:text-headline-lg">برای مشاوره سرمایه‌گذاری با ما در تماس باشید</h2>
          <p class="mt-3 text-body-md text-surface-dim">شماره خود را بگذارید؛ کارشناسان فروش تماس می‌گیرند.</p>
        </div>
        <div class="lg:col-span-7">
          <QuickLeadForm subject="home" tone="dark" submit-label="درخواست مشاوره" />
        </div>
      </div>
    </section>
  </div>
</template>
