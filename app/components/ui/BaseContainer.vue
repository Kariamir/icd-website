<script setup lang="ts">
withDefaults(defineProps<{
  as?: string
  wide?: boolean // tabular content (financial tables/doc archives) — §7
}>(), { as: 'div', wide: false })
</script>

<template>
  <component :is="as" class="base-container" :class="{ 'base-container--wide': wide }">
    <slot />
  </component>
</template>

<style scoped>
.base-container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--space-3);
}
.base-container--wide {
  max-width: var(--container-max-tabular);
}
</style>
