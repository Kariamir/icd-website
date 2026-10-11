<!--
  Ported from the approved design at
  stitch_project_detail_page_template/10_search_results/ (ADR-013).

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
<!-- BEGIN: StickyMainHeader -->

<!-- END: StickyMainHeader -->
<!-- BEGIN: MainContent -->
<main class="flex-grow py-8 md:py-12">
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
<!-- Breadcrumb Bar -->
<nav aria-label="مسیریابی" class="mb-6 flex items-center text-xs text-slate-500 font-medium">
<a class="hover:text-brand-blue transition-colors" href="#">صفحه اصلی</a>
<svg class="w-3.5 h-3.5 mx-2 text-slate-400 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
</svg>
<span class="text-slate-400">جستجوی سراسری پرتال ثاخت</span>
<svg class="w-3.5 h-3.5 mx-2 text-slate-400 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
</svg>
<span class="text-brand-blue font-semibold">نتایج مگاپارس</span>
</nav>
<!-- BEGIN: SearchHeaderSection -->
<section class="bg-white rounded-3xl p-6 md:p-8 border border-brand-border shadow-subtle mb-8" data-purpose="search-input-panel">
<form action="#" class="relative" method="GET">
<div class="flex flex-col md:flex-row gap-3 items-stretch">
<!-- Main Input Bar -->
<div class="relative flex-grow">
<span class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<circle cx="11" cy="11" r="7" stroke-width="2" />
<path d="M21 21l-4.35-4.35" stroke-linecap="round" stroke-width="2" />
</svg>
</span>
<input class="w-full h-14 pr-12 pl-12 rounded-2xl border border-slate-200 bg-slate-50 text-brand-dark placeholder-slate-400 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 text-sm md:text-base font-medium transition-all" name="q" placeholder="جستجو در پروژه‌ها، اطلاعیه‌های کدال، اخبار، واحدها و مناقصات..." type="search" value="مگاپارس و سرمایه‌گذاری" />
<!-- Clear Query Action -->
<button aria-label="پاک‌کردن متن" class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 hover:text-brand-dark transition-colors" type="button">
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
</svg>
</button>
</div>
<!-- Action Buttons Group -->
<div class="flex items-center gap-2">
<button class="h-14 px-8 rounded-2xl bg-brand-blue hover:bg-brand-hover text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 flex-grow md:flex-grow-0" type="submit">
<span>جستجو</span>
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
</svg>
</button>
<button class="h-14 px-5 rounded-2xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-brand-dark text-sm font-semibold transition-colors" title="بازنشانی فیلترها" type="reset">
                نوسازی
              </button>
</div>
</div>
</form>
<!-- Quick Trending Suggestions -->
<div class="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
<span class="text-xs font-semibold text-slate-400 ml-1">پیشنهادهای پرتکرار:</span>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">پروژه مگاپارس</a>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">اطلاعیه مجمع ۱۴۰۳</a>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">واحدهای پنت‌هاوس</a>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">نماد ثاخت در بورس</a>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">سود نقدی سجام</a>
<a class="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-brand-tint hover:text-brand-blue text-slate-600 transition-colors" href="#">سامانه مناقصات</a>
</div>
</section>
<!-- END: SearchHeaderSection -->
<!-- BEGIN: ResultsControlPanel -->
<section class="mb-6 flex flex-col gap-4" data-purpose="results-filtering-and-meta">
<!-- Results Summary & Secondary Controls -->
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div class="flex items-center gap-2">
<span class="inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full bg-brand-tint text-brand-blue">
              ۴۸ نتیجه یافت شد
            </span>
<p class="text-xs text-slate-500 font-medium">
              برای عبارت <strong class="text-brand-dark">«مگاپارس و سرمایه‌گذاری»</strong> در ۰.۱۲ ثانیه
            </p>
