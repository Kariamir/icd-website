<script setup lang="ts">
import type { UnitDetailViewModel } from '~/types/content'
import { getSimilarUnits, unitStatusLabels } from '~/utils/unitsData'

const props = defineProps<{ unit: UnitDetailViewModel }>()
const similarUnits = getSimilarUnits(props.unit.id)

const heroImage = props.unit.gallery[0]
const sideImages = props.unit.gallery.slice(1, 4)
const remainingCount = Math.max(props.unit.gallery.length - 4, 0)
</script>

<template>
  <div class="unit-detail">
    <header class="unit-detail__header">
      <div class="unit-detail__badges">
        <span class="unit-detail__badge" :class="`unit-detail__badge--${unit.status}`">{{ unitStatusLabels[unit.status] }}</span>
        <span class="unit-detail__badge unit-detail__badge--tracking">کد رهگیری {{ unit.trackingCode }}</span>
        <span v-if="unit.qualityGrade" class="unit-detail__badge unit-detail__badge--grade">{{ unit.qualityGrade }}</span>
      </div>
      <h1>{{ unit.projectTitle }} — {{ unit.floor }}</h1>
      <p class="unit-detail__location">
        <NuxtLink :to="`/projects/${unit.projectSlug}`">{{ unit.projectTitle }}</NuxtLink>
      </p>

      <div class="unit-detail__stats">
        <div><strong>{{ unit.floor }}</strong><span>طبقه</span></div>
        <div><strong>{{ unit.area }}</strong><span>متراژ</span></div>
        <div><strong>{{ unit.parkingCount }}</strong><span>پارکینگ سندی</span></div>
      </div>
    </header>

    <div v-if="heroImage" class="unit-detail__gallery">
      <div class="unit-detail__gallery-hero">
        <BaseImage :src="heroImage.src" :alt="heroImage.alt || unit.projectTitle" />
        <div class="unit-detail__gallery-scrim" />
        <div class="unit-detail__gallery-hero-footer">
          <span v-if="heroImage.caption" class="unit-detail__gallery-caption">{{ heroImage.caption }}</span>
          <div class="unit-detail__gallery-actions">
            <BaseButton v-if="unit.virtualTourUrl" :href="unit.virtualTourUrl" variant="inverse" size="md">تور مجازی ۳۶۰ درجه</BaseButton>
            <BaseButton v-if="unit.bimModelUrl" :href="unit.bimModelUrl" variant="primary" size="md">مدل BIM سه‌بعدی</BaseButton>
          </div>
        </div>
      </div>
      <div v-if="sideImages.length" class="unit-detail__gallery-side">
        <div
          v-for="(img, i) in sideImages"
          :key="i"
          class="unit-detail__gallery-item"
          :class="{ 'unit-detail__gallery-item--overlay': i === sideImages.length - 1 && remainingCount > 0 }"
        >
          <BaseImage :src="img.src" :alt="img.alt || unit.projectTitle" />
          <span v-if="i === sideImages.length - 1 && remainingCount > 0" class="unit-detail__gallery-more">
            مشاهده تمام {{ unit.gallery.length }} تصویر
          </span>
          <span v-else-if="img.caption" class="unit-detail__gallery-item-caption">{{ img.caption }}</span>
        </div>
      </div>
    </div>

    <div class="unit-detail__layout">
      <div class="unit-detail__main">
        <p class="unit-detail__description">{{ unit.description }}</p>

        <section v-for="group in unit.specGroups" :key="group.title" class="unit-detail__spec-group">
          <h2>{{ group.title }}</h2>
          <dl class="unit-detail__specs">
            <div v-for="spec in group.items" :key="spec.label" class="unit-detail__spec">
              <dt>{{ spec.label }}</dt>
              <dd>{{ spec.value }}</dd>
            </div>
          </dl>
        </section>
      </div>

      <aside class="unit-detail__sidebar">
        <div class="unit-detail__price-box">
          <span class="unit-detail__price-label">قیمت</span>
          <span class="unit-detail__price">{{ unit.priceLabel }}</span>
          <BaseButton href="/sales/consultation" size="lg">درخواست مشاوره خرید</BaseButton>
        </div>
      </aside>
    </div>

    <section v-if="similarUnits.length" class="unit-detail__similar">
      <h2>واحدهای مشابه و پیشنهادی</h2>
      <div class="unit-detail__similar-grid">
        <UnitCard v-for="u in similarUnits" :key="u.id" :unit="u" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.unit-detail__header { padding-block: var(--space-4) var(--space-3); }
