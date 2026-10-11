<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_operating/ (ADR-013).

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
<!-- Top Navigation Header (Docked full-width top, based on Shared Components JSON) -->

<main>
<!-- HERO SECTION -->
<section class="relative w-full h-[620px] bg-ink overflow-hidden border-b border-border">
<!-- Full-bleed photograph of a delivered operational flagship development -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="A striking wide exterior architectural photograph of a towering modern glass and honed white stone commercial headquarters complex fully operational at twilight. Elegant architectural ambient lighting illuminates the precision facade, plazas, and clean structural geometry against a deep dusky sky. The overall atmosphere conveys corporate solidity, engineering mastery, and institutional prestige using a disciplined palette of deep navy, concrete gray, and crisp architectural blue accents." style="background-image: url('/img/placeholder.svg')">
</div>
<!-- Scrim overlay (Dark #041C2C at 65% for structural hierarchy) -->
<div class="absolute inset-0 bg-ink/65"></div>
<!-- Architectural grid overlay lines -->
<div class="absolute inset-0 pointer-events-none opacity-10">
<div class="max-w-[1440px] mx-auto h-full px-space-lg md:px-margin border-x border-surface-container-lowest"></div>
</div>
<!-- Hero Content (Positioned low and right over image) -->
<div class="relative z-10 max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-end pb-16">
<div class="max-w-3xl">
<!-- Back Link / Parent Category indicator -->
<div class="mb-5">
<a class="inline-flex items-center gap-2 text-brand-tint hover:text-surface-container-lowest text-label-lg font-label-lg transition-colors duration-150" href="#">
<AppIcon name="arrow_forward" />
<span>مشاهده تمامی پروژه‌ها</span>
</a>
</div>
<h1 class="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-surface-container-lowest mb-4 tracking-tight leading-tight">
            پروژه‌های در حال بهره‌برداری
          </h1>
<p class="text-body-lg font-body-lg text-brand-tint/90 max-w-2xl font-light leading-relaxed">
            مدیریت دارایی‌ها، مجتمع‌های تجاری و گردشگری فعال هلدینگ بین‌المللی توسعه ساختمان
          </p>
</div>
</div>
</section>
<!-- PROJECT GRID SECTION -->
<!-- Editorial, museum wall label aesthetic, zero-radius cards, generous whitespace -->
<section class="w-full bg-surface-container-lowest py-20">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Grid of Project Cards (3 columns on desktop, 2 on tablet, 1 on mobile) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Card 1 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="برج‌های مسکونی و تجاری رویای کیش" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Striking perspective photograph of the completed Kish Dream twin residential and commercial towers standing majestically under bright island sun. Crisp glass curtain walls reflect the Persian Gulf horizon with stark modernist concrete balconies and precision engineering lines. Clean white aesthetic with deep navy structural contrasts and realistic daylight architectural rendering." src="/img/placeholder.svg" />
</div>
<!-- Museum Wall Label Typography Block -->
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                برج‌های مسکونی و تجاری رویای کیش
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                جزیره کیش
              </p>
</div>
</article>
<!-- Card 2 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع گردشگری و اقامتی ساحل نوشهر" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Wide exterior shot of a fully operational coastal luxury hospitality resort complex in Nowshahr nestled between the Caspian Sea shoreline and forested northern mountains. Sophisticated timber louvers, expansive modern glass terraces, and manicured linear gardens. Architectural realism highlighting stone masonry and clear daytime coastal atmosphere." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع گردشگری و اقامتی ساحل نوشهر
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مازندران، نوشهر
              </p>
</div>
</article>
<!-- Card 3 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مرکز تجاری اداری بین‌المللی تبریز" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="High-angle architectural photography of a bustling premium administrative and shopping landmark center in Tabriz. Smooth granite facade with geometric atrium skylights and pristine pedestrian concourses under clear northern light. The composition emphasizes engineering precision, sharp planar facades, and corporate modernism." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مرکز تجاری اداری بین‌المللی تبریز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تبریز، بلوار ۲۹ بهمن
              </p>
</div>
</article>
<!-- Card 4 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="برج اداری مرکزی ثاخت" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Monolithic modern office tower in downtown Tehran captured on a bright morning with sharp directional sunlight. Polished natural travertine and deep tinted architectural glass panels convey corporate authority and permanence. Crisp minimalist angles with stark urban landscaping and clean paving." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                برج اداری مرکزی ثاخت
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، خیابان ولیعصر
              </p>
</div>
</article>
<!-- Card 5 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع مسکونی زاینده‌رود" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Architectural photograph of a delivered upscale residential high-rise cluster in Isfahan overlooking city parks. Terraced cantilevered balconies crafted from fair-faced concrete and high-performance glass. Even midday lighting revealing fine textures, planar alignment, and institutional construction caliber." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع مسکونی زاینده‌رود
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، مشتاق سوم
              </p>
</div>
</article>
<!-- Card 6 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع تجاری و تفریحی پارس" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Dusk shot of an expansive mixed-use retail and dining destination in Shiraz with illuminated civic water features in the foreground. Clean geometric steel columns, planar canopy roofs, and warm interior lighting shining through multi-story glass curtain walls. Engineering precision and high-contrast night aesthetics." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع تجاری و تفریحی پارس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                شیراز، خیابان عفیف‌آباد
              </p>
</div>
</article>
<!-- Card 7 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="هتل و مجتمع اقامتی بین‌المللی مشهد" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Street-level architectural viewpoint of an active five-star hospitality tower in Mashhad. High-grade beige limestone cladding paired with double-glazed dark bronze framing. Soft afternoon light highlighting pure monolithic vertical lines, grand entrance portico, and refined masonry craft." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                هتل و مجتمع اقامتی بین‌المللی مشهد
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مشهد، بلوار امام رضا
              </p>
</div>
</article>
<!-- Card 8 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="شهرک اداری و فناوری البرز" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Wide perspective of an operational advanced technology and logistics business park in Alborz province. Modern industrial steel frames, expansive white insulated sandwich paneling, and smooth dark asphalt transit zones. Bright ambient sunlight emphasizing efficiency, architectural clean lines, and corporate scale." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                شهرک اداری و فناوری البرز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                کرج، منطقه ویژه پیام
              </p>
</div>
</article>
<!-- Card 9 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجموعه مسکونی مروارید خلیج فارس" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Modern seaside residential enclave in Bandar Abbas showing completed blocks with smart shading louvers tailored to the warm climate. Pristine white stucco, sharp horizontal eaves, and reflecting pool landscapes under high blue sky. Professional corporate architectural imagery with industrial rigor." src="/img/placeholder.svg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجموعه مسکونی مروارید خلیج فارس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                بندرعباس، بلوار ساحلی
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- Footer (Based on Shared Components JSON and Style Guidance) -->
</template>
