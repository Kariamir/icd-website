<script setup lang="ts">
import {
  IR_SYMBOL_IS_MOCK,
  assetBacking,
  codalAnnouncements,
  dividendHighlight,
  dpsHistory,
  getPriceSeries,
  quote,
  snapshotDateLabel,
  symbolMeta,
  timeframeOptions,
  timeframeOptionsShown,
  type ChartRefLine,
  type Timeframe,
} from '~/utils/irSymbolData'
import { irFormatNumber, irFaDigits } from '~/utils/irDateUtils'

// Template `08-ir-symbol`, from
// `project_detail_page_template/08_ir_symbol/code.html`: breadcrumb, symbol
// banner (name/ticker/code, update line + ISIN, TSETMC and CODAL links), the
// market-cap and NAV cards, the price & volume chart with its range pills and
// key-stats strip, the DPS highlight, asset-backing cards + DPS history, and
// the latest CODAL announcements.
//
// STRIPPED 2026-10-18 at the owner's request: the status and sector badges,
// the watchlist and analysis-report buttons, the last-price and closing-price
// cards, the candlestick and market-depth chart modes, the order book, the
// retail-vs-institutional panel and the shareholder-composition panel. The
// data behind them is untouched in irSymbolData.ts — it is simply not drawn.
//
// MOCK DATA: real TSETMC / CODAL feeds are pending the backend phase — see
// app/utils/irSymbolData.ts. A visible «داده‌های نمایشی» note is rendered.

const timeframe = ref<Timeframe>('1d')
const series = computed(() => getPriceSeries(timeframe.value))

const intraday = getPriceSeries('1d')
const monthSeries = getPriceSeries('1m')
const yearSeries = getPriceSeries('1y')

const dayLow = Math.min(...intraday.map(p => p.low))
const dayHigh = Math.max(...intraday.map(p => p.high))
const ceiling = Math.round(quote.prevClose * (1 + quote.bandPercent / 100))
const floor = Math.round(quote.prevClose * (1 - quote.bandPercent / 100))
const ma20 = Math.round(monthSeries.slice(-20).reduce((s, p) => s + p.close, 0) / Math.min(20, monthSeries.length))
const yearLow = Math.min(...yearSeries.map(p => p.low))
const yearHigh = Math.max(...yearSeries.map(p => p.high))

const marketCapBn = Math.round((quote.last * quote.totalShares) / 1e9)
const pNav = (quote.last / quote.navPerShare) * 100
const pe = quote.last / quote.eps

function signed(value: number, digits = 0, suffix = '') {
  const sign = value > 0 ? '+' : value < 0 ? '−' : ''
  return `${sign}${irFormatNumber(Math.abs(value), digits)}${suffix}`
}
const millions = (v: number) => `${irFormatNumber(v / 1_000_000, 1)} میلیون سهم`

const refLines = computed<ChartRefLine[]>(() => {
  if (timeframe.value === '1d') {
    return [
      { value: ceiling, label: 'سقف مجاز', note: 'مقاومت تکنیکال', tone: 'ceiling' },
      { value: ma20, label: 'میانگین متحرک ۲۰ روزه', tone: 'neutral' },
      { value: quote.close, label: 'قیمت پایانی', note: 'نقطه تعادل فعلی', tone: 'current' },
      { value: floor, label: 'کف مجاز', note: 'حمایت حقوقی', tone: 'floor' },
    ]
  }
  const pts = series.value
  return [
    { value: Math.max(...pts.map(p => p.high)), label: 'بیشترین قیمت دوره', note: 'مقاومت', tone: 'ceiling' },
    { value: Math.min(...pts.map(p => p.low)), label: 'کمترین قیمت دوره', note: 'حمایت', tone: 'floor' },
  ]
})

