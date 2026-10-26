# ICD (ثاخت) — Site Map & Page Inventory
**Version:** 1.11 · **Status:** Draft for approval · **Sources:** «ساختار پیشنهادی هدر سایت ICD» · `Financial_Data_.xlsx`

**Changes in 1.11 — the whole catalog is back on sale, and the project page gets a real map (ADR-027).** **(1)** `/sales` shows **every unit again** — the six-unit sample of 1.10 is reverted — and its project picker is removed; `?project=` still deep-links from a project page. **(2)** `#board`'s deputies tier loses «فلاحی» and the senior managers gain «امید بیگ‌پور — مدیر حقوقی و قراردادها». ⛔ he and «امیر شیرین‌بیگ‌پور — مدیر حقوقی» are plausibly the same person; both are published until the owner says. **(3)** `/projects/[slug]` replaces its illustrated aerial with an **OpenStreetMap embed** at district zoom, because the coordinates are city-level; ⛔ the embed could not be reached from this environment and must be confirmed on a real connection. **(4)** Illustrated placeholders are gone from every page but two floor plans: the project gallery is the project's own photographs, and the hero plates on `/companies`, `/contact` and `/complaints` are real. Template count unchanged: **35**.

**Changes in 1.10 — the real feed, three governance tiers, a smoother map (ADR-026).** **(1)** `/media` carries the **eleven real posts** copied from the live site; every invented article and tender notice is deleted. Nine are `news`, two are `tenders`. ⛔ their images are still served from `icd.co.ir` and must be localised before the old site is retired. **(2)** `#board` grows a third tier: board → **board secretary** (named at last: وحید رازافزون) → **معاونین** → مدیران ارشد. **(3)** `/sales` shows **six sample units**, with the card's photography rebuilt as a carousel after the design the owner referenced. **(4)** The `/projects` map no longer re-renders on every pointer event, and the project list beside it takes the map's own height and scrolls. **(5)** The footer carries **six** systems and the company's lockup; the homepage's blog category chips are removed. Template count unchanged: **35**.

**Changes in 1.9 — the client's films, the real board, and one HR destination (ADR-024).** **(1)** The homepage hero is «فیلم شماره ۱», whose own ending — the room dims, the parent lockup and the nine subsidiary marks rise on the conference screen, then clear it — **retires the six tracked windows** of ADR-017; «فیلم شماره ۲» then plays on that screen, and again on `/about#history`. **(2)** `#board` is **ICD's own board**, transcribed from the CODAL filings, with the five senior executives below it and the three committees carrying their full membership and each committee's secretary — closing ADR-018's gap. **(3)** `#vision` is **removed**; `/about/vision` and `/about/csr` now 301 to `#committees`. The About section order is hero · `#history` · `#subsidiaries` · `#board` · `#committees` · `#contact`. **(4)** `/careers` becomes **`/hr`** — «امور اداری و منابع انسانی» — carrying the same content plus HR news and the organisational slogan, reached from a footer button rather than a list item; `/careers` 301s there. **(5)** `/legal/terms` **merges into `/legal/privacy`** and 301s to it; the footer's bottom row carries one «حریم خصوصی». **(6)** «تقویم مجامع» leaves the Investment footer column, every footer link deep-links to its named section, and three external systems (بیمه کوثر, Selfit, اتوماسیون اداری) are added. **(7)** «مهندسی و مدیریت ساخت ثاخت» is the **parent**, not a subsidiary, and is out of every «خانواده ثاخت» list while keeping its own page. **(8)** Three projects are added: «اسپارو» (رشت), «ناریا» (ایزدشهر), «کاسپیانا» (نوشهر). Template count: **35**.

**Changes in 1.8 — fidelity to the approved designs, and a flatter menu (ADR-016).** **(1)** `#history` is a **vertical spine timeline** — a centre line, a node pin per milestone, content card and photograph alternating down the page — as the approved design draws it. §4.2's "horizontal scrolling timeline" wording is superseded, and the five movements' copy now comes from the design. **(2)** «درباره ثاخت», «رسانه ثاخت» and «دیده‌بان ثاخت» are **standalone menu items with no dropdown**; «پروژه‌ها» and «فروش و پیش‌فروش» keep theirs. **(3)** `/ir/symbol`, `/ir/calendar`, `/ir/governance` and `/ir/faq` are **retired as routes** and become `#symbol`, `#calendar`, `#governance` and `#faq` on `/ir/financials`, which they 301 to. **(4)** The eight `/about/*` URLs ADR-004 deleted now 301 to their anchors — half of §13 q9 is closed. **(5)** The **account cluster is built**: `/auth/login` and the five `/account/*` screens, with «ورود سهامداران» pointing at the login. Template count: **36**.

