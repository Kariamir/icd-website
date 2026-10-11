<!--
  Ported from the approved design at
  stitch_project_detail_page_template/companies/ (ADR-013).

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
<header class="w-full bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Identity & Primary Nav Links (RTL anchor) -->
<div class="flex items-center gap-10">
<!-- Brand Monogram & Name -->
<a class="flex items-center gap-3 group focus:outline-none" href="#">
<div class="w-10 h-10 bg-ink flex items-center justify-center text-surface-container-lowest font-headline-md font-bold tracking-tight text-xl border border-ink">
            ث
          </div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md text-ink tracking-tight">هلدینگ ساختمانی ثاخت</span>
<span class="text-label-md font-label-md text-secondary tracking-widest text-[11px] leading-tight">ICD HOLDING</span>
</div>
</a>
<!-- Desktop Navigation Links (Active: درباره ثاخت / شرکت‌های تابعه) -->
<nav class="hidden lg:flex items-center gap-8">
<a class="border-b-2 border-primary-container text-primary-container font-headline-sm text-body-md font-bold pb-1 transition-colors" href="#">
            درباره ثاخت
          </a>
<a class="text-ink hover:text-primary-container pb-1 text-body-md font-body-md transition-colors" href="#">
            پروژه‌ها
          </a>
<a class="text-ink hover:text-primary-container pb-1 text-body-md font-body-md transition-colors" href="#">
            فروش و پیش‌فروش
          </a>
<a class="text-ink hover:text-primary-container pb-1 text-body-md font-body-md transition-colors" href="#">
            دیده‌بان ثاخت
          </a>
<a class="text-ink hover:text-primary-container pb-1 text-body-md font-body-md transition-colors" href="#">
            رسانه ثاخت
          </a>
</nav>
</div>
<!-- Left: Auxiliary Actions & Contact CTA -->
<div class="flex items-center gap-4">
<!-- Trailing Utility Icons -->
<div class="flex items-center gap-1 border-l border-border pl-4">
<button aria-label="ورود سهامداران" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150 flex items-center" title="ورود سهامداران">
<span data-icon-missing="account_circle" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</button>
<button aria-label="جستجو" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150 flex items-center" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150 flex items-center font-bold text-xs uppercase" title="Language">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
</div>
<!-- Shareholder Portal Secondary (Desktop) -->
<a class="hidden sm:inline-flex items-center justify-center text-ink hover:text-primary-container text-label-lg font-label-lg px-3 py-2 border border-transparent hover:border-border transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Primary Action Button -->
<a class="bg-primary-container text-on-primary hover:bg-brand-blue-deep text-label-lg font-label-lg px-5 py-2.5 flex items-center gap-2 transition-colors duration-150 border-0" href="#contact">
<span>مشاوره و تماس سریع</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</a>
</div>
</div>
</header>
<main>
<!-- HERO SECTION: Full-bleed photograph with deep scrim and low-right title -->
<section class="relative w-full h-[460px] md:h-[540px] flex items-end overflow-hidden border-b border-border bg-ink">
<!-- Background Architecture/Engineering Image -->
<img class="absolute inset-0 w-full h-full object-cover object-center" data-alt="A grand wide architectural perspective of monumental geometric concrete structures and modern civil engineering skyscrapers under sharp daylight with high contrast lines, industrial concrete tones, deep blue shadows, and clean institutional precision conveying massive structural capability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPPeR8sfMBImJTat3zqqUekEhn9kKTgpg42oNYf7hOxl9IDjLyFOOJHBb9F_sMWYrlrtXTAvDzQjaxR6A2xaN29iq3Te8eeER66E6aI64NIWm1i8MqH8soQctP4edQrBNQQY-XlYYlIwSjZVJc5oN0zdsab7mckLybmvoEJrYxzywejntXppJSNId3JkQVqFZ_l704TKcVaHNHol2QOUK31FSr5xrcSvCXSS9N8xBbh5ecPMDds2W_SA" />
<!-- Scrim Overlay (35% to 50% opacity architectural scrim) -->
<div class="absolute inset-0 bg-ink/50 backdrop-contrast-125"></div>
<!-- Hero Bottom Content Anchor -->
<div class="relative z-10 w-full px-space-lg md:px-margin max-w-[1440px] mx-auto pb-14 md:pb-16">
<div class="max-w-3xl">
<!-- Institutional Breadcrumb Marker -->
<div class="flex items-center gap-2 text-brand-tint text-label-md font-label-md mb-3">
<span>صفحه اصلی</span>
<span class="text-border">/</span>
<span>درباره ثاخت</span>
<span class="text-border">/</span>
<span class="text-surface-container-lowest">شرکت‌های تابعه</span>
</div>
<!-- Headline & Subtitle placed low and right -->
<h1 class="text-surface-container-lowest font-headline-xl text-headline-lg md:text-headline-xl font-extrabold tracking-tight mb-3">
            شرکت‌های تابعه و خانواده ثاخت
          </h1>
