/**
 * Mock content for /ir/financials and /ir/governance — placeholder pending
 * the real WordPress data layer (docs/decisions.md ADR-002) and a real
 * CODAL/document-archive integration.
 *
 * Page structure follows `project_detail_page_template/02b_index_simple_list`
 * (hero + featured report cards + AGM spotlight + quick links + filterable
 * document repository + IR contacts). `DocumentRecord` extends the shared
 * `DocumentViewModel` (app/types/content.ts) with the extra fields the
 * repository rows need, so existing `DocumentViewModel[]` consumers keep
 * working unchanged.
 */
import type { DocumentViewModel } from '~/types/content'
import type { JalaliDate } from '~/utils/irDateUtils'

/* Real photographs of the group's own offices (ADR-027). */
const IR_IMAGES: Record<string, string> = {
  'icd-ir-interim-reports': '/img/projects/ghadir-office-tehran-7.jpg',
  'icd-ir-annual-report': '/img/projects/ghadir-office-tehran-5.jpg',
  'icd-ir-agm-hall': '/img/projects/ghadir-office-tehran-4.jpg',
  'icd-ir-governance-report': '/img/projects/ghadir-office-tehran-3.jpg',
  'icd-ir-charters': '/img/projects/ghadir-office-tehran-6.jpg',
  'icd-ir-board-meeting': '/img/projects/ghadir-office-tehran-7.jpg',
}
const IMG = (seed: string) => IR_IMAGES[seed] ?? '/img/placeholder.svg'

/** Official CODAL listing for the ثاخت symbol (mock deep link). */
export const codalSymbolUrl = 'https://codal.ir/ReportList.aspx?search&Symbol=%D8%AB%D8%A7%D8%AE%D8%AA'

export type DocumentCategoryKey =
  | 'interim'
  | 'annual'
  | 'commentary'
  | 'auditor'
  | 'material'
  | 'monthly'
  | 'governance-report'
  | 'internal-control'
  | 'charter'
  | 'assembly'
  | 'board'
  | 'related-party'

export type DocumentCategoryTone = 'blue' | 'tint' | 'ink' | 'neutral'

export const documentCategories: Record<DocumentCategoryKey, { label: string; filterLabel: string; tone: DocumentCategoryTone }> = {
  interim: { label: 'میان‌دوره‌ای', filterLabel: 'صورت‌های مالی میان‌دوره‌ای (فصلی)', tone: 'tint' },
  annual: { label: 'حسابرسی‌شده سالانه', filterLabel: 'گزارش‌های جامع سالانه و حسابرسی‌شده', tone: 'ink' },
  commentary: { label: 'گزارش تفسیری مدیریت', filterLabel: 'گزارش تفسیری مدیریت', tone: 'neutral' },
  auditor: { label: 'بازرس قانونی و حسابرس', filterLabel: 'گزارش حسابرس مستقل و بازرس قانونی', tone: 'blue' },
  material: { label: 'افشای اطلاعات بااهمیت', filterLabel: 'افشای اطلاعات بااهمیت (گروه الف و ب)', tone: 'neutral' },
  monthly: { label: 'گزارش فعالیت ماهانه', filterLabel: 'گزارش فعالیت ماهانه', tone: 'tint' },
  'governance-report': { label: 'گزارش حاکمیت شرکتی', filterLabel: 'گزارش‌های حاکمیت شرکتی', tone: 'blue' },
  'internal-control': { label: 'کنترل‌های داخلی', filterLabel: 'گزارش کنترل‌های داخلی و کمیته‌ها', tone: 'tint' },
  charter: { label: 'منشور و آیین‌نامه', filterLabel: 'منشورها، آیین‌نامه‌ها و سیاست‌ها', tone: 'neutral' },
  assembly: { label: 'مجامع عمومی', filterLabel: 'آگهی دعوت و صورت‌جلسه مجامع', tone: 'ink' },
  board: { label: 'ترکیب هیئت‌مدیره', filterLabel: 'ترکیب و تغییرات هیئت‌مدیره', tone: 'tint' },
  'related-party': { label: 'معاملات با اشخاص وابسته', filterLabel: 'معاملات با اشخاص وابسته', tone: 'neutral' },
}

export interface DocumentRecord extends DocumentViewModel {
  id: string
  category: DocumentCategoryKey
  /** e.g. «میان‌دوره‌ای ۶ ماهه» — overrides the category label on the row tag */
  tagLabel?: string
  summary: string
  published: JalaliDate
  codalTrackingNo?: string
  codalUrl?: string
}

