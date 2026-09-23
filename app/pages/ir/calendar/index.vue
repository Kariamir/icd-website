<script setup lang="ts">
import { calendarEvents } from '~/utils/calendarData'

useSeoMeta({
  title: 'تقویم اطلاع‌رسانی و مجامع عمومی — ثاخت',
  description: 'تقویم رویدادهای افشای اطلاعات، گزارش‌های فصلی و مجامع عمومی هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <CalendarIndexList :events="calendarEvents" />
  </BaseContainer>
</template>
