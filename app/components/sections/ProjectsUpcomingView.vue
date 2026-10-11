<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_upcoming/ (ADR-013).

  Changed on the way in, deliberately:
   - Google Fonts + Material Symbols removed; icons are inline SVG
   - Tailwind classes resolve via app/assets/css/tailwind.css to the
     ten project colours, not the Material palette
   - sharp corners replaced by the radius scale (design-system 4.1)
   - hrefs remapped onto the real route table
   - the page <header> and <footer> were lifted out into
     layouts/default.vue, so every route shares one menu

  Still static markup: copy and data are inline. Wire to WPNuxt once
  the content models exist (docs/decisions.md ADR-002).
-->
<template>
<!-- Top Navigation Bar -->

<!-- Main Content Canvas -->
<main>
<!-- SECTION 1: HERO -->
<section class="relative w-full h-[480px] md:h-[560px] bg-ink overflow-hidden flex flex-col justify-between">
<!-- Full-bleed background architectural photo -->
<div class="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40" data-alt="A grand monumental architectural site captured during twilight with striking geometric concrete foundations, structural steel frameworks, and sharp angled silhouettes under a deep twilight sky. Subtle industrial architectural lighting casts crisp shadows across the engineered terrain. The atmosphere is solemn, authoritative, and precise, capturing the raw scale of high-caliber civil infrastructure." style="background-image: url('/img/placeholder.svg')">
</div>
<!-- Planar Scrim Overlay -->
<div class="absolute inset-0 bg-ink/60"></div>
<!-- Hero Top Bar: Breadcrumb Link -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pt-8">
<NuxtLink class="inline-flex items-center gap-2 text-surface-container-lowest hover:text-brand-tint transition-colors text-label-lg font-label-lg" to="/projects">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
<span>بازگشت به پروژه‌ها</span>
</NuxtLink>
</div>
<!-- Hero Bottom Content: Editorial Header -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pb-16">
<div class="max-w-3xl border-r-4 border-primary-container pr-6">
<h1 class="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-surface-container-lowest tracking-tight mb-4">
            پروژه‌های آتی
          </h1>
<p class="text-body-lg font-body-lg text-brand-tint tracking-normal">
            طرح‌های مطالعاتی و در آستانه آغاز هلدینگ ثاخت
          </p>
</div>
</div>
</section>
<!-- SECTION 2: PROJECT GRID -->
<!-- Editorial Museum-Wall Aesthetic, Pure Minimalist Presentation -->
<section class="w-full bg-surface-container-lowest py-16 md:py-24">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
<!-- Card 1 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A clean modern coastal resort masterplan render featuring modular rectilinear buildings with vast panoramic glass and structural white concrete balconies overlooking a calm sea. Bright natural morning sunlight casts sharp, clean architectural shadows. The aesthetic is strictly institutional and modernist, with refined engineering precision and clear structural balance." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجتمع اقامتی و تفریحی نارنجستان ایزدشهر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                مازندران، ایزدشهر
              </p>
</div>
</article>
<!-- Card 2 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A dramatic architectural visualization of a high-rise commercial center featuring interlocking glass and dark stone monoliths against a wide oceanic horizon. The geometric facade is crisp and razor-sharp, captured during bright afternoon daylight with clear sky reflections. High-end modern civil engineering aesthetic." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                پروژه تجاری اداری خلیج فارس
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                بوشهر
              </p>
</div>
</article>
<!-- Card 3 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A futuristic multi-tower corporate headquarters complex with angular cantilevered glass facades and wide pedestrian plazas made of honed granite slabs. Low afternoon sun illuminates the structured vertical louvers and sharp crystalline building volumes in high contrast." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                برج بین‌المللی تجارت و نوآوری البرز
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، منطقه ۲۲
              </p>
</div>
</article>
<!-- Card 4 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive modern multi-modal logistics hub and administrative building showcasing raw structural precast concrete arches and rigorous industrial steel frames. High key neutral lighting highlights the sheer scale and engineering discipline of the complex." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مرکز مبادلات لجستیک و ترانزیت کاسپین
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                گیلان، منطقه آزاد انزلی
              </p>
</div>
</article>
<!-- Card 5 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An urban residential masterplan featuring terraced modernist stone apartment blocks with strict horizontal rhythm, deep shade overhangs, and landscaped internal courtyards. Architectural rendering with clean natural overcast lighting highlighting high-density structural precision." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی باغ‌شهر نیلوفر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، ناژوان
              </p>
</div>
</article>
<!-- Card 6 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive multi-level medical and wellness center featuring serene horizontal glass curtain walls framed by pristine travertine stone piers. The architecture communicates absolute engineering stability and quiet dignity in soft midday light." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                دهکده سلامت و بازتوانی کوهستان
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                فارس، شیراز
              </p>
</div>
</article>
<!-- Card 7 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A grand waterfront civic and mixed-use development featuring cantilevered observation decks and monolithic dark-tinted glass pavilions facing a calm harbor basin. Direct overhead daylight casts sharp rectangular shadows across clean tiled boardwalks." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجتمع چندمنظوره ساحلی اروند
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                خوزستان، خرمشهر
              </p>
</div>
</article>
<!-- Card 8 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive industrial technology park with staggered rectangular administrative hubs clad in perforated aluminum panels and sharp dark masonry. Clean geometric sightlines under an open vast sky reflecting institutional corporate strength." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                پارک فناوری و صنایع پیشرفته توس
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                خراسان رضوی، مشهد
              </p>
</div>
</article>
<!-- Card 9 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An iconic hospitality high-rise complex with bold rhythmic horizontal balconies and minimalist architectural bronze accents set against a dramatic desert mountain backdrop. Clear desert sunlight produces high contrast and pristine planar definition." src="/img/placeholder.svg" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                هتل و اقامتگاه بین‌المللی ارگ کویر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                کرمان، بم
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- Standard Institutional 5-Column Footer -->
</template>
