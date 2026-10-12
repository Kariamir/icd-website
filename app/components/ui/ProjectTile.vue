<script setup lang="ts">
/*
 * Project card in the approved Stitch style (projects_* designs): image on
 * top, quiet label below. Used by the four status pages, company pages,
 * related projects and the home page — so a project looks the same wherever
 * it appears, and always opens /projects/[slug].
 */
import { getCompany, type Project } from '~/utils/catalog'
import { faDigits } from '~/utils/format'

const props = withDefaults(defineProps<{
  project: Project
  showStatus?: boolean
  showProgress?: boolean
  showCompany?: boolean
  aspect?: string
}>(), {
  showStatus: false,
  showProgress: false,
  showCompany: false,
  aspect: 'aspect-[4/3]',
})

const company = computed(() => getCompany(props.project.company))
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface-container-lowest transition-colors duration-150 hover:border-primary-container"
  >
    <div class="relative w-full overflow-hidden bg-surface" :class="aspect">
      <img
        :src="project.image"
        :alt="project.name"
        loading="lazy"
        class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      >
      <StatusPill v-if="showStatus" :status="project.status" class="absolute right-4 top-4" />
    </div>
    <div class="flex flex-1 flex-col gap-2 p-6">
      <p v-if="showCompany && company" class="text-label-md font-label-md text-primary-container">{{ company.name }}</p>
      <h3 class="text-headline-sm font-headline-sm text-ink transition-colors group-hover:text-primary-container">{{ project.name }}</h3>
      <p class="flex items-center gap-1.5 text-body-sm text-secondary">
        <AppIcon name="location_on" class="text-outline" />
        {{ project.city }}، {{ project.district }}
      </p>
      <div v-if="showProgress && project.progress != null" class="mt-auto pt-4">
        <div class="mb-1.5 flex items-center justify-between text-label-md">
          <span class="text-secondary">پیشرفت فیزیکی</span>
          <span class="font-bold text-ink">{{ faDigits(project.progress) }}٪</span>
        </div>
        <div class="h-1.5 overflow-hidden rounded-pill bg-surface-alt">
          <div class="h-full rounded-pill bg-primary-container" :style="{ width: `${project.progress}%` }" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
