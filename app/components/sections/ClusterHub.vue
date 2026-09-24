<script setup lang="ts">
import type { ClusterHubContent, ClusterHubIcon } from '~/utils/clusterHubData'

// Template `01a-cluster-hub-simple` (docs/page-templates-icd3d.md §2), rebuilt
// to follow project_detail_page_template/01a_cluster_hub_simple/code.html
// section by section: image hero banner with badge / two-line title / two
// CTAs → two-column about text + 4 big metrics → affiliated-entities strip →
// child-page catalog (tall image cards with hover CTA, prev/next arrows that
// really scroll the row) → «how it works» 5 steps beside a tall image with a
// round floating badge → quick-contact panel with a validated field.
// Used for /about, /sales, /ir, /media. Site header/footer come from the
// layout. Corners follow the balanced scale (docs/design-system-icd3d.md
// §4.1), not the mockup's rounded-3xl / sharp-edge mix.

const props = defineProps<{ hub: ClusterHubContent }>()

// --- catalog carousel ---
const track = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(false)

function updateArrows() {
  const el = track.value
  if (!el) return
  const max = el.scrollWidth - el.clientWidth
  const pos = Math.abs(el.scrollLeft) // RTL scrollLeft runs 0 → negative
  canPrev.value = pos > 4
  canNext.value = pos < max - 4
}

function scrollCatalog(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.cluster-hub__card')
  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  const amount = card ? card.offsetWidth + gap : el.clientWidth
  const rtl = getComputedStyle(el).direction === 'rtl'
  el.scrollBy({ left: dir * amount * (rtl ? -1 : 1), behavior: 'smooth' })
}

