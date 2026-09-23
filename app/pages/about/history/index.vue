<script setup lang="ts">
import { timelineEras } from '~/utils/timelineData'

useSeoMeta({
  title: 'معرفی شرکت و تاریخچه — ثاخت',
  description: 'مروری بر مسیر چهار دهه‌ای هلدینگ ساختمانی ثاخت، از تاسیس تا امروز.',
})
</script>

<template>
  <BaseContainer>
    <HistoryTimeline :eras="timelineEras" />
  </BaseContainer>
</template>
