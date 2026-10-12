<script setup lang="ts">
// Route /projects/upcoming — view ported from the approved design (ADR-013).
useSeoMeta({
  title: 'پروژه‌های آتی — هلدینگ ساختمانی ثاخت',
  description: 'طرح‌های آتی و پروژه‌های در دست مطالعه هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <ProjectsStatusView status="upcoming" />
</template>
