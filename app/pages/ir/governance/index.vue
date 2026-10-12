<script setup lang="ts">
import { irNav } from '~/utils/routes'
import { documentHubs } from '~/utils/documentsData'

const hub = documentHubs.governance

useSeoMeta({
  title: 'گزارش‌های شفافیت و حاکمیت شرکتی — ثاخت',
  description: 'آرشیو گزارش‌های حاکمیت شرکتی، کنترل‌های داخلی، منشورها و صورت‌جلسات مجامع هلدینگ ثاخت.',
})
</script>

<template>
  <div>
    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />
    <BaseContainer>
      <DocumentIndexList :hub="hub" />
    </BaseContainer>
  </div>
</template>
