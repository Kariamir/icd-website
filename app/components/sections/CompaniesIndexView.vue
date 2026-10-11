<!--
  Ported from the approved design at
  stitch_project_detail_page_template/companies/ (ADR-013).

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

<main>
<!-- HERO SECTION: Full-bleed photograph with deep scrim and low-right title -->
<section class="relative w-full h-[460px] md:h-[540px] flex items-end overflow-hidden border-b border-border bg-ink">
<!-- Background Architecture/Engineering Image -->
<img class="absolute inset-0 w-full h-full object-cover object-center" data-alt="A grand wide architectural perspective of monumental geometric concrete structures and modern civil engineering skyscrapers under sharp daylight with high contrast lines, industrial concrete tones, deep blue shadows, and clean institutional precision conveying massive structural capability." src="/img/placeholder.svg" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
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
<AppIcon name="arrow_forward" />
</div>
</div>
</article>
</div>
<!-- Institutional Bottom Assurance Band -->
<div class="mt-20 p-8 border border-border bg-surface flex flex-col md:flex-row items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-12 h-12 bg-primary-container text-surface-container-lowest flex items-center justify-center">
<AppIcon name="domain" />
</div>
<div>
<div class="text-ink font-headline-sm text-body-lg font-bold">هم‌افزایی فنی و زنجیره ارزش کامل ساختمانی</div>
<div class="text-secondary text-body-sm">کلیه شرکت‌های خانواده ثاخت تحت حاکمیت شرکتی یکپارچه و استانداردهای بورس اوراق بهادار تهران فعالیت می‌نمایند.</div>
</div>
</div>
<a class="inline-flex items-center gap-2 border border-primary-container text-primary-container hover:bg-brand-tint px-6 py-3 font-label-lg text-label-lg transition-colors whitespace-nowrap" href="#">
<span>دریافت کتابچه معرفی شرکت‌ها</span>
<AppIcon name="download" />
</a>
</div>
</div>
</section>
</main>
<!-- FOOTER: Official 5-column corporate footer of ICD Holding (identical to existing screens) -->
</template>
