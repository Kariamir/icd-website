<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_completed/ (ADR-013).

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
<!-- ================= TOP NAVIGATION BAR (SHARED COMPONENT) ================= -->
<header class="w-full bg-surface-container-lowest border-b border-border sticky top-0 z-50">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Holding Identity / Brand Logo -->
<div class="flex items-center gap-space-lg">
<a class="text-headline-md font-headline-md text-ink tracking-tight flex items-center gap-3" href="#">
<span class="w-6 h-6 bg-primary-container inline-block"></span>
<span>هلدینگ ساختمانی ثاخت</span>
</a>
<!-- Desktop Navigation Links (Intent: 'پروژه‌ها' is active) -->
<nav class="hidden lg:flex items-center gap-6 mr-8">
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            درباره ثاخت
          </a>
<NuxtLink class="text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container font-bold pb-1" to="/projects">
            پروژه‌ها
          </NuxtLink>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            فروش و پیش‌فروش
          </a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            دیده‌بان ثاخت
          </a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors" href="#">
            رسانه ثاخت
          </a>
</nav>
</div>
<!-- Left: Actions & Utility Cluster (RTL: End Side) -->
<div class="flex items-center gap-4">
<!-- Trailing Icon Actions -->
<div class="flex items-center text-ink gap-2 border-l border-border pl-4">
<button aria-label="Search" class="p-2 hover:bg-surface-container-high transition-colors text-ink" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="Language" class="p-2 hover:bg-surface-container-high transition-colors text-ink flex items-center gap-1 text-label-md font-label-md" type="button">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
<span class="font-bold">FA</span>
</button>
</div>
<!-- Trailing Secondary Action -->
<a class="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-border text-label-lg font-label-lg text-ink hover:bg-surface transition-colors" href="#">
          ورود سهامداران
        </a>
<!-- Trailing Primary Action -->
<a class="inline-flex items-center justify-center px-5 py-2.5 bg-primary-container text-surface-container-lowest text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<!-- ================= MAIN CONTENT ================= -->
<main class="flex-grow w-full">
<!-- 1. HERO SECTION -->
<section class="relative w-full h-[460px] md:h-[540px] bg-ink overflow-hidden border-b border-border">
<!-- Masterpiece Architectural Photograph with Scrim -->
<div class="absolute inset-0 w-full h-full">
<img class="w-full h-full object-cover object-center" data-alt="An expansive, dramatic wide-angle architectural photograph of the completed Tehran International Tower standing majestically in soft dusk light. The monolithic concrete and structural glass facade reflects clean geometric lines against a serene slate-gray and navy twilight sky. The framing is disciplined and institutional, highlighting engineering precision, crisp edges, and finished grand urban landscaping at the base." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn8mdV_-E3sFMDDbjxuL5lrXyh4ZvqhZ683xZcLxfyNpIXbrBmdsTWW6VR022Y7CHquyIs9iJHN6ZTXXxJKbjOQ-nxtJgLDpStVs-l1vojsAYSL9K4s7oFHMoBf2eE66ZMQ9rk5P1K42HlFCZKeCPTiNedLwla5FSbG5xvJf-44ag3NtCt82YY7GujjdnM-w92kL0OpeQl7uT4S9PbLhycCox2sV160-YCkD_5CypLx4OxBhneDV-uCA" />
<!-- Deep Ink Scrim Overlays -->
<div class="absolute inset-0 bg-ink/60"></div>
<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
</div>
<!-- Hero Content Anchor: Low and Right -->
<div class="relative max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-end pb-12 md:pb-16">
<!-- Back Navigation Cue to /projects -->
<div class="mb-6">
<NuxtLink class="inline-flex items-center gap-2 text-surface-container-lowest/80 hover:text-surface-container-lowest text-label-lg font-label-lg transition-colors group" to="/projects">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
<span>بازگشت به تمام پروژه‌ها</span>
</NuxtLink>
</div>
<!-- Title & Subtitle Cluster -->
<div class="max-w-3xl">
<h1 class="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-surface-container-lowest tracking-tight mb-3">
            پروژه‌های تکمیل‌شده
          </h1>
<p class="text-body-md md:text-body-lg font-body-lg text-surface-container-highest/90 font-light max-w-2xl leading-relaxed">
            کارنامه اجرایی و نمادهای تحویل‌شده معماری ملی
          </p>
