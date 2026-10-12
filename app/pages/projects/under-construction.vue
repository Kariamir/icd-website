<script setup lang="ts">
// Route /projects/under-construction — view ported from the approved design (ADR-013).
useSeoMeta({
  title: 'پروژه‌های در حال ساخت — هلدینگ ساختمانی ثاخت',
  description: 'پروژه‌های در حال ساخت هلدینگ ساختمانی ثاخت و وضعیت پیشرفت آن‌ها.',
})
</script>

<template>
  <ProjectsStatusView status="under-construction" />
</template>
