<!--
  Ported from the approved design at
  stitch_project_detail_page_template/_2/ (ADR-013).

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
<!-- TOP APP BAR (Shared Components: TopNavBar) -->

<!-- HERO SECTION: Architectural Scale & Pure Geometry -->
<section class="relative w-full h-[90vh] min-h-[640px] flex items-end justify-start bg-ink overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover opacity-60" data-alt="Massive low angle perspective of a monumental brutalist concrete and steel corporate tower in Tehran under a clear architectural sky. The structure displays precision engineered facade louvers, geometric shadows, and pristine glass surfaces. High contrast, sharp edges, dignified institutional mood reflecting national scale civil engineering." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover opacity-75 group-hover:scale-102 transition-transform duration-700" data-alt="Dramatic widescreen cinematic aerial shot of modern Tehran skyline at dusk, highlighting the iconic Tehran International Tower illuminated against the Alborz mountain silhouettes. Clean industrial lighting, moody architectural atmosphere, cold blue and warm amber contrasts." src="/img/placeholder.svg" />
<div class="absolute inset-0 bg-ink/30 flex items-center justify-center">
<button aria-label="Play brand film" class="w-20 h-20 bg-primary-container hover:bg-brand-blue-deep text-surface-container-lowest flex items-center justify-center transition-all" type="button">
<AppIcon name="play_arrow" />
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
<img class="w-full h-80 object-cover grayscale contrast-125" data-alt="Historical archival high contrast black and white photograph of mid-century industrial building construction site in Iran. Workers, steel rebar framework, vintage cranes, and architectural blueprints. Crisp documentary photography aesthetic." src="/img/placeholder.svg" />
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
<img class="w-full h-80 object-cover contrast-110" data-alt="Historical 1980s engineering survey in Tehran with Persian civil engineers reviewing complex architectural drafting blueprints against a large concrete construction foundation. Institutional documentary style, subtle sepia tones." src="/img/placeholder.svg" />
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
<img class="w-full h-80 object-cover" data-alt="Dramatic structural photography of Tehran International Tower during late stage construction. Towering triangular footprint reaching into sky, precision structural engineering, geometric concrete cores under brilliant morning light." src="/img/placeholder.svg" />
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
<img class="w-full h-80 object-cover" data-alt="Clean minimal architectural interior of modern Tehran Stock Exchange hall with digital financial ticker displays, glass partitions, and institutional executive presence. Cold corporate lighting and high precision finishes." src="/img/placeholder.svg" />
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
<img class="w-full h-80 object-cover" data-alt="Ultra modern sustainable glass and concrete complex with integrated photovoltaic facade panels, rooftop greenery, and parametric architectural design in daylight. Architectural engineering precision and high dynamic range." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Heavy civil engineering foundation excavation work with immense steel shoring and geotechnical machinery drilling deep piles in solid earth. Harsh directional morning light highlighting structural precision." src="/img/placeholder.svg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۱</span>
<h3 class="text-headline-sm font-headline-sm">ژئوتکنیک و خاک</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">تحلیل خاک و پایدارسازی گودهای عمیق</p>
</div>
</div>
<!-- Stage 2 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Massive structural steel framework and post tensioned reinforced concrete slab construction on monumental high rise building. Pure geometric symmetry and industrial power." src="/img/placeholder.svg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۲</span>
<h3 class="text-headline-sm font-headline-sm">سازه و اسکلت</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">اسکلت‌های فلزی سنگین و بتن مسلح خودتراکم</p>
</div>
</div>
<!-- Stage 3 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Precision architectural facade engineering with unitized double glazed curtain walls and high performance composite stone louvers on corporate headquarters. Refined geometric reflection." src="/img/placeholder.svg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۳</span>
<h3 class="text-headline-sm font-headline-sm">نما و پوسته</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">پوسته‌های هوشمند دوپوسته و عایق‌های حرارتی</p>
</div>
</div>
<!-- Stage 4 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Ultra clean smart building automation mechanical control center showing digital server panels, HVAC chillers, and energy monitoring terminals in modern engineering facility." src="/img/placeholder.svg" />
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent"></div>
<div class="absolute bottom-6 right-6 left-6 text-surface-container-lowest">
<span class="text-brand-tint text-label-md font-label-md block mb-1">۰۴</span>
<h3 class="text-headline-sm font-headline-sm">هوشمندسازی</h3>
<p class="text-body-sm font-body-sm text-surface-variant mt-1 opacity-0 group-hover:opacity-100 transition-opacity">یکپارچه‌سازی سیستم‌های BMS و کنترل اقلیم</p>
</div>
</div>
<!-- Stage 5 -->
<div class="relative h-96 group overflow-hidden border border-border bg-ink">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" data-alt="Active luxury commercial atrium and upscale corporate lobby with high end travertine stone floors, minimalist lighting, active visitors, and five star facility management operations." src="/img/placeholder.svg" />
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
          <AppIcon name="cloud_upload" />
