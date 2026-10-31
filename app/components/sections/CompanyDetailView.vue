<!--
  /companies/[slug] — ported from stitch_project_detail_page_template/
  companies_slug/ (ADR-013), driven by the catalog (ADR-015). Lists every
  project the company owns (sitemap §5.2, company → projects) and renders the
  design's empty state when it owns none.
-->
<script setup lang="ts">
import { projectsByCompany, type Company } from '~/utils/catalog'
import { boardOf, type CompanyBoardMember } from '~/utils/companyBoards'
import { faDigits, faArea } from '~/utils/format'

const props = defineProps<{ company: Company }>()
const list = computed(() => projectsByCompany(props.company.slug))
const totalArea = computed(() => list.value.reduce((s, p) => s + (p.areaSqm ?? 0), 0))
const years = computed(() => 1405 - props.company.founded)

/*
 * The company's own board, from the client's workbook (companyBoards.ts).
 * Split into the board proper and the executives so the two are not shown as
 * one undifferentiated grid — they are different things, and on a listed
 * group's site the distinction between موظف and غیرموظف is disclosure, not
 * decoration.
 *
 * ⛔ One of the ten subsidiaries («مهندسی و مدیریت ساخت ثاخت») has no rows in
 * the workbook, so its page renders no board section at all rather than an
 * empty heading.
 */
const board = computed(() => boardOf(props.company.slug))
const directors = computed(() => board.value.filter(m => m.group === 'هیات\u200cمدیره'))
const executives = computed(() => board.value.filter(m => m.group !== 'هیات\u200cمدیره'))

/** غدیر خوزستان is in liquidation; its «board» is a liquidation committee. */
const inLiquidation = computed(() => board.value.some(m => m.role.includes('تصفیه')))

/** Only the attributes the workbook actually carries for this person. */
function memberRows(m: CompanyBoardMember) {
  return [
    ...(m.sinceYear ? [{ label: 'سال عضویت', value: faDigits(m.sinceYear) }] : []),
    ...(m.education ? [{ label: 'تحصیلات', value: m.education }] : []),
    ...(m.experienceYears ? [{ label: 'سابقه', value: `${faDigits(m.experienceYears)} سال` }] : []),
  ]
}
</script>

