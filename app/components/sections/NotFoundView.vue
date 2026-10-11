<!--
  Ported from the approved design at
  stitch_project_detail_page_template/11_error_404/ (ADR-013).

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
<!-- ================= TOP NAVIGATION HEADER ================= -->
<header class="bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-6 md:px-12 max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Logo & Minimal 4 Navigation Links -->
<div class="flex items-center gap-8">
<a class="flex items-center gap-3 group" href="#">
<div class="w-11 h-11 bg-ink rounded-xl flex items-center justify-center text-surface-container-lowest font-bold text-lg group-hover:bg-primary-container transition-colors shadow-sm">
<span>ICD</span>
</div>
<div class="flex flex-col">
<span class="text-lg font-bold text-ink tracking-tight">هلدینگ ساختمانی ثاخت</span>
<span class="text-xs text-secondary font-medium">شرکت بین‌المللی توسعه ساختمان (سهامی عام)</span>
</div>
</a>
<!-- Desktop Navigation Links (4 core items) -->
<nav class="hidden lg:flex items-center gap-7 mr-2">
<a class="text-ink/80 hover:text-primary-container text-sm font-medium transition-colors" href="#">درباره ثاخت</a>
<a class="text-ink/80 hover:text-primary-container text-sm font-medium transition-colors" href="#">پروژه‌ها</a>
<a class="text-ink/80 hover:text-primary-container text-sm font-medium transition-colors" href="#">فروش و پیش‌فروش</a>
<a class="text-ink/80 hover:text-primary-container text-sm font-medium transition-colors" href="#">ارتباط با ما</a>
</nav>
</div>
<!-- Left: Utility Actions & CTA -->
<div class="flex items-center gap-3">
<!-- Quick Search Icon Button -->
<button aria-label="جستجو" class="w-10 h-10 rounded-full border border-border flex items-center justify-center text-ink/70 hover:text-primary-container hover:border-primary-container/40 hover:bg-brand-tint/50 transition-all" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<!-- Language Switcher -->
<button class="flex items-center gap-1 px-3 h-10 rounded-full border border-border text-xs font-semibold text-ink/80 hover:text-primary-container hover:border-primary-container/40 hover:bg-brand-tint/50 transition-all" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
<span class="mt-0.5">EN</span>
</button>
<!-- Shareholder Portal Entry -->
<a class="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 rounded-full border border-primary-container/40 text-primary-container text-xs font-semibold hover:bg-brand-tint transition-all" href="#">
<span data-icon-missing="account_balance" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>ورود سهامداران</span>
</a>
<!-- Primary Consultation Action -->
<a class="inline-flex items-center gap-2 px-5 h-10 rounded-full bg-primary-container text-white text-xs font-semibold hover:bg-brand-blue-deep transition-all shadow-sm hover:shadow" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"  /></svg>
<span class="hidden md:inline">مشاوره و تماس سریع</span>
</a>
</div>
</div>
</header>
<!-- ================= MAIN CONTENT: MINIMAL & ELEGANT 404 ================= -->
<main class="flex-grow flex items-center justify-center py-16 md:py-24 px-6 hero-glow relative">
<div class="max-w-3xl w-full mx-auto text-center relative z-10">
<!-- Big Soft 404 Numeral -->
<div class="mb-4 inline-block select-none">
<span class="text-8xl md:text-[140px] font-black text-primary-container tracking-tight leading-none drop-shadow-sm font-sans">
        404
      </span>
</div>
<!-- Title & Description -->
<h1 class="text-2xl md:text-3xl font-extrabold text-ink mb-3 tracking-tight">
      صفحه مورد نظر یافت نشد
    </h1>
<p class="text-secondary text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-9">
      متاسفانه صفحه‌ای که به دنبال آن هستید حذف شده یا آدرس آن تغییر کرده است.
    </p>
