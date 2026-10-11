<script setup lang="ts">
import { aboutHero } from '~/utils/aboutPageData'

// Merged single-scroll About page. The eight former /about/* sub-routes were
// removed in favour of this one page — docs/decisions.md ADR-004.

useSeoMeta({
  title: 'درباره ثاخت — ثاخت',
  description: aboutHero.lead,
})
</script>

<template>
  <AboutOverview />
</template>
