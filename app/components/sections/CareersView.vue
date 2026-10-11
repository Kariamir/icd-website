<!--
  Ported from the approved design at
  stitch_project_detail_page_template/careers/ (ADR-013).

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
<!-- TOP NAVIGATION BAR (Predicted Shared Component: TopNavBar) -->
<header class="w-full bg-surface-container-lowest dark:bg-inverse-surface border-b border-border dark:border-outline-variant sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right side in RTL: Brand Identity & Links -->
<div class="flex items-center gap-8">
<NuxtLink class="flex items-center gap-3" to="/">
<div class="w-9 h-9 bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-headline-sm tracking-tighter">
            ث
          </div>
<span class="text-headline-md font-headline-md text-ink dark:text-surface-container-lowest tracking-tight">
            هلدینگ ساختمانی ثاخت
          </span>
</NuxtLink>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-6">
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">
            درباره ثاخت
          </a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">
            پروژه‌ها
          </a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">
            فروش و پیش‌فروش
          </a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">
            دیده‌بان ثاخت
          </a>
<a class="text-ink dark:text-surface-variant hover:text-primary-container dark:hover:text-inverse-primary pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">
            رسانه ثاخت
          </a>
</nav>
</div>
<!-- Left side in RTL: Actions, Language & Search -->
<div class="flex items-center gap-3">
<button aria-label="جستجو" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150 flex items-center justify-center" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150 flex items-center justify-center" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<a class="hidden sm:inline-flex items-center border border-primary-container text-primary-container px-4 py-2 text-label-md font-label-md hover:bg-brand-tint transition-colors duration-150" href="#">
          ورود سهامداران
        </a>
<a class="bg-primary-container hover:bg-brand-blue-deep text-surface-container-lowest px-5 py-2.5 text-label-md font-label-md transition-colors duration-150" href="#quick-apply">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- MAIN CANVAS CONTENT -->
<main class="w-full flex-grow">
<!-- SECTION 1: HERO -->
<section class="relative w-full bg-ink text-surface-container-lowest border-b border-border overflow-hidden">
<!-- Background Architectural Scrim -->
<div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" data-alt="A massive architectural civil engineering structure in monochrome deep steel blue and gray tones, showcasing imposing concrete framework, sharp geometric lines, and tower cranes under structured industrial morning light." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGsDcWzj90RZxWwizz3g8z3NH0e_zWBE7XC3OLnb0C6zap3eHsUrX-zDYPbTl1cukQUGmLZgRJ-HB1_fdEbYjdxxqnV3_UgO4jGrZ0Bk2SrF7g9pgTAmoZSFqZTsCp2mOFGZYMYWVlnc2u4RQMTxAEIOfU9WTXzkFbayZKOeFTj6ualVxf-MV2kMJ7Q2qnJbNZ1r46Vq74MdlQPPEZYkxPuSmpuDiHRp-0NaeV-FwlsoG3Aff2Xr66Eg')"></div>
<div class="absolute inset-0 bg-gradient-to-l from-ink via-ink/90 to-ink/75"></div>
<div class="relative max-w-[1440px] mx-auto px-space-lg md:px-margin py-20 lg:py-28 flex flex-col justify-center">
<!-- Sub-label / Tag -->
<div class="flex items-center gap-3 mb-6">
<span class="w-2.5 h-2.5 bg-brand-tint"></span>
<span class="text-brand-tint text-label-lg font-label-lg tracking-wider">سرمایه انسانی و جذب نخبگان صنعتی</span>
<span class="text-surface-variant/40">|</span>
<span class="text-surface-variant text-label-md font-label-md font-mono">ICD HOLDING CAREERS / ثاخت</span>
</div>
<h1 class="text-surface-container-lowest text-headline-xl-mobile md:text-headline-xl font-headline-xl tracking-tight max-w-4xl mb-6">
          فرصت‌های شغلی و توسعه مسیر حرفه‌ای
        </h1>
