<!--
  Ported from the approved design at
  stitch_project_detail_page_template/_2/ (ADR-013).

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
<!-- TOP APP BAR (Shared Components: TopNavBar) -->
<header class="sticky top-0 z-50 bg-surface-container-lowest dark:bg-inverse-surface border-b border-border dark:border-outline-variant">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Logo + Primary Nav Links -->
<div class="flex items-center gap-10">
<a class="text-headline-md font-headline-md text-ink dark:text-surface-container-lowest tracking-tight flex items-center gap-2" href="#">
<span class="w-2.5 h-8 bg-primary-container inline-block"></span>
<span>هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Cluster -->
<nav class="hidden lg:flex items-center gap-8">
<a class="border-b-2 border-primary-container text-primary-container dark:text-inverse-primary font-bold pb-1 text-label-lg font-label-lg" href="#">درباره ثاخت</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors" href="#">پروژه‌ها</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors" href="#">فروش و پیش‌فروش</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors" href="#">دیده‌بان ثاخت</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left: Actions & Investor Portal (RTL mirrored left) -->
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center gap-2 text-ink dark:text-surface-container-lowest">
<button aria-label="Language selector" class="p-2 hover:bg-surface-container-high transition-colors" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<button aria-label="Search" class="p-2 hover:bg-surface-container-high transition-colors" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
</div>
<a class="hidden md:inline-flex items-center justify-center border border-primary-container text-primary-container hover:bg-brand-tint px-4 py-2 text-label-lg font-label-lg transition-colors" href="#investor">
          ورود سهامداران
        </a>
<a class="inline-flex items-center justify-center bg-primary-container hover:bg-brand-blue-deep text-surface-container-lowest px-5 py-2.5 text-label-lg font-label-lg transition-colors" href="#contact">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- HERO SECTION: Architectural Scale & Pure Geometry -->
<section class="relative w-full h-[90vh] min-h-[640px] flex items-end justify-start bg-ink overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover opacity-60" data-alt="Massive low angle perspective of a monumental brutalist concrete and steel corporate tower in Tehran under a clear architectural sky. The structure displays precision engineered facade louvers, geometric shadows, and pristine glass surfaces. High contrast, sharp edges, dignified institutional mood reflecting national scale civil engineering." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYj8Dh-tJ7DUwkfBKCVpsEg0dIuekvQhyG8vAuwL-EGojB2mUktQ7Lu6MrBh6XvD4zio38I5j7Hn7wFoycSj__5XemIkX-_psr1nFx9ulYl2ZrBgszIyndy0G09dn8RoAx3ZgDhPBzdcNKRB5_Q4SzijeNkITC3OeNUZDgpSdbiXA7OVWkZ0_j5POk6Nb1h1Bgt2O0KZZFCfnnT7nuy_YTzfcL0m5WHqePeB4Fvsaua_kEqupNCMMx0Q" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
</div>
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pb-20 md:pb-28">
<div class="max-w-4xl space-y-6">
<div class="inline-flex items-center gap-3 px-3 py-1 bg-surface-container-lowest/10 backdrop-blur-none border border-surface-container-lowest/20 text-brand-tint text-label-md font-label-md">
<span class="w-1.5 h-1.5 bg-brand-tint"></span>
          نماد بورس: ثاخت | تاسیس ۱۳۶۴
        </div>
<h1 class="text-surface-container-lowest text-headline-lg md:text-headline-xl font-headline-xl tracking-tight leading-tight">
          شرکت بین‌المللی توسعه ساختمان (ثاخت)
        </h1>
<p class="text-surface-container-highest text-body-lg font-body-lg max-w-2xl leading-relaxed">
          بزرگ‌ترین نهاد سرمایه‌گذاری و اجرای مگاپروژه‌های عمرانی در ایران؛ آفرینش سازه‌های تمدن‌ساز با چهار دهه انضباط مهندسی و ارزش‌آفرینی پایدار.
        </p>
<div class="pt-4 flex flex-wrap gap-4">
<a class="bg-surface-container-lowest text-ink hover:bg-surface-alt px-8 py-3.5 text-label-lg font-label-lg transition-colors" href="#history">
            مرور چهار دهه تاریخچه
          </a>
<a class="border border-surface-container-lowest text-surface-container-lowest hover:bg-surface-container-lowest/10 px-8 py-3.5 text-label-lg font-label-lg transition-colors" href="#portfolio">
            شاخص‌ترین ابرپروژه‌ها
          </a>
</div>
</div>
</div>
</section>
<!-- KEY METRICS BAND: Flat Planar Division -->
<section class="w-full bg-surface-container-lowest border-b border-border">
<div class="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x lg:divide-x-reverse divide-border">
<div class="p-8 md:p-12">
<div class="text-ink text-headline-xl md:text-headline-xl font-headline-xl tracking-tight">۴۰+</div>
<div class="text-primary-container text-label-lg font-label-lg mt-1">سال سابقه صنعتی</div>
<div class="text-on-surface-variant text-body-sm font-body-sm mt-2">هدایت و ساخت بزرگ‌ترین نشان‌های معماری معاصر</div>
</div>
<div class="p-8 md:p-12">
<div class="text-ink text-headline-xl md:text-headline-xl font-headline-xl tracking-tight">۲.۵M</div>
<div class="text-primary-container text-label-lg font-label-lg mt-1">مترمربع زیربنای تحقق‌یافته</div>
<div class="text-on-surface-variant text-body-sm font-body-sm mt-2">پرتفوی متمرکز بر کاربری‌های ترکیبی، اداری و تجاری</div>
</div>
<div class="p-8 md:p-12">
<div class="text-ink text-headline-xl md:text-headline-xl font-headline-xl tracking-tight">۸</div>
<div class="text-primary-container text-label-lg font-label-lg mt-1">شرکت تخصصی تابعه</div>
<div class="text-on-surface-variant text-body-sm font-body-sm mt-2">زنجیره کامل ارزش از طراحی مهندسی تا بهره‌برداری</div>
</div>
<div class="p-8 md:p-12">
<div class="text-ink text-headline-xl md:text-headline-xl font-headline-xl tracking-tight">۱۴۰۳</div>
<div class="text-primary-container text-label-lg font-label-lg mt-1">پیشگام فناوری‌های نوین</div>
<div class="text-on-surface-variant text-body-sm font-body-sm mt-2">اتصال معماری بومی به استانداردهای ساختمانی هوشمند</div>
</div>
</div>
</section>
<!-- BRAND STORY & FILM: Centered Minimal Frame -->
<section class="py-28 md:py-36 bg-surface">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
<div>
<span class="text-primary-container text-label-lg font-label-lg block mb-2">روایت هویت و اصالت</span>
<h2 class="text-ink text-headline-lg font-headline-lg">توسعه، فراتر از بتن و فولاد</h2>
</div>
<p class="text-on-surface-variant text-body-md font-body-md max-w-xl">
          ما خط افق شهرهای ایران را بازآفرینی کرده‌ایم؛ پیوندی میان میراث کهن مهندسی ایرانی و نوآوری‌های پیشگام بین‌المللی.
        </p>
