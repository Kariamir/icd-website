<!--
  Ported from the approved design at
  stitch_project_detail_page_template/careers/ (ADR-013).

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
<!-- TOP NAVIGATION BAR (Predicted Shared Component: TopNavBar) -->

<!-- MAIN CANVAS CONTENT -->
<main class="w-full flex-grow">
<!-- SECTION 1: HERO -->
<section class="relative w-full bg-ink text-surface-container-lowest border-b border-border overflow-hidden">
<!-- Background Architectural Scrim -->
<div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" data-alt="A massive architectural civil engineering structure in monochrome deep steel blue and gray tones, showcasing imposing concrete framework, sharp geometric lines, and tower cranes under structured industrial morning light." style="background-image: url('/img/placeholder.svg')"></div>
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
<AppIcon name="account_balance" />
<div class="text-ink font-label-lg text-label-lg">ثبات نهادی</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">بزرگ‌ترین هلدینگ ساختمانی بورسی</div>
</div>
<div class="p-4 bg-surface border border-border">
<AppIcon name="engineering" />
<div class="text-ink font-label-lg text-label-lg">مقیاس بی‌بدیل</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">مدیریت مگاپروژه‌های تراز اول</div>
</div>
<div class="p-4 bg-surface border border-border">
<AppIcon name="trending_up" />
<div class="text-ink font-label-lg text-label-lg">مسیر ارتقا</div>
<div class="text-secondary text-body-sm font-body-sm mt-1">سیستم ارزیابی شایسته‌محور</div>
</div>
</div>
</div>
<div class="lg:col-span-5">
<div class="relative border border-border p-2 bg-surface">
<img alt="سرمایه انسانی هلدینگ ثاخت" class="w-full h-[400px] object-cover filter contrast-105" data-alt="An executive architectural board meeting in a high-rise office with large glass windows overlooking a vast civil construction project. Engineers and corporate strategists dressed in sharp corporate attire are analyzing blueprints and BIM models on a sleek dark conference table in high-contrast neutral lighting." src="/img/placeholder.svg" />
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
<AppIcon name="upload_file" />
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
<AppIcon name="badge" />
</div>
</div>
<!-- Field 2: Contact Number -->
<div>
<label class="block text-ink text-label-lg font-label-lg mb-2" for="contactNumber">
                  شماره تماس مستقیم <span class="text-status-error">*</span>
</label>
<div class="relative">
<input class="w-full text-right bg-surface-container-lowest border border-border px-4 py-3 text-ink text-body-md font-body-md placeholder:text-secondary/50 focus:border-primary-container focus:outline-none transition-colors duration-150" dir="ltr" id="contactNumber" name="contactNumber" placeholder="۰۹۱۲XXXXXXX" required="" type="tel" />
<AppIcon name="call" />
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
<AppIcon name="cloud_upload" />
<span class="text-ink font-label-lg text-label-lg mb-1">
                      فایل رزومه خود را به اینجا بکشید یا برای انتخاب فایل کلیک کنید
                    </span>
<span class="text-secondary text-body-sm font-body-sm">
                      فرمت‌های مجاز: PDF یا DOCX (حداکثر ۱۰ مگابایت)
                    </span>
</div>
<div class="hidden flex items-center justify-between bg-surface-container-lowest p-3 border border-border mt-2" id="fileSelectedDisplay">
<div class="flex items-center gap-3 overflow-hidden text-right">
<AppIcon name="picture_as_pdf" />
<div>
<div class="text-ink text-label-md font-label-md truncate max-w-xs md:max-w-md" id="selectedFileName">نام فایل</div>
<div class="text-secondary text-body-sm font-body-sm" id="selectedFileSize">اندازه فایل</div>
</div>
</div>
<button class="text-status-error hover:bg-surface-container p-1" onclick="clearFile(event)" title="حذف فایل" type="button">
<AppIcon name="close" />
</button>
</div>
</div>
</div>
<!-- Submit Action Button -->
<div class="pt-2">
<button class="w-full bg-primary-container hover:bg-brand-blue-deep active:bg-primary text-surface-container-lowest py-4 px-6 text-label-lg font-label-lg flex items-center justify-center gap-3 transition-colors duration-150 cursor-pointer" type="submit">
<span>ارسال رزومه کاری</span>
<AppIcon name="arrow_forward" />
</button>
</div>
<!-- Privacy & SLA Note -->
<div class="p-4 bg-surface border-r-4 border-primary-container flex items-start gap-3 text-secondary text-body-sm font-body-sm">
<AppIcon name="verified_user" />
<p>
                  اطلاعات شما محرمانه تلقی شده و حداکثر ظرف ۷۲ ساعت توسط واحد منابع انسانی بررسی خواهد شد.
                </p>
</div>
<!-- Success Notification Alert (Hidden Initially) -->
<div class="hidden p-4 bg-surface-container border border-status-success text-status-success flex items-center gap-3" id="formSuccessAlert">
<AppIcon name="check_circle" />
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
<AppIcon name="health_and_safety" />
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
<AppIcon name="real_estate_agent" />
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
<AppIcon name="card_giftcard" />
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
<AppIcon name="insights" />
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
<AppIcon name="school" />
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
<AppIcon name="architecture" />
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
<AppIcon name="domain" />
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
<AppIcon name="workspace_premium" />
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
<AppIcon name="mail" />
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

<!-- Micro-interactions Script -->
</template>