onMounted(() => {
  updateArrows()
  window.addEventListener('resize', updateArrows, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', updateArrows))

// --- quick-contact field (no backend yet: client-side validation + success) ---
const contactValue = ref('')
const contactState = ref<'idle' | 'error' | 'success'>('idle')
const contactError = ref('')

function toLatinDigits(s: string) {
  return s
    .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
}

function submitContact() {
  const raw = contactValue.value.trim()
  if (!raw) {
    contactState.value = 'error'
    contactError.value = props.hub.contact.field === 'phone' ? 'لطفاً شماره تلفن همراه را وارد کنید.' : 'لطفاً پست الکترونیکی را وارد کنید.'
    return
  }
  if (props.hub.contact.field === 'phone') {
    const digits = toLatinDigits(raw).replace(/[\s\-()]/g, '')
    if (!/^(?:\+98|0098|0)?9\d{9}$/.test(digits)) {
      contactState.value = 'error'
      contactError.value = 'شماره همراه معتبر نیست؛ مثال: ۰۹۱۲۱۲۳۴۵۶۷'
      return
    }
  }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) {
    contactState.value = 'error'
    contactError.value = 'قالب پست الکترونیکی معتبر نیست (مثال: name@example.com).'
    return
  }
  // TODO: send to the CRM / lead endpoint once the backend exists.
  contactState.value = 'success'
  contactValue.value = ''
}

function resetContact() {
  contactState.value = 'idle'
}

// Stroke icons for the process steps (24×24 viewBox).
const icons: Record<ClusterHubIcon, string> = {
  chat: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.4-4 8-9 8-1.5 0-3-.3-4.3-1L3 20l1.4-3.7C3.5 15 3 13.6 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z',
  search: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  sliders: 'M12 6V4m0 2a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m-6 8a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 1 0 0-4m0 4a2 2 0 1 1 0-4m0 4v2m0-6V4',
  document: 'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.6a1 1 0 0 1 .7.3l5.4 5.4a1 1 0 0 1 .3.7V19a2 2 0 0 1-2 2Z',
  handshake: 'M17 20h5v-2a3 3 0 0 0-5.4-1.9M17 20H7m10 0v-2c0-.7-.1-1.3-.4-1.9M7 20H2v-2a3 3 0 0 1 5.4-1.9M7 20v-2c0-.7.1-1.3.4-1.9m0 0a5 5 0 0 1 9.3 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  building: 'M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M3 21h18M8 7h4M8 11h4M8 15h4',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  tower: 'M9 21V3h6v18M5 21V9h4M15 11h4v10M3 21h18M12 7v.01M12 11v.01M12 15v.01',
  sun: 'M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  shield: 'M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Zm-3 9 2 2 4-4',
  calendar: 'M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  coins: 'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm-8-3v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Zm7 9a7 7 0 0 1-14 0m7 7v3',
  newspaper: 'M4 5h13v14a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5Zm13 4h3v10a2 2 0 0 1-4 0M8 9h5M8 13h5M8 17h3',
  mail: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm-1 2 9 6 9-6',
}

const persianIndex = (i: number) => (i + 1).toLocaleString('fa-IR')
</script>

<template>
  <div class="cluster-hub">
    <nav class="cluster-hub__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="cluster-hub__breadcrumb-current">{{ hub.title }}</span>
    </nav>

    <!-- Hero banner -->
    <section class="cluster-hub__hero" aria-labelledby="hub-title">
      <NuxtImg
        :src="hub.hero.image"
        :alt="hub.hero.imageAlt"
        class="cluster-hub__hero-img"
        loading="eager"
        fetchpriority="high"
      />
      <div class="cluster-hub__hero-scrim" aria-hidden="true" />
      <div class="cluster-hub__hero-content">
        <span class="cluster-hub__hero-badge">{{ hub.hero.badge }}</span>
        <h1 id="hub-title" class="cluster-hub__hero-title">
          {{ hub.hero.title[0] }}<br>{{ hub.hero.title[1] }}
        </h1>
        <p class="cluster-hub__hero-lead">{{ hub.hero.lead }}</p>
        <div class="cluster-hub__hero-actions">
          <NuxtLink :to="hub.hero.primary.href" class="cluster-hub__btn cluster-hub__btn--light">
            {{ hub.hero.primary.label }}
            <svg class="cluster-hub__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5l7 7-7 7M21 12H3" /></svg>
          </NuxtLink>
          <NuxtLink :to="hub.hero.secondary.href" class="cluster-hub__btn cluster-hub__btn--ghost">
            {{ hub.hero.secondary.label }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About + metrics -->
    <section id="hub-stats" class="cluster-hub__about">
      <div class="cluster-hub__about-text">
        <p class="cluster-hub__eyebrow"><span aria-hidden="true" />{{ hub.about.eyebrow }}</p>
        <h2 class="cluster-hub__about-title">{{ hub.about.title }}</h2>
        <p class="cluster-hub__about-body">{{ hub.about.body }}</p>
        <NuxtLink :to="hub.about.link.href" class="cluster-hub__text-link">
          {{ hub.about.link.label }}
          <svg class="cluster-hub__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8l4 4-4 4M21 12H3" /></svg>
        </NuxtLink>
      </div>
      <dl class="cluster-hub__stats">
        <div v-for="stat in hub.stats" :key="stat.label" class="cluster-hub__stat">
          <dt class="cluster-hub__stat-label">{{ stat.label }}</dt>
          <dd class="cluster-hub__stat-value">
            <!-- one LTR-isolated unit so «25+», «96%», «3.2M» never reflow in RTL -->
            <span class="cluster-hub__stat-num"><span v-if="stat.prefix" class="cluster-hub__stat-accent">{{ stat.prefix }}</span>{{ stat.value }}<span v-if="stat.suffix" class="cluster-hub__stat-accent">{{ stat.suffix }}</span></span>
          </dd>
          <dd class="cluster-hub__stat-note">{{ stat.note }}</dd>
        </div>
      </dl>
    </section>

    <!-- Affiliated entities strip -->
    <section class="cluster-hub__partners" :aria-label="hub.partners.label">
      <p class="cluster-hub__partners-label"><span aria-hidden="true" />{{ hub.partners.label }}</p>
      <ul>
        <li v-for="name in hub.partners.items" :key="name">{{ name }}</li>
      </ul>
    </section>

    <!-- Child-page catalog -->
    <section id="hub-catalog" class="cluster-hub__catalog" aria-labelledby="hub-catalog-title">
      <div class="cluster-hub__section-head">
        <div>
          <h2 id="hub-catalog-title" class="cluster-hub__section-title">{{ hub.catalog.title }}</h2>
          <p class="cluster-hub__section-intro">{{ hub.catalog.intro }}</p>
        </div>
        <div class="cluster-hub__arrows">
          <button type="button" class="cluster-hub__arrow-btn" aria-label="قبلی" :disabled="!canPrev" @click="scrollCatalog(-1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button type="button" class="cluster-hub__arrow-btn cluster-hub__arrow-btn--solid" aria-label="بعدی" :disabled="!canNext" @click="scrollCatalog(1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
      </div>

      <ul ref="track" class="cluster-hub__track" @scroll.passive="updateArrows">
        <li v-for="card in hub.catalog.cards" :key="card.href" class="cluster-hub__card">
          <NuxtLink :to="card.href" class="cluster-hub__card-link">
            <div class="cluster-hub__card-media">
              <BaseImage :src="card.image" :alt="card.title" />
              <div class="cluster-hub__card-overlay">
                <span>
                  {{ card.cta }}
                  <svg class="cluster-hub__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 5l7 7-7 7M21 12H3" /></svg>
                </span>
              </div>
            </div>
            <h3 class="cluster-hub__card-title">{{ card.title }}</h3>
            <p class="cluster-hub__card-desc">{{ card.description }}</p>
            <p v-if="card.stat" class="cluster-hub__card-stat">
              <template v-if="card.stat.lead">{{ card.stat.lead }} </template>
              <strong class="isolate-ltr">{{ card.stat.value }}</strong>
              {{ card.stat.label }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </section>

    <!-- Process -->
    <section id="hub-process" class="cluster-hub__process" aria-labelledby="hub-process-title">
      <div class="cluster-hub__process-head">
        <h2 id="hub-process-title" class="cluster-hub__section-title">{{ hub.process.title }}</h2>
        <p class="cluster-hub__section-intro">{{ hub.process.intro }}</p>
      </div>
      <div class="cluster-hub__process-grid">
        <ol class="cluster-hub__steps">
          <li v-for="(step, i) in hub.process.steps" :key="step.title" class="cluster-hub__step">
            <span class="cluster-hub__step-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[step.icon]" /></svg>
            </span>
            <div>
              <h3 class="cluster-hub__step-title">{{ persianIndex(i) }}. {{ step.title }}</h3>
              <p class="cluster-hub__step-body">{{ step.body }}</p>
            </div>
          </li>
        </ol>
        <div class="cluster-hub__process-media">
          <div class="cluster-hub__process-img">
            <BaseImage :src="hub.process.image" :alt="hub.process.imageAlt" />
          </div>
          <p class="cluster-hub__process-badge">
            {{ hub.process.badge[0] }}<br>{{ hub.process.badge[1] }}
          </p>
        </div>
      </div>
    </section>

    <!-- Quick contact -->
    <section class="cluster-hub__contact" aria-labelledby="hub-contact-title">
      <div class="cluster-hub__contact-text">
        <h2 id="hub-contact-title" class="cluster-hub__contact-title">{{ hub.contact.title }}</h2>
        <p class="cluster-hub__contact-body">{{ hub.contact.body }}</p>
      </div>
      <div class="cluster-hub__contact-side">
        <form v-if="contactState !== 'success'" class="cluster-hub__contact-form" novalidate @submit.prevent="submitContact">
          <label :for="`hub-contact-${hub.key}`" class="visually-hidden">{{ hub.contact.placeholder }}</label>
          <input
            :id="`hub-contact-${hub.key}`"
            v-model="contactValue"
            :type="hub.contact.field === 'phone' ? 'tel' : 'email'"
            :inputmode="hub.contact.field === 'phone' ? 'tel' : 'email'"
            :autocomplete="hub.contact.field === 'phone' ? 'tel' : 'email'"
            :placeholder="hub.contact.placeholder"
            class="cluster-hub__contact-input"
            :class="{ 'is-invalid': contactState === 'error' }"
            :aria-invalid="contactState === 'error'"
            :aria-describedby="`hub-contact-msg-${hub.key}`"
            @input="contactState = 'idle'"
          >
          <button type="submit" class="cluster-hub__contact-submit">{{ hub.contact.button }}</button>
        </form>
        <p
          :id="`hub-contact-msg-${hub.key}`"
          class="cluster-hub__contact-msg"
          :class="{ 'is-error': contactState === 'error', 'is-success': contactState === 'success' }"
          aria-live="polite"
        >
          <template v-if="contactState === 'error'">{{ contactError }}</template>
          <template v-else-if="contactState === 'success'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>
            {{ hub.contact.success }}
            <button type="button" class="cluster-hub__contact-reset" @click="resetContact">ثبت دوباره</button>
          </template>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cluster-hub {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-3);
  color: var(--color-text);
}

.cluster-hub__breadcrumb { display: flex; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.cluster-hub__breadcrumb a { color: inherit; text-decoration: none; }
.cluster-hub__breadcrumb a:hover { color: var(--color-primary); }
.cluster-hub__breadcrumb-current { color: var(--color-text); font-weight: 600; }

.cluster-hub__arrow { transform: scaleX(-1); flex-shrink: 0; } /* RTL: forward arrow points left */

/* --- hero --- */
.cluster-hub__hero {
  position: relative;
  isolation: isolate;
  min-block-size: 500px;
  display: flex;
  align-items: flex-end;
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-ink);
  color: var(--color-white);
  box-shadow: 0 24px 48px rgb(4 28 44 / 18%);
}
.cluster-hub__hero-img { position: absolute; inset: 0; inline-size: 100%; block-size: 100%; object-fit: cover; z-index: -2; filter: brightness(0.8) contrast(1.15); }
.cluster-hub__hero-scrim {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(to top, var(--color-ink), rgb(4 28 44 / 70%) 45%, transparent),
    linear-gradient(to left, rgb(4 28 44 / 90%), rgb(4 28 44 / 40%) 55%, transparent);
}
.cluster-hub__hero-content { max-inline-size: 42rem; }
.cluster-hub__hero-badge {
  display: inline-block;
  padding: 4px 12px;
  margin-block-end: var(--space-2);
  background: var(--color-brand-blue);
  color: var(--color-white);
  font: var(--text-label);
  font-size: 12px;
  line-height: 1.6;
  border-radius: var(--radius-xs);
}
.cluster-hub__hero-title { font-size: clamp(32px, 5vw, 60px); font-weight: 900; line-height: 1.2; letter-spacing: -0.01em; margin-block-end: var(--space-3); }
.cluster-hub__hero-lead { font-size: 18px; line-height: 1.8; color: rgb(255 255 255 / 85%); max-inline-size: 36rem; margin-block-end: var(--space-4); }
.cluster-hub__hero-actions { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.cluster-hub__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 14px 30px;
  border-radius: var(--radius-pill);
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease;
}
.cluster-hub__btn--light { background: var(--color-white); color: var(--color-ink); box-shadow: 0 10px 24px rgb(4 28 44 / 25%); }
.cluster-hub__btn--light:hover { background: var(--color-tint); }
.cluster-hub__btn--ghost { border: 1px solid rgb(255 255 255 / 40%); color: var(--color-white); font-weight: 500; backdrop-filter: blur(4px); }
.cluster-hub__btn--ghost:hover { background: rgb(255 255 255 / 10%); }

/* --- about + stats --- */
.cluster-hub__about {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  padding-block: var(--space-12) var(--space-8);
  scroll-margin-block-start: 96px;
}
@media (min-width: 1024px) { .cluster-hub__about { grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: start; } }
.cluster-hub__eyebrow { display: inline-flex; align-items: center; gap: var(--space-1); font: var(--text-label); color: var(--color-primary); margin-block-end: var(--space-2); }
.cluster-hub__eyebrow span { inline-size: 24px; block-size: 2px; background: var(--color-primary); }
.cluster-hub__about-title { font-size: clamp(24px, 3vw, 36px); font-weight: 900; line-height: 1.35; margin-block-end: var(--space-3); }
.cluster-hub__about-body { font-size: 16px; line-height: 2; color: var(--color-text-muted); text-align: justify; margin-block-end: var(--space-3); }
.cluster-hub__text-link { display: inline-flex; align-items: center; gap: var(--space-1); font: var(--text-label); color: var(--color-primary); text-decoration: none; transition: gap 160ms ease; }
.cluster-hub__text-link:hover { gap: var(--space-2); }

.cluster-hub__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4) var(--space-4);
  margin: 0;
  padding-block-start: var(--space-4);
  border-block-start: 1px solid var(--color-border);
}
@media (min-width: 1024px) {
  .cluster-hub__stats { padding-block-start: 0; padding-inline-start: var(--space-6); border-block-start: 0; border-inline-start: 1px solid var(--color-border); }
}
.cluster-hub__stat { display: flex; flex-direction: column; gap: 4px; }
.cluster-hub__stat dd { margin: 0; }
.cluster-hub__stat-value { order: -1; font-size: clamp(36px, 4.4vw, 50px); font-weight: 900; line-height: 1.1; color: var(--color-ink); margin-block-end: 4px !important; }
.cluster-hub__stat-num { font-family: var(--font-en), var(--font-fa); font-feature-settings: 'tnum' 1; unicode-bidi: isolate; direction: ltr; display: inline-block; }
.cluster-hub__stat-accent { color: var(--color-primary); font-family: var(--font-en), var(--font-fa); }
.cluster-hub__stat-label { font-size: 16px; font-weight: 700; color: var(--color-ink); }
.cluster-hub__stat-note { font-size: 12px; color: var(--color-text-muted); }

/* --- partners strip --- */
.cluster-hub__partners {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-4);
  padding-block: var(--space-4);
  border-block: 1px solid var(--color-border);
}
.cluster-hub__partners-label { display: inline-flex; align-items: center; gap: var(--space-1); font: var(--text-label); color: var(--color-ink); }
.cluster-hub__partners-label span { inline-size: 10px; block-size: 10px; background: var(--color-ink); border-radius: 2px; }
.cluster-hub__partners ul { list-style: none; margin: 0; padding: 0; display: contents; }
.cluster-hub__partners li { font-size: 14px; font-weight: 800; color: var(--color-text-muted); opacity: 0.85; transition: color 160ms ease, opacity 160ms ease; }
.cluster-hub__partners li:hover { color: var(--color-ink); opacity: 1; }

/* --- catalog --- */
.cluster-hub__catalog { padding-block: var(--space-12) var(--space-8); scroll-margin-block-start: 96px; }
.cluster-hub__section-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-4); }
.cluster-hub__section-title { font-size: clamp(26px, 3.2vw, 38px); font-weight: 900; line-height: 1.3; margin-block-end: var(--space-1); }
.cluster-hub__section-intro { font-size: 16px; line-height: 1.8; color: var(--color-text-muted); }
.cluster-hub__arrows { display: flex; gap: var(--space-1); }
.cluster-hub__arrow-btn {
  inline-size: 44px;
  block-size: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-white);
  color: var(--color-ink);
  cursor: pointer;
  transition: background-color 160ms ease, opacity 160ms ease;
}
.cluster-hub__arrow-btn:hover:not(:disabled) { background: var(--color-surface); }
.cluster-hub__arrow-btn--solid { background: var(--color-ink); border-color: var(--color-ink); color: var(--color-white); }
.cluster-hub__arrow-btn--solid:hover:not(:disabled) { background: var(--color-primary); border-color: var(--color-primary); }
.cluster-hub__arrow-btn:disabled { opacity: 0.35; cursor: default; }