export interface DocumentFeaturedCard {
  title: string
  description: string
  image: string
  badge: string
  meta: string
  ctaLabel: string
  /** clicking the card filters the repository to this category */
  category: DocumentCategoryKey
}

export interface DocumentSpotlightRow {
  title: string
  meta: string
  href: string
  icon: 'video' | 'pdf' | 'doc'
}

export interface DocumentContact {
  name: string
  role: string
  email: string
  phone: string
  note: string
  image?: string
}

export interface DocumentHubContent {
  breadcrumbLabel: string
  badges: string[]
  title: string
  intro: string
  featuredHeading: string
  featuredSubheading: string
  featured: DocumentFeaturedCard[]
  spotlight: {
    eyebrow: string
    title: string
    description: string
    image: string
    rows: DocumentSpotlightRow[]
  }
  quickLinks: { label: string; href: string }[]
  archiveEyebrow: string
  archiveTitle: string
  archiveSubtitle: string
  categories: DocumentCategoryKey[]
  documents: DocumentRecord[]
  contactsEyebrow: string
  contactsTitle: string
  contactsIntro: string
}

const doc = (
  id: string,
  category: DocumentCategoryKey,
  title: string,
  summary: string,
  year: string,
  published: JalaliDate,
  fileSizeLabel: string,
  codalTrackingNo?: string,
  tagLabel?: string,
): DocumentRecord => ({
  id,
  category,
  title,
  summary,
  year,
  published,
  fileType: 'PDF',
  fileSizeLabel,
  href: '/docs/sample-document.pdf',
  codalTrackingNo,
  codalUrl: codalTrackingNo ? codalSymbolUrl : undefined,
  tagLabel,
})

