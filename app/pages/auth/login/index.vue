<script setup lang="ts">
// Route /auth/login — the shareholder and buyer sign-in.
// Uses the `auth` layout: the mark and a way back to the site, no site menu.
definePageMeta({ layout: 'auth' })

useSeoMeta({
  title: 'ورود به پروفایل من — هلدینگ ساختمانی ثاخت',
  description: 'ورود سهامداران و خریداران به پروفایل شخصی با شماره موبایل و کد تأیید.',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <AuthLoginView />
</template>
