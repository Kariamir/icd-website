<script setup lang="ts">
/*
 * «شرکت‌های تابعه در یک زنجیره» as an orbit (ADR-028).
 *
 * The owner supplied a solar-system UI as the reference: a dark field,
 * concentric rings, a lit centre, a body on each ring, and a legend grid of
 * cards beneath. What is borrowed is that structure — the reference's own
 * rainbow palette is someone else's; this draws in the brand's ink, blue and
 * tint, per design-system §2, and adds no colour.
 *
 * The holding sits at the centre because it is the parent (ADR-024), and the
 * nine subsidiaries orbit it. Three rings of three, rather than nine rings:
 * nine concentric circles at this size read as a target, not a system.
 *
 * Three things keep this from being a decoration that costs the section its
 * usability:
 *   1. Every planet is a real link with its own accessible name.
 *   2. The legend grid below is always rendered and carries the same nine
 *      companies — it is the non-visual path and the whole of the phone
 *      layout, where the diagram is hidden rather than shrunk to illegible.
 *   3. The orbit pauses on hover or focus, and `prefers-reduced-motion`
 *      stops it outright rather than merely slowing it.
 */
import { subsidiaries } from '~/utils/catalog'

/*
 * Ring radii as a share of the stage's width, outermost last. `left`/`top`
 * percentages resolve against the stage, which is a square, so these describe
 * a true circle.
 */
const RINGS = [20, 33, 46]
/** Seconds per revolution. Different per ring, so the system never locks up. */
const PERIODS = [64, 88, 112]
/**
 * How far each ring is rotated from the one inside it. Three planets to a
 * ring sit 120° apart, so without this they line up into spokes and the
 * rings' 13% gap — about 94px — is less than a planet is wide, which is
 * exactly how they came to overlap (ADR-029). At 40° the nearest planet on
 * the next ring is a third of a revolution away.
 */
const RING_OFFSETS = [0, 40, 80]
/** Planet diameter in px. Fixed rather than a rem step: the root font is
 *  18px here, so `size-20` would be 90px and eat the ring gap. */
const PLANET = 76

/**
 * Each subsidiary placed on a ring. Filled from the inside out, three to a
 * ring, with the planets on each ring evenly spaced and the rings offset
 * from one another so nothing lines up into a spoke.
 */
const bodies = computed(() => subsidiaries.map((company, i) => {
  const ring = Math.min(Math.floor(i / 3), RINGS.length - 1)
  const slot = i % 3
  const perRing = Math.min(3, subsidiaries.length - ring * 3)
  const angle = (360 / perRing) * slot + RING_OFFSETS[ring]!
  const rad = (angle * Math.PI) / 180
  /*
   * The planet's position as a percentage OF THE STAGE, not a translate.
   * `translateX(21%)` was the first attempt and it is a trap: a percentage
   * translate resolves against the element's own box, and the slot has no
   * size, so every planet collapsed onto the centre. `left`/`top`
   * percentages resolve against the positioned parent, which is the stage.
   */
  return {
    company,
    ring,
    period: PERIODS[ring]!,
    x: 50 + RINGS[ring]! * Math.cos(rad),
    y: 50 + RINGS[ring]! * Math.sin(rad),
    angle,
  }
}))
</script>

