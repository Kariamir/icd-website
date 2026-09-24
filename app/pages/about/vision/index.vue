<script setup lang="ts">
import { visionPage } from '~/utils/editorialData'

useSeoMeta({
  title: `${visionPage.title} — ثاخت`,
  description: visionPage.intro,
})
</script>

<template>
  <StaticEditorial :page="visionPage" />
</template>
