<script setup lang="ts">
import { getArticle, mediaTypeLabels } from '~/utils/articlesData'

const route = useRoute()
const slug = route.params.slug as string
const article = getArticle('story', slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'مطلب یافت نشد' })
}

useSeoMeta({
  title: `${article.title} — ثاخت`,
  description: article.excerpt,
})
</script>

<template>
  <BaseContainer>
    <ArticleDetailView :article="article" :hub-label="mediaTypeLabels.story.hub" hub-href="/media/stories" />
  </BaseContainer>
</template>
