<script setup lang="ts">
import { orgChartHero } from '~/utils/orgChartData'

useSeoMeta({
  title: 'چارت سازمانی و ساختار حاکمیت شرکتی — ثاخت',
  description: orgChartHero.intro,
})
</script>

<template>
  <OrgChartView />
</template>
