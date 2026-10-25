<script setup lang="ts">
/*
 * Homepage block 0 — the film, scrubbed by pointer travel.
 *
 * The clip is «فیلم شماره ۱» as the client supplied it (ADR-024): 26.4s,
 * 1920×1080 at 20fps, a continuous aerial-to-interior move that ends on the
 * group's end-card. It ships as 240 WebP stills (1280×720, public/hero/seq)
 * rather than as a video, because the timeline is driven by the pointer and
 * can jump anywhere: a still can be drawn the instant it is asked for, where
 * seeking a compressed video cannot.
 *
 * WHAT CHANGED FROM THE PREVIOUS FILM. The old clip ended on a wall of
 * windows, and the site tracked six of them so a subsidiary's mark could be
 * pinned to the glass (public/hero/windows.json). This film carries its own
 * ending instead — the room dims, the parent lockup fades up on the
 * conference screen, the nine subsidiary marks fade up beneath it, and
 * everything fades out onto a clean lit screen. So the tracking is retired,
 * and the hero carries no group heading of its own: «شرکت‌های تابعه در یک
 * زنجیره» further down the page is where the companies are named and
 * opened (owner's instruction, ADR-025).
 *
 * The screen then plays «فیلم شماره ۲», projected into the rectangle the
 * ending deliberately leaves empty.
 */

const FRAMES = 240
/* The film occupies the first 95% of the scrub; the last 5% holds on the
   clean lit screen, which is where «فیلم شماره ۲» comes up. */
const FILM_END = 0.95
const VW = 1280, VH = 720

/*
 * The projection screen in the closing frames, measured off the footage
 * itself rather than eyeballed: the bright rectangle is x 383–991, y 115–444
 * in the 1280×720 stills, and it is axis-aligned to the pixel — the camera
 * settles square-on — so «فیلم شماره ۲» needs no corner-pinning, only the
 * same object-cover mapping the canvas uses.
 */
const SCREEN = { x: 383 / VW, y: 115 / VH, w: 608 / VW, h: 329 / VH }
/* The end-card is clear by here, so the screen is free. */
const SCREEN_IN = 226

const pad = (n: number) => String(n).padStart(3, '0')
const fa = (s: string | number) => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)

const root = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const screenVideo = ref<HTMLVideoElement>()

const loaded = ref(0)
const ready = ref(false)
const done = ref(false)        // the film has run; the page may scroll on

/*
 * The header goes glass while the film is under it (see useHeroChrome.ts).
 * Tracked with an observer on the hero itself rather than a scroll handler:
 * the film already owns one rAF loop and a scroll listener would be a second
 * thing reading layout on a page that is repainting a canvas every frame.
 *
 * The -81px top margin is the header's own height plus its border, so the
 * flag drops the moment the hero's bottom edge passes under the bar.
 */
const overFilm = useOverFilm()
let chromeObserver: IntersectionObserver | null = null
const moved = ref(false)
const progress = ref(0)

let imgs: (HTMLImageElement | undefined)[] = []
let state: Uint8Array = new Uint8Array(0)
let target = 0
let current = 0
let vw = 0, vh = 0
let lastDrawn = -1
let raf = 0

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

/*
 * Where the conference screen is on the page right now. The canvas is drawn
 * 1:1 and upscaled by CSS `object-fit: cover`, so the same fit() the film
 * uses maps the measured rectangle onto the viewport — the video sits exactly
 * where the projection is, at any window size.
 */
const screenBox = ref({ left: 0, top: 0, width: 0, height: 0 })

function placeScreen() {
  const f = fit()
  screenBox.value = {
    left: f.x + SCREEN.x * f.w,
    top: f.y + SCREEN.y * f.h,
    width: SCREEN.w * f.w,
    height: SCREEN.h * f.h,
  }
}

const openingAlpha = ref(1)
const screenAlpha = ref(0)
const screenMuted = ref(true)
const screenArmed = ref(false)

/*
 * The second film is only fetched once the viewer has actually scrubbed to
 * the end of the first — `preload="none"` plus this gate, so a visitor who
 * never reaches the ending never downloads 18MB for it. Autoplay is muted
 * because no browser will start a sound-on video unprompted; the control
 * beneath the screen turns the sound on.
 */
function toggleScreenSound() {
  const v = screenVideo.value
  if (!v) return
  screenMuted.value = !screenMuted.value
  v.muted = screenMuted.value
  if (!v.muted) v.play().catch(() => {})
}

function startScreenFilm() {
  if (screenArmed.value) return
  screenArmed.value = true
  const v = screenVideo.value
  if (!v) return
  if (!v.src) {
    // VP9 where it is supported, H.264 everywhere else. Assigned rather than
    // declared as <source> elements so nothing is fetched until this runs.
    v.src = v.canPlayType('video/webm; codecs="vp9"')
      ? '/video/icd-story.webm'
      : '/video/icd-story.mp4'
    // `preload="none"` means assigning src is not enough on its own —
    // without this the element keeps showing the poster and never decodes.
    v.load()
  }
  v.play().catch(() => { /* a browser that refuses autoplay leaves the poster */ })
}

