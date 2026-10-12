<script setup lang="ts">
/*
 * Short lead form used on unit pages, the home page and the contact page.
 *
 * Validates in the browser (name, Iranian mobile number) and shows a
 * confirmation with a reference number. There is no backend yet (ADR-002):
 * submission is simulated, and the place to wire the CRM call is marked.
 */
import { faDigits } from '~/utils/format'

const props = withDefaults(defineProps<{
  subject?: string
  timeOptions?: string[]
  submitLabel?: string
  tone?: 'light' | 'dark'
}>(), {
  subject: 'درخواست مشاوره',
  timeOptions: () => ['صبح (۹ تا ۱۳)', 'عصر (۱۴ تا ۱۸)', 'پنجشنبه (۱۰ تا ۱۴)'],
  submitLabel: 'ثبت درخواست',
  tone: 'light',
})

const name = ref('')
const phone = ref('')
const time = ref(props.timeOptions[0] ?? '')
const errors = reactive<{ name?: string, phone?: string }>({})
const sending = ref(false)
const ref_ = ref<string | null>(null)

function normalise(v: string) {
  return v.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/\D/g, '')
}

async function submit() {
  errors.name = name.value.trim().length < 3 ? 'نام و نام خانوادگی را وارد کنید.' : undefined
  errors.phone = /^09\d{9}$/.test(normalise(phone.value)) ? undefined : 'شماره همراه ۱۱ رقمی با ۰۹ شروع می‌شود.'
  if (errors.name || errors.phone) return
  sending.value = true
  // TODO(backend): POST to the CRM endpoint once it exists (ADR-002).
  await new Promise(r => setTimeout(r, 600))
  sending.value = false
  ref_.value = faDigits(String(Date.now()).slice(-6))
  name.value = ''
  phone.value = ''
}

const field = computed(() => props.tone === 'dark'
  ? 'border-surface-container-lowest/25 bg-surface-container-lowest/10 text-surface-container-lowest placeholder:text-surface-dim focus:border-brand-tint'
  : 'border-border bg-surface-container-lowest text-ink focus:border-primary-container')
const label = computed(() => props.tone === 'dark' ? 'text-surface-container-lowest' : 'text-ink')
</script>

<template>
  <div>
    <div v-if="ref_" class="flex items-start gap-3 rounded-md border border-status-success/30 bg-status-success/10 p-5" role="status">
      <AppIcon name="check_circle" class="mt-0.5 text-status-success" />
      <div>
        <p class="font-bold" :class="label">درخواست شما ثبت شد.</p>
        <p class="text-body-sm" :class="tone === 'dark' ? 'text-surface-dim' : 'text-secondary'">کد پیگیری: {{ ref_ }} — کارشناسان ما به‌زودی تماس می‌گیرند.</p>
        <button type="button" class="mt-2 text-label-md text-primary-container underline" :class="tone === 'dark' && 'text-brand-tint'" @click="ref_ = null">ثبت درخواست دیگر</button>
      </div>
    </div>
    <form v-else class="grid grid-cols-1 gap-5 md:grid-cols-3" novalidate @submit.prevent="submit">
      <input type="hidden" name="subject" :value="subject">
      <div>
        <label :for="`lf-name-${subject}`" class="mb-2 block text-label-md font-semibold" :class="label">نام و نام خانوادگی</label>
        <input :id="`lf-name-${subject}`" v-model="name" type="text" autocomplete="name" placeholder="مثال: علی رضایی" class="h-12 w-full rounded-xs border px-4 text-body-md focus:outline-none" :class="field" :aria-invalid="!!errors.name">
        <p v-if="errors.name" class="mt-1.5 text-label-md text-status-error">{{ errors.name }}</p>
      </div>
      <div>
        <label :for="`lf-phone-${subject}`" class="mb-2 block text-label-md font-semibold" :class="label">شماره همراه</label>
        <input :id="`lf-phone-${subject}`" v-model="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="0912 000 0000" class="h-12 w-full rounded-xs border px-4 text-right text-body-md focus:outline-none" :class="field" :aria-invalid="!!errors.phone">
        <p v-if="errors.phone" class="mt-1.5 text-label-md text-status-error">{{ errors.phone }}</p>
      </div>
      <div>
        <label :for="`lf-time-${subject}`" class="mb-2 block text-label-md font-semibold" :class="label">زمان تماس</label>
        <select :id="`lf-time-${subject}`" v-model="time" class="h-12 w-full rounded-xs border px-3 text-body-md focus:outline-none" :class="field">
          <option v-for="o in timeOptions" :key="o" :value="o" class="text-ink">{{ o }}</option>
        </select>
      </div>
      <div class="flex justify-end md:col-span-3">
        <button type="submit" :disabled="sending" class="inline-flex h-12 items-center gap-2 rounded-pill bg-primary-container px-8 text-label-lg font-label-lg text-on-primary transition-colors hover:bg-brand-hover disabled:opacity-60">
          {{ sending ? 'در حال ارسال…' : submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>
