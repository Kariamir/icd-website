<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  alt: string
  width?: number | string
  height?: number | string
  fit?: 'cover' | 'contain'
}>(), { fit: 'cover' })
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :style="{ objectFit: fit }"
    loading="lazy"
  />
</template>
