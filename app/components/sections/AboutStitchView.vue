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
import { aboutHero, aboutMilestones, aboutChain, aboutHonors, aboutFilm, ABOUT_FORM_SUBJECTS } from '~/utils/aboutPageData'
import { icdBoard, icdDeputies, icdExecutives, icdCommittees, boardSecretary, type CommitteeMember } from '~/utils/governanceData'
import { subsidiaries, projects } from '~/utils/catalog'
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
/*
 * The chair and the managing director come first. `lead` is a property of
 * the record, not a slice index, so a change of officers in
 * governanceData.ts reorders the page on its own.
 */
const boardOrdered = computed(() => [...icdBoard].sort((a, b) => Number(!!b.lead) - Number(!!a.lead)))

function committeeBadges(m: CommitteeMember): string[] {
  return [
    m.independent ? 'مستقل' : 'غیرمستقل',
    ...(m.financialExpert ? ['عضو مالی'] : []),
  ]
}

const deliveredOnly = computed(() => projects.filter(p => p.status === 'completed' || p.status === 'operating'))
const delivered = computed(() => (deliveredOnly.value.length ? deliveredOnly.value : projects).slice(0, 7))
const deliveredTitle = computed(() => (deliveredOnly.value.length ? 'کارنامه تحویل‌شده' : 'پروژه‌های گروه'))
const totalArea = projects.reduce((s, p) => s + (p.areaSqm ?? 0), 0)

