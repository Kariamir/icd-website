<script setup lang="ts">
import { legalTermsPage } from '~/utils/editorialData'

useSeoMeta({
  title: `${legalTermsPage.title} — ثاخت`,
  description: legalTermsPage.intro,
})
</script>

<template>
  <BaseContainer>
    <StaticEditorial :page="legalTermsPage" />
  </BaseContainer>
</template>
