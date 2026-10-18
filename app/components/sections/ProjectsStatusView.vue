<!--
  The four project status pages (/projects/upcoming, /under-construction,
  /operating, /completed). Ported from the four approved designs
  stitch_project_detail_page_template/projects_{status}/ (ADR-013), which
  shared one layout: hero, intro bar, card grid of photo + name + city, and
  — on the under-construction page — a brand note band.

  One component serves all four, reading the status's projects from the
  catalog (ADR-015), so every project appears in exactly one index and every
  card opens its own page (build checklist Phase 5).
-->
<script setup lang="ts">
import { projectStatus, projectsByStatus, type ProjectStatusKey } from '~/utils/catalog'
import { faDigits } from '~/utils/format'

const props = defineProps<{ status: ProjectStatusKey }>()

const copy: Record<ProjectStatusKey, { subtitle: string, intro: string, image: string }> = {
  'upcoming': { subtitle: 'طرح‌های مطالعاتی و در آستانه آغاز هلدینگ ثاخت', intro: 'طرح‌های در دست مطالعه و آماده آغاز', image: '/img/projects/mega-pars-tehran-2.jpg' },
  'under-construction': { subtitle: 'فرصت‌های فعال پیش‌فروش و کلان‌سازه‌های عمرانی جاری', intro: 'کلان‌پروژه‌های عمرانی فعال در سراسر کشور', image: '/img/projects/ara-tower-3.jpg' },
  'operating': { subtitle: 'مدیریت دارایی‌ها، مجتمع‌های تجاری و گردشگری فعال', intro: 'دارایی‌های در حال بهره‌برداری هلدینگ', image: '/img/projects/narenjestan-izadshahr-1.jpg' },
  'completed': { subtitle: 'کارنامه اجرایی و نمادهای تحویل‌شده معماری ملی', intro: 'پروژه‌های تحویل قطعی‌شده', image: '/img/projects/tehran-international-tower-6.jpg' },
}

const list = computed(() => projectsByStatus(props.status))
const meta = computed(() => projectStatus[props.status])
const others = computed(() => (Object.keys(projectStatus) as ProjectStatusKey[]).filter(k => k !== props.status))
</script>

<template>
  <div>
    <PageHero
      :image="copy[status].image"
      :title="meta.label"
      :subtitle="copy[status].subtitle"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'پروژه‌ها', href: '/projects' }, { label: meta.short }]"
    />

    <!-- Intro bar -->
    <div class="border-b border-border bg-surface">
      <div class="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-space-lg py-4 md:px-margin">
        <span class="flex items-center gap-3 text-label-lg font-label-lg text-ink">
          <span class="size-2.5 rounded-pill bg-primary-container" />{{ copy[status].intro }}
        </span>
        <div class="flex items-center gap-2">
          <span class="text-label-md text-secondary">{{ faDigits(list.length) }} پروژه</span>
          <span class="mx-2 h-4 w-px bg-border" />
          <NuxtLink
            v-for="k in others"
            :key="k"
            :to="projectStatus[k].href"
            class="hidden rounded-pill px-3 py-1 text-label-md text-secondary transition-colors hover:bg-surface-container-lowest hover:text-primary-container md:inline-flex"
          >{{ projectStatus[k].short }}</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Grid -->
    <section class="bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <div v-if="list.length" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProjectTile
            v-for="p in list"
            :key="p.slug"
            :project="p"
            show-company
            :show-progress="status === 'under-construction'"
          />
        </div>
        <div v-else class="rounded-lg border border-border bg-surface p-12 text-center">
          <p class="text-body-lg text-secondary">در حال حاضر پروژه‌ای در این دسته ثبت نشده است.</p>
        </div>
      </div>
    </section>

    <!-- Brand note band (under-construction design) -->
    <section v-if="status === 'under-construction'" class="border-y border-border bg-surface py-12 md:py-16">
      <div class="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-space-lg md:flex-row md:items-center md:px-margin">
        <div>
          <h2 class="mb-2 text-headline-sm font-headline-sm text-ink">پیش‌فروش واحدهای این پروژه‌ها</h2>
          <p class="max-w-2xl text-body-sm text-secondary">واحدهای قابل پیش‌فروش پروژه‌های در حال ساخت با قرارداد رسمی و جدول پرداخت مرحله‌ای.</p>
        </div>
        <NuxtLink to="/sales?status=pre-sale" class="inline-flex h-12 items-center gap-2 rounded-pill bg-primary-container px-6 text-label-lg font-label-lg text-on-primary transition-colors hover:bg-brand-hover">
          مشاهده واحدهای پیش‌فروش <AppIcon name="arrow_back" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