const stats = [
  { value: '۴۰+', label: 'سال سابقه', note: 'از تاسیس ۱۳۶۴ و ریشه پارس سازه ۱۳۳۰' },
  { value: `${faDigits(Math.round(totalArea / 1000))} هزار`, label: 'مترمربع زیربنا', note: 'در پرتفوی پروژه‌های گروه' },
  { value: faDigits(subsidiaries.length), label: 'شرکت تخصصی تابعه', note: 'از طراحی تا بهره‌برداری' },
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
        <SectionHead eyebrow="تاریخچه" title="توسعه، فراتر از بتن و فولاد" />

        <!--
          1 — the brand film, played in place. The client supplied it as
          «فیلم شماره ۲» (ADR-024); before that this was a poster frame with a
          decorative play button and nothing behind it. `preload="none"` keeps
          the 18MB off every visit, and the poster carries the frame until
          someone presses play.
        -->
        <!--
          The frame is capped rather than full-bleed (ADR-026): at 1440px wide
          the film was the tallest thing on the page and pushed the timeline —
          which is what the section is for — below the fold.
        -->
        <div class="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-ink">
          <video
            v-if="aboutFilm.src"
            class="aspect-video w-full bg-ink object-cover"
            :poster="aboutFilm.poster"
            controls
            playsinline
            preload="none"
            :aria-label="aboutFilm.title"
          >
            <!-- VP9 first for the browsers that take it; H.264 for the rest. -->
            <source :src="aboutFilm.srcWebm" type="video/webm">
            <source :src="aboutFilm.src" type="video/mp4">
          </video>
          <div v-else class="relative aspect-video w-full">
            <img :src="aboutFilm.poster" alt="" class="size-full object-cover opacity-75">
            <div class="absolute inset-x-6 bottom-6 flex items-end justify-between text-surface-container-lowest">
              <span class="rounded-sm bg-ink/80 px-3 py-1 text-label-lg">{{ aboutFilm.title }}</span>
              <span class="rounded-sm bg-ink/80 px-3 py-1 text-label-md">فیلم پس از تولید بارگذاری می‌شود</span>
            </div>
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

          <div ref="spineEl" class="tl-track relative">
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
                  <span class="tl-year mb-2 block text-[44px] font-headline-xl leading-none tracking-tight text-primary-container md:text-[64px]">{{ m.year }}</span>
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

                <!--
                  The photograph is a disc, not a rectangle, with a large
                  accent circle offset behind it on the outer side — the
                  single change that gives the section its weight, and the one
                  the owner's reference is built on. The spine, the pins and
                  the alternation are untouched: this is the frame the
                  photograph sits in, not the structure it hangs from.
                -->
                <div
                  class="tl-photo relative flex w-full justify-center md:w-[45%]"
                  :class="i % 2 === 0 ? 'order-1 md:order-2 tl-photo--a' : 'tl-photo--b'"
                >
                  <span
                    aria-hidden="true"
                    class="tl-disc"
                    :class="i === aboutMilestones.length - 1 ? 'tl-disc--solid' : 'tl-disc--tint'"
                  />
                  <span class="tl-frame relative block overflow-hidden rounded-pill border-4 border-surface-container-lowest">
                    <img
                      :src="m.image.src"
                      alt=""
                      loading="lazy"
                      class="reveal-img tl-img size-full object-cover"
                      :class="m.archival ? 'grayscale contrast-125' : m.contrast && 'contrast-110'"
                    >
                  </span>
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
          4 — افتخارات. The three objects the client supplied, shown as
          objects: no titles, because `honorsData.ts` holds invented ones and
          captioning a real award with a made-up name is worse than leaving it
          uncaptioned (ADR-018).

          The band is dark for the same reason as the homepage's: these are
          gold, brass and navy objects, and on the page's flat grey they read
          as clip art. Full-bleed out of the section's container so it lands
          as a change of register at the end of the history, not another card.
        -->
        <div class="honors-band relative mt-24 overflow-hidden rounded-lg bg-ink px-6 py-16 md:px-12 md:py-20">
          <div class="relative">
            <div class="mb-10 flex flex-col items-center gap-3 text-center">
              <h3 class="inline-flex items-center gap-2 rounded-pill border border-surface-container-lowest/20 bg-surface-container-lowest/5 px-4 py-1.5 text-label-lg font-label-lg text-brand-tint">
                <AppIcon name="workspace_premium" />افتخارات
              </h3>
              <p class="max-w-xl text-body-md text-surface-dim">گواهینامه‌ها و تندیس‌های دریافتی گروه</p>
            </div>
            <ul class="mx-auto grid max-w-3xl grid-cols-3 gap-5 md:gap-8">
              <li
                v-for="h in aboutHonors"
                :key="h.id"
                :ref="captureReveal"
                class="reveal honors-plinth group relative flex items-end justify-center rounded-lg p-5 md:p-7"
              >
                <img
                  :src="h.image.src"
                  :alt="h.image.alt"
                  loading="lazy"
                  class="reveal-img relative h-28 w-auto max-w-full object-contain object-bottom drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:-translate-y-1.5 md:h-40"
                >
              </li>
            </ul>
          </div>
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
          <li v-for="c in subsidiaries" :key="c.slug" class="w-60 shrink-0 snap-start md:w-72">
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
        <SectionHead
          tone="dark"
          eyebrow="راهبری"
          title="هیات‌مدیره"
          :aside="`${faDigits(icdBoard.length)} عضو، منتخب مجمع عمومی عادی — برگرفته از افشای رسمی کدال`"
        />

        <!--
          One grid, one card size. The chair and the managing director come
          first and carry the accent rule; an earlier pass gave them
          full-height portraits and it pushed the other three members a whole
          viewport down the page, which is the opposite of what a board
          section is for — you should be able to see the board.

          Each card carries the legal shareholder the member represents and
          their موظف/غیرموظف status, because on a listed group's site both
          are disclosure rather than decoration.
        -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="m in boardOrdered" :key="m.slug" :ref="captureReveal" class="reveal">
            <PersonCard
              :name="m.name"
              :role="m.role"
              :image="m.image"
              :accent="m.lead"
              :note="m.represents ? `نماینده ${m.represents}` : undefined"
              :badges="[m.executive ? 'موظف' : 'غیرموظف']"
              :rows="[{ label: 'تحصیلات', value: m.education }]"
            />
          </div>
        </div>

        <!-- The board secretary sits below the board, at a smaller size. -->
        <div class="mt-7 max-w-sm">
          <PersonCard
            size="xs"
            :name="boardSecretary.name"
            :role="boardSecretary.role"
            :image="boardSecretary.image"
          />
        </div>

        <!-- معاونین — a step smaller than a board card, a step larger than a manager's -->
        <h3 class="mb-7 mt-16 flex items-center gap-3 text-headline-sm font-headline-sm text-surface-container-lowest">
          <span class="h-5 w-1.5 rounded-pill bg-brand-tint" />معاونین
        </h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PersonCard
            v-for="d in icdDeputies"
            :key="d.slug"
            size="sm"
            :name="d.name"
            :role="d.role"
            :image="d.image"
          />
        </div>

        <!-- Senior managers — the existing treatment, unchanged -->
        <h3 class="mb-7 mt-16 flex items-center gap-3 text-headline-sm font-headline-sm text-surface-container-lowest">
          <span class="h-5 w-1.5 rounded-pill bg-brand-tint" />مدیران ارشد
        </h3>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <PersonCard
            v-for="e in icdExecutives"
            :key="e.slug"
            size="xs"
            :name="e.name"
            :role="e.role"
            :image="e.image"
          />
        </div>
      </div>
    </section>

    <!-- #committees — membership and the secretary of each, from CODAL -->
    <section id="committees" class="scroll-mt-20 border-t border-border bg-surface py-24 md:py-32">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="حاکمیت شرکتی" title="کمیته‌های تخصصی">
          <NuxtLink to="/ir/financials?group=committee-reports#documents-archive" class="inline-flex h-10 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-4 text-label-lg text-primary-container hover:bg-brand-tint">گزارش عملکرد کمیته‌ها <AppIcon name="arrow_back" /></NuxtLink>
        </SectionHead>

        <div class="space-y-12">
          <article v-for="c in icdCommittees" :key="c.id" :id="`committee-${c.id}`" class="scroll-mt-24 rounded-lg border border-border bg-surface-container-lowest p-7 md:p-10">
            <div class="mb-7 flex flex-col gap-3 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 class="text-headline-md font-headline-md text-ink">{{ c.name }}</h3>
                <p class="mt-2 max-w-2xl text-body-md leading-relaxed text-secondary">{{ c.mandate }}</p>
              </div>
              <p class="shrink-0 text-label-md text-secondary">
                تاریخ تشکیل {{ c.formed }} · {{ faDigits(c.members.length) }} عضو
              </p>
            </div>

            <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <li v-for="m in c.members" :key="m.name">
                <PersonCard
                  size="xs"
                  :name="m.name"
                  :role="m.role"
                  :note="m.represents ? `نماینده ${m.represents}` : undefined"
                  :badges="committeeBadges(m)"
                  :rows="[{ label: 'تحصیلات', value: m.education }]"
                />
              </li>
            </ul>

            <!-- The secretary closes each committee, as the client asked -->
            <div class="mt-7 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-label-md text-secondary">دبیر کمیته</p>
              <p class="text-body-md text-ink">
                <span class="font-bold">{{ c.secretary.name }}</span>
                <span class="text-secondary"> — {{ c.secretary.title }} · {{ c.secretary.education }}</span>
              </p>
            </div>
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

/* --- the timeline's own surface ------------------------------------------ */
/*
  A sparse dot field behind the whole spine, masked so it fades at both ends.
  It gives the section a ground to sit on without competing with the
  photographs — the reference the owner supplied does the same job with a
  denser field in one corner.
*/
.tl-track::before {
  content: '';
  position: absolute;
  inset: -40px -24px;
  background-image: radial-gradient(color-mix(in srgb, var(--color-primary) 20%, transparent) 1.5px, transparent 1.5px);
  background-size: 26px 26px;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
  pointer-events: none;
}

/* --- the photograph, as a disc ------------------------------------------- */
/*
  A circle with a white rim, so the frame reads as a plate laid on the page
  rather than a cropped rectangle. Behind it sits a larger disc, offset to the
  *outer* side of the spine so each row opens away from the centre — tinted
  for the past, solid brand blue for ۱۴۰۳, which is the present and the thing
  the eye should land on last.

  The sizes are square and explicit because `rounded-pill` on a non-square box
  draws an ellipse, not a circle.
*/
.tl-frame {
  inline-size: min(78vw, 290px);
  block-size: min(78vw, 290px);
  flex: none;
  box-shadow: 0 24px 50px -26px rgb(4 28 44 / 55%);
}

.tl-disc {
  position: absolute;
  inline-size: min(86vw, 320px);
  block-size: min(86vw, 320px);
  inset-block-start: -22px;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.82);
  transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out;
}

