<script setup lang="ts">
import type { ChartMode, ChartRefLine, OrderBookRow, PricePoint } from '~/utils/irSymbolData'
import { irFormatNumber } from '~/utils/irDateUtils'

// Inline-SVG price chart for /ir/symbol (08 mockup «نمودار تغییرات قیمت و
// حجم معاملات»). No chart library, no network. The SVG stretches to its box
// (preserveAspectRatio="none") with non-scaling strokes; every text label,
// the last-price marker and the hover tooltip are HTML overlays positioned
// in percentages so they never distort. Green/red are used only here, per
// the design-system exception for the stock widget.

// `orderBook` is only read by the depth mode, which /ir/financials no longer
// offers — so it is optional and defaults to empty rather than forcing every
// caller to pass data it does not draw.
const props = withDefaults(defineProps<{
  points: PricePoint[]
  mode: ChartMode
  refLines?: ChartRefLine[]
  orderBook?: OrderBookRow[]
}>(), { refLines: () => [], orderBook: () => [] })

const W = 1000
const H = 320
const PRICE_TOP = 18
const PRICE_BOTTOM = 226
const VOL_TOP = 246
const VOL_BOTTOM = 312

const n = computed(() => props.points.length)
const step = computed(() => (n.value > 1 ? (W - 24) / (n.value - 1) : 0))
const xAt = (i: number) => (n.value > 1 ? 12 + i * step.value : W / 2)

const domain = computed(() => {
  const vals = props.points.flatMap(p => (props.mode === 'candle' ? [p.high, p.low] : [p.close]))
  for (const r of props.refLines ?? []) vals.push(r.value)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  const pad = (max - min || max * 0.02) * 0.08
  return { min: min - pad, max: max + pad }
})

const yAt = (v: number) => PRICE_TOP + ((domain.value.max - v) / (domain.value.max - domain.value.min)) * (PRICE_BOTTOM - PRICE_TOP)

const linePath = computed(() => props.points.map((p, i) => `${i ? 'L' : 'M'}${xAt(i).toFixed(1)} ${yAt(p.close).toFixed(1)}`).join(' '))
const areaPath = computed(() => n.value ? `${linePath.value} L${xAt(n.value - 1).toFixed(1)} ${PRICE_BOTTOM} L${xAt(0).toFixed(1)} ${PRICE_BOTTOM} Z` : '')

const candleWidth = computed(() => Math.max(1.5, Math.min(14, step.value * 0.62)))
const candles = computed(() => props.points.map((p, i) => {
  const up = p.close >= p.open
  const top = yAt(Math.max(p.open, p.close))
  const bottom = yAt(Math.min(p.open, p.close))
  return { x: xAt(i), up, bodyY: top, bodyH: Math.max(1, bottom - top), wickTop: yAt(p.high), wickBottom: yAt(p.low) }
}))

const maxVolume = computed(() => Math.max(1, ...props.points.map(p => p.volume)))
const volumeBars = computed(() => props.points.map((p, i) => {
  const h = (p.volume / maxVolume.value) * (VOL_BOTTOM - VOL_TOP)
  return { x: xAt(i) - candleWidth.value / 2, y: VOL_BOTTOM - h, h, up: p.close >= p.open }
}))

const refLineLayout = computed(() => (props.refLines ?? []).map(r => ({ ...r, top: (yAt(r.value) / H) * 100 })))

const xTicks = computed(() => {
  if (props.mode === 'depth') return depth.value.ticks
  if (!n.value) return []
  const count = Math.min(5, n.value)
  return Array.from({ length: count }, (_, k) => {
    const i = count > 1 ? Math.round((k * (n.value - 1)) / (count - 1)) : 0
    return { left: (xAt(i) / W) * 100, label: props.points[i]!.tick }
  })
})

const lastPoint = computed(() => props.points[n.value - 1])
const lastMarker = computed(() => lastPoint.value ? { left: (xAt(n.value - 1) / W) * 100, top: (yAt(lastPoint.value.close) / H) * 100 } : null)

