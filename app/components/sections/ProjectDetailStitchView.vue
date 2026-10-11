<!--
  Ported from the approved design at
  stitch_project_detail_page_template/03_project_detail/ (ADR-013).

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
<!-- TOP APP BAR / OFFICIAL WEB HEADER -->
<header class="bg-surface-container-lowest dark:bg-inverse-surface border-b border-border dark:border-outline-variant sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right Side: Brand Logo & Institutional Emblem -->
<div class="flex items-center gap-8">
<a class="text-headline-md font-headline-md text-ink dark:text-surface-container-lowest tracking-tight flex items-center gap-3" href="#">
<span class="w-8 h-8 bg-primary-container text-white flex items-center justify-center font-bold text-lg font-headline-md leading-none">ث</span>
<span class="">هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-7 pt-1">
<a class="text-label-lg font-label-lg text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 transition-colors duration-150" href="#">درباره ثاخت</a>
<!-- Active State: 'پروژه‌ها' active according to hierarchy protocol -->
<a class="text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container dark:text-inverse-primary font-bold pb-1" href="#">پروژه‌ها</a>
<a class="text-label-lg font-label-lg text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 transition-colors duration-150" href="#">فروش و پیش‌فروش</a>
<a class="text-label-lg font-label-lg text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 transition-colors duration-150" href="#">دیده‌بان ثاخت</a>
<a class="text-label-lg font-label-lg text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 transition-colors duration-150" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left Side: Interactive Tools, Search & Actions -->
<div class="flex items-center gap-4">
<button aria-label="جستجو" class="p-2 text-ink dark:text-surface-container-lowest hover:bg-surface transition-colors" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="p-2 text-ink dark:text-surface-container-lowest hover:bg-surface transition-colors text-label-md font-label-md flex items-center gap-1" title="تغییر زبان">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
<span class="uppercase tracking-wider">EN</span>
</button>
<div class="h-6 w-px bg-border hidden sm:block"></div>
<a class="hidden md:inline-flex items-center text-label-lg font-label-lg text-primary-container hover:text-brand-blue-deep transition-colors px-3 py-2 border border-border hover:border-primary-container" href="#">
          ورود سهامداران
        </a>
<a class="inline-flex items-center justify-center bg-primary-container text-white text-label-lg font-label-lg px-5 py-2.5 hover:bg-brand-blue-deep transition-colors" href="#inquiry">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- MAIN LONG SCROLL CONTENT -->
<main class="w-full">
<!-- HERO SECTION: Full-bleed project photograph, dark overlay (30-50%), typography low & right -->
<section class="relative w-full h-[88vh] min-h-[620px] bg-ink flex items-end overflow-hidden">
<!-- Background Image Container -->
<div class="absolute inset-0 bg-cover bg-center bg-no-repeat" data-alt="Monolithic architectural perspective photograph of the Tehran International Tower rising prominently against the clear sky with Mount Damavand in the distance. The monumental concrete and glass residential structure is captured in crisp daylight, showcasing industrial precision, pristine structural engineering, and deep institutional authority without motion blur." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2DP-m-oUlR9eY2DSoXBwuBUECmKkULOtMHqnUAghwepdE06a_WQUQ_9yUZh25LOaRy2Wra7M-C66vNCbQFtSwsrkW635RYa0mCouFOr0wnZi-kxSwQjISTbvs0SWy5iiViDXkAPsKLKOuRD2Hz-dCOgfBDqxc50ldWwzq-6FYAxb60SEsVffG2YsKyEz6CuJeyxvMPlYeERBfXX0ehGpGZHF9BQciUKBuFzuk3v2nmYexOUJ4Xv_y3Q')"></div>
<!-- Scrim Overlay (45% opacity deep ink) -->
<div class="absolute inset-0 bg-ink/45"></div>
<!-- Hero Typographic Anchor (Strictly low and right, no buttons, no badges) -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pb-16 md:pb-24">
<div class="max-w-4xl">
<h1 class="text-white font-headline-xl text-headline-xl-mobile md:text-headline-xl font-extrabold tracking-tight mb-4">
            برج بین‌المللی تهران
          </h1>
