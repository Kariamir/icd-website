<script setup lang="ts">
import { computed, nextTick, reactive, ref, useId, watch } from 'vue'
import {
  defaultLeadFields,
  type LeadFormBreadcrumb,
  type LeadFormDepartment,
  type LeadFormField,
  type LeadFormHelpDesk,
  type LeadFormInquiryType,
} from '~/utils/leadFormData'

// Template `06-form-lead`, rebuilt to match
// `project_detail_page_template/06_form_lead/code.html` structurally:
// breadcrumb + centred hero, four department cards, the main form card
// (title bar, segmented inquiry-type pills, 3-column field grid, message,
// attachment drop zone, consent + security check, submit + SLA note) and
// the dark help-desk banner with direct phone lines. Site header, footer
// and newsletter strip come from the shared layout. Corners follow the
// balanced scale in docs/design-system-icd3d.md §4.1, and form fields
// follow §4 (label above the field, error text below in status-error).
//
// Every section beyond the hero + form is opt-in through props, so the
// original minimal call signature (eyebrow/title/description/slaBadge/
// fields — still used by /careers) renders a hero + form card only.

const props = withDefaults(defineProps<{
  eyebrow?: string
  title: string
  description?: string
  slaBadge?: string
  /** Field set used when no `inquiryTypes` are given. */
  fields?: LeadFormField[]
  breadcrumb?: LeadFormBreadcrumb[]
  headingLevel?: 'h1' | 'h2'
  departments?: LeadFormDepartment[]
  inquiryTypes?: LeadFormInquiryType[]
  initialInquiry?: string
  formTitle?: string
  formDescription?: string
  showAttachment?: boolean
  showSecurityCheck?: boolean
  submitLabel?: string
  helpDesk?: LeadFormHelpDesk | null
  /** Hide the built-in hero when the page supplies its own PageHero. */
  bare?: boolean
}>(), {
  fields: () => defaultLeadFields,
  headingLevel: 'h1',
  formTitle: 'ثبت پیام و درخواست مشاوره تخصصی',
  formDescription: 'فرم زیر را تکمیل فرمایید تا کارشناسان تخصصی بخش مربوطه در سریع‌ترین زمان با شما تماس حاصل نمایند.',
  showAttachment: true,
  showSecurityCheck: true,
  submitLabel: 'ثبت درخواست و صدور کد رهگیری آنی',
  helpDesk: null,
  bare: false,
})

const uid = useId()
const formSection = ref<HTMLElement | null>(null)

// --- inquiry type (segmented pills) ----------------------------------------
const activeInquiryKey = ref(
  props.inquiryTypes?.find(t => t.key === props.initialInquiry)?.key
  ?? props.inquiryTypes?.[0]?.key
  ?? '',
)
const activeInquiry = computed(() => props.inquiryTypes?.find(t => t.key === activeInquiryKey.value))
const activeFields = computed<LeadFormField[]>(() => activeInquiry.value?.fields ?? props.fields)

function selectInquiry(key: string, scroll = false) {
  if (props.inquiryTypes?.some(t => t.key === key)) activeInquiryKey.value = key
  if (scroll) formSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// --- form state ------------------------------------------------------------
const values = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})
const consent = ref(false)
const securityCheck = ref(false)
const attachment = ref<File | null>(null)
const isDragging = ref(false)
const attemptedSubmit = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const trackingCode = ref('')

watch(activeFields, (fields) => {
  for (const field of fields) {
    if (values[field.key] === undefined || (field.defaultValue && !values[field.key])) {
      values[field.key] = field.defaultValue ?? ''
    }
  }
  for (const key of Object.keys(errors)) errors[key] = ''
  attemptedSubmit.value = false
}, { immediate: true })

const fieldId = (key: string) => `${uid}-${key}`

// --- validation ------------------------------------------------------------
const toLatinDigits = (s: string) => s
  .replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
  .replace(/[٠-٩]/g, d => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
const toPersianDigits = (s: string) => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)

function isValidNationalCode(code: string) {
  if (!/^\d{10}$/.test(code) || /^(\d)\1{9}$/.test(code)) return false
  const digits = code.split('').map(Number)
  const sum = digits.slice(0, 9).reduce((acc, d, i) => acc + d * (10 - i), 0)
  const r = sum % 11
  const check = digits[9]
  return r < 2 ? check === r : check === 11 - r
}

