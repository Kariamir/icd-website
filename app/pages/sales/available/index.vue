<script setup lang="ts">
import { getUnitsByStatus } from '~/utils/unitsData'

const availableUnits = getUnitsByStatus('available')

useSeoMeta({
  title: 'واحدهای آماده فروش — ثاخت',
  description: 'فهرست واحدهای آماده فروش هلدینگ ساختمانی ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <UnitIndexList
      title="واحدهای آماده فروش"
      description="واحدهای مسکونی، اداری و تجاری آماده فروش در پروژه‌های هلدینگ ثاخت."
      :units="availableUnits"
    />
  </BaseContainer>
</template>
