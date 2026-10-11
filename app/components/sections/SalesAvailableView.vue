<!--
  Ported from the approved design at
  stitch_project_detail_page_template/sales_available/ (ADR-013).

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

<!-- BREADCRUMBS & CONTEXT -->
<div class="bg-surface border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin py-3 flex items-center justify-between text-body-sm font-body-sm text-secondary">
<div class="flex items-center gap-2">
<a class="hover:text-primary-container transition-colors" href="#">صفحه اصلی</a>
<span class="text-outline text-xs">/</span>
<span class="text-ink font-semibold">فروش و پیش‌فروش واحدها</span>
</div>
<div class="hidden md:flex items-center gap-4 text-xs font-label-md text-secondary">
<span class="">شاخص نماد بورس: <strong class="text-ink tabular-nums">ثاخت (بورس تهران)</strong></span>
<span class="w-1 h-1 bg-border rounded-md"></span>
<span class="">سامانه شفافیت و قراردادها</span>
</div>
</div>
</div>
<!-- HERO SECTION: Concise, Quiet, Dignified Architectural Scope -->
<section class="relative bg-ink text-surface-container-lowest border-b border-border py-14 md:py-20 overflow-hidden"><div class="absolute inset-0 z-0"><img src="/img/placeholder.svg" alt="معماری هلدینگ ساختمانی ثاخت" class="w-full h-full object-cover object-center" /><div class="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/65 backdrop-brightness-75"></div></div><div class="relative z-10 max-w-[1440px] mx-auto px-space-lg md:px-margin"><div class="max-w-3xl"><div class="inline-flex items-center gap-2 mb-3 text-brand-tint font-bold text-label-md"><span class="w-2.5 h-2.5 bg-primary-fixed"></span><span class="">پرتفوی رسمی شرکت بین‌المللی توسعه ساختمان</span></div><h1 class="text-surface-container-lowest text-headline-lg font-headline-lg md:text-headline-xl md:font-headline-xl tracking-tight mb-4 drop-shadow-sm">فهرست واحدهای آماده واگذاری و سرمایه‌گذاری</h1><p class="text-secondary-fixed text-body-lg font-body-lg leading-relaxed max-w-2xl">فرصت‌های مستقیم پیش‌فروش و تملک واحدهای تجاری، اداری و مسکونی لوکس هلدینگ ثاخت با تضمین مهندسی و ارزش‌افزوده پایدار.</p></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-surface-variant/30 backdrop-blur-sm"><div class="border-r border-surface-variant/30 pr-4 first:border-r-0"><span class="block text-secondary-fixed text-label-md font-label-md">واحدهای فعال واگذاری</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۸۴ واحد</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">پروژه‌های در حال اجرا</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۱۲ پروژه ملی</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">میانگین پیشرفت فیزیکی</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۷۶.۴٪</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">اعتبار استعلام کلاسه</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">برخط و رسمی</span></div></div></div></section>
<!-- FILTER & SEARCH BAR (Sharp, Precision Inputs) -->

