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
import { aboutHero, aboutMilestones, aboutChain, aboutPillars, aboutBoard, aboutHonors, aboutFilm, ABOUT_FORM_SUBJECTS } from '~/utils/aboutPageData'
import { orgCommittees } from '~/utils/orgChartData'
import { companies, projects } from '~/utils/catalog'
import { ph } from '~/utils/media'
import { faDigits } from '~/utils/format'

/*
 * The mosaic that closes the timeline. The client's workbook marks all ten
 * projects `under-construction` and none `completed` or `operating`, so the
 * delivered-work gallery would be empty — it shows the group's portfolio
 * instead, under a heading that says so, rather than an empty grid under a
 * heading claiming delivered work. ⛔ If projects have in fact been handed
 * over, their status in the workbook needs correcting.
 */
const deliveredOnly = computed(() => projects.filter(p => p.status === 'completed' || p.status === 'operating'))
const delivered = computed(() => (deliveredOnly.value.length ? deliveredOnly.value : projects).slice(0, 7))
const deliveredTitle = computed(() => (deliveredOnly.value.length ? 'کارنامه تحویل‌شده' : 'پروژه‌های گروه'))
const totalArea = projects.reduce((s, p) => s + p.areaSqm, 0)

const stats = [
  { value: '۴۰+', label: 'سال سابقه', note: 'از تاسیس ۱۳۶۴ و ریشه پارس سازه ۱۳۳۰' },
  { value: `${faDigits(Math.round(totalArea / 1000))} هزار`, label: 'مترمربع زیربنا', note: 'در پرتفوی پروژه‌های گروه' },
  { value: faDigits(companies.length), label: 'شرکت تخصصی تابعه', note: 'از طراحی تا بهره‌برداری' },
  { value: faDigits(projects.length), label: 'پروژه', note: 'در چهار وضعیت اجرایی' },
]

/*
 * The timeline photographs settle into place as they come into view — a short
 * fade and a 3% scale, once per image, and nothing after that. Deliberately
 * small: the client asked for motion that is felt rather than noticed, and the
 * archival frames do not survive being thrown around. `prefers-reduced-motion`
 * drops it entirely (the CSS below), and with no IntersectionObserver the
 * images simply start visible.
 */
/*
 * Reveal-on-arrival for the sections that are otherwise static — the
 * honours, the board cards, the vision columns. An IntersectionObserver adds
 * `is-in` once and unobserves; these elements have no reactive class binding,
 * so writing to `classList` directly is safe.
 *
 * The timeline rows deliberately do NOT use this. They carry a reactive
 * `:class` (the passed state below), and Vue rewrites the class attribute on
 * every re-render — which silently stripped an imperatively-added `is-in` and
 * left four of the five milestones invisible as the reader scrolled past
 * them. Their reveal is reactive state instead, measured in the same pass as
 * everything else on the spine.
 */
const reveals = ref<HTMLElement[]>([])
function captureReveal(el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLElement && !reveals.value.includes(el)) reveals.value.push(el)
}
onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    reveals.value.forEach(el => el.classList.add('is-in'))
    return
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      e.target.classList.add('is-in')
      io.unobserve(e.target)
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 })
  reveals.value.forEach(el => io.observe(el))
  onBeforeUnmount(() => io.disconnect())
})

/*
 * The spine draws itself as the reader descends, and the milestones light up
 * as they are reached.
 *
 * One measurement pass, in a `requestAnimationFrame`, produces all three
 * pieces of state, so a fast scroll costs one layout read per frame rather
 * than one per element per scroll event:
 *
 *   spineProgress — the share of the timeline above the middle of the
 *                   viewport, painted as a second line over the static one.
 *                   An unfinished line is the reason to keep going.
 *   shown[i]      — has this row arrived? Latches true; never goes back.
 *   passed[i]     — is this milestone behind the reader? Its pin fills in,
 *                   which is what makes the spine a route with stations on
 *                   it rather than a decorated rule.
 *
 * `prefers-reduced-motion` resolves all three to their finished state and
 * never registers the listener.
 */
