<script setup lang="ts">
import type { OrgIcon, OrgLevelKey } from '~/utils/orgChartData'
import {
  ORG_SUBSIDIARIES_PREVIEW,
  getOrgNodeDetail,
  orgAssembly,
  orgBoard,
  orgCharter,
  orgChartHero,
  orgCommittees,
  orgCommitteesIntro,
  orgCompliance,
  orgExecutive,
  orgLevelTabs,
  orgSubsidiaries,
  orgSubsidiariesIntro,
  orgVicePresidencies,
} from '~/utils/orgChartData'

// Template `05c-orgchart` rebuilt to follow
// `project_detail_page_template/05c_orgchart_3d_component/code.html`:
// dark hero (breadcrumb, badge, title, PDF/print actions) → sticky level
// tabs + member/unit search → level 0 general assembly with metrics and a
// connector → level 1 board matrix → level 2 committees + compliance score
// beside the CEO office and four vice-presidencies → level 3 subsidiary
// cards with an expandable "other subsidiaries" strip → level 4 governance
// charter. Every node is selectable and opens a detail panel. Per ADR-003
// there is no WebGL: depth is suggested with CSS perspective/elevation only.

const activeLevel = ref<'all' | OrgLevelKey>('all')
const query = ref('')
const selectedId = ref<string | null>(null)
const showAllSubsidiaries = ref(false)
const closeBtn = ref<HTMLButtonElement | null>(null)

const q = computed(() => query.value.trim())
function hit(...fields: (string | undefined)[]) {
  if (!q.value) return true
  return fields.some(f => f?.includes(q.value))
}

const levelOn = (key: OrgLevelKey) => activeLevel.value === 'all' || activeLevel.value === key

const showAssembly = computed(() => levelOn('board') && hit(orgAssembly.title, orgAssembly.text))
const boardMembers = computed(() => levelOn('board') ? orgBoard.members.filter(m => hit(m.name, m.roleBadge, m.position, m.representing, m.education)) : [])
const committees = computed(() => levelOn('committees') ? orgCommittees.filter(c => hit(c.name, c.chairLabel, c.note, c.statusLabel)) : [])
const vicePresidencies = computed(() => levelOn('executive') ? orgVicePresidencies.filter(v => hit(v.title, v.eyebrow, v.head, v.text, ...v.units)) : [])
const showExecutive = computed(() => levelOn('executive') && (hit(orgExecutive.title, orgExecutive.head, orgExecutive.text) || vicePresidencies.value.length > 0))
const matchedSubsidiaries = computed(() => levelOn('subsidiaries') ? orgSubsidiaries.filter(s => hit(s.name, s.badge, s.ceo, s.text)) : [])
const visibleSubsidiaries = computed(() => (q.value || showAllSubsidiaries.value) ? matchedSubsidiaries.value : matchedSubsidiaries.value.slice(0, ORG_SUBSIDIARIES_PREVIEW))
const hiddenSubsidiaries = computed(() => orgSubsidiaries.slice(ORG_SUBSIDIARIES_PREVIEW))
const showCompliance = computed(() => levelOn('committees') && !q.value)
const showCharter = computed(() => activeLevel.value === 'all' && !q.value)

const matchCount = computed(() => Number(showAssembly.value) + boardMembers.value.length + committees.value.length + vicePresidencies.value.length + Number(showExecutive.value) + matchedSubsidiaries.value.length)

const selectedDetail = computed(() => (selectedId.value ? getOrgNodeDetail(selectedId.value) : null))