</div>
<!-- Minimal Video Container -->
<div class="relative w-full aspect-[21/9] bg-ink border border-border overflow-hidden group">
<img class="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-700" data-alt="Dramatic widescreen cinematic aerial shot of modern Tehran skyline at dusk, highlighting the iconic Tehran International Tower illuminated against the Alborz mountain silhouettes. Clean industrial lighting, moody architectural atmosphere, cold blue and warm amber contrasts." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdrU2eno9uVYeK0JF4rj0a45p-Jilmf4FwHHrdN9cixA-01gBEe1ZZk9vHA514vlgu7FPlbMGcoClVnUSB8iNyHUh2q4Fl5wzPWFafBZT7jAiLnizRNzU7AJXIAizuiftiGtuO45Q7ln8N_MJMTypkW7UTwcloXUie95IBi9lT1N4BIwEm-PxtvrzW_ySKt-d_fizBrg1vDb0JvNV65JPEPjlxp6nAdQ8I1tQwt7_O0JnS6Zu1XiGH3A" />
<div class="absolute inset-0 bg-ink/30 flex items-center justify-center">
<button aria-label="Play brand film" class="w-20 h-20 bg-primary-container hover:bg-brand-blue-deep text-surface-container-lowest flex items-center justify-center transition-all" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z"  /></svg>
</button>
</div>
<div class="absolute bottom-6 right-6 left-6 flex justify-between items-end text-surface-container-lowest pointer-events-none">
<span class="text-label-lg font-label-lg bg-ink/80 px-3 py-1">مستند کوتاه: چهار دهه اثرگذاری ماندگار</span>
<span class="text-label-md font-label-md bg-ink/80 px-3 py-1">۰۳:۴۵ دقیقه</span>
</div>
</div>
</div>
</section>
<!-- VERTICAL TIMELINE OF HISTORY: 40-Year Journey -->
<section class="py-28 md:py-36 bg-surface-container-lowest border-y border-border" id="history">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Section Header -->
<div class="text-center max-w-3xl mx-auto mb-24">
<span class="text-primary-container text-label-lg font-label-lg block mb-2">مسیر تعالی و توسعه</span>
<h2 class="text-ink text-headline-lg font-headline-lg">چهار دهه تاریخچه مهندسی کشور</h2>
<p class="text-on-surface-variant text-body-md font-body-md mt-4">
          تکامل بنیادین از نخستین کارگاه‌های ساختمانی صنعتی تا تبدیل شدن به یکی از پیشروترین هلدینگ‌های بورسی املاک و مستغلات.
        </p>
</div>
<!-- Vertical Timeline Grid -->
<div class="relative">
<!-- Central Spine Line -->
<div class="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-border"></div>
<div class="space-y-24 md:space-y-32">
<!-- 1330: Pars Sazeh Origin -->
<div class="relative flex flex-col md:flex-row items-center justify-between gap-12">
<!-- Node Pin on Center Line -->
<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary-container items-center justify-center z-10">
<span class="w-2 h-2 bg-primary-container"></span>
</div>
<!-- Content Card (Right side in RTL) -->
<div class="w-full md:w-[45%] order-2 md:order-1 text-right">
<span class="text-headline-md font-headline-md text-primary-container tracking-tight block mb-2">۱۳۳۰</span>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">پایه‌گذاری پارس سازه؛ نخستین گام‌های صنعتی‌سازی</h3>
<p class="text-on-surface-variant text-body-md font-body-md leading-relaxed">
                آغاز فعالیت‌های شرکت مهندسی پارس سازه با تمرکز بر احداث ابنیه سنگین صنعتی و سازه‌های بتنی پیش‌ساخته در سطح کشور.
              </p>
<div class="mt-4 inline-flex items-center gap-2 text-label-md font-label-md text-ink bg-surface px-3 py-1 border border-border">
<span class="w-2 h-2 bg-ink"></span>
                آغاز جریان مکانیزاسیون ساخت‌وساز
              </div>
</div>
<!-- Archival Photo (Left side in RTL) -->
<div class="w-full md:w-[45%] order-1 md:order-2 border border-border overflow-hidden bg-surface">
<img class="w-full h-80 object-cover grayscale contrast-125" data-alt="Historical archival high contrast black and white photograph of mid-century industrial building construction site in Iran. Workers, steel rebar framework, vintage cranes, and architectural blueprints. Crisp documentary photography aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzU4fe9EM5MuUcHZzTBzr0YCji_6Y1iMCaSjCOyL4eVfR9AGKafFnM24K2TMo6ziH2_n1IxKCWPmjDOZBLqBXnzDxDKak1DZIIyPXlVNCqgBSeGBu14xjL8x3z9NnXWs_yKpGTOPC6ri7RrZvWKqyTh2a4gkEEa9oPAwmGSnMZDxDbTy94mRRVuTEm6zJigazJF3p9ucvn7OULbX4c3OTRuKzhkfrZyoJm5Xbjy8YfqZlL8n3WykVbYg" />
</div>
</div>
<!-- 1364: Formal Incorporation -->
<div class="relative flex flex-col md:flex-row-reverse items-center justify-between gap-12">
<!-- Node Pin on Center Line -->
<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary-container items-center justify-center z-10">
<span class="w-2 h-2 bg-primary-container"></span>
</div>
<!-- Content Card (Left side in RTL) -->
<div class="w-full md:w-[45%] text-right">
<span class="text-headline-md font-headline-md text-primary-container tracking-tight block mb-2">۱۳۶۴</span>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">تاسیس رسمی شرکت بین‌المللی توسعه ساختمان</h3>
<p class="text-on-surface-variant text-body-md font-body-md leading-relaxed">
                تثبیت ساختار شرکت به عنوان یک بازوی تخصصی توسعه عمرانی و آغاز پروژه‌های کلان زیربنایی، مسکونی و گردشگری در پایتخت.
              </p>
