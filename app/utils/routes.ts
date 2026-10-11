/**
 * Single source of truth for every route in the site (docs/02-build-checklist.md
 * Phase 1: "Route table implemented as a single source of truth file — every
 * link in the codebase resolves through it"). Slugs are English, labels are
 * Persian (docs/01-sitemap.md intro). Option B (subsidiary companies as a
 * separate model, /companies/*) is assumed per sitemap §5.2 recommendation —
 * revisit in docs/decisions.md if the client confirms Option A instead.
 *
 * Tracks docs/01-sitemap.md v1.3: About is one page (ADR-004), Media is one
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
   * section ids in components/sections/AboutOverview.vue.
   */
  about: '/about',
  aboutVision: '/about#vision',
  aboutHistory: '/about#history',
  aboutTrackRecord: '/about#track-record',
  aboutSubsidiaries: '/about#subsidiaries',
  aboutBoard: '/about#board',
  aboutCommittees: '/about#committees',
  aboutContact: '/about#contact',

  projects: '/projects',
  projectsMap: '/projects/map',
  projectsUpcoming: '/projects/upcoming',
  projectsUnderConstruction: '/projects/under-construction',
  projectsOperating: '/projects/operating',
  projectsCompleted: '/projects/completed',
  project: (slug: string) => `/projects/${slug}`,
  projectTour: (slug: string) => `/projects/${slug}/tour`,

  companies: '/companies',
  company: (slug: string) => `/companies/${slug}`,

  sales: '/sales',
  salesAvailable: '/sales/available',
  salesPreSale: '/sales/pre-sale',
  salesUnit: (id: string) => `/sales/units/${id}`,
  salesGuide: '/sales/guide',
  salesConsultation: '/sales/consultation',

  ir: '/ir',
  irSymbol: '/ir/symbol',
  irFinancials: '/ir/financials',
  irCalendar: '/ir/calendar',
  irGovernance: '/ir/governance',
  irFaq: '/ir/faq',
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
   * /careers is ONE page: brief intro, a two-field resume form, then the three
   * HR topics as sections (ADR-006). The anchors below are in-page, not routes,
   * and must stay in sync with the section ids in the careers page component.
   */
  careers: '/careers',
  careersResume: '/careers#resume',
  careersBenefits: '/careers#benefits',
  careersLearning: '/careers#learning',
  careersFaq: '/careers#faq',

  complaints: '/complaints',
  search: '/search',
  legalTerms: '/legal/terms',
  legalPrivacy: '/legal/privacy',
} as const

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
export type DocumentGroup = 'statements' | 'board-reports' | 'committee-reports' | 'tenders' | 'registration'

export const documentGroups: { value: DocumentGroup, label: string }[] = [
  { value: 'statements', label: 'صورت‌های مالی' },
  { value: 'board-reports', label: 'گزارش فعالیت هیات‌مدیره' },
  { value: 'committee-reports', label: 'گزارش‌های عملکرد کمیته‌ها' },
  { value: 'tenders', label: 'مناقصات و مزایدات' },
  { value: 'registration', label: 'الزامات قانونی ثبت اسناد' },
]

export interface NavItem {
  label: string
  href: string
}

export interface MegaMenuColumn {
  heading?: string
  items: NavItem[]
}

/**
 * Header nav — exactly 5 items + 1 CTA (docs/01-sitemap.md §10), in the order
 * the project_detail_page_template mockups use (07_unit_detail, 04_article_main).
 * Every link here must resolve to a page under app/pages — mockup-only
 * destinations with no page yet (press kit, subsidiaries, account area) are
 * intentionally left out until those routes exist.
 */
export const primaryNav: (NavItem & { megaMenu?: MegaMenuColumn[] })[] = [
  {
    label: 'درباره ثاخت',
    href: routes.about,
    megaMenu: [{
      items: [
        { label: 'چشم‌انداز و حاکمیت شرکتی', href: routes.aboutVision },
        { label: 'تاریخچه', href: routes.aboutHistory },
        { label: 'کارنامه', href: routes.aboutTrackRecord },
        { label: 'خانواده ثاخت', href: routes.aboutSubsidiaries },
        { label: 'هیات‌مدیره', href: routes.aboutBoard },
        { label: 'کمیته‌ها', href: routes.aboutCommittees },
        { label: 'فرصت‌های همکاری و استخدام', href: routes.careers },
      ],
    }],
  },
  {
    label: 'پروژه‌ها',
    href: routes.projects,
    megaMenu: [{
      items: [
        { label: 'اطلس و نقشه پروژه‌ها', href: routes.projectsMap },
        { label: 'پروژه‌های آتی', href: routes.projectsUpcoming },
        { label: 'پروژه‌های در حال ساخت', href: routes.projectsUnderConstruction },
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
        { label: 'واحدهای آماده فروش', href: routes.salesAvailable },
        { label: 'پیش‌فروش پروژه‌های در حال ساخت', href: routes.salesPreSale },
        { label: 'راهنمای گام‌به‌گام خرید', href: routes.salesGuide },
        { label: 'درخواست مشاوره رایگان', href: routes.salesConsultation },
      ],
    }],
  },
  {
    label: 'دیده‌بان ثاخت',
    href: routes.ir,
    megaMenu: [{
      items: [
        { label: 'اطلاعات نماد ثاخت در بورس', href: routes.irSymbol },
        { label: 'اسناد و گزارش‌ها', href: routes.irFinancials },
        { label: 'مناقصات و مزایدات', href: routes.irDocumentGroup('tenders') },
        { label: 'تقویم اطلاع‌رسانی و مجامع', href: routes.irCalendar },
        { label: 'گزارش‌های شفافیت و حاکمیت شرکتی', href: routes.irGovernance },
        { label: 'پرسش‌های متداول سهامداران', href: routes.irFaq },
      ],
    }],
  },
  {
    label: 'رسانه ثاخت',
    href: routes.media,
    megaMenu: [{
      items: [
        { label: 'همه مطالب', href: routes.media },
        { label: 'نبض ثاخت — اخبار', href: routes.mediaCategory('news') },
        { label: 'روایت ثاخت — گفتگو', href: routes.mediaCategory('stories') },
        { label: 'پادکست', href: routes.mediaCategory('podcast') },
      ],
    }],
  },
]

