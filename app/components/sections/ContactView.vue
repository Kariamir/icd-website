<!--
  /contact — «تماس با ما». Built in the approved Stitch language (no Stitch
  design existed for this route). Replaces the former "contact the managers"
  page: channels, offices, a short callback form, and routes to the right
  desk (sales consultation, shareholders, complaints, careers). The CEO
  channel was retired with the CEO page (ADR-010).
-->
<script setup lang="ts">
import { companyContact } from '~/utils/routes'
import { subsidiaries } from '~/utils/catalog'
import type { IconName } from '~/utils/icons'

const desks: { icon: IconName, title: string, text: string, href: string, cta: string }[] = [
  { icon: 'real_estate_agent', title: 'مشاوره خرید و پیش‌فروش', text: 'انتخاب واحد، شرایط پرداخت و رزرو بازدید.', href: '/sales/consultation', cta: 'درخواست مشاوره' },
  { icon: 'account_balance', title: 'امور سهامداران', text: 'سود سهام، مجامع و اطلاعیه‌های کدال.', href: '/ir/faq', cta: 'پرسش‌های سهامداران' },
  { icon: 'gavel', title: 'شکایات و پیشنهادات', text: 'ثبت محرمانه با کد رهگیری.', href: '/complaints', cta: 'ثبت در سامانه' },
  { icon: 'badge', title: 'امور اداری و منابع انسانی', text: 'ارسال رزومه و فرصت‌های شغلی.', href: '/hr', cta: 'امور اداری و منابع انسانی' },
]

const offices = computed(() => [
  { city: 'تهران', name: 'دفتر مرکزی هلدینگ', address: companyContact.address, phone: companyContact.phone },
  ...[...new Set(subsidiaries.map(c => c.city))].filter(c => c !== 'تهران').map(city => ({
    city,
    name: subsidiaries.filter(c => c.city === city).map(c => c.name).join('، '),
    address: `${city} — نشانی دقیق پس از تایید درج می‌شود`,
    phone: '',
  })),
])
</script>

<template>
  <div>
    <PageHero
      image="/img/projects/ghadir-office-tehran-7.jpg"
      title="تماس با ما"
      subtitle="پاسخگویی در روزهای کاری؛ برای هر موضوع، مسیر مستقیم همان واحد."
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'تماس با ما' }]"
      size="sm"
    />

    <!-- Channels -->
    <section class="bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-6 px-space-lg md:grid-cols-3 md:px-margin">
        <a :href="companyContact.phoneHref" class="group rounded-lg border border-border p-8 transition-colors hover:border-primary-container">
          <span class="mb-6 flex size-12 items-center justify-center rounded-md bg-brand-tint text-primary-container"><AppIcon name="call" /></span>
          <p class="text-label-md text-secondary">مرکز تماس</p>
          <p class="mt-1 text-headline-sm font-headline-sm text-ink group-hover:text-primary-container">{{ companyContact.phone }}</p>
          <p class="mt-2 text-body-sm text-secondary">{{ companyContact.hours }}</p>
        </a>
        <a :href="`mailto:${companyContact.email}`" class="group rounded-lg border border-border p-8 transition-colors hover:border-primary-container">
          <span class="mb-6 flex size-12 items-center justify-center rounded-md bg-brand-tint text-primary-container"><AppIcon name="mail" /></span>
          <p class="text-label-md text-secondary">پست الکترونیک</p>
          <p class="mt-1 text-headline-sm font-headline-sm text-ink group-hover:text-primary-container" dir="ltr">{{ companyContact.email }}</p>
          <p class="mt-2 text-body-sm text-secondary">پاسخ در کمتر از ۲۴ ساعت کاری</p>
        </a>
        <div class="rounded-lg border border-border p-8">
          <span class="mb-6 flex size-12 items-center justify-center rounded-md bg-brand-tint text-primary-container"><AppIcon name="location_on" /></span>
          <p class="text-label-md text-secondary">دفتر مرکزی</p>
          <p class="mt-1 text-body-lg font-bold text-ink">{{ companyContact.address }}</p>
        </div>
      </div>
    </section>

    <!-- Desks -->
    <section class="border-y border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="واحدهای پاسخگو" title="موضوع شما با کدام واحد است؟" />
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink v-for="d in desks" :key="d.href" :to="d.href" class="group flex flex-col rounded-lg border border-border bg-surface-container-lowest p-6 transition-colors hover:border-primary-container">
            <span class="mb-5 flex size-11 items-center justify-center rounded-sm bg-surface text-primary-container"><AppIcon :name="d.icon" /></span>
            <h3 class="mb-2 text-body-lg font-bold text-ink">{{ d.title }}</h3>
            <p class="mb-6 text-body-sm text-secondary">{{ d.text }}</p>
            <span class="mt-auto flex items-center gap-1 text-label-lg font-bold text-primary-container">{{ d.cta }} <AppIcon name="arrow_back" class="transition-transform group-hover:-translate-x-1" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Callback form + map -->
    <section class="bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-space-lg md:px-margin lg:grid-cols-2">
        <div>
          <SectionHead title="درخواست تماس" aside="شماره خود را بگذارید؛ همکاران ما تماس می‌گیرند." />
          <QuickLeadForm subject="contact" submit-label="درخواست تماس" />
        </div>
        <div class="relative min-h-[320px] overflow-hidden rounded-lg">
          <img src="/img/projects/ghadir-office-tehran-16.jpg" alt="" class="absolute inset-0 size-full object-cover">
          <div class="absolute bottom-5 right-5 max-w-xs rounded-md bg-surface-container-lowest p-5">
            <p class="flex items-center gap-2 text-label-lg font-bold text-ink"><AppIcon name="location_on" class="text-primary-container" />دفتر مرکزی ثاخت</p>
            <p class="mt-1 text-body-sm text-secondary">{{ companyContact.address }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Offices -->
    <section class="border-t border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="دفاتر" title="دفاتر گروه در سراسر کشور" />
        <ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="o in offices" :key="o.city" class="rounded-md border border-border bg-surface-container-lowest p-6">
            <p class="mb-1 text-headline-sm font-headline-sm text-ink">{{ o.city }}</p>
            <p class="mb-3 text-label-md text-primary-container">{{ o.name }}</p>
            <p class="text-body-sm text-secondary">{{ o.address }}</p>
            <p v-if="o.phone" class="mt-2 text-body-sm font-bold text-ink">{{ o.phone }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
