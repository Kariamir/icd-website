<script setup lang="ts">
import { STATUS, getProjectDetail, getRelatedProjects } from '~/utils/projectsData'

// Template `03-project-detail` (docs/page-templates-icd3d.md §7).
// Used for: /projects/[slug], /projects/[slug]/tour — see docs/01-sitemap.md
// §5. Essential parts: hero image/3D scene, status badge, specs table,
// gallery, location map, virtual-tour button, pre-sale CTA (only when
// status = under-construction), owner company (nullable, Option B), related
// projects. Ported 1:1 from the pre-migration React implementation
// (src/pages/ProjectDetail.jsx + .css).
const props = defineProps<{ slug: string }>()

const project = computed(() => getProjectDetail(props.slug))
const related = computed(() => getRelatedProjects(props.slug))

const specs = computed(() => {
  const p = project.value
  if (!p) return []
  return [
    { label: 'متراژ', value: p.area },
    { label: 'طبقات', value: p.floors },
    { label: 'کاربری', value: p.usage },
    { label: 'سال', value: p.year },
  ]
})
</script>

<template>
  <article v-if="project" class="project-detail">
    <header class="project-detail__hero">
      <div class="project-detail__hero-media" aria-hidden="true" />
      <div class="project-detail__hero-overlay">
        <span class="project-detail__badge" :class="`status-${project.status}`">{{ project.statusLabel }}</span>
        <h1 class="project-detail__title">{{ project.name }}</h1>
        <p class="project-detail__location">{{ project.location }}</p>
      </div>
    </header>

    <div class="project-detail__actions">
      <NuxtLink
        v-if="project.status === 'under-construction'"
        class="project-detail__cta project-detail__cta--primary"
        :to="`/sales/pre-sale?project=${project.slug}`"
      >
        پیش‌فروش این پروژه
      </NuxtLink>
      <NuxtLink
        v-if="project.hasTour"
        class="project-detail__cta project-detail__cta--outline"
        :to="`/projects/${project.slug}/tour`"
      >
        تور مجازی
      </NuxtLink>
    </div>

    <div class="project-detail__body">
      <div class="project-detail__main">
        <section aria-labelledby="specs-heading">
          <h2 id="specs-heading" class="project-detail__section-title">مشخصات</h2>
          <dl class="project-detail__specs">
            <div v-for="s in specs" :key="s.label" class="project-detail__specs-row">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.value }}</dd>
            </div>
          </dl>
          <p v-if="project.ownerCompany" class="project-detail__owner">شرکت مالک: {{ project.ownerCompany }}</p>
        </section>

        <section aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" class="project-detail__section-title">گالری</h2>
          <div class="project-detail__gallery">
            <div v-for="i in project.gallerySize" :key="i" class="project-detail__gallery-tile">{{ i }}</div>
          </div>
        </section>
      </div>

      <aside class="project-detail__aside">
        <h2 class="project-detail__section-title">موقعیت</h2>
        <div class="project-detail__location-map" aria-hidden="true">
          <span class="project-detail__location-pin" />
        </div>
        <p class="project-detail__location-caption">{{ project.location }}</p>
      </aside>
    </div>

    <section aria-labelledby="related-heading" class="project-detail__related">
      <h2 id="related-heading" class="project-detail__section-title">پروژه‌های مرتبط</h2>
      <div class="project-detail__related-grid">
        <NuxtLink v-for="p in related" :key="p.slug" class="project-detail__related-card" :to="`/projects/${p.slug}`">
          <div class="project-detail__related-media" aria-hidden="true">{{ p.name[0] }}</div>
          <div>
            <span class="project-detail__badge" :class="`status-${p.status}`">{{ STATUS[p.status].label }}</span>
            <h3 class="project-detail__related-name">{{ p.name }}</h3>
          </div>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.project-detail {
  color: var(--color-ink);
  background: var(--color-white);

  --status-upcoming-bg: var(--color-surface-alt);
  --status-upcoming-fg: var(--color-ink);
  --status-under-construction-bg: var(--color-tint);
  --status-under-construction-fg: var(--color-brand-blue);
  --status-operating-bg: var(--color-brand-blue);
  --status-operating-fg: var(--color-white);
  --status-completed-bg: var(--color-ink);
  --status-completed-fg: var(--color-white);
}

