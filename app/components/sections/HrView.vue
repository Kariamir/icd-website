<!--
  /hr — «امور اداری و منابع انسانی» (ADR-024). Was /careers, ported from
  stitch_project_detail_page_template/careers/ (ADR-013). Section order:
  slogan (#slogan), intro, HR news (#news), resume form (#resume), benefits
  (#benefits), learning (#learning), FAQ (#faq) — the ADR-006 order with the
  two sections the client asked for added above it. The design's inline
  script (file picker, drag-and-drop, submit, accordion) is reimplemented in
  Vue — it was stripped in the port and the controls did nothing.
-->
<script setup lang="ts">
import { ph } from '~/utils/media'
import { hrNews, hrSlogan } from '~/utils/hrData'
import type { IconName } from '~/utils/icons'

const news = [...hrNews].sort((a, b) => b.sortKey - a.sortKey)

const figures = [
  { value: '۴۰+ سال', label: 'پیشگامی در صنعت احداث' },
  { value: '۸ شرکت', label: 'تخصصی و تابعه' },
  { value: '۱۸ هزار', label: 'نفر-ساعت آموزش سالانه' },
  { value: '۱۰۰٪', label: 'شفافیت بورسی' },
]

const benefits: { icon: IconName, title: string, text: string, tag: string }[] = [
  { icon: 'health_and_safety', title: 'بیمه درمان تکمیلی', text: 'پوشش سلامت خانواده، دندان‌پزشکی و چکاپ دوره‌ای.', tag: 'پوشش کامل افراد تحت تکفل' },
  { icon: 'home_work', title: 'تسهیلات مسکن', text: 'وام خرید و ودیعه مسکن و اولویت در پروژه‌های گروه.', tag: 'اولویت در واگذاری' },
  { icon: 'card_giftcard', title: 'بسته‌های رفاهی', text: 'کمک‌هزینه ورزش، بن رفاهی و تورهای خانوادگی.', tag: 'تقویم رویدادهای رفاهی' },
  { icon: 'insights', title: 'پاداش عملکرد', text: 'پاداش فصلی متصل به پیشرفت پروژه‌ها و سودآوری.', tag: 'سنجش شاخص‌های KPI' },
]

const learning: { icon: IconName, title: string, text: string, tag: string }[] = [
  { icon: 'school', title: 'آکادمی ثاخت', text: 'دوره‌های تخصصی مهندسی و مالی برای ستاد و کارگاه‌ها.', tag: 'سطح سازمانی' },
  { icon: 'groups', title: 'توسعه مدیریت و رهبری', text: 'کانون ارزیابی و پرورش مدیران پروژه‌های آینده.', tag: 'Executive Leadership' },
  { icon: 'assignment', title: 'مدیریت پروژه (PMBOK و FIDIC)', text: 'شرایط عمومی پیمان، قراردادهای EPC و کنترل پروژه.', tag: 'مدرک معتبر' },
  { icon: 'architecture', title: 'BIM و ساختمان سبز', text: 'مدل‌سازی اطلاعات ساخت و بهینه‌سازی انرژی.', tag: 'فناوری روز' },
]

const faqs = [
  { q: 'بررسی رزومه‌ها چگونه انجام می‌شود؟', a: 'رزومه‌ها ظرف ۴۸ تا ۷۲ ساعت کاری بررسی می‌شوند و در صورت تطابق با نیاز ستاد یا شرکت‌های تابعه، برای مصاحبه اولیه تماس گرفته می‌شود.' },
  { q: 'امکان همکاری در پروژه‌های خارج از تهران هست؟', a: 'بله؛ شرکت‌های گروه در خراسان، فارس، خوزستان، هرمزگان و استان‌های شمالی برای مهندسان اجرایی و سرپرستان کارگاه فرصت جذب دارند.' },
  { q: 'فرایند مصاحبه چقدر طول می‌کشد؟', a: 'دو تا سه مرحله: مصاحبه منابع انسانی، مصاحبه فنی و جلسه صلاحیت سازمانی؛ معمولاً ۲ تا ۳ هفته کاری.' },
  { q: 'دورکاری یا همکاری پاره‌وقت ممکن است؟', a: 'ردیف‌های کارگاهی حضوری‌اند؛ در تخصص‌هایی مانند BIM، مطالعات اقتصادی و طراحی سازه، همکاری پروژه‌ای و شناور قابل تعریف است.' },
]
const open = ref<number | null>(0)

// Resume form — exactly three fields: name, phone, file (ADR-006)
const name = ref('')
const phone = ref('')
const file = ref<File | null>(null)
const dragging = ref(false)
const errors = reactive<Record<string, string | undefined>>({})
const sending = ref(false)
const done = ref<string | null>(null)
const input = ref<HTMLInputElement | null>(null)

const MAX = 10 * 1024 * 1024
function pick(f?: File | null) {
  errors.file = undefined
  if (!f) return
  if (!/\.(pdf|docx?|DOCX?|PDF)$/.test(f.name)) { errors.file = 'فقط فایل PDF یا Word.'; return }
  if (f.size > MAX) { errors.file = 'حجم فایل نباید بیش از ۱۰ مگابایت باشد.'; return }
  file.value = f
}
function onDrop(e: DragEvent) { dragging.value = false; pick(e.dataTransfer?.files?.[0]) }
function clear() { file.value = null; if (input.value) input.value.value = '' }

async function submit() {
  errors.name = name.value.trim().length < 3 ? 'نام و نام خانوادگی را وارد کنید.' : undefined
  errors.phone = /^09\d{9}$/.test(phone.value.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/\D/g, '')) ? undefined : 'شماره همراه ۱۱ رقمی با ۰۹ شروع می‌شود.'
  errors.file = file.value ? errors.file : 'فایل رزومه را بارگذاری کنید.'
  if (errors.name || errors.phone || errors.file) return
  sending.value = true
  // TODO(backend): POST multipart to the HR endpoint with a timestamp and a
  // hash of the file for de-duplication (ADR-006).
  await new Promise(r => setTimeout(r, 700))
  sending.value = false
  done.value = String(Date.now()).slice(-6).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)
  name.value = ''; phone.value = ''; clear()
}
const sizeLabel = computed(() => file.value ? `${(file.value.size / 1024 / 1024).toFixed(2).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]!)} مگابایت` : '')
</script>