</a>
</div>
<!-- Bento Project Grid -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6">
<!-- Feature 1: Tehran International Tower (Wide 7 cols) -->
<div class="md:col-span-7 border border-border bg-surface-container-lowest group">
<div class="relative h-80 md:h-[420px] overflow-hidden bg-ink">
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Full view photograph of the monumental Tehran International Tower standing majestically against a dramatic clear sky. Symmetrical architectural lines, crisp light on concrete facade, representing modern civil engineering masterpiece." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Expansive architectural perspective of the modern commercial and recreational Mega Pars complex with green terraced building roofs, glass sky-bridges, and contemporary steel framing." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Classic modernist architecture of the ASP towers in Tehran with concrete brutalist geometry, residential balconies, and active urban plaza at ground level. Clean daylight architectural photograph." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" data-alt="Futuristic coastal luxury residential resort towers along the Persian Gulf coast in Kish Island with clean white curvilinear architectural terraces overlooking turquoise waters under clear sunshine." src="/img/placeholder.svg" />
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
<AppIcon name="apartment" />
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">شرکت آ.اس.پ (سهامی عام)</h3>
<span class="text-outline text-label-md font-label-md block mb-4">نماد بورس: آ س پ</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              پیشگام ساخت برج‌های بلندمرتبه، بیمارستان‌های مجهز و مجتمع‌های شاخص تجاری از سال ۱۳۴۸.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۵۶٪</span>
<AppIcon name="north_west" />
</div>
</div>
<!-- Company 2 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<AppIcon name="location_city" />
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">شهرسازی و خانه‌سازی باغمیشه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">نماد بورس: ثباغ</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              طراحی، آماده‌سازی و ساخت شهرک‌های مسکونی مدرن و شهرک‌سازی در شمال‌غرب کشور.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۶۲٪</span>
<AppIcon name="north_west" />
</div>
</div>
<!-- Company 3 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<AppIcon name="domain" />
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">توسعه ساختمان خاورمیانه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">سرمایه‌گذاری تخصصی</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              مدیریت و احداث پروژه‌های اقامتی، اداری و سرمایه‌گذاری‌های فرامنطقه‌ای در کلان‌شهرها.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۱۰۰٪</span>
<AppIcon name="north_west" />
</div>
</div>
<!-- Company 4 -->
<div class="p-8 bg-surface-container-lowest border border-border flex flex-col justify-between hover:border-primary-container transition-colors">
<div>
<div class="w-12 h-12 bg-surface flex items-center justify-center text-primary-container mb-6">
<AppIcon name="construction" />
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">مهندسی پارس سازه</h3>
<span class="text-outline text-label-md font-label-md block mb-4">پیمانکاری عمومی رتبه یک</span>
<p class="text-on-surface-variant text-body-sm font-body-sm leading-relaxed">
              اجرای ابنیه سنگین بتنی، سازه‌های زیرزمینی، پل‌ها و تاسیسات مکانیکی و برقی پیشرفته.
            </p>
</div>
<div class="pt-6 mt-6 border-t border-border flex items-center justify-between">
<span class="text-label-md font-label-md text-ink">سهم هلدینگ: ۹۸٪</span>
<AppIcon name="north_west" />
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
<img class="w-full h-full object-cover" data-alt="Refined black and white executive corporate headshot of senior Persian male executive wearing dark tailored suit with architectural background. Dignified posture, high contrast lighting, confident expression." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover" data-alt="Professional modern executive portrait of Iranian male civil engineer and corporate director wearing dark suit, neutral gray wall background, serious corporate leadership expression, high clarity." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover" data-alt="Corporate professional portrait of experienced Persian financial director in dark business attire, sharp focus, neutral institutional corporate lighting." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover" data-alt="Contemporary studio portrait of senior Persian male architectural director in minimalist corporate suit with glasses, confident and experienced look, soft directional lighting." src="/img/placeholder.svg" />
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
<AppIcon name="location_on" />
<div>
<span class="text-ink font-bold block text-body-md font-body-md">نشانی ستاد مرکزی:</span>
<span class="text-on-surface-variant text-body-sm font-body-sm">تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج ثاخت، طبقات ۱۰ الی ۱۴</span>
</div>
</div>
<div class="flex items-start gap-4">
<AppIcon name="call" />
<div>
<span class="text-ink font-bold block text-body-md font-body-md">مرکز تماس سهامداران:</span>
<span class="text-on-surface-variant text-body-sm font-body-sm dir-ltr">۰۲۱ - ۸۸۷۸ ۰۲۰۰ (داخلی ۳۰۵)</span>
</div>
</div>
<div class="flex items-start gap-4">
<AppIcon name="mail" />
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
</template>
