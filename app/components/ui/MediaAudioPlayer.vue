<script setup lang="ts">
import { formatDuration } from '~/utils/articlesData'

// Minimal podcast console from the `04_article_main` (dark) and
// `04_article_detail` (light) mockups: play/pause, seekable progress bar
// with elapsed/total time, playback-speed cycle and a download link.
// The mock episodes point at placeholder URLs (no real audio files exist
// yet), so playback is simulated with a timer that advances the playhead at
// the selected rate — every control really works against the mock
// duration. When the WordPress layer supplies real files, swap the timer
// for an <audio> element bound to the same state.

const props = withDefaults(defineProps<{
  durationSec: number
  tone?: 'dark' | 'light'
  narrator?: string
  downloadHref?: string
  /** Changing this (e.g. selecting another episode) resets the playhead. */
  trackKey?: string
}>(), { tone: 'dark' })

const RATES = [1, 1.25, 1.5, 2] as const
const RATE_LABELS = ['1.0x', '1.25x', '1.5x', '2.0x'] as const

const isPlaying = ref(false)
const current = ref(0)
const rateIndex = ref(0)
const barEl = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

const rate = computed(() => RATES[rateIndex.value] ?? 1)
const progress = computed(() => (props.durationSec ? Math.min(100, (current.value / props.durationSec) * 100) : 0))

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function tick() {
  current.value = Math.min(props.durationSec, current.value + 0.25 * rate.value)
  if (current.value >= props.durationSec) {
    isPlaying.value = false
    stopTimer()
  }
}

function togglePlay() {
  if (isPlaying.value) {
    isPlaying.value = false
    stopTimer()
    return
  }
  if (current.value >= props.durationSec) current.value = 0
  isPlaying.value = true
  stopTimer()
  timer = setInterval(tick, 250)
}

function cycleRate() {
  rateIndex.value = (rateIndex.value + 1) % RATES.length
}

function isRtl(el: HTMLElement) {
  return getComputedStyle(el).direction === 'rtl'
}

function seekFromPointer(event: MouseEvent) {
  const el = barEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const offset = isRtl(el) ? rect.right - event.clientX : event.clientX - rect.left
  const ratio = Math.min(1, Math.max(0, offset / rect.width))
  current.value = ratio * props.durationSec
}

function seekBy(delta: number) {
  current.value = Math.min(props.durationSec, Math.max(0, current.value + delta))
}

function onBarKey(event: KeyboardEvent) {
  const el = barEl.value
  const forwardKey = el && isRtl(el) ? 'ArrowLeft' : 'ArrowRight'
  const backKey = forwardKey === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft'
  if (event.key === forwardKey || event.key === 'ArrowUp') seekBy(10)
  else if (event.key === backKey || event.key === 'ArrowDown') seekBy(-10)
  else if (event.key === 'Home') current.value = 0
  else if (event.key === 'End') current.value = props.durationSec
  else return
  event.preventDefault()
}

watch(() => [props.trackKey, props.durationSec], () => {
  stopTimer()
  isPlaying.value = false
  current.value = 0
})

onBeforeUnmount(stopTimer)
</script>

<template>
  <div class="audio-player" :class="`audio-player--${tone}`">
    <div class="audio-player__row">
      <button
        type="button"
        class="audio-player__play"
        :aria-label="isPlaying ? 'توقف پخش' : 'پخش'"
        :aria-pressed="isPlaying"
        @click="togglePlay"
      >
        <svg v-if="!isPlaying" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
      </button>

      <div class="audio-player__track">
        <div
          ref="barEl"
          class="audio-player__bar"
          role="slider"
          tabindex="0"
          aria-label="موقعیت پخش"
          :aria-valuemin="0"
          :aria-valuemax="Math.round(durationSec)"
          :aria-valuenow="Math.round(current)"
          :aria-valuetext="`${formatDuration(current)} از ${formatDuration(durationSec)}`"
          @click="seekFromPointer"
          @keydown="onBarKey"
        >
          <div class="audio-player__fill" :style="{ inlineSize: `${progress}%` }">
            <span class="audio-player__knob" />
          </div>
        </div>
        <div class="audio-player__times">
          <span>{{ formatDuration(current) }}</span>
          <span v-if="narrator" class="audio-player__narrator">گوینده: {{ narrator }}</span>
          <span>{{ formatDuration(durationSec) }}</span>
        </div>
      </div>

      <div class="audio-player__tools">
        <button type="button" class="audio-player__tool audio-player__tool--rate" title="سرعت پخش" @click="cycleRate">
          {{ RATE_LABELS[rateIndex] }}
        </button>
        <a v-if="downloadHref" :href="downloadHref" class="audio-player__tool" title="دانلود فایل صوتی" download>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 19h14"/></svg>
        </a>
      </div>
    </div>
    <div v-if="$slots.footer" class="audio-player__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.audio-player { display: flex; flex-direction: column; gap: var(--space-1); }
