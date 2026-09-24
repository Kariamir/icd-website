<script setup lang="ts">
import { leadDepartments, leadHelpDesk, leadInquiryTypes } from '~/utils/leadFormData'

useSeoMeta({
  title: 'ارتباط مستقیم با مدیرعامل — ثاخت',
  description: 'ارسال پیام مستقیم به مدیرعامل هلدینگ ساختمانی ثاخت با تعهد پاسخگویی حداکثر ۷۲ ساعت.',
})
</script>

<template>
  <LeadForm
    :breadcrumb="[
      { label: 'صفحه اصلی', href: '/' },
      { label: 'درباره ثاخت', href: '/about' },
      { label: 'ارتباط مستقیم با مدیرعامل' },
    ]"
    eyebrow="درگاه ارتباطی مدیریت"
    title="ارتباط مستقیم با مدیرعامل"
    description="پیشنهادات، گزارش‌های ویژه و پرسش‌های خود را مستقیماً برای دفتر مهندس سید علیرضا حسینی، مدیرعامل هلدینگ ثاخت ارسال کنید."
    sla-badge="تعهد پاسخگویی حداکثر ۷۲ ساعت کاری"
    :departments="leadDepartments"
    :inquiry-types="leadInquiryTypes"
    initial-inquiry="ceo"
    form-title="ارسال پیام به دفتر مدیرعامل"
    submit-label="ارسال پیام و صدور کد رهگیری"
    :help-desk="leadHelpDesk"
  />
</template>