.cluster-hub__track {
  list-style: none;
  margin: 0;
  padding: 0 0 var(--space-2);
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(82%, 340px);
  column-gap: var(--space-3);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
@media (min-width: 768px) { .cluster-hub__track { grid-auto-columns: calc((100% - var(--space-3)) / 2); } }
@media (min-width: 1024px) { .cluster-hub__track { grid-auto-columns: calc((100% - 2 * var(--space-4)) / 3); column-gap: var(--space-4); } }
.cluster-hub__card { scroll-snap-align: start; }
.cluster-hub__card-link { display: flex; flex-direction: column; color: inherit; text-decoration: none; }
.cluster-hub__card-media {
  position: relative;
  block-size: 420px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-alt);
  margin-block-end: var(--space-2);
}
.cluster-hub__card-media :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; transition: transform 500ms var(--motion-ease); }
.cluster-hub__card-link:hover .cluster-hub__card-media :deep(img),
.cluster-hub__card-link:focus-visible .cluster-hub__card-media :deep(img) { transform: scale(1.05); }
.cluster-hub__card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: var(--space-3);
  background: linear-gradient(to top, rgb(4 28 44 / 80%), transparent 60%);
  color: var(--color-white);
  opacity: 0;
  transition: opacity 200ms ease;
}
.cluster-hub__card-overlay span { display: inline-flex; align-items: center; gap: var(--space-1); font: var(--text-label); }
.cluster-hub__card-link:hover .cluster-hub__card-overlay,
.cluster-hub__card-link:focus-visible .cluster-hub__card-overlay { opacity: 1; }
@media (hover: none) { .cluster-hub__card-overlay { opacity: 1; } }
.cluster-hub__card-title { font-size: 20px; font-weight: 900; line-height: 1.4; margin-block-end: 4px; transition: color 160ms ease; }
.cluster-hub__card-link:hover .cluster-hub__card-title { color: var(--color-primary); }
.cluster-hub__card-desc { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-end: 4px; }
.cluster-hub__card-stat { font-size: 14px; font-weight: 500; color: var(--color-text-muted); }
.cluster-hub__card-stat strong { color: var(--color-ink); font-weight: 800; font-family: var(--font-en), var(--font-fa); }

