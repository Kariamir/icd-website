<!--
  /sales/consultation — «درخواست مشاوره». Ported from
  stitch_project_detail_page_template/sales_consultation/ (ADR-013): one
  centred short form. The header CTA «مشاوره و تماس سریع» lands here
  (sitemap §10, ADR-015). The design posted to "#"; it now validates in the
  browser and confirms with a reference number (backend pending, ADR-002).
-->
<script setup lang="ts">
import { salesNav, companyContact } from '~/utils/routes'
import { projects, getProject } from '~/utils/catalog'
import { faDigits } from '~/utils/format'

const route = useRoute()
const name = ref('')
const phone = ref('')
const interest = ref(getProject(String(route.query.project ?? '')) ? `project:${route.query.project}` : '')
const notes = ref('')
const errors = reactive<Record<string, string | undefined>>({})
const sending = ref(false)
const done = ref<string | null>(null)

const selling = projects.filter(p => p.status === 'under-construction' || p.status === 'upcoming' || p.units)

async function submit() {
  errors.name = name.value.trim().length < 3 ? 'نام و نام خانوادگی را وارد کنید.' : undefined
  errors.phone = /^09\d{9}$/.test(phone.value.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/\D/g, '')) ? undefined : 'شماره همراه ۱۱ رقمی با ۰۹ شروع می‌شود.'
  errors.interest = interest.value ? undefined : 'یک گزینه انتخاب کنید.'
  if (errors.name || errors.phone || errors.interest) return
  sending.value = true
  // TODO(backend): POST to the CRM (sitemap §6 #24 — primary conversion endpoint).
  await new Promise(r => setTimeout(r, 700))
  sending.value = false
  done.value = faDigits(String(Date.now()).slice(-6))
}
</script>