</div>
</div>
</section>
<!-- 2. PROJECT GRID SECTION -->
<!-- Architectural Precision Grid (Museum Wall Label Aesthetic) -->
<section class="w-full py-16 md:py-24 bg-surface-container-lowest">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Strict Editorial Bento / Modular 3-Column Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-8 md:gap-y-12">
<!-- Card 1: برج بین‌المللی تهران -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Modern high-rise skyscraper of the Tehran International Tower photographed from a precise low angle under bright natural morning light. The concrete structural columns and reflective glass panels exhibit sharp orthogonal discipline, perfectly exposed without distortions, set against a pristine cool sky. Institutional architectural photography documenting completed civil development." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKtwSm6p_uyKoAtPjuvirxEHPjRY0y4pyxeuhSrqzHPL-x_flG6a-IvjoClHvl3SGeMxWHE3U6oyLICmA1g5Qtg4lmGzMuLhQwICVKzE63iriETGBKNqK0eK2bHYXnhT1LAiwCp_DWV3cs2R2acVzSBiBfYy4G6Zo5c-9gGNngSBaIFnVzYtSZkonilEAKa7UzxBoLP8LGvWUVpTUjm3wQnr4PdEzNT92Gjq1uzwAWhf4_znb1FbSn7Q" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج بین‌المللی تهران
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، یوسف‌آباد
              </p>
</div>
</article>
<!-- Card 2: مجموعه مسکونی تجاری آ.اس.پ -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Editorial daytime view of the ASP residential and commercial towers in Tehran showing brutalist concrete geometry and sweeping pedestrian plazas. Clear sunlight casts crisp structural shadows along the modular balconies and architectural grid. Finished pristine infrastructure and urban landscaping in a corporate civil portfolio style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQVEKdhZglAtcLj_w38oXeFciEEUtIQRwtRZEDURhy16zFedhkzRMqnW6asXt82I8ceSC91bAesgS08yFmODMbE7BY2zgCd7KoXfoVDNXmGJk5vTnsVPeYYwJB_4sjdmlFa76r0tBuG0fKgEmrTM1ikfZmUkMlkIwrSx9K0ltaiOq83SfqzvDz2_G1xb3BOGmU-yxfyxDT3wozmnyWZpdhUrcLXQ9aZwKJeuVCvhyTtbm-C0yISEozrA" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی تجاری آ.اس.پ
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، شیخ بهایی
              </p>
</div>
</article>
<!-- Card 3: برج اداری مرکزی ثاخت -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Straight-on elevation capture of a corporate headquarters glass-and-steel building facade on Valiasr Street. The finished structure exhibits sharp curtain walls, stainless steel mullions, and high-spec architectural engineering under balanced overcast lighting. Minimalist institutional aesthetics conveying operational stability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjddqXsdCyGSnwGwm0PJ2PaoMiL6l-eVYxkSLZYlsHlYI-3zq1lBOACjqZlyKVF3Va5fWPDWMxDW3RinJh0mGPAFfoPLaDLA3tLlhOSedZgtmhD1PsB7WemURih7OitU8nwa9iSasRD0TvVGn5AVbzvAVGjjSB3dzIyiGxXw8yQnj-lSFaO3EqXKDONdPRA32USmdFCkavyzLzQhbczFIpJ245LDRe4LHqiME2bSZlpFFBDyIU8OMXwg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج اداری مرکزی ثاخت
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، خیابان ولیعصر
              </p>
</div>
</article>
<!-- Card 4: مجتمع تجاری و تفریحی پارس شیراز -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="An expansive multi-level modern commercial lifestyle complex with travertine stone cladding and expansive glass entrances on Afif-Abad street in Shiraz. Architectural photography showcasing completed structural handoff, polished exterior stonework, clean pathways, and dignified modern lines in warm midday lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_h0apSmrxVrfjBK1-19JRsQNrcUwnqLO_tA9bT1YLWahN_EKm7UbtPUsxV1xh7skeqkF2ihuw38KEuYLZoY8DwjoHE7zCsUnqsLWgPfljgLP7J9QCUsD9F2qyuNMFRJV1lmVEqORNqHkb5L-KM9nPLpA6rz-depsBld9Twf3tmTYP8n8owwm_NE5dtgU1gB7a4YAf3LLlj3ZG80RRIiAHIBXAIMf6dnliOnAoi7YO-WIOOwO84VYztw" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجتمع تجاری و تفریحی پارس شیراز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                شیراز، خیابان عفیف‌آباد
              </p>