/* --- process --- */
.cluster-hub__process { padding-block: var(--space-12); border-block-start: 1px solid var(--color-border); scroll-margin-block-start: 96px; }
.cluster-hub__process-head { max-inline-size: 42rem; margin-block-end: var(--space-6); }
.cluster-hub__process-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-6); align-items: start; }
@media (min-width: 1024px) {
  .cluster-hub__process-grid { grid-template-columns: 5fr 7fr; gap: var(--space-8); }
  .cluster-hub__process-media { order: -1; } /* image on the start (right) side, as in the mockup */
}
.cluster-hub__steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
.cluster-hub__step { display: flex; align-items: flex-start; gap: 20px; padding-block-end: var(--space-3); border-block-end: 1px solid var(--color-border); }
.cluster-hub__step:last-child { border-block-end: 0; padding-block-end: 0; }
.cluster-hub__step-icon {
  inline-size: 48px;
  block-size: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--color-ink);
  color: var(--color-white);
  box-shadow: 0 4px 10px rgb(4 28 44 / 18%);
}
.cluster-hub__step-title { font-size: 18px; font-weight: 800; line-height: 1.5; margin-block-end: 4px; }
.cluster-hub__step-body { font: var(--text-body-sm); line-height: 1.9; color: var(--color-text-muted); }