<p class="text-brand-tint text-body-lg font-body-lg max-w-2xl font-light leading-relaxed">
          پیوستن به بزرگ‌ترین خانواده توسعه، مهندسی و سرمایه‌گذاری ساختمانی ایران
        </p>
<!-- Technical Key Figures Strip -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-secondary/40 max-w-4xl">
<div>
<div class="text-headline-md font-headline-md text-surface-container-lowest">۴۰+ سال</div>
<div class="text-surface-variant text-label-md font-label-md">پیشگامی در صنعت احداث</div>
</div>
<div>
<div class="text-headline-md font-headline-md text-surface-container-lowest">۳,۵۰۰,۰۰۰+</div>
<div class="text-surface-variant text-label-md font-label-md">مترمربع زیربنای اجرا شده</div>
</div>
<div>
<div class="text-headline-md font-headline-md text-surface-container-lowest">۲۴ شرکت</div>
<div class="text-surface-variant text-label-md font-label-md">تخصصی و تابعه هلدینگ</div>
</div>
<div>
<div class="text-headline-md font-headline-md text-surface-container-lowest">۱۰۰٪</div>
<div class="text-surface-variant text-label-md font-label-md">شفافیت بورسی در نماد ثاخت</div>
</div>
</div>
</div>
</section>
<!-- SECTION 2: BRIEF INTRO (Strict Order: Section 1) -->
<section class="w-full bg-surface-container-lowest border-b border-border py-16 md:py-20">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
<div class="lg:col-span-7 flex flex-col justify-center">
<div class="inline-flex items-center gap-2 text-primary-container text-label-md font-label-md mb-3">
<span class="w-6 h-0.5 bg-primary-container"></span>
<span>رویکرد استراتژیک سرمایه انسانی</span>
</div>
<h2 class="text-ink text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-6 leading-tight">
              معماری آینده حرفه‌ای شما در مدار پروژه‌های ملی
            </h2>
<p class="text-ink/90 text-body-lg font-body-lg leading-loose text-justify mb-8">
              هلدینگ بین‌المللی توسعه ساختمان (ثاخت) با بیش از ۴ دهه پیشگامی در احداث مگاپروژه‌های ملی، بستری پویا برای تخصص‌های برجسته مهندسی، مالی و سرمایه‌گذاری فراهم کرده است. ما ارزش‌های خود را بر پایه شایسته‌سالاری، شفافیت و اثرگذاری پایدار بنا نهاده‌ایم. در ثاخت، پروژه‌های نمادین کشور با اتکا به دانش و انگیزه سرمایه انسانی ما ساخته می‌شوند.
            </p>
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
<div class="p-4 bg-surface border border-border">
<span data-icon-missing="account_balance" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<div class="text-ink font-label-lg text-label-lg">ثبات نهادی</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">بزرگ‌ترین هلدینگ ساختمانی بورسی</div>
</div>
<div class="p-4 bg-surface border border-border">
<span data-icon-missing="engineering" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<div class="text-ink font-label-lg text-label-lg">مقیاس بی‌بدیل</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">مدیریت مگاپروژه‌های تراز اول</div>
</div>
<div class="p-4 bg-surface border border-border">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"  /></svg>
<div class="text-ink font-label-lg text-label-lg">مسیر ارتقا</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">سیستم ارزیابی شایسته‌محور</div>
</div>
</div>
</div>
<div class="lg:col-span-5">
<div class="relative border border-border p-2 bg-surface">
<img alt="سرمایه انسانی هلدینگ ثاخت" class="w-full h-[400px] object-cover filter contrast-105" data-alt="An executive architectural board meeting in a high-rise office with large glass windows overlooking a vast civil construction project. Engineers and corporate strategists dressed in sharp corporate attire are analyzing blueprints and BIM models on a sleek dark conference table in high-contrast neutral lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARIXI48d40xY9KSqi62TAokt3JQhXCm1HOYRMvEll4nsrP0RgyYKEqLbF1L3KWX57bGIKK-ovpnt7DHFWdXbbrS-v2hS-rw1tHZL9IJu56_OikTcu3tzL6M6osSEICztDurbnAjK_ZCzoLk0bPHobVTH4KCxKMHYtK0xqLR-FHcg1Pkkr-Jkm4uEbG_XYk-2zqbSM9le_f-C25gjpahxrjc8U8KPYuh0Y82MvA8hHdWEWNnVjU4vPdhA" />
<div class="bg-ink text-surface-container-lowest p-4 mt-2 flex justify-between items-center">
<div>
<div class="text-label-lg font-label-lg">شورای راهبری پروژه‌های عمرانی</div>
<div class="text-surface-variant text-body-sm font-body-sm">ستاد مرکزی هلدینگ بین‌المللی توسعه ساختمان</div>
</div>
<span class="bg-primary-container text-surface-container-lowest px-2.5 py-1 text-label-md font-label-md">
                  ۱۴۰۳
                </span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 3: THE RESUME FORM (Strict Order: Section 2 - Strictly 3 Fields) -->
