/**
 * Single source of truth for every route in the site (docs/02-build-checklist.md
 * Phase 1: "Route table implemented as a single source of truth file — every
 * link in the codebase resolves through it"). Slugs are English, labels are
 * Persian (docs/01-sitemap.md intro). Option B (subsidiary companies as a
 * separate model, /companies/*) is assumed per sitemap §5.2 recommendation —
 * revisit in docs/decisions.md if the client confirms Option A instead.
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

  media: '/media',
  mediaNews: '/media/news',
  mediaNewsArticle: (slug: string) => `/media/news/${slug}`,
  mediaStories: '/media/stories',
  mediaStory: (slug: string) => `/media/stories/${slug}`,
  mediaReports: '/media/reports',
  mediaReport: (slug: string) => `/media/reports/${slug}`,
  mediaPressKit: '/media/press-kit',

  authLogin: '/auth/login',
  account: '/account',
  accountFavorites: '/account/favorites',
  accountOrders: '/account/orders',
  accountDocuments: '/account/documents',
  accountTickets: '/account/tickets',

  contact: '/contact',
  careers: '/careers',
  complaints: '/complaints',
  search: '/search',
  legalTerms: '/legal/terms',
  legalPrivacy: '/legal/privacy',
} as const

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
        { label: 'صورت‌های مالی و گزارش فعالیت', href: routes.irFinancials },
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
        { label: 'نبض ثاخت — اخبار', href: routes.mediaNews },
        { label: 'روایت ثاخت — گفتگو و پادکست', href: routes.mediaStories },
        { label: 'کارنامه ثاخت — گزارش‌های تخصصی', href: routes.mediaReports },
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
      { label: 'صورت‌های مالی حسابرسی‌شده', href: routes.irFinancials },
      { label: 'تقویم مجامع عمومی و سود سهام', href: routes.irCalendar },
      { label: 'حاکمیت شرکتی و شفافیت', href: routes.irGovernance },
      { label: 'پرسش‌های متداول سهامداران', href: routes.irFaq },
    ],
  },
  {
    heading: 'رسانه و اخبار',
    items: [
      { label: 'نبض ثاخت — اتاق خبر', href: routes.mediaNews },
      { label: 'روایت ثاخت — گفتگو و پادکست', href: routes.mediaStories },
      { label: 'کارنامه ثاخت — گزارش‌های تخصصی', href: routes.mediaReports },
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
    ],
  },
]

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