function select(id: string) {
  selectedId.value = id
  nextTick(() => closeBtn.value?.focus())
}
function closePanel() { selectedId.value = null }
function onKey(e: KeyboardEvent) { if (e.key === 'Escape') closePanel() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

function printChart() { window.print() }
function resetFilters() { query.value = ''; activeLevel.value = 'all' }

const icons: Record<OrgIcon, string> = {
  engineering: 'M4 20h16M6 20v-6a6 6 0 0 1 12 0v6M9 14V9h6v5M12 4v2',
  finance: 'M4 19h16M6 16V10M10 16V7M14 16v-4M18 16V5',
  companies: 'M3 21h18M5 21V7l7-4 7 4v14M9 10h2M13 10h2M9 14h2M13 14h2',
  sales: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-5h4v5',
  policy: 'M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Zm-3 9 2 2 4-4',
  risk: 'M12 3 2 20h20L12 3Zm0 6v5m0 3v.5',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 9a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M21 20a6 6 0 0 0-4-5.6',
}
</script>

<template>
  <div class="org">
    <section class="org__hero">
      <BaseContainer>
        <nav class="org__breadcrumb" aria-label="مسیریاب">
          <NuxtLink to="/">صفحه اصلی</NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink to="/about">درباره ثاخت</NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="org__breadcrumb-current">چارت سازمانی و ساختار حاکمیت شرکتی</span>
        </nav>
        <div class="org__hero-row">
          <div class="org__hero-text">
            <span class="org__hero-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path :d="icons.companies" /></svg>
              {{ orgChartHero.badge }}
            </span>
            <h1>{{ orgChartHero.title }}</h1>
            <p>{{ orgChartHero.intro }}</p>
          </div>
          <div class="org__hero-actions">
            <NuxtLink to="/ir/governance" class="org__btn org__btn--inverse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" /></svg>
              دانلود نمودار مصوب PDF
            </NuxtLink>
            <button type="button" class="org__btn org__btn--ghost" @click="printChart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z" /></svg>
              چاپ ساختار
            </button>
          </div>
        </div>
      </BaseContainer>
    </section>

    <div class="org__toolbar">
      <BaseContainer>
        <div class="org__toolbar-row">
          <div class="org__tabs" role="tablist" aria-label="سطوح ساختار سازمانی">
            <button
              v-for="tab in orgLevelTabs"
              :key="tab.key"
              type="button"
              role="tab"
              :aria-selected="activeLevel === tab.key"
              :class="{ 'is-active': activeLevel === tab.key }"
              @click="activeLevel = tab.key"
            >
              {{ tab.label }}<template v-if="tab.key === 'subsidiaries'"> ({{ orgSubsidiaries.length }} شرکت)</template>
            </button>
          </div>
          <label class="org__search">
            <span class="visually-hidden">جستجوی نام مدیر یا واحد سازمانی</span>
            <input v-model="query" type="search" placeholder="جستجوی نام مدیر یا واحد سازمانی...">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          </label>
        </div>
      </BaseContainer>
    </div>

    <BaseContainer>
      <div class="org__stage">
        <p v-if="q" class="org__result-note" role="status">
          {{ matchCount }} نتیجه برای «{{ q }}»
          <button type="button" @click="query = ''">پاک کردن جستجو</button>
        </p>

        <div v-if="matchCount === 0" class="org__empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M8 11h6" /></svg>
          <h2>مدیر یا واحدی با این مشخصات پیدا نشد</h2>
          <p>نام، سمت یا عنوان واحد را بررسی کنید یا فیلتر سطح سازمانی را به «ساختار کامل» برگردانید.</p>
          <button type="button" class="org__btn org__btn--primary" @click="resetFilters">نمایش ساختار کامل</button>
        </div>

        <!-- Level 0: general assembly -->
        <div v-if="showAssembly" class="org__level org__level--assembly">
          <button type="button" class="org__assembly" :class="{ 'is-selected': selectedId === orgAssembly.id }" @click="select(orgAssembly.id)">
            <span class="org__chip">{{ orgAssembly.badge }}</span>
            <h2>{{ orgAssembly.title }}</h2>
            <p>{{ orgAssembly.text }}</p>
            <span class="org__assembly-metrics">
              <span v-for="m in orgAssembly.metrics" :key="m.label">
                <small>{{ m.label }}</small>
                <strong :class="{ 'is-accent': m.accent }">{{ m.value }}</strong>
              </span>
            </span>
          </button>
          <div v-if="boardMembers.length" class="org__connector" aria-hidden="true"><span /><i /><span /></div>
        </div>

        <!-- Level 1: board of directors -->
        <section v-if="boardMembers.length" class="org__board" aria-labelledby="org-board-title">
          <header class="org__board-head">
            <div class="org__board-title">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path :d="icons.people" /></svg>
              <div>
                <h2 id="org-board-title">{{ orgBoard.title }}</h2>
                <p>{{ orgBoard.subtitle }}</p>
              </div>
            </div>
            <span class="org__board-term">{{ orgBoard.term }}</span>
          </header>
          <div class="org__board-grid">
            <article
              v-for="m in boardMembers"
              :key="m.id"
              class="org__member"
              :class="{ 'org__member--featured': m.featured, 'is-selected': selectedId === m.id }"
            >
              <div>
                <div class="org__portrait">
                  <BaseImage :src="m.image" :alt="m.name" />
                  <span class="org__portrait-badge" :class="`org__portrait-badge--${m.badgeTone}`">{{ m.roleBadge }}</span>
                </div>
                <span class="org__member-rep">{{ m.representing }}</span>
                <h3>{{ m.name }}</h3>
                <p class="org__member-position">{{ m.position }}</p>
                <div class="org__member-meta">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m2 9 10-5 10 5-10 5L2 9Zm4 2v5c3 2 9 2 12 0v-5" /></svg>
                    {{ m.education }}
                  </span>
                  <p>{{ m.background }}</p>
                </div>
              </div>
              <button type="button" class="org__member-btn" :class="{ 'org__member-btn--primary': m.featured }" @click="select(m.id)">
                {{ m.featured ? 'مشاهده احکام و سوابق' : 'مشاهده رزومه و سوابق' }}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
              </button>
            </article>
          </div>
        </section>

        <div v-if="boardMembers.length && (committees.length || showExecutive) && !q" class="org__connector" aria-hidden="true"><span /><i /><span /></div>

        <!-- Level 2: committees (2A) + executive branch (2B) -->
        <div
          v-if="committees.length || showCompliance || showExecutive"
          class="org__level2"
          :class="{ 'org__level2--single': !(committees.length || showCompliance) || !showExecutive }"
        >
          <div v-if="committees.length || showCompliance" class="org__committees-col">
            <div v-if="committees.length" class="org__committees">
              <div class="org__committees-head">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path :d="icons.policy" /></svg>
                  {{ orgCommitteesIntro.title }}
                </h3>
                <span class="org__chip">{{ orgCommitteesIntro.badge }}</span>
              </div>
              <p class="org__committees-intro">{{ orgCommitteesIntro.text }}</p>
              <button
                v-for="c in committees"
                :key="c.id"
                type="button"
                class="org__committee"
                :class="{ 'is-selected': selectedId === c.id }"
                @click="select(c.id)"
              >
                <span class="org__committee-top">
                  <strong>{{ c.name }}</strong>
                  <span class="org__status" :class="`org__status--${c.statusTone}`">{{ c.statusLabel }}</span>
                </span>
                <span class="org__committee-chair">{{ c.chairLabel }}</span>
                <span class="org__committee-note">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v15H4zM4 10h16M9 3v4M15 3v4" /></svg>
                  {{ c.note }}
                </span>
              </button>
            </div>
            <div v-if="showCompliance" class="org__compliance">
              <div class="org__compliance-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3 8-8M20 12v7H4V5h11" /></svg>
                {{ orgCompliance.title }}
              </div>
              <div class="org__compliance-score">
                <strong>{{ orgCompliance.score }}</strong>
                <span>{{ orgCompliance.rank }}</span>
              </div>
              <div class="org__compliance-bar" aria-hidden="true"><span style="inline-size: 94.2%" /></div>
              <p>{{ orgCompliance.text }}</p>
            </div>
          </div>

          <div v-if="showExecutive" class="org__exec-col">
            <button type="button" class="org__ceo" :class="{ 'is-selected': selectedId === orgExecutive.id }" @click="select(orgExecutive.id)">
              <span class="org__ceo-photo"><BaseImage :src="orgExecutive.image" :alt="orgExecutive.head" /></span>
              <span class="org__ceo-text">
                <span class="org__chip">{{ orgExecutive.badge }}</span>
                <strong>{{ orgExecutive.title }}</strong>
                <span>{{ orgExecutive.text }}</span>
              </span>
              <span class="org__ceo-chips">
                <span>{{ orgVicePresidencies.length }} معاونت کلیدی</span>
                <span>{{ orgSubsidiaries.length }} شرکت عملیاتی</span>
              </span>
            </button>
            <div v-if="vicePresidencies.length" class="org__vp-grid">
              <button
                v-for="vp in vicePresidencies"
                :key="vp.id"
                type="button"
                class="org__vp"
                :class="{ 'is-selected': selectedId === vp.id }"
                @click="select(vp.id)"
              >
                <span class="org__vp-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[vp.icon]" /></svg>
                </span>
                <span class="org__vp-eyebrow">{{ vp.eyebrow }}</span>
                <strong>{{ vp.title }}</strong>
                <span class="org__vp-text">{{ vp.text }}</span>
                <span class="org__vp-foot">
                  <span>{{ vp.head }}</span>
                  <span class="org__vp-metric">{{ vp.metric }}</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Level 3: subsidiaries -->
        <section v-if="matchedSubsidiaries.length" class="org__subs" aria-labelledby="org-subs-title">
          <header class="org__subs-head">
            <div>
              <span class="org__chip">{{ orgSubsidiariesIntro.badge }}</span>
              <h2 id="org-subs-title">{{ orgSubsidiariesIntro.title }}</h2>
              <p>{{ orgSubsidiariesIntro.text }}</p>
            </div>
            <span class="org__subs-note">{{ orgSubsidiariesIntro.note }}</span>
          </header>
          <TransitionGroup name="org-fade" tag="div" class="org__subs-grid">
            <button
              v-for="s in visibleSubsidiaries"
              :key="s.id"
              type="button"
              class="org__sub"
              :class="{ 'is-selected': selectedId === s.id }"
              @click="select(s.id)"
            >
              <span class="org__sub-top">
                <span class="org__sub-badge" :class="`org__sub-badge--${s.badgeTone}`">{{ s.badge }}</span>
                <span class="org__sub-stake">سهامداری ثاخت: {{ s.stake }}</span>
              </span>
              <strong>{{ s.name }}</strong>
              <span class="org__sub-text">{{ s.text }}</span>
              <span class="org__sub-facts">
                <span>مدیرعامل: {{ s.ceo }}</span>
                <span>سرمایه: {{ s.capital }}</span>
              </span>
              <span class="org__sub-link">
                مشاهده صفحه و پروژه‌ها
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 6-6 6 6 6" /></svg>
              </span>
            </button>
          </TransitionGroup>
          <div v-if="!q && hiddenSubsidiaries.length" class="org__subs-more">
            <span class="org__subs-more-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="m6.5 6.5 3.7 3.7M17.5 6.5l-3.7 3.7M6.5 17.5l3.7-3.7M17.5 17.5l-3.7-3.7" /></svg>
            </span>
            <div class="org__subs-more-text">
              <strong>سایر شرکت‌های تابعه و وابسته هلدینگ</strong>
              <span>شامل {{ hiddenSubsidiaries.map(s => s.name).join('، ') }}.</span>
            </div>
            <button type="button" class="org__btn org__btn--dark" :aria-expanded="showAllSubsidiaries" @click="showAllSubsidiaries = !showAllSubsidiaries">
              {{ showAllSubsidiaries ? 'نمایش فهرست خلاصه' : 'مشاهده فهرست کامل زنجیره ارزش ثاخت' }}
            </button>
          </div>
        </section>

        <!-- Level 4: governance charter -->
        <section v-if="showCharter" class="org__charter">
          <div class="org__charter-intro">
            <span class="org__chip org__chip--outline">{{ orgCharter.badge }}</span>
            <h2>{{ orgCharter.title }}</h2>
            <p>{{ orgCharter.text }}</p>
          </div>
          <ul class="org__charter-points">
            <li v-for="point in orgCharter.points" :key="point.title">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></svg>
              <div>
                <strong>{{ point.title }}</strong>
                <p>{{ point.text }}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </BaseContainer>

    <Teleport to="body">
      <Transition name="org-panel">
        <div v-if="selectedDetail" class="org-panel" role="dialog" aria-modal="true" :aria-label="selectedDetail.title">
          <div class="org-panel__backdrop" @click="closePanel" />
          <aside class="org-panel__sheet">
            <header class="org-panel__head">
              <span class="org-panel__level">{{ selectedDetail.levelLabel }}</span>
              <button ref="closeBtn" type="button" class="org-panel__close" aria-label="بستن" @click="closePanel">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </header>
            <div class="org-panel__body">
              <div v-if="selectedDetail.image" class="org-panel__photo"><BaseImage :src="selectedDetail.image" :alt="selectedDetail.title" /></div>
              <h2>{{ selectedDetail.title }}</h2>
              <p v-if="selectedDetail.subtitle" class="org-panel__subtitle">{{ selectedDetail.subtitle }}</p>
              <p v-if="selectedDetail.reportsTo" class="org-panel__reports">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
                گزارش به: <strong>{{ selectedDetail.reportsTo }}</strong>
              </p>
              <p class="org-panel__text">{{ selectedDetail.text }}</p>
              <dl class="org-panel__facts">
                <div v-for="f in selectedDetail.facts" :key="f.label">
                  <dt>{{ f.label }}</dt>
                  <dd>{{ f.value }}</dd>
                </div>
              </dl>
              <div v-if="selectedDetail.list" class="org-panel__list">
                <h3>{{ selectedDetail.list.title }}</h3>
                <ul>
                  <li v-for="item in selectedDetail.list.items" :key="item">{{ item }}</li>
                </ul>
              </div>
              <div v-if="selectedDetail.links.length" class="org-panel__links">
                <NuxtLink v-for="l in selectedDetail.links" :key="l.href" :to="l.href" @click="closePanel">
                  {{ l.label }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m6-6-6 6 6 6" /></svg>
                </NuxtLink>
              </div>
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.org { color: var(--color-text); background: var(--color-surface); padding-block-end: var(--space-8); }
button { font-family: inherit; }

.org__chip { display: inline-block; padding: 2px 12px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-brand-blue); font-size: 12px; font-weight: 600; }
.org__chip--outline { background: var(--color-white); color: var(--color-ink); border: 1px solid var(--color-border); }

.org__btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); padding: 10px var(--space-2); border-radius: var(--radius-pill); border: 1px solid transparent; font: var(--text-label); text-decoration: none; cursor: pointer; white-space: nowrap; transition: background-color 160ms ease; }
.org__btn--inverse { background: var(--color-white); color: var(--color-brand-blue); }
.org__btn--inverse:hover { background: var(--color-surface); }
.org__btn--ghost { background: transparent; color: var(--color-white); border-color: var(--color-border); }
.org__btn--ghost:hover { background: rgb(255 255 255 / 10%); }
.org__btn--primary { background: var(--color-brand-blue); color: var(--color-white); }
.org__btn--primary:hover { background: var(--color-brand-blue-deep); }
.org__btn--dark { background: var(--color-ink); color: var(--color-white); padding-inline: var(--space-3); }
.org__btn--dark:hover { background: var(--color-brand-blue); }

