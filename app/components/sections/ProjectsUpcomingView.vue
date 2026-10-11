<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_upcoming/ (ADR-013).

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
<!-- Top Navigation Bar -->
<header class="w-full bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Logo & Primary Navigation Links -->
<div class="flex items-center gap-10">
<NuxtLink class="text-headline-md font-headline-md text-ink tracking-tight flex items-center gap-3" to="/">
<span class="w-7 h-7 bg-primary-container inline-block"></span>
<span>هلدینگ ساختمانی ثاخت</span>
</NuxtLink>
<nav class="hidden lg:flex items-center gap-8">
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">درباره ثاخت</a>
<NuxtLink class="border-b-2 border-primary-container text-primary-container font-bold pb-1 text-label-lg font-label-lg" to="/projects">پروژه‌ها</NuxtLink>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">فروش و پیش‌فروش</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">دیده‌بان ثاخت</a>
<a class="text-ink hover:text-primary-container pb-1 text-label-lg font-label-lg transition-colors" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left: Utility Actions & CTA -->
<div class="flex items-center gap-4">
<div class="hidden sm:flex items-center gap-2 text-ink">
<button class="p-2 hover:bg-surface-container-high transition-colors duration-150" title="جستجو">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button class="p-2 hover:bg-surface-container-high transition-colors duration-150" title="تغییر زبان">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
</div>
<a class="hidden md:inline-flex items-center text-label-lg font-label-lg border border-primary-container text-primary-container px-4 py-2 hover:bg-brand-tint transition-colors duration-150" href="#">
          ورود سهامداران
        </a>
<a class="inline-flex items-center text-label-lg font-label-lg bg-primary-container text-surface-container-lowest px-5 py-2 hover:bg-brand-blue-deep transition-colors duration-150" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main>
<!-- SECTION 1: HERO -->
<section class="relative w-full h-[480px] md:h-[560px] bg-ink overflow-hidden flex flex-col justify-between">
<!-- Full-bleed background architectural photo -->
<div class="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40" data-alt="A grand monumental architectural site captured during twilight with striking geometric concrete foundations, structural steel frameworks, and sharp angled silhouettes under a deep twilight sky. Subtle industrial architectural lighting casts crisp shadows across the engineered terrain. The atmosphere is solemn, authoritative, and precise, capturing the raw scale of high-caliber civil infrastructure." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMvUVFLEp__7G8FwY5ym743NtgP_UcCcwiE1U_0Ze7GaknVdFAGp5BwISVNSlEL3mVvw4lQRNc-Tv2VuTDu3SNIh2hbSqQFgGQTt2eurqFah_B-ZjW33EiJbfbMHjg0nQrMOE_MgKWgqqhzrpdJV-2pxykcwwW1diBobmSA1mx2EfPA8tEqRmQZQ5OwdrWwM0zfzmiNbIenWlbSRm7OoK3C6m-IotT-4fA1_RQp7b4y-KXgodqgivCYA')">
</div>
<!-- Planar Scrim Overlay -->
<div class="absolute inset-0 bg-ink/60"></div>
<!-- Hero Top Bar: Breadcrumb Link -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pt-8">
<NuxtLink class="inline-flex items-center gap-2 text-surface-container-lowest hover:text-brand-tint transition-colors text-label-lg font-label-lg" to="/projects">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
<span>بازگشت به پروژه‌ها</span>
</NuxtLink>
</div>
<!-- Hero Bottom Content: Editorial Header -->
<div class="relative z-10 w-full max-w-[1440px] mx-auto px-space-lg md:px-margin pb-16">
<div class="max-w-3xl border-r-4 border-primary-container pr-6">
<h1 class="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-surface-container-lowest tracking-tight mb-4">
            پروژه‌های آتی
          </h1>
<p class="text-body-lg font-body-lg text-brand-tint tracking-normal">
            طرح‌های مطالعاتی و در آستانه آغاز هلدینگ ثاخت
          </p>
