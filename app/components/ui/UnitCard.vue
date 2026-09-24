<script setup lang="ts">
// Sales unit card — same `02a-index-card-grid` card anatomy as ProjectCard
// (image + scrim, status badge, name overlaid with arrow, chip | meta line,
// stat strip) plus a price footer. Extra fields are optional so existing
// callers passing a plain `UnitViewModel` (UnitDetailView «واحدهای مشابه»)
// keep working.
import type { UnitViewModel } from '~/types/content'
import { unitStatusLabels } from '~/utils/unitsData'

const props = defineProps<{
  unit: UnitViewModel & {
    usageLabel?: string
    bedrooms?: number
    city?: string
    parkingCount?: number
  }
}>()

const fa = (n: number) => n.toLocaleString('fa-IR')
const image = computed(() => props.unit.floorPlanImage ?? { src: `https://picsum.photos/seed/unit-${props.unit.id}-plan/960/640`, alt: '' })
const stats = computed(() => {
  const out = [
    { label: 'متراژ', value: props.unit.area },
    { label: 'طبقه', value: props.unit.floor.replace('طبقه ', '') },
  ]
  if (props.unit.bedrooms) out.push({ label: 'اتاق خواب', value: `${fa(props.unit.bedrooms)} خواب` })
  else if (props.unit.parkingCount) out.push({ label: 'پارکینگ', value: `${fa(props.unit.parkingCount)} واحد` })
  return out
})
</script>

<template>
  <NuxtLink :to="`/sales/units/${unit.id}`" class="unit-card">
    <div class="unit-card__media">
      <BaseImage :src="image.src" :alt="image.alt || unit.projectTitle" />
      <div class="unit-card__scrim" aria-hidden="true" />
      <span class="unit-card__status" :class="`unit-card__status--${unit.status}`">{{ unitStatusLabels[unit.status] }}</span>
      <span class="unit-card__code">کد {{ unit.id }}</span>
      <div class="unit-card__overlay">
        <div class="unit-card__heading">
          <span class="unit-card__location">{{ unit.city ? `${unit.city} — ` : '' }}{{ unit.floor }}</span>
          <h3 class="unit-card__title">{{ unit.projectTitle }}</h3>
        </div>
        <span class="unit-card__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </span>
      </div>
    </div>
    <div class="unit-card__body">
      <div class="unit-card__tags">
        <span v-if="unit.usageLabel" class="unit-card__chip">واحد {{ unit.usageLabel }}</span>
        <span v-if="unit.usageLabel && unit.orientation" class="unit-card__sep" aria-hidden="true">|</span>
        <span v-if="unit.orientation" class="unit-card__meta">جهت: {{ unit.orientation }}</span>
      </div>
      <dl class="unit-card__stats">
        <div v-for="s in stats" :key="s.label">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>
      <div class="unit-card__footer">
        <span class="unit-card__price">{{ unit.priceLabel }}</span>
        <span class="unit-card__cta">جزئیات واحد</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.unit-card {
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
.unit-card:hover { transform: translateY(-4px); box-shadow: 0 16px 32px -10px rgb(4 28 44 / 14%); }
.unit-card:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 3px; }

.unit-card__media { position: relative; block-size: 230px; background: var(--color-surface-alt); overflow: hidden; }
.unit-card__media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 500ms ease-out; }
.unit-card:hover .unit-card__media :deep(img) { transform: scale(1.05); }
.unit-card__scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgb(4 28 44 / 72%), transparent 55%, rgb(0 0 0 / 10%)); }
.unit-card__status {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-end: var(--space-2);
  padding: 4px 12px;
  font: var(--text-label);
  font-size: 12px;
  border-radius: var(--radius-pill);
  background: var(--badge-upcoming-bg);
  color: var(--badge-upcoming-text);
}
.unit-card__status--available { background: var(--color-status-success); color: var(--color-white); }
.unit-card__status--reserved { background: var(--color-tint); color: var(--color-brand-blue); }
.unit-card__status--sold { background: var(--color-ink); color: var(--color-white); }
.unit-card__code {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-2);
  padding: 3px 9px;
  font-size: 11px;
  font-weight: 700;
  background: rgb(4 28 44 / 70%);
  color: var(--color-white);
  border-radius: var(--radius-xs);
}
.unit-card__overlay {
  position: absolute;
  inset-inline: var(--space-2);
  inset-block-end: var(--space-2);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-1);
  color: var(--color-white);
}
.unit-card__heading { display: flex; flex-direction: column; gap: 2px; min-inline-size: 0; }
.unit-card__location { font-size: 12px; font-weight: 600; opacity: 0.85; }
.unit-card__title { font: var(--text-h3); font-weight: 700; color: var(--color-white); }
.unit-card__arrow {
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
.unit-card:hover .unit-card__arrow { transform: scale(1.1); background: var(--color-primary-hover); }

.unit-card__body { flex: 1; display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-3); }
.unit-card__tags { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 12px; min-block-size: 22px; }
.unit-card__chip { padding: 3px 10px; background: var(--color-surface); color: var(--color-text-muted); font-weight: 700; border-radius: var(--radius-xs); }
.unit-card__sep { color: var(--color-border); }
.unit-card__meta { color: var(--color-text-muted); }
.unit-card__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: var(--space-2);
  margin: 0;
  padding-block: var(--space-2);
  border-block: 1px solid var(--color-border);
}
.unit-card__stats dt { font-size: 12px; color: var(--color-text-muted); margin-block-end: 2px; }
.unit-card__stats dd { margin: 0; font-size: 16px; font-weight: 700; }
.unit-card__footer { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-start: auto; }
.unit-card__price { font: var(--text-label); color: var(--color-primary); line-height: 1.5; }
.unit-card__cta { flex-shrink: 0; font-size: 12px; font-weight: 700; color: var(--color-text-muted); }
.unit-card:hover .unit-card__cta { color: var(--color-primary); }

@media (prefers-reduced-motion: reduce) {
  .unit-card, .unit-card__media :deep(img), .unit-card__arrow { transition: none; }
  .unit-card:hover { transform: none; }
}
</style>
