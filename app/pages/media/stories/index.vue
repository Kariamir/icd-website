<script setup lang="ts">
import { getArticlesByType, mediaTypeLabels } from '~/utils/articlesData'

const articleList = getArticlesByType('story')

useSeoMeta({
  title: `${mediaTypeLabels.story.hub} — ثاخت`,
  description: 'روایت‌ها، پادکست‌ها و مصاحبه‌های هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList
      :title="mediaTypeLabels.story.hub"
      description="روایت‌ها، پادکست‌ها و مصاحبه‌های هلدینگ ساختمانی ثاخت."
      :articles="articleList"
      hub-href="/media/stories"
    />
  </BaseContainer>
</template>
