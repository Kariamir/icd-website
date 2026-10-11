# ICD (ثاخت) — 3D Website Build Checklist
**Version:** 1.3 · **Companion to:** `01-sitemap.md` v1.3
**Starting point:** page inventory approved. Everything before that is out of scope for this document.

> Working agreement: nothing moves to the next phase until every ⛔ blocker in the current phase is closed. Non-blockers can trail.

---

## Phase 0 — Decisions before any code

- [x] ⛔ Lock the page inventory (`01-sitemap.md` §13 open questions answered) — v1.2 consolidation settled, ADR-004 through ADR-008
- [ ] ⛔ **Asset availability audit before any more page design.** The v1.2 direction is image-led (sitemap §14) and fails without images. Count usable photographs per project across the eight; confirm whether archival material exists for «پارس سازه» and the pre-۱۳۵۰ years the `#history` timeline opens with; confirm whether brand-film footage exists or must be commissioned. **This is the critical path — assets, not layout**
- [ ] ⛔ If the pre-۱۳۵۰ archival photography does not exist, choose the replacement visual device for the historical timeline before building `#history` (revisit ADR-008 rather than substituting stock imagery)
- [ ] ⛔ Confirm whether the current live site serves `/about/*` or `/media/news|stories|reports/*` URLs. If it does, those 301 redirects are launch-blocking (sitemap §13 open question 10)
- [ ] ⛔ **Locate the existing tender PDFs.** They were previously hosted in the tenders section; their current URLs need redirects to `/ir/financials` and the files need migrating (sitemap §13 question 11)
- [ ] Decide whether to rename `/ir/financials` to `/ir/documents` now that it carries tenders and registration rules as well as statements. Cheap now, expensive after launch (sitemap §13 question 12)
- [ ] ⛔ **Option A or Option B** on subsidiary companies (sitemap §5.2). Blocks the content model, the footer, and home block 8. Recommendation is Option B
- [ ] ⛔ Confirm the four project statuses and whether `completed` / `operating` are mutually exclusive (sitemap §5.1)
- [ ] ⛔ Confirm hosting: server location, CDN. **Verify the CDN is reachable from inside Iran** — this constrains the whole stack
- [ ] ⛔ Framework decision: SSR-capable (Next.js / Nuxt) is required — an SPA will fail the SEO and IR-transparency goals
- [ ] ⛔ 3D library decision: Three.js + React Three Fiber vs. a pre-built engine. Confirm the team can maintain it
- [ ] Decide EN scope: full mirror vs. reduced English site
- [ ] Confirm no dependency on services blocked in Iran or blocking Iran (Google Fonts CDN, reCAPTCHA, Mapbox, some CDN-hosted GLTF loaders). Self-host everything
- [ ] CMS decision: headless vs. coupled. Content editors are non-technical — verify they can publish RTL content
- [ ] Analytics decision (self-hosted preferred given the above)
- [ ] Repository, branching model, and environments (dev / staging / prod)
- [ ] Define the definition of done for a page (see Phase 12)

---

## Phase 1 — Information architecture & content model

- [x] ⛔ Route table implemented as a single source of truth file (`app/utils/routes.ts`) — every link in the codebase resolves through it
- [ ] ⛔ **Anchor-id sync.** `/about` and `/careers` are single pages whose mega-menu and footer entries are in-page anchors. The anchor constants in `routes.ts` must match the section ids in `AboutOverview.vue` and the careers page component. **Nothing currently enforces this** — a renamed section id silently breaks navigation. Add a test or a build-time assertion
- [ ] ⛔ Keep `PENDING_ROUTES` in `routes.ts` accurate: a route constant may exist before its page, but linking to one from navigation produces a 404. Remove each entry in the same commit that adds its page
- [ ] ⛔ Content models defined: Project, Unit, BoardMember, Article, PodcastEpisode, FinancialDocument, DisclosureEvent, Honor, JobPosting — plus **Company** under Option B. **No `Tender` model** (ADR-009): a tender notice is an `Article` with `category: 'tenders'`, a tender document is a `FinancialDocument` record
- [ ] ⛔ `Article.category` implemented as an enum (`news` / `stories` / `podcast` / `analysis` / `tenders`) filtered by query string, **not** as separate routes (ADR-005, ADR-009). Mirrors the `Project.status` pattern
- [ ] ⛔ `FinancialDocument` needs a **document group** field (statements / board reports / committee reports / tenders / registration rules) so one page can filter by group and year (ADR-009)
- [ ] ⛔ `FinancialDocument` must support **both** a readable HTML body and a downloadable file for the same record — not a file-only record
- [ ] Dated tender notices must display a publication date. This is the one risk the deleted deadline logic guarded against that still applies — an old notice read as current (ADR-009)
- [ ] Resume submissions need a timestamp and a hash of the attached file: a name and phone number alone cannot be deduplicated (ADR-006)
- [ ] ⛔ `Project.status` implemented as a single enum (`upcoming` / `under-construction` / `operating` / `completed`) driving four filtered index views, **not** four separate content types
- [ ] Even under Option A, add a nullable `Project.ownerCompany` field now so the Option B migration stays cheap
- [ ] Bidirectional link rules: `under-construction` project → its pre-sale listing; pre-sale unit → its parent project; project → owner company; company → its projects
- [ ] URL slug policy: English slugs, Persian display titles, no Persian characters in URLs
- [ ] Redirect map from the old site's URLs → new routes (protects existing SEO)
- [ ] Breadcrumb rules per cluster
- [ ] Content inventory audit: what exists, what is rewritten, what is net-new (source doc marks 12 items as «مورد جدید»)
- [ ] Assign a content owner per cluster with a delivery date

