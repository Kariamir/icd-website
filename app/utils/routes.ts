/**
 * Single source of truth for every route in the site (docs/02-build-checklist.md
 * Phase 1: "Route table implemented as a single source of truth file — every
 * link in the codebase resolves through it"). Slugs are English, labels are
 * Persian (docs/01-sitemap.md intro). Option B (subsidiary companies as a
 * separate model, /companies/*) is assumed per sitemap §5.2 recommendation —
 * revisit in docs/decisions.md if the client confirms Option A instead.
 *
 * Tracks docs/01-sitemap.md v1.7: the menu opens the designed pages —
 * /sales and /ir/financials are the cluster landings, /ir, /sales/available and
 * /sales/pre-sale redirect (nuxt.config.ts routeRules, ADR-015). About is one page (ADR-004), Media is one
 * categorised blog (ADR-005), /careers absorbs the HR topics (ADR-006), and
 * tenders are informational only — no /tenders route, no Tender model, with
 * notices in the blog's `tenders` category and the documents on /ir/financials
 * (ADR-009, superseding ADR-007).
 *
 * INVARIANT: every href in primaryNav / footerColumns / legalNav must resolve
 * to a real page under app/pages. Route constants may exist ahead of their
 * page — see PENDING_ROUTES at the bottom for the ones deliberately not yet
 * linked from navigation.
 */
export const routes = {
  home: '/',

  /**
   * The About cluster is ONE page (docs/decisions.md ADR-004). The eight
   * former sub-routes were deleted, not redirected — the entries below are
   * in-page anchors on /about, not routes, and must stay in sync with the
   * section ids in components/sections/AboutStitchView.vue.
   */
  about: '/about',
  /**
   * #history carries the whole historical narrative in four movements:
   * brand-story video, the ۱۳۳۰ timeline, the delivered-work gallery, and the
   * recognition strip. The former #track-record anchor was retired in v1.4
   * (ADR-010) — its gallery now lives inside this section.
   */
  aboutHistory: '/about#history',
  aboutSubsidiaries: '/about#subsidiaries',
  aboutBoard: '/about#board',
  aboutCommittees: '/about#committees',
  aboutContact: '/about#contact',

  projects: '/projects',
  projectsUpcoming: '/projects/upcoming',
  projectsUnderConstruction: '/projects/under-construction',
  projectsOperating: '/projects/operating',
  projectsCompleted: '/projects/completed',
  project: (slug: string) => `/projects/${slug}`,
  projectTour: (slug: string) => `/projects/${slug}/tour`,

  companies: '/companies',
  company: (slug: string) => `/companies/${slug}`,

  /**
   * /sales is the designed sales page (sales_available): every unit for
   * sale, filtered by `?status=`. The former /sales/available and
   * /sales/pre-sale routes redirect here (ADR-015).
   */
  sales: '/sales',
  salesPreSale: '/sales?status=pre-sale',
  salesReady: '/sales?status=ready',
  salesUnit: (id: string) => `/sales/units/${id}`,
  salesGuide: '/sales/guide',
  salesConsultation: '/sales/consultation',

  /** /ir redirects to /ir/financials, the designed IR landing (ADR-015). */
  irSymbol: '/ir/financials#symbol',
  irFinancials: '/ir/financials',
  irCalendar: '/ir/financials#calendar',
  irGovernance: '/ir/financials#governance',
  irFaq: '/ir/financials#faq',
  /**
   * THE documents page (ADR-009). One destination for every official document:
   * financial statements, board activity reports, committee performance
   * reports, tender and auction notices, the legal requirements for document
   * registration, and every PDF download on the site. Filterable by document
   * group and year. Each record must be BOTH readable in-page and
   * downloadable — a PDF-only archive is not acceptable in this cluster.
   *
   * The slug still says `financials` while the page carries more than that;
   * renaming to /ir/documents is sitemap §13 question 12, open.
   */
  irDocument: (slug: string) => `/ir/financials/${slug}`,
  irDocumentGroup: (group: DocumentGroup) => `/ir/financials?group=${group}`,
  irTable: (table: FinancialTable) => `/ir/financials?table=${table}`,

  /**
   * Media is ONE categorised blog (docs/decisions.md ADR-005). Categories are
   * a field on the Article model filtered by query string, NOT routes — adding
   * a category costs a database value, not a route. The three former branded
   * indexes (/media/news, /media/stories, /media/reports) are retired;
   * formal performance reports moved to the IR documents page (ADR-009).
   */
  media: '/media',
  mediaPost: (slug: string) => `/media/${slug}`,
  mediaCategory: (category: MediaCategory) => `/media?category=${category}`,
  mediaPressKit: '/media/press-kit',

  authLogin: '/auth/login',
  account: '/account',
  accountFavorites: '/account/favorites',
  accountOrders: '/account/orders',
  accountDocuments: '/account/documents',
  accountTickets: '/account/tickets',

  contact: '/contact',

  /**
   * «امور اداری و منابع انسانی» is ONE page (ADR-024, superseding ADR-006's
   * /careers): the HR desk's own news, the organisational slogan, a brief
   * intro, the two-field resume form, and the three HR topics as sections.
   * /careers 301s here. The anchors below are in-page, not routes, and must
   * stay in sync with the section ids in components/sections/HrView.vue.
   */
  hr: '/hr',
  hrNews: '/hr#news',
  hrSlogan: '/hr#slogan',
  hrResume: '/hr#resume',
  hrBenefits: '/hr#benefits',
  hrLearning: '/hr#learning',
  hrFaq: '/hr#faq',

  complaints: '/complaints',
  search: '/search',
  /**
   * The terms page is merged into the privacy page (ADR-024) — one «حریم
   * خصوصی» destination carrying both, decluttered. /legal/terms 301s here.
   */
  legalPrivacy: '/legal/privacy',
} as const

