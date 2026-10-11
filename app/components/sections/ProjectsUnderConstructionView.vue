<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_under_construction/ (ADR-013).

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
<header class="sticky top-0 z-50 bg-surface-container-lowest dark:bg-inverse-surface border-b border-border dark:border-outline-variant shadow-none">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Brand & Navigation Anchor (RTL: Right side) -->
<div class="flex items-center gap-8 lg:gap-12">
<a class="text-headline-md font-headline-md text-ink dark:text-surface-container-lowest tracking-tight flex items-center gap-3" href="#">
<span class="w-8 h-8 bg-primary-container flex items-center justify-center text-on-primary">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V3h9v18M14 9h5v12M8 7h2M8 11h2M8 15h2"  /></svg>
</span>
<span class="">هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Cluster -->
<nav class="hidden md:flex items-center gap-6 lg:gap-8 pt-1">
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">درباره ثاخت</a>
<a class="border-b-2 border-primary-container text-primary-container dark:text-inverse-primary font-bold pb-1 text-label-lg font-label-lg" href="#">پروژه‌ها</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">فروش و پیش‌فروش</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">دیده‌بان ثاخت</a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left Utility Actions (RTL: Left side) -->
<div class="flex items-center gap-3 md:gap-4">
<!-- Search & Language Icons -->
<button aria-label="جستجو" class="w-10 h-10 flex items-center justify-center text-ink hover:bg-surface transition-colors">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="w-10 h-10 flex items-center justify-center text-ink hover:bg-surface transition-colors">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<!-- Secondary Action: سهامداران -->
<a class="hidden sm:inline-flex items-center h-10 px-4 text-label-md font-label-md text-primary-container border border-primary-container hover:bg-brand-tint transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Primary Action: مشاوره و تماس -->
<a class="inline-flex items-center h-10 px-4 md:px-5 text-label-md font-label-md bg-primary-container text-on-primary hover:bg-brand-blue-deep transition-colors" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- MAIN CONTENT AREA -->
<main class="w-full">
<!-- HERO SECTION -->
<section class="relative w-full h-[460px] md:h-[520px] bg-ink overflow-hidden border-b border-border">
<!-- Full-bleed background construction image -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="An expansive civil engineering construction site at dusk featuring monumental concrete pillars and towering structural steel cranes. Industrial geometric forms stand starkly against a dusky atmospheric sky with precise architectural lighting. The composition embodies institutional engineering precision with deep industrial blues, concrete grays, and bold structural lines. High-contrast ambient illumination casts crisp planar architectural shadows." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoyAoyPH8V8RY9ZC5hQtTgbGXPQw7QHowliiK0d2_LBcFVPU0LRVtkvuhAO_pz9akCBV1adjJ5YGDK4qNC2KcvsC5KYS4e80IuaJqFrm_Ywwy3FXQh4qs16sLW4HsV4fhoL2Hjgh-03S8kLYnOZZk1DdkvsYhz6tdt7Ncn1oFZBb2JZoxyT23JiEo8xAtTpo2BhbWMICCTZXXgTiEaRbFEUAq_wdWH6VrQYFOtysMZQpt9hc9JxsobZg')">
</div>
<!-- Scrim overlay plane -->
<div class="absolute inset-0 bg-ink/75"></div>
<!-- Hero Content Anchor -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-between py-10">
<!-- Top Back Cue to /projects -->
<div class="pt-2">
<a class="inline-flex items-center gap-2 text-surface-container-lowest hover:text-brand-tint text-label-lg font-label-lg tracking-wide transition-colors duration-150 group" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
<span class="">بازگشت به آرشیو کل پروژه‌ها</span>
</a>
</div>
<!-- Low and Right Over Image: Title & Subtitle -->
<div class="max-w-3xl pb-2">
<div class="inline-block w-12 h-1 bg-primary-container mb-4"></div>
<h1 class="text-headline-lg-mobile md:text-headline-xl font-headline-xl text-surface-container-lowest mb-3 tracking-tight">
            پروژه‌های در حال ساخت
          </h1>
<p class="text-body-md md:text-body-lg font-body-lg text-brand-tint max-w-2xl font-normal leading-relaxed">
            فرصت‌های فعال پیش‌فروش و کلان‌سازه‌های عمرانی جاری
          </p>
</div>
</div>
</section>
<!-- EDITORIAL INTRO BAR -->
<div class="w-full bg-surface border-b border-border py-4">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin flex items-center justify-between text-ink">
<div class="flex items-center gap-3">
<span class="w-2.5 h-2.5 bg-primary-container inline-block"></span>
<span class="text-label-lg font-label-lg">مجموعه کلان‌پروژه‌های عمرانی فعال در سراسر کشور</span>
</div>
<div class="text-label-md font-label-md text-secondary">
          ۸ پروژه فعال
        </div>
