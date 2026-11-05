# ICD (ثاخت) — Backend Prerequisites
**Version:** 1.1 · **Status:** to be closed before backend development starts
**Companion to:** `01-sitemap.md` v1.18 · `02-build-checklist.md` v1.8 · `decisions.md` ADR-001, ADR-002

> **What this document is for.** The frontend is complete and runs with **no backend at all** (ADR-002): every page reads from local view-model files under `app/utils/`. The day someone sets `WPNUXT_WORDPRESS_URL`, the WPNuxt modules switch on and the data layer has to exist. This file is the list of what must be true **before** that day, so backend work starts against a settled contract rather than discovering it page by page.
>
> Nothing here is a frontend task. Every item is a decision, a credential, a piece of content, or a schema that someone other than the frontend must supply.

---

## 0. The four gates

Backend development should not start until all four are green.

| Gate | Meaning | Owner |
|---|---|---|
| **G1 — Infrastructure** | A WordPress instance exists, is reachable from the build environment, and is reachable from inside Iran | IT / hosting |
| **G2 — Content model** | Every content type in §2 exists in WordPress with the exact field names in §3 | Backend + content |
| **G3 — Content** | Every ⛔ in §5 is closed, or explicitly accepted as launching unresolved | Client desks |
| **G4 — Security** | §6 is signed off by whoever owns legal and compliance | Legal / compliance |

---

## 1. G1 — Infrastructure and environment

- [ ] ⛔ **WordPress instance** (staging and production), with **WPGraphQL** installed and the schema introspectable. `@wpnuxt/core` hard-requires a reachable endpoint to boot `nuxt dev` **and** `nuxt build` — not only for codegen — so an unreachable URL fails the whole app rather than degrading (ADR-002).
- [ ] ⛔ **`WPNUXT_WORDPRESS_URL`** set in each environment. See `.env.example`. Until it is set, `nuxt.config.ts` deliberately leaves the WPNuxt modules out of the `modules` array; that conditional is the switch.
- [ ] ⛔ **Verify the host is reachable from inside Iran**, and that no part of the stack depends on a service that is blocked there or blocks there. The frontend already self-hosts fonts and draws its own map for exactly this reason (ADR-022, ADR-029) — the backend must not reintroduce the problem through a CDN, an object store or a CAPTCHA.
- [ ] Hosting, CDN and TLS decided and documented; HSTS and a CSP that allows only self-hosted asset origins.
- [ ] Staging / production separation, with a content-sync path that does not require a developer.
- [ ] Backups and a restore test. A listed company's IR archive is the one thing that must never be lost.

---

## 2. G2 — Content types

Eleven models. Nine already have a complete local shape the backend can be generated from; the file named beside each is the contract.

| # | Model | Local source of truth | Records today | Notes |
|---|---|---|---|---|
| 1 | `Project` | `app/utils/catalog.ts` → `projects` | 18 | Four-status enum, not four post types (sitemap §5.1) |
| 2 | `Company` | `app/utils/catalog.ts` → `subsidiaries` | 9 + parent | `affiliate` flag distinguishes تابعه from وابسته (ADR-028) |
| 3 | `Unit` | `app/utils/catalog.ts` → `units` | 20 | Four-status enum incl. `sold` (ADR-028). **`project` is a slug that may have no `Project` record** (ADR-034) |
| 4 | `Post` (Article) | `app/utils/posts.ts` | 16 | Seven categories (sitemap §8.1) |
| 5 | `BoardMember` | `app/utils/governanceData.ts` | 5 + secretary + 2 + 3 | ICD's own board; subsidiaries' boards are model 6 |
| 6 | `CompanyBoardMember` | `app/utils/companyBoards.ts` | 35 | Keyed to company slug |
| 7 | `Committee` | `app/utils/governanceData.ts` | 3 | Membership + secretary per committee |
| 8 | `FinancialDocument` | `app/utils/irDocuments.ts` | — | Seven document groups (sitemap §7.1) |
| 9 | `FinancialPeriod` | `app/utils/financialTables.ts` | 6 tables × 6 years | Unit is **میلیون ریال**, stored explicitly, never implied |
| 10 | `Assembly` | `app/utils/calendarData.ts` | — | General meetings |
| 11 | `Ticket` / `Submission` | — | **none** | Nothing exists yet; see §4 |

