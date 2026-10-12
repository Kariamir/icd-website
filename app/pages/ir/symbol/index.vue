<script setup lang="ts">
import { irNav } from '~/utils/routes'
// /ir/symbol — share price & stock information for the ثاخت ticker
// (template 08-ir-symbol). Renders MOCK data from app/utils/irSymbolData.ts;
// the live TSETMC/CODAL feed is pending the backend phase.
useSeoMeta({
  title: 'اطلاعات نماد ثاخت در بورس — ثاخت',
  description: 'قیمت، حجم معاملات، عمق بازار، ترکیب سهامداران و تاریخچه سود نقدی نماد ثاخت (ICD1) در بورس اوراق بهادار تهران.',
})
</script>

<template>
  <div>
    <SubNav :items="irNav" label="بخش‌های دیده‌بان ثاخت" />
    <BaseContainer>
      <IrSymbolView />
    </BaseContainer>
  </div>
</template>