const spineEl = ref<HTMLElement | null>(null)
const spineProgress = ref(0)
const shown = ref<boolean[]>(aboutMilestones.map(() => false))
const passed = ref<boolean[]>(aboutMilestones.map(() => false))

const rowEls = ref<(HTMLElement | null)[]>(aboutMilestones.map(() => null))
function captureRow(el: Element | ComponentPublicInstance | null, i: number) {
  rowEls.value[i] = el instanceof HTMLElement ? el : null
}

onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    spineProgress.value = 1
    shown.value = aboutMilestones.map(() => true)
    passed.value = aboutMilestones.map(() => true)
    return
  }

  let frame = 0
  const measure = () => {
    frame = 0
    const vh = window.innerHeight
    const mid = vh * 0.52

    const el = spineEl.value
    if (el) {
      const r = el.getBoundingClientRect()
      spineProgress.value = Math.min(1, Math.max(0, (mid - r.top) / r.height))
    }

    rowEls.value.forEach((row, i) => {
      if (!row) return
      const r = row.getBoundingClientRect()
      // arrived once its top edge is inside the lower 88% of the viewport
      if (!shown.value[i] && r.top < vh * 0.88 && r.bottom > 0) shown.value[i] = true
      passed.value[i] = r.top + r.height / 2 <= mid
    })
  }
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(measure)
  }

  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })
})

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
      <img :src="aboutHero.image.src" alt="" class="absolute inset-0 size-full object-cover opacity-80">
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

        <!--
          2 — the vertical timeline, as drawn in the approved design: a central
          spine with a node pin on it, and the content card and the photograph
          alternating sides down the page (ADR-016).

          The spine, the pins and the alternation are `md:` and up. On a phone
          the design's own markup collapses to a single stacked column — the
          card above its photograph — which is what `flex-col` gives here; the
          spine would have nothing to run between.
        -->
        <div class="mt-20">
          <div class="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h3 class="text-headline-sm font-headline-sm text-ink">از پارس سازه ۱۳۳۰ تا امروز</h3>
            <!-- The scroll cue fades out once the spine has started drawing. -->
            <p
              class="tl-cue flex items-center gap-2 text-label-md text-secondary"
              :class="spineProgress > 0.04 && 'is-gone'"
            >
              <AppIcon name="expand_more" class="tl-cue-arrow text-primary-container" />
              برای مرور خط زمان اسکرول کنید
            </p>
          </div>

          <div ref="spineEl" class="relative">
            <!-- static spine -->
            <div class="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-border md:block" aria-hidden="true" />
            <!--
              The same spine, drawn to the reader's position, with a soft tip
              at the leading edge so the line reads as being drawn by
              something rather than simply growing.
            -->
            <div
              class="absolute left-1/2 top-0 hidden w-px origin-top -translate-x-1/2 bg-primary-container md:block"
              aria-hidden="true"
              :style="{ height: `${spineProgress * 100}%` }"
            >
              <span v-if="spineProgress > 0.01 && spineProgress < 0.995" class="tl-tip" />
            </div>

            <ol class="space-y-24 md:space-y-32">
              <li
                v-for="(m, i) in aboutMilestones"
                :key="m.id"
                :ref="(el) => captureRow(el, i)"
                class="reveal tl-row relative flex flex-col items-center justify-between gap-12"
                :class="[
                  i % 2 === 0 ? 'md:flex-row tl-row--a' : 'md:flex-row-reverse tl-row--b',
                  shown[i] && 'is-in',
                  (passed[i] || i === aboutMilestones.length - 1) && 'is-passed',
                ]"
              >
                <!-- node pin on the spine; the last one is filled -->
                <!--
                  The station on the line. Hollow while it is ahead of the
                  reader, filled once passed — so the spine is a progress
                  indicator, not decoration. ۱۴۰۳ is filled from the start:
                  it is the present, and the story ends there.
                -->
                <span
                  aria-hidden="true"
                  class="tl-pin absolute left-1/2 z-10 hidden size-6 items-center justify-center border-2 border-primary-container md:flex"
                >
                  <span class="tl-pin-core size-2 bg-primary-container" />
                  <span class="tl-pin-ring" />
                </span>

                <!-- content card -->
                <div class="tl-card w-full text-right md:w-[45%]" :class="i % 2 === 0 && 'order-2 md:order-1'">
                  <span class="tl-year mb-2 block text-headline-md font-headline-md tracking-tight text-primary-container">{{ m.year }}</span>
                  <h4 class="mb-3 text-headline-sm font-headline-sm text-ink">{{ m.title }}</h4>
                  <p class="text-body-md leading-relaxed text-on-surface-variant">{{ m.body }}</p>

                  <p
                    class="tl-tag mt-4 inline-flex items-center gap-2 px-3 py-1 text-label-md font-label-md"
                    :class="m.tagTone === 'filled'
                      ? 'bg-primary-container text-surface-container-lowest'
                      : 'border border-border bg-surface text-ink'"
                  >
                    <span
                      class="size-2"
                      :class="{
                        'bg-ink': m.tagTone === 'ink',
                        'bg-primary-container': m.tagTone === 'primary',
                        'bg-brand-blue-deep': m.tagTone === 'deep',
                        'bg-status-success': m.tagTone === 'success',
                        'bg-surface-container-lowest': m.tagTone === 'filled',
                      }"
                    />
                    {{ m.tag }}
                  </p>

                  <p v-if="m.placeholder" class="mt-3 text-label-md text-status-error">در انتظار سند آرشیوی</p>
                </div>

                <!-- photograph -->
                <div
                  class="tl-photo w-full overflow-hidden rounded-md border border-border bg-surface md:w-[45%]"
                  :class="i % 2 === 0 && 'order-1 md:order-2'"
                >
                  <img
                    :src="m.image.src"
                    alt=""
                    loading="lazy"
                    class="reveal-img tl-img h-80 w-full object-cover"
                    :class="m.archival ? 'grayscale contrast-125' : m.contrast && 'contrast-110'"
                  >
                </div>
              </li>
            </ol>
          </div>
        </div>

        <!--
          Value chain. The client's assets for this section are line icons,
          not photographs, so it is an icon strip — a photo frame cropped
          around a 480px line drawing would be a worse version of both.
        -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">زنجیره کامل ارزش</h3>
          <ol class="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
            <li
              v-for="(c, i) in aboutChain"
              :key="c.id"
              class="group flex flex-col items-center bg-surface-container-lowest p-6 text-center transition-colors hover:bg-brand-tint/40"
            >
              <span class="mb-4 flex size-16 items-center justify-center">
                <img
                  :src="c.icon"
                  alt=""
                  loading="lazy"
                  class="max-h-16 w-auto max-w-full object-contain"
                >
              </span>
              <span class="text-label-md text-primary-container">{{ faDigits(i + 1) }}</span>
              <span class="mt-1 text-body-lg font-bold text-ink">{{ c.label }}</span>
              <span class="mt-2 text-label-md leading-relaxed text-secondary">{{ c.text }}</span>
            </li>
          </ol>
        </div>

        <!-- 3 — delivered work -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">{{ deliveredTitle }}</h3>
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

        <!--
          4 — افتخارات. The three objects the client supplied, shown as objects.
          No titles: `honorsData.ts` holds invented ones, and captioning a real
          award with a made-up name is worse than leaving it uncaptioned
          (see aboutHonors in app/utils/aboutPageData.ts).
        -->
        <div class="mt-20">
          <h3 class="mb-6 text-headline-sm font-headline-sm text-ink">افتخارات</h3>
          <ul class="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <li
              v-for="h in aboutHonors"
              :key="h.id"
              :ref="captureReveal"
              class="reveal flex items-center justify-center rounded-md border border-border bg-surface-container-lowest p-8"
            >
              <img :src="h.image.src" :alt="h.image.alt" loading="lazy" class="reveal-img h-56 w-auto max-w-full object-contain">
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
                <CompanyMark :company="c" :size="80" />
              </span>
              <span class="flex items-center justify-between border-t border-border pt-3 text-body-sm font-bold text-ink">{{ c.name }}<AppIcon name="arrow_back" class="text-primary-container" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!--
      #board. Three people rather than ten, so the five-up grid of small
      portrait cards is gone: each one gets a wide card with the photograph
      beside the name. The portraits are 235×200 landscape frames, which is
      why the frame is 4:3 and anchored to the top — a 4:5 portrait crop cut
      the tops off the heads.
    -->
    <section id="board" class="scroll-mt-20 bg-ink py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead tone="dark" eyebrow="راهبری" title="هیات‌مدیره و مدیران ارشد" aside="تیم اجرایی هلدینگ." />
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article
            v-for="m in aboutBoard"
            :key="m.slug"
            :ref="captureReveal"
            class="reveal group overflow-hidden rounded-lg bg-surface-container-lowest"
          >
            <div class="aspect-[4/3] overflow-hidden bg-surface-alt">
              <img
                :src="m.image.src"
                :alt="m.image.alt"
                loading="lazy"
                class="reveal-img size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              >
            </div>
            <div class="border-t-4 border-primary-container p-6">
              <h3 class="text-headline-sm font-headline-sm text-ink">{{ m.name }}</h3>
              <p class="mt-2 text-label-lg font-bold text-primary-container">{{ m.role }}</p>
              <p class="mt-4 flex items-start gap-2 text-body-sm leading-relaxed text-secondary">
                <AppIcon name="school" class="mt-0.5 shrink-0 text-outline" />
                <span>{{ m.education }}</span>
              </p>
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
        <SectionHead eyebrow="چشم‌انداز" title="چشم‌انداز و حاکمیت شرکتی" />
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <article v-for="p in aboutPillars" :key="p.id" :ref="captureReveal" class="reveal">
            <div
              class="mb-5 aspect-[4/3] overflow-hidden rounded-md"
              :class="p.mark ? 'flex items-center justify-center border border-border bg-surface p-10' : 'bg-surface-alt'"
            >
              <img
                :src="p.image.src"
                :alt="p.image.alt"
                loading="lazy"
                class="reveal-img"
                :class="p.mark ? 'max-h-full w-auto max-w-full object-contain' : 'size-full object-cover'"
              >
            </div>
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