/**
 * Systems and services the group runs outside this site. Footer-only, as
 * sitemap §11 requires of internal systems — the public audience has no need
 * for them, and they open in a new tab because they are other applications.
 */
export const externalSystems: { label: string, href: string }[] = [
  { label: 'بیمه کوثر', href: 'https://sinad.kins.ir/DarmanAfzar.Customer' },
  { label: 'سلفیت', href: 'https://selfit.ir' },
  { label: 'اتوماسیون اداری', href: 'https://ow.icd.co.ir/Didgah/UserLogin/Login' },
]

/** Media post categories (ADR-005, ADR-009). Values are the ?category= query values. */
export type MediaCategory = 'news' | 'stories' | 'podcast' | 'analysis' | 'tenders'

export const mediaCategories: { value: MediaCategory, label: string }[] = [
  { value: 'news', label: 'نبض ثاخت' },
  { value: 'stories', label: 'روایت ثاخت' },
  { value: 'podcast', label: 'پادکست' },
  { value: 'analysis', label: 'تحلیل بازار' },
  { value: 'tenders', label: 'مناقصات و مزایدات' },
]

/**
 * Document groups on /ir/financials (ADR-009). One page, filtered by group.
 * Tender notices are a document group here and a blog category above — they
 * are informational in both places and have no model of their own.
 */
export type DocumentGroup =
  | 'statements'
  | 'mda'
  | 'board-reports'
  | 'sustainability'
  | 'committee-reports'
  | 'tenders'
  | 'registration'

/**
 * Groups marked `required` are mandated by the corporate-governance and
 * exchange directive — see docs/01-sitemap.md §7.1.1 and ADR-012. Removing one
 * from the site makes a listed company non-compliant; they are not editorial
 * choices. `mda` and `sustainability` were added in v1.6 after the directive
 * checklist showed they had no home anywhere on the site.
 */
export const documentGroups: { value: DocumentGroup, label: string, required?: true }[] = [
  { value: 'statements', label: 'صورت‌های مالی حسابرسی‌شده', required: true },
  { value: 'mda', label: 'گزارش تفسیری مدیریت', required: true },
  { value: 'board-reports', label: 'گزارش فعالیت هیات‌مدیره', required: true },
  { value: 'sustainability', label: 'گزارش پایداری', required: true },
  { value: 'committee-reports', label: 'گزارش‌های عملکرد کمیته‌ها', required: true },
  { value: 'tenders', label: 'مناقصات و مزایدات' },
  { value: 'registration', label: 'الزامات قانونی ثبت اسناد' },
]

