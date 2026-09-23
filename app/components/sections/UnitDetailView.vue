<script setup lang="ts">
import type { UnitDetailViewModel } from '~/types/content'
import { getSimilarUnits, unitStatusLabels } from '~/utils/unitsData'

const props = defineProps<{ unit: UnitDetailViewModel }>()
const similarUnits = getSimilarUnits(props.unit.id)

const heroImage = props.unit.gallery[0]
const sideImages = props.unit.gallery.slice(1, 4)
const remainingCount = Math.max(props.unit.gallery.length - 4, 0)

const activeTab = ref(0)
const isBookmarked = ref(false)
const escortRequested = ref(true)

const amenityIcons: Record<string, string> = {
  ac: 'M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  smart: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.6.5 1 1.3 1 2.1V17h6v-1.4c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3Z',
  window: 'M4 4h16v16H4zM4 12h16M12 4v16',
  elevator: 'M6 3h12v18H6zM10 8l2-2 2 2M10 16l2 2 2-2',
  security: 'M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3Z',
  pool: 'M3 17c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0M4 7h16v7H4z',
  power: 'M13 3 4 14h6l-1 7 9-11h-6l1-7Z',
  parking: 'M6 4h6a4 4 0 0 1 0 8H9v8H6zM9 6v4h3a2 2 0 0 0 0-4z',
}
</script>

