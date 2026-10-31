# تمپلیت‌های صفحات ICD 3D (ثاخت)
مرجع طراحی و تولید صفحات. هر ردیف = یک تمپلیت (نه یک صفحه). ۴۸–۵۰ روت سایت روی ۱۸ تمپلیت سوار می‌شوند.
همراه این سند: `01-sitemap.md` (ساختار روت‌ها)، `design-system-icd3d.md` (رنگ/فونت/کامپوننت)، `technical-requirements-icd3d.md` (معماری).

> لینک‌های «نمونه واقعی» در تاریخ تهیه این سند باز شدند و بررسی شدند. موارد بررسی‌نشده صریحاً علامت خورده‌اند.

---

## ۱. `00-home.png` — Immersive 3D Hero / WebGL Landing Page

**اجزای ضروری:** صحنه سه‌بعدی هیرو + شعار برند؛ نوار آمار (تاسیس ۱۳۶۴، متراژ ساخته‌شده، تعداد پروژه، سرمایه ثبتی)؛ پروژه‌های شاخص با ورود به تور مجازی؛ بنر پیش‌فروش؛ ویجت زنده نماد ثاخت + آخرین اطلاعیه کدال؛ پیام مدیرعامل؛ ۳ کارت خبر؛ نوار افتخارات؛ ۸ لوگوی خانواده ثاخت؛ بنر پایانی مشاوره + خبرنامه. سقف ۹ بلاک، بدون آرشیو کامل.
**نمونه واقعی:** [clarkconstruction.com](https://www.clarkconstruction.com/) — ریتم بلاک‌ها و هیرو تمام‌قد (سه‌بعدی ندارد؛ برای مرجع سه‌بعدی گالری WebGL سایت Awwwards را در مرورگر ببینید — از اینجا قابل بازکردن نبود).

## ۲. `01a-cluster-hub-simple.png` — Hub Page / Pillar Page

**اجزای ضروری:** بنر عنوان کلاستر؛ یک پاراگراف معرفی؛ گرید ۴–۸ کارت لینک‌دار به زیرصفحه‌ها (تصویر + عنوان + یک جمله)؛ بدون محتوای عمیق.
**کاربرد:** `/about`, `/sales`, `/ir`, `/media`
**نمونه واقعی:** [clarkconstruction.com/our-work](https://www.clarkconstruction.com/our-work) — دقیقاً همین الگو: سه کارت بزرگ (Markets / Expertise / Projects) که در به بخش‌های عمیق‌تر باز می‌کنند.

## ۳. `01b-cluster-hub-visual.png` — Interactive Map Explorer / Visual Index

**اجزای ضروری:** نقشه تعاملی با پین پروژه‌ها؛ فیلتر ۴ وضعیت؛ کارت شناور روی hover/کلیک؛ لینک به هر چهار ایندکس وضعیت؛ پروژه شاخص.
**کاربرد:** `/projects`, `/projects/map`
**نمونه واقعی:** [damacproperties.com](https://www.damacproperties.com/en/) — بخش Browse Properties (فیلتر + مرور املاک). *بخش نقشه‌ی آن جداگانه بررسی نشد.*

## ۴. `02a-index-card-grid.png` — Filterable Archive / Listing Page

**اجزای ضروری:** نوار فیلتر (وضعیت، شهر، نوع)؛ شمارش نتایج؛ گرید کارت (تصویر، نام، موقعیت، بج وضعیت)؛ صفحه‌بندی؛ حالت خالی (empty state).
**کاربرد:** ۴ ایندکس وضعیت پروژه، اخبار، روایت، گزارش، هیئت‌مدیره، افتخارات، واحدهای فروش، استخدام
**نمونه واقعی:** [clarkconstruction.com/our-work/projects](https://www.clarkconstruction.com/our-work/projects) — فیلتر و صفحه‌بندی واقعی روی پارامتر URL.

## ۵. `02b-index-simple-list.png` — Document Repository / Report Library

**اجزای ضروری:** فیلتر سال + نوع سند؛ ردیف لیست با عنوان، تاریخ، حجم فایل، آیکون PDF؛ دکمه دانلود؛ لینک به کدال به‌عنوان منبع رسمی. عمداً ساده و سریع — بدون کارت تصویری.
**کاربرد:** `/ir/financials`, `/ir/governance`
**نمونه واقعی:** [skanska.com/group/en/investors/financial-reports](https://www.skanska.com/group/en/investors/financial-reports) — و [aldar.com/en/investors](https://www.aldar.com/en/investors) بخش Reports & Presentations (پشت صفحه پذیرش شرایط).

## ۶. `02c-calendar-module.png` — Financial Calendar / IR Events Calendar

**اجزای ضروری:** تب «رویدادهای پیش‌رو / گذشته»؛ ردیف رویداد با تاریخ شمسی، نوع (مجمع / گزارش فصلی / افشای اطلاعات)؛ افزودن به تقویم؛ لینک به سند مرتبط.
**کاربرد:** `/ir/calendar`
**نمونه واقعی:** [skanska.com/.../financial-reports/calendar](https://www.skanska.com/group/en/investors/financial-reports/calendar) — همان الگوی تب جاری/گذشته.

## ۷. `03-project-detail.png` — Project Detail Page (Real Estate: PDP)

**اجزای ضروری:** هیرو تصویر یا صحنه سه‌بعدی؛ بج وضعیت؛ جدول مشخصات (متراژ، طبقات، کاربری، سال)؛ گالری؛ نقشه موقعیت؛ دکمه تور مجازی؛ CTA «پیش‌فروش این پروژه» وقتی وضعیت = در حال ساخت؛ شرکت مالک (Option B)؛ پروژه‌های مرتبط.
**کاربرد:** `/projects/[slug]`, `/projects/[slug]/tour`
**نمونه واقعی:** [Metropolitan Park — Clark](https://www.clarkconstruction.com/our-work/projects/metropolitan-park)

## ۸. `04-article-detail.png` — Editorial Article Template

**اجزای ضروری:** تیتر، تاریخ، دسته؛ تصویر شاخص؛ بدنه با زیرتیتر و نقل‌قول؛ پلیر صوت (برای پادکست روایت ثاخت)؛ اشتراک‌گذاری؛ مطالب مرتبط.
**کاربرد:** `/media/news/[slug]`, `/media/stories/[slug]`, `/media/reports/[slug]`, `/about/board/[slug]`
**نمونه واقعی:** [Works of Art — Clark News](https://www.clarkconstruction.com/news/works-art)

## ۹. `05-static-editorial-plain.png` — Long-form Content Page

**اجزای ضروری:** تیتر صفحه؛ متن بلند با زیرتیترها؛ تصویر درون‌متنی؛ فهرست کناری برای متون بلند (قوانین، حریم خصوصی)؛ بدون فیلتر یا کارت.
**کاربرد:** `/about/vision`, `/about/csr`, `/legal/terms`, `/legal/privacy`
**نمونه واقعی:** [Clark Foundations — about page](https://www.clarkconstruction.com/about-us/companies/clark-foundations)

## ۱۰. `05b-timeline-component.png` — Interactive Timeline / Scrollytelling Timeline

**اجزای ضروری:** محور سال؛ نقاط کلیدی (۱۳۶۴ تاسیس، پذیرش در بورس، ورود به هلدینگ غدیر، پروژه‌های شاخص)؛ تصویر و متن هر نقطه؛ ناوبری اسکرول یا کلیک روی سال.
**کاربرد:** `/about/history`
**نمونه واقعی:** [ventureconstruction.com/about-us/our-history](https://ventureconstruction.com/about-us/our-history/) — ساختار محتوایی درست است ولی تعاملی نیست (لیست عمودی). برای نمونه‌های تعاملی: [۳۲ نمونه تایم‌لاین وب](https://www.allianceinteractive.com/blog/best-website-timeline-examples-and-design-tips/).

## ۱۱. `05c-orgchart-3d-component.png` — Org Chart Visualization / Node-link Diagram

**اجزای ضروری:** گره برای هر واحد/سمت؛ خطوط اتصال سلسله‌مراتبی؛ زوم و پن؛ کلیک روی گره → پروفایل عضو؛ نسخه fallback ساده (لیست تودرتو) برای موبایل و بدون WebGL.
**کاربرد:** `/about/org-chart`
**نمونه واقعی:** نمونه عمومی و معتبری پیدا نشد — چارت سازمانی تعاملی معمولاً داخلی است. عبارت سرچ در گالری‌ها: `interactive org chart UI` یا `node-link organization diagram`.

## ۱۲. `05d-faq-accordion.png` — Accordion (Disclosure Pattern)

**اجزای ضروری:** گروه‌بندی موضوعی سوالات؛ ردیف سوال با آیکون +/−؛ باز و بسته شدن با کیبورد (Enter/Space) و `aria-expanded`؛ لینک انتهایی به تماس/تیکت.
**کاربرد:** `/ir/faq`, `/sales/guide`
**نمونه واقعی (استاندارد مرجع):** [W3C ARIA APG — Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) — ساختار و رفتار کیبورد استاندارد.

## ۱۳. `06-form-lead.png` — Lead Capture / Conversion Form Page

**اجزای ضروری:** توضیح کوتاه هدف فرم؛ فیلدها با لیبل بالای فیلد؛ نوع درخواست (dropdown)؛ پذیرش حریم خصوصی؛ پیام SLA (۷۲ ساعت برای پیام مدیرعامل)؛ کد پیگیری پس از ثبت (برای شکایات)؛ پیام موفقیت/خطا.
**کاربرد:** `/about/ceo`, `/sales/consultation`, `/contact`, `/complaints`
**نمونه واقعی:** [clarkconstruction.com/contact-us](https://www.clarkconstruction.com/contact-us) — فرم با نوع درخواست، چک‌باکس حریم خصوصی، و کارت‌های اقدام سریع کنار فرم.

## ۱۴. `07-unit-detail.png` — Floor Plan Viewer / Unit Inventory Detail

**اجزای ضروری:** پلان طبقه (تصویر یا نمای سه‌بعدی)؛ متراژ، طبقه، جهت؛ قیمت با ارقام تابولار؛ بج وضعیت (موجود/رزرو/فروخته‌شده)؛ دکمه افزودن به علاقه‌مندی‌ها؛ لینک به پروژه مادر؛ فرم تماس فروش.
**کاربرد:** `/sales/units/[id]`
**نمونه واقعی:** [damacproperties.com](https://www.damacproperties.com/en/) — الگوی Shortlist (همان «علاقه‌مندی‌ها») و صفحات پلان پروژه.

## ۱۵. `08-ir-symbol.png` — Share Price Widget / Stock Information Page

**اجزای ضروری:** قیمت لحظه‌ای، درصد تغییر (تنها جای مجاز سبز/قرمز)، حجم معاملات؛ نمودار قیمت؛ برچسب زمان آخرین به‌روزرسانی؛ جدول اطلاعات نماد؛ لینک به TSETMC و کدال.
**کاربرد:** `/ir/symbol` + ویجت بلاک ۴ هوم‌پیج
**نمونه واقعی:** [skanska.com/group/en/investors/skanska-share](https://www.skanska.com/group/en/investors/skanska-share) و زیرصفحه Share graphs & key figures.

## ۱۶. `09-account-app.png` — Account Dashboard / Customer Portal

**اجزای ضروری:** منوی کناری (پروفایل، علاقه‌مندی‌ها، پیگیری خرید، مدارک، تیکت)؛ کارت خلاصه وضعیت؛ جدول سفارش با وضعیت؛ آپلود مدرک با وضعیت تایید؛ لیست تیکت با وضعیت و شمارنده SLA؛ صفحه ورود با OTP.
**کاربرد:** `/auth/login`, `/account/*`
**نمونه واقعی:** پورتال کاربری DAMAC پشت لاگین است و قابل نمایش عمومی نیست. عبارت سرچ در گالری‌ها: `customer portal dashboard UI` یا `account dashboard sidebar`.

## ۱۷. `10-search-results.png` — Internal Site Search Results

**اجزای ضروری:** نوار جستجو با عبارت فعلی؛ فیلتر نوع محتوا (پروژه/خبر/گزارش/شرکت/فرصت شغلی)؛ مرتب‌سازی (مرتبط‌ترین/جدیدترین)؛ ردیف نتیجه با بج نوع؛ شمارش نتایج؛ صفحه‌بندی؛ حالت «نتیجه‌ای یافت نشد».
**کاربرد:** `/search`
**نمونه واقعی:** جستجوی سراسری [clarkconstruction.com/our-work](https://www.clarkconstruction.com/our-work) — فیلتر نوع محتوا (Careers, Companies, Locations, Markets, Projects, Expertise) + مرتب‌سازی relevance/latest.

## ۱۸. `11-error-system.png` — 404 / 500 Error Page

**اجزای ضروری:** کد خطا؛ پیام کوتاه فارسی؛ نوار جستجو؛ لینک به ۳–۴ صفحه پرتردد؛ ۴۰۴ می‌تواند المان سه‌بعدی داشته باشد، ۵۰۰ **باید** بدون WebGL رندر شود.
**کاربرد:** `/404`, `/500`

---

## نحوه استفاده در تولید

۱) عکس مرجع هر تمپلیت را با همین نام فایل در `design-refs/` بگذارید.
۲) هنگام ساخت هر تمپلیت، به Claude Code هم عکس مرجع بدهید هم بگویید طبق `design-system-icd3d.md` تطبیق دهد (رنگ و فونت از سیستم دیزاین، نه از عکس).
۳) ترتیب ساخت طبق موج‌های P0/P1/P2 در `technical-requirements-icd3d.md` و §۱۲ نقشه‌راه.
۴) هر تمپلیت پس از ساخت روی `localhost` بررسی و تایید شود، بعد سراغ تمپلیت بعدی.
