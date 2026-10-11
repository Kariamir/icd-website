<!--
  Ported from the approved design at
  stitch_project_detail_page_template/companies_slug/ (ADR-013).

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
<!-- =========================================================================
       1. HEADER (TopNavBar Shared Component verbatim implementation)
       ========================================================================= -->
<header class="w-full bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right Side: Logo + Nav Items (RTL Primary Anchor) -->
<div class="flex items-center gap-10">
<!-- Brand Identity -->
<a class="flex items-center gap-3" href="#">
<div class="w-9 h-9 bg-primary-container flex items-center justify-center text-surface-container-lowest font-headline-md font-bold tracking-tighter">
            ث
          </div>
<span class="text-headline-md font-headline-md text-ink tracking-tight font-extrabold">
            هلدینگ ساختمانی ثاخت
          </span>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden md:flex items-center gap-8 text-label-lg font-label-lg">
<a class="border-b-2 border-primary-container text-primary-container font-bold pb-1 transition-colors" href="#">
            درباره ثاخت
          </a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            پروژه‌ها
          </a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            فروش و پیش‌فروش
          </a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            دیده‌بان ثاخت
          </a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            رسانه ثاخت
          </a>
</nav>
</div>
<!-- Left Side: Global Actions & Utilities -->
<div class="flex items-center gap-4">
<!-- Utility Icons -->
<div class="flex items-center gap-1 border-l border-border pl-4">
<button aria-label="جستجو" class="w-10 h-10 flex items-center justify-center text-ink hover:bg-surface-container-high transition-colors" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="w-10 h-10 flex items-center justify-center text-ink hover:bg-surface-container-high transition-colors" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
</div>
<!-- Secondary Action: ورود سهامداران -->
<a class="hidden lg:inline-flex items-center justify-center px-4 py-2 border border-primary-container text-primary-container text-label-lg font-label-lg hover:bg-brand-tint transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Primary Trailing Action: مشاوره و تماس سریع -->
<a class="inline-flex items-center justify-center px-5 py-2 bg-primary-container text-surface-container-lowest text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- Breadcrumb Navigation Bar -->
<div class="w-full bg-surface border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin py-3 flex items-center justify-between text-label-md font-label-md text-on-surface-variant">
<div class="flex items-center gap-2">
<a class="hover:text-primary-container transition-colors" href="#">خانه</a>
<span>/</span>
<a class="hover:text-primary-container transition-colors" href="#">شرکت‌های تابعه</a>
<span>/</span>
<span class="text-ink font-bold">شرکت ساختمانی آ.اس.پ</span>
</div>
<div class="hidden md:flex items-center gap-4 text-label-md">
<span class="text-outline">کد تابعه: SUB-ASP-104</span>
<span class="inline-block w-1 h-1 bg-border rounded-full"></span>
<span class="text-status-success font-bold flex items-center gap-1">
<span class="inline-block w-2 h-2 bg-status-success"></span>
          پذیرفته‌شده در فرابورس ایران
        </span>
</div>
</div>
</div>
<main class="flex-grow">
<!-- =========================================================================
         2. HERO SECTION
         Full-bleed architectural photograph, dark overlay (35%), sits low and right
         ========================================================================= -->