<template>
  <div class="unit-detail">
    <nav class="unit-detail__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/sales/available">فروش و پیش‌فروش</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink :to="`/projects/${unit.projectSlug}`">{{ unit.projectTitle }}</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="unit-detail__breadcrumb-current">واحد کد {{ unit.trackingCode }}</span>
      <div class="unit-detail__quick-actions">
        <button type="button" class="unit-detail__quick-btn" :class="{ 'is-active': isBookmarked }" @click="isBookmarked = !isBookmarked">
          <svg width="14" height="14" viewBox="0 0 24 24" :fill="isBookmarked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.8"><path d="M6 3h12v18l-6-4-6 4Z"/></svg>
          {{ isBookmarked ? 'نشان‌شده' : 'نشان کردن واحد' }}
        </button>
        <button type="button" class="unit-detail__quick-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"/></svg>
          دانلود شناسنامه فنی
        </button>
        <button type="button" class="unit-detail__quick-btn unit-detail__quick-btn--icon" title="اشتراک‌گذاری">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.7 7.6-4.4M8.2 13.3l7.6 4.4"/></svg>
        </button>
      </div>
    </nav>

    <header class="unit-detail__header">
      <div class="unit-detail__badges">
        <span class="unit-detail__badge" :class="`unit-detail__badge--${unit.status}`">{{ unitStatusLabels[unit.status] }}</span>
        <span class="unit-detail__badge unit-detail__badge--tracking">کد رهگیری {{ unit.trackingCode }}</span>
        <span v-if="unit.qualityGrade" class="unit-detail__badge unit-detail__badge--grade">{{ unit.qualityGrade }}</span>
      </div>
      <div class="unit-detail__title-row">
        <div>
          <h1>{{ unit.projectTitle }} — {{ unit.floor }}</h1>
          <p class="unit-detail__location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <NuxtLink :to="`/projects/${unit.projectSlug}`">{{ unit.projectTitle }}</NuxtLink>
          </p>
        </div>
        <div class="unit-detail__stats">
          <div><strong>{{ unit.floor }}</strong><span>طبقه</span></div>
          <div><strong>{{ unit.area }}</strong><span>متراژ</span></div>
          <div><strong>{{ unit.parkingCount }}</strong><span>پارکینگ سندی</span></div>
        </div>
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
        <section class="unit-detail__panel">
          <template v-for="group in unit.specGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <dl class="unit-detail__specs">
              <div v-for="spec in group.items" :key="spec.label" class="unit-detail__spec">
                <dt>{{ spec.label }}</dt>
                <dd>{{ spec.value }}</dd>
              </div>
            </dl>
          </template>
          <div class="unit-detail__description-block">
            <h3>درباره این واحد و موقعیت استراتژیک</h3>
            <p class="unit-detail__description">{{ unit.description }}</p>
          </div>
        </section>

        <section v-if="unit.floorPlan" class="unit-detail__panel">
          <div class="unit-detail__panel-head">
            <h2>پلان معماری و نقشه‌خوانی تخصصی واحد</h2>
            <div class="unit-detail__tabs" role="tablist">
              <button
                v-for="(tab, i) in unit.floorPlan.tabs"
                :key="tab"
                type="button"
                role="tab"
                :class="{ 'is-active': activeTab === i }"
                @click="activeTab = i"
              >
                {{ tab }}
              </button>
            </div>
          </div>
          <div class="unit-detail__blueprint">
            <svg viewBox="0 0 800 420" class="unit-detail__blueprint-svg">
              <rect x="40" y="30" width="720" height="360" rx="10" fill="var(--color-white)" stroke="var(--color-ink)" stroke-width="3" />
              <line x1="280" y1="30" x2="280" y2="390" stroke="var(--color-ink)" stroke-width="2" stroke-dasharray="6 3" />
              <line x1="280" y1="210" x2="40" y2="210" stroke="var(--color-ink)" stroke-width="2" />
              <line x1="520" y1="30" x2="520" y2="240" stroke="var(--color-ink)" stroke-width="2" />
              <text v-for="(room, i) in unit.floorPlan.rooms" :key="room" :x="130 + (i % 3) * 230" :y="120 + Math.floor(i / 3) * 140" fill="var(--color-brand-blue-deep)" font-size="13" font-weight="700" text-anchor="middle">{{ room }}</text>
            </svg>
          </div>
          <p class="unit-detail__blueprint-note">پلان‌های نمایشی — فایل‌های اتوکد نهایی پس از رزرو نوبت بازدید در اختیار قرار می‌گیرد.</p>
        </section>

        <section v-if="unit.amenities?.length" class="unit-detail__panel">
          <h2>مشخصات متریال، تاسیسات پیشرفته و امکانات</h2>
          <div class="unit-detail__amenities">
            <div v-for="a in unit.amenities" :key="a.title" class="unit-detail__amenity">
              <span class="unit-detail__amenity-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path :d="amenityIcons[a.icon]" /></svg>
              </span>
              <div>
                <strong>{{ a.title }}</strong>
                <p>{{ a.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside class="unit-detail__sidebar">
        <div class="unit-detail__price-box">
          <span class="unit-detail__price-label">قیمت</span>
          <span class="unit-detail__price">{{ unit.priceLabel }}</span>
          <div v-if="unit.pricePerSqmLabel" class="unit-detail__price-per-sqm">
            <span>قیمت هر مترمربع</span>
            <strong>{{ unit.pricePerSqmLabel }}</strong>
          </div>
        </div>

        <div v-if="unit.financingNote" class="unit-detail__financing">
          <strong>شرایط پرداخت تسهیلاتی</strong>
          <p>{{ unit.financingNote }}</p>
        </div>

        <div v-if="unit.inspectionSlotLabel" class="unit-detail__booking">
          <strong>رزرو نوبت بازدید حضوری</strong>
          <div class="unit-detail__booking-slot">{{ unit.inspectionSlotLabel }}</div>
          <label class="unit-detail__booking-check">
            <input v-model="escortRequested" type="checkbox">
            <span>درخواست همراهی مهندس ناظر در جلسه بازدید</span>
          </label>
        </div>

        <BaseButton href="/sales/consultation" size="lg">رزرو نوبت بازدید اختصاصی</BaseButton>
        <BaseButton href="/sales/consultation" variant="secondary" size="lg">درخواست پیش‌نویس قرارداد</BaseButton>

        <div v-if="unit.consultant" class="unit-detail__consultant">
          <div class="unit-detail__consultant-avatar" aria-hidden="true">{{ unit.consultant.name.charAt(0) }}</div>
          <div>
            <strong>{{ unit.consultant.name }}</strong>
            <p>{{ unit.consultant.role }}</p>
          </div>
          <a v-if="unit.consultant.phone" :href="`tel:${unit.consultant.phone}`" class="unit-detail__consultant-call" title="تماس">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z"/></svg>
          </a>
        </div>
      </aside>
    </div>

    <section v-if="similarUnits.length" class="unit-detail__similar">
      <div class="unit-detail__similar-head">
        <div>
          <h2>واحدهای مشابه و پیشنهادی</h2>
          <p>گزینه‌های هم‌رده بر اساس متراژ، کاربری و طبقات این پروژه</p>
        </div>
        <NuxtLink to="/sales/available" class="unit-detail__similar-link">مشاهده تمام واحدهای موجود</NuxtLink>
      </div>
      <div class="unit-detail__similar-grid">
        <UnitCard v-for="u in similarUnits" :key="u.id" :unit="u" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.unit-detail__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.unit-detail__breadcrumb a { color: inherit; text-decoration: none; }
.unit-detail__breadcrumb a:hover { color: var(--color-primary); }
.unit-detail__breadcrumb-current { color: var(--color-text); font-weight: 600; }
.unit-detail__quick-actions { display: flex; gap: 8px; margin-inline-start: auto; flex-wrap: wrap; }
.unit-detail__quick-btn { display: flex; align-items: center; gap: 6px; border: 1px solid var(--color-border); background: var(--color-white); border-radius: var(--radius-pill); padding: 7px 14px; font-size: 12px; font-weight: 600; color: var(--color-text); cursor: pointer; font-family: inherit; }
.unit-detail__quick-btn.is-active { border-color: var(--color-brand-blue); color: var(--color-brand-blue); }
.unit-detail__quick-btn--icon { padding: 7px; }

.unit-detail__header { padding-block: var(--space-2) var(--space-3); }
.unit-detail__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-block-end: var(--space-2); }
.unit-detail__badge { padding: 4px var(--space-2); font: var(--text-label); border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text); }
.unit-detail__badge--available { background: var(--color-status-success); color: var(--color-white); }
.unit-detail__badge--reserved { background: var(--color-tint); color: var(--color-primary); }
.unit-detail__badge--sold { background: var(--color-ink); color: var(--color-white); }
.unit-detail__badge--tracking { background: var(--color-tint); color: var(--color-primary); }
.unit-detail__badge--grade { background: var(--color-surface-alt); color: var(--color-text); }

