# ICD (ثاخت) — Site Map & Page Inventory
**Version:** 1.3 · **Status:** Draft for approval · **Source:** «ساختار پیشنهادی هدر سایت ICD»

**Changes in 1.3 — the tenders correction.** Tenders and auctions are **purely informational** — notices and updates, not a transactional destination. The standalone `/tenders` page specified in v1.2 is deleted (ADR-007 superseded by ADR-009). Tender and auction notices now appear in two places only: as a `tenders` category in the Media blog, and on the Investor Relations documents page. That documents page is also consolidated: `/ir/financials` and `/ir/reports` merge into one destination carrying financial statements, board reports, committee performance reports, tender and auction notices, the legal requirements for document registration, and every PDF download. **44 → 42 templates** (Option B); the `Tender` content model is no longer needed.

**Changes in 1.2 — the consolidation pass.** The About cluster collapses from nine routes to one scroll page (ADR-004); committees become a section on it. The Media cluster collapses from three branded indexes to one categorised blog, and «کارنامه ثاخت» performance reports move under Investor Relations (ADR-005). `/careers` absorbs the HR topics and reduces to a two-field resume form (ADR-006). A new footer-only `/tenders` page carries tenders, auctions, and their registration rules (ADR-007). Net effect: **48 → 44 templates** under Option B, with the whole site moving to an image-led, minimal treatment (§14).

**Changes in 1.1:** four-status project model (added «در حال ساخت»); subsidiary companies presented as an explicit Option A / Option B decision for the client.

> Project doc for the 3D website build. Route slugs are English (code-facing); UI labels are Persian (user-facing). Primary locale: `fa-IR`, RTL. Secondary locale: `en`.

---

## 1. Summary

| Metric | Option A (projects only) | Option B (+ companies) |
|---|---|---|
| Unique routes / templates to build | **40** | **42** |
| Of which are dynamic templates (`[slug]`) | 5 | 6 |
| Estimated rendered URLs at launch | ~70 | ~79 |
| Content models | 10 | 11 |
| Top-level menu clusters | 5 | 5 |
| Utility / system pages | 9 | 9 |
| Pages requiring a 3D scene | 5 | 5 |
| Pages requiring live external data | 3 | 3 |

See §5.2 for the Option A / Option B decision. Everything outside the Projects cluster is identical between them.

The route count fell from 48 (v1.1) to 44 (v1.2) to 42 (v1.3) while the site gained content. That is the point of the consolidation: fewer, longer, image-led destinations rather than many thin pages. No content was dropped to get there — it was relocated to where its audience already was.

**Menu budget (from source doc):** 5 content items + 1 CTA in the header. Everything else lives in the footer, the mega-menus, or the account icon.

---

## 2. Page type legend

| Type | Meaning |
|---|---|
| `HUB` | Cluster landing page; overview + links down |
| `INDEX` | Filterable/paginated list of a content type |
| `DETAIL` | Dynamic template rendered per content record |
| `STATIC` | Single editorial page |
| `FORM` | Primary purpose is lead/data capture |
| `APP` | Authenticated, stateful screen |
| `SYSTEM` | Utility, legal, or error page |
| `3D` | Contains a WebGL scene (additive flag) |

---

## 3. Level 0 — Home

| # | Route | Label | Type | Function |
|---|---|---|---|---|
| 1 | `/` | صفحه اول | `HUB` `3D` | Conversion funnel from brand trust → CTA. Max 9 scroll blocks. Excerpts only, never full archives. |

### 3.1 Homepage block order (fixed — do not reorder without approval)

