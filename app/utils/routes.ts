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

  about: '/about',
  aboutHistory: '/about/history',
  aboutCeo: '/about/ceo',
  aboutBoard: '/about/board',
  aboutBoardMember: (slug: string) => `/about/board/${slug}`,
  aboutVision: '/about/vision',
  aboutOrgChart: '/about/org-chart',
  aboutHonors: '/about/honors',
  aboutCsr: '/about/csr',

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

/** Header nav — exactly 5 items + 1 CTA (docs/01-sitemap.md §10). */
export const primaryNav: (NavItem & { megaMenu?: MegaMenuColumn[] })[] = [
  {
    label: 'درباره ثاخت',
    href: routes.about,
    megaMenu: [{
      items: [
        { label: 'معرفی شرکت و تاریخچه', href: routes.aboutHistory },
        { label: 'ارتباط مستقیم با مدیرعامل', href: routes.aboutCeo },
        { label: 'مدیران و اعضای هیات‌مدیره', href: routes.aboutBoard },
        { label: 'چشم‌انداز، ماموریت و ارزش‌ها', href: routes.aboutVision },
        { label: 'چارت سازمانی', href: routes.aboutOrgChart },
        { label: 'افتخارات، گواهینامه‌ها و عضویت‌ها', href: routes.aboutHonors },
        { label: 'مسئولیت اجتماعی و پایداری', href: routes.aboutCsr },
        { label: 'فرصت‌های همکاری و استخدام', href: routes.careers },
      ],
    }],
  },
  {
    label: 'پروژه‌ها',
    href: routes.projects,
    megaMenu: [{
      items: [
        { label: 'نقشه پروژه‌ها', href: routes.projectsMap },
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
        { label: 'نبض ثاخت', href: routes.mediaNews },
        { label: 'روایت ثاخت', href: routes.mediaStories },
        { label: 'کارنامه ثاخت', href: routes.mediaReports },
        { label: 'بسته رسانه‌ای', href: routes.mediaPressKit },
      ],
    }],
  },
]

export const headerCta: NavItem = { label: 'مشاوره و تماس سریع', href: routes.salesConsultation }

/** Footer — 5 columns (docs/01-sitemap.md §11). */
export const footerColumns: MegaMenuColumn[] = [
  { items: [] }, // col 1: logo + intro + address, rendered separately in SiteFooter
  {
    heading: 'دسترسی سریع',
    items: [
      { label: 'درباره ثاخت', href: routes.about },
      { label: 'پروژه‌ها', href: routes.projects },
      { label: 'فروش و پیش‌فروش', href: routes.sales },
      { label: 'تماس با ما', href: routes.contact },
    ],
  },
  {
    heading: 'سرمایه‌گذاران',
    items: [
      { label: 'دیده‌بان ثاخت', href: routes.ir },
      { label: 'صورت‌های مالی', href: routes.irFinancials },
      { label: 'تقویم مجامع', href: routes.irCalendar },
    ],
  },
  {
    heading: 'خدمات و همکاری',
    items: [
      { label: 'پروفایل من', href: routes.account },
      { label: 'سوالات متداول', href: routes.irFaq },
      { label: 'سامانه رسیدگی به شکایات', href: routes.complaints },
      { label: 'فرصت‌های همکاری و استخدام', href: routes.careers },
    ],
  },
  { heading: 'خانواده ثاخت', items: [] }, // col 5: subsidiary logo strip, rendered from data
]

export const legalNav: NavItem[] = [
  { label: 'قوانین', href: routes.legalTerms },
  { label: 'حریم خصوصی', href: routes.legalPrivacy },
]
