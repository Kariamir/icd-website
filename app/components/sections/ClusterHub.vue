<script setup lang="ts">
import type { ClusterHubContent } from '~/utils/clusterHubData'

// Template `01a-cluster-hub-simple` (docs/page-templates-icd3d.md §2).
// Used for: /about, /sales, /ir, /media — see docs/01-sitemap.md.
// Essential parts only: cluster banner, one intro paragraph, 4–8 linked
// cards. No deep content. Ported 1:1 from the pre-migration React
// implementation (src/pages/ClusterHub.jsx + .css).
defineProps<ClusterHubContent>()
</script>

<template>
  <div class="cluster-hub">
    <header class="cluster-hub__banner">
      <p class="cluster-hub__eyebrow">{{ eyebrow }}</p>
      <h1 class="cluster-hub__title">{{ title }}</h1>
      <p class="cluster-hub__intro">{{ intro }}</p>
      <a class="cluster-hub__cta" href="#cluster-hub-grid">
        <span>مشاهده زیرمجموعه‌ها</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M10.5 3.5 4.5 7l6 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </header>

    <div id="cluster-hub-grid" class="cluster-hub__grid">
      <NuxtLink v-for="card in cards" :key="card.href" :to="card.href" class="cluster-hub__card">
        <div class="cluster-hub__card-media" aria-hidden="true">
          <span>{{ card.title[0] }}</span>
        </div>
        <h2 class="cluster-hub__card-title">{{ card.title }}</h2>
        <p class="cluster-hub__card-desc">{{ card.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.cluster-hub {
  font: var(--text-body);
  font-size: initial;
  color: var(--color-ink);
  background: var(--color-white);
}

.cluster-hub__banner {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-12) var(--space-3) var(--space-8);
  text-align: center;
}

.cluster-hub__eyebrow {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-brand-blue);
  margin-block-end: var(--space-2);
}

.cluster-hub__title {
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 500;
  line-height: 1.25;
  margin-block-end: var(--space-3);
}

.cluster-hub__intro {
  font-size: 18px;
  line-height: 1.8;
  color: var(--color-ink);
  max-width: 640px;
  margin-inline: auto;
  margin-block-end: var(--space-4);
}

.cluster-hub__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 14px 28px;
  background: var(--color-brand-blue);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 0;
  transition: background 160ms ease;
}

.cluster-hub__cta svg {
  transform: scaleX(-1); /* RTL: forward-pointing arrow reads right-to-left */
}

.cluster-hub__cta:hover {
  background: var(--color-brand-blue-deep);
}

.cluster-hub__grid {
  max-width: var(--container-max);
  margin-inline: auto;
  padding: 0 var(--space-3) var(--space-12);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-3);
}

.cluster-hub__card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  transition: border-color 160ms ease, transform 160ms ease;
}

.cluster-hub__card:hover {
  border-color: var(--color-brand-blue);
  transform: translateY(-2px);
}

.cluster-hub__card:hover .cluster-hub__card-title {
  color: var(--color-brand-blue);
}

.cluster-hub__card-media {
  aspect-ratio: 16 / 10;
  background: var(--color-tint);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cluster-hub__card-media span {
  font-size: 32px;
  font-weight: 700;
  color: var(--color-brand-blue);
}

.cluster-hub__card-title {
  font-size: 19px;
  font-weight: 600;
  margin: var(--space-2) var(--space-2) var(--space-1);
  transition: color 160ms ease;
}

.cluster-hub__card-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-ink);
  opacity: 0.72;
  margin: 0 var(--space-2) var(--space-2);
}
</style>
