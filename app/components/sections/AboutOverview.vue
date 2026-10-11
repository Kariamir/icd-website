<script setup lang="ts">
import {
  ABOUT_FORM_SUBJECTS,
  aboutBoard,
  aboutChain,
  aboutFilm,
  aboutForm,
  aboutGallery,
  aboutHero,
  aboutMilestones,
  aboutPillars,
  aboutSubsidiaries,
  aboutSubsidiariesSection,
  type AboutFormSubject,
} from '~/utils/aboutPageData'

// Single-scroll merged About page — replaces the eight former /about/*
// sub-pages (docs/decisions.md ADR-004). Direction is image-led and
// text-reduced (ADR-005): large photography, ≥96px between sections, no
// cards-within-cards, no decorative icons. Radii follow the balanced scale
// (docs/design-system-icd3d.md §4.1); all spacing uses logical properties
// because the site is RTL.

const subject = ref<AboutFormSubject>('resume')
const fullName = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)
const errors = reactive<Record<string, string>>({})

function validate() {
  Object.keys(errors).forEach(key => delete errors[key])
  if (!fullName.value.trim()) errors.fullName = 'نام و نام خانوادگی را وارد کنید.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) errors.email = 'ایمیل معتبر نیست.'
  if (message.value.trim().length < 10) errors.message = 'متن پیام حداقل ۱۰ نویسه باشد.'
  return Object.keys(errors).length === 0
}

function onSubmit() {
  // Real submission lands in the backend phase (ADR-002) — client-side only.
  if (!validate()) return
  submitted.value = true
}
</script>

