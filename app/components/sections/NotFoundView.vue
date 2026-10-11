<!--
  Ported from the approved design at
  stitch_project_detail_page_template/11_error_404/ (ADR-013).

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
<!-- ================= TOP NAVIGATION HEADER ================= -->

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
<AppIcon name="search" />
</button>
</form>
</div>
<!-- Primary Action Buttons (Capsule Shaped) -->
<div class="flex flex-wrap items-center justify-center gap-3.5 mb-12">
<a class="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-primary-container text-white text-sm font-semibold hover:bg-brand-blue-deep transition-all shadow-sm hover:shadow" href="#">
<AppIcon name="home" />
<span>بازگشت به صفحه اصلی</span>
</a>
<a class="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-white border border-border text-ink text-sm font-semibold hover:border-primary-container hover:text-primary-container hover:bg-slate-50 transition-all shadow-sm" href="#">
<AppIcon name="apartment" />
<span>مشاهده پروژه‌ها</span>
</a>
</div>
<!-- Quick Access Links (Minimal & Soft Capsule Pills) -->
<div class="pt-8 border-t border-border/80">
<p class="text-xs font-medium text-slate-400 mb-4">بخش‌های پرکاربرد برای راهنمایی شما:</p>
<div class="flex flex-wrap justify-center gap-2.5">
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<AppIcon name="domain" />
<span>پروژه‌ها</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<AppIcon name="key" />
<span>پیش‌فروش واحدها</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<AppIcon name="trending_up" />
<span>سهام ثاخت</span>
</a>
<a class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border text-xs font-medium text-ink hover:text-primary-container hover:border-primary-container/50 hover:bg-brand-tint/40 transition-all shadow-xs" href="#">
<AppIcon name="headset_mic" />
<span>تماس با ما</span>
</a>
</div>
</div>
</div>
</main>
<!-- ================= FOOTER (SHARED 5-COLUMN COMPONENT) ================= -->
</template>