export const financialDocuments: DocumentRecord[] = [
  doc('fin-01', 'interim', 'صورت‌های مالی تلفیقی و مستقل میان‌دوره‌ای ۶ ماهه منتهی به ۱۴۰۳/۱۲/۲۹ (حسابرسی نشده)', 'شامل صورت سود و زیان، صورت وضعیت مالی، صورت گردش وجوه نقد و تغییرات در حقوق مالکانه هلدینگ و شرکت‌های تابعه.', '۱۴۰۳', { y: 1404, m: 2, d: 15 }, '۴.۸ مگابایت', '۱۱۵۸۳۹۲', 'میان‌دوره‌ای ۶ ماهه'),
  doc('fin-02', 'commentary', 'گزارش تفسیری مدیریت همراه با اطلاعات و صورت‌های مالی میان‌دوره‌ای ۶ ماهه ۱۴۰۳', 'تحلیل جامع عملیات هلدینگ، وضعیت پیشرفت فیزیکی پروژه‌ها، بهای تمام‌شده و پیش‌بینی متغیرهای کلان تأثیرگذار بر صنعت ساختمان.', '۱۴۰۳', { y: 1404, m: 2, d: 12 }, '۲.۹ مگابایت', '۱۱۵۸۲۴۰'),
  doc('fin-03', 'material', 'افشای اطلاعات بااهمیت — نتایج برگزاری مزایده فروش واحدهای تجاری برج بین‌المللی تهران (TIT)', 'اعلام نتایج قطعی واگذاری ۱۲ باب واحد تجاری، مبالغ پیشنهادی برندگان و آثار سود و زیانی ناشی از قراردادها در سال جاری.', '۱۴۰۳', { y: 1404, m: 1, d: 28 }, '۱.۲ مگابایت', '۱۱۵۴۹۹۰', 'افشای اطلاعات بااهمیت (گروه ب)'),
  doc('fin-04', 'monthly', 'گزارش فعالیت ماهانه دوره ۱ ماهه منتهی به ۱۴۰۳/۱۲/۲۹', 'آمار فروش و پیش‌فروش واحدهای مسکونی و تجاری، درآمد اجاره مراکز تجاری و وضعیت وصول مطالبات.', '۱۴۰۳', { y: 1404, m: 1, d: 20 }, '۸۴۰ کیلوبایت', '۱۱۵۳۱۲۷'),
  doc('fin-05', 'annual', 'صورت‌های مالی تلفیقی سال مالی منتهی به ۱۴۰۳/۰۶/۳۱ (حسابرسی‌شده) به همراه یادداشت‌های توضیحی', 'گزارش قطعی و مصوب حسابرس مستقل به انضمام کلیه جداول اقلام ترازنامه‌ای و تفکیک جریان نقد عملیاتی.', '۱۴۰۳', { y: 1403, m: 10, d: 20 }, '۷.۴ مگابایت', '۱۱۴۹۲۰۳'),
  doc('fin-06', 'auditor', 'گزارش حسابرس مستقل و بازرس قانونی در خصوص افزایش سرمایه هلدینگ از محل سود انباشته', 'اظهارنظر کارشناسی حسابرس مستقل در خصوص توجیه فنی، مالی و اقتصادی پیشنهاد هیئت‌مدیره مبنی بر افزایش سرمایه ۶۰ درصدی.', '۱۴۰۳', { y: 1403, m: 10, d: 12 }, '۱.۸ مگابایت', '۱۱۴۷۶۱۰'),
  doc('fin-07', 'interim', 'اطلاعات و صورت‌های مالی میان‌دوره‌ای ۳ ماهه منتهی به ۱۴۰۳/۰۹/۳۰ (حسابرسی نشده)', 'گزارش نخستین فصل سال مالی به همراه خلاصه‌ای از روند واگذاری واحدهای مسکونی و تجاری پروژه مگاپارس و شیراز.', '۱۴۰۳', { y: 1403, m: 9, d: 30 }, '۳.۱ مگابایت', '۱۱۴۰۱۰۰', 'میان‌دوره‌ای ۳ ماهه'),
  doc('fin-08', 'annual', 'گزارش فعالیت هیئت‌مدیره به مجمع عمومی عادی سالیانه — سال مالی ۱۴۰۲', 'مروری بر عملکرد عملیاتی و مالی، برنامه‌های توسعه پرتفوی و پیشنهاد تقسیم سود هیئت‌مدیره.', '۱۴۰۲', { y: 1403, m: 4, d: 2 }, '۵.۶ مگابایت', '۱۱۲۲۴۸۱'),
  doc('fin-09', 'interim', 'صورت‌های مالی میان‌دوره‌ای ۹ ماهه منتهی به ۱۴۰۲/۱۲/۲۹ (حسابرسی نشده)', 'افشای نتایج سه فصل نخست سال مالی به همراه جزئیات درآمد شناسایی‌شده از پروژه‌های در حال ساخت.', '۱۴۰۲', { y: 1403, m: 1, d: 30 }, '۳.۴ مگابایت', '۱۱۱۵۹۰۲', 'میان‌دوره‌ای ۹ ماهه'),
  doc('fin-10', 'commentary', 'گزارش تفسیری مدیریت — دوره ۹ ماهه منتهی به ۱۴۰۲/۱۲/۲۹', 'تشریح ریسک‌های بازار مسکن، برنامه تأمین مالی پروژه‌ها و چشم‌انداز سودآوری سال آتی.', '۱۴۰۲', { y: 1403, m: 1, d: 30 }, '۲.۲ مگابایت', '۱۱۱۵۹۰۸'),
  doc('fin-11', 'material', 'افشای اطلاعات بااهمیت — انعقاد قرارداد پیمانکاری عمومی پروژه مگاپارس', 'مبلغ قرارداد، مدت اجرا و آثار مالی پیش‌بینی‌شده قرارداد پیمانکاری EPC فاز دوم مجموعه مگاپارس.', '۱۴۰۲', { y: 1402, m: 11, d: 8 }, '۶۲۰ کیلوبایت', '۱۱۰۴۴۱۵', 'افشای اطلاعات بااهمیت (گروه الف)'),
  doc('fin-12', 'annual', 'صورت‌های مالی حسابرسی‌شده سال مالی منتهی به ۱۴۰۲/۰۶/۳۱', 'صورت‌های مالی تلفیقی و جداگانه به همراه گزارش حسابرس مستقل و بازرس قانونی.', '۱۴۰۲', { y: 1402, m: 10, d: 18 }, '۶.۹ مگابایت', '۱۰۹۸۷۳۰'),
  doc('fin-13', 'auditor', 'گزارش بازرس قانونی به مجمع عمومی عادی سالیانه — سال مالی ۱۴۰۲', 'بررسی معاملات مشمول ماده ۱۲۹ اصلاحیه قانون تجارت و گزارش کنترل‌های داخلی حاکم بر گزارشگری مالی.', '۱۴۰۲', { y: 1402, m: 10, d: 18 }, '۱.۱ مگابایت', '۱۰۹۸۷۳۴'),
  doc('fin-14', 'interim', 'صورت‌های مالی میان‌دوره‌ای ۶ ماهه منتهی به ۱۴۰۱/۱۲/۲۹ (حسابرسی‌شده)', 'نتایج نیم‌سال اول سال مالی ۱۴۰۱ همراه با نظر حسابرس درباره شناسایی درآمد پیش‌فروش.', '۱۴۰۱', { y: 1402, m: 2, d: 10 }, '۴.۲ مگابایت', '۱۰۷۲۲۱۹', 'میان‌دوره‌ای ۶ ماهه'),
  doc('fin-15', 'annual', 'صورت‌های مالی حسابرسی‌شده سال مالی منتهی به ۱۴۰۱/۰۶/۳۱', 'گزارش کامل عملکرد سال مالی ۱۴۰۱ و یادداشت‌های پیوست صورت‌های مالی تلفیقی.', '۱۴۰۱', { y: 1401, m: 10, d: 25 }, '۶.۱ مگابایت', '۱۰۵۵۸۰۴'),
  doc('fin-16', 'annual', 'صورت‌های مالی حسابرسی‌شده سال مالی منتهی به ۱۴۰۰/۰۶/۳۱', 'صورت‌های مالی مصوب مجمع به همراه گزارش فعالیت هیئت‌مدیره سال مالی ۱۴۰۰.', '۱۴۰۰', { y: 1400, m: 10, d: 22 }, '۵.۸ مگابایت', '۱۰۲۱۷۷۶'),
]

