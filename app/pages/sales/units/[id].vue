<script setup lang="ts">
// Route /sales/units/[id] — design sales_units_id (ADR-013), data from the catalog (ADR-015).
import { getUnit, getProject } from '~/utils/catalog'

const route = useRoute()
const unit = computed(() => getUnit(String(route.params.id)))

if (!unit.value) {
  throw createError({ statusCode: 404, message: 'واحد یافت نشد' })
}

useSeoMeta({
  title: () => `${unit.value?.title} — ${getProject(unit.value?.project ?? '')?.name ?? ''}`,
  description: 'مشخصات واحد، پلان و شرایط پرداخت.',
})
</script>

<template>
  <UnitDetailStitchView v-if="unit" :unit="unit" />
</template>
