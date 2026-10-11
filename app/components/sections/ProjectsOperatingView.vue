<!--
  Ported from the approved design at
  stitch_project_detail_page_template/projects_operating/ (ADR-013).

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
<!-- Top Navigation Header (Docked full-width top, based on Shared Components JSON) -->
<header class="sticky top-0 z-50 bg-surface-container-lowest border-b border-border">
<div class="flex justify-between items-center w-full px-space-lg md:px-margin max-w-[1440px] mx-auto h-20">
<!-- Right: Brand Logo & Navigation Links (RTL anchor) -->
<div class="flex items-center gap-10">
<a class="text-headline-md font-headline-md text-ink tracking-tight flex items-center gap-3" href="#">
<span class="w-3.5 h-3.5 bg-primary-container inline-block"></span>
          هلدینگ ساختمانی ثاخت
        </a>
<nav class="hidden lg:flex items-center gap-8">
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">درباره ثاخت</a>
<!-- Active State: پروژه‌ها matches primary page intent -->
<a class="text-label-lg font-label-lg border-b-2 border-primary-container text-primary-container font-bold pb-1" href="#">پروژه‌ها</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">فروش و پیش‌فروش</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">دیده‌بان ثاخت</a>
<a class="text-label-lg font-label-lg text-ink hover:text-primary-container pb-1 transition-colors duration-150" href="#">رسانه ثاخت</a>
</nav>
</div>
<!-- Left: Actions & Investor CTAs (RTL trailing edge) -->
<div class="flex items-center gap-4">
<!-- Language & Search Icons -->
<button aria-label="جستجو" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"  /></svg>
</button>
<button aria-label="تغییر زبان" class="p-2 text-ink hover:bg-surface-container-high transition-colors duration-150">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"  /></svg>
</button>
<span class="h-5 w-[1px] bg-border mx-1 hidden sm:block"></span>
<!-- Secondary Action -->
<a class="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-border text-label-lg font-label-lg text-ink hover:bg-surface transition-colors duration-150" href="#">
          ورود سهامداران
        </a>
<!-- Primary Action -->
<a class="inline-flex items-center justify-center px-5 py-2.5 bg-primary-container text-surface-container-lowest text-label-lg font-label-lg hover:bg-brand-blue-deep transition-colors duration-150" href="#">
          مشاوره و تماس سریع
        </a>