export const governanceDocuments: DocumentRecord[] = [
  doc('gov-01', 'governance-report', 'گزارش حاکمیت شرکتی و کنترل‌های داخلی سال مالی ۱۴۰۳', 'ارزیابی رعایت دستورالعمل حاکمیت شرکتی سازمان بورس، ترکیب کمیته‌های تخصصی و عملکرد کمیته حسابرسی.', '۱۴۰۳', { y: 1403, m: 10, d: 25 }, '۱.۶ مگابایت', '۱۱۴۹۸۸۰'),
  doc('gov-02', 'internal-control', 'گزارش هیئت‌مدیره درباره کنترل‌های داخلی حاکم بر گزارشگری مالی ۱۴۰۳', 'اظهارنظر هیئت‌مدیره و گزارش اطمینان‌بخشی حسابرس مستقل در خصوص اثربخشی کنترل‌های داخلی.', '۱۴۰۳', { y: 1403, m: 10, d: 20 }, '۹۸۰ کیلوبایت', '۱۱۴۹۲۱۱'),
  doc('gov-03', 'assembly', 'صورت‌جلسه مجمع عمومی عادی سالیانه منتهی به ۱۴۰۳/۰۶/۳۱', 'تصمیمات مجمع درباره تصویب صورت‌های مالی، تقسیم سود نقدی، انتخاب بازرس قانونی و روزنامه کثیرالانتشار.', '۱۴۰۳', { y: 1403, m: 11, d: 28 }, '۹۲۰ کیلوبایت', '۱۱۵۱۰۴۴'),
  doc('gov-04', 'board', 'تغییرات در ترکیب اعضای هیئت‌مدیره و انتخاب رئیس و نایب‌رئیس', 'معرفی نمایندگان اشخاص حقوقی عضو هیئت‌مدیره، سوابق حرفه‌ای و وضعیت استقلال اعضا.', '۱۴۰۳', { y: 1403, m: 12, d: 5 }, '۴۲۰ کیلوبایت', '۱۱۵۲۲۰۷'),
  doc('gov-05', 'related-party', 'گزارش معاملات با اشخاص وابسته — نیم‌سال اول ۱۴۰۳', 'فهرست معاملات مشمول ماده ۱۲۹ و سیاست قیمت‌گذاری معاملات با شرکت‌های گروه و سهامدار عمده.', '۱۴۰۳', { y: 1404, m: 1, d: 25 }, '۷۱۰ کیلوبایت', '۱۱۵۴۳۶۰'),
  doc('gov-06', 'charter', 'منشور اخلاقی و سیاست معاملات با اشخاص وابسته', 'اصول رفتار حرفه‌ای مدیران و کارکنان، مدیریت تعارض منافع و فرآیند تأیید معاملات وابسته.', '۱۴۰۲', { y: 1402, m: 8, d: 14 }, '۶۴۰ کیلوبایت'),
  doc('gov-07', 'charter', 'منشور کمیته حسابرسی و آیین‌نامه واحد حسابرسی داخلی', 'شرح وظایف، اختیارات و ترکیب کمیته حسابرسی مصوب هیئت‌مدیره.', '۱۴۰۲', { y: 1402, m: 7, d: 3 }, '۵۲۰ کیلوبایت'),
  doc('gov-08', 'governance-report', 'گزارش حاکمیت شرکتی و کنترل‌های داخلی ۱۴۰۲', 'گزارش سالانه رعایت الزامات حاکمیت شرکتی و وضعیت اجرای توصیه‌های کمیته حسابرسی.', '۱۴۰۲', { y: 1402, m: 10, d: 20 }, '۱.۴ مگابایت', '۱۰۹۸۹۱۲'),
  doc('gov-09', 'assembly', 'صورت‌جلسه مجمع عمومی فوق‌العاده — افزایش سرمایه و اصلاح اساسنامه', 'مصوبه افزایش سرمایه از محل سود انباشته و اصلاح ماده ۵ اساسنامه شرکت.', '۱۴۰۲', { y: 1402, m: 12, d: 15 }, '۸۶۰ کیلوبایت', '۱۱۰۷۶۲۰'),
  doc('gov-10', 'internal-control', 'گزارش عملکرد کمیته ریسک و برنامه مدیریت ریسک سازمانی', 'شناسایی و رتبه‌بندی ریسک‌های کلیدی پروژه‌ها، نقدینگی و بازار به همراه برنامه‌های کاهش ریسک.', '۱۴۰۲', { y: 1402, m: 9, d: 10 }, '۱.۱ مگابایت'),
  doc('gov-11', 'board', 'ترکیب اعضای هیئت‌مدیره و کمیته‌های تخصصی — سال مالی ۱۴۰۱', 'اعضای موظف و غیرموظف، عضویت در کمیته‌های حسابرسی، ریسک و انتصابات.', '۱۴۰۱', { y: 1401, m: 11, d: 2 }, '۳۸۰ کیلوبایت', '۱۰۵۹۹۰۱'),
]

