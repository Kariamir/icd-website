<script setup lang="ts">
// Route /account/documents — upload and archive.
definePageMeta({ layout: 'account' })

useSeoMeta({
  title: 'مدارک — پروفایل من',
  description: 'بارگذاری مدارک پرونده خرید و دریافت قرارداد.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AccountDocumentsView />
</template>