<section class="w-full bg-surface py-16 md:py-24 border-b border-border" id="quick-apply">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="max-w-3xl mx-auto">
<div class="text-center mb-10">
<div class="inline-flex items-center justify-center p-3 bg-brand-tint text-primary-container mb-4">
<span data-icon-missing="upload_file" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h2 class="text-ink text-headline-lg font-headline-lg mb-3">
              ثبت مستقیم رزومه کاری
            </h2>
<p class="text-secondary text-body-md font-body-md">
              بدون نیاز به ثبت‌نام و فرم‌های پیچیده، مشخصات کلیدی و فایل رزومه خود را ارسال فرمایید.
            </p>
</div>
<!-- The Institutional High-Priority Card -->
<div class="bg-surface-container-lowest border border-border p-6 md:p-10">
<form class="space-y-6" id="resumeSubmissionForm" onsubmit="handleResumeSubmit(event)">
<!-- Field 1: Full Name -->
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="fullName">
                  نام و نام‌خانوادگی <span class="text-status-error">*</span>
</label>
<div class="relative">
<input class="w-full bg-surface-container-lowest border border-border px-4 py-3 text-ink text-body-md font-body-md placeholder:text-secondary/50 focus:border-primary-container focus:outline-none transition-colors duration-150" id="fullName" name="fullName" placeholder="مثال: مهندس علی علوی" required="" type="text" />
<span data-icon-missing="badge" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
</div>
<!-- Field 2: Contact Number -->
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contactNumber">
                  شماره تماس مستقیم <span class="text-status-error">*</span>
</label>
<div class="relative">
<input class="w-full text-right bg-surface-container-lowest border border-border px-4 py-3 text-ink text-body-md font-body-md placeholder:text-secondary/50 focus:border-primary-container focus:outline-none transition-colors duration-150" dir="ltr" id="contactNumber" name="contactNumber" placeholder="۰۹۱۲XXXXXXX" required="" type="tel" />
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"  /></svg>
</div>
</div>
<!-- Field 3: File Attachment (Drag & Drop / Browse) -->
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2">
                  بارگذاری رزومه <span class="text-status-error">*</span>
</label>
<div class="border-2 border-dashed border-border bg-surface hover:bg-surface-container-high transition-colors duration-150 p-8 text-center cursor-pointer relative" id="dropZone" onclick="document.getElementById('resumeFile').click()">
<input accept=".pdf,.docx,.doc" class="hidden" id="resumeFile" name="resumeFile" onchange="handleFileSelect(event)" required="" type="file" />
<div class="flex flex-col items-center" id="dropZonePrompt">
<span data-icon-missing="cloud_upload" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="text-ink font-label-lg text-label-lg mb-1">
                      فایل رزومه خود را به اینجا بکشید یا برای انتخاب فایل کلیک کنید
                    </span>
<span class="text-secondary text-body-sm font-body-sm">
                      فرمت‌های مجاز: PDF یا DOCX (حداکثر ۱۰ مگابایت)
                    </span>