<p class="text-surface-dim font-body-lg text-body-lg leading-relaxed max-w-2xl">
            بازوهای تخصصی سرمایه‌گذاری، پیمانکاری و مهندسی در گستره ملی
          </p>
</div>
</div>
</section>
<!-- SECTION: SUBSIDIARY GRID (شبکه شرکت‌های تابعه) -->
<!-- Minimum 120px vertical padding (py-32 = 128px) -->
<section class="w-full bg-surface-container-lowest py-28 md:py-32">
<div class="w-full px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Structural Section Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-6 mb-16">
<div>
<div class="text-primary-container text-label-lg font-label-lg mb-1 tracking-wider">PORTFOLIO &amp; SUBSIDIARIES</div>
<h2 class="text-ink font-headline-lg text-headline-md md:text-headline-lg font-bold">
              شبکه شرکت‌های تابعه
            </h2>
</div>
<p class="text-secondary font-body-md text-body-sm md:text-body-md mt-2 md:mt-0">
            ۸ نهاد تخصصی عمران، انبوه‌سازی و خدمات فنی مهندسی زیرمجموعه هلدینگ
          </p>
</div>
<!-- 8 Subsidiaries Grid: Large flat tiles with typographic logo/monogram & company name -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- 1. شرکت ساختمانی آ.اس.پ -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۱</span>
<span class="bg-surface-alt text-ink border border-border px-2 py-0.5 text-label-md font-bold">
                نماد: آسپ
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-widest text-2xl group-hover:text-primary-container">A.S.P</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">EST. 1970</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                شرکت ساختمانی آ.اس.پ
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">پیمانکاری عمومی و بلندمرتبه‌سازی</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 2. توسعه ساختمان خاورمیانه -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۲</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                توسعه املاک
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tight text-3xl group-hover:text-primary-container">MEDC</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">MIDDLE EAST</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                توسعه ساختمان خاورمیانه
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">سرمایه‌گذاری و ساخت مجتمع‌های فاخر</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 3. شرکت شهرسازی و خانه‌سازی باغمیشه -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۳</span>
<span class="bg-surface-alt text-ink border border-border px-2 py-0.5 text-label-md font-bold">
                نماد: ثباغ
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tighter text-2xl group-hover:text-primary-container">باغمیشه</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">BAGHMISHEH</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                شرکت شهرسازی و خانه‌سازی باغمیشه
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">شهرسازی و انبوه‌سازی مسکونی</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 4. شرکت پارس سازه -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۴</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                سازه‌های نوین
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tight text-3xl group-hover:text-primary-container">پارس</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">PARS SAZEH</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                شرکت پارس سازه
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">پارس‌سازان مهندسی و ابنیه سنگین</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 5. مهندسان مشاور رهشهر -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۵</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                مطالعات و طراحی
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tighter text-2xl group-hover:text-primary-container">رهشهر</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">RAHSHAHR</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                مهندسان مشاور رهشهر
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">طراحی جامع معماری و ژئوتکنیک</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 6. توسعه و عمران امید -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۶</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                توسعه منطقه‌ای
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-widest text-3xl group-hover:text-primary-container">امید</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">OMID DEV</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                توسعه و عمران امید
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">توسعه بافت‌های شهری و چندمنظوره</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 7. شرکت خدمات مهندسی ایران -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۷</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                نظارت و ژئومکانیک
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tight text-3xl group-hover:text-primary-container">IEC</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">IRAN ENG</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                شرکت خدمات مهندسی ایران
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">خدمات آزمایشگاهی و پایش کنترل کیفیت</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
<!-- 8. شرکت صنایع چوب و فلز ثاخت -->
<article class="company-tile bg-surface border border-border p-8 flex flex-col justify-between h-[340px] group transition-all duration-150">
<div class="flex items-start justify-between">
<span class="text-label-md font-label-md text-secondary">۰۸</span>
<span class="bg-surface-container-lowest text-secondary border border-border px-2 py-0.5 text-label-md font-bold">
                صنایع تکمیلی
              </span>
</div>
<!-- Monogram Box -->
<div class="tile-logo-box w-28 h-28 bg-surface-container-lowest border border-border flex flex-col items-center justify-center transition-colors mx-auto my-auto">
<span class="font-headline-lg font-extrabold text-ink tracking-tighter text-2xl group-hover:text-primary-container">چوب و فلز</span>
<span class="text-[10px] text-secondary font-bold tracking-widest uppercase mt-0.5">WOOD &amp; METAL</span>
</div>
<!-- Label -->
<div class="pt-4 border-t border-border mt-auto">
<h3 class="tile-title text-ink font-headline-sm text-body-lg font-bold transition-colors text-right">
                شرکت صنایع چوب و فلز ثاخت
              </h3>
