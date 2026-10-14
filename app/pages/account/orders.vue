<script setup lang="ts">
// Route /account/orders — purchase tracking.
definePageMeta({ layout: 'account' })

useSeoMeta({
  title: 'پیگیری وضعیت خرید — پروفایل من',
  description: 'مراحل رزرو، پیش‌پرداخت، بررسی مدارک و عقد قرارداد هر پرونده خرید.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AccountOrdersView />
</template>