const rangeText = computed(() => {
  if (timeframe.value === '1d') {
    return `دامنه نوسان روزانه: ${irFormatNumber(dayLow)} ریال الی ${irFormatNumber(dayHigh)} ریال (بازه مجاز ±${irFaDigits(quote.bandPercent)}٪: ${irFormatNumber(floor)} تا ${irFormatNumber(ceiling)})`
  }
  const pts = series.value
  const first = pts[0]!.open
  const pct = ((quote.last - first) / first) * 100
  const tfLabel = timeframeOptions.find(t => t.key === timeframe.value)!.label
  return `بازه ${tfLabel}: ${irFormatNumber(Math.min(...pts.map(p => p.low)))} تا ${irFormatNumber(Math.max(...pts.map(p => p.high)))} ریال · بازده دوره: ${signed(pct, 1, '٪')}`
})

const keyStats = [
  { label: 'بازه سالانه (۵۲ هفته)', value: `${irFormatNumber(yearLow)} - ${irFormatNumber(yearHigh)} ریال` },
  { label: 'میانگین حجم ماهانه', value: millions(quote.avgMonthlyVolume) },
  { label: 'EPS تحلیلی', value: `${irFormatNumber(quote.eps)} ریال` },
  { label: 'نسبت P/E نماد', value: `${irFormatNumber(pe, 1)} واحد` },
  { label: 'P/E گروه ساختمانی', value: `${irFormatNumber(quote.groupPe, 1)} واحد` },
  { label: 'ضریب نقدشوندگی', value: `${irFormatNumber(quote.liquidityPercent, 1)}٪ (عالی)` },
]

</script>

