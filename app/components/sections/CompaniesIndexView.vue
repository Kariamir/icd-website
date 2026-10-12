<!--
  /companies — ported from stitch_project_detail_page_template/companies/
  (ADR-013). Tiles come from the company catalog (ADR-015) and each opens
  /companies/[slug] (sitemap §5.2).
-->
<script setup lang="ts">
import { companies, projectsByCompany } from '~/utils/catalog'
import { ph } from '~/utils/media'
import { faDigits, faIndex } from '~/utils/format'
</script>

<template>
  <div>
    <PageHero
      :image="ph('skyline', 1)"
      title="شرکت‌های تابعه و خانواده ثاخت"
      subtitle="بازوهای تخصصی سرمایه‌گذاری، پیمانکاری و مهندسی در گستره ملی"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'درباره ثاخت', href: '/about' }, { label: 'شرکت‌های تابعه' }]"
    />

    <section class="bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="پرتفوی و شرکت‌ها" title="شبکه شرکت‌های تابعه" :aside="`${faDigits(companies.length)} نهاد تخصصی عمران، انبوه‌سازی و خدمات فنی مهندسی`" />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(c, i) in companies"
            :key="c.slug"
            :to="`/companies/${c.slug}`"
            class="group flex h-[340px] flex-col justify-between rounded-lg border border-border bg-surface p-7 transition-colors duration-150 hover:border-primary-container hover:bg-surface-container-lowest"
          >
            <div class="flex items-start justify-between">
              <span class="text-label-md text-secondary">{{ faIndex(i + 1) }}</span>
              <span class="rounded-pill border border-border bg-surface-container-lowest px-3 py-0.5 text-label-md font-bold" :class="c.isListed ? 'text-primary-container' : 'text-secondary'">{{ c.tag }}</span>
            </div>
            <div class="mx-auto my-auto flex size-28 flex-col items-center justify-center rounded-md border border-border bg-surface-container-lowest px-2 text-center transition-colors group-hover:border-primary-container">
              <span class="text-2xl font-extrabold leading-tight text-ink group-hover:text-primary-container">{{ c.mark }}</span>
              <span class="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-secondary">{{ c.markSub }}</span>
            </div>
            <div class="mt-auto border-t border-border pt-4">
              <h3 class="text-body-lg font-bold text-ink transition-colors group-hover:text-primary-container">{{ c.name }}</h3>
              <div class="mt-2 flex items-center justify-between gap-2">
                <span class="text-label-md text-secondary">{{ c.specialty }}</span>
                <span class="flex shrink-0 items-center gap-1 text-label-md text-outline">{{ faDigits(projectsByCompany(c.slug).length) }} پروژه <AppIcon name="arrow_back" class="text-primary-container transition-transform group-hover:-translate-x-1" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="mt-16 flex flex-col items-center justify-between gap-6 rounded-lg border border-border bg-surface p-8 md:flex-row">
          <div class="flex items-center gap-4">
            <span class="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-container text-surface-container-lowest"><AppIcon name="domain" /></span>
            <div>
              <p class="text-body-lg font-bold text-ink">هم‌افزایی فنی و زنجیره ارزش کامل ساختمانی</p>
              <p class="text-body-sm text-secondary">همه شرکت‌های خانواده ثاخت تحت حاکمیت شرکتی یکپارچه فعالیت می‌کنند.</p>
            </div>
          </div>
          <NuxtLink to="/about#subsidiaries" class="inline-flex h-12 shrink-0 items-center gap-2 rounded-pill border border-primary-container px-6 text-label-lg font-label-lg text-primary-container transition-colors hover:bg-brand-tint">
            ساختار گروه در درباره ثاخت <AppIcon name="arrow_back" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
