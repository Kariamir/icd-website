<script setup lang="ts">
/*
 * Chrome lifted out of the approved design at
 * stitch_project_detail_page_template/projects/ (ADR-013). Shared by every
 * route through layouts/default.vue.
 */
</script>

<template>
<footer class="bg-ink text-surface-container-lowest border-t border-border">
<div class="w-full py-space-xl px-space-lg md:px-margin max-w-[1440px] mx-auto">
<!-- Top Grid: Brand Column + 4 Structural Nav Columns = 5 Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-border/20">
<!-- Col 1: Corporate Brand & Profile -->
<div class="lg:col-span-1">
<div class="flex items-center gap-3 mb-4">
<div class="w-8 h-8 bg-primary-container text-surface-container-lowest flex items-center justify-center font-bold text-headline-sm">
              ث
            </div>
<span class="text-headline-sm font-headline-sm text-surface-container-lowest">
              هلدینگ ساختمانی ثاخت
            </span>
</div>
<p class="text-body-sm font-body-sm text-surface-dim leading-relaxed mb-6">
            شرکت بین‌المللی توسعه ساختمان (ثاخت)، بزرگ‌ترین نهاد توسعه املاک و مستغلات بورسی کشور با بیش از سه دهه سابقه پیشتازی در ساخت ابنیه تمدنی.
          </p>
<div class="text-label-md font-label-md text-outline-variant space-y-1">
<div>نماد معاملاتی بورس: <span class="text-brand-tint font-bold">ثاخت</span></div>
<div>شناسه ملی: ۱۰۱۰۰۸۶۶۰۹۵</div>
</div>
</div>
<!-- Col 2: هویت و پورتفو -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            هویت و پورتفو
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/about">
                معرفی هلدینگ و هیئت‌مدیره
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-container-lowest font-bold hover:text-brand-tint transition-colors" to="/projects">
                پرتفوی پروژه‌های عمرانی
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir/financials?group=sustainability">
                پایداری و استانداردهای مهندسی
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 3: سهامداران و بازار سرمایه -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            سهامداران و بورس
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir">
                سامانه سهامداران و کدال
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/media?category=tenders">
                مناقصات و مزایده‌ها
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir/financials">
                حریم خصوصی و شفافیت مالی
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 4: پیش‌فروش و رسانه -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            پیش‌فروش و تحلیل
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/sales">
                فرصت‌های پیش‌فروش و سرمایه‌گذاری
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/media">
                اخبار و رسانه دیجیتال
              </NuxtLink>
</li>
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/ir">
                گزارش‌های ماهانه دیده‌بان
              </NuxtLink>
</li>
</ul>
</div>
<!-- Col 5: تماس و امور مشتریان -->
<div>
<h4 class="text-label-lg font-label-lg text-surface-container-lowest mb-4 border-r-2 border-primary-container pr-2">
            ارتباطات سازمانی
          </h4>
<ul class="space-y-2.5 text-body-sm font-body-sm mb-4">
<li>
<NuxtLink class="text-surface-dim hover:text-brand-tint transition-colors" to="/contact">
                تماس و امور مشتریان
              </NuxtLink>
</li>
</ul>
<div class="bg-surface-container-low/10 border border-border/30 p-3 text-label-md font-label-md text-surface-dim">
<div class="text-surface-container-lowest font-bold mb-1">مرکز پاسخگویی متمرکز:</div>
<div class="text-left font-mono text-brand-tint" dir="ltr">۰۲۱ - ۸۸۶۶۴۴۰۰</div>
<div class="mt-1 text-[11px] text-outline-variant">تهران، خیابان ولیعصر، برج ثاخت</div>
</div>
</div>
</div>
<!-- Bottom Bar: Copyright & Compliance -->
<div class="pt-8 flex flex-col md:flex-row items-center justify-between text-body-sm font-body-sm text-surface-dim gap-4">
<p class="text-center md:text-right">
          © ۱۴۰۳ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بین‌المللی توسعه ساختمان (ثاخت) می‌باشد.
        </p>
<div class="flex items-center gap-6 text-label-md font-label-md">
<span class="text-outline-variant">سامانه ثبت و بازرسی پروژه‌ها</span>
<span class="inline-block w-1.5 h-1.5 bg-primary-container"></span>
<span class="text-outline-variant">طراحی صنعتی مهندسی شده</span>
</div>
</div>
</div>
</footer>
</template>
