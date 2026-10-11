/**
 * Mock content for /about/org-chart — placeholder pending the real
 * WordPress data layer (docs/decisions.md ADR-002).
 *
 * Structure follows `project_detail_page_template/05c_orgchart_3d_component`:
 * general assembly (level 0) → board of directors (level 1) → board
 * committees + compliance score (level 2A) beside the CEO office and four
 * vice-presidencies (level 2B) → subsidiary companies (level 3) →
 * governance charter (level 4). Board member names are kept consistent
 * with `boardData.ts`; members that have a profile page carry `boardSlug`.
 * Per ADR-003 there is no WebGL scene — the chart is HTML/CSS/SVG.
 */
import { getProjectDetail } from '~/utils/projectsData'

export type OrgLevelKey = 'board' | 'committees' | 'executive' | 'subsidiaries'
export type OrgIcon = 'engineering' | 'finance' | 'companies' | 'sales' | 'policy' | 'risk' | 'people'

export interface OrgBoardMember {
  id: string
  name: string
  roleBadge: string
  badgeTone: 'blue' | 'ink' | 'neutral'
  representing: string
  position: string
  education: string
  background: string
  image: string
  boardSlug?: string
  featured?: boolean
}

export interface OrgCommittee {
  id: string
  name: string
  statusLabel: string
  statusTone: 'success' | 'blue' | 'neutral'
  chairId: string
  chairLabel: string
  note: string
  mandate: string
}

export interface OrgVicePresidency {
  id: string
  icon: OrgIcon
  eyebrow: string
  title: string
  text: string
  head: string
  metric: string
  units: string[]
  boardSlug?: string
}

export interface OrgSubsidiary {
  id: string
  badge: string
  badgeTone: 'ink' | 'blue' | 'neutral'
  stake: string
  name: string
  text: string
  ceo: string
  capital: string
  projectSlugs: string[]
}

const PORTRAIT = (seed: string) => `/img/placeholder.svg`

export const orgChartHero = {
  badge: 'شفافیت اطلاعاتی و اصول حاکمیت شرکتی بورس اوراق بهادار (نماد ثاخت - ICD1)',
  title: 'ساختار حاکمیت شرکتی و ارکان مدیریتی هلدینگ ثاخت',
  intro: 'نمودار ارکان نظارتی، هیات‌مدیره، کمیته‌های تخصصی راهبردی و ساختار اجرایی هلدینگ بین‌المللی توسعه ساختمان بر اساس استانداردهای بین‌المللی مدیریت دارایی و مهندسی ارزش.',
}

export const orgLevelTabs: { key: 'all' | OrgLevelKey, label: string }[] = [
  { key: 'all', label: 'ساختار کامل ارکان حاکمیت' },
  { key: 'board', label: 'مجمع عمومی و هیات‌مدیره (Board)' },
  { key: 'committees', label: 'کمیته‌های تخصصی حاکمیت شرکتی' },
  { key: 'executive', label: 'مدیرعامل و معاونت‌های اجرایی' },
  { key: 'subsidiaries', label: 'شرکت‌های تابعه تخصصی' },
]

export const orgAssembly = {
  id: 'agm',
  badge: 'رکن عالی قانون تجارت',
  title: 'مجمع عمومی صاحبان سهام',
  text: 'نظارت بر تطبیق عملکرد با منافع سهامداران حقیقی و حقوقی و تایید صورت‌های مالی حسابرسی‌شده',
  metrics: [
    { label: 'سرمایه ثبت‌شده', value: '۲,۵۰۰ میلیارد', accent: false },
    { label: 'سهام شناور آزاد', value: '۲۱.۴٪', accent: true },
    { label: 'آخرین مجمع', value: 'تیرماه ۱۴۰۳', accent: false },
  ],
}

