<script setup lang="ts">
/*
 * Sign-in — ported from the approved canvas artboard `Login.dc.html`.
 *
 * Two steps, phone then one-time code, because that is how Iranian property
 * buyers actually sign in: no password to forget, and the phone number is
 * already the record the sales team holds. The canvas drove the step with a
 * `data-props` enum so both states could be reviewed; here it is real state.
 *
 * There is no auth backend yet (ADR-002). `request` and `verify` are the two
 * seams a backend plugs into — they are deliberately the only places that know
 * anything about transport, and both currently resolve locally so the screen
 * can be walked end to end in development.
 */
import { accountUser } from '~/utils/account'

const step = ref<'phone' | 'code'>('phone')
const phone = ref('')
const code = ref('')
const pending = ref(false)
const error = ref('')

/** Seconds until the code can be re-sent; the design shows ۰۱:۴۸ on arrival. */
const RESEND_SECONDS = 108
const remaining = ref(RESEND_SECONDS)
let ticker: ReturnType<typeof setInterval> | undefined

/** ۰۹ followed by nine digits, in either Persian or Latin numerals. */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
function toLatin(value: string) {
  return value.replace(/[۰-۹]/g, d => String(FA_DIGITS.indexOf(d)))
}
function toPersian(value: string) {
  return value.replace(/\d/g, d => FA_DIGITS[Number(d)] as string)
}

const normalisedPhone = computed(() => toLatin(phone.value).replace(/\D/g, ''))
const phoneIsValid = computed(() => /^09\d{9}$/.test(normalisedPhone.value))
const codeIsValid = computed(() => toLatin(code.value).replace(/\D/g, '').length === 5)

/** The number echoed back on the code step, grouped as the design shows it. */
const maskedPhone = computed(() => {
  const n = normalisedPhone.value
  if (n.length !== 11) return accountUser.phone
  return toPersian(`${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`)
})

const resendLabel = computed(() => {
  const m = Math.floor(remaining.value / 60)
  const s = remaining.value % 60
  return toPersian(`${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`)
})

function startTicker() {
  remaining.value = RESEND_SECONDS
  clearInterval(ticker)
  ticker = setInterval(() => {
    if (remaining.value > 0) remaining.value -= 1
    else clearInterval(ticker)
  }, 1000)
}

onUnmounted(() => clearInterval(ticker))

async function request() {
  error.value = ''
  if (!phoneIsValid.value) {
    error.value = 'شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد.'
    return
  }
  pending.value = true
  // Seam: POST the number to the OTP endpoint when one exists.
  await Promise.resolve()
  pending.value = false
  step.value = 'code'
  startTicker()
  await nextTick()
  document.getElementById('otp')?.focus()
}

async function verify() {
  error.value = ''
  if (!codeIsValid.value) {
    error.value = 'کد تأیید پنج رقمی است.'
    return
  }
  pending.value = true
  // Seam: exchange the code for a session, then land on the dashboard.
  await Promise.resolve()
  pending.value = false
  await navigateTo('/account')
}

function editPhone() {
  clearInterval(ticker)
  code.value = ''
  error.value = ''
  step.value = 'phone'
}
</script>

<template>
  <div>
    <h1 class="mb-space-sm text-headline-lg font-normal">ورود به پروفایل من</h1>
    <p class="mb-margin text-body-lg text-text-muted">
      {{ step === 'phone' ? 'شماره موبایل خود را وارد کنید.' : 'کد پیامک‌شده را وارد کنید.' }}
    </p>

    <form
      class="flex flex-col gap-space-lg rounded-md border border-border bg-white p-margin"
      @submit.prevent="step === 'phone' ? request() : verify()"
    >
      <template v-if="step === 'phone'">
        <div class="flex flex-col gap-space-sm">
          <label for="phone" class="text-label-lg font-label-lg">شماره موبایل</label>
          <input
            id="phone"
            v-model="phone"
            name="phone"
            type="tel"
            dir="ltr"
            inputmode="numeric"
            autocomplete="tel"
            placeholder="0912 345 6789"
            class="rounded-xs border border-border bg-white px-space-md py-[14px] text-left text-body-lg text-ink focus:border-primary focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
          <span class="text-body-sm text-text-muted">کد تأیید به این شماره پیامک می‌شود.</span>
        </div>
      </template>

      <template v-else>
        <div class="flex flex-col gap-space-sm">
          <label for="otp" class="text-label-lg font-label-lg">کد تأیید</label>
          <input
            id="otp"
            v-model="code"
            name="otp"
            type="text"
            dir="ltr"
            inputmode="numeric"
            autocomplete="one-time-code"
            maxlength="5"
            placeholder="– – – – –"
            class="rounded-xs border border-primary bg-white px-space-md py-[14px] text-center text-headline-md font-normal tracking-[8px] text-ink focus:outline-2 focus:outline-offset-2 focus:outline-primary"
          >
          <span class="text-body-sm text-text-muted">
            ارسال‌شده به <span class="num">{{ maskedPhone }}</span> ·
            <button type="button" class="font-label-lg text-primary hover:underline" @click="editPhone">ویرایش</button>
          </span>
        </div>
      </template>

      <p v-if="error" role="alert" class="text-body-sm font-label-lg text-status-error">{{ error }}</p>

      <button
        type="submit"
        :disabled="pending"
        class="rounded-pill bg-primary px-space-lg py-space-md text-label-lg font-label-lg text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
      >
        {{ step === 'phone' ? 'دریافت کد تأیید' : 'ورود' }}
      </button>

      <p v-if="step === 'code'" class="text-center text-body-sm text-text-muted">
        <template v-if="remaining > 0">ارسال مجدد کد تا <span class="num">{{ resendLabel }}</span></template>
        <button v-else type="button" class="font-label-lg text-primary hover:underline" @click="request">ارسال مجدد کد</button>
      </p>
    </form>

    <p class="mt-space-lg text-center text-body-sm text-text-muted">
      ورود شما به معنای پذیرش
      <NuxtLink to="/legal/terms" class="text-primary hover:underline">قوانین</NuxtLink>
      و
      <NuxtLink to="/legal/privacy" class="text-primary hover:underline">حریم خصوصی</NuxtLink>
      است.
    </p>
  </div>
</template>
