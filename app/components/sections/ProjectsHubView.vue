<!--
  /projects — ported from stitch_project_detail_page_template/projects/
  (ADR-013), wired to the catalog (ADR-015): the map pins, counts and the
  four status tiles all come from app/utils/catalog.ts.
-->
<script setup lang="ts">
import { projects, projectStatus, projectsByStatus, type ProjectStatusKey } from '~/utils/catalog'
import { faDigits, faArea } from '~/utils/format'

/*
 * The map moved here from the retired /projects/map (owner's request,
 * 2026-10-18): the projects are the reason anyone opens this page, and
 * putting them behind a second click was a step for nothing. The explorer's
 * filter strip, sort row and view toggle came with it and were **dropped**
 * — ten projects in five cities do not need filtering, and the controls
 * were most of that page's weight.
 */
const cities = computed(() => new Set(projects.map(p => p.city)).size)

const activeSlug = ref<string>(projects.find(p => p.featured)?.slug ?? projects[0]!.slug)
const active = computed(() => projects.find(p => p.slug === activeSlug.value)!)
const mapRef = ref<InstanceType<typeof import('./IranProjectMap.vue').default> | null>(null)

/** Picking from the list moves the map; picking on the map moves the list. */
function choose(slug: string) {
  activeSlug.value = slug
  mapRef.value?.focusSlug(slug)
}

const tiles: { key: ProjectStatusKey, sub: string, cta: string, image: string }[] = [
  { key: 'under-construction', sub: 'عملیات عمرانی جاری و توسعه فعال', cta: 'ورود به فهرست کارگاه‌ها', image: '/img/projects/nbo12-1.jpg' },
  { key: 'upcoming', sub: 'طرح‌های در دست مطالعه و آماده آغاز', cta: 'ورود به طرح‌های آتی', image: '/img/projects/mega-pars-tehran-2.jpg' },
  { key: 'operating', sub: 'مدیریت دارایی و بهره‌برداری پایدار', cta: 'مشاهده دارایی‌های فعال', image: '/img/projects/narenjestan-izadshahr-1.jpg' },
  { key: 'completed', sub: 'کارنامه اجرایی و تحویل قطعی', cta: 'مرور کارنامه تحویل‌شده', image: '/img/projects/tehran-international-tower-6.jpg' },
]

const featured = computed(() => projects.filter(p => p.featured).concat(projects.filter(p => !p.featured && p.status === 'under-construction')).slice(0, 3))
</script>

