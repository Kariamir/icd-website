<script setup lang="ts">
import { leadDepartments, leadHelpDesk, leadInquiryTypes } from '~/utils/leadFormData'

useSeoMeta({
  title: 'شکایات و پیشنهادات — ثاخت',
  description: 'ثبت شکایت، پیشنهاد یا گزارش تخلف (سوت‌زنی) برای هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <LeadForm
    :breadcrumb="[
      { label: 'صفحه اصلی', href: '/' },
      { label: 'امور مشتریان و دفاتر', href: '/contact' },
      { label: 'سامانه شکایات و پیشنهادات' },
    ]"
    eyebrow="سامانه شکایات، پیشنهادات و سوت‌زنی"
    title="ثبت شکایت، پیشنهاد یا گزارش تخلف"
    description="گزارش شما به‌صورت محرمانه توسط واحد بازرسی بررسی می‌شود. در صورت تمایل می‌توانید بدون ذکر نام و مشخصات هویتی گزارش خود را ثبت کنید."
    sla-badge="بررسی محرمانه و اعلام نتیجه با کد رهگیری"
    :departments="leadDepartments"
    :inquiry-types="leadInquiryTypes"
    initial-inquiry="complaint"
    form-title="ثبت گزارش در سامانه شکایات و پیشنهادات"
    submit-label="ثبت گزارش و دریافت کد رهگیری"
    :help-desk="leadHelpDesk"
  />
</template>