<template>
  <div>
    <PageHero
      :image="ph('office', 1)"
      eyebrow="سرمایه انسانی"
      title="امور اداری و منابع انسانی"
      subtitle="اخبار منابع انسانی، مسیر حرفه‌ای و فرصت‌های همکاری در خانواده ثاخت."
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'درباره ثاخت', href: '/about' }, { label: 'امور اداری و منابع انسانی' }]"
    >
      <dl class="grid max-w-3xl grid-cols-2 gap-4 border-t border-surface-container-lowest/20 pt-6 sm:grid-cols-4">
        <div v-for="f in figures" :key="f.label"><dt class="order-2 text-label-md text-surface-dim">{{ f.label }}</dt><dd class="text-headline-sm font-headline-sm text-surface-container-lowest">{{ f.value }}</dd></div>
      </dl>
    </PageHero>

    <!-- #slogan — the organisational slogan and the values under it -->
    <section id="slogan" class="hr-slogan scroll-mt-20 overflow-hidden bg-ink py-16 text-surface-container-lowest md:py-24">
      <div class="relative mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <p class="mb-5 text-label-lg text-brand-tint">{{ hrSlogan.eyebrow }}</p>
        <p class="hr-slogan__line font-headline-lg leading-none text-surface-container-lowest">{{ hrSlogan.line }}</p>
        <p class="mt-6 max-w-2xl text-body-lg leading-loose text-surface-dim">{{ hrSlogan.lede }}</p>

        <ul class="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-surface-container-lowest/15 bg-surface-container-lowest/15 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="p in hrSlogan.pillars" :key="p.title" class="bg-ink p-6">
            <AppIcon :name="p.icon" class="mb-4 text-[1.9em] text-brand-tint" />
            <h3 class="mb-2 text-title-md font-label-lg text-surface-container-lowest">{{ p.title }}</h3>
            <p class="text-body-sm leading-relaxed text-surface-dim">{{ p.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Intro -->
    <section class="border-b border-border bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-space-lg md:px-margin lg:grid-cols-2">
        <div>
          <p class="mb-2 text-label-lg text-primary-container">رویکرد سرمایه انسانی</p>
          <h2 class="mb-6 text-headline-lg-mobile font-headline-lg leading-tight text-ink md:text-headline-lg">آینده حرفه‌ای شما در مدار پروژه‌های ملی</h2>
          <p class="text-body-lg leading-loose text-secondary">شایسته‌سالاری، شفافیت و اثرگذاری پایدار؛ پروژه‌های نمادین کشور با دانش و انگیزه همکاران ما ساخته می‌شوند.</p>
          <a href="#resume" class="mt-8 inline-flex h-12 items-center gap-2 rounded-pill bg-primary-container px-8 text-label-lg font-label-lg text-on-primary hover:bg-brand-hover">ارسال رزومه <AppIcon name="arrow_back" /></a>
        </div>
        <div class="overflow-hidden rounded-lg"><img :src="ph('construction', 1)" alt="" class="h-[380px] w-full object-cover"></div>
      </div>
    </section>

    <!-- #news — the HR desk's own announcements -->
    <section id="news" class="scroll-mt-20 border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="اطلاع‌رسانی" title="اخبار منابع انسانی" aside="تازه‌ترین اطلاعیه‌های اداری، آموزشی و رفاهی" />
        <ul class="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <li
            v-for="n in news"
            :key="n.id"
            class="flex flex-col rounded-md border border-border bg-surface-container-lowest p-6 transition-colors hover:border-primary-container"
          >
            <div class="mb-4 flex items-center gap-3">
              <span class="rounded-pill bg-brand-tint px-3 py-1 text-label-md font-label-lg text-primary-container">{{ n.kind }}</span>
              <time class="text-label-md text-secondary">{{ n.date }}</time>
            </div>
            <h3 class="mb-2 text-title-md font-label-lg leading-snug text-ink">{{ n.title }}</h3>
            <p class="text-body-sm leading-relaxed text-secondary">{{ n.excerpt }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- #resume -->
    <section id="resume" class="scroll-mt-20 border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-3xl px-space-lg">
        <h2 class="mb-2 text-center text-headline-lg font-headline-lg text-ink">ثبت مستقیم رزومه</h2>
        <p class="mb-10 text-center text-body-md text-secondary">بدون ثبت‌نام؛ فقط نام، شماره تماس و فایل رزومه.</p>
        <div class="rounded-lg border border-border bg-surface-container-lowest p-6 md:p-10">
          <div v-if="done" class="flex items-start gap-3 rounded-md border border-status-success/30 bg-status-success/10 p-5" role="status">
            <AppIcon name="check_circle" class="mt-0.5 text-status-success" />
            <div>
              <p class="font-bold text-ink">رزومه شما ثبت شد.</p>
              <p class="text-body-sm text-secondary">کد پیگیری: {{ done }} — بررسی حداکثر ظرف ۷۲ ساعت کاری.</p>
              <button type="button" class="mt-2 text-label-md text-primary-container underline" @click="done = null">ارسال رزومه دیگر</button>
            </div>
          </div>
          <form v-else class="space-y-6" novalidate @submit.prevent="submit">
            <div>
              <label for="cv-name" class="mb-2 block text-label-lg text-ink">نام و نام خانوادگی <span class="text-status-error">*</span></label>
              <input id="cv-name" v-model="name" type="text" autocomplete="name" class="h-12 w-full rounded-xs border border-border px-4 text-body-md focus:border-primary-container focus:outline-none" :aria-invalid="!!errors.name">
              <p v-if="errors.name" class="mt-1.5 text-label-md text-status-error">{{ errors.name }}</p>
            </div>
            <div>
              <label for="cv-phone" class="mb-2 block text-label-lg text-ink">شماره تماس <span class="text-status-error">*</span></label>
              <input id="cv-phone" v-model="phone" type="tel" dir="ltr" autocomplete="tel" placeholder="0912 000 0000" class="h-12 w-full rounded-xs border border-border px-4 text-right text-body-md focus:border-primary-container focus:outline-none" :aria-invalid="!!errors.phone">
              <p v-if="errors.phone" class="mt-1.5 text-label-md text-status-error">{{ errors.phone }}</p>
            </div>
            <div>
              <span class="mb-2 block text-label-lg text-ink">فایل رزومه <span class="text-status-error">*</span></span>
              <div
                v-if="!file"
                role="button" tabindex="0"
                class="flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed p-8 text-center transition-colors"
                :class="dragging ? 'border-primary-container bg-brand-tint/30' : 'border-border bg-surface hover:bg-surface-container-high'"
                @click="input?.click()" @keydown.enter.prevent="input?.click()" @keydown.space.prevent="input?.click()"
                @dragenter.prevent="dragging = true" @dragover.prevent="dragging = true" @dragleave.prevent="dragging = false" @drop.prevent="onDrop"
              >
                <AppIcon name="cloud_upload" class="mb-3 text-3xl text-primary-container" />
                <span class="text-body-md text-ink">فایل را اینجا رها کنید یا برای انتخاب کلیک کنید</span>
                <span class="mt-1 text-label-md text-secondary">PDF یا Word، حداکثر ۱۰ مگابایت</span>
              </div>
              <div v-else class="flex items-center justify-between rounded-md border border-border bg-surface p-3">
                <span class="flex min-w-0 items-center gap-3"><AppIcon name="description" class="text-primary-container" /><span class="min-w-0"><span class="block truncate text-label-lg text-ink">{{ file.name }}</span><span class="text-label-md text-secondary">{{ sizeLabel }}</span></span></span>
                <button type="button" class="flex size-9 items-center justify-center rounded-pill text-status-error hover:bg-surface-container" @click="clear"><AppIcon name="close" label="حذف فایل" /></button>
              </div>
              <input ref="input" type="file" accept=".pdf,.doc,.docx" class="hidden" @change="pick(($event.target as HTMLInputElement).files?.[0])">
              <p v-if="errors.file" class="mt-1.5 text-label-md text-status-error">{{ errors.file }}</p>
            </div>
            <button type="submit" :disabled="sending" class="flex h-14 w-full items-center justify-center gap-3 rounded-pill bg-primary-container text-label-lg font-label-lg text-on-primary hover:bg-brand-hover disabled:opacity-60">
              {{ sending ? 'در حال ارسال…' : 'ارسال رزومه' }}<AppIcon v-if="!sending" name="upload_file" />
            </button>
            <p class="text-center text-label-md text-secondary">اطلاعات شما محرمانه است و حداکثر ظرف ۷۲ ساعت بررسی می‌شود.</p>
          </form>
        </div>
      </div>
    </section>

    <!-- #benefits -->
    <section id="benefits" class="scroll-mt-20 border-b border-border bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="ارزش‌آفرینی برای همکاران" title="مزایا و رفاه کارکنان" />
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article v-for="b in benefits" :key="b.title" class="flex flex-col rounded-lg border border-border p-6">
            <span class="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-tint text-primary-container"><AppIcon :name="b.icon" /></span>
            <h3 class="mb-2 text-headline-sm font-headline-sm text-ink">{{ b.title }}</h3>
            <p class="mb-5 text-body-sm text-secondary">{{ b.text }}</p>
            <span class="mt-auto border-t border-border pt-3 text-label-md text-primary-container">{{ b.tag }}</span>
          </article>
        </div>
      </div>
    </section>

    <!-- #learning -->
    <section id="learning" class="scroll-mt-20 border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-space-lg md:px-margin lg:grid-cols-12">
        <div class="lg:col-span-4">
          <p class="mb-2 text-label-lg text-primary-container">توسعه مهارت</p>
          <h2 class="mb-6 text-headline-lg font-headline-lg text-ink">آموزش و یادگیری</h2>
          <div class="overflow-hidden rounded-lg"><img :src="ph('office', 1)" alt="" class="aspect-[4/3] w-full object-cover"></div>
        </div>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
          <article v-for="l in learning" :key="l.title" class="rounded-lg border border-border bg-surface-container-lowest p-6">
            <span class="mb-4 flex size-11 items-center justify-center rounded-sm bg-surface text-primary-container"><AppIcon :name="l.icon" /></span>
            <p class="mb-1 text-label-md text-secondary">{{ l.tag }}</p>
            <h3 class="mb-2 text-body-lg font-bold text-ink">{{ l.title }}</h3>
            <p class="text-body-sm text-secondary">{{ l.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- #faq -->
    <section id="faq" class="scroll-mt-20 bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-space-lg md:px-margin lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 class="mb-4 text-headline-lg font-headline-lg text-ink">پرسش‌های متداول</h2>
          <p class="mb-6 text-body-md text-secondary">روال استخدام و ارزیابی در هلدینگ و شرکت‌های تابعه.</p>
          <a href="mailto:hr@icd.ir" class="inline-flex items-center gap-2 text-label-lg font-bold text-primary-container" dir="ltr"><AppIcon name="mail" />hr@icd.ir</a>
        </div>
        <div class="space-y-3 lg:col-span-8">
          <div v-for="(f, i) in faqs" :key="f.q" class="overflow-hidden rounded-md border border-border">
            <button type="button" class="flex w-full items-center justify-between gap-4 p-5 text-right text-body-lg font-bold text-ink hover:bg-surface" :aria-expanded="open === i" :aria-controls="`faq-${i}`" @click="open = open === i ? null : i">
              {{ f.q }}<AppIcon :name="open === i ? 'remove' : 'add'" class="shrink-0 text-primary-container" />
            </button>
            <div v-show="open === i" :id="`faq-${i}`" class="px-5 pb-5 text-body-md leading-relaxed text-secondary">{{ f.a }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/*
 * The slogan band borrows the honours band's treatment on /about: painted
 * brand washes over ink, no image loaded. The line itself is deliberately
 * the largest type on the page — it is the point of the section.
 */
.hr-slogan {
  background-image:
    radial-gradient(60% 90% at 88% 0%, rgb(0 94 184 / 42%), transparent 70%),
    radial-gradient(55% 80% at 5% 100%, rgb(205 226 255 / 14%), transparent 68%);
}

.hr-slogan__line {
  font-size: clamp(3rem, 11vw, 7.5rem);
  letter-spacing: -0.02em;
}
</style>