const irQuickLinks = [
  { label: 'تقویم جامع رویدادهای بازار سرمایه و مجامع', href: '/ir/calendar' },
  { label: 'اطلاعات نماد و قیمت سهام ثاخت', href: '/ir/symbol' },
  { label: 'ترکیب و ساختار سهامداران عمده هلدینگ', href: '/ir/symbol' },
  { label: 'صورت‌های مالی و گزارش فعالیت هیئت‌مدیره', href: '/ir/financials' },
  { label: 'دستورالعمل حاکمیت شرکتی و منشور کمیته حسابرسی', href: '/ir/governance' },
  { label: 'پرسش‌های متداول سهامداران', href: '/ir/faq' },
]

/*
 * ⛔ THESE TWO PEOPLE ARE SAMPLE RECORDS from the design era: the names, the
 * @icd.ir addresses (the company's real domain is icd.co.ir) and the
 * extensions were never supplied by the client. Shareholder affairs must
 * replace them with the real desk before launch, or the section must go — a
 * listed company publishing invented contacts on its own IR page is a
 * disclosure problem, not a design placeholder.
 *
 * Their drawn portraits are removed (ADR-027): the card falls back to a
 * monogram, because an illustration of a face beside a named person reads as
 * a photograph of that person (ADR-021).
 */
export const irContacts: DocumentContact[] = [
  { name: 'مهندس علیرضا سلیمانی', role: 'مدیر امور سهام، مجامع و ناشران', email: 'soleimani@icd.ir', phone: '۰۲۱-۸۸۸۸۳۲۴۲ (داخلی ۱۰۴)', note: 'ساعات پاسخگویی: شنبه تا چهارشنبه ۹ الی ۱۵' },
  { name: 'دکتر فاطمه محمدی', role: 'کارشناس ارشد افشای اطلاعات و سامانه کدال', email: 'codal@icd.ir', phone: '۰۲۱-۸۸۸۸۳۲۴۲ (داخلی ۱۰۸)', note: 'پاسخگویی به تحلیلگران و استعلامات بورسی' },
]