</div>
</article>
<!-- Card 5: مجتمع مسکونی رویال کیش -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Delivered high-end waterfront residential architecture on Kish Island featuring pure white monolithic balconies and panoramic glazed terraces facing the calm Persian Gulf. Crisp, clear sunny atmosphere highlighting pristine coastal concrete craft, straight edges, and refined institutional building delivery." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3aS7w7XTzzjA45Rx0gzhMbmqJP6I6Ldhg6yuN_wtb5hCuX5sN05hEvuI9cN7ykFO6lrjpKZP7jhLMACTCrlmZ_ub-Zs8QeMGVRa3FBKDqVhT3lVekyJT5YQcsswVV-FlZiOM5gWMXkqIQkPqUxbROW2Ay7XlJ4bLQD_Fo3a24GQIGRNpz-x0maTdwKXm_Nc6MLaHaTrTnkHfrNq692O9COQa-wtNg-YsB7-Di9rlkTmicJ0ZfC1xtdg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجتمع مسکونی رویال کیش
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                کیش، نوار ساحلی مرجان
              </p>
</div>
</article>
<!-- Card 6: مرکز همایش‌ها و برج میلاد اصفهان -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Architectural exterior view of a delivered modern civic convention center and corporate tower complex in Isfahan. High-contrast geometric precast concrete panels juxtaposed with tinted industrial glazing under deep blue sky. Utilitarian, rigorous engineering portfolio aesthetics celebrating completed execution." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDUW5Qdl8bUyJwUPUkbjLNIibSwJfgOkGYYpxtgbL0StNrDFUn2GxkAdhk53FNuFAHapgSz6BC8HNxBqEmkIjK13983tJw0mHeeRnsrB2N_Rvj6ZxtOeOTUtaG8cdFBpy34gCmxb9_gJbe9AfUWCfsCobe9QWJUqCqJYK7QJ_fQTf17vYVbQHrn9vS0N-42NFL-gSGnVr4YfHnAG6jcf97xHqh_lm5teZ_DBdY8WToHnQfvxqyqub4Rg" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج تجاری اداری سپهر اصفهان
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، خیابان چهارباغ بالا
              </p>
</div>
</article>
<!-- Card 7: برج مسکونی درروس نگین -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="A completed luxury residential tower in the Darrous district of northern Tehran, featuring crisp fluted stone pilasters, oversized bronze-framed windows, and a manicured perimeter entrance. Photographed in clear evening illumination emphasizing solidity, timeless construction quality, and absolute structural precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzXeLdw0kJW7A0X7PbyYTXSX5VG9nuBVvwPA4-kRHSSpXwsf4Oatd5HWVoqkdRKzM_Cc13xSoIvF7RoMmHpJZk-lIc6VYWW-oXQqekB456AZcfzy1Ea1nNi4FgGEyHPwzQEYdI8GneHoQ8u3OYBl1InvEjNJ_GyOYugIhDX9znzU28po7tCYVzajebySMjJW0J9mk7OIyo29rurFdd2eJ07w8flJu38-1P-zmEvwLdfRZQbNy-riM6aA" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                برج مسکونی نگین دروس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، دروس، خیابان یارمحمدی
              </p>
</div>
</article>
<!-- Card 8: هتل و مرکز اقامتی کوهسار مشهد -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Broad facade photograph of a newly completed modern institutional hotel and mixed-use complex in Mashhad. Massive stone blocks integrated with structured thermal curtain glass walls. Straight horizon, zero barrel distortion, clean geometric lines reflecting authoritative civil development standards." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiuaDLeVk9xiwtc-qAE25Tlz2gB0SbAqM4k0HKdh9pWhBd2U4KDII5QDvI9GFVcLk9mF0MMcUheyktdY0_C-FPY6kC4zuwxwWl7zVsip2HZawkSjWpg_2_8QcK1LiftZJxnqtlyTtpI-fxquwS0Hri-pfD0NIPFic_vFvoXeIBaroS9u8ujDCaJPp5SiVMKQYlAv1AzrunuTHgp3sRKftgAYAZGnq5YLQm-pkbkHifmQOD7zqZUDseBQ" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه اقامتی و تفریحی کوهسار
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مشهد، بلوار کوهسنگی
              </p>