<template>
  <div>
    <PageHero
      :image="company.image"
      :mark="company.logo"
      :mark-alt="company.name"
      faded
      :eyebrow="`${company.isListed ? 'شرکت پذیرفته‌شده در بورس' : 'شرکت تابعه'} — تاسیس ${faDigits(company.founded)}`"
      :title="company.name"
      :subtitle="company.summary"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'شرکت‌های تابعه', href: '/companies' }, { label: company.name }]"
    />

    <!-- Profile + facts -->
    <section class="border-b border-border bg-surface-container-lowest py-16 md:py-24">
      <div class="mx-auto grid max-w-[1440px] grid-cols-1 items-start gap-12 px-space-lg md:px-margin lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <h2 class="mb-6 flex items-center gap-3 text-headline-md font-headline-md text-ink">
            <span class="h-6 w-1.5 rounded-pill bg-primary-container" />معرفی شرکت
          </h2>
          <p v-for="(para, i) in company.about" :key="i" class="mb-4 text-body-lg leading-loose text-on-surface">{{ para }}</p>
          <div class="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
            <div class="border-r-2 border-primary-container pr-4">
              <div class="text-headline-sm font-headline-sm text-ink">{{ faDigits(years) }}+ سال</div>
              <div class="mt-1 text-label-md text-secondary">سابقه فعالیت</div>
            </div>
            <div class="border-r-2 border-primary-container pr-4">
              <div class="text-headline-sm font-headline-sm text-ink">{{ faDigits(list.length) }}</div>
              <div class="mt-1 text-label-md text-secondary">پروژه در پرتفوی</div>
            </div>
            <div class="border-r-2 border-primary-container pr-4">
              <div class="text-headline-sm font-headline-sm text-ink">{{ totalArea ? faArea(totalArea) : '—' }}</div>
              <div class="mt-1 text-label-md text-secondary">زیربنای پروژه‌ها</div>
            </div>
          </div>
        </div>
        <aside class="rounded-lg border border-border bg-surface p-6 md:p-8 lg:col-span-5">
          <h3 class="border-b border-border pb-4 text-headline-sm font-headline-sm text-ink">شناسنامه مدیریتی و سهامداری</h3>
          <dl class="divide-y divide-border">
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">سهم هلدینگ</dt><dd class="text-body-md font-bold text-ink">{{ faDigits(company.holdingShare) }}٪</dd></div>
            <!--
              تابعه vs وابسته (ADR-028). The client's own deck splits the
              group in two, and a minority holding presented as a subsidiary
              overstates control — so the card says which this is.
            -->
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">نوع رابطه</dt><dd class="text-body-md font-bold text-ink">{{ company.affiliate ? 'شرکت وابسته' : 'شرکت تابعه' }}</dd></div>
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">مدیرعامل</dt><dd class="text-body-md font-bold text-ink">{{ company.ceo }}</dd></div>
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">سال تاسیس</dt><dd class="text-body-md font-bold text-ink">{{ faDigits(company.founded) }}</dd></div>
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">تخصص</dt><dd class="text-body-md font-bold text-ink">{{ company.specialty }}</dd></div>
            <!-- Staff numbers are not in the client's workbook; the row is
                 omitted rather than filled with a guess. -->
            <div v-if="company.employees" class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">کارکنان</dt><dd class="text-body-md font-bold text-ink">{{ faDigits(company.employees) }} نفر</dd></div>
            <div class="flex items-center justify-between py-4"><dt class="text-body-md text-secondary">دفتر مرکزی</dt><dd class="text-body-md font-bold text-ink">{{ company.city }}</dd></div>
          </dl>
          <NuxtLink to="/ir/financials" class="mt-4 flex items-center justify-between border-t border-border pt-4 text-label-md text-outline hover:text-primary-container">
            گزارش‌های رسمی گروه <AppIcon name="arrow_back" />
          </NuxtLink>
        </aside>
      </div>
    </section>

    <!-- Board and senior management -->
    <section v-if="board.length" class="border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead
          eyebrow="راهبری"
          :title="inLiquidation ? 'هیات تصفیه' : 'هیات‌مدیره و مدیران'"
          :aside="`${faDigits(board.length)} نفر`"
        />

        <div v-if="directors.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PersonCard
            v-for="m in directors"
            :key="`${m.name}-${m.rank}`"
            :name="m.name"
            :role="m.role"
            :badges="m.membership ? [m.membership] : []"
            :rows="memberRows(m)"
          />
        </div>

        <template v-if="executives.length">
          <h3 class="mb-5 mt-12 flex items-center gap-3 text-headline-sm font-headline-sm text-ink">
            <span class="h-5 w-1.5 rounded-pill bg-primary-container" />مدیران اجرایی
          </h3>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <PersonCard
              v-for="m in executives"
              :key="`${m.name}-${m.rank}`"
              size="xs"
              :name="m.name"
              :role="m.role"
              :badges="m.membership ? [m.membership] : []"
              :rows="memberRows(m)"
            />
          </div>
        </template>

        <p class="mt-8 text-label-md text-outline">
          ترکیب هیات‌مدیره بر اساس آخرین اطلاعات دریافتی از شرکت است؛ تغییرات ثبت‌شده در روزنامه رسمی مرجع نهایی است.
        </p>
      </div>
    </section>

    <!-- Projects of this company -->
    <section class="border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead title="پروژه‌های این شرکت" :aside="list.length ? `${faDigits(list.length)} پروژه ثبت‌شده` : undefined" />
        <div v-if="list.length" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProjectTile v-for="p in list" :key="p.slug" :project="p" show-status />
        </div>
        <div v-else class="flex flex-col items-center justify-center rounded-lg border border-border bg-surface-container-lowest p-12 text-center md:p-16">
          <span class="mb-6 flex size-16 items-center justify-center rounded-md border border-border text-secondary"><AppIcon name="architecture" /></span>
          <h3 class="mb-3 text-headline-sm font-headline-sm text-ink">بررسی فرصت‌های توسعه جدید</h3>
          <p class="max-w-2xl text-body-md leading-relaxed text-on-surface-variant">در حال حاضر پروژه‌ای برای این شرکت ثبت نشده است — پروژه‌های جدید پس از تصویب مطالعات منتشر می‌شوند.</p>
          <NuxtLink to="/projects/upcoming" class="mt-8 inline-flex h-11 items-center rounded-pill bg-primary-container px-6 text-label-lg text-on-primary hover:bg-brand-hover">طرح‌های آتی هلدینگ</NuxtLink>
        </div>
      </div>
    </section>

    <section class="bg-surface-container-lowest py-16">
      <div class="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-space-lg md:px-margin">
        <NuxtLink to="/companies" class="inline-flex items-center gap-2 text-label-lg text-primary-container hover:underline"><AppIcon name="arrow_forward" />همه شرکت‌های تابعه</NuxtLink>
        <NuxtLink to="/sales/consultation" class="inline-flex h-12 items-center rounded-pill bg-primary-container px-6 text-label-lg font-label-lg text-on-primary hover:bg-brand-hover">درخواست مشاوره</NuxtLink>
      </div>
    </section>
  </div>
</template>
