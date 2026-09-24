<script setup lang="ts">
import { documentHubs } from '~/utils/documentsData'

const hub = documentHubs.financials

useSeoMeta({
  title: 'صورت‌های مالی و گزارش فعالیت هیات‌مدیره — ثاخت',
  description: 'آرشیو صورت‌های مالی حسابرسی‌شده، گزارش‌های میان‌دوره‌ای، گزارش تفسیری مدیریت و افشای اطلاعات بااهمیت هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <DocumentIndexList :hub="hub" />
  </BaseContainer>
</template>
