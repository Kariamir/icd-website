<script setup lang="ts">
import { clusterHubs } from '~/utils/clusterHubData'

const hub = clusterHubs.sales

useSeoMeta({
  title: `${hub.title} — ثاخت`,
  description: hub.intro,
})
</script>

<template>
  <ClusterHub :hub="hub" />
</template>