.unit-detail__title-row { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--space-2); }
.unit-detail__title-row h1 { font: var(--text-h2); margin-block-end: var(--space-1); }
.unit-detail__location { display: flex; align-items: center; gap: 6px; color: var(--color-text-muted); font: var(--text-body); margin: 0; }
.unit-detail__location a { color: inherit; text-decoration: none; }
.unit-detail__location a:hover { color: var(--color-primary); }

.unit-detail__stats {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-3);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  width: fit-content;
}
.unit-detail__stats > div { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.unit-detail__stats strong { font: var(--text-h3); color: var(--color-primary); }
.unit-detail__stats span { font: var(--text-label); color: var(--color-text-muted); }

.unit-detail__gallery { display: grid; grid-template-columns: 1fr; gap: var(--space-2); margin-block: var(--space-4); }
@media (min-width: 1024px) { .unit-detail__gallery { grid-template-columns: 2fr 1fr; align-items: stretch; } }
.unit-detail__gallery-hero { position: relative; border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 16 / 10; }
.unit-detail__gallery-hero :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.unit-detail__gallery-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(4, 28, 44, 0.75), transparent 55%); pointer-events: none; }
.unit-detail__gallery-hero-footer { position: absolute; inset-inline: var(--space-3); inset-block-end: var(--space-3); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); }
.unit-detail__gallery-caption { padding: var(--space-1) var(--space-2); border-radius: var(--radius-pill); background: rgba(4, 28, 44, 0.8); color: var(--color-white); font: var(--text-label); }
.unit-detail__gallery-actions { display: flex; gap: var(--space-1); flex-wrap: wrap; }

