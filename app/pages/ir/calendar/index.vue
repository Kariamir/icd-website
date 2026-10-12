<script setup lang="ts">
import { irNav } from '~/utils/routes'
import { calendarEventRecords } from '~/utils/calendarData'

useSeoMeta({
  title: 'تقویم مالی و رویدادهای بازار سرمایه — ثاخت',
  description: 'تقویم رویدادهای افشای اطلاعات، گزارش‌های دوره‌ای، دوره‌های سکوت، پرداخت سود و مجامع عمومی هلدینگ ثاخت.',
})
</script>

<template>
  <div>
    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />
    <BaseContainer>
      <CalendarIndexList :events="calendarEventRecords" />
    </BaseContainer>
  </div>
</template>
