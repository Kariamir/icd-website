<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects/ (ADR-013).

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
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Logo & Primary Nav Links -->
<div class="flex items-center gap-10">
<NuxtLink class="flex items-center gap-3" to="/">
<div class="w-9 h-9 bg-ink flex items-center justify-center text-surface-container-lowest font-headline-md text-headline-md tracking-tighter">
            ث
          </div>
<div class="flex flex-col">
<span class="text-headline-md font-headline-md text-ink tracking-tight leading-tight">هلدینگ ساختمانی ثاخت</span>
<span class="text-label-md font-label-md text-outline tracking-wider">ICD HOLDING</span>
</div>
</NuxtLink>
<!-- Desktop Navigation Items -->
<nav class="hidden lg:flex items-center gap-7 pt-1">
<NuxtLink class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" to="/about">
            درباره ثاخت
          </NuxtLink>
<!-- Active Tab: پروژه‌ها -->
<NuxtLink class="text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container font-bold pb-1 transition-colors duration-150" to="/projects">
            پروژه‌ها
          </NuxtLink>
<NuxtLink class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" to="/sales">
            فروش و پیش‌فروش
          </NuxtLink>
<NuxtLink class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" to="/ir">
            دیده‌بان ثاخت
          </NuxtLink>
<NuxtLink class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" to="/media">
            رسانه ثاخت
          </NuxtLink>
</nav>
</div>
<!-- Left: Actions & Utility Controls -->
<div class="flex items-center gap-3">
<!-- Icons -->
<div class="flex items-center gap-1 pl-3 border-l border-border">
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors flex items-center gap-1 text-label-md font-label-md" title="Language">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
<span class="font-headline-sm text-[12px] uppercase tracking-wider">EN</span>
</button>
</div>
<!-- Shareholders Portal (Secondary) -->
<NuxtLink class="hidden sm:inline-flex items-center px-4 py-2 text-label-lg font-label-lg text-primary-container border border-primary-container hover:bg-brand-tint transition-colors duration-150" to="/ir">
          ورود سهامداران
        </NuxtLink>
<!-- Fast Consultation CTA (Primary) -->
<NuxtLink class="inline-flex items-center px-5 py-2 text-label-lg font-label-lg text-on-primary bg-primary-container hover:bg-brand-blue-deep transition-colors duration-150" to="/contact">
          مشاوره و تماس سریع
        </NuxtLink>
</div>
</div>
</header>
<!-- ================= SECTION 1: HERO ================= -->
<section class="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[780px] bg-ink overflow-hidden border-b border-border">
<!-- Architectural Hero Photograph -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="A grand monument of contemporary high-rise architecture showcasing monolithic fair-faced concrete frames, cantilevered glass curtain facades, and precision steel elements. Shot at dusk with crisp sharp shadows under an overcast corporate sky. Deep institutional slate blues and pale gray structural surfaces evoke monumental stability and national civil engineering prowess." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuA33YfmDQYhrRVYLDRe52Qz6uMlytIN5fk5aiXn-bLyDwZn0r15N8tgeD3dyVMZrpFmYxCeJSWXr9JlWvYGWpo0DKq8WKFLBqSsCjh96KsbCMftGVqgGEyZGsL1NEAIoxlA1Rr_kpta6hNCoyUEzWpXBtUJYqwMK09psLHWQTtNTexNW63h5dL9HkAERvtzGoI5iK-5cnntUGhIPeCn419MsT_tcfLAg6jRWFq_MSBWo6TBftLUhUefDg')">
</div>
<!-- 35% Deep Dark Scrim Overlay -->
<div class="absolute inset-0 bg-ink/35"></div>
<!-- Content anchored Bottom-Right (Museum Wall Label Aesthetic) -->
<div class="relative h-full max-w-[1440px] mx-auto px-space-lg md:px-margin flex flex-col justify-end pb-16 md:pb-20">
<div class="border-r-4 border-primary-container pr-6 md:pr-8 max-w-3xl">
<h1 class="text-headline-xl-mobile md:text-headline-xl font-headline-xl text-surface-container-lowest tracking-tight">
          پروژه‌ها و کارنامه ساختمانی
        </h1>