<template>
  <div class="ir-symbol">
    <nav class="ir-symbol__breadcrumb" aria-label="مسیریاب">
      <NuxtLink to="/">صفحه اصلی</NuxtLink>
      <span aria-hidden="true">/</span>
      <NuxtLink to="/ir">دیده‌بان ثاخت</NuxtLink>
      <span aria-hidden="true">/</span>
      <span class="ir-symbol__breadcrumb-current">اطلاعات نماد ثاخت در بورس اوراق بهادار تهران ({{ symbolMeta.code }})</span>
    </nav>

    <!-- hero banner -->
    <section class="ir-symbol__hero">
      <div class="ir-symbol__hero-ornament" aria-hidden="true" />
      <div class="ir-symbol__hero-main">
        <div class="ir-symbol__title-row">
          <h1>{{ symbolMeta.companyName }}</h1>
          <span class="ir-symbol__ticker">« {{ symbolMeta.ticker }} »</span>
          <span class="ir-symbol__code">(کد نماد: {{ symbolMeta.code }})</span>
        </div>
        <p class="ir-symbol__update">
          <span>آخرین به‌روزرسانی هسته معاملات: {{ snapshotDateLabel() }} ساعت {{ symbolMeta.snapshotTime }} (TSETMC)</span>
          <span class="ir-symbol__dot" aria-hidden="true" />
          <span>کد ISIN شرکت: <bdi>{{ symbolMeta.isin }}</bdi></span>
        </p>
        <p v-if="IR_SYMBOL_IS_MOCK" class="ir-symbol__mock-note">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16h.01" /></svg>
          داده‌های نمایشی — اتصال به داده لحظه‌ای بورس در فاز بک‌اند
        </p>
      </div>
      <div class="ir-symbol__hero-actions">
        <div class="ir-symbol__ext-links">
          <a :href="symbolMeta.tsetmcUrl" target="_blank" rel="noopener noreferrer" class="ir-symbol__btn ir-symbol__btn--ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
            TSETMC
          </a>
          <a :href="symbolMeta.codalUrl" target="_blank" rel="noopener noreferrer" class="ir-symbol__btn ir-symbol__btn--ghost">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
            کدال (Codal)
          </a>
        </div>
      </div>
    </section>

    <!-- metric cards -->
    <section class="ir-symbol__metrics" aria-label="شاخص‌های کلیدی نماد">
      <div class="ir-symbol__metric">
        <div class="ir-symbol__metric-head">
          <span>ارزش کل بازار ثاخت (Market Cap)</span>
          <span class="ir-symbol__chip ir-symbol__chip--blue">بورس تهران</span>
        </div>
        <div class="ir-symbol__metric-value">
          <strong>{{ irFormatNumber(marketCapBn) }} <small>میلیارد ریال</small></strong>
        </div>
        <div class="ir-symbol__metric-foot"><span>سرمایه ثبتی شرکت:</span><strong>{{ irFormatNumber(quote.registeredCapitalBn) }} میلیارد ریال</strong></div>
      </div>
      <div class="ir-symbol__metric">
        <div class="ir-symbol__metric-head">
          <span>ارزش خالص دارایی‌ها (NAV هر سهم)</span>
          <span class="ir-symbol__chip ir-symbol__chip--blue">فرصت سرمایه‌گذاری</span>
        </div>
        <div class="ir-symbol__metric-value">
          <strong>{{ irFormatNumber(quote.navPerShare) }} <small>ریال</small></strong>
          <span class="ir-symbol__pnav">P/NAV: <b>{{ irFormatNumber(pNav, 1) }}٪</b></span>
        </div>
        <div class="ir-symbol__metric-foot"><span>حاشیه امن دارایی ملکی:</span><strong class="is-up">{{ irFormatNumber(100 - pNav, 1) }}٪ تخفیف به NAV</strong></div>
      </div>
    </section>

    <!-- price chart -->
    <section class="ir-symbol__panel ir-symbol__chart-panel" aria-labelledby="ir-chart-heading">
      <div class="ir-symbol__chart-head">
        <div>
          <h2 id="ir-chart-heading">نمودار تغییرات قیمت و حجم معاملات نماد ثاخت <span>| بازه زمانی معاملاتی</span></h2>
          <p>{{ rangeText }}</p>
        </div>
        <div class="ir-symbol__chart-controls">
          <div class="ir-symbol__segmented" role="group" aria-label="بازه زمانی">
            <button v-for="tf in timeframeOptionsShown" :key="tf.key" type="button" :class="{ 'is-active': timeframe === tf.key }" :aria-pressed="timeframe === tf.key" @click="timeframe = tf.key">{{ tf.label }}</button>
          </div>
        </div>
      </div>
      <div class="ir-symbol__chart-box">
        <IrSymbolPriceChart :points="series" mode="line" :ref-lines="refLines" />
      </div>
      <dl class="ir-symbol__key-stats">
        <div v-for="s in keyStats" :key="s.label">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>
    </section>

    <section class="ir-symbol__dps-card" aria-labelledby="ir-dps-heading">
      <div class="ir-symbol__dps-head">
        <span class="ir-symbol__dps-tag">{{ dividendHighlight.tag }}</span>
        <span>{{ dividendHighlight.meeting }}</span>
      </div>
      <h4 id="ir-dps-heading">{{ dividendHighlight.title }}</h4>
      <p>{{ dividendHighlight.description }}</p>
      <div class="ir-symbol__dps-foot">
        <span>{{ dividendHighlight.dpsLabel }}</span>
        <strong>{{ dividendHighlight.dpsValue }}</strong>
      </div>
    </section>

    <!-- asset backing + DPS history -->
    <section class="ir-symbol__panel" aria-labelledby="ir-assets-heading">
      <div class="ir-symbol__section-head">
        <div>
          <h2 id="ir-assets-heading">پشتوانه دارایی‌ها، املاک و محرک‌های بنیادی ارزش ثاخت</h2>
          <p>پروژه‌های شاخص ملکی و تجاری که موتور سودآوری و ارزش خالص دارایی‌ها (NAV) را تشکیل می‌دهند</p>
        </div>
        <NuxtLink to="/projects" class="ir-symbol__text-link">مشاهده پرتفوی کامل دارایی‌های ملکی ←</NuxtLink>
      </div>
      <div class="ir-symbol__assets">
        <NuxtLink v-for="a in assetBacking" :key="a.title" :to="a.href" class="ir-symbol__asset">
          <strong>{{ a.title }}</strong>
          <span class="ir-symbol__asset-location">{{ a.location }}</span>
          <p>{{ a.description }}</p>
          <div class="ir-symbol__asset-foot"><span>{{ a.metricLabel }}</span><b>{{ a.metricValue }}</b></div>
        </NuxtLink>
      </div>

      <h3 class="ir-symbol__panel-title ir-symbol__dps-title">تاریخچه سود نقدی تقسیمی مجامع (DPS History)</h3>
      <div class="ir-symbol__table-wrap">
        <table class="ir-symbol__dps-table">
          <thead>
            <tr>
              <th>سال مالی</th>
              <th>سود خالص هر سهم (EPS)</th>
              <th>سود نقدی مصوب (DPS)</th>
              <th>درصد تقسیم سود</th>
              <th>تاریخ برگزاری مجمع</th>
              <th>شیوه پرداخت</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in dpsHistory" :key="r.fiscalYear">
              <td><strong>{{ r.fiscalYear }}</strong></td>
              <td>{{ irFormatNumber(r.eps) }} ریال</td>
              <td class="ir-symbol__dps-value">{{ irFormatNumber(r.dps) }} ریال</td>
              <td>{{ irFormatNumber((r.dps / r.eps) * 100) }}٪</td>
              <td>{{ r.meetingDate }}</td>
              <td class="ir-symbol__dps-method">{{ r.method }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CODAL announcements -->
    <section class="ir-symbol__panel" aria-labelledby="ir-codal-heading">
      <div class="ir-symbol__section-head">
        <div class="ir-symbol__codal-title">
          <span class="ir-symbol__codal-logo" aria-hidden="true">کدال</span>
          <div>
            <h2 id="ir-codal-heading">آخرین اطلاعیه‌های رسمی و شفاف‌سازی‌های کدال (Codal)</h2>
            <p>اطلاعیه‌های افشای اطلاعات بااهمیت، گزارشات ماهانه و صورت‌های مالی</p>
          </div>
        </div>
        <a :href="symbolMeta.codalUrl" target="_blank" rel="noopener noreferrer" class="ir-symbol__btn ir-symbol__btn--outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
          مشاهده آرشیو کامل اطلاعیه‌ها در سامانه کدال
        </a>
      </div>
      <ul class="ir-symbol__codal-list">
        <li v-for="a in codalAnnouncements" :key="a.title">
          <div class="ir-symbol__codal-main">
            <span class="ir-symbol__chip">{{ a.tag }}</span>
            <span class="ir-symbol__codal-text">{{ a.title }}</span>
          </div>
          <div class="ir-symbol__codal-meta">
            <span>تاریخ انتشار: {{ a.date }}</span>
            <NuxtLink :to="a.href" class="ir-symbol__codal-download">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" /></svg>
              دریافت پیوست
            </NuxtLink>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.ir-symbol { display: flex; flex-direction: column; gap: var(--space-3); padding-block-end: var(--space-8); }
.is-up { color: var(--color-status-success); }
.is-down { color: var(--color-status-error); }

.ir-symbol__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block-start: var(--space-2); }
.ir-symbol__breadcrumb a { color: inherit; text-decoration: none; }
.ir-symbol__breadcrumb a:hover { color: var(--color-primary); }
.ir-symbol__breadcrumb-current { color: var(--color-text); font-weight: 600; }