<template>
  <section class="relative overflow-hidden bg-ink py-20 md:py-[120px]">
    <!-- A sparse star field, painted rather than loaded: three dot layers. -->
    <div class="orbit-stars pointer-events-none absolute inset-0" aria-hidden="true" />
    <!-- A soft wash behind the centre, so the lit core has somewhere to sit. -->
    <div class="pointer-events-none absolute left-1/2 top-[18%] size-[560px] -translate-x-1/2 rounded-pill bg-primary-container/15 blur-[120px]" aria-hidden="true" />

    <div class="relative mx-auto max-w-[1440px] px-space-lg md:px-margin">
      <div class="mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p class="mb-2 text-label-lg font-bold text-brand-tint">خانواده ثاخت</p>
          <h2 class="text-headline-lg font-headline-lg text-surface-container-lowest">شرکت‌های تابعه در یک زنجیره</h2>
          <p class="mt-3 max-w-xl text-body-md leading-relaxed text-surface-dim">
            هلدینگ در مرکز و نُه شرکت تابعه پیرامون آن؛ هر نشان، یک شرکت و کارنامه پروژه‌های آن.
          </p>
        </div>
        <NuxtLink
          to="/companies"
          class="inline-flex h-11 shrink-0 items-center gap-2 rounded-pill border border-surface-container-lowest/40 px-5 text-label-lg text-surface-container-lowest transition-colors hover:border-brand-tint hover:text-brand-tint"
        >
          همه شرکت‌ها <AppIcon name="arrow_back" />
        </NuxtLink>
      </div>

      <!--
        The diagram. Hidden below `md`: at phone width the rings collapse to
        about 300px across and nine logos on them are unreadable and
        untappable, so the grid below simply becomes the whole section.
      -->
      <div class="orbit-system relative mx-auto hidden aspect-square w-full max-w-[720px] md:block">
        <!-- the rings themselves -->
        <svg class="absolute inset-0 size-full" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            v-for="r in RINGS"
            :key="r"
            cx="50"
            cy="50"
            :r="r"
            fill="none"
            stroke="currentColor"
            stroke-width="0.18"
            class="text-surface-container-lowest/25"
          />
        </svg>

        <!-- the holding, at the centre -->
        <NuxtLink
          to="/companies"
          class="orbit-core absolute left-1/2 top-1/2 z-10 flex size-[124px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border-2 border-primary-container bg-surface-container-lowest p-5 transition-transform hover:scale-105"
        >
          <img src="/img/brand/icd-logo.png" alt="شرکت بین‌المللی توسعه ساختمان (ثاخت)" class="max-h-full w-auto object-contain">
        </NuxtLink>

        <!-- one spinning frame per ring, so each turns at its own rate -->
        <div
          v-for="(period, ring) in PERIODS"
          :key="ring"
          class="orbit-spin absolute inset-0"
          :style="{ animationDuration: `${period}s` }"
        >
          <div
            v-for="b in bodies.filter(x => x.ring === ring)"
            :key="b.company.slug"
            class="absolute"
            :style="{ left: `${b.x}%`, top: `${b.y}%` }"
          >
            <!--
              The planet is centred on that point, then spun backwards at the
              ring's own rate so its logo never tips. Two nested elements on
              purpose: Tailwind's centring translate lives on the outer one,
              and the animation on the inner, because an inline `transform`
              on a single element would wipe the translate out.
            -->
            <div class="-translate-x-1/2 -translate-y-1/2">
              <div>
                <div class="orbit-counter" :style="{ animationDuration: `${b.period}s` }">
                  <NuxtLink
                    :to="`/companies/${b.company.slug}`"
                    class="orbit-planet group relative flex items-center justify-center rounded-pill border border-surface-container-lowest/30 bg-surface-container-lowest transition-[border-color,transform,box-shadow] hover:scale-110 hover:border-primary-container focus-visible:scale-110"
                    :style="{ width: `${PLANET}px`, height: `${PLANET}px`, padding: '11px' }"
                  >
                    <CompanyMark :company="b.company" :size="42" />
                    <span
                      class="pointer-events-none absolute top-full left-1/2 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-sm bg-surface-container-lowest px-2.5 py-1 text-label-md text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block"
                    >{{ b.company.name }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--
        The legend. The reference carries one too, and here it does the real
        work: it names every company in text, it is the whole layout on a
        phone, and it is what a screen reader and a crawler read.
      -->
      <ul class="mt-4 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-3 lg:grid-cols-3">
        <li v-for="c in subsidiaries" :key="c.slug">
          <NuxtLink
            :to="`/companies/${c.slug}`"
            class="flex h-full items-center gap-4 rounded-md border border-surface-container-lowest/15 bg-surface-container-lowest/[0.04] p-4 transition-colors hover:border-primary-container hover:bg-surface-container-lowest/[0.09]"
          >
            <span class="flex size-14 shrink-0 items-center justify-center rounded-pill bg-surface-container-lowest p-2">
              <CompanyMark :company="c" :size="34" />
            </span>
            <span class="min-w-0">
              <span class="block truncate text-body-sm font-bold text-surface-container-lowest">{{ c.name }}</span>
              <span class="block truncate text-label-md text-surface-dim">{{ c.specialty }}</span>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
@layer components {
  /* Three dot layers at different scales — no image is loaded for any of it. */
  .orbit-stars {
    background-image:
      radial-gradient(1.5px 1.5px at 18% 22%, rgb(255 255 255 / 0.5), transparent),
      radial-gradient(1.5px 1.5px at 73% 14%, rgb(255 255 255 / 0.4), transparent),
      radial-gradient(1px 1px at 42% 68%, rgb(255 255 255 / 0.35), transparent),
      radial-gradient(1px 1px at 88% 56%, rgb(255 255 255 / 0.3), transparent),
      radial-gradient(1.5px 1.5px at 8% 76%, rgb(255 255 255 / 0.35), transparent),
      radial-gradient(1px 1px at 61% 88%, rgb(255 255 255 / 0.3), transparent);
  }

  /* The core reads as lit rather than merely outlined. */
  .orbit-core {
    box-shadow:
      0 0 0 10px rgb(0 94 184 / 0.10),
      0 0 70px -6px var(--color-primary-container);
  }

  /* A planet sits above its ring, so the line does not cut through it. */
  .orbit-planet {
    box-shadow: 0 10px 26px -8px rgb(4 28 44 / 0.85);
  }

  .orbit-spin {
    animation-name: orbit-turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  /*
   * The planet turns backwards at exactly the ring's rate, so its logo never
   * tips. The static `rotate(-angle)` is written inline; this adds the
   * animation on top of it, which is why the keyframes carry the full
   * transform and the inline rotation is the element's resting state.
   */
  .orbit-counter {
    animation-name: orbit-counter-turn;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  /* Reading a name should hold the system still. */
  .orbit-system:hover .orbit-spin,
  .orbit-system:hover .orbit-counter,
  .orbit-system:focus-within .orbit-spin,
  .orbit-system:focus-within .orbit-counter {
    animation-play-state: paused;
  }

  @keyframes orbit-turn {
    from { rotate: 0deg; }
    to { rotate: 360deg; }
  }

  @keyframes orbit-counter-turn {
    from { rotate: 0deg; }
    to { rotate: -360deg; }
  }

  /* Removed, not shortened — the house rule since ADR-019. */
  @media (prefers-reduced-motion: reduce) {
    .orbit-spin,
    .orbit-counter {
      animation: none;
    }
  }
}
</style>
