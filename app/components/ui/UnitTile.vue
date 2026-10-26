<script setup lang="ts">
/*
 * Sale unit card — rebuilt after the Engel & Völkers property card the owner
 * referenced (ADR-026). The anatomy of that card, read off the page itself:
 *
 *   image area — a CAROUSEL with previous/next controls, a dot strip, and a
 *                favourite control overlaid
 *   content    — location line (small, muted), then the headline, then a
 *                labelled price, then an attribute row
 *
 * What changed here is the photography: one static frame became a gallery the
 * reader can move through without leaving the list, which is the point of
 * that design — a unit is bought on its pictures, and a card that shows one
 * makes the reader open a page to see whether it is worth opening.
 *
 * The controls are real buttons inside a link, so they stop propagation and
 * carry their own labels; the card itself stays one tap target on a phone,
 * where the gallery is swiped rather than clicked.
 */
import { getProject, priceLabel, unitStatus, unitGallery, type Unit } from '~/utils/catalog'
import { faArea, faDigits } from '~/utils/format'

const props = defineProps<{ unit: Unit }>()

const project = computed(() => getProject(props.unit.project))
const gallery = computed(() => unitGallery(props.unit))
const index = ref(0)

/** Which frames to actually put in the DOM — the current one and its neighbours. */
function near(i: number) {
  const n = gallery.value.length
  return i === index.value || i === (index.value + 1) % n || i === (index.value - 1 + n) % n
}

function step(delta: number) {
  const n = gallery.value.length
  index.value = (index.value + delta + n) % n
}

/* Touch: a horizontal swipe moves the gallery, a vertical one is the page
   scrolling and must not be stolen. */
let x0 = 0, y0 = 0, swiping = false
function onStart(e: TouchEvent) {
  const t = e.touches[0]
  if (!t) return
  x0 = t.clientX; y0 = t.clientY; swiping = false
}
function onMove(e: TouchEvent) {
  const t = e.touches[0]
  if (!t || swiping) return
  const dx = t.clientX - x0, dy = t.clientY - y0
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    swiping = true
    step(dx > 0 ? -1 : 1)
  }
}

const saved = ref(false)
const attributes = computed(() => {
  const u = props.unit
  return [
    u.bedrooms ? `${faDigits(u.bedrooms)} خوابه` : u.usage,
    u.floor === 0 ? 'همکف' : u.floor < 0 ? `طبقه منفی ${faDigits(Math.abs(u.floor))}` : `طبقه ${faDigits(u.floor)}`,
    ...(u.areaSqm ? [faArea(u.areaSqm)] : []),
  ]
})
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-md border border-border bg-surface-container-lowest transition-colors hover:border-primary-container">
    <!-- image carousel -->
    <div
      class="relative aspect-[4/3] w-full overflow-hidden bg-surface"
      @touchstart.passive="onStart"
      @touchmove.passive="onMove"
    >
      <template v-for="(src, i) in gallery" :key="src">
        <img
          v-if="near(i)"
          :src="src"
          :alt="`${unit.title} — تصویر ${faDigits(i + 1)}`"
          loading="lazy"
          class="absolute inset-0 size-full object-cover transition-opacity duration-300"
          :class="i === index ? 'opacity-100' : 'opacity-0'"
        >
      </template>

      <span
        class="absolute right-3 top-3 z-10 rounded-pill px-3 py-1 text-label-md font-bold"
        :class="unit.status === 'pre-sale' ? 'bg-brand-tint text-primary-container' : unit.status === 'ready' ? 'bg-primary-container text-on-primary' : 'bg-surface-alt text-secondary'"
      >{{ unitStatus[unit.status] }}</span>

      <button
        type="button"
        class="absolute left-3 top-3 z-10 flex size-9 items-center justify-center rounded-pill bg-surface-container-lowest/85 text-ink backdrop-blur transition-colors hover:text-primary-container"
        :aria-pressed="saved"
        :aria-label="saved ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'"
        @click="saved = !saved"
      >
        <AppIcon :name="saved ? 'check_circle' : 'add'" />
      </button>

      <template v-if="gallery.length > 1">
        <button
          type="button"
          class="absolute inset-y-0 right-0 z-10 flex w-12 items-center justify-center text-surface-container-lowest opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          aria-label="تصویر قبلی"
          @click="step(-1)"
        >
          <span class="flex size-9 items-center justify-center rounded-pill bg-ink/55 backdrop-blur"><AppIcon name="chevron_right" /></span>
        </button>
        <button
          type="button"
          class="absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center text-surface-container-lowest opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
          aria-label="تصویر بعدی"
          @click="step(1)"
        >
          <span class="flex size-9 items-center justify-center rounded-pill bg-ink/55 backdrop-blur"><AppIcon name="chevron_left" /></span>
        </button>

        <div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-16 items-end justify-center gap-1.5 bg-gradient-to-t from-ink/55 to-transparent pb-3">
          <span
            v-for="(src, i) in gallery"
            :key="src"
            class="h-1.5 rounded-pill transition-all"
            :class="i === index ? 'w-5 bg-surface-container-lowest' : 'w-1.5 bg-surface-container-lowest/55'"
          />
        </div>
      </template>
    </div>

    <!-- content -->
    <NuxtLink :to="`/sales/units/${unit.id}`" class="flex flex-1 flex-col p-6">
      <p class="mb-1 text-label-md text-secondary">{{ project?.name }}<span v-if="project?.city"> · {{ project.city }}</span></p>
      <h3 class="mb-5 text-headline-sm font-headline-sm leading-snug text-ink group-hover:text-primary-container">{{ unit.title }}</h3>

      <div class="mb-5">
        <span class="block text-label-md text-secondary">قیمت</span>
        <span class="text-headline-sm font-headline-sm text-ink">{{ priceLabel(unit.price) }}</span>
      </div>

      <ul class="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-body-sm text-secondary">
        <li v-for="a in attributes" :key="a">{{ a }}</li>
        <li class="ms-auto font-mono text-xs" dir="ltr">{{ unit.ref }}</li>
      </ul>
    </NuxtLink>
  </article>
</template>