</div>
</div>
</header>
<main>
<!-- HERO SECTION -->
<section class="relative w-full h-[620px] bg-ink overflow-hidden border-b border-border">
<!-- Full-bleed photograph of a delivered operational flagship development -->
<div class="absolute inset-0 w-full h-full bg-cover bg-center" data-alt="A striking wide exterior architectural photograph of a towering modern glass and honed white stone commercial headquarters complex fully operational at twilight. Elegant architectural ambient lighting illuminates the precision facade, plazas, and clean structural geometry against a deep dusky sky. The overall atmosphere conveys corporate solidity, engineering mastery, and institutional prestige using a disciplined palette of deep navy, concrete gray, and crisp architectural blue accents." style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCg8zqNgYIysAn4Hu8BgqiU8GAsxe2bC57fqdGq3Moqx0uMiDyvfUDXXfXYtwZ25r-ASUossaBwOPFkMA27ZjvD1So_U_9KxiDQQwucg9K95C00vMlKNOd_hsf7unaizm0bwH_LmnvTSkKKb1_HTfsFCVXzx238f0zjBH2lRPuK8Z2wyw1FUubnYSdv6btEp0FDP7i1KdzjgU-PBX00mpoasa4SqwNn4g0BJgYIQkjQWatKe1jjAOgSXg')">
</div>
<!-- Scrim overlay (Dark #041C2C at 65% for structural hierarchy) -->
<div class="absolute inset-0 bg-ink/65"></div>
<!-- Architectural grid overlay lines -->
<div class="absolute inset-0 pointer-events-none opacity-10">
<div class="max-w-[1440px] mx-auto h-full px-space-lg md:px-margin border-x border-surface-container-lowest"></div>
</div>
<!-- Hero Content (Positioned low and right over image) -->
<div class="relative z-10 max-w-[1440px] mx-auto h-full px-space-lg md:px-margin flex flex-col justify-end pb-16">
<div class="max-w-3xl">
<!-- Back Link / Parent Category indicator -->
<div class="mb-5">
<a class="inline-flex items-center gap-2 text-brand-tint hover:text-surface-container-lowest text-label-lg font-label-lg transition-colors duration-150" href="#">
<svg class="inline-block size-[1.25em] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"  /></svg>
<span>مشاهده تمامی پروژه‌ها</span>
</a>
</div>
<h1 class="text-headline-lg md:text-headline-xl font-headline-lg md:font-headline-xl text-surface-container-lowest mb-4 tracking-tight leading-tight">
            پروژه‌های در حال بهره‌برداری
          </h1>
<p class="text-body-lg font-body-lg text-brand-tint/90 max-w-2xl font-light leading-relaxed">
            مدیریت دارایی‌ها، مجتمع‌های تجاری و گردشگری فعال هلدینگ بین‌المللی توسعه ساختمان
          </p>
</div>
</div>
</section>
<!-- PROJECT GRID SECTION -->
<!-- Editorial, museum wall label aesthetic, zero-radius cards, generous whitespace -->
<section class="w-full bg-surface-container-lowest py-20">
<div class="max-w-[1440px] mx-auto px-space-lg md:px-margin">
<!-- Grid of Project Cards (3 columns on desktop, 2 on tablet, 1 on mobile) -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<!-- Card 1 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="برج‌های مسکونی و تجاری رویای کیش" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Striking perspective photograph of the completed Kish Dream twin residential and commercial towers standing majestically under bright island sun. Crisp glass curtain walls reflect the Persian Gulf horizon with stark modernist concrete balconies and precision engineering lines. Clean white aesthetic with deep navy structural contrasts and realistic daylight architectural rendering." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtu8g6MIiDijU6W6IsWzOUyWQXPnFwPVGj4eYkS0sWgHJ9_mzPsEh-rg1Ni3mZ-1GJofhw2y61aV_yC7iMM3r77mBmldsc8oGZx264m7b5e4UpglVLj-mEw6ET1WQHc3v9RmObgCwMM5pkXHHHTkT_0h_2HZXtHILzGzK1kRanc81IZuZ7WUowqiXXQMkDtJspFEfUXbKLci3FaaoSsWdzS9NzKH4vievfn_coqOFr3TbqjbgpXr-fxQ" />
</div>
<!-- Museum Wall Label Typography Block -->
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                برج‌های مسکونی و تجاری رویای کیش
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                جزیره کیش
              </p>
</div>
</article>
<!-- Card 2 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع گردشگری و اقامتی ساحل نوشهر" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Wide exterior shot of a fully operational coastal luxury hospitality resort complex in Nowshahr nestled between the Caspian Sea shoreline and forested northern mountains. Sophisticated timber louvers, expansive modern glass terraces, and manicured linear gardens. Architectural realism highlighting stone masonry and clear daytime coastal atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8bD42dLzvXtAHdS3iT6Dv9k34RzQTolUF5pR2nq3pTfEMEYlmp2P5GlwSkTXobCSOhYhkSoNcqHr5tY8CCo_bVCkJ2Cv9ST9Gq_lsPtkl-QEarhEh9qHZbM0KIdGsTYNCNfBuj89TVQqBD9vShjSrg5jImJWb8TJbB_ULuLI2PsO8lE1Vzf1Q4j9opiemBul0mkR2KUbB4YvbDVIAy4jvvMrLBvsTvgZqbLfXxLoEduKPoBaRmeFwxw" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع گردشگری و اقامتی ساحل نوشهر
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مازندران، نوشهر
              </p>
</div>
</article>
<!-- Card 3 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مرکز تجاری اداری بین‌المللی تبریز" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="High-angle architectural photography of a bustling premium administrative and shopping landmark center in Tabriz. Smooth granite facade with geometric atrium skylights and pristine pedestrian concourses under clear northern light. The composition emphasizes engineering precision, sharp planar facades, and corporate modernism." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTETxcZT8GOl5oviCB3_vheO0MpknySdbc2f9m2pJQ8GhHDzLGNkEJBsKLtT6csxX78zJsZ82ZC-ctBip7I2MiZPVnVU9K2h8XjjDq876BhBJpBxa2hXZkHq9QrOIdN0sIDrId5K5zjkRaZPcKws1JMTqZKf5tDUsRxTD86SPbLPkBAbWLgo2n4s43icx3LpkcReRriKO4BEVc2CvNYIRK0hD1fOXT25v33WiTbzCg6TFReTQCQm8EAA" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مرکز تجاری اداری بین‌المللی تبریز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تبریز، بلوار ۲۹ بهمن
              </p>
</div>
</article>
<!-- Card 4 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="برج اداری مرکزی ثاخت" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Monolithic modern office tower in downtown Tehran captured on a bright morning with sharp directional sunlight. Polished natural travertine and deep tinted architectural glass panels convey corporate authority and permanence. Crisp minimalist angles with stark urban landscaping and clean paving." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtiznQuARwewvu3stxlkqDusqBmD6R88KvdyjJzXhi2lD1_OTz4FBdN9m6h9MRQdxWhzGe4czhi8Y16zlAv0ZQLwkoqP2J4NTQVdZi2NAbDZ18E3V2SrtoCNWw92-3HZZvjZo_T7d-AgeC3cPSUGwTztbkzg57twcd2fvIW2R0U2TCJQkZN2jZU0ynLOh6Uv6tiqy0RGFiSK6W5RZZeu94boweqAvyEnxa8GC-WZ-q6K_GXtF36Xn0cw" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                برج اداری مرکزی ثاخت
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                تهران، خیابان ولیعصر
              </p>
</div>
</article>
<!-- Card 5 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع مسکونی زاینده‌رود" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Architectural photograph of a delivered upscale residential high-rise cluster in Isfahan overlooking city parks. Terraced cantilevered balconies crafted from fair-faced concrete and high-performance glass. Even midday lighting revealing fine textures, planar alignment, and institutional construction caliber." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYMp25_rbwcxbzzHfKTn6vk9mAwmPX9IB0jdDJsXeQDxLEmIPwW16407Grcr8rqA-6lGTc0WqU5yKqT-TkBZwLoE065oFA8TzH2HMXFCI-XCO8RukcrK6SR3DFA_PeROykCvPYPJBuoYiGxwy2rTRdczKiPoRvgd02_Y7KCEFDOs4lhL4OkCdhEl359s_DuzBjgMCu3LSagVnl42q9DqmlaLWUjgW_nkWLdpA64KK9x4wrWDmfRuHJXg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع مسکونی زاینده‌رود
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                اصفهان، مشتاق سوم
              </p>
</div>
</article>
<!-- Card 6 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجتمع تجاری و تفریحی پارس" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Dusk shot of an expansive mixed-use retail and dining destination in Shiraz with illuminated civic water features in the foreground. Clean geometric steel columns, planar canopy roofs, and warm interior lighting shining through multi-story glass curtain walls. Engineering precision and high-contrast night aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9Q5jm5VFqv_zVWrhokXED6nTA9a2AaNgC42eFsalz7YS6tgyrEdo_oyGiCdAtJi6KeUd4YMZHn-ygJmZOBXTzm468UWPhttV4nZtrJPZShE3CZE8KNZB1bw_pe1WMsYWtWkCFj_6ReLiRSdugsQ6c9WHKBljPVF9-_hhUiOEL-BEqa0kwjX4VTD_uH3VIqWyTSbfDKbQPsSetiG47755pjPqaQ1xib7lq15l4SPJIiCZoV9qP2KiWdw" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجتمع تجاری و تفریحی پارس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                شیراز، خیابان عفیف‌آباد
              </p>
</div>
</article>
<!-- Card 7 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="هتل و مجتمع اقامتی بین‌المللی مشهد" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Street-level architectural viewpoint of an active five-star hospitality tower in Mashhad. High-grade beige limestone cladding paired with double-glazed dark bronze framing. Soft afternoon light highlighting pure monolithic vertical lines, grand entrance portico, and refined masonry craft." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6RZJzjNZcnkGLDMKzA5M_I_vfcrlA-m7UqnP-n3L2PTx5FRmtI-RI7pMhob5PN2gTD5u6XTMF3x6EZFUchXfnGaNSDd30WsExXHOvf0au_d5ANUEP9SzfPdA56RCF4iqIXw-XxI60RGHRShxtTPFhCYmGOxdIiS5XEnUJum8-fOYL2VnyYParD5jk_OrwFTarrPwYr_lQv0R-GhNaUjPkDoIuhzXef43dG4HQ40FNcZT1OAnVC_Nkpg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                هتل و مجتمع اقامتی بین‌المللی مشهد
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                مشهد، بلوار امام رضا
              </p>
</div>
</article>
<!-- Card 8 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="شهرک اداری و فناوری البرز" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Wide perspective of an operational advanced technology and logistics business park in Alborz province. Modern industrial steel frames, expansive white insulated sandwich paneling, and smooth dark asphalt transit zones. Bright ambient sunlight emphasizing efficiency, architectural clean lines, and corporate scale." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDLrEAD6O213xGWxHKYCdtYUqJwi_4owqGhkyXj0axNNLxET8KYqu2zbe0ze3LGTDYOhwJPYUsvbjSYN4A_BxkNuPVO6higsKL5_HlvykGhFPgh-BTUr3gcujokDp3iDwAqn3ZfdQQVbssp2es9khv54Nr3xaDx4LLnwypXI90m9z43_6WVLzKEK0MeL8V6usAi_bQi8t6iFg5D3X6lrkN3hrNQ9df3wKlyz0g1dAL-ST7LBXdTVsy-w" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                شهرک اداری و فناوری البرز
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                کرج، منطقه ویژه پیام
              </p>
</div>
</article>
<!-- Card 9 -->
<article class="group bg-surface-container-lowest border border-border flex flex-col transition-colors duration-150 hover:border-primary-container">
<div class="relative w-full aspect-[4/3] overflow-hidden bg-surface">
<img alt="مجموعه مسکونی مروارید خلیج فارس" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" data-alt="Modern seaside residential enclave in Bandar Abbas showing completed blocks with smart shading louvers tailored to the warm climate. Pristine white stucco, sharp horizontal eaves, and reflecting pool landscapes under high blue sky. Professional corporate architectural imagery with industrial rigor." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKRVAH-Sd1qKdn2KObYX51pIfg1X3-Dslra_kdTSqN8P4U4iZs-_VnjvQ6XFSsJCVm1lYODmpneeuqN1TaYer3TF7C4CDrx4bl-OICXv8ddSiGn9lMuWFJQj2SrIWNshaxOU4MMJICke-fbg3aE_ldX1z3sQZfoqmDVMFeRvErlx1QymXNDAcvcmib_vsvJrwVIym8V3DVo2AbwQvgbM-WfABnslIG2XRo7PZXMXhrTpscURmuw7lTvg" />
</div>
<div class="p-6 bg-surface-container-lowest border-t border-border">
<h2 class="text-headline-sm font-headline-sm text-ink mb-2 group-hover:text-primary-container transition-colors duration-150">
                مجموعه مسکونی مروارید خلیج فارس
              </h2>
<p class="text-body-sm font-body-sm text-secondary">
                بندرعباس، بلوار ساحلی
              </p>
</div>
</article>
</div>
</div>
</section>
</main>
<!-- Footer (Based on Shared Components JSON and Style Guidance) -->
<footer class="bg-ink border-t border-border w-full">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Section: Brand Statement & Corporate Accreditation -->
<div class="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-surface-variant/20">
<div class="md:col-span-5">
<div class="flex items-center gap-3 mb-4">
<span class="w-4 h-4 bg-brand-tint inline-block"></span>
<span class="text-headline-md font-headline-md text-surface-container-lowest tracking-tight">
              هلدینگ ساختمانی ثاخت
            </span>
</div>
<p class="text-body-md font-body-md text-surface-dim max-w-md leading-relaxed">
            شرکت بین‌المللی توسعه ساختمان (ثاخت)، پیشرو در مدیریت طرح‌ها، ساخت مجتمع‌های کلان‌مقیاس عمرانی و ارزش‌آفرینی پایدار در بازار سرمایه ایران.
          </p>
</div>
<div class="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-6 text-surface-dim">
<div class="border border-surface-variant/30 p-4 min-w-[180px]">
<span class="block text-label-md font-label-md text-surface-dim mb-1">نماد بورس اوراق بهادار</span>
<span class="text-headline-sm font-headline-sm text-surface-container-lowest">ثاخت (بورس تهران)</span>
</div>
<div class="border border-surface-variant/30 p-4 min-w-[180px]">
<span class="block text-label-md font-label-md text-surface-dim mb-1">مرکز پاسخگویی سهامداران</span>
<span class="text-headline-sm font-headline-sm text-brand-tint" dir="ltr">+۹۸ ۲۱ ۸۸۸۸ ۰۰۰۰</span>
</div>
</div>
</div>
<!-- 5-Column Institutional Navigation Links (Exact labels from JSON) -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-surface-variant/20">
<!-- Col 1 -->
<div class="flex flex-col gap-3">
<h3 class="text-label-lg font-label-lg text-surface-container-lowest mb-1">درباره و پروژه‌ها</h3>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            معرفی هلدینگ و هیئت‌مدیره
          </a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            پرتفوی پروژه‌های عمرانی
          </a>
</div>
<!-- Col 2 -->
<div class="flex flex-col gap-3">
<h3 class="text-label-lg font-label-lg text-surface-container-lowest mb-1">امور سهامداران</h3>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            سامانه سهامداران و کدال
          </a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            فرصت‌های پیش‌فروش و سرمایه‌گذاری
          </a>
</div>
<!-- Col 3 -->
<div class="flex flex-col gap-3">
<h3 class="text-label-lg font-label-lg text-surface-container-lowest mb-1">قوانین و استانداردها</h3>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            مناقصات و مزایده‌ها
          </a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            پایداری و استانداردهای مهندسی
          </a>
</div>
<!-- Col 4 -->
<div class="flex flex-col gap-3">
<h3 class="text-label-lg font-label-lg text-surface-container-lowest mb-1">مرکز رسانه و پایش</h3>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            اخبار و رسانه دیجیتال
          </a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            گزارش‌های ماهانه دیده‌بان
          </a>
</div>
<!-- Col 5 -->
<div class="flex flex-col gap-3">
<h3 class="text-label-lg font-label-lg text-surface-container-lowest mb-1">ارتباط و شفافیت</h3>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            تماس و امور مشتریان
          </a>
<a class="text-body-sm font-body-sm text-surface-dim hover:text-brand-tint transition-colors duration-150" href="#">
            حریم خصوصی و شفافیت مالی
          </a>
</div>
</div>
<!-- Bottom Bar / Copyright -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-surface-dim text-body-sm font-body-sm">
<p class="leading-relaxed">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6">
<span class="text-label-md font-label-md text-surface-dim">ISO 9001:2015</span>
<span class="w-1 h-1 bg-surface-dim rounded-full"></span>
<span class="text-label-md font-label-md text-surface-dim">ISO 14001:2015</span>
<span class="w-1 h-1 bg-surface-dim rounded-full"></span>
<span class="text-label-md font-label-md text-surface-dim">ISO 45001:2018</span>
</div>
</div>
</div>
</footer>
</template>
