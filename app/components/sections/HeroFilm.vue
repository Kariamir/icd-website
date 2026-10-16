<script setup lang="ts">
/*
 * Homepage block 0 — the film, scrubbed by pointer travel.
 *
 * The clip the client supplied is 31s / 940 frames. It ships as 314 WebP
 * stills (every third frame, 1280×720, public/hero/seq) rather than as a
 * video, because the timeline is driven by the pointer and can jump anywhere:
 * a still can be drawn the instant it is asked for, where seeking a
 * compressed video cannot.
 *
 * public/hero/windows.json carries the result of tracking the six windows
 * through the closing shot — a normalised box per window per frame — so a
 * subsidiary's mark is pinned to the glass and travels with it rather than
 * being faked at a fixed position.
 *
 * The film holds the viewport until it has run; then the page releases and
 * the rest of the homepage scrolls normally beneath it.
 */
import { companies } from '~/utils/catalog'

const FRAMES = 314
/* The film occupies the first 93% of the scrub; the last 7% holds on the
   final frame so the sixth company gets its moment before the page releases. */
const FILM_END = 0.93
const SECTION_IN = 150     // «خانواده ثاخت» is full here …
const SECTION_OUT = 172    // … and gone once the first window is on screen
const VW = 1280, VH = 720
const PLATE_REF = 385      // window width in px at which a plate renders 1:1

const pad = (n: number) => String(n).padStart(3, '0')
const fa = (s: string | number) => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)

interface Track { enter: number, exit: number, centre: number, pts: Record<number, number[]> }

const root = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const plateEls = ref<HTMLElement[]>([])

const loaded = ref(0)
const ready = ref(false)
const done = ref(false)        // the film has run; the page may scroll on
const moved = ref(false)
const progress = ref(0)

/* The first six subsidiaries take the six windows the closing shot tracks.
   The rest are in the panel at the end — the footage has six windows, and
   the client has ten companies. */
const windowCompanies = computed(() => companies.slice(0, 6))

let imgs: (HTMLImageElement | undefined)[] = []
let state: Uint8Array = new Uint8Array(0)
let tracks: Track[] = []
let target = 0
let current = 0
let vw = 0, vh = 0
let lastDrawn = -1
let raf = 0
let firstWindow = 160

function fit() {
  const s = Math.max(vw / VW, vh / VH)
  const w = VW * s, h = VH * s
  return { x: (vw - w) / 2, y: (vh - h) / 2, w, h }
}

const frameAt = (p: number) => Math.min(1, p / FILM_END) * (FRAMES - 1)

function nearestReady(i: number) {
  if (state[i] === 1) return i
  for (let d = 1; d < FRAMES; d++) {
    if (state[i - d] === 1) return i - d
    if (state[i + d] === 1) return i + d
  }
  return -1
}

function draw(force = false) {
  const cv = canvas.value
  if (!cv) return
  const i = Math.max(0, Math.min(FRAMES - 1, Math.round(frameAt(current))))
  const j = nearestReady(i)
  if (j < 0) return
  if (j !== lastDrawn || force) {
    // 1:1 into a source-sized canvas; CSS `object-fit: cover` does the upscale
    // on the compositor. Scaling here instead put 60ms frames into the scrub.
    cv.getContext('2d')!.drawImage(imgs[j]!, 0, 0)
    lastDrawn = j
  }
}

function loadFrame(i: number) {
  return new Promise<void>((res) => {
    if (state[i]) return res()
    const im = new Image()
    im.decoding = 'async'
    const settle = () => { imgs[i] = im; state[i] = 1; loaded.value++; res() }
    im.onload = () => { if (im.decode) im.decode().then(settle, settle); else settle() }
    im.onerror = () => { state[i] = 2; loaded.value++; res() }
    im.src = `/hero/seq/${pad(i)}.webp`
  })
}

async function preload() {
  let cursor = 0
  const worker = async () => {
    while (cursor < FRAMES) await loadFrame(cursor++)
  }
  await Promise.all(Array.from({ length: 8 }, worker))
}

/* ---------------------------------------------------------- the scrub */

/* Pointer distance needed to run the film end to end. Seven screen widths:
   with distance rather than displacement driving it (see onPointer) four was
   too brisk — the closing shot went past before its six marks could land. */
const travel = () => Math.max(window.innerWidth, 900) * 7

function advance(d: number) {
  if (done.value && d > 0) return          // past the end the page scrolls
  target = Math.min(1, Math.max(0, target + d))
  if (d !== 0) moved.value = true
}

let lastX: number | null = null, lastY = 0

function onPointer(e: PointerEvent) {
  if (done.value) return
  if (lastX !== null) {
    // Distance travelled, not displacement. A signed drag reads well in theory
    // and fails in practice: the pointer runs out of screen, the viewer brings
    // it back, and the return trip rewinds everything the first sweep gained.
    // Any motion carries the film forward; the wheel and the arrow keys are
    // what take it back.
    const dx = e.clientX - lastX, dy = e.clientY - lastY
    advance((Math.abs(dx) + Math.abs(dy) * 0.45) / travel())
  }
  lastX = e.clientX; lastY = e.clientY
}

