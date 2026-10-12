<script setup lang="ts">
// Route /companies/[slug] — design companies_slug (ADR-013), data from the catalog (ADR-015).
import { getCompany } from '~/utils/catalog'

const route = useRoute()
const company = computed(() => getCompany(String(route.params.slug)))

if (!company.value) {
  throw createError({ statusCode: 404, message: 'شرکت یافت نشد' })
}

useSeoMeta({
  title: () => `${company.value?.name} — هلدینگ ساختمانی ثاخت`,
  description: () => company.value?.summary ?? '',
})
</script>

<template>
  <CompanyDetailView v-if="company" :company="company" />
</template>
