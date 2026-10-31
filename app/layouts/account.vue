<script setup lang="ts">
/*
 * Layout for the signed-in account area (/account/*).
 *
 * The account screens carry their own chrome in the approved canvas design — a
 * dark top bar with the signed-in person and a sign-out button, and a card of
 * side-nav links with live counters. That is deliberately NOT the public
 * SiteHeader: there is no site navigation here, and no marketing CTA.
 *
 * It lives in a layout rather than inside each view for the same reason the
 * public chrome does (ADR-014): one definition, one active state derived from
 * the route, instead of a copy per page with the active item hard-coded.
 */
import { accountNav, accountUser } from '~/utils/account'

async function signOut() {
  await navigateTo('/')
}

const route = useRoute()

function isActive(href: string) {
  return route.path === href
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface text-ink">
    <!--
      One row, never wrapped. The approved artboard draws this bar at a fixed
      64px with `flex-wrap`, which is a contradiction: the moment it wraps on a
      phone the second row is clipped by the fixed height. Narrow screens drop
      the wordmark text, the support link and the person's name instead — the
      mark, the avatar and the way out are what a phone needs.
    -->
    <header class="flex h-16 items-center gap-space-md bg-ink px-space-md text-white md:gap-space-lg md:px-margin">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-[12px] text-body-lg font-label-lg text-white hover:text-tint">
        <span
          aria-hidden="true"
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary text-label-md font-label-lg"
        >ث</span>
        <span class="hidden sm:inline">هلدینگ ساختمانی ثاخت</span>
      </NuxtLink>

      <div class="grow" />

      <NuxtLink to="/account/tickets" class="hidden text-body-sm text-tint hover:underline md:inline">پشتیبانی</NuxtLink>

      <p class="flex min-w-0 items-center gap-[10px] text-body-sm">
        <span
          aria-hidden="true"
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-pill bg-tint text-label-md font-label-lg text-ink"
        >{{ accountUser.initials }}</span>
        <span class="hidden truncate md:inline">{{ accountUser.name }}</span>
      </p>

      <!--
        Signing out (ADR-028). The control was drawn but inert; it now leaves
        the cluster and returns to the public site.
        ⛔ There is no session to end — the account area has never had real
        authentication (ADR-016), so this clears nothing and every /account/*
        route stays reachable without signing in. When sessions exist, this
        handler is where the token is dropped.
      -->
      <button
        type="button"
        class="shrink-0 rounded-pill border border-white/35 px-space-md py-space-sm text-label-lg font-label-lg text-white transition-colors hover:bg-white/10 md:px-[18px]"
        @click="signOut"
      >
        خروج
      </button>
    </header>

    <div
      class="mx-auto flex w-full max-w-site flex-wrap items-start gap-margin p-margin"
    >
      <nav
        aria-label="منوی حساب کاربری"
        class="flex-[1_1_240px] min-w-[220px] rounded-md border border-border bg-white p-[12px]"
      >
        <NuxtLink
          v-for="item in accountNav"
          :key="item.key"
          :to="item.href"
          class="mb-1 flex items-center justify-between gap-space-sm rounded-sm px-space-md py-[12px] text-[15px] leading-6 transition-colors"
          :class="isActive(item.href)
            ? 'bg-tint font-label-lg text-ink'
            : 'text-ink hover:bg-surface'"
          :aria-current="isActive(item.href) ? 'page' : undefined"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            :class="item.tone === 'alert'
              ? 'text-label-md font-label-lg text-status-error'
              : 'num text-label-lg text-text-muted'"
          >{{ item.badge }}</span>
        </NuxtLink>
      </nav>

      <main class="flex flex-[999_1_560px] min-w-0 flex-col gap-space-lg">
        <slot />
      </main>
    </div>
  </div>
</template>
