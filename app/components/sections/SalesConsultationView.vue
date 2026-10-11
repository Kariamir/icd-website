<!--
  Ported from the approved design at
  stitch_project_detail_page_template/sales_consultation/ (ADR-013).

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
<!-- TopNavBar (Web Header Anchor) -->
<header class="w-full bg-surface-container-lowest border-b border-border z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Logo & Navigation Cluster -->
<div class="flex items-center gap-10">
<!-- Brand Title / Logo -->
<NuxtLink class="flex items-center gap-3 group" to="/">
<div class="w-10 h-10 bg-ink flex items-center justify-center text-surface-container-lowest font-headline-md font-bold tracking-wider">
            ث
          </div>
<span class="text-headline-md font-headline-md text-ink tracking-tight">هلدینگ ساختمانی ثاخت</span>
</NuxtLink>
<!-- Desktop Navigation Links -->
<nav class="hidden lg:flex items-center gap-8">
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">درباره ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">پروژه‌ها</a>
<a class="border-b-2 border-primary-container text-primary-container font-bold pb-1 text-label-lg font-label-lg" href="#">فروش و پیش‌فروش</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">دیده‌بان ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors duration-150" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left: Utility & Actions -->
<div class="flex items-center gap-4">
<!-- Icons Cluster -->
<div class="hidden sm:flex items-center gap-2 text-on-surface-variant">
<button aria-label="جستجو" class="p-2 hover:bg-surface-container-high transition-colors duration-150" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="p-2 hover:bg-surface-container-high transition-colors duration-150" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
</div>
<!-- Secondary CTA: ورود سهامداران -->
<a class="hidden md:inline-flex items-center justify-center px-4 py-2 text-body-sm font-label-lg border border-border text-ink hover:bg-surface transition-colors duration-150" href="#">
          ورود سهامداران
        </a>
<!-- Primary CTA: مشاوره و تماس سریع -->
<a class="inline-flex items-center justify-center px-5 py-2.5 bg-primary-container text-on-primary text-body-sm font-label-lg hover:bg-brand-blue-deep transition-colors duration-150" href="#consultation-form">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- Main Content: Single Centred Minimal Form on Pure White -->
<main class="flex-grow flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-lowest">
<div class="w-full max-w-xl mx-auto">
<!-- Section Header: Centred, Authoritative, Clear -->
<div class="text-center mb-10">
<div class="inline-flex items-center gap-2 mb-3 text-secondary text-label-md font-label-md tracking-wider">
<span class="w-2 h-2 bg-primary-container inline-block"></span>
          سامانه یکپارچه واگذاری و پیش‌فروش
        </div>
<h1 class="text-headline-lg font-headline-lg text-ink mb-3 tracking-tight">
          درخواست مشاوره تخصصی خرید و سرمایه‌گذاری
        </h1>
<p class="text-body-md font-body-md text-on-surface-variant max-w-lg mx-auto">
          کارشناسان فروش هلدینگ ثاخت حداکثر ظرف ۲۴ ساعت کاری با شما تماس خواهند گرفت.
        </p>
</div>
<!-- Centred Short Form -->
<form action="#" class="border border-border p-8 md:p-10 bg-surface-container-lowest space-y-6" id="consultation-form" method="POST">
<!-- Field 1: Full Name -->
<div>
<label class="block text-label-lg font-label-lg text-ink mb-2" for="full-name">
            نام و نام خانوادگی <span class="text-status-error">*</span>
</label>
<input class="w-full px-4 py-3 bg-surface-container-lowest border border-border text-body-md font-body-md text-ink placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors duration-150" id="full-name" name="full_name" placeholder="مثال: علیرضا محمدی" required="" type="text" />
</div>
<!-- Field 2: Direct Contact Phone -->
<div>
<label class="block text-label-lg font-label-lg text-ink mb-2" for="phone-number">
            شماره تماس مستقیم <span class="text-status-error">*</span>
</label>
<input class="w-full px-4 py-3 bg-surface-container-lowest border border-border text-body-md font-body-md text-ink placeholder:text-outline text-right focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors duration-150" dir="ltr" id="phone-number" name="phone_number" placeholder="۰۹۱۲XXXXXXX" required="" type="tel" />
</div>
<!-- Field 3: Preferred Project or Budget Range -->
<div>
<label class="block text-label-lg font-label-lg text-ink mb-2" for="project-preference">
            پروژه یا بودجه مدنظر <span class="text-status-error">*</span>