export const orgBoard = {
  title: 'اعضای هیات‌مدیره (Board of Directors)',
  subtitle: 'ترکیب اعضای موظف، غیرموظف و مستقل با رویکرد صیانت از دارایی‌ها',
  term: 'دوره تصدی قانونی ۱۴۰۳-۱۴۰۵',
  members: [
    { id: 'b-rezvani', name: 'دکتر کاوه رضوانی', roleBadge: 'رئیس هیات‌مدیره', badgeTone: 'blue', representing: 'نماینده شرکت سرمایه‌گذاری غدیر', position: 'عضو غیرموظف هیات‌مدیره', education: 'دکتری مهندسی عمران - سازه (دانشگاه تهران)', background: 'سوابق: معاون فنی پیشین وزارت راه و شهرسازی، مدیرعامل اسبق بنیاد بتن ایران', image: PORTRAIT('icd-org-rezvani'), boardSlug: 'kaveh-rezvani' },
    { id: 'b-hosseini', name: 'مهندس سید علیرضا حسینی', roleBadge: 'نایب رئیس و مدیرعامل', badgeTone: 'ink', representing: 'عضو موظف هیات‌مدیره', position: 'مدیرعامل هلدینگ توسعه ساختمان', education: 'کارشناسی ارشد مدیریت پروژه و ساخت (دانشگاه صنعتی شریف)', background: 'سوابق: مجری مگاپروژه‌های برج‌های بین‌المللی، مدیرعامل سابق شرکت بین‌المللی مهندسی ساخت', image: PORTRAIT('icd-org-hosseini'), boardSlug: 'seyed-alireza-hosseini', featured: true },
    { id: 'b-jahangiri', name: 'دکتر مسعود جهانگیری', roleBadge: 'عضو مستقل', badgeTone: 'neutral', representing: 'نماینده سهامداران جزء', position: 'رئیس کمیته حسابرسی و ریسک مالی', education: 'دکتری حسابداری و حسابرسی (دانشگاه علامه طباطبایی)', background: 'سوابق: عضو جامعه حسابداران رسمی ایران، عضو سابق کمیته پذیرش بورس تهران', image: PORTRAIT('icd-org-jahangiri') },
    { id: 'b-mohtashami', name: 'دکتر کامبیز محتشمی', roleBadge: 'عضو غیرموظف', badgeTone: 'neutral', representing: 'نماینده شرکت گروه مالی پارسیان', position: 'رئیس کمیته ریسک و پایش پروژه‌ها', education: 'دکتری مهندسی مواد - تکنولوژی بتن (دانشگاه امیرکبیر)', background: 'سوابق: استاد دانشگاه و مشاور عالی تکنولوژی بتن، رئیس کمیته فنی و کنترل کیفیت', image: PORTRAIT('icd-org-mohtashami'), boardSlug: 'kambiz-mohtashami' },
    { id: 'b-naseri', name: 'دکتر بهنام ناصری', roleBadge: 'عضو غیرموظف', badgeTone: 'neutral', representing: 'نماینده شرکت سرمایه‌گذاری سپه', position: 'رئیس کمیته انتصابات و جبران خدمات', education: 'دکتری مدیریت مالی و اقتصاد کلان (دانشگاه تهران)', background: 'سوابق: عضو هیات‌مدیره تامین سرمایه تمدن، مشاور اقتصادی کانون نهادهای سرمایه‌گذاری', image: PORTRAIT('icd-org-naseri') },
  ] satisfies OrgBoardMember[],
}

export const orgCommitteesIntro = {
  title: 'کمیته‌های تخصصی هیات‌مدیره',
  badge: 'نظارت مستقل',
  text: 'بازوان نظارتی هیات‌مدیره مطابق با منشور حاکمیت شرکتی بورس، با اختیارات رسیدگی مستقیم به جریان‌های مالی و ریسک‌های عمرانی:',
}

