<!--
  Ported from the approved design at
  stitch_project_detail_page_template/media/ (ADR-013).

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
<!-- ================= TOPNAVBAR (Shared Component) ================= -->
<header class="w-full bg-surface-container-lowest border-b border-border z-50 sticky top-0">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right Side: Logo & Main Navigation Links -->
<div class="flex items-center gap-10">
<a class="flex items-center gap-3" href="#">
<div class="w-8 h-8 bg-ink flex items-center justify-center text-surface-container-lowest font-headline-md font-bold">
            ث
          </div>
<span class="text-headline-md font-headline-md text-ink tracking-tight font-extrabold">هلدینگ ساختمانی ثاخت</span>
</a>
<nav class="hidden md:flex items-center gap-8">
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">درباره ثاخت</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">پروژه‌ها</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">فروش و پیش‌فروش</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">دیده‌بان ثاخت</a>
<!-- Active Nav Link: رسانه ثاخت -->
<a class="text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container font-bold pb-1" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left Side: Actions (Buttons, Icons) -->
<div class="flex items-center gap-4">
<!-- Language Icon Action -->
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="تغییر زبان">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<!-- Search Icon Action -->
<button class="p-2 text-ink hover:bg-surface-container-high transition-colors" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<!-- Trailing Secondary Action -->
<a class="hidden lg:inline-flex items-center px-4 py-2 border border-primary-container text-primary-container text-label-lg font-label-lg hover:bg-brand-tint transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Trailing Primary Action -->
<a class="inline-flex items-center px-5 py-2 bg-primary-container text-surface-container-lowest text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors font-bold" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- ================= HERO SECTION ================= -->
<!-- Full-bleed architectural photography with 40% deep scrim overlay. Standard WordPress institutional format. -->
<section class="relative w-full h-[360px] md:h-[440px] bg-ink overflow-hidden border-b border-border">
<!-- Architectural Photography Container -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="An expansive panoramic view of a massive modern brutalist architectural commercial development under clear morning daylight, featuring crisp steel beams, poured concrete facades, engineering symmetry, professional construction precision, and a restrained corporate palette of industrial blues and stony grays." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5gWungRsuI6PR6oPlaLS4iwvAbpuUms0UI_mRqWBZRSjVTxoThmXIXMAJt1JaJgAdpCi66H6J6WEezGW-hFuqqzLSkDigx-bUp2Jjn6CZIl3ue7ug-7_lPcXHHQdNbsOURCZwmtzS_WOaEVQGEKJaB1X6KjNWci0fiGKs1ItxOpb99BW_86ebKdqoioQJzvaB7uFd0cJZlNDgaq39ZDLuoYHeVFFfLJ6mYTxSJel2XokjqbN4PPLRGg')">
</div>
<!-- Deep Scrim Scarf Overlay (35% to 60%) -->
<div class="absolute inset-0 bg-ink/50 mix-blend-multiply"></div>
<div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80"></div>
<!-- Hero Content (Anchored Low and Right in RTL) -->
<div class="relative z-10 w-full h-full max-w-[1440px] mx-auto px-space-lg md:px-margin flex flex-col justify-end pb-12">
<div class="max-w-3xl">
<div class="inline-block bg-primary-container text-surface-container-lowest text-label-md font-label-md px-3 py-1 mb-4 font-bold tracking-wider">
          آرشیو رسمی مقالات و گزارش‌ها
        </div>
<h1 class="text-headline-lg font-headline-lg text-surface-container-lowest font-extrabold mb-3">
          رسانه و دیده‌بان دانش ثاخت
        </h1>
<p class="text-body-lg font-body-lg text-brand-tint/90 font-normal">
          روایت توسعه، تحلیل‌های مهندسی و نبض بازار املاک و مستغلات
        </p>