<p class="text-brand-tint font-headline-sm text-headline-sm font-medium tracking-normal">
            شاهکار مهندسی و بلندترین برج مسکونی پایتخت
          </p>
</div>
</div>
</section>
<!-- SECTION 1: SHORT INTRO (Generous Whitespace pt-[130px]) -->
<section class="pt-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="max-w-4xl">
<p class="text-ink font-body-lg text-[22px] md:text-[26px] leading-[44px] md:leading-[50px] font-normal" style="line-height: 1.85 !important;">
          برج بین‌المللی تهران به عنوان شاخص‌ترین نماد انبوه‌سازی مدرن و نماد مهندسی عمران کشور، تلفیقی استثنایی از تکنولوژی پیشرفته لرزه‌ای و آسایش سکونتی پایدار را در شمال کلان‌شهر تهران به منصه ظهور رسانده است. این سازه عظیم با بهره‌گیری از پلان سه‌پر و معماری تندیس‌گون، الگویی پیشگام در مهندسی آسمان‌خراش‌های مسکونی منطقه محسوب می‌شود.
        </p>
</div>
</section>
<!-- SECTION 2: SPECIFICATION TABLE (Generous Whitespace pt-[130px]) -->
<section class="pt-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin" id="specs-section">
  <div class="border-b-2 border-ink pb-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
    <div>
      <h2 class="text-headline-md font-headline-md text-ink">مشخصات فنی و شناسنامه مهندسی</h2>
      <p class="text-body-sm text-secondary mt-1">شناسنامه جامع ساختاری، مشخصات معماری و استانداردهای توسعه</p>
    </div>
    <span class="text-label-md font-label-md text-secondary tracking-widest font-mono">TECHNICAL SPECIFICATIONS</span>
  </div>

  <!-- Interactive Tab Headers -->
  <div class="flex flex-wrap border-b border-border gap-0 bg-surface/40" role="tablist">
    <button onclick="switchTab('arch')" id="tab-btn-arch" class="tab-btn active px-6 py-4 text-label-lg font-bold border-b-2 border-primary-container transition-all text-center flex items-center gap-2">
      <svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V3h9v18M14 9h5v12M8 7h2M8 11h2M8 15h2"  /></svg>
      <span class="">مشخصات معماری و کاربری</span>
    </button>
    <button onclick="switchTab('structure')" id="tab-btn-structure" class="tab-btn px-6 py-4 text-label-lg font-bold text-secondary hover:text-ink hover:bg-surface border-b-2 border-transparent transition-all text-center flex items-center gap-2">
      <span data-icon-missing="engineering" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
      <span class="">سازه و تکنولوژی ساخت</span>
    </button>
    <button onclick="switchTab('geo')" id="tab-btn-geo" class="tab-btn px-6 py-4 text-label-lg font-bold text-secondary hover:text-ink hover:bg-surface border-b-2 border-transparent transition-all text-center flex items-center gap-2">
      <span data-icon-missing="straighten" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
      <span class="">موقعیت و ابعاد</span>
    </button>
    <button onclick="switchTab('units')" id="tab-btn-units" class="tab-btn px-6 py-4 text-label-lg font-bold text-secondary hover:text-ink hover:bg-surface border-b-2 border-transparent transition-all text-center flex items-center gap-2">
      <span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
      <span class="">ظرفیت و جزئیات واحدها</span>
    </button>
  </div>

  <!-- Tab Panel 1: Architectural & Function -->
  <div id="tab-panel-arch" class="tab-content border border-t-0 border-border bg-surface-container-lowest p-6 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-border">
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">کاربری اصلی</span>
          <span class="text-body-md text-ink font-bold">مسکونی لوکس و اقامتی ویژه</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">الگوی پلان معماری</span>
          <span class="text-body-md text-ink font-bold">پلان سه‌پر متقارن (سه بال مجزا حول هسته مرکزی)</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">سبک طراحی و کالبد</span>
          <span class="text-body-md text-ink font-bold">مدرن تندیس‌گون با نمای تمام‌پنل بتنی پیش‌ساخته</span>
        </div>
      </div>
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">ارتفاع لابی مرکزی</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۱۲ متر فضای مجلل</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تاسیسات رفاهی و خدمات</span>
          <span class="text-body-md text-ink font-bold">مجموعه ورزشی، استخر، لابی اختصاصی در هر بال</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">دوره احداث و بهره‌برداری</span>
          <span class="text-body-md text-ink font-bold">۱۳۷۷ الی ۱۳۸۴</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab Panel 2: Structure & Technology -->
  <div id="tab-panel-structure" class="tab-content hidden border border-t-0 border-border bg-surface-container-lowest p-6 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-border">
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">سیستم سازه‌ای باربر</span>
          <span class="text-body-md text-ink font-bold">دیوارهای برشی بتن‌آرمه و هسته مرکزی صلب</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">مقاومت لرزه‌ای</span>
          <span class="text-body-md text-ink font-bold">طراحی تاب‌آور در برابر زلزله‌های شدید تا ۹ ریشتر</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تکنولوژی سقف‌ها</span>
          <span class="text-body-md text-ink font-bold">دال بتن‌آرمه پیش‌تنیده (Post-Tensioned)</span>
        </div>
      </div>
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">سیستم پی و فونداسیون</span>
          <span class="text-body-md text-ink font-bold">رادیه ژنرال گسترده به ضخامت ۳ تا ۴٫۵ متر با شمع‌های عمیق</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تجهیزات هوشمند و ایمنی</span>
          <span class="text-body-md text-ink font-bold">سامانه پایش لرزه‌ای، ژنراتورهای اضطراری و اطفای حریق خودکار</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">کنترل نوسان باد</span>
          <span class="text-body-md text-ink font-bold">مهندسی آیرودینامیک با کاهش بار باد بر بال‌های سه‌گانه</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab Panel 3: Position & Dimensions -->
  <div id="tab-panel-geo" class="tab-content hidden border border-t-0 border-border bg-surface-container-lowest p-6 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-border">
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">ارتفاع سازه‌ای کل</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۱۶۲ متر از سطح زمین</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تعداد کل طبقات</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۵۶ طبقه (شامل ۳ طبقه زیرزمین)</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">زیربنای ناخالص کل</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۲۲۰,۰۰۰ متر مربع</span>
        </div>
      </div>
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">مساحت زمین پروژه</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۲۸,۰۰۰ متر مربع</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">موقعیت و تقاطع‌ها</span>
          <span class="text-body-md text-ink font-bold">بزرگراه حکیم، شیخ فضل‌الله نوری و کردستان</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تراز ارتفاعی سایت</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۱,۴۲۰ متر بالاتر از سطح دریا</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab Panel 4: Units & Capacity -->
  <div id="tab-panel-units" class="tab-content hidden border border-t-0 border-border bg-surface-container-lowest p-6 md:p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 divide-y md:divide-y-0 divide-border">
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تعداد کل واحدهای مسکونی</span>
          <span class="text-body-md text-ink font-bold">۵۷۲ واحد مستقل</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">توزیع در بال‌ها</span>
          <span class="text-body-md text-ink font-bold">سه بال اصلی: A (شمالی)، B (شرقی)، C (غربی)</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تنوع متراژ واحدها</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۴۲ الی ۵۰۰ متر مربع (سوییت تا پنت‌هاوس)</span>
        </div>
      </div>
      <div class="space-y-4 py-2">
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">تعداد آسانسورها</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۱۵ دستگاه آسانسور پرسرعت پرظرفیت</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">ظرفیت پارکینگ اختصاصی</span>
          <span class="text-body-md text-ink font-bold" dir="ltr">۱,۰۰۰ واحد پارکینگ هوشمند مسقف</span>
        </div>
        <div class="flex justify-between items-center py-3 border-b border-border/60 hover:bg-surface/30 px-2">
          <span class="text-body-md text-secondary font-medium">واحدهای پنت‌هاوس</span>
          <span class="text-body-md text-ink font-bold">دوبلکس و تریپلکس در طبقات فوقانی با دید پانوراما</span>
        </div>
      </div>
    </div>
  </div>

  