/* Hero */
.org__hero { background: var(--color-ink); color: var(--color-white); padding-block: var(--space-4); }
.org__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); margin-block-end: var(--space-2); font-size: 12px; font-weight: 600; color: var(--color-border); }
.org__breadcrumb a { color: inherit; text-decoration: none; }
.org__breadcrumb a:hover { color: var(--color-white); }
.org__breadcrumb-current { color: var(--color-tint); font-weight: 700; }
.org__hero-row { display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-3); padding-block-start: var(--space-1); }
@media (min-width: 768px) { .org__hero-row { flex-direction: row; align-items: flex-end; } }
.org__hero-text { max-inline-size: 48rem; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
.org__hero-badge { display: inline-flex; align-items: center; gap: var(--space-1); padding: 4px 12px; border-radius: var(--radius-pill); border: 1px solid color-mix(in srgb, var(--color-brand-blue) 50%, transparent); color: var(--color-tint); font-size: 12px; font-weight: 600; }
.org__hero h1 { font: 700 30px/1.35 var(--font-body); }
@media (min-width: 768px) { .org__hero h1 { font: var(--text-h2); font-weight: 700; } }
.org__hero p { font-size: 16px; line-height: 1.7; color: var(--color-border); }
.org__hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }

/* Toolbar */
.org__toolbar { position: sticky; inset-block-start: 88px; z-index: 30; background: var(--color-white); border-block-end: 1px solid var(--color-border); padding-block: var(--space-2); }
.org__toolbar-row { display: flex; flex-direction: column; align-items: stretch; justify-content: space-between; gap: var(--space-2); }
@media (min-width: 1024px) { .org__toolbar-row { flex-direction: row; align-items: center; } }
.org__tabs { display: flex; gap: var(--space-1); overflow-x: auto; scrollbar-width: none; }
.org__tabs button { flex-shrink: 0; padding: var(--space-1) 20px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-ink); font: var(--text-label); cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.org__tabs button:hover { background: var(--color-tint); color: var(--color-brand-blue); }
.org__tabs button.is-active { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-white); }
.org__search { position: relative; flex-shrink: 0; inline-size: 100%; }
@media (min-width: 1024px) { .org__search { inline-size: 288px; } }
.org__search input { inline-size: 100%; padding: var(--space-1) var(--space-2); padding-inline-end: 36px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface); font: var(--text-body-sm); color: var(--color-ink); }
.org__search input:focus { outline: none; border-color: var(--color-brand-blue); background: var(--color-white); }
.org__search svg { position: absolute; inset-inline-end: 12px; inset-block-start: 50%; transform: translateY(-50%); color: var(--color-text-muted); pointer-events: none; }