.audio-player__row { display: flex; align-items: center; gap: var(--space-2); }

.audio-player__play {
  flex-shrink: 0;
  inline-size: 48px;
  block-size: 48px;
  border: none;
  border-radius: var(--radius-pill);
  background: var(--color-brand-blue);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease;
}
.audio-player__play:hover { background: var(--color-brand-blue-deep); }
.audio-player__play:active { transform: scale(0.96); }
.audio-player__play:focus-visible, .audio-player__bar:focus-visible, .audio-player__tool:focus-visible { outline: 2px solid var(--color-tint); outline-offset: 2px; }

.audio-player__track { flex: 1; min-inline-size: 0; display: flex; flex-direction: column; gap: 6px; }
.audio-player__bar { position: relative; block-size: 8px; border-radius: var(--radius-pill); cursor: pointer; }
.audio-player__fill { position: absolute; inset-block: 0; inset-inline-start: 0; border-radius: var(--radius-pill); background: var(--color-brand-blue); }
.audio-player__knob { position: absolute; inset-inline-end: -7px; inset-block-start: 50%; translate: 0 -50%; inline-size: 14px; block-size: 14px; border-radius: 50%; background: var(--color-white); border: 2px solid var(--color-brand-blue); }
.audio-player__times { display: flex; justify-content: space-between; gap: var(--space-1); font-size: 11px; font-variant-numeric: tabular-nums; }
.audio-player__narrator { opacity: 0.75; }

.audio-player__tools { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.audio-player__tool {
  min-inline-size: 36px;
  block-size: 36px;
  padding-inline: 8px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font: 700 12px/1 var(--font-en);
  cursor: pointer;
  text-decoration: none;
  transition: color 150ms ease, border-color 150ms ease, background-color 150ms ease;
}

.audio-player__footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); padding-block-start: var(--space-1); font-size: 12px; }

/* dark console (index podcast showcase) */
.audio-player--dark { background: rgb(255 255 255 / 6%); border: 1px solid rgb(255 255 255 / 12%); border-radius: var(--radius-sm); padding: var(--space-2); color: var(--color-white); }
.audio-player--dark .audio-player__bar { background: rgb(255 255 255 / 18%); }
.audio-player--dark .audio-player__times { color: rgb(255 255 255 / 70%); }
.audio-player--dark .audio-player__tool { background: var(--color-ink); border: 1px solid rgb(255 255 255 / 20%); color: var(--color-white); }
.audio-player--dark .audio-player__tool:hover { border-color: var(--color-tint); color: var(--color-tint); }
.audio-player--dark .audio-player__footer { border-block-start: 1px solid rgb(255 255 255 / 12%); color: rgb(255 255 255 / 75%); }

/* light module (article detail) */
.audio-player--light .audio-player__bar { background: var(--color-white); border: 1px solid var(--color-border); }
.audio-player--light .audio-player__times { color: var(--color-text-muted); }
.audio-player--light .audio-player__tool { background: var(--color-white); border: 1px solid var(--color-border); color: var(--color-text-muted); }
.audio-player--light .audio-player__tool:hover { color: var(--color-primary); border-color: var(--color-primary); }
.audio-player--light .audio-player__footer { border-block-start: 1px solid var(--color-border); color: var(--color-text-muted); }

@media (max-width: 520px) {
  .audio-player__row { flex-wrap: wrap; }
  .audio-player__track { order: 3; flex-basis: 100%; }
  .audio-player__tools { margin-inline-start: auto; }
}
</style>