.unit-detail__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-block-end: var(--space-2); }
.unit-detail__badge { padding: 4px var(--space-2); font: var(--text-label); background: var(--color-surface); color: var(--color-text); }
.unit-detail__badge--available { background: var(--color-status-success); color: var(--color-white); }
.unit-detail__badge--reserved { background: var(--color-tint); color: var(--color-primary); }
.unit-detail__badge--sold { background: var(--color-ink); color: var(--color-white); }
.unit-detail__badge--tracking { background: var(--color-tint); color: var(--color-primary); }
.unit-detail__badge--grade { background: var(--color-surface-alt); color: var(--color-text); }
.unit-detail__header h1 { font: var(--text-h2); margin-block-end: var(--space-1); }
.unit-detail__location a { color: var(--color-text-muted); text-decoration: none; font: var(--text-body); }
.unit-detail__location a:hover { color: var(--color-primary); }

.unit-detail__stats {
  display: flex;
  gap: var(--space-4);
  margin-block-start: var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  width: fit-content;
}
.unit-detail__stats > div { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.unit-detail__stats strong { font: var(--text-h3); color: var(--color-primary); }
.unit-detail__stats span { font: var(--text-label); color: var(--color-text-muted); }

/* Gallery: bento layout — large hero (with tour/BIM CTAs) + stacked side images */
.unit-detail__gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
  margin-block: var(--space-4);
}
@media (min-width: 1024px) {
  .unit-detail__gallery { grid-template-columns: 2fr 1fr; align-items: stretch; }
}

.unit-detail__gallery-hero {
  position: relative;
  border: 1px solid var(--color-border);
  overflow: hidden;
  aspect-ratio: 16 / 10;
}
.unit-detail__gallery-hero :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.unit-detail__gallery-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(4, 28, 44, 0.75), transparent 55%);
  pointer-events: none;
}
.unit-detail__gallery-hero-footer {
  position: absolute;
  inset-inline: var(--space-3);
  inset-block-end: var(--space-3);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.unit-detail__gallery-caption {
  padding: var(--space-1) var(--space-2);
  background: rgba(4, 28, 44, 0.8);
  color: var(--color-white);
  font: var(--text-label);
}
.unit-detail__gallery-actions { display: flex; gap: var(--space-1); flex-wrap: wrap; }

.unit-detail__gallery-side {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
}
@media (min-width: 1024px) {
  .unit-detail__gallery-side { grid-template-columns: 1fr; }
}
.unit-detail__gallery-item {
  position: relative;
  border: 1px solid var(--color-border);
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
@media (min-width: 1024px) {
  .unit-detail__gallery-item { aspect-ratio: auto; block-size: calc((100% - 2 * var(--space-2)) / 3); }
}
.unit-detail__gallery-item :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.unit-detail__gallery-item-caption {
  position: absolute;
  inset-inline-start: var(--space-1);
  inset-block-end: var(--space-1);
  padding: 2px var(--space-1);
  background: rgba(4, 28, 44, 0.8);
  color: var(--color-white);
  font: var(--text-label);
  font-size: 12px;
}
.unit-detail__gallery-item--overlay .unit-detail__gallery-more {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 2px;
  background: rgba(4, 28, 44, 0.65);
  color: var(--color-white);
  font: var(--text-label);
  cursor: pointer;
}

.unit-detail__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding-block-end: var(--space-6); }
@media (min-width: 1024px) { .unit-detail__layout { grid-template-columns: 2fr 1fr; align-items: start; } }
.unit-detail__main { background: var(--color-white); border: 1px solid var(--color-border); padding: var(--space-3); }
.unit-detail__spec-group + .unit-detail__spec-group { margin-block-start: var(--space-4); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
.unit-detail__spec-group h2 { font: var(--text-h3); margin-block: var(--space-3) var(--space-2); }
.unit-detail__description { font: var(--text-body); color: var(--color-text-muted); }
.unit-detail__specs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }
.unit-detail__spec { display: flex; flex-direction: column; gap: 2px; padding-block-end: var(--space-1); border-block-end: 1px solid var(--color-border); }
.unit-detail__spec dt { font: var(--text-body-sm); color: var(--color-text-muted); }
.unit-detail__spec dd { font: var(--text-label); color: var(--color-text); }

.unit-detail__sidebar { position: sticky; top: var(--space-3); }
.unit-detail__price-box { background: var(--color-ink); color: var(--color-white); padding: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2); }
.unit-detail__price-label { font: var(--text-label); color: var(--color-tint); }
.unit-detail__price { font: var(--text-h3); }

.unit-detail__similar { padding-block-end: var(--space-8); }
.unit-detail__similar h2 { font: var(--text-h2); margin-block-end: var(--space-3); }
.unit-detail__similar-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .unit-detail__similar-grid { grid-template-columns: repeat(3, 1fr); } }
</style>