| Block | Name | Sources from | Content | CTA |
|---|---|---|---|---|
| 0 | هیرو | — | Brand slogan, 3D animation / holding intro video | «کشف پروژه‌ها» or scroll cue |
| 1 | ثاخت در یک نگاه | About + کارنامه | Key stats: founding year (۱۳۶۴), built area, project count, registered capital | «بیشتر درباره ثاخت» |
| 2 | پروژه‌های شاخص | Projects | 3D Tehran map / carousel / featured project + virtual tour entry | «مشاهده همه پروژه‌ها» |
| 3 | بنر فروش و پیش‌فروش | Sales | Current pre-sale offer | «مشاوره خرید» |
| 4 | ویجت دیده‌بان ثاخت | IR | Live ثاخت price + latest CODAL notice | «اطلاعات سرمایه‌گذاران» |
| 5 | پیام مدیرعامل | About › CEO | Short pull quote | «ارتباط با مدیرعامل» |
| 6 | نبض ثاخت | Media | 3 latest news/blog/podcast cards | «مشاهده همه اخبار» |
| 7 | افتخارات و اعتماد | About › افتخارات | Certificate / award / membership strip | none (trust signal only) |
| 8 | خانواده ثاخت | Projects (Opt. A) / Companies (Opt. B) | 8 subsidiary logos, each linked | logo click |
| 9 | بنر پایانی مشاوره + خبرنامه | Sales + Contact | Final call to action, email/phone form | «درخواست مشاوره» |

**Explicitly excluded from home:** org chart, full financial statements, full FAQ. These are destinations, not shop windows.

---

## 4. Cluster 1 — درباره ثاخت (About)

**One page.** v1.1 specified nine routes here; v1.2 merges them into a single long-scroll page at `/about` (ADR-004). The mega-menu still shows seven destinations, but they are **in-page anchors, not routes**.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 2 | `/about` | درباره ثاخت | `HUB` `3D` | The entire company story on one image-led scroll page | Replaces 8 deleted sub-routes |

### 4.1 Section order on `/about`

Section ids must stay in sync with `app/components/sections/AboutOverview.vue` and the anchor entries in `app/utils/routes.ts`.

| Order | Anchor | Label | Content | Notes |
|---|---|---|---|---|
| 1 | — | Hero | Full-bleed project photograph, company name, one line | |
| 2 | `#history` | تاریخچه | Visual timeline from «پارس سازه، ۱۳۳۰». Brand-story video block. Production-chain photo strip. **Black-and-white imagery for everything before ۱۳۵۰.** | Merges former `/about/history` + «کارنامه» achievements |
| 3 | `#track-record` | کارنامه | Pure image gallery of delivered work — masonry grid, names on hover only | Showcase, not prose |
| 4 | `#subsidiaries` | خانواده ثاخت | **Enlarged, full-width section.** Low-opacity blurred project photo behind; horizontally scrollable row of large subsidiary logo tiles | Links out per §5.2 option |
| 5 | `#board` | هیات‌مدیره | One flat card per member: portrait, name, position, education, company represented, 2-line bio | **No individual profile pages.** Replaces `/about/board/[slug]` |
| 6 | `#committees` | کمیته‌ها | Classification of ثاخت's committees: name, mandate, chair, membership | **New in v1.2** — client priority. Data already exists in `OrgChartView.vue` / `BoardMemberProfile.vue` |
| 7 | `#vision` | چشم‌انداز، حاکمیت شرکتی و استانداردهای مهندسی | Three short columns, one image and one sentence each | Merges former `/about/vision` + governance + engineering standards |
| 8 | `#contact` | ارتباط | Single form, one «موضوع» dropdown with **exactly two options**: «ارسال رزومه» and «ارتباط با سهامداران» | Replaces the former CEO-message page as the About entry point |

**Deliberately dropped from `/about`:** the standalone interactive org chart (`/about/org-chart`) and the ESG page (`/about/csr`) as separate routes. Org-chart content is folded into `#committees`; CSR content becomes part of `#vision`. If the client later requires a full standalone ESG disclosure for TSE purposes, it belongs under `/ir`, not here.

> ⚠️ **Cost of the merge.** Eight deep links, eight sets of page metadata, and eight independently indexable pages are gone. `/about` now carries all of that SEO weight alone. This was accepted knowingly in exchange for a single continuous narrative — see ADR-004 for the trade-off and the mitigation (anchor links remain shareable; each section gets its own heading hierarchy).

`فرصت‌های همکاری و استخدام` appears in the About mega-menu as a **secondary link only**; the canonical page is `/careers` (see §9).

---

## 5. Cluster 2 — پروژه‌ها (Projects)

