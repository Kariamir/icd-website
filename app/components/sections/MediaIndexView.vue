<!--
  Ported from the approved design at
  stitch_project_detail_page_template/media/ (ADR-013).

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
<!-- ================= TOPNAVBAR (Shared Component) ================= -->

<!-- ================= HERO SECTION ================= -->
<!-- Full-bleed architectural photography with 40% deep scrim overlay. Standard WordPress institutional format. -->
<section class="relative w-full h-[360px] md:h-[440px] bg-ink overflow-hidden border-b border-border">
<!-- Architectural Photography Container -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="An expansive panoramic view of a massive modern brutalist architectural commercial development under clear morning daylight, featuring crisp steel beams, poured concrete facades, engineering symmetry, professional construction precision, and a restrained corporate palette of industrial blues and stony grays." style="background-image: url('/img/placeholder.svg')">
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A grand high-angle architectural photograph of an ongoing modern skyscraper construction foundation in Tehran, featuring industrial cranes, concrete pumping machinery, engineering scaffolding, sharp geometric shadows, and bright daylight in an authoritative civil engineering aesthetic." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A focused studio setting for a technical podcast recording with acoustic foam panels, professional studio microphones, sound level monitors, and architectural blueprints on the desk, lit with focused corporate lighting and industrial precision." src="/img/placeholder.svg" />
<!-- Category Badge (Top-Left in RTL) -->
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              پادکست
            </div>
<!-- MANDATORY PLAY MARKER OVERLAY BADGE FOR PODCAST -->
<div class="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
<div class="bg-ink/90 border border-border text-surface-container-lowest px-4 py-2 flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Detailed close-up civil engineering view of concrete slab reinforcement grids and seismic dampers being tested inside a structural laboratory, shot with crisp technical clarity, sharp geometry, and industrial high contrast lighting." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An analytical business perspective featuring digital stock market displays, financial data charts regarding real estate yield curves, superimposed on modern architectural skyline reflections in an executive boardroom setting." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Architectural technical drawings, project tender document binders with official legal stamps, and high-precision steel rulers lying neatly on an architect's heavy oak workstation under bright morning office light." src="/img/placeholder.svg" />
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
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="An expansive panoramic view of a massive modern brutalist architectural commercial development under clear morning daylight, featuring crisp steel beams, poured concrete facades, engineering symmetry, professional construction precision, and a restrained corporate palette of industrial blues and stony grays." src="/img/placeholder.svg" />
<div class="absolute top-3 left-3 bg-brand-tint text-primary-container px-2.5 py-1 text-label-md font-label-md font-bold">
              پادکست
            </div>
<!-- MANDATORY PLAY MARKER OVERLAY BADGE FOR PODCAST -->
<div class="absolute inset-0 flex items-center justify-center bg-ink/20 group-hover:bg-ink/30 transition-colors">
<div class="bg-ink/90 border border-border text-surface-container-lowest px-4 py-2 flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
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
</template>
