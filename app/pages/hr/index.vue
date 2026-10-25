<script setup lang="ts">
// Route /hr — «امور اداری و منابع انسانی» (ADR-024). Absorbs the former
// /careers page, which 301s here, and adds the HR desk's own news and the
// organisational slogan.
useSeoMeta({
  title: 'امور اداری و منابع انسانی — هلدینگ ساختمانی ثاخت',
  description: 'اخبار منابع انسانی، شعار سازمانی، فرصت‌های همکاری، مزایا و رفاه کارکنان، آموزش و پرسش‌های متداول.',
})
</script>

<template>
  <HrView />
</template>
