<script setup lang="ts">
import { getUnitsByStatus } from '~/utils/unitsData'

const preSaleUnits = getUnitsByStatus('reserved')

useSeoMeta({
  title: 'پیش‌فروش پروژه‌های در حال ساخت — ثاخت',
  description: 'فهرست واحدهای پیش‌فروش پروژه‌های در حال ساخت هلدینگ ثاخت.',
})
</script>

<template>
  <BaseContainer>
    <UnitIndexList
      title="پیش‌فروش پروژه‌های در حال ساخت"
      description="واحدهای قابل پیش‌خرید در پروژه‌های در حال ساخت هلدینگ، با شرایط پرداخت اقساطی."
      :units="preSaleUnits"
    />
  </BaseContainer>
</template>
