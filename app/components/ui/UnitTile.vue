<script setup lang="ts">
/*
 * Sale unit card in the approved sales_available style ("keep the card quiet
 * — no badge row"): image with a reference chip, project line, title, the
 * three-cell spec strip, then price. The whole card opens /sales/units/[id].
 */
import { getProject, priceLabel, unitStatus, type Unit } from '~/utils/catalog'
import { faArea, faDigits } from '~/utils/format'

const props = defineProps<{ unit: Unit }>()
const project = computed(() => getProject(props.unit.project))
</script>

<template>
  <NuxtLink
    :to="`/sales/units/${unit.id}`"
    class="group flex flex-col overflow-hidden rounded-md border border-border bg-surface-container-lowest transition-colors hover:border-primary-container"
  >
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-surface">
      <img :src="unit.image" :alt="unit.title" loading="lazy" class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]">
      <span class="absolute right-3 top-3 rounded-xs bg-surface-container-lowest/90 px-2 py-1 font-mono text-xs text-secondary" dir="ltr">{{ unit.ref }}</span>
      <span
        class="absolute left-3 top-3 rounded-pill px-3 py-1 text-label-md font-bold"
        :class="unit.status === 'pre-sale' ? 'bg-brand-tint text-primary-container' : unit.status === 'ready' ? 'bg-primary-container text-on-primary' : 'bg-surface-alt text-secondary'"
      >{{ unitStatus[unit.status] }}</span>
    </div>
    <div class="flex flex-1 flex-col justify-between p-6">
      <div>
        <p class="mb-1 text-label-md text-secondary">{{ project?.name }} · {{ project?.city }}</p>
        <h3 class="mb-4 text-headline-sm font-headline-sm text-ink group-hover:text-primary-container">{{ unit.title }}</h3>
        <div class="grid grid-cols-3 gap-2 border-y border-border py-3 text-body-sm">
          <div><span class="block text-xs text-secondary">مساحت</span><span class="mt-0.5 block font-semibold text-ink">{{ faArea(unit.areaSqm) }}</span></div>
          <div class="border-r border-border pr-2"><span class="block text-xs text-secondary">طبقه</span><span class="mt-0.5 block font-semibold text-ink">{{ unit.floor === 0 ? 'همکف' : faDigits(unit.floor) }}</span></div>
          <div class="border-r border-border pr-2"><span class="block text-xs text-secondary">جهت</span><span class="mt-0.5 block font-semibold text-ink">{{ unit.facing }}</span></div>
        </div>
      </div>
      <div class="mt-5 flex items-center justify-between">
        <div>
          <span class="block text-xs text-secondary">قیمت کل</span>
          <span class="text-headline-sm font-headline-sm text-ink">{{ priceLabel(unit.price) }}</span>
        </div>
        <span class="flex size-10 items-center justify-center rounded-pill border border-border bg-surface text-ink transition-colors group-hover:border-primary-container group-hover:bg-primary-container group-hover:text-on-primary">
          <AppIcon name="arrow_back" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>