</section>
<!-- SECTION 3: LARGE IMAGE GALLERY (Generous Whitespace pt-[130px]) -->
<!-- Masonry Layout, No borders, No heavy shadows, Minimal Captions -->
<section class="pt-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="border-b border-border pb-4 mb-10 flex justify-between items-baseline">
<h2 class="text-headline-md font-headline-md text-ink">روایت بصری و گالری معماری</h2>
<span class="text-label-md font-label-md text-secondary font-mono">ARCHITECTURAL PORTFOLIO</span>
</div>
<!-- Asymmetrical / Masonry Composition -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
  <!-- Large Hero Span Item -->
  <figure class="md:col-span-8 group m-0">
    <div class="relative w-full aspect-[16/10] bg-surface-alt overflow-hidden border border-border hover:border-primary-container transition-colors duration-300">
      <img class="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500" data-alt="A dramatic low-angle architectural photograph capturing the striking tripartite wing facade of the monumental residential skyscraper in Tehran. Crisp natural morning light sculpts the structural concrete fins, geometry, and high-tech curtain walls, emphasizing immense vertical scale and pristine industrial engineering in neutral architectural colors." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5FpeHJoCUZ97gypx-Mx3JQ17O2ButopQ9_Ts61UdsXJOz3rVPdK9q9tmu02QbyI5wJbXtnRhZxZ82HmAhygzr6gwgHCoEhAIgfujna53CEpm5OUmwMtccuxFIOYCOddYUJiws97xDmvt4iKRfgkK58e-sNvsEQRlHquM88AUpJ9_CVtrPKsKRZb6s_8vgLLNxUB3AWotUHD8mJAOcfz268g4T9MEpZazJq4sODZYYkFWJaNYAAfskxQ" />
    </div>
    <figcaption class="mt-3 text-label-lg font-label-lg text-secondary border-r-2 border-primary-container pr-3 flex items-center justify-between">
      <span class="">نمای تندیس‌گون و بال‌های سه‌گانه برج</span>
      <span class="text-label-md font-mono text-outline">VIEW 01 / EXTERIOR</span>
    </figcaption>
  </figure>
  <!-- Vertical Accent Item -->
  <figure class="md:col-span-4 group m-0">
    <div class="relative w-full aspect-[4/3] md:aspect-[3/4] bg-surface-alt overflow-hidden border border-border hover:border-primary-container transition-colors duration-300">
      <img class="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500" data-alt="An expansive interior view of a grandiose corporate residential skyscraper lobby featuring twelve-meter high ceilings, structural stone columns, polished travertine flooring, and ambient minimalist linear architectural lighting designed in a disciplined modernist institutional style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkKo6zi9z752O4VBnuvDKep756CAPrmer9a1XqRujj4FHrNvyw9QXoCbPdTOvNYZNlXux4FQWgpa5TVukvpaY5BDsan2SffDifitk9aACVvg7mERr2JtLD4RR3w19-0GT5I6Tl6Ehn64SkClk_xFql1IqGBzYIAA-X083rHkypNWITR3vY-xeQ2f3PdTiuSspMMgmNnUH7gbjsKSCdmohg6DDl2ifabq5j6qLEQGI9899vSYcJti3-SQ" />
    </div>
    <figcaption class="mt-3 text-label-lg font-label-lg text-secondary border-r-2 border-primary-container pr-3 flex items-center justify-between">
      <span class="">لابی مرکزی به ارتفاع ۱۲ متر</span>
      <span class="text-label-md font-mono text-outline">VIEW 02 / ATRIUM</span>
    </figcaption>
  </figure>
  <!-- Wide Penthouse View Item -->
  <figure class="md:col-span-7 group m-0 md:mt-6">
    <div class="relative w-full aspect-[16/9] bg-surface-alt overflow-hidden border border-border hover:border-primary-container transition-colors duration-300">
      <img class="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500" data-alt="An elevated perspective from an ultra-luxury high-floor skyscraper penthouse overlooking the sprawling cityscape of Tehran and the snow-capped Alborz mountain range during clear late afternoon golden hour with floor-to-ceiling panoramic glass windows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL_zdlupxGBzvmrnrEEaOatxWYqSk3rUNF5nzGcSwndySlEs43EiJg5lAfyw6BTSiUyVOESeGqYsUdWhkwowTgXyj1mTCt26yA2G5zZasuMDUXOtzXT4XKERx6WynuMgyOgQgan7mVeW8_Dmlh61MGNstxxNo5446CLm8gMzcsTpqRy9-8FsdOoN9JbFXKnu29W1NmFqcqeLN4ovmoGO3oBB-qPWMfSzcB430OIWcQ8axnsPSzhMDs4g" />
    </div>
    <figcaption class="mt-3 text-label-lg font-label-lg text-secondary border-r-2 border-primary-container pr-3 flex items-center justify-between">
      <span class="">پنت‌هاوس و دید ۳۶۰ درجه به البرز</span>
      <span class="text-label-md font-mono text-outline">VIEW 03 / PANORAMA</span>
    </figcaption>
  </figure>
  <!-- Engineering / Construction Detail Item -->
  <figure class="md:col-span-5 group m-0 md:mt-6">
    <div class="relative w-full aspect-[4/3] bg-surface-alt overflow-hidden border border-border hover:border-primary-container transition-colors duration-300">
      <img class="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500" data-alt="A clean, geometric detail shot of massive reinforced pre-stressed concrete columns and structural joints demonstrating earthquake engineering precision, industrial stability, and monolithic brutalist modernist design with razor-sharp shadow lines." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-3QUbI_t-jeQVAmKP6q852yZ30u_uzbBE049mk6k_R2flMAV2voLKUo0MgZyfRxkxoimFrHMg78M-WJ5EIAoFc53w0ag9yEt4B1HtN_tiVX2cOagYEnRDVLFd97ttFnUP4hgjeMazRbrQ-gQSTGf0fi19sKgaYYA1CTAi01tCEBMbvhXSH3KGkMzgiWAcXpT_FcF0zWCObyGElzpBiM9uuih-AqfGhWHVriYrQ0UN97B6i5JUmgV2ig" />
    </div>
    <figcaption class="mt-3 text-label-lg font-label-lg text-secondary border-r-2 border-primary-container pr-3 flex items-center justify-between">
      <span class="">جزئیات سازه‌ای و اتصالات مقاوم‌سازی لرزه‌ای</span>
      <span class="text-label-md font-mono text-outline">VIEW 04 / STRUCTURE</span>
    </figcaption>
  </figure>