.unit-detail__gallery-side { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); }
@media (min-width: 1024px) { .unit-detail__gallery-side { grid-template-columns: 1fr; } }
.unit-detail__gallery-item { position: relative; border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 4 / 3; }
@media (min-width: 1024px) { .unit-detail__gallery-item { aspect-ratio: auto; block-size: calc((100% - 2 * var(--space-2)) / 3); } }
.unit-detail__gallery-item :deep(img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
.unit-detail__gallery-item-caption { position: absolute; inset-inline-start: var(--space-1); inset-block-end: var(--space-1); padding: 2px var(--space-1); border-radius: var(--radius-pill); background: rgba(4, 28, 44, 0.8); color: var(--color-white); font-size: 11px; }
.unit-detail__gallery-item--overlay .unit-detail__gallery-more { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 2px; background: rgba(4, 28, 44, 0.65); color: var(--color-white); font: var(--text-label); cursor: pointer; }

.unit-detail__layout { display: grid; grid-template-columns: 1fr; gap: var(--space-3); padding-block-end: var(--space-6); }
@media (min-width: 1024px) { .unit-detail__layout { grid-template-columns: 2fr 1fr; align-items: start; } }
.unit-detail__main { display: flex; flex-direction: column; gap: var(--space-3); }
.unit-detail__panel { background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-3); }
.unit-detail__panel h2 { font: var(--text-h3); margin-block: 0 var(--space-2); }
.unit-detail__specs { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin-block-end: var(--space-2); }
@media (min-width: 640px) { .unit-detail__specs { grid-template-columns: repeat(4, 1fr); } }
.unit-detail__spec { display: flex; flex-direction: column; gap: 2px; padding-block-end: var(--space-1); border-block-end: 1px solid var(--color-border); }
.unit-detail__spec dt { font: var(--text-body-sm); color: var(--color-text-muted); }
.unit-detail__spec dd { font: var(--text-label); color: var(--color-text); }
.unit-detail__description-block { margin-block-start: var(--space-3); padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
.unit-detail__description-block h3 { font: var(--text-h3); margin-block-end: var(--space-1); }
.unit-detail__description { font: var(--text-body); color: var(--color-text-muted); }

.unit-detail__panel-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-2); }
.unit-detail__tabs { display: flex; gap: 4px; background: var(--color-surface); border-radius: var(--radius-pill); padding: 4px; }
.unit-detail__tabs button { border: none; background: none; padding: 7px 16px; font-size: 12px; font-weight: 700; border-radius: var(--radius-pill); cursor: pointer; color: var(--color-text-muted); font-family: inherit; }
.unit-detail__tabs button.is-active { background: var(--color-white); color: var(--color-primary); }
.unit-detail__blueprint { background: var(--color-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-md); padding: var(--space-2); }
.unit-detail__blueprint-svg { width: 100%; height: auto; }
.unit-detail__blueprint-note { font-size: 12px; color: var(--color-text-muted); margin-block-start: var(--space-1); margin-block-end: 0; }

.unit-detail__amenities { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
@media (min-width: 768px) { .unit-detail__amenities { grid-template-columns: 1fr 1fr; } }
.unit-detail__amenity { display: flex; gap: var(--space-2); }
.unit-detail__amenity-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: var(--radius-sm); background: var(--color-tint); color: var(--color-brand-blue-deep); display: flex; align-items: center; justify-content: center; }
.unit-detail__amenity strong { display: block; font-size: 14px; margin-block-end: 2px; }
.unit-detail__amenity p { margin: 0; font-size: 13px; color: var(--color-text-muted); }

.unit-detail__sidebar { position: sticky; top: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2); }
.unit-detail__price-box { background: var(--color-ink); color: var(--color-white); padding: var(--space-3); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: var(--space-2); }
.unit-detail__price-label { font: var(--text-label); color: var(--color-tint); }
.unit-detail__price { font: var(--text-h3); }
.unit-detail__price-per-sqm { display: flex; justify-content: space-between; padding-block-start: var(--space-1); border-block-start: 1px solid rgba(255,255,255,0.15); font-size: 13px; }

.unit-detail__financing, .unit-detail__booking { background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2); display: flex; flex-direction: column; gap: 6px; }
.unit-detail__financing p, .unit-detail__booking-slot { font-size: 13px; color: var(--color-text-muted); margin: 0; }
.unit-detail__booking-slot { background: var(--color-surface); border-radius: var(--radius-xs); padding: 8px; color: var(--color-text); }
.unit-detail__booking-check { display: flex; align-items: center; gap: 6px; font-size: 12px; }

.unit-detail__consultant { display: flex; align-items: center; gap: var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2); }
.unit-detail__consultant-avatar { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: var(--color-tint); color: var(--color-brand-blue-deep); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.unit-detail__consultant strong { display: block; font-size: 13px; }
.unit-detail__consultant p { margin: 0; font-size: 12px; color: var(--color-text-muted); }
.unit-detail__consultant-call { margin-inline-start: auto; width: 34px; height: 34px; border-radius: 50%; background: var(--color-brand-blue); color: var(--color-white); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.unit-detail__similar { padding-block-end: var(--space-8); }
.unit-detail__similar-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-3); }
.unit-detail__similar-head h2 { font: var(--text-h2); }
.unit-detail__similar-head p { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-start: 4px; }
.unit-detail__similar-link { font: var(--text-body-sm); font-weight: 700; color: var(--color-primary); text-decoration: none; }
.unit-detail__similar-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 768px) { .unit-detail__similar-grid { grid-template-columns: repeat(3, 1fr); } }
</style>
