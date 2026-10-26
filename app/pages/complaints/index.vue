<script setup lang="ts">
// Route /complaints — سامانه رسیدگی به شکایات (sitemap §9), lead-form
// template 06 under a PageHero so it matches the rest of the site.
import { leadHelpDesk, leadInquiryTypes } from '~/utils/leadFormData'

const complaintOnly = leadInquiryTypes.filter(t => t.key === 'complaint')

useSeoMeta({
  title: 'شکایات و پیشنهادات — هلدینگ ساختمانی ثاخت',
  description: 'ثبت شکایت، پیشنهاد یا گزارش تخلف (سوت‌زنی) برای هلدینگ ساختمانی ثاخت با کد رهگیری.',
})
</script>

<template>
  <div>
    <PageHero
      image="/img/projects/ghadir-office-tehran-5.jpg"
      size="sm"
      eyebrow="بررسی محرمانه و اعلام نتیجه با کد رهگیری"
      title="شکایات و پیشنهادات"
      subtitle="ثبت بدون نام نیز امکان‌پذیر است؛ گزارش شما مستقیم به واحد بازرسی می‌رسد."
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'تماس با ما', href: '/contact' }, { label: 'شکایات و پیشنهادات' }]"
    />
    <LeadForm
      bare
      title="ثبت شکایت، پیشنهاد یا گزارش تخلف"
      :inquiry-types="complaintOnly"
      initial-inquiry="complaint"
      form-title="ثبت گزارش در سامانه شکایات و پیشنهادات"
      submit-label="ثبت گزارش و دریافت کد رهگیری"
      :help-desk="leadHelpDesk"
    />
  </div>
</template>
