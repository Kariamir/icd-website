<script setup lang="ts">
// Dual-thumb range slider for the `02a-index-card-grid` filter panel (the
// mockup's «محدوده زیربنا» / «تعداد طبقات» sliders), built from two native
// range inputs so it stays keyboard- and screen-reader-operable.
const props = withDefaults(defineProps<{
  label: string
  min: number
  max: number
  step?: number
  unit?: string
  minLabel?: string
  maxLabel?: string
}>(), { step: 1, unit: '', minLabel: undefined, maxLabel: undefined })

const low = defineModel<number>('low', { required: true })
const high = defineModel<number>('high', { required: true })

const fa = (n: number) => n.toLocaleString('fa-IR')
const pct = (n: number) => ((n - props.min) / (props.max - props.min)) * 100

function onLow(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  low.value = Math.min(v, high.value)
  ;(e.target as HTMLInputElement).value = String(low.value)
}
function onHigh(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  high.value = Math.max(v, low.value)
  ;(e.target as HTMLInputElement).value = String(high.value)
}
</script>

<template>
  <div class="index-range" role="group" :aria-label="label">
    <div class="index-range__head">
      <span>{{ label }}</span>
      <strong>{{ fa(low) }} – {{ fa(high) }}<template v-if="unit"> {{ unit }}</template></strong>
    </div>
    <div class="index-range__track-wrap">
      <div class="index-range__track">
        <div class="index-range__fill" :style="{ insetInlineStart: `${pct(low)}%`, insetInlineEnd: `${100 - pct(high)}%` }" />
      </div>
      <input
        type="range"
        class="index-range__input"
        :min="min"
        :max="max"
        :step="step"
        :value="low"
        :aria-label="`${label} — حداقل`"
        @input="onLow"
      >
      <input
        type="range"
        class="index-range__input"
        :min="min"
        :max="max"
        :step="step"
        :value="high"
        :aria-label="`${label} — حداکثر`"
        @input="onHigh"
      >
    </div>
    <div class="index-range__ends">
      <span>{{ minLabel ?? fa(min) }}</span>
      <span>{{ maxLabel ?? fa(max) }}</span>
    </div>
  </div>
</template>

<style scoped>
.index-range { display: flex; flex-direction: column; gap: 6px; }
.index-range__head { display: flex; justify-content: space-between; align-items: center; gap: var(--space-1); font: var(--text-label); font-size: 12px; color: var(--color-text-muted); }
.index-range__head strong { color: var(--color-text); font-size: 13px; }
.index-range__track-wrap { position: relative; block-size: 28px; }
.index-range__track {
  position: absolute;
  inset-inline: 0;
  inset-block-start: 50%;
  block-size: 6px;
  transform: translateY(-50%);
  background: var(--color-surface-alt);
  border-radius: var(--radius-pill);
}
.index-range__fill { position: absolute; inset-block: 0; background: var(--color-primary); border-radius: var(--radius-pill); }
.index-range__input {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  margin: 0;
  background: none;
  appearance: none;
  pointer-events: none;
}
.index-range__input::-webkit-slider-runnable-track { background: none; border: none; }
.index-range__input::-moz-range-track { background: none; border: none; }
.index-range__input::-webkit-slider-thumb {
  appearance: none;
  pointer-events: auto;
  inline-size: 18px;
  block-size: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 3px solid var(--color-white);
  box-shadow: 0 1px 4px rgb(4 28 44 / 30%);
  cursor: pointer;
}
.index-range__input::-moz-range-thumb {
  pointer-events: auto;
  inline-size: 14px;
  block-size: 14px;
  border-radius: 50%;
  background: var(--color-primary);
  border: 3px solid var(--color-white);
  box-shadow: 0 1px 4px rgb(4 28 44 / 30%);
  cursor: pointer;
}
.index-range__input:focus-visible { outline: none; }
.index-range__input:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 4px var(--color-tint); }
.index-range__ends { display: flex; justify-content: space-between; font: var(--text-body-sm); font-size: 12px; color: var(--color-text-muted); }
</style>