</div>
</section>
<!-- SECTION 4: LOCATION (Generous Whitespace pt-[130px]) -->
<!-- Architectural GIS/Map Block with Coordinates and Vector Precision -->
<section class="pt-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="border-b border-border pb-4 mb-10 flex justify-between items-baseline">
<div>
<h2 class="text-headline-md font-headline-md text-ink">موقعیت ژئو-استراتژیک</h2>
<p class="text-body-sm font-body-sm text-secondary mt-1">دسترسی اختصاصی به شاهراه‌های شریانی منطقه ۶ پایتخت</p>
</div>
<span class="text-label-md font-label-md text-secondary font-mono" dir="ltr">35.7423° N, 51.3917° E</span>
</div>
<!-- Architectural Map Plane -->
<div class="relative w-full h-[440px] bg-surface-alt border border-border overflow-hidden">
<!-- Minimalist Stylized Map Rendering via Clean Architectural Vector Simulation -->
<div class="w-full h-full bg-cover bg-center filter grayscale contrast-125" data-alt="A high-contrast monochrome architectural GIS street layout and satellite cartography map focusing on central Tehran around Hakim Highway and Sheikh Fazlollah Nouri junction, styled in sterile graphite gray and stark white gridlines." data-location="Tehran" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAZk6KFczR7k8S_pehfTjSpNZKL-2Y34FBUaabl4msoTbPDolVowd8SFjWQTsDUYQQn1ihPmMlKVU5w-EgUd786qSx0Ir05wAprZ320o5gSTLR51xnQ1azpV9tt0m7yYJ2GGqUSehE9N_XvGh_mC2BneoNM5WKeIan94J1aXqXv77BfBNxpmDVo1pzxkxvBf-E3R3aVk8eQl6HU54x8JYJF9YceibVyyYWtQUTxsUJ5AF18hcHqUqHqg')"></div>
<!-- GIS Coordinate & Navigation Overlay Card (Flat planar stacking) -->
<div class="absolute bottom-6 right-6 bg-surface-container-lowest border border-border p-6 max-w-md">
<div class="flex items-center gap-3 mb-3">
<div class="w-3 h-3 bg-primary-container"></div>
<span class="text-label-lg font-label-lg text-ink font-bold">نشانی رسمی پروژه:</span>
</div>
<p class="text-body-sm font-body-sm text-on-surface-variant mb-4 leading-relaxed">
            تهران، همگامی بزرگراه حکیم، ضلع شمال‌شرقی تقاطع بزرگراه‌های کردستان و شیخ فضل‌الله نوری، مجموعه بین‌المللی تهران
          </p>
