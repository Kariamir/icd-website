<script setup lang="ts">
import { csrPage } from '~/utils/editorialData'

useSeoMeta({
  title: `${csrPage.title} — ثاخت`,
  description: csrPage.intro,
})
</script>

<template>
  <BaseContainer>
    <StaticEditorial :page="csrPage" />
  </BaseContainer>
</template>
