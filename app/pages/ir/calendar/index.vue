<script setup lang="ts">
import { calendarEventRecords } from '~/utils/calendarData'

useSeoMeta({
  title: 'تقویم مالی و رویدادهای بازار سرمایه — ثاخت',
  description: 'تقویم رویدادهای افشای اطلاعات، گزارش‌های دوره‌ای، دوره‌های سکوت، پرداخت سود و مجامع عمومی هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <CalendarIndexList :events="calendarEventRecords" />
  </BaseContainer>
</template>
