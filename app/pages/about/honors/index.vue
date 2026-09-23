<script setup lang="ts">
import { honors } from '~/utils/honorsData'

const items = honors.map(h => ({
  key: h.title,
  title: h.title,
  meta: `${h.issuer} · ${h.year}`,
  image: h.image,
}))

useSeoMeta({
  title: 'افتخارات، گواهینامه‌ها و عضویت‌ها — ثاخت',
  description: 'گواهینامه‌ها، تندیس‌ها و عضویت‌های رسمی هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <SimpleIndexGrid
      title="افتخارات، گواهینامه‌ها و عضویت‌ها"
      description="گواهینامه‌ها، تندیس‌ها و عضویت‌های رسمی هلدینگ ساختمانی ثاخت."
      :items="items"
    />
  </BaseContainer>
</template>