function validateField(field: LeadFormField): string {
  const raw = (values[field.key] ?? '').trim()
  if (!raw) return field.required ? 'تکمیل این فیلد الزامی است.' : ''
  const normalized = toLatinDigits(raw).replace(/[\s-]/g, '')

  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw)) {
    return 'آدرس پست الکترونیکی معتبر نیست (مثال: name@example.com).'
  }
  if (field.validate === 'mobile' && !/^(?:\+98|0098|0)?9\d{9}$/.test(normalized)) {
    return 'شماره همراه باید با ۰۹ شروع شود و ۱۱ رقم باشد.'
  }
  if (field.validate === 'nationalId') {
    if (!/^\d{10}$|^\d{11}$/.test(normalized)) return 'کد ملی ۱۰ رقم و شناسه ملی اشخاص حقوقی ۱۱ رقم است.'
    if (normalized.length === 10 && !isValidNationalCode(normalized)) return 'کد ملی وارد شده معتبر نیست؛ لطفاً دوباره بررسی کنید.'
  }
  if (field.validate === 'url' && !/^https?:\/\/[^\s.]+\.\S+$/.test(raw)) {
    return 'نشانی باید با http:// یا https:// شروع شود.'
  }
  if (field.type === 'textarea' && field.required && raw.length < 10) {
    return 'لطفاً توضیحات را کامل‌تر بنویسید (حداقل ۱۰ نویسه).'
  }
  return ''
}

const ATTACHMENT_TYPES = ['pdf', 'jpg', 'jpeg', 'png', 'zip']
const ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024

function validateAttachment(): string {
  const file = attachment.value
  if (!file) return ''
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ATTACHMENT_TYPES.includes(ext)) return 'فرمت فایل مجاز نیست؛ فقط PDF، JPG، PNG یا ZIP.'
  if (file.size > ATTACHMENT_MAX_BYTES) return 'حجم فایل بیش از ۱۰ مگابایت است.'
  return ''
}

function setError(key: string, message: string) {
  errors[key] = message
}

function onBlur(field: LeadFormField) {
  if (attemptedSubmit.value || values[field.key]) setError(field.key, validateField(field))
}

function onInput(field: LeadFormField) {
  if (errors[field.key]) setError(field.key, validateField(field))
}

watch(consent, () => {
  if (attemptedSubmit.value) setError('consent', consent.value ? '' : 'پذیرش قوانین محرمانگی برای ثبت درخواست الزامی است.')
})
watch(securityCheck, () => {
  if (attemptedSubmit.value) setError('security', securityCheck.value ? '' : 'لطفاً تایید امنیتی را انجام دهید.')
})

function validateAll(): string[] {
  const invalid: string[] = []
  for (const field of activeFields.value) {
    const message = validateField(field)
    setError(field.key, message)
    if (message) invalid.push(fieldId(field.key))
  }
  if (props.showAttachment) {
    const message = validateAttachment()
    setError('attachment', message)
    if (message) invalid.push(fieldId('attachment'))
  }
  setError('consent', consent.value ? '' : 'پذیرش قوانین محرمانگی برای ثبت درخواست الزامی است.')
  if (!consent.value) invalid.push(fieldId('consent'))
  if (props.showSecurityCheck) {
    setError('security', securityCheck.value ? '' : 'لطفاً تایید امنیتی را انجام دهید.')
    if (!securityCheck.value) invalid.push(fieldId('security'))
  }
  return invalid
}

const errorCount = computed(() => Object.values(errors).filter(Boolean).length)

// --- attachment drop zone --------------------------------------------------
function pickFile(file: File | null | undefined) {
  attachment.value = file ?? null
  setError('attachment', validateAttachment())
}
function onFileChange(event: Event) {
  pickFile((event.target as HTMLInputElement).files?.[0])
}
function onDrop(event: DragEvent) {
  isDragging.value = false
  pickFile(event.dataTransfer?.files?.[0])
}
function clearAttachment() {
  attachment.value = null
  setError('attachment', '')
  const input = document.getElementById(fieldId('attachment')) as HTMLInputElement | null
  if (input) input.value = ''
}
const fileSizeLabel = (bytes: number) => bytes >= 1024 * 1024
  ? `${toPersianDigits((bytes / 1024 / 1024).toFixed(1))} مگابایت`
  : `${toPersianDigits(String(Math.max(1, Math.round(bytes / 1024))))} کیلوبایت`