.project-detail__hero { position: relative; min-height: 420px; display: flex; align-items: flex-end; }
.project-detail__hero-media { position: absolute; inset: 0; background: linear-gradient(160deg, var(--color-ink), var(--color-brand-blue) 140%); }
.project-detail__hero-overlay {
  position: relative;
  z-index: 1;
  padding: var(--space-4) var(--space-3);
  color: var(--color-white);
  background: linear-gradient(to top, var(--color-overlay-black), transparent 70%);
  width: 100%;
}

.project-detail__badge { display: inline-block; padding: 3px 10px; font-size: 12px; font-weight: 700; background: var(--status-upcoming-bg); color: var(--status-upcoming-fg); }
.project-detail__badge.status-under-construction { background: var(--status-under-construction-bg); color: var(--status-under-construction-fg); }
.project-detail__badge.status-operating { background: var(--status-operating-bg); color: var(--status-operating-fg); }
.project-detail__badge.status-completed { background: var(--status-completed-bg); color: var(--status-completed-fg); }

.project-detail__title { font-size: clamp(26px, 4vw, 38px); font-weight: 500; margin-block: var(--space-1); }
.project-detail__location { font-size: 14px; opacity: 0.85; }

.project-detail__actions { display: flex; gap: var(--space-2); max-width: var(--container-max); margin-inline: auto; padding: var(--space-3) var(--space-3) 0; }
.project-detail__cta { padding: 14px 28px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 0; transition: background 160ms ease, color 160ms ease; }
.project-detail__cta--primary { background: var(--color-brand-blue); color: var(--color-white); }
.project-detail__cta--primary:hover { background: var(--color-brand-blue-deep); }
.project-detail__cta--outline { background: transparent; color: var(--color-brand-blue); border: 1px solid var(--color-brand-blue); }
.project-detail__cta--outline:hover { background: var(--color-tint); }

.project-detail__body { display: flex; gap: var(--space-4); max-width: var(--container-max); margin-inline: auto; padding: var(--space-4) var(--space-3); align-items: start; }
.project-detail__main { flex: 1; display: flex; flex-direction: column; gap: var(--space-4); }
.project-detail__aside { flex: 0 0 300px; }
.project-detail__section-title { font-size: 19px; font-weight: 600; margin-block-end: var(--space-2); }

.project-detail__specs { margin: 0; border: 1px solid var(--color-border); }
.project-detail__specs-row { display: flex; justify-content: space-between; padding: 12px var(--space-2); border-block-end: 1px solid var(--color-border); font-size: 14px; }
.project-detail__specs-row dt { color: var(--color-ink); opacity: 0.65; }
.project-detail__specs-row dd { margin: 0; font-weight: 600; }
.project-detail__specs-row:last-child { border-block-end: none; }
.project-detail__owner { font-size: 14px; margin-block-start: var(--space-2); opacity: 0.8; }

.project-detail__gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: var(--space-1); }
.project-detail__gallery-tile { aspect-ratio: 4 / 3; background: var(--color-tint); color: var(--color-brand-blue); font-weight: 700; font-size: 18px; display: flex; align-items: center; justify-content: center; }

.project-detail__location-map { position: relative; aspect-ratio: 4 / 3; background: linear-gradient(135deg, var(--color-surface), var(--color-tint) 140%); border: 1px solid var(--color-border); }
.project-detail__location-pin {
  position: absolute; top: 50%; inset-inline-start: 50%;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--color-brand-blue); border: 2px solid var(--color-white);
  box-shadow: 0 1px 4px rgb(4 28 44 / 25%);
  transform: translate(-50%, -50%);
}
.project-detail__location-caption { font-size: 14px; margin-block-start: var(--space-1); opacity: 0.7; }

.project-detail__related { max-width: var(--container-max); margin-inline: auto; padding: 0 var(--space-3) var(--space-12); }
.project-detail__related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--space-3); }
.project-detail__related-card { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2); border: 1px solid var(--color-border); text-decoration: none; color: inherit; transition: border-color 160ms ease; }
.project-detail__related-card:hover { border-color: var(--color-brand-blue); }
.project-detail__related-card:hover .project-detail__related-name { color: var(--color-brand-blue); }
.project-detail__related-media { flex-shrink: 0; width: 56px; height: 56px; background: var(--color-tint); color: var(--color-brand-blue); font-weight: 700; font-size: 20px; display: flex; align-items: center; justify-content: center; }
.project-detail__related-name { display: block; font-size: 16px; font-weight: 600; margin-block-start: 4px; transition: color 160ms ease; }

@media (max-width: 760px) {
  .project-detail__body { flex-direction: column; }
}
</style>
