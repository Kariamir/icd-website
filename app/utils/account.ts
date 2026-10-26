/*
 * Shareholder / buyer account area — content model and sample records.
 *
 * Ported from the approved account canvas (the six `.dc.html` artboards:
 * Login, Main, Favorites, Orders, Documents, Tickets). The canvas is the
 * design source of truth for this cluster; Stitch never covered it.
 *
 * Every record here is SAMPLE DATA so the screens render with real shapes
 * instead of lorem. It is replaced by the WPNuxt / CRM data layer (ADR-002)
 * once a backend exists. Numerals are written as Persian digits in the copy,
 * matching the design — there is no runtime digit conversion in this cluster.
 */

export type AccountNavKey = 'profile' | 'favorites' | 'orders' | 'documents' | 'tickets'

export interface AccountNavItem {
  key: AccountNavKey
  label: string
  href: string
  /** Right-hand counter. `tone: 'alert'` renders it red and bold. */
  badge?: string
  tone?: 'muted' | 'alert'
}

export const accountNav: AccountNavItem[] = [
  { key: 'profile', label: 'پروفایل من', href: '/account' },
  { key: 'favorites', label: 'واحدهای موردعلاقه', href: '/account/favorites', badge: '۴', tone: 'muted' },
  { key: 'orders', label: 'پیگیری وضعیت خرید', href: '/account/orders', badge: '۲', tone: 'muted' },
  { key: 'documents', label: 'مدارک', href: '/account/documents', badge: '۱ ناقص', tone: 'alert' },
  { key: 'tickets', label: 'تیکت پشتیبانی', href: '/account/tickets', badge: '۱', tone: 'muted' },
]

/** The signed-in person, as the top bar and ticket avatars show them. */
export const accountUser = {
  name: 'امیر کریمی',
  initials: 'ا‌ک',
  phone: '۰۹۱۲ ۳۴۵ ۶۷۸۹',
}

/* ---------------------------------------------------------------- dashboard */

export const accountSummary = [
  { value: '۴', label: 'واحد موردعلاقه' },
  { value: '۲', label: 'پرونده خرید فعال' },
  { value: '۱', label: 'مدرک ناقص', alert: true },
  { value: '۱', label: 'تیکت باز' },
]

export const accountAlert = {
  title: 'مدرک شناسایی ناقص است',
  body: 'برای ادامه قرارداد واحد ۱۴۰۴ برج بین‌المللی تهران لازم است.',
  cta: { label: 'بارگذاری مدرک', href: '/account/documents' },
}

/* ------------------------------------------------------------------- orders */

export type StepState = 'done' | 'current' | 'pending'

export interface OrderStep {
  label: string
  /** Jalali date, or the short note the design puts under a live step. */
  meta: string
  state: StepState
  /** Shown in red under a step that is waiting on the buyer. */
  action?: string
}

export interface Order {
  id: string
  unit: string
  project: string
  status: string
  /** `tone` drives the pill: tint = in progress, success = contract signed. */
  tone: 'tint' | 'success'
  ref: string
  steps: OrderStep[]
  facts?: { label: string, value: string }[]
  closingNote?: string
}

export const orders: Order[] = [
  {
    id: '8820-44',
    unit: '۱۴۰۴',
    project: 'برج بین‌المللی تهران',
    status: 'در انتظار مدارک',
    tone: 'tint',
    ref: 'کد پیگیری ۸۸۲۰-۴۴',
    steps: [
      { label: 'رزرو واحد', meta: '۱۴۰۴/۰۶/۱۲', state: 'done' },
      { label: 'پرداخت پیش‌پرداخت', meta: '۱۴۰۴/۰۶/۲۸ · ۴٬۵۰۰٬۰۰۰٬۰۰۰ ریال', state: 'done' },
      { label: 'بررسی مدارک', meta: 'مدرک شناسایی ناقص است.', state: 'current', action: 'اقدام شما' },
      { label: 'عقد قرارداد', meta: 'در انتظار مرحله قبل', state: 'pending' },
    ],
    facts: [
      { label: 'متراژ', value: '۱۸۵ متر' },
      { label: 'طبقه', value: '۱۴' },
      { label: 'مبلغ کل', value: '۲۸٬۰۰۰٬۰۰۰٬۰۰۰ ریال' },
    ],
  },
  {
    id: '7103-19',
    unit: '۸۰۷',
    project: 'مگاپارس تهران',
    status: 'قرارداد منعقد شد',
    tone: 'success',
    ref: 'کد پیگیری ۷۱۰۳-۱۹',
    steps: [
      { label: 'رزرو واحد', meta: '۱۴۰۳/۱۱/۰۴', state: 'done' },
      { label: 'پرداخت پیش‌پرداخت', meta: '۱۴۰۳/۱۱/۲۰', state: 'done' },
      { label: 'بررسی مدارک', meta: '۱۴۰۴/۰۱/۰۹', state: 'done' },
      { label: 'عقد قرارداد', meta: '۱۴۰۴/۰۲/۱۵', state: 'done' },
    ],
    closingNote: 'هر چهار مرحله کامل شد. قرارداد در بخش مدارک در دسترس است.',
  },
]

