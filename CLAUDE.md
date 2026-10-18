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
- **چیدمان صفحات از طرح‌های تاییدشده در `stitch_project_detail_page_template/` می‌آید، نه از متن مستندات.** اگر طرح و یک جمله در sitemap درباره «شکل» چیزی اختلاف داشتند، طرح مبناست و جمله اصلاح می‌شود (ADR-016). اختلاف درباره «ساختار اطلاعات» (اینکه چه صفحاتی وجود دارند و چه چیزی رویشان است) همچنان با sitemap است.
- ترتیب و مراحل ساخت طبق 02-build-checklist.md.
- معماری: Nuxt 4 + Vue 3 + TypeScript + WPNuxt (WPGraphQL) طبق wpnuxt-ui-boilerplate-full؛ لایه‌بندی اجباری `pages -> sections -> ui -> composables -> WPNuxt -> WordPress`. بدون تایید صریح من از آن منحرف نشو.
- سایت فارسی و راست‌چین است — همیشه از خواص منطقی CSS استفاده کن، نه left/right ثابت.
- هیچ داده واقعی WordPress هنوز متصل نیست (ADR-002) — همه صفحات از کاتالوگ واحد `app/utils/catalog.ts` (+ `posts.ts`، `irDocuments.ts`، `financialTables.ts`) می‌خوانند (ADR-015). رکوردهای `origin: 'design'` نمونه‌اند و باید با محتوای واقعی جایگزین شوند.
- **هرگز کلاس را به‌صورت imperative (classList.add) روی عنصری که `:class` واکنشی هم دارد اضافه نکن** — Vue در هر رندر دوباره، attribute کلاس را بازنویسی می‌کند و آن کلاس بی‌صدا پاک می‌شود (ADR-020).
- تصاویر: placeholderهای تصویری در `public/img/ph/` از طریق `ph()`/`phFor()` در `app/utils/media.ts`؛ آیکون‌ها فقط از `<AppIcon>`؛ CSS سراسری فقط داخل `@layer`.

## Project Progress Checklist

منبع واحد پیشرفت پروژه. طبق قانون wpnuxt-ui-boilerplate-full، قبل از شروع کار غیرجزئی این چک‌لیست را بخوان و به‌روز کن.

