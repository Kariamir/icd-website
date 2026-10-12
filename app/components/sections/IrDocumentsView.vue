<!--
  /ir/financials — «اسناد و گزارش‌ها», the IR landing. Ported from
  stitch_project_detail_page_template/ir_financials/ (ADR-013).

  IR is exempt from the image-led style (ADR-008): plain band, dense lists.
  Order, per sitemap §7.1–7.2: the six required disclosures, the annual
  financial tables, then the archive of every official document, filterable
  by `?group=`, `?year=` and a title search (ADR-009).
-->
<script setup lang="ts">
import { documentGroups, irNav, type DocumentGroup } from '~/utils/routes'
import { irDocuments, PLACEHOLDER_FILE } from '~/utils/irDocuments'
import { faDigits } from '~/utils/format'
import type { IconName } from '~/utils/icons'

const route = useRoute()
const router = useRouter()

const group = computed(() => {
  const g = String(route.query.group ?? '')
  return (documentGroups.some(d => d.value === g) ? g : '') as DocumentGroup | ''
})
const year = computed(() => Number(route.query.year) || 0)
const q = ref(String(route.query.q ?? ''))
const years = [...new Set(irDocuments.map(d => d.year))].sort((a, b) => b - a)

const list = computed(() => irDocuments
  .filter(d => (!group.value || d.group === group.value) && (!year.value || d.year === year.value) && (!q.value.trim() || d.title.includes(q.value.trim())))
  .sort((a, b) => b.sortKey - a.sortKey))

function setFilter(key: 'group' | 'year', value: string | number) {
  router.replace({ query: { ...route.query, [key]: value || undefined }, hash: '#documents-archive' })
}

const groupLabel = (g: DocumentGroup) => documentGroups.find(d => d.value === g)?.label ?? ''

const pillars: { group: DocumentGroup | 'shareholders', icon: IconName, title: string, text: string }[] = [
  { group: 'statements', icon: 'picture_as_pdf', title: 'صورت‌های مالی حسابرسی‌شده', text: 'صورت‌های مالی اساسی با یادداشت‌ها و گزارش حسابرس.' },
  { group: 'mda', icon: 'analytics', title: 'گزارش تفسیری مدیریت', text: 'تحلیل مدیریت از عملکرد، ریسک‌ها و بودجه سال آتی.' },
  { group: 'board-reports', icon: 'assignment', title: 'گزارش فعالیت هیات‌مدیره', text: 'گزارش سالانه هیات‌مدیره به مجمع عمومی.' },
  { group: 'sustainability', icon: 'health_and_safety', title: 'گزارش پایداری', text: 'عملکرد زیست‌محیطی، اجتماعی و حاکمیتی گروه.' },
  { group: 'committee-reports', icon: 'verified_user', title: 'گزارش کمیته‌های تخصصی', text: 'کمیته‌های حسابرسی، ریسک و انتصابات.' },
  { group: 'shareholders', icon: 'groups', title: 'ترکیب سهامداران و سهام شناور', text: 'سهامداران بالای یک درصد و ضریب شناوری آزاد.' },
]

function latest(g: DocumentGroup | 'shareholders') {
  return g === 'shareholders' ? undefined : irDocuments.filter(d => d.group === g).sort((a, b) => b.sortKey - a.sortKey)[0]
}
</script>

