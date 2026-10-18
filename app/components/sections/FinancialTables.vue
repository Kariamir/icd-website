<!--
  Annual financial tables A–E on /ir/financials — sitemap §7.2, ADR-012.

  Tabbed by table. The مقادیر / تحلیل افقی / تحلیل عمودی switcher was removed
  on 2026-10-18 at the owner's request — every table now shows the figures
  themselves and nothing else. The horizontal and vertical series are still
  parsed in financialTables.ts, so restoring the control is a template change,
  not a data one. Every header states the unit and the fiscal-year end, every table carries an "as of" stamp and a CSV
  download, and rows distorted by the ۱۴۰۴ revaluation carry the footnote
  marker (†). Wide tables scroll horizontally with the first column pinned.
  Table F has no data yet (sitemap §13.1 q1) and says so.
-->
<script setup lang="ts">
import { financialTables, type FinancialTable, type FinancialView, FINANCIAL_UNIT, FISCAL_YEAR_END } from '~/utils/routes'
import { incomeConsolidated, balanceConsolidated, incomeParent, balanceParent, ratioGroups, ratioYears, type FinStatement } from '~/utils/financialTables'
import { faDigits, faNumber } from '~/utils/format'

const route = useRoute()
const router = useRouter()

const table = computed<FinancialTable>(() => {
  const t = String(route.query.table ?? '')
  return (financialTables.some(x => x.value === t) ? t : 'income-consolidated') as FinancialTable
})
/** Fixed at مقادیر; the other two views are no longer offered (see above). */
const view = ref<FinancialView>('values')

function setTable(t: FinancialTable) {
  router.replace({ query: { ...route.query, table: t }, hash: '#financial-tables' })
}

const statements: Partial<Record<FinancialTable, FinStatement>> = {
  'income-consolidated': incomeConsolidated,
  'balance-consolidated': balanceConsolidated,
  'income-parent': incomeParent,
  'balance-parent': balanceParent,
}
const stmt = computed(() => statements[table.value])

const cols = computed(() => {
  const s = stmt.value
  if (!s) return []
  if (view.value === 'horizontal') return s.hyears
  if (view.value === 'vertical') return s.vyears
  return s.years
})

function cell(r: { values?: (number | null)[], horizontal?: (number | null)[], vertical?: (number | null)[] }, i: number) {
  const src = view.value === 'values' ? r.values : view.value === 'horizontal' ? r.horizontal : r.vertical
  const v = src?.[i]
  if (v == null) return '—'
  if (view.value === 'values') return v < 0 ? `(${faNumber(-v)})` : faNumber(v)
  return `${faNumber(v, 1)}٪`
}

function ratioCell(v: number | null | undefined, label: string) {
  if (v == null) return '—'
  if (label.includes('درصد تقسیم')) return `${faNumber(v * 100)}٪`
  if (label.includes('ROA') || label.includes('ROE')) return `${faNumber(v * 100)}٪`
  return Math.abs(v) >= 1000 ? faNumber(v) : faNumber(v, 2)
}

function downloadCsv() {
  let rows: string[][] = []
  if (stmt.value) {
    rows.push(['شرح', ...cols.value.map(String)])
    for (const r of stmt.value.rows) {
      if (r.kind === 'group') { rows.push([r.label]); continue }
      const src = view.value === 'values' ? r.values : view.value === 'horizontal' ? r.horizontal : r.vertical
      rows.push([r.label, ...cols.value.map((_, i) => String(src?.[i] ?? ''))])
    }
  }
  else if (table.value === 'ratios') {
    rows.push(['شرح', ...ratioYears.map(String)])
    for (const g of ratioGroups) {
      rows.push([g.title])
      for (const r of g.rows) rows.push([r.label, ...r.values.map(v => String(v ?? ''))])
    }
  }
  else rows = [['اطلاعاتی برای این جدول منتشر نشده است']]
  const csv = '﻿' + rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = `icd-${table.value}-${view.value}.csv`
  a.click()
  URL.revokeObjectURL(a.href)
}

const hasNotes = computed(() => stmt.value ? stmt.value.rows.some(r => r.note) : table.value === 'ratios')
</script>