/* hero */
.ir-symbol__hero { position: relative; overflow: hidden; display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: var(--space-3); padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
.ir-symbol__hero-ornament { position: absolute; inset-block-start: -120px; inset-inline-end: -80px; inline-size: 360px; block-size: 360px; border-radius: 50%; background: radial-gradient(circle, var(--color-tint) 0%, transparent 70%); opacity: 0.8; pointer-events: none; }
.ir-symbol__hero-main, .ir-symbol__hero-actions { position: relative; }
.ir-symbol__hero-main { flex: 1 1 520px; }
.ir-symbol__badges { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-block-end: var(--space-2); }
.ir-symbol__badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: var(--radius-pill); background: var(--color-white); border: 1px solid var(--color-border); font-size: 12px; font-weight: 600; color: var(--color-text); }
.ir-symbol__badge--status { border-color: var(--color-status-success); color: var(--color-status-success); font-weight: 700; }
.ir-symbol__badge--status span { inline-size: 8px; block-size: 8px; border-radius: 50%; background: var(--color-status-success); }
.ir-symbol__title-row { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px var(--space-2); margin-block-end: var(--space-1); }
.ir-symbol__title-row h1 { font: var(--text-h2); font-weight: 800; margin: 0; }
.ir-symbol__ticker { font-size: 28px; font-weight: 800; color: var(--color-primary); }
.ir-symbol__code { font-size: 14px; font-weight: 600; color: var(--color-text-muted); }
.ir-symbol__update { display: flex; flex-wrap: wrap; align-items: center; gap: 6px var(--space-1); font-size: 12px; color: var(--color-text-muted); margin: 0; }
.ir-symbol__dot { inline-size: 4px; block-size: 4px; border-radius: 50%; background: var(--color-border); }
.ir-symbol__mock-note { display: inline-flex; align-items: center; gap: 6px; margin: var(--space-2) 0 0; padding: 5px 12px; border-radius: var(--radius-xs); background: var(--color-white); border: 1px dashed var(--color-text-muted); font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.ir-symbol__hero-actions { display: flex; flex-direction: column; align-items: stretch; gap: var(--space-1); }
.ir-symbol__ext-links { display: flex; gap: var(--space-1); }
.ir-symbol__ext-links > * { flex: 1; justify-content: center; }

.ir-symbol__btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 18px; border-radius: var(--radius-pill); border: 1px solid transparent; font: inherit; font-size: 13px; font-weight: 700; text-decoration: none; white-space: nowrap; cursor: pointer; transition: background 0.2s, border-color 0.2s, color 0.2s; }
.ir-symbol__btn--primary { background: var(--color-primary); color: var(--color-white); }
.ir-symbol__btn--primary:hover { background: var(--color-primary-hover); }
.ir-symbol__btn--primary[aria-pressed='true'] { background: var(--color-ink); }
.ir-symbol__btn--outline { background: var(--color-white); border-color: var(--color-border); color: var(--color-text); }
.ir-symbol__btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.ir-symbol__btn--ghost { padding: 7px 14px; font-size: 12px; background: var(--color-white); border-color: var(--color-border); color: var(--color-text-muted); }
.ir-symbol__btn--ghost:hover { color: var(--color-primary); border-color: var(--color-primary); }

