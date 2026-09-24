<script setup lang="ts">
import { STATUS } from '~/utils/projectsData'

useSeoMeta({
  title: `${STATUS['completed'].label} — پروژه‌ها — ثاخت`,
  description: 'فهرست قابل فیلتر پروژه‌های هلدینگ ساختمانی ثاخت به تفکیک موقعیت، وضعیت، کاربری، زیربنا و تعداد طبقات.',
})
</script>

<template>
  <IndexCardGrid status="completed" />
</template>