// --- submit ----------------------------------------------------------------
async function handleSubmit() {
  attemptedSubmit.value = true
  const invalid = validateAll()
  if (invalid.length) {
    await nextTick()
    document.getElementById(invalid[0]!)?.focus()
    return
  }
  // No backend yet (docs/decisions.md ADR-002): nothing is sent anywhere.
  // Submission wiring (POST to the lead/CRM endpoint, real SMS tracking
  // code, server-side validation + captcha) comes in the back-end phase.
  submitting.value = true
  await new Promise(resolve => setTimeout(resolve, 500))
  trackingCode.value = `ICD-${toPersianDigits(String(Math.floor(100000 + Math.random() * 900000)))}`
  submitting.value = false
  submitted.value = true
  await nextTick()
  formSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function resetForm() {
  for (const key of Object.keys(values)) values[key] = ''
  for (const field of activeFields.value) values[field.key] = field.defaultValue ?? ''
  for (const key of Object.keys(errors)) errors[key] = ''
  consent.value = false
  securityCheck.value = false
  attachment.value = null
  attemptedSubmit.value = false
  submitted.value = false
}

const departmentIcons: Record<LeadFormDepartment['icon'], string> = {
  leadership: 'M17 20h5v-2a3 3 0 0 0-5.36-1.86M17 20H7m10 0v-2c0-.66-.13-1.28-.36-1.86M7 20H2v-2a3 3 0 0 1 5.36-1.86M7 20v-2c0-.66.13-1.28.36-1.86m0 0a5 5 0 0 1 9.28 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  tender: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  sales: 'M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4',
  shareholder: 'M12 6.25v13m0-13C10.83 5.48 9.25 5 7.5 5S4.17 5.48 3 6.25v13C4.17 18.48 5.75 18 7.5 18s3.33.48 4.5 1.25m0-13C13.17 5.48 14.75 5 16.5 5s3.33.48 4.5 1.25v13C19.83 18.48 18.25 18 16.5 18s-3.33.48-4.5 1.25',
}
</script>

<script lang="ts">
// Field/config types live in the data file; re-exported here so existing
// `import type { LeadFormField } from '~/components/sections/LeadForm.vue'`
// imports (e.g. /careers) keep working.
export type {
  LeadFormField,
  LeadFormInquiryType,
  LeadFormDepartment,
  LeadFormHelpDesk,
  LeadFormBreadcrumb,
} from '~/utils/leadFormData'
</script>

<template>
  <div class="lead-form">
    <!-- Breadcrumb + hero -->
    <section v-if="!bare" class="lead-form__hero">
      <div class="lead-form__inner">
        <nav v-if="breadcrumb?.length" class="lead-form__breadcrumb" aria-label="مسیریاب">
          <template v-for="(crumb, i) in breadcrumb" :key="crumb.label">
            <span v-if="i > 0" aria-hidden="true">/</span>
            <NuxtLink v-if="crumb.href" :to="crumb.href">{{ crumb.label }}</NuxtLink>
            <span v-else class="lead-form__breadcrumb-current" aria-current="page">{{ crumb.label }}</span>
          </template>
        </nav>
        <header class="lead-form__header">
          <span v-if="eyebrow" class="lead-form__eyebrow">{{ eyebrow }}</span>
          <component :is="headingLevel" class="lead-form__title">{{ title }}</component>
          <p v-if="description" class="lead-form__description">{{ description }}</p>
          <span v-if="slaBadge" class="lead-form__sla">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
            {{ slaBadge }}
          </span>
        </header>
      </div>
    </section>

    <!-- Department cards -->
    <section v-if="departments?.length" class="lead-form__inner lead-form__departments" aria-label="حوزه‌های ارتباطی">
      <article
        v-for="dept in departments"
        :key="dept.key"
        class="lead-form__dept"
        :class="{ 'is-active': !!inquiryTypes?.length && activeInquiryKey === dept.inquiryKey }"
      >
        <span class="lead-form__dept-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="departmentIcons[dept.icon]" /></svg>
        </span>
        <div class="lead-form__dept-body">
          <div class="lead-form__dept-head">
            <h3>{{ dept.title }}</h3>
            <span class="lead-form__tone-badge" :class="`lead-form__tone-badge--${dept.badgeTone}`">{{ dept.badge }}</span>
          </div>
          <p>{{ dept.description }}</p>
          <button type="button" class="lead-form__dept-cta" @click="selectInquiry(dept.inquiryKey, true)">
            {{ dept.ctaLabel }}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </article>
    </section>

    <!-- Main lead capture card -->
    <section ref="formSection" class="lead-form__inner lead-form__section" :aria-labelledby="`${uid}-form-title`">
      <div class="lead-form__card">
        <div class="lead-form__card-head">
          <h2 :id="`${uid}-form-title`">{{ formTitle }}</h2>
          <p>{{ formDescription }}</p>
        </div>

        <div v-if="inquiryTypes?.length && !submitted" class="lead-form__pills-wrap">
          <div class="lead-form__pills" role="tablist" aria-label="نوع درخواست">
            <button
              v-for="type in inquiryTypes"
              :key="type.key"
              type="button"
              role="tab"
              class="lead-form__pill"
              :class="{ 'is-active': activeInquiryKey === type.key }"
              :aria-selected="activeInquiryKey === type.key"
              @click="selectInquiry(type.key)"
            >
              {{ type.label }}
            </button>
          </div>
          <p v-if="activeInquiry?.routingNote" class="lead-form__routing">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {{ activeInquiry.routingNote }}
          </p>
        </div>

        <!-- Success state -->
        <div v-if="submitted" class="lead-form__success" role="status">
          <span class="lead-form__success-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
          <h3>درخواست شما با موفقیت ثبت شد</h3>
          <p>کارشناسان بخش مربوطه در سریع‌ترین زمان با شما تماس خواهند گرفت. کد رهگیری را برای پیگیری‌های بعدی نزد خود نگه دارید.</p>
          <dl class="lead-form__receipt">
            <div>
              <dt>کد رهگیری</dt>
              <dd><span class="isolate-ltr">{{ trackingCode }}</span></dd>
            </div>
            <div v-if="activeInquiry">
              <dt>نوع درخواست</dt>
              <dd>{{ activeInquiry.label }}</dd>
            </div>
            <div v-if="activeInquiry?.routingNote">
              <dt>ارجاع</dt>
              <dd>{{ activeInquiry.routingNote }}</dd>
            </div>
          </dl>
          <div class="lead-form__success-actions">
            <BaseButton @click="resetForm">ثبت درخواست جدید</BaseButton>
            <BaseButton href="/" variant="secondary">بازگشت به صفحه اصلی</BaseButton>
          </div>
        </div>

        <!-- Form -->
        <form v-else class="lead-form__form" novalidate @submit.prevent="handleSubmit">
          <p v-if="attemptedSubmit && errorCount" class="lead-form__summary" role="alert">
            لطفاً {{ toPersianDigits(String(errorCount)) }} مورد مشخص‌شده را اصلاح کنید.
          </p>

          <div class="lead-form__grid">
            <div
              v-for="field in activeFields"
              :key="`${activeInquiryKey}-${field.key}`"
              class="lead-form__field"
              :class="{ 'lead-form__field--wide': field.wide || field.type === 'textarea', 'has-error': errors[field.key] }"
            >
              <label :for="fieldId(field.key)" class="lead-form__label">
                {{ field.label }}<span v-if="field.required" class="lead-form__required" aria-hidden="true">*</span>
              </label>
              <textarea
                v-if="field.type === 'textarea'"
                :id="fieldId(field.key)"
                v-model="values[field.key]"
                class="lead-form__control lead-form__control--area"
                :placeholder="field.placeholder"
                :aria-required="field.required || undefined"
                :aria-invalid="!!errors[field.key] || undefined"
                :aria-describedby="errors[field.key] ? `${fieldId(field.key)}-error` : undefined"
                rows="5"
                @blur="onBlur(field)"
                @input="onInput(field)"
              />
              <select
                v-else-if="field.type === 'select'"
                :id="fieldId(field.key)"
                v-model="values[field.key]"
                class="lead-form__control lead-form__control--select"
                :class="{ 'is-placeholder': !values[field.key] }"
                :aria-required="field.required || undefined"
                :aria-invalid="!!errors[field.key] || undefined"
                :aria-describedby="errors[field.key] ? `${fieldId(field.key)}-error` : undefined"
                @blur="onBlur(field)"
                @change="onInput(field)"
              >
                <option value="" :disabled="field.required">{{ field.placeholder || 'انتخاب کنید...' }}</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <input
                v-else
                :id="fieldId(field.key)"
                v-model="values[field.key]"
                class="lead-form__control"
                :type="field.type"
                :dir="field.ltr ? 'ltr' : undefined"
                :inputmode="field.type === 'tel' || field.validate === 'nationalId' ? 'numeric' : undefined"
                :autocomplete="field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : field.key === 'name' ? 'name' : undefined"
                :placeholder="field.placeholder"
                :aria-required="field.required || undefined"
                :aria-invalid="!!errors[field.key] || undefined"
                :aria-describedby="errors[field.key] ? `${fieldId(field.key)}-error` : undefined"
                @blur="onBlur(field)"
                @input="onInput(field)"
              >
              <p v-if="errors[field.key]" :id="`${fieldId(field.key)}-error`" class="lead-form__error">{{ errors[field.key] }}</p>
              <p v-else-if="field.hint" class="lead-form__hint">{{ field.hint }}</p>
            </div>
          </div>

          <!-- Attachment drop zone -->
          <div v-if="showAttachment" class="lead-form__field" :class="{ 'has-error': errors.attachment }">
            <span class="lead-form__label">پیوست اسناد، رزومه یا نقشه‌ها (اختیاری)</span>
            <label
              :for="fieldId('attachment')"
              class="lead-form__dropzone"
              :class="{ 'is-dragging': isDragging }"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop.prevent="onDrop"
            >
              <input
                :id="fieldId('attachment')"
                type="file"
                class="visually-hidden"
                accept=".pdf,.jpg,.jpeg,.png,.zip"
                :aria-describedby="errors.attachment ? `${fieldId('attachment')}-error` : undefined"
                @change="onFileChange"
              >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M7 16a4 4 0 0 1-.88-7.9A5 5 0 1 1 15.9 6H16a5 5 0 0 1 1 9.9M15 13l-3-3m0 0-3 3m3-3v12" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span class="lead-form__dropzone-text">فایل خود را اینجا بکشید یا برای انتخاب فایل <strong>کلیک کنید</strong></span>
              <span class="lead-form__dropzone-meta">فرمت‌های مجاز: PDF, JPG, PNG, ZIP (حداکثر ۱۰ مگابایت)</span>
            </label>
            <div v-if="attachment" class="lead-form__file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15.2 7 8.6 13.6a2 2 0 1 0 2.8 2.8l6.6-6.6a4 4 0 0 0-5.7-5.7L5.7 10.8a6 6 0 1 0 8.5 8.5L20.5 13" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span class="lead-form__file-name" dir="ltr">{{ attachment.name }}</span>
              <span class="lead-form__file-size">{{ fileSizeLabel(attachment.size) }}</span>
              <button type="button" class="lead-form__file-remove" aria-label="حذف فایل پیوست" @click="clearAttachment">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" /></svg>
              </button>
            </div>
            <p v-if="errors.attachment" :id="`${fieldId('attachment')}-error`" class="lead-form__error">{{ errors.attachment }}</p>
          </div>

          <!-- Privacy & security row -->
          <div class="lead-form__trust-row">
            <div class="lead-form__consent-wrap" :class="{ 'has-error': errors.consent }">
              <div class="lead-form__consent">
                <input
                  :id="fieldId('consent')"
                  v-model="consent"
                  type="checkbox"
                  :aria-invalid="!!errors.consent || undefined"
                  :aria-describedby="errors.consent ? `${fieldId('consent')}-error` : undefined"
                >
                <label :for="fieldId('consent')">
                  قوانین محرمانگی، حفظ حریم شخصی و شیوه‌نامه صیانت از داده‌های هلدینگ بین‌المللی توسعه ساختمان (ثاخت) را مطالعه نموده و می‌پذیرم.
                  <span class="lead-form__required" aria-hidden="true">*</span>
                </label>
              </div>
              <NuxtLink to="/legal/privacy" class="lead-form__policy-link">مطالعه قوانین</NuxtLink>
              <p v-if="errors.consent" :id="`${fieldId('consent')}-error`" class="lead-form__error">{{ errors.consent }}</p>
            </div>

            <div v-if="showSecurityCheck" class="lead-form__security-wrap" :class="{ 'has-error': errors.security }">
              <div class="lead-form__security">
                <label class="lead-form__security-check">
                  <input
                    :id="fieldId('security')"
                    v-model="securityCheck"
                    type="checkbox"
                    :aria-invalid="!!errors.security || undefined"
                    :aria-describedby="errors.security ? `${fieldId('security')}-error` : undefined"
                  >
                  <span>من ربات نیستم (اعتبارسنجی امنیتی)</span>
                </label>
                <span class="lead-form__security-brand" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.62-4.02A11.96 11.96 0 0 1 12 2.94a11.96 11.96 0 0 1-8.62 3.04A12 12 0 0 0 3 9c0 5.6 3.82 10.29 9 11.62 5.18-1.33 9-6.03 9-11.62 0-1.04-.13-2.05-.38-3.02Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  امنیت ICD
                </span>
              </div>
              <p v-if="errors.security" :id="`${fieldId('security')}-error`" class="lead-form__error">{{ errors.security }}</p>
            </div>
          </div>

          <!-- Submit + SLA note -->
          <div class="lead-form__submit-row">
            <BaseButton type="submit" size="lg" :disabled="submitting">
              {{ submitting ? 'در حال ثبت درخواست...' : submitLabel }}
              <svg v-if="!submitting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M10 19l-7-7m0 0 7-7m-7 7h18" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </BaseButton>
            <p class="lead-form__submit-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
              کلیه مکاتبات با کد یکتای پیامکی و در سیستم اتوماسیون سازمانی ثبت می‌گردد.
            </p>
          </div>
        </form>
      </div>
    </section>

    <!-- Help-desk banner -->
    <section v-if="helpDesk" class="lead-form__inner lead-form__helpdesk-wrap">
      <div class="lead-form__helpdesk">
        <div class="lead-form__helpdesk-text">
          <span class="lead-form__helpdesk-eyebrow">{{ helpDesk.eyebrow }}</span>
          <h2>{{ helpDesk.title }}</h2>
          <p>{{ helpDesk.description }}</p>
          <ul class="lead-form__helpdesk-meta">
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {{ helpDesk.hours }}
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>
              {{ helpDesk.address }}
            </li>
          </ul>
        </div>
        <div class="lead-form__helpdesk-phones">
          <a v-for="phone in helpDesk.phones" :key="phone.tel" :href="`tel:${phone.tel}`" class="lead-form__phone">
            <span class="lead-form__phone-text">
              <span>{{ phone.label }}</span>
              <strong dir="ltr">{{ phone.number }}</strong>
            </span>
            <span class="lead-form__phone-ext">{{ phone.extension }}</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.lead-form { color: var(--color-text); }
.lead-form__inner { max-inline-size: var(--container-max); margin-inline: auto; padding-inline: var(--space-3); }

/* --- hero --- */
.lead-form__hero {
  background: linear-gradient(to bottom, color-mix(in srgb, var(--color-tint) 40%, var(--color-white)), var(--color-white) 70%, var(--color-surface));
  border-block-end: 1px solid var(--color-border);
  padding-block: var(--space-2) var(--space-8);
}
.lead-form__breadcrumb { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-1); font: var(--text-body-sm); color: var(--color-text-muted); padding-block: var(--space-2); }
.lead-form__breadcrumb a { color: inherit; text-decoration: none; }
.lead-form__breadcrumb a:hover { color: var(--color-primary); }
.lead-form__breadcrumb-current { color: var(--color-text); font-weight: 600; }
.lead-form__header { text-align: center; max-inline-size: 820px; margin-inline: auto; padding-block-start: var(--space-4); }
.lead-form__eyebrow {
  display: inline-block;
  padding: 6px var(--space-2);
  background: var(--color-tint);
  color: var(--color-primary);
  font: var(--text-label);
  font-size: 12px;
  border-radius: var(--radius-pill);
  margin-block-end: var(--space-2);
}
.lead-form__title { font: var(--text-h2); font-weight: 800; color: var(--color-ink); }
@media (min-width: 1024px) { .lead-form__title { font-size: 46px; } }
.lead-form__description { font: var(--text-body); color: var(--color-text-muted); margin-block-start: var(--space-2); }
.lead-form__sla {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-block-start: var(--space-2);
  padding: 6px var(--space-2);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-status-success) 10%, var(--color-white));
  border: 1px solid color-mix(in srgb, var(--color-status-success) 30%, var(--color-white));
  color: var(--color-status-success);
  font: var(--text-label);
  font-size: 12px;
}