Visual mega-menu. This is the heaviest 3D cluster.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 11 | `/projects` | پروژه‌ها | `HUB` `3D` | Visual entry: map, featured, links to all four status views | |
| 12 | `/projects/map` | نقشه پروژه‌ها | `INDEX` `3D` | Interactive 3D map, project pins, status filter | Feeds home block 2 |
| 13 | `/projects/upcoming` | پروژه‌های آتی | `INDEX` | Under study / starting | |
| 14 | `/projects/under-construction` | پروژه‌های در حال ساخت | `INDEX` | Currently being built; progress reporting | **New in v1.1** — see §5.1 |
| 15 | `/projects/operating` | پروژه‌های در حال بهره‌برداری | `INDEX` | Built and operated by the group | |
| 16 | `/projects/completed` | پروژه‌های تکمیل‌شده (کارنامه اجرایی) | `INDEX` | Delivered portfolio | **New** |
| 17 | `/projects/[slug]` | صفحه اختصاصی پروژه | `DETAIL` `3D` | Per-project page: gallery, specs, location, status, unit availability | **8+ records at launch** |
| 19 | `/projects/[slug]/tour` | تور مجازی | `DETAIL` `3D` | Immersive walkthrough | Not all projects will have one at launch |

### 5.1 Project status model

Status is a **field on a single `Project` model**, not four separate content types. One `DETAIL` template, four filtered index views. Adding or retiring a status later costs a route, not a rebuild.

| Status value | Index route | Label | Meaning |
|---|---|---|---|
| `upcoming` | `/projects/upcoming` | آتی | Under study or about to start |
| `under-construction` | `/projects/under-construction` | در حال ساخت | Actively being built |
| `operating` | `/projects/operating` | در حال بهره‌برداری | Built and operated by the group |
| `completed` | `/projects/completed` | تکمیل‌شده | Delivered and handed over |

**Why `under-construction` was added.** The source document names only three statuses. «در حال ساخت» appeared solely inside the Sales cluster as «پیش‌فروش پروژه‌های در حال ساخت», which meant a project under construction had a *sales* page but no *project* page — a visitor wanting to see the building rather than buy a unit had nowhere to land. The two are now linked in both directions:

- `/projects/[slug]` with status `under-construction` shows a "پیش‌فروش این پروژه" CTA → `/sales/pre-sale?project=[slug]`
- `/sales/pre-sale` unit cards link back to the parent project page

> ⚠️ **Decision needed: are `completed` and `operating` mutually exclusive?** If «تکمیل‌شده» means *delivered and no longer ours* and «در حال بهره‌برداری» means *still operated by the group*, a single-status field works as specified above. If a project can be both, replace the single status field with **tags** and allow a project to appear in more than one index. Confirm with the client before content modeling.

### 5.2 Subsidiary companies — Option A vs Option B

The source document uses «خانواده ثاخت» in two places: as the 8 operating *projects* (§3.2) and as the 8 subsidiary *companies* in footer column 5 and home block 8. These may or may not be the same entities. Both structures are specified below; **the client picks one before Phase 1 content modeling begins.**

#### Option A — same entities (8 project-companies)

The 8 named entities are project-companies, so a project page and a company page are the same page. No new model.

- Routes: **48** · Models: **10** · `/projects/[slug]` serves the footer strip and home block 8
- The 8: `رویای کیش` · `عفاف‌آباد شیراز` · `نارنجستان ایزدشهر` · `آ.اس.پ مشهد` · `آ.اس.پ تهران` · `مگاپارس تهران` · `برج بین‌المللی تهران` · `مجتمع ساحل نوشهر`
- Simpler, cheaper, matches the source document read literally
- Risk: breaks down the moment one company owns two projects, or one project has two owners

#### Option B — separate entities (companies own projects)

A `Company` model sits above `Project` with a one-to-many relationship. This is the structurally correct shape for a holding, and it is what the group's TSE-listed status implies.

| # | Route | Label | Type | Function |
|---|---|---|---|---|
| 53 | `/companies` | خانواده ثاخت | `INDEX` | Grid of the 8 subsidiaries |
| 54 | `/companies/[slug]` | صفحه شرکت | `DETAIL` | Company profile, ownership share, management, **list of its projects** |

- Routes: **50** · Models: **11** (adds `Company`) · +8 records
- `/projects/[slug]` gains an "owner company" field linking up; `/companies/[slug]` lists its projects linking down
- Footer column 5 and home block 8 point at `/companies/[slug]`, not `/projects/[slug]`
- Handles one-company-many-projects, ownership percentages, and companies with no live project
- Cost: one extra template, one extra model, and content for 8 company profiles