<p class="mt-3 text-body-lg font-body-lg text-surface-alt tracking-wide font-normal">
          نمادهای معماری پایدار و کلان‌سازه‌های مهندسی ایران
        </p>
</div>
</div>
</section>
<!-- ================= SECTION 2: MAP EXPLORER BLOCK ================= -->
<section class="w-full bg-surface py-[120px] border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Section Label & Editorial Header -->
<div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border">
<div>
<span class="text-label-md font-label-md text-primary-container uppercase tracking-widest block mb-1">
            GIS INFRASTRUCTURE DIRECTORY
          </span>
<h2 class="text-headline-lg font-headline-lg text-ink">
            کاوشگر جغرافیایی پروژه‌ها
          </h2>
</div>
<p class="text-body-sm font-body-sm text-outline mt-2 md:mt-0 max-w-md">
          پراکندگی متوازن کلان‌پروژه‌های عمرانی، اقامتی و برج‌های تجاری در قطب‌های راهبردی کشور
        </p>
</div>
<!-- The Architectural Map Container (~560px Height) -->
<div class="relative w-full h-[560px] bg-[#10222F] border border-border overflow-hidden technical-grid">
<!-- Subtle Stylized Architectural Map Background Texture -->
<div class="absolute inset-0 opacity-40">
<svg class="w-full h-full object-cover" preserveAspectRatio="none" viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg">
<path d="M 0,180 Q 250,140 500,210 T 1000,160" fill="none" stroke="#264559" stroke-dasharray="6,4" stroke-width="1.5" /></path>
<path d="M 0,380 Q 320,410 650,340 T 1000,420" fill="none" stroke="#264559" stroke-dasharray="6,4" stroke-width="1.5" /></path>
<path d="M 280,0 L 340,560" fill="none" stroke="#1D384A" stroke-width="1" /></path>
<path d="M 720,0 L 680,560" fill="none" stroke="#1D384A" stroke-width="1" /></path>
<!-- Simplified Iran Outline Vectors -->
<polygon fill="rgba(4, 28, 44, 0.45)" points="180,80 340,40 520,70 780,110 890,260 760,490 560,520 380,480 210,380 140,240" stroke="#264559" stroke-width="1.5" /></polygon>
</svg>
</div>
<!-- Coordinates HUD (Top-Right) -->
<div class="absolute top-6 right-6 z-20 bg-ink/90 backdrop-blur-none border border-border text-surface-container-lowest p-4 max-w-xs">
<div class="flex items-center gap-2 mb-1">
<span class="inline-block w-2 h-2 bg-primary-container"></span>
<span class="text-label-md font-label-md tracking-widest uppercase">سامانه موقعیت‌سنجی عمران</span>
</div>
<div class="text-[11px] font-mono text-outline-variant space-y-0.5" dir="ltr">
<div>IRN-GEO // 35.6892° N, 51.3890° E</div>
<div>STATUS: ONLINE • 5 STRATEGIC HUBS</div>
</div>
</div>
<!-- Stylized Location Pins with Radar Accents -->
<!-- Pin: تهران (Tehran) -->
<div class="absolute top-[32%] right-[44%] z-20 group cursor-pointer">
<div class="relative flex items-center justify-center">
<span class="absolute w-8 h-8 bg-primary-container/20 animate-ping"></span>
<span class="w-3.5 h-3.5 bg-primary-container border-2 border-surface-container-lowest"></span>
</div>
<div class="absolute -top-9 right-1/2 translate-x-1/2 bg-ink text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md whitespace-nowrap border border-border group-hover:bg-primary-container transition-colors">
            تهران (۲۸ پروژه)
          </div>
