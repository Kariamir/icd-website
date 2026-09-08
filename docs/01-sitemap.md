# ICD (ثاخت) — Site Map & Page Inventory
**Version:** 1.1 · **Status:** Draft for approval · **Source:** «ساختار پیشنهادی هدر سایت ICD»

**Changes in 1.1:** four-status project model (added «در حال ساخت»); subsidiary companies presented as an explicit Option A / Option B decision for the client.

> Project doc for the 3D website build. Route slugs are English (code-facing); UI labels are Persian (user-facing). Primary locale: `fa-IR`, RTL. Secondary locale: `en`.

---

## 1. Summary

| Metric | Option A (projects only) | Option B (+ companies) |
|---|---|---|
| Unique routes / templates to build | **48** | **50** |
| Of which are dynamic templates (`[slug]`) | 8 | 9 |
| Estimated rendered URLs at launch | ~86 | ~95 |
| Content models | 10 | 11 |
| Top-level menu clusters | 5 | 5 |
| Utility / system pages | 11 | 11 |
| Pages requiring a 3D scene | 5 | 5 |
| Pages requiring live external data | 3 | 3 |

See §5.2 for the Option A / Option B decision. Everything outside the Projects cluster is identical between them.

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

Mega-menu, 8 items. `HUB` at `/about`.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 2 | `/about` | درباره ثاخت | `HUB` | Cluster overview, links to all sub-pages | |
| 3 | `/about/history` | معرفی شرکت و تاریخچه | `STATIC` `3D` | Founding 1364, TSE listing, position in Ghadir Holding. Interactive timeline. | Existing content |
| 4 | `/about/ceo` | ارتباط مستقیم با مدیرعامل | `STATIC` + `FORM` | CEO video/message + direct-message form with published SLA (e.g. max 72h) | **Differentiator.** Needs ticket backend + SLA timer |
| 5 | `/about/board` | مدیران و اعضای هیات‌مدیره | `INDEX` | Grid of managers/board members | |
| 6 | `/about/board/[slug]` | پروفایل مدیر | `DETAIL` | Individual bio + short CV | ~10 records |
| 7 | `/about/vision` | چشم‌انداز، ماموریت و ارزش‌ها | `STATIC` | Rework of existing «استراتژی‌های شرکت» | Existing, renamed |
| 8 | `/about/org-chart` | چارت سازمانی | `STATIC` `3D` | Interactive org chart | **New** |
| 9 | `/about/honors` | افتخارات، گواهینامه‌ها و عضویت‌ها | `INDEX` | Certificates, awards, memberships | **New**. Feeds home block 7 |
| 10 | `/about/csr` | مسئولیت اجتماعی و پایداری | `STATIC` | ESG / sustainability reporting | **New** — driven by TSE regulatory trend |

`فرصت‌های همکاری و استخدام` appears here as a **secondary link only**; canonical page is `/careers` (see §9).

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
| 27 | `/ir/financials` | صورت‌های مالی و گزارش فعالیت هیات‌مدیره | `INDEX` | Document archive, filter by year/type | PDF library. Link out to CODAL |
| 28 | `/ir/calendar` | تقویم اطلاع‌رسانی و مجامع عمومی | `INDEX` | Jalali calendar of disclosures & general assemblies | **New** — TSE transparency requirement |
| 29 | `/ir/governance` | گزارش‌های شفافیت و حاکمیت شرکتی | `INDEX` | Governance reports | |
| 30 | `/ir/faq` | پرسش‌های متداول سهامداران | `STATIC` | Shareholder FAQ | **New** |

---

## 8. Cluster 5 — رسانه ثاخت (Media & Knowledge Hub)