/* Stage */
.org__stage { display: flex; flex-direction: column; gap: var(--space-6); padding-block: var(--space-6); perspective: 1800px; }
.org__result-note { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); margin-block-end: calc(-1 * var(--space-3)); font: var(--text-body-sm); color: var(--color-text-muted); }
.org__result-note button { border: none; background: none; padding: 0; color: var(--color-brand-blue); font-weight: 700; cursor: pointer; }
.org__empty { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: var(--space-8) var(--space-3); border: 1px dashed var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); text-align: center; color: var(--color-text-muted); }
.org__empty h2 { font: var(--text-h3); color: var(--color-ink); }

.is-selected { border-color: var(--color-brand-blue) !important; box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-brand-blue) 25%, transparent), 0 16px 32px rgb(4 28 44 / 12%) !important; }

.org__level--assembly { display: flex; flex-direction: column; align-items: center; }
.org__assembly {
  inline-size: 100%;
  max-inline-size: 36rem;
  padding: var(--space-3);
  border: 2px solid var(--color-brand-blue);
  border-radius: var(--radius-lg);
  background: var(--color-white);
  color: inherit;
  text-align: center;
  cursor: pointer;
  transform: rotateX(6deg);
  transform-origin: bottom center;
  box-shadow: 0 18px 30px -18px rgb(4 28 44 / 35%);
  transition: transform 300ms var(--motion-ease), box-shadow 300ms ease;
}
.org__assembly:hover { transform: rotateX(0deg) translateY(-2px); }
.org__assembly h2 { font: 700 24px/1.4 var(--font-body); color: var(--color-ink); margin-block: var(--space-1) 4px; }
.org__assembly p { font: var(--text-body-sm); color: var(--color-text-muted); }
.org__assembly-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-1); margin-block-start: var(--space-2); padding-block-start: var(--space-2); border-block-start: 1px solid var(--color-border); }
.org__assembly-metrics small { display: block; font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.org__assembly-metrics strong { font: var(--text-h3); font-weight: 700; color: var(--color-ink); font-variant-numeric: tabular-nums; }
.org__assembly-metrics strong.is-accent { color: var(--color-brand-blue); }
.org__connector { display: flex; flex-direction: column; align-items: center; margin-block: calc(-1 * var(--space-6)) calc(-1 * var(--space-6)); padding-block: 0; }
.org__level--assembly .org__connector { margin-block: 0 calc(-1 * var(--space-6)); }
.org__connector span { inline-size: 2px; block-size: 28px; background: var(--color-border); }
.org__connector i { inline-size: 12px; block-size: 12px; border-radius: 50%; background: var(--color-brand-blue); }

/* Board */
.org__board { overflow: hidden; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); box-shadow: 0 1px 2px rgb(4 28 44 / 6%); }
.org__board-head { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: var(--space-2); padding: 20px var(--space-4); background: var(--color-ink); color: var(--color-white); }
@media (min-width: 768px) { .org__board-head { flex-direction: row; align-items: center; } }
.org__board-title { display: flex; align-items: center; gap: 12px; }
.org__board-title svg { color: var(--color-tint); flex-shrink: 0; }
.org__board-title h2 { font: 700 22px/1.4 var(--font-body); }
.org__board-title p { font: var(--text-body-sm); color: var(--color-border); }
.org__board-term { padding: 4px 12px; border-radius: var(--radius-pill); border: 1px solid rgb(255 255 255 / 20%); background: rgb(255 255 255 / 10%); color: var(--color-tint); font-size: 12px; font-weight: 600; }
.org__board-grid { display: grid; grid-template-columns: 1fr; }
@media (min-width: 768px) { .org__board-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .org__board-grid { grid-template-columns: repeat(5, 1fr); } }
.org__member { display: flex; flex-direction: column; justify-content: space-between; padding: var(--space-3); border: 1px solid transparent; border-block-end-color: var(--color-border); transition: background-color 160ms ease; }
@media (min-width: 1024px) { .org__member { border-block-end-color: transparent; border-inline-start-color: var(--color-border); } .org__member:first-child { border-inline-start-color: transparent; } }
.org__member:hover { background: var(--color-surface); }
.org__member--featured { background: color-mix(in srgb, var(--color-surface) 50%, transparent); }
.org__portrait { position: relative; aspect-ratio: 4 / 5; margin-block-end: var(--space-2); overflow: hidden; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface-alt); }
.org__member--featured .org__portrait { border: 2px solid var(--color-brand-blue); }
.org__portrait :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; filter: grayscale(1) contrast(1.15); transition: filter 300ms ease, transform 300ms ease; }
.org__member--featured .org__portrait :deep(img), .org__member:hover .org__portrait :deep(img) { filter: none; }
.org__member--featured:hover .org__portrait :deep(img) { transform: scale(1.05); }
.org__portrait-badge { position: absolute; inset-block-start: 12px; inset-inline-start: 12px; padding: 4px 10px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 600; }
.org__portrait-badge--blue { background: var(--color-brand-blue); color: var(--color-white); }
.org__portrait-badge--ink { background: var(--color-ink); color: var(--color-white); }
.org__portrait-badge--neutral { background: var(--color-surface-alt); color: var(--color-ink); border: 1px solid var(--color-border); }
.org__member-rep { display: block; font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.org__member--featured .org__member-rep { color: var(--color-brand-blue); font-weight: 700; }
.org__member h3 { font: var(--text-h3); color: var(--color-ink); margin-block: 4px; transition: color 160ms ease; }
.org__member:hover h3 { color: var(--color-brand-blue); }
.org__member-position { font: var(--text-body-sm); font-weight: 600; color: var(--color-brand-blue-deep); }
.org__member-meta { display: flex; flex-direction: column; gap: 4px; margin-block-start: var(--space-2); padding-block-start: 12px; border-block-start: 1px solid var(--color-border); font-size: 12px; line-height: 1.7; color: var(--color-text-muted); }
.org__member-meta span { display: flex; align-items: flex-start; gap: 6px; font-weight: 600; }
.org__member-meta svg { flex-shrink: 0; margin-block-start: 2px; }
.org__member-btn { display: flex; align-items: center; justify-content: center; gap: 4px; inline-size: 100%; margin-block-start: 20px; padding: var(--space-1); border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-ink); font-size: 12px; font-weight: 600; cursor: pointer; transition: background-color 160ms ease, color 160ms ease; }
.org__member-btn:hover { background: var(--color-tint); color: var(--color-brand-blue); }
.org__member-btn--primary { background: var(--color-brand-blue); border-color: var(--color-brand-blue); color: var(--color-white); font-weight: 700; }
.org__member-btn--primary:hover { background: var(--color-brand-blue-deep); color: var(--color-white); }