### 0. Discovery and architecture
- [x] بررسی مخزن، مستندات، وابستگی‌ها و محدودیت‌ها
- [x] تعریف معماری Nuxt/WPNuxt و ثبت تصمیم‌ها در docs/decisions.md (ADR-001, ADR-002, ADR-003)
- [ ] ⛔ عنوان، سال و مرجع صدور سه افتخار واقعی و فهرست کامل اعضای هیات‌مدیره ثاخت — از مالک پروژه (ADR-018)
- [ ] ⛔ هیات‌مدیره «مهندسی و مدیریت ساخت ثاخت» در فایل اکسل نیامده؛ ۹ شرکت از ۱۰ شرکت پوشش داده شد (ADR-021)
- [ ] ⛔ تصویر شاخص اختصاصی برای هر مطلب رسانه — ۱۶ مطلب فعلاً عکس عمومی گروه دارند (ADR-019)
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
- [x] `00-home` هوم‌پیج — ۹ بلاک به ترتیب sitemap §3.1 در زبان بصری Stitch، داده از catalog (ADR-015)؛ ویجت نماد با داده نمایشی (اتصال TSETMC در فاز بک‌اند)؛ هیرو سه‌بعدی هنوز fallback (ADR-003)
- [x] `01a-cluster-hub-simple` — بازنشسته در v1.7 (ADR-015): منوی فروش و دیده‌بان به صفحات طراحی‌شده /sales و /ir/financials می‌رود؛ /ir و /sales/available و /sales/pre-sale ریدایرکت می‌شوند. هدر با زیرمنوی کشویی و منوی موبایل، فوتر طبق §11
- [x] `01b-cluster-hub-visual` — /projects, /projects/map (بازسازی ساختاری کامل مطابق mockup مرجع: نوار فیلتر ۵ فیلده واقعی (جستجو/کاربری/استان/شرکت/متراژ)، ردیف نتیجه+مرتب‌سازی+تغییر نما، کارت پروژه با accent bar/کد/آیکون نشان/مینی‌استت مهندسی مطابق کد مرجع، نوار خلاصه پرتفوی؛ زاویه گوشه‌ها به مقیاس متعادل §4.1 تغییر کرد (نه تیز مطلق، نه گرد کامل)؛ نقشه سه‌بعدی واقعی هنوز جایگزین پنل placeholder نشده)
- [x] `02a-index-card-grid` — جای خود را به نماهای Stitch داد: ۴ صفحه وضعیت پروژه با یک کامپوننت مشترک `ProjectsStatusView` و کارت `ProjectTile`؛ فیلترها طبق درخواست مالک از صفحات کلاستر حذف شد (ADR-015)
- [x] `02b-index-simple-list` — /ir/financials (حاکمیت شرکتی اکنون بخش #governance روی همین صفحه است، ADR-016) — بازسازی مطابق mockup (فیلتر سال/نوع سند، ردیف سند، دانلود، ارجاع به کدال)
- [x] `02c-calendar-module` — بخش #calendar روی /ir/financials (ADR-016) — بازسازی مطابق mockup (تب پیش‌رو/گذشته، تاریخ شمسی، افزودن به تقویم)
- [x] `03-project-detail` — /projects/[slug] (بازسازی وفادار)؛ /projects/[slug]/tour نساخته
- [x] `04-article-detail` / `04-article-main` — /media (یک فید، تب دسته‌ها با ?category=، صفحه‌بندی) و /media/[slug] (طرح _1، بدنه ساخت‌یافته، نسخه صوتی، مطالب مرتبط)؛ مسیرهای قدیمی /media/news|stories|reports ریدایرکت می‌شوند (ADR-015)
- [x] `05-static-editorial-plain` — /about/vision, /about/csr, /legal/terms, /legal/privacy — بازسازی مطابق mockup
- [x] `05b-timeline-component` — /about/history — بازسازی مطابق mockup (نسخه HTML/CSS، بدون WebGL طبق ADR-003)
- [x] `05c-orgchart-3d-component` — /about/org-chart — ساخته شد مطابق ساختار mockup (سطوح سلسله‌مراتب، کارت گره، پنل جزئیات) با HTML/CSS/SVG؛ سه‌بعدی واقعی WebGL طبق ADR-003 نیست
- [x] `05d-faq-accordion` — بخش #faq روی /ir/financials و /sales/guide (ADR-016) — بازسازی مطابق mockup (دسته‌بندی، جستجو، CTA تماس)
- [x] `06-form-lead` — /about/ceo, /sales/consultation, /contact, /complaints (+ فرم /careers) — بازسازی مطابق mockup با اعتبارسنجی کامل سمت کلاینت؛ ارسال واقعی در فاز بک‌اند
- [x] `07-unit-detail` — /sales/units/[id] (کامپوننت UnitDetailView) + /sales/available, /sales/pre-sale (UnitIndexList) با داده mock؛ بازسازی ساختاری کامل مطابق mockup مرجع: breadcrumb + دکمه‌های نشان/دانلود/اشتراک، گالری bento با ۳۶۰/BIM، پنل مشخصات چندبخشی، بخش پلان معماری با تب و SVG بلوپرینت، گرید امکانات و تاسیسات، سایدبار قیمت/تسهیلات/رزرو بازدید/مشاور فروش؛ زاویه گوشه‌ها به مقیاس متعادل §4.1 تغییر کرد
- [x] `08-ir-symbol` — بخش #symbol روی /ir/financials (ADR-016) — ساخته شد مطابق mockup با داده نمایشی برچسب‌دار و نمودار SVG؛ اتصال به داده لحظه‌ای TSETMC در فاز بک‌اند
- [x] `09-account-app` — /auth/login و /account/* ساخته شد از طرح کانواس تاییدشده (ADR-016): ورود دومرحله‌ای موبایل→کد، داشبورد با نوار اقدام لازم، پیگیری خرید، مدارک، علاقه‌مندی‌ها و تیکت. ⛔ احراز هویت واقعی ندارد — همه مسیرهای /account/* بدون ورود باز می‌شوند؛ میدل‌ویر محافظ اولین کار فاز بک‌اند است
- [x] `10-search-results` — /search — بازسازی مطابق mockup (تب دسته با شمارش، مرتب‌سازی، فیلتر سال، هایلایت، صفحه‌بندی، حالت خالی)
- [x] `11-error-system` — 404/500 (app/error.vue) — بازسازی مطابق mockup

### 4. Cross-cutting requirements
- [ ] متادیتای سئو/canonical برای صفحات ساخته‌نشده
- [ ] بازبینی دسترس‌پذیری کامل (فعلاً فقط رعایت‌های پایه: semantic HTML، focus-visible، reduced-motion)
- [ ] بازبینی عملکرد/تصویر/کش
- [ ] تست‌ها (هیچ تستی هنوز نوشته نشده)
- [x] مستندسازی معماری (docs/decisions.md) هم‌راستا با پیاده‌سازی

### 5. Verification and handoff
- [x] `nuxt typecheck` سبز
- [x] `pnpm lint` (۰ خطا؛ ۱۲ هشدار)
- [ ] `pnpm test` (تستی وجود ندارد)
- [x] `nuxt build` بدون بک‌اند سبز است (ماژول‌های WPNuxt شرطی‌اند، ADR-002)؛ crawl کامل ۲۱۴ صفحه بدون خطا و ۳۳ تست تعاملی سبز (ADR-015)
- [ ] تطبیق نهایی این چک‌لیست با مخزن قبل از تحویل
