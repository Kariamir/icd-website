<script setup lang="ts">
import { leadDepartments, leadHelpDesk, leadInquiryTypes } from '~/utils/leadFormData'

useSeoMeta({
  title: 'تماس با ما — ثاخت',
  description: 'مرکز ارتباط مستقیم، ثبت درخواست مشاوره سرمایه‌گذاری و ارتباط با مدیران هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <LeadForm
    :breadcrumb="[
      { label: 'صفحه اصلی', href: '/' },
      { label: 'امور مشتریان و دفاتر', href: '/contact' },
      { label: 'فرم درخواست مشاوره و ارتباط مستقیم' },
    ]"
    eyebrow="درگاه یکپارچه ارتباطی ذی‌نفعان و سرمایه‌گذاران"
    title="ارتباط با مدیران و دریافت مشاوره تخصصی سرمایه‌گذاری"
    description="پاسخگویی شفاف به پرسش‌های پیش‌خرید واحدهای ملکی، مناقصات پیمانکاری، ارتباط مستقیم با مدیرعامل و استعلام‌های کدال سهامداران"
    :departments="leadDepartments"
    :inquiry-types="leadInquiryTypes"
    initial-inquiry="sales"
    :help-desk="leadHelpDesk"
  />
</template>