---

## Phase 2 — Design system & 3D art direction

- [ ] ⛔ RTL-first design tokens: spacing, type scale, logical properties only (`margin-inline-start`, never `margin-left`)
- [ ] ⛔ **Text budget enforced in review** (sitemap §14): hero 8 words, section heading 4, section body 25, image caption 6, timeline entry 6. Target ~70% reduction against the v1.1 implementation. Without a number, "concise" drifts back to paragraphs by the third review
- [ ] ⛔ Minimal/flat rules applied: no nested cards, no shadows, no gradients, no decorative icons, one accent colour, minimum 120px between sections
- [ ] ⛔ **IR is exempt from the image-led style** (ADR-008). There, minimal means fast, plain and dense. Record it in the design system so a later pass does not "fix" the inconsistency
- [ ] Reusable Stitch/design preamble extracted from the approved About output — spacing scale, type scale, image aspect ratios, the no-cards rules, RTL note — so later screens do not drift from the first
- [ ] ⛔ Persian typeface licensed and self-hosted (Vazirmatn / IRANSans / Estedad). Subset it. Confirm Persian digit rendering
- [ ] Latin typeface pairing for the EN locale + numerals
- [ ] Color system with contrast ratios verified against 3D backgrounds (text over a moving scene is the #1 accessibility failure in 3D sites)
- [ ] 3D art direction board: lighting mood, material language, camera behavior, motion vocabulary
- [ ] ⛔ Decide the fallback aesthetic — what the site looks like with zero WebGL. It must be a designed state, not a broken one
- [ ] Component library: header, mega-menu (2 variants: list + visual), footer, project card, unit card, article card, stat block, live-price widget, form fields, modal, toast
- [ ] Mega-menu interaction spec for touch, keyboard, and hover
- [ ] Loading/skeleton states designed for every async surface

---

## Phase 3 — 3D asset pipeline

- [ ] ⛔ Set the polygon and texture budget per scene **before** modeling starts. Suggested ceiling: hero ≤ 150k tris, project scene ≤ 400k tris, texture memory ≤ 64 MB mobile / 200 MB desktop
- [ ] ⛔ Asset format: glTF 2.0 / `.glb` only
- [ ] Draco or Meshopt compression configured and verified
- [ ] KTX2 / Basis texture compression pipeline
- [ ] LOD levels defined per model (near / mid / far)
- [ ] Baked lighting where possible; real-time lights capped and counted
- [ ] Naming convention + versioning for source files (`.blend`) vs. exports
- [ ] Automated export script so re-exports are reproducible
- [ ] ⛔ Total 3D payload budget per page agreed and written down. Enforce it in CI
- [ ] Source photography/drone footage for the 8 projects commissioned or confirmed available

---

## Phase 4 — Application shell

- [ ] ⛔ RTL layout working end-to-end (`dir="rtl"`, logical CSS, mirrored icons where directional)
- [ ] ⛔ i18n routing (`/fa`, `/en`) with locale switch preserving the current page
- [ ] Jalali (Shamsi) date handling across the app — required for `/ir/calendar` and all article dates
- [ ] Persian numeral formatting utility (and where NOT to use it: prices in forms, phone inputs)
- [ ] Header: 5-item menu, mega-menu, search icon, EN/FA, profile icon, CTA button
- [ ] Sticky/scroll behavior of the header over a 3D hero
- [ ] Footer: 5 columns + bottom row
- [ ] Global error boundary that never leaves a blank 3D canvas
- [ ] Mobile navigation pattern (mega-menus do not translate directly to mobile — design separately)

---

## Phase 5 — Page implementation

Work in the P0 → P1 → P2 waves from `01-sitemap.md` §12.

- [ ] Homepage: all 10 blocks, in the fixed order, each independently lazy-loaded
- [ ] `/about` as one scroll page, sections in the fixed order of sitemap §4.1, including the new `#committees` section (committee data already exists in `OrgChartView.vue` and `BoardMemberProfile.vue` — reuse, do not re-model)
- [ ] `/about#subsidiaries` built as the enlarged, full-width section: low-opacity blurred background photo, horizontally scrollable large logo tiles
- [ ] `/about#board` as one flat card per member — **verify no individual profile route survives**
- [ ] `/about#contact` form with exactly two «موضوع» options: «ارسال رزومه» and «ارتباط با سهامداران»
- [ ] `/media` as one categorised feed; `/media/[slug]` as the single detail template with the podcast player; delete the three former index and detail templates
- [ ] `/ir/financials` as **the** documents page: statements, board reports, committee reports, tender notices, registration rules, every PDF — filterable by group and year (ADR-009). Build early in P1; it is the most load-bearing route on the site
- [ ] `/ir/financials/[slug]` with readable HTML body **and** download for every record
- [ ] `/careers` as one page: intro, two-field resume form, benefits, learning, FAQ — and nothing else
- [ ] Projects cluster: hub, 3D map, all four status indexes, and the `[slug]` template against real data
- [ ] Companies cluster (`/companies`, `/companies/[slug]`) if Option B — footer column 5 and home block 8 depend on it
- [ ] Verify every project has exactly one status and appears in exactly one index (or, if tags were chosen, that duplicates are intentional)
- [ ] Sales cluster with working filters and a unit detail template
- [ ] IR cluster with the live widget
- [ ] About cluster incl. CEO message form
- [ ] Media cluster incl. audio player for podcasts
- [ ] Account cluster (P2)
- [ ] Utility, legal, 404, 500
- [ ] Every page reviewed against its row in the sitemap — function delivered, not just layout built

---

## Phase 6 — 3D scene integration

- [ ] ⛔ Scenes lazy-load: no WebGL context created until the canvas is near viewport
- [ ] ⛔ Only one active WebGL context per page. Dispose geometries, materials, and textures on unmount — verify no leak after 20 navigations
- [ ] `prefers-reduced-motion` respected: static render or poster image instead of animation
- [ ] Device-tier detection → quality presets (low / medium / high)
- [ ] Frame-rate governor: cap at 60fps, throttle when tab is hidden
- [ ] Hero scene interruptible — user can scroll past before it finishes loading
- [ ] 3D Tehran project map: pin interaction, deep-link to project pages, keyboard-navigable alternative list
- [ ] Virtual tour: entry, exit, and orientation reset controls
- [ ] Progressive loading: low-poly placeholder → full model
- [ ] Test on a genuinely low-end Android device, not a throttled desktop

---

## Phase 7 — Data & integrations

- [ ] ⛔ TSETMC live price/volume for the ثاخت symbol — decide pull method, add caching layer, and define stale-data behavior (never show a stale price without a timestamp)
- [ ] CODAL latest-notice feed for home block 4 and `/ir`
- [ ] Financial document library ingest (PDF upload, year/type metadata)
- [ ] Lead form → CRM/email routing with delivery confirmation
- [ ] CEO direct-message form → ticket system with the published SLA timer
- [ ] Complaints form → tracking code issued to the user
- [ ] Newsletter subscription with double opt-in
- [ ] Site search indexing (Persian tokenization — verify it handles ZWNJ / نیم‌فاصله correctly)
- [ ] Enamad (نماد اعتماد الکترونیکی) registration if any transaction occurs on-site

---

## Phase 8 — Performance

- [ ] ⛔ Budgets agreed: LCP < 2.5s on 4G, INP < 200ms, CLS < 0.1, initial JS < 300KB gzipped **excluding** 3D assets
- [ ] ⛔ 3D never blocks LCP — the hero's text and CTA render before the scene
- [ ] Route-level code splitting; Three.js in its own chunk
- [ ] Images: AVIF/WebP, correct sizing, `loading="lazy"` below the fold
- [ ] Font loading strategy: `font-display: swap`, preload the primary weight only
- [ ] Lighthouse ≥ 90 performance on the homepage **on mobile**
- [ ] Test on a real Iranian mobile connection, not just local throttling
- [ ] Bundle-size regression check in CI

---

## Phase 9 — Accessibility

- [ ] ⛔ Full keyboard navigation including the mega-menus
- [ ] ⛔ Every 3D scene has a non-3D equivalent path to the same information
- [ ] Screen reader pass in Persian; `lang` and `dir` correct per element
- [ ] Focus states visible over 3D backgrounds
- [ ] Contrast ≥ 4.5:1 for body text, including text overlaid on scenes
- [ ] Motion: reduced-motion honored, no auto-playing audio, no flashing
- [ ] Forms: labels, error messages in Persian, errors announced
- [ ] Touch targets ≥ 44px

---

## Phase 10 — SEO & structured data

- [ ] ⛔ Server-rendered HTML for all public content (a client-only 3D site is invisible to crawlers)
- [ ] Unique title + meta description per template
- [ ] `hreflang` fa/en pairs + canonical tags
- [ ] Structured data: `Organization`, `RealEstateListing` (units), `Article` (media), `BreadcrumbList`, `FAQPage`
- [ ] `sitemap.xml` generated from the route table; `robots.txt`
- [ ] OG/Twitter cards with static images (never a live 3D render)
- [ ] Old-URL redirects deployed (from Phase 1), **including the deleted `/about/*` and `/media/*` sub-routes** (ADR-004, ADR-005)
- [ ] `/about` and `/careers` carry the metadata that eight and four separate pages used to carry. Verify each section has its own heading level so the single page still ranks for the merged topics
- [ ] Search Console verified

---

## Phase 11 — Security, legal & compliance

- [ ] ⛔ IR content accuracy review by the company's shareholder-affairs unit before launch — errors here are a regulatory issue
- [ ] ⛔ Financial figures on `/ir` carry a source and a date
- [ ] HTTPS, HSTS, CSP (allow only self-hosted asset origins)
- [ ] Form spam protection that works without Google services
- [ ] Rate limiting on all form endpoints
- [ ] `/account/documents`: encrypted at rest, access-controlled, retention policy defined
- [ ] Privacy policy and terms drafted and legally reviewed
- [ ] Cookie/consent notice if analytics is used
- [ ] Dependency vulnerability scan

---

## Phase 12 — QA

- [ ] ⛔ Device matrix defined and tested: iOS Safari, Android Chrome (low + high tier), desktop Chrome/Firefox/Safari/Edge
- [ ] ⛔ WebGL-disabled and WebGL-failure paths tested on every 3D page
- [ ] Slow-3G and offline behavior
- [ ] All forms submitted end-to-end and confirmed received
- [ ] Every link in header, footer, and mega-menus clicked — **including every `#anchor` entry**, which is where the About and Careers merges will break first
- [ ] No navigation entry points at a `PENDING_ROUTES` constant
- [ ] Persian text QA: no broken ZWNJ, no Latin-digit leakage, no LTR bleed
- [ ] Content proofread by a Persian editor
- [ ] Memory-leak test: navigate 20+ pages with 3D scenes, watch heap
- [ ] Cross-check every page against its function column in `01-sitemap.md`

### Definition of done (per page)
Renders SSR · passes budgets · keyboard-navigable · works with WebGL off · content approved by owner · meta tags present · links verified

---

## Phase 13 — Launch & post-launch

- [ ] Staging sign-off from the client, cluster by cluster
- [ ] DNS cutover plan with rollback
- [ ] Monitoring: uptime, error tracking, Core Web Vitals RUM
- [ ] Alert on TSETMC/CODAL integration failure — a broken IR widget is worse than no widget
- [ ] 404 monitoring for missed redirects
- [ ] Handover: content editing guide in Persian for the client's team
- [ ] 30-day post-launch review against conversion goals (consultation requests, unit inquiries)
- [ ] Backlog of P2 items with owners

---

## Recurring risks to watch

| Risk | Mitigation |
|---|---|
| 3D scope creep sinks performance | Budgets fixed in Phase 3, enforced in CI |
| IR data goes stale or wrong | Timestamps, alerting, owner in shareholder affairs |
| Content not ready at build time | Content owners + dates assigned in Phase 1 |
| Blocked third-party services | Self-host everything (Phase 0) |
| Mega-menu unusable on mobile | Separate mobile nav pattern (Phase 4) |
| RTL bugs found late | RTL-first from Phase 2, not retrofitted |
| Image-led design with no images | Asset audit gates Phase 2 (Phase 0). Assets are the critical path, not layout |
| Anchor ids drift from `routes.ts` | Build-time assertion in Phase 1; anchor click-through in Phase 12 |
| Merged pages lose the old URLs' SEO | Redirect map in Phase 1, verified in Phase 10 |
| IR gets "beautified" into uselessness | ADR-008 exemption recorded in the design system |
