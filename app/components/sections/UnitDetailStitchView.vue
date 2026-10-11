<!--
  Ported from the approved design at
  stitch_project_detail_page_template/sales_units_id/ (ADR-013).

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
<!-- ================= TOP NAVIGATION BAR ================= -->
<header class="bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-6 md:px-12 max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Logo + Desktop Nav -->
<div class="flex items-center gap-10">
<a class="text-headline-md font-headline-md text-ink tracking-tight flex items-center gap-3" href="#">
<span class="w-8 h-8 bg-ink text-surface-container-lowest flex items-center justify-center font-bold text-lg">ث</span>
<span class="">هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-8 text-label-lg font-label-lg">
<a class="text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">درباره ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">پروژه‌ها</a>
<a class="border-b-2 border-primary-container text-primary-container font-bold pb-1" href="#">فروش و پیش‌فروش</a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">دیده‌بان ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left: Actions & Icon Controls -->
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center gap-2 border-l border-border pl-4">
<button aria-label="language" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150" title="زبان">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<button aria-label="search" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
</div>
<a class="hidden md:inline-flex items-center text-body-sm font-label-lg text-ink hover:text-primary-container px-3 py-2 border border-border hover:bg-surface transition-colors" href="#">
        ورود سهامداران
      </a>
<a class="inline-flex items-center text-label-lg font-label-lg bg-primary-container text-on-primary px-5 py-2.5 hover:bg-brand-blue-deep transition-colors duration-150" href="#consultation-form">
        مشاوره و تماس سریع
      </a>
</div>
</div>
</header>
<!-- ================= MAIN CONTENT ================= -->
<main class="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10">
<!-- 1. BACK LINK & BREADCRUMB -->
<div class="mb-8">
<a class="inline-flex items-center gap-2 text-body-md font-body-md text-primary-container hover:text-brand-blue-deep group font-semibold transition-all" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
<span class="">بازگشت به صفحه پروژه برج بین‌المللی تهران</span>
</a>
</div>
<!-- 2. HERO & VISUAL SHOWCASE -->
<section class="bg-surface-container-lowest border border-border p-6 md:p-10 mb-20 shadow-none">
<!-- Header Title and Unit Fast Facts -->
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-border">
<div>
<div class="flex flex-wrap items-center gap-3 mb-3">
<span class="bg-brand-tint text-primary-container font-label-lg text-label-md px-3 py-1 font-bold">
            آماده واگذاری
          </span>
<span class="text-secondary font-label-md text-label-md">
            کد سیستمی کاتالوگ: TEH-TW-1404
          </span>
<span class="text-outline-variant">•</span>
<span class="text-secondary font-label-md text-label-md">
            بال شرقی سازه اصلی
          </span>
</div>
<h1 class="text-headline-lg font-headline-lg text-ink tracking-tight">
          واحد ۱۴۰۴ - برج بین‌المللی تهران
        </h1>
<p class="text-body-lg font-body-lg text-on-surface-variant mt-3 max-w-3xl leading-relaxed">
          واحد مسکونی پرچمدار تیپ رویال با چشم‌انداز پانورامیک شهر و رشته‌کوه البرز، سازه مهندسی مقاوم در برابر زلزله با قاب بتن‌آرمه پیش‌تنیده و لابی اختصاصی.
        </p>
</div>
<div class="flex flex-col lg:items-end shrink-0 pt-2 lg:pt-0">
<span class="text-label-md font-label-md text-secondary uppercase tracking-wider">متراژ مفید داخلی</span>
<span class="text-headline-lg font-headline-lg text-ink font-bold tabular-nums">
          ۱۸۵ <span class="text-headline-sm font-headline-sm text-secondary font-medium">مترمربع</span>
</span>
<span class="text-body-sm font-body-sm text-status-success mt-1.5 flex items-center gap-1 font-semibold">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"  /></svg>
          دارای سند تک‌برگ رسمی عرصه و اعیان
        </span>