</div>
<!-- Pin: مشهد (Mashhad) -->
<div class="absolute top-[28%] right-[22%] z-20 group cursor-pointer">
<div class="w-3 h-3 bg-brand-tint border-2 border-ink"></div>
<div class="absolute -top-9 right-1/2 translate-x-1/2 bg-ink text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md whitespace-nowrap border border-border group-hover:bg-primary-container transition-colors">
            مشهد (۹ پروژه)
          </div>
</div>
<!-- Pin: نوشهر (Nowshahr) -->
<div class="absolute top-[24%] right-[52%] z-20 group cursor-pointer">
<div class="w-3 h-3 bg-brand-tint border-2 border-ink"></div>
<div class="absolute -top-9 right-1/2 translate-x-1/2 bg-ink text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md whitespace-nowrap border border-border group-hover:bg-primary-container transition-colors">
            نوشهر و خطه شمال (۶ پروژه)
          </div>
</div>
<!-- Pin: شیراز (Shiraz) -->
<div class="absolute top-[62%] right-[48%] z-20 group cursor-pointer">
<div class="w-3 h-3 bg-brand-tint border-2 border-ink"></div>
<div class="absolute -top-9 right-1/2 translate-x-1/2 bg-ink text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md whitespace-nowrap border border-border group-hover:bg-primary-container transition-colors">
            شیراز (۵ پروژه)
          </div>
</div>
<!-- Pin: کیش (Kish Island) -->
<div class="absolute bottom-[16%] right-[55%] z-20 group cursor-pointer">
<div class="relative flex items-center justify-center">
<span class="w-3 h-3 bg-primary-container border-2 border-surface-container-lowest"></span>
</div>
<div class="absolute -top-9 right-1/2 translate-x-1/2 bg-ink text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md whitespace-nowrap border border-border group-hover:bg-primary-container transition-colors">
            جزیره کیش (۱۱ پروژه)
          </div>
</div>
<!-- Minimalist Corner Zoom & Map View Controls (Bottom-Left) -->
<div class="absolute bottom-6 left-6 z-20 flex items-center bg-ink border border-border">
<button class="w-10 h-10 flex items-center justify-center text-surface-container-lowest hover:bg-primary-container transition-colors border-l border-border" title="Zoom In">
<span data-icon-missing="add" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</button>
<button class="w-10 h-10 flex items-center justify-center text-surface-container-lowest hover:bg-primary-container transition-colors border-l border-border" title="Zoom Out">
<span data-icon-missing="remove" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</button>
<button class="px-3 h-10 flex items-center gap-1.5 text-label-md font-label-md text-surface-container-lowest hover:bg-primary-container transition-colors" title="Full Map Screen">
<span data-icon-missing="fullscreen" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>نمایش کامل</span>
</button>
</div>
<!-- Legend Label (Bottom-Right) -->
<div class="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-4 bg-ink/90 border border-border px-4 py-2.5 text-surface-container-lowest text-label-md font-label-md">
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 bg-primary-container inline-block"></span>
<span>پروژه‌های کلان ملی</span>
</div>
<div class="flex items-center gap-2">
<span class="w-2.5 h-2.5 bg-brand-tint inline-block"></span>
<span>مجموعه‌های استانی و منطقه‌ای</span>
</div>
</div>
</div>
</div>
</section>
<!-- ================= SECTION 3: FOUR LARGE ENTRY TILES ================= -->
<!-- Strict: Exactly 4 massive tiles by status, no filters, no sort bars -->
<section class="w-full bg-surface-container-lowest py-[120px]">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Section Title Header -->
<div class="mb-12 border-b border-border pb-6 flex flex-col md:flex-row md:items-end justify-between">
<div>
<span class="text-label-md font-label-md text-primary-container uppercase tracking-widest block mb-1">
            PORTFOLIO CLASSIFICATION
          </span>
<h2 class="text-headline-lg font-headline-lg text-ink">
            وضعیت پروژه‌ها
          </h2>
