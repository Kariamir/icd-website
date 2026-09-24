<script setup lang="ts">
// /ir/symbol — share price & stock information for the ثاخت ticker
// (template 08-ir-symbol). Renders MOCK data from app/utils/irSymbolData.ts;
// the live TSETMC/CODAL feed is pending the backend phase.
useSeoMeta({
  title: 'اطلاعات نماد ثاخت در بورس — ثاخت',
  description: 'قیمت، حجم معاملات، عمق بازار، ترکیب سهامداران و تاریخچه سود نقدی نماد ثاخت (ICD1) در بورس اوراق بهادار تهران.',
})
</script>

<template>
  <BaseContainer>
    <IrSymbolView />
  </BaseContainer>
</template>