</div>
</div>
<!-- Luxury Integrated Photo Gallery Grid -->
<div class="my-8">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
<!-- Main Hero Feature Image -->
<div class="lg:col-span-8 relative aspect-[16/10] bg-ink overflow-hidden group cursor-pointer border border-border">
<img alt="سالن نشیمن لوکس واحد ۱۴۰۴ با دید پانوراما پایتخت و غروب آفتاب" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AEtjO1Uhzvhxx2CBumGhlmJBGvSMykD3hBHk0UcCBWYmU7Y7dfQiJ_9Wq2uMDNS7-DKaoZzcaJeH1qDiZQNA2w-8MUpWZ2QzI7DmvIKaFTvfz7WQS1lsiYszxZmcxTDPk6ciO4T_JAGWHl_ztetc5Ct5OifRcT6pNQI7ZY0DpwzkM4BCNrte2IQXqYuhAFM7VLEPRhsRzHMzhy4BhsT1W0ffiEWXyNGRQ7EyLaW75K38ACw7FhkTjjea-odcrWk" />
<div class="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent pointer-events-none"></div>
<div class="absolute bottom-5 right-5 text-surface-container-lowest z-10 flex items-center gap-2 bg-ink/85 px-4 py-2 backdrop-blur-sm border border-white/20">
<span data-icon-missing="camera" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="font-label-md text-label-md font-semibold">سالن نشیمن اصلی و دید وسیع افق پایتخت</span>
</div>
</div>
<!-- Secondary Mosaic Images -->
<div class="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
<div class="relative aspect-[16/10] lg:aspect-auto lg:h-[calc(50%-8px)] bg-ink overflow-hidden group cursor-pointer border border-border">
<img alt="اتاق خواب مستر رویال با پنجره‌های قدی و دید شبانه" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AEtjO1WExxsBsvXXD8nv1cmmtZObNhjbyJuNcmTRaJ-Ytw8FgXAP0BYeT6sZkCqxookJ6hZ6mpou4fS2zIPiX391BenKFb7mPEAjxRgkpbPZ235N-kSuIJVLckQUGc8OpgceatLvkBKJPn4QAmisFdcf_dVaWyKnfSb8NS20XjctYiHhENVzVzY4yee9ta3uuiIEUbltugvcHT3Drp4i4kWSav0bNLgk5fCPNWBAl4tPv61IPXeo-ZJaWlYoWYW3" />
<div class="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none"></div>
<div class="absolute bottom-3 right-3 text-surface-container-lowest z-10 flex items-center gap-1.5 bg-ink/85 px-3 py-1.5 text-label-md backdrop-blur-sm border border-white/20">
<span data-icon-missing="bed" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">سوئیت مستر رویال با کلوزت مستقل</span>
</div>
</div>
<div class="relative aspect-[16/10] lg:aspect-auto lg:h-[calc(50%-8px)] bg-ink overflow-hidden group cursor-pointer border border-border">
<img alt="آشپزخانه جزیره مدرن با متریال سنگ اسلب و تجهیزات توکار" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/AEtjO1Wk57PyN6FolhTCO_c12PCCfz5nBuGDjZfxPwN2nM9LNnpwvtj43tFvkLdlHnF_fQ3onUbaDeweQqIKoiB4HRkjPGclSM90Z2IkzHlrSWC98S97GsrSv_GMU0gtm4udlN9qyYXDLnBajb4mQK_vW0xil-GF_v299qXx1WN-Rzp_un3X4r-UQXQ0sA9MhJ1XBXpwMdqGIm9N2fEqyRcBxcQ2MkNpT2VkoY2e-hu5nHvPnL0o4F34Y6BzPkBf" />
<div class="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent pointer-events-none"></div>
<div class="absolute bottom-3 right-3 text-surface-container-lowest z-10 flex items-center gap-1.5 bg-ink/85 px-3 py-1.5 text-label-md backdrop-blur-sm border border-white/20">
<span data-icon-missing="countertops" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">آشپزخانه جزیره و فضای ناهارخوری</span>
</div>
<!-- Overlay badge for full gallery -->
<button class="absolute top-3 left-3 bg-surface-container-lowest/95 hover:bg-surface-container-lowest text-ink font-label-md text-label-md px-3.5 py-1.5 flex items-center gap-1.5 transition-colors duration-150 border border-border">
<span data-icon-missing="photo_library" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">مشاهده همه (۱۲ تصویر)</span>
</button>
</div>
</div>
</div>
</div>
<!-- Quick Metrics Strip -->
<div class="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-border pt-6 text-right border-t border-border">
<div class="py-3 md:py-0 px-4">
<div class="text-label-md font-label-md text-secondary">متراژ مفید داخلی</div>
<div class="text-headline-md font-headline-md text-ink font-bold mt-1 tabular-nums">۱۸۵ م.م</div>
</div>
<div class="py-3 md:py-0 px-4">
<div class="text-label-md font-label-md text-secondary">تعداد اتاق خواب</div>
<div class="text-headline-md font-headline-md text-ink font-bold mt-1">۳ خواب (۱ مستر)</div>
</div>
<div class="py-3 md:py-0 px-4">
<div class="text-label-md font-label-md text-secondary">طبقه قرارگیری</div>
<div class="text-headline-md font-headline-md text-ink font-bold mt-1">طبقه ۱۴</div>
</div>
<div class="py-3 md:py-0 px-4">
<div class="text-label-md font-label-md text-secondary">جهت و دید پنجره‌ها</div>
<div class="text-headline-md font-headline-md text-ink font-bold mt-1">جنوبی - غربی (۳۶۰°)</div>
</div>
<div class="py-3 md:py-0 px-4 col-span-2 md:col-span-1">
<div class="text-label-md font-label-md text-secondary">وضعیت سند</div>
<div class="text-headline-md font-headline-md text-ink font-bold mt-1 text-primary">سند تک‌برگ آماده</div>
</div>
</div>
</section>
<!-- 3. LARGE FLOOR PLAN SHOWCASE -->
<section class="bg-surface-container-lowest border border-border p-6 md:p-10 mb-20">
<div class="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-border gap-4">
<div>
<h2 class="text-headline-md font-headline-md text-ink">پلان معماری و دیاگرام فضایی</h2>
<p class="text-body-md font-body-md text-on-surface-variant mt-1.5">نقشه اجرایی تیپ معماری واحد ۱۴۰۴ با مقیاس ۱:۱۰۰ با تفکیک دقیق پهنه‌های خصوصی و عمومی</p>
</div>
<div class="flex items-center gap-3 shrink-0">
<button class="px-5 py-2.5 text-label-lg font-label-lg text-primary-container border border-primary-container hover:bg-brand-tint/30 transition-colors flex items-center gap-2">
<span data-icon-missing="file_download" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">دانلود PDF مقیاس‌دار</span>
</button>
<button class="px-5 py-2.5 text-label-lg font-label-lg text-ink bg-surface border border-border hover:bg-surface-alt transition-colors flex items-center gap-2">
<span data-icon-missing="zoom_in" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">بزرگ‌نمایی جزئیات</span>
</button>
</div>
</div>
<!-- Floor Plan Canvas / High-Res Engineering View -->
<div class="relative bg-surface p-4 md:p-8 border border-border flex flex-col items-center justify-center">
<div class="w-full max-w-4xl bg-surface-container-lowest border border-border p-6 relative overflow-hidden">
<div class="flex flex-wrap items-center justify-between border-b border-border pb-3 mb-5 text-label-md font-label-md text-secondary gap-3">
<span class="font-bold text-ink">کد نقشه: DWG-PLN-1404-REV05</span>
<span class="">مقیاس تایید شده: 1/100 @ A2</span>
<span class="">جهت شمال: ↑ ۳۵ درجه زاویه تابش خورشیدی</span>
</div>
<div class="w-full aspect-[16/10] bg-surface-alt relative overflow-hidden flex items-center justify-center border border-border">
<img alt="نقشه معماری دوبعدی مهندسی واحد مسکونی برج با تفکیک فضاها و مقیاس دقیق" class="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBovhS_18aW-l7R0wVWg6RW1kb8RY3d3hHrgX_kVjjgQSRms-PJHdje3ZZR5hBq0lXLjvenT67iPLl58MqxJ3t-czX-5-HcTxHPkwPpA_TnFMzW51LhdBvALbdvKfKS6RhowlxnQpHnF4Da069JdVtsCbFe8Y3EEGWB4vZiOQrjB6Asn8cZrMznlJaPryEtWR14svsfEPA2yz1oLO2pgg_SlItoLK2Z1LWkE2DLAnIWrvdMEHXH1Ts56A" />
</div>
<!-- Room Division Tags / Dimension Legend with High Contrast -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-border">
<div class="p-4 bg-surface-container-low border border-border">
<span class="text-label-md font-label-md text-secondary block font-medium">سالن پذیرایی و نشیمن</span>
<strong class="text-headline-sm font-headline-sm text-ink font-bold block mt-1">۶۲.۴ مترمربع</strong>
<span class="text-body-sm text-on-surface-variant block mt-1">دید مستقیم جنوب با پنجره قدی</span>
</div>
<div class="p-4 bg-surface-container-low border border-border">
<span class="text-label-md font-label-md text-secondary block font-medium">اتاق خواب مستر + کلوزت</span>
<strong class="text-headline-sm font-headline-sm text-ink font-bold block mt-1">۲۹.۸ مترمربع</strong>
<span class="text-body-sm text-on-surface-variant block mt-1">دارای سرویس وال‌هنگ مجزا</span>
</div>
<div class="p-4 bg-surface-container-low border border-border">
<span class="text-label-md font-label-md text-secondary block font-medium">آشپزخانه و لاندری</span>
<strong class="text-headline-sm font-headline-sm text-ink font-bold block mt-1">۲۲.۱ مترمربع</strong>
<span class="text-body-sm text-on-surface-variant block mt-1">طراحی نیمه‌جزیره با تهویه صنعتی</span>
</div>
<div class="p-4 bg-surface-container-low border border-border">
<span class="text-label-md font-label-md text-secondary block font-medium">تراس اختصاصی پوشیده</span>
<strong class="text-headline-sm font-headline-sm text-ink font-bold block mt-1">۱۳.۵ مترمربع</strong>
<span class="text-body-sm text-on-surface-variant block mt-1">دید باز غرب به سمت رشته‌کوه</span>
</div>
</div>
</div>
</div>
</section>
<!-- 4. CONSOLIDATED & TABBED SPECIFICATIONS -->
<section class="bg-surface-container-lowest border border-border p-6 md:p-10 mb-20" id="unit-specs-section">
<div class="border-b border-border pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 class="text-headline-md font-headline-md text-ink">شناسنامه فنی، سازه‌ای و حقوقی واحد</h2>
<p class="text-body-md font-body-md text-on-surface-variant mt-1.5">اطلاعات تفکیکی و تاییدشده نظام مهندسی و دفتر فنی هلدینگ ثاخت به تفکیک حوزه‌ها</p>
</div>
<div class="inline-flex items-center gap-2 text-label-md font-label-md text-secondary bg-surface px-4 py-2 border border-border shrink-0">
<span data-icon-missing="verified_user" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="font-semibold text-ink">دارای گواهی استاندارد کیفی ثاخت</span>
</div>
</div>
<!-- Tab Navigation Buttons -->
<div class="border-b border-border mb-8">
<div class="flex flex-wrap gap-2 -mb-px text-label-lg font-label-lg" role="tablist">
<button class="spec-tab-btn active px-5 py-3.5 border-b-2 border-primary-container text-primary-container font-bold flex items-center gap-2 hover:text-brand-blue-deep transition-colors bg-brand-tint/20" id="btn-tab-arch" onclick="switchTab('tab-arch')">
<span data-icon-missing="architecture" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">مشخصات معماری و فضایی</span>
</button>
<button class="spec-tab-btn px-5 py-3.5 border-b-2 border-transparent text-secondary flex items-center gap-2 hover:text-primary-container transition-colors" id="btn-tab-mep" onclick="switchTab('tab-mep')">
<span data-icon-missing="precision_manufacturing" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">سازه و تأسیسات مهندسی</span>
</button>
<button class="spec-tab-btn px-5 py-3.5 border-b-2 border-transparent text-secondary flex items-center gap-2 hover:text-primary-container transition-colors" id="btn-tab-amenities" onclick="switchTab('tab-amenities')">
<span data-icon-missing="local_parking" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">مشاعات و پارکینگ</span>
</button>
<button class="spec-tab-btn px-5 py-3.5 border-b-2 border-transparent text-secondary flex items-center gap-2 hover:text-primary-container transition-colors" id="btn-tab-legal" onclick="switchTab('tab-legal')">
<span data-icon-missing="gavel" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="">وضعیت اسناد و شرایط پرداخت</span>
</button>
</div>
</div>
<!-- Tab Contents Container with High Contrast & Polished Cards -->
<div class="tab-content-wrapper">
<!-- Tab 1: Architectural & Spatial -->
<div class="spec-tab-pane grid grid-cols-1 md:grid-cols-2 gap-5" id="tab-arch">
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="square_foot" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">متراژ مفید داخلی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۱۸۵ مترمربع</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">محاسبه دقیق بر پایه دستورالعمل تفکیک آپارتمان‌های اداره کل ثبت اسناد و املاک کشور.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="king_bed" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">اتاق‌ها و سوئیت مستر</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۳ خواب (۱ خواب مستر رویال ۲۹.۸ م.م)</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">همراه با کلوزت‌روم مستقل و سرویس بهداشتی اختصاصی با تجهیزات وال‌هنگ لوکس.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="weekend" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">سالن پذیرایی و نشیمن عمومی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۶۲.۴ مترمربع</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">پلان یکپارچه بدون ستون مزاحم، نورگیر مستقیم جنوبی با پنجره‌های قدی کف تا سقف.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="deck" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">آشپزخانه جزیره و تراس اختصاصی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">آشپزخانه ۲۲.۱ م.م + تراس ۱۳.۵ م.م</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">تراس مسقف با دید رو به رشته‌کوه البرز و لاندری مجزا با تهویه خروجی صنعتی اختصاصی.</p>
</div>
</div>
</div>
<!-- Tab 2: Structure & MEP Engineering -->
<div class="spec-tab-pane hidden grid grid-cols-1 md:grid-cols-2 gap-5" id="tab-mep">
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">اسکلت و استاندارد زلزله</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">بتن‌آرمه داکتیل پیش‌تنیده</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">طراحی سازه مقاوم در برابر زلزله‌های شدید با ضریب ایمنی ممتاز مبحث نهم مقررات ملی.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="thermostat" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">سرمایش، گرمایش و تهویه</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">چیلر جذبی مرکزی + فن‌کویل سقفی</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">کنترل مستقل دما در هر زون با ترموستات‌های هوشمند لمسی دیجیتال.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"  /></svg>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">جدارنما و پنجره‌ها</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">کرتین‌وال با شیشه ۳ جداره Low-E</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">عایق‌بندی صوت فوق‌پیشرفته آکوستیک و کنترل ضریب اتلاف حرارتی استاندارد بین‌المللی.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="security" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">ایمنی حریق و سیستم هوشمند (BMS)</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">سیستم اسپرینکلر و اعلان آدرس‌پذیر</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">متصل به شبکه مرکزی اطفاء هوشمند برج، مجهز به پنل هوشمند روشنایی و سنسور گاز شهری.</p>
</div>
</div>
</div>
<!-- Tab 3: Amenities & Parking -->
<div class="spec-tab-pane hidden grid grid-cols-1 md:grid-cols-2 gap-5" id="tab-amenities">
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="directions_car" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">پارکینگ سندی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۲ عدد سندی باکس بدون مزاحم</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">واقع در تراز منفی ۲ با ایستگاه اختصاصی شارژ سریع خودروهای برقی (EV Ready).</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="inventory_2" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">انباری اختصاصی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۸.۵ مترمربع سندی</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">واقع در طبقه منفی ۳ با تهویه مکانیکی دائم و درب ضدحریق استاندارد.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="elevator" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">آسانسور و دسترسی‌ها</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">۳ لاین پرسرعت (۳ متر بر ثانیه)</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">برند ویتور فنلاند شامل آسانسور برانکاردبر و سیستم هوشمند فراخوانی کابین.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="meeting_room" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">لابی و مشاعات خدماتی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">لابی‌من ۲۴ ساعته اختصاصی</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">لابی مرتفع با سقف ۶ متری، سالن اجتماعات تشریفاتی، سالن بدنسازی و مجموعه اسپا.</p>
</div>
</div>
</div>
<!-- Tab 4: Legal & Payment Terms -->
<div class="spec-tab-pane hidden grid grid-cols-1 md:grid-cols-2 gap-5" id="tab-legal">
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6"  /></svg>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">نوع سند و وضعیت ثبتی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">سند تک‌برگ عرصه و اعیان (ملکی)</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">فاقد هرگونه رهن، بازداشت یا حقوق معارض با تضامین حقوقی معتبر هلدینگ بین‌المللی ثاخت.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="event_available" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">وضعیت تحویل و گارانتی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">آماده تحویل فوری و سکونت</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">همراه با دفترچه ضمانت‌نامه کیفی و گارانتی ۱۲ ماهه حسن اجرای کلیه تأسیسات ساختمانی.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="payments" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">شرایط پرداخت و تسویه‌حساب</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">نقد و اقساط منعطف</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">امکان تسویه نقدی همراه با تخفیف مصوب و تسهیلات ویژه بر اساس ضوابط مالی هلدینگ.</p>
</div>
</div>
<div class="p-6 bg-surface-container-low border border-border flex items-start gap-4">
<div class="w-12 h-12 bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
<span data-icon-missing="policy" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<div class="flex-grow">
<span class="text-label-md font-label-md text-secondary block font-semibold">دفترچه فنی و نقشه‌های اجرایی</span>
<strong class="text-headline-sm font-headline-sm text-ink block mt-1">شناسنامه فنی ملکی نظام مهندسی</strong>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-2 leading-relaxed">تحویل رسمی نسخه کامل نقشه‌های As-Built الکتریکال و مکانیکال به خریدار در زمان عقد قرارداد.</p>
</div>
</div>
</div>
</div>
</section>
<!-- 5. DIRECT BOOKING / INQUIRY CTA BOX -->
<section class="bg-primary text-surface-container-lowest p-8 md:p-12 mb-20 border border-primary-container shadow-none flex flex-col md:flex-row items-center justify-between gap-8">
<div class="max-w-2xl">
<div class="text-brand-tint font-label-lg text-label-md mb-2.5 flex items-center gap-2">
<span class="w-2.5 h-2.5 bg-brand-tint inline-block"></span>
<span class="">بخش امور فروش و سرمایه‌گذاری هلدینگ ثاخت</span>
</div>
<h3 class="text-headline-md font-headline-md text-surface-container-lowest font-bold">
        درخواست استعلام قیمت و هماهنگی بازدید حضوری
      </h3>