<div class="flex items-center justify-between pt-3 border-t border-border text-label-md font-label-md text-secondary">
<span class="">ارتفاع از سطح دریا: ۱,۴۲۰ متر</span>
<span class="font-mono text-primary-container font-bold" dir="ltr">UTM: 39S 535422 3955431</span>
</div>
</div>
<!-- Center Marker Indicator -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
<div class="w-6 h-6 border-2 border-primary-container bg-surface-container-lowest/80 flex items-center justify-center">
<div class="w-2 h-2 bg-primary-container"></div>
</div>
<div class="bg-ink text-white text-[11px] font-bold px-2 py-0.5 mt-1 tracking-wider">
            برج بین‌المللی تهران
          </div>
</div>
</div>
</section>
<!-- SECTION 5: THE OWNER COMPANY (Generous Whitespace pt-[130px]) -->
<!-- Flat Row with Subsidiary Logo, Name, Subtitle, and Subtle Text Link -->
<section class="pt-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="border-t border-b border-border py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface/30 px-6">
<!-- Left details (Subsidiary Identity) -->
<div class="flex items-center gap-6">
<!-- Monogram Logo Container -->
<div class="w-16 h-16 bg-ink text-white flex items-center justify-center font-bold text-headline-md tracking-wider border border-border select-none">
            ASP
          </div>
