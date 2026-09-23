<script setup lang="ts">
import { getArticle, mediaTypeLabels } from '~/utils/articlesData'

const route = useRoute()
const slug = route.params.slug as string
const article = getArticle('report', slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'گزارش یافت نشد' })
}

useSeoMeta({
  title: `${article.title} — ثاخت`,
  description: article.excerpt,
})
</script>

<template>
  <BaseContainer>
    <ArticleDetailView :article="article" :hub-label="mediaTypeLabels.report.hub" hub-href="/media/reports" />
  </BaseContainer>
</template>
