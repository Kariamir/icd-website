<script setup lang="ts">
import { projects, STATUS } from '~/utils/projectsData'

const list = projects.filter(p => p.status === 'under-construction')
const meta = STATUS['under-construction']

useSeoMeta({ title: `${meta.label} — پروژه‌ها — ثاخت` })
</script>

<template>
  <BaseContainer class="status-index">
    <h1 class="status-index__title">{{ meta.label }}</h1>
    <div v-if="list.length" class="status-index__grid">
      <ProjectCard
        v-for="p in list"
        :key="p.slug"
        :project="{ slug: p.slug, title: p.name, status: p.status }"
      />
    </div>
    <p v-else class="status-index__empty">در این دسته پروژه‌ای ثبت نشده است.</p>
  </BaseContainer>
</template>

<style scoped>
.status-index { padding-block: var(--space-6) var(--space-12); }
.status-index__title { font: var(--text-h2); margin-block-end: var(--space-4); }
.status-index__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
.status-index__empty { color: var(--color-text-muted); }
@media (max-width: 900px) { .status-index__grid { grid-template-columns: 1fr; } }
</style>
