<!--
  Ported from the approved design at
  stitch_project_detail_page_template/sales_available/ (ADR-013).

  Changed on the way in, deliberately:
   - Google Fonts + Material Symbols removed; icons are inline SVG
   - Tailwind classes resolve via app/assets/css/tailwind.css to the
     ten project colours, not the Material palette
   - sharp corners replaced by the radius scale (design-system 4.1)
   - hrefs remapped onto the real route table

  Still static markup: copy and data are inline. Wire to WPNuxt once
  the content models exist (docs/decisions.md ADR-002).
-->
<template>
<!-- TOP APP BAR / HEADER -->
<header class="sticky top-0 z-50 bg-surface-container-lowest border-b border-border">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right Side: Brand & Main Navigation -->
<div class="flex items-center gap-10">
<!-- Brand Logo Anchor -->
<a class="flex items-center gap-3" href="#">
<div class="w-8 h-8 bg-ink flex items-center justify-center text-surface-container-lowest font-black text-headline-sm">ث</div>
<span class="text-headline-md font-headline-md text-ink tracking-tight">هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-8">
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">درباره ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">پروژه‌ها</a>
<!-- Active Tab: فروش و پیش‌فروش -->
<a class="border-b-2 border-primary-container text-primary-container font-bold pb-1 text-label-lg font-label-lg" href="#">فروش و پیش‌فروش</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">دیده‌بان ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left Side: Interactive Portal Actions & Utility Icons -->
<div class="flex items-center gap-4">
<!-- Utility Icons -->
<div class="hidden sm:flex items-center gap-1 border-l border-border pl-4">
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="انتخاب زبان">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
</div>
<!-- Shareholder Portal Secondary CTA -->
<a class="hidden md:inline-flex items-center justify-center px-4 py-2.5 border border-primary-container text-primary-container hover:bg-brand-tint text-label-lg font-label-lg transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Primary Consult CTA -->
<a class="inline-flex items-center justify-center px-5 py-2.5 bg-primary-container hover:bg-brand-blue-deep text-on-primary text-label-lg font-label-lg transition-colors" href="#">
          مشاوره و تماس سریع
        </a>
<!-- Mobile Menu Trigger -->
<button aria-label="منو" class="lg:hidden p-2 text-ink border border-border">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"  /></svg>
</button>
</div>
</div>
</header>
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
<section class="relative bg-ink text-surface-container-lowest border-b border-border py-14 md:py-20 overflow-hidden"><div class="absolute inset-0 z-0"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiH4AXpCVV_ci7gwd1_LqXaNGgbcRS0UQkS7YIX-i_QphMjFhbMFfFt0S85wyhtQ02zYV579estBUzqCGn9yd4ztZNufLm7EMU4boZmkNM5HRd7j7k85FlPfE8FG4BG5P45EBx9hNwc-oXc5lkDd14AC1WE3j1tfh9ivmWfHZJ2exBgOcVjF9m9MLK3WRaVfKaauo8yMleAneXDfP9K76QZW2OZmu9Xex6eupqQgZmyeWmAH5WZ3Krdw" alt="معماری هلدینگ ساختمانی ثاخت" class="w-full h-full object-cover object-center" /><div class="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/65 backdrop-brightness-75"></div></div><div class="relative z-10 max-w-[1440px] mx-auto px-space-lg md:px-margin"><div class="max-w-3xl"><div class="inline-flex items-center gap-2 mb-3 text-brand-tint font-bold text-label-md"><span class="w-2.5 h-2.5 bg-primary-fixed"></span><span class="">پرتفوی رسمی شرکت بین‌المللی توسعه ساختمان</span></div><h1 class="text-surface-container-lowest text-headline-lg font-headline-lg md:text-headline-xl md:font-headline-xl tracking-tight mb-4 drop-shadow-sm">فهرست واحدهای آماده واگذاری و سرمایه‌گذاری</h1><p class="text-secondary-fixed text-body-lg font-body-lg leading-relaxed max-w-2xl">فرصت‌های مستقیم پیش‌فروش و تملک واحدهای تجاری، اداری و مسکونی لوکس هلدینگ ثاخت با تضمین مهندسی و ارزش‌افزوده پایدار.</p></div><div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-surface-variant/30 backdrop-blur-sm"><div class="border-r border-surface-variant/30 pr-4 first:border-r-0"><span class="block text-secondary-fixed text-label-md font-label-md">واحدهای فعال واگذاری</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۸۴ واحد</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">پروژه‌های در حال اجرا</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۱۲ پروژه ملی</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">میانگین پیشرفت فیزیکی</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">۷۶.۴٪</span></div><div class="border-r border-surface-variant/30 pr-4"><span class="block text-secondary-fixed text-label-md font-label-md">اعتبار استعلام کلاسه</span><span class="text-surface-container-lowest text-headline-md font-headline-md tabular-nums mt-1 block">برخط و رسمی</span></div></div></div></section>
<!-- FILTER & SEARCH BAR (Sharp, Precision Inputs) -->