**Changes in 1.7 — navigation follows the approved designs (ADR-015).** The menu now opens the pages that were designed for it. **(1)** «فروش و پیش‌فروش» lands on the designed sales page, now at **`/sales`**; it lists every unit and filters by `?status=pre-sale|ready` and `?project=`. The former `/sales/available` and `/sales/pre-sale` routes **redirect** there (301) and the old sales hub is retired. **(2)** «دیده‌بان ثاخت» lands on the designed documents page **`/ir/financials`**; `/ir` redirects there and the old IR hub is retired. The IR sub-pages stay and are linked from a tab strip on every IR page. **(3)** The header CTA «مشاوره و تماس سریع» opens **`/sales/consultation`**; `/contact` is rebuilt as a plain «تماس با ما» page (channels, desks, offices, callback form) without the former "contact the managers" framing. **(4)** `/ir/financials/[slug]` — the readable view of one document (§7.3) — is now built, and the §7.2 tables A–E render from the client's workbook. **(5)** Placeholders are **illustrated**, not grey (§14). Template count: **40** (two hub templates retired).

**Changes in 1.6 — the financial disclosure specification (ADR-012).** The client's financial workbook is now specified as tabular sections on `/ir/financials` (§7.2): four statement tables and one ratio table, each covering fiscal years ۱۴۰۰–۱۴۰۴ with a pre-created ۱۴۰۵ column, in million rials, for a fiscal year ending **۳۱ شهریور**. The workbook's `توضیحات` sheet turned out to be a **regulatory minimum-disclosure checklist** under the corporate-governance and exchange directive, and checking the site against it exposed three gaps: the management interpretive report (MD&A), the sustainability report, and the major-shareholder and free-float disclosure, none of which existed anywhere in v1.5. Document groups on `/ir/financials` go from five to seven, and a new shareholder-composition table is added. Template count unchanged at **42** — all of this lands on existing routes.

**Changes in 1.5.** Two client decisions (ADR-011). **(1)** «خانواده ثاخت» moves up the homepage to sit **before** «پروژه‌های شاخص» — the funnel now reads brand → group structure → the group's work, rather than showing projects before the companies that built them. Still nine blocks. **(2)** **Option B is decided**, not optional: subsidiary companies are a separate `Company` model with their own pages at `/companies/[slug]`, each listing the projects that belong to it, while projects keep their own detail pages and status categories. §5.2 is rewritten from a choice into a specification and the longest-standing blocker in §13 is closed. Template count is now a single figure: **42**.

**Changes in 1.4.** Three client decisions (ADR-010). **(1)** The CEO section is removed entirely — the homepage «پیام مدیرعامل» block and every remaining reference to a CEO channel or its 72-hour SLA are gone. The homepage drops from ten blocks to nine. **(2)** «کارنامه» (track record) and «افتخارات» (achievements) fold into `#history` on `/about` — one historical narrative section instead of three, and the `#track-record` anchor is retired. **(3)** **Placeholder images are accepted** for the whole build; real photography is substituted later. Template count is unchanged at **42** (Option B) — these are section-level changes.

**Changes in 1.3 — the tenders correction.** Tenders and auctions are **purely informational** — notices and updates, not a transactional destination. The standalone `/tenders` page specified in v1.2 is deleted (ADR-007 superseded by ADR-009). Tender and auction notices now appear in two places only: as a `tenders` category in the Media blog, and on the Investor Relations documents page. That documents page is also consolidated: `/ir/financials` and `/ir/reports` merge into one destination carrying financial statements, board reports, committee performance reports, tender and auction notices, the legal requirements for document registration, and every PDF download. **44 → 42 templates** (Option B); the `Tender` content model is no longer needed.

**Changes in 1.2 — the consolidation pass.** The About cluster collapses from nine routes to one scroll page (ADR-004); committees become a section on it. The Media cluster collapses from three branded indexes to one categorised blog, and «کارنامه ثاخت» performance reports move under Investor Relations (ADR-005). `/careers` absorbs the HR topics and reduces to a two-field resume form (ADR-006). A new footer-only `/tenders` page carries tenders, auctions, and their registration rules (ADR-007). Net effect: **48 → 44 templates** under Option B, with the whole site moving to an image-led, minimal treatment (§14).

**Changes in 1.1:** four-status project model (added «در حال ساخت»); subsidiary companies presented as an explicit Option A / Option B decision for the client.

> Project doc for the 3D website build. Route slugs are English (code-facing); UI labels are Persian (user-facing). Primary locale: `fa-IR`, RTL. Secondary locale: `en`.

---

## 1. Summary

| Metric | Count |
|---|---|
| Unique routes / templates to build | **35** |
| Of which are dynamic templates (`[slug]`) | 6 |
| Estimated rendered URLs at launch | ~79 |
| Content models | 11 |
| Top-level menu clusters | 5 |
| Utility / system pages | 9 |
| Pages requiring a 3D scene | 5 |
| Pages requiring live external data | 3 |

The Option A / Option B choice that shaped earlier versions is **closed in v1.5**: Option B is the structure (§5.2, ADR-011). A single figure replaces the two-column estimate.

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
| 1 | `/` | صفحه اول | `HUB` `3D` | Conversion funnel from brand trust → CTA. **Nine scroll blocks** (0–8) after the CEO block's removal in v1.4. Excerpts only, never full archives. |

### 3.1 Homepage block order (fixed — do not reorder without approval)

