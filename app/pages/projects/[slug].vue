<script setup lang="ts">
import { getProjectDetail } from '~/utils/projectsData'

const route = useRoute()
const slug = route.params.slug as string

const project = getProjectDetail(slug)
if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'پروژه یافت نشد' })
}

useSeoMeta({
  title: `${project.name} — ثاخت`,
  description: `${project.usage} · ${project.location}`,
})
</script>

<template>
  <ProjectDetailView :slug="slug" />
</template>