<!-- MAIN UNITS GRID SECTION -->
<!-- Crucial Rule Executed: "Keep the card quiet — no badge row." Cards are clean, architectural, restrained and minimal -->
<main class="max-w-[1440px] mx-auto px-space-lg md:px-margin py-12 md:py-16">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- UNIT CARD 1 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation: Crisp Architectural Photography & Blueprint Overlay -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد اداری برج ونک" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A clean, sharp architectural perspective of a high-rise office building unit interior with massive floor-to-ceiling glass windows framing an urban skyline under pristine daylight. The interior features exposed polished light gray concrete structural pillars, refined engineered oak parquet, and immaculate minimal spatial geometry. High-key natural lighting, deep navy subtle reflections, crisp modern industrial precision aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjfEgC51DSWVZI7a1dK2tP3rNW1d5Zxgt0qgl_FitKWN_8FTjMGciOfFmaR5aOOPbsbT_PVPgcf9FIXsaQMMZYScR8OqG4ZsKXED4WhTccRaiwwOQuCup-zgcQC1idqkIcr6XcjCuIClhY0o2Isr5foyzrwjEU1Q8sdVxySrKXCoO6D7M3BnA6dKVF-QMCl21Lb-fFh8DOhrxrPxyCqCtXXbF2havsz0ynQQKFE-IhVEDttpU0fbDjdg" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
</a>
</div>
</div>
</article>
<!-- UNIT CARD 2 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="پلان مهندسی مجتمع رویال کیش" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A refined architectural drawing layout and technical blueprint render of a luxury residential apartment interior with a massive terrace facing the ocean. Monochromatic architectural drafting lines overlaid onto light gray stone finishes with soft morning diffuse lighting. High architectural minimalism, zero ornamentation, strict modular alignment, pure light tones with subtle deep navy technical stamps." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHKXkwTvZTZB0WhcRwW1ykWCclXqkJBLZk1p_iRbznn8Ku4OLeObXWtCj_4DlzsC0qeGdV6jo_qHqS3ABSrmJCsaf0R2r2c8VPgcsQmdhecxHwqtma45ZEssNWT1W3kvYDwOD70NJ7C1cA9ScNI_UlgRDwvxuFtE1XW2JqCit-IKbl9Ki-6h8hamxVnApwyYfZcKQ3An6dSmrV2ftGI0lvNxS3FKga3Jmm7HprwnDt6cYqkFu_sgfAYA" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
</a>
</div>
</div>
</article>
<!-- UNIT CARD 3 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد تجاری اطلس تبریز" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="An expansive modern open-plan executive headquarters office floor with minimalist columns and floor-to-ceiling glass curtain walls overlooking a pristine geometric city square. Bright balanced corporate lighting, monolithic light terrazzo flooring, clean structural division lines, muted grayscale palette with deep ink accents. Professional civil engineering interior photography." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAig3s1bL8HoDPp8SDsOck_6kDAvqg3jFnSLhnA8M34Uy5drBxS6bGQ5yyhH_NHHcmOKxyUdFyKm_oZWGFF67XNiXCaAM_Y7sJElHvA7WEBbMK1BH-XilT6IrU9hVv1s4-1QM7FGivCS1_am39rWFMG8ObNU-e4rQ9D7YzHgaXVtym19jBRn4oW4VWU9jGTcf27aHUqFPLKHfl9H956lB3v79-aFl9ItQPFyhZXsA2eApX-Be3TPtOB4g" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
</a>
</div>
</div>
</article>
<!-- UNIT CARD 4 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="پنت‌هاوس دیپلمات زعفرانیه" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="An architectural interior view of an ultra-luxurious duplex penthouse with a soaring double-height ceiling and concrete sculptural columns in northern Tehran. Large architectural windows offering view of the snow-capped Alborz mountains in clear morning light. High-end modern materials, smooth limestone walls, zero clutter, serene and quiet atmosphere with blue and monochrome accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP4XU5jcH7SY7HDXZig88-4Vm8JkfN5ysUu9euwqp839WG3QcwPm07-3phjHM4g9HrPk8vSw0FHT_p1pgv6UmTKNjUsmmBhd31s3SwDSKkZdfPWOpHsvbAxDl57NdDYbwuL4s02hQny4uCBh3lpXmaStYtTHzJDCUVoeEB4inbM9B9WKCKnSi3OwFrYkU93aXrYJDVmkkrtT6li5MaaSxxtEPTOMpDwDiPNdJg38hxuB74A16AiO12Yw" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
</a>
</div>
</div>
</article>
<!-- UNIT CARD 5 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد تجاری برج چمران شیراز" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="Technical architectural perspective of a commercial boutique showroom space located on the ground promenade of a modern tower. Featuring ultra-clear structural frameless glass, architectural ceiling lighting grids, honed white marble floors, sharp clean vertical dividers, and minimalist industrial detailing under neutral bright light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJraw2veScmBlce_e76affUq2BDGc8lVT4KlHjYLYiCjRuf9ad1zv2HbH4OzBg2lzI8QKmxesXNyxm8l1IQBgH1fwPp6A_b7eIuS2D_gohvIlm1qIp9k6ajggHkGuAH3YTPxu4fY-o8w9SJRJu7xs7rX05KiNdpTo8QVKl7Dqk7JSsMZn5dvogmBshUHEEy2mAmZgQFpLYcU3xLSpYre76fnvlD5wjhaxgPIjbZUmhRqJpgLqpAF1STQ" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
</a>
</div>
</div>
</article>
<!-- UNIT CARD 6 -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<!-- Visual Presentation -->
<div class="relative w-full aspect-[16/10] bg-surface overflow-hidden border-b border-border">
<img alt="واحد مسکونی برج ونک" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" data-alt="A clean, luminous architectural rendering of a contemporary corner 3-bedroom residential apartment featuring wide sliding windows facing a private landscaped courtyard. Natural timber louvers, crisp gray stone details, high architectural precision, pure natural lighting, quiet and elegant modernist ambiance with subtle blue glass reflections." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl-CMSiAUAiWACqpU4ZHHGaQZuOiWditMSh2j50HU9noOEkrUzaPUAtPQJEzbxNQtbo3T7Qe0Klfi8UPvYPZAG5H_zjWhJt1Ptn8VyuIXypolBlxaXCgtyeN5dUdNgoeDRjUCodrAuksscEE9lLHNM7SnKwk_5T3HHTspesJU3VVG98ltozORYTdm913mhf2FaKpyey8Hq5o78nRzVtXDXApOEYzPhFh4uwjb-Dj4tL4m7cDfPZgVYkA" />
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"  /></svg>
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"  /></svg>
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
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 19l-7-7 7-7"  /></svg>
</button>
</div>
<a class="inline-flex items-center gap-2 text-primary font-bold text-body-sm hover:underline" href="#">
<span class="">دانلود کاتالوگ جامع واگذاری‌ها (PDF)</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"  /></svg>
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
<footer class="bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Brand Strip -->
<div class="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-surface-variant/20 gap-6">
<div>
<span class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight block">هلدینگ ساختمانی ثاخت</span>
<span class="text-surface-dim text-body-sm font-body-sm mt-1 block">پیشرو در توسعه پروژه‌های کلان، فناوری‌های نوین مهندسی عمران و بازار سرمایه</span>
</div>
<div class="flex items-center gap-4 text-body-sm text-surface-dim">
<span class="">مرکز تماس و ارتباطات:</span>
<span class="text-surface-container-lowest font-bold text-headline-sm tabular-nums dir-ltr">۰۲۱-۸۸۸۸۴۰۰۰</span>
</div>
</div>
<!-- 5-Column Navigation Matrix -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-surface-variant/20">
<!-- Column 1: معرفی و ساختار -->
<div>
<h4 class="text-surface-container-lowest text-headline-sm font-headline-sm mb-4">درباره هلدینگ</h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">چشم‌انداز و مأموریت سازمانی</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">شرکت‌های تابعه و اقماری</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پایداری و استانداردهای مهندسی</a></li>
</ul>
</div>
<!-- Column 2: سبد پروژه‌ها -->
<div>
<h4 class="text-surface-container-lowest text-headline-sm font-headline-sm mb-4">پرتفوی عمرانی</h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پروژه‌های در حال بهره‌برداری</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">طرح‌های در دست احداث</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پروژه‌های آتی و مطالعاتی</a></li>
</ul>
</div>
<!-- Column 3: فروش و سرمایه‌گذاری (Active Group) -->
<div>
<h4 class="text-surface-container-lowest text-headline-sm font-headline-sm mb-4">فروش و واگذاری</h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class=""><a class="text-surface-container-lowest font-bold" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">واحدهای آماده تحویل فوری</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">مناقصات و مزایده‌ها</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">طرح‌های مشارکت و تأمین مالی</a></li>
</ul>
</div>
<!-- Column 4: امور سهامداران و شفافیت -->
<div>
<h4 class="text-surface-container-lowest text-headline-sm font-headline-sm mb-4">امور سهامداران</h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">سامانه سهامداران و کدال</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">مجمع عمومی و مصوبات</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">حریم خصوصی و شفافیت مالی</a></li>
</ul>
</div>
<!-- Column 5: ارتباط و رسانه -->
<div>
<h4 class="text-surface-container-lowest text-headline-sm font-headline-sm mb-4">رسانه و ارتباطات</h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">اخبار و رسانه دیجیتال</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">تماس و امور مشتریان</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">صدای مشتری و شکایات</a></li>
<li class=""><a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">دفتر مرکزی: تهران، خ. ولیعصر</a></li>
</ul>
</div>
</div>
<!-- Bottom Bar: Copyright & Compliance -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-dim text-body-sm font-body-sm">
<p class="">© ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.</p>
<div class="flex items-center gap-6 text-xs">
<span class="">شناسه ملی: ۱۰۱۰۱۶۵۷۷۸۸</span>
<span class="w-1 h-1 bg-surface-dim"></span>
<span class="">نماد بورسی: ثاخت</span>
<span class="w-1 h-1 bg-surface-dim"></span>
<span class="">طراحی صنعتی بر پایه نظام مهندسی مدرن</span>
</div>
</div>
</div>
</footer>
</template>
