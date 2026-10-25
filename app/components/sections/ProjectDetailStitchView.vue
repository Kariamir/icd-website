<!--
  /projects/[slug] — ported from stitch_project_detail_page_template/
  03_project_detail/ (ADR-013) and driven by the catalog (ADR-015): every
  project renders its own name, status, specs, owner company, units for sale
  and related projects. The design's tab script is reimplemented in Vue.
-->
<script setup lang="ts">
import { getCompany, projectStatus, relatedProjects, unitsByProject, priceLabel, unitStatus, type Project } from '~/utils/catalog'
import { ph } from '~/utils/media'
import { faArea, faDigits, faNumber } from '~/utils/format'
import type { IconName } from '~/utils/icons'

const props = defineProps<{ project: Project }>()

const company = computed(() => getCompany(props.project.company)!)
const units = computed(() => unitsByProject(props.project.slug))
const related = computed(() => relatedProjects(props.project.slug, 3))
const status = computed(() => projectStatus[props.project.status])
const isSelling = computed(() => props.project.status === 'under-construction' || props.project.status === 'upcoming')

const yearLabel = computed(() => {
  if (props.project.year == null) return null
  const y = faDigits(props.project.year)
  return { 'upcoming': `آغاز ${y}`, 'under-construction': `آغاز ساخت ${y}`, 'operating': `بهره‌برداری از ${y}`, 'completed': `تحویل ${y}` }[props.project.status]
})

type Tab = 'arch' | 'structure' | 'geo' | 'units'
const tab = ref<Tab>('arch')
const tabs: { key: Tab, label: string, icon: IconName }[] = [
  { key: 'arch', label: 'معماری و کاربری', icon: 'apartment' },
  { key: 'structure', label: 'سازه و فناوری ساخت', icon: 'engineering' },
  { key: 'geo', label: 'موقعیت و ابعاد', icon: 'straighten' },
  { key: 'units', label: 'ظرفیت و واحدها', icon: 'domain' },
]

/*
 * Rows whose value the catalog does not carry are dropped, not printed as a
 * zero — and the structural rows derived from floor count and area go with
 * them, because a "system" inferred from a missing number is a guess wearing
 * a specification's clothes (ADR-024).
 */
const row = (label: string, value: string | null | undefined): [string, string][] =>
  value == null ? [] : [[label, value]]

const specs = computed<Record<Tab, [string, string][]>>(() => {
  const p = props.project
  return {
    arch: [
      ['کاربری اصلی', p.usage],
      ['وضعیت پروژه', status.value.short],
      ...row('تعداد طبقات', p.floors != null ? `${faDigits(p.floors)} طبقه` : null),
      ...row('زیربنای ناخالص', p.areaSqm != null ? faArea(p.areaSqm) : null),
      ...row('زمان‌بندی', yearLabel.value),
      ['شرکت مالک و مجری', company.value.name],
    ],
    structure: [
      ...row('سیستم سازه‌ای', p.floors == null ? null : p.floors > 15 ? 'قاب خمشی بتنی با هسته مرکزی صلب' : 'قاب بتن‌آرمه با دیوار برشی'),
      ['طراحی لرزه‌ای', 'بر پایه عملکرد، مطابق ویرایش چهارم ۲۸۰۰'],
      ...row('سقف‌ها', p.areaSqm == null ? null : p.areaSqm > 30000 ? 'دال پس‌کشیده (Post-Tensioned)' : 'دال بتنی دوطرفه'),
      ...row('پی', p.floors == null ? null : p.floors > 15 ? 'رادیه ژنرال با شمع‌های عمیق' : 'رادیه ژنرال'),
      ['نظارت و کنترل کیفیت', 'شرکت خدمات مهندسی ایران (IEC)'],
      ['طراحی', 'مهندسان مشاور رهشهر'],
    ],
    geo: [
      ['شهر', p.city],
      ['محدوده', p.district],
      ...row('زیربنای کل', p.areaSqm != null ? faArea(p.areaSqm) : null),
      ...row('ارتفاع تقریبی', p.floors != null ? `${faDigits(Math.round(p.floors * 3.4))} متر` : null),
    ],
    units: [
      ['تعداد واحدها', p.units ? `${faNumber(p.units)} واحد` : 'بدون واحد قابل واگذاری'],
      ['واحدهای عرضه‌شده در سایت', `${faDigits(units.value.length)} واحد`],
      ['شرایط واگذاری', isSelling.value ? 'پیش‌فروش با قرارداد رسمی' : 'فروش قطعی / اجاره'],
      ['پارکینگ', p.units ? `${faNumber(Math.round(p.units * 1.3))} جای پارک` : '—'],
    ],
  }
})