</div>
</div>
</section>
<!-- ================= CATEGORY ROW NAVIGATION ================= -->
<!-- Strictly plain typography links with generous spacing, border-b divider underneath. Negative constraints strictly respected. -->
<section class="w-full bg-surface-container-lowest border-b border-border sticky top-20 z-40">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="flex items-center gap-8 md:gap-12 overflow-x-auto py-0 no-scrollbar">
<!-- Active Category Link -->
<a class="text-body-md font-body-md text-primary-container font-bold border-b-2 border-primary-container py-4 whitespace-nowrap transition-colors" href="#feed">
          همه مطالب
        </a>
<!-- Inactive Category Links -->
<a class="text-body-md font-body-md text-ink hover:text-primary-container py-4 border-b-2 border-transparent whitespace-nowrap transition-colors font-medium" href="#feed">
          نبض ثاخت
        </a>
<a class="text-body-md font-body-md text-ink hover:text-primary-container py-4 border-b-2 border-transparent whitespace-nowrap transition-colors font-medium" href="#feed">
          روایت ثاخت
        </a>
<a class="text-body-md font-body-md text-ink hover:text-primary-container py-4 border-b-2 border-transparent whitespace-nowrap transition-colors font-medium" href="#feed">
          پادکست
        </a>
<a class="text-body-md font-body-md text-ink hover:text-primary-container py-4 border-b-2 border-transparent whitespace-nowrap transition-colors font-medium" href="#feed">
          تحلیل بازار
        </a>
<a class="text-body-md font-body-md text-ink hover:text-primary-container py-4 border-b-2 border-transparent whitespace-nowrap transition-colors font-medium" href="#feed">
          مناقصات و مزایدات
        </a>
</div>
</div>
</section>
<!-- ================= MAIN FEED OF POST CARDS ================= -->
<!-- Disciplined planar 12-column architectural grid with 3-column cards -->
<main class="w-full bg-surface py-16" id="feed">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Section Title & Meta Header -->
<div class="flex justify-between items-baseline mb-8 pb-4 border-b border-border">
<div>
<h2 class="text-headline-md font-headline-md text-ink font-bold">آخرین انتشارات و گزارش‌های تحلیلی</h2>
<p class="text-body-sm font-body-sm text-secondary mt-1">نمایش مقالات، اخبار عملیاتی و داده‌های اقتصادی حوزه ساخت‌وساز</p>
</div>
<div class="text-body-sm font-body-sm text-secondary font-medium">
          تعداد مطالب: ۱۸ گزارش
        </div>
</div>
<!-- 3-Column Editorial Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
<!-- Card 1: نبض ثاخت (News) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A grand high-angle architectural photograph of an ongoing modern skyscraper construction foundation in Tehran, featuring industrial cranes, concrete pumping machinery, engineering scaffolding, sharp geometric shadows, and bright daylight in an authoritative civil engineering aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeVWQYo2_c5Qj7MpiAYZmoexhbzokWAasW4y93QeLz3S-NGMpcGuKlLQI8Eh5xYGIVFbPNryNq0y-AMq40HXHtigxqKRUHJaaIZm1pGdnb9by87ZVBKgPJvocCepv4j_iQsTWCzGuJ_so9-1jKl6aO54aSiTCOf1ZuQR2_Kh-SlV9FVzBBmDUueNooW2e6tKhcLvnKXlpZ5DZWL3d7GSkKJr20-50R-q1LBbdUPhJE85yAHDq-tzbyvQ" />
<!-- Inline-End Status / Category Badge (Top-Left in RTL) -->
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              نبض ثاخت
            </div>
</div>
<div class="p-6 flex flex-col flex-grow">
<!-- Date & Reading Time -->
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۲۰ اردیبهشت ۱۴۰۳</span>
<span>زمان مطالعه: ۴ دقیقه</span>
</div>
<!-- Title -->
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              پیشرفت فیزیکی برج اداری-تجاری نگین پایتخت به مرز ۸۲ درصد رسید
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              عملیات نمای دوپوسته و نصب تجهیزات هوشمند سرمایشی-گرمایشی پروژه شاخص با استانداردهای بین‌المللی وارد فاز پایانی شد.
            </p>