<template>
  <article class="about">
    <!-- Hero ------------------------------------------------------------ -->
    <header class="about__hero">
      <img
        class="about__hero-img"
        :src="aboutHero.image.src"
        :alt="aboutHero.image.alt"
        loading="eager"
        decoding="async"
      >
      <div class="about__hero-scrim" />
      <div class="about__hero-text">
        <h1 class="about__hero-title">
          {{ aboutHero.title }}
        </h1>
        <p class="about__hero-lead">
          {{ aboutHero.lead }}
        </p>
      </div>
    </header>

    <!-- Pillars: vision + governance + engineering standards ------------- -->
    <section
      id="vision"
      class="about__section about__section--narrow"
      aria-labelledby="about-pillars-heading"
    >
      <h2 id="about-pillars-heading" class="u-visually-hidden">
        چشم‌انداز، حاکمیت شرکتی و استانداردهای مهندسی
      </h2>
      <div class="about__pillars">
        <div v-for="pillar in aboutPillars" :key="pillar.id" :id="pillar.id" class="about__pillar">
          <img class="about__pillar-img" :src="pillar.image.src" :alt="pillar.image.alt" loading="lazy" decoding="async">
          <h3 class="about__pillar-title">
            {{ pillar.title }}
          </h3>
          <p class="about__pillar-text">
            {{ pillar.text }}
          </p>
        </div>
      </div>
    </section>

    <!-- History: film, timeline, production chain ------------------------ -->
    <section id="history" class="about__section" aria-labelledby="about-history-heading">
      <h2 id="about-history-heading" class="about__heading">
        تاریخچه
      </h2>

      <figure class="about__film">
        <img class="about__film-poster" :src="aboutFilm.poster" alt="" loading="lazy" decoding="async">
        <div class="about__film-scrim" />
        <button type="button" class="about__film-play" :disabled="!aboutFilm.src">
          <span class="about__film-triangle" aria-hidden="true" />
          <span class="u-visually-hidden">پخش {{ aboutFilm.title }}</span>
        </button>
        <figcaption class="about__film-caption">
          {{ aboutFilm.caption }}
          <span v-if="!aboutFilm.src" class="about__pending">در انتظار فیلم</span>
        </figcaption>
      </figure>

      <ol class="about__timeline" tabindex="0" aria-label="خط زمانی از ۱۳۳۰ تا امروز">
        <li
          v-for="milestone in aboutMilestones"
          :key="milestone.id"
          class="about__milestone"
          :class="{ 'about__milestone--archival': milestone.archival }"
        >
          <img class="about__milestone-img" :src="milestone.image.src" :alt="milestone.image.alt" loading="lazy" decoding="async">
          <p class="about__milestone-year">
            {{ milestone.year }}
          </p>
          <h3 class="about__milestone-title">
            {{ milestone.title }}
          </h3>
          <p class="about__milestone-caption">
            {{ milestone.caption }}
          </p>
          <span v-if="milestone.placeholder" class="about__pending">در انتظار سند آرشیوی</span>
        </li>
      </ol>

      <ul class="about__chain" aria-label="زنجیره ساخت">
        <li v-for="step in aboutChain" :key="step.id" class="about__chain-step">
          <img class="about__chain-img" :src="step.image.src" :alt="step.image.alt" loading="lazy" decoding="async">
          <span class="about__chain-label">{{ step.label }}</span>
        </li>
      </ul>
    </section>

    <!-- Track record: pure gallery --------------------------------------- -->
    <section id="track-record" class="about__section" aria-labelledby="about-gallery-heading">
      <h2 id="about-gallery-heading" class="about__heading">
        کارنامه
      </h2>
      <ul class="about__gallery">
        <li v-for="item in aboutGallery" :key="item.id" class="about__gallery-item">
          <img class="about__gallery-img" :src="item.image.src" :alt="item.image.alt" loading="lazy" decoding="async">
          <span class="about__gallery-meta">
            <span class="about__gallery-title">{{ item.title }}</span>
            <span class="about__gallery-year">{{ item.year }}</span>
          </span>
        </li>
      </ul>
    </section>

    <!-- Subsidiaries: enlarged, blurred backdrop, horizontal scroll ------- -->
    <section id="subsidiaries" class="about__subsidiaries" aria-labelledby="about-subsidiaries-heading">
      <div
        class="about__subsidiaries-backdrop"
        :style="{ backgroundImage: `url(${aboutSubsidiariesSection.backdrop})` }"
        aria-hidden="true"
      />
      <div class="about__subsidiaries-inner">
        <h2 id="about-subsidiaries-heading" class="about__heading about__heading--small">
          {{ aboutSubsidiariesSection.title }}
        </h2>
        <p class="about__subsidiaries-text">
          {{ aboutSubsidiariesSection.text }}
        </p>
        <ul class="about__companies" tabindex="0" aria-label="شرکت‌های تابعه">
          <li v-for="company in aboutSubsidiaries" :key="company.id" class="about__company">
            <img class="about__company-logo" :src="company.logo.src" :alt="company.logo.alt" loading="lazy" decoding="async">
            <span class="about__company-name">{{ company.name }}</span>
            <span class="about__company-meta">{{ company.badge }} · سهم {{ company.stake }}</span>
          </li>
        </ul>
        <p class="about__scroll-hint" aria-hidden="true">
          برای دیدن همه شرکت‌ها بکشید
        </p>
      </div>
    </section>

    <!-- Board: one card per member, no detail route ---------------------- -->
    <section id="board" class="about__section" aria-labelledby="about-board-heading">
      <h2 id="about-board-heading" class="about__heading">
        هیات‌مدیره
      </h2>
      <ul class="about__board">
        <li v-for="member in aboutBoard" :key="member.slug" class="about__board-card">
          <img class="about__board-img" :src="member.image.src" :alt="member.image.alt" loading="lazy" decoding="async">
          <div class="about__board-body">
            <h3 class="about__board-name">
              {{ member.name }}
            </h3>
            <p class="about__board-role">
              {{ member.role }}
            </p>
            <dl class="about__board-facts">
              <div class="about__board-fact">
                <dt>تحصیلات</dt>
                <dd>{{ member.education }}</dd>
              </div>
              <div class="about__board-fact">
                <dt>نماینده</dt>
                <dd>{{ member.representing }}</dd>
              </div>
            </dl>
            <p class="about__board-bio">
              {{ member.bio }}
            </p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Form: exactly two subjects --------------------------------------- -->
    <section id="contact" class="about__section about__section--narrow" aria-labelledby="about-form-heading">
      <h2 id="about-form-heading" class="about__heading">
        {{ aboutForm.title }}
      </h2>
      <p class="about__form-text">
        {{ aboutForm.text }}
      </p>

      <p v-if="submitted" class="about__form-success" role="status">
        پیام شما ثبت شد. همکاران ما تماس می‌گیرند.
      </p>

      <form v-else class="about__form" novalidate @submit.prevent="onSubmit">
        <div class="about__field">
          <label for="about-subject">موضوع</label>
          <select id="about-subject" v-model="subject" class="about__input">
            <option v-for="option in ABOUT_FORM_SUBJECTS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>

        <div class="about__field">
          <label for="about-name">نام و نام خانوادگی</label>
          <input
            id="about-name"
            v-model="fullName"
            class="about__input"
            type="text"
            autocomplete="name"
            :aria-invalid="Boolean(errors.fullName)"
            :aria-describedby="errors.fullName ? 'about-name-error' : undefined"
          >
          <p v-if="errors.fullName" id="about-name-error" class="about__error">
            {{ errors.fullName }}
          </p>
        </div>

        <div class="about__field">
          <label for="about-email">ایمیل</label>
          <input
            id="about-email"
            v-model="email"
            class="about__input"
            type="email"
            autocomplete="email"
            dir="ltr"
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'about-email-error' : undefined"
          >
          <p v-if="errors.email" id="about-email-error" class="about__error">
            {{ errors.email }}
          </p>
        </div>

        <div class="about__field">
          <label for="about-message">پیام</label>
          <textarea
            id="about-message"
            v-model="message"
            class="about__input about__textarea"
            rows="5"
            :aria-invalid="Boolean(errors.message)"
            :aria-describedby="errors.message ? 'about-message-error' : undefined"
          />
          <p v-if="errors.message" id="about-message-error" class="about__error">
            {{ errors.message }}
          </p>
        </div>

        <button type="submit" class="about__submit">
          ارسال
        </button>
      </form>
    </section>
  </article>