<!-- MAIN UNITS GRID SECTION -->
<!-- Crucial Rule Executed: "Keep the card quiet — no badge row." Cards are clean, architectural, restrained and minimal -->
<main class="max-w-[1440px] mx-auto px-space-lg md:px-margin py-12 md:py-16">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- UNIT CARD 1 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation: Crisp Architectural Photography & Blueprint Overlay -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد اداری برج ونک" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A clean, sharp architectural perspective of a high-rise office building unit interior with massive floor-to-ceiling glass windows framing an urban skyline under pristine daylight. The interior features exposed polished light gray concrete structural pillars, refined engineered oak parquet, and immaculate minimal spatial geometry. High-key natural lighting, deep navy subtle reflections, crisp modern industrial precision aesthetic." src="/img/placeholder.svg" />
<!-- Blueprint / Code indicator - Quiet & Restrained -->
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: VN-1204
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">برج بین‌المللی اداری ونک · تهران</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">واحد دیپلماتیک جنوبی با دید ۳۶۰ درجه</h2>
<!-- Structural Specifications (Area, Floor, Orientation) -->
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۱۸۵ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">طبقه ۱۲</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">جنوب و غرب</span>
</div>
</div>
</div>
<!-- Price & Action Row (Tabular Figures) -->
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۵۳,۶۵۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
<!-- UNIT CARD 2 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="پلان مهندسی مجتمع رویال کیش" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A refined architectural drawing layout and technical blueprint render of a luxury residential apartment interior with a massive terrace facing the ocean. Monochromatic architectural drafting lines overlaid onto light gray stone finishes with soft morning diffuse lighting. High architectural minimalism, zero ornamentation, strict modular alignment, pure light tones with subtle deep navy technical stamps." src="/img/placeholder.svg" />
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: RK-0819
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">مجتمع ساحلی رویال · جزیره کیش</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">سوئیت رویال پانوراما با تراس گاردن</h2>
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۱۴۲ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">طبقه ۸</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">رو به دریا</span>
</div>
</div>
</div>
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۴۱,۱۸۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
<!-- UNIT CARD 3 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد تجاری اطلس تبریز" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="An expansive modern open-plan executive headquarters office floor with minimalist columns and floor-to-ceiling glass curtain walls overlooking a pristine geometric city square. Bright balanced corporate lighting, monolithic light terrazzo flooring, clean structural division lines, muted grayscale palette with deep ink accents. Professional civil engineering interior photography." src="/img/placeholder.svg" />
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: AT-0410
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">مرکز تجارت اطلس · تبریز</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">دفتر ستادی و سالن کنفرانس یکپارچه</h2>
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۲۹۰ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">طبقه ۴</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">شمالی اصلی</span>
</div>
</div>
</div>
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۷۲,۵۰۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
<!-- UNIT CARD 4 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="پنت‌هاوس دیپلمات زعفرانیه" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="An architectural interior view of an ultra-luxurious duplex penthouse with a soaring double-height ceiling and concrete sculptural columns in northern Tehran. Large architectural windows offering view of the snow-capped Alborz mountains in clear morning light. High-end modern materials, smooth limestone walls, zero clutter, serene and quiet atmosphere with blue and monochrome accents." src="/img/placeholder.svg" />
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: ZF-1801
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">مجموعه دیپلمات زعفرانیه · تهران</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">پنت‌هاوس دوبلکس اختصاصی بام سبز</h2>
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۴۳۰ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">طبقه ۱۸</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">۴ جهت اصلی</span>
</div>
</div>
</div>
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۱۴۶,۲۰۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
<!-- UNIT CARD 5 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد تجاری برج چمران شیراز" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="Technical architectural perspective of a commercial boutique showroom space located on the ground promenade of a modern tower. Featuring ultra-clear structural frameless glass, architectural ceiling lighting grids, honed white marble floors, sharp clean vertical dividers, and minimalist industrial detailing under neutral bright light." src="/img/placeholder.svg" />
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: SH-0102
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">برج تجاری چمران · شیراز</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">واحد تجاری سرنبش همکف با بر ۱۶ متر</h2>
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۱۱۸ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">همکف (G)</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">نبش بلوار اصلی</span>
</div>
</div>
</div>
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۸۸,۹۰۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
<!-- UNIT CARD 6 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد مسکونی برج ونک" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A clean, luminous architectural rendering of a contemporary corner 3-bedroom residential apartment featuring wide sliding windows facing a private landscaped courtyard. Natural timber louvers, crisp gray stone details, high architectural precision, pure natural lighting, quiet and elegant modernist ambiance with subtle blue glass reflections." src="/img/placeholder.svg" />
<div class="absolute top-3 right-3 bg-surface-container-lowest/90 px-2 py-1 border border-border text-xs font-mono tabular-nums text-secondary">
            REF: VN-0705
          </div>