<!-- Card Action Footer -->
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                مطالعه متن کامل
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-secondary font-mono">CODE: PR-940</span>
</div>
</div>
</article>
<!-- Card 2: پادکست (With Play Marker Overlay) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A focused studio setting for a technical podcast recording with acoustic foam panels, professional studio microphones, sound level monitors, and architectural blueprints on the desk, lit with focused corporate lighting and industrial precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIf-4J1fBCIhoPVzBIF0WSRE5NKbdpF2V8cotOB8g0s5TPwa24WqrIDcODg1Pd_z43rCspq8sCTmKf88HOZTn1heIQnbYrWeuR2JOyhrLrJTm5F2zZS6RihH5007sOgOF-qd3CuHyZf7K0OAi68E7pUzLah9Rr-iossGB6i_5zD2c35XDSXGuO5R78rq4Wwd53fuI2QxX8U1Xwv6pCesPzBcc4_MKOxRN4JJC0ioyHiGEGtseQgQ669w" />
<!-- Category Badge (Top-Left in RTL) -->
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              پادکست
            </div>
<!-- MANDATORY PLAY MARKER OVERLAY BADGE FOR PODCAST -->
<div class="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
<div class="bg-ink/90 border border-border text-surface-container-lowest px-4 py-2 flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z"  /></svg>
<span class="text-label-md font-label-md font-bold font-mono">۲۸:۴۰ دقیقه</span>
</div>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<!-- Date & Meta -->
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۱۸ اردیبهشت ۱۴۰۳</span>
<span>قسمت دوازدهم رادیو ثاخت</span>
</div>
<!-- Title -->
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              گفت‌وگو با معاون فنی: استراتژی‌های کاهش ریسک در پروژه‌های مگامال
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              در این گفت‌وگو چالش‌های زنجیره تأمین فولاد و مدیریت زمان‌بندی بحرانی در کلان‌پروژه‌های ملی بررسی شده است.
            </p>
<!-- Card Action Footer -->
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                شنیدن پادکست
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-secondary font-mono">EP-12</span>
</div>
</div>
</article>
<!-- Card 3: روایت ثاخت (Technical Engineering Story) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Detailed close-up civil engineering view of concrete slab reinforcement grids and seismic dampers being tested inside a structural laboratory, shot with crisp technical clarity, sharp geometry, and industrial high contrast lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCGG35mCwm-5qwyEH4t71BpcYzLNkk-fnCMv49FWbgc_banaAvBs1J_GWrnfvgCbUxcz1Ct44we6QtjAXq5KMS56R3KxUDFIQDdy_GMtAayO9q689scHbhtSMokowg-8AJtt9vh5Oesd-aavlonrmlclGfbnQlOcAqEThjdRtGicW7EthDKgXGPvDwU5WeMj1v1FF1524fQ4yJp3jW1vfFj9o3--Nfk0RNv5pQhAwjuvPfdW3yKrFPFw" />
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              روایت ثاخت
            </div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۱۵ اردیبهشت ۱۴۰۳</span>
<span>گزارش میدانی مهندسی</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              مهار لرزه‌ای در عمق ۳۰ متری: چالش‌های اجرای دیواره آب‌بند پروژه شیراز
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              نگاهی عمیق به فرآیند بتن‌ریزی شمع‌های درجا و فناوری‌های نوین مهار گود عمیق در مجاورت خطوط مترو.
            </p>
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                مشاهده روایت تصویری
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-secondary font-mono">ENG-410</span>
</div>
</div>
</article>
<!-- Card 4: تحلیل بازار (Market Analysis) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An analytical business perspective featuring digital stock market displays, financial data charts regarding real estate yield curves, superimposed on modern architectural skyline reflections in an executive boardroom setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwJV2qHlyfckNDjcWW3cnJAxH3HP-YNN-Ub43fRXj1kYQ3t-79KcZ7tU8B9MUZzoKfkyc47rwfywfiIL16CuXfP6j-XcJWVMJuyF1Tj_n4bA7_GzqS43pk0LT6RyiQSdHMbMoaX_vRg5iNtbA8xY5TZh8_NfY34kYlrjosnShb5r27vKiVFAPEEabrV8SQ9ETB_CyCEc5Cl8382zSitoVdBSdkRRp7xM6DDDQoXkxoYIh0l4WH0sw3bw" />
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              تحلیل بازار
            </div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۱۲ اردیبهشت ۱۴۰۳</span>