</div>
<div class="hidden flex items-center justify-between bg-surface-container-lowest p-3 border border-border mt-2" id="fileSelectedDisplay">
<div class="flex items-center gap-3 overflow-hidden text-right">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6"  /></svg>
<div>
<div class="text-ink text-label-md font-label-md truncate max-w-xs md:max-w-md" id="selectedFileName">نام فایل</div>
<div class="text-secondary text-body-sm font-body-sm" id="selectedFileSize">اندازه فایل</div>
</div>
</div>
<button class="text-status-error hover:bg-surface-container p-1" onclick="clearFile(event)" title="حذف فایل" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"  /></svg>
</button>
</div>
</div>
</div>
<!-- Submit Action Button -->
<div class="pt-2">
<button class="w-full bg-primary-container hover:bg-brand-blue-deep active:bg-primary text-surface-container-lowest py-4 px-6 text-label-lg font-label-lg flex items-center justify-center gap-3 transition-colors duration-150 cursor-pointer" type="submit">
<span>ارسال رزومه کاری</span>
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
</button>
</div>
<!-- Privacy & SLA Note -->
<div class="p-4 bg-surface border-r-4 border-primary-container flex items-start gap-3 text-secondary text-body-sm font-body-sm">
<span data-icon-missing="verified_user" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<p>
                  اطلاعات شما محرمانه تلقی شده و حداکثر ظرف ۷۲ ساعت توسط واحد منابع انسانی بررسی خواهد شد.
                </p>
</div>
<!-- Success Notification Alert (Hidden Initially) -->
<div class="hidden p-4 bg-surface-container border border-status-success text-status-success flex items-center gap-3" id="formSuccessAlert">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"  /></svg>
<span class="font-label-lg text-label-lg">رزومه شما با موفقیت ثبت شد. کد پیگیری ارسال پیامک گردید.</span>
</div>
</form>
</div>
</div>
</div>
</section>
<!-- SECTION 4: BENEFITS & WELL-BEING (Section 3: مزایا و رفاه کارکنان) -->
<section class="w-full bg-surface-container-lowest py-16 md:py-24 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border pb-6">
<div>
<div class="text-primary-container text-label-md font-label-md mb-2">ارزش‌آفرینی برای همکاران</div>
<h2 class="text-ink text-headline-lg-mobile md:text-headline-lg font-headline-lg">
              مزایا و رفاه کارکنان
            </h2>
</div>
<p class="text-secondary text-body-md font-body-md max-w-md mt-4 md:mt-0">
            برنامه‌های جامع و نهادینه‌شده هلدینگ ثاخت در جهت ارتقای امنیت شغلی و کیفیت زیست خانواده همکاران.
          </p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Benefit Card 1 -->
<div class="bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary-container transition-colors duration-150">
<div>
<div class="w-12 h-12 bg-surface-container-lowest border border-border flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="health_and_safety" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">
                بیمه درمان تکمیلی ممتاز
              </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                پوشش جامع سلامت خانواده بدون سقف تعهدات بیمارستانی، دندان‌پزشکی تخصصی و چکاپ‌های دوره‌ای سلامت شغلی.
              </p>
</div>
<div class="mt-6 pt-4 border-t border-border flex items-center gap-2 text-ink text-label-md font-label-md">
<span class="w-1.5 h-1.5 bg-primary-container"></span>
<span>پوشش ۱۰۰٪ اعضای تحت تکفل</span>
</div>
</div>
<!-- Benefit Card 2 -->
<div class="bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary-container transition-colors duration-150">
<div>
<div class="w-12 h-12 bg-surface-container-lowest border border-border flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="real_estate_agent" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">
                تسهیلات مسکن و وام رفاهی
              </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                تسهیلات خرید و ودیعه مسکن اختصاصی در پروژه‌های تابعه هلدینگ، همراه با وام‌های قرض‌الحسنه اضطراری سازمانی.
              </p>
