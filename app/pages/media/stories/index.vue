<script setup lang="ts">
import { mediaHubMeta, mediaTypeLabels } from '~/utils/articlesData'

useSeoMeta({
  title: `${mediaTypeLabels.story.hub} — ثاخت`,
  description: mediaHubMeta.story.description,
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList type="story" />
  </BaseContainer>
</template>
