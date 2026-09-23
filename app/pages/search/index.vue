<script setup lang="ts">
const route = useRoute()
const initialQuery = computed(() => (route.query.q as string) || '')

useSeoMeta({
  title: 'جستجوی سایت — ثاخت',
  description: 'جستجو در پروژه‌ها، اخبار، افراد و صفحات وب‌سایت هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <SearchResultsView :initial-query="initialQuery" />
  </BaseContainer>
</template>