</div>
<div class="mt-6 pt-4 border-t border-border flex items-center gap-2 text-ink text-label-md font-label-md">
<span class="w-1.5 h-1.5 bg-primary-container"></span>
<span>اولویت در واگذاری پروژه‌ها</span>
</div>
</div>
<!-- Benefit Card 3 -->
<div class="bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary-container transition-colors duration-150">
<div>
<div class="w-12 h-12 bg-surface-container-lowest border border-border flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="card_giftcard" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">
                بسته‌ها و هدایای مناسبتی
              </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                کمک‌هزینه‌های مستمر ورزشی، بن‌کارت‌های اعتباری رفاهی، هدایای اعیاد ملی و مذهبی و تورهای تفریحی اقامتی.
              </p>
</div>
<div class="mt-6 pt-4 border-t border-border flex items-center gap-2 text-ink text-label-md font-label-md">
<span class="w-1.5 h-1.5 bg-primary-container"></span>
<span>تقویم جامع رویدادهای رفاهی</span>
</div>
</div>
<!-- Benefit Card 4 -->
<div class="bg-surface border border-border p-6 flex flex-col justify-between hover:border-primary-container transition-colors duration-150">
<div>
<div class="w-12 h-12 bg-surface-container-lowest border border-border flex items-center justify-center text-primary-container mb-6">
<span data-icon-missing="insights" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-3">
                پاداش مبتنی بر عملکرد
              </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                نظام کارانه و پاداش فصلی متصل به پیشرفت فیزیکی پروژه‌های عمرانی و سودآوری تلفیقی هلدینگ ساختمانی ثاخت.
              </p>
</div>
<div class="mt-6 pt-4 border-t border-border flex items-center gap-2 text-ink text-label-md font-label-md">
<span class="w-1.5 h-1.5 bg-primary-container"></span>
<span>سنجش دقیق شاخص‌های KPI</span>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 5: LEARNING & DEVELOPMENT (Section 4: آموزش و یادگیری) -->
<section class="w-full bg-surface py-16 md:py-24 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<div class="lg:col-span-4 flex flex-col justify-between">
<div>
<div class="text-primary-container text-label-md font-label-md mb-2">توسعه مهارت‌های بنیادین</div>
<h2 class="text-ink text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-6 leading-tight">
                آموزش و یادگیری سازمانی
              </h2>
<p class="text-secondary text-body-md font-body-md leading-relaxed mb-6">
                رشد پایدار مگاپروژه‌های ساختمانی بدون روزآمدسازی مستمر دانش مهندسی و مدیریتی امکان‌پذیر نیست. هلدینگ ثاخت با سرمایه‌گذاری متمرکز، بستر یادگیری تراز اول را فراهم ساخته است.
              </p>
</div>
<div class="p-6 bg-ink text-surface-container-lowest border-r-4 border-primary-container hidden lg:block">
<div class="text-headline-sm font-headline-sm mb-2 text-brand-tint">آکادمی اختصاصی ثاخت</div>
<p class="text-body-sm font-body-sm text-surface-variant leading-relaxed">
                بیش از ۱۸,۰۰۰ نفر-ساعت دوره‌های تخصصی مهندسی و مالی سالانه برای پرسنل ستاد و کارگاه‌های اجرایی کشور.
              </p>
</div>
</div>
<div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Training Item 1 -->
<div class="bg-surface-container-lowest border border-border p-6 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span data-icon-missing="school" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="text-label-md font-label-md px-2 py-0.5 bg-surface text-ink border border-border">سطح سازمانی</span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">
                  آکادمی توسعه مدیریت و رهبری
                </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                  برنامه‌های ارزیابی کانون توسعه مدیران برای شناسایی و پرورش مدیران آینده مگاپروژه‌ها و مدیران عامل شرکت‌های اقماری.
                </p>
</div>
<div class="mt-6 pt-4 border-t border-border text-label-md font-label-md text-primary-container">
                دوره‌های Executive Leadership
              </div>