<p class="text-body-md font-body-md text-surface-variant mt-2 leading-relaxed">
        کارشناسان حقوقی و مهندسی فروش هلدینگ ثاخت آماده ارائه پیش‌نویس قرارداد، جدول زمان‌بندی اقساط و هماهنگی بازدید میدانی از این واحد می‌باشند.
      </p>
</div>
<!-- Single Focused CTA Button -->
<div class="shrink-0 w-full md:w-auto">
<a class="inline-flex justify-center items-center w-full md:w-auto px-8 py-4 bg-surface-container-lowest text-primary text-headline-sm font-label-lg font-bold hover:bg-brand-tint transition-colors duration-150 gap-3 border border-transparent shadow-none" href="#consultation-form">
<span class="">درخواست استعلام قیمت و بازدید</span>
<span data-icon-missing="arrow_right_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</a>
</div>
</section>
<!-- 6. SHORT CONSULTATION FORM -->
<section class="w-full max-w-4xl mx-auto mb-24" id="consultation-form">
<div class="bg-surface-container-lowest border border-border p-8 md:p-12">
<div class="border-b border-border pb-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
<div>
<h4 class="text-headline-sm font-headline-sm text-ink font-bold">ثبت درخواست متقاضی واحد ۱۴۰۴</h4>
<p class="text-body-sm font-body-sm text-on-surface-variant mt-1">اطلاعات شما محرمانه تلقی شده و حداکثر ظرف ۴ ساعت کاری با شما تماس گرفته خواهد شد.</p>
</div>
<span class="text-label-md font-label-md bg-surface px-3.5 py-1.5 border border-border text-secondary self-start sm:self-auto font-medium">
          سامانه امن متقاضیان ثاخت
        </span>