**Rules that must survive the migration** (each one was a decision, not an accident):

- `Project.status` is **one enum field driving four filtered views**, not four content types (sitemap §5.1).
- `Post.category` is **one enum field filtered by query string**, not seven routes (ADR-005).
- There is **no `Tender` model.** A tender notice is a `Post` with `category: 'tenders'`; a tender document is a `FinancialDocument` with `group: 'tenders'` (ADR-009).
- `Project.company` is **required** (ADR-011), and the relationship is navigable in both directions.
- `FinancialDocument` must carry **both** a readable HTML body and a downloadable file for the same record. A file-only archive is unsearchable, unreadable on a phone and invisible to crawlers — unacceptable in the one cluster where transparency is a regulatory obligation (ADR-009).

---

## 3. Field-level contracts that are easy to get wrong

These are the fields where a careless schema will silently break a page.

| Field | Contract |
|---|---|
| `Project.areaSqm` · `.floors` · `.year` · `.units` | **Nullable.** Three projects have none, and every surface hides the row rather than printing a zero. A non-null column with a `0` default puts «۰ طبقه» on a listed company's project page (ADR-024, and a live instance of it fixed in ADR-032) |
| `Project.progress` + `.progressAsOf` | Always travel together. A progress figure with no reporting date is not publishable |
| `Project.progressPhases` | Alternative to `progress`, not an addition. Where it is set, no single bar is drawn (ADR-032) |
| `Project.origin` | `site` \| `design` \| `deck` — provenance, not display. Keep it; it is how invented records are found |
| `Post.origin` | `site` \| `design`. **The homepage feed excludes `design`** (ADR-031). If this field is dropped, sample posts become the lead story |
| `Post.sortKey` | Numeric `yyyymmdd` Jalali behind the human `date` label. Sorting on the display string will not work |
| `Unit.price` | Nullable. `priceLabel()` renders «تماس بگیرید» when absent — never a zero |
| `Unit.transfer` | Free text. Where absent the page states that terms are settled at contract, rather than asserting an open sale (ADR-028) |
| `Unit.floor` | **Nullable**, and `0` means ground floor — not "unset". Four of the five بعثت units have no stated floor and every surface drops the row; a `NOT NULL DEFAULT 0` column would publish «همکف» as a fact about each of them (ADR-034) |
| `Unit.project` | A slug, **not a foreign key**. It may name a complex with no `Project` record — the بعثت units are sold while their complex has no city and therefore no page. Resolve it as a lookup that can miss, and fall back to `Unit.projectLabel` (ADR-034) |
| `Unit.gallery` | The unit's own photographs, which outrank the parent project's. One set may be shared by several units: the sales desk supplied ten for the whole بعثت complex, not ten per unit |
| `FinancialPeriod.value` | Signed. **Cost and expense lines are stored negative**, which is the workbook's own convention and why the horizontal analysis carries a note (ADR-031). Do not normalise the signs on import |
| Every money field | Unit is **میلیون ریال**, stored as an explicit field, never implied by column name |
| Every date | Jalali. Store an ISO date **and** the Jalali label, or store ISO and format once in one utility — not per template |

---

## 4. G2 — What has no backend at all yet

Everything below is currently simulated in the browser and needs a real endpoint, a store and a notification path.