</div>
<!-- Training Item 2 -->
<div class="bg-surface-container-lowest border border-border p-6 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span data-icon-missing="architecture" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="text-label-md font-label-md px-2 py-0.5 bg-surface text-ink border border-border">استانداردهای جهانی</span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">
                  مدیریت پروژه حرفه‌ای (PMBOK &amp; FIDIC)
                </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                  آموزش جامع شرایط عمومی پیمان فیدیک، قراردادهای EPC و متدولوژی‌های نوین زمان‌بندی و کنترل پروژه در کارگاه‌های بزرگ.
                </p>
</div>
<div class="mt-6 pt-4 border-t border-border text-label-md font-label-md text-primary-container">
                اعطای مدارک رسمی معتبر
              </div>
</div>
<!-- Training Item 3 -->
<div class="bg-surface-container-lowest border border-border p-6 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span data-icon-missing="domain" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="text-label-md font-label-md px-2 py-0.5 bg-surface text-ink border border-border">فناوری روز</span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">
                  کارگاه‌های فناوری BIM و ساختمان سبز
                </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                  استقرار مدلسازی اطلاعات ساخت (BIM) در فاز طراحی تا بهره‌برداری و دوره‌های الزامات پایدار محیط‌زیستی و بهینه‌سازی انرژی.
                </p>
</div>
<div class="mt-6 pt-4 border-t border-border text-label-md font-label-md text-primary-container">
                همگام با نسل ۴ صنعت احداث
              </div>
</div>
<!-- Training Item 4 -->
<div class="bg-surface-container-lowest border border-border p-6 flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-4">
<span data-icon-missing="workspace_premium" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span class="text-label-md font-label-md px-2 py-0.5 bg-surface text-ink border border-border">حمایت تحصیلی</span>
</div>
<h3 class="text-ink text-headline-sm font-headline-sm mb-2">
                  بورسیه و توسعه شایستگی‌های فردی
                </h3>
<p class="text-secondary text-body-sm font-body-sm leading-relaxed">
                  تأمین هزینه‌های ثبت‌نام در دوره‌های تکمیلی تحصیلات عالی، همایش‌های بین‌المللی و کارگاه‌های نرم‌افزارهای تحلیلی سازه و اقتصاد مسکن.
                </p>
</div>
<div class="mt-6 pt-4 border-t border-border text-label-md font-label-md text-primary-container">
                حمایت تا سقف ۷۰٪ هزینه‌های آموزش
              </div>
</div>
</div>
</div>
</div>
</section>
<!-- SECTION 6: FAQS (Section 5: پرسش‌های متداول) -->
<section class="w-full bg-surface-container-lowest py-16 md:py-24 border-b border-border">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<div class="lg:col-span-4">
<div class="text-primary-container text-label-md font-label-md mb-2">پاسخ به ابهامات متقاضیان</div>
<h2 class="text-ink text-headline-lg-mobile md:text-headline-lg font-headline-lg mb-4">
              پرسش‌های متداول
            </h2>
<p class="text-secondary text-body-md font-body-md mb-8">
              روال استخدام، شیوه‌های ارزیابی و ضوابط همکاری با هلدینگ بین‌المللی توسعه ساختمان و شرکت‌های تابعه را مرور کنید.
            </p>
<div class="border border-border p-6 bg-surface">
<h4 class="text-ink text-headline-sm font-headline-sm mb-2">سؤالی دارید که در لیست نیست؟</h4>
<p class="text-secondary text-body-sm font-body-sm mb-4">
                تیم منابع انسانی ستاد مرکزی پاسخگوی مکاتبات متقاضیان محترم می‌باشد.
              </p>
<div class="text-ink text-label-md font-label-md flex items-center gap-2">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7l9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"  /></svg>
<span>hr@icd.ir</span>
</div>
</div>
</div>
<!-- The Clean Institutional Accordion Group -->
<div class="lg:col-span-8 space-y-4" id="faqAccordion">
<!-- Accordion Item 1 -->
<div class="border border-border bg-surface-container-lowest transition-all duration-150">
<button aria-expanded="false" class="w-full text-right p-6 flex justify-between items-center gap-4 text-ink hover:bg-surface focus:outline-none transition-colors duration-150" onclick="toggleFaq(this)" type="button">
<span class="text-headline-sm font-headline-sm">
                  فرآیند بررسی رزومه‌ها در هلدینگ ثاخت به چه صورت است؟
                </span>