**Recommendation:** Option B, unless the client confirms the 8 are literally project-companies with a permanent 1:1 relationship. Retrofitting a `Company` model after launch means rewriting every project URL and the footer, which is the expensive version of this decision. If budget forces Option A now, still add a nullable `ownerCompany` field to `Project` so the migration path stays open.

---

## 6. Cluster 3 — فروش و پیش‌فروش (Sales & Pre-sale)

Highest commercial priority. Every page here must terminate in a lead capture.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 19 | `/sales` | فروش و پیش‌فروش | `HUB` | Cluster overview | |
| 20 | `/sales/available` | واحدهای آماده فروش | `INDEX` | Filterable unit list with photos | Filters: project, area, floor, price |
| 21 | `/sales/pre-sale` | پیش‌فروش پروژه‌های در حال ساخت | `INDEX` | Pre-sale inventory | |
| 22 | `/sales/units/[id]` | صفحه واحد | `DETAIL` `3D` | Single unit: floor plan, 3D view, price, availability, "save to favorites" | Ties to `/account/favorites` |
| 23 | `/sales/guide` | راهنمای گام‌به‌گام خرید و قرارداد | `STATIC` | Buyer FAQ + contract walkthrough | **New** |
| 24 | `/sales/consultation` | درخواست مشاوره رایگان | `FORM` | Lead form → CRM | Primary conversion endpoint |

---

## 7. Cluster 4 — دیده‌بان ثاخت (Investor Relations)

Rebrand of the existing «امور سهامداری». Regulatory-sensitive: accuracy and freshness are compliance issues, not just UX.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 25 | `/ir` | دیده‌بان ثاخت | `HUB` | IR entry, live widget above the fold | |
| 26 | `/ir/symbol` | اطلاعات نماد ثاخت در بورس | `STATIC` (live) | Live price/volume widget | **TSETMC integration.** Client-requested |
| 27 | `/ir/financials` | اسناد و گزارش‌ها | `INDEX` | **The documents page.** See §7.1 | Merges former `/ir/reports` (ADR-009) |
| 28 | `/ir/calendar` | تقویم اطلاع‌رسانی و مجامع عمومی | `INDEX` | Jalali calendar of disclosures & general assemblies | **New** — TSE transparency requirement |
| 29 | `/ir/governance` | گزارش‌های شفافیت و حاکمیت شرکتی | `INDEX` | Governance reports | |
| 30 | `/ir/faq` | پرسش‌های متداول سهامداران | `STATIC` | Shareholder FAQ | **New** |
| 31 | `/ir/financials/[slug]` | سند / گزارش | `DETAIL` | One document rendered as readable text, with its PDF download beside it | Readable view is required, not optional |

### 7.1 `/ir/financials` — the documents page

One destination for every official document the company publishes. v1.2 split this across `/ir/financials` and `/ir/reports`; v1.3 merges them, because the client describes a single page and because a regulated document with two possible homes will drift (ADR-009).

| Document group | Contents |
|---|---|
| صورت‌های مالی | Audited financial statements, by year |
| گزارش فعالیت هیات‌مدیره | Official board activity reports |
| گزارش‌های عملکرد کمیته‌ها | Committee performance reports — moved from `/media/reports` (ADR-005) |
| مناقصات و مزایدات | Tender and auction notices. **Informational only** — see §9.2 |
| الزامات قانونی ثبت اسناد | The legal requirements for document registration, and the required-documents list |

Filterable by group and by year. Links out to CODAL for the filings that live there.

### 7.2 Readable **and** downloadable

v1.1 treated these as a PDF library. From v1.2 onward both forms are required: the document body renders as HTML on `/ir/financials/[slug]`, and the same document is offered as a download. A PDF-only archive is unsearchable, unreadable on a phone, and invisible to crawlers — unacceptable for the one cluster where transparency is a regulatory obligation rather than a preference.

Every PDF the site offers is reached from this page. v1.2 scattered downloads across `/ir/reports` and a standalone tenders page; v1.3 gives them one home.

