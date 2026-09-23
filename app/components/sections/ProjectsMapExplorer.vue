<script setup lang="ts">
import { STATUS, projects, featuredProject, getProjectDetail, type ProjectStatusKey } from '~/utils/projectsData'

// Template `01b-cluster-hub-visual` (docs/page-templates-icd3d.md §3).
// Used for: /projects, /projects/map — see docs/01-sitemap.md §5.
// Essential parts: interactive map with project pins, 4-status filter,
// a scrollable project card list synced to the map (hover/focus a card to
// highlight its pin), hover/click floating map card, links to the four
// status indexes, featured project. The map itself is a placeholder panel —
// real 3D Tehran map engine is docs/02-build-checklist.md Phase 6/7, out of
// scope here.

const activeStatus = ref<ProjectStatusKey | 'all'>('all')
const activeSlug = ref(featuredProject.slug)

const visibleProjects = computed(() =>
  activeStatus.value === 'all'
    ? projects
    : projects.filter(p => p.status === activeStatus.value),
)

// One detail lookup per visible project, done once here rather than
// repeatedly in the template.
const visibleProjectCards = computed(() =>
  visibleProjects.value.map(p => ({ ...p, detail: getProjectDetail(p.slug) })),
)

const activeProject = computed(() => projects.find(p => p.slug === activeSlug.value))

const statusEntries = Object.entries(STATUS) as [ProjectStatusKey, typeof STATUS[ProjectStatusKey]][]

function countByStatus(key: ProjectStatusKey) {
  return projects.filter(p => p.status === key).length
}
</script>

<template>
  <div class="map-explorer">
    <div class="map-explorer__filters" role="group" aria-label="فیلتر وضعیت پروژه">
      <button
        type="button"
        class="map-explorer__filter-pill"
        :class="{ 'is-active': activeStatus === 'all' }"
        @click="activeStatus = 'all'"
      >
        همه پروژه‌ها
      </button>
      <button
        v-for="[key, meta] in statusEntries"
        :key="key"
        type="button"
        class="map-explorer__filter-pill"
        :class="[`status-${key}`, { 'is-active': activeStatus === key }]"
        @click="activeStatus = key"
      >
        {{ meta.label }}
      </button>
    </div>

    <div class="map-explorer__body">
      <aside class="map-explorer__panel">
        <ul class="map-explorer__list" aria-label="فهرست پروژه‌ها">
          <li v-for="card in visibleProjectCards" :key="card.slug">
            <NuxtLink
              :to="`/projects/${card.slug}`"
              class="map-explorer__list-card"
              :class="{ 'is-active': card.slug === activeSlug }"
              @mouseenter="activeSlug = card.slug"
              @focus="activeSlug = card.slug"
            >
              <div class="map-explorer__list-card-head">
                <span class="map-explorer__badge" :class="`status-${card.status}`">{{ STATUS[card.status].label }}</span>
                <span v-if="card.featured" class="map-explorer__list-card-featured">پروژه شاخص</span>
              </div>
              <h3 class="map-explorer__list-card-name">{{ card.name }}</h3>
              <p v-if="card.detail" class="map-explorer__list-card-location">{{ card.detail.location }}</p>
              <div v-if="card.detail" class="map-explorer__list-card-stats">
                <span>{{ card.detail.area }}</span>
                <span>{{ card.detail.floors }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>

        <ul class="map-explorer__status-links">
          <li v-for="[key, meta] in statusEntries" :key="key">
            <NuxtLink :to="meta.index" class="map-explorer__status-link">
              <span class="map-explorer__dot" :class="`status-${key}`" aria-hidden="true" />
              <span class="map-explorer__status-label">{{ meta.label }}</span>
              <span class="map-explorer__status-count">{{ countByStatus(key) }} پروژه</span>
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="map-explorer__map">
        <button
          v-for="p in visibleProjects"
          :key="p.slug"
          type="button"
          class="map-explorer__pin"
          :class="[`status-${p.status}`, { 'is-active': p.slug === activeSlug }]"
          :style="{ insetInlineStart: `${p.x}%`, top: `${p.y}%` }"
          :aria-label="`${p.name} — ${STATUS[p.status].label}`"
          @mouseenter="activeSlug = p.slug"
          @focus="activeSlug = p.slug"
        />

        <NuxtLink
          v-if="activeProject"
          :key="activeProject.slug"
          :to="`/projects/${activeProject.slug}`"
          class="map-explorer__card"
          :style="{ insetInlineStart: `${activeProject.x}%`, top: `${activeProject.y}%` }"
        >
          <span class="map-explorer__badge" :class="`status-${activeProject.status}`">
            {{ STATUS[activeProject.status].label }}
          </span>
          <span class="map-explorer__card-name">{{ activeProject.name }}</span>
        </NuxtLink>

        <p class="map-explorer__map-note">نقشه سه‌بعدی تعاملی در فاز بعد جایگزین این نسخه می‌شود</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-explorer {
  color: var(--color-ink);
  background: var(--color-white);
  max-width: var(--container-max);
  margin-inline: auto;
  padding: var(--space-4) var(--space-3) var(--space-12);

  --status-upcoming-bg: var(--color-surface-alt);
  --status-upcoming-fg: var(--color-ink);
  --status-under-construction-bg: var(--color-tint);
  --status-under-construction-fg: var(--color-brand-blue);
  --status-operating-bg: var(--color-brand-blue);
  --status-operating-fg: var(--color-white);
  --status-completed-bg: var(--color-ink);
  --status-completed-fg: var(--color-white);
}

.map-explorer__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-block-end: var(--space-3);
}