<div class="mt-4 inline-flex items-center gap-2 text-label-md font-label-md text-ink bg-surface px-3 py-1 border border-border">
<span class="w-2 h-2 bg-primary-container"></span>
                ثبت حقوقی و تجمیع توانمندی‌های عمرانی
              </div>
</div>
<!-- Archival Photo (Right side in RTL) -->
<div class="w-full md:w-[45%] border border-border overflow-hidden bg-surface">
<img class="w-full h-80 object-cover contrast-110" data-alt="Historical 1980s engineering survey in Tehran with Persian civil engineers reviewing complex architectural drafting blueprints against a large concrete construction foundation. Institutional documentary style, subtle sepia tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOMlU8cUY0mnQBqJe7Eyh9OLYnHPATpZVxhOMtkRzcz_2UKguRFx6Uka0KNI8iU10q6HYR32h4S_4f56-Melir0lrpK8nGGR0_st45U9FVTDALRjw9agRbteEKm6oq0wttt0irNbciZ2VKJv9ZEQ67cPOvfqwQi5dmjiwiCp1gi27CgSZ2uS33rjt-fpCl_hVwtIG8IvN_QJD7PUHUYELsWWXPNwpB15FsM4YTeJVF3iZ7w6HucDsK_g" />
</div>
</div>
<!-- 1377: Flagship High-Rise Era -->
<div class="relative flex flex-col md:flex-row items-center justify-between gap-12">
<!-- Node Pin on Center Line -->
<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary-container items-center justify-center z-10">
<span class="w-2 h-2 bg-primary-container"></span>
</div>
<!-- Content Card -->
<div class="w-full md:w-[45%] order-2 md:order-1 text-right">
<span class="text-headline-md font-headline-md text-primary-container tracking-tight block mb-2">۱۳۷۷</span>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">عصر بلندمرتبه‌سازی؛ آغاز ابرپروژه برج بین‌المللی تهران</h3>
<p class="text-on-surface-variant text-body-md font-body-md leading-relaxed">
                آغاز احداث مرتفع‌ترین سازه مسکونی ایران به ارتفاع ۱۶۲ متر با بهره‌گیری از مهندسی زلزله پیشرفته و فناوری‌های روز دنیا.
              </p>
<div class="mt-4 inline-flex items-center gap-2 text-label-md font-label-md text-ink bg-surface px-3 py-1 border border-border">
<span class="w-2 h-2 bg-brand-blue-deep"></span>
                رکورد شکنی ارتفاع و سازه‌های بتن مسلح
              </div>
</div>
<!-- Modern Color Photo -->
<div class="w-full md:w-[45%] order-1 md:order-2 border border-border overflow-hidden bg-surface">
<img class="w-full h-80 object-cover" data-alt="Dramatic structural photography of Tehran International Tower during late stage construction. Towering triangular footprint reaching into sky, precision structural engineering, geometric concrete cores under brilliant morning light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnqpQWbgnGpAFkabs0ZRTk-pN3JPYlZiMEPj0owajPNHrPw5opxuo90JzZI7FBxD4A51y5BbL6e8UnsAwWFZww5-k4kCe1xSOY7Odcz7wIx1njjyzGr0IytXHVoeaHtj5FCxtqtm9UkaFhyvNTRcqI_l-TKulmleq4TRyIJUtQvA1fAXqeP5wAYCP_1ZbQoGaMJHfIPKpEuHCYI9sME3iwtA3wotjVYkpEQhcAYE0AlNjycsygzOHsSg" />
</div>
</div>
<!-- 1389: Bourse IPO & Financial Transparency -->
<div class="relative flex flex-col md:flex-row-reverse items-center justify-between gap-12">
<!-- Node Pin on Center Line -->
<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary-container items-center justify-center z-10">
<span class="w-2 h-2 bg-primary-container"></span>
</div>
<!-- Content Card -->
<div class="w-full md:w-[45%] text-right">
<span class="text-headline-md font-headline-md text-primary-container tracking-tight block mb-2">۱۳۸۹</span>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">ورود به بازار بورس اوراق بهادار تهران (نماد ثاخت)</h3>
<p class="text-on-surface-variant text-body-md font-body-md leading-relaxed">
                عرضه عمومی سهام شرکت، تحقق شفافیت مالی پایدار و شکل‌گیری شبکه هلدینگ با شرکت‌های تخصصی تابعه نظیر آ.اس.پ و باغمیشه.
              </p>
<div class="mt-4 inline-flex items-center gap-2 text-label-md font-label-md text-ink bg-surface px-3 py-1 border border-border">
<span class="w-2 h-2 bg-status-success"></span>
                پذیرش در تابلوی اصلی بازار سرمایه
              </div>
</div>
<!-- Trading Floor & Architecture Photo -->
<div class="w-full md:w-[45%] border border-border overflow-hidden bg-surface">
<img class="w-full h-80 object-cover" data-alt="Clean minimal architectural interior of modern Tehran Stock Exchange hall with digital financial ticker displays, glass partitions, and institutional executive presence. Cold corporate lighting and high precision finishes." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAztcr0GoCSmF_geek2hSYigHKEEwJzs6fhpPGLzwmzpkevI_H8qqe0pZcW1gldMK_8dOO5DJENDzpj5gnv6M29DVGjS8BwJ_eKtbmfzYddnsTvZW0bFnhhdxZsbh5qC_QGW75D0Usz-dyId525T1IbS4-Hb6mwMIamF3qEzBln6_dCSmwnlQcmhLHDfpKWRem3LQm0gqZsegOk5qLp7pRKYerboK0S6A3QUBzY_L5cYIWkttBtUOjOhg" />
</div>
</div>
<!-- 1403: Smart Infrastructure & Green Building -->
<div class="relative flex flex-col md:flex-row items-center justify-between gap-12">
<!-- Node Pin on Center Line -->
<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-primary-container border-2 border-surface-container-lowest items-center justify-center z-10">
<span class="w-2 h-2 bg-surface-container-lowest"></span>
</div>
<!-- Content Card -->
<div class="w-full md:w-[45%] order-2 md:order-1 text-right">
<span class="text-headline-md font-headline-md text-primary-container tracking-tight block mb-2">۱۴۰۳</span>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">عصر هوشمندسازی، مدیریت انرژی و پایداری</h3>
<p class="text-on-surface-variant text-body-md font-body-md leading-relaxed">
                پیاده‌سازی استانداردهای ساختمان سبز (BIM)، سیستم‌های مدیریت هوشمند انرژی (BMS) و توسعه مگاپروژه‌های تجاری و تفریحی نسل آینده.
              </p>