</div>
</div>
<!-- PROJECT GRID (STRICT SPEC: ONLY PHOTO, NAME, CITY) -->
<section class="w-full max-w-[1440px] mx-auto px-space-lg md:px-margin py-16 md:py-24">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
<!-- CARD 1 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A grand modernist multi-purpose commercial center under active construction in Tehran. Clean architectural concrete slabs and massive steel skeletal framework rise precisely toward an open sky. Soft architectural light emphasizes the sharp planar geometry, industrial purity, and structural solidity. Shot from a low heroic angle adhering to institutional civil engineering aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdCI6hAJFmTOvk9wPuzbgsBuzmoqV-UqkGw-yQ9kUC6FG8y2Hw69SF_Dnoeq_hQULksirhf6oQYCAiNAjUbFSGtfAB0xQIdjs7aTaUkUEGqnMBSvmneyzwk9SSGQx0xNUO21e7piVg_rbKjGqjRjlU2io1o6pdcfhz0XXrAUFH6KXGvJLqHnshLzb32F5lQgh-DJA1KqdJk0ssAc4f2AQJej4t8HG26mFiPZkSvi7cOujfkteNaLwdYQ" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مجموعه چندمنظوره مگاپارس
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تهران، شریعتی
            </p>
</div>
</article>
<!-- CARD 2 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A luxury contemporary residential high-rise development under structural development in north Tehran Elahieh. Elegant monolithic stone and glass curtain wall frames under assembly with disciplined precision. Clean daylight showcases geometric lines, neutral concrete facades, and pristine engineering order without visual noise." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAclE6ska8nYW10qMAHo9AeqmvN0NwNSLzVbVd3tq1W5I3nM4oMnIZX3LjcsoBFEbpHAY0Lh5V2IsrqbbWr4UR-wVQ00xsKn_R9FxEGhKvNAomSVRxwKDw0YKxvn0GbyXWKn4tIprGqDqBegdHB7k05y75yD0DVgSu_xuMCsTMHSAdB8nj1cJyTDJ3K9mcIT5uy6yws5HlO_MckWmrGNOHjelveesMijKv4ityymleUOP49CAzZtQo8mw" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پروژه مسکونی لوکس الهیه تهران
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تهران، منطقه ۱
            </p>
</div>
</article>
<!-- CARD 3 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A massive financial and commercial administrative tower rising in the central business district of Tabriz. Architectural precast concrete slabs and exposed steel framing illuminated under overcast daylight. The composition highlights pure functional forms, clean horizontal bands, and unyielding civil engineering excellence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtAXiYh-CSVG-xML_fctUqkDaEDWGr8MgLFAp8SVh_f2RFHaOt71hgaPsN-NoCW0em7IuZTi_4PEsBehaD_qegaTxE8c0pmkU1I18KxhAy08BT56wIOR9DEX4x9GiIrC8BWmjZF23zFV9bsO8hhEorVI3jrg7eIoqZBJQWbHIYSemm_wFI_Tj-NPAtv0pMxED4gFVhlIPVp4JDtYymUQUYTEVZ0_HV6OkFHyPiF1l5N-_tPHptkYr5Hw" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              برج تجاری و اداری فیروزه
            </h2>
<p class="text-body-md font-body-md text-secondary">
              تبریز، بلوار ۲۹ بهمن
            </p>
</div>
</article>
<!-- CARD 4 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A grand resort and residential waterfront complex under engineering construction along the Caspian shore. Sharp geometric terraces overlooking calm gray waters, with clean structural post-tensioned slabs and crane scaffolding visible in the distance. Museum wall label precision and serene coastal architectural atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfw9iiKFyGh1QkOIF2OQk7ulyj8k0ek_Epg1jWUOt4qJET68S4zsiK1xJyZw-C2wIk9_7UestCTg2Fz3UtugRMw4-l-ivXaVmO-kAo5LzvszQfOCrgknI5YTqPqsnKObdDXHHzxeY8kRgyYgNDMCzsD6ecm380mSdrvzSqn2i2PGbxzO7cWSUOHFoyqCadPMb7y652juyF3iAX_FJvM1PSsqRScZS88rlfY51XpYTWgglDEfr7nJUnGw" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مجتمع اقامتی و گردشگری نارنجستان
            </h2>
<p class="text-body-md font-body-md text-secondary">
              مازندران، ایزدشهر
            </p>
