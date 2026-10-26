<!--
  /sales — «فروش و پیش‌فروش». Ported from stitch_project_detail_page_template/
  sales_available/ (ADR-013), whose title is the cluster name; it is the
  sales landing (ADR-015). Units come from the catalog; `?status=` and
  `?project=` filter them, so /sales?status=pre-sale is the pre-sale list the
  former /sales/pre-sale route redirects to.
-->
<script setup lang="ts">
import { units, projects, getProject, unitStatus, type UnitStatus } from '~/utils/catalog'
import { salesNav } from '~/utils/routes'
import { faDigits } from '~/utils/format'

const route = useRoute()

const status = computed(() => {
  const s = String(route.query.status ?? '')
  return (s in unitStatus ? s : '') as UnitStatus | ''
})
const projectSlug = computed(() => String(route.query.project ?? ''))
const project = computed(() => (projectSlug.value ? getProject(projectSlug.value) : undefined))

/* Every unit the catalog carries. The six-unit sample of ADR-026 is reverted
   at the owner's instruction (ADR-027). `?project=` still narrows the list —
   that is how a project page deep-links into its own units — but the page no
   longer offers a project picker of its own. */
const list = computed(() => units.filter(u =>
  (!status.value || u.status === status.value)
  && (!projectSlug.value || u.project === projectSlug.value),
))

const representedProjects = computed(() => projects.filter(p => units.some(u => u.project === p.slug)))

const heading = computed(() => {
  if (status.value === 'pre-sale') return 'پیش‌فروش پروژه‌های در حال ساخت'
  if (status.value === 'ready') return 'واحدهای آماده تحویل'
  return 'واحدهای آماده واگذاری و سرمایه‌گذاری'
})

const stats = computed(() => [
  { label: 'واحدهای عرضه‌شده', value: `${faDigits(units.length)} واحد` },
  { label: 'پیش‌فروش', value: `${faDigits(units.filter(u => u.status === 'pre-sale').length)} واحد` },
  { label: 'آماده تحویل', value: `${faDigits(units.filter(u => u.status === 'ready').length)} واحد` },
  { label: 'پروژه‌ها', value: `${faDigits(representedProjects.value.length)} پروژه` },
])
</script>

<template>
  <div>
    <PageHero
      image="/img/projects/kia-tower-1.jpg"
      eyebrow="فروش و پیش‌فروش"
      :title="heading"
      subtitle="پیش‌فروش و تملک واحدهای تجاری، اداری و مسکونی هلدینگ ثاخت با قرارداد رسمی."
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'فروش و پیش‌فروش' }]"
    >
      <dl class="grid max-w-3xl grid-cols-2 gap-4 border-t border-surface-container-lowest/20 pt-6 sm:grid-cols-4">
        <div v-for="s in stats" :key="s.label">
          <dt class="text-label-md text-surface-dim">{{ s.label }}</dt>
          <dd class="mt-1 text-headline-sm font-headline-sm text-surface-container-lowest">{{ s.value }}</dd>
        </div>
      </dl>
    </PageHero>

    <SubNav :items="salesNav" label="بخش‌های فروش" />

    <section class="mx-auto max-w-[1440px] px-space-lg py-12 md:px-margin md:py-16">
      <div class="mb-8">
        <p class="text-body-md text-secondary">
          <strong class="text-ink">{{ faDigits(list.length) }}</strong> واحد
          <template v-if="project"> در <NuxtLink :to="`/projects/${project.slug}`" class="text-primary-container hover:underline">{{ project.name }}</NuxtLink></template>
        </p>
      </div>

      <div v-if="list.length" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UnitTile v-for="u in list" :key="u.id" :unit="u" />
      </div>
      <div v-else class="rounded-lg border border-border bg-surface p-12 text-center">
        <p class="mb-6 text-body-lg text-secondary">واحدی با این شرایط در حال حاضر عرضه نشده است.</p>
        <NuxtLink to="/sales" class="inline-flex h-11 items-center rounded-pill border border-primary-container px-6 text-label-lg text-primary-container hover:bg-brand-tint">نمایش همه واحدها</NuxtLink>
      </div>
    </section>

    <section class="border-y border-border bg-surface-alt py-12">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <div class="flex flex-col items-center justify-between gap-8 rounded-lg border border-border bg-surface-container-lowest p-8 md:p-10 lg:flex-row">
          <div class="max-w-2xl">
            <h2 class="mb-2 text-headline-md font-headline-md text-ink">شرایط اختصاصی خریداران عمده و نهادی</h2>
            <p class="text-body-md leading-relaxed text-secondary">صندوق‌های زمین و ساختمان و خریداران عمده برای بسته‌های اقساطی یا تضامین بانکی با واحد فروش مرکزی در ارتباط باشند.</p>
          </div>
          <div class="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto">
            <NuxtLink to="/sales/consultation" class="inline-flex h-12 items-center justify-center rounded-pill bg-ink px-6 text-label-lg font-label-lg text-surface-container-lowest hover:bg-ink/90">رزرو وقت کارشناسی</NuxtLink>
            <NuxtLink to="/sales/guide" class="inline-flex h-12 items-center justify-center rounded-pill border border-ink px-6 text-label-lg font-label-lg text-ink hover:bg-surface">راهنمای خرید و قرارداد</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