/* metrics */
.ir-symbol__metrics { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
/* Two cards since the last-price and closing cards were removed. */
@media (min-width: 640px) { .ir-symbol__metrics { grid-template-columns: 1fr 1fr; } }
.ir-symbol__metric { display: flex; flex-direction: column; gap: 12px; padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.ir-symbol__metric-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.ir-symbol__live { inline-size: 10px; block-size: 10px; border-radius: 50%; background: var(--color-status-success); box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-status-success) 18%, transparent); }
.ir-symbol__metric-value { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); }
.ir-symbol__metric-value strong { font-size: 30px; font-weight: 800; line-height: 1.1; color: var(--color-ink); }
.ir-symbol__metric-value small { font-size: 12px; font-weight: 600; color: var(--color-text-muted); }
.ir-symbol__change { padding: 4px 10px; border-radius: var(--radius-pill); font-size: 12px; font-weight: 800; }
.ir-symbol__change.is-up { background: color-mix(in srgb, var(--color-status-success) 12%, transparent); }
.ir-symbol__change.is-down { background: color-mix(in srgb, var(--color-status-error) 12%, transparent); }
.ir-symbol__pnav { font-size: 12px; color: var(--color-text-muted); }
.ir-symbol__pnav b { color: var(--color-primary); }
.ir-symbol__metric-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px; padding-block-start: 10px; border-block-start: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-muted); }
.ir-symbol__metric-foot strong { font-weight: 700; color: var(--color-text); }
.ir-symbol__metric-foot strong.is-up { color: var(--color-status-success); }
.ir-symbol__metric-foot strong.is-down { color: var(--color-status-error); }
.ir-symbol__chip { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: var(--radius-pill); background: var(--color-surface); color: var(--color-text); font-size: 11px; font-weight: 700; white-space: nowrap; }
.ir-symbol__chip--blue { background: var(--color-tint); color: var(--color-primary); }

