<script setup lang="ts">
import { timelineEras } from '~/utils/timelineData'

useSeoMeta({
  title: 'تاریخچه و نقاط عطف ۴۰ ساله — ثاخت',
  description: 'مروری بر مسیر چهار دهه‌ای هلدینگ ساختمانی ثاخت، از تاسیس تا امروز.',
})
</script>

<template>
  <HistoryTimeline :eras="timelineEras" />
</template>