// ---- depth chart (cumulative order book) ----
const depth = computed(() => {
  const bids = [...props.orderBook].sort((a, b) => b.bidPrice - a.bidPrice)
  const asks = [...props.orderBook].sort((a, b) => a.askPrice - b.askPrice)
  const lowest = bids[bids.length - 1]?.bidPrice ?? 0
  const highest = asks[asks.length - 1]?.askPrice ?? 1
  const span = Math.max(1, highest - lowest)
  const minX = lowest - span * 0.08
  const maxX = highest + span * 0.08
  let cum = 0
  const bidSteps = bids.map((b) => { cum += b.bidVolume; return { price: b.bidPrice, cum } })
  const bidTotal = cum
  cum = 0
  const askSteps = asks.map((a) => { cum += a.askVolume; return { price: a.askPrice, cum } })
  const maxCum = Math.max(bidTotal, cum) * 1.1
  const dx = (p: number) => ((p - minX) / (maxX - minX)) * W
  const dy = (v: number) => VOL_BOTTOM - (v / maxCum) * (VOL_BOTTOM - PRICE_TOP)
  const stepPath = (steps: { price: number; cum: number }[], edge: number) => {
    if (!steps.length) return ''
    let d = `M${dx(steps[0]!.price).toFixed(1)} ${VOL_BOTTOM} L${dx(steps[0]!.price).toFixed(1)} ${dy(steps[0]!.cum).toFixed(1)}`
    for (let i = 1; i < steps.length; i++) {
      d += ` L${dx(steps[i]!.price).toFixed(1)} ${dy(steps[i - 1]!.cum).toFixed(1)} L${dx(steps[i]!.price).toFixed(1)} ${dy(steps[i]!.cum).toFixed(1)}`
    }
    const last = steps[steps.length - 1]!
    return `${d} L${dx(edge).toFixed(1)} ${dy(last.cum).toFixed(1)} L${dx(edge).toFixed(1)} ${VOL_BOTTOM} Z`
  }
  const tickPrices = Array.from({ length: 5 }, (_, k) => Math.round(minX + ((maxX - minX) * (k + 0.5)) / 5))
  return {
    bidPath: stepPath(bidSteps, minX),
    askPath: stepPath(askSteps, maxX),
    midX: dx(((bids[0]?.bidPrice ?? 0) + (asks[0]?.askPrice ?? 0)) / 2),
    ticks: tickPrices.map(p => ({ left: (dx(p) / W) * 100, label: irFormatNumber(p) })),
    bidTotal,
    askTotal: cum,
  }
})

// ---- hover ----
const plotEl = ref<HTMLElement | null>(null)
const hoverIndex = ref<number | null>(null)

function onPointerMove(event: PointerEvent) {
  if (props.mode === 'depth' || !plotEl.value || !n.value) return
  const rect = plotEl.value.getBoundingClientRect()
  const ratio = (event.clientX - rect.left) / rect.width
  const vbX = ratio * W
  const i = n.value > 1 ? Math.round((vbX - 12) / step.value) : 0
  hoverIndex.value = Math.min(n.value - 1, Math.max(0, i))
}

function onPointerLeave() { hoverIndex.value = null }

watch(() => [props.points, props.mode], () => { hoverIndex.value = null })

const hover = computed(() => {
  if (hoverIndex.value === null) return null
  const p = props.points[hoverIndex.value]
  if (!p) return null
  const left = (xAt(hoverIndex.value) / W) * 100
  return { p, left, x: xAt(hoverIndex.value), top: (yAt(p.close) / H) * 100, flip: left > 62 }
})
</script>