| Surface | Today | Needs |
|---|---|---|
| `/hr#resume` resume form | `setTimeout`, fake reference number | Multipart upload, virus scan, storage, HR notification. **A name and a phone number cannot be deduplicated** — the backend needs a submission timestamp and a hash of the attached file (ADR-006) |
| `/sales/consultation`, `/contact`, `/complaints` | Client-side validation, simulated submit | CRM/email routing with delivery confirmation; complaints need a tracking code issued to the user |
| Newsletter | Markup only | Double opt-in |
| `/auth/login` | `request()` and `verify()` resolve locally | ⛔ **Real OTP, sessions, and a route middleware guarding `/account/*`.** Every account route is reachable without signing in today (ADR-016). This is the first task of the backend phase |
| `/account/*` | `app/utils/account.ts` sample records, literal counters | Real per-user data |
| `/account/documents` | — | Encrypted at rest, access-controlled, retention policy. **A legal decision before a technical one** (§6) |
| `/ir/financials` symbol widget | `irSymbolData.ts`, flagged `IR_SYMBOL_IS_MOCK` | TSETMC polling + cache + stale-data behaviour. **Never show a price without a timestamp**; alert on feed failure |
| CODAL notices | — | Feed for home block and `/ir` |
| `/search` | `app/utils/siteSearch.ts`, static index | Server-side index with Persian tokenisation. **Verify ZWNJ / نیم‌فاصله handling** |
| Form spam protection | none | Must work **without Google services** |
| Rate limiting | none | On every form endpoint |

---

## 5. G3 — Content that must arrive before launch

The live ⛔ list is maintained in `CLAUDE.md`; this is the subset that **blocks backend or launch** rather than being a content refresh. Each one is a desk's decision, not a developer's.

### Regulatory / disclosure
- [ ] ⛔ **Table F** — major shareholders with percentages, and the free-float figure. Required by the corporate-governance directive (sitemap §7.1.1 item ۶) and **not in the workbook**. Compliance-blocking.
- [ ] ⛔ **Do the MD&A and sustainability reports exist?** Both are required and had no home before sitemap v1.6. If they have never been produced, that is a reporting gap, not a website gap.
- [ ] ⛔ **۱۴۰۴ revaluation footnote wording**, from shareholder affairs. The capital increase from ۹٬۰۰۰٬۰۰۰ to ۸۲٬۳۰۸٬۵۱۲ million rials makes نسبت مالکانه, نسبت جاری and EPS incomparable to prior years.
- [ ] ⛔ **The TSE listing year.** The repo said ۱۳۸۳, the approved design says ۱۳۸۹, and the design was followed (ADR-016). A listed company publishing the wrong IPO year on its own About page is a disclosure error.
- [ ] ⛔ **`irContacts` are two invented people** with `@icd.ir` addresses — the real domain is `icd.co.ir`. Replace with the real desk or delete the section (ADR-027).
- [ ] ⛔ **برج بین‌المللی تهران is published as `completed`** on the deck's authority (ADR-030). If shareholder affairs disagrees it is a one-line revert — but it must be asked.

### Content and rights
- [ ] ⛔ **The eleven media images are still served from `icd.co.ir`.** The feed goes blank the day the old site is switched off. Dropping the files into `Asset Icd/news/` is all it takes (ADR-026).
- [ ] ⛔ **Darbareh font licence.** It shipped with no licence file while every other self-hosted face is OFL. A commercial Iranian typeface on a listed company's site with no licence on file is a legal exposure (ADR-029).
- [ ] ⛔ **Five sample posts carry `origin: 'design'`** — four HR announcements and the academy long-read — and are live in the public feed. Confirm or replace (ADR-031, ADR-032).
- [ ] ⛔ **The academy article's three percentages** were read off a rendered PDF page whose digit layer is unreliable. Verify against the published paper, and add the authors' names, which the supplied PDF omits (ADR-032).
- [ ] ⛔ **Four documented projects are not on the site** — بعثت، عرفان، بهاران، یاس — because the deck gives them no city (ADR-030). **بعثت now sells five units with no project page behind them** (ADR-034); the other three have photographs waiting under an `x-` prefix.
- [ ] ⛔ **The بعثت units' sale status, prices and consultant desks** are all missing from the sales desk's sheet. They ship as `ready` at «تماس بگیرید» with the standing consultant block (ADR-034).
- [ ] ⛔ **Real photography replaces every placeholder.** The pre-launch gate in build-checklist Phase 0 still stands; two floor plans and one project hero are still drawings.
- [ ] ⛔ Award titles, years and issuers for the three real honours (ADR-018).
- [ ] ⛔ Confirm the محمدامین فلاح portrait, identified by elimination rather than by a client label (ADR-024).

