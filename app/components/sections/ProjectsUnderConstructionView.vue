<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_under_construction/ (ADR-013).

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
<!-- TOP APP BAR / HEADER -->

<!-- MAIN CONTENT AREA -->
<main class="w-full">
<!-- HERO SECTION -->
<section class="relative w-full h-[460px] md:h-[520px] bg-ink overflow-hidden border-b border-border">
<!-- Full-bleed background construction image -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="An expansive civil engineering construction site at dusk featuring monumental concrete pillars and towering structural steel cranes. Industrial geometric forms stand starkly against a dusky atmospheric sky with precise architectural lighting. The composition embodies institutional engineering precision with deep industrial blues, concrete grays, and bold structural lines. High-contrast ambient illumination casts crisp planar architectural shadows." style="background-image: url('/img/placeholder.svg')">
</div>
<!-- Scrim overlay plane -->
<div class="absolute inset-0 bg-ink/75"></div>
<!-- Hero Content Anchor -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-between py-10">
<!-- Top Back Cue to /projects -->
<div class="pt-2">
<a class="inline-flex items-center gap-2 text-surface-container-lowest hover:text-brand-tint text-label-lg font-label-lg tracking-wide transition-colors duration-150 group" href="#">
<AppIcon name="arrow_forward" />
<span class="">بازگشت به آرشیو کل پروژه‌ها</span>
</a>
</div>
<!-- Low and Right Over Image: Title & Subtitle -->
<div class="max-w-3xl pb-2">
<div class="inline-block w-12 h-1 bg-primary-container mb-4"></div>
<h1 class="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-surface-container-lowest mb-3 tracking-tight">
            پروژه‌های در حال ساخت
          </h1>
<p class="text-body-md md:text-body-lg font-body-lg text-brand-tint max-w-2xl font-normal leading-relaxed">
            فرصت‌های فعال پیش‌فروش و کلان‌سازه‌های عمرانی جاری
          </p>
</div>
</div>
</section>
<!-- EDITORIAL INTRO BAR -->
<div class="w-full bg-surface border-b border-border py-4">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin flex items-center justify-between text-ink">
<div class="flex items-center gap-3">
<span class="w-2.5 h-2.5 bg-primary-container inline-block"></span>
<span class="text-label-lg font-label-lg">مجموعه کلان‌پروژه‌های عمرانی فعال در سراسر کشور</span>
</div>
<div class="text-label-md font-label-md text-secondary">
          ۸ پروژه فعال
        </div>
</div>
</div>
<!-- PROJECT GRID (STRICT SPEC: ONLY PHOTO, NAME, CITY) -->
<section class="w-full max-w-[1440px] mx-auto px-space-lg md:px-margin py-16 md:py-24">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
<!-- CARD 1 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A grand modernist multi-purpose commercial center under active construction in Tehran. Clean architectural concrete slabs and massive steel skeletal framework rise precisely toward an open sky. Soft architectural light emphasizes the sharp planar geometry, industrial purity, and structural solidity. Shot from a low heroic angle adhering to institutional civil engineering aesthetics." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مجموعه چندمنظوره مگاپارس
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تهران، شریعتی
            </p>
</div>
</article>
<!-- CARD 2 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A luxury contemporary residential high-rise development under structural development in north Tehran Elahieh. Elegant monolithic stone and glass curtain wall frames under assembly with disciplined precision. Clean daylight showcases geometric lines, neutral concrete facades, and pristine engineering order without visual noise." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پروژه مسکونی لوکس الهیه تهران
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تهران، منطقه ۱
            </p>
</div>
</article>
<!-- CARD 3 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A massive financial and commercial administrative tower rising in the central business district of Tabriz. Architectural precast concrete slabs and exposed steel framing illuminated under overcast daylight. The composition highlights pure functional forms, clean horizontal bands, and unyielding civil engineering excellence." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              برج تجاری و اداری فیروزه
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تبریز، بلوار ۲۹ بهمن
            </p>
</div>
</article>
<!-- CARD 4 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A grand resort and residential waterfront complex under engineering construction along the Caspian shore. Sharp geometric terraces overlooking calm gray waters, with clean structural post-tensioned slabs and crane scaffolding visible in the distance. Museum wall label precision and serene coastal architectural atmosphere." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مجتمع اقامتی و گردشگری نارنجستان
            </h2>
<p class="text-body-md font-body-md text-secondary">
              مازندران، ایزدشهر
            </p>
</div>
</article>
<!-- CARD 5 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A sophisticated medical and clinic center high-rise under structural installation in Shiraz. Razor-sharp facade grids and insulated glazing panels mounted against exposed white concrete frameworks. Pure bright daylight creates rhythmic linear shadows emphasizing industrial craftsmanship." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مرکز تخصصی درمانی پارس شیراز
            </h2>
<p class="text-body-md font-body-md text-secondary">
              شیراز، میدان ارم
            </p>
</div>
</article>
<!-- CARD 6 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A state-of-the-art logistics terminal and warehousing park under infrastructural development in Isfahan. Expansive structural steel trusses spanning a monolithic concrete foundation plate under clear blue sky. Utilitarian geometric order, precision detailing, and immense engineering scale dominate the frame." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پارک لجستیک و فناوری زاینده‌رود
            </h2>
<p class="text-body-md font-body-md text-secondary">
              اصفهان، شهرک صنعتی رازی
            </p>
</div>
</article>
<!-- CARD 7 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A monumental mixed-use hotel and shopping promenade under development in Mashhad. Heavy reinforced structural cores and sweeping cantilevered floor plates photographed during daylight assembly. Crisp structural lines and engineering authenticity anchored within an institutional urban setting." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              هتل‌آپارتمان و مجتمع تفریحی آرمان ۲
            </h2>
<p class="text-body-md font-body-md text-secondary">
              مشهد، خیابان نواب صفوی
            </p>
</div>
</article>
<!-- CARD 8 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="An expansive modern corporate research campus under continuous infrastructure development in Karaj. Multiple low-rise modular blocks connected by exposed steel walkways, surrounded by foundational earthwork. Disciplined architectural form, crisp 90-degree geometry, and institutional authority." src="/img/placeholder.svg" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پردیس دانش و فناوری البرز
            </h2>
<p class="text-body-md font-body-md text-secondary">
              کرج، فاز ۴ مهرشهر
            </p>
</div>
</article>
</div>
</section>
<!-- EDITORIAL BRAND NOTE BAND -->
<section class="w-full bg-surface border-t border-b border-border py-12 md:py-16">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div>
<h3 class="text-headline-sm font-headline-sm text-ink mb-2">
            استاندارد مهندسی و انضباط ساخت هلدینگ ثاخت
          </h3>
<p class="text-body-sm font-body-sm text-secondary max-w-2xl">
            تمامی ابنیه عمرانی با نظارت عالیه مهندسی، انطباق با مقررات ملی ساختمان و سیستم‌های مدیریت کیفیت بین‌المللی اجرا می‌شوند.
          </p>
</div>
<a class="inline-flex items-center gap-2 h-11 px-6 bg-primary-container text-on-primary text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors" href="#">
<span class="">دریافت دفترچه جامع مشخصات فنی</span>
<AppIcon name="download" />
</a>
</div>
</section>
</main>
<!-- INSTITUTIONAL 5-COLUMN FOOTER -->
</template>
