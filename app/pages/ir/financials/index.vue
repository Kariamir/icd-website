<script setup lang="ts">
import { financialDocuments } from '~/utils/documentsData'

useSeoMeta({
  title: 'صورت‌های مالی و گزارش فعالیت هیات‌مدیره — ثاخت',
  description: 'آرشیو صورت‌های مالی حسابرسی‌شده و گزارش‌های فعالیت هیات‌مدیره هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <DocumentIndexList
      title="صورت‌های مالی و گزارش فعالیت هیات‌مدیره"
      description="آرشیو صورت‌های مالی حسابرسی‌شده و گزارش‌های فعالیت هیات‌مدیره، به تفکیک سال مالی."
      :documents="financialDocuments"
    />
  </BaseContainer>
</template>
