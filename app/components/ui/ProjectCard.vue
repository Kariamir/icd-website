<script setup lang="ts">
// Project card — `02a-index-card-grid` mockup card: full-bleed image with
// scrim, status badge, location + name + arrow overlaid on the image, then
// category chip | builder line, a 2-line excerpt and a 2-column stat strip.
// Every field beyond the base `ProjectCardViewModel` is optional, so plain
// callers (homepage «پروژه‌های شاخص») still render an image-only card.
import type { ProjectCardViewModel } from '~/types/content'

const props = defineProps<{
  project: ProjectCardViewModel & {
    category?: string
    builder?: string
    stats?: { label: string; value: string }[]
  }
}>()

const image = computed(() => props.project.image ?? {
  src: `/img/placeholder.svg
  alt: props.project.title,
})
const hasBody = computed(() => Boolean(props.project.category || props.project.builder || props.project.excerpt || props.project.stats?.length))
</script>

<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="project-card">
    <div class="project-card__media">
      <BaseImage :src="image.src" :alt="image.alt || project.title" />
      <div class="project-card__scrim" aria-hidden="true" />
      <StatusBadge :status="project.status" class="project-card__badge" />
      <div class="project-card__overlay">
        <div class="project-card__heading">
          <span v-if="project.location" class="project-card__location">{{ project.location }}</span>
          <h3 class="project-card__title">{{ project.title }}</h3>
        </div>
        <span class="project-card__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </span>
      </div>
    </div>
    <div v-if="hasBody" class="project-card__body">
      <div v-if="project.category || project.builder" class="project-card__tags">
        <span v-if="project.category" class="project-card__chip">{{ project.category }}</span>
        <span v-if="project.category && project.builder" class="project-card__sep" aria-hidden="true">|</span>
        <span v-if="project.builder" class="project-card__builder">سازنده: {{ project.builder }}</span>
      </div>
      <p v-if="project.excerpt" class="project-card__excerpt">{{ project.excerpt }}</p>
      <dl v-if="project.stats?.length" class="project-card__stats">
        <div v-for="s in project.stats" :key="s.label">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>
    </div>
  </NuxtLink>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms cubic-bezier(0.16, 1, 0.3, 1);
}
.project-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -10px rgb(4 28 44 / 14%); }
.project-card:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }

.project-card__media { position: relative; block-size: 280px; background: var(--color-surface-alt); overflow: hidden; }
.project-card__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 500ms ease-out; }
.project-card:hover .project-card__media :deep(img) { transform: scale(1.05); }
.project-card__scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgb(4 28 44 / 72%), transparent 55%, rgb(0 0 0 / 10%)); }
.project-card__badge { position: absolute; inset-block-start: var(--space-2); inset-inline-end: var(--space-2); font-size: 12px; }
.project-card__overlay {
  position: absolute;
  inset-inline: var(--space-2);
  inset-block-end: var(--space-2);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-1);
  color: var(--color-white);
}
.project-card__heading { display: flex; flex-direction: column; gap: 2px; min-inline-size: 0; }
.project-card__location { font-size: 12px; font-weight: 600; opacity: 0.85; }
.project-card__title { font: var(--text-h3); font-weight: 700; color: var(--color-white); }
.project-card__arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: 40px;
  block-size: 40px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 6px 16px rgb(0 0 0 / 25%);
  transition: transform 250ms ease, background-color 250ms ease;
}
.project-card:hover .project-card__arrow { transform: scale(1.1); background: var(--color-primary-hover); }

.project-card__body { flex: 1; display: flex; flex-direction: column; padding: var(--space-3); }
.project-card__tags { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-block-end: 12px; font-size: 12px; }
.project-card__chip { padding: 3px 10px; background: var(--color-surface); color: var(--color-text-muted); font-weight: 700; border-radius: var(--radius-xs); }
.project-card__sep { color: var(--color-border); }
.project-card__builder { color: var(--color-text-muted); }
.project-card__excerpt {
  font: var(--text-body-sm);
  color: var(--color-text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-block-end: var(--space-3);
}
.project-card__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: var(--space-2);
  margin: auto 0 0;
  padding-block-start: var(--space-2);
  border-block-start: 1px solid var(--color-border);
}
.project-card__stats dt { font-size: 12px; color: var(--color-text-muted); margin-block-end: 2px; }
.project-card__stats dd { margin: 0; font-size: 17px; font-weight: 700; }

@media (prefers-reduced-motion: reduce) {
  .project-card, .project-card__media :deep(img), .project-card__arrow { transition: none; }
  .project-card:hover { transform: none; }
}
</style>