</div>
</div>
</section>
<!-- SECTION 2: PROJECT GRID -->
<!-- Editorial Museum-Wall Aesthetic, Pure Minimalist Presentation -->
<section class="w-full bg-surface-container-lowest py-16 md:py-24">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
<!-- Card 1 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A clean modern coastal resort masterplan render featuring modular rectilinear buildings with vast panoramic glass and structural white concrete balconies overlooking a calm sea. Bright natural morning sunlight casts sharp, clean architectural shadows. The aesthetic is strictly institutional and modernist, with refined engineering precision and clear structural balance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlgc3iy7mHEWrn-RWXZ9h-ZTW_iI6kVIu-IiGMNHGIj8fUDnLwCTyuFn8fQ2ql-fa2YV-C9uiv18NJCoQeRF9vtwc0Eu3zLVL6KBf5-2abbH3emJEJi5Be2mRKhUQJbZCKWW25nVqBITNBF3K_Lykuhs4P8gZQXMKO5HOrH95EgMezpumeLiWFz2laYPprBzCSrbxKkw-kRvYKIwC-o6vaLHU5N22W-QtKn38qo1dl5WHipqestdCMOw" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجتمع اقامتی و تفریحی نارنجستان ایزدشهر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                مازندران، ایزدشهر
              </p>
</div>
</article>
<!-- Card 2 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A dramatic architectural visualization of a high-rise commercial center featuring interlocking glass and dark stone monoliths against a wide oceanic horizon. The geometric facade is crisp and razor-sharp, captured during bright afternoon daylight with clear sky reflections. High-end modern civil engineering aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB96iwlZ1O6VlKbN1lf4IyvfLXLCBG2_a6cONi_tszhGdW1KjJDGdHjogPNy9WZOMwYLa_Cwz4tetsqizyY4VroQfVWxpFFBFcruHrd77xyCmWOatqjMYVUMzVXrSq1hj0SW7k-WaV_by8RVotr7aix_CXKlY30a6LiofTyu4MowMHworpdmc_lIGjpsq2TxcXZLrFTIKY1bH0FpWIfTWzFEJTqqFfYw3BeBa28fDQdwDR0ipVFiuK5aw" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                پروژه تجاری اداری خلیج فارس
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                بوشهر
              </p>
</div>
</article>
<!-- Card 3 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A futuristic multi-tower corporate headquarters complex with angular cantilevered glass facades and wide pedestrian plazas made of honed granite slabs. Low afternoon sun illuminates the structured vertical louvers and sharp crystalline building volumes in high contrast." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCg-WfhusC2eVV8ujqwxz9lhxVQ3Z_umHw1k_PLyxFakinKBZjGEtfgen0VJ3vU-C8gDjdLVg5jW1IQdj-YHvb3Eo_23UpApwYlpntG5oCvx6CiXj98JIjl427meV670FAs_i8gTwxI7azF1AGbxFC18womE1eSmRLkyWr-HKrJFFeKHB8Hle0F5L6ms3bboDJdZC9bh1wIJ06f6Gng0Q8C_xBMtZka2Khhm3AGHB4Xw48htHC7UQwzHA" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                برج بین‌المللی تجارت و نوآوری البرز
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، منطقه ۲۲
              </p>
</div>
</article>
<!-- Card 4 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive modern multi-modal logistics hub and administrative building showcasing raw structural precast concrete arches and rigorous industrial steel frames. High key neutral lighting highlights the sheer scale and engineering discipline of the complex." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZOxsDqIVz-n7_2QUqhIzT-_DqgDXoDhM3B7W7odYI-R9oC-nhuk4MijW9HZhRN3L6uv1c-uxCSSERlkp3sflE7Ljpal15IlB0Lu1V3dW2oZYezF-mYfv8UV4PFewOxfl5SoNwFVRTSkZma6PM3TE3njxwmv22kB3I1q-YFDN8hDifDlrShriKQip4BUxVxb8xUZC8uSpNMDPrcsU0wTiueID0m1d2a7DJud7p4EfhoG0-CqAEgNJVhQ" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مرکز مبادلات لجستیک و ترانزیت کاسپین
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                گیلان، منطقه آزاد انزلی
              </p>
