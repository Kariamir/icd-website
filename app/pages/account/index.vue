<script setup lang="ts">
// Route /account — the account home.
definePageMeta({ layout: 'account' })

useSeoMeta({
  title: 'پروفایل من — هلدینگ ساختمانی ثاخت',
  description: 'خلاصه وضعیت پرونده‌های خرید، مدارک و تیکت‌های پشتیبانی.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AccountDashboardView />
</template>
