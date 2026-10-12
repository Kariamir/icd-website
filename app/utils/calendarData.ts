/**
 * Mock content for /ir/calendar — placeholder pending the real WordPress
 * data layer (docs/decisions.md ADR-002).
 *
 * Page structure follows `project_detail_page_template/02c_calendar_module`
 * (hero + quick metrics, upcoming/past event tabs, category checkboxes,
 * fiscal-year selector, calendar-sync card, big-date event rows with
 * add-to-calendar + related document link, load more, shareholder support
 * strip). Dates are stored as Jalali and converted to Gregorian with
 * `irDateUtils` for .ics / Google Calendar export. Events are spread around
 * the current fiscal year so the upcoming/past split is meaningful.
 */
import type { CalendarEventViewModel } from '~/types/content'
import { formatJalaliNumeric, jalaliToIso, type JalaliDate } from '~/utils/irDateUtils'

/** Base labels for the shared `CalendarEventViewModel['type']` union (kept for existing consumers). */
export const calendarEventTypeLabels: Record<CalendarEventViewModel['type'], string> = {
  assembly: 'مجمع عمومی',
  'quarterly-report': 'گزارش فصلی',
  disclosure: 'افشای اطلاعات',
}

/** Extended category set used by the 02c calendar filters. */
export type CalendarCategoryKey = CalendarEventViewModel['type'] | 'webcast' | 'silent-period' | 'dividend' | 'fiscal'

export const calendarCategories: Record<CalendarCategoryKey, { label: string; filterLabel: string }> = {
  assembly: { label: 'مجمع عمومی', filterLabel: 'مجامع عمومی عادی و فوق‌العاده' },
  'quarterly-report': { label: 'گزارش دوره‌ای', filterLabel: 'انتشار صورت‌های مالی و گزارش‌های دوره‌ای' },
  webcast: { label: 'کنفرانس برخط و وب‌کست', filterLabel: 'وبینارها و کنفرانس‌های تحلیلی' },
  disclosure: { label: 'افشای اطلاعات', filterLabel: 'افشای اطلاعات بااهمیت' },
  'silent-period': { label: 'دوره سکوت معاملاتی (Silent Period)', filterLabel: 'دوره سکوت معاملاتی (Silent Period)' },
  dividend: { label: 'پرداخت سود سهام (سجام)', filterLabel: 'پرداخت سود سهام و سجام' },
  fiscal: { label: 'سال مالی', filterLabel: 'پایان سال مالی و بستن دفاتر' },
}

export interface CalendarEventLink {
  label: string
  href: string
  icon: 'live' | 'doc' | 'download'
}

export interface CalendarEventRecord {
  id: string
  category: CalendarCategoryKey
  title: string
  description: string
  date: JalaliDate
  /** 24h `HH:MM`, local Tehran time — omitted for all-day events */
  time?: string
  timeLabel?: string
  location?: string
  /** silent periods span several days */
  durationDays?: number
  secondaryTag?: string
  links?: CalendarEventLink[]
  relatedHref: string
  relatedLabel: string
}

export interface CalendarEventDerived extends CalendarEventRecord {
  iso: string
  /** e.g. `1404-1405` — fiscal years run 1 Mehr → 31 Shahrivar */
  fiscalYear: string
}

export function fiscalYearOf(date: JalaliDate): string {
  return date.m >= 7 ? `${date.y}-${date.y + 1}` : `${date.y - 1}-${date.y}`
}

const ev = (e: CalendarEventRecord): CalendarEventDerived => ({ ...e, iso: jalaliToIso(e.date), fiscalYear: fiscalYearOf(e.date) })

const agmNotice: CalendarEventLink = { label: 'آگهی دعوت به مجمع منتشره در کدال', href: '/ir/governance', icon: 'download' }