| Block | Name | Sources from | Content | CTA |
|---|---|---|---|---|
| 0 | هیرو | — | Brand slogan, 3D animation / holding intro video | «کشف پروژه‌ها» or scroll cue |
| 1 | ثاخت در یک نگاه | About + کارنامه | Key stats: founding year (۱۳۶۴), built area, project count, registered capital | «بیشتر درباره ثاخت» |
| 2 | رسانه ثاخت | Media | **Moved here from block 6 in v1.9 (ADR-025).** One lead story with its photograph and the next four as rows beside it. The category chips were removed in v1.10 | «آرشیو رسانه» |
| 3 | پروژه‌های شاخص | Projects | 3D Tehran map / carousel / featured project + virtual tour entry | «مشاهده همه پروژه‌ها» |
| 4 | بنر فروش و پیش‌فروش | Sales | Current pre-sale offer | «مشاوره خرید» |
| 6 | ویجت دیده‌بان ثاخت | IR | Live ثاخت price + latest CODAL notice | «اطلاعات سرمایه‌گذاران» |
| 2b | خانواده ثاخت | Companies | Subsidiary logo tiles, each linked to `/companies/[slug]` | logo click |
| 7 | افتخارات و اعتماد | About › `#history` | Certificate / award / membership strip | none (trust signal only) |
| 8 | بنر پایانی مشاوره + خبرنامه | Sales + Contact | Final call to action, email/phone form | «درخواست مشاوره» |

> **Moved in v1.5:** «خانواده ثاخت» was block 7, now block 2 — **before** «پروژه‌های شاخص» (ADR-011). The funnel reads brand → group structure → the group's work, instead of showing projects before the companies that built them. Each logo links to `/companies/[slug]`, which is now a real page under Option B (§5.2).
>
> **Removed in v1.4:** the former block 5, «پیام مدیرعامل» (CEO message). Nothing replaces it — the funnel goes from the IR widget straight to the news cards.

**Explicitly excluded from home:** org chart, full financial statements, full FAQ. These are destinations, not shop windows.

---

## 4. Cluster 1 — درباره ثاخت (About)

**One page.** v1.1 specified nine routes here; v1.2 merges them into a single long-scroll page at `/about` (ADR-004). The mega-menu shows six destinations, but they are **in-page anchors, not routes**.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 2 | `/about` | درباره ثاخت | `HUB` `3D` | The entire company story on one image-led scroll page | Replaces 8 deleted sub-routes |

### 4.1 Section order on `/about`

Section ids must stay in sync with `app/components/sections/AboutStitchView.vue` and the anchor entries in `app/utils/routes.ts`. All seven are built as of v1.7.

| Order | Anchor | Label | Content | Notes |
|---|---|---|---|---|
| 1 | — | Hero | Full-bleed project photograph, company name, one line | |
| 2 | `#history` | تاریخچه | **The whole historical narrative, in one section.** See §4.2 | Merges former `/about/history` + «کارنامه» + «افتخارات» (v1.4) |
| 3 | `#subsidiaries` | خانواده ثاخت | **Enlarged, full-width section.** Low-opacity blurred project photo behind; horizontally scrollable row of large subsidiary logo tiles | Links out per §5.2 option |
| 4 | `#board` | هیات‌مدیره، معاونین و مدیران ارشد | **ICD's own board** from the CODAL filings: five members, each with portrait, position, the legal shareholder represented, موظف/غیرموظف status and qualifications — chair and managing director at full size, the rest below, the board secretary (when named) smaller still. Then the board secretary smaller still, then **معاونین**, then مدیران ارشد — four steps of one card anatomy (v1.10) | **No individual profile pages.** Rebuilt in v1.9 (ADR-024); `ui/PersonCard.vue` draws this and the subsidiaries' boards alike |
| 5 | `#committees` | کمیته‌ها | The three committees — حسابرسی, انتصابات, ریسک — each with its mandate, its full membership (independence and financial-expert status marked) and **its secretary named at the foot** | Rebuilt in v1.9 from the CODAL filings (ADR-024). The invented membership in `orgChartData.ts` is deleted |
| 6 | `#contact` | ارتباط | Single form, one «موضوع» dropdown with **exactly two options**: «ارسال رزومه» and «ارتباط با سهامداران» | |

### 4.2 `#history` — one narrative, four movements

v1.2 split the company's past across `#history` (timeline) and `#track-record` (gallery), with achievements implied in both. v1.4 merges them: one section, read top to bottom, because the timeline, the delivered work and the awards are the same story told at different scales (ADR-010). The `#track-record` anchor is retired.

| Movement | Content |
|---|---|
| 1 — Opening | Brand-story video block. Dark poster frame, centred play control |
| 2 — Timeline | **Vertical spine timeline** from «پارس سازه، ۱۳۳۰» (ADR-016): a centre line with a node pin per milestone, the content card and the photograph alternating sides, collapsing to one stacked column on a phone. Five movements — ۱۳۳۰ · ۱۳۶۴ · ۱۳۷۷ · ۱۳۸۹ · ۱۴۰۳ — each with a year, a heading, one paragraph and a tag chip. **Black-and-white for everything before ۱۳۵۰.** ⛔ The ۱۳۳۰ entry has no archival source or photograph, and the TSE listing year (۱۳۸۹ here, ۱۳۸۳ previously) is unconfirmed — shareholder affairs must settle both |
| 3 — Delivered work | Masonry image grid of completed projects. Names on hover only. No descriptions — this is the former `#track-record` gallery, now the timeline's payoff rather than a separate claim |
| 4 — Recognition | Certificate, award and membership strip. The former «افتخارات». Feeds homepage block 6 |

