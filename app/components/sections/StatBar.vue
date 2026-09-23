<script setup lang="ts">
defineProps<{ stats: { label: string; value: string }[] }>()
</script>

<template>
  <section class="stat-bar">
    <BaseContainer class="stat-bar__row">
      <div v-for="s in stats" :key="s.label" class="stat-bar__item">
        <p class="stat-bar__value isolate-ltr">{{ s.value }}</p>
        <p class="stat-bar__label">{{ s.label }}</p>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.stat-bar { background: var(--color-surface); padding-block: var(--space-6); }
.stat-bar__row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--space-3); text-align: center; }
.stat-bar__value { font: var(--text-h2); color: var(--color-primary); margin-block-end: 4px; }
.stat-bar__label { font: var(--text-body-sm); color: var(--color-text-muted); }
</style>
