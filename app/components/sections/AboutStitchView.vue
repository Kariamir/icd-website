<!--
  /about — one page (ADR-004). Visual language from the approved design
  stitch_project_detail_page_template/_2/ (ADR-013); section order and ids
  from sitemap §4.1, which the design did not fully cover:

    hero · #history (film → timeline → value chain → delivered work →
    recognition, §4.2) · #subsidiaries · #board · #committees · #vision ·
    #contact

  The ids here must match the anchors in app/utils/routes.ts.
-->
<script setup lang="ts">
import { aboutMilestones, aboutChain, aboutPillars, aboutBoard, aboutFilm, ABOUT_FORM_SUBJECTS } from '~/utils/aboutPageData'
import { orgCommittees } from '~/utils/orgChartData'
import { honors } from '~/utils/honorsData'
import { companies, projects } from '~/utils/catalog'
import { ph } from '~/utils/media'
import { faDigits } from '~/utils/format'

const delivered = computed(() => projects.filter(p => p.status === 'completed' || p.status === 'operating').slice(0, 7))
const recognition = honors.slice(0, 6)
const totalArea = projects.reduce((s, p) => s + p.areaSqm, 0)

const stats = [
  { value: '۴۰+', label: 'سال سابقه', note: 'از تاسیس ۱۳۶۴ و ریشه پارس سازه ۱۳۳۰' },
  { value: `${faDigits(Math.round(totalArea / 1000))} هزار`, label: 'مترمربع زیربنا', note: 'در پرتفوی پروژه‌های گروه' },
  { value: faDigits(companies.length), label: 'شرکت تخصصی تابعه', note: 'از طراحی تا بهره‌برداری' },
  { value: faDigits(projects.length), label: 'پروژه', note: 'در چهار وضعیت اجرایی' },
]