<template>
  <section id="financial-tables" class="scroll-mt-40">
    <SectionHead
      eyebrow="جداول عملکرد مالی"
      title="صورت‌های مالی پنج‌ساله"
      :aside="`به‌روزرسانی: سال مالی ۱۴۰۴ · پایان سال مالی ${FISCAL_YEAR_END} · ارقام به ${FINANCIAL_UNIT}`"
    />

    <div class="mb-4 flex gap-1 overflow-x-auto rounded-md bg-surface p-1 [scrollbar-width:none]" role="tablist" aria-label="جداول مالی">
      <button
        v-for="t in financialTables" :key="t.value" type="button" role="tab" :aria-selected="table === t.value"
        class="shrink-0 rounded-sm px-4 py-2.5 text-label-lg font-label-lg transition-colors"
        :class="table === t.value ? 'bg-ink text-on-primary' : 'text-secondary hover:bg-surface-container-lowest hover:text-ink'"
        @click="setTable(t.value)"
      >{{ t.label }}</button>
    </div>

    <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p class="text-label-md text-secondary">{{ table === 'ratios' ? 'نسبت‌ها بدون واحد؛ سرمایه و سرمایه در گردش به میلیون ریال' : '' }}</p>
      <button type="button" class="inline-flex h-9 items-center gap-2 rounded-pill border border-border px-4 text-label-md font-bold text-ink hover:border-primary-container hover:text-primary-container" @click="downloadCsv">
        <AppIcon name="download" />دریافت CSV
      </button>
    </div>

    <!-- Statements A–D -->
    <div v-if="stmt" class="overflow-x-auto rounded-md border border-border">
      <table class="w-full min-w-[720px] border-collapse text-body-sm">
        <caption class="sr-only">{{ financialTables.find(t => t.value === table)?.label }} — {{ FINANCIAL_UNIT }}</caption>
        <thead>
          <tr class="bg-surface text-label-md text-secondary">
            <th scope="col" class="sticky right-0 z-10 bg-surface px-4 py-3 text-right font-bold">
              شرح <span class="font-normal">({{ view === 'values' ? FINANCIAL_UNIT : view === 'horizontal' ? 'درصد تغییر سالانه' : stmt.verticalBase.replace('تحلیل عمودی ', '') }})</span>
            </th>
            <th v-for="y in cols" :key="y" scope="col" class="px-4 py-3 text-left font-bold">{{ faDigits(y) }}<span v-if="y === 1404" class="text-primary-container">†</span></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(r, i) in stmt.rows" :key="i"
            class="border-t border-border/70"
            :class="r.kind === 'group' ? 'bg-surface-container-low' : r.kind === 'total' ? 'font-bold' : ''"
          >
            <th scope="row" class="sticky right-0 z-10 px-4 py-2.5 text-right font-normal" :class="[r.kind === 'group' ? 'bg-surface-container-low font-bold text-ink' : 'bg-surface-container-lowest', r.kind === 'total' && 'font-bold text-ink']" :colspan="r.kind === 'group' ? cols.length + 1 : 1">
              {{ r.label }}<span v-if="r.note" class="mr-1 text-primary-container" title="متاثر از افزایش سرمایه ۱۴۰۴">†</span>
            </th>
            <template v-if="r.kind !== 'group'">
              <td v-for="(_, ci) in cols" :key="ci" class="whitespace-nowrap px-4 py-2.5 text-left tabular-nums" :class="cell(r, ci).startsWith('(') || cell(r, ci).startsWith('-') ? 'text-status-error' : 'text-ink'">{{ cell(r, ci) }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ratios E -->
    <div v-else-if="table === 'ratios'" class="space-y-6">
      <div v-for="g in ratioGroups" :key="g.title" class="overflow-x-auto rounded-md border border-border">
        <table class="w-full min-w-[640px] border-collapse text-body-sm">
          <caption class="bg-surface-container-low px-4 py-3 text-right text-label-lg font-bold text-ink">{{ g.title }}</caption>
          <thead>
            <tr class="bg-surface text-label-md text-secondary">
              <th scope="col" class="sticky right-0 bg-surface px-4 py-3 text-right font-bold">شاخص</th>
              <th v-for="y in ratioYears" :key="y" scope="col" class="px-4 py-3 text-left font-bold">{{ faDigits(y) }}<span v-if="y === 1404" class="text-primary-container">†</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in g.rows" :key="r.label" class="border-t border-border/70">
              <th scope="row" class="sticky right-0 bg-surface-container-lowest px-4 py-2.5 text-right font-normal">{{ r.label }}<span v-if="r.note" class="mr-1 text-primary-container">†</span></th>
              <td v-for="(v, i) in r.values" :key="i" class="whitespace-nowrap px-4 py-2.5 text-left tabular-nums text-ink">{{ ratioCell(v, r.label) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- F — shareholders -->
    <div v-else class="rounded-md border border-dashed border-border bg-surface p-10 text-center">
      <p class="mb-2 text-body-lg font-bold text-ink">ترکیب سهامداران عمده و سهام شناور آزاد</p>
      <p class="mx-auto max-w-xl text-body-sm text-secondary">این جدول از الزامات دستورالعمل حاکمیت شرکتی است و پس از دریافت فهرست رسمی سهامداران بالای یک درصد و ضریب شناوری از امور سهام منتشر می‌شود.</p>
    </div>

    <p v-if="hasNotes" class="mt-4 rounded-md border-r-4 border-primary-container bg-brand-tint/40 p-4 text-label-md leading-relaxed text-ink">
      † در سال مالی ۱۴۰۴ سرمایه شرکت از ۹٬۰۰۰٬۰۰۰ به ۸۲٬۳۰۸٬۵۱۲ میلیون ریال از محل مازاد تجدید ارزیابی دارایی‌ها افزایش یافت. ارقام و نسبت‌های علامت‌خورده با سال‌های قبل قابل مقایسه نیستند و تغییر آن‌ها نشان‌دهنده بهبود یا افت عملیاتی نیست.
    </p>
  </section>
</template>