</div>
</article>
<!-- Card 5 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An urban residential masterplan featuring terraced modernist stone apartment blocks with strict horizontal rhythm, deep shade overhangs, and landscaped internal courtyards. Architectural rendering with clean natural overcast lighting highlighting high-density structural precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqcFUR4m3BbvCFKx5D2jXglYwkm6LspuR4ud6scIz6LBhvgRJitwhaMAi5NCTC4uHO6SdCNHEwShZcV_MPCAdcIzChqCedZw1DpvjzXyuB0l6TZ9dqDA0wuVB0Z9AYy9VVTX0ok9lRKbtnX_dOJXRQtoDiOEQ-AECQLx9r5-zF7h6UZCCb7wqQ2GKYIgm53fnPVzDCWjonNvi-MbHLWJmXFdrsHtEoYzXGAttH2smfCDjV4i1GFZvI6Q" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی باغ‌شهر نیلوفر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، ناژوان
              </p>
</div>
</article>
<!-- Card 6 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive multi-level medical and wellness center featuring serene horizontal glass curtain walls framed by pristine travertine stone piers. The architecture communicates absolute engineering stability and quiet dignity in soft midday light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC1Z35hP4rORRcS2vxLYX5f-MwG62AybpGLxpDGP2okIjK4UiiQL_RF2yFMmdv2nmoUcq2Ot9n3X0HuNrpJwM_rm_-EnoMrYOgnfhKsdpHS-SnVe3c6RjsZdz8WLLqxNigKdolpWNAXXH60wzSjATxyFkwxsXwYG3rWsxGXhrtpK5OsTEOyIBKF2BMtobpAWgqL3DYJefH_DchO5lxnQ_VagB3u0UxVo5X9TJqCQoEJM65sbzrPeDxNA" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                دهکده سلامت و بازتوانی کوهستان
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                فارس، شیراز
              </p>
</div>
</article>
<!-- Card 7 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="A grand waterfront civic and mixed-use development featuring cantilevered observation decks and monolithic dark-tinted glass pavilions facing a calm harbor basin. Direct overhead daylight casts sharp rectangular shadows across clean tiled boardwalks." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg-6INmg4TsyiQeQlOQy_M8S9X6cbmPEtSCZVJ-XEb5g0rwgAV5lFwyIrSh8ZBlgC3ER0DE1JnufyRtg-9sgtyajDpxg1cinZ6bDI7l5a4mrF71KB_600NUw0HPLA_YeMrE_h8Wp_tW3lRshpvFq93uqvXSsvb-aaahH2JOF_fVelx7VeqqJ5xVH7GIA1wzPJgTczVtEc-JcHbKJK6MR5QkJaQHq8kHYqqaED7_LQf1Sw86NtZQILiWw" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                مجتمع چندمنظوره ساحلی اروند
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                خوزستان، خرمشهر
              </p>
</div>
</article>
<!-- Card 8 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An expansive industrial technology park with staggered rectangular administrative hubs clad in perforated aluminum panels and sharp dark masonry. Clean geometric sightlines under an open vast sky reflecting institutional corporate strength." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx5bWQcJBRaEpcrgnlHiDEeGMjF0QVxDdaxF04o9lQMUwATrXN4b3EQBY4fV4xwc4q9q-8y5fe88NeDSV0B13JUJUQxUUam5WTsSngxNUO2CSQzke-qfeFkRDlDr9YkB1WblOCS7j5CJF8cmV_UyY18hUlQiiYwmpRtLsWc8Pu964DNslT_eIDWo50ufQzec5QBRYhGNN1IWIrMj-NxKJUieUe1_Usgq7F_8EH_blZdivk4Ss9C_cLXQ" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                پارک فناوری و صنایع پیشرفته توس
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                خراسان رضوی، مشهد
              </p>
