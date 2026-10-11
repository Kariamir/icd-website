<!--
  Ported from the approved design at
  stitch_project_detail_page_template/ir_financials/ (ADR-013).

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
<!-- TOP APP BAR / BRAND HEADER -->

<!-- MAIN CANVAS -->
<main class="flex-1 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin py-10">
<!-- BREADCRUMB & REGULATORY STATUS HEADER -->
<div class="mb-12"><div class="flex flex-wrap items-center justify-between gap-4 mb-4"><nav class="flex items-center gap-2 text-label-md font-label-md text-secondary"><NuxtLink class="hover:text-ink transition-colors" to="/">خانه</NuxtLink><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 19l-7-7 7-7" /></svg><span>دیده‌بان ثاخت</span><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 19l-7-7 7-7" /></svg><span class="text-ink font-semibold">مرکز اسناد مالی و گزارش‌های سهامداری</span></nav><div class="flex items-center gap-2"><a class="inline-flex items-center gap-1.5 text-label-md font-label-md text-ink hover:text-primary-container border border-border px-3 py-1.5 bg-surface-container-lowest hover:bg-surface transition-colors duration-150" href="http://tsetmc.com" rel="noopener noreferrer" target="_blank"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" /></svg><span>صفحه نماد در بورس تهران (TSETMC)</span></a><a class="inline-flex items-center gap-1.5 text-label-md font-label-md text-primary-container hover:text-brand-blue-deep border border-primary-container/40 px-3 py-1.5 bg-brand-tint/20 hover:bg-brand-tint/40 transition-colors duration-150 font-bold" href="https://codal.ir" rel="noopener noreferrer" target="_blank"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg><span>مشاهده اطلاعیه‌های کدال (CODAL)</span></a></div></div><div class="relative overflow-hidden bg-ink text-surface-container-lowest p-8 md:p-12 border border-border"><div class="absolute inset-0 z-0 opacity-25 mix-blend-luminosity overflow-hidden"><img alt="پروژه‌های هلدینگ بین‌المللی توسعه ساختمان" class="w-full h-full object-cover" src="/img/placeholder.svg" /></div><div class="absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-transparent z-0"></div><div class="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8"><div class="max-w-3xl"><div class="flex flex-wrap items-center gap-3 mb-3"><span class="bg-primary-container text-surface-container-lowest text-label-md font-bold px-3 py-0.5 select-none">مرکز رسمی شفافیت و روابط سرمایه‌گذاران</span><span class="bg-surface/10 text-brand-tint border border-brand-tint/30 text-label-md px-2.5 py-0.5 select-none font-mono">سال مالی ۱۴۰۴</span></div><h1 class="text-headline-md md:text-headline-lg font-headline-lg text-surface-container-lowest tracking-tight font-extrabold mb-3">مرکز اسناد مالی و گزارش‌های سهامداری</h1><p class="text-body-md text-surface-dim leading-relaxed max-w-2xl">دسترسی مستقیم و متمرکز به مدارک رسمی حسابرسی‌شده، گزارش‌های تحلیلی هیئت‌مدیره، شاخص‌های حاکمیت شرکتی و ساختار پویای مالکیت سهام هلدینگ بین‌المللی توسعه ساختمان (نماد: ثاخت).</p></div><div class="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0"><div class="bg-surface/10 backdrop-blur-sm border border-secondary/40 p-4 min-w-[260px]"><div class="flex items-center justify-between gap-3 mb-2"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 bg-status-success inline-block"></span><span class="text-surface-container-lowest font-bold text-label-lg">وضعیت نماد: مجاز-معامله</span></div><span class="text-xs text-brand-tint font-mono">TSE: ثاخت</span></div><div class="border-t border-secondary/30 pt-2 flex items-baseline justify-between text-body-sm"><span class="text-surface-dim text-xs">سرمایه ثبت‌شده:</span><span class="font-mono text-surface-container-lowest font-bold text-base num-tabular">۳۰,۰۰۰ <span class="text-xs font-normal text-surface-dim">میلیارد ریال</span></span></div></div></div></div></div></div>
<!-- SECTION 1: 6 CORE PILLARS GRID -->
<section class="mb-16"><div class="flex items-center justify-between mb-6 pb-2 border-b border-border"><div><h2 class="text-headline-sm font-headline-sm text-ink font-bold">اسناد کلیدی و گزارش‌های نظارتی</h2><p class="text-body-sm text-secondary mt-0.5">اسناد دوره‌ای مصوب و منتشرشده جهت دانلود مستقیم نسخه معتبر</p></div><span class="text-label-md text-secondary border border-border px-2.5 py-1 bg-surface hidden sm:inline-block">۶ سرفصل مصوب مجمع و بورس</span></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!-- Card 1 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="صورت‌های مالی حسابرسی‌شده" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-status-success text-surface-container-lowest text-label-md font-bold">حسابرسی‌شده کامل</span><span class="text-xs text-brand-tint font-mono">دوره ۱۲ ماهه</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۱. صورت‌های مالی حسابرسی‌شده</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">مجموعه کامل ۶ صورت مالی اساسی همراه با یادداشت‌های پیوست و گزارش بازرس قانونی دوره ۱۲ ماهه.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">دوره منتهی به: ۳۱ شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-audit-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت PDF</span></a><a class="inline-flex items-center justify-center gap-1 py-2 px-3 border border-border bg-surface hover:bg-brand-tint/30 text-ink text-label-md font-bold transition-colors font-mono" href="#download-audit-xlsx" title="فایل اکسل"><span data-icon-missing="table_chart" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span><span>XLSX</span></a></div></div></div><!-- Card 2 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش تفسیری مدیریت" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-brand-tint text-primary-container text-label-md font-bold">تحلیلی و آماری</span><span class="text-xs text-brand-tint font-mono">MD&amp;A Report</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۲. گزارش تفسیری مدیریت (MD&amp;A)</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">تحلیل جامع ساختار درآمدهای ساختمانی، سودآوری پروژه‌های جاری، کنترل نقدینگی و پیش‌بینی بودجه سال آتی.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">دوره منتهی به: ۳۱ شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-mda-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت نسخه رسمی (PDF • 6.1 MB)</span></a></div></div></div><!-- Card 3 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش فعالیت هیئت‌مدیره" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-primary-container text-surface-container-lowest text-label-md font-bold">مصوب مجمع عمومی</span><span class="text-xs text-brand-tint font-mono">سالانه ۱۴۰۴</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۳. گزارش فعالیت هیئت‌مدیره</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">ارائه عملکرد استراتژیک، وضعیت پیشرفت فیزیکی مگاپروژه‌ها، توسعه زنجیره تأمین و پرتفوی دارایی‌ها به مجمع.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">مجمع سالانه: سال مالی ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-board-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت دفترچه جامع (PDF • 11.4 MB)</span></a></div></div></div><!-- Card 4 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش پایداری و حاکمیت سازمانی" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-surface text-ink border border-border text-label-md font-bold">پایداری و ESG</span><span class="text-xs text-brand-tint font-mono">دوره ۱۴۰۴-۱۴۰۳</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۴. گزارش پایداری و حاکمیت سازمانی</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">اقدامات زیست‌محیطی ساختمان سبز، کاهش ردپای کربن، مسئولیت‌های اجتماعی پیرامونی و شفافیت سازمانی.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">ویرایش جامع دوره ۱۴۰۴-۱۴۰۳</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-esg-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت گزارش سالانه ESG (PDF)</span></a></div></div></div><!-- Card 5 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش کمیته‌های تخصصی هیئت‌مدیره" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-brand-tint text-primary-container text-label-md font-bold">۴ کمیته مصوب</span><span class="text-xs text-brand-tint font-mono">حاکمیت شرکتی</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۵. گزارش کمیته‌های تخصصی هیئت‌مدیره</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">خلاصه عملکرد کمیته‌های حسابرسی و کنترل داخلی، ریسک، انتصابات و جبران خدمات اعضای هیئت‌مدیره.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">سال مالی منتهی به شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-committees-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت خلاصه عملکرد کمیته‌ها (PDF)</span></a></div></div></div><!-- Card 6 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="ترکیب سهامداران و سهام شناور" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-primary-container text-surface-container-lowest text-label-md font-bold">به‌روزرسانی برخط</span><span class="text-xs text-brand-tint font-mono">آذر ۱۴۰۴</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۶. ترکیب سهامداران و سهام شناور</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">دفتر ثبت سهامداران بالای یک درصد، وضعیت تخصیص سرمایه نهادی و محاسبه آخرین ضریب شناوری آزاد در بورس.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">آخرین استعلام: هفته اول آذر ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-primary-container text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#shareholders-section"><span data-icon-missing="visibility" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span><span>مشاهده و دانلود ریز سهامداری</span></a></div></div></div></div></section>
<!-- SECTION 2: SHAREHOLDER & FREE-FLOAT SNAPSHOT BLOCK -->
<section class="border border-border bg-surface-container-lowest p-8 mb-16" id="shareholders-section"><div class="flex items-center justify-between mb-6 pb-2 border-b border-border"><div><h2 class="text-headline-sm font-headline-sm text-ink font-bold">اسناد کلیدی و گزارش‌های نظارتی</h2><p class="text-body-sm text-secondary mt-0.5">اسناد دوره‌ای مصوب و منتشرشده جهت دانلود مستقیم نسخه معتبر</p></div><span class="text-label-md text-secondary border border-border px-2.5 py-1 bg-surface hidden sm:inline-block">۶ سرفصل مصوب مجمع و بورس</span></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!-- Card 1 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="صورت‌های مالی حسابرسی‌شده" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-status-success text-surface-container-lowest text-label-md font-bold">حسابرسی‌شده کامل</span><span class="text-xs text-brand-tint font-mono">دوره ۱۲ ماهه</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۱. صورت‌های مالی حسابرسی‌شده</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">مجموعه کامل ۶ صورت مالی اساسی همراه با یادداشت‌های پیوست و گزارش بازرس قانونی دوره ۱۲ ماهه.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">دوره منتهی به: ۳۱ شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-audit-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت PDF</span></a><a class="inline-flex items-center justify-center gap-1 py-2 px-3 border border-border bg-surface hover:bg-brand-tint/30 text-ink text-label-md font-bold transition-colors font-mono" href="#download-audit-xlsx" title="فایل اکسل"><span data-icon-missing="table_chart" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span><span>XLSX</span></a></div></div></div><!-- Card 2 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش تفسیری مدیریت" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-brand-tint text-primary-container text-label-md font-bold">تحلیلی و آماری</span><span class="text-xs text-brand-tint font-mono">MD&amp;A Report</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۲. گزارش تفسیری مدیریت (MD&amp;A)</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">تحلیل جامع ساختار درآمدهای ساختمانی، سودآوری پروژه‌های جاری، کنترل نقدینگی و پیش‌بینی بودجه سال آتی.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">دوره منتهی به: ۳۱ شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-mda-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت نسخه رسمی (PDF • 6.1 MB)</span></a></div></div></div><!-- Card 3 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش فعالیت هیئت‌مدیره" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-primary-container text-surface-container-lowest text-label-md font-bold">مصوب مجمع عمومی</span><span class="text-xs text-brand-tint font-mono">سالانه ۱۴۰۴</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۳. گزارش فعالیت هیئت‌مدیره</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">ارائه عملکرد استراتژیک، وضعیت پیشرفت فیزیکی مگاپروژه‌ها، توسعه زنجیره تأمین و پرتفوی دارایی‌ها به مجمع.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">مجمع سالانه: سال مالی ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-board-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت دفترچه جامع (PDF • 11.4 MB)</span></a></div></div></div><!-- Card 4 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش پایداری و حاکمیت سازمانی" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-surface text-ink border border-border text-label-md font-bold">پایداری و ESG</span><span class="text-xs text-brand-tint font-mono">دوره ۱۴۰۴-۱۴۰۳</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۴. گزارش پایداری و حاکمیت سازمانی</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">اقدامات زیست‌محیطی ساختمان سبز، کاهش ردپای کربن، مسئولیت‌های اجتماعی پیرامونی و شفافیت سازمانی.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">ویرایش جامع دوره ۱۴۰۴-۱۴۰۳</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-esg-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت گزارش سالانه ESG (PDF)</span></a></div></div></div><!-- Card 5 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="گزارش کمیته‌های تخصصی هیئت‌مدیره" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-brand-tint text-primary-container text-label-md font-bold">۴ کمیته مصوب</span><span class="text-xs text-brand-tint font-mono">حاکمیت شرکتی</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۵. گزارش کمیته‌های تخصصی هیئت‌مدیره</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">خلاصه عملکرد کمیته‌های حسابرسی و کنترل داخلی، ریسک، انتصابات و جبران خدمات اعضای هیئت‌مدیره.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">سال مالی منتهی به شهریور ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-committees-pdf"><svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg><span>دریافت خلاصه عملکرد کمیته‌ها (PDF)</span></a></div></div></div><!-- Card 6 --><div class="border border-border bg-surface-container-lowest hover:border-primary-container transition-colors flex flex-col justify-between group overflow-hidden"><div class="h-28 relative overflow-hidden bg-ink"><img alt="ترکیب سهامداران و سهام شناور" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300" src="/img/placeholder.svg" /><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div><div class="absolute bottom-3 right-3 left-3 flex items-center justify-between"><span class="px-2 py-0.5 bg-primary-container text-surface-container-lowest text-label-md font-bold">به‌روزرسانی برخط</span><span class="text-xs text-brand-tint font-mono">آذر ۱۴۰۴</span></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><h3 class="text-headline-sm font-bold text-ink mb-2">۶. ترکیب سهامداران و سهام شناور</h3><p class="text-body-sm text-secondary mb-4 leading-relaxed">دفتر ثبت سهامداران بالای یک درصد، وضعیت تخصیص سرمایه نهادی و محاسبه آخرین ضریب شناوری آزاد در بورس.</p><div class="text-label-md text-secondary mb-6 font-mono bg-surface p-2 border border-border">آخرین استعلام: هفته اول آذر ۱۴۰۴</div></div><div class="pt-4 border-t border-border flex items-center gap-2"><a class="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-primary-container text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#shareholders-section"><span data-icon-missing="visibility" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span><span>مشاهده و دانلود ریز سهامداری</span></a></div></div></div></div></section>
<!-- SECTION 3: REPOSITORY FEED (NEWS-ORIENTED FILINGS FEED) -->
<section class="border-t-2 border-ink pt-10 mb-20" id="documents-archive">
<!-- Feed Header & Controls -->
<div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div>
<h2 class="text-headline-md font-headline-md text-ink font-extrabold">مخزن اسناد و اطلاعیه‌های رسمی</h2>
<p class="text-body-sm text-secondary mt-1">
          فهرست خبرمحور و زمان‌بندی‌شده آخرین مکاتبات رسمی، گزارش‌ها و افشاهای مصوب تحت نظارت بورس
        </p>