/* panels */
.ir-symbol__panel { padding: var(--space-3); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
@media (min-width: 1024px) { .ir-symbol__panel { padding: var(--space-4); } }
.ir-symbol__panel-head, .ir-symbol__section-head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-2); }
.ir-symbol__panel-head h3, .ir-symbol__panel-title { font: var(--text-h3); font-weight: 800; margin: 0; }
.ir-symbol__panel-title { margin-block-end: var(--space-2); }
.ir-symbol__panel-head p, .ir-symbol__section-head p { font-size: 12px; color: var(--color-text-muted); margin: 4px 0 0; }
.ir-symbol__section-head h2 { font: var(--text-h3); font-size: 22px; font-weight: 800; margin: 0; }
.ir-symbol__text-link { display: inline-flex; font-size: 13px; font-weight: 700; color: var(--color-primary); text-decoration: none; }
.ir-symbol__text-link:hover { text-decoration: underline; }

/* chart */
.ir-symbol__chart-head { display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; gap: var(--space-2); margin-block-end: var(--space-3); }
.ir-symbol__chart-head h2 { font: var(--text-h3); font-size: 20px; font-weight: 800; margin: 0; }
.ir-symbol__chart-head h2 span { font-size: 13px; font-weight: 500; color: var(--color-text-muted); }
.ir-symbol__chart-head p { font-size: 12px; color: var(--color-text-muted); margin: 6px 0 0; }
.ir-symbol__chart-controls { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.ir-symbol__segmented { display: flex; flex-wrap: wrap; gap: 2px; padding: 4px; background: var(--color-surface); border-radius: var(--radius-pill); }
.ir-symbol__segmented button { padding: 6px 12px; border: none; border-radius: var(--radius-pill); background: none; color: var(--color-text-muted); font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
.ir-symbol__segmented button:hover { color: var(--color-text); }
.ir-symbol__segmented button.is-active { background: var(--color-white); color: var(--color-primary); box-shadow: 0 1px 3px rgb(4 28 44 / 12%); }
.ir-symbol__segmented--dark button.is-active { background: var(--color-ink); color: var(--color-white); }
.ir-symbol__chart-box { padding: var(--space-2) var(--space-2) 0; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-md); }
.ir-symbol__key-stats { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin: var(--space-3) 0 0; }
@media (min-width: 768px) { .ir-symbol__key-stats { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1100px) { .ir-symbol__key-stats { grid-template-columns: repeat(6, 1fr); } }
.ir-symbol__key-stats > div { padding: 12px var(--space-2); background: var(--color-surface); border-radius: var(--radius-sm); }
.ir-symbol__key-stats dt { font-size: 11px; color: var(--color-text-muted); margin-block-end: 4px; }
.ir-symbol__key-stats dd { margin: 0; font-size: 14px; font-weight: 800; color: var(--color-text); }

/* two columns */
.ir-symbol__two-col { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-3); }
@media (min-width: 1024px) { .ir-symbol__two-col { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); align-items: start; } }
.ir-symbol__col { display: flex; flex-direction: column; gap: var(--space-3); min-width: 0; }