/**
 * Annual financial tables on /ir/financials (ADR-012, sitemap §7.2).
 * Republished once a year after the audited statements; fiscal year ends
 * ۳۱ شهریور and all figures are in میلیون ریال.
 *
 * ۱۴۰۴ CAVEAT: a capital increase from a revaluation surplus (۹٬۰۰۰٬۰۰۰ →
 * ۸۲٬۳۰۸٬۵۱۲ million rials) makes نسبت مالکانه, نسبت جاری and EPS
 * incomparable to prior years. Affected rows need footnotes and no chart may
 * cross ۱۴۰۴ unannotated.
 */
export type FinancialTable =
  | 'income-consolidated'
  | 'balance-consolidated'
  | 'income-parent'
  | 'balance-parent'
  | 'ratios'
  | 'shareholders'

export const financialTables: { value: FinancialTable, label: string }[] = [
  { value: 'income-consolidated', label: 'صورت سود و زیان تلفیقی' },
  { value: 'balance-consolidated', label: 'صورت وضعیت مالی تلفیقی' },
  { value: 'income-parent', label: 'صورت سود و زیان شرکت اصلی' },
  { value: 'balance-parent', label: 'صورت وضعیت مالی شرکت اصلی' },
  { value: 'ratios', label: 'نسبت‌های مالی' },
  { value: 'shareholders', label: 'ترکیب سهامداران و سهام شناور آزاد' },
]

/** The three analytical views tables A–D carry. Default to `values`. */
export type FinancialView = 'values' | 'horizontal' | 'vertical'

export const financialViews: { value: FinancialView, label: string }[] = [
  { value: 'values', label: 'مقادیر' },
  { value: 'horizontal', label: 'تحلیل افقی' },
  { value: 'vertical', label: 'تحلیل عمودی' },
]

/** Fiscal years the tables cover. ۱۴۰۵ exists but may be unpopulated. */
export const fiscalYears = [1400, 1401, 1402, 1403, 1404, 1405] as const
export const FISCAL_YEAR_END = '۳۱ شهریور'
export const FINANCIAL_UNIT = 'میلیون ریال'

export interface NavItem {
  label: string
  href: string
  /** One-line hint shown under the label in the header dropdown. */
  hint?: string
}

export interface MegaMenuColumn {
  heading?: string
  items: NavItem[]
}

/**
 * Header nav — exactly 5 items + 1 CTA (docs/01-sitemap.md §10).
 *
 * Each top-level item opens the page that was designed for it (ADR-015):
 * «فروش و پیش‌فروش» is the designed sales page at /sales, and «دیده‌بان ثاخت»
 * is the designed documents page at /ir/financials — the same targets the
 * approved Stitch header used. The sub-items render as the desktop dropdown
 * and as the mobile drawer's second level. Every href must resolve to a real
 * page (or an in-page anchor on one).
 */
export const primaryNav: (NavItem & { megaMenu?: MegaMenuColumn[] })[] = [
  // No dropdown (ADR-016). /about already IS its sub-pages: history, the
  // subsidiaries showcase and the board are sections on it, so a menu listing
  // them offered the same page four times.
  { label: 'درباره ثاخت', href: routes.about },
  {
    label: 'پروژه‌ها',
    href: routes.projects,
    megaMenu: [{
      items: [
        { label: 'پروژه‌های در حال ساخت', href: routes.projectsUnderConstruction },
        { label: 'پروژه‌های آتی', href: routes.projectsUpcoming },
        { label: 'پروژه‌های در حال بهره‌برداری', href: routes.projectsOperating },
        { label: 'پروژه‌های تکمیل‌شده', href: routes.projectsCompleted },
      ],
    }],
  },
  {
    label: 'فروش و پیش‌فروش',
    href: routes.sales,
    megaMenu: [{
      items: [
        { label: 'همه واحدهای قابل واگذاری', href: routes.sales },
        { label: 'پیش‌فروش پروژه‌های در حال ساخت', href: routes.salesPreSale },
        { label: 'واحدهای آماده تحویل', href: routes.salesReady },
        { label: 'راهنمای خرید و قرارداد', href: routes.salesGuide },
        { label: 'درخواست مشاوره رایگان', href: routes.salesConsultation },
      ],
    }],
  },
  // No dropdown (ADR-016). The four former IR sub-pages are now sections on
  // /ir/financials and their routes redirect to the matching anchor.
  { label: 'دیده‌بان ثاخت', href: routes.irFinancials },
  // No dropdown (ADR-016). The categories are filters on /media, not pages;
  // the tab strip on the page itself is where they belong.
  { label: 'رسانه ثاخت', href: routes.media },
]

