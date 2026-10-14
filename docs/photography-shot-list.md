# ICD (ثاخت) — photography shot list
**Version:** 1.0 · **For:** the content team and whoever shoots or sources the images
**Why this exists:** build checklist Phase 0 — *the site does not ship on placeholders.*

Every image on the site today is a flat illustration in the brand palette
(`public/img/ph/`). They are deliberately obvious drawings so nothing ships on
them by accident. This document is the list of what has to replace them.

---

## 0. How to deliver

| | |
|---|---|
| Format | JPEG, sRGB, quality ≥ 85 |
| Size | longest edge **≥ 2400px** (hero plates ≥ 3200px) |
| Naming | the **slot id** in each table below, e.g. `project-tehran-international-tower-hero.jpg` |
| Where | drop the whole folder into `public/img/photos/` in the project |
| Not wanted | stock photography, watermarks, burned-in dates or logos, heavy filters |

**Shoot to the stated ratio.** Each slot is already built at a fixed crop. A
square file dropped into a 16:9 slot loses its top and bottom, and that is how
a careful photograph becomes a bad one.

Where a slot says **ratio 16:10 (crops both ways)**, the image is rendered with
`object-cover` into several different frames across the site — keep the subject
centred and leave air around it.

---

## 1. Projects — the largest block

Eight entities are the company's real portfolio (sitemap §13 q1 still has to
sort which of these are companies and which are projects — **that answer
changes nothing about the photography**, both need shooting):

`برج بین‌المللی تهران` · `مگاپارس تهران` · `آ.اس.پ تهران` · `آ.اس.پ مشهد` ·
`رویای کیش` · `نارنجستان ایزدشهر` · `عفاف‌آباد شیراز` · `مجتمع ساحل نوشهر`

### Per project

| # | Slot id | Ratio | What it is | Notes |
|---|---|---|---|---|
| 1 | `project-<slug>-hero` | **21:9** | Full-bleed plate at the top of the project page | The single most important frame. Shoot it as the building's portrait: whole structure, clean sky, no cranes in the foreground unless the project is under construction |
| 2 | `project-<slug>-card` | **16:10** | The card used in every index, the map and the home page | Can be a tighter crop of the hero, but check it reads at 400px wide |
| 3–6 | `project-<slug>-gallery-1…4` | **4:3** | Detail gallery on the project page | Suggested set: façade detail · entrance / lobby · a typical floor or unit · the site in context (street or skyline) |
| 7 | `project-<slug>-progress` | **16:10** | Only for the three `under-construction` projects | Current site condition. **Date-stamp in the filename, not in the image** |

**8 projects × 6 slots = 48, plus 3 progress frames = 51 photographs.**

> The other 17 projects in `app/utils/catalog.ts` are marked `origin: 'design'`
> — sample records carried over from the approved designs so every page has
> content. **Do not shoot for them.** They are replaced by real records when the
> portfolio is delivered, and their photography comes with them.

---

## 2. Subsidiaries — «خانواده ثاخت»

Eight companies: `آ.اس.پ` · `توسعه ساختمان خاورمیانه` · `باغمیشه` ·
`پارس سازه` · `رهشهر` · `توسعه و عمران امید` · `خدمات مهندسی ایران` ·
`صنایع چوب و فلز ثاخت`

| # | Slot id | Ratio | What it is |
|---|---|---|---|
| 1 | `company-<slug>-cover` | **16:10** | One frame that stands for the company — its building, its site, or its flagship work |
| 2 | `company-<slug>-mark` | **1:1, PNG, transparent** | The logo. Not a photograph — vector or a clean PNG at ≥ 1000px |

**8 covers + 8 logos = 16.**

---

## 3. `/about` — the history section

This is the section with the longest lead time, because some of it may not
exist. Five milestones, each needing one frame:

