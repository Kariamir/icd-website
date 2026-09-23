<script setup lang="ts">
import { clusterHubs } from '~/utils/clusterHubData'

const content = clusterHubs.about

useSeoMeta({
  title: `${content.title} — ثاخت`,
  description: content.intro,
})
</script>

<template>
  <ClusterHub v-bind="content" />
</template>