</div>
<!-- Sort and Additional Filter Dropdowns -->
<div class="flex flex-wrap items-center gap-3 min-w-0">
<div class="flex items-center gap-2">
<label class="text-xs font-semibold text-slate-500 shrink-0" for="sortSelect">مرتب‌سازی:</label>
<select class="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 pr-8 text-brand-dark focus:ring-brand-blue focus:border-brand-blue" id="sortSelect">
<option selected="" value="relevance">مرتبط‌ترین نتایج</option>
<option value="latest">جدیدترین انتشار</option>
<option value="views">پربازدیدترین‌ها</option>
</select>
</div>
<div class="flex items-center gap-2">
<label class="text-xs font-semibold text-slate-500 shrink-0" for="yearFilter">سال:</label>
<select class="text-xs font-semibold bg-white border border-slate-200 rounded-xl px-3 py-2 pr-8 text-brand-dark focus:ring-brand-blue focus:border-brand-blue" id="yearFilter">
<option value="all">همه سال‌ها</option>
<option selected="" value="1403">۱۴۰۳</option>
<option value="1402">۱۴۰۲</option>
<option value="1401">۱۴۰۱</option>
</select>
</div>
</div>
</div>
<!-- Filter Category Tabs (Horizontal Segmented Pills) -->
<div class="flex items-center gap-2 overflow-x-auto pb-2 min-w-0 max-w-full [scrollbar-width:none]">
<button class="px-4 py-2 rounded-full text-xs font-bold bg-brand-blue text-white shadow-sm shrink-0 whitespace-nowrap">
            همه نتایج (۴۸)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            پروژه‌ها و املاک (۱۲)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            فروش و پیش‌فروش واحدها (۸)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            اطلاعیه‌ها و گزارش‌های کدال (۱۱)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            اخبار و رسانه (۹)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            اسناد و حاکمیت شرکتی (۵)
          </button>
<button class="px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shrink-0 whitespace-nowrap transition-colors">
            مناقصات و استخدام (۳)
          </button>
</div>
</section>
<!-- END: ResultsControlPanel -->
<!-- BEGIN: ResultsList -->
<section class="space-y-4" data-purpose="search-results-list">
<!-- Result Item 1: Landmark Project (PDP) -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow order-2 md:order-1">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-brand-blue border border-blue-200">
                  پروژه شاخص تجاری-اداری
                </span>
<span class="text-xs text-slate-400">کد پروژه: PRJ-704</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-emerald-600 font-semibold">پیشرفت فیزیکی ۷۸٪</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  مجموعه چندمنظوره تجاری، اداری و تفریحی <mark class="highlight">مگاپارس</mark> تهران
                </a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                بزرگترین مجتمع تجاری سبز خاورمیانه با بیش از ۲۱۰ هزار مترمربع زیربنا، دارای هلی‌پد اختصاصی، بام سبز اکولوژیک و بیش از ۶۰۰ واحد تجاری مدرن. فرصت‌های ممتاز <mark class="highlight">سرمایه‌گذاری</mark> ملکی، هایپرمارکت و زون‌های تفریحی با استاندارد بین‌المللی Leed...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span class="flex items-center gap-1.5">
<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
                  موقعیت: تهران، خیابان دکتر شریعتی، نبش معلم
                </span>
<span class="flex items-center gap-1.5">
<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
                  زیربنا: ۲۱۰,۰۰۰ مترمربع
                </span>
<span class="flex items-center gap-1.5">
<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
                  به‌روزرسانی: ۳ روز پیش
                </span>
</div>
</div>
<!-- Thumbnail Container -->
<div class="w-full md:w-44 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 order-1 md:order-2 border border-slate-200">
<div class="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-600 flex flex-col items-center justify-center text-white relative">
<svg class="w-8 h-8 opacity-60 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
</svg>
<span class="text-[11px] font-medium tracking-wide">نمای معماری پروژه</span>
</div>
</div>
</div>
</article>
<!-- Result Item 2: Sales & Pre-sale Unit Offer -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow order-2 md:order-1">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  فروش و پیش‌فروش واحدها
                </span>
<span class="text-xs text-slate-400">کد ملک: UN-2088</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-brand-blue font-semibold">تسهیلات اقساطی ۳۶ ماهه</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  واحد اداری تیپ B1 پروژه <mark class="highlight">مگاپارس</mark> - طبقه ۱۲ با دید پانوراما
                </a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                واحدهای تجاری و اداری آماده واگذاری و پیش‌فروش، بهترین بستر <mark class="highlight">سرمایه‌گذاری</mark> ملکی بدون ریسک با سود تضمین‌شده دوره ساخت، دارای ورودی VIP اختصاصی، ۴ لاین آسانسور پرسرعت میتسوبیشی و سیستم تهویه مستقل VRF...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span class="font-medium text-slate-700">مساحت: ۱۸۵ مترمربع</span>
<span>شرایط پرداخت: ۴۰٪ پیش‌پرداخت + اقساط ۳۶ ماهه</span>
<span class="text-emerald-600 font-bold">قیمت پایه: استعلام آنلاین</span>
<a class="text-brand-blue font-bold hover:underline mr-auto" href="#">مشاهده پلان و رزرو آنلاین ←</a>
</div>
</div>
<!-- Thumbnail Container -->
<div class="w-full md:w-44 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 order-1 md:order-2 border border-slate-200">
<div class="w-full h-full bg-gradient-to-tr from-cyan-900 to-blue-700 flex flex-col items-center justify-center text-white relative">
<svg class="w-8 h-8 opacity-75 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
</svg>
<span class="text-[11px] font-medium tracking-wide">پلان معماری تیپ B1</span>
</div>
</div>
</div>
</article>
<!-- Result Item 3: CODAL / Shareholder Disclosure -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  سامانه کدال - افشای اطلاعات بااهمیت (گروه ب)
                </span>
