<script setup lang="ts">
// Homepage — nine blocks. Block order is sitemap §3.1, with «رسانه ثاخت»
// moved from block 6 to block 2 at the owner's request (ADR-025): do not
// reorder further without approval. Built in the approved Stitch visual language (no Stitch design
// existed for the home page) and fed from the same catalog as every other
// page (ADR-015), so a card here always opens the page it names.
import { subsidiaries, projects } from '~/utils/catalog'
import { posts } from '~/utils/posts'
import { irDocuments } from '~/utils/irDocuments'
import { aboutHonors } from '~/utils/aboutPageData'
import { quote, IR_SYMBOL_IS_MOCK, snapshotDateLabel } from '~/utils/irSymbolData'
import { mediaCategories } from '~/utils/routes'
import { faDigits, faNumber } from '~/utils/format'

useSeoMeta({
  title: 'هلدینگ ساختمانی ثاخت — شرکت بین‌المللی توسعه ساختمان',
  description: 'هلدینگ ساخت‌وساز و املاک پذیرفته‌شده در بورس تهران؛ پروژه‌ها، فروش و پیش‌فروش، دیده‌بان سهامداران و رسانه ثاخت.',
})

const totalArea = projects.reduce((s, p) => s + (p.areaSqm ?? 0), 0)
const stats = [
  { value: '۱۳۶۴', label: 'سال تاسیس' },
  { value: `${faNumber(Math.round(totalArea / 1000))} هزار`, label: 'مترمربع زیربنا' },
  { value: faDigits(projects.length), label: 'پروژه' },
  { value: '۸۲٬۳۰۸', label: 'میلیارد ریال سرمایه ثبتی' },
]

const featured = projects.find(p => p.featured)!
const featuredSide = projects.filter(p => p.slug !== featured.slug && (p.featured || p.status === 'under-construction')).slice(0, 2)
/*
 * Media. Tender notices are informational filings rather than editorial
 * (ADR-009), so they are out of the homepage feed; the lead carries the
 * photograph and the next four run beside it as rows.
 */
const editorial = posts.filter(p => p.category !== 'tenders')
const editorialCount = editorial.length
const leadPost = editorial[0]
const sidePosts = editorial.slice(1, 5)
const latestDoc = [...irDocuments].sort((a, b) => b.sortKey - a.sortKey)[0]!
const change = ((quote.last - quote.prevClose) / quote.prevClose) * 100
const catLabel = (c: string) => mediaCategories.find(m => m.value === c)?.label ?? ''
</script>