/* Level 2 */
.org__level2 { display: grid; grid-template-columns: 1fr; gap: var(--space-4); align-items: start; }
@media (min-width: 1024px) { .org__level2 { grid-template-columns: 4fr 8fr; } .org__level2--single { grid-template-columns: 1fr; } }
.org__committees-col, .org__exec-col { display: flex; flex-direction: column; gap: var(--space-3); }
.org__committees { display: flex; flex-direction: column; gap: 12px; padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface-alt); }
.org__committees-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); }
.org__committees-head h3 { display: flex; align-items: center; gap: var(--space-1); font: var(--text-h3); color: var(--color-ink); }
.org__committees-head svg { color: var(--color-brand-blue); }
.org__committees-intro { font: var(--text-body-sm); color: var(--color-text-muted); }
.org__committee { display: flex; flex-direction: column; gap: 4px; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); color: inherit; text-align: start; cursor: pointer; transition: border-color 160ms ease, transform 200ms ease; }
.org__committee:hover { border-color: var(--color-brand-blue); transform: translateY(-2px); }
.org__committee-top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); }
.org__committee-top strong { font-size: 14px; color: var(--color-ink); }
.org__status { flex-shrink: 0; padding: 2px 8px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 600; background: var(--color-surface); }
.org__status--success { color: var(--color-status-success); }
.org__status--blue { background: var(--color-tint); color: var(--color-brand-blue); }
.org__status--neutral { color: var(--color-text-muted); }
.org__committee-chair { font: var(--text-body-sm); color: var(--color-text-muted); }
.org__committee-note { display: flex; align-items: center; gap: 4px; margin-block-start: 4px; font-size: 12px; color: var(--color-text-muted); }
.org__compliance { padding: var(--space-3); border-radius: var(--radius-lg); background: var(--color-ink); color: var(--color-white); }
.org__compliance-title { display: flex; align-items: center; gap: var(--space-1); margin-block-end: 12px; font: var(--text-h3); }
.org__compliance-title svg { color: var(--color-tint); }
.org__compliance-score { display: flex; align-items: baseline; gap: var(--space-1); margin-block-end: var(--space-1); }
.org__compliance-score strong { font: 700 38px/1.2 var(--font-body); color: var(--color-tint); font-variant-numeric: tabular-nums; }
.org__compliance-score span { font-size: 12px; color: var(--color-border); }
.org__compliance-bar { block-size: 6px; margin-block-end: 12px; border-radius: var(--radius-pill); background: rgb(255 255 255 / 12%); overflow: hidden; }
.org__compliance-bar span { display: block; block-size: 100%; border-radius: inherit; background: var(--color-brand-blue); }
.org__compliance p { font: var(--text-body-sm); color: var(--color-border); }

