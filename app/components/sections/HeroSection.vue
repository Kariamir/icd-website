<script setup lang="ts">
import type { HeroViewModel } from '~/types/content'

defineProps<{ hero: HeroViewModel; threeD?: boolean }>()
</script>

<template>
  <section class="hero-section">
    <div class="hero-section__media">
      <!-- 3D scenes (home, org-chart, projects map, unit view, virtual tour) mount
           here client-side behind a <ClientOnly> boundary with this image as the
           non-WebGL fallback — required by docs/technical-requirements-icd3d.md §9
           and docs/01-sitemap.md (§3 "باید بدون WebGL هم رندر شود"). 3D scene
           components are tracked separately; see docs/decisions.md ADR-002. -->
      <BaseImage v-if="hero.image" :src="hero.image.src" :alt="hero.image.alt" fit="cover" />
    </div>
    <div class="hero-section__overlay">
      <BaseContainer>
        <p v-if="hero.eyebrow" class="hero-section__eyebrow">{{ hero.eyebrow }}</p>
        <h1 class="hero-section__title">{{ hero.title }}</h1>
        <p v-if="hero.description" class="hero-section__description">{{ hero.description }}</p>
        <BaseButton v-if="hero.primaryAction" :href="hero.primaryAction.href" size="lg" variant="inverse">
          {{ hero.primaryAction.label }}
        </BaseButton>
      </BaseContainer>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-block-size: 70vh;
  color: var(--color-white);
  overflow: hidden;
  background: var(--color-ink);
}
.hero-section__media { position: absolute; inset: 0; }
.hero-section__media :deep(img) { block-size: 100%; inline-size: 100%; object-fit: cover; }
.hero-section__overlay {
  position: relative;
  z-index: 1;
  block-size: 100%;
  min-block-size: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-block-end: var(--space-8);
  background: linear-gradient(to top, var(--color-overlay-black), transparent 60%);
}
.hero-section__eyebrow {
  font: var(--text-label);
  color: var(--color-tint);
  margin-block-end: var(--space-2);
}
.hero-section__title {
  font: var(--text-h1-mobile);
  max-inline-size: 20ch;
}
@media (min-width: 900px) {
  .hero-section__title { font: var(--text-h1); }
}
.hero-section__description {
  font: var(--text-body);
  max-inline-size: 60ch;
  margin-block: var(--space-3);
}
</style>
