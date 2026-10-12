<script setup lang="ts">
/*
 * Site footer — sitemap §11: brand column, three link columns from
 * routes.ts, and «خانواده ثاخت» listing the eight subsidiaries from the
 * company catalog (each linked to its page). Styled after the approved
 * Stitch footer. Shared by every route via layouts/default.vue.
 */
import { footerColumns, legalNav, companyContact } from '~/utils/routes'
import { companies } from '~/utils/catalog'
</script>

<template>
  <footer class="bg-ink text-surface-container-lowest">
    <div class="mx-auto w-full max-w-[1440px] px-space-lg py-16 md:px-margin md:py-20">
      <div class="grid grid-cols-1 gap-10 border-b border-surface-container-lowest/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <!-- 1 — brand -->
        <div>
          <NuxtLink to="/" class="mb-5 flex items-center gap-3">
            <span class="flex size-10 items-center justify-center rounded-sm bg-primary-container text-headline-sm font-headline-sm">ث</span>
            <span class="text-headline-sm font-headline-sm">هلدینگ ساختمانی ثاخت</span>
          </NuxtLink>
          <p class="mb-6 max-w-xs text-body-sm leading-relaxed text-surface-dim">
            شرکت بین‌المللی توسعه ساختمان؛ توسعه پروژه‌های نهادی از ۱۳۶۴.
          </p>
          <ul class="space-y-2 text-body-sm text-surface-dim">
            <li class="flex items-start gap-2"><AppIcon name="location_on" class="mt-0.5 text-brand-tint" />{{ companyContact.address }}</li>
            <li class="flex items-center gap-2"><AppIcon name="call" class="text-brand-tint" /><a :href="companyContact.phoneHref" class="hover:text-brand-tint">{{ companyContact.phone }}</a></li>
            <li class="flex items-center gap-2"><AppIcon name="mail" class="text-brand-tint" /><a :href="`mailto:${companyContact.email}`" class="hover:text-brand-tint" dir="ltr">{{ companyContact.email }}</a></li>
          </ul>
        </div>

        <!-- 2–4 — link columns -->
        <div v-for="col in footerColumns" :key="col.heading">
          <h2 class="mb-5 text-label-lg font-label-lg text-surface-container-lowest">{{ col.heading }}</h2>
          <ul class="space-y-3 text-body-sm">
            <li v-for="item in col.items" :key="item.href">
              <NuxtLink :to="item.href" class="text-surface-dim transition-colors hover:text-brand-tint">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 5 — the eight subsidiaries -->
        <div>
          <h2 class="mb-5 text-label-lg font-label-lg text-surface-container-lowest">خانواده ثاخت</h2>
          <ul class="grid grid-cols-2 gap-2">
            <li v-for="c in companies" :key="c.slug">
              <NuxtLink
                :to="`/companies/${c.slug}`"
                :title="c.name"
                class="flex h-12 items-center justify-center rounded-sm border border-surface-container-lowest/15 px-2 text-center text-label-md font-bold text-surface-dim transition-colors hover:border-brand-tint hover:text-surface-container-lowest"
              >{{ c.mark }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 pt-8 text-body-sm text-surface-dim md:flex-row">
        <p>© ۱۴۰۵ — تمامی حقوق برای شرکت بین‌المللی توسعه ساختمان (ثاخت) محفوظ است.</p>
        <ul class="flex flex-wrap items-center gap-x-6 gap-y-2 text-label-md">
          <li v-for="item in legalNav" :key="item.href">
            <NuxtLink :to="item.href" class="hover:text-brand-tint">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
