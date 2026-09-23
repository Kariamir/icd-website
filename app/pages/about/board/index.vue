<script setup lang="ts">
import { boardMembers } from '~/utils/boardData'

const items = boardMembers.map(m => ({
  key: m.slug,
  title: m.name,
  meta: m.role,
  image: m.image,
  href: `/about/board/${m.slug}`,
}))

useSeoMeta({
  title: 'مدیران و اعضای هیات‌مدیره — ثاخت',
  description: 'اعضای هیات‌مدیره و مدیران ارشد هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <SimpleIndexGrid
      title="مدیران و اعضای هیات‌مدیره"
      description="اعضای هیات‌مدیره و مدیران ارشد هلدینگ ساختمانی ثاخت."
      :items="items"
    />
  </BaseContainer>
</template>