<div class="mt-4 inline-flex items-center gap-2 text-label-md font-label-md text-surface-container-lowest bg-primary-container px-3 py-1">
<span class="w-2 h-2 bg-surface-container-lowest"></span>
                امروز: بزرگ‌ترین هلدینگ ساختمانی تراز اول کشور
              </div>
</div>
<!-- Contemporary Hi-Tech Photo -->
<div class="w-full md:w-[45%] order-1 md:order-2 border border-border overflow-hidden bg-surface">
<img class="w-full h-80 object-cover" data-alt="Ultra modern sustainable glass and concrete complex with integrated photovoltaic facade panels, rooftop greenery, and parametric architectural design in daylight. Architectural engineering precision and high dynamic range." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnnqoByze8CzF8T7n23ls6_ngBYGzxvL7qD_2ps04MBVsagPhkfEADf8nvSyFFCQ59qq9b5MuRYbNo5422Br7bwGYN4iSSosOOhifmEtcsgAkrvn8CFI7_r0VWqGR9VdZ26lII4CligqhjUXnslsZN400b04Num0qyD-Zbw_Mt7Gm3d3cWKJyvUz93bxV8XHxnCTpCKEcgoIhxILMX8372Zi7qqoSA01BfE9lV_Ib6JQubjDclci95kA" />
</div>
</div>
</div>
</div>
</div>
</section>
<!-- VALUE CHAIN & BUILDING STAGES: Photographic Mosaic -->
<section class="py-28 md:py-36 bg-surface">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="mb-14">
<span class="text-primary-container text-label-lg font-label-lg block mb-2">چرخه جامع ارزش</span>
<h2 class="text-ink text-headline-lg font-headline-lg">پنج گام اساسی در مهندسی ثاخت</h2>
</div>
<!-- 5-Stage Visual Strip -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
<!-- Stage 1 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Heavy civil engineering foundation excavation work with immense steel shoring and geotechnical machinery drilling deep piles in solid earth. Harsh directional morning light highlighting structural precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgtVXpzk8Hg1dTiWA127YI1MJ3qckAcMoJLaDJFJYoFOKpn8udBVhyexUIg6E0iLtkViZWDiq7fQkMwlr4Ga83Kd42jEOEwvwKo1OkQ8DyZThYnWgzBj_XQstSY2lXS4_nQomU569HmnFzanP6jAowjeXVtDrFMMG5S3uKSiKZ8a4LOpun2ERJChLTjDZnCx7JMyPoakdRKAN-qEarbiOupN8-REGSEeghj-BkbRe76MDC-wGp3kDgWg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۱</span>
<h3 class="text-headline-sm font-headline-sm">ژئوتکنیک و خاک</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">تحلیل خاک و پایدارسازی گودهای عمیق</p>
</div>
</div>
<!-- Stage 2 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Massive structural steel framework and post tensioned reinforced concrete slab construction on monumental high rise building. Pure geometric symmetry and industrial power." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRbHZ2R4Yk2AnL5JOix3JBYar7No0cnGrnjjDETgGQOW1yqBGfSROgwYobhEcDYfwuUFDK0QFO-jykmBt8G4-iIjBzgN1LARmQnsdZR8vJUSee8QG6_JH5Fm0po3iZoGJt19WwM4OojB-vg_6Wux4kAuDyGbPshmCe0KTx8jngppbYVODcFNOEgjCZxJLWKtxYrPEZsnwpjdz1LibYqXYwv1VHad4dBa7ZpwRNOr4uEUQQ4UStZAN-Fw" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۲</span>
<h3 class="text-headline-sm font-headline-sm">سازه و اسکلت</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">اسکلت‌های فلزی سنگین و بتن مسلح خودتراکم</p>
</div>
</div>
<!-- Stage 3 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Precision architectural facade engineering with unitized double glazed curtain walls and high performance composite stone louvers on corporate headquarters. Refined geometric reflection." src="https://lh3.googleusercontent.com/aida-public/AB6AXuApel3EzSbn-_kAW6n1eGLBITSD1Qp4CoLacoISDAhHt_eVLlHSs2ZtuJ8GwIAA3u5Hs4sGmsgon5ndYrj5jtb7_slZexSQOafAzzHho2D_lCvWCCb7Y9V2xCbxCVxRInrvsmg7F0mSoqhR28OsP95k7dmkHSVWNSEzwiuvGhfqUvq34qjSnfcDMMg0aLOQy-9l3mFIg9mhT2n7RuVZ3XwwrFqkhSScHklk1RgXgA2J5O0sClWdgbTfiw" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۳</span>
<h3 class="text-headline-sm font-headline-sm">نما و پوسته</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">پوسته‌های هوشمند دوپوسته و عایق‌های حرارتی</p>
</div>
</div>
<!-- Stage 4 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Ultra clean smart building automation mechanical control center showing digital server panels, HVAC chillers, and energy monitoring terminals in modern engineering facility." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfw1qLu0fkz8KYqdG8vLXkGAfLzYX8m62xxN5ZI__7CF0ZFBeSe5yQ6uSUmhZW_Jq10Ss8Uhurz5iH4Br3GAAWLUmALFHL4HElnxiNLkcHcL2HYBedK9cPebGWYLdkK349ClSLSWFKgtkTR6dt1p8Cf4ESleZWTtSd54vm_VjnQvVZcWtnwOkuiJoHBbTyzAqoUg592zroT0nbvNpSKMGCI9MozHDLT3pQ25qVYDcK7qkoKtLDZ6u6yg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۴</span>
<h3 class="text-headline-sm font-headline-sm">هوشمندسازی</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">یکپارچه‌سازی سیستم‌های BMS و کنترل اقلیم</p>
</div>
</div>
<!-- Stage 5 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Active luxury commercial atrium and upscale corporate lobby with high end travertine stone floors, minimalist lighting, active visitors, and five star facility management operations." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkkmLm-NJscdH0twE2T-V2awvGJgLtkE5Caz6t7TUPHuGAtH5YUL1oY_kNiRZcmHUOnHhwFSGhuXhywMnK5n07xKBjWG1Lfdxn1ZQcy84x448cF7xjZEoChZxg4nuseKIKxIdtEf2k-YuvgT099vS2gnIHCMj63Eg652Y7_mr_uH0cp4NteQI1hsdcYu9QfxOq6vcQZwS4TahHnT0yGDqJQXORxq2EQbomFjmJiIU16foNdHsv17lCzA" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۵</span>
<h3 class="text-headline-sm font-headline-sm">بهره‌برداری</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">مدیریت هتلینگ، خدمات و بازدهی سرمایه‌گذاری</p>
</div>
</div>
</div>
</div>
</section>
<!-- TRACK RECORD & PORTFOLIO GALLERY: Large Iconic Showcase -->
<section class="py-28 md:py-36 bg-surface-container-lowest border-t border-border" id="portfolio">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
<div>
<span class="text-primary-container text-label-lg font-label-lg block mb-2">نمادهای شهری ایران</span>
<h2 class="text-ink text-headline-lg font-headline-lg">پرتفوی سازه‌های ماندگار</h2>
</div>
<a class="inline-flex items-center gap-2 text-primary-container hover:text-brand-blue-deep text-label-lg font-label-lg group" href="#">
          مشاهده کلیه پروژه‌های ثاخت
          <span data-icon-missing="cloud_upload" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</a>
