<script setup lang="ts">
import { legalPrivacyPage } from '~/utils/editorialData'

useSeoMeta({
  title: `${legalPrivacyPage.title} — ثاخت`,
  description: legalPrivacyPage.intro,
})
</script>

<template>
  <BaseContainer>
    <StaticEditorial :page="legalPrivacyPage" />
  </BaseContainer>
</template>
