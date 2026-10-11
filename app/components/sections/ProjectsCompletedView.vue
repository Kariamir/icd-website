<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_completed/ (ADR-013).

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
<!-- ================= TOP NAVIGATION BAR (SHARED COMPONENT) ================= -->

<!-- ================= MAIN CONTENT ================= -->
<main class="flex-grow w-full">
<!-- 1. HERO SECTION -->
<section class="relative w-full h-[460px] md:h-[540px] bg-ink overflow-hidden border-b border-border">
<!-- Masterpiece Architectural Photograph with Scrim -->
<div class="absolute inset-0 w-full h-full">
<img class="w-full h-full object-cover object-center" data-alt="An expansive, dramatic wide-angle architectural photograph of the completed Tehran International Tower standing majestically in soft dusk light. The monolithic concrete and structural glass facade reflects clean geometric lines against a serene slate-gray and navy twilight sky. The framing is disciplined and institutional, highlighting engineering precision, crisp edges, and finished grand urban landscaping at the base." src="/img/placeholder.svg" />
<!-- Deep Ink Scrim Overlays -->
<div class="absolute inset-0 bg-ink/60"></div>
<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
</div>
<!-- Hero Content Anchor: Low and Right -->
<div class="relative max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-end pb-12 md:pb-16">
<!-- Back Navigation Cue to /projects -->
<div class="mb-6">
<NuxtLink class="inline-flex items-center gap-2 text-surface-container-lowest/80 hover:text-surface-container-lowest text-label-lg font-label-lg transition-colors group" to="/projects">
<AppIcon name="arrow_forward" />
<span>بازگشت به تمام پروژه‌ها</span>
</NuxtLink>
</div>
<!-- Title & Subtitle Cluster -->
<div class="max-w-3xl">
<h1 class="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-surface-container-lowest tracking-tight mb-3">
            پروژه‌های تکمیل‌شده
          </h1>
<p class="text-body-md md:text-body-lg font-body-lg text-surface-container-highest/90 font-light max-w-2xl leading-relaxed">
            کارنامه اجرایی و نمادهای تحویل‌شده معماری ملی
          </p>
</div>
</div>
</section>
<!-- 2. PROJECT GRID SECTION -->
<!-- Architectural Precision Grid (Museum Wall Label Aesthetic) -->
<section class="w-full py-16 md:py-24 bg-surface-container-lowest">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Strict Editorial Bento / Modular 3-Column Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
<!-- Card 1: برج بین‌المللی تهران -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Modern high-rise skyscraper of the Tehran International Tower photographed from a precise low angle under bright natural morning light. The concrete structural columns and reflective glass panels exhibit sharp orthogonal discipline, perfectly exposed without distortions, set against a pristine cool sky. Institutional architectural photography documenting completed civil development." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج بین‌المللی تهران
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، یوسف‌آباد
              </p>
</div>
</article>
<!-- Card 2: مجموعه مسکونی تجاری آ.اس.پ -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Editorial daytime view of the ASP residential and commercial towers in Tehran showing brutalist concrete geometry and sweeping pedestrian plazas. Clear sunlight casts crisp structural shadows along the modular balconies and architectural grid. Finished pristine infrastructure and urban landscaping in a corporate civil portfolio style." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی تجاری آ.اس.پ
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، شیخ بهایی
              </p>
</div>
</article>
<!-- Card 3: برج اداری مرکزی ثاخت -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Straight-on elevation capture of a corporate headquarters glass-and-steel building facade on Valiasr Street. The finished structure exhibits sharp curtain walls, stainless steel mullions, and high-spec architectural engineering under balanced overcast lighting. Minimalist institutional aesthetics conveying operational stability." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج اداری مرکزی ثاخت
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، خیابان ولیعصر
              </p>
</div>
</article>
<!-- Card 4: مجتمع تجاری و تفریحی پارس شیراز -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="An expansive multi-level modern commercial lifestyle complex with travertine stone cladding and expansive glass entrances on Afif-Abad street in Shiraz. Architectural photography showcasing completed structural handoff, polished exterior stonework, clean pathways, and dignified modern lines in warm midday lighting." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجتمع تجاری و تفریحی پارس شیراز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                شیراز، خیابان عفیف‌آباد
              </p>
</div>
</article>
<!-- Card 5: مجتمع مسکونی رویال کیش -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Delivered high-end waterfront residential architecture on Kish Island featuring pure white monolithic balconies and panoramic glazed terraces facing the calm Persian Gulf. Crisp, clear sunny atmosphere highlighting pristine coastal concrete craft, straight edges, and refined institutional building delivery." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجتمع مسکونی رویال کیش
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                کیش، نوار ساحلی مرجان
              </p>
</div>
</article>
<!-- Card 6: مرکز همایش‌ها و برج میلاد اصفهان -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Architectural exterior view of a delivered modern civic convention center and corporate tower complex in Isfahan. High-contrast geometric precast concrete panels juxtaposed with tinted industrial glazing under deep blue sky. Utilitarian, rigorous engineering portfolio aesthetics celebrating completed execution." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج تجاری اداری سپهر اصفهان
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، خیابان چهارباغ بالا
              </p>
</div>
</article>
<!-- Card 7: برج مسکونی درروس نگین -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="A completed luxury residential tower in the Darrous district of northern Tehran, featuring crisp fluted stone pilasters, oversized bronze-framed windows, and a manicured perimeter entrance. Photographed in clear evening illumination emphasizing solidity, timeless construction quality, and absolute structural precision." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج مسکونی نگین دروس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، دروس، خیابان یارمحمدی
              </p>
</div>
</article>
<!-- Card 8: هتل و مرکز اقامتی کوهسار مشهد -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Broad facade photograph of a newly completed modern institutional hotel and mixed-use complex in Mashhad. Massive stone blocks integrated with structured thermal curtain glass walls. Straight horizon, zero barrel distortion, clean geometric lines reflecting authoritative civil development standards." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه اقامتی و تفریحی کوهسار
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مشهد، بلوار کوهسنگی
              </p>
</div>
</article>
<!-- Card 9: شهرک ساختمانی زاگرس تبریز -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Wide panorama of completed multi-block urban residential development in Tabriz. Synchronized modular blocks, clean paved access arteries, finished municipal green corridors, and crisp engineering execution. Natural overcast lighting highlighting high-density concrete craftsmanship and urban permanence." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی زاگرس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تبریز، شهرک ائل‌گلی
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- ================= FOOTER (SHARED COMPONENT - 5 COLUMNS) ================= -->
</template>