</div>
<form class="grid grid-cols-1 md:grid-cols-3 gap-6" onsubmit="event.preventDefault(); alert('درخواست بازدید شما برای واحد ۱۴۰۴ با موفقیت ثبت شد.');">
<div>
<label class="block text-label-md font-label-md text-ink mb-2 font-semibold">نام و نام خانوادگی</label>
<input class="w-full border border-border bg-surface-container-lowest p-3.5 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" placeholder="مثال: دکتر علیرضا رضایی" required="" type="text" />
</div>
<div>
<label class="block text-label-md font-label-md text-ink mb-2 font-semibold">شماره تماس مستقیم (همراه)</label>
<input class="w-full border border-border bg-surface-container-lowest p-3.5 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container text-right" dir="ltr" placeholder="۰۹۱۲..." required="" type="tel" />
</div>
<div>
<label class="block text-label-md font-label-md text-ink mb-2 font-semibold">زمان پیشنهادی جهت تماس یا بازدید</label>
<select class="w-full border border-border bg-surface-container-lowest p-3.5 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container">
<option>صبح (ساعت ۹ الی ۱۳)</option>
<option>عصر (ساعت ۱۴ الی ۱۸)</option>
<option>روزهای پنجشنبه (ساعت ۱۰ الی ۱۴)</option>
</select>
</div>
<div class="md:col-span-3 flex justify-end pt-4">
<button class="bg-ink text-surface-container-lowest hover:bg-primary px-9 py-3.5 font-label-lg text-label-lg font-bold transition-colors cursor-pointer" type="submit">
            تایید و ثبت نهایی درخواست
          </button>