**Deliberately dropped from `/about`:** the standalone interactive org chart (`/about/org-chart`) and the ESG page (`/about/csr`) as separate routes. Org-chart content is folded into `#committees`; CSR content becomes part of `#vision`. **The CEO section is removed outright in v1.4** — no page, no homepage block, no form option, no SLA (ADR-010). If the client later requires a full standalone ESG disclosure for TSE purposes, it belongs under `/ir`, not here.

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

### 5.2 Subsidiary companies — decided (Option B)

**Resolved in v1.5 (ADR-011).** The question that shaped v1.1 through v1.4 — whether «خانواده ثاخت» meant the 8 projects or 8 separate companies — is answered: they are **separate companies that own projects**. A `Company` model sits above `Project` in a one-to-many relationship. Option A is withdrawn and is no longer specified anywhere in this document.

| # | Route | Label | Type | Function |
|---|---|---|---|---|
| 53 | `/companies` | خانواده ثاخت | `INDEX` | Grid of the 8 subsidiaries. Target of homepage block 2 and footer column 5 |
| 54 | `/companies/[slug]` | صفحه شرکت | `DETAIL` | Company profile, ownership share, management, **and the list of projects belonging to that company** |

#### The two-way relationship

Both directions are required, not optional:

| Direction | Where | Behaviour |
|---|---|---|
| Company → projects | `/companies/[slug]` | Lists every project owned by that company, as project cards linking to `/projects/[slug]` |
| Project → company | `/projects/[slug]` | Names its owner company, linking up to `/companies/[slug]` |

**Projects keep their own pages and their own categories.** The company relationship is additive — it does not replace the structure in §5 and §5.1. A project is reachable three ways: from its status index (`/projects/operating` and the rest), from the 3D map, and from its owner company's page. The four status indexes remain global across all companies; they are not per-company views.

#### Model consequences

- `Project.ownerCompany` is a **required** field, not the nullable migration hatch v1.2 suggested
- `Company` is the 11th content model; 8 records at launch, each needing a profile
- A company with no live project must still render its page — the project list is empty, not broken
- One company owning several projects is the normal case, and the reason Option A was withdrawn

#### What this closes

The 8 subsidiaries are companies, so the entities named in the source document as operating projects — `رویای کیش` · `عفاف‌آباد شیراز` · `نارنجستان ایزدشهر` · `آ.اس.پ مشهد` · `آ.اس.پ تهران` · `مگاپارس تهران` · `برج بین‌المللی تهران` · `مجتمع ساحل نوشهر` — need sorting into companies and projects during content modelling. Some may be both a company name and its flagship project's name. **That mapping is the first content task** (§13 question 1).

`app/utils/routes.ts` already assumed Option B, so no route rework is needed — only the removal of the conditional language around it.

---

## 6. Cluster 3 — فروش و پیش‌فروش (Sales & Pre-sale)

Highest commercial priority. Every page here must terminate in a lead capture.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 19 | `/sales` | فروش و پیش‌فروش | `INDEX` | **The designed sales page (v1.7).** **Every unit in the catalog** since v1.11 — the six-unit sample is reverted and the project picker removed — each card a photo carousel after the referenced design; `?status=` and `?project=` still filter it | Replaces the former hub |
| 20 | ~~`/sales/available`~~ | — | redirect | 301 → `/sales` | Merged into `/sales` in v1.7 |
| 21 | ~~`/sales/pre-sale`~~ | — | redirect | 301 → `/sales?status=pre-sale` | Merged into `/sales` in v1.7 |
| 22 | `/sales/units/[id]` | صفحه واحد | `DETAIL` `3D` | Single unit: floor plan, 3D view, price, availability, "save to favorites" | Ties to `/account/favorites` |
| 23 | `/sales/guide` | راهنمای گام‌به‌گام خرید و قرارداد | `STATIC` | Buyer FAQ + contract walkthrough | **New** |
| 24 | `/sales/consultation` | درخواست مشاوره رایگان | `FORM` | Lead form → CRM | Primary conversion endpoint. **Target of the header CTA** (v1.7) |

---

## 7. Cluster 4 — دیده‌بان ثاخت (Investor Relations)