<section class="relative w-full h-[460px] md:h-[520px] bg-ink overflow-hidden border-b border-border">
<div class="absolute inset-0 bg-cover bg-center" data-alt="A grand, monumental architectural photograph of towering modern reinforced concrete skyscrapers and monumental brutalist structures against a clear sharp daylight sky. The engineering craftsmanship shows clean geometric lines, precise balconies, and industrial structural elements. Deep shadows and cool high-contrast tones dominate the architectural landscape with authoritative civil engineering mood, corporate pristine lighting, and deep charcoal and steel blue accents." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBvllooFxSwo70ZeLf3PDNwlh-Zbiw89DDIOb1RaaCQD61ediOXjwMikX7fK_O7vNJhzb2iQalrRsfXlpctXUn1WeJRb1b56moIyZnvx_0w0n2hrpHmlY3ZJmqO7_jjqijhkOHYqvVqHz2ubYtY3W8vzTRCkVgoPXI7hZ5gu5IOY5v3-vWCW__H6IEJb4lcG7vxpPsiQgg4luVE5NEkKzR5kkkl6Uyi4kLWNhToCWv7x_WTCxT6WWxgQ')"></div>
<!-- Scrim overlay exactly 35% deep #041C2C as instructed -->
<div class="absolute inset-0 bg-ink/35"></div>
<!-- Sits low and right content alignment -->
<div class="relative max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-end pb-14 md:pb-16">
<div class="max-w-3xl space-y-3">
<div class="inline-block px-3 py-1 bg-surface-container-lowest text-primary-container text-label-md font-label-lg tracking-wider font-bold">
            شرکت سهامی عام — تاسیس ۱۳۴۸
          </div>
<h1 class="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-surface-container-lowest font-extrabold tracking-tight">
            شرکت ساختمانی آ.اس.پ
          </h1>
<p class="text-body-lg font-body-lg text-surface-container-lowest/90 font-medium leading-relaxed max-w-2xl pt-1">
            بازوی پیشگام انبوه‌سازی، ساخت بلندمرتبه‌ها و توسعه نمادهای مهندسی
          </p>
</div>
</div>
</section>
<!-- =========================================================================
         3 & 4. COMPANY PROFILE & SMALL FACTS TABLE
         ========================================================================= -->
<section class="w-full bg-surface-container-lowest py-space-xl md:py-16 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
<!-- Right Column: Profile Narrative (Strictly 3 sentences as requested) -->
<div class="lg:col-span-7 flex flex-col justify-between">
<div>
<div class="flex items-center gap-3 mb-6">
<span class="w-1.5 h-6 bg-primary-container inline-block"></span>
<h2 class="text-headline-md font-headline-md text-ink font-bold tracking-tight">
                  معرفی و سوابق استراتژیک شرکت
                </h2>
</div>
<!-- 3-sentence profile copy verbatim -->
<p class="text-body-lg font-body-lg text-on-surface leading-loose text-justify font-normal">
                شرکت ساختمانی آ.اس.پ یکی از کهن‌ترین و معتبرترین بازوهای اجرایی هلدینگ ساختمانی ثاخت است که با بیش از نیم قرن سابقه، طلایه‌دار ساخت بلندمرتبه‌ترین ابنیه نوین ایران محسوب می‌شود. این مجموعه تخصصی با بهره‌گیری از فناوری‌های پیشرفته بتن‌ریزی لرزه‌ای، مدیریت زنجیره تامین و نظارت عالیه مهندسی، مجری شاخص‌ترین نمادهای معماری کشور از جمله برج بین‌المللی تهران بوده است. تعهد به استانداردسازی سازمانی و تحویل بهنگام پروژه‌های مقیاس‌بزرگ، رکن بنیادین فعالیت‌های اجرایی این شرکت در بستر بازار سرمایه می‌باشد.
              </p>
</div>
<!-- Operational Engineering Badges -->
<div class="grid grid-cols-3 gap-4 pt-10 mt-8 border-t border-border">
<div class="border-r-2 border-primary-container pr-4">
<div class="text-headline-sm font-headline-sm font-bold text-ink tabular-nums">۵۵+ سال</div>
<div class="text-label-md font-label-md text-secondary mt-1">سابقه اجرای انبوه‌سازی</div>
</div>
<div class="border-r-2 border-primary-container pr-4">
<div class="text-headline-sm font-headline-sm font-bold text-ink tabular-nums">۱,۲۰۰,۰۰۰+</div>
<div class="text-label-md font-label-md text-secondary mt-1">مترمربع زیربنای ناخالص</div>
</div>
<div class="border-r-2 border-primary-container pr-4">
<div class="text-headline-sm font-headline-sm font-bold text-ink tabular-nums">گرید یک</div>
<div class="text-label-md font-label-md text-secondary mt-1">سازمان برنامه و بودجه</div>
</div>
</div>
</div>
<!-- Left Column: SMALL FACTS TABLE
               Plain flat rows, label right, tabular value left, borders #D0D5D2, no icons, no cards. -->