export const headerCta: NavItem = { label: 'مشاوره و تماس سریع', href: routes.salesConsultation }

/**
 * «ورود سهامداران» — the mockups link this to a shareholder portal. The
 * authenticated area (routes.authLogin / routes.account) is not built yet, so
 * it points at the IR hub for now. Swap to routes.authLogin once that page exists.
 */
export const shareholderLogin: NavItem = { label: 'ورود سهامداران', href: routes.ir }

/**
 * Footer link grid — the 5 columns shared by the mockups' footers
 * (01a/01b/02a: هلدینگ ثاخت · پروژه‌های عمرانی · سهامداران و کدال ·
 * رسانه و اخبار · امور مشتریان), mapped onto real routes. The brand block,
 * newsletter, contact lines and legal bar are rendered by SiteFooter.
 */
export const footerColumns: MegaMenuColumn[] = [
  {
    heading: 'هلدینگ ثاخت',
    items: [
      { label: 'درباره ثاخت', href: routes.about },
      { label: 'تاریخچه', href: routes.aboutHistory },
      { label: 'هیئت‌مدیره و ارکان راهبری', href: routes.aboutBoard },
      { label: 'کمیته‌ها', href: routes.aboutCommittees },
      { label: 'خانواده ثاخت', href: routes.aboutSubsidiaries },
      { label: 'فرصت‌های همکاری و استخدام', href: routes.careers },
    ],
  },
  {
    heading: 'پروژه‌های عمرانی',
    items: [
      { label: 'اطلس و نقشه پروژه‌ها', href: routes.projectsMap },
      { label: 'پروژه‌های در دست احداث', href: routes.projectsUnderConstruction },
      { label: 'پروژه‌های در حال بهره‌برداری', href: routes.projectsOperating },
      { label: 'پروژه‌های تحویل‌شده', href: routes.projectsCompleted },
      { label: 'طرح‌های آتی و توسعه‌ای', href: routes.projectsUpcoming },
    ],
  },
  {
    heading: 'سهامداران و کدال',
    items: [
      { label: 'تابلوی نماد ثاخت', href: routes.irSymbol },
      { label: 'اسناد و گزارش‌ها', href: routes.irFinancials },
      { label: 'تقویم مجامع عمومی و سود سهام', href: routes.irCalendar },
      { label: 'حاکمیت شرکتی و شفافیت', href: routes.irGovernance },
      { label: 'پرسش‌های متداول سهامداران', href: routes.irFaq },
    ],
  },
  {
    heading: 'رسانه و اخبار',
    items: [
      { label: 'نبض ثاخت — اتاق خبر', href: routes.mediaCategory('news') },
      { label: 'روایت ثاخت — گفتگو', href: routes.mediaCategory('stories') },
      { label: 'پادکست', href: routes.mediaCategory('podcast') },
      { label: 'جستجو در آرشیو سایت', href: routes.search },
    ],
  },
  {
    heading: 'امور مشتریان',
    items: [
      { label: 'واحدهای آماده فروش', href: routes.salesAvailable },
      { label: 'شرایط فروش و پیش‌فروش', href: routes.salesPreSale },
      { label: 'راهنمای خرید و قرارداد', href: routes.salesGuide },
      { label: 'ثبت پیشنهادات و شکایات', href: routes.complaints },
      { label: 'تماس و امور مشتریان', href: routes.contact },
      { label: 'ارسال رزومه', href: routes.careersResume },
    ],
  },
]

/**
 * Routes whose constant exists above but which have NO page under app/pages
 * yet, and are therefore deliberately absent from primaryNav / footerColumns.
 * Linking to one of these produces a 404 — add the nav entry in the same
 * commit that adds the page, and delete it from this list.
 *
 *   routes.irDocument      → /ir/financials/[slug]   (ADR-009)
 *   routes.irDocumentGroup → /ir/financials?group=…   (needs group filtering on the page)
 *   routes.mediaPost       → /media/[slug]            (replaces the three former detail templates)
 *   routes.companies    → /companies          (sitemap §5.2 Option B)
 *   routes.company      → /companies/[slug]
 *   routes.mediaPressKit, routes.authLogin, routes.account* → not built yet
 *
 * The /media?category= links ARE live: the /media page exists, though its
 * category filtering still needs implementing.
 */
export const PENDING_ROUTES = [
  'irDocument',
  'irDocumentGroup',
  'mediaPost',
  'companies',
  'company',
  'mediaPressKit',
  'authLogin',
  'account',
  'accountFavorites',
  'accountOrders',
  'accountDocuments',
  'accountTickets',
] as const

/** Legal / utility links in the footer's bottom bar. */
export const legalNav: NavItem[] = [
  { label: 'حریم خصوصی', href: routes.legalPrivacy },
  { label: 'قوانین و مقررات', href: routes.legalTerms },
  { label: 'سامانه رسیدگی به شکایات', href: routes.complaints },
]

/** Company contact lines shown in the footer (placeholder values from the mockups). */
export const companyContact = {
  phone: '۰۲۱-۸۸۸۸۳۳۲۲',
  phoneHref: 'tel:+982188883322',
  email: 'info@icd3d.ir',
  address: 'تهران، میدان ونک، خیابان ملاصدرا',
} as const