</div>
</form>
</div>
</section>
</main>
<!-- ================= OFFICIAL 5-COLUMN FOOTER ================= -->
<footer class="bg-ink text-surface-container-lowest border-t border-border mt-auto">
<div class="w-full py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
<!-- Top Grid: 5 Institutional Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-inverse-surface">
<!-- Column 1: Identity & Intro -->
<div class="lg:col-span-1">
<div class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 flex items-center gap-2">
<span class="w-7 h-7 bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm">ث</span>
<span class="">هلدینگ ساختمانی ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed">
          شرکت بین‌المللی توسعه ساختمان (ثاخت)، بزرگترین هلدینگ انبوه‌سازی و توسعه پروژه‌های بلندمرتبه در بورس اوراق بهادار تهران.
        </p>
<div class="mt-4 pt-4 border-t border-inverse-surface text-label-md text-brand-tint">
          نماد بورسی: ثاخت | سرمایه ثبت شده: ۳۰,۰۰۰ میلیارد ریال
        </div>
</div>
<!-- Column 2: Governance & Projects -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest font-bold mb-4 pb-1 border-b border-inverse-surface">
          معرفی و پروژه‌ها
        </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">معرفی هلدینگ و هیئت‌مدیره</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پرتفوی پروژه‌های عمرانی</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">پایداری و استانداردهای مهندسی</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">مناقصات و مزایده‌ها</a>