| Year | Slot id | Ratio | What it needs | Risk |
|---|---|---|---|---|
| ۱۳۳۰ | `history-1330` | **3:2** | Archival: a mid-century industrial construction site — scaffolding, formwork, workers, period equipment | ⛔ **Nothing has been supplied and nobody has confirmed it exists.** Rendered black-and-white. See the note below |
| ۱۳۶۴ | `history-1364` | **3:2** | The founding period: engineers over drawings, an early site, a company document | ⛔ Same question |
| ۱۳۷۷ | `history-1377` | **3:2** | برج بین‌المللی تهران under construction — the structural frame rising | Likely exists in company archives |
| ۱۳۸۹ | `history-1389` | **3:2** | The TSE listing — the exchange hall, the opening, or the certificate | ⛔ **The year itself is unconfirmed** (ADR-016): the repo said ۱۳۸۳, the approved design says ۱۳۸۹. Shareholder affairs must settle this before anything is shot or published |
| ۱۴۰۳ | `history-1403` | **3:2** | Today: a current smart/green building, BIM or BMS in use | Shoot new |

> ⛔ **If the pre-۱۳۵۰ archival photography does not exist**, that is a design
> decision, not a sourcing problem. Do not substitute stock imagery or a
> greyscale filter over something modern — a fabricated archival photograph on
> a listed company's own history page is worse than an honest absence. The
> fallback is a different visual device for those entries (a document scan, a
> drawing, a typographic plate), and it needs deciding rather than working
> around (ADR-008, build checklist Phase 0).

### The rest of `/about`

| # | Slot id | Ratio | What it is |
|---|---|---|---|
| 1 | `about-hero` | **21:9** | Full-bleed plate behind the page title |
| 2 | `about-film-poster` | **21:9** | Poster frame for the brand film | ⛔ **Does the film exist, or must it be commissioned?** Unanswered since v1.2 |
| 3–7 | `about-chain-1…5` | **3:4 (portrait)** | The five-stage value chain: طراحی · تأمین · بتن · اجرا · تحویل · بهره‌برداری — one frame each, people working |
| 8–14 | `about-delivered-1…7` | **16:10 (crops both ways)** | The delivered-work mosaic. Can reuse project heroes |
| 15–20 | `about-recognition-1…6` | **4:3** | Certificates, awards, membership plaques — shot flat and square-on, not at an angle |

**5 timeline + 20 = 25.**

---

## 4. People

| # | Slot id | Ratio | What it is | Notes |
|---|---|---|---|---|
| 1–n | `board-<slug>` | **1:1** | One portrait per board member | Same lighting, same background, same crop for all of them. A set shot by one photographer on one day; mixed portraits are the fastest way to make a board page look improvised |
| + | `careers-intro` | **16:10** | One photograph over the `/careers` intro | People at work, not an empty office |

Count depends on the final board list — currently **10 records**.

---

## 5. Sales

| # | Slot id | Ratio | What it is |
|---|---|---|---|
| 1 | `unit-<id>-main` | **16:9** | Lead image per unit on `/sales` and the unit page |
| 2–4 | `unit-<id>-gallery-1…3` | **4:3** | Interior views |
| 5 | `unit-<id>-plan` | **1:1** | Floor plan — a clean export, not a photograph of a drawing |

**12 sample units are in the catalog today.** Shoot only for units actually on
sale; the rest are sample records like the design-origin projects.

---

## 6. Media and everything else

| # | Slot id | Ratio | What it is |
|---|---|---|---|
| 1–n | `post-<slug>-cover` | **16:10** | One cover per article. Editorial can source these per post rather than in a batch |
| + | `contact-office` | **16:10** | The head office, for `/contact` |
| + | `og-default` | **1200×630 exactly** | The social-share card used when a page has no image of its own |

---

## Totals

| Block | Photographs |
|---|---|
| Projects (8 real entities) | 51 |
| Subsidiaries | 16 (8 photos + 8 logos) |
| `/about` | 25 |
| People | ~11 |
| Sales | depends on live units |
| Media and system | ~5 + per-post |
| **Minimum to launch** | **≈ 108** |

---

## The three questions that block this

Open since sitemap v1.2 (§13 q3) and still unanswered:

1. **How many usable photographs already exist** per project across the eight?
   Shooting list vs. archive list changes the budget entirely.
2. **Does archival material exist** for پارس سازه and the pre-۱۳۵۰ years? If
   not, the `#history` opening needs a different visual device — decided, not
   improvised.
3. **Does brand-film footage exist**, or must it be commissioned? `about-film-poster`
   and the film block on `/about` both depend on the answer.