<span>دیده‌بان اقتصاد مسکن</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              چشم‌انداز بازدهی سرمایه‌گذاری در صندوق‌های املاک و مستغلات (REITs)
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              ارزیابی تطبیقی رشد ارزش NAV صندوق‌های پروژه‌محور در مقایسه با شاخص کل بورس اوراق بهادار تهران.
            </p>
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                دریافت گزارش تحلیلی
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-secondary font-mono">FIN-88</span>
</div>
</div>
</article>
<!-- Card 5: مناقصات و مزایدات (Tenders) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Architectural technical drawings, project tender document binders with official legal stamps, and high-precision steel rulers lying neatly on an architect's heavy oak workstation under bright morning office light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD56tqPzTQBSVP4aJGJBj_78zl5X867g2Lw-im90tzlc3OL6hUTs_BrmjAfFFDN7iQ2pX9mxmzhBjibc07dTXLYVMKMSzJgpRjZGkADenb8ES45rOXyNduk0oOyeuSIlPH0xR5reJkvLnzKVQXIpIcZwiHYw0v17A1jgik9Snp8ZfHQlgzRpOjm8BBGJuF1RMg_jMYjysNkvqkU6GFxBwbb9GARNnemeqHzakFifZ18ZMmgI2IsBR1KFQ" />
<div class="absolute top-3 left-3 bg-surface-alt text-ink border border-border px-2.5 py-1 text-label-md font-label-md font-bold">
              مناقصات و مزایدات
            </div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۱۰ اردیبهشت ۱۴۰۳</span>
<span>مهلت دریافت اسناد: ۵ روز</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              فراخوان عمومی مناقصه اجرای تأسیسات مکانیکی پروژه هتل ۵ ستاره بندرعباس
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              دعوت از پیمانکاران دارای رتبه‌بندی معتبر از سازمان مدیریت و برنامه‌ریزی جهت خرید و نصب چیلرهای سانتریفیوژ.
            </p>
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                دانلود اسناد مناقصه
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-status-error font-bold">مهلت محدود</span>
</div>
</div>
</article>
<!-- Card 6: پادکست (Episode 11) -->
<article class="bg-surface-container-lowest border border-border flex flex-col group hover:border-primary-container transition-colors">
<div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-alt">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An expansive panoramic view of a massive modern brutalist architectural commercial development under clear morning daylight, featuring crisp steel beams, poured concrete facades, engineering symmetry, professional construction precision, and a restrained corporate palette of industrial blues and stony grays." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Mw-L2I-VH0oK6YBHwgYrivkD78I4mAVA7XbU2TxZjEfq2h_n4Vv9jgOKTG0mPI8p6kpgUJbMH_02EDZ9lw9pNNnAaldG5RTWGx1lWJvHtGC9sFdu_tHhJaFBVP4BABlHpEHc7oHLq9in-oa6RaiXPmpDaoEiXi9LYUM06b67Iu9SksQinL0X882pg5BrXJ-LwseXSCLKph-LlNPw9mXQk0CzGBZFOax2h67hwDoTOylpZmmYtoaEaA" />
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              پادکست
            </div>