</div>
</article>
<!-- CARD 5 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A sophisticated medical and clinic center high-rise under structural installation in Shiraz. Razor-sharp facade grids and insulated glazing panels mounted against exposed white concrete frameworks. Pure bright daylight creates rhythmic linear shadows emphasizing industrial craftsmanship." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARDS2sHuVMqJ0NuPQgkRx-6n-lxkMT13zpzPyV2iu1_rsLp0xYJTULib3T7715S69miMo-kkQ99lmHCHgR740HYk1Vic1rU5bbTkYpYfRvzNh0Gq-Ddl2N4ofqKknbyYI7qY2KFNkZ0tPS1xy3ozUioS8-3xJO1DHJ_GiJouwuMRQsYnK6babucJMeU7JpZSczOEd1nPv3MxyKE6PcCrWZXNjvwRfClyL10J8Nh_0hej7gT6efMOTuPA" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              مرکز تخصصی درمانی پارس شیراز
            </h2>
<p class="text-body-md font-body-md text-secondary">
              شیراز، میدان ارم
            </p>
</div>
</article>
<!-- CARD 6 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A state-of-the-art logistics terminal and warehousing park under infrastructural development in Isfahan. Expansive structural steel trusses spanning a monolithic concrete foundation plate under clear blue sky. Utilitarian geometric order, precision detailing, and immense engineering scale dominate the frame." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbL-N4kQR0pRC5kxq6IqgFxuBAJwcvvL64fi2h7tq3zm2JVGmw8qYIL1bKyoNGAN2AKOlGBf0BV4-SkQBlvQoCTGNnI9703k04KYUOsdS_CKIOTz6RIEfb_JH0K_nHLq4c-qjbWjEjyhQZbR0NnJgVQ5KVTsWcYqwf7hNN1lWEEbW3FSjM4htoCsKfH_R-qd7uoLdL148_bTAZbgFZWKCOibpDxpdBjxJTw7WykuJJVnSmwbQRSOxKAQ" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پارک لجستیک و فناوری زاینده‌رود
            </h2>
<p class="text-body-md font-body-md text-secondary">
              اصفهان، شهرک صنعتی رازی
            </p>
</div>
</article>
<!-- CARD 7 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A monumental mixed-use hotel and shopping promenade under development in Mashhad. Heavy reinforced structural cores and sweeping cantilevered floor plates photographed during daylight assembly. Crisp structural lines and engineering authenticity anchored within an institutional urban setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoNj_sl1GtPiNfL34rOD3ILZ8abe0-QLG8tskW15NaUyiWyttkBCDwTBhksfhgVv8-lJBZmfBwkcSXRQuXG_DpppFP2PU5WIDDUWwXT-nWDC4-KI627LxDykxbJr-1F5r5dPk5QueTvmXqSl3FeLEEOu4SpsDQlJ9jVcnFNUSIOiV8vOEtQUG3FTYYD6RqYw8jA04VJHTg7RzVUiO1Ut615LNYLosfwirbVcnvGcdUYgC-3_-Qxcz4qA" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              هتل‌آپارتمان و مجتمع تفریحی آرمان ۲
            </h2>
<p class="text-body-md font-body-md text-secondary">
              مشهد، خیابان نواب صفوی
            </p>
</div>
</article>
<!-- CARD 8 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors hover:border-primary-container">
<div class="aspect-[16/10] w-full overflow-hidden bg-surface relative border-b border-border">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="An expansive modern corporate research campus under continuous infrastructure development in Karaj. Multiple low-rise modular blocks connected by exposed steel walkways, surrounded by foundational earthwork. Disciplined architectural form, crisp 90-degree geometry, and institutional authority." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRc1FvPA547SImsFYna9MyB62RsifJsPgnold1igPGChbUpuAKkB8FhSbJPHyf6DLD7WHSUzcYpaTiF_1FzdDJfzWH_EE474CXIpHGGZZcax72UZUSPeRmnvjEpkhaFBdG3UbfURf-vODJjVQ5jtKHROTYHbKt05BnzJlQncnlSQcCx01L0ZxcmySfC_o72HJ3BoG8_tClOtP7T3G4la80k_GZAsDg4U0MeQeXdAbJuTLpsHmSTfdb6w" />
</div>
<div class="p-6 md:p-8 flex flex-col justify-start bg-surface-container-lowest">
<h2 class="text-headline-md font-headline-md text-ink mb-2 transition-colors group-hover:text-primary-container">
              پردیس دانش و فناوری البرز
            </h2>
<p class="text-body-md font-body-md text-secondary">
              کرج، فاز ۴ مهرشهر
            </p>