Two client requests («نبض و روایت ثاخت» + «کارنامه ثاخت») merged into one menu slot with branded sub-sections, so the header stays at 5 items.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 31 | `/media` | رسانه ثاخت | `HUB` | Combined feed | |
| 32 | `/media/news` | نبض ثاخت | `INDEX` | Daily news & analytical reports | Client item 7 |
| 33 | `/media/news/[slug]` | خبر | `DETAIL` | Article template | |
| 34 | `/media/stories` | روایت ثاخت | `INDEX` | Text blog, podcast, interviews with national figures | Client item 7. **Needs audio player** |
| 35 | `/media/stories/[slug]` | مطلب | `DETAIL` | Article / podcast episode template | |
| 36 | `/media/reports` | کارنامه ثاخت | `INDEX` | Specialist market-management reports + audience Q&A | Client item 8 |
| 37 | `/media/reports/[slug]` | گزارش | `DETAIL` | Report template | |
| 38 | `/media/press-kit` | بسته رسانه‌ای | `STATIC` | Logos, high-res photos, boilerplate for journalists | **New**. Needs ZIP download |

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
| 45 | `/contact` | تماس با ما | `STATIC` + `FORM` | Full contact page, offices, map | CTA button links here as secondary |
| 46 | `/careers` | فرصت‌های همکاری و استخدام | `INDEX` + `FORM` | Canonical careers page | Linked from footer col 4 + About |
| 47 | `/complaints` | سامانه رسیدگی به شکایات مشتریان | `FORM` | Complaints intake with tracking code | Footer col 4 |
| 48 | `/search` | جستجوی سایت | `SYSTEM` | Site-wide search results | **New**. Header icon |
| 49 | `/legal/terms` | قوانین | `SYSTEM` | Footer bottom row | |
| 50 | `/legal/privacy` | حریم خصوصی | `SYSTEM` | Footer bottom row | |
| 51 | `/404` | صفحه یافت نشد | `SYSTEM` `3D` | Branded 404 | |
| 52 | `/500` | خطای سرور | `SYSTEM` | Must render without WebGL | |

> Route numbers run to 52 here; entries 53–54 are the Option B company routes in §5.2. The useful estimating figure is **48 templates (Option A)** or **50 (Option B)**.

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
| 3 — سرمایه‌گذاران | دیده‌بان ثاخت / کدال / صورت‌های مالی / تقویم مجامع |
| 4 — خدمات و همکاری | پروفایل من / سوالات متداول / سامانه رسیدگی به شکایات / **فرصت‌های همکاری و استخدام** |
| 5 — خانواده ثاخت | Logo strip of the 8 subsidiaries, each linked → `/projects/[slug]` (Option A) or `/companies/[slug]` (Option B) |

**Bottom row:** © copyright | قوانین و حریم خصوصی

> Internal systems (office automation, holding portal) are deliberately removed from the main menu and kept footer-only — the public audience has no need for them.

---

## 12. Build priority

| Wave | Scope | Rationale |
|---|---|---|
| **P0** | `/`, header, footer, `/projects` + all four status indexes + `/projects/[slug]`, `/companies` + `/companies/[slug]` (if Option B), `/sales/*`, `/contact`, `/ir` + `/ir/symbol`, 404 | Revenue + regulatory minimum viable site. Company routes are P0 under Option B because the footer and home block 8 link to them |
| **P1** | Full About cluster, Media cluster, `/ir` remainder, `/search`, legal | Completes the public site |
| **P2** | Account/auth cluster, `/complaints`, `/careers`, virtual tours | Requires backend and legal review |

---

## 13. Open questions

1. ⛔ **Option A or Option B** for subsidiary companies? (see §5.2) — blocks content modeling
2. ⛔ Are `completed` and `operating` mutually exclusive statuses, or does a project need tags? (see §5.1)
3. Is `EN` a full translation of all templates, or a reduced ~10-page English site? Cost difference is significant.
4. Is TSETMC data pulled via API, official widget, or a manually updated cache? Affects `/ir/symbol` and home block 4.
5. Does the CEO-message SLA (72h) require a real ticketing backend, or is email routing acceptable for v1?
6. Which projects get a virtual tour at launch?
7. Does `/account/documents` handle identity documents? If so, it triggers data-residency and retention requirements.