<div class="flex items-center justify-between mt-2">
<span class="text-secondary text-label-md font-label-md">تجهیز و ساخت نما و دکوراسیون داخلی صنعتی</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</div>
</div>
</article>
</div>
<!-- Institutional Bottom Assurance Band -->
<div class="mt-20 p-8 border border-border bg-surface flex flex-col md:flex-row items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-primary-container text-surface-container-lowest flex items-center justify-center">
<span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div>
<div class="text-ink font-headline-sm text-body-lg font-bold">هم‌افزایی فنی و زنجیره ارزش کامل ساختمانی</div>
<div class="text-secondary text-body-sm">کلیه شرکت‌های خانواده ثاخت تحت حاکمیت شرکتی یکپارچه و استانداردهای بورس اوراق بهادار تهران فعالیت می‌نمایند.</div>
</div>
</div>
<a class="inline-flex items-center gap-2 border border-primary-container text-primary-container hover:bg-brand-tint px-6 py-3 font-label-lg text-label-lg transition-colors whitespace-nowrap" href="#">
<span>دریافت کتابچه معرفی شرکت‌ها</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"  /></svg>
</a>
</div>
</div>
</section>
</main>
<!-- FOOTER: Official 5-column corporate footer of ICD Holding (identical to existing screens) -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Section: Brand Info + 5 Columns Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-outline-variant/30">
<!-- Brand & Description Col (Span 2) -->
<div class="lg:col-span-2">
<div class="flex items-center gap-3 mb-4">
<div class="w-10 h-10 bg-primary-container flex items-center justify-center text-surface-container-lowest font-headline-md font-bold text-xl">
              ث
            </div>
<div>
<span class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight block">هلدینگ ساختمانی ثاخت</span>
<span class="text-xs text-brand-tint tracking-widest uppercase">ICD HOLDING GROUP</span>
</div>
</div>
<p class="text-surface-dim text-body-sm leading-relaxed mb-6 max-w-sm">
            شرکت بین‌المللی توسعه ساختمان (ثاخت)، بزرگ‌ترین نهاد سرمایه‌گذاری و اجرای مگاپروژه‌های ساختمانی، تجاری و مسکونی در خاورمیانه با بیش از سه دهه تخصص مهندسی.
          </p>
<div class="text-surface-dim text-body-sm flex flex-col gap-1.5 font-label-md">
<div>تلفن مرکزی: <span class="text-surface-container-lowest" dir="ltr">۰۲۱ - ۸۸۶۵۳۴۲۰</span></div>
<div>نشانی: تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج ثاخت</div>
</div>
</div>
<!-- Col 1: درباره و هیئت‌مدیره -->
<div>
<h4 class="text-surface-container-lowest font-headline-sm text-body-lg font-bold mb-4 pb-1 border-b border-primary-container inline-block">
            معرفی هلدینگ
          </h4>
<ul class="space-y-2.5">
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li><a class="text-surface-container-lowest font-bold text-body-sm block" href="#">شبکه شرکت‌های تابعه</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">پایداری و استانداردهای مهندسی</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">افتخارات و گواهینامه‌ها</a></li>
</ul>
</div>
<!-- Col 2: پروژه‌ها و پورتفو -->
<div>
<h4 class="text-surface-container-lowest font-headline-sm text-body-lg font-bold mb-4 pb-1 border-b border-primary-container inline-block">
            پورتفوی پروژه‌ها
          </h4>
<ul class="space-y-2.5">
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">مجتمع‌های تجاری و اداری</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">ابربزرگراه‌ها و ابنیه عمومی</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">پروژه‌های در حال بهره‌برداری</a></li>
</ul>
</div>
<!-- Col 3: امور سهامداران و بورس -->
<div>
<h4 class="text-surface-container-lowest font-headline-sm text-body-lg font-bold mb-4 pb-1 border-b border-primary-container inline-block">
            امور سهامداران
          </h4>
<ul class="space-y-2.5">
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">سامانه سهامداران و کدال</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">اطلاعیه‌های مجمع عمومی</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">حریم خصوصی و شفافیت مالی</a></li>
</ul>
</div>
<!-- Col 4: فرصت‌ها و ارتباط -->
<div>
<h4 class="text-surface-container-lowest font-headline-sm text-body-lg font-bold mb-4 pb-1 border-b border-primary-container inline-block">
            فروش و مناقصات
          </h4>
<ul class="space-y-2.5">
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">مناقصات و مزایده‌ها</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">اخبار و رسانه دیجیتال</a></li>
<li><a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm block" href="#">تماس و امور مشتریان</a></li>
</ul>
</div>
</div>
<!-- Bottom Bar: Legal Copyright and Security Certs -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between text-surface-dim text-body-sm gap-4">
<div>
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </div>
<div class="flex items-center gap-6 text-label-md">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">قوانین و ضوابط حاکمیتی</a>
<span class="text-outline-variant">|</span>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">نقشه سایت</a>
<span class="text-outline-variant">|</span>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">کد اخلاق حرفه‌ای</a>
</div>
</div>
</div>
</footer>
</template>