Rebrand of the existing «امور سهامداری». Regulatory-sensitive: accuracy and freshness are compliance issues, not just UX.

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 25 | ~~`/ir`~~ | — | redirect | 301 → `/ir/financials` | The designed documents page is the IR landing (v1.7) |
| 26 | `/ir/symbol` | اطلاعات نماد ثاخت در بورس | `STATIC` (live) | Live price/volume widget | **TSETMC integration.** Client-requested |
| 27 | `/ir/financials` | اسناد و گزارش‌ها | `INDEX` | **The documents page and IR landing** (v1.7). See §7.1 | Merges former `/ir/reports` (ADR-009). Menu target of «دیده‌بان ثاخت» |
| 28 | `/ir/calendar` | تقویم اطلاع‌رسانی و مجامع عمومی | `INDEX` | Jalali calendar of disclosures & general assemblies | **New** — TSE transparency requirement |
| 29 | `/ir/governance` | گزارش‌های شفافیت و حاکمیت شرکتی | `INDEX` | Governance reports | |
| 30 | `/ir/faq` | پرسش‌های متداول سهامداران | `STATIC` | Shareholder FAQ | **New** |
| 31 | `/ir/financials/[slug]` | سند / گزارش | `DETAIL` | One document rendered as readable text, with its PDF download beside it | Readable view is required, not optional. **Built in v1.7** |

### 7.1 `/ir/financials` — the documents page

One destination for every official document the company publishes. v1.2 split this across `/ir/financials` and `/ir/reports`; v1.3 merges them, because the client describes a single page and because a regulated document with two possible homes will drift (ADR-009).

| Document group | `DocumentGroup` value | Contents | Regulatory |
|---|---|---|---|
| صورت‌های مالی حسابرسی‌شده | `statements` | Audited financial statements, by year | ✓ required |
| گزارش تفسیری مدیریت | `mda` | Management interpretive report (MD&A) | ✓ required — **new in v1.6** |
| گزارش فعالیت هیات‌مدیره | `board-reports` | Official board activity reports | ✓ required |
| گزارش پایداری | `sustainability` | Sustainability / ESG report | ✓ required — **new in v1.6** |
| گزارش‌های عملکرد کمیته‌ها | `committee-reports` | Committee performance reports — moved from `/media/reports` (ADR-005) | ✓ required |
| مناقصات و مزایدات | `tenders` | Tender and auction notices. **Informational only** — see §9.2 | — |
| الزامات قانونی ثبت اسناد | `registration` | Legal requirements for document registration, and the required-documents list | — |

Filterable by group and by year. Links out to CODAL for the filings that live there.

### 7.1.1 Regulatory minimum-disclosure map

The source workbook's `توضیحات` sheet lists the **minimum data the site must carry** under the corporate-governance and exchange directive («حداقل دیتاهای مورد نیاز در سایت از نظر دستورالعمل حاکمیت شرکتی و بورس»). This is a compliance requirement, not a content preference. All six items and where each is satisfied:

| # | Required item | Where it lives | Status in v1.5 |
|---|---|---|---|
| ۱ | فایل صورت‌های مالی حسابرسی شده | `/ir/financials` › `statements` | already specified |
| ۲ | گزارش تفسیری مدیریت | `/ir/financials` › `mda` | **was missing** |
| ۳ | گزارش فعالیت هیئت مدیره | `/ir/financials` › `board-reports` | already specified |
| ۴ | گزارش پایداری | `/ir/financials` › `sustainability` | **was missing as a report.** v1.2 folded CSR content into `/about#vision` as narrative; the directive requires a published report, which narrative prose does not satisfy |
| ۵ | کمیته های تخصصی (ریسک، حسابرسی، انتصابات …) | `/about#committees` + `/ir/financials` › `committee-reports` + `/ir/governance` | partially — the About section carries the classification, but `/ir/governance` must link to it so the disclosure is reachable from the IR cluster |
| ۶ | ترکیب سهامداران عمده و درصد سهام شناور آزاد | `/ir/financials` › new table, §7.2 table F | **was missing entirely** |

> ⛔ **Compliance consequence.** Items 2, 4 and 6 did not exist anywhere in the site before v1.6. These are not nice-to-haves — a listed company whose site omits them is non-compliant. The sustainability one is the subtle failure: ESG content existed as prose on `/about`, which reads as satisfied but is not, because the directive requires a *report*.

### 7.2 Financial performance tables

Source: the client's `Financial_Data_.xlsx`. These are **annually republished tables, not live data** — distinct in both audience rhythm and implementation from the TSETMC feed on `/ir/symbol`.

**Shared properties of every table below:**

| Property | Value |
|---|---|
| Fiscal year end | **۳۱ شهریور** (not ۲۹ اسفند) — the publication cycle follows this, not the calendar year |
| Years shown | ۱۴۰۰ – ۱۴۰۴, with a pre-created empty **۱۴۰۵** column the workbook already carries |
| Unit | **میلیون ریال** (million rials) — must be stated in every table header, never implied |
| Update cadence | Once per year, after the audited statements are issued |
| Required furniture | A visible «به‌روزرسانی: سال مالی ۱۴۰۴» stamp, an archive of prior years, and a CSV/Excel download of each table |

#### The five table groups