export const orgCommittees: OrgCommittee[] = [
  { id: 'c-audit', name: 'کمیته حسابرسی و انضباط مالی', statusLabel: 'فعال و مستقل', statusTone: 'success', chairId: 'b-jahangiri', chairLabel: 'رئیس: دکتر مسعود جهانگیری (عضو مستقل)', note: 'جلسات ماهانه با حسابرس معتمد و بازرس قانونی', mandate: 'نظارت بر صحت گزارشگری مالی، اثربخشی کنترل‌های داخلی، استقلال حسابرس مستقل و رسیدگی به گزارش‌های سامانه سوت‌زنی.' },
  { id: 'c-risk', name: 'کمیته ریسک و پایش پروژه‌ها', statusLabel: 'ارزیابی فنی', statusTone: 'blue', chairId: 'b-mohtashami', chairLabel: 'رئیس: دکتر کامبیز محتشمی', note: 'ارزیابی ریسک تاخیرات زمانی و تورم مصالح در ۴۵ کارگاه فعال', mandate: 'شناسایی و پایش ریسک‌های فنی، زمانی و مالی پروژه‌ها، تایید برنامه‌های پاسخ به ریسک و گزارش فصلی به هیات‌مدیره.' },
  { id: 'c-nomination', name: 'کمیته انتصابات و جبران خدمات', statusLabel: 'راهبری منابع انسانی', statusTone: 'neutral', chairId: 'b-naseri', chairLabel: 'رئیس: دکتر بهنام ناصری', note: 'شفاف‌سازی حقوق و پاداش مدیران عامل شرکت‌های تابعه', mandate: 'تدوین سیاست جبران خدمات، ارزیابی عملکرد مدیران ارشد و بررسی صلاحیت نامزدهای هیات‌مدیره شرکت‌های تابعه.' },
]

export const orgCompliance = {
  title: 'شاخص انطباق حاکمیت شرکتی',
  score: '۹۴.۲٪',
  rank: 'رتبه الف بورس تهران',
  text: 'امتیاز برتر شفافیت در افشای به موقع اطلاعات بااهمیت کدال و کنترل‌های داخلی تاییدشده توسط سازمان حسابرسی.',
}

export const orgExecutive = {
  id: 'ceo-office',
  badge: 'رکن اجرایی هلدینگ',
  title: 'دفتر مدیریت عامل و هیات اجرایی',
  text: 'فرماندهی عملیاتی، هماهنگی زنجیره تامین عمرانی، پیاده‌سازی مصوبات هیات‌مدیره و مدیریت سبد پروژه‌های ملی',
  image: PORTRAIT('icd-org-hosseini'),
  head: 'مهندس سید علیرضا حسینی',
}

export const orgVicePresidencies: OrgVicePresidency[] = [
  { id: 'vp-engineering', icon: 'engineering', eyebrow: 'معاونت فنی و اجرایی', title: 'معاونت مهندسی و نظارت عالیه', text: 'مسئول کنترل کیفیت ساخت، استانداردسازی مصالح نوین، مدل‌سازی اطلاعات ساخت (BIM) و پایش مهندسی ارزش.', head: 'دکتر مهرداد صنیعی', metric: '۴۵ پروژه در حال ساخت', units: ['مدیریت کنترل کیفیت', 'دفتر فنی و BIM', 'ایمنی و HSE'], boardSlug: 'mehrdad-saniei' },
  { id: 'vp-finance', icon: 'finance', eyebrow: 'معاونت مالی و اقتصادی', title: 'معاونت مالی و تامین سرمایه', text: 'مدیریت خزانه‌داری متمرکز، تامین مالی نوین از بازار پول و سرمایه، انتشار اوراق صکوک استصناع و تسهیلات بانکی.', head: 'دکتر امیرحسین کاظمی', metric: 'رتبه اعتباری A+', units: ['خزانه‌داری', 'حسابداری و گزارشگری', 'امور سهام'] },
  { id: 'vp-companies', icon: 'companies', eyebrow: 'راهبری تابعه‌ها', title: 'معاونت امور شرکت‌ها و مجامع', text: 'پایش عملکرد بودجه شرکت‌های زیرمجموعه، ارزیابی شاخص‌های کلیدی عملکرد (KPIs) و نظارت بر مجامع سالانه.', head: 'مهندس نیما اعتضادی', metric: '۸ شرکت فعال زیرمجموعه', units: ['برنامه‌ریزی و بودجه', 'امور مجامع', 'ارزیابی عملکرد'] },
  { id: 'vp-sales', icon: 'sales', eyebrow: 'توسعه بازار و عرضه', title: 'معاونت بازاریابی و واگذاری', text: 'سیاست‌گذاری فروش املاک مسکونی و اداری، تسهیلات پیش‌فروش اقساطی، مطالعات بازارسنجی و سامانه یکپارچه مشتریان.', head: 'دکتر هومن شجاعی', metric: 'سامانه فروش دیده‌بان', units: ['فروش و پیش‌فروش', 'امور مشتریان', 'بازارسنجی'] },
]

