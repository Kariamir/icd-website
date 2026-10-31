<script setup lang="ts">
/*
 * Site footer — sitemap §11: brand column, three link columns from
 * routes.ts, and «خانواده ثاخت» listing the eight subsidiaries from the
 * company catalog (each linked to its page). Styled after the approved
 * Stitch footer. Shared by every route via layouts/default.vue.
 */
import { footerColumns, legalNav, companyContact, externalSystems, routes } from '~/utils/routes'
import { subsidiaries } from '~/utils/catalog'
</script>

<template>
  <footer class="bg-ink text-surface-container-lowest">
    <div class="mx-auto w-full max-w-[1440px] px-space-lg py-16 md:px-margin md:py-20">
      <div class="grid grid-cols-1 gap-10 border-b border-surface-container-lowest/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
        <!-- 1 — brand -->
        <div>
<!--
            The company's own lockup rather than a monogram tile (ADR-026).
            It is navy and red with no light variant, so on the ink footer it
            sits on a white plate — the same treatment the loading indicator
            uses.
          -->
          <NuxtLink to="/" class="mb-5 inline-flex rounded-sm bg-surface-container-lowest px-4 py-3">
            <img src="/img/brand/icd-logo.png" alt="هلدینگ ساختمانی ثاخت" class="h-9 w-auto">
          </NuxtLink>
          <p class="mb-6 max-w-xs text-body-sm leading-relaxed text-surface-dim">
            شرکت بین‌المللی توسعه ساختمان؛ توسعه پروژه‌های نهادی از ۱۳۶۴.
          </p>
          <ul class="space-y-2 text-body-sm text-surface-dim">
            <li class="flex items-start gap-2">
              <AppIcon name="location_on" class="mt-0.5 shrink-0 text-brand-tint" />
              <span>{{ companyContact.address }}<br><span class="text-surface-dim/80">کد پستی: {{ companyContact.postalCode }}</span></span>
            </li>
            <li class="flex items-center gap-2"><AppIcon name="call" class="shrink-0 text-brand-tint" /><a :href="companyContact.phoneHref" class="hover:text-brand-tint">{{ companyContact.phone }}</a></li>
            <li class="flex items-center gap-2"><AppIcon name="description" class="shrink-0 text-brand-tint" />فکس: {{ companyContact.fax }}</li>
            <li class="flex items-center gap-2"><AppIcon name="mail" class="shrink-0 text-brand-tint" /><a :href="`mailto:${companyContact.email}`" class="hover:text-brand-tint" dir="ltr">{{ companyContact.email }}</a></li>
          </ul>

          <!-- The HR desk gets its own call-out rather than a link in a list -->
          <NuxtLink
            :to="routes.hr"
            class="mt-7 inline-flex h-12 items-center gap-2 rounded-pill bg-primary-container px-6 text-label-lg font-label-lg text-on-primary transition-colors hover:bg-brand-hover"
          >
            <AppIcon name="badge" />امور اداری و منابع انسانی
          </NuxtLink>
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
            <li v-for="c in subsidiaries" :key="c.slug">
              <NuxtLink
                :to="`/companies/${c.slug}`"
                :title="c.name"
                class="flex h-12 items-center justify-center rounded-sm border border-surface-container-lowest/15 px-2 text-center text-label-md font-bold text-surface-dim transition-colors hover:border-brand-tint hover:text-surface-container-lowest"
              >{{ c.mark }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!--
        Internal systems (ADR-028). These are applications people sign into
        and work in, not more footer links, so each gets a card: an icon, the
        system's name and what it is for. They open in a new tab because
        none of them is this site.
      -->
      <div class="border-b border-surface-container-lowest/10 py-8">
        <p class="mb-4 text-label-lg font-bold text-surface-container-lowest">سامانه‌ها</p>
        <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="s in externalSystems" :key="s.href">
            <a
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex h-full items-center gap-3.5 rounded-md border border-surface-container-lowest/15 bg-surface-container-lowest/[0.04] px-4 py-3.5 transition-colors hover:border-brand-tint hover:bg-surface-container-lowest/10"
            >
              <span class="flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-container-lowest/10 text-brand-tint transition-colors group-hover:bg-brand-tint group-hover:text-ink">
                <AppIcon :name="s.icon" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-label-lg font-bold text-surface-container-lowest">{{ s.label }}</span>
                <span class="block truncate text-label-md text-surface-dim">{{ s.note }}</span>
              </span>
              <AppIcon name="open_in_new" class="shrink-0 text-[0.95em] text-surface-dim transition-colors group-hover:text-brand-tint" />
            </a>
          </li>
        </ul>
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