<div>
<div class="flex items-center gap-3">
<h3 class="text-headline-sm font-headline-sm text-ink font-bold">شرکت ساختمانی آ.اس.پ</h3>
<span class="text-label-md font-label-md bg-surface-alt text-ink px-2 py-0.5 border border-border">وابسته به ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-secondary mt-1">
              توسعه‌دهنده و پیمانکار تخصصی سازه‌های بلندمرتبه و نمادهای ساختمانی کشور
            </p>
</div>
</div>
<!-- Subtle Text Link (Zero radius, elegant arrow) -->
<div>
<a class="inline-flex items-center gap-2 text-primary-container hover:text-brand-blue-deep text-label-lg font-label-lg font-bold group transition-colors" href="#">
<span class="">مشاهده کارنامه شرکت سازنده</span>
<span class="group-hover:-translate-x-1 transition-transform duration-150 inline-block font-mono">←</span>
</a>
</div>
</div>
</section>
<!-- SECTION 6: CALL TO ACTION (Generous Whitespace pt-[130px], pb-[130px]) -->
<!-- Clean Primary CTA Row: Flat, Sharp Corners, #005EB8 Accent -->
<section class="pt-[130px] pb-[130px] w-full max-w-[1440px] mx-auto px-space-lg md:px-margin" id="inquiry">
<div class="bg-ink text-white p-10 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-r-8 border-primary-container">
<div class="max-w-2xl">
<span class="text-brand-tint text-label-md font-label-md tracking-widest block mb-2 font-mono uppercase">TRANSACTION &amp; CONSULTATION</span>
<h2 class="text-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-white mb-3">
            پیش‌فروش و استعلام واحدهای باقیمانده
          </h2>