export const orgSubsidiariesIntro = {
  badge: 'زنجیره کامل ارزش ساخت',
  title: 'مدیران عامل و شرکت‌های تابعه هلدینگ ثاخت',
  text: 'بازوهای اجرایی تخصصی در حوزه‌های انبوه‌سازی، ساخت پروژه‌های شاخص، خدمات مهندسی، بازرگانی مصالح و بهره‌برداری',
  note: 'دارای ۴ شرکت بورسی و فرابورسی تابعه',
}

export const orgSubsidiaries: OrgSubsidiary[] = [
  { id: 's-asp', badge: 'نماد فرابورس: آسپ', badgeTone: 'ink', stake: '۷۸.۲٪', name: 'شرکت ساختمانی آ.اس.پ', text: 'پیشگام بلندمرتبه‌سازی مدرن، مجتمع‌های تجاری اداری مگاپارس و مجتمع‌های مسکونی پایتخت و مشهد.', ceo: 'مهندس بهروز باقری', capital: '۱,۰۰۰ میلیارد ریال', projectSlugs: ['asp-tehran', 'asp-mashhad', 'megapars-tehran'] },
  { id: 's-khuzestan', badge: 'منطقه جنوب غرب', badgeTone: 'neutral', stake: '۹۹.۹٪', name: 'توسعه ساختمان غدیر خوزستان', text: 'اجرای پروژه‌های انبوه‌سازی مسکونی و تجاری، توسعه زیرساخت‌های عمرانی در استان خوزستان و حاشیه خلیج‌فارس.', ceo: 'دکتر رامین سعیدی', capital: '۴۰۰ میلیارد ریال', projectSlugs: [] },
  { id: 's-engineering', badge: 'مهندسی مشاوره و نظارت', badgeTone: 'blue', stake: '۱۰۰٪', name: 'مهندسی و مدیریت ساخت ثاخت', text: 'ارائه خدمات مدیریت طرح (MC)، بازرسی فنی مصالح، ژئوتکنیک و بهینه‌سازی سیستم‌های تاسیساتی هلدینگ.', ceo: 'مهندس کوروش افشار', capital: '۲۵۰ میلیارد ریال', projectSlugs: ['tehran-international-tower'] },
  { id: 's-kish', badge: 'گردشگری و اقامتی کیش', badgeTone: 'neutral', stake: '۸۵.۵٪', name: 'توسعه ساختمانی باگستر کیش', text: 'توسعه برج‌های مسکونی ساحلی، هتل‌های بین‌المللی و مراکز تجاری در جزیره کیش.', ceo: 'مهندس فرزاد مرادی', capital: '۶۰۰ میلیارد ریال', projectSlugs: ['royaye-kish'] },
  { id: 's-aria', badge: 'بازرگانی و تامین', badgeTone: 'neutral', stake: '۶۰٪', name: 'بازرگانی مصالح ساختمانی آریا', text: 'تامین متمرکز فولاد، سیمان و مصالح نوین برای کارگاه‌های هلدینگ با قراردادهای بلندمدت تولیدکنندگان.', ceo: 'مهندس سعید کرمانی', capital: '۲۰۰ میلیارد ریال', projectSlugs: [] },
  { id: 's-pars', badge: 'بهره‌برداری', badgeTone: 'neutral', stake: '۱۰۰٪', name: 'نگهداری و بهره‌برداری پارس', text: 'مدیریت تاسیسات، نگهداری پیشگیرانه و خدمات ساکنین در مجتمع‌های تحویل‌شده هلدینگ.', ceo: 'مهندس علی نوروزی', capital: '۱۵۰ میلیارد ریال', projectSlugs: ['megapars-tehran', 'sahel-noshahr'] },
  { id: 's-narenjestan', badge: 'نماد فرابورس: نارنج', badgeTone: 'ink', stake: '۵۱٪', name: 'شرکت ساختمانی نارنجستان', text: 'توسعه شهرک‌های مسکونی و تجاری ساحلی در استان مازندران.', ceo: 'مهندس پیمان رحیمی', capital: '۳۵۰ میلیارد ریال', projectSlugs: ['narenjestan-izadshahr'] },
  { id: 's-falat', badge: 'فناوری بتن', badgeTone: 'blue', stake: '۷۰٪', name: 'مهندسی بتن فلات', text: 'طرح اختلاط، آزمایشگاه مرکزی و تولید بتن‌های ویژه فوق‌مقاوم و خودتراکم برای پروژه‌های بلندمرتبه.', ceo: 'دکتر لیلا صدری', capital: '۱۲۰ میلیارد ریال', projectSlugs: ['afafabad-shiraz'] },
]