const gallery = computed(() => [
  { src: props.project.image, cap: 'نمای اصلی پروژه', span: 'md:col-span-8', ratio: 'aspect-[16/10]' },
  { src: ph('interior', 1), cap: 'لابی و فضاهای مشاع', span: 'md:col-span-4', ratio: 'aspect-[4/3] md:aspect-[3/4]' },
  { src: ph(props.project.status === 'under-construction' ? 'construction' : 'aerial', 1), cap: props.project.status === 'under-construction' ? 'وضعیت کارگاه' : 'نمای هوایی سایت', span: 'md:col-span-7', ratio: 'aspect-[16/9]' },
  { src: ph('blueprint', 2), cap: 'پلان تیپ طبقات', span: 'md:col-span-5', ratio: 'aspect-[4/3]' },
])
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex min-h-[560px] w-full items-end overflow-hidden bg-ink md:min-h-[680px]">
      <img :src="project.image" :alt="project.name" class="absolute inset-0 size-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div class="relative z-10 mx-auto w-full max-w-[1440px] px-space-lg pb-14 md:px-margin md:pb-20">
        <nav aria-label="مسیر صفحه" class="mb-5">
          <ol class="flex flex-wrap items-center gap-2 text-label-md text-surface-dim">
            <li class="flex items-center gap-2"><NuxtLink to="/" class="hover:text-surface-container-lowest">صفحه اصلی</NuxtLink><AppIcon name="chevron_left" class="text-outline" /></li>
            <li class="flex items-center gap-2"><NuxtLink to="/projects" class="hover:text-surface-container-lowest">پروژه‌ها</NuxtLink><AppIcon name="chevron_left" class="text-outline" /></li>
            <li><NuxtLink :to="status.href" class="hover:text-surface-container-lowest">{{ status.short }}</NuxtLink></li>
          </ol>
        </nav>
        <StatusPill :status="project.status" class="mb-4" />
        <h1 class="mb-3 text-headline-xl-mobile font-headline-xl text-surface-container-lowest md:text-headline-xl">{{ project.name }}</h1>
        <p class="max-w-2xl text-headline-sm font-headline-sm font-medium text-brand-tint">{{ project.excerpt }}</p>
        <div class="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-surface-container-lowest/20 pt-6 text-surface-container-lowest">
          <div><span class="block text-label-md text-surface-dim">موقعیت</span><span class="text-body-lg font-bold">{{ project.city }}، {{ project.district }}</span></div>
          <div v-if="project.areaSqm != null"><span class="block text-label-md text-surface-dim">زیربنا</span><span class="text-body-lg font-bold">{{ faArea(project.areaSqm) }}</span></div>
          <div v-if="project.floors != null"><span class="block text-label-md text-surface-dim">طبقات</span><span class="text-body-lg font-bold">{{ faDigits(project.floors) }}</span></div>
          <div v-if="project.progress != null" class="min-w-48">
            <span class="block text-label-md text-surface-dim">پیشرفت فیزیکی {{ faDigits(project.progress) }}٪</span>
            <span class="mt-2 block h-1.5 overflow-hidden rounded-pill bg-surface-container-lowest/20"><span class="block h-full rounded-pill bg-brand-tint" :style="{ width: `${project.progress}%` }" /></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Specs -->
    <section class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <SectionHead eyebrow="شناسنامه مهندسی" title="مشخصات فنی" />
      <div class="flex gap-1 overflow-x-auto rounded-md bg-surface p-1 [scrollbar-width:none]" role="tablist" aria-label="مشخصات فنی">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          role="tab"
          :aria-selected="tab === t.key"
          class="flex shrink-0 items-center gap-2 rounded-sm px-5 py-3 text-label-lg font-label-lg transition-colors"
          :class="tab === t.key ? 'bg-primary-container text-on-primary' : 'text-secondary hover:bg-surface-container-lowest hover:text-ink'"
          @click="tab = t.key"
        >
          <AppIcon :name="t.icon" />{{ t.label }}
        </button>
      </div>
      <div class="mt-4 grid grid-cols-1 gap-x-12 rounded-md border border-border p-4 md:grid-cols-2 md:p-8" role="tabpanel">
        <div v-for="[k, v] in specs[tab]" :key="k" class="flex items-center justify-between gap-6 border-b border-border/60 px-2 py-4">
          <span class="text-body-md text-secondary">{{ k }}</span>
          <span class="text-left text-body-md font-bold text-ink">{{ v }}</span>
        </div>
      </div>
      <p class="mt-3 text-label-md text-outline">مقادیر نمونه‌اند و با داده رسمی پروژه جایگزین می‌شوند.</p>
    </section>

    <!-- Units for sale -->
    <section v-if="units.length" class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <SectionHead eyebrow="فروش و پیش‌فروش" title="واحدهای قابل واگذاری">
        <NuxtLink :to="`/sales?project=${project.slug}`" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">همه واحدها <AppIcon name="arrow_back" /></NuxtLink>
      </SectionHead>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink v-for="u in units" :key="u.id" :to="`/sales/units/${u.id}`" class="group flex items-center gap-4 rounded-md border border-border p-4 transition-colors hover:border-primary-container">
          <img :src="u.image" alt="" class="size-20 shrink-0 rounded-sm object-cover">
          <div class="min-w-0 flex-1">
            <p class="truncate text-body-md font-bold text-ink group-hover:text-primary-container">{{ u.title }}</p>
            <p class="text-label-md text-secondary">{{ faArea(u.areaSqm) }} · طبقه {{ faDigits(u.floor) }} · {{ unitStatus[u.status] }}</p>
            <p class="mt-1 text-label-lg font-bold text-ink">{{ priceLabel(u.price) }}</p>
          </div>
          <AppIcon name="chevron_left" class="text-outline" />
        </NuxtLink>
      </div>
    </section>

    <!-- Gallery -->
    <section class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <SectionHead eyebrow="گالری" title="روایت بصری پروژه" />
      <div class="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
        <figure v-for="(g, i) in gallery" :key="i" class="m-0" :class="[g.span, i > 1 && 'md:mt-2']">
          <div class="w-full overflow-hidden rounded-md bg-surface-alt" :class="g.ratio">
            <img :src="g.src" alt="" loading="lazy" class="size-full object-cover transition-transform duration-500 hover:scale-[1.02]">
          </div>
          <figcaption class="mt-3 border-r-2 border-primary-container pr-3 text-label-lg text-secondary">{{ g.cap }}</figcaption>
        </figure>
      </div>
    </section>

    <!-- Location -->
    <section class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <SectionHead eyebrow="موقعیت" :title="`${project.city}، ${project.district}`" />
      <div class="relative h-[380px] w-full overflow-hidden rounded-lg md:h-[440px]">
        <img :src="ph('aerial', 1)" alt="" class="size-full object-cover">
        <div class="absolute bottom-5 right-5 max-w-sm rounded-md bg-surface-container-lowest p-6">
          <p class="mb-2 flex items-center gap-2 text-label-lg font-bold text-ink"><AppIcon name="location_on" class="text-primary-container" />نشانی پروژه</p>
          <p class="text-body-sm leading-relaxed text-secondary">{{ project.city }}، {{ project.district }} — نشانی دقیق پس از تایید واحد فروش درج می‌شود.</p>
        </div>
      </div>
    </section>

    <!-- Owner company (ADR-011: project → company) -->
    <section class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <NuxtLink :to="`/companies/${company.slug}`" class="group flex flex-col justify-between gap-6 rounded-lg border border-border bg-surface p-6 transition-colors hover:border-primary-container md:flex-row md:items-center md:p-8">
        <div class="flex items-center gap-5">
          <span class="flex size-16 shrink-0 items-center justify-center rounded-md bg-ink px-2 text-center text-label-lg font-extrabold text-surface-container-lowest">{{ company.mark }}</span>
          <div>
            <p class="text-label-md text-secondary">شرکت مالک و مجری</p>
            <h2 class="text-headline-sm font-headline-sm text-ink">{{ company.name }}</h2>
            <p class="mt-1 text-body-sm text-secondary">{{ company.specialty }}</p>
          </div>
        </div>
        <span class="inline-flex items-center gap-2 text-label-lg font-bold text-primary-container">مشاهده شرکت و پروژه‌های آن <AppIcon name="arrow_back" class="transition-transform group-hover:-translate-x-1" /></span>
      </NuxtLink>
    </section>

    <!-- Related -->
    <section v-if="related.length" class="mx-auto w-full max-w-[1440px] px-space-lg pt-20 md:px-margin md:pt-[120px]">
      <SectionHead eyebrow="پروژه‌های مرتبط" title="ادامه کارنامه" />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ProjectTile v-for="p in related" :key="p.slug" :project="p" show-status />
      </div>
    </section>

    <!-- CTA -->
    <section id="inquiry" class="mx-auto w-full max-w-[1440px] px-space-lg py-20 md:px-margin md:py-[120px]">
      <div class="flex flex-col justify-between gap-8 rounded-lg border-r-8 border-primary-container bg-ink p-8 text-surface-container-lowest md:p-14 lg:flex-row lg:items-center">
        <div class="max-w-2xl">
          <h2 class="mb-3 text-headline-lg-mobile font-headline-lg md:text-headline-lg">{{ isSelling ? 'پیش‌فروش و استعلام واحدها' : 'مشاوره خرید و سرمایه‌گذاری' }}</h2>
          <p class="text-body-md leading-relaxed text-surface-dim">برای بازدید، بررسی مدارک و شرایط پرداخت {{ project.name }} با واحد فروش هلدینگ در تماس باشید.</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <NuxtLink
            :to="units.length ? `/sales?project=${project.slug}` : '/sales/consultation'"
            class="inline-flex h-12 items-center justify-center rounded-pill bg-primary-container px-8 text-label-lg font-label-lg text-on-primary transition-colors hover:bg-brand-hover"
          >{{ units.length ? 'واحدهای این پروژه' : 'درخواست مشاوره' }}</NuxtLink>
          <NuxtLink to="/sales/consultation" class="inline-flex h-12 items-center justify-center rounded-pill border border-surface-dim px-6 text-label-lg text-surface-container-lowest transition-colors hover:bg-surface-container-lowest hover:text-ink">
            رزرو بازدید
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