.tl-disc--tint { background: color-mix(in srgb, var(--color-tint) 90%, transparent); }
.tl-disc--solid { background: var(--color-primary); }

.tl-row.is-in .tl-disc {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  .tl-frame { inline-size: 300px; block-size: 300px; }

  .tl-disc {
    inline-size: 340px;
    block-size: 340px;
    inset-block-start: -26px;
  }

  /* lean the disc away from the spine */
  .tl-photo--a .tl-disc { inset-inline-end: 4%; }
  .tl-photo--b .tl-disc { inset-inline-start: 4%; }
}

@media (min-width: 1280px) {
  .tl-frame { inline-size: 340px; block-size: 340px; }
  .tl-disc { inline-size: 390px; block-size: 390px; }
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

/* --- the achievements band ---------------------------------------------- */
/*
  Painted, not photographed: a brand wash, a sparse dot field, and a lit
  plinth under each object. The awards are gold, brass and navy — a dark
  ground is what makes those read.
*/
.honors-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(70% 120% at 50% 0%, color-mix(in srgb, var(--color-primary) 38%, transparent) 0%, transparent 62%),
    radial-gradient(50% 90% at 50% 110%, color-mix(in srgb, var(--color-primary) 22%, transparent) 0%, transparent 70%);
  pointer-events: none;
}

.honors-band::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgb(255 255 255 / 13%) 1px, transparent 1px);
  background-size: 22px 22px;
  mask-image: radial-gradient(75% 75% at 50% 50%, #000 20%, transparent 78%);
  pointer-events: none;
}

.honors-plinth {
  min-block-size: 175px;
  background: linear-gradient(to top, rgb(255 255 255 / 10%), rgb(255 255 255 / 3%));
  border: 1px solid rgb(255 255 255 / 10%);
  transition: background 400ms ease, border-color 400ms ease, opacity 700ms ease-out, transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.honors-plinth::after {
  content: '';
  position: absolute;
  inset-inline: 18%;
  inset-block-end: 10px;
  block-size: 10px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(255 255 255 / 28%), transparent);
}

.honors-plinth:hover {
  background: linear-gradient(to top, rgb(255 255 255 / 16%), rgb(255 255 255 / 5%));
  border-color: color-mix(in srgb, var(--color-tint) 45%, transparent);
}

@media (min-width: 768px) {
  .honors-plinth { min-block-size: 240px; }
}

@media (prefers-reduced-motion: reduce) {
  .honors-plinth img { transition: none; }

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

  .tl-disc {
    opacity: 1;
    transform: none;
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