<span class="text-xs text-slate-400">شناسه ره‌گیری: ۱۱۸۹۲۰۳</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-slate-500">ناشر: ثاخت (ICD)</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  شفاف‌سازی و نتایج حاصل از برگزاری مزایده فروش واحدهای تجاری <mark class="highlight">مگاپارس</mark>
</a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                پیرو آگهی مزایده عمومی شماره ۱۴۰۳/۰۴ مندرج در روزنامه رسمی، به اطلاع کلیه سهامداران و فعالان بازار <mark class="highlight">سرمایه‌گذاری</mark> می‌رساند قرارداد واگذاری قطعی ۵ باب واحد تجاری مگاپارس با سودآوری خالص ۵۲۰ میلیارد ریال نهایی و در دفاتر مالی ثبت گردید...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span>تاریخ انتشار: ۱۴۰۳/۰۸/۱۲ - ساعت ۱۰:۱۵</span>
<span>سود هر سهم تحت تاثیر: +۲۴ ریال</span>
<span class="flex items-center gap-1 text-brand-blue font-semibold">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
                  دانلود پیوست PDF رسمی کدال (۱.۴ مگابایت)
                </span>
</div>
</div>
</div>
</article>
<!-- Result Item 4: News & Official Media -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow order-2 md:order-1">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                  گزارش تحلیلی و مهندسی
                </span>
<span class="text-xs text-slate-400">سرویس عمران و توسعه</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-slate-500">زمان مطالعه: ۴ دقیقه</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  بازدید مدیرعامل و هیات‌مدیره هلدینگ غدیر از آخرین پیشرفت سازه‌ای <mark class="highlight">مگاپارس</mark>
</a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                در جریان این بازدید میدانی تخصصی، استانداردهای جدید عایق‌بندی صوت و حرارت، پیشرفت اتصال زیرزمینی به خطوط مترو و راه‌اندازی نیروگاه مقیاس‌کوچک CCHP با هدف جذب بیشترین مدل‌های بازگشت <mark class="highlight">سرمایه‌گذاری</mark> پایدار مورد بررسی و تایید هیات مدیره قرار گرفت...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span>تاریخ خبر: ۲۸ مهر ۱۴۰۳</span>
<span>تعداد تصاویر گزارش تصویری: ۱۴ فریم</span>
<a class="text-brand-blue font-bold hover:underline mr-auto" href="#">مشاهده متن کامل گزارش و تصاویر ←</a>
</div>
</div>
<!-- Thumbnail Container -->
<div class="w-full md:w-44 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 order-1 md:order-2 border border-slate-200">
<div class="w-full h-full bg-gradient-to-tr from-slate-900 to-indigo-900 flex flex-col items-center justify-center text-white relative">
<svg class="w-8 h-8 opacity-70 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
</svg>
<span class="text-[11px] font-medium tracking-wide">گزارش تصویری بازدید</span>
</div>
</div>
</div>
</article>
<!-- Result Item 5: Tender / Procurement Notice -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  مناقصه عمومی و ارزیابی کیفی
                </span>
<span class="text-xs text-slate-400">شماره مناقصه: ثاخت/۱۴۰۳/۲۲-م</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-rose-600 font-semibold">مهلت باقیمانده: ۱۲ روز</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  فراخوان شناسایی و انتخاب پیمانکار اجرای نمای خشک و سرامیک پرسلانی پوسته دوم <mark class="highlight">مگاپارس</mark>
</a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                دعوت از شرکت‌های صاحب‌صلاحیت رتبه ۱ ابنیه و تاسیسات جهت شرکت در ارزیابی کیفی و پیشنهاد قیمت متناسب با حجم <mark class="highlight">سرمایه‌گذاری</mark> تعیین‌شده در دفترچه پیمان اختصاصی، همراه با تضمین‌نامه‌های بانکی معتبر...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span>مهلت دریافت اسناد: تا ۲۵ آبان ۱۴۰۳</span>
<span>دبیرخانه: شرکت بین‌المللی توسعه ساختمان (ثاخت)</span>
<span class="text-brand-blue font-semibold">سامانه ستاد / پرتال تدارکات ثاخت</span>
</div>
</div>
</div>
</article>
<!-- Result Item 6: Subsidiary Company Profile -->
<article class="bg-white rounded-2xl p-5 md:p-6 border border-brand-border hover:border-brand-blue hover:shadow-card transition-all duration-200 group">
<div class="flex flex-col md:flex-row gap-5 items-start justify-between">
<div class="flex-grow order-2 md:order-1">
<div class="flex flex-wrap items-center gap-2 mb-2">
<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  شرکت تابعه - گروه شرکت‌های ثاخت
                </span>
