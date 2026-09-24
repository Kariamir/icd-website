<script setup lang="ts">
import { documentHubs } from '~/utils/documentsData'

const hub = documentHubs.governance

useSeoMeta({
  title: 'گزارش‌های شفافیت و حاکمیت شرکتی — ثاخت',
  description: 'آرشیو گزارش‌های حاکمیت شرکتی، کنترل‌های داخلی، منشورها و صورت‌جلسات مجامع هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <DocumentIndexList :hub="hub" />
  </BaseContainer>
</template>