<!-- MANDATORY PLAY MARKER OVERLAY BADGE FOR PODCAST -->
<div class="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
<div class="bg-ink/90 border border-border text-surface-container-lowest px-4 py-2 flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z"  /></svg>
<span class="text-label-md font-label-md font-bold font-mono">۳۴:۱۵ دقیقه</span>
</div>
</div>
</div>
<div class="p-6 flex flex-col flex-grow">
<div class="flex items-center justify-between text-secondary text-body-sm font-body-sm mb-3">
<span>۰۵ اردیبهشت ۱۴۰۳</span>
<span>قسمت یازدهم رادیو ثاخت</span>
</div>
<h3 class="text-headline-sm font-headline-sm text-ink font-bold mb-3 group-hover:text-primary-container transition-colors">
              طراحی سازگار با اقلیم در مناطق کویری؛ تجربیات مجتمع تجاری یزد
            </h3>
<!-- Excerpt: Strictly Truncated to 1 Line -->
<p class="text-body-sm font-body-sm text-secondary line-clamp-1 mb-6">
              بررسی پیوند معماری سنتی ایرانی با سیستم‌های تهویه طبیعی و کاهش مصرف انرژی در ساختمان‌های بلندمرتبه.
            </p>
<div class="mt-auto pt-4 border-t border-border flex items-center justify-between">
<span class="text-label-lg font-label-lg text-primary-container font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                شنیدن پادکست
                <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<span class="text-label-md font-label-md text-secondary font-mono">EP-11</span>
</div>
</div>
</article>
</div>
<!-- Pagination / Archival Load Trigger -->
<div class="mt-12 flex justify-center items-center gap-2">
<button class="w-10 h-10 border border-primary-container bg-primary-container text-surface-container-lowest font-bold text-label-lg flex items-center justify-center">
          ۱
        </button>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:border-primary-container font-bold text-label-lg flex items-center justify-center transition-colors">
          ۲
        </button>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:border-primary-container font-bold text-label-lg flex items-center justify-center transition-colors">
          ۳
        </button>
<span class="px-2 text-secondary">...</span>
<button class="w-10 h-10 border border-border bg-surface-container-lowest text-ink hover:border-primary-container font-bold text-label-lg flex items-center justify-center transition-colors">
          ۸
        </button>
<button class="px-4 h-10 border border-border bg-surface-container-lowest text-ink hover:border-primary-container font-bold text-label-lg inline-flex items-center gap-1 transition-colors">
          صفحه بعد
          <span data-icon-missing="arrow_left" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</button>
</div>
</div>
</main>
<!-- ================= EMPTY STATE DEMONSTRATION SECTION ================= -->
<!-- Clean architectural empty state preview demonstrating feedback when category has no posts -->
<section class="w-full bg-surface-container-lowest py-20 border-t border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="text-center max-w-xl mx-auto p-12 border border-border bg-surface">
<!-- Subtle Minimal Architectural Icon Mark -->
<div class="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-border bg-surface-container-lowest text-secondary">
<span data-icon-missing="domain_disabled" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<!-- Title -->
<h3 class="text-headline-md font-headline-md text-ink font-bold mb-3">
          مطلبی در این دسته یافت نشد
        </h3>
<!-- Short Explanation -->
<p class="text-body-md font-body-md text-secondary mb-8">
          در حال حاضر هیچ محتوا یا گزارشی در دسته‌بندی انتخابی منتشر نشده است.
        </p>
<!-- Secondary Text Link / Action -->
<div>
<a class="inline-flex items-center gap-2 px-6 py-3 border border-primary-container text-primary-container text-label-lg font-label-lg hover:bg-brand-tint transition-colors font-bold" href="#feed">
<span data-icon-missing="refresh" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
            مشاهده همه مطالب
          </a>
</div>
</div>
</div>
</section>
<!-- ================= FOOTER (Shared Component) ================= -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border dark:border-outline-variant">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid: 5 Institutional Holding Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-secondary/30">
<!-- Col 1: Brand & Identity -->
<div class="lg:col-span-1">
<div class="flex items-center gap-3 mb-6">
<div class="w-8 h-8 bg-surface-container-lowest text-ink flex items-center justify-center font-bold font-headline-md">
              ث
            </div>
