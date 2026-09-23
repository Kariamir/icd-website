<script setup lang="ts">
import type { LeadFormField } from '~/components/sections/LeadForm.vue'

const fields: LeadFormField[] = [
  { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'مثال: علی رضایی' },
  { key: 'phone', label: 'شماره تماس', type: 'tel', required: true, placeholder: '۰۹xxxxxxxxx' },
  { key: 'project', label: 'پروژه مورد نظر', type: 'select', options: ['مگاپارس تهران', 'برج بین‌المللی تهران', 'رویای کیش', 'آ.اس.پ مشهد', 'سایر پروژه‌ها'] },
  { key: 'message', label: 'توضیحات تکمیلی', type: 'textarea', placeholder: 'بودجه، متراژ یا زمان‌بندی مدنظر خود را بنویسید...' },
]

useSeoMeta({
  title: 'درخواست مشاوره رایگان — ثاخت',
  description: 'دریافت مشاوره رایگان خرید و پیش‌فروش واحدهای هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <LeadForm
    eyebrow="مشاوره خرید و پیش‌فروش"
    title="درخواست مشاوره رایگان"
    description="کارشناسان فروش هلدینگ ثاخت آماده مشاوره درباره واحدهای موجود و شرایط پیش‌فروش هستند."
    :fields="fields"
  />
</template>