function onWheel(e: WheelEvent) {
  // While the film is running the wheel scrubs it instead of scrolling the
  // page. Once it has run, or when scrolling back up to it, the page wins.
  if (done.value && e.deltaY > 0) return
  if (window.scrollY > 4) return
  if (!done.value || e.deltaY < 0) {
    advance(e.deltaY / (travel() * 0.55))
    if (!done.value) e.preventDefault()
  }
}

let touchX = 0, touchY = 0
function onTouchStart(e: TouchEvent) { touchX = e.touches[0]!.clientX; touchY = e.touches[0]!.clientY }
function onTouchMove(e: TouchEvent) {
  if (done.value) return
  const dx = e.touches[0]!.clientX - touchX, dy = e.touches[0]!.clientY - touchY
  advance((-dx - dy) / (travel() * 0.5))
  touchX = e.touches[0]!.clientX; touchY = e.touches[0]!.clientY
  if (!done.value) e.preventDefault()
}

function onKey(e: KeyboardEvent) {
  if (window.scrollY > 4) return
  const step = e.shiftKey ? 0.08 : 0.02
  if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) && !done.value) { advance(step); e.preventDefault() }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { advance(-step); e.preventDefault() }
}

/* ------------------------------------------------------------- render */

function updatePlates(idx: number) {
  const f = fit()
  const i = Math.round(idx)
  plateEls.value.forEach((el, n) => {
    const t = tracks[n]
    if (!el || !t) return
    const box = t.pts[i]
    if (!box || i < t.enter || i > t.exit) { el.style.opacity = '0'; return }
    const [bx, by, bw, bh] = box as [number, number, number, number]
    const cx = bx + bw / 2
    // Opacity peaks hard at the centre of frame: two windows are on screen at
    // once through most of this shot, and a flat fade would leave both marks
    // equally loud with nothing saying which one is being presented.
    const focus = Math.max(0, 1 - Math.pow(Math.min(1, Math.abs(cx - 0.5) / 0.30), 1.6))
    const inRamp = Math.min(1, Math.max(0, (i - t.enter) / 6))
    const outRamp = t.exit >= FRAMES - 1 ? 1 : Math.min(1, Math.max(0, (t.exit - i) / 6))
    const k = Math.min(1.15, (bw * f.w) / PLATE_REF)
    el.style.transform = `translate(${f.x + cx * f.w}px, ${f.y + (by + bh / 2) * f.h}px) scale(${k})`
    el.style.opacity = String(focus * inRamp * outRamp)
  })
}

const sectionAlpha = ref(0)
const openingAlpha = ref(1)

function tick() {
  current += (target - current) * 0.12
  if (Math.abs(target - current) < 0.00018) current = target
  progress.value = current

  const idx = frameAt(current)
  draw()
  if (idx >= firstWindow - 8) updatePlates(idx)
  else plateEls.value.forEach(el => el && (el.style.opacity = '0'))

  sectionAlpha.value = idx > SECTION_IN - 22 && idx < SECTION_OUT
    ? Math.min(1, (idx - (SECTION_IN - 22)) / 14) * Math.min(1, Math.max(0, (SECTION_OUT - idx) / 10))
    : 0
  openingAlpha.value = Math.max(0, 1 - Math.max(0, (idx - 18) / 26))
  done.value = current > 0.995

  raf = requestAnimationFrame(tick)
}

function resize() {
  vw = window.innerWidth; vh = window.innerHeight
  const cv = canvas.value
  if (cv && cv.width !== VW) { cv.width = VW; cv.height = VH }
  draw(true)
}

onMounted(async () => {
  imgs = new Array(FRAMES)
  state = new Uint8Array(FRAMES)
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointer, { passive: true })
  window.addEventListener('wheel', onWheel, { passive: false })
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchmove', onTouchMove, { passive: false })
  window.addEventListener('keydown', onKey)

  const data = await $fetch<{ windows: Track[] }>('/hero/windows.json')
  tracks = data.windows.map(w => ({
    enter: w.enter, exit: w.exit, centre: w.centre,
    pts: Object.fromEntries(Object.entries(w.pts).map(([k, v]) => [Number(k), v])),
  }))
  firstWindow = Math.min(...tracks.map(t => t.enter))

  for (let i = 0; i < 16; i++) await loadFrame(i)
  draw(true)
  ready.value = true
  raf = requestAnimationFrame(tick)
  preload()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointer)
  window.removeEventListener('wheel', onWheel)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('keydown', onKey)
})

defineExpose({
  seekFrame: (i: number, instant = false) => {
    target = Math.min(1, Math.max(0, i / (FRAMES - 1) * FILM_END))
    if (instant) { current = target; moved.value = true }
  },
  get progress() { return current },
  get loaded() { return loaded.value },
})
</script>