</label>
<select class="w-full px-4 py-3 bg-surface-container-lowest border border-border text-body-md font-body-md text-ink focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors duration-150" id="project-preference" name="project_preference" required="">
<option disabled="" selected="" value="">انتخاب پروژه یا رده سرمایه‌گذاری</option>
<option value="residential-tower">واحدهای مسکونی لوکس و برج‌ها</option>
<option value="commercial-office">مجتمع‌های تجاری، اداری و خدماتی</option>
<option value="presale-portfolio">فرصت‌های پیش‌فروش با بازدهی بالا</option>
<option value="budget-under-20b">سرمایه‌گذاری تا ۲۰ میلیارد تومان</option>
<option value="budget-above-20b">سرمایه‌گذاری کلان (بیش از ۲۰ میلیارد تومان)</option>
</select>
</div>
<!-- Field 4: Optional Notes -->
<div>
<label class="block text-label-lg font-label-lg text-ink mb-2 flex items-center justify-between" for="notes">
<span>توضیحات اختیاری</span>
<span class="text-body-sm font-body-sm text-outline">اختیاری</span>
</label>
<textarea class="w-full px-4 py-3 bg-surface-container-lowest border border-border text-body-md font-body-md text-ink placeholder:text-outline focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors duration-150 resize-none" id="notes" name="notes" placeholder="در صورت وجود شرایط یا پرسش خاص، در اینجا درج فرمایید..." rows="3"></textarea>
</div>
<!-- Form Submission Button -->
<div class="pt-2">
<button class="w-full py-3.5 px-6 bg-primary-container text-on-primary text-headline-sm font-headline-sm hover:bg-brand-blue-deep active:opacity-95 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer" type="submit">
<span>ثبت درخواست مشاوره</span>
<span data-icon-missing="arrow_right_alt" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
</button>
</div>
<!-- Privacy & SLA Note -->
<div class="flex items-center gap-2 pt-2 text-outline text-body-sm font-body-sm justify-center">
<span data-icon-missing="verified_user" class="inline-block size-[1.25em] rounded-xs border border-dashed border-status-error" aria-hidden="true"></span>
<span>اطلاعات شما نزد هلدینگ ثاخت به صورت محرمانه محفوظ خواهد بود.</span>
</div>
</form>
</div>
</main>
<!-- Official 5-Column Holding Footer -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border mt-auto">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid: 5 Structural Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-outline-variant/30">
<!-- Column 1: Holding Identity -->
<div class="lg:col-span-1 space-y-4">
<div class="flex items-center gap-3">
<div class="w-8 h-8 bg-surface-container-lowest text-ink flex items-center justify-center font-bold text-headline-sm">
              ث
            </div>
<span class="text-headline-sm font-headline-sm text-surface-container-lowest">هلدینگ ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed">
            شرکت بین‌المللی توسعه ساختمان (ثاخت)، پیشرو در مدیریت مگاپروژه‌های عمرانی، سرمایه‌گذاری و توسعه پایدار املاک در سطح ملی و منطقه‌ای.
          </p>
<div class="pt-2 text-label-md font-label-md text-brand-tint">
            نماد بورسی: ثاخت (بورس اوراق بهادار تهران)
          </div>
</div>
<!-- Column 2: معرفی و ساختار -->
<div class="space-y-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest pb-2 border-b border-outline-variant/20">
            معرفی و ساختار
          </h4>
<ul class="space-y-2.5">
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">معرفی هلدینگ و هیئت‌مدیره</a></li>
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">پایداری و استانداردهای مهندسی</a></li>
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">حریم خصوصی و شفافیت مالی</a></li>
</ul>
</div>
<!-- Column 3: سبد سرمایه‌گذاری و پروژه‌ها -->
<div class="space-y-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest pb-2 border-b border-outline-variant/20">
            پروژه‌ها و معاملات
          </h4>
<ul class="space-y-2.5">
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">پرتفوی پروژه‌های عمرانی</a></li>
<li><a class="text-body-sm font-body-sm text-brand-tint font-bold hover:underline transition-colors duration-150" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a></li>
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">مناقصات و مزایده‌ها</a></li>
</ul>
</div>
<!-- Column 4: امور سهامداران و رسانه -->
<div class="space-y-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest pb-2 border-b border-outline-variant/20">
            امور سهامداران
          </h4>
<ul class="space-y-2.5">
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">سامانه سهامداران و کدال</a></li>
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">گزارش‌های ماهانه دیده‌بان</a></li>
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">اخبار و رسانه دیجیتال</a></li>
</ul>
</div>
<!-- Column 5: ارتباط و پشتیبانی -->
<div class="space-y-3">
<h4 class="text-headline-sm font-headline-sm text-surface-container-lowest pb-2 border-b border-outline-variant/20">
            امور مشتریان
          </h4>
<ul class="space-y-2.5">
<li><a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">تماس و امور مشتریان</a></li>
<li>
<div class="text-body-sm font-body-sm text-surface-dim pt-2">
                مرکز پاسخگویی خریداران:
                <div class="text-headline-sm font-headline-sm text-surface-container-lowest dir-ltr text-right mt-1">۰۲۱-۸۸۸۸۴۴۰۰</div>
</div>
</li>
</ul>
</div>
</div>
<!-- Bottom Bar: Copyright Text -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-dim text-body-sm font-body-sm">
<p>© ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.</p>
<div class="flex items-center gap-6">
<span class="text-label-md font-label-md text-surface-dim">ISO 9001:2015 CERTIFIED</span>
<span class="text-label-md font-label-md text-surface-dim">رتبه یک انبوه‌سازی و مهندسی عمران</span>
</div>
</div>
</div>
</footer>
</template>