</div>
<!-- Bento Project Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
<!-- Feature 1: Tehran International Tower (Wide 7 cols) -->
<div class="md:col-span-7 border border-border bg-surface-container-lowest group">
<div class="relative h-80 md:h-[420px] overflow-hidden bg-ink">
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Full view photograph of the monumental Tehran International Tower standing majestically against a dramatic clear sky. Symmetrical architectural lines, crisp light on concrete facade, representing modern civil engineering masterpiece." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7lnVI6jeww1eKcQYcGIIFFQO0b7UDPBr8bhSEG-b2-d4Mn_mdliaLWxwptQIiL9QNg9bKzHvyA8a64p1gxA_FrfTXJAJD430vxjKD6xkTi3yTTPTImRJU7dYatDAdwKtXZ5D3zlQnAhB123kGGD9n3omyhQvghwb5082NVOwto89yFyrfHJCmlOx0S6PGA3c-tVjgDX41lr3Mcl-gm6fIzKmt9uDKiQKT8e-_JL_Vt_xC7VOGgYK9wA" />
<span class="absolute top-4 left-4 bg-ink text-surface-container-lowest text-label-md font-label-md px-3 py-1">تکمیل‌شده</span>
</div>
<div class="p-8">
<div class="flex justify-between items-start mb-2">
<h3 class="text-ink text-headline-md font-headline-md">برج بین‌المللی تهران</h3>
<span class="text-primary-container text-label-lg font-label-lg">۲۲۰,۰۰۰ مترمربع</span>
</div>
<p class="text-on-surface-variant text-body-md font-body-md mb-6">
              بلندترین برج مسکونی ایران در ۵۶ طبقه با ساختار ستاره‌ای سه‌پر و مقاومت کامل در برابر زلزله تا ۹ ریشتر.
            </p>
<div class="grid grid-cols-3 pt-4 border-t border-border text-center">
<div>
<span class="text-label-md font-label-md text-outline block">ارتفاع سازه</span>
<span class="text-body-md font-body-md font-bold text-ink">۱۶۲ متر</span>
</div>
<div class="border-x border-border">
<span class="text-label-md font-label-md text-outline block">تعداد واحد</span>
<span class="text-body-md font-body-md font-bold text-ink">۵۷۲ آپارتمان</span>
</div>
<div>
<span class="text-label-md font-label-md text-outline block">موقعیت</span>
<span class="text-body-md font-body-md font-bold text-ink">تهران، شیخ بهایی</span>
</div>
</div>
</div>
</div>
<!-- Feature 2: Mega Pars Complex (5 cols) -->
<div class="md:col-span-5 border border-border bg-surface-container-lowest group">
<div class="relative h-80 md:h-[420px] overflow-hidden bg-ink">
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Expansive architectural perspective of the modern commercial and recreational Mega Pars complex with green terraced building roofs, glass sky-bridges, and contemporary steel framing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtHuauqEPh2j7chg6z31x_d6PRuBjZ6lTMJPkdzyEaoxCMTYIexwUwb_BBWKvJ_Y3A06LpfOBaCXbTvqORTxez-IBSnqJi0z68qKmXJ4Ph44UDi0A4thJFYkpKFG2rbBYVyK239XgjR0DwqcHdv901xg0sQOAOxGtEG-f57LAuUruQkRQREhh0aKbrQyqtYc-hjMIp9j8H2Gw_o_c9KBeWR7xM6fCMsCxwtJuYl3bOu1lU-VYMFN9J6g" />
<span class="absolute top-4 left-4 bg-primary-container text-surface-container-lowest text-label-md font-label-md px-3 py-1">در حال ساخت</span>
</div>
<div class="p-8">
<div class="flex justify-between items-start mb-2">
<h3 class="text-ink text-headline-md font-headline-md">مجموعه مگاپارس</h3>
<span class="text-primary-container text-label-lg font-label-lg">۲۱۰,۰۰۰ مترمربع</span>
</div>
<p class="text-on-surface-variant text-body-md font-body-md mb-6">
              نخستین ساختمان سبز چندمنظوره کشور با تلفیق مرکز خرید، بام سبز وسیع و سالن‌های بین‌المللی گردهمایی.
            </p>