/* --- department cards --- */
.lead-form__departments { display: grid; grid-template-columns: 1fr; gap: var(--space-3); margin-block-start: calc(-1 * var(--space-4)); position: relative; }
@media (min-width: 768px) { .lead-form__departments { grid-template-columns: 1fr 1fr; } }
.lead-form__dept {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: 0 1px 3px rgb(4 28 44 / 5%);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.lead-form__dept:hover { box-shadow: 0 8px 24px rgb(4 28 44 / 8%); }
.lead-form__dept.is-active { border-color: var(--color-primary); }
.lead-form__dept-icon { flex-shrink: 0; inline-size: 56px; block-size: 56px; border-radius: var(--radius-md); background: color-mix(in srgb, var(--color-tint) 50%, var(--color-white)); color: var(--color-primary); display: flex; align-items: center; justify-content: center; }
.lead-form__dept-body { flex: 1; min-inline-size: 0; }
.lead-form__dept-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-1); margin-block-end: 6px; }
.lead-form__dept-head h3 { font: var(--text-h3); font-weight: 800; color: var(--color-ink); }
.lead-form__dept p { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-end: var(--space-2); }
.lead-form__dept-cta { display: inline-flex; align-items: center; gap: 6px; padding: 0; border: none; background: none; color: var(--color-primary); font: var(--text-label); font-size: 13px; cursor: pointer; }
.lead-form__dept-cta:hover { text-decoration: underline; }