.cluster-hub__process-media { position: relative; }
.cluster-hub__process-img {
  block-size: 620px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface-alt);
  box-shadow: 0 20px 40px rgb(4 28 44 / 14%);
}
.cluster-hub__process-img :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; object-position: bottom; }
.cluster-hub__process-badge {
  position: absolute;
  inset-block-start: -20px;
  inset-inline-start: -20px;
  inline-size: 140px;
  block-size: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  text-align: center;
  border-radius: 50%;
  border: 4px solid var(--color-white);
  background: rgb(4 28 44 / 85%);
  backdrop-filter: blur(8px);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  box-shadow: 0 16px 32px rgb(4 28 44 / 25%);
}

/* --- quick contact --- */
.cluster-hub__contact {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  margin-block-end: var(--space-4);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
@media (min-width: 900px) { .cluster-hub__contact { flex-direction: row; align-items: center; justify-content: space-between; } }
.cluster-hub__contact-title { font-size: 24px; font-weight: 900; line-height: 1.4; margin-block-end: 4px; }
.cluster-hub__contact-body { font: var(--text-body-sm); color: var(--color-text-muted); }
.cluster-hub__contact-side { flex-shrink: 0; inline-size: 100%; max-inline-size: 460px; }
.cluster-hub__contact-form { display: flex; gap: var(--space-1); }
.cluster-hub__contact-input {
  flex: 1;
  min-inline-size: 0;
  block-size: 48px;
  padding-inline: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  background: var(--color-white);
  font: var(--text-body-sm);
  color: var(--color-text);
}
.cluster-hub__contact-input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-tint); }
.cluster-hub__contact-input.is-invalid { border-color: var(--color-status-error); }
.cluster-hub__contact-submit {
  block-size: 48px;
  padding-inline: var(--space-3);
  border: 0;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
  font: var(--text-label);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 160ms ease;
}
.cluster-hub__contact-submit:hover { background: var(--color-primary-hover); }
.cluster-hub__contact-msg { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-block-start: 8px; font-size: 13px; min-block-size: 18px; }
.cluster-hub__contact-msg.is-error { color: var(--color-status-error); }
.cluster-hub__contact-msg.is-success {
  margin-block-start: 0;
  padding: 12px var(--space-2);
  color: var(--color-status-success);
  font-weight: 600;
  background: var(--color-white);
  border: 1px solid var(--color-status-success);
  border-radius: var(--radius-sm);
}
.cluster-hub__contact-reset { border: 0; background: none; color: var(--color-primary); text-decoration: underline; cursor: pointer; font-size: 12px; margin-inline-start: auto; }

@media (max-width: 767px) {
  .cluster-hub { padding-inline: var(--space-2); }
  .cluster-hub__hero { min-block-size: 440px; padding: var(--space-3); border-radius: var(--radius-md); }
  .cluster-hub__hero-lead { font-size: 16px; }
  .cluster-hub__about { padding-block: var(--space-8) var(--space-6); }
  .cluster-hub__catalog, .cluster-hub__process { padding-block: var(--space-8); }
  .cluster-hub__card-media { block-size: 360px; border-radius: var(--radius-md); }
  .cluster-hub__process-img { block-size: 420px; }
  .cluster-hub__process-badge { inline-size: 116px; block-size: 116px; font-size: 12px; inset-inline-start: -8px; }
  .cluster-hub__contact { padding: var(--space-3); }
  .cluster-hub__contact-form { flex-direction: column; }
}
@media (prefers-reduced-motion: reduce) {
  .cluster-hub__track { scroll-behavior: auto; }
  .cluster-hub__card-media :deep(img) { transition: none; }
}
</style>