> This is the one cluster that does **not** take the §14 image-led treatment. See §14.1.

---

## 8. Cluster 5 — رسانه ثاخت (Media)

**One blog, categorised.** v1.1 split this into three branded indexes (نبض ثاخت / روایت ثاخت / کارنامه ثاخت) plus three detail templates. v1.2 consolidates it into a single feed with categories, and moves the specialist performance reports to `/ir/reports` where their audience actually is (ADR-005).

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 33 | `/media` | رسانه ثاخت | `INDEX` | One feed of all posts, filterable by category | Replaces three separate indexes |
| 34 | `/media/[slug]` | مطلب | `DETAIL` | One template for every post type. Renders an audio player when the post is a podcast episode | Replaces three detail templates |
| 35 | `/media/press-kit` | بسته رسانه‌ای | `STATIC` | Logos, high-res photos, boilerplate for journalists | Needs ZIP download |

### 8.1 Categories

Categories are a **field on the `Article` model**, filtered by query string (`/media?category=news`) — not separate routes. Same reasoning as the project status model in §5.1: a new category costs a database value, not a route.

| Category value | Label | Replaces | Content |
|---|---|---|---|
| `news` | نبض ثاخت | `/media/news` | Daily news and announcements |
| `stories` | روایت ثاخت | `/media/stories` | Long-form blog, interviews |
| `podcast` | پادکست | part of `/media/stories` | Audio episodes — detail page renders a player |
| `analysis` | تحلیل بازار | part of `/media/reports` | Market commentary that is editorial, not a formal report |
| `tenders` | مناقصات و مزایدات | — | **New in v1.3.** Tender and auction notices as news items. Informational only; the documents themselves live on `/ir/financials` (§7.1) |

**What moved out.** Formal company and committee performance reports — the «کارنامه ثاخت» documents — are now at `/ir/reports` (§7). What stays in `/media` is editorial: news, interviews, podcasts, and market commentary.

> ⚠️ **Brand-name collision to resolve with the client.** «کارنامه» now appears in three places with three meanings: `/about#track-record` (visual portfolio), `/projects/completed` («کارنامه اجرایی» — delivered projects), and `/ir/reports` (formal performance reports). The Media sub-brand «کارنامه ثاخت» is being retired to reduce this, but the remaining three still need distinct labels in the final copy. Flagged as open question 4 in §13.

---

## 9. Account, utility, legal & system

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 39 | `/auth/login` | ورود / ثبت‌نام | `FORM` | OTP or password auth | Header icon |
| 40 | `/account` | پروفایل من | `APP` | Dashboard | |
| 41 | `/account/favorites` | واحدهای موردعلاقه | `APP` | Saved units | |
| 42 | `/account/orders` | پیگیری وضعیت خرید | `APP` | Purchase status tracking | |
| 43 | `/account/documents` | مدارک | `APP` | Document upload/download | Sensitive — see security checklist |
| 44 | `/account/tickets` | تیکت پشتیبانی | `APP` | Support tickets; receives CEO-message threads | |
| 42 | `/contact` | تماس با ما | `STATIC` + `FORM` | Full contact page, offices, map | CTA button links here as secondary |
| 43 | `/careers` | فرصت‌های همکاری و استخدام | `STATIC` + `FORM` | Short intro, two-field resume form, and the HR topics as sections | **Restructured in v1.2** — see §9.1 |
| 45 | `/complaints` | سامانه رسیدگی به شکایات مشتریان | `FORM` | Complaints intake with tracking code | Footer |
| 46 | `/search` | جستجوی سایت | `SYSTEM` | Site-wide search results | Header icon |
| 47 | `/legal/terms` | قوانین | `SYSTEM` | Footer bottom row | |
| 48 | `/legal/privacy` | حریم خصوصی | `SYSTEM` | Footer bottom row | |
| 49 | `/404` | صفحه یافت نشد | `SYSTEM` `3D` | Branded 404 | |
| 50 | `/500` | خطای سرور | `SYSTEM` | Must render without WebGL | |

> Route numbers are historical and no longer contiguous — 44 was the deleted `/tenders` (ADR-009), and 53–54 are the Option B company routes in §5.2. Numbers are kept stable so earlier versions and the decision log stay readable. The useful estimating figure is **40 templates (Option A)** or **42 (Option B)**.

