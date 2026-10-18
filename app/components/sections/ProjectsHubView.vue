<!--
  /projects — ported from stitch_project_detail_page_template/projects/
  (ADR-013), wired to the catalog (ADR-015): the map pins, counts and the
  four status tiles all come from app/utils/catalog.ts.
-->
<script setup lang="ts">
import { projects, projectStatus, projectsByStatus, type ProjectStatusKey } from '~/utils/catalog'
import { faDigits } from '~/utils/format'

const cities = computed(() => {
  const by = new Map<string, { city: string, n: number, x: number, y: number, flagship: boolean }>()
  for (const p of projects) {
    const c = by.get(p.city) ?? { city: p.city, n: 0, x: 0, y: 0, flagship: false }
    c.x = (c.x * c.n + p.map.x) / (c.n + 1)
    c.y = (c.y * c.n + p.map.y) / (c.n + 1)
    c.n += 1
    c.flagship ||= !!p.featured
    by.set(p.city, c)
  }
  return [...by.values()].sort((a, b) => b.n - a.n)
})

const tiles: { key: ProjectStatusKey, sub: string, cta: string, image: string }[] = [
  { key: 'under-construction', sub: 'عملیات عمرانی جاری و توسعه فعال', cta: 'ورود به فهرست کارگاه‌ها', image: '/img/projects/nbo12-1.jpg' },
  { key: 'upcoming', sub: 'طرح‌های در دست مطالعه و آماده آغاز', cta: 'ورود به طرح‌های آتی', image: '/img/projects/mega-pars-tehran-2.jpg' },
  { key: 'operating', sub: 'مدیریت دارایی و بهره‌برداری پایدار', cta: 'مشاهده دارایی‌های فعال', image: '/img/projects/narenjestan-izadshahr-1.jpg' },
  { key: 'completed', sub: 'کارنامه اجرایی و تحویل قطعی', cta: 'مرور کارنامه تحویل‌شده', image: '/img/projects/tehran-international-tower-6.jpg' },
]

const featured = computed(() => projects.filter(p => p.featured).concat(projects.filter(p => !p.featured && p.status === 'under-construction')).slice(0, 3))
</script>

<template>
  <div>
    <PageHero
      size="lg"
      image="/img/projects/tehran-international-tower-1.jpg"
      title="پروژه‌ها و کارنامه ساختمانی"
      subtitle="نمادهای معماری پایدار و کلان‌سازه‌های مهندسی ایران"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'پروژه‌ها' }]"
    />

    <!-- Map explorer -->
    <section class="border-b border-border bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="نقشه پروژه‌ها" title="کاوشگر جغرافیایی پروژه‌ها" :aside="`${faDigits(projects.length)} پروژه در ${faDigits(cities.length)} شهر`">
          <NuxtLink to="/projects/map" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg font-label-lg text-primary-container hover:bg-brand-tint">
            نقشه کامل <AppIcon name="arrow_back" />
          </NuxtLink>
        </SectionHead>
        <div class="relative h-[460px] w-full overflow-hidden rounded-lg bg-[#10222F] md:h-[560px]">
          <svg class="absolute inset-0 size-full opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 560" aria-hidden="true">
            <path d="M0 180Q250 140 500 210T1000 160M0 380Q320 410 650 340T1000 420" fill="none" stroke="#264559" stroke-dasharray="6 4" stroke-width="1.5" />
            <polygon fill="rgba(4,28,44,.5)" points="180,40 340,20 520,50 780,90 900,250 800,500 600,540 380,500 210,400 120,240" stroke="#2c5470" stroke-width="2" />
          </svg>
          <NuxtLink
            v-for="c in cities"
            :key="c.city"
            to="/projects/map"
            class="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            :style="{ left: `${c.x}%`, top: `${c.y}%` }"
            :aria-label="`${c.city}: ${faDigits(c.n)} پروژه`"
          >
            <span class="relative flex items-center justify-center">
              <span v-if="c.flagship" class="absolute size-8 animate-ping rounded-pill bg-primary-container/30" />
              <span class="size-3.5 rounded-pill border-2 border-surface-container-lowest" :class="c.flagship ? 'bg-primary-container' : 'bg-brand-tint'" />
            </span>
            <span class="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs bg-ink px-2.5 py-1 text-label-md text-surface-container-lowest ring-1 ring-surface-container-lowest/20 transition-colors group-hover:bg-primary-container">
              {{ c.city }} ({{ faDigits(c.n) }})
            </span>
          </NuxtLink>
          <div class="absolute bottom-5 right-5 z-10 hidden items-center gap-4 rounded-sm bg-ink/90 px-4 py-2.5 text-label-md text-surface-container-lowest sm:flex">
            <span class="flex items-center gap-2"><span class="size-2.5 rounded-pill bg-primary-container" />پروژه شاخص</span>
            <span class="flex items-center gap-2"><span class="size-2.5 rounded-pill bg-brand-tint" />سایر پروژه‌ها</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Four status tiles -->
    <section class="bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="طبقه‌بندی پرتفوی" title="وضعیت پروژه‌ها" aside="از طراحی مفهومی تا تحویل و بهره‌برداری" />
        <div class="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <NuxtLink
            v-for="t in tiles"
            :key="t.key"
            :to="projectStatus[t.key].href"
            class="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-ink"
          >
            <img :src="t.image" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/5" />
            <StatusPill :status="t.key" class="absolute left-6 top-6" />
            <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div class="border-r-2 border-surface-container-lowest pr-4 transition-colors group-hover:border-primary-container">
                <h3 class="mb-1 text-headline-md font-headline-md text-surface-container-lowest">{{ projectStatus[t.key].label }}</h3>
                <p class="text-body-md text-surface-alt">{{ t.sub }}</p>
              </div>
              <div class="mt-5 flex items-center justify-between border-t border-surface-container-lowest/20 pt-4 text-surface-container-lowest">
                <span class="text-label-md text-brand-tint group-hover:underline">{{ t.cta }}</span>
                <span class="flex items-center gap-2 text-label-md">{{ faDigits(projectsByStatus(t.key).length) }} پروژه <AppIcon name="arrow_back" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section class="border-t border-border bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="منتخب" title="پروژه‌های شاخص" />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ProjectTile v-for="p in featured" :key="p.slug" :project="p" show-status show-company />
        </div>
      </div>
    </section>
  </div>
</template>
