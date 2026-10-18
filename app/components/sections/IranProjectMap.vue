<!--
  The interactive map on /projects/map.

  WHY NOT GOOGLE MAPS. A tile service is the obvious answer and the wrong one
  here: Google Maps and Mapbox are both unreachable from inside Iran, both
  need an API key and a billing account, and both would put this page's
  primary visual on a third-party request that fails for exactly the audience
  the site is for. This draws from `app/utils/iranMap.ts` — thirty-one
  province outlines and the surrounding countries, projected at build time —
  and makes no network request at all.

  It pans, it zooms (wheel, drag, buttons, double-click, keyboard), markers
  group when they sit on the same spot, and every marker is a real button, so
  the whole thing is reachable from the keyboard and reads to a screen reader
  as the list it also is.
-->
<script setup lang="ts">
import { MAP, NEIGHBOURS, PROVINCES, project } from '~/utils/iranMap'
import { STATUS } from '~/utils/projectsData'
import { faDigits } from '~/utils/format'
import type { ProjectStatusKey } from '~/utils/catalog'

export interface MapProject {
  slug: string
  name: string
  city: string
  status: ProjectStatusKey
  coords: { lon: number, lat: number }
}

const props = withDefaults(defineProps<{
  projects: MapProject[]
  activeSlug?: string | null
}>(), { activeSlug: null })

const emit = defineEmits<{ select: [slug: string] }>()

/* ------------------------------------------------------------------ pins */
/*
 * Projects sharing one point become one pin. Four of the ten are on Kish at
 * the same beach, and four markers stacked on one pixel is worse than one
 * marker that says «۴» and opens the four.
 */
interface Pin {
  id: string
  x: number
  y: number
  items: MapProject[]
}

const pins = computed<Pin[]>(() => {
  const by = new Map<string, Pin>()
  for (const p of props.projects) {
    const { x, y } = project(p.coords.lon, p.coords.lat)
    const id = `${x.toFixed(1)}:${y.toFixed(1)}`
    const found = by.get(id)
    if (found) found.items.push(p)
    else by.set(id, { id, x, y, items: [p] })
  }
  return [...by.values()].sort((a, b) => a.y - b.y)
})

const activePin = computed(() =>
  pins.value.find(pin => pin.items.some(p => p.slug === props.activeSlug)) ?? null)

/* ------------------------------------------------------- pan and zoom */
const MIN_Z = 1
const MAX_Z = 7

const zoom = ref(1)
const panX = ref(0)
const panY = ref(0)
const svgEl = ref<SVGSVGElement | null>(null)

/** The visible window in the SVG's own user units. */
const view = computed(() => {
  const w = MAP.width / zoom.value
  const h = MAP.height / zoom.value
  return { w, h, x: panX.value, y: panY.value }
})

const viewBox = computed(() => {
  const v = view.value
  return `${v.x.toFixed(1)} ${v.y.toFixed(1)} ${v.w.toFixed(1)} ${v.h.toFixed(1)}`
})

/** Keep the window inside the map however the user pushes it. */
function clamp() {
  const w = MAP.width / zoom.value
  const h = MAP.height / zoom.value
  panX.value = Math.min(MAP.width - w, Math.max(0, panX.value))
  panY.value = Math.min(MAP.height - h, Math.max(0, panY.value))
}

/** Zoom about a point given in user units, so the cursor stays put. */
function zoomAt(factor: number, ux: number, uy: number) {
  const next = Math.min(MAX_Z, Math.max(MIN_Z, zoom.value * factor))
  if (next === zoom.value) return
  const k = zoom.value / next
  panX.value = ux - (ux - panX.value) * k
  panY.value = uy - (uy - panY.value) * k
  zoom.value = next
  clamp()
}

/** Client pixels → the SVG's user units, honouring the current window. */
function toUser(clientX: number, clientY: number) {
  const el = svgEl.value
  if (!el) return { x: 0, y: 0 }
  const r = el.getBoundingClientRect()
  const v = view.value
  // the SVG uses preserveAspectRatio="xMidYMid meet": work out the letterbox
  const scale = Math.min(r.width / v.w, r.height / v.h)
  const offX = (r.width - v.w * scale) / 2
  const offY = (r.height - v.h * scale) / 2
  return {
    x: v.x + (clientX - r.left - offX) / scale,
    y: v.y + (clientY - r.top - offY) / scale,
  }
}

function onWheel(e: WheelEvent) {
  e.preventDefault()
  const u = toUser(e.clientX, e.clientY)
  zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, u.x, u.y)
}

function onDoubleClick(e: MouseEvent) {
  const u = toUser(e.clientX, e.clientY)
  zoomAt(1.8, u.x, u.y)
}

/* drag to pan */
const dragging = ref(false)
let last: { x: number, y: number } | null = null
let moved = false

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0) return
  dragging.value = true
  moved = false
  last = { x: e.clientX, y: e.clientY }
  ;(e.currentTarget as Element).setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value || !last) return
  const el = svgEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const v = view.value
  const scale = Math.min(r.width / v.w, r.height / v.h)
  const dx = (e.clientX - last.x) / scale
  const dy = (e.clientY - last.y) / scale
  if (Math.abs(e.clientX - last.x) + Math.abs(e.clientY - last.y) > 3) moved = true
  panX.value -= dx
  panY.value -= dy
  last = { x: e.clientX, y: e.clientY }
  clamp()
}