</div>
<p class="text-body-md font-body-md text-outline mt-3 md:mt-0 max-w-lg">
          طبقه‌بندی ساختاریافته طرح‌ها در زنجیره ارزش عمران؛ از طراحی مفهومی تا تحویل و مدیریت بهره‌برداری
        </p>
</div>
<!-- 2x2 Architectural Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- 1. آتی (Upcoming) -->
<NuxtLink class="group relative block aspect-[16/10] bg-ink overflow-hidden border border-border" to="/projects/upcoming">
<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Photorealistic architectural visualization rendering of a visionary mega-complex planned with sustainable zero-emission materials, cantilevered sky gardens, and geometric lattice screens. Set against a serene overcast dawn sky with pure architectural clarity, sharp lines, and restrained institutional gray and blue tones." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeCzbrpcqMC--h9HITn4k5lSCv6Riz8UyE55DaVTEX_pQUGyjItnznVMhJkQ0VfHXjyoBsUmzKexqHgu91L2-G0byjzuSdswaHaPU3Ek0TVOuY4scsS5bfeQEZB4qQd77oSxhTlBLPht6zKli0emqt0daJNqoAsC1F5KnMBxllu_Q4Aa1jjXk8NiXbSsQVjmcmbAKwqtHFpcUej2Kq6I7bP59UHqoUa1gq9SOMTGhJ2JSsUatNoRnqNQ')">
</div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors duration-300"></div>
<!-- Top Badge: Upcoming (آتی) -->
<div class="absolute top-6 left-6 z-10">
<span class="inline-block px-3 py-1 bg-surface-alt text-ink border border-border text-label-md font-label-md tracking-wider">
              آتی
            </span>
</div>
<!-- Bottom Label Stack -->
<div class="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
<div class="border-r-2 border-surface-container-lowest pr-4 transition-all duration-300 group-hover:border-primary-container">
<h3 class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight mb-2">
                پروژه‌های آتی
              </h3>
<p class="text-body-md font-body-md text-surface-alt">
                طرح‌های در دست مطالعه و آماده آغاز
              </p>
</div>
<div class="mt-6 flex items-center justify-between text-surface-container-lowest pt-4 border-t border-surface-container-lowest/20">
<span class="text-label-md font-label-md text-brand-tint group-hover:underline">ورود به مجموعه طرح‌های آتی</span>
<span data-icon-missing="arrow_left_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
</NuxtLink>
<!-- 2. در حال ساخت (Under Construction) -->
<NuxtLink class="group relative block aspect-[16/10] bg-ink overflow-hidden border border-border" to="/projects/under-construction">
<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Dynamic documentary photograph of a major real estate infrastructure site actively under development. Towering yellow cranes, precision post-tensioned concrete framework, steel rebar reinforcement grids, and civil engineers on site. High daylight contrast, authoritative industrial aesthetic, and precise engineering craftsmanship." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-KglGnG8Td6GVVWdkVhmbGIEvh07K59AfUjx3bGffVxqNUKHJykuwMhl6b1RtKibX4rKcUP5qa1bQj9C0UzlB-8STRKSXzrdXFunx7H5BqEV1ZkAA_n12xO3CnT9Cti89mVCHFBuDnjo5ufXiaf1O8vsMhubyKdTK4bVh6hnq2PVOlwMCKhUSaFDx-SAtSIv1OSuk-WM2hr7yNAHr1WpG4JnC9wRrk7AWpwV4JpHjnJaY5hqnCDjjBg')">
</div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors duration-300"></div>
<!-- Top Badge: Under Construction (در حال ساخت) -->
<div class="absolute top-6 left-6 z-10">
<span class="inline-block px-3 py-1 bg-brand-tint text-primary-container border-0 text-label-md font-label-md tracking-wider">
              در حال ساخت
            </span>
</div>
<!-- Bottom Label Stack -->
<div class="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
<div class="border-r-2 border-surface-container-lowest pr-4 transition-all duration-300 group-hover:border-primary-container">
<h3 class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight mb-2">
                پروژه‌های در حال ساخت
              </h3>