<template>
  <section
    ref="root"
    class="relative h-[100svh] w-full overflow-hidden bg-ink"
    aria-label="فیلم معرفی هلدینگ ثاخت"
  >
    <canvas ref="canvas" class="absolute inset-0 size-full object-cover" />
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_45%,transparent_45%,rgba(4,28,44,0.5)_100%)]" />

    <!-- opening title -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-[14vh] z-20 flex flex-col items-start gap-4 px-space-lg md:px-margin"
      :style="{ opacity: openingAlpha }"
    >
      <span class="inline-flex items-center gap-2 rounded-pill border border-surface-container-lowest/25 bg-surface-container-lowest/10 px-4 py-1.5 text-label-md text-brand-tint">
        <span class="size-1.5 rounded-pill bg-brand-tint" />شرکت بین‌المللی توسعه ساختمان · نماد ثاخت
      </span>
      <h1 class="max-w-[15ch] text-headline-xl-mobile font-headline-xl leading-tight text-surface-container-lowest md:text-[76px] md:leading-[1.06]">
        ساختن، با انضباط مهندسی
      </h1>
      <p class="max-w-xl text-body-lg text-surface-dim">هلدینگ ساخت‌وساز و املاک؛ توسعه پروژه‌های نهادی از ۱۳۶۴.</p>
    </div>

    <!-- the section title, before the windows arrive -->
    <div
      class="pointer-events-none absolute bottom-[22vh] right-space-lg z-25 flex flex-col items-start gap-3 md:right-margin"
      :style="{ opacity: sectionAlpha }"
    >
      <span class="rounded-pill border border-primary-container/20 bg-surface-container-lowest/75 px-4 py-1.5 text-label-md font-label-lg text-primary-container">ساختار گروه</span>
      <h2 class="text-headline-lg font-headline-xl text-ink drop-shadow-[0_1px_18px_rgba(255,255,255,0.75)] md:text-[58px]">خانواده ثاخت</h2>
      <span class="h-0.5 rounded-pill bg-primary-container transition-[width] duration-500" :style="{ width: `${sectionAlpha * 92}px` }" />
    </div>

    <!-- one mark per tracked window -->
    <div class="pointer-events-none absolute inset-0 z-22">
      <NuxtLink
        v-for="(c, i) in windowCompanies"
        :key="c.slug"
        :ref="el => { if (el) plateEls[i] = (el as any).$el ?? el }"
        :to="`/companies/${c.slug}`"
        class="pointer-events-auto absolute left-0 top-0 size-0 origin-top-left opacity-0"
      >
        <span class="absolute left-0 top-0 flex w-[300px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-md border border-primary-container/20 bg-surface-container-lowest/80 px-5 py-4 text-center backdrop-blur-md">
          <CompanyMark :company="c" :size="70" />
          <span class="text-body-md font-label-lg leading-snug text-ink">{{ c.name }}</span>
          <span class="rounded-pill bg-brand-tint px-3 py-0.5 text-label-md font-label-lg text-primary-container">{{ c.tag }}</span>
        </span>
      </NuxtLink>
    </div>

    <!-- scrub rail -->
    <div class="absolute inset-x-space-lg bottom-6 z-35 h-0.5 overflow-hidden rounded-pill bg-surface-container-lowest/20 md:inset-x-margin">
      <div class="h-full origin-right rounded-pill bg-brand-tint" :style="{ transform: `scaleX(${Math.min(1, progress / FILM_END)})` }" />
    </div>

    <!-- prompt, then the cue onward -->
    <p
      class="absolute inset-x-0 bottom-14 z-36 flex items-center justify-center gap-3 text-label-lg text-surface-container-lowest/75 transition-opacity duration-500"
      :style="{ opacity: moved && !done ? 0 : 1 }"
    >
      <template v-if="!moved">موس را حرکت دهید</template>
      <template v-else>ادامه صفحه <AppIcon name="arrow_downward" /></template>
    </p>

    <!-- loader -->
    <div
      class="absolute inset-0 z-80 flex flex-col items-center justify-center gap-5 bg-ink transition-opacity duration-500"
      :class="ready && 'pointer-events-none opacity-0'"
    >
      <span class="flex size-14 items-center justify-center rounded-md bg-primary-container text-headline-sm font-headline-md text-surface-container-lowest">ث</span>
      <span class="h-0.5 w-[min(300px,62vw)] overflow-hidden rounded-pill bg-surface-container-lowest/15">
        <span class="block h-full origin-right rounded-pill bg-brand-tint transition-transform duration-200" :style="{ transform: `scaleX(${loaded / FRAMES})` }" />
      </span>
      <span class="num text-label-md tracking-widest text-surface-container-lowest/60">{{ fa(Math.round(loaded / FRAMES * 100)) }}٪</span>
    </div>
  </section>
</template>
