<script setup lang="ts">
// `02a-index-card-grid` — breadcrumb + intro banner panel (eyebrow pill,
// title, lead copy, faint architectural watermark). Shared by every page in
// the index family so they read as one template.
export interface IndexGridCrumb { label: string; to?: string }

defineProps<{
  crumbs: IndexGridCrumb[]
  eyebrow?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="index-intro">
    <nav class="index-intro__breadcrumb" aria-label="مسیریاب">
      <template v-for="(c, i) in crumbs" :key="i">
        <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink>
        <span v-else class="index-intro__breadcrumb-current" aria-current="page">{{ c.label }}</span>
        <svg v-if="i < crumbs.length - 1" class="index-intro__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
      </template>
    </nav>

    <header class="index-intro__panel">
      <div class="index-intro__content">
        <span v-if="eyebrow" class="index-intro__eyebrow"><span class="index-intro__dot" />{{ eyebrow }}</span>
        <h1 class="index-intro__title">{{ title }}</h1>
        <p v-if="description" class="index-intro__desc">{{ description }}</p>
        <div v-if="$slots.default" class="index-intro__extra"><slot /></div>
      </div>
      <svg class="index-intro__watermark" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M14 108V30l34-14v92M48 108V44h58v64M6 108h108" />
        <path d="M24 40h12M24 54h12M24 68h12M24 82h12M60 58h10M84 58h10M60 72h10M84 72h10M60 86h10M84 86h10M72 108V96h10v12" />
      </svg>
    </header>
  </div>
</template>

<style scoped>
.index-intro__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2) var(--space-3); }
.index-intro__breadcrumb a { color: inherit; text-decoration: none; }
.index-intro__breadcrumb a:hover { color: var(--color-primary); }
.index-intro__breadcrumb-current { color: var(--color-text); font-weight: 600; }
.index-intro__chevron { color: var(--color-border); flex-shrink: 0; }

.index-intro__panel {
  position: relative;
  overflow: hidden;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  margin-block-end: var(--space-4);
}
.index-intro__content { position: relative; z-index: 1; max-inline-size: 760px; }
.index-intro__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background: var(--color-tint);
  color: var(--color-brand-blue);
  font: var(--text-label);
  font-size: 12px;
  border-radius: var(--radius-pill);
  margin-block-end: var(--space-2);
}
.index-intro__dot { inline-size: 7px; block-size: 7px; border-radius: 50%; background: var(--color-brand-blue); }
.index-intro__title { font: var(--text-h2); font-weight: 700; font-size: clamp(26px, 3.2vw, 36px); letter-spacing: -0.01em; margin-block-end: var(--space-1); }
.index-intro__desc { font: var(--text-body); font-size: 16px; color: var(--color-text-muted); max-inline-size: 64ch; }
.index-intro__extra { margin-block-start: var(--space-2); }
.index-intro__watermark {
  position: absolute;
  inset-inline-end: -12px;
  inset-block-end: -18px;
  inline-size: 220px;
  block-size: 220px;
  color: var(--color-ink);
  opacity: 0.07;
  pointer-events: none;
}

@media (max-width: 720px) {
  .index-intro__panel { padding: var(--space-3); }
  .index-intro__watermark { display: none; }
}
</style>
