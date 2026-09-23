<script setup lang="ts">
import type { LinkViewModel } from '~/types/content'
defineProps<{ title: string; action: LinkViewModel }>()
</script>

<template>
  <section class="cta-section">
    <BaseContainer class="cta-section__row">
      <p class="cta-section__title">{{ title }}</p>
      <BaseButton :href="action.href" variant="inverse" size="lg">{{ action.label }}</BaseButton>
    </BaseContainer>
  </section>
</template>

<style scoped>
.cta-section { background: var(--color-primary); color: var(--color-white); padding-block: var(--space-6); }
.cta-section__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}
.cta-section__title { font: var(--text-h2); font-size: 28px; margin: 0; }
</style>
