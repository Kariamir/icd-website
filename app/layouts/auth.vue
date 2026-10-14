<script setup lang="ts">
/*
 * Layout for the sign-in screen.
 *
 * Separate from `account` because there is no signed-in person yet: the bar
 * carries only the mark and a way back to the public site, and there is no
 * side nav. Separate from `default` because the full site menu invites someone
 * mid-sign-in to wander off.
 */
</script>

<template>
  <div class="flex min-h-screen flex-col bg-surface text-ink">
    <header class="flex h-16 items-center gap-space-md bg-ink px-space-md text-white md:px-margin">
      <NuxtLink to="/" class="flex min-w-0 items-center gap-[12px] text-body-lg font-label-lg text-white hover:text-tint">
        <span
          aria-hidden="true"
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-sm bg-primary text-label-md font-label-lg"
        >ث</span>
        <span class="truncate">هلدینگ ساختمانی ثاخت</span>
      </NuxtLink>

      <div class="grow" />

      <NuxtLink to="/" class="shrink-0 text-body-sm text-tint hover:underline">بازگشت به سایت</NuxtLink>
    </header>

    <div class="flex grow items-start justify-center px-margin py-[64px]">
      <div class="w-full max-w-[440px]">
        <slot />
      </div>
    </div>
  </div>
</template>
