<script setup lang="ts">
import type { SimpleIndexFilter, SimpleIndexItem, SimpleIndexSort } from '~/components/sections/SimpleIndexGrid.vue'
import { BOARD_GROUPS, boardIndexFields, boardMembers } from '~/utils/boardData'

const fa = (n: number) => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)

const items: SimpleIndexItem[] = boardMembers.map((m) => {
  const f = boardIndexFields[m.slug]
  const facets: Record<string, string> = f ? { group: f.group, membership: f.membership, committee: f.committee } : {}
  return {
    key: m.slug,
    title: m.name,
    meta: m.role,
    image: m.image,
    href: `/about/board/${m.slug}`,
    badge: f ? BOARD_GROUPS[f.group] : undefined,
    tags: f ? [f.membership, f.committee] : [],
    stats: f ? [{ label: 'عضویت از', value: `سال ${fa(f.sinceYear)}` }, { label: 'تحصیلات', value: f.education }] : [],
    facets,
    sortKeys: { rank: f?.rank ?? 99, since: f?.sinceYear ?? 0, name: m.name },
  }
})

const filters: SimpleIndexFilter[] = [
  { key: 'group', label: 'رده سازمانی', allLabel: 'همه رده‌ها', icon: 'layers', options: Object.entries(BOARD_GROUPS).map(([value, label]) => ({ value, label })) },
  { key: 'membership', label: 'نوع عضویت', allLabel: 'همه انواع عضویت', icon: 'person' },
  { key: 'committee', label: 'کمیته تخصصی', allLabel: 'همه کمیته‌ها', icon: 'briefcase' },
]

const sortOptions: SimpleIndexSort[] = [
  { value: 'rank', label: 'ترتیب سازمانی', by: 'rank', dir: 'asc' },
  { value: 'since', label: 'جدیدترین انتصاب', by: 'since', dir: 'desc' },
  { value: 'name', label: 'ترتیب الفبایی', by: 'name', dir: 'asc' },
]

useSeoMeta({
  title: 'مدیران و اعضای هیات‌مدیره — ثاخت',
  description: 'اعضای هیات‌مدیره و مدیران ارشد هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <SimpleIndexGrid
      title="مدیران و اعضای هیات‌مدیره"
      description="اعضای هیات‌مدیره و مدیران ارشد اجرایی هلدینگ ساختمانی ثاخت؛ راهبری حاکمیت شرکتی، سیاست‌گذاری فنی و اجرای مگاپروژه‌های هلدینگ."
      eyebrow="حاکمیت شرکتی و مدیریت ارشد"
      :crumbs="[{ label: 'صفحه اصلی', to: '/' }, { label: 'درباره ثاخت', to: '/about' }, { label: 'مدیران و هیات‌مدیره' }]"
      :items="items"
      :filters="filters"
      :search="{ label: 'جستجوی نام یا سمت', placeholder: 'مثلاً «مدیر مالی» یا «رضوانی»' }"
      :sort-options="sortOptions"
      noun="عضو و مدیر"
      :page-size="8"
      variant="portrait"
      load-more-label="نمایش مدیران بیشتر"
      empty-title="عضوی مطابق فیلترهای انتخابی یافت نشد"
    />
  </BaseContainer>
</template>