function tick() {
  current += (target - current) * 0.12
  if (Math.abs(target - current) < 0.00018) current = target
  progress.value = current

  const idx = frameAt(current)
  draw()

  openingAlpha.value = Math.max(0, 1 - Math.max(0, (idx - 14) / 20))

  // «فیلم شماره ۲» comes up on the screen once the end-card has cleared it.
  screenAlpha.value = Math.min(1, Math.max(0, (idx - SCREEN_IN) / 8))
  if (screenAlpha.value > 0.05) startScreenFilm()

  done.value = current > 0.995

  raf = requestAnimationFrame(tick)
}

function resize() {
  /*
   * Measure the CANVAS, not the window. The hero is deliberately 5rem taller
   * than the viewport so the film runs under the header, so object-cover is
   * computed against 100svh + 80px — reading window.innerHeight here put the
   * projected screen about eighty pixels and six percent of scale off.
   */
  const el = canvas.value
  vw = el?.clientWidth || window.innerWidth
  vh = el?.clientHeight || window.innerHeight
  const cv = canvas.value
  if (cv && cv.width !== VW) { cv.width = VW; cv.height = VH }
  placeScreen()
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

  if (typeof IntersectionObserver !== 'undefined' && root.value) {
    chromeObserver = new IntersectionObserver(
      ([entry]) => {
        overFilm.value = !!entry?.isIntersecting
        // Nothing should keep playing off-screen while the page scrolls on.
        if (!entry?.isIntersecting) screenVideo.value?.pause()
        else if (screenArmed.value) screenVideo.value?.play().catch(() => {})
      },
      { rootMargin: '-81px 0px 0px 0px', threshold: 0 },
    )
    chromeObserver.observe(root.value)
  }
  else {
    overFilm.value = true
  }

  for (let i = 0; i < 16; i++) await loadFrame(i)
  draw(true)
  ready.value = true
  raf = requestAnimationFrame(tick)
  preload()
})

onBeforeUnmount(() => {
  // Leave the header solid behind us — every other route expects it.
  chromeObserver?.disconnect()
  overFilm.value = false
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
  <!--
    The film runs *under* the header, not below it: the negative top margin
    pulls the section up by the header's own 5rem, and the height gains the
    same amount back so it still fills the viewport exactly. The header floats
    over it as glass (see useHeroChrome.ts) — without this the bar would push
    the footage down and there would be nothing behind the glass to see.
  -->
  <section
    ref="root"
    class="relative -mt-20 h-[calc(100svh+5rem)] w-full overflow-hidden bg-ink"
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
        ما ثاختیم
      </h1>
      <p class="max-w-xl text-body-lg text-surface-dim">هلدینگ ساخت‌وساز و املاک؛ توسعه پروژه‌های نهادی از ۱۳۶۴.</p>
    </div>

    <!--
      «فیلم شماره ۲», projected into the screen the ending clears. Positioned
      from the measured rectangle, so it lands on the projection at any
      window size rather than floating in front of it.
    -->
    <div
      class="pointer-events-none absolute z-24"
      :style="{
        left: `${screenBox.left}px`,
        top: `${screenBox.top}px`,
        width: `${screenBox.width}px`,
        height: `${screenBox.height}px`,
        opacity: screenAlpha,
      }"
    >
      <video
        ref="screenVideo"
        class="size-full bg-ink object-cover"
        muted
        playsinline
        loop
        preload="none"
        poster="/video/icd-story-poster.jpg"
        aria-label="فیلم معرفی شرکت بین‌المللی توسعه ساختمان"
      />
      <button
        v-if="screenAlpha > 0.9"
        type="button"
        class="pointer-events-auto absolute -bottom-12 left-1/2 inline-flex h-9 -translate-x-1/2 items-center gap-1.5 rounded-pill border border-surface-container-lowest/30 bg-ink/70 px-4 text-label-md text-surface-container-lowest backdrop-blur"
        @click="toggleScreenSound"
      >
        <AppIcon :name="screenMuted ? 'headset_mic' : 'play_circle'" />{{ screenMuted ? 'پخش صدا' : 'قطع صدا' }}
      </button>
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
      <!--
        The company's own mark is the loading indicator (owner's request,
        ADR-024). It sits on a white plate because the lockup is navy and
        red with no light variant — on ink it would disappear.
      -->
      <span class="loader-mark flex items-center justify-center rounded-md bg-surface-container-lowest px-6 py-4">
        <img src="/img/brand/icd-logo.png" alt="در حال بارگذاری — هلدینگ ساختمانی ثاخت" class="h-10 w-auto md:h-12">
      </span>
      <span class="h-0.5 w-[min(300px,62vw)] overflow-hidden rounded-pill bg-surface-container-lowest/15">
        <span class="block h-full origin-right rounded-pill bg-brand-tint transition-transform duration-200" :style="{ transform: `scaleX(${loaded / FRAMES})` }" />
      </span>
      <span class="num text-label-md tracking-widest text-surface-container-lowest/60">{{ fa(Math.round(loaded / FRAMES * 100)) }}٪</span>
    </div>
  </section>
</template>

<style scoped>
/*
 * The mark breathes rather than spins: a rotating corporate logo reads as a
 * gimmick, and this one is a wordmark that would be unreadable turning.
 * Reduced motion removes the animation rather than shortening it.
 */
.loader-mark {
  animation: loader-breathe 1.8s ease-in-out infinite;
  box-shadow: 0 18px 48px -24px rgb(0 94 184 / 70%);
}

@keyframes loader-breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.72; transform: scale(0.965); }
}

@media (prefers-reduced-motion: reduce) {
  .loader-mark { animation: none; }
}
</style>