<span class="faq-icon text-headline-md font-bold text-primary-container select-none">+</span>
</button>
<div class="faq-content hidden px-6 pb-6 pt-2 border-t border-border text-secondary text-body-md font-body-md leading-relaxed bg-surface/30">
                کلیه رزومه‌های دریافتی از طریق درگاه رسمی ظرف مدت ۴۸ الی ۷۲ ساعت کاری توسط تیم کارشناسی مدیریت سرمایه انسانی پایش می‌شوند. در صورت تطابق با پروفایل شغلی موردنیاز در ستاد هلدینگ یا شرکت‌های تابعه، با متقاضی جهت مصاحبه اولیه هماهنگی لازم انجام خواهد شد.
              </div>
</div>
<!-- Accordion Item 2 -->
<div class="border border-border bg-surface-container-lowest transition-all duration-150">
<button aria-expanded="false" class="w-full text-right p-6 flex justify-between items-center gap-4 text-ink hover:bg-surface focus:outline-none transition-colors duration-150" onclick="toggleFaq(this)" type="button">
<span class="text-headline-sm font-headline-sm">
                  آیا امکان جذب و همکاری در پروژه‌های خارج از تهران وجود دارد؟
                </span>
<span class="faq-icon text-headline-md font-bold text-primary-container select-none">+</span>
</button>
<div class="faq-content hidden px-6 pb-6 pt-2 border-t border-border text-secondary text-body-md font-body-md leading-relaxed bg-surface/30">
                بله، با توجه به گستره فعالیت شرکت‌های زیرمجموعه هلدینگ ثاخت در استان‌های مختلف کشور از جمله خراسان، فارس، خوزستان، هرمزگان و استان‌های شمالی، همواره برای مهندسان اجرایی، سرپرستان کارگاه و مدیران مقیم در پروژه‌های استانی فرصت‌های جذب فراهم است.
              </div>
</div>
<!-- Accordion Item 3 -->
<div class="border border-border bg-surface-container-lowest transition-all duration-150">
<button aria-expanded="false" class="w-full text-right p-6 flex justify-between items-center gap-4 text-ink hover:bg-surface focus:outline-none transition-colors duration-150" onclick="toggleFaq(this)" type="button">
<span class="text-headline-sm font-headline-sm">
                  روند مصاحبه‌های فنی و سازمانی چقدر زمان می‌برد؟
                </span>
<span class="faq-icon text-headline-md font-bold text-primary-container select-none">+</span>
</button>
<div class="faq-content hidden px-6 pb-6 pt-2 border-t border-border text-secondary text-body-md font-body-md leading-relaxed bg-surface/30">
                فرآیند جذب شامل دو تا سه مرحله است: مصاحبه عمومی منابع انسانی، مصاحبه فنی با مدیران ارشد پروژه مربوطه، و نهایتاً جلسه صلاحیت سازمانی. کل این چرخه معمولاً بین ۲ الی ۳ هفته کاری تکمیل و نتیجه به اطلاع متقاضی خواهد رسید.
              </div>
</div>
<!-- Accordion Item 4 -->
<div class="border border-border bg-surface-container-lowest transition-all duration-150">
<button aria-expanded="false" class="w-full text-right p-6 flex justify-between items-center gap-4 text-ink hover:bg-surface focus:outline-none transition-colors duration-150" onclick="toggleFaq(this)" type="button">
<span class="text-headline-sm font-headline-sm">
                  آیا امکان دورکاری یا همکاری پاره‌وقت در برخی ردیف‌ها فراهم است؟
                </span>
