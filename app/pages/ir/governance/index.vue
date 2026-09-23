<script setup lang="ts">
import { governanceDocuments } from '~/utils/documentsData'

useSeoMeta({
  title: 'گزارش‌های شفافیت و حاکمیت شرکتی — ثاخت',
  description: 'آرشیو گزارش‌های حاکمیت شرکتی و شفافیت هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <DocumentIndexList
      title="گزارش‌های شفافیت و حاکمیت شرکتی"
      description="گزارش‌های ترکیب هیات‌مدیره، کنترل‌های داخلی و سیاست معاملات با اشخاص وابسته."
      :documents="governanceDocuments"
    />
  </BaseContainer>
</template>