### Editorial ownership
- [ ] **Who owns the annual financial-table refresh?** The tables republish once a year after the audited statements, on a ۳۱ شهریور year-end. Someone in shareholder affairs needs the calendar entry, and the editor path must not require a developer (sitemap §13.1 q3).
- [ ] **Is the ۱۴۰۵ column published or pre-created?** Showing an empty year on an IR page invites the wrong conclusion (sitemap §13.1 q4).
- [ ] A content owner per cluster, with a delivery date.
- [ ] Verify the content team can publish **RTL content with correct ZWNJ** in the chosen editor. This is a real failure mode, not a formality.

---

## 6. G4 — Security, legal and compliance

- [ ] ⛔ **`/account/documents` and identity documents.** If real identity documents are uploaded, storage must be encrypted at rest, access restricted to named roles, and a retention/deletion policy agreed. **This is a legal decision before a technical one** and must be settled with legal/compliance before the feature is built (technical-requirements §8).
- [ ] ⛔ **Authentication before anything touches `/account/*`.** The cluster has no auth today and the routes are open to anyone who types them.
- [ ] Privacy policy and the condensed terms reviewed by a lawyer (`/legal/privacy` carries both since ADR-024).
- [ ] Cookie/consent notice if analytics is used; analytics self-hosted, given §1.
- [ ] Dependency vulnerability scan in CI.
- [ ] Enamad (نماد اعتماد الکترونیکی) registration if any transaction happens on-site.
- [ ] ⛔ **IR content accuracy review by the shareholder-affairs unit before launch.** Errors in that cluster are a regulatory issue, not a UX one.

---

## 7. Decisions still open that change the backend

These are from sitemap §13 and are **not** developer choices.

1. ⛔ Are `completed` and `operating` mutually exclusive, or does a project need tags? Migrating enum → tags after the data is in is expensive; the reverse is cheap.
2. ⛔ Is EN a full translation of every template, or a reduced ~10-page English site? This decides whether every content type needs a translation layer from day one.
3. ⛔ TSETMC: official widget, server-side polling with cache, or manual refresh? (Technical recommendation: polling with cache.)
4. Should `/ir/financials` be renamed `/ir/documents`? The slug says `financials` while the page carries tenders and registration rules. **Cheap now, expensive after launch.**
5. Does the current live site serve any legacy URL not yet covered by `routeRules`? Where did the tender PDFs live?
6. Which projects get a virtual tour at launch? `Unit.tour` and `Unit.videos` are empty everywhere.

---

## 8. Order of work, once the gates are green

1. Authentication and the `/account/*` route middleware. Nothing else should ship before the open cluster is closed.
2. `Post`, `Project`, `Company`, `Unit` — the four types every public page reads.
3. `FinancialDocument` + `FinancialPeriod`. `/ir/financials` is the most load-bearing route on the site; every official document and every PDF is reached through it.
4. Forms and their delivery paths, with confirmation.
5. TSETMC and CODAL feeds, with caching, timestamps and failure alerts.
6. Search index.
7. Replace `app/utils/*Data.ts` with real WPNuxt composables, one model at a time, keeping the view-model types at the boundary (`CLAUDE.md`, architecture rules).

> The last step is deliberately last. Each `app/utils/*.ts` file is a working contract: its shape is what every page already consumes. Generating the WordPress schema **from** those files, rather than designing a schema and then reshaping the frontend to it, is the cheaper direction and the one this repo is set up for.