<div class="grid grid-cols-2 pt-4 border-t border-border text-center">
<div class="border-l border-border">
<span class="text-label-md font-label-md text-outline block">کاربری</span>
<span class="text-body-md font-body-md font-bold text-ink">تجاری - تفریحی</span>
</div>
<div>
<span class="text-label-md font-label-md text-outline block">موقعیت</span>
<span class="text-body-md font-body-md font-bold text-ink">تهران، شریعتی</span>
</div>
</div>
</div>
</div>
<!-- Feature 3: ASP Complex (6 cols) -->
<div class="md:col-span-6 border border-border bg-surface-container-lowest group">
<div class="relative h-72 overflow-hidden bg-ink">
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Classic modernist architecture of the ASP towers in Tehran with concrete brutalist geometry, residential balconies, and active urban plaza at ground level. Clean daylight architectural photograph." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzTkcspLuTILJpK8aO9Oi1q_IfIlkeCgRXXbBOJ67OGDSP2U0Slk6TbHd444DJXDIaTF74AvrrPEU7TtBIHnjAcIxPnG9H6eqYOLYmMqAro6LX-gZ6piBPQ1n6eKcTbFiXBiMBeer-XktiTeHuBwcZOuaaiEYv2m5vqlbV85hsxaYTBrwOcg5Z2uvE1_4lXxrUN1YWEezXAOAia5PpH-rlSTAFF0KmIalkTMca8PUSh8NOdNzbuMpBZQ" />
<span class="absolute top-4 left-4 bg-ink text-surface-container-lowest text-label-md font-label-md px-3 py-1">تکمیل‌شده</span>
</div>
<div class="p-8">
<div class="flex justify-between items-start mb-2">
<h3 class="text-ink text-headline-sm font-headline-sm">مجموعه مسکونی تجاری آ.اس.پ</h3>
<span class="text-primary-container text-label-lg font-label-lg">۱۵۰,۰۰۰ مترمربع</span>
</div>
<p class="text-on-surface-variant text-body-md font-body-md">
              نقطه عطف بلندمرتبه‌سازی مدرن در خاورمیانه با طراحی آیکونیک و فضاهای تجاری شهری پیوسته.
            </p>
</div>
</div>
<!-- Feature 4: Royaye Kish Resort (6 cols) -->
<div class="md:col-span-6 border border-border bg-surface-container-lowest group">
<div class="relative h-72 overflow-hidden bg-ink">
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Futuristic coastal luxury residential resort towers along the Persian Gulf coast in Kish Island with clean white curvilinear architectural terraces overlooking turquoise waters under clear sunshine." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYnvHlr1pFgJeVO4FtuMQgoFUwlPsLjEeVm092ZOSt5yCzw0NjXRQxHZeV8IFy0jGKusYqyp4SIHCCzEw2bz5pGvxg_jyLD04sAE_3B7tIwNIM5V4TtidkNjSj5peXHjVwRFBE7FErTFF3xGjUtaYa7D0Idfug5QiUkpxOY_WJn2iXgnqsnr9nGJWIe81OV3GV9LakmsMWeCcLGOY2axuD3eRjumxZ7EO2It0n9Ngel-EUGkAe6VpJEQ" />
<span class="absolute top-4 left-4 bg-primary-container text-surface-container-lowest text-label-md font-label-md px-3 py-1">در حال بهره‌برداری</span>
</div>
<div class="p-8">
<div class="flex justify-between items-start mb-2">
<h3 class="text-ink text-headline-sm font-headline-sm">برج‌های مسکونی رویای کیش</h3>
<span class="text-primary-container text-label-lg font-label-lg">۹۸,۰۰۰ مترمربع</span>
</div>
<p class="text-on-surface-variant text-body-md font-body-md">
              مجموعه ساحلی لوکس با معماری مارین و بهره‌برداری از مصالح مقاوم در برابر اقلیم دریایی جنوب.
            </p>
</div>
</div>
</div>
</div>
</section>
<!-- HOLDING SUBSIDIARIES: Editorial Showcase -->
<section class="py-28 md:py-36 bg-surface border-t border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="max-w-2xl mb-16">
<span class="text-primary-container text-label-lg font-label-lg block mb-2">خانواده بزرگ هلدینگ ثاخت</span>
<h2 class="text-ink text-headline-lg font-headline-lg">شرکت‌های تخصصی تابعه</h2>
<p class="text-on-surface-variant text-body-md font-body-md mt-2">
          هم‌افزایی هشت بازوی مهندسی، پیمانکاری و سرمایه‌گذاری در سراسر جغرافیای اقتصادی ایران.
        </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Company 1 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V3h9v18M14 9h5v12M8 7h2M8 11h2M8 15h2"  /></svg>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">شرکت آ.اس.پ (سهامی عام)</h3>
<span class="text-outline text-label-md font-label-md block mb-4">نماد بورس: آ س پ</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              پیشگام ساخت برج‌های بلندمرتبه، بیمارستان‌های مجهز و مجتمع‌های شاخص تجاری از سال ۱۳۴۸.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۵۶٪</span>
<span data-icon-missing="north_west" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
<!-- Company 2 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="location_city" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">شهرسازی و خانه‌سازی باغمیشه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">نماد بورس: ثباغ</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              طراحی، آماده‌سازی و ساخت شهرک‌های مسکونی مدرن و شهرک‌سازی در شمال‌غرب کشور.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۶۲٪</span>
<span data-icon-missing="north_west" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
<!-- Company 3 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">توسعه ساختمان خاورمیانه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">سرمایه‌گذاری تخصصی</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              مدیریت و احداث پروژه‌های اقامتی، اداری و سرمایه‌گذاری‌های فرامنطقه‌ای در کلان‌شهرها.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۱۰۰٪</span>
<span data-icon-missing="north_west" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
<!-- Company 4 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="construction" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">مهندسی پارس سازه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">پیمانکاری عمومی رتبه یک</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              اجرای ابنیه سنگین بتنی، سازه‌های زیرزمینی، پل‌ها و تاسیسات مکانیکی و برقی پیشرفته.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۹۸٪</span>
<span data-icon-missing="north_west" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
</div>
</div>
</section>
<!-- LEADERSHIP & BOARD: Clean Architectural Portrait Grid -->
<section class="py-28 md:py-36 bg-surface-container-lowest border-t border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="max-w-2xl mb-16">
<span class="text-primary-container text-label-lg font-label-lg block mb-2">حکمرانی شرکتی و راهبری</span>
<h2 class="text-ink text-headline-lg font-headline-lg">اعضای هیئت‌مدیره و مدیران ارشد</h2>
<p class="text-on-surface-variant text-body-md font-body-md mt-2">
          متخصصان برجسته مهندسی عمران، اقتصاد و مدیریت توسعه شهری کشور.
        </p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Leader 1 -->