### 9.1 `/careers` — فرصت‌های همکاری و استخدام

One page, in this order (ADR-006):

| Order | Anchor | Content |
|---|---|---|
| 1 | — | **Brief intro only.** Two or three sentences on working at ثاخت, over a photograph. No long employer-brand essay |
| 2 | `#resume` | **Simple resume form: name and contact number only.** Plus the file attachment itself. No cover letter, no portal account, no multi-step wizard |
| 3 | `#benefits` | مزایا و رفاه کارکنان — benefits and employee welfare |
| 4 | `#learning` | آموزش و یادگیری — learning and training |
| 5 | `#faq` | پرسش‌های متداول — HR FAQ |

**Exactly these HR topics and no others** — benefits/welfare, learning/training, FAQ — per client instruction. No separate `/hr` route; the HR content is why someone scrolls this page, not a destination of its own.

> The two-field form is a deliberate conversion decision: every additional field costs applicants. Note for implementation — a name and a phone number alone cannot be deduplicated reliably, so the backend needs a submission timestamp and the attached file's hash to catch repeat submissions.

### 9.2 Tenders and auctions — informational, not a page

**There is no `/tenders` route.** v1.2 specified one; v1.3 deletes it (ADR-009). Tenders and auctions on this site are *purely informational* — the company publishes notices and updates, it does not run a bidding process here. Content that is only ever read belongs where readers already are, not on a destination of its own.

They therefore appear in exactly two places:

| Where | What | Route |
|---|---|---|
| Media blog, own category | Tender and auction notices as dated news items | `/media?category=tenders` (§8.1) |
| IR documents page | The notices as documents, the legal requirements for document registration, the required-documents list, and all PDF downloads | `/ir/financials` (§7.1) |

**Consequences of this being informational:**

- **No `Tender` content model.** A notice is an `Article` with `category: 'tenders'`; a tender document is a document record on the IR page. This is why the model count in §1 fell back to 10/11
- **No deadline-derived status logic.** v1.2 required status to be computed from the deadline because an expired tender shown as open would be a procurement problem. That risk does not apply to a notice archive — but dated notices must still carry a visible publication date so nobody reads an old notice as current
- **No footer navigation entry.** Suppliers reach this content through site search, the blog category, or the IR documents page

> ⚠️ **If this ever becomes transactional** — if the company starts accepting registrations or bids through the site — this decision reverses and ADR-009 should be revisited. At that point a `Tender` model with real deadline logic becomes necessary, and the informational treatment becomes actively unsafe.

---

## 10. Header specification

**Left/logo:** لوگو ثاخت
**Menu (5 items):** درباره ثاخت · پروژه‌ها · فروش و پیش‌فروش · دیده‌بان ثاخت · رسانه ثاخت
**Functional icons (not counted in menu):** 🔍 site search · 🌐 EN/FA · 👤 login/profile
**CTA button:** «مشاوره و تماس سریع» → short form or WhatsApp/live chat, with secondary link to `/contact`

Result: ~45% more compact than a conventional 9-item menu.

---

## 11. Footer specification (5 columns)

| Column | Contents |
|---|---|
| 1 | Logo + short intro + address + phone + social links |
| 2 — دسترسی سریع | درباره ثاخت / پروژه‌ها / فروش / تماس با ما / internal systems (اتوماسیون اداری، درگاه هلدینگ) |
| 3 — سرمایه‌گذاران | دیده‌بان ثاخت / کدال / اسناد و گزارش‌ها (شامل مناقصات و مزایدات) / تقویم مجامع |
| 4 — خدمات و همکاری | پروفایل من / سوالات متداول / سامانه رسیدگی به شکایات / **فرصت‌های همکاری و استخدام** |
| 5 — خانواده ثاخت | Logo strip of the 8 subsidiaries, each linked → `/projects/[slug]` (Option A) or `/companies/[slug]` (Option B) |

**Bottom row:** © copyright | قوانین و حریم خصوصی

> Internal systems (office automation, holding portal) are deliberately removed from the main menu and kept footer-only — the public audience has no need for them.

---

## 12. Build priority

