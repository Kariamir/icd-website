<script setup lang="ts">
import { mediaHubMeta, mediaTypeLabels } from '~/utils/articlesData'

useSeoMeta({
  title: `${mediaTypeLabels.news.hub} — ثاخت`,
  description: mediaHubMeta.news.description,
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList type="news" />
  </BaseContainer>
</template>