/** Number of subsidiary cards shown before "show the full list" is expanded. */
export const ORG_SUBSIDIARIES_PREVIEW = 4

export const orgCharter = {
  badge: 'منشور اخلاقی و حاکمیت شرکتی',
  title: 'تعهد به انضباط مالی و پاسخگویی به بازار سرمایه',
  text: 'هلدینگ ساختمانی ثاخت به عنوان یکی از بزرگ‌ترین شرکت‌های سرمایه‌گذاری ملکی بورس، حاکمیت شرکتی را ضامن ارزش‌آفرینی پایدار و حفاظت از حقوق سهامداران خرد می‌داند.',
  points: [
    { title: 'افشای به موقع گزارشات در سامانه کدال', text: 'انتشار ماهانه وضعیت پورتفوی ساخت، پیشرفت فیزیکی پروژه‌ها و گزارشات توجیهی افزایش سرمایه.' },
    { title: 'استقلال اعضای کمیته حسابرسی', text: 'اکثریت اعضای کمیته حسابرسی از کارشناسان مستقل خارج از هیات‌مدیره اجرایی انتخاب شده‌اند.' },
    { title: 'صیانت از منافع سهامداران اقلیت', text: 'راه‌اندازی میز امور سهامداران و پاسخگویی برخط به سوالات تحلیلی در مجامع عمومی سالیانه.' },
    { title: 'رعایت استانداردهای بین‌المللی IFRS', text: 'تجدید ارزیابی دارایی‌های ساختمانی با شفاف‌ترین متدهای کارشناسی رسمی دادگستری.' },
  ],
}

export interface OrgNodeDetail {
  id: string
  levelLabel: string
  title: string
  subtitle?: string
  image?: string
  text: string
  reportsTo?: string
  facts: { label: string, value: string }[]
  list?: { title: string, items: string[] }
  links: { label: string, href: string }[]
}

