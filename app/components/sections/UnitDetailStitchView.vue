<!--
  /sales/units/[id] — ported from stitch_project_detail_page_template/
  sales_units_id/ (ADR-013), driven by the catalog (ADR-015). The design's
  tab script and alert()-based form are reimplemented in Vue.
-->
<script setup lang="ts">
import { getProject, getCompany, priceLabel, unitStatus, unitsByProject, type Unit } from '~/utils/catalog'
import { ph } from '~/utils/media'
import { faArea, faDigits, faNumber } from '~/utils/format'
import type { IconName } from '~/utils/icons'

const props = defineProps<{ unit: Unit }>()
const project = computed(() => getProject(props.unit.project)!)
const company = computed(() => getCompany(project.value.company)!)
const siblings = computed(() => unitsByProject(props.unit.project).filter(u => u.id !== props.unit.id))

const rooms = computed(() => {
  const a = props.unit.areaSqm
  if (props.unit.usage !== 'مسکونی') {
    return [
      { name: 'فضای کار باز', area: a * 0.62 },
      { name: 'اتاق جلسات', area: a * 0.16 },
      { name: 'سرویس و آبدارخانه', area: a * 0.1 },
      { name: 'لابی ورودی', area: a * 0.12 },
    ]
  }
  return [
    { name: 'پذیرایی و نشیمن', area: a * 0.34 },
    { name: 'اتاق خواب مستر', area: a * 0.16 },
    { name: 'آشپزخانه و لاندری', area: a * 0.12 },
    { name: 'تراس', area: a * 0.07 },
  ]
})

type Tab = 'arch' | 'mep' | 'amenities' | 'legal'
const tab = ref<Tab>('arch')
const tabs: { key: Tab, label: string, icon: IconName }[] = [
  { key: 'arch', label: 'معماری و فضا', icon: 'architecture' },
  { key: 'mep', label: 'سازه و تاسیسات', icon: 'precision_manufacturing' },
  { key: 'amenities', label: 'مشاعات و پارکینگ', icon: 'local_parking' },
  { key: 'legal', label: 'سند و شرایط پرداخت', icon: 'gavel' },
]
const tabCards = computed<Record<Tab, { icon: IconName, title: string, value: string, note: string }[]>>(() => ({
  arch: [
    { icon: 'square_foot', title: 'متراژ', value: faArea(props.unit.areaSqm), note: 'مطابق دستورالعمل تفکیک اداره ثبت اسناد.' },
    { icon: 'king_bed', title: props.unit.bedrooms ? 'اتاق خواب' : 'کاربری', value: props.unit.bedrooms ? `${faDigits(props.unit.bedrooms)} خواب` : props.unit.usage, note: 'پلان بدون ستون مزاحم در فضای اصلی.' },
    { icon: 'weekend', title: 'جهت و نور', value: props.unit.facing, note: 'پنجره‌های قدی با شیشه دوجداره.' },
    { icon: 'deck', title: 'طبقه', value: props.unit.floor === 0 ? 'همکف' : `طبقه ${faDigits(props.unit.floor)}`, note: `از ${faDigits(project.value.floors)} طبقه پروژه.` },
  ],
  mep: [
    { icon: 'engineering', title: 'سازه', value: 'بتن‌آرمه با دیوار برشی', note: 'طراحی لرزه‌ای مطابق آیین‌نامه ۲۸۰۰.' },
    { icon: 'thermostat', title: 'سرمایش و گرمایش', value: 'فن‌کویل مرکزی', note: 'کنترل مستقل دما در هر فضا.' },
    { icon: 'elevator', title: 'آسانسور', value: 'پرسرعت با کارت هوشمند', note: 'دسترسی کنترل‌شده به طبقات.' },
    { icon: 'security', title: 'ایمنی', value: 'اعلام و اطفای حریق خودکار', note: 'مطابق مبحث سوم مقررات ملی ساختمان.' },
  ],
  amenities: [
    { icon: 'local_parking', title: 'پارکینگ', value: props.unit.areaSqm > 200 ? '۲ جای پارک' : '۱ جای پارک', note: 'پارکینگ مسقف با شارژ خودرو برقی.' },
    { icon: 'inventory_2', title: 'انباری', value: 'دارد', note: 'در طبقات زیرین.' },
    { icon: 'groups', title: 'مشاعات', value: 'لابی و فضای جمعی', note: 'مدیریت ساختمان یکپارچه.' },
    { icon: 'health_and_safety', title: 'نگهبانی', value: '۲۴ ساعته', note: 'دوربین مداربسته در مشاعات.' },
  ],
  legal: [
    { icon: 'gavel', title: 'وضعیت سند', value: props.unit.status === 'pre-sale' ? 'قرارداد پیش‌فروش رسمی' : 'سند تک‌برگ', note: 'ثبت در سامانه املاک و اسکان.' },
    { icon: 'payments', title: 'قیمت کل', value: priceLabel(props.unit.price), note: 'قیمت نمونه است و پس از استعلام قطعی می‌شود.' },
    { icon: 'calendar_month', title: 'پرداخت', value: props.unit.status === 'pre-sale' ? 'مرحله‌ای تا تحویل' : 'نقد یا اقساط ۱۲ ماهه', note: 'جدول دقیق در پیش‌نویس قرارداد.' },
    { icon: 'verified_user', title: 'ضمانت', value: 'ضمانت‌نامه حسن انجام کار', note: `صادره از ${company.value.name}.` },
  ],
}))
</script>