<template>
  <div>
    <SubNav :items="salesNav" label="بخش‌های فروش" />
    <!--
      Glassmorphism, at the owner's instruction (ADR-028). The photograph the
      client supplied for this desk sits behind the whole section, blurred
      and dimmed, and the panels float on it as frosted glass.

      Two things keep it legible rather than merely fashionable: the image is
      overlaid with an ink scrim before anything is drawn on it, so the
      contrast of the text never depends on which part of the photograph
      happens to be behind it; and `@supports` plus
      `prefers-reduced-transparency` both fall back to a solid panel, the
      same contract the glass header has carried since ADR-020.
    -->
    <section class="consult relative flex justify-center overflow-hidden px-4 py-16 md:py-24">
      <img
        src="/img/about/advisor-desk.jpg"
        alt=""
        aria-hidden="true"
        class="absolute inset-0 size-full scale-110 object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/75 to-ink/90" aria-hidden="true" />

      <div class="relative mx-auto w-full max-w-xl">
        <div class="mb-10 text-center">
          <p class="mb-3 inline-flex items-center gap-2 text-label-md text-brand-tint"><span class="size-2 rounded-pill bg-brand-tint" />فروش و پیش‌فروش</p>
          <h1 class="mb-3 text-headline-lg font-headline-lg text-surface-container-lowest">درخواست مشاوره خرید و سرمایه‌گذاری</h1>
          <p class="mx-auto max-w-lg text-body-md text-surface-dim">کارشناسان فروش حداکثر ظرف ۲۴ ساعت کاری با شما تماس می‌گیرند.</p>
        </div>

        <div v-if="done" class="consult-glass rounded-lg p-8 text-center md:p-10" role="status">
          <span class="mx-auto mb-5 flex size-14 items-center justify-center rounded-pill bg-status-success/10 text-2xl text-status-success"><AppIcon name="check_circle" /></span>
          <h2 class="mb-2 text-headline-sm font-headline-sm text-ink">درخواست شما ثبت شد</h2>
          <p class="mb-6 text-body-md text-secondary">کد پیگیری: <strong class="text-ink">{{ done }}</strong></p>
          <div class="flex flex-wrap justify-center gap-3">
            <NuxtLink to="/sales" class="inline-flex h-11 items-center rounded-pill border border-primary-container px-6 text-label-lg text-primary-container hover:bg-brand-tint">مشاهده واحدها</NuxtLink>
            <button type="button" class="inline-flex h-11 items-center rounded-pill bg-primary-container px-6 text-label-lg text-on-primary" @click="done = null">درخواست جدید</button>
          </div>
        </div>

        <form v-else id="consultation-form" class="consult-glass space-y-6 rounded-lg p-8 md:p-10" novalidate @submit.prevent="submit">
          <div>
            <label for="full-name" class="mb-2 block text-label-lg text-ink">نام و نام خانوادگی <span class="text-status-error">*</span></label>
            <input id="full-name" v-model="name" type="text" autocomplete="name" placeholder="مثال: علیرضا محمدی" class="h-12 w-full rounded-xs border border-border px-4 text-body-md focus:border-primary-container focus:outline-none" :aria-invalid="!!errors.name">
            <p v-if="errors.name" class="mt-1.5 text-label-md text-status-error">{{ errors.name }}</p>
          </div>
          <div>
            <label for="phone-number" class="mb-2 block text-label-lg text-ink">شماره تماس <span class="text-status-error">*</span></label>
            <input id="phone-number" v-model="phone" type="tel" dir="ltr" autocomplete="tel" placeholder="0912 000 0000" class="h-12 w-full rounded-xs border border-border px-4 text-right text-body-md focus:border-primary-container focus:outline-none" :aria-invalid="!!errors.phone">
            <p v-if="errors.phone" class="mt-1.5 text-label-md text-status-error">{{ errors.phone }}</p>
          </div>
          <div>
            <label for="project-preference" class="mb-2 block text-label-lg text-ink">پروژه یا بودجه مدنظر <span class="text-status-error">*</span></label>
            <select id="project-preference" v-model="interest" class="h-12 w-full rounded-xs border border-border px-3 text-body-md focus:border-primary-container focus:outline-none" :aria-invalid="!!errors.interest">
              <option disabled value="">انتخاب کنید</option>
              <optgroup label="پروژه‌ها">
                <option v-for="p in selling" :key="p.slug" :value="`project:${p.slug}`">{{ p.name }} — {{ p.city }}</option>
              </optgroup>
              <optgroup label="بودجه">
                <option value="budget:under-20">تا ۲۰ میلیارد تومان</option>
                <option value="budget:20-60">۲۰ تا ۶۰ میلیارد تومان</option>
                <option value="budget:above-60">بیش از ۶۰ میلیارد تومان</option>
              </optgroup>
            </select>
            <p v-if="errors.interest" class="mt-1.5 text-label-md text-status-error">{{ errors.interest }}</p>
          </div>
          <div>
            <label for="notes" class="mb-2 flex items-center justify-between text-label-lg text-ink"><span>توضیحات</span><span class="text-body-sm text-outline">اختیاری</span></label>
            <textarea id="notes" v-model="notes" rows="3" class="w-full resize-none rounded-xs border border-border p-4 text-body-md focus:border-primary-container focus:outline-none" />
          </div>
          <button type="submit" :disabled="sending" class="flex h-14 w-full items-center justify-center gap-2 rounded-pill bg-primary-container text-headline-sm font-headline-sm text-on-primary hover:bg-brand-hover disabled:opacity-60">
            {{ sending ? 'در حال ارسال…' : 'ثبت درخواست مشاوره' }}
          </button>
          <p class="flex items-center justify-center gap-2 text-body-sm text-outline"><AppIcon name="verified_user" />اطلاعات شما محرمانه می‌ماند.</p>
        </form>

        <p class="mt-8 text-center text-body-sm text-secondary">
          تماس مستقیم: <a :href="companyContact.phoneHref" class="font-bold text-surface-container-lowest hover:text-brand-tint">{{ companyContact.phone }}</a>
          · <NuxtLink to="/contact" class="text-brand-tint hover:underline">سایر راه‌های ارتباطی</NuxtLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
@layer components {
  /*
   * Frosted glass over the photograph. A light panel, not a dark one: the
   * form's labels, inputs and validation messages are all drawn for a light
   * surface, and recolouring every one of them would be a second set of
   * states to keep in step for no gain.
   */
  .consult-glass {
    border: 1px solid rgb(255 255 255 / 0.55);
    background: rgb(255 255 255 / 0.92);
    box-shadow: 0 30px 70px -30px rgb(4 28 44 / 0.6);
  }

  @supports (backdrop-filter: blur(1px)) {
    .consult-glass {
      background: linear-gradient(135deg, rgb(255 255 255 / 0.82), rgb(255 255 255 / 0.68));
      backdrop-filter: blur(22px) saturate(1.3);
    }
  }

  /* The same opt-out the glass header carries (ADR-020). */
  @media (prefers-reduced-transparency: reduce) {
    .consult-glass {
      background: var(--color-surface-container-lowest);
      backdrop-filter: none;
    }
  }

  /* The photograph is a backdrop, so it is blurred rather than shown. */
  .consult img {
    filter: blur(18px);
  }
}
</style>