<p class="text-body-md font-body-md text-surface-alt">
                عملیات عمرانی جاری و توسعه فعال
              </p>
</div>
<div class="mt-6 flex items-center justify-between text-surface-container-lowest pt-4 border-t border-surface-container-lowest/20">
<span class="text-label-md font-label-md text-brand-tint group-hover:underline">ورود به فهرست کارگاه‌های عمرانی</span>
<span data-icon-missing="arrow_left_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
</NuxtLink>
<!-- 3. در حال بهره‌برداری (Operating) -->
<NuxtLink class="group relative block aspect-[16/10] bg-ink overflow-hidden border border-border" to="/projects/operating">
<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Editorial architectural photo of a delivered premier mixed-use commercial and residential tower complex in full active operation. Polished marble lobbies, manicured linear plaza with water features, occupants in professional attire, refined evening facade illumination under an authoritative navy blue sky." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsTFCAjb2yTjaXvvJP38AOiOgrUOhGH8ILjqValBL1WotFfrwb929FzCqsfSgpw_yOCy4EUTWyh6pFLVSjGtGJezCLIziUg7trRlzzs1ozo_DWQNunu4JULebOu8YhWU__lAsSGZnyDVZmyx9rjgLI9OL5XHf6YIWDfqzXF0Lxij2In3ZTalhZwoe-IQV4ENPOtHGzM-vhozpzrzyvMoVVWDDjOpkA2KirPwYnvv_KWaPwBr-1ylDSNA')">
</div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors duration-300"></div>
<!-- Top Badge: In Operation (در حال بهره‌برداری) -->
<div class="absolute top-6 left-6 z-10">
<span class="inline-block px-3 py-1 bg-primary-container text-surface-container-lowest border-0 text-label-md font-label-md tracking-wider">
              در حال بهره‌برداری
            </span>
</div>
<!-- Bottom Label Stack -->
<div class="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
<div class="border-r-2 border-surface-container-lowest pr-4 transition-all duration-300 group-hover:border-primary-container">
<h3 class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight mb-2">
                پروژه‌های در حال بهره‌برداری
              </h3>
<p class="text-body-md font-body-md text-surface-alt">
                مدیریت دارایی و بهره‌برداری پایدار
              </p>
</div>
<div class="mt-6 flex items-center justify-between text-surface-container-lowest pt-4 border-t border-surface-container-lowest/20">
<span class="text-label-md font-label-md text-brand-tint group-hover:underline">مشاهده دارایی‌های بهره‌برداری شده</span>
<span data-icon-missing="arrow_left_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
</NuxtLink>
<!-- 4. تکمیل‌شده (Completed) -->
<NuxtLink class="group relative block aspect-[16/10] bg-ink overflow-hidden border border-border" to="/projects/completed">
<div class="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Striking wide-angle photograph of an iconic completed architectural landmark delivered by ICD Holding. Ultra-clean geometric facades, travertine stone cladding, monumental entrance portico, sharp symmetry, shot with midday directional architectural lighting highlighting structural integrity and permanent permanence." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVksCZRtIl4J98HxZv4Umu0KDJEMB8b_Z4VhW-DCYLF3NsqMhNwWGJ3kI1GEI_i0myNZ3Rr9SsHkTnRk84dtESaBN98SsRfwPqaaDFqQURcYa7EEExyGtV_Pkw38jo6HvUfnx6XUQu6fVqtyf4vsTu06Qfu_A1QieR6dh_LTLF_6aZKtmHHe5Qlyf8tZ4LVL0ecbBIAVHTMDeKON0zYON2uDq7sBvGw_t2T-o41cAOidLsk58wiE9R_g')">
</div>
<div class="absolute inset-0 bg-ink/50 group-hover:bg-ink/40 transition-colors duration-300"></div>
<!-- Top Badge: Completed (تکمیل‌شده) -->
<div class="absolute top-6 left-6 z-10">
<span class="inline-block px-3 py-1 bg-ink text-surface-container-lowest border border-border text-label-md font-label-md tracking-wider">
              تکمیل‌شده
            </span>
