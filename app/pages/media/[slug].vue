<script setup lang="ts">
// Route /media/[slug] — design _1 (ADR-013), posts from app/utils/posts.ts (ADR-015).
import { getPost } from '~/utils/posts'

const route = useRoute()
const post = computed(() => getPost(String(route.params.slug)))

if (!post.value) {
  throw createError({ statusCode: 404, message: 'مطلب یافت نشد' })
}

useSeoMeta({
  title: () => `${post.value?.title} — رسانه ثاخت`,
  description: () => post.value?.excerpt ?? '',
})
</script>

<template>
  <MediaPostView v-if="post" :key="post.slug" :post="post" />
</template>