/* ---------------------------------------------------------------- favorites */

export interface FavouriteUnit {
  unit: string
  project: string
  /** The parent project's own photograph (ADR-027) — the card used to draw an
      illustrated placeholder keyed off the project name. */
  image: string
  specs: string
  status: 'موجود' | 'پیش‌فروش' | 'فروخته شد'
  /** A sold unit offers similar units instead of the unit itself. */
  sold?: boolean
}

export const favouriteUnits: FavouriteUnit[] = [
  { unit: '۱۴۰۴', project: 'برج بین‌المللی تهران', image: '/img/projects/tehran-international-tower-1.jpg', specs: '۱۸۵ متر · طبقه ۱۴ · ۳ خوابه', status: 'موجود' },
  { unit: '۸۰۷', project: 'مگاپارس تهران', image: '/img/projects/mega-pars-tehran-1.jpg', specs: '۱۲۰ متر · طبقه ۸ · ۲ خوابه', status: 'پیش‌فروش' },
  { unit: '۲۱۲', project: 'نارنجستان ایزدشهر', image: '/img/projects/narenjestan-izadshahr-1.jpg', specs: '۹۵ متر · طبقه ۲ · ۲ خوابه', status: 'فروخته شد', sold: true },
  { unit: '۳۳۰', project: 'رویای کیش', image: '/img/projects/roya-elite-4.jpg', specs: '۱۴۰ متر · طبقه ۳ · ۳ خوابه', status: 'پیش‌فروش' },
]

/* ---------------------------------------------------------------- documents */

export interface AccountDocument {
  title: string
  order: string
  date: string
  status: string
  /** error = rejected and must be re-uploaded; tint = signed contract. */
  tone: 'success' | 'error' | 'tint'
  action: string
}

export const accountDocuments: AccountDocument[] = [
  { title: 'تصویر کارت ملی', order: '۸۸۲۰-۴۴', date: '۱۴۰۴/۰۷/۰۲', status: 'ناخوانا — بارگذاری مجدد', tone: 'error', action: 'بارگذاری مجدد' },
  { title: 'تصویر شناسنامه', order: '۸۸۲۰-۴۴', date: '۱۴۰۴/۰۷/۰۲', status: 'تأیید شد', tone: 'success', action: 'دانلود' },
  { title: 'فیش پیش‌پرداخت', order: '۸۸۲۰-۴۴', date: '۱۴۰۴/۰۶/۲۸', status: 'تأیید شد', tone: 'success', action: 'دانلود' },
  { title: 'قرارداد واحد ۸۰۷', order: '۷۱۰۳-۱۹', date: '۱۴۰۴/۰۲/۱۵', status: 'امضا شد', tone: 'tint', action: 'دانلود' },
]

/* ------------------------------------------------------------------ tickets */

export interface TicketMessage {
  author: string
  initials: string
  /** staff replies sit on the tint ground, the buyer's on the grey one. */
  staff?: boolean
  at: string
  body: string
}

export const openTicket = {
  subject: 'تأیید مدرک شناسایی',
  status: 'باز',
  ref: 'تیکت ۲۲۹۱ · پرونده ۸۸۲۰-۴۴',
  messages: [
    {
      author: accountUser.name,
      initials: accountUser.initials,
      at: '۱۴۰۴/۰۷/۰۳ · ۱۰:۲۴',
      body: 'کارت ملی را دو بار بارگذاری کردم و هر بار ناخوانا اعلام شد. چه کیفیتی لازم است؟',
    },
    {
      author: 'کارشناس پرونده',
      initials: 'ث',
      staff: true,
      at: '۱۴۰۴/۰۷/۰۳ · ۱۴:۵۰',
      body: 'اسکن رنگی با وضوح حداقل ۳۰۰ نقطه بر اینچ لازم است. عکس گرفته‌شده با موبایل معمولاً رد می‌شود.',
    },
  ] as TicketMessage[],
}

export const closedTickets = [
  { subject: 'زمان تحویل واحد ۸۰۷', date: '۱۴۰۴/۰۳/۱۱' },
  { subject: 'اصلاح شماره تماس', date: '۱۴۰۳/۱۲/۰۲' },
]