</template>

<style scoped>
/* Layout ------------------------------------------------------------------ */
.about { color: var(--color-text); }

.about__section {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-3);
  padding-block: var(--space-12);
}

.about__section--narrow { max-inline-size: var(--container-max-tabular); }

.about__heading {
  font: var(--text-h2);
  margin-block-end: var(--space-6);
}

.about__heading--small { font: var(--text-h3); color: var(--color-white); }

.about__pending {
  display: inline-block;
  margin-block-start: var(--space-1);
  padding: 4px var(--space-1);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xs);
  font: var(--text-body-sm);
  color: var(--color-text-muted);
}

/* Hero -------------------------------------------------------------------- */
.about__hero {
  position: relative;
  block-size: min(82vh, 760px);
  overflow: hidden;
  background: var(--color-ink);
}

.about__hero-img { inline-size: 100%; block-size: 100%; object-fit: cover; }

.about__hero-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgb(4 28 44 / 78%) 0%, rgb(4 28 44 / 20%) 55%, transparent 100%);
}

.about__hero-text {
  position: absolute;
  inset-inline: var(--space-6);
  inset-block-end: var(--space-8);
  max-inline-size: 40rem;
  color: var(--color-white);
}

.about__hero-title { font: var(--text-h1); margin: 0; }
.about__hero-lead { font: var(--text-body); margin-block-start: var(--space-2); opacity: 0.92; }

/* Pillars ----------------------------------------------------------------- */
.about__pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.about__pillar-img {
  inline-size: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-block-end: var(--space-3);
}

.about__pillar-title { font: var(--text-h3); margin: 0 0 var(--space-1); }
.about__pillar-text { font: var(--text-body); color: var(--color-text-muted); margin: 0; }

/* Film -------------------------------------------------------------------- */
.about__film {
  position: relative;
  margin: 0 0 var(--space-12);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-ink);
}

