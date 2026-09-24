<script setup lang="ts">
import { leadDepartments, leadHelpDesk, leadInquiryTypes } from '~/utils/leadFormData'

useSeoMeta({
  title: 'درخواست مشاوره رایگان — ثاخت',
  description: 'دریافت مشاوره رایگان خرید و پیش‌فروش واحدهای هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <LeadForm
    :breadcrumb="[
      { label: 'صفحه اصلی', href: '/' },
      { label: 'فروش و پیش‌فروش', href: '/sales' },
      { label: 'درخواست مشاوره رایگان' },
    ]"
    eyebrow="مشاوره خرید و پیش‌فروش"
    title="درخواست مشاوره رایگان خرید و سرمایه‌گذاری ملکی"
    description="کارشناسان فروش هلدینگ ثاخت آماده مشاوره درباره واحدهای موجود، شرایط پیش‌فروش، تسهیلات اقساطی و رزرو بازدید حضوری هستند."
    sla-badge="پاسخ کارشناس فروش در کمتر از ۲۴ ساعت کاری"
    :departments="leadDepartments"
    :inquiry-types="leadInquiryTypes"
    initial-inquiry="sales"
    form-title="ثبت درخواست مشاوره تخصصی خرید"
    :help-desk="leadHelpDesk"
  />
</template>