export const calendarEventRecords: CalendarEventDerived[] = [
  // ---- fiscal year 1405–1406 (current) ----
  ev({ id: 'ev-1405-07-15', category: 'silent-period', title: 'آغاز دوره سکوت اطلاعاتی منتهی به انتشار صورت‌های مالی سالانه حسابرسی‌شده', description: 'بر اساس دستورالعمل انضباطی سازمان بورس، هرگونه مصاحبه، افشای زودهنگام و تبادل اطلاعات غیرعلنی با سهامداران و رسانه‌ها تا انتشار رسمی گزارش در کدال متوقف می‌شود.', date: { y: 1405, m: 7, d: 15 }, timeLabel: 'از ساعت ۰۸:۰۰ صبح به مدت ۱۰ روز کاری', durationDays: 14, relatedHref: '/ir/governance', relatedLabel: 'مشاهده جزئیات ضوابط' }),
  ev({ id: 'ev-1405-08-20', category: 'webcast', title: 'کنفرانس برخط و وب‌کست تعاملی تحلیل عملکرد مالی سال ۱۴۰۴–۱۴۰۵ هلدینگ ثاخت', description: 'با حضور معاونت مالی و سرمایه‌گذاری و مدیران عامل شرکت‌های تابعه جهت پاسخ به پرسش‌های تحلیل‌گران ارشد بازار سرمایه، نهادهای مالی و سهامداران خرد.', date: { y: 1405, m: 8, d: 20 }, time: '10:00', timeLabel: 'ساعت ۱۰:۰۰ قبل از ظهر', secondaryTag: 'ثبت‌نام آزاد', links: [{ label: 'ورود به تالار پخش زنده', href: 'https://codal.ir', icon: 'live' }, { label: 'دریافت فایل ارائه (PDF)', href: '/ir/financials', icon: 'doc' }], relatedHref: '/ir/financials', relatedLabel: 'ورود به صفحه رویداد' }),
  ev({ id: 'ev-1405-09-10', category: 'quarterly-report', title: 'انتشار صورت‌های مالی تلفیقی سالانه حسابرسی‌شده منتهی به ۱۴۰۵/۰۶/۳۱', description: 'بارگذاری گزارش حسابرس مستقل، صورت‌های مالی تلفیقی و گزارش تفسیری مدیریت دوره ۱۲ ماهه در سامانه کدال.', date: { y: 1405, m: 9, d: 10 }, secondaryTag: 'سامانه کدال', relatedHref: '/ir/financials', relatedLabel: 'آرشیو صورت‌های مالی' }),
  ev({ id: 'ev-1405-10-28', category: 'assembly', title: 'مجمع عمومی عادی سالیانه صاحبان سهام منتهی به سال مالی ۱۴۰۵ شرکت بین‌المللی توسعه ساختمان', description: 'دستور جلسه: استماع گزارش هیات‌مدیره و بازرس قانونی، تصویب صورت‌های مالی، تصمیم‌گیری در خصوص تقسیم سود نقدی (DPS)، انتخاب بازرس قانونی و روزنامه کثیرالانتشار.', date: { y: 1405, m: 10, d: 28 }, time: '09:00', timeLabel: 'ساعت ۰۹:۰۰ صبح', location: 'تهران، سالن همایش‌های بین‌المللی رازی', links: [{ label: 'دریافت پیوند پخش برخط زنده', href: 'https://codal.ir', icon: 'live' }, agmNotice], relatedHref: '/ir/governance', relatedLabel: 'جزئیات مجمع' }),
  ev({ id: 'ev-1405-11-20', category: 'dividend', title: 'آغاز واریز متمرکز سود نقدی مصوب سهامداران حقیقی از طریق سامانه سجام', description: 'سود مصوب مجمع سالیانه به حساب بانکی معتبر معرفی‌شده سهامداران حقیقی در سامانه سجام واریز خواهد شد. سهامداران فاقد کد سجام می‌توانند از شعب بانک عامل نسبت به دریافت سود اقدام نمایند.', date: { y: 1405, m: 11, d: 20 }, secondaryTag: 'سپرده‌گذاری مرکزی اوراق بهادار', relatedHref: '/ir/faq', relatedLabel: 'جدول زمان‌بندی سود' }),
  ev({ id: 'ev-1405-12-20', category: 'quarterly-report', title: 'انتشار اطلاعات و صورت‌های مالی میان‌دوره‌ای ۳ ماهه منتهی به ۱۴۰۵/۰۹/۳۰', description: 'گزارش نخستین فصل سال مالی به همراه روند واگذاری واحدهای مسکونی و تجاری پروژه‌های در حال ساخت.', date: { y: 1405, m: 12, d: 20 }, relatedHref: '/ir/financials', relatedLabel: 'آرشیو صورت‌های مالی' }),
  ev({ id: 'ev-1406-02-20', category: 'silent-period', title: 'دوره سکوت اطلاعاتی منتهی به انتشار صورت‌های مالی میان‌دوره‌ای ۶ ماهه', description: 'دوره عدم افشای گزارش‌های پیش‌بینی تا زمان بارگذاری کامل گزارش ۶ ماهه در سامانه جامع اطلاع‌رسانی ناشران (کدال).', date: { y: 1406, m: 2, d: 20 }, timeLabel: 'به مدت ۱۰ روز کاری', durationDays: 14, relatedHref: '/ir/governance', relatedLabel: 'ضوابط دوره سکوت' }),
  ev({ id: 'ev-1406-03-05', category: 'webcast', title: 'وب‌کست تحلیل عملکرد نیم‌سال اول سال مالی ۱۴۰۵–۱۴۰۶', description: 'مرور نتایج ۶ ماهه، پیشرفت فیزیکی پروژه‌های شاخص و برنامه تأمین مالی نیم‌سال دوم.', date: { y: 1406, m: 3, d: 5 }, time: '11:00', timeLabel: 'ساعت ۱۱:۰۰', secondaryTag: 'ثبت‌نام آزاد', links: [{ label: 'ثبت‌نام در وب‌کست', href: 'https://codal.ir', icon: 'live' }], relatedHref: '/ir/financials', relatedLabel: 'ورود به صفحه رویداد' }),
  ev({ id: 'ev-1406-04-10', category: 'disclosure', title: 'افشای برنامه افزایش سرمایه و گزارش توجیهی هیات‌مدیره', description: 'انتشار گزارش توجیهی افزایش سرمایه از محل سود انباشته و اظهارنظر بازرس قانونی پیش از دعوت به مجمع فوق‌العاده.', date: { y: 1406, m: 4, d: 10 }, relatedHref: '/ir/financials', relatedLabel: 'افشای اطلاعات بااهمیت' }),
  ev({ id: 'ev-1406-06-31', category: 'fiscal', title: 'پایان سال مالی ۱۴۰۵–۱۴۰۶ هلدینگ ثاخت و شروع حسابرسی مستقل صورت‌های تلفیقی', description: 'خاتمه دوره دوازده‌ماهه مالی و آغاز فرایند بررسی دفاتر قانونی توسط حسابرس معتمد سازمان بورس و اوراق بهادار تهران.', date: { y: 1406, m: 6, d: 31 }, secondaryTag: 'بستن دفاتر و انبارگردانی', relatedHref: '/ir/financials', relatedLabel: 'مشاهده تقویم مالی' }),

  // ---- fiscal year 1404–1405 ----
  ev({ id: 'ev-1405-06-31', category: 'fiscal', title: 'پایان سال مالی ۱۴۰۴–۱۴۰۵ هلدینگ ثاخت', description: 'خاتمه دوره دوازده‌ماهه مالی و آغاز حسابرسی صورت‌های مالی تلفیقی و جداگانه.', date: { y: 1405, m: 6, d: 31 }, secondaryTag: 'بستن دفاتر و انبارگردانی', relatedHref: '/ir/financials', relatedLabel: 'آرشیو صورت‌های مالی' }),
  ev({ id: 'ev-1405-04-25', category: 'disclosure', title: 'افشای اطلاعات بااهمیت — انعقاد قرارداد فروش عمده واحدهای تجاری مگاپارس', description: 'اعلام مبلغ قرارداد، خریدار و آثار سود و زیانی ناشی از واگذاری ۸ واحد تجاری در طبقات همکف.', date: { y: 1405, m: 4, d: 25 }, relatedHref: '/ir/financials', relatedLabel: 'مشاهده اطلاعیه' }),
  ev({ id: 'ev-1405-03-10', category: 'webcast', title: 'کنفرانس مطبوعاتی و وب‌کست تحلیل عملکرد مالی نیم‌ساله اول هلدینگ ثاخت', description: 'ارائه نتایج ۶ ماهه و پاسخ به پرسش‌های تحلیلگران و سهامداران خرد.', date: { y: 1405, m: 3, d: 10 }, time: '10:00', timeLabel: 'ساعت ۱۰:۰۰ قبل از ظهر', links: [{ label: 'مشاهده ویدیوی ضبط‌شده', href: 'https://codal.ir', icon: 'live' }, { label: 'دریافت فایل ارائه (PDF)', href: '/ir/financials', icon: 'doc' }], relatedHref: '/ir/financials', relatedLabel: 'ورود به صفحه رویداد' }),
  ev({ id: 'ev-1405-02-31', category: 'quarterly-report', title: 'انتشار صورت‌های مالی میان‌دوره‌ای ۶ ماهه منتهی به ۱۴۰۴/۱۲/۲۹', description: 'صورت‌های مالی تلفیقی و مستقل به همراه گزارش تفسیری مدیریت نیم‌سال اول.', date: { y: 1405, m: 2, d: 31 }, relatedHref: '/ir/financials', relatedLabel: 'دریافت گزارش' }),
  ev({ id: 'ev-1405-02-15', category: 'silent-period', title: 'دوره سکوت اطلاعاتی منتهی به انتشار صورت‌های مالی ۶ ماهه', description: 'توقف مصاحبه‌ها و ارتباطات غیررسمی با تحلیلگران تا انتشار رسمی گزارش در کدال.', date: { y: 1405, m: 2, d: 15 }, timeLabel: 'به مدت ۱۰ روز کاری', durationDays: 14, relatedHref: '/ir/governance', relatedLabel: 'ضوابط دوره سکوت' }),
  ev({ id: 'ev-1405-01-25', category: 'dividend', title: 'واریز سود نقدی مصوب مجمع سالیانه از طریق سامانه سجام', description: 'پرداخت ۲۴۰ ریال سود نقدی به ازای هر سهم به سهامداران حقیقی دارای کد سجام.', date: { y: 1405, m: 1, d: 25 }, secondaryTag: 'سپرده‌گذاری مرکزی اوراق بهادار', relatedHref: '/ir/faq', relatedLabel: 'جدول زمان‌بندی سود' }),
  ev({ id: 'ev-1404-12-20', category: 'quarterly-report', title: 'انتشار صورت‌های مالی میان‌دوره‌ای ۳ ماهه منتهی به ۱۴۰۴/۰۹/۳۰', description: 'گزارش نخستین فصل سال مالی ۱۴۰۴–۱۴۰۵.', date: { y: 1404, m: 12, d: 20 }, relatedHref: '/ir/financials', relatedLabel: 'دریافت گزارش' }),
  ev({ id: 'ev-1404-10-28', category: 'assembly', title: 'مجمع عمومی عادی سالیانه صاحبان سهام منتهی به سال مالی ۱۴۰۴', description: 'تصویب صورت‌های مالی، تقسیم سود ۲۴۰ ریالی به ازای هر سهم و انتخاب بازرس قانونی.', date: { y: 1404, m: 10, d: 28 }, time: '09:00', timeLabel: 'ساعت ۰۹:۰۰ صبح', location: 'تهران، سالن همایش‌های بین‌المللی رازی', links: [{ label: 'صورت‌جلسه و تصمیمات مجمع', href: '/ir/governance', icon: 'download' }], relatedHref: '/ir/governance', relatedLabel: 'جزئیات مجمع' }),
  ev({ id: 'ev-1404-09-15', category: 'assembly', title: 'مجمع عمومی فوق‌العاده — افزایش سرمایه از محل سود انباشته', description: 'تصویب افزایش سرمایه ۶۰ درصدی و اصلاح ماده ۵ اساسنامه شرکت.', date: { y: 1404, m: 9, d: 15 }, time: '10:00', timeLabel: 'ساعت ۱۰:۰۰', location: 'تهران، دفتر مرکزی هلدینگ', links: [agmNotice], relatedHref: '/ir/governance', relatedLabel: 'جزئیات مجمع' }),
  ev({ id: 'ev-1404-07-20', category: 'disclosure', title: 'افشای اطلاعات بااهمیت — نتایج مزایده فروش واحدهای تجاری برج بین‌المللی تهران', description: 'اعلام نتایج قطعی واگذاری ۱۲ باب واحد تجاری و آثار مالی آن.', date: { y: 1404, m: 7, d: 20 }, relatedHref: '/ir/financials', relatedLabel: 'مشاهده اطلاعیه' }),

  // ---- fiscal year 1403–1404 ----
  ev({ id: 'ev-1404-02-30', category: 'webcast', title: 'وب‌کست تعاملی تحلیل عملکرد مالی نیم‌ساله اول ۱۴۰۳–۱۴۰۴', description: 'نشست برخط مدیران ارشد با تحلیلگران بازار سرمایه.', date: { y: 1404, m: 2, d: 30 }, time: '10:00', timeLabel: 'ساعت ۱۰:۰۰', relatedHref: '/ir/financials', relatedLabel: 'ورود به صفحه رویداد' }),
  ev({ id: 'ev-1404-02-25', category: 'silent-period', title: 'آغاز دوره سکوت اطلاعاتی منتهی به انتشار صورت‌های مالی میان‌دوره‌ای', description: 'توقف افشای زودهنگام تا انتشار رسمی گزارش در کدال.', date: { y: 1404, m: 2, d: 25 }, durationDays: 10, relatedHref: '/ir/governance', relatedLabel: 'ضوابط دوره سکوت' }),
  ev({ id: 'ev-1403-10-25', category: 'assembly', title: 'مجمع عمومی عادی سالیانه — تصویب صورت‌های مالی ۱۴۰۳', description: 'تصویب صورت‌های مالی و تقسیم سود ۱۹۰ ریالی به ازای هر سهم.', date: { y: 1403, m: 10, d: 25 }, time: '09:00', location: 'تهران، سالن همایش‌های بین‌المللی رازی', links: [{ label: 'صورت‌جلسه مجمع', href: '/ir/governance', icon: 'download' }], relatedHref: '/ir/governance', relatedLabel: 'جزئیات مجمع' }),
]

/** Shared-type view of the same events (kept for existing `CalendarEventViewModel[]` consumers). */
export const calendarEvents: CalendarEventViewModel[] = calendarEventRecords
  .filter((e): e is CalendarEventDerived & { category: CalendarEventViewModel['type'] } => e.category in calendarEventTypeLabels)
  .map(e => ({ title: e.title, jalaliDate: formatJalaliNumeric(e.date), type: e.category, href: e.relatedHref }))

export const calendarSupport = {
  eyebrow: 'امور سهام و پشتیبانی مجامع عمومی',
  title: 'پرسش یا ابهامی در خصوص مجامع و زمان‌بندی سود دارید؟',
  description: 'کارشناسان اداره امور سهام شرکت بین‌المللی توسعه ساختمان در روزهای کاری از ساعت ۰۸:۰۰ الی ۱۶:۰۰ آماده پاسخگویی به پرسش‌های سهامداران محترم حقیقی و حقوقی می‌باشند.',
  phoneLabel: 'تماس با امور سهام: ۰۲۱-۸۸۵۵۴۳۲۱',
  phoneHref: 'tel:+982188554321',
  messageLabel: 'ارسال پیام به دبیرخانه مجمع',
  messageHref: '/contact',
}