<template>
  <div>
    <PageHero
      plain
      eyebrow="دیده‌بان ثاخت · سال مالی ۱۴۰۴"
      title="اسناد و گزارش‌ها"
      subtitle="مدارک رسمی حسابرسی‌شده، گزارش‌های هیات‌مدیره، جداول مالی و همه اسناد قابل دانلود."
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'دیده‌بان ثاخت' }]"
    >
      <div class="flex flex-wrap gap-3">
        <span class="inline-flex items-center gap-2 rounded-pill bg-surface-container-lowest/10 px-4 py-2 text-label-md text-surface-container-lowest"><span class="size-2 rounded-pill bg-status-success" />نماد ثاخت · بورس تهران</span>
        <span class="inline-flex items-center rounded-pill bg-surface-container-lowest/10 px-4 py-2 text-label-md text-surface-container-lowest">سرمایه ثبت‌شده: ۸۲٬۳۰۸ میلیارد ریال</span>
        <a href="https://codal.ir" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-pill border border-surface-container-lowest/30 px-4 py-2 text-label-md text-surface-container-lowest hover:bg-surface-container-lowest hover:text-ink">اطلاعیه‌ها در کدال <AppIcon name="open_in_new" /></a>
      </div>
    </PageHero>

    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />

    <div class="mx-auto max-w-[1440px] px-space-lg py-12 md:px-margin md:py-16">
      <!-- 1. Required disclosures (sitemap §7.1.1) -->
      <section class="mb-20">
        <SectionHead eyebrow="الزامات دستورالعمل حاکمیت شرکتی" title="اسناد کلیدی" aside="شش سرفصل الزامی بورس و مجمع" />
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="(p, i) in pillars" :key="p.group" class="flex flex-col rounded-md border border-border bg-surface-container-lowest p-6">
            <div class="mb-4 flex items-center justify-between">
              <span class="flex size-11 items-center justify-center rounded-sm bg-surface text-primary-container"><AppIcon :name="p.icon" /></span>
              <span class="text-label-md text-outline">{{ faDigits(i + 1) }}</span>
            </div>
            <h3 class="mb-2 text-body-lg font-bold text-ink">{{ p.title }}</h3>
            <p class="mb-5 text-body-sm text-secondary">{{ p.text }}</p>
            <div class="mt-auto border-t border-border pt-4">
              <template v-if="latest(p.group)">
                <p class="mb-3 text-label-md text-secondary">آخرین نسخه: {{ latest(p.group)!.date }}</p>
                <div class="flex flex-wrap gap-2">
                  <a :href="PLACEHOLDER_FILE" download class="inline-flex h-9 items-center gap-1.5 rounded-pill bg-ink px-4 text-label-md font-bold text-on-primary hover:bg-primary-container"><AppIcon name="download" />دریافت {{ latest(p.group)!.format }}</a>
                  <button type="button" class="inline-flex h-9 items-center rounded-pill border border-border px-4 text-label-md text-ink hover:border-primary-container hover:text-primary-container" @click="setFilter('group', p.group)">همه نسخه‌ها</button>
                </div>
              </template>
              <NuxtLink v-else :to="{ query: { ...route.query, table: 'shareholders' }, hash: '#financial-tables' }" class="inline-flex h-9 items-center gap-1.5 rounded-pill border border-border px-4 text-label-md text-ink hover:border-primary-container hover:text-primary-container">مشاهده جدول سهامداران <AppIcon name="arrow_back" /></NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Annual tables (sitemap §7.2) -->
      <div class="mb-20">
        <FinancialTables />
      </div>

      <!-- 3. Archive -->
      <section id="documents-archive" class="scroll-mt-40">
        <SectionHead eyebrow="آرشیو" title="مخزن اسناد و اطلاعیه‌های رسمی" :aside="`${faDigits(list.length)} سند`" />

        <div class="mb-4 flex flex-wrap gap-2">
          <button type="button" class="rounded-pill border px-4 py-1.5 text-label-md font-bold transition-colors" :class="!group ? 'border-ink bg-ink text-on-primary' : 'border-border text-secondary hover:text-ink'" @click="setFilter('group', '')">همه گروه‌ها</button>
          <button
            v-for="g in documentGroups" :key="g.value" type="button"
            class="rounded-pill border px-4 py-1.5 text-label-md font-bold transition-colors"
            :class="group === g.value ? 'border-ink bg-ink text-on-primary' : 'border-border text-secondary hover:text-ink'"
            @click="setFilter('group', g.value)"
          >{{ g.label }}</button>
        </div>
        <div class="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div class="inline-flex w-fit rounded-pill border border-border p-1">
            <button type="button" class="rounded-pill px-4 py-1 text-label-md" :class="!year ? 'bg-primary-container text-on-primary' : 'text-secondary'" @click="setFilter('year', '')">همه سال‌ها</button>
            <button v-for="y in years" :key="y" type="button" class="rounded-pill px-4 py-1 text-label-md" :class="year === y ? 'bg-primary-container text-on-primary' : 'text-secondary'" @click="setFilter('year', y)">{{ faDigits(y) }}</button>
          </div>
          <label class="relative w-full md:w-72">
            <span class="sr-only">جستجو در عنوان اسناد</span>
            <input v-model="q" type="search" placeholder="جستجو در عنوان اسناد…" class="h-10 w-full rounded-pill border border-border bg-surface-container-lowest pl-4 pr-10 text-body-sm focus:border-primary-container focus:outline-none">
            <AppIcon name="search" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-outline" />
          </label>
        </div>

        <ul v-if="list.length" class="divide-y divide-border overflow-hidden rounded-md border border-border bg-surface-container-lowest">
          <li v-for="d in list" :key="d.slug" class="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-surface/60 sm:px-6 md:flex-row md:items-center">
            <div class="flex items-start gap-4">
              <span class="flex size-10 shrink-0 items-center justify-center rounded-sm border border-border bg-surface" :class="d.format === 'XLSX' ? 'text-status-success' : 'text-primary-container'">
                <AppIcon :name="d.format === 'XLSX' ? 'table_chart' : 'picture_as_pdf'" />
              </span>
              <div>
                <div class="mb-1 flex flex-wrap items-center gap-2 text-xs">
                  <span class="rounded-xs bg-brand-tint/50 px-2 py-0.5 font-bold text-primary-container">{{ groupLabel(d.group) }}</span>
                  <span class="text-secondary">{{ d.date }}</span>
                  <span v-if="d.codal" class="text-secondary">کد رهگیری کدال: <span dir="ltr">{{ d.codal }}</span></span>
                </div>
                <NuxtLink :to="`/ir/financials/${d.slug}`" class="text-body-md font-bold leading-snug text-ink hover:text-primary-container">{{ d.title }}</NuxtLink>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-2 self-end md:self-center">
              <NuxtLink :to="`/ir/financials/${d.slug}`" class="inline-flex h-9 items-center rounded-pill border border-border px-4 text-label-md text-ink hover:border-primary-container hover:text-primary-container">مطالعه</NuxtLink>
              <a :href="PLACEHOLDER_FILE" download class="inline-flex h-9 items-center gap-1.5 rounded-pill px-4 text-label-md font-bold text-on-primary" :class="d.format === 'XLSX' ? 'bg-status-success' : 'bg-ink hover:bg-primary-container'"><AppIcon name="download" />{{ d.format }} · {{ d.size }}</a>
            </div>
          </li>
        </ul>
        <div v-else class="rounded-md border border-border bg-surface p-10 text-center text-body-md text-secondary">سندی با این شرایط یافت نشد.</div>

        <div class="mt-4 flex flex-col justify-between gap-2 text-label-md text-secondary sm:flex-row sm:items-center">
          <span>نسخه رسمی همه اسناد در سامانه کدال ثبت شده است.</span>
          <a href="https://codal.ir" target="_blank" rel="noopener" class="inline-flex items-center gap-1 font-medium text-primary-container hover:underline">سوابق کامل در کدال <AppIcon name="open_in_new" /></a>
        </div>
      </section>
    </div>
  </div>
</template>