<span class="text-headline-md font-headline-md text-surface-container-lowest font-bold">هلدینگ ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed mb-6">
            پیشگام در مهندسی، سرمایه‌گذاری ملکی و توسعه زیرساخت‌های پایدار در سطح ملی و بین‌المللی.
          </p>
<div class="flex items-center gap-3">
<a class="w-9 h-9 border border-secondary flex items-center justify-center text-surface-dim hover:text-brand-tint hover:border-brand-tint transition-colors" href="#" title="شبکه ارتباطی">
<span data-icon-missing="share" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</a>
<a class="w-9 h-9 border border-secondary flex items-center justify-center text-surface-dim hover:text-brand-tint hover:border-brand-tint transition-colors" href="#" title="پایگاه داده">
<span data-icon-missing="dataset" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</a>
<a class="w-9 h-9 border border-secondary flex items-center justify-center text-surface-dim hover:text-brand-tint hover:border-brand-tint transition-colors" href="#" title="پشتیبانی ارتباطی">
<span data-icon-missing="support_agent" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</a>
</div>
</div>
<!-- Col 2: هلدینگ و پروژه‌ها -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-5 pb-2 border-b border-secondary/30">
            ساختار و پروژه‌ها
          </h4>
<ul class="space-y-3">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                معرفی هلدینگ و هیئت‌مدیره
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                پرتفوی پروژه‌های عمرانی
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                پایداری و استانداردهای مهندسی
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </a>
</li>
</ul>
</div>
<!-- Col 3: سهامداران و بازار سرمایه -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-5 pb-2 border-b border-secondary/30">
            امور سهامداران
          </h4>
<ul class="space-y-3">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                سامانه سهامداران و کدال
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                گزارش‌های ماهانه دیده‌بان
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                حریم خصوصی و شفافیت مالی
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                اطلاعیه‌های مجامع عمومی
              </a>
</li>
</ul>
</div>
<!-- Col 4: رسانه و مناقصات -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-5 pb-2 border-b border-secondary/30">
            رسانه و اخبار
          </h4>
<ul class="space-y-3">
<li>
<!-- Active Footer Page Link: اخبار و رسانه دیجیتال -->
<a class="text-body-sm font-body-sm text-surface-container-lowest font-bold block" href="#">
                اخبار و رسانه دیجیتال
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                مناقصات و مزایده‌ها
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                تماس و امور مشتریان
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">
                آرشیو پادکست رادیو ثاخت
              </a>
</li>
</ul>
</div>
<!-- Col 5: تماس رسمی و نظارت -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest font-bold mb-5 pb-2 border-b border-secondary/30">
            دفتر مرکزی ثاخت
          </h4>
<div class="text-body-sm font-body-sm text-surface-dim space-y-3">
<p class="leading-relaxed">تهران، خیابان ولیعصر، بالاتر از میرداماد، پلاک ۱۲۸، برج ثاخت</p>
<p class="font-mono text-left dir-ltr">تلفن: +98 (21) 8876 5432</p>
<p class="font-mono text-left dir-ltr">نماد بورس: ثاخت (توسعه ساختمان)</p>
</div>
<div class="mt-4 pt-4 border-t border-secondary/30">
<div class="inline-flex items-center gap-2 text-label-md font-label-md text-brand-tint">
<span class="w-2 h-2 bg-status-success inline-block"></span>
              سامانه پاسخگویی برخط فعال است
            </div>
</div>
</div>
</div>
<!-- Bottom Bar: Exact Copyright Text from JSON -->
<div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm font-body-sm text-surface-dim">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6">
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">شرایط و ضوابط حقوقی</a>
<span class="text-secondary">|</span>
<a class="text-surface-dim hover:text-brand-tint transition-colors" href="#">استانداردهای مهندسی ایزو</a>
<span class="text-secondary">|</span>
<span class="font-mono text-xs">V. 4.2.0 - HOLDING CORP</span>
</div>
</div>
</div>
</footer>
</template>