</div>
<!-- Bottom Label Stack -->
<div class="absolute inset-x-0 bottom-0 p-8 z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
<div class="border-r-2 border-surface-container-lowest pr-4 transition-all duration-300 group-hover:border-primary-container">
<h3 class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight mb-2">
                پروژه‌های تکمیل‌شده
              </h3>
<p class="text-body-md font-body-md text-surface-alt">
                کارنامه اجرایی و تحویل قطعی
              </p>
</div>
<div class="mt-6 flex items-center justify-between text-surface-container-lowest pt-4 border-t border-surface-container-lowest/20">
<span class="text-label-md font-label-md text-brand-tint group-hover:underline">بررسی کارنامه تاریخی و ابنیه تحویلی</span>
<span data-icon-missing="arrow_left_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
</NuxtLink>
</div>
</div>
</section>
<!-- ================= UNIFIED INSTITUTIONAL FOOTER ================= -->
<footer class="bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid: Brand Column + 4 Structural Nav Columns = 5 Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-border/20">
<!-- Col 1: Corporate Brand & Profile -->
<div class="lg:col-span-1">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-headline-sm">
              ث
            </div>
<span class="text-headline-sm font-headline-sm text-surface-container-lowest">
              هلدینگ ساختمانی ثاخت
            </span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed mb-6">
            شرکت بین‌المللی توسعه ساختمان (ثاخت)، بزرگ‌ترین نهاد توسعه املاک و مستغلات بورسی کشور با بیش از سه دهه سابقه پیشتازی در ساخت ابنیه تمدنی.
          </p>
<div class="text-label-md font-label-md text-outline-variant space-y-1">
<div>نماد معاملاتی بورس: <span class="text-brand-tint font-bold">ثاخت</span></div>
<div>شناسه ملی: ۱۰۱۰۰۸۶۶۰۹۵</div>
</div>
</div>
<!-- Col 2: هویت و پورتفو -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            هویت و پورتفو
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/about">
                معرفی هلدینگ و هیئت‌مدیره
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-container-lowest font-bold hover:text-brand-tint transition-colors" to="/projects">
                پرتفوی پروژه‌های عمرانی
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/sustainability">
                پایداری و استانداردهای مهندسی
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 3: سهامداران و بازار سرمایه -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            سهامداران و بورس
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir">
                سامانه سهامداران و کدال
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/media?category=tenders">
                مناقصات و مزایده‌ها
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/financial-reports">
                حریم خصوصی و شفافیت مالی
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 4: پیش‌فروش و رسانه -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            پیش‌فروش و تحلیل
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/sales">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/media">
                اخبار و رسانه دیجیتال
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir">
                گزارش‌های ماهانه دیده‌بان
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 5: تماس و امور مشتریان -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            ارتباطات سازمانی
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm mb-4">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/contact">
                تماس و امور مشتریان
              </NuxtLink>
</li>
</ul>
<div class="bg-surface-container-low/10 border border-border/30 p-3 text-label-md font-label-md text-surface-dim">
<div class="text-surface-container-lowest font-bold mb-1">مرکز پاسخگویی متمرکز:</div>
<div class="text-left font-mono text-brand-tint" dir="ltr">۰۲۱ - ۸۸۶۶۴۴۰۰</div>
<div class="mt-1 text-[11px] text-outline-variant">تهران، خیابان ولیعصر، برج ثاخت</div>
</div>
</div>
</div>
<!-- Bottom Bar: Copyright & Compliance -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-surface-dim gap-4">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6 text-label-md font-label-md">
<span class="text-outline-variant">سامانه ثبت و بازرسی پروژه‌ها</span>
<span class="inline-block w-1.5 h-1.5 bg-primary-container"></span>
<span class="text-outline-variant">طراحی صنعتی مهندسی شده</span>
</div>
</div>
</div>
</footer>
</template>
