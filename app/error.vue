<script setup lang="ts">
// Nuxt error page — 404 and 500 share the designed error view (11_error_404),
// inside the normal layout so the header and footer stay available.
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: () => props.error.statusCode === 404 ? 'صفحه یافت نشد — ثاخت' : 'خطا — ثاخت',
  robots: 'noindex',
})
</script>

<template>
  <NuxtLayout>
    <NotFoundView :code="error.statusCode === 404 ? 404 : 500" />
  </NuxtLayout>
</template>
