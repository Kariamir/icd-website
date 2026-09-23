<script setup lang="ts">
import type { LeadFormField } from '~/components/sections/LeadForm.vue'

const fields: LeadFormField[] = [
  { key: 'name', label: 'نام و نام خانوادگی', type: 'text', required: true, placeholder: 'می‌توانید ناشناس باقی بمانید' },
  { key: 'email', label: 'پست الکترونیکی (اختیاری)', type: 'email', placeholder: 'example@domain.com' },
  { key: 'category', label: 'نوع گزارش', type: 'select', options: ['شکایت', 'پیشنهاد', 'گزارش تخلف (سوت‌زنی)'] },
  { key: 'message', label: 'شرح موضوع', type: 'textarea', required: true, placeholder: 'شرح کامل شکایت یا پیشنهاد خود را بنویسید...' },
]

useSeoMeta({
  title: 'شکایات و پیشنهادات — ثاخت',
  description: 'ثبت شکایت، پیشنهاد یا گزارش تخلف برای هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <LeadForm
    eyebrow="سامانه شکایات و پیشنهادات"
    title="ثبت شکایت یا پیشنهاد"
    description="گزارش شما به‌صورت محرمانه بررسی می‌شود. در صورت تمایل می‌توانید بدون ذکر نام هویتی ثبت‌نام کنید."
    :fields="fields"
  />
</template>
