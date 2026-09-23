# ICD 3D (ثاخت) — دستورالعمل پروژه

این وب‌سایت یک Nuxt 4 + WPNuxt (WordPress headless) است — پیش از این React/Vite بود؛ این مهاجرت با تایید صریح مالک پروژه انجام شد (ببین docs/decisions.md ADR-001). قبل از هر تغییر، این اسناد را منبع اصلی تصمیم بدان:

@docs/01-sitemap.md
@docs/02-build-checklist.md
@docs/design-system-icd3d.md
@docs/technical-requirements-icd3d.md (بخش معماری/API آن دیگر واقعیت فعلی نیست — ADR-001 را ببین؛ مدل‌های محتوایی بخش ۲ همچنان معتبرند)
@docs/decisions.md
@wpnuxt-ui-boilerplate-full/wpnuxt-ui-boilerplate-full/CLAUDE.md (قوانین معماری Nuxt/WPNuxt)

## قوانین ثابت
- رنگ، فونت، دکمه‌ها و کامپوننت‌ها دقیقاً طبق design-system-icd3d.md — رنگ یا فونت جدید اضافه نکن.
- مسیرها و ساختار صفحات طبق 01-sitemap.md؛ جدول مسیرها در app/utils/routes.ts.
- ترتیب و مراحل ساخت طبق 02-build-checklist.md.
- معماری: Nuxt 4 + Vue 3 + TypeScript + WPNuxt (WPGraphQL) طبق wpnuxt-ui-boilerplate-full؛ لایه‌بندی اجباری `pages -> sections -> ui -> composables -> WPNuxt -> WordPress`. بدون تایید صریح من از آن منحرف نشو.
- سایت فارسی و راست‌چین است — همیشه از خواص منطقی CSS استفاده کن، نه left/right ثابت.
- هیچ داده واقعی WordPress هنوز متصل نیست (ADR-002) — صفحات فعلاً از app/utils/*Data.ts (محتوای واقعی بازیابی‌شده از پیاده‌سازی قبلی React، نه placeholder) می‌خوانند.

## Project Progress Checklist

منبع واحد پیشرفت پروژه. طبق قانون wpnuxt-ui-boilerplate-full، قبل از شروع کار غیرجزئی این چک‌لیست را بخوان و به‌روز کن.

### 0. Discovery and architecture
- [x] بررسی مخزن، مستندات، وابستگی‌ها و محدودیت‌ها
- [x] تعریف معماری Nuxt/WPNuxt و ثبت تصمیم‌ها در docs/decisions.md (ADR-001, ADR-002, ADR-003)
- [ ] ⛔ تصمیمات باز docs/01-sitemap.md §13 (Option A/B شرکت‌ها، وضعیت‌های پروژه، دامنه EN، منبع داده TSETMC، SLA تیکت مدیرعامل، مدارک هویتی) — هنوز با مالک پروژه نهایی نشده

### 1. Foundation
- [x] راه‌اندازی Nuxt 4 + WPNuxt (بدون بک‌اند فعال، ADR-002) + TypeScript strict + ESLint + Nuxt Image + Nuxt Fonts (self-hosted)
- [x] توکن‌های سیستم دیزاین (app/assets/css/tokens.css) دقیقاً طبق design-system-icd3d.md
- [x] لایوت مشترک، هدر (مگامنو ۵ آیتم + CTA)، فوتر ۵ ستونه (app/layouts/default.vue, components/sections/Site{Header,Footer}.vue)
- [x] جدول مسیرها یکپارچه (app/utils/routes.ts)
- [x] انواع TypeScript مشترک (app/types/content.ts)

### 2. WordPress data layer
- [ ] ⛔ مدل‌های محتوایی وردپرس واقعی (Project, Company, Unit, BoardMember, News/Story/Report, Ticket, Document, Honor, JobPosting) — نیازمند بک‌اند WordPress واقعی
- [ ] کوئری‌های WPNuxt در extend/queries/ برای هرکدام
- [ ] نگاشت CMS → view model (content-contract.md) برای هر مدل
- [ ] جایگزینی app/utils/*Data.ts با کوئری‌های واقعی WPNuxt

### 3. UI and pages — پیشرفت به‌ازای هرکدام از ۱۸ تمپلیت (docs/page-templates-icd3d.md)
- [ ] `00-home` هوم‌پیج — ۱۰ بلاک ساخته شد با داده mock؛ ویجت دیده‌بان ثاخت زنده نیست؛ هیرو سه‌بعدی جایگزین fallback نشده (ADR-003)
- [x] `01a-cluster-hub-simple` — /about, /sales, /ir, /media (بازسازی وفادار از پیاده‌سازی React قبلی)
- [x] `01b-cluster-hub-visual` — /projects, /projects/map (بازسازی وفادار + پالایش طراحی: فهرست کارت پروژه‌های قابل‌اسکرول جایگزین پنل خلاصه شد و با نقشه همگام است؛ نقشه سه‌بعدی واقعی هنوز جایگزین پنل placeholder نشده)
- [x] `02a-index-card-grid` — تکمیل شد: ۴ ایندکس وضعیت پروژه، اخبار/روایت/گزارش (ArticleIndexList)، هیات‌مدیره و افتخارات (SimpleIndexGrid)، واحدهای فروش (UnitIndexList)، استخدام (careers)
- [x] `02b-index-simple-list` — /ir/financials, /ir/governance (کامپوننت DocumentIndexList + داده mock)
- [x] `02c-calendar-module` — /ir/calendar (کامپوننت CalendarIndexList + داده mock)
- [x] `03-project-detail` — /projects/[slug] (بازسازی وفادار)؛ /projects/[slug]/tour نساخته
- [x] `04-article-detail` / `04-article-main` — /media/news, /media/stories, /media/reports (ایندکس + [slug])؛ /about/board (ایندکس) و /about/board/[slug] (کامپوننت جداگانه BoardMemberProfile) با داده mock
- [x] `05-static-editorial-plain` — /about/vision, /about/csr, /legal/terms, /legal/privacy (کامپوننت StaticEditorial + داده mock)
- [x] `05b-timeline-component` — /about/history (کامپوننت HistoryTimeline، نسخه دوبعدی؛ تمپلیت مرجع سه‌بعدی است — طبق ADR-003 فعلاً بازسازی نشده، بلوکر نیست)
- [ ] `05c-orgchart-3d-component` — /about/org-chart — نساخته (سه‌بعدی)
- [x] `05d-faq-accordion` — /ir/faq, /sales/guide (کامپوننت FaqAccordion + داده mock)
- [x] `06-form-lead` — /about/ceo, /sales/consultation, /contact, /complaints (کامپوننت LeadForm؛ ارسال واقعی به بک‌اند وجود ندارد، فقط تایید بصری)
- [x] `07-unit-detail` — /sales/units/[id] (کامپوننت UnitDetailView) + /sales/available, /sales/pre-sale (UnitIndexList) با داده mock؛ پالایش طراحی: گالری bento با دکمه‌های تور ۳۶۰/BIM و مشخصات فنی گروه‌بندی‌شده در چند بخش
- [ ] `08-ir-symbol` — /ir/symbol — نساخته (نیازمند اتصال داده لحظه‌ای بورس)
- [ ] `09-account-app` — /auth/login, /account/* — نساخته (طبق build-checklist در فاز P2، نیازمند بک‌اند احراز هویت)
- [x] `10-search-results` — /search (کامپوننت SearchResultsView، جستجوی سمت کلاینت واقعی روی محتوای mock موجود — نه placeholder؛ با اتصال به داده واقعی جایگزین می‌شود)
- [x] `11-error-system` — 404/500 (app/error.vue)

### 4. Cross-cutting requirements
- [ ] متادیتای سئو/canonical برای صفحات ساخته‌نشده
- [ ] بازبینی دسترس‌پذیری کامل (فعلاً فقط رعایت‌های پایه: semantic HTML، focus-visible، reduced-motion)
- [ ] بازبینی عملکرد/تصویر/کش
- [ ] تست‌ها (هیچ تستی هنوز نوشته نشده)
- [x] مستندسازی معماری (docs/decisions.md) هم‌راستا با پیاده‌سازی

### 5. Verification and handoff
- [x] `nuxt typecheck` سبز
- [x] `pnpm lint` (فقط ۳ هشدار prop پیش‌فرض، بدون خطا)
- [ ] `pnpm test` (تستی وجود ندارد)
- [ ] `nuxt build` — نیازمند WPNUXT_WORDPRESS_URL واقعی (ADR-002)؛ `nuxt dev` و `nuxt typecheck` بدون بک‌اند سبزند
- [ ] تطبیق نهایی این چک‌لیست با مخزن قبل از تحویل