.lead-form__tone-badge { padding: 3px 10px; border-radius: var(--radius-pill); font-size: 11px; font-weight: 700; line-height: 1.5; border: 1px solid; white-space: nowrap; }
.lead-form__tone-badge--success { color: var(--color-status-success); background: color-mix(in srgb, var(--color-status-success) 8%, var(--color-white)); border-color: color-mix(in srgb, var(--color-status-success) 30%, var(--color-white)); }
.lead-form__tone-badge--info { color: var(--color-primary); background: color-mix(in srgb, var(--color-tint) 45%, var(--color-white)); border-color: var(--color-tint); }
.lead-form__tone-badge--warning { color: var(--color-brand-blue-deep); background: var(--color-surface); border-color: var(--color-surface-alt); }
.lead-form__tone-badge--neutral { color: var(--color-white); background: var(--color-ink); border-color: var(--color-ink); }

/* --- form card --- */
.lead-form__section { padding-block: var(--space-8); scroll-margin-block-start: var(--space-3); }
.lead-form__card { background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); box-shadow: 0 20px 48px rgb(4 28 44 / 8%); overflow: hidden; }
.lead-form__card-head { text-align: center; max-inline-size: 640px; margin-inline: auto; padding: var(--space-6) var(--space-3) var(--space-3); }
.lead-form__card-head h2 { font: var(--text-h2); font-size: 30px; font-weight: 800; color: var(--color-ink); }
.lead-form__card-head p { font: var(--text-body-sm); color: var(--color-text-muted); margin-block-start: var(--space-1); }