</div>
</article>
</div>
</section>
<!-- EDITORIAL BRAND NOTE BAND -->
<section class="w-full bg-surface border-t border-b border-border py-12 md:py-16">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div>
<h3 class="text-headline-sm font-headline-sm text-ink mb-2">
            استاندارد مهندسی و انضباط ساخت هلدینگ ثاخت
          </h3>
<p class="text-body-sm font-body-sm text-secondary max-w-2xl">
            تمامی ابنیه عمرانی با نظارت عالیه مهندسی، انطباق با مقررات ملی ساختمان و سیستم‌های مدیریت کیفیت بین‌المللی اجرا می‌شوند.
          </p>
</div>
<a class="inline-flex items-center gap-2 h-11 px-6 bg-primary-container text-on-primary text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors" href="#">
<span class="">دریافت دفترچه جامع مشخصات فنی</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"  /></svg>
</a>
</div>
</section>
</main>
<!-- INSTITUTIONAL 5-COLUMN FOOTER -->
<footer class="bg-ink dark:bg-surface-container-lowest text-surface-container-lowest dark:text-ink border-t border-border dark:border-outline-variant">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Brand Row in Footer -->
<div class="pb-12 border-b border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div class="flex items-center gap-3">
<span class="w-9 h-9 bg-primary-container flex items-center justify-center text-on-primary">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V3h9v18M14 9h5v12M8 7h2M8 11h2M8 15h2"  /></svg>
</span>
<span class="text-headline-md font-headline-md text-surface-container-lowest dark:text-ink">
            هلدینگ ساختمانی ثاخت
          </span>
</div>
<p class="text-body-sm font-body-sm text-surface-variant max-w-lg">
          پیشگام انبوه‌سازی و توسعه زیرساخت‌های کلان عمرانی کشور با نماد معاملاتی در بازار سرمایه.
        </p>
</div>
<!-- 5-Column Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 py-12">
<!-- Column 1 -->
<div class="flex flex-col gap-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest dark:text-on-surface mb-2 border-b border-primary-container/60 pb-2 inline-block">
            معرفی و راهبری
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">معرفی هلدینگ و هیئت‌مدیره</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">پایداری و استانداردهای مهندسی</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">منشور اخلاق حرفه‌ای</a>
</div>
<!-- Column 2 -->
<div class="flex flex-col gap-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest dark:text-on-surface mb-2 border-b border-primary-container/60 pb-2 inline-block">
            پرتفوی پروژه‌ها
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">پرتفوی پروژه‌های عمرانی</a>
<a class="text-body-sm font-body-sm text-surface-container-lowest dark:text-on-surface font-bold" href="#">پروژه‌های در حال ساخت</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">پروژه‌های تکمیل‌شده و بهره‌برداری</a>
</div>
<!-- Column 3 -->
<div class="flex flex-col gap-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest dark:text-on-surface mb-2 border-b border-primary-container/60 pb-2 inline-block">
            سرمایه‌گذاران و بورس
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">سامانه سهامداران و کدال</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">حریم خصوصی و شفافیت مالی</a>
</div>
<!-- Column 4 -->
<div class="flex flex-col gap-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest dark:text-on-surface mb-2 border-b border-primary-container/60 pb-2 inline-block">
            ارتباطات و رسانه
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">مناقصات و مزایده‌ها</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">اخبار و رسانه دیجیتال</a>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">گزارش‌های ماهانه دیده‌بان</a>
</div>
<!-- Column 5 -->
<div class="flex flex-col gap-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest dark:text-on-surface mb-2 border-b border-primary-container/60 pb-2 inline-block">
            پشتیبانی و ارتباط
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim dark:text-on-surface-variant hover:text-brand-tint transition-colors" href="#">تماس و امور مشتریان</a>
<span class="text-body-sm font-body-sm text-surface-dim mt-2 block">مرکز پاسخگویی سرمایه‌گذاران:</span>
<span class="text-label-lg font-label-lg text-brand-tint font-mono dir-ltr text-right">۰۲۱-۸۸۹۹۰۰۱۱</span>
</div>
</div>
<!-- Copyright Bottom Bar -->
<div class="pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-surface-dim">
<p class="text-body-sm font-body-sm">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex gap-4 text-label-md font-label-md">
<a class="hover:text-brand-tint transition-colors" href="#">نقشه سایت</a>
<span class="">•</span>
<a class="hover:text-brand-tint transition-colors" href="#">شرایط استفاده</a>
<span class="">•</span>
<a class="hover:text-brand-tint transition-colors" href="#">قوانین و مقررات</a>
</div>
</div>
</div>
</footer>
</template>