| Wave | Scope | Rationale |
|---|---|---|
| **P0** | `/`, header, footer, `/projects` + all four status indexes + `/projects/[slug]`, `/companies` + `/companies/[slug]` (if Option B), `/sales/*`, `/contact`, `/ir` + `/ir/symbol`, 404 | Revenue + regulatory minimum viable site. Company routes are P0 under Option B because the footer and home block 8 link to them |
| **P1** | `/about` (one page), `/media` + `/media/[slug]`, `/ir/financials` + `/ir/financials/[slug]`, `/ir` remainder, `/search`, legal | Completes the public site |
| **P2** | Account/auth cluster, `/complaints`, `/careers`, virtual tours | Requires backend and legal review |

> `/ir/financials` carries more weight after the v1.3 merge: it is now the only route serving official documents, committee reports, tender notices and every PDF on the site. It should be built early in P1 rather than late.

---

## 13. Open questions

1. ⛔ **Option A or Option B** for subsidiary companies? (see §5.2) — blocks content modeling. `app/utils/routes.ts` currently assumes **Option B**
2. ⛔ Are `completed` and `operating` mutually exclusive statuses, or does a project need tags? (see §5.1)
3. ⛔ **Does the photography exist?** The v1.2 direction is image-led (§14), which fails without images. Specifically: how many usable photographs per project across the eight; whether any archival material exists for «پارس سازه» and the pre-۱۳۵۰ years the `#history` timeline opens with; and whether brand-film footage exists or must be commissioned. **This is now the critical-path risk** — layout is not the bottleneck, assets are
4. The word «کارنامه» now carries three distinct meanings (§8.1). Which label goes where in the final Persian copy?
5. What happened to the CEO direct-message SLA? v1.1 had a dedicated page with a published 72-hour response commitment; v1.2 folds it into the `/about#contact` form, whose dropdown has only «ارسال رزومه» and «ارتباط با سهامداران». **The CEO channel has no entry point in v1.2** — was that intended, or does it need a third dropdown option?
6. Is `EN` a full translation of all templates, or a reduced ~10-page English site? Cost difference is significant
7. Is TSETMC data pulled via API, official widget, or a manually updated cache? Affects `/ir/symbol` and home block 4
8. Which projects get a virtual tour at launch?
9. Does `/account/documents` handle identity documents? If so, it triggers data-residency and retention requirements
10. Do old `/about/*`, `/media/news/*`, `/media/stories/*` and `/media/reports/*` URLs need 301 redirects? They were deleted rather than redirected. If the current live site uses them, the redirect map in build-checklist Phase 1 must cover them
11. Where did the tender PDFs live on the current site? v1.3 §9.2 notes they were previously hosted in that section — those URLs need redirects to `/ir/financials` and the files need migrating
12. Is `اسناد و گزارش‌ها` the right label for `/ir/financials` now that it carries tenders and registration rules as well as financial statements? The route slug still says `financials`, which will read oddly to a developer — renaming it to `/ir/documents` is cheap now and expensive after launch

---

## 14. Visual direction — image-led and minimal

Applies to every page unless §14.1 exempts it. This is the v1.2 house style and the reason the consolidation happened.

**Principles**
1. Image-led. Where a sentence and a photograph say the same thing, keep the photograph
2. Generous whitespace — minimum 120px of vertical padding between sections
3. Flat. No cards-within-cards, no shadows, no gradients, no decorative icons
4. One accent colour. White background, near-black text
5. Editorial, not brochure — closer to a museum wall label than a corporate pamphlet

**Text budget** (enforceable, so "concise" does not drift back to paragraphs by the third review)

| Element | Maximum |
|---|---|
| Hero line | 8 words |
| Section heading | 4 words |
| Section body | 25 words |
| Image caption | 6 words |
| Timeline entry | 6 words |

Target roughly a 70% reduction in text volume against the v1.1 implementation.

### 14.1 The exemption: Investor Relations

`/ir` and everything under it does **not** take this treatment. Its audience is shareholders, analysts and regulators who need a specific document in under five seconds. For them, minimal means fast, plain and dense: a searchable document list that loads instantly, with timestamps and no hero imagery. Applying the image-led style here would produce a beautiful page that obstructs the only audience that matters.

Recorded explicitly so a later design pass does not "fix" the inconsistency.
