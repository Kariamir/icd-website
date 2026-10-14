<script setup lang="ts">
// Route /account/tickets — support conversations.
definePageMeta({ layout: 'account' })

useSeoMeta({
  title: 'تیکت پشتیبانی — پروفایل من',
  description: 'گفتگو با کارشناس پرونده و آرشیو تیکت‌های بسته.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AccountTicketsView />
</template>