</div>
</article>
<!-- Card 9: شهرک ساختمانی زاگرس تبریز -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150">
<div class="relative w-full aspect-[4/3] bg-surface overflow-hidden border-b border-border">
<img class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" data-alt="Wide panorama of completed multi-block urban residential development in Tabriz. Synchronized modular blocks, clean paved access arteries, finished municipal green corridors, and crisp engineering execution. Natural overcast lighting highlighting high-density concrete craftsmanship and urban permanence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs8QMjeKHe8NrPQ0mHcXF4XIqWIV0wWlEyo2aSDdeTdZFd30ZIFqX_3yv9GF39j5bD-3vQq-SxJ4tTdl6Z7PSEU8Gy2crL0VndhS960Qe7v6gIWvEn4JsAWMCon8ZiMzpa5Ox2m-Y1pmdXL7IafERXzJUFnDt0QVLJ4CN1Ee7lVoTp_YvrBlFc08ar6INwGywHaJ2AafdMZkW6e5PIoaZB1gDWUJnr0QgAJE6wqmRgKx6asOFYpnW2UQ" />
</div>
<div class="p-6 md:p-7 flex flex-col justify-between bg-surface-container-lowest">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors">
                مجموعه مسکونی زاگرس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تبریز، شهرک ائل‌گلی
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- ================= FOOTER (SHARED COMPONENT - 5 COLUMNS) ================= -->
<footer class="w-full bg-ink text-surface-container-lowest border-t border-border mt-auto">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Section: Holding Name & Mission Statement -->
<div class="pb-10 mb-10 border-b border-secondary/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div>
<div class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight flex items-center gap-3 mb-2">
<span class="w-5 h-5 bg-primary-container inline-block"></span>
<span>هلدینگ ساختمانی ثاخت</span>
</div>
<p class="text-body-sm font-body-sm text-surface-variant max-w-xl">
            شرکت بین‌المللی توسعه ساختمان (سهامی عام)؛ پیشگام در مهندسی، انبوه‌سازی و ارتقای استاندارد پروژه‌های زیربنایی ملی ایران.
          </p>
</div>
<div class="flex items-center gap-4">
<a class="px-4 py-2 border border-secondary text-label-md font-label-md text-surface-container-lowest hover:border-brand-tint hover:text-brand-tint transition-colors" href="#">
            سامانه جامع کدال (بورس تهران)
          </a>
<a class="px-4 py-2 bg-primary-container text-surface-container-lowest text-label-md font-label-md hover:bg-brand-blue-deep transition-colors" href="#">
            درگاه شفافیت و مالی
          </a>
</div>
</div>
<!-- 5-Column Navigation Blueprint -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
<!-- Column 1: ارکان هلدینگ -->
<div>
<h3 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            ارکان هلدینگ
          </h3>
<ul class="space-y-2.5">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                معرفی هلدینگ و هیئت‌مدیره
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                پرتفوی پروژه‌های عمرانی
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                سامانه سهامداران و کدال
              </a>
</li>
</ul>
</div>
<!-- Column 2: سرمایه‌گذاری و عرضه -->
<div>
<h3 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            سرمایه‌گذاری و عرضه
          </h3>
<ul class="space-y-2.5">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                مناقصات و مزایده‌ها
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                پایداری و استانداردهای مهندسی
              </a>
</li>
</ul>
</div>
<!-- Column 3: پایش و نظارت -->
<div>
<h3 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            پایش و گزارشات
          </h3>
<ul class="space-y-2.5">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                اخبار و رسانه دیجیتال
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                گزارش‌های ماهانه دیده‌بان
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                حریم خصوصی و شفافیت مالی
              </a>
</li>
</ul>
</div>
<!-- Column 4: امور مشتریان و دفاتر -->
<div>
<h3 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            ارتباطات سازمانی
          </h3>
<ul class="space-y-2.5">
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                تماس و امور مشتریان
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                دفتر مرکزی: تهران، خ. ملاصدرا
              </a>
</li>
<li>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors" href="#">
                تلفن ویژه: ۸۸۷۷۰۹۰۹-۰۲۱
              </a>
</li>
</ul>
</div>
<!-- Column 5: شاخص‌های بورس و گواهینامه‌ها -->
<div>
<h3 class="text-headline-sm font-headline-sm text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            شاخص‌های بازار
          </h3>
<div class="bg-secondary/20 p-3 border border-secondary/40 space-y-2">
<div class="flex justify-between items-center text-label-md font-label-md">
<span class="text-surface-variant">نماد بورسی:</span>
<span class="font-bold text-surface-container-lowest">ثاخت</span>
</div>
<div class="flex justify-between items-center text-label-md font-label-md">
<span class="text-surface-variant">بازار:</span>
<span class="text-brand-tint">بورس اوراق بهادار تهران</span>
</div>
<div class="flex justify-between items-center text-label-md font-label-md">
<span class="text-surface-variant">وضعیت نماد:</span>
<span class="text-status-success font-semibold">مجاز - معامله</span>
</div>
</div>
</div>
</div>
<!-- Bottom Copyright & Financial Disclaimers -->
<div class="pt-8 border-t border-secondary/30 flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm font-body-sm text-surface-dim">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6">
<span class="text-label-md font-label-md text-surface-variant">طراحی سامانه بر مبنای راهبرد جامع معماری صنعتی</span>
</div>
</div>
</div>
</footer>
</template>