<div class="border border-border bg-surface-container-lowest">
<div class="relative h-80 bg-surface overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Refined black and white executive corporate headshot of senior Persian male executive wearing dark tailored suit with architectural background. Dignified posture, high contrast lighting, confident expression." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtZvQ7Vx4COMx8MTaXuv1lMNFX8R2VtyuvgFmMWA8DlTtZoKdNEquPkMGCT26Q22xN2Bk0Ok6TExviNcmZ7QXCBPIvR5gIIp9aBd_VHtL40o6Nw1MvtEv2fZSu939oeUpFyfpM7MxvjAHBn6herD94aEaK7KG-u9tPt7BmPVfMHO0OZK14lHIR0zzftVueWgBAsRCoOOI7S06O9j1NncA5rGIufl5H7HKF69J0aOlY_6MVP0Ef4mwbgw" />
</div>
<div class="p-6">
<h3 class="text-ink text-headline-sm font-headline-sm">دکتر مهدی علیزاده</h3>
<span class="text-primary-container text-label-md font-label-md block mt-1">رئیس هیئت‌مدیره</span>
<p class="text-on-surface-variant text-body-sm font-body-sm mt-3">دکترای مدیریت استراتژیک، با ۲۵ سال سابقه در توسعه زیرساخت‌های ملی</p>
</div>
</div>
<!-- Leader 2 -->
<div class="border border-border bg-surface-container-lowest">
<div class="relative h-80 bg-surface overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Professional modern executive portrait of Iranian male civil engineer and corporate director wearing dark suit, neutral gray wall background, serious corporate leadership expression, high clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeAJIuRhFgg4U4KPUKL6H6Oy43uGV81b_xLVwTUfEgY5zLLFfMjb8jHIH-61w-QIG1t44TZYeFRAi-2vo5V0Z4Ntf_uJ1Dkdrj4gbIpbmGQGNBYYVy6DGkTnd-g153X5H7xlzoQY-a_CS4yDVOifwoAeHtE1f9Y9HIwtu2MsJp2Cpm3cEDf-gtJnxxUNhprjf8WJrhrOxYF9kecGuO-dIa6pH2FdKtwlkRbKEYogNlTZ0ekw6WcS8ZTg" />
</div>
<div class="p-6">
<h3 class="text-ink text-headline-sm font-headline-sm">مهندس حمیدرضا شریفی</h3>
<span class="text-primary-container text-label-md font-label-md block mt-1">مدیرعامل و نایب‌رئیس هیئت‌مدیره</span>
<p class="text-on-surface-variant text-body-sm font-body-sm mt-3">کارشناس ارشد مهندسی عمران-سازه از دانشگاه تهران، طراح مگاپروژه‌های برج‌سازی</p>
</div>
</div>
<!-- Leader 3 -->
<div class="border border-border bg-surface-container-lowest">
<div class="relative h-80 bg-surface overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Corporate professional portrait of experienced Persian financial director in dark business attire, sharp focus, neutral institutional corporate lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuGz6dgXj6Jor7bdg5kLTPqV2biWIRqcrW20CLRezcXqkv-g_2YAMtG0ygAiaaNsyD4bCJi4gaa0uJNsAIS8NfHSw8P_gkABrYD_dei_2RG1bD_LeLZfcRJDzWL6NCfteuJ9eCdC1Fbsc1xSu_Cw0lel4aC4IxaheyyoA7mY6SiOCJCQ4llrJPVGVZXgissXPEJca3QXKL7xgoBHodCu4kYDgQF2ETfZyrpCv4T5JhenFH-mImDrREbg" />
</div>
<div class="p-6">
<h3 class="text-ink text-headline-sm font-headline-sm">دکتر کامران رضایی</h3>
<span class="text-primary-container text-label-md font-label-md block mt-1">عضو هیئت‌مدیره و معاونت مالی</span>
<p class="text-on-surface-variant text-body-sm font-body-sm mt-3">عضو انجمن حسابداران خبره، پیشگام ابزارهای نوین تامین مالی در بازار سرمایه</p>
</div>
</div>
<!-- Leader 4 -->
<div class="border border-border bg-surface-container-lowest">
<div class="relative h-80 bg-surface overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Contemporary studio portrait of senior Persian male architectural director in minimalist corporate suit with glasses, confident and experienced look, soft directional lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAx8W3DyKL1PciGN_Wj9G9UxQMgEO5DMEylcPsSLloekGOhuUYxO2BQXTTLB-wvoks0SgX8YonRVWlRGKXQky59AB94P9TmetxsFZz5nOnoURiAxl_2LAfQtnw74OGjiWEvlYrLylfZ7BR-Fc-2_xAkNa5Ps8ZOt6HM-7V4Q9ipMR2WcTryud7LPmQLa-8duhHS00UNFB9z99tWcqiOat6WHmonMlF9VOoaNEi3gD34B_5iMUOpAbS1yQ" />
</div>
<div class="p-6">
<h3 class="text-ink text-headline-sm font-headline-sm">مهندس علیرضا بهرامی</h3>
<span class="text-primary-container text-label-md font-label-md block mt-1">عضو هیئت‌مدیره و معاونت فنی مهندسی</span>
<p class="text-on-surface-variant text-body-sm font-body-sm mt-3">ناظر ارشد پروژه‌های ساختمانی بین‌المللی، متخصص فناوری‌های سبز و BIM</p>
</div>
</div>
</div>
</div>
</section>
<!-- CONTACT & INQUIRY FORM: Pure Planar Leads -->
<section class="py-28 md:py-36 bg-surface border-t border-border" id="contact">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
<!-- Left text in RTL (Corporate Info) -->
<div class="lg:col-span-5 space-y-8">
<div>
<span class="text-primary-container text-label-lg font-label-lg block mb-2">ارتباط مستقیم</span>
<h2 class="text-ink text-headline-lg font-headline-lg">پاسخگویی به سهامداران و شرکای استراتژیک</h2>
<p class="text-on-surface-variant text-body-md font-body-md mt-4 leading-relaxed">
              دفتر مرکزی هلدینگ ثاخت در تهران آماده دریافت نظرات، پیشنهادهای سرمایه‌گذاری و رزومه‌های تخصصی مهندسین تراز اول کشور است.
            </p>
