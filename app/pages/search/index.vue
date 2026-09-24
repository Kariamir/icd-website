<script setup lang="ts">
const route = useRoute()
const initialQuery = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))

useSeoMeta({
  title: () => initialQuery.value ? `نتایج جستجو برای «${initialQuery.value}» — ثاخت` : 'جستجوی سایت — ثاخت',
  description: 'جستجو در پروژه‌ها، واحدها، اطلاعیه‌های کدال، اخبار، اسناد و فرصت‌های شغلی وب‌سایت هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <SearchResultsView :initial-query="initialQuery" />
</template>