.about__film-poster { inline-size: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
.about__film-scrim { position: absolute; inset: 0; background: rgb(4 28 44 / 35%); }

.about__film-play {
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(50%, -50%);
  inline-size: 88px;
  block-size: 88px;
  border: 2px solid var(--color-white);
  border-radius: 50%;
  background: rgb(255 255 255 / 12%);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.about__film-play:disabled { cursor: not-allowed; opacity: 0.6; }

.about__film-triangle {
  inline-size: 0;
  block-size: 0;
  border-block: 13px solid transparent;
  border-inline-end: 22px solid var(--color-white);
}

.about__film-caption {
  position: absolute;
  inset-inline-start: var(--space-4);
  inset-block-end: var(--space-4);
  color: var(--color-white);
  font: var(--text-body-sm);
}

.about__film-caption .about__pending { color: var(--color-white); border-color: rgb(255 255 255 / 45%); }

/* Timeline ---------------------------------------------------------------- */
.about__timeline {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  padding: 0 0 var(--space-3);
  margin: 0 0 var(--space-12);
  list-style: none;
  scroll-snap-type: x mandatory;
}

.about__milestone {
  flex: 0 0 min(72vw, 420px);
  scroll-snap-align: start;
}

.about__milestone-img {
  inline-size: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-block-end: var(--space-2);
}

.about__milestone--archival .about__milestone-img { filter: grayscale(100%) contrast(1.05); }

.about__milestone-year { font: var(--text-label); color: var(--color-primary); margin: 0 0 4px; }
.about__milestone-title { font: var(--text-h3); margin: 0 0 4px; }
.about__milestone-caption { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0; }

/* Production chain -------------------------------------------------------- */
.about__chain {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.about__chain-img {
  inline-size: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.about__chain-label {
  display: block;
  font: var(--text-label);
  margin-block-start: var(--space-1);
}

/* Gallery ----------------------------------------------------------------- */
.about__gallery {
  columns: 3;
  column-gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.about__gallery-item {
  position: relative;
  break-inside: avoid;
  margin-block-end: var(--space-3);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.about__gallery-img { inline-size: 100%; display: block; }

.about__gallery-meta {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-2);
  background: linear-gradient(to top, rgb(4 28 44 / 88%), transparent);
  color: var(--color-white);
  font: var(--text-body-sm);
  opacity: 0;
  transition: opacity 160ms ease;
}

.about__gallery-item:hover .about__gallery-meta,
.about__gallery-item:focus-within .about__gallery-meta { opacity: 1; }

.about__gallery-year { font-variant-numeric: tabular-nums; }

/* Subsidiaries ------------------------------------------------------------ */
.about__subsidiaries {
  position: relative;
  isolation: isolate;
  background: var(--color-ink);
  padding-block: calc(var(--space-12) * 1.5);
  overflow: hidden;
}

.about__subsidiaries-backdrop {
  position: absolute;
  inset: -40px;
  z-index: -1;
  background-size: cover;
  background-position: center;
  filter: blur(26px);
  opacity: 0.22;
}

.about__subsidiaries-inner {
  max-inline-size: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-3);
}

.about__subsidiaries-text {
  font: var(--text-body);
  color: rgb(255 255 255 / 80%);
  margin: 0 0 var(--space-8);
}

.about__companies {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  list-style: none;
  padding: 0 0 var(--space-3);
  margin: 0;
  scroll-snap-type: x mandatory;
}

.about__company {
  flex: 0 0 min(66vw, 320px);
  scroll-snap-align: start;
  color: var(--color-white);
}

.about__company-logo {
  inline-size: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  border-radius: var(--radius-md);
  background: rgb(255 255 255 / 8%);
  margin-block-end: var(--space-2);
}

.about__company-name { display: block; font: var(--text-h3); }
.about__company-meta { display: block; font: var(--text-body-sm); color: rgb(255 255 255 / 70%); margin-block-start: 4px; }

.about__scroll-hint {
  font: var(--text-body-sm);
  color: rgb(255 255 255 / 55%);
  margin-block-start: var(--space-2);
}

/* Board ------------------------------------------------------------------- */
.about__board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  list-style: none;
  padding: 0;
  margin: 0;
}

.about__board-img {
  inline-size: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-block-end: var(--space-2);
}

.about__board-name { font: var(--text-h3); margin: 0; }
.about__board-role { font: var(--text-body-sm); color: var(--color-primary); margin: 4px 0 var(--space-2); }

.about__board-facts { margin: 0 0 var(--space-2); }
.about__board-fact { display: flex; gap: var(--space-1); font: var(--text-body-sm); }
.about__board-fact dt { color: var(--color-text-muted); flex: 0 0 auto; }
.about__board-fact dd { margin: 0; }
.about__board-bio { font: var(--text-body-sm); color: var(--color-text-muted); margin: 0; }

/* Form -------------------------------------------------------------------- */
.about__form-text { font: var(--text-body); color: var(--color-text-muted); margin: 0 0 var(--space-6); }
.about__form { display: grid; gap: var(--space-4); }
.about__field { display: grid; gap: var(--space-1); }
.about__field label { font: var(--text-label); }

.about__input {
  font: var(--text-body);
  padding: 12px var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-white);
  color: var(--color-text);
  inline-size: 100%;
}

.about__input:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.about__textarea { resize: vertical; }
.about__error { font: var(--text-body-sm); color: var(--color-danger); margin: 0; }

.about__submit {
  justify-self: start;
  font: var(--text-label);
  padding: 14px var(--space-4);
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
}

.about__submit:hover { background: var(--color-primary-hover); }

.about__form-success {
  font: var(--text-body);
  color: var(--color-success);
  border: 1px solid var(--color-success);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
}

/* Responsive -------------------------------------------------------------- */
@media (max-width: 900px) {
  .about__pillars,
  .about__board { grid-template-columns: 1fr; }
  .about__chain { grid-template-columns: repeat(3, 1fr); }
  .about__gallery { columns: 2; }
  .about__hero-title { font: var(--text-h1-mobile); }
  .about__hero-text { inset-inline: var(--space-3); }
  .about__section { padding-block: var(--space-8); }
}

@media (max-width: 560px) {
  .about__gallery { columns: 1; }
  .about__chain { grid-template-columns: repeat(2, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .about__gallery-meta { transition: none; }
}
</style>
