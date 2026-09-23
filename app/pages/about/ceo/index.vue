<script setup lang="ts">
import type { LeadFormField } from '~/components/sections/LeadForm.vue'

const fields: LeadFormField[] = [
  { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'مثال: علی رضایی' },
  { key: 'email', label: 'پست الکترونیکی', type: 'email', required: true, placeholder: 'example@domain.com' },
  { key: 'subject', label: 'موضوع پیام', type: 'select', options: ['پیشنهاد', 'گزارش ویژه', 'سایر موارد'] },
  { key: 'message', label: 'متن پیام', type: 'textarea', required: true, placeholder: 'پیام خود را برای مدیرعامل بنویسید...' },
]

useSeoMeta({
  title: 'ارتباط مستقیم با مدیرعامل — ثاخت',
  description: 'ارسال پیام مستقیم به مدیرعامل هلدینگ ساختمانی ثاخت با تعهد پاسخگویی حداکثر ۷۲ ساعت.',
})
</script>

<template>
  <LeadForm
    eyebrow="درگاه ارتباطی مدیریت"
    title="ارتباط مستقیم با مدیرعامل"
    description="پیشنهادات، گزارش‌های ویژه و پرسش‌های خود را مستقیماً برای دفتر مدیرعامل هلدینگ ثاخت ارسال کنید."
    sla-badge="تعهد پاسخگویی حداکثر ۷۲ ساعت کاری"
    :fields="fields"
  />
</template>