.lead-form__pills-wrap { padding: 0 var(--space-3) var(--space-3); border-block-end: 1px solid var(--color-border); overflow-x: auto; }
.lead-form__pills { display: flex; gap: 6px; padding: 6px; background: var(--color-surface); border-radius: var(--radius-pill); inline-size: max-content; margin-inline: auto; }
.lead-form__pill { border: none; background: none; padding: 9px var(--space-2); border-radius: var(--radius-pill); font-size: 12px; font-weight: 600; color: var(--color-text-muted); cursor: pointer; white-space: nowrap; transition: background-color 0.2s ease, color 0.2s ease; }
.lead-form__pill:hover { background: var(--color-white); color: var(--color-ink); }
.lead-form__pill.is-active { background: var(--color-primary); color: var(--color-white); font-weight: 700; }
.lead-form__routing { display: flex; align-items: center; justify-content: center; gap: 6px; margin-block-start: var(--space-2); font-size: 12px; color: var(--color-text-muted); }

.lead-form__form { display: flex; flex-direction: column; gap: var(--space-4); padding: var(--space-3); }
@media (min-width: 768px) { .lead-form__form { padding: var(--space-6); } }
.lead-form__summary { padding: var(--space-2); border-radius: var(--radius-sm); background: color-mix(in srgb, var(--color-status-error) 8%, var(--color-white)); border: 1px solid color-mix(in srgb, var(--color-status-error) 30%, var(--color-white)); color: var(--color-status-error); font: var(--text-body-sm); font-weight: 600; }
.lead-form__grid { display: grid; grid-template-columns: 1fr; gap: var(--space-3); }
@media (min-width: 640px) { .lead-form__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 960px) { .lead-form__grid { grid-template-columns: repeat(3, 1fr); } }
.lead-form__field { display: flex; flex-direction: column; gap: var(--space-1); min-inline-size: 0; }
.lead-form__field--wide { grid-column: 1 / -1; }
.lead-form__label { font: var(--text-label); font-size: 13px; color: var(--color-ink); }
.lead-form__required { color: var(--color-status-error); margin-inline-start: 4px; }
.lead-form__control {
  inline-size: 100%;
  block-size: 48px;
  padding-inline: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xs);
  background: var(--color-white);
  font: var(--text-body-sm);
  color: var(--color-ink);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.lead-form__control::placeholder { color: color-mix(in srgb, var(--color-text-muted) 65%, var(--color-white)); }
