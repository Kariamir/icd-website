<script setup lang="ts">
import type { UnitDetailViewModel } from '~/types/content'
import { getSimilarUnits, unitStatusLabels } from '~/utils/unitsData'

const props = defineProps<{ unit: UnitDetailViewModel }>()
const similarUnits = getSimilarUnits(props.unit.id)
</script>

<template>
  <div class="unit-detail">
    <header class="unit-detail__header">
      <div class="unit-detail__badges">
        <span class="unit-detail__badge" :class="`unit-detail__badge--${unit.status}`">{{ unitStatusLabels[unit.status] }}</span>
        <span class="unit-detail__badge unit-detail__badge--tracking">کد رهگیری {{ unit.trackingCode }}</span>
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

    <div v-if="unit.gallery.length" class="unit-detail__gallery">
      <div v-for="(img, i) in unit.gallery" :key="i" class="unit-detail__gallery-item">
        <BaseImage :src="img.src" :alt="img.alt || unit.projectTitle" />
      </div>
    </div>

    <div class="unit-detail__layout">
      <div class="unit-detail__main">
        <p class="unit-detail__description">{{ unit.description }}</p>

        <h2>مشخصات فنی</h2>
        <dl class="unit-detail__specs">
          <div v-for="spec in unit.specs" :key="spec.label" class="unit-detail__spec">
            <dt>{{ spec.label }}</dt>
            <dd>{{ spec.value }}</dd>
          </div>
        </dl>
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

.unit-detail__gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-2); margin-block: var(--space-4); }
@media (min-width: 768px) { .unit-detail__gallery { grid-template-columns: repeat(4, 1fr); } }
.unit-detail__gallery-item { aspect-ratio: 4 / 3; border: 1px solid var(--color-border); overflow: hidden; }
.unit-detail__gallery-item :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }

.unit-detail__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding-block-end: var(--space-6); }
@media (min-width: 1024px) { .unit-detail__layout { grid-template-columns: 2fr 1fr; align-items: start; } }
.unit-detail__main { background: var(--color-white); border: 1px solid var(--color-border); padding: var(--space-3); }
.unit-detail__main h2 { font: var(--text-h3); margin-block: var(--space-3) var(--space-2); }
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
