<!--
  Ported from the approved design at
  stitch_project_detail_page_template/companies_slug/ (ADR-013).

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
<!-- =========================================================================
       1. HEADER (TopNavBar Shared Component verbatim implementation)
       ========================================================================= -->

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
<div class="absolute inset-0 bg-cover bg-center" data-alt="A grand, monumental architectural photograph of towering modern reinforced concrete skyscrapers and monumental brutalist structures against a clear sharp daylight sky. The engineering craftsmanship shows clean geometric lines, precise balconies, and industrial structural elements. Deep shadows and cool high-contrast tones dominate the architectural landscape with authoritative civil engineering mood, corporate pristine lighting, and deep charcoal and steel blue accents." style="background-image: url('/img/placeholder.svg')"></div>
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
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="An expansive, commanding daylight architectural photograph of the famous Tehran International Tower standing tall against blue sky. Modern concrete facade, geometric wings, pristine architectural detailing, civil engineering symmetry, institutional clean lighting, and corporate real estate aesthetic with crisp structural outlines." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="A dignified wide-angle architectural photograph of the iconic ASP Residential and Commercial complex in Tehran. Brutalist concrete stepped modular towers, mid-century modernist precision, geometric balconies and landscaped institutional podiums under bright clear morning light with deep crisp architectural shadows." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Modern architectural photography of the luxury high-rise Kohsar residential tower and hotel in Mashhad near mountain backdrop. Contemporary stone and curtain-wall glass facade, geometric steel lines, crisp engineering precision, daylight urban scene with balanced corporate blue tones and zero decorative blur." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="A clean, monolithic architectural perspective of the modern Firoozeh commercial and office complex in Tabriz. Stone and composite facade with rational engineering rhythm, expansive glass storefronts, crisp urban setting, authoritative civil engineering quality with institutional lighting and neutral gray concrete textures." src="/img/placeholder.svg" />
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
</template>
