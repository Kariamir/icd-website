<script setup lang="ts">
// Route /account/favorites — saved units.
definePageMeta({ layout: 'account' })

useSeoMeta({
  title: 'واحدهای موردعلاقه — پروفایل من',
  description: 'واحدهای ذخیره‌شده و واحدهای مشابه آن‌ها.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AccountFavoritesView />
</template>
