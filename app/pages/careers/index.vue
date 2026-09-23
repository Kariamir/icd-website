<script setup lang="ts">
import type { LeadFormField } from '~/components/sections/LeadForm.vue'
import { jobPostings } from '~/utils/careersData'

const items = jobPostings.map(j => ({
  key: j.slug,
  title: j.title,
  meta: `${j.department} · ${j.location} · ${j.employmentType}`,
  excerpt: j.summary,
}))

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
        description="موقعیت‌های شغلی باز در هلدینگ ساختمانی ثاخت."
        :items="items"
      />
    </BaseContainer>

    <LeadForm
      eyebrow="ارسال رزومه"
      title="متقاضی همکاری با ثاخت هستید؟"
      description="فرم زیر را تکمیل کنید تا کارشناسان منابع انسانی رزومه شما را بررسی نمایند."
      :fields="applicationFields"
    />
  </div>
</template>