<template>
  <div class="ir-chart" dir="ltr">
    <div
      ref="plotEl"
      class="ir-chart__plot"
      @pointermove="onPointerMove"
      @pointerleave="onPointerLeave"
    >
      <svg
        class="ir-chart__svg"
        :viewBox="`0 0 ${W} ${H}`"
        preserveAspectRatio="none"
        role="img"
        :aria-label="mode === 'depth' ? 'نمودار عمق بازار نماد ثاخت' : `نمودار قیمت نماد ثاخت، آخرین قیمت ${lastPoint ? irFormatNumber(lastPoint.close) : ''} ریال`"
      >
        <defs>
          <linearGradient id="ir-chart-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" style="stop-color: var(--color-brand-blue); stop-opacity: 0.28" />
            <stop offset="100%" style="stop-color: var(--color-brand-blue); stop-opacity: 0" />
          </linearGradient>
        </defs>

        <g class="ir-chart__grid">
          <line v-for="k in 5" :key="k" x1="0" :x2="W" :y1="PRICE_TOP + ((k - 1) * (PRICE_BOTTOM - PRICE_TOP)) / 4" :y2="PRICE_TOP + ((k - 1) * (PRICE_BOTTOM - PRICE_TOP)) / 4" vector-effect="non-scaling-stroke" />
        </g>

        <template v-if="mode === 'depth'">
          <path :d="depth.bidPath" class="ir-chart__depth ir-chart__depth--bid" vector-effect="non-scaling-stroke" />
          <path :d="depth.askPath" class="ir-chart__depth ir-chart__depth--ask" vector-effect="non-scaling-stroke" />
          <line :x1="depth.midX" :x2="depth.midX" :y1="PRICE_TOP" :y2="VOL_BOTTOM" class="ir-chart__mid" vector-effect="non-scaling-stroke" />
        </template>

        <template v-else>
          <line
            v-for="r in refLines ?? []"
            :key="r.label"
            x1="0"
            :x2="W"
            :y1="yAt(r.value)"
            :y2="yAt(r.value)"
            class="ir-chart__ref"
            :class="`ir-chart__ref--${r.tone ?? 'neutral'}`"
            vector-effect="non-scaling-stroke"
          />

          <template v-if="mode === 'line'">
            <path :d="areaPath" fill="url(#ir-chart-area)" />
            <path :d="linePath" class="ir-chart__line" vector-effect="non-scaling-stroke" />
          </template>
          <g v-else>
            <g v-for="(c, i) in candles" :key="i" :class="c.up ? 'is-up' : 'is-down'" class="ir-chart__candle">
              <line :x1="c.x" :x2="c.x" :y1="c.wickTop" :y2="c.wickBottom" vector-effect="non-scaling-stroke" />
              <rect :x="c.x - candleWidth / 2" :y="c.bodyY" :width="candleWidth" :height="c.bodyH" />
            </g>
          </g>

          <line x1="0" :x2="W" :y1="VOL_BOTTOM" :y2="VOL_BOTTOM" class="ir-chart__axis" vector-effect="non-scaling-stroke" />
          <rect
            v-for="(b, i) in volumeBars"
            :key="`v${i}`"
            :x="b.x"
            :y="b.y"
            :width="candleWidth"
            :height="b.h"
            class="ir-chart__vol"
            :class="b.up ? 'is-up' : 'is-down'"
          />

          <line v-if="hover" :x1="hover.x" :x2="hover.x" :y1="PRICE_TOP" :y2="VOL_BOTTOM" class="ir-chart__crosshair" vector-effect="non-scaling-stroke" />
        </template>
      </svg>

      <template v-if="mode !== 'depth'">
        <div v-for="r in refLineLayout" :key="`l-${r.label}`" class="ir-chart__ref-label" :style="{ top: `${r.top}%` }" dir="rtl">
          <span class="ir-chart__ref-value" :class="`ir-chart__ref-value--${r.tone ?? 'neutral'}`">{{ irFormatNumber(r.value) }} ریال ({{ r.label }})</span>
          <span v-if="r.note" class="ir-chart__ref-note">{{ r.note }}</span>
        </div>
        <span v-if="lastMarker && mode === 'line'" class="ir-chart__marker" :style="{ left: `${lastMarker.left}%`, top: `${lastMarker.top}%` }" aria-hidden="true" />
        <span v-if="hover && mode === 'line'" class="ir-chart__hover-dot" :style="{ left: `${hover.left}%`, top: `${hover.top}%` }" aria-hidden="true" />
        <div v-if="hover" class="ir-chart__tooltip" :class="{ 'is-flipped': hover.flip }" :style="{ left: `${hover.left}%` }" dir="rtl">
          <strong>{{ hover.p.label }}</strong>
          <template v-if="mode === 'candle'">
            <span>باز: {{ irFormatNumber(hover.p.open) }} · بسته: {{ irFormatNumber(hover.p.close) }}</span>
            <span>بیشترین: {{ irFormatNumber(hover.p.high) }} · کمترین: {{ irFormatNumber(hover.p.low) }}</span>
          </template>
          <span v-else>قیمت: {{ irFormatNumber(hover.p.close) }} ریال</span>
          <span>حجم: {{ irFormatNumber(hover.p.volume / 1_000_000, 1) }} میلیون سهم</span>
        </div>
        <span class="ir-chart__vol-label" dir="rtl">حجم معاملات</span>
      </template>
      <template v-else>
        <span class="ir-chart__depth-label ir-chart__depth-label--bid" dir="rtl">تقاضای انباشته خرید: {{ irFormatNumber(depth.bidTotal / 1_000_000, 1) }} م سهم</span>
        <span class="ir-chart__depth-label ir-chart__depth-label--ask" dir="rtl">عرضه انباشته فروش: {{ irFormatNumber(depth.askTotal / 1_000_000, 1) }} م سهم</span>
      </template>
    </div>

    <div class="ir-chart__x-axis" aria-hidden="true">
      <span v-for="t in xTicks" :key="`${t.left}-${t.label}`" :style="{ left: `${t.left}%` }">{{ t.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.ir-chart { position: relative; }
.ir-chart__plot { position: relative; block-size: 320px; touch-action: pan-y; }
@media (max-width: 640px) { .ir-chart__plot { block-size: 260px; } }
.ir-chart__svg { position: absolute; inset: 0; inline-size: 100%; block-size: 100%; overflow: visible; }
.ir-chart__grid line { stroke: var(--color-border); stroke-width: 1; opacity: 0.6; }
.ir-chart__axis { stroke: var(--color-border); stroke-width: 1; }
.ir-chart__line { fill: none; stroke: var(--color-brand-blue); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
.ir-chart__ref { stroke-width: 1; stroke-dasharray: 5 5; stroke: var(--color-text-muted); opacity: 0.55; }
.ir-chart__ref--ceiling { stroke: var(--color-status-success); opacity: 0.8; }
.ir-chart__ref--floor { stroke: var(--color-status-error); opacity: 0.8; }
.ir-chart__ref--current { stroke: var(--color-brand-blue); opacity: 0.8; }
.ir-chart__candle line { stroke-width: 1.2; }
.ir-chart__candle.is-up line { stroke: var(--color-status-success); }
.ir-chart__candle.is-up rect { fill: var(--color-status-success); }
.ir-chart__candle.is-down line { stroke: var(--color-status-error); }
.ir-chart__candle.is-down rect { fill: var(--color-status-error); }
.ir-chart__vol.is-up { fill: var(--color-status-success); opacity: 0.35; }
.ir-chart__vol.is-down { fill: var(--color-status-error); opacity: 0.3; }
.ir-chart__crosshair { stroke: var(--color-ink); stroke-width: 1; stroke-dasharray: 3 3; opacity: 0.6; }
.ir-chart__depth { stroke-width: 2; }
.ir-chart__depth--bid { fill: color-mix(in srgb, var(--color-status-success) 18%, transparent); stroke: var(--color-status-success); }
.ir-chart__depth--ask { fill: color-mix(in srgb, var(--color-status-error) 16%, transparent); stroke: var(--color-status-error); }
.ir-chart__mid { stroke: var(--color-ink); stroke-width: 1; stroke-dasharray: 4 4; opacity: 0.5; }

.ir-chart__ref-label { position: absolute; inset-inline: 8px; transform: translateY(-100%); display: flex; justify-content: space-between; gap: var(--space-1); padding-block-end: 2px; pointer-events: none; font-size: 11px; }
.ir-chart__ref-value { font-weight: 700; color: var(--color-text-muted); background: rgb(255 255 255 / 80%); padding-inline: 4px; border-radius: var(--radius-xs); }
.ir-chart__ref-value--ceiling { color: var(--color-status-success); }
.ir-chart__ref-value--floor { color: var(--color-status-error); }
.ir-chart__ref-value--current { color: var(--color-primary); }
.ir-chart__ref-note { color: var(--color-text-muted); opacity: 0.8; }
@media (max-width: 640px) { .ir-chart__ref-note { display: none; } }

.ir-chart__marker, .ir-chart__hover-dot { position: absolute; inline-size: 12px; block-size: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: var(--color-brand-blue); border: 2px solid var(--color-white); pointer-events: none; }
.ir-chart__marker::after { content: ''; position: absolute; inset: -8px; border-radius: 50%; background: var(--color-brand-blue); opacity: 0.2; animation: ir-chart-pulse 1.8s ease-out infinite; }
@keyframes ir-chart-pulse { from { transform: scale(0.5); opacity: 0.35; } to { transform: scale(1.3); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ir-chart__marker::after { animation: none; } }
.ir-chart__hover-dot { background: var(--color-ink); }

.ir-chart__tooltip { position: absolute; inset-block-start: 8px; transform: translateX(12px); z-index: 2; display: flex; flex-direction: column; gap: 2px; min-inline-size: 170px; padding: 8px 10px; border-radius: var(--radius-sm); background: var(--color-ink); color: var(--color-white); font-size: 11px; line-height: 1.6; pointer-events: none; box-shadow: 0 8px 20px rgb(4 28 44 / 20%); }
.ir-chart__tooltip.is-flipped { transform: translateX(calc(-100% - 12px)); }
.ir-chart__tooltip strong { font-size: 12px; }

.ir-chart__vol-label { position: absolute; inset-inline-end: 8px; inset-block-start: calc(246 / 320 * 100%); font-size: 10px; color: var(--color-text-muted); pointer-events: none; }
.ir-chart__depth-label { position: absolute; inset-block-start: 8px; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: var(--radius-xs); background: var(--color-white); }
.ir-chart__depth-label--bid { left: 8px; color: var(--color-status-success); }
.ir-chart__depth-label--ask { right: 8px; color: var(--color-status-error); }

.ir-chart__x-axis { position: relative; block-size: 24px; margin-block-start: 6px; font-size: 11px; color: var(--color-text-muted); }
.ir-chart__x-axis span { position: absolute; transform: translateX(-50%); white-space: nowrap; }
.ir-chart__x-axis span:first-child { transform: none; }
.ir-chart__x-axis span:last-child { transform: translateX(-100%); }
</style>