<!-- Capsule Search Bar -->
<div class="max-w-md mx-auto mb-8">
<form action="#" class="relative flex items-center" method="GET" onsubmit="event.preventDefault();">
<input class="w-full h-12 pr-5 pl-14 bg-white rounded-full border border-border text-sm text-ink placeholder:text-slate-400 shadow-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/15 transition-all" placeholder="جستجو در نام پروژه‌ها، اسناد یا محتوا..." type="text" />
<button aria-label="جستجو" class="absolute left-1.5 w-9 h-9 bg-primary-container hover:bg-brand-blue-deep text-white rounded-full flex items-center justify-center transition-colors shadow-sm" type="submit">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
</form>
</div>
<!-- Primary Action Buttons (Capsule Shaped) -->
<div class="flex flex-wrap items-center justify-center gap-3.5 mb-12">
<a class="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-primary-container text-white text-sm font-semibold hover:bg-brand-blue-deep transition-all shadow-sm hover:shadow" href="#">
<span data-icon-missing="home" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>بازگشت به صفحه اصلی</span>
</a>
<a class="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white border border-border text-ink text-sm font-semibold hover:border-primary-container hover:text-primary-container hover:bg-slate-50 transition-all shadow-sm" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V3h9v18M14 9h5v12M8 7h2M8 11h2M8 15h2"  /></svg>
<span>مشاهده پروژه‌ها</span>
</a>
</div>
<!-- Quick Access Links (Minimal & Soft Capsule Pills) -->
<div class="pt-8 border-t border-border/80">
<p class="text-xs font-medium text-slate-400 mb-4">بخش‌های پرکاربرد برای راهنمایی شما:</p>
<div class="flex flex-wrap justify-center gap-2.5">
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>پروژه‌ها</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<span data-icon-missing="key" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>پیش‌فروش واحدها</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"  /></svg>
<span>سهام ثاخت</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<span data-icon-missing="headset_mic" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>تماس با ما</span>
</a>
</div>
</div>
</div>
</main>
<!-- ================= FOOTER (SHARED 5-COLUMN COMPONENT) ================= -->
<footer class="bg-ink text-white border-t border-border">
<div class="w-full py-12 md:py-16 px-6 md:px-12 max-w-[1440px] mx-auto">
<!-- Top Newsletter / Stock Ticker Bar inside Footer -->
<div class="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-8 mb-10 border-b border-white/10 gap-6">
<div>
<div class="flex items-center gap-3 mb-2">
<span class="px-2.5 py-0.5 rounded bg-primary-container text-white text-xs font-semibold">نماد بورس: ثاخت</span>
<span class="text-xs text-brand-tint">شناسه ملی: ۱۰۱۰۰۸۴۷۳۶۰ | رتبه برتر انبوه‌سازی ایران</span>
</div>
<p class="text-xs text-slate-300">شرکت بین‌المللی توسعه ساختمان (هلدینگ ساختمانی ثاخت)، پیشگام در پروژه‌های ماندگار عمرانی کشور</p>
</div>
<div class="flex items-center gap-3 w-full lg:w-auto">
<input class="h-11 px-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs w-full lg:w-80 focus:outline-none focus:border-brand-tint" placeholder="عضویت در خبرنامه تحلیلی و اطلاعیه‌های سهام..." type="email" />
<button class="h-11 px-6 rounded-full bg-primary-container text-white text-xs font-semibold hover:bg-brand-blue-deep whitespace-nowrap transition-colors shadow-sm">عضویت</button>
</div>
</div>
<!-- 5-Column Corporate Navigation Links Grid -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 text-xs">
<!-- Column 1: Introduction -->
<div>
<h4 class="font-bold text-white mb-4 pb-2 border-b border-white/15 text-sm">درباره ثاخت</h4>
<ul class="space-y-2.5 text-slate-300">
<li><a class="hover:text-brand-tint transition-colors" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">چشم‌انداز و مأموریت سازمانی</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">شرکت‌های تابعه و اقماری</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">پایداری و استانداردهای مهندسی</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">افتخارات و نشان‌های ملی</a></li>
</ul>
</div>
<!-- Column 2: Portfolio -->
<div>
<h4 class="font-bold text-white mb-4 pb-2 border-b border-white/15 text-sm">پروژه‌های عمرانی</h4>
<ul class="space-y-2.5 text-slate-300">
<li><a class="hover:text-brand-tint transition-colors" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">برج‌های مسکونی و اقامتی</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">مجتمع‌های اداری و تجاری</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">طرح‌های گردشگری و هتل‌ها</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">پروژه‌های در حال اجرا</a></li>
</ul>
</div>
<!-- Column 3: Shareholders & Codal -->
<div>
<h4 class="font-bold text-white mb-4 pb-2 border-b border-white/15 text-sm">سهامداران و کدال</h4>
<ul class="space-y-2.5 text-slate-300">
<li><a class="hover:text-brand-tint transition-colors" href="#">سامانه سهامداران و کدال</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">صورت‌های مالی حسابرسی‌شده</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">تقویم مجامع عمومی سالیانه</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">گزارش تفسیری مدیریت</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">پاسخگویی به امور سهامداران</a></li>
</ul>
</div>
<!-- Column 4: Sales & Commercial -->
<div>
<h4 class="font-bold text-white mb-4 pb-2 border-b border-white/15 text-sm">فروش و مشارکت</h4>
<ul class="space-y-2.5 text-slate-300">
<li><a class="hover:text-brand-tint transition-colors" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">مناقصات و مزایده‌های جاری</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">استعلام قیمت و شرایط پرداخت</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">همکاری با تأمین‌کنندگان</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">طرح‌های جذب سرمایه ملکی</a></li>
</ul>
</div>
<!-- Column 5: Contact & Media -->
<div class="col-span-2 md:col-span-1">
<h4 class="font-bold text-white mb-4 pb-2 border-b border-white/15 text-sm">امور مشتریان و رسانه</h4>
<ul class="space-y-2.5 text-slate-300">
<li><a class="hover:text-brand-tint transition-colors" href="#">اخبار و رسانه دیجیتال</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">تماس و امور مشتریان</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">حریم خصوصی و شفافیت مالی</a></li>
<li><a class="hover:text-brand-tint transition-colors" href="#">سامانه سوت‌زنی و بازرسی</a></li>
</ul>
</div>
</div>
<!-- Bottom Copyright & Compliance Line -->
<div class="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
<div>
<span>© ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.</span>
</div>
<div class="flex items-center gap-6">
<a class="hover:text-white transition-colors" href="#">قوانین و مقررات</a>
<a class="hover:text-white transition-colors" href="#">امنیت داده‌ها</a>
<a class="hover:text-white transition-colors" href="#">نقشه سایت</a>
<span class="text-brand-tint font-mono">ICD PORTAL v2.8</span>
</div>
</div>
</div>
</footer>
</template>