| | Table | Source sheet | Shape |
|---|---|---|---|
| A | صورت سود و زیان تلفیقی | `صورت سود و زیان تلفیقی` | 13 line items × 6 years |
| B | صورت وضعیت مالی تلفیقی | `صورت وضعیت مالی تلفیقی` | ~47 line items × 6 years, grouped: دارایی‌های غیرجاری / جاری → حقوق مالکانه → بدهی‌های غیرجاری / جاری |
| C | صورت سود و زیان شرکت اصلی | `صورت سود و زیان شرکت اصلی` | 12 line items × 6 years |
| D | صورت وضعیت مالی شرکت اصلی | `صورت وضعیت مالی شرکت اصلی` | ~45 line items × 6 years, same grouping as B |
| E | نسبت‌های مالی | `نسبت های مالی` | Three sub-groups — نسبت‌های نقدینگی, روند ساختار سرمایه, بازده و سود هر سهم |
| F | ترکیب سهامداران و سهام شناور آزاد | **not in the workbook** | Required by the directive (§7.1.1 item ۶); content still needed from the client |

**Tables A–D each carry three analytical views**, which the workbook holds as three side-by-side blocks per sheet:

1. **مقادیر** — the figures themselves
2. **تحلیل افقی** — year-on-year percentage change, ۱۴۰۱–۱۴۰۴
3. **تحلیل عمودی** — each line as a percentage of درآمدهای عملیاتی, ۱۴۰۰–۱۴۰۴

On a phone these cannot sit side by side. Render them as **three switchable views of one table**, not three tables, and default to مقادیر.

**Table E sub-groups** (۱۴۰۰–۱۴۰۴, each metric reported for تلفیقی and شرکت اصلی except where noted):

| Sub-group | Metrics |
|---|---|
| نسبت‌های نقدینگی | نسبت جاری · نسبت آنی · سرمایه در گردش |
| روند ساختار سرمایه | جمع دارایی‌ها · جمع بدهی‌ها · نسبت مالکانه |
| بازده و سود هر سهم | ROA · ROE · سرمایه · EPS · DPS · درصد تقسیم سود — *شرکت اصلی only* |

#### ⛔ The ۱۴۰۴ capital increase — a correctness requirement, not a styling note

In ۱۴۰۴ the company's سرمایه went from ۹٬۰۰۰٬۰۰۰ to ۸۲٬۳۰۸٬۵۱۲ million rials, and the workbook shows the matching «تعدیل افزایش سرمایه از محل مازاد تجدید ارزیابی» line — a capital increase funded by a **revaluation surplus**. Parent-company total assets move from ۲۶٬۸۸۹٬۷۶۳ to ۱۰۰٬۲۳۲٬۶۱۷ in one year.

This makes several ۱۴۰۴ figures incomparable to prior years:

- **نسبت مالکانه — شرکت اصلی** jumps from ۰٫۵۶ to ۰٫۹۸
- **نسبت جاری — شرکت اصلی** jumps from ۱٫۶۶ to ۸٫۴۲
- **EPS — شرکت اصلی** *falls* from ۶۴۰ to ۱۲۹ rials, because the share count rose roughly ninefold while profit rose

Presented as a plain five-year trend, this reads as a dramatic operational improvement in solvency and a collapse in earnings. **Neither is what happened.** Every affected row needs a footnote marker explaining the revaluation, and the ۱۴۰۴ column needs a visible note. A reader who draws the wrong conclusion from an uncaveated table on a listed company's own IR page is a disclosure problem, not a UX one.

The same applies to any derived chart: do not draw a five-year line through ۱۴۰۴ on these metrics without the break annotated.

#### Placement

These tables sit on **`/ir/financials`**, above the document archive, as a separate tabbed area. Rationale: they are annual, they are derived from the documents immediately below them, and they share that page's audience and update rhythm. `/ir/symbol` is kept for the live TSETMC feed only — mixing a yearly publication into a live-price page confuses two different freshness contracts.

> If the client specifically wants these on the live symbol page instead, that is a one-line change here, but the live widget and the annual tables should still be visually separated with their own "as of" stamps.

### 7.3 Readable **and** downloadable

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

> **Brand-name collision — mostly resolved.** «کارنامه» once appeared in four places. Retiring the Media sub-brand «کارنامه ثاخت» (ADR-005) removed one; folding `#track-record` into `#history` (ADR-010) removed another. Two remain: `/projects/completed` («کارنامه اجرایی» — delivered projects) and the committee performance reports on `/ir/financials`. These are distinct enough in context that no rename is strictly required, but the final Persian copy should not use the bare word «کارنامه» for both. Open question 4 in §13.

---

## 9. Account, utility, legal & system