.lead-form__control[dir='ltr'] { text-align: left; }
.lead-form__control[dir='ltr']::placeholder { text-align: right; direction: rtl; }
.lead-form__control:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 12%, transparent); }
.lead-form__control--area { block-size: auto; min-block-size: 132px; padding-block: var(--space-2); resize: vertical; }
.lead-form__control--select { appearance: none; padding-inline-start: var(--space-2); padding-inline-end: 40px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a5a63' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: left 16px center; }
.lead-form__control--select.is-placeholder { color: var(--color-text-muted); }
.has-error > .lead-form__control,
.has-error .lead-form__dropzone { border-color: var(--color-status-error); }
.has-error > .lead-form__control:focus { box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-status-error) 12%, transparent); }
.lead-form__error { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; line-height: 1.5; color: var(--color-status-error); }
.lead-form__hint { font-size: 12px; color: var(--color-text-muted); }

.lead-form__dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: var(--space-3);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface) 50%, var(--color-white));
  color: var(--color-text-muted);
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
.lead-form__dropzone:hover,
.lead-form__dropzone.is-dragging { border-color: var(--color-primary); background: color-mix(in srgb, var(--color-tint) 25%, var(--color-white)); }
.lead-form__dropzone:focus-within { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.lead-form__dropzone-text { font-size: 13px; font-weight: 500; color: var(--color-ink); }
.lead-form__dropzone-text strong { color: var(--color-primary); }
.lead-form__dropzone-meta { font-size: 11px; }
.lead-form__file { display: flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); font-size: 13px; color: var(--color-primary); }
.lead-form__file-name { flex: 1; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--color-ink); font-weight: 600; text-align: right; }
.lead-form__file-size { color: var(--color-text-muted); font-size: 12px; }
.lead-form__file-remove { display: flex; align-items: center; justify-content: center; inline-size: 28px; block-size: 28px; border: none; border-radius: var(--radius-pill); background: var(--color-white); color: var(--color-text-muted); cursor: pointer; }
.lead-form__file-remove:hover { color: var(--color-status-error); }

