<script setup lang="ts">
// Route /ir/financials — view ported from the approved design (ADR-013).
//
// layout: false because the ported view carries its own <header>
// and <footer> from the approved design. Rendering it inside
// layouts/default.vue would produce two of each. When the shared
// SiteHeader/SiteFooter are reconciled with the approved chrome,
// drop this and strip the inline chrome from the component.
definePageMeta({ layout: false })

useSeoMeta({
  title: 'گزارش‌ها و صورت‌های مالی رسمی — هلدینگ ساختمانی ثاخت',
  description: 'اسناد و گزارش‌های رسمی: صورت‌های مالی، گزارش تفسیری مدیریت، فعالیت هیات‌مدیره، پایداری، کمیته‌ها و مناقصات.',
})
</script>

<template>
  <IrDocumentsView />
</template>