| # | Route | Label | Type | Function | Notes |
|---|---|---|---|---|---|
| 39 | `/auth/login` | ورود / ثبت‌نام | `FORM` | OTP or password auth | Header icon |
| 40 | `/account` | پروفایل من | `APP` | Dashboard | |
| 41 | `/account/favorites` | واحدهای موردعلاقه | `APP` | Saved units | |
| 42 | `/account/orders` | پیگیری وضعیت خرید | `APP` | Purchase status tracking | |
| 43 | `/account/documents` | مدارک | `APP` | Document upload/download | Sensitive — see security checklist |
| 44 | `/account/tickets` | تیکت پشتیبانی | `APP` | Support tickets | CEO-message threads removed in v1.4 |
| 42 | `/contact` | تماس با ما | `STATIC` + `FORM` | Contact channels, the desk for each topic, offices, short callback form | Rebuilt in v1.7; the header CTA goes to `/sales/consultation`, this page is its secondary link |
| 43 | `/hr` | امور اداری و منابع انسانی | `STATIC` + `FORM` | Organisational slogan, short intro, HR news, two-field resume form, and the HR topics as sections | **Renamed and extended in v1.9** (ADR-024); `/careers` 301s here — see §9.1 |
| 45 | `/complaints` | سامانه رسیدگی به شکایات مشتریان | `FORM` | Complaints intake with tracking code | Footer |
| 46 | `/search` | جستجوی سایت | `SYSTEM` | Site-wide search results | Header icon |
| 48 | `/legal/privacy` | حریم خصوصی | `SYSTEM` | Footer bottom row. Carries the privacy policy **and** the condensed terms of use — `/legal/terms` merged into it and 301s here (v1.9, ADR-024) | |
| 49 | `/404` | صفحه یافت نشد | `SYSTEM` `3D` | Branded 404 | |
| 50 | `/500` | خطای سرور | `SYSTEM` | Must render without WebGL | |

> Route numbers are historical and no longer contiguous — 44 was the deleted `/tenders` (ADR-009), and 53–54 are the Option B company routes in §5.2. Numbers are kept stable so earlier versions and the decision log stay readable. The useful estimating figure is **42 templates** (§1).

### 9.1 `/hr` — امور اداری و منابع انسانی

One page, in this order (ADR-006, extended by ADR-024):

| Order | Anchor | Content |
|---|---|---|
| 0a | `#slogan` | **The organisational slogan** «ما ثاختیم» and the four values under it, on ink |
| 0b | `#news` | **HR news** — the desk's own announcements: administrative, training, welfare, internal calls. ⛔ sample records until the HR desk supplies real ones |
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
**CTA button:** «مشاوره و تماس سریع» → `/sales/consultation` (the designed short form), with secondary link to `/contact`

**Menu targets (v1.8):** درباره ثاخت → `/about` · پروژه‌ها → `/projects` · فروش و پیش‌فروش → `/sales` · دیده‌بان ثاخت → `/ir/financials` · رسانه ثاخت → `/media`. **Only «پروژه‌ها» and «فروش و پیش‌فروش» open a dropdown** — their sub-pages are real routes. The other three are standalone pages that already contain what a dropdown would have listed, so listing it offered the same page several times (ADR-016). The sales cluster keeps its tab strip; the IR tab strip now scrolls to sections on the one page.

Result: ~45% more compact than a conventional 9-item menu.

---

## 11. Footer specification (5 columns)

| Column | Contents |
|---|---|
| 1 | Logo + short intro + address + phone + social links |
| 2 — دسترسی سریع | درباره ثاخت / پروژه‌ها / فروش / تماس با ما / internal systems (اتوماسیون اداری، درگاه هلدینگ) |
| 3 — سرمایه‌گذاران | دیده‌بان ثاخت / اطلاعات نماد / مناقصات و مزایدات / اسناد و گزارش‌ها — every entry deep-links to its own section (v1.9); «تقویم مجامع» removed |
| 4 — خدمات و همکاری | درخواست مشاوره / سوالات متداول / سامانه رسیدگی به شکایات / پروفایل من |
| 5 — خانواده ثاخت | Logo strip of the 8 subsidiaries, each linked → `/companies/[slug]` |

**Brand column:** also carries the address, postcode, phone and fax the client supplied in 1405/08, and the prominent **«امور اداری و منابع انسانی»** button that replaced the careers link (v1.9).

**Systems row (v1.10):** سامانه درگاه · درگاه جامع اطلاع‌رسانی هلدینگ · سامانه منابع انسانی · اتوماسیون اداری · بیمه کوثر · سلفیت — other applications, so they open in a new tab, on a row that wraps rather than crowding.

**Brand column also carries the company's own lockup** (v1.10), on a white plate because the mark is navy and red with no light variant.

**Bottom row:** © copyright | حریم خصوصی | جستجو

> Internal systems (office automation, holding portal) are deliberately removed from the main menu and kept footer-only — the public audience has no need for them.

---

## 12. Build priority

| Wave | Scope | Rationale |
|---|---|---|
| **P0** | `/`, header, footer, `/projects` + all four status indexes + `/projects/[slug]`, `/companies` + `/companies/[slug]`, `/sales/*`, `/contact`, `/ir` + `/ir/symbol`, 404 | Revenue + regulatory minimum viable site. Company routes are firmly P0 in v1.5: homepage block 2 and footer column 5 both link to them, and block 2 now sits above the fold's second screen |
| **P1** | `/about` (one page), `/media` + `/media/[slug]`, `/ir/financials` + `/ir/financials/[slug]`, `/ir` remainder, `/search`, legal | Completes the public site |
| **P2** | Account/auth cluster, `/complaints`, `/careers`, virtual tours | Requires backend and legal review |

> `/ir/financials` carries more weight after the v1.3 merge: it is now the only route serving official documents, committee reports, tender notices and every PDF on the site. It should be built early in P1 rather than late.

---

## 13. Open questions