</div>
</article>
<!-- Card 9 -->
<article class="group flex flex-col bg-surface-container-lowest">
<div class="relative aspect-[4/3] w-full overflow-hidden bg-surface-alt border border-border">
<img class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" data-alt="An iconic hospitality high-rise complex with bold rhythmic horizontal balconies and minimalist architectural bronze accents set against a dramatic desert mountain backdrop. Clear desert sunlight produces high contrast and pristine planar definition." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjHXYdRq_d6yaNARRiHYNG1kcw_Gz5rJo1Jc3Lkz9STEghalyf5vIfhHsRnPOjSMtalBuYzKTLYPMqHyrfr8iDWzb3P4EGEYfGm0WjPvB-o9EodaMmv3lhuusl2k-8DEoolAftpQ8jOjOdV1vvIlNjIzxri0fvjn13-zBLFm8Rysgk2xIiCQ7Nt8NvPQW5_ol8euW6StZTPb8IhQdYfaPuQwp1u1bcjdzy3S5IBsX15VejI2V5zkKvyQ" />
</div>
<div class="pt-5 border-t border-border mt-4">
<h3 class="text-headline-sm font-headline-sm text-ink mb-1 group-hover:text-primary-container transition-colors">
                هتل و اقامتگاه بین‌المللی ارگ کویر
              </h3>
<p class="text-body-sm font-body-sm text-secondary">
                کرمان، بم
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- Standard Institutional 5-Column Footer -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Branding Row -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 mb-12 border-b border-outline/30 gap-6">
<div class="flex items-center gap-3">
<span class="w-6 h-6 bg-brand-tint inline-block"></span>
<span class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight">هلدینگ ساختمانی ثاخت</span>
</div>
<div class="text-body-sm font-body-sm text-surface-dim">
          شرکت بین‌المللی توسعه ساختمان (سهامی عام) • نماد بورس: ثاخت
        </div>
</div>
<!-- 5-Column Navigation Grid -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
<!-- Column 1: معرفی و ساختار -->
<div class="flex flex-col gap-3">
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-2 border-r-2 border-primary-container pr-2">
            هلدینگ ثاخت
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">معرفی هلدینگ و هیئت‌مدیره</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">پایداری و استانداردهای مهندسی</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">حریم خصوصی و شفافیت مالی</a>
</div>
<!-- Column 2: سبد پروژه‌ها -->
<div class="flex flex-col gap-3">
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-2 border-r-2 border-primary-container pr-2">
            پروژه‌ها
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">پرتفوی پروژه‌های عمرانی</a>
<NuxtLink class="text-body-sm font-body-sm text-brand-tint font-bold" to="/projects/upcoming">پروژه‌های آتی</NuxtLink>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">فرصت‌های پیش‌فروش و سرمایه‌گذاری</a>
</div>
<!-- Column 3: سهام و بازار سرمایه -->
<div class="flex flex-col gap-3">
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-2 border-r-2 border-primary-container pr-2">
            امور سهامداران
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">سامانه سهامداران و کدال</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">مناقصات و مزایده‌ها</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">گزارش‌های ماهانه دیده‌بان</a>
</div>
<!-- Column 4: رسانه و ارتباطات -->
<div class="flex flex-col gap-3">
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-2 border-r-2 border-primary-container pr-2">
            اطلاع‌رسانی
          </h4>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">اخبار و رسانه دیجیتال</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">دیده‌بان ثاخت</a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">تماس و امور مشتریان</a>
</div>
<!-- Column 5: ستاد مرکزی -->
<div class="flex flex-col gap-3 col-span-2 md:col-span-1">
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-2 border-r-2 border-primary-container pr-2">
            دفتر مرکزی
          </h4>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed">
            تهران، خیابان ولیعصر، بالاتر از ظفر، برج اداری ثاخت
          </p>
<p class="text-body-sm font-body-sm text-surface-dim dir-ltr text-right mt-1">
            +۹۸ (۲۱) ۸۸۷۷-۰۰۰۰
          </p>
</div>
</div>
<!-- Legal and Copyright Strip -->
<div class="pt-8 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm font-body-sm text-surface-dim">
<p>© ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.</p>
<div class="flex gap-6 text-label-md font-label-md">
<span class="text-surface-dim">طراحی و مهندسی سیستم بر مبنای استاندارد صنعتی ثاخت</span>
</div>
</div>
</div>
</footer>
</template>