<div class="lg:col-span-5 bg-surface border border-border p-6 md:p-8">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold pb-4 border-b border-border mb-0">
              شناسنامه مدیریتی و سهامداری
            </h3>
<div class="divide-y divide-border">
<!-- Data point 1 -->
<div class="py-4 flex items-center justify-between">
<span class="text-body-md font-body-md text-secondary font-medium">سهم مالکیت هلدینگ</span>
<span class="text-body-md font-body-md font-bold text-ink tabular-nums text-left dir-ltr">
                  ۷۸.۴٪ <span class="text-label-md font-normal text-on-surface-variant font-label-md mr-1">(سهامدار عمده)</span>
</span>
</div>
<!-- Data point 2 -->
<div class="py-4 flex items-center justify-between">
<span class="text-body-md font-body-md text-secondary font-medium">مدیرعامل و مدیریت ارشد</span>
<span class="text-body-md font-body-md font-bold text-ink">مهندس علی کمالی</span>
</div>
<!-- Data point 3 -->
<div class="py-4 flex items-center justify-between">
<span class="text-body-md font-body-md text-secondary font-medium">سال تاسیس</span>
<span class="text-body-md font-body-md font-bold text-ink tabular-nums text-left">
                  ۱۳۴۸ <span class="text-label-md font-normal text-on-surface-variant font-label-md mr-1">(بیش از ۵۵ سال سابقه مهندسی)</span>
</span>
</div>
<!-- Data point 4 -->
<div class="py-4 flex items-center justify-between">
<span class="text-body-md font-body-md text-secondary font-medium">نماد معاملاتی در فرابورس</span>
<span class="text-body-md font-body-md font-bold text-primary-container tabular-nums text-left">
                  آسپ <span class="text-label-md font-normal text-on-surface-variant font-label-md mr-1">(پذیرفته‌شده در بازار اول)</span>
</span>
</div>
<!-- Data point 5 -->
<div class="py-4 flex items-center justify-between">
<span class="text-body-md font-body-md text-secondary font-medium">سرمایه ثبت‌شده</span>
<span class="text-body-md font-body-md font-bold text-ink tabular-nums text-left dir-ltr">
                  ۲,۵۰۰,۰۰۰ <span class="text-label-md font-normal text-on-surface-variant font-label-md mr-1">میلیون ریال</span>
</span>
</div>
</div>
<!-- Auxiliary regulatory note -->
<div class="mt-6 pt-4 border-t border-border flex items-center justify-between text-label-md font-label-md text-outline">
<span>گزارشات رسمی مالی در سامانه کدال</span>
<a class="text-primary-container hover:underline font-bold" href="#">مشاهده اطلاعیه‌ها ←</a>
</div>
</div>
</div>
</div>
</section>
<!-- =========================================================================
         5. «پروژه‌های این شرکت»
         Grid of that company's project cards:
         One photograph, project name, city. Nothing else — no status badge, no description, no metadata row.
         ========================================================================= -->
<section class="w-full bg-surface py-space-xl md:py-20 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Section Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-border">
<div>
<div class="flex items-center gap-3 mb-2">
<span class="w-1.5 h-6 bg-primary-container inline-block"></span>
<h2 class="text-headline-lg font-headline-lg text-ink font-bold tracking-tight">
                پروژه‌های این شرکت
              </h2>
</div>
<p class="text-body-md font-body-md text-secondary">
              پرتفوی شاخص‌ترین سازه‌های ساختمانی و ابرپروژه‌های عمران شهری اجرا شده توسط شرکت ساختمانی آ.اس.پ
            </p>
</div>
<!-- Counter View Tabular -->
<div class="mt-4 md:mt-0 text-label-lg font-label-lg text-secondary">
            مجموع ۴ پروژه شاخص ثبت‌شده
          </div>