function onPointerUp(e: PointerEvent) {
  dragging.value = false
  last = null
  ;(e.currentTarget as Element).releasePointerCapture?.(e.pointerId)
}

function step(dx: number, dy: number) {
  const v = view.value
  panX.value += dx * v.w * 0.18
  panY.value += dy * v.h * 0.18
  clamp()
}

function onKey(e: KeyboardEvent) {
  const moves: Record<string, [number, number]> = {
    ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1],
  }
  const m = moves[e.key]
  if (m) { step(m[0], m[1]); e.preventDefault(); return }
  if (e.key === '+' || e.key === '=') { zoomAt(1.3, panX.value + view.value.w / 2, panY.value + view.value.h / 2); e.preventDefault() }
  if (e.key === '-' || e.key === '_') { zoomAt(1 / 1.3, panX.value + view.value.w / 2, panY.value + view.value.h / 2); e.preventDefault() }
}

function zoomCentre(factor: number) {
  zoomAt(factor, panX.value + view.value.w / 2, panY.value + view.value.h / 2)
}

function reset() {
  zoom.value = 1
  panX.value = 0
  panY.value = 0
}

/** Centre the map on one pin and move in — used when a card is chosen. */
function focusPin(pin: Pin, z = 4) {
  zoom.value = Math.min(MAX_Z, Math.max(zoom.value, z))
  panX.value = pin.x - MAP.width / zoom.value / 2
  panY.value = pin.y - MAP.height / zoom.value / 2
  clamp()
}

watch(() => props.activeSlug, (slug) => {
  if (!slug) return
  const pin = pins.value.find(p => p.items.some(i => i.slug === slug))
  if (pin && zoom.value > 1.2) focusPin(pin, zoom.value)
})

defineExpose({ focusSlug: (slug: string) => {
  const pin = pins.value.find(p => p.items.some(i => i.slug === slug))
  if (pin) focusPin(pin)
} })

/*
 * Pins keep their size on screen as the map zooms, the way a real map's
 * markers do — the SVG scales everything else, so these divide it back out.
 */
const pinScale = computed(() => 1 / zoom.value)

const statusColour: Record<ProjectStatusKey, string> = {
  'upcoming': 'var(--color-text-muted)',
  'under-construction': 'var(--color-primary)',
  'operating': 'var(--color-status-success)',
  'completed': 'var(--color-ink)',
}

function pinLabel(pin: Pin) {
  return pin.items.length === 1
    ? `${pin.items[0]!.name} — ${pin.items[0]!.city}`
    : `${faDigits(pin.items.length)} پروژه در ${pin.items[0]!.city}`
}

function onPinClick(pin: Pin) {
  if (moved) return // a drag that ended on a pin is not a click
  emit('select', pin.items[0]!.slug)
  focusPin(pin)
}
</script>

<template>
  <div class="iran-map" :class="{ 'is-dragging': dragging }">
    <svg
      ref="svgEl"
      class="iran-map__svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      tabindex="0"
      aria-label="نقشه پروژه‌های هلدینگ ثاخت در ایران — با کلیدهای جهت جابه‌جا و با + و − بزرگ‌نمایی کنید"
      @wheel="onWheel"
      @dblclick="onDoubleClick"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @keydown="onKey"
    >
      <!-- the sea, and the countries around Iran, as context only -->
      <rect :x="0" :y="0" :width="MAP.width" :height="MAP.height" fill="var(--map-sea)" />
      <path :d="NEIGHBOURS" fill="var(--map-neighbour)" stroke="var(--map-neighbour-line)" stroke-width="1" vector-effect="non-scaling-stroke" />

      <!-- Iran, province by province -->
      <g class="iran-map__provinces">
        <path
          v-for="pr in PROVINCES"
          :key="pr.id"
          :d="pr.d"
          :aria-label="pr.name"
        >
          <title>{{ pr.name }}</title>
        </path>
      </g>

      <!-- the pins -->
      <g
        v-for="pin in pins"
        :key="pin.id"
        :transform="`translate(${pin.x} ${pin.y}) scale(${pinScale})`"
        class="iran-map__pin"
        :class="{ 'is-active': activePin?.id === pin.id }"
      >
        <circle class="iran-map__halo" r="26" :fill="statusColour[pin.items[0]!.status]" />
        <!-- the teardrop, drawn around its own point -->
        <path
          class="iran-map__drop"
          d="M0 0c-7.2-9.6-11-15.2-11-20.4A11 11 0 0 1 11-20.4C11-15.2 7.2-9.6 0 0Z"
          :fill="statusColour[pin.items[0]!.status]"
        />
        <circle v-if="pin.items.length === 1" cx="0" cy="-20.4" r="4.6" fill="#fff" />
        <text
          v-else
          x="0" y="-16.8"
          class="iran-map__count"
          fill="#fff"
        >{{ faDigits(pin.items.length) }}</text>
        <!-- the hit target: generous, and a real button -->
        <circle
          class="iran-map__hit"
          cx="0" cy="-16" r="20"
          role="button"
          tabindex="0"
          :aria-label="pinLabel(pin)"
          @click="onPinClick(pin)"
          @keydown.enter.prevent="emit('select', pin.items[0]!.slug)"
          @keydown.space.prevent="emit('select', pin.items[0]!.slug)"
          @mouseenter="emit('select', pin.items[0]!.slug)"
        >
          <title>{{ pinLabel(pin) }}</title>
        </circle>
      </g>
    </svg>

    <!-- controls -->
    <div class="iran-map__controls">
      <button type="button" aria-label="بزرگ‌نمایی" @click="zoomCentre(1.4)">+</button>
      <button type="button" aria-label="کوچک‌نمایی" @click="zoomCentre(1 / 1.4)">−</button>
      <button type="button" aria-label="بازنشانی نما" :disabled="zoom === 1 && panX === 0 && panY === 0" @click="reset">
        <AppIcon name="my_location" />
      </button>
    </div>

    <!-- legend -->
    <ul class="iran-map__legend">
      <li v-for="(s, key) in STATUS" :key="key">
        <span :style="{ background: statusColour[key as ProjectStatusKey] }" />{{ s.label }}
      </li>
    </ul>

    <p class="iran-map__note">
      موقعیت‌ها در سطح شهر است؛ برای بزرگ‌نمایی از غلتک یا دکمه‌ها استفاده کنید.
    </p>
  </div>
