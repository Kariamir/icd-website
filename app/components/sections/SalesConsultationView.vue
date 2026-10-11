<!--
  Ported from the approved design at
  stitch_project_detail_page_template/sales_consultation/ (ADR-013).

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
<!-- TopNavBar (Web Header Anchor) -->

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
<AppIcon name="arrow_right_alt" />
</button>
</div>
<!-- Privacy & SLA Note -->
<div class="flex items-center gap-2 pt-2 text-outline text-body-sm font-body-sm justify-center">
<AppIcon name="verified_user" />
<span>اطلاعات شما نزد هلدینگ ثاخت به صورت محرمانه محفوظ خواهد بود.</span>
</div>
</form>
</div>
</main>
<!-- Official 5-Column Holding Footer -->
</template>
