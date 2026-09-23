<script setup lang="ts">
import { getArticlesByType, mediaTypeLabels } from '~/utils/articlesData'

const articleList = getArticlesByType('news')

useSeoMeta({
  title: `${mediaTypeLabels.news.hub} — ثاخت`,
  description: 'آخرین اخبار رسمی و به‌روزرسانی‌های هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList
      :title="mediaTypeLabels.news.hub"
      description="آخرین اخبار رسمی و به‌روزرسانی‌های هلدینگ ساختمانی ثاخت."
      :articles="articleList"
      hub-href="/media/news"
    />
  </BaseContainer>
</template>
