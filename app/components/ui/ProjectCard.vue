<script setup lang="ts">
import type { ProjectCardViewModel } from '~/types/content'
defineProps<{ project: ProjectCardViewModel }>()
</script>

<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="project-card">
    <div class="project-card__media">
      <BaseImage v-if="project.image" :src="project.image.src" :alt="project.image.alt" />
    </div>
    <div class="project-card__body">
      <StatusBadge :status="project.status" />
      <h3 class="project-card__title">{{ project.title }}</h3>
      <p v-if="project.location" class="project-card__meta">{{ project.location }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.project-card { display: block; text-decoration: none; color: inherit; }
.project-card__media { aspect-ratio: 4 / 3; background: var(--color-surface); overflow: hidden; }
.project-card__media :deep(img) { block-size: 100%; inline-size: 100%; object-fit: cover; }
.project-card__body { padding-block-start: var(--space-2); display: flex; flex-direction: column; gap: 6px; }
.project-card__title { font: var(--text-h3); }
.project-card__meta { font: var(--text-body-sm); color: var(--color-text-muted); }
</style>