.lead-form__trust-row { display: grid; grid-template-columns: 1fr; gap: var(--space-3); align-items: center; padding-block-start: var(--space-3); border-block-start: 1px solid var(--color-border); }
@media (min-width: 1024px) { .lead-form__trust-row { grid-template-columns: 1fr auto; } }
.lead-form__consent-wrap { display: flex; flex-direction: column; gap: 6px; }
.lead-form__consent { display: flex; align-items: flex-start; gap: var(--space-1); }
.lead-form__consent input,
.lead-form__security-check input { flex-shrink: 0; inline-size: 18px; block-size: 18px; margin: 2px 0 0; accent-color: var(--color-primary); cursor: pointer; }
.lead-form__consent label { font: var(--text-body-sm); font-size: 13px; color: var(--color-text-muted); cursor: pointer; }
.lead-form__policy-link { align-self: flex-start; margin-inline-start: 26px; font-size: 13px; font-weight: 700; color: var(--color-primary); }
.lead-form__security-wrap { display: flex; flex-direction: column; gap: 6px; }
.lead-form__security { display: flex; align-items: center; gap: var(--space-2); padding: 12px var(--space-2); background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
.has-error .lead-form__security { border-color: var(--color-status-error); }
.lead-form__security-check { display: flex; align-items: center; gap: var(--space-1); font-size: 13px; font-weight: 600; cursor: pointer; }
.lead-form__security-brand { display: flex; flex-direction: column; align-items: center; gap: 2px; padding-inline-start: var(--space-2); border-inline-start: 1px solid var(--color-border); font-size: 10px; color: var(--color-text-muted); }
.lead-form__security-brand svg { color: var(--color-primary); }

.lead-form__submit-row { display: flex; flex-direction: column; align-items: stretch; gap: var(--space-2); }
@media (min-width: 640px) { .lead-form__submit-row { flex-direction: row; align-items: center; justify-content: space-between; } }
.lead-form__submit-note { display: flex; align-items: center; gap: var(--space-1); font-size: 12px; color: var(--color-text-muted); }
.lead-form__submit-note svg { flex-shrink: 0; color: var(--color-status-success); }

/* --- success --- */
.lead-form__success { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); padding: var(--space-6) var(--space-3); text-align: center; border-block-start: 1px solid var(--color-border); }
.lead-form__success-icon { inline-size: 64px; block-size: 64px; border-radius: var(--radius-pill); display: flex; align-items: center; justify-content: center; background: color-mix(in srgb, var(--color-status-success) 12%, var(--color-white)); color: var(--color-status-success); }
.lead-form__success h3 { font: var(--text-h3); font-size: 22px; font-weight: 800; }
.lead-form__success > p { max-inline-size: 560px; font: var(--text-body-sm); color: var(--color-text-muted); }
.lead-form__receipt { display: flex; flex-direction: column; inline-size: 100%; max-inline-size: 520px; margin: 0; border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.lead-form__receipt > div { display: flex; justify-content: space-between; gap: var(--space-2); padding: 12px var(--space-2); text-align: start; }
.lead-form__receipt > div + div { border-block-start: 1px solid var(--color-border); }
.lead-form__receipt dt { font-size: 13px; color: var(--color-text-muted); flex-shrink: 0; }
.lead-form__receipt dd { margin: 0; font-size: 13px; font-weight: 700; color: var(--color-ink); text-align: end; }
.lead-form__receipt > div:first-child dd { color: var(--color-primary); font-size: 16px; letter-spacing: 0.04em; }
.lead-form__success-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-1); margin-block-start: var(--space-1); }

/* --- help desk --- */
.lead-form__helpdesk-wrap { padding-block-end: var(--space-8); }
.lead-form__helpdesk {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
  align-items: center;
  padding: var(--space-4) var(--space-3);
  border-radius: var(--radius-lg);
  background: radial-gradient(circle at 100% 0%, color-mix(in srgb, var(--color-brand-blue) 35%, transparent), transparent 45%), var(--color-ink);
  color: var(--color-white);
  overflow: hidden;
}
@media (min-width: 1024px) { .lead-form__helpdesk { grid-template-columns: 2fr 1fr; padding: var(--space-6); } }
.lead-form__helpdesk-text { display: flex; flex-direction: column; align-items: flex-start; gap: var(--space-2); }
.lead-form__helpdesk-eyebrow { padding: 4px 12px; border-radius: var(--radius-pill); background: rgb(255 255 255 / 10%); color: var(--color-tint); font: var(--text-label); font-size: 12px; }
.lead-form__helpdesk h2 { font: var(--text-h2); font-size: 30px; font-weight: 800; }
.lead-form__helpdesk p { font: var(--text-body-sm); color: rgb(255 255 255 / 72%); max-inline-size: 640px; }
.lead-form__helpdesk-meta { display: flex; flex-wrap: wrap; gap: var(--space-1) var(--space-3); margin: 0; padding: 0; list-style: none; font-size: 13px; color: rgb(255 255 255 / 72%); }
.lead-form__helpdesk-meta li { display: flex; align-items: center; gap: var(--space-1); }
.lead-form__helpdesk-meta svg { color: var(--color-tint); flex-shrink: 0; }
.lead-form__helpdesk-phones { display: flex; flex-direction: column; gap: 12px; }
.lead-form__phone { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: var(--space-2); border-radius: var(--radius-md); border: 1px solid rgb(255 255 255 / 12%); background: rgb(255 255 255 / 8%); color: var(--color-white); text-decoration: none; transition: background-color 0.2s ease; }
.lead-form__phone:hover { background: rgb(255 255 255 / 16%); }
.lead-form__phone-text { display: flex; flex-direction: column; gap: 2px; }
.lead-form__phone-text span { font-size: 12px; color: rgb(255 255 255 / 72%); }
.lead-form__phone-text strong { font-size: 19px; letter-spacing: 0.04em; text-align: right; }
.lead-form__phone-ext { flex-shrink: 0; padding: 6px 12px; border-radius: var(--radius-sm); background: var(--color-primary); font-size: 12px; font-weight: 700; }
</style>