.ir-symbol__table-wrap { overflow-x: auto; }
.ir-symbol__orderbook, .ir-symbol__dps-table { inline-size: 100%; border-collapse: collapse; font-size: 13px; }
.ir-symbol__orderbook th, .ir-symbol__dps-table th { padding: 10px 8px; font-size: 11px; font-weight: 700; color: var(--color-text-muted); text-align: center; border-block-end: 1px solid var(--color-border); white-space: nowrap; }
.ir-symbol__orderbook td { padding: 10px 8px; text-align: center; border-block-end: 1px solid var(--color-surface-alt); font-variant-numeric: tabular-nums; }
.ir-symbol__orderbook tbody tr:hover { background: var(--color-surface); }
.ir-symbol__price { font-weight: 800; }
.ir-symbol__price.is-up { background: color-mix(in srgb, var(--color-status-success) 7%, transparent); }
.ir-symbol__price.is-down { background: color-mix(in srgb, var(--color-status-error) 7%, transparent); }

.ir-symbol__power { margin-block-start: var(--space-2); }
.ir-symbol__power-labels { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px var(--space-2); font-size: 11px; font-weight: 700; margin-block-end: 8px; }
.ir-symbol__power-ratio { padding: 2px 8px; border-radius: var(--radius-xs); background: var(--color-tint); color: var(--color-primary); }
.ir-symbol__power-bar { display: flex; block-size: 10px; border-radius: var(--radius-pill); overflow: hidden; background: var(--color-surface-alt); }
.ir-symbol__power-bar .is-up { background: var(--color-status-success); }
.ir-symbol__power-bar .is-down { background: var(--color-status-error); }

.ir-symbol__flow { display: grid; grid-template-columns: 1fr; gap: var(--space-2); }
@media (min-width: 640px) { .ir-symbol__flow { grid-template-columns: 1fr 1fr; } }
.ir-symbol__flow-box { display: flex; flex-direction: column; gap: 12px; padding: var(--space-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
.ir-symbol__flow-box--buy { border-block-start: 3px solid var(--color-status-success); }
.ir-symbol__flow-box--sell { border-block-start: 3px solid var(--color-status-error); }
.ir-symbol__flow-head { display: flex; justify-content: space-between; gap: var(--space-1); font-size: 12px; font-weight: 800; }
.ir-symbol__flow-box--buy .ir-symbol__flow-head span:first-child { color: var(--color-status-success); }
.ir-symbol__flow-box--sell .ir-symbol__flow-head span:first-child { color: var(--color-status-error); }
.ir-symbol__flow-head span:last-child { color: var(--color-text-muted); font-weight: 600; }
.ir-symbol__flow-label { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px; font-size: 11px; color: var(--color-text-muted); margin-block-end: 6px; }
.ir-symbol__flow-label strong { color: var(--color-text); }
.ir-symbol__bar { block-size: 8px; border-radius: var(--radius-pill); background: var(--color-surface-alt); overflow: hidden; }
.ir-symbol__bar span { display: block; block-size: 100%; border-radius: inherit; background: var(--color-primary); }
.ir-symbol__bar--muted span { background: var(--color-ink); opacity: 0.55; }

.ir-symbol__holders { list-style: none; margin: 0 0 var(--space-2); padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
.ir-symbol__holders li.is-float { padding-block-start: var(--space-2); border-block-start: 1px dashed var(--color-border); }
.ir-symbol__holder-row { display: flex; justify-content: space-between; gap: var(--space-1); font-size: 13px; font-weight: 600; margin-block-end: 6px; }
.ir-symbol__holder-row strong { color: var(--color-primary); font-weight: 800; }
.ir-symbol__holders small { display: block; margin-block-start: 4px; font-size: 11px; color: var(--color-text-muted); }

.ir-symbol__dps-card { display: flex; flex-direction: column; gap: var(--space-1); padding: var(--space-3); border-radius: var(--radius-lg); background: var(--color-ink); color: var(--color-white); }
.ir-symbol__dps-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); font-size: 12px; color: var(--color-tint); }
.ir-symbol__dps-tag { padding: 4px 10px; border-radius: var(--radius-pill); background: var(--color-brand-blue); color: var(--color-white); font-weight: 700; }
.ir-symbol__dps-card h4 { font: var(--text-h3); font-weight: 800; margin: var(--space-1) 0 0; }
.ir-symbol__dps-card p { font-size: 13px; line-height: 1.8; color: rgb(255 255 255 / 72%); margin: 0; }
.ir-symbol__dps-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px; margin-block-start: var(--space-1); padding-block-start: 12px; border-block-start: 1px solid rgb(255 255 255 / 15%); font-size: 13px; }
.ir-symbol__dps-foot strong { color: var(--color-tint); }