</div>
<!-- Year Filter & Search Bar -->
<div class="flex flex-wrap items-center gap-3">
<!-- Year Pill Group -->
<div class="inline-flex border border-border bg-surface-container-lowest" role="tablist">
<button class="px-3.5 py-1.5 text-label-md font-label-md bg-ink text-surface-container-lowest font-bold">همه سال‌ها</button>
<button class="px-3.5 py-1.5 text-label-md font-label-md text-secondary hover:text-ink hover:bg-surface transition-colors">۱۴۰۴</button>
<button class="px-3.5 py-1.5 text-label-md font-label-md text-secondary hover:text-ink hover:bg-surface transition-colors">۱۴۰۳</button>
<button class="px-3.5 py-1.5 text-label-md font-label-md text-secondary hover:text-ink hover:bg-surface transition-colors">۱۴۰۲</button>
</div>
<!-- Quick Document Search -->
<div class="relative w-52 sm:w-64">
<input class="w-full text-body-sm font-body-sm bg-surface-container-lowest border border-border px-3 py-1.5 pr-8 focus:outline-none focus:border-primary-container text-ink placeholder:text-outline" placeholder="جستجو در عناوین اسناد..." type="text" />
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>
</div>
</div>
</div>
<!-- Feed / Timeline List (Direct Clean Downloads, No long-form text clutter) -->
<div class="border border-border bg-surface-container-lowest divide-y divide-border">
<!-- Item 1 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-primary-container flex items-center justify-center border border-border">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6" /></svg>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-brand-tint/30 text-primary-container text-xs font-bold">صورت مالی سالانه</span>
<span class="text-xs text-secondary font-mono">۲۸ آبان ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">کد رهگیری: 1248091</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              صورت‌های مالی تلفیقی سال مالی منتهی به ۳۱ شهریور ۱۴۰۴ (حسابرسی‌شده توسط هوشیار ممیز)
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-surface text-ink border border-border text-xs font-mono">PDF • 4.8 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-1">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود مستقیم</span>
</a>
</div>
</div>
<!-- Item 2 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-primary-container flex items-center justify-center border border-border">
<span data-icon-missing="analytics" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-surface-alt text-ink text-xs font-medium">گزارش تفسیری</span>
<span class="text-xs text-secondary font-mono">۲۵ آبان ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">نسخه ۱۲ ماهه</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              گزارش تفسیری مدیریت دوره ۱۲ ماهه منتهی به ۱۴۰۴/۰۶/۳۱ همراه با پیش‌بینی بودجه سال آتی
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-surface text-ink border border-border text-xs font-mono">PDF • 6.1 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود مستقیم</span>
</a>
</div>
</div>
<!-- Item 3 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-primary-container flex items-center justify-center border border-border">
<span data-icon-missing="assignment" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-surface-alt text-ink text-xs font-medium">مجمع عمومی</span>
<span class="text-xs text-secondary font-mono">۲۰ آبان ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">سال مالی ۱۴۰۴</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              گزارش فعالیت هیئت‌مدیره به مجمع عمومی عادی سالیانه منتهی به ۳۱ شهریور ۱۴۰۴
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-surface text-ink border border-border text-xs font-mono">PDF • 11.4 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-3">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود مستقیم</span>
</a>
</div>
</div>
<!-- Item 4 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-status-success flex items-center justify-center border border-border">
<span data-icon-missing="table_chart" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-status-success/10 text-status-success text-xs font-bold">مدل داده و جداول</span>
<span class="text-xs text-secondary font-mono">۱۵ آبان ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">سری زمانی ۵ ساله</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              دفترچه و مدلسازی کامل اقلام صورت‌های مالی، یادداشت‌های تفصیلی و جدول بهای تمام‌شده (Excel)
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-status-success/10 text-status-success border border-status-success/30 text-xs font-mono font-bold">XLSX • 4.2 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-status-success text-surface-container-lowest text-label-md font-bold hover:opacity-90 transition-opacity" href="#download-4">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود فایل اکسل</span>
</a>
</div>
</div>
<!-- Item 5 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-primary-container flex items-center justify-center border border-border">
<span data-icon-missing="verified_user" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-surface-alt text-ink text-xs font-medium">کمیته‌های تخصصی</span>
<span class="text-xs text-secondary font-mono">۰۲ آبان ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">حاکمیت شرکتی</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              گزارش تجمیعی کمیته حسابرسی، کمیته ریسک و کمیته انتصابات و جبران خدمات
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-surface text-ink border border-border text-xs font-mono">PDF • 2.4 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-5">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود مستقیم</span>
</a>
</div>
</div>
<!-- Item 6 -->
<div class="p-4 sm:px-6 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface/50 transition-colors">
<div class="flex items-start sm:items-center gap-4">
<span class="w-10 h-10 shrink-0 bg-surface text-primary-container flex items-center justify-center border border-border">
<span data-icon-missing="priority_high" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</span>
<div>
<div class="flex flex-wrap items-center gap-2 mb-1">
<span class="px-2 py-0.5 bg-error-container text-error text-xs font-bold">افشای بااهمیت (الف)</span>
<span class="text-xs text-secondary font-mono">۰۳ مهر ۱۴۰۴</span>
<span class="text-xs text-secondary font-mono">مزایده و فروش ملک</span>
</div>
<h4 class="text-body-md font-bold text-ink leading-snug">
              افشای اطلاعات بااهمیت - نتایج حاصل از برگزاری مزایده فروش عرصه و اعیان پروژه مروارید
            </h4>
</div>
</div>
<div class="flex items-center gap-3 self-end md:self-center shrink-0">
<span class="px-2 py-0.5 bg-surface text-ink border border-border text-xs font-mono">PDF • 1.1 MB</span>
<a class="inline-flex items-center gap-1 px-3 py-1.5 bg-ink text-surface-container-lowest text-label-md font-bold hover:bg-brand-blue-deep transition-colors" href="#download-6">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4m0 12l-4-4m4 4l4-4M3 15v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /></svg>
<span>دانلود مستقیم</span>
</a>
</div>
</div>
</div>
<!-- Repository Footer Note -->
<div class="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-label-md text-secondary gap-2">
<span>* تمامی اسناد فوق ممهور به امضای الکترونیک هیئت‌مدیره بوده و در سامانه نظارتی سازمان بورس به ثبت رسیده‌اند.</span>
<a class="text-primary-container font-medium hover:underline inline-flex items-center gap-1" href="https://codal.ir" rel="noopener noreferrer" target="_blank">
<span>مشاهده سایر سوابق در سامانه جامع کدال</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
</a>
</div>
</section>
</main>
<!-- CORPORATE 5-COLUMN FOOTER -->
</template>