</div>
<!-- 4-Card Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Project 1: برج بین‌المللی تهران (تهران، بزرگراه حکیم) -->
<article class="bg-surface-container-lowest border border-border group overflow-hidden">
<div class="relative w-full aspect-[4/3] bg-surface-alt overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="An expansive, commanding daylight architectural photograph of the famous Tehran International Tower standing tall against blue sky. Modern concrete facade, geometric wings, pristine architectural detailing, civil engineering symmetry, institutional clean lighting, and corporate real estate aesthetic with crisp structural outlines." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6ej7zcVTnXC5eUEdf45kr1Bkm_PUUv0yQ7RYFm1WJ1X6PYLBAOrKuO9JxbJnA0AuGevu4rhYptYdgQOlDHV3TpDE1yNN1Osnx_ja4Ban0KMjSOyrvDppuu8LXKk_7c_eGfRXokfTS-wfkCsfn5Zu1XrzQde9ZnTBrTJXe-bxaHunTtCRq1_Ic6QkECTQ8EyjyNfXDiM6iAVvuB69FRkmbyomqnXscf_pXGqizOZFAwiop29YWmsr7ZQ" />
</div>
<div class="p-5">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold group-hover:text-primary-container transition-colors">
                برج بین‌المللی تهران
              </h3>
<p class="text-body-sm font-body-sm text-secondary mt-1">
                تهران، بزرگراه حکیم
              </p>
</div>
</article>
<!-- Project 2: مجموعه مسکونی تجاری آ.اس.پ (تهران، شیخ بهایی) -->
<article class="bg-surface-container-lowest border border-border group overflow-hidden">
<div class="relative w-full aspect-[4/3] bg-surface-alt overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="A dignified wide-angle architectural photograph of the iconic ASP Residential and Commercial complex in Tehran. Brutalist concrete stepped modular towers, mid-century modernist precision, geometric balconies and landscaped institutional podiums under bright clear morning light with deep crisp architectural shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpqaszb3nuFjmWmQvmPxNgND97tKKSysco3mcWL_gJB9mbQnsH8_lomOetUdsYNs0kqHqnGrJJu_oZliSHaJsQZf0iYGWm6lGSUNfGTFnkHHWOMNgwXmAo3rJVFrM7_NwjGDKNKPAcQOPsC77BGErzrotvjpJZDfr4j8UrWPijbuf_kGIeJQOw_uz8xcLKhLTEGya3TECpzTUVfjag2Vj0QYLXNf5n9CoWDKGUy1fpeX1sm4qe8aTb5g" />
</div>
<div class="p-5">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold group-hover:text-primary-container transition-colors">
                مجموعه مسکونی تجاری آ.اس.پ
              </h3>
<p class="text-body-sm font-body-sm text-secondary mt-1">
                تهران، شیخ بهایی
              </p>
</div>
</article>
<!-- Project 3: هتل و برج مسکونی کوهسار (مشهد، بلوار کوهسنگی) -->
<article class="bg-surface-container-lowest border border-border group overflow-hidden">
<div class="relative w-full aspect-[4/3] bg-surface-alt overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Modern architectural photography of the luxury high-rise Kohsar residential tower and hotel in Mashhad near mountain backdrop. Contemporary stone and curtain-wall glass facade, geometric steel lines, crisp engineering precision, daylight urban scene with balanced corporate blue tones and zero decorative blur." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKnEvH6LJcqpumma7tGEW3va0atiWKNTiXMHvr12B28as9DfIpkFn1054HLn8w3vqEEYZXRltBtmIUG8isKqviFXE2GoTamtycodwIp485ECXN3qHBZ9kGwL5SQ4jEfKcAE-XFA3LmkVdhxCdBlxpob9WeD6ogmFICL4qIvVLCwETyMWdAJjQk5pkkq-hjnXb7iaweo_8xFLppBaqRkhYIe2Isk6AK7kJ56Hh05W8XWgteQmMW9kEVvw" />
</div>
<div class="p-5">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold group-hover:text-primary-container transition-colors">
                هتل و برج مسکونی کوهسار
              </h3>
