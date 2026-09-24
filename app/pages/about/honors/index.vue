<script setup lang="ts">
import type { SimpleIndexFilter, SimpleIndexItem, SimpleIndexSort } from '~/components/sections/SimpleIndexGrid.vue'
import { HONOR_CATEGORIES, getHonorIndexFields, honors } from '~/utils/honorsData'

const items: SimpleIndexItem[] = honors.map((h) => {
  const f = getHonorIndexFields(h)
  return {
    key: h.title,
    title: h.title,
    meta: h.issuer,
    image: h.image,
    badge: f.category,
    tags: [`دامنه ${f.scope}`],
    stats: [{ label: 'سال دریافت', value: h.year }, { label: 'مرجع اعطا', value: h.issuer }],
    facets: { category: f.category, scope: f.scope, year: h.year },
    sortKeys: { year: f.yearNum, name: h.title },
  }
})

const years = Array.from(new Set(honors.map(h => h.year))).sort((a, b) => b.localeCompare(a, 'fa'))

const filters: SimpleIndexFilter[] = [
  { key: 'category', label: 'نوع افتخار', allLabel: 'همه انواع', icon: 'award', options: HONOR_CATEGORIES.map(c => ({ value: c, label: c })) },
  { key: 'scope', label: 'دامنه اعتبار', allLabel: 'ملی و بین‌المللی', icon: 'location', options: [{ value: 'ملی', label: 'ملی' }, { value: 'بین‌المللی', label: 'بین‌المللی' }] },
  { key: 'year', label: 'سال دریافت', allLabel: 'همه سال‌ها', icon: 'calendar', options: years.map(y => ({ value: y, label: `سال ${y}` })) },
]

const sortOptions: SimpleIndexSort[] = [
  { value: 'newest', label: 'جدیدترین افتخارات', by: 'year', dir: 'desc' },
  { value: 'oldest', label: 'قدیمی‌ترین', by: 'year', dir: 'asc' },
  { value: 'name', label: 'ترتیب الفبایی', by: 'name', dir: 'asc' },
]

useSeoMeta({
  title: 'افتخارات، گواهینامه‌ها و عضویت‌ها — ثاخت',
  description: 'گواهینامه‌ها، تندیس‌ها و عضویت‌های رسمی هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <SimpleIndexGrid
      title="افتخارات، گواهینامه‌ها و عضویت‌ها"
      description="گواهینامه‌های مدیریت کیفیت و ایمنی، تندیس‌ها و جوایز ملی، و عضویت‌های رسمی هلدینگ ساختمانی ثاخت در نهادهای تخصصی داخلی و بین‌المللی."
      eyebrow="کارنامه کیفیت و اعتبار حرفه‌ای"
      :crumbs="[{ label: 'صفحه اصلی', to: '/' }, { label: 'درباره ثاخت', to: '/about' }, { label: 'افتخارات و گواهینامه‌ها' }]"
      :items="items"
      :filters="filters"
      :search="{ label: 'جستجوی عنوان یا مرجع', placeholder: 'مثلاً «ISO» یا «تندیس»' }"
      :sort-options="sortOptions"
      noun="افتخار و گواهینامه"
      :page-size="9"
      load-more-label="نمایش افتخارات بیشتر"
      empty-title="موردی مطابق فیلترهای انتخابی یافت نشد"
    />
  </BaseContainer>
</template>
