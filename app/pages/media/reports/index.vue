<script setup lang="ts">
import { mediaHubMeta, mediaTypeLabels } from '~/utils/articlesData'

useSeoMeta({
  title: `${mediaTypeLabels.report.hub} — ثاخت`,
  description: mediaHubMeta.report.description,
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList type="report" />
  </BaseContainer>
</template>