/** «مشاوره و تماس سریع» — the designed consultation page (sitemap §6 #24). */
export const headerCta: NavItem = { label: 'مشاوره و تماس سریع', href: routes.salesConsultation }

/**
 * «ورود سهامداران». The authenticated shareholder area (routes.authLogin) is
 * build wave P2 and does not exist yet, so the button opens the IR documents
 * page — the designed landing of the IR cluster. Swap to routes.authLogin once
 * that page exists.
 */
export const shareholderLogin: NavItem = { label: 'ورود سهامداران', href: routes.authLogin }

/**
 * Cluster sub-navigation shown as a tab strip under the hero on every page of
 * the cluster, so the sub-pages stay one click apart.
 */
export const salesNav: NavItem[] = [
  { label: 'همه واحدها', href: routes.sales },
  { label: 'پیش‌فروش', href: routes.salesPreSale },
  { label: 'آماده تحویل', href: routes.salesReady },
  { label: 'راهنمای خرید', href: routes.salesGuide },
  { label: 'درخواست مشاوره', href: routes.salesConsultation },
]

export const irNav: NavItem[] = [
  { label: 'اسناد و گزارش‌ها', href: routes.irFinancials },
  { label: 'اطلاعات نماد', href: routes.irSymbol },
  { label: 'مجامع عمومی', href: routes.irCalendar },
  { label: 'پرسش‌های متداول', href: routes.irFaq },
]

/**
 * Footer — sitemap §11: brand column plus four link columns, and the
 * «خانواده ثاخت» column of the eight subsidiaries, which SiteFooter renders
 * from the company catalog so it can never drift from /companies.
 */
export const footerColumns: MegaMenuColumn[] = [
  {
    heading: 'دسترسی سریع',
    items: [
      { label: 'درباره ثاخت', href: routes.about },
      { label: 'پروژه‌ها', href: routes.projects },
      { label: 'فروش و پیش‌فروش', href: routes.sales },
      { label: 'رسانه ثاخت', href: routes.media },
      { label: 'تماس با ما', href: routes.contact },
    ],
  },
  {
    heading: 'سرمایه‌گذاران',
    items: [
      { label: 'دیده‌بان ثاخت', href: routes.irFinancials },
      { label: 'اطلاعات نماد در بورس', href: routes.irSymbol },
      { label: 'مناقصات و مزایدات', href: `${routes.irDocumentGroup('tenders')}#documents-archive` },
      { label: 'اسناد و گزارش‌ها', href: `${routes.irFinancials}#documents-archive` },
    ],
  },
  {
    heading: 'خدمات و همکاری',
    items: [
      { label: 'درخواست مشاوره', href: routes.salesConsultation },
      { label: 'پرسش‌های متداول', href: routes.irFaq },
      { label: 'سامانه رسیدگی به شکایات', href: routes.complaints },
      { label: 'پروفایل من', href: routes.account },
    ],
  },
]

/**
 * Routes whose constant exists above but which have NO page under app/pages
 * yet, and are therefore deliberately absent from every navigation list.
 * Linking to one of these produces a 404 — add the nav entry in the same
 * commit that adds the page, and delete it from this list.
 */
export const PENDING_ROUTES = [
  'projectTour',
  'mediaPressKit',
] as const

/** Legal / utility links in the footer's bottom bar. */
export const legalNav: NavItem[] = [
  { label: 'حریم خصوصی', href: routes.legalPrivacy },
  { label: 'جستجو', href: routes.search },
]

/** Company contact lines — supplied by the client, 1405/08 (ADR-024). */
export const companyContact = {
  phone: '۰۲۱-۸۷۱۲۳',
  phoneHref: 'tel:+982187123',
  fax: '۰۲۱-۸۸۵۰۵۳۵۰',
  email: 'info@icd.co.ir',
  address: 'تهران - میدان آرژانتین - خیابان احمد قصیر - خیابان هشتم - پلاک ۱۱',
  postalCode: '۱۵۱۴۷۳۷۴۱۱',
  hours: 'شنبه تا چهارشنبه، ۸ تا ۱۷',
} as const
