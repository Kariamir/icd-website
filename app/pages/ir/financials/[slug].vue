<script setup lang="ts">
// Route /ir/financials/[slug] — one official document, readable in the page
// with its file beside it (sitemap §7.3, ADR-009). IR styling: plain, dense.
import { getIrDocument, irDocuments, PLACEHOLDER_FILE } from '~/utils/irDocuments'
import { documentGroups, irNav } from '~/utils/routes'
import { faDigits } from '~/utils/format'

const route = useRoute()
const doc = computed(() => getIrDocument(String(route.params.slug)))

if (!doc.value) {
  throw createError({ statusCode: 404, message: 'سند یافت نشد' })
}

const groupLabel = computed(() => documentGroups.find(g => g.value === doc.value?.group)?.label ?? '')
const siblings = computed(() => irDocuments.filter(d => d.group === doc.value?.group && d.slug !== doc.value?.slug).slice(0, 4))

useSeoMeta({
  title: () => `${doc.value?.title} — دیده‌بان ثاخت`,
  description: () => doc.value?.summary[0] ?? '',
})
</script>

<template>
  <div v-if="doc">
    <PageHero
      plain
      :eyebrow="groupLabel"
      :title="doc.title"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'اسناد و گزارش‌ها', href: '/ir/financials' }, { label: groupLabel }]"
    />
    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />
    <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-space-lg py-12 md:px-margin md:py-16 lg:grid-cols-12">
      <article class="lg:col-span-8">
        <dl class="mb-8 grid grid-cols-2 gap-4 rounded-md border border-border bg-surface p-5 text-body-sm sm:grid-cols-4">
          <div><dt class="text-label-md text-secondary">تاریخ انتشار</dt><dd class="font-bold text-ink">{{ doc.date }}</dd></div>
          <div><dt class="text-label-md text-secondary">سال مالی</dt><dd class="font-bold text-ink">{{ faDigits(doc.year) }}</dd></div>
          <div><dt class="text-label-md text-secondary">قالب فایل</dt><dd class="font-bold text-ink">{{ doc.format }} · {{ doc.size }}</dd></div>
          <div><dt class="text-label-md text-secondary">کد رهگیری کدال</dt><dd class="font-bold text-ink" dir="ltr">{{ doc.codal ?? '—' }}</dd></div>
        </dl>
        <h2 class="mb-4 text-headline-sm font-headline-sm text-ink">خلاصه سند</h2>
        <p v-for="(p, i) in doc.summary" :key="i" class="mb-4 text-body-lg leading-loose text-on-surface">{{ p }}</p>
        <p class="mt-8 rounded-md border-r-4 border-primary-container bg-brand-tint/40 p-4 text-label-md text-ink">متن کامل سند پس از بارگذاری نسخه رسمی در همین صفحه نمایش داده می‌شود؛ تا آن زمان فایل نمونه در دسترس است.</p>
      </article>
      <aside class="space-y-6 lg:col-span-4">
        <a :href="PLACEHOLDER_FILE" download class="flex h-14 items-center justify-center gap-2 rounded-pill bg-ink text-label-lg font-bold text-on-primary hover:bg-primary-container"><AppIcon name="download" />دریافت {{ doc.format }}</a>
        <div v-if="siblings.length" class="rounded-md border border-border p-5">
          <h2 class="mb-3 text-label-lg font-bold text-ink">اسناد دیگر این گروه</h2>
          <NuxtLink v-for="s in siblings" :key="s.slug" :to="`/ir/financials/${s.slug}`" class="block border-t border-border py-3 text-body-sm text-ink first:border-t-0 hover:text-primary-container">{{ s.title }}<span class="mt-1 block text-label-md text-secondary">{{ s.date }}</span></NuxtLink>
        </div>
        <NuxtLink :to="`/ir/financials?group=${doc.group}#documents-archive`" class="inline-flex items-center gap-2 text-label-lg text-primary-container hover:underline"><AppIcon name="arrow_forward" />بازگشت به آرشیو</NuxtLink>
      </aside>
    </div>
  </div>
</template>