1. ⛔ **Sort the 8 named entities into companies and projects.** Option B is decided (§5.2), so each of `رویای کیش`، `عفاف‌آباد شیراز`، `نارنجستان ایزدشهر`، `آ.اس.پ مشهد`، `آ.اس.پ تهران`، `مگاپارس تهران`، `برج بین‌المللی تهران`، `مجتمع ساحل نوشهر` must be identified as a company, a project, or both. This is the first content-modelling task and everything in the Projects and Companies clusters depends on it
2. ⛔ Are `completed` and `operating` mutually exclusive statuses, or does a project need tags? (see §5.1)
3. **Photography — deferred, not resolved.** Placeholder images are accepted for the build (v1.4, ADR-010), so this no longer blocks design. It becomes a **pre-launch gate** instead: real assets must exist before the site ships. Still unanswered — how many usable photographs per project across the eight; whether archival material exists for «پارس سازه» and the pre-۱۳۵۰ years the `#history` timeline opens with; whether brand-film footage exists or must be commissioned. The risk did not go away, it moved later and got quieter
4. Two «کارنامه» meanings remain (§8.1): `/projects/completed` and the committee reports on `/ir/financials`. Does the final Persian copy need distinct labels, or is context sufficient?
5. Is `EN` a full translation of all templates, or a reduced ~10-page English site? Cost difference is significant
6. Is TSETMC data pulled via API, official widget, or a manually updated cache? Affects `/ir/symbol` and home block 4
7. Which projects get a virtual tour at launch?
8. Does `/account/documents` handle identity documents? If so, it triggers data-residency and retention requirements
9. Do old `/about/*`, `/media/news/*`, `/media/stories/*` and `/media/reports/*` URLs need 301 redirects? They were deleted rather than redirected. If the current live site uses them, the redirect map in build-checklist Phase 1 must cover them
10. Where did the tender PDFs live on the current site? v1.3 §9.2 notes they were previously hosted in that section — those URLs need redirects to `/ir/financials` and the files need migrating
11. Is `اسناد و گزارش‌ها` the right label for `/ir/financials` now that it carries tenders and registration rules as well as financial statements? The route slug still says `financials`, which will read oddly to a developer — renaming it to `/ir/documents` is cheap now and expensive after launch

**Resolved in v1.4:** the CEO direct-message channel and its 72-hour SLA are removed outright, not relocated (ADR-010). Nothing in the site references a CEO channel.

**Resolved in v1.5:** Option B is the company structure (ADR-011). Option A is withdrawn and no longer appears in this document.

### 13.1 Open items from the financial workbook

Resolved in v1.6: the tables are specified in §7.2 and placed on `/ir/financials`. What the workbook did **not** answer:

1. ⛔ **Table F content is missing.** ترکیب سهامداران عمده و درصد سهام شناور آزاد is required by the directive (§7.1.1 item ۶) but is not in the workbook. Needed: major shareholders with percentages, and the free-float figure. Compliance-blocking
2. ⛔ **Do the MD&A and sustainability reports exist?** §7.1.1 items ۲ and ۴ are required and had no home before v1.6. If the documents themselves have never been produced, that is a reporting gap, not a website gap — and worth raising with the client's shareholder-affairs unit before launch
3. **Who owns the annual update?** The tables are republished once a year after the audited statements. The editor path must not require a developer, and someone in shareholder affairs must own the calendar entry
4. **Is ۱۴۰۵ published or pre-created?** The workbook carries an empty ۱۴۰۵ column. Confirm whether the site should show it as a pending column or hide it until populated — showing an empty year on an IR page invites the wrong conclusion
5. **How is the ۱۴۰۴ revaluation to be worded?** §7.2 requires a footnote on the affected rows. The wording is a disclosure matter and should come from shareholder affairs, not from the design team

---

## 14. Visual direction — image-led and minimal

Applies to every page unless §14.1 exempts it. This is the v1.2 house style and the reason the consolidation happened.

**Principles**
1. Image-led. Where a sentence and a photograph say the same thing, keep the photograph
2. Generous whitespace — minimum 120px of vertical padding between sections
3. Flat. No cards-within-cards, no shadows, no gradients, no decorative icons
4. One accent colour. White background, near-black text
5. Editorial, not brochure — closer to a museum wall label than a corporate pamphlet

### Placeholder images

Placeholder imagery is accepted throughout the build (v1.4). Every image slot is designed and sized now; real photography drops in later. Two rules keep this from becoming a trap:

1. **Placeholders carry the real aspect ratio and crop.** A 16:9 slot filled with a square placeholder will break when the real photo arrives. Size each placeholder to the specified ratio
2. **Placeholders are visibly placeholders.** Since v1.7 (owner's request, ADR-015) they are **flat illustrations in the brand palette** — skyline, tower, residential, coastal, construction, interior, portrait, plan and so on, in `public/img/ph/` — chosen to match each slot's subject so a page can be judged as a design. They are drawings, never photographs, so nothing ships on them by accident; **never stock photography**

The pre-۱۳۵۰ black-and-white treatment still needs deciding on real material (§13 q3): a greyscale filter over a placeholder proves nothing about whether archival photographs exist.

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