<template>
  <div>
    <!-- 0 — Hero: the client's film, scrubbed by pointer travel (ADR-017).
         Replaces the static fallback; the 3D scene of ADR-003 is retired,
         because this is the real footage the fallback stood in for. -->
    <HeroFilm />

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

    <!--
      2 — رسانه ثاخت. Moved up from block 6 at the owner's request (ADR-025)
      and rebuilt: one lead story carrying the photograph, with the next four
      as compact rows beside it. The old block was three equal cards, which
      gave a forty-word announcement the same weight as a long interview and
      left the reader nothing to look at first.
    -->
    <section class="border-b border-border bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="رسانه ثاخت" title="تازه‌ترین مطالب و اخبار" :aside="`${faDigits(editorialCount)} مطلب در آرشیو رسانه`">
          <NuxtLink to="/media" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">آرشیو رسانه <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>

        <div class="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <!-- the lead story -->
          <NuxtLink
            v-if="leadPost"
            :to="`/media/${leadPost.slug}`"
            class="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg bg-ink lg:col-span-7 lg:min-h-[520px]"
          >
            <img
              :src="leadPost.image"
              :alt="leadPost.title"
              class="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/5" />
            <div class="relative p-7 md:p-10">
              <p class="mb-4 flex flex-wrap items-center gap-3 text-label-md">
                <span class="rounded-pill bg-brand-tint px-3 py-1 font-label-lg text-primary-container">{{ catLabel(leadPost.category) }}</span>
                <span class="text-surface-dim">{{ leadPost.date }}</span>
                <span class="text-surface-dim">· {{ faDigits(leadPost.readingMinutes) }} دقیقه مطالعه</span>
              </p>
              <h3 class="mb-4 max-w-2xl text-headline-md font-headline-md leading-snug text-surface-container-lowest md:text-headline-lg">{{ leadPost.title }}</h3>
              <p class="mb-6 max-w-xl text-body-md leading-relaxed text-surface-dim">{{ leadPost.excerpt }}</p>
              <span class="inline-flex items-center gap-2 text-label-lg font-label-lg text-brand-tint">
                ادامه مطلب <AppIcon name="arrow_back" class="transition-transform group-hover:-translate-x-1" />
              </span>
            </div>
          </NuxtLink>

          <!-- the next four, as rows -->
          <ul class="flex flex-col divide-y divide-border lg:col-span-5">
            <li v-for="p in sidePosts" :key="p.slug">
              <NuxtLink :to="`/media/${p.slug}`" class="group flex items-start gap-5 py-5 first:pt-0">
                <div class="size-24 shrink-0 overflow-hidden rounded-md bg-surface-alt md:size-28">
                  <img :src="p.image" :alt="p.title" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.06]">
                </div>
                <div class="min-w-0">
                  <p class="mb-1.5 flex flex-wrap items-center gap-2 text-label-md">
                    <span class="font-label-lg text-primary-container">{{ catLabel(p.category) }}</span>
                    <span class="text-secondary">{{ p.date }}</span>
                  </p>
                  <h3 class="text-body-md font-bold leading-relaxed text-ink transition-colors group-hover:text-primary-container md:text-body-lg">{{ p.title }}</h3>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- the categories, as a way in rather than a filter bar -->
        <ul class="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
          <li v-for="c in mediaCategories" :key="c.value">
            <NuxtLink
              :to="`/media?category=${c.value}`"
              class="inline-flex h-10 items-center rounded-pill border border-border px-5 text-label-lg text-secondary transition-colors hover:border-primary-container hover:text-primary-container"
            >{{ c.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- 3 — خانواده ثاخت (before projects, ADR-011) -->
    <section class="bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="خانواده ثاخت" title="شرکت‌های تابعه در یک زنجیره">
          <NuxtLink to="/companies" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">همه شرکت‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <ul class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <li v-for="c in subsidiaries" :key="c.slug">
            <NuxtLink :to="`/companies/${c.slug}`" class="group flex h-40 flex-col items-center justify-center rounded-lg border border-border bg-surface-container-lowest p-4 text-center transition-colors hover:border-primary-container md:h-48">
              <CompanyMark :company="c" :size="84" />
              <span class="mt-3 text-label-md text-secondary">{{ c.name }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- 4 — پروژه‌های شاخص -->
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

    <!-- 5 — بنر فروش و پیش‌فروش -->
    <!--
      Flat brand blue, no photograph (owner's request, 2026-10-18). The count
      is gone from the heading too: the workbook marks every unit `ready`, so
      it rendered as «پیش‌فروش ۰ واحد» — a banner advertising nothing.
    -->
    <section class="bg-primary-container">
      <div class="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-8 px-space-lg py-16 md:flex-row md:items-center md:px-margin md:py-20">
        <div class="max-w-2xl text-on-primary">
          <p class="mb-2 text-label-lg text-brand-tint">فروش و پیش‌فروش</p>
          <h2 class="text-headline-lg-mobile font-headline-lg md:text-headline-lg">پیش‌فروش واحدها در پروژه‌های در حال ساخت</h2>
          <p class="mt-3 text-body-md text-surface-container-lowest/80">قرارداد رسمی، پرداخت مرحله‌ای و تحویل با ضمانت‌نامه.</p>
        </div>
        <div class="flex shrink-0 flex-wrap gap-3">
          <NuxtLink to="/sales/consultation" class="inline-flex h-14 items-center rounded-pill bg-surface-container-lowest px-8 text-label-lg font-label-lg text-primary-container hover:bg-brand-tint">مشاوره خرید</NuxtLink>
          <NuxtLink to="/sales?status=pre-sale" class="inline-flex h-14 items-center rounded-pill border border-surface-container-lowest/60 px-8 text-label-lg font-label-lg text-on-primary hover:bg-surface-container-lowest/10">واحدهای پیش‌فروش</NuxtLink>
        </div>
      </div>
    </section>

    <!-- 6 — ویجت دیده‌بان ثاخت -->
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

    <!--
      7 — افتخارات. The same three award objects as /about#history.
      `honorsData.ts`'s titles are invented placeholders, so the objects are
      shown without captions (ADR-018).

      Background redesigned 2026-10-18: the objects used to sit on the same
      flat grey as the section above them and read as three bits of clip art.
      They now sit on an ink band with a soft brand-blue wash and a sparse dot
      field — the awards are gold, brass and navy, and a dark ground is what
      actually makes those read. Each one gets a lit plinth rather than a
      bordered box. Trust signal only — no CTA, per sitemap §3.1 block 7.
    -->
    <section class="honors-band relative overflow-hidden bg-ink py-20 md:py-24">
      <div class="relative mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <div class="mb-12 flex flex-col items-center gap-3 text-center">
          <span class="inline-flex items-center gap-2 rounded-pill border border-surface-container-lowest/20 bg-surface-container-lowest/5 px-4 py-1.5 text-label-md text-brand-tint">
            <AppIcon name="workspace_premium" />افتخارات
          </span>
          <p class="max-w-xl text-body-md text-surface-dim">گواهینامه‌ها و تندیس‌های دریافتی گروه</p>
        </div>
        <ul class="mx-auto grid max-w-4xl grid-cols-3 gap-5 md:gap-10">
          <li
            v-for="h in aboutHonors"
            :key="h.id"
            class="honors-plinth group relative flex items-end justify-center rounded-lg p-6 md:p-8"
          >
            <img
              :src="h.image.src"
              :alt="h.image.alt"
              loading="lazy"
              class="relative h-32 w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1.5 md:h-48"
            >
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

<style scoped>
/*
  The achievements band. Three layers, all painted: a brand wash that lifts
  the centre off the ink, a sparse dot field for texture, and a lit plinth
  under each object so it reads as standing on something rather than floating.
  No image is loaded for any of it.
*/
.honors-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--color-primary) 38%, transparent) 0%, transparent 62%),
    radial-gradient(50% 90% at 50% 110%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 70%);
  pointer-events: none;
}

.honors-band::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgb(255 255 255 / 13%) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(75% 75% at 50% 50%, #000 20%, transparent 78%);
  pointer-events: none;
}

.honors-plinth {
  min-block-size: 190px;
  background: linear-gradient(to top, rgb(255 255 255 / 10%), rgb(255 255 255 / 3%));
  border: 1px solid rgb(255 255 255 / 10%);
  transition: background 400ms ease, border-color 400ms ease;
}

.honors-plinth::after {
  /* the pool of light the object stands in */
  content: '';
  position: absolute;
  inset-inline: 18%;
  inset-block-end: 10px;
  block-size: 10px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(255 255 255 / 28%), transparent);
}

.honors-plinth:hover {
  background: linear-gradient(to top, rgb(255 255 255 / 16%), rgb(255 255 255 / 5%));
  border-color: color-mix(in srgb, var(--color-tint) 45%, transparent);
}

@media (min-width: 768px) {
  .honors-plinth { min-block-size: 280px; }
}

@media (prefers-reduced-motion: reduce) {
  .honors-plinth img { transition: none; }
}
</style>