<p class="text-body-sm font-body-sm text-secondary mt-1">
                مشهد، بلوار کوهسنگی
              </p>
</div>
</article>
<!-- Project 4: مجتمع تجاری اداری فیروزه (تبریز، بلوار ۲۹ بهمن) -->
<article class="bg-surface-container-lowest border border-border group overflow-hidden">
<div class="relative w-full aspect-[4/3] bg-surface-alt overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="A clean, monolithic architectural perspective of the modern Firoozeh commercial and office complex in Tabriz. Stone and composite facade with rational engineering rhythm, expansive glass storefronts, crisp urban setting, authoritative civil engineering quality with institutional lighting and neutral gray concrete textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU4A0OAkkH90P-mSXL_xRapI1bFZY1cyc20M3gr2ukAAO2LEt2DQVDZwmqAZ-e4LSWhFzQzlNoyvACG5ws_ZElM8dFW_c0DbQ0Y7PAcl4blldeSPe73bSar8Py8SaNY8CgHeau_i6wN2SVNFNANkG4IJvXACq8rxT10lke-ffPBjGGudwimxGlJcBs1ZHHkxmUMx_o2kbNM70dYYtfOnoGNwTPeXfhzKpz3Af4UWbQdrKe47pSOTiiFA" />
</div>
<div class="p-5">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold group-hover:text-primary-container transition-colors">
                مجتمع تجاری اداری فیروزه
              </h3>
<p class="text-body-sm font-body-sm text-secondary mt-1">
                تبریز، بلوار ۲۹ بهمن
              </p>
</div>
</article>
</div>
</div>
</section>
<!-- =========================================================================
         6. DESIGNED EMPTY STATE COMPONENT
         Demonstrating when a subsidiary has no active projects yet (Alternate View / Toggle Block)
         ========================================================================= -->
<section class="w-full bg-surface-container-lowest py-space-xl md:py-16 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Context Bar / View Explanation -->
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-2 text-label-md font-label-md text-secondary">
<span data-icon-missing="domain_disabled" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>حالت نمایشی سیستم: نمونه وضعیت شرکت‌های فاقد پروژه جاری</span>
</div>
<span class="text-label-md font-label-md px-2 py-0.5 bg-surface border border-border text-outline">
            کامپوننت رزرو وضعیت خالی
          </span>
</div>
<!-- The Minimal Empty State Box -->
<div class="w-full bg-surface border border-border p-12 md:p-16 flex flex-col items-center justify-center text-center">
<!-- Distinct Minimal Emblem Badge -->
<div class="w-16 h-16 bg-surface-container-lowest border border-border flex items-center justify-center text-secondary mb-6">
<span data-icon-missing="architecture" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<!-- Polite Formal Notice Headline -->
<h3 class="text-headline-sm font-headline-sm font-bold text-ink mb-3 tracking-tight">
            بررسی فرصت‌های سرمایه‌گذاری و توسعه جدید
          </h3>
<!-- Exact Polite Notice Body Text -->
<p class="text-body-md font-body-md text-on-surface-variant max-w-2xl leading-relaxed">
            در حال حاضر پروژه‌ای در این بخش تعریف نشده است — پروژه‌های جدید این شرکت پس از تصویب مطالعات فاز صفر منتشر خواهند شد.
          </p>
<!-- Direct Inquiries / Action Links -->
<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
<a class="px-5 py-2.5 bg-surface-container-lowest border border-border text-label-lg font-label-lg text-ink hover:border-primary-container hover:text-primary-container transition-colors" href="#">
              مشاهده طرح‌های توجیهی هلدینگ
            </a>
<a class="px-5 py-2.5 bg-primary-container text-surface-container-lowest text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors" href="#">
              استعلام پروژه‌های آتی و مزایدات
            </a>