// #contact — exactly two subjects (sitemap §4.1)
const form = reactive({ name: '', phone: '', subject: ABOUT_FORM_SUBJECTS[0].value as string, message: '' })
const errors = reactive<Record<string, string | undefined>>({})
const sent = ref(false)
function submit() {
  errors.name = form.name.trim().length < 3 ? 'نام را وارد کنید.' : undefined
  errors.phone = /^0?9\d{9}$/.test(form.phone.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/\D/g, '')) ? undefined : 'شماره همراه معتبر وارد کنید.'
  if (errors.name || errors.phone) return
  // TODO(backend): submit to the contact endpoint (ADR-002).
  sent.value = true
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative flex min-h-[620px] w-full items-end overflow-hidden bg-ink md:min-h-[88vh]">
      <img :src="ph('tower', 2)" alt="" class="absolute inset-0 size-full object-cover opacity-80">
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div class="relative z-10 mx-auto w-full max-w-[1440px] px-space-lg pb-20 md:px-margin md:pb-28">
        <div class="max-w-4xl space-y-6">
          <span class="inline-flex items-center gap-3 rounded-pill border border-surface-container-lowest/20 bg-surface-container-lowest/10 px-4 py-1.5 text-label-md text-brand-tint">
            <span class="size-1.5 rounded-pill bg-brand-tint" />نماد بورس: ثاخت · تاسیس ۱۳۶۴
          </span>
          <h1 class="text-headline-lg font-headline-xl leading-tight text-surface-container-lowest md:text-headline-xl">شرکت بین‌المللی توسعه ساختمان (ثاخت)</h1>
          <p class="max-w-2xl text-body-lg leading-relaxed text-surface-container-highest">چهار دهه ساختن؛ از پارس سازه ۱۳۳۰ تا مگاپروژه‌های امروز.</p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a href="#history" class="inline-flex h-12 items-center rounded-pill bg-surface-container-lowest px-8 text-label-lg font-label-lg text-ink hover:bg-surface-alt">مرور تاریخچه</a>
            <NuxtLink to="/projects" class="inline-flex h-12 items-center rounded-pill border border-surface-container-lowest px-8 text-label-lg font-label-lg text-surface-container-lowest hover:bg-surface-container-lowest/10">پروژه‌های شاخص</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Metrics -->
    <section class="border-b border-border bg-surface-container-lowest">
      <div class="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        <div v-for="(s, i) in stats" :key="s.label" class="border-border p-8 md:p-12" :class="[i % 2 === 1 && 'border-r', i > 1 && 'border-t lg:border-t-0', i > 0 && 'lg:border-r']">
          <div class="text-headline-lg font-headline-xl text-ink md:text-headline-xl">{{ s.value }}</div>
          <div class="mt-1 text-label-lg font-label-lg text-primary-container">{{ s.label }}</div>
          <div class="mt-2 text-body-sm text-on-surface-variant">{{ s.note }}</div>
        </div>
      </div>
    </section>

    <!-- #history — four movements (sitemap §4.2) -->
    <section id="history" class="scroll-mt-20 bg-surface py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="تاریخچه" title="توسعه، فراتر از بتن و فولاد" aside="یک روایت پیوسته: فیلم، خط زمان، آثار تحویل‌شده و افتخارات." />

        <!-- 1 — film -->
        <div class="group relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-ink md:aspect-[21/9]">
          <img :src="aboutFilm.poster" alt="" class="size-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.02]">
          <div class="absolute inset-0 flex items-center justify-center bg-ink/30">
            <span class="flex size-20 items-center justify-center rounded-pill bg-primary-container text-3xl text-surface-container-lowest" aria-hidden="true"><AppIcon name="play_arrow" /></span>
          </div>
          <div class="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between text-surface-container-lowest">
            <span class="rounded-sm bg-ink/80 px-3 py-1 text-label-lg">{{ aboutFilm.title }}</span>
            <span class="rounded-sm bg-ink/80 px-3 py-1 text-label-md">{{ aboutFilm.src ? '' : 'فیلم پس از تولید بارگذاری می‌شود' }}</span>
          </div>
        </div>

        <!-- 2 — timeline (B&W before ۱۳۵۰) -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">از پارس سازه ۱۳۳۰ تا امروز</h3>
          <ol class="-mx-space-lg flex snap-x gap-5 overflow-x-auto px-space-lg pb-4 md:-mx-margin md:px-margin [scrollbar-width:thin]">
            <li v-for="m in aboutMilestones" :key="m.id" class="w-64 shrink-0 snap-start md:w-72">
              <div class="mb-4 aspect-[4/3] overflow-hidden rounded-md bg-surface-alt">
                <img :src="m.image.src" alt="" loading="lazy" class="size-full object-cover" :class="m.archival && 'grayscale contrast-125'">
              </div>
              <div class="border-r-2 border-primary-container pr-3">
                <p class="text-headline-md font-headline-md text-primary-container">{{ m.year }}</p>
                <p class="text-body-lg font-bold text-ink">{{ m.title }}</p>
                <p class="text-body-sm text-secondary">{{ m.caption }}</p>
              </div>
            </li>
          </ol>
        </div>

        <!-- value chain -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">زنجیره کامل ارزش</h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <figure v-for="(c, i) in aboutChain" :key="c.id" class="group relative m-0 aspect-[3/4] overflow-hidden rounded-md bg-ink">
              <img :src="c.image.src" alt="" loading="lazy" class="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105">
              <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-surface-container-lowest">
                <span class="block text-label-md text-brand-tint">{{ faDigits(i + 1) }}</span>
                <span class="text-body-lg font-bold">{{ c.label }}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <!-- 3 — delivered work -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">کارنامه تحویل‌شده</h3>
          <div class="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
            <NuxtLink
              v-for="(p, i) in delivered" :key="p.slug" :to="`/projects/${p.slug}`"
              class="group relative overflow-hidden rounded-md bg-ink"
              :class="i === 0 ? 'col-span-2 row-span-2' : i === 3 ? 'md:row-span-2' : ''"
            >
              <img :src="p.image" :alt="p.name" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-105">
              <span class="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 to-transparent p-4 text-body-sm font-bold text-surface-container-lowest opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{{ p.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- 4 — recognition -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">افتخارات و عضویت‌ها</h3>
          <ul class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            <li v-for="h in recognition" :key="h.title" class="flex flex-col items-center rounded-md border border-border bg-surface-container-lowest p-5 text-center">
              <span class="mb-3 flex size-12 items-center justify-center rounded-pill bg-brand-tint text-primary-container"><AppIcon name="workspace_premium" /></span>
              <span class="text-label-lg font-bold leading-snug text-ink">{{ h.title }}</span>
              <span class="mt-1 text-label-md text-secondary">{{ h.year }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- #subsidiaries — enlarged, blurred backdrop, horizontal scroll -->
    <section id="subsidiaries" class="relative scroll-mt-20 overflow-hidden bg-ink py-24 md:py-32">
      <img :src="ph('skyline', 2)" alt="" class="absolute inset-0 size-full scale-110 object-cover opacity-25 blur-md">
      <div class="relative mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead tone="dark" eyebrow="خانواده ثاخت" title="شرکت‌های تخصصی تابعه" aside="هشت شرکت، یک زنجیره کامل ساخت.">
          <NuxtLink to="/companies" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-surface-container-lowest/40 px-4 text-label-lg text-surface-container-lowest hover:bg-surface-container-lowest hover:text-ink">همه شرکت‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <ul class="-mx-space-lg flex snap-x gap-5 overflow-x-auto px-space-lg pb-4 md:-mx-margin md:px-margin">
          <li v-for="c in companies" :key="c.slug" class="w-60 shrink-0 snap-start md:w-72">
            <NuxtLink :to="`/companies/${c.slug}`" class="group flex h-72 flex-col justify-between rounded-lg border border-surface-container-lowest/15 bg-surface-container-lowest/95 p-6 transition-colors hover:bg-surface-container-lowest">
              <span class="text-label-md text-secondary">{{ c.tag }}</span>
              <span class="text-center">
                <span class="block text-3xl font-extrabold text-ink group-hover:text-primary-container">{{ c.mark }}</span>
                <span class="mt-1 block text-[10px] font-bold uppercase tracking-widest text-secondary">{{ c.markSub }}</span>
              </span>
              <span class="flex items-center justify-between border-t border-border pt-3 text-body-sm font-bold text-ink">{{ c.name }}<AppIcon name="arrow_back" class="text-primary-container" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- #board -->
    <section id="board" class="scroll-mt-20 bg-surface-container-lowest py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="راهبری" title="هیات‌مدیره" />
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <article v-for="m in aboutBoard" :key="m.slug" class="overflow-hidden rounded-md border border-border bg-surface-container-lowest">
            <div class="aspect-[4/5] overflow-hidden bg-surface-alt"><img :src="m.image.src" :alt="m.name" loading="lazy" class="size-full object-cover grayscale"></div>
            <div class="p-5">
              <h3 class="text-body-lg font-bold text-ink">{{ m.name }}</h3>
              <p class="mt-1 text-label-md text-primary-container">{{ m.role }}</p>
              <p class="mt-3 text-label-md text-secondary">{{ m.education }}</p>
              <p class="text-label-md text-secondary">{{ m.representing }}</p>
              <p class="mt-3 line-clamp-2 text-body-sm text-on-surface-variant">{{ m.bio }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- #committees -->
    <section id="committees" class="scroll-mt-20 border-t border-border bg-surface py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="حاکمیت شرکتی" title="کمیته‌های تخصصی">
          <NuxtLink to="/ir/financials?group=committee-reports#documents-archive" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">گزارش عملکرد کمیته‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article v-for="c in orgCommittees" :key="c.id" class="flex flex-col rounded-lg border border-border bg-surface-container-lowest p-7">
            <span class="mb-5 w-fit rounded-pill bg-brand-tint px-3 py-1 text-label-md font-bold text-primary-container">{{ c.statusLabel }}</span>
            <h3 class="mb-3 text-headline-sm font-headline-sm text-ink">{{ c.name }}</h3>
            <p class="mb-5 text-body-sm leading-relaxed text-secondary">{{ c.mandate }}</p>
            <p class="mt-auto border-t border-border pt-4 text-label-lg font-bold text-ink">{{ c.chairLabel }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- #vision -->
    <section id="vision" class="scroll-mt-20 bg-surface-container-lowest py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="چشم‌انداز" title="چشم‌انداز، حاکمیت و استانداردها" />
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article v-for="(p, i) in aboutPillars" :key="p.id">
            <div class="mb-5 aspect-[4/3] overflow-hidden rounded-md bg-surface-alt"><img :src="[ph('skyline', 1), ph('office', 1), ph('blueprint', 1)][i]" alt="" loading="lazy" class="size-full object-cover"></div>
            <h3 class="mb-2 text-headline-sm font-headline-sm text-ink">{{ p.title }}</h3>
            <p class="text-body-md leading-relaxed text-secondary">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- #contact — two subjects only -->
    <section id="contact" class="scroll-mt-20 border-t border-border bg-surface py-24 md:py-32">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-space-lg md:px-margin lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="mb-2 text-label-lg text-primary-container">ارتباط</p>
          <h2 class="mb-4 text-headline-lg font-headline-lg text-ink">ارسال رزومه یا پیام سهامداری</h2>
          <p class="text-body-md leading-relaxed text-secondary">برای مشاوره خرید از <NuxtLink to="/sales/consultation" class="text-primary-container underline">فرم مشاوره</NuxtLink> و برای سایر موضوعات از <NuxtLink to="/contact" class="text-primary-container underline">تماس با ما</NuxtLink> استفاده کنید.</p>
        </div>
        <div class="rounded-lg border border-border bg-surface-container-lowest p-6 md:p-10 lg:col-span-7">
          <div v-if="sent" class="flex items-start gap-3 rounded-md bg-status-success/10 p-5" role="status">
            <AppIcon name="check_circle" class="mt-0.5 text-status-success" />
            <div><p class="font-bold text-ink">پیام شما ثبت شد.</p><button type="button" class="mt-1 text-label-md text-primary-container underline" @click="sent = false">ارسال پیام دیگر</button></div>
          </div>
          <form v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2" novalidate @submit.prevent="submit">
            <div>
              <label for="ab-name" class="mb-2 block text-label-md font-semibold text-ink">نام و نام خانوادگی</label>
              <input id="ab-name" v-model="form.name" type="text" autocomplete="name" class="h-12 w-full rounded-xs border border-border px-4 focus:border-primary-container focus:outline-none">
              <p v-if="errors.name" class="mt-1 text-label-md text-status-error">{{ errors.name }}</p>
            </div>
            <div>
              <label for="ab-phone" class="mb-2 block text-label-md font-semibold text-ink">شماره همراه</label>
              <input id="ab-phone" v-model="form.phone" type="tel" dir="ltr" autocomplete="tel" class="h-12 w-full rounded-xs border border-border px-4 text-right focus:border-primary-container focus:outline-none">
              <p v-if="errors.phone" class="mt-1 text-label-md text-status-error">{{ errors.phone }}</p>
            </div>
            <div class="sm:col-span-2">
              <label for="ab-subject" class="mb-2 block text-label-md font-semibold text-ink">موضوع</label>
              <select id="ab-subject" v-model="form.subject" class="h-12 w-full rounded-xs border border-border px-3 focus:border-primary-container focus:outline-none">
                <option v-for="s in ABOUT_FORM_SUBJECTS" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="ab-msg" class="mb-2 block text-label-md font-semibold text-ink">پیام (اختیاری)</label>
              <textarea id="ab-msg" v-model="form.message" rows="4" class="w-full rounded-xs border border-border p-4 focus:border-primary-container focus:outline-none" />
            </div>
            <div class="sm:col-span-2">
              <button type="submit" class="inline-flex h-12 items-center rounded-pill bg-primary-container px-10 text-label-lg font-label-lg text-on-primary hover:bg-brand-hover">ارسال</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
