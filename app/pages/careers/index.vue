<script setup lang="ts">
import type { LeadFormField } from '~/components/sections/LeadForm.vue'
import type { SimpleIndexFilter, SimpleIndexItem, SimpleIndexSort } from '~/components/sections/SimpleIndexGrid.vue'
import { jobIndexFields, jobPostings } from '~/utils/careersData'

const fa = (n: number) => n.toLocaleString('fa-IR')

const items: SimpleIndexItem[] = jobPostings.map((j) => {
  const f = jobIndexFields[j.slug]
  return {
    key: j.slug,
    title: j.title,
    meta: `${j.location} · ${j.employmentType}`,
    excerpt: j.summary,
    badge: j.department,
    stats: f
      ? [
          { label: 'سابقه مورد نیاز', value: f.experience },
          { label: 'مهلت ارسال', value: `${fa(f.deadlineDays)} روز` },
        ]
      : [],
    facets: { department: j.department, location: j.location, type: j.employmentType },
    sortKeys: { posted: f?.postedDaysAgo ?? 99, deadline: f?.deadlineDays ?? 99, name: j.title },
    cta: { label: 'ارسال رزومه برای این موقعیت', href: '/careers#apply' },
  }
})

const filters: SimpleIndexFilter[] = [
  { key: 'department', label: 'حوزه کاری', allLabel: 'همه حوزه‌ها', icon: 'briefcase' },
  { key: 'location', label: 'محل کار', allLabel: 'همه شهرها', icon: 'location' },
  { key: 'type', label: 'نوع همکاری', allLabel: 'همه انواع همکاری', icon: 'calendar' },
]

const sortOptions: SimpleIndexSort[] = [
  { value: 'newest', label: 'جدیدترین آگهی‌ها', by: 'posted', dir: 'asc' },
  { value: 'deadline', label: 'نزدیک‌ترین مهلت', by: 'deadline', dir: 'asc' },
  { value: 'name', label: 'ترتیب الفبایی', by: 'name', dir: 'asc' },
]

const applicationFields: LeadFormField[] = [
  { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'مثال: علی رضایی' },
  { key: 'email', label: 'پست الکترونیکی', type: 'email', required: true, placeholder: 'example@domain.com' },
  {
    key: 'position',
    label: 'موقعیت شغلی مورد نظر',
    type: 'select',
    options: jobPostings.map(j => j.title),
  },
  { key: 'resumeLink', label: 'لینک رزومه (لینکدین یا فایل آنلاین)', type: 'text', placeholder: 'https://...' },
  { key: 'message', label: 'توضیحات تکمیلی', type: 'textarea', placeholder: 'خلاصه‌ای از سوابق و انگیزه خود را بنویسید...' },
]

useSeoMeta({
  title: 'فرصت‌های همکاری و استخدام — ثاخت',
  description: 'موقعیت‌های شغلی باز و فرم ارسال رزومه در هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <div>
    <BaseContainer>
      <SimpleIndexGrid
        title="فرصت‌های همکاری و استخدام"
        description="موقعیت‌های شغلی باز در هلدینگ ساختمانی ثاخت و شرکت‌های تابعه؛ از مهندسی و اجرای کارگاه تا مالی، فروش و رسانه."
        eyebrow="به تیم سازندگان ثاخت بپیوندید"
        :crumbs="[{ label: 'صفحه اصلی', to: '/' }, { label: 'فرصت‌های شغلی' }]"
        :items="items"
        :filters="filters"
        :search="{ label: 'جستجوی عنوان شغلی', placeholder: 'مثلاً «مهندس» یا «فروش»' }"
        :sort-options="sortOptions"
        noun="فرصت شغلی"
        :page-size="6"
        variant="text"
        load-more-label="نمایش فرصت‌های بیشتر"
        empty-title="موقعیت شغلی مطابق فیلترها یافت نشد"
        empty-text="فیلترها را تغییر دهید، یا رزومه خود را به‌صورت عمومی از فرم پایین صفحه ارسال کنید تا در موقعیت‌های آتی بررسی شود."
      >
        <template #empty-actions>
          <NuxtLink to="/careers#apply">ارسال رزومه عمومی</NuxtLink>
        </template>
      </SimpleIndexGrid>
    </BaseContainer>

    <div id="apply" class="careers-apply">
      <LeadForm
        eyebrow="ارسال رزومه"
        title="متقاضی همکاری با ثاخت هستید؟"
        description="فرم زیر را تکمیل کنید تا کارشناسان منابع انسانی رزومه شما را بررسی نمایند."
        :fields="applicationFields"
      />
    </div>
  </div>
</template>

<style scoped>
.careers-apply { scroll-margin-block-start: var(--space-8); }
</style>