<template>
  <div class="mx-auto w-full max-w-[1440px] px-space-lg py-10 md:px-margin">
    <NuxtLink :to="`/projects/${project.slug}`" class="mb-8 inline-flex items-center gap-2 text-body-md font-semibold text-primary-container hover:text-brand-hover">
      <AppIcon name="arrow_forward" />بازگشت به صفحه {{ project.name }}
    </NuxtLink>

    <!-- Hero & gallery -->
    <section class="mb-16 rounded-lg border border-border bg-surface-container-lowest p-6 md:mb-20 md:p-10">
      <div class="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
        <div>
          <div class="mb-3 flex flex-wrap items-center gap-3">
            <span class="rounded-pill bg-brand-tint px-3 py-1 text-label-md font-bold text-primary-container">{{ unitStatus[unit.status] }}</span>
            <span class="font-mono text-label-md text-secondary" dir="ltr">{{ unit.ref }}</span>
          </div>
          <h1 class="text-headline-lg font-headline-lg text-ink">{{ unit.title }}</h1>
          <p class="mt-3 max-w-3xl text-body-lg leading-relaxed text-on-surface-variant">{{ project.name }} — {{ project.city }}، {{ project.district }}</p>
        </div>
        <div class="flex shrink-0 flex-col lg:items-end">
          <span class="text-label-md text-secondary">قیمت کل</span>
          <span class="text-headline-lg font-headline-lg text-ink">{{ priceLabel(unit.price) }}</span>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2">
        <div class="overflow-hidden rounded-md md:col-span-3 md:row-span-2"><img :src="unit.image" :alt="unit.title" class="aspect-[16/10] size-full object-cover"></div>
        <div class="overflow-hidden rounded-md"><img :src="ph('interior', 2)" alt="" class="aspect-[4/3] size-full object-cover"></div>
        <div class="overflow-hidden rounded-md"><img :src="project.image" alt="" class="aspect-[4/3] size-full object-cover"></div>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-y-4 border-t border-border pt-6 md:grid-cols-5">
        <div class="px-2"><div class="text-label-md text-secondary">متراژ</div><div class="mt-1 text-headline-sm font-headline-sm text-ink">{{ faArea(unit.areaSqm) }}</div></div>
        <div class="px-2"><div class="text-label-md text-secondary">{{ unit.bedrooms ? 'اتاق خواب' : 'کاربری' }}</div><div class="mt-1 text-headline-sm font-headline-sm text-ink">{{ unit.bedrooms ? `${faDigits(unit.bedrooms)} خواب` : unit.usage }}</div></div>
        <div class="px-2"><div class="text-label-md text-secondary">طبقه</div><div class="mt-1 text-headline-sm font-headline-sm text-ink">{{ unit.floor === 0 ? 'همکف' : faDigits(unit.floor) }}</div></div>
        <div class="px-2"><div class="text-label-md text-secondary">جهت</div><div class="mt-1 text-headline-sm font-headline-sm text-ink">{{ unit.facing }}</div></div>
        <div class="col-span-2 px-2 md:col-span-1"><div class="text-label-md text-secondary">قیمت هر متر</div><div class="mt-1 text-headline-sm font-headline-sm text-primary-container">{{ faNumber(Math.round(unit.price / 10 / unit.areaSqm / 1_000_000)) }} میلیون تومان</div></div>
      </div>
    </section>

    <!-- Floor plan -->
    <section class="mb-16 rounded-lg border border-border bg-surface-container-lowest p-6 md:mb-20 md:p-10">
      <SectionHead title="پلان معماری" aside="نقشه تیپ واحد؛ پلان رسمی پس از استعلام ارسال می‌شود." />
      <div class="overflow-hidden rounded-md border border-border bg-surface">
        <img :src="unit.plan" alt="پلان واحد" class="aspect-[16/9] w-full object-cover">
      </div>
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div v-for="r in rooms" :key="r.name" class="rounded-md border border-border bg-surface-container-low p-4">
          <span class="block text-label-md text-secondary">{{ r.name }}</span>
          <strong class="mt-1 block text-headline-sm font-headline-sm text-ink">{{ faNumber(r.area, 1) }} مترمربع</strong>
        </div>
      </div>
    </section>

    <!-- Tabbed specs -->
    <section class="mb-16 rounded-lg border border-border bg-surface-container-lowest p-6 md:mb-20 md:p-10">
      <SectionHead title="شناسنامه فنی و حقوقی واحد" />
      <div class="mb-8 flex gap-1 overflow-x-auto rounded-md bg-surface p-1 [scrollbar-width:none]" role="tablist">
        <button
          v-for="t in tabs" :key="t.key" type="button" role="tab" :aria-selected="tab === t.key"
          class="flex shrink-0 items-center gap-2 rounded-sm px-5 py-3 text-label-lg font-label-lg transition-colors"
          :class="tab === t.key ? 'bg-primary-container text-on-primary' : 'text-secondary hover:bg-surface-container-lowest hover:text-ink'"
          @click="tab = t.key"
        ><AppIcon :name="t.icon" />{{ t.label }}</button>
      </div>
      <div class="grid grid-cols-1 gap-5 md:grid-cols-2" role="tabpanel">
        <div v-for="c in tabCards[tab]" :key="c.title" class="flex items-start gap-4 rounded-md border border-border bg-surface-container-low p-6">
          <span class="flex size-12 shrink-0 items-center justify-center rounded-sm bg-primary-container/10 text-primary-container"><AppIcon :name="c.icon" /></span>
          <div>
            <span class="block text-label-md font-semibold text-secondary">{{ c.title }}</span>
            <strong class="mt-1 block text-headline-sm font-headline-sm text-ink">{{ c.value }}</strong>
            <p class="mt-2 text-body-sm leading-relaxed text-on-surface-variant">{{ c.note }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA + form -->
    <section id="consultation-form" class="mb-16 rounded-lg bg-primary-container p-8 text-surface-container-lowest md:mb-20 md:p-12">
      <h2 class="text-headline-md font-headline-md">استعلام قیمت و هماهنگی بازدید</h2>
      <p class="mb-8 mt-2 max-w-2xl text-body-md leading-relaxed text-surface-container-lowest/80">کارشناسان فروش پیش‌نویس قرارداد، جدول پرداخت و زمان بازدید از این واحد را با شما هماهنگ می‌کنند.</p>
      <QuickLeadForm :subject="`unit-${unit.id}`" tone="dark" submit-label="ثبت درخواست بازدید" />
    </section>

    <section v-if="siblings.length" class="mb-10">
      <SectionHead :title="`واحدهای دیگر ${project.name}`" />
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UnitTile v-for="u in siblings" :key="u.id" :unit="u" />
      </div>
    </section>
  </div>
</template>