</div>
<div class="space-y-4 pt-4 border-t border-border">
<div class="flex items-start gap-4">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"  /></svg>
<div>
<span class="text-ink font-bold block text-body-md font-body-md">نشانی ستاد مرکزی:</span>
<span class="text-on-surface-variant text-body-sm font-body-sm">تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج ثاخت، طبقات ۱۰ الی ۱۴</span>
</div>
</div>
<div class="flex items-start gap-4">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"  /></svg>
<div>
<span class="text-ink font-bold block text-body-md font-body-md">مرکز تماس سهامداران:</span>
<span class="text-on-surface-variant text-body-sm font-body-sm dir-ltr">۰۲۱ - ۸۸۷۸ ۰۲۰۰ (داخلی ۳۰۵)</span>
</div>
</div>
<div class="flex items-start gap-4">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"  /></svg>
<div>
<span class="text-ink font-bold block text-body-md font-body-md">پست الکترونیک رسمی:</span>
<span class="text-on-surface-variant text-body-sm font-body-sm">info@sakht-holding.com</span>
</div>
</div>
</div>
</div>
<!-- Form Card (7 cols) -->
<div class="lg:col-span-7 bg-surface-container-lowest border border-border p-8 md:p-12">
<form class="space-y-6">
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contact-name">نام و نام خانوادگی *</label>
<input class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" id="contact-name" placeholder="مثال: رضا صادقی" type="text" />
</div>
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contact-phone">شماره تماس مستقیم *</label>
<input class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" id="contact-phone" placeholder="۰۹۱۲..." type="tel" />
</div>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contact-topic">موضوع ارتباط</label>
<select class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" id="contact-topic">
<option>امور سهام و کدال</option>
<option>فرصت‌های پیش‌فروش و خرید</option>
<option>پیشنهاد مشارکت در ساخت</option>
<option>همکاری و ارسال رزومه مهندسی</option>
<option>سایر امور اداری</option>
</select>
</div>
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contact-email">پست الکترونیک</label>
<input class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" id="contact-email" placeholder="example@mail.com" type="email" />
</div>
</div>
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contact-message">شرح پیام یا درخواست</label>
<textarea class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container" id="contact-message" placeholder="متن درخواست خود را به اختصار بیان فرمایید..." rows="4"></textarea>
</div>
<div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
<label class="flex items-center gap-2 cursor-pointer text-body-sm font-body-sm text-on-surface-variant">
<input class="w-4 h-4 text-primary-container border-border focus:ring-0" type="checkbox" />
<span>تایید ارسال اطلاعات به سامانه دبیرخانه مرکزی ثاخت</span>
</label>
<button class="w-full sm:w-auto bg-primary-container hover:bg-brand-blue-deep text-surface-container-lowest px-10 py-3.5 text-label-lg font-label-lg transition-colors" type="submit">
                ثبت و ارسال پیام
              </button>
</div>
</form>
</div>
</div>
</div>
</section>
<!-- FOOTER (Shared Components: Footer) -->
<footer class="w-full bg-ink dark:bg-surface-container-lowest border-t border-border dark:border-outline-variant text-surface-container-lowest">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Brand Row in Footer -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 mb-12 border-b border-border/20 gap-6">
<div>
<span class="text-headline-md font-headline-md text-surface-container-lowest dark:text-ink">هلدینگ ساختمانی ثاخت</span>
<p class="text-surface-dim dark:text-on-surface-variant text-body-sm font-body-sm mt-1">شرکت بین‌المللی توسعه ساختمان (سهامی عام) - تاسیس ۱۳۶۴</p>
</div>
<div class="flex items-center gap-4">
<a class="px-4 py-2 border border-surface-container-lowest/30 text-surface-container-lowest text-label-sm font-label-md hover:bg-surface-container-lowest hover:text-ink transition-colors" href="#">سامانه سهامداران کدال</a>
<a class="px-4 py-2 bg-primary-container text-surface-container-lowest text-label-sm font-label-md hover:bg-brand-blue-deep transition-colors" href="#">گزارش‌های ماهانه</a>
</div>
</div>
<!-- Links Grid from JSON Specifications -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
<div class="space-y-3">
<h4 class="text-surface-container-lowest dark:text-on-surface font-bold text-label-lg font-label-lg">معرفی و راهبری</h4>
<ul class="space-y-2">
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">پایداری و استانداردهای مهندسی</a></li>
</ul>
</div>
<div class="space-y-3">
<h4 class="text-surface-container-lowest dark:text-on-surface font-bold text-label-lg font-label-lg">سرمایه‌گذاری</h4>
<ul class="space-y-2">
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
</ul>
</div>
<div class="space-y-3">
<h4 class="text-surface-container-lowest dark:text-on-surface font-bold text-label-lg font-label-lg">امور بورس</h4>
<ul class="space-y-2">
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">سامانه سهامداران و کدال</a></li>
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">مناقصات و مزایده‌ها</a></li>
</ul>
</div>
<div class="space-y-3">
<h4 class="text-surface-container-lowest dark:text-on-surface font-bold text-label-lg font-label-lg">اطلاع‌رسانی</h4>
<ul class="space-y-2">
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">اخبار و رسانه دیجیتال</a></li>
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
</ul>
</div>
<div class="space-y-3">
<h4 class="text-surface-container-lowest dark:text-on-surface font-bold text-label-lg font-label-lg">ارتباطات</h4>
<ul class="space-y-2">
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">تماس و امور مشتریان</a></li>
<li><a class="text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">حریم خصوصی و شفافیت مالی</a></li>
</ul>
</div>
</div>
<!-- Bottom Copyright & Compliance -->
<div class="pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center text-surface-dim dark:text-on-surface-variant text-body-sm font-body-sm gap-4">
<div>
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </div>
<div class="flex items-center gap-6">
<span class="text-label-md font-label-md">شناسه نماد بورس: ثاخت</span>
<span class="text-label-md font-label-md">کدال: ۱۰۰۷۸</span>
</div>
</div>
</div>
</footer>
</template>