/* assets */
.ir-symbol__assets { display: grid; grid-template-columns: 1fr; gap: var(--space-2); margin-block-end: var(--space-4); }
@media (min-width: 640px) { .ir-symbol__assets { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1100px) { .ir-symbol__assets { grid-template-columns: repeat(4, 1fr); } }
.ir-symbol__asset { display: flex; flex-direction: column; gap: 6px; padding: var(--space-2); background: var(--color-surface); border: 1px solid transparent; border-radius: var(--radius-md); color: var(--color-text); text-decoration: none; transition: border-color 0.2s, background 0.2s; }
.ir-symbol__asset:hover { border-color: var(--color-primary); background: var(--color-white); }
.ir-symbol__asset strong { font-size: 15px; font-weight: 800; }
.ir-symbol__asset:hover strong { color: var(--color-primary); }
.ir-symbol__asset-location { font-size: 12px; font-weight: 600; color: var(--color-primary); }
.ir-symbol__asset p { flex: 1; font-size: 12px; line-height: 1.8; color: var(--color-text-muted); margin: 0; }
.ir-symbol__asset-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px; padding-block-start: 10px; border-block-start: 1px solid var(--color-border); font-size: 12px; color: var(--color-text-muted); }
.ir-symbol__asset-foot b { color: var(--color-text); }
.ir-symbol__dps-title { padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
.ir-symbol__dps-table th { text-align: start; background: var(--color-surface); }
.ir-symbol__dps-table th:first-child { border-start-start-radius: var(--radius-xs); }
.ir-symbol__dps-table th:last-child { border-start-end-radius: var(--radius-xs); }
.ir-symbol__dps-table td { padding: 12px 8px; border-block-end: 1px solid var(--color-border); white-space: nowrap; }
.ir-symbol__dps-value { font-weight: 800; color: var(--color-primary); }
.ir-symbol__dps-method { color: var(--color-primary); font-weight: 600; }

/* codal */
.ir-symbol__codal-title { display: flex; align-items: center; gap: var(--space-2); }
.ir-symbol__codal-logo { flex-shrink: 0; inline-size: 48px; block-size: 48px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-sm); background: var(--color-primary); color: var(--color-white); font-size: 13px; font-weight: 800; }
.ir-symbol__codal-list { list-style: none; margin: 0; padding: 0; }
.ir-symbol__codal-list li { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1) var(--space-3); padding-block: var(--space-2); border-block-start: 1px solid var(--color-border); }
.ir-symbol__codal-main { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1) 12px; flex: 1 1 420px; }
.ir-symbol__codal-text { font-size: 14px; font-weight: 700; }
.ir-symbol__codal-meta { display: flex; align-items: center; gap: var(--space-2); font-size: 12px; color: var(--color-text-muted); white-space: nowrap; }
.ir-symbol__codal-download { display: inline-flex; align-items: center; gap: 4px; font-weight: 700; color: var(--color-primary); text-decoration: none; }
.ir-symbol__codal-download:hover { text-decoration: underline; }
</style>