</div>
</div>
</div>
</section>
</main>
<!-- =========================================================================
       7. FOOTER (Official 5-column corporate footer of ICD Holding)
       ========================================================================= -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Corporate Ribbon -->
<div class="pb-12 border-b border-outline/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="w-10 h-10 bg-primary-container flex items-center justify-center text-surface-container-lowest font-headline-md font-bold">
            ث
          </div>
<div>
<div class="text-headline-sm font-headline-sm text-surface-container-lowest font-extrabold tracking-tight">
              شرکت بین‌المللی توسعه ساختمان (ثاخت)
            </div>
<div class="text-body-sm font-body-sm text-surface-variant/70 mt-0.5">
              بزرگ‌ترین هلدینگ ساختمانی بازار سرمایه و پیشگام انبوه‌سازی مهندسی کشور
            </div>
</div>
</div>
<div class="flex items-center gap-3">
<span class="text-label-md font-label-md text-surface-dim">شماره تماس مرکزی:</span>
<span class="text-body-md font-body-md font-bold text-surface-container-lowest tabular-nums dir-ltr">۰۲۱-۸۸۸۸۴۵۲۰</span>
</div>
</div>
<!-- 5-Column Architectural Grid -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 py-12 border-b border-outline/30">
<!-- Column 1: معرفی و حاکمیت -->
<div class="space-y-4">
<h4 class="text-label-lg font-label-lg text-brand-tint font-bold">
            معرفی و حاکمیت
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                معرفی هلدینگ و هیئت‌مدیره
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                شرکت‌های تابعه و کنسرسیوم
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                اساسنامه و خط‌مشی سازمانی
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                پایداری و استانداردهای مهندسی
              </a>
</li>
</ul>
</div>
<!-- Column 2: پرتفوی پروژه‌ها -->
<div class="space-y-4">
<h4 class="text-label-lg font-label-lg text-brand-tint font-bold">
            پرتفوی پروژه‌ها
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                پرتفوی پروژه‌های عمرانی
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                پروژه‌های بلندمرتبه‌سازی
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                مجموعه‌های اقامتی و تفریحی
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                ابنیه تجاری، اداری و خدماتی
              </a>
</li>
</ul>
</div>
<!-- Column 3: امور سهامداران و بازار -->
<div class="space-y-4">
<h4 class="text-label-lg font-label-lg text-brand-tint font-bold">
            امور سهامداران
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                سامانه سهامداران و کدال
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                صورت‌های مالی حسابرسی‌شده
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                گزارش‌های ماهانه دیده‌بان
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                حریم خصوصی و شفافیت مالی
              </a>
</li>
</ul>
</div>
<!-- Column 4: سرمایه‌گذاری و مناقصات -->
<div class="space-y-4">
<h4 class="text-label-lg font-label-lg text-brand-tint font-bold">
            فروش و معاملات
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                مناقصات و مزایده‌ها
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                واگذاری سهام شرکت‌های تابعه
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                شرایط تسهیلات و تسویه
              </a>
</li>
</ul>
</div>
<!-- Column 5: ارتباطات و دفتر مرکزی -->
<div class="space-y-4 col-span-2 md:col-span-1">
<h4 class="text-label-lg font-label-lg text-brand-tint font-bold">
            ارتباطات و رسانه
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                اخبار و رسانه دیجیتال
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                تماس و امور مشتریان
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">
                میز خدمت و پاسخگویی سریع
              </a>
</li>
<li class="pt-2 text-label-md text-surface-variant/80">
              تهران، میدان آرژانتین، خیابان احمد قصیر، خیابان هشتم، پلاک ۱۱
            </li>
</ul>
</div>
</div>
<!-- Bottom Copyright & Legal Line (Verbatim from JSON) -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-surface-dim gap-4">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6 text-label-md font-label-md">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پرتال داخلی کارکنان</a>
<span class="text-outline/40">|</span>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">ضوابط ساخت و مهندسی</a>
<span class="text-outline/40">|</span>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">نقشه سایت</a>
</div>
</div>
</div>
</footer>
</template>
