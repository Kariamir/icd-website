<script setup lang="ts">
import { getUnit } from '~/utils/unitsData'

const route = useRoute()
const id = route.params.id as string
const unit = getUnit(id)

if (!unit) {
  throw createError({ statusCode: 404, statusMessage: 'واحد یافت نشد' })
}

useSeoMeta({
  title: `${unit.projectTitle} — ${unit.floor} — ثاخت`,
  description: unit.description,
})
</script>

<template>
  <BaseContainer>
    <UnitDetailView :unit="unit" />
  </BaseContainer>
</template>
