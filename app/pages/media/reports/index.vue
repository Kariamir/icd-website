<script setup lang="ts">
import { getArticlesByType, mediaTypeLabels } from '~/utils/articlesData'

const articleList = getArticlesByType('report')

useSeoMeta({
  title: `${mediaTypeLabels.report.hub} — ثاخت`,
  description: 'گزارش‌های تخصصی مدیریت بازار و کارنامه اجرایی هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <ArticleIndexList
      :title="mediaTypeLabels.report.hub"
      description="گزارش‌های تخصصی مدیریت بازار و کارنامه اجرایی هلدینگ ساختمانی ثاخت."
      :articles="articleList"
      hub-href="/media/reports"
    />
  </BaseContainer>
</template>