.org__ceo { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); padding: var(--space-3); border: 2px solid var(--color-brand-blue); border-radius: var(--radius-lg); background: var(--color-white); color: inherit; text-align: center; cursor: pointer; box-shadow: 0 18px 30px -20px rgb(4 28 44 / 35%); transition: transform 200ms ease; }
.org__ceo:hover { transform: translateY(-2px); }
@media (min-width: 640px) { .org__ceo { flex-direction: row; text-align: start; } }
.org__ceo-photo { flex-shrink: 0; inline-size: 96px; block-size: 96px; overflow: hidden; border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.org__ceo-photo :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.org__ceo-text { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
@media (min-width: 640px) { .org__ceo-text { align-items: flex-start; } }
.org__ceo-text strong { font: 700 22px/1.4 var(--font-body); color: var(--color-ink); }
.org__ceo-text > span:last-child { font-size: 15px; line-height: 1.7; color: var(--color-text-muted); }
.org__ceo-chips { flex-shrink: 0; display: flex; gap: var(--space-1); }
@media (min-width: 640px) { .org__ceo-chips { flex-direction: column; } }
.org__ceo-chips span { padding: 6px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-pill); background: var(--color-surface); font-size: 12px; font-weight: 600; text-align: center; white-space: nowrap; }
.org__vp-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
@media (min-width: 640px) { .org__vp-grid { grid-template-columns: 1fr 1fr; } }
.org__vp { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-white); color: inherit; text-align: start; cursor: pointer; transition: border-color 160ms ease, transform 200ms ease, box-shadow 200ms ease; }
.org__vp:hover { border-color: var(--color-brand-blue); transform: translateY(-3px); box-shadow: 0 14px 24px -16px rgb(4 28 44 / 30%); }
.org__vp-icon { display: flex; align-items: center; justify-content: center; inline-size: 40px; block-size: 40px; margin-block-end: 8px; border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-brand-blue); transition: background-color 160ms ease, color 160ms ease; }
.org__vp:hover .org__vp-icon { background: var(--color-brand-blue); color: var(--color-white); }
.org__vp-eyebrow { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.org__vp strong { font: var(--text-h3); color: var(--color-ink); }
.org__vp-text { margin-block-end: 8px; font: var(--text-body-sm); color: var(--color-text-muted); }
.org__vp-foot { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); inline-size: 100%; margin-block-start: auto; padding-block-start: 12px; border-block-start: 1px solid var(--color-border); font-size: 12px; font-weight: 600; }
.org__vp-metric { color: var(--color-brand-blue); }