<p class="text-surface-dim font-body-md text-body-md leading-relaxed">
            جهت هماهنگی بازدید اختصاصی، بررسی مدارک ثبتی، و آگاهی از شرایط پرداخت و انتقال قطعی واحدهای برج بین‌المللی تهران، با دفتر مرکزی فروش هلدینگ ارتباط حاصل فرمایید.
          </p>
</div>
<div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
<a class="inline-flex items-center justify-center bg-primary-container text-white text-label-lg font-label-lg px-8 py-4 hover:bg-brand-blue-deep transition-colors text-center font-bold tracking-normal" href="#">
            پیش‌فروش این پروژه
          </a>
<a class="inline-flex items-center justify-center border border-surface-dim text-white text-label-lg font-label-lg px-6 py-4 hover:bg-white hover:text-ink transition-colors text-center font-medium font-mono" dir="ltr" href="tel:02188888888">
            +98 (21) 8888-8888
          </a>
</div>
</div>
</section>
</main>
<!-- OFFICIAL WEB FOOTER (Strictly from Shared Components JSON) -->
<footer class="bg-ink text-surface-dim border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid: 5-Column Institutional Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline-variant/30">
<!-- Column 1: Corporate Brand Identity -->
<div class="lg:col-span-1">
<div class="text-headline-md font-headline-md text-surface-container-lowest mb-4 flex items-center gap-2">
<span class="w-7 h-7 bg-primary-container text-white flex items-center justify-center font-bold text-base leading-none">ث</span>
<span class="">هلدینگ ساختمانی ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed">
            شرکت بین‌المللی توسعه ساختمان (سهامی عام)؛ پیشگام در مهندسی، سرمایه‌گذاری و اجرای مگاپروژه‌های عمرانی در خاورمیانه.
          </p>
</div>
<!-- Column 2: Governance & Projects -->
<div>
<h4 class="text-label-lg font-label-lg text-white mb-5 border-r-2 border-primary-container pr-2">معرفی و پروژه‌ها</h4>
<ul class="space-y-3">
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">پایداری و استانداردهای مهندسی</a></li>
</ul>
</div>
<!-- Column 3: Shareholder Services -->
<div>
<h4 class="text-label-lg font-label-lg text-white mb-5 border-r-2 border-primary-container pr-2">امور سهامداران</h4>
<ul class="space-y-3">
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">سامانه سهامداران و کدال</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">حریم خصوصی و شفافیت مالی</a></li>
</ul>
</div>
<!-- Column 4: Commercial & Investment -->
<div>
<h4 class="text-label-lg font-label-lg text-white mb-5 border-r-2 border-primary-container pr-2">فرصت‌های بازرگانی</h4>
<ul class="space-y-3">
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">مناقصات و مزایده‌ها</a></li>
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">اخبار و رسانه دیجیتال</a></li>
</ul>
</div>
<!-- Column 5: Communication -->
<div>
<h4 class="text-label-lg font-label-lg text-white mb-5 border-r-2 border-primary-container pr-2">ارتباط با هلدینگ</h4>
<ul class="space-y-3">
<li class=""><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors block" href="#">تماس و امور مشتریان</a></li>
</ul>
<div class="mt-6 pt-4 border-t border-outline-variant/20">
<span class="text-label-md font-label-md text-surface-dim block font-mono" dir="ltr">IRAN / TEHRAN HEADQUARTERS</span>
<span class="text-body-sm font-body-sm text-brand-tint font-mono mt-1 block" dir="ltr">+98 (21) 8800-0000</span>
</div>
</div>
</div>
<!-- Bottom Row: Copyright text from JSON -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-body-sm font-body-sm text-surface-dim">
<p class="text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="text-label-md font-label-md font-mono text-secondary-fixed-dim" dir="ltr">
          ICD HOLDING • TEHRAN STOCK EXCHANGE: ثاخت
        </div>
</div>
</div>
</footer>
</template>