</li>
</ul>
</div>
<!-- Column 3: Shareholder & Finance -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest font-bold mb-4 pb-1 border-b border-inverse-surface">
          سهامداران و شفافیت
        </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">سامانه سهامداران و کدال</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">گزارش‌های ماهانه دیده‌بان</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">حریم خصوصی و شفافیت مالی</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">افشای اطلاعات بااهمیت الف و ب</a>
</li>
</ul>
</div>
<!-- Column 4: Sales & Investment -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest font-bold mb-4 pb-1 border-b border-inverse-surface">
          فروش و سرمایه‌گذاری
        </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li class="">
<a class="text-surface-container-lowest font-bold text-brand-tint" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">استعلام وضعیت قراردادها</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">فروش متری در بورس مسکن</a>
</li>
<li class="">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">اخبار و رسانه دیجیتال</a>
</li>
</ul>
</div>
<!-- Column 5: Communication & Headquarters -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest font-bold mb-4 pb-1 border-b border-inverse-surface">
          تماس و امور مشتریان
        </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm text-surface-dim">
<li class="flex items-start gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"  /></svg>
<span class="">تهران، میدان ونک، خیابان ملاصدرا، شماره ۱۲۰</span>
</li>
<li class="flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"  /></svg>
<span dir="ltr" class="">+98 (21) 8860 4000</span>
</li>
<li class="flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"  /></svg>
<span class="">sales@sakht-holding.com</span>
</li>
<li class="pt-2">
<span class="inline-block px-3 py-1 bg-inverse-surface text-brand-tint text-label-md">مرکز ارتباط با ذینفعان ۲۴/۷</span>
</li>
</ul>
</div>
</div>
<!-- Bottom Bar: Exact Copyright Text -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-surface-dim gap-4">
<div class="">
        © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
      </div>
<div class="flex items-center gap-6 text-label-md">
<span class="">طراحی صنعتی و نظام مهندسی ثاخت</span>
<span class="">سامانه رسمی نظارت بر انبوه‌سازی</span>
</div>
</div>
</div>
</footer>
<!-- Interactive Tab Switching Script -->
</template>