/* Subsidiaries */
.org__subs { display: flex; flex-direction: column; gap: var(--space-3); }
.org__subs-head { display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-2); padding-block-end: var(--space-2); border-block-end: 1px solid var(--color-border); }
@media (min-width: 768px) { .org__subs-head { flex-direction: row; align-items: flex-end; } }
.org__subs-head h2 { font: 700 24px/1.4 var(--font-body); color: var(--color-ink); margin-block-start: 4px; }
.org__subs-head p { font: var(--text-body-sm); color: var(--color-text-muted); }
.org__subs-note { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.org__subs-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 640px) { .org__subs-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .org__subs-grid { grid-template-columns: repeat(4, 1fr); } }
.org__sub { display: flex; flex-direction: column; align-items: stretch; gap: 4px; padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); color: inherit; text-align: start; cursor: pointer; transition: border-color 160ms ease, transform 200ms ease; }
.org__sub:hover { border-color: var(--color-brand-blue); transform: translateY(-3px); }
.org__sub-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 6px; margin-block-end: 8px; }
.org__sub-badge { padding: 4px 10px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 600; }
.org__sub-badge--ink { background: var(--color-ink); color: var(--color-white); }
.org__sub-badge--blue { background: var(--color-tint); color: var(--color-brand-blue); }
.org__sub-badge--neutral { background: var(--color-surface-alt); color: var(--color-ink); border: 1px solid var(--color-border); }
.org__sub-stake { font-size: 12px; font-weight: 700; color: var(--color-brand-blue); }
.org__sub strong { font: var(--text-h3); color: var(--color-ink); transition: color 160ms ease; }
.org__sub:hover strong { color: var(--color-brand-blue); }
.org__sub-text { margin-block-end: 8px; font: var(--text-body-sm); color: var(--color-text-muted); }
.org__sub-facts { display: flex; flex-direction: column; gap: 2px; padding: 12px; border-radius: var(--radius-md); background: var(--color-surface); font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.org__sub-facts span:first-child { color: var(--color-ink); }
.org__sub-link { display: flex; align-items: center; justify-content: space-between; margin-block-start: auto; padding-block-start: 12px; border-block-start: 1px solid var(--color-border); font: var(--text-body-sm); font-weight: 600; color: var(--color-brand-blue); }
.org__sub-facts + .org__sub-link { margin-block-start: var(--space-2); }
.org__subs-more { display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: var(--space-3); padding: var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-white); }
@media (min-width: 768px) { .org__subs-more { flex-direction: row; } }
.org__subs-more-icon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; inline-size: 48px; block-size: 48px; border-radius: var(--radius-md); background: var(--color-tint); color: var(--color-brand-blue); }
.org__subs-more-text { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.org__subs-more-text strong { font: var(--text-h3); color: var(--color-ink); }
.org__subs-more-text span { font: var(--text-body-sm); color: var(--color-text-muted); }
.org-fade-enter-active, .org-fade-leave-active { transition: opacity 250ms ease, transform 250ms ease; }
.org-fade-enter-from, .org-fade-leave-to { opacity: 0; transform: translateY(8px); }

/* Charter */
.org__charter { display: grid; grid-template-columns: 1fr; gap: var(--space-4); padding: var(--space-4); border: 1px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-surface-alt); }
@media (min-width: 1024px) { .org__charter { grid-template-columns: 1fr 2fr; } }
.org__charter-intro { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.org__charter-intro h2 { font: 700 24px/1.4 var(--font-body); color: var(--color-ink); }
.org__charter-intro p { font-size: 16px; line-height: 1.7; color: var(--color-text-muted); }
.org__charter-points { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .org__charter-points { grid-template-columns: 1fr 1fr; } }
.org__charter-points li { display: flex; align-items: flex-start; gap: 12px; }
.org__charter-points svg { flex-shrink: 0; margin-block-start: 2px; color: var(--color-brand-blue); }
.org__charter-points strong { display: block; font: var(--text-label); color: var(--color-ink); margin-block-end: 4px; }
.org__charter-points p { font: var(--text-body-sm); color: var(--color-text-muted); }

/* Detail panel */
.org-panel { position: fixed; inset: 0; z-index: 100; }
.org-panel__backdrop { position: absolute; inset: 0; background: rgb(4 28 44 / 45%); }
.org-panel__sheet { position: absolute; inset-block: 0; inset-inline-end: 0; display: flex; flex-direction: column; inline-size: min(440px, 100%); background: var(--color-white); box-shadow: 0 0 40px rgb(4 28 44 / 25%); border-start-start-radius: var(--radius-lg); border-end-start-radius: var(--radius-lg); overflow: hidden; }
.org-panel__head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: var(--space-2) var(--space-3); border-block-end: 1px solid var(--color-border); }
.org-panel__level { font-size: 12px; font-weight: 700; color: var(--color-brand-blue); }
.org-panel__close { display: flex; align-items: center; justify-content: center; inline-size: 36px; block-size: 36px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-white); color: var(--color-ink); cursor: pointer; }
.org-panel__close:hover { background: var(--color-surface); }
.org-panel__body { flex: 1; overflow-y: auto; padding: var(--space-3); display: flex; flex-direction: column; gap: 12px; }
.org-panel__photo { inline-size: 120px; aspect-ratio: 4 / 5; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--color-border); }
.org-panel__photo :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.org-panel__body h2 { font: 700 24px/1.4 var(--font-body); color: var(--color-ink); }
.org-panel__subtitle { font: var(--text-body-sm); font-weight: 600; color: var(--color-brand-blue-deep); }
.org-panel__reports { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; padding: 4px 12px; border-radius: var(--radius-pill); background: var(--color-surface); font-size: 12px; color: var(--color-text-muted); }
.org-panel__reports strong { color: var(--color-ink); }
.org-panel__text { font: var(--text-body-sm); line-height: 1.9; color: var(--color-text-muted); }
.org-panel__facts { display: flex; flex-direction: column; margin: 0; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.org-panel__facts div { display: flex; justify-content: space-between; gap: var(--space-2); padding: 10px var(--space-2); font-size: 13px; }
.org-panel__facts div + div { border-block-start: 1px solid var(--color-border); }
.org-panel__facts dt { color: var(--color-text-muted); flex-shrink: 0; }
.org-panel__facts dd { margin: 0; font-weight: 700; text-align: end; }
.org-panel__list h3 { font: var(--text-label); margin-block-end: var(--space-1); }
.org-panel__list ul { margin: 0; padding: 0; list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
.org-panel__list li { padding: 4px 12px; border-radius: var(--radius-pill); background: var(--color-tint); color: var(--color-brand-blue); font-size: 12px; font-weight: 600; }
.org-panel__links { display: flex; flex-direction: column; gap: var(--space-1); margin-block-start: var(--space-1); }
.org-panel__links a { display: flex; align-items: center; justify-content: space-between; padding: 12px var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); color: var(--color-brand-blue); font: var(--text-label); text-decoration: none; }
.org-panel__links a:hover { border-color: var(--color-brand-blue); background: var(--color-tint); }
.org-panel-enter-active, .org-panel-leave-active { transition: opacity 250ms ease; }
.org-panel-enter-active .org-panel__sheet, .org-panel-leave-active .org-panel__sheet { transition: transform 300ms var(--motion-ease); }
.org-panel-enter-from, .org-panel-leave-to { opacity: 0; }
.org-panel-enter-from .org-panel__sheet, .org-panel-leave-to .org-panel__sheet { transform: translateX(-100%); }

@media (prefers-reduced-motion: reduce) {
  .org__assembly { transform: none; }
}

@media print {
  .org__toolbar, .org__hero-actions, .org__subs-more button, .org__member-btn { display: none; }
  .org__hero { background: none; color: var(--color-ink); }
  .org__assembly { transform: none; box-shadow: none; }
}
</style>