</template>

<style scoped>
.iran-map {
  --map-sea: #e8eff7;
  --map-neighbour: #dde5ee;
  --map-neighbour-line: #ccd6e2;
  --map-land: #f7fafd;
  --map-land-line: #a9bed4;

  position: relative;
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 420px;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--map-sea);
}

.iran-map__svg {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  cursor: grab;
  touch-action: none;
}

.iran-map.is-dragging .iran-map__svg { cursor: grabbing; }

.iran-map__svg:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: -3px;
}

.iran-map__provinces path {
  fill: var(--map-land);
  stroke: var(--map-land-line);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  transition: fill 160ms ease;
}

.iran-map__provinces path:hover {
  fill: color-mix(in srgb, var(--color-tint) 45%, var(--map-land));
}

/* --- pins ---------------------------------------------------------------- */
.iran-map__pin { transition: opacity 200ms ease; }

.iran-map__drop {
  stroke: #fff;
  stroke-width: 2.5;
  filter: drop-shadow(0 3px 5px rgb(4 28 44 / 35%));
}

.iran-map__count {
  font-size: 13px;
  font-weight: 800;
  text-anchor: middle;
  pointer-events: none;
}

.iran-map__hit {
  fill: transparent;
  cursor: pointer;
}

.iran-map__hit:focus-visible {
  fill: color-mix(in srgb, var(--color-primary) 18%, transparent);
  outline: none;
}

.iran-map__halo {
  opacity: 0;
  transform-origin: 0 -16px;
}

.iran-map__pin.is-active .iran-map__halo {
  opacity: 0.18;
  animation: iran-map-pulse 2s ease-out infinite;
}

.iran-map__pin.is-active .iran-map__drop {
  stroke-width: 3.5;
}

@keyframes iran-map-pulse {
  0% { transform: scale(0.55); opacity: 0.3; }
  100% { transform: scale(1.25); opacity: 0; }
}

/* --- chrome -------------------------------------------------------------- */
.iran-map__controls {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-end: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 1px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: 0 6px 18px -8px rgb(4 28 44 / 35%);
}

.iran-map__controls button {
  inline-size: 38px;
  block-size: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.iran-map__controls button:hover:not(:disabled) { background: var(--color-tint); color: var(--color-primary); }
.iran-map__controls button:disabled { color: var(--color-border); cursor: default; }

.iran-map__legend {
  position: absolute;
  inset-block-end: var(--space-2);
  inset-inline-start: var(--space-2);
  display: flex;
  flex-wrap: wrap;
  gap: 4px var(--space-2);
  margin: 0;
  padding: 8px 12px;
  list-style: none;
  border-radius: var(--radius-sm);
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 6px 18px -10px rgb(4 28 44 / 35%);
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text);
}

.iran-map__legend li { display: flex; align-items: center; gap: 6px; }

.iran-map__legend span {
  inline-size: 9px;
  block-size: 9px;
  border-radius: 50%;
}

.iran-map__note {
  position: absolute;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-2);
  margin: 0;
  padding: 6px 10px;
  border-radius: var(--radius-xs);
  background: rgb(255 255 255 / 85%);
  font-size: 11px;
  color: var(--color-text-muted);
  max-inline-size: 15rem;
}

@media (max-width: 640px) {
  .iran-map__note { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .iran-map__pin.is-active .iran-map__halo { animation: none; opacity: 0.22; }
  .iran-map__provinces path { transition: none; }
}
</style>
