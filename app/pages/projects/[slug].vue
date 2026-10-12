<script setup lang="ts">
// Route /projects/[slug] — design 03_project_detail (ADR-013), data from the catalog (ADR-015).
import { getProject } from '~/utils/catalog'

const route = useRoute()
const project = computed(() => getProject(String(route.params.slug)))

if (!project.value) {
  throw createError({ statusCode: 404, message: 'پروژه یافت نشد' })
}

useSeoMeta({
  title: () => `${project.value?.name} — هلدینگ ساختمانی ثاخت`,
  description: () => project.value?.excerpt ?? '',
})
</script>

<template>
  <ProjectDetailStitchView v-if="project" :project="project" />
</template>