<template>
  <div>
    <PageHero
      size="lg"
      image="/img/projects/tehran-international-tower-1.jpg"
      title="پروژه‌ها و کارنامه ساختمانی"
      subtitle="نمادهای معماری پایدار و کلان‌سازه‌های مهندسی ایران"
      :breadcrumb="[{ label: 'صفحه اصلی', href: '/' }, { label: 'پروژه‌ها' }]"
    />

    <!--
      «پروژه‌های ثاخت روی نقشه» — the real map, immediately under the hero.

      Layout: on a phone the map comes first at a comfortable height with the
      project list beneath it, because a pin is a poor touch target and the
      list is how a thumb picks a project. From `lg` the two sit side by side
      and drive each other.
    -->
    <section class="border-b border-border bg-surface py-16 md:py-24">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead
          eyebrow="نقشه پروژه‌ها"
          title="پروژه‌های ثاخت روی نقشه"
          :aside="`${faDigits(projects.length)} پروژه در ${faDigits(cities)} شهر`"
        />

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div class="h-[380px] overflow-hidden rounded-lg border border-border sm:h-[460px] lg:col-span-8 lg:h-[620px]">
            <IranProjectMap
              ref="mapRef"
              :projects="projects"
              :active-slug="activeSlug"
              @select="activeSlug = $event"
            />
          </div>

          <div class="flex flex-col gap-4 lg:col-span-4">
            <!-- the project currently under the pointer or the pin -->
            <article class="overflow-hidden rounded-lg border border-border bg-surface-container-lowest">
              <NuxtLink :to="`/projects/${active.slug}`" class="group block">
                <div class="aspect-[16/10] overflow-hidden bg-surface-alt">
                  <img
                    :src="active.image"
                    :alt="active.name"
                    loading="lazy"
                    class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  >
                </div>
                <div class="p-5">
                  <StatusPill :status="active.status" />
                  <h3 class="mt-3 text-body-lg font-bold leading-snug text-ink group-hover:text-primary-container">{{ active.name }}</h3>
                  <p class="mt-1 flex items-center gap-1.5 text-label-md text-secondary">
                    <AppIcon name="location_on" class="text-outline" />{{ active.district }}
                  </p>
                  <dl class="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-label-md">
                    <div><dt class="text-secondary">زیربنا</dt><dd class="mt-0.5 font-bold text-ink">{{ faArea(active.areaSqm) }}</dd></div>
                    <div><dt class="text-secondary">کاربری</dt><dd class="mt-0.5 font-bold text-ink">{{ active.usage }}</dd></div>
                  </dl>
                  <span class="mt-4 flex items-center gap-2 text-label-lg font-bold text-primary-container">
                    صفحه پروژه <AppIcon name="arrow_back" />
                  </span>
                </div>
              </NuxtLink>
            </article>

            <!--
              Every project as a row. This is the part that makes the section
              usable on a phone — and it is also the non-visual path to the
              same information, which a map alone never is.
            -->
            <ul class="max-h-[320px] overflow-y-auto rounded-lg border border-border bg-surface-container-lowest lg:max-h-none lg:flex-1">
              <li v-for="p in projects" :key="p.slug" class="border-b border-border last:border-b-0">
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-3 px-4 py-3 text-right transition-colors"
                  :class="p.slug === activeSlug ? 'bg-brand-tint/40' : 'hover:bg-surface'"
                  :aria-pressed="p.slug === activeSlug"
                  @click="choose(p.slug)"
                  @mouseenter="activeSlug = p.slug"
                >
                  <span class="min-w-0">
                    <span class="block truncate text-body-sm font-bold text-ink">{{ p.name }}</span>
                    <span class="block truncate text-label-md text-secondary">{{ p.city }}</span>
                  </span>
                  <span
                    class="size-2.5 shrink-0 rounded-pill"
                    :class="{
                      'bg-primary-container': p.status === 'under-construction',
                      'bg-status-success': p.status === 'operating',
                      'bg-ink': p.status === 'completed',
                      'bg-outline': p.status === 'upcoming',
                    }"
                    aria-hidden="true"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Four status tiles -->
    <section class="bg-surface-container-lowest py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="طبقه‌بندی پرتفوی" title="وضعیت پروژه‌ها" aside="از طراحی مفهومی تا تحویل و بهره‌برداری" />
        <div class="grid grid-cols-1 gap-gutter md:grid-cols-2">
          <NuxtLink
            v-for="t in tiles"
            :key="t.key"
            :to="projectStatus[t.key].href"
            class="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-ink"
          >
            <img :src="t.image" alt="" class="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/5" />
            <StatusPill :status="t.key" class="absolute left-6 top-6" />
            <div class="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div class="border-r-2 border-surface-container-lowest pr-4 transition-colors group-hover:border-primary-container">
                <h3 class="mb-1 text-headline-md font-headline-md text-surface-container-lowest">{{ projectStatus[t.key].label }}</h3>
                <p class="text-body-md text-surface-alt">{{ t.sub }}</p>
              </div>
              <div class="mt-5 flex items-center justify-between border-t border-surface-container-lowest/20 pt-4 text-surface-container-lowest">
                <span class="text-label-md text-brand-tint group-hover:underline">{{ t.cta }}</span>
                <span class="flex items-center gap-2 text-label-md">{{ faDigits(projectsByStatus(t.key).length) }} پروژه <AppIcon name="arrow_back" /></span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured -->
    <section class="border-t border-border bg-surface py-20 md:py-[120px]">
      <div class="mx-auto max-w-[1440px] px-space-lg md:px-margin">
        <SectionHead eyebrow="منتخب" title="پروژه‌های شاخص" />
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <ProjectTile v-for="p in featured" :key="p.slug" :project="p" show-status show-company />
        </div>
      </div>
    </section>
  </div>
</template>