.map-explorer__filter-pill {
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-ink);
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 0;
  transition: border-color 160ms ease;
}
.map-explorer__filter-pill:hover { border-color: var(--color-brand-blue); }

.map-explorer__filter-pill.is-active {
  background: var(--status-upcoming-bg);
  color: var(--status-upcoming-fg);
  border-color: transparent;
}
.map-explorer__filter-pill.status-under-construction.is-active {
  background: var(--status-under-construction-bg);
  color: var(--status-under-construction-fg);
}
.map-explorer__filter-pill.status-operating.is-active {
  background: var(--status-operating-bg);
  color: var(--status-operating-fg);
}
.map-explorer__filter-pill.status-completed.is-active {
  background: var(--status-completed-bg);
  color: var(--status-completed-fg);
}

.map-explorer__body {
  display: flex;
  gap: var(--space-3);
  align-items: stretch;
}

.map-explorer__panel {
  flex: 0 0 340px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-height: 420px;
}

/* Scrollable project card list — synced with the map via activeSlug */
.map-explorer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  border: 1px solid var(--color-border);
  padding: var(--space-2);
  background: var(--color-surface);
}

.map-explorer__list-card {
  display: block;
  padding: var(--space-2);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-inline-start: 3px solid transparent;
  text-decoration: none;
  color: var(--color-ink);
  transition: border-color 160ms ease, background 160ms ease;
}
.map-explorer__list-card:hover,
.map-explorer__list-card:focus-visible {
  border-color: var(--color-border);
  border-inline-start-color: var(--color-brand-blue);
}
.map-explorer__list-card.is-active {
  border-inline-start-color: var(--color-brand-blue);
  background: var(--color-tint);
}

.map-explorer__list-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
  margin-block-end: var(--space-1);
}

.map-explorer__list-card-featured {
  font-size: 12px;
  font-weight: 700;
  color: var(--color-brand-blue);
}

.map-explorer__list-card-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.map-explorer__list-card-location {
  font-size: 13px;
  color: var(--color-ink);
  opacity: 0.65;
  margin: 0 0 var(--space-1);
}

.map-explorer__list-card-stats {
  display: flex;
  gap: var(--space-2);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  opacity: 0.85;
}

.map-explorer__status-links {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  flex-shrink: 0;
}

.map-explorer__status-link {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: 14px var(--space-2);
  text-decoration: none;
  color: var(--color-ink);
  border-block-end: 1px solid var(--color-border);
  transition: background 160ms ease;
}
.map-explorer__status-link:hover { background: var(--color-surface); }

.map-explorer__status-links li:last-child .map-explorer__status-link { border-block-end: none; }

.map-explorer__dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  background: var(--status-upcoming-bg);
  border: 1px solid var(--color-border);
}
.map-explorer__dot.status-under-construction { background: var(--status-under-construction-fg); border-color: transparent; }
.map-explorer__dot.status-operating { background: var(--status-operating-bg); border-color: transparent; }
.map-explorer__dot.status-completed { background: var(--status-completed-bg); border-color: transparent; }

.map-explorer__status-label { font-size: 14px; font-weight: 600; flex: 1; }
.map-explorer__status-count { font-size: 14px; color: var(--color-ink); opacity: 0.6; }

.map-explorer__map {
  position: relative;
  flex: 1;
  min-height: 420px;
  background: linear-gradient(135deg, var(--color-surface), var(--color-tint) 140%);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.map-explorer__pin {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  background: var(--status-upcoming-fg);
  box-shadow: 0 1px 4px rgb(4 28 44 / 25%);
  cursor: pointer;
  padding: 0;
  transform: translate(-50%, -50%);
}
.map-explorer__pin.status-under-construction { background: var(--status-under-construction-fg); }
.map-explorer__pin.status-operating { background: var(--status-operating-bg); }
.map-explorer__pin.status-completed { background: var(--status-completed-bg); }
.map-explorer__pin.is-active,
.map-explorer__pin:hover,
.map-explorer__pin:focus-visible {
  outline: 2px solid var(--color-brand-blue);
  outline-offset: 2px;
}

.map-explorer__card {
  position: absolute;
  transform: translate(-50%, calc(-100% - 16px));
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  background: var(--color-white);
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 16px rgb(4 28 44 / 15%);
  text-decoration: none;
  color: var(--color-ink);
  min-width: 160px;
}
.map-explorer__card:hover .map-explorer__card-name { color: var(--color-brand-blue); }

.map-explorer__card-name { font-size: 14px; font-weight: 700; }

.map-explorer__badge {
  display: inline-block;
  align-self: flex-start;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 700;
  background: var(--status-upcoming-bg);
  color: var(--status-upcoming-fg);
}
.map-explorer__badge.status-under-construction { background: var(--status-under-construction-bg); color: var(--status-under-construction-fg); }
.map-explorer__badge.status-operating { background: var(--status-operating-bg); color: var(--status-operating-fg); }
.map-explorer__badge.status-completed { background: var(--status-completed-bg); color: var(--status-completed-fg); }

.map-explorer__map-note {
  position: absolute;
  bottom: var(--space-1);
  inset-inline-end: var(--space-1);
  font-size: 12px;
  color: var(--color-ink);
  opacity: 0.5;
  margin: 0;
}

@media (max-width: 760px) {
  .map-explorer__body { flex-direction: column; }
  .map-explorer__panel { min-height: 0; }
  .map-explorer__list { max-height: 360px; }
}
</style>