/** Assembles the side-panel content for any selectable node in the chart. */
export function getOrgNodeDetail(id: string): OrgNodeDetail | null {
  if (id === orgAssembly.id) {
    return {
      id,
      levelLabel: 'سطح ۰ — رکن عالی',
      title: orgAssembly.title,
      subtitle: orgAssembly.badge,
      text: orgAssembly.text,
      facts: orgAssembly.metrics.map(m => ({ label: m.label, value: m.value })),
      list: { title: 'اختیارات کلیدی', items: ['انتخاب اعضای هیات‌مدیره و بازرس قانونی', 'تصویب صورت‌های مالی و تقسیم سود', 'تصمیم‌گیری درباره افزایش سرمایه'] },
      links: [{ label: 'تقویم مجامع و اطلاعیه‌ها', href: '/ir/calendar' }],
    }
  }
  const member = orgBoard.members.find(m => m.id === id)
  if (member) {
    const chaired = orgCommittees.filter(c => c.chairId === member.id).map(c => c.name)
    return {
      id,
      levelLabel: 'سطح ۱ — هیات‌مدیره',
      title: member.name,
      subtitle: `${member.roleBadge} — ${member.position}`,
      image: member.image,
      text: member.background.replace(/^سوابق:\s*/, ''),
      reportsTo: orgAssembly.title,
      facts: [
        { label: 'نمایندگی', value: member.representing },
        { label: 'تحصیلات', value: member.education },
        { label: 'دوره تصدی', value: '۱۴۰۳ تا ۱۴۰۵' },
      ],
      list: chaired.length ? { title: 'ریاست کمیته‌ها', items: chaired } : undefined,
      links: member.boardSlug ? [{ label: 'مشاهده صفحه پروفایل و سوابق کامل', href: `/about/board/${member.boardSlug}` }] : [],
    }
  }
  const committee = orgCommittees.find(c => c.id === id)
  if (committee) {
    return {
      id,
      levelLabel: 'سطح ۲ — کمیته‌های هیات‌مدیره',
      title: committee.name,
      subtitle: committee.statusLabel,
      text: committee.mandate,
      reportsTo: 'هیات‌مدیره',
      facts: [
        { label: 'ریاست', value: committee.chairLabel.replace(/^رئیس:\s*/, '') },
        { label: 'تناوب جلسات', value: committee.note },
      ],
      links: [{ label: 'منشور و اسناد حاکمیت شرکتی', href: '/ir/governance' }],
    }
  }
  if (id === orgExecutive.id) {
    return {
      id,
      levelLabel: 'سطح ۲ — رکن اجرایی',
      title: orgExecutive.title,
      subtitle: orgExecutive.head,
      image: orgExecutive.image,
      text: orgExecutive.text,
      reportsTo: 'هیات‌مدیره',
      facts: [
        { label: 'معاونت‌های کلیدی', value: `${orgVicePresidencies.length} معاونت` },
        { label: 'شرکت‌های عملیاتی', value: `${orgSubsidiaries.length} شرکت` },
      ],
      list: { title: 'معاونت‌های زیرمجموعه', items: orgVicePresidencies.map(v => v.title) },
      links: [{ label: 'پیام مدیرعامل', href: '/about/ceo' }],
    }
  }
  const vp = orgVicePresidencies.find(v => v.id === id)
  if (vp) {
    return {
      id,
      levelLabel: 'سطح ۲ — معاونت‌های اجرایی',
      title: vp.title,
      subtitle: vp.head,
      text: vp.text,
      reportsTo: orgExecutive.title,
      facts: [
        { label: 'حوزه', value: vp.eyebrow },
        { label: 'شاخص کلیدی', value: vp.metric },
      ],
      list: { title: 'واحدهای تابعه', items: vp.units },
      links: vp.boardSlug ? [{ label: 'مشاهده پروفایل معاون', href: `/about/board/${vp.boardSlug}` }] : [],
    }
  }
  const sub = orgSubsidiaries.find(s => s.id === id)
  if (sub) {
    return {
      id,
      levelLabel: 'سطح ۳ — شرکت‌های تابعه',
      title: sub.name,
      subtitle: sub.badge,
      text: sub.text,
      reportsTo: 'معاونت امور شرکت‌ها و مجامع',
      facts: [
        { label: 'مدیرعامل', value: sub.ceo },
        { label: 'سرمایه ثبت‌شده', value: sub.capital },
        { label: 'سهامداری ثاخت', value: sub.stake },
      ],
      links: sub.projectSlugs.map(slug => ({ label: `پروژه ${getProjectDetail(slug)?.name ?? slug}`, href: `/projects/${slug}` })),
    }
  }
  return null
}
