<script setup lang="ts">
import { csrPage } from '~/utils/editorialData'

useSeoMeta({
  title: `${csrPage.title} — ثاخت`,
  description: csrPage.intro,
})
</script>

<template>
  <StaticEditorial :page="csrPage" />
</template>