export const documentHubs: Record<'financials' | 'governance', DocumentHubContent> = {
  financials: {
    breadcrumbLabel: 'صورت‌های مالی و گزارش‌های کدال',
    badges: ['اتصال به سامانه جامع کدال (CODAL)', 'نماد معاملاتی: ثاخت (ICD1)', 'سال مالی: منتهی به ۳۱ شهریور'],
    title: 'صورت‌های مالی و گزارش‌های رسمی هیئت‌مدیره',
    intro: 'مخزن اسناد، افشای اطلاعات بااهمیت، گزارش‌های تفسیری مدیریت و صورت‌های مالی میان‌دوره‌ای و سالانه حسابرسی‌شده هلدینگ بین‌المللی توسعه ساختمان، جهت بهره‌برداری سهامداران و تحلیلگران ارجمند بازار سرمایه.',
    featuredHeading: 'جدیدترین گزارش‌های ادواری هلدینگ',
    featuredSubheading: 'دسترسی سریع به دو سند کلیدی و مصوب اخیر هیئت‌مدیره',
    featured: [
      { title: 'گزارش‌های میان‌دوره‌ای و عملکرد فصلی', description: 'مجموعه صورت‌های مالی میان‌دوره‌ای ۳، ۶ و ۹ ماهه هلدینگ به همراه گزارش تفسیری مدیریت و وب‌کست‌های تحلیلی مرتبط.', image: IMG('icd-ir-interim-reports'), badge: 'دوره ۶ ماهه — حسابرسی‌نشده', meta: 'گزارش‌های فصلی سه سال اخیر', ctaLabel: 'ورود به پرونده فصلی', category: 'interim' },
      { title: 'گزارش جامع سالانه و بازرس قانونی', description: 'کلیه گزارش‌های سالانه، گزارش حسابرس و بازرس قانونی، صورت وضعیت مالی تلفیقی و یادداشت‌های همراه مصوب مجمع عمومی.', image: IMG('icd-ir-annual-report'), badge: 'سال مالی ۱۴۰۳ — حسابرسی‌شده', meta: 'آخرین نسخه: سال مالی ۱۴۰۳ (حسابرسی‌شده)', ctaLabel: 'ورود به بایگانی سالانه', category: 'annual' },
    ],
    spotlight: {
      eyebrow: 'رویداد سهامداری و شفافیت مالی',
      title: 'مجمع عمومی عادی سالیانه و روز بازار سرمایه ثاخت',
      description: 'ارائه دستاوردهای عملیاتی، تحلیل پرتفوی پروژه‌های تجاری و مسکونی در دست اجرا، بررسی صورت‌های مالی مصوب و استراتژی نوسازی سرمایه‌گذاری‌ها برای سال مالی پیش رو.',
      image: IMG('icd-ir-agm-hall'),
      rows: [
        { title: 'وب‌کست و پخش ضبط‌شده مجمع عمومی فوق‌العاده و سالانه', meta: 'پخش آنلاین با کیفیت بالا • پیوند به پرتال کدال', href: 'https://codal.ir', icon: 'video' },
        { title: 'اسلایدهای جامع ارائه هیئت‌مدیره به مجمع عمومی صاحبان سهام', meta: 'فرمت PDF • حجم ۱۸.۴ مگابایت • آذر ۱۴۰۳', href: '/docs/sample-document.pdf', icon: 'pdf' },
        { title: 'خلاصه تصمیمات و صورت‌جلسه رسمی مجمع عمومی عادی', meta: 'فرمت PDF • حجم ۶۸۵ کیلوبایت • انتشار رسمی در کدال', href: '/docs/sample-document.pdf', icon: 'doc' },
      ],
    },
    quickLinks: irQuickLinks,
    archiveEyebrow: 'آرشیو جامع مستندات مالی',
    archiveTitle: 'فهرست کامل اسناد رسمی، صورت‌ها و افشاگری‌ها',
    archiveSubtitle: 'امکان جستجو و پالایش بر اساس سال مالی و طبقه‌بندی نوع گزارش',
    categories: ['interim', 'annual', 'commentary', 'auditor', 'material', 'monthly'],
    documents: financialDocuments,
    contactsEyebrow: 'پاسخگویی و ارتباط شفاف',
    contactsTitle: 'امور سهامداران و روابط سرمایه‌گذاران',
    contactsIntro: 'آیا درباره صورت‌های مالی، تقسیم سود مجمع یا افزایش سرمایه سوالی دارید؟ همکاران ما در واحد امور سهام و کدال آماده پاسخگویی به سهامداران حقیقی و حقوقی هستند.',
  },
  governance: {
    breadcrumbLabel: 'گزارش‌های شفافیت و حاکمیت شرکتی',
    badges: ['منطبق با دستورالعمل حاکمیت شرکتی سازمان بورس', 'نماد معاملاتی: ثاخت (ICD1)', 'آخرین بازبینی: سال مالی ۱۴۰۳'],
    title: 'گزارش‌های شفافیت و حاکمیت شرکتی',
    intro: 'گزارش‌های ترکیب هیئت‌مدیره، کنترل‌های داخلی، منشورهای مصوب و معاملات با اشخاص وابسته هلدینگ ثاخت؛ مرجع رسمی سهامداران و نهادهای ناظر برای ارزیابی شفافیت و پاسخگویی شرکت.',
    featuredHeading: 'اسناد کلیدی حاکمیت شرکتی',
    featuredSubheading: 'آخرین گزارش مصوب هیئت‌مدیره و مجموعه منشورهای جاری',
    featured: [
      { title: 'گزارش حاکمیت شرکتی و کنترل‌های داخلی', description: 'ارزیابی سالانه رعایت الزامات حاکمیت شرکتی، اثربخشی کنترل‌های داخلی و عملکرد کمیته‌های تخصصی هیئت‌مدیره.', image: IMG('icd-ir-governance-report'), badge: 'سال مالی ۱۴۰۳ — مصوب', meta: 'آخرین نسخه: دی ۱۴۰۳', ctaLabel: 'مشاهده گزارش‌های حاکمیتی', category: 'governance-report' },
      { title: 'منشورها، آیین‌نامه‌ها و سیاست‌های مصوب', description: 'منشور اخلاقی، منشور کمیته حسابرسی، سیاست معاملات با اشخاص وابسته و آیین‌نامه‌های داخلی هیئت‌مدیره.', image: IMG('icd-ir-charters'), badge: 'اسناد جاری و لازم‌الاجرا', meta: 'بازبینی دوره‌ای توسط کمیته حسابرسی', ctaLabel: 'ورود به منشورها', category: 'charter' },
    ],
    spotlight: {
      eyebrow: 'مجامع عمومی و هیئت‌مدیره',
      title: 'مجمع عمومی عادی سالیانه و ترکیب جدید هیئت‌مدیره',
      description: 'مروری بر تصمیمات آخرین مجمع عمومی، اعضای منتخب هیئت‌مدیره، کمیته‌های تخصصی و گزارش بازرس قانونی درباره معاملات مشمول ماده ۱۲۹.',
      image: IMG('icd-ir-board-meeting'),
      rows: [
        { title: 'صورت‌جلسه و خلاصه تصمیمات مجمع عمومی عادی سالیانه', meta: 'فرمت PDF • حجم ۹۲۰ کیلوبایت • بهمن ۱۴۰۳', href: '/docs/sample-document.pdf', icon: 'pdf' },
        { title: 'معرفی اعضای هیئت‌مدیره و وضعیت استقلال اعضا', meta: 'پیوند به صفحه هیئت‌مدیره', href: '/about#board', icon: 'doc' },
        { title: 'پخش ضبط‌شده جلسه مجمع و پرسش و پاسخ سهامداران', meta: 'پخش آنلاین • پیوند به پرتال کدال', href: 'https://codal.ir', icon: 'video' },
      ],
    },
    quickLinks: irQuickLinks,
    archiveEyebrow: 'آرشیو اسناد حاکمیتی',
    archiveTitle: 'فهرست کامل گزارش‌ها، منشورها و صورت‌جلسات',
    archiveSubtitle: 'امکان جستجو و پالایش بر اساس سال مالی و نوع سند',
    categories: ['governance-report', 'internal-control', 'charter', 'assembly', 'board', 'related-party'],
    documents: governanceDocuments,
    contactsEyebrow: 'پاسخگویی و ارتباط شفاف',
    contactsTitle: 'امور سهامداران و دبیرخانه هیئت‌مدیره',
    contactsIntro: 'پرسش‌های مربوط به ترکیب هیئت‌مدیره، کمیته‌ها، مجامع و معاملات با اشخاص وابسته را با کارشناسان امور سهام و دبیرخانه هیئت‌مدیره مطرح کنید.',
  },
}