</div>
<!-- Quiet Card Body -->
<div class="p-6 flex-1 flex flex-col justify-between">
<div>
<div class="text-secondary text-label-md font-label-md mb-1">برج بین‌المللی ونک · تهران</div>
<h2 class="text-ink text-headline-sm font-headline-sm mb-4">واحد ۳ خوابه مدرن تیپ ارشد مهندسی</h2>
<div class="grid grid-cols-3 gap-2 py-3 border-y border-border text-center text-body-sm font-body-sm">
<div class="text-right">
<span class="block text-secondary text-xs">مساحت ناخالص</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">۱۶۵ مترمربع</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">موقعیت طبقه</span>
<span class="text-ink font-semibold tabular-nums mt-0.5 block">طبقه ۷</span>
</div>
<div class="text-right border-r border-border pr-2">
<span class="block text-secondary text-xs">جهت استقرار</span>
<span class="text-ink font-semibold mt-0.5 block">شمال و شرق</span>
</div>
</div>
</div>
<div class="mt-6 pt-2 flex items-center justify-between">
<div>
<span class="block text-secondary text-xs font-label-md">بهای تمام‌شده کل:</span>
<span class="text-ink text-headline-md font-headline-md tabular-nums font-bold">۴۸,۳۰۰,۰۰۰,۰۰۰ <span class="text-xs font-normal text-secondary">ریال</span></span>
</div>
<a aria-label="مشاهده کلاسه واحد" class="p-2.5 bg-surface text-ink hover:bg-primary-container hover:text-on-primary transition-colors flex items-center justify-center border border-border" href="#">
<AppIcon name="arrow_back" />
</a>
</div>
</div>
</article>
</div>
<!-- Minimal Pagination & Engineering Counter -->
<div class="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
<div class="text-secondary text-body-sm font-body-sm">
        صفحه <span class="font-bold text-ink tabular-nums">۱</span> از <span class="font-bold text-ink tabular-nums">۱۴</span>
</div>
<div class="flex items-center gap-1">
<button class="w-10 h-10 border border-border text-ink bg-surface-container-lowest font-bold text-body-sm flex items-center justify-center hover:bg-surface-container-high transition-colors" disabled="">
<AppIcon name="chevron_right" />
</button>
<button class="w-10 h-10 border border-primary-container bg-primary-container text-on-primary font-bold text-body-sm flex items-center justify-center">
          ۱
        </button>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:bg-surface-container-high font-bold text-body-sm flex items-center justify-center transition-colors">
          ۲
        </button>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:bg-surface-container-high font-bold text-body-sm flex items-center justify-center transition-colors">
          ۳
        </button>
<span class="px-2 text-secondary">...</span>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:bg-surface-container-high font-bold text-body-sm flex items-center justify-center transition-colors">
          ۱۴
        </button>
<button class="w-10 h-10 border border-border text-ink bg-surface-container-lowest font-bold text-body-sm flex items-center justify-center hover:bg-surface-container-high transition-colors">
<AppIcon name="chevron_backward" />
</button>
</div>
<a class="inline-flex items-center gap-2 text-primary font-bold text-body-sm hover:underline" href="#">
<span class="">دانلود کاتالوگ جامع واگذاری‌ها (PDF)</span>
<AppIcon name="download" />
</a>
</div>
</main>
<!-- INSTITUTIONAL INVESTOR PROTOCOL CALLOUT -->
<section class="bg-surface-alt border-y border-border py-12">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="bg-surface-container-lowest border border-border p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
<div class="max-w-2xl">
<div class="text-xs font-mono text-secondary mb-1">کدال و امور سهامداران · شرکت بین‌المللی توسعه ساختمان (ثاخت)</div>
<h3 class="text-ink text-headline-md font-headline-md mb-2">استعلام شرایط اختصاصی پیش‌فروش حقوقی و تهاتر مهندسی</h3>
<p class="text-secondary text-body-md font-body-md leading-relaxed">
            نهادهای سرمایه‌گذاری، صندوق‌های زمین و ساختمان و خریداران عمده می‌توانند جهت بررسی بسته‌های واگذاری اقساطی یا تضامین بانکی با اداره فروش مرکزی هلدینگ در ارتباط باشند.
          </p>
</div>
<div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
<a class="px-6 py-3 bg-ink hover:bg-ink/90 text-surface-container-lowest text-label-lg font-label-lg text-center transition-colors" href="#">
            سامانه سهامداران و کدال
          </a>
<a class="px-6 py-3 border border-ink text-ink hover:bg-surface text-label-lg font-label-lg text-center transition-colors" href="#">
            رزرو وقت کارشناسی حضوری
          </a>
</div>
</div>
</div>
</section>
<!-- OFFICIAL 5-COLUMN FOOTER (Shared Components Anchor Compliant) -->
</template>