<span class="faq-icon text-headline-md font-bold text-primary-container select-none">+</span>
</button>
<div class="faq-content hidden px-6 pb-6 pt-2 border-t border-border text-secondary text-body-md font-body-md leading-relaxed bg-surface/30">
                با توجه به ماهیت فیزیکی پروژه‌های عمرانی، عمده ردیف‌های مهندسی کارگاهی و نظارتی به‌صورت حضوری است؛ اما در برخی تخصص‌های تحلیلی، مدل‌سازی اطلاعات ساختمان (BIM)، مطالعات اقتصادی بازار سرمایه و طراحی سازه امکان تعریف مدل‌های همکاری شناور و پروژه‌ای وجود دارد.
              </div>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- FOOTER (Predicted Shared Component: Footer) -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border dark:border-outline-variant">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid of Links -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-secondary/30">
<!-- Column 1: Identity -->
<div class="lg:col-span-1">
<div class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight mb-4 flex items-center gap-2">
<span class="w-7 h-7 bg-primary-container text-surface-container-lowest inline-flex items-center justify-center font-bold text-body-md">ث</span>
<span>هلدینگ ثاخت</span>
</div>
<p class="text-surface-dim text-body-sm font-body-sm leading-relaxed mb-6">
            شرکت بین‌المللی توسعه ساختمان (سهامی عام)؛ نماد توسعه پایدار و مدیریت مگاپروژه‌های سرمایه‌گذاری و مسکونی در ایران.
          </p>
<div class="flex items-center gap-2 text-label-md font-label-md text-brand-tint">
<span class="w-2 h-2 bg-status-success inline-block"></span>
<span>نماد بورس: ثاخت (ICD)</span>
</div>
</div>
<!-- Column 2: Governance & Projects -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4">
            معرفی و پروژه‌ها
          </h4>
<ul class="space-y-2.5">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                معرفی هلدینگ و هیئت‌مدیره
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                پرتفوی پروژه‌های عمرانی
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                پایداری و استانداردهای مهندسی
              </a>
</li>
</ul>
</div>
<!-- Column 3: Shareholders & Finance -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4">
            امور سهامداران
          </h4>
<ul class="space-y-2.5">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                سامانه سهامداران و کدال
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                مناقصات و مزایده‌ها
              </a>
</li>
</ul>
</div>
<!-- Column 4: Media & Reports -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4">
            رسانه و نظارت
          </h4>
<ul class="space-y-2.5">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                اخبار و رسانه دیجیتال
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                گزارش‌های ماهانه دیده‌بان
              </a>
</li>
<li>
<NuxtLink class="text-surface-container-lowest font-bold text-body-sm font-body-sm" to="/careers">
                فرصت‌های همکاری و جذب
              </NuxtLink>
</li>
</ul>
</div>
<!-- Column 5: Communication -->
<div>
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4">
            ارتباطات سازمانی
          </h4>
<ul class="space-y-2.5">
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                تماس و امور مشتریان
              </a>
</li>
<li>
<a class="text-surface-dim hover:text-brand-tint transition-colors text-body-sm font-body-sm" href="#">
                حریم خصوصی و شفافیت مالی
              </a>
</li>
<li class="pt-2">
<span class="text-body-sm font-body-sm text-surface-dim block">تلفن ستاد مرکزی:</span>
<span class="text-label-lg font-label-lg text-surface-container-lowest dir-ltr inline-block">۰۲۱-۸۸۸۸۴۵۲۰</span>
</li>
</ul>
</div>
</div>
<!-- Bottom Bar with exact JSON Copyright String -->
<div class="mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-dim text-body-sm font-body-sm">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6">
<a class="hover:text-brand-tint transition-colors" href="#">قوانین و ضوابط</a>
<a class="hover:text-brand-tint transition-colors" href="#">منشور اخلاقی</a>
<a class="hover:text-brand-tint transition-colors" href="#">پرتال درون‌سازمانی</a>
</div>
</div>
</div>
</footer>
<!-- Micro-interactions Script -->
</template>