<style scoped>
/*
  Motion on this page. Everything below fires once, as its element arrives,
  and `prefers-reduced-motion` removes it rather than shortening it. The only
  scroll-linked piece is the spine, which is drawn in the template from
  `spineProgress` and also frozen by the media query (via the script).

  The timeline is the one place where the motion carries meaning rather than
  decoration: the card and its photograph arrive from opposite sides of the
  spine, which is exactly the alternation the layout is built on, and the pin
  lands on the line between them.
*/
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 700ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal .reveal-img {
  transform: scale(1.03);
  transition: transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.is-in {
  opacity: 1;
  transform: none;
}

.reveal.is-in .reveal-img {
  transform: scale(1);
}

/* --- timeline row: card and photograph converge on the spine ------------ */
/*
  Horizontal offsets are logical-property-safe because they are transforms,
  not margins — but the page is RTL, so `tl-row--a` (card on the visual left)
  and `tl-row--b` are mirrored deliberately rather than by `left`/`right`.
  Below `md` the rows stack and only the vertical lift applies.
*/
@media (min-width: 768px) {
  .tl-row .tl-card,
  .tl-row .tl-photo {
    transition: opacity 800ms ease-out, transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
    opacity: 0;
  }

  .tl-row--a .tl-card { transform: translateX(-28px); }
  .tl-row--a .tl-photo { transform: translateX(28px); }
  .tl-row--b .tl-card { transform: translateX(28px); }
  .tl-row--b .tl-photo { transform: translateX(-28px); }

  .tl-row.is-in .tl-card,
  .tl-row.is-in .tl-photo {
    opacity: 1;
    transform: none;
  }

  /* the photograph follows the card by a beat, so the pair reads as a pair */
  .tl-row .tl-photo { transition-delay: 120ms; }
}

/* --- the station on the line ------------------------------------------- */
/*
  `left: 50%` puts the pin's edge on the spine; -50% centres it. The Tailwind
  translate utility is deliberately absent from the element so this one
  declaration owns the transform and the two cannot fight.
*/
.tl-pin {
  background: var(--color-white);
  transform: translateX(-50%) scale(0.5);
  opacity: 0;
  transition:
    opacity 400ms ease-out 260ms,
    transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 260ms,
    background-color 500ms ease;
}

.tl-row.is-in .tl-pin {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

/* passed: the station fills in behind the reader */
.tl-row.is-passed .tl-pin {
  background: var(--color-primary);
}

.tl-pin-core {
  transition: background-color 500ms ease;
}

.tl-row.is-passed .tl-pin-core {
  background: var(--color-white);
}

/*
  One ring, once, as the pin lands — the only flourish on the page, and the
  thing that makes arriving at a milestone feel like arriving somewhere. It
  runs on a pseudo-free span so nothing else has to share a transform.
*/
.tl-pin-ring {
  position: absolute;
  inset: -2px;
  border: 2px solid var(--color-primary);
  opacity: 0;
}

.tl-row.is-in .tl-pin-ring {
  animation: tl-ring 900ms cubic-bezier(0.16, 1, 0.3, 1) 300ms 1;
}

@keyframes tl-ring {
  0% { opacity: 0.55; transform: scale(1); }
  100% { opacity: 0; transform: scale(2.6); }
}

/* the leading edge of the drawn spine */
.tl-tip {
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 50%;
  inline-size: 7px;
  block-size: 7px;
  margin-inline-start: -3px;
  margin-block-end: -3px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 18%, transparent);
}

/*
  The photograph pulls into focus rather than simply fading — a short blur
  that resolves as it settles. It is the one gesture that suits archival
  material: the frame arrives the way a memory does.
*/
.tl-img {
  filter: blur(7px);
  transition: filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
}

.tl-row.is-in .tl-img {
  filter: blur(0);
}

/* the archival frames keep their grayscale; the utility sets it after this */
.tl-img.grayscale {
  filter: blur(7px) grayscale(1) contrast(1.25);
}

.tl-row.is-in .tl-img.grayscale {
  filter: blur(0) grayscale(1) contrast(1.25);
}

/* the tag chip follows the body in */
.tl-tag {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 500ms ease-out 320ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) 320ms;
}

.tl-row.is-in .tl-tag {
  opacity: 1;
  transform: none;
}

/* scroll cue — a slow nudge, gone the moment the reader takes the hint */
.tl-cue {
  transition: opacity 400ms ease-out;
}

.tl-cue.is-gone {
  opacity: 0;
}

.tl-cue-arrow {
  animation: tl-nudge 2.2s ease-in-out infinite;
}

@keyframes tl-nudge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

/* The chain icons and the vision mark are contained, not cropped. */

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal .reveal-img,
  .tl-row .tl-card,
  .tl-row .tl-photo,
  .tl-year,
  .tl-tag {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .tl-pin {
    opacity: 1;
    transform: translateX(-50%);
    transition: none;
  }

  .tl-img,
  .tl-img.grayscale {
    filter: none;
    transition: none;
  }

  .tl-img.grayscale { filter: grayscale(1) contrast(1.25); }

  .tl-pin-ring { animation: none; }
  .tl-cue-arrow { animation: none; }
  .tl-tip { display: none; }
}
</style>