<span class="text-xs text-slate-400">نماد بورسی: آ.س.پ</span>
<span class="inline-block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
<span class="text-xs text-emerald-600 font-medium">بازوی اجرایی پروژه‌های ویژه</span>
</div>
<h2 class="text-lg md:text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-2">
<a class="focus:outline-none" href="#">
                  شرکت ساختمانی آ.اس.پ (مجری فنی و ابنیه بلندمرتبه <mark class="highlight">مگاپارس</mark>)
                </a>
</h2>
<p class="text-sm text-slate-600 leading-relaxed mb-4">
                معرفی شرکت ساختمانی آ.اس.پ با پنج دهه تجربه درخشان در طراحی، ساخت و مدیریت <mark class="highlight">سرمایه‌گذاری</mark> پروژه‌های عظیم ملی نظیر برج بین‌المللی تهران، مجتمع کوهسنگی مشهد و پروژه چندمنظوره شریعتی...
              </p>
<!-- Result Specs Meta -->
<div class="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
<span>درصد مالکیت هلدینگ ثاخت: ۶۴.۲٪</span>
<span>حوزه تخصصی: ابنیه سنگین بتنی و برج‌های ترکیبی</span>
<a class="text-brand-blue font-bold hover:underline mr-auto" href="#">مشاهده پروفایل شرکت و پروژه‌ها ←</a>
</div>
</div>
<!-- Thumbnail Container -->
<div class="w-full md:w-44 h-32 rounded-xl bg-slate-100 overflow-hidden shrink-0 order-1 md:order-2 border border-slate-200">
<div class="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 flex flex-col items-center justify-center text-white relative">
<svg class="w-8 h-8 opacity-65 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
</svg>
<span class="text-[11px] font-medium tracking-wide">شناسه برند ASP</span>
</div>
</div>
</div>
</article>
</section>
<!-- END: ResultsList -->
<!-- BEGIN: SupportDrawer -->
<section class="mt-10 bg-gradient-to-r from-brand-dark to-[#092b42] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card" data-purpose="search-help-box">
<div class="space-y-1.5 text-center md:text-right">
<h3 class="text-lg font-bold">موضوع یا مستند مورد نظر خود را نیافتید؟</h3>
<p class="text-xs md:text-sm text-slate-300">
            کارشناسان روابط عمومی و امور سهامداران هلدینگ ثاخت در ساعات اداری پاسخگوی سوالات شما هستند.
          </p>
</div>
<div class="flex flex-wrap items-center gap-3 shrink-0">
<a class="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors" href="#">
            ثبت پرسش در سامانه مشتریان
          </a>
<a class="px-5 py-2.5 rounded-full bg-brand-blue hover:bg-brand-hover text-xs font-bold text-white shadow transition-colors flex items-center gap-2" href="tel:02188888888">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
<span>مرکز تماس: ۰۲۱-۸۴۵۵</span>
</a>
</div>
</section>
<!-- END: SupportDrawer -->
<!-- BEGIN: PaginationSection -->
<nav aria-label="صفحات نتایج" class="mt-10 flex items-center justify-center gap-1.5 md:gap-2" data-purpose="results-pagination">
<!-- Previous Page -->
<button class="w-10 h-10 rounded-full border border-slate-200 text-slate-300 flex items-center justify-center cursor-not-allowed" disabled="">
<svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
</button>
<!-- Pages -->
<button class="w-10 h-10 rounded-full bg-brand-blue text-white text-xs font-bold shadow">۱</button>
<button class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors">۲</button>
<button class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors">۳</button>
<button class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors">۴</button>
<button class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors">۵</button>
<span class="w-8 text-center text-slate-400 font-bold">...</span>
<button class="w-10 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors">۱۲</button>
<!-- Next Page -->
<button class="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors">
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></svg>
</button>
</nav>
<!-- END: PaginationSection -->
</div>
</main>
<!-- END: MainContent -->
<!-- BEGIN: UnifiedHoldingFooter -->

<!-- END: UnifiedHoldingFooter -->
</template>
